export interface ParsedMessage {
  text: string;
  options: Array<{ label: string; value: string }>;
  guiEvent?: GUIEvent;
}

export interface GUIEvent {
  type: 'DRAFT' | 'FA' | 'TRADE' | 'NEGOTIATION';
  data: any;
}

export type GamePhase = 'TEAM_SELECTION' | 'MAIN_GAME' | 'EVENT_MODAL' | 'NEGOTIATION';

/**
 * 시스템 태그를 완전히 제거하는 전용 함수
 * 멀티라인 JSON과 중첩 구조를 모두 처리합니다.
 */
function removeSystemTags(text: string): string {
  let cleaned = text;
  
  // 중첩된 JSON 구조를 포함한 완전한 매칭을 위한 헬퍼 함수
  const findMatchingBracket = (str: string, startIndex: number, openChar: string, closeChar: string): number => {
    let depth = 0;
    let inString = false;
    let escapeNext = false;
    
    for (let i = startIndex; i < str.length; i++) {
      const char = str[i];
      
      if (escapeNext) {
        escapeNext = false;
        continue;
      }
      
      if (char === '\\') {
        escapeNext = true;
        continue;
      }
      
      if (char === '"') {
        inString = !inString;
        continue;
      }
      
      if (inString) continue;
      
      if (char === openChar) depth++;
      if (char === closeChar) {
        depth--;
        if (depth === 0) return i;
      }
    }
    return -1;
  };
  
  // 반복적으로 모든 시스템 태그를 제거 (무한 루프 방지)
  let previousText = '';
  let iterations = 0;
  const maxIterations = 20;
  
  while (cleaned !== previousText && iterations < maxIterations) {
    previousText = cleaned;
    iterations++;
    
    // [GUI_EVENT: ...] 패턴 제거 (멀티라인, 중첩 JSON 모두 처리)
    const guiEventPattern = /\[GUI_EVENT:\s*\{/gs;
    let match;
    while ((match = guiEventPattern.exec(cleaned)) !== null) {
      const startIndex = match.index;
      const jsonStart = match.index + match[0].length - 1; // '{' 위치
      const jsonEnd = findMatchingBracket(cleaned, jsonStart, '{', '}');
      
      if (jsonEnd !== -1) {
        // ']'까지 찾기
        const tagEnd = cleaned.indexOf(']', jsonEnd);
        if (tagEnd !== -1) {
          cleaned = cleaned.substring(0, startIndex) + cleaned.substring(tagEnd + 1);
          guiEventPattern.lastIndex = 0; // 리셋
        }
      }
    }
    
    // [OPTIONS: ...] 패턴 제거 (멀티라인, 중첩 배열 모두 처리)
    const optionsPattern = /\[OPTIONS:\s*\[/gs;
    while ((match = optionsPattern.exec(cleaned)) !== null) {
      const startIndex = match.index;
      const arrayStart = match.index + match[0].length - 1; // '[' 위치
      const arrayEnd = findMatchingBracket(cleaned, arrayStart, '[', ']');
      
      if (arrayEnd !== -1) {
        // ']'까지 찾기
        const tagEnd = cleaned.indexOf(']', arrayEnd);
        if (tagEnd !== -1) {
          cleaned = cleaned.substring(0, startIndex) + cleaned.substring(tagEnd + 1);
          optionsPattern.lastIndex = 0; // 리셋
        }
      }
    }
    
    // [STATUS: ...] 패턴 제거 (멀티라인 지원)
    cleaned = cleaned.replace(/\[STATUS:[\s\S]*?\]/gs, '');
    
    // [NEWS: ...] 패턴 제거 (멀티라인 지원)
    cleaned = cleaned.replace(/\[NEWS:[\s\S]*?\]/gs, '');
    
    // 불완전한 태그도 제거 (스트리밍 중 부분적으로 나타나는 경우)
    cleaned = cleaned.replace(/\[GUI_EVENT:[\s\S]*$/gs, '');
    cleaned = cleaned.replace(/\[OPTIONS:[\s\S]*$/gs, '');
    cleaned = cleaned.replace(/\[STATUS:[\s\S]*$/gs, '');
    cleaned = cleaned.replace(/\[NEWS:[\s\S]*$/gs, '');
    
    // 일반적인 시스템 태그 패턴 제거
    cleaned = cleaned.replace(/\[[A-Z_]+:[\s\S]*?\]/gs, '');
  }
  
  // JSON처럼 보이는 텍스트 블록 제거 (찌꺼기 제거)
  // 중첩된 JSON 객체를 재귀적으로 찾아서 제거
  const removeJsonObjects = (str: string): string => {
    let result = str;
    let changed = true;
    let iterations = 0;
    const maxIterations = 10;
    
    while (changed && iterations < maxIterations) {
      changed = false;
      iterations++;
      const before = result;
      
      // 중괄호로 시작하는 JSON 객체 패턴 찾기
      const jsonPattern = /\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/gs;
      result = result.replace(jsonPattern, (match) => {
        // 시스템 관련 키워드나 JSON 키가 포함된 경우 제거
        if (/prev_league|cost|GUI_EVENT|OPTIONS|STATUS|NEWS|"id"|"name"|"label"|"value"|"type"|"data"/i.test(match)) {
          changed = true;
          return '';
        }
        return match;
      });
      
      // }, { "label": ... 같은 패턴 제거
      result = result.replace(/,\s*\{\s*"label"/gs, '');
      result = result.replace(/\}\s*,\s*\{/gs, '');
      
      // 혼자 떨어진 JSON 키-값 쌍 제거
      result = result.replace(/,\s*"prev_league"\s*:\s*"[^"]*"/gs, '');
      result = result.replace(/,\s*"cost"\s*:\s*[^,\}]+/gs, '');
      result = result.replace(/"prev_league"\s*:\s*"[^"]*"\s*,?/gs, '');
      result = result.replace(/"cost"\s*:\s*[^,\}]+/gs, '');
    }
    
    return result;
  };
  
  cleaned = removeJsonObjects(cleaned);
  
  // 빈 줄 정리
  cleaned = cleaned.replace(/\n\s*\n\s*\n+/g, '\n\n');
  cleaned = cleaned.trim();
  
  return cleaned;
}

/**
 * AI 응답에서 OPTIONS JSON을 파싱하여 텍스트와 선택지를 분리합니다.
 * @param message AI가 보낸 원본 메시지
 * @returns 파싱된 텍스트와 옵션 배열
 */
export function parseAIResponse(message: string): ParsedMessage {
  const originalText = message;
  let options: Array<{ label: string; value: string }> = [];
  let guiEvent: GUIEvent | undefined = undefined;

  // 1단계: 원본 텍스트에서 데이터 추출 (제거 전에 파싱)
  
  // [OPTIONS: ...] 패턴 찾기 및 파싱
  const optionsRegex = /\[OPTIONS:\s*(\[[\s\S]*?\])\]/gs;
  const optionsMatch = originalText.match(optionsRegex);
  
  if (optionsMatch) {
    try {
      const firstMatch = optionsMatch[0];
      const jsonMatch = firstMatch.match(/\[OPTIONS:\s*(\[[\s\S]*?\])\]/s);
      if (jsonMatch && jsonMatch[1]) {
        options = JSON.parse(jsonMatch[1]);
      }
    } catch (e) {
      console.error('옵션 파싱 오류:', e);
    }
  }

  // [GUI_EVENT: ...] 패턴 찾기 및 파싱 (중첩된 JSON 구조 처리)
  const findNestedJson = (str: string, startIndex: number): number => {
    let depth = 0;
    let inString = false;
    let escapeNext = false;
    
    for (let i = startIndex; i < str.length; i++) {
      const char = str[i];
      
      if (escapeNext) {
        escapeNext = false;
        continue;
      }
      
      if (char === '\\') {
        escapeNext = true;
        continue;
      }
      
      if (char === '"') {
        inString = !inString;
        continue;
      }
      
      if (inString) continue;
      
      if (char === '{') depth++;
      if (char === '}') {
        depth--;
        if (depth === 0) return i;
      }
    }
    return -1;
  };
  
  // GUI_EVENT 태그 찾기 및 파싱
  const guiEventStartRegex = /\[GUI_EVENT:\s*\{/gs;
  let guiEventMatch;
  while ((guiEventMatch = guiEventStartRegex.exec(originalText)) !== null) {
    const startIndex = guiEventMatch.index + guiEventMatch[0].length - 1; // '{' 위치
    const endIndex = findNestedJson(originalText, startIndex);
    
    if (endIndex !== -1) {
      try {
        const jsonStr = originalText.substring(startIndex, endIndex + 1);
        guiEvent = JSON.parse(jsonStr);
        break; // 첫 번째 유효한 이벤트만 파싱
      } catch (e) {
        console.error('GUI 이벤트 파싱 오류:', e);
      }
    }
  }
  
  // 2단계: 화면 표시용 텍스트 생성 (모든 시스템 태그 제거)
  const cleanText = removeSystemTags(originalText);
  
  return { text: cleanText, options, guiEvent };
}

/**
 * 클래스명을 병합하는 유틸리티 함수
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * AI 응답에서 날짜 정보를 추출합니다.
 * @param text AI 응답 텍스트
 * @returns 추출된 날짜 문자열 (없으면 null)
 */
export function extractDate(text: string): string | null {
  // 다양한 날짜 패턴 시도
  const patterns = [
    /날짜[:\s]*(\d{4}\/\d{1,2}\/\d{1,2})/i,
    /날짜[:\s]*(\d{4}년\s*\d{1,2}월\s*\d{1,2}일)/i,
    /(\d{4}\/\d{1,2}\/\d{1,2})/,
    /(\d{4}년\s*\d{1,2}월\s*\d{1,2}일)/,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      // YYYY/MM/DD 형식을 YYYY년 M월 D일 형식으로 변환
      const dateStr = match[1];
      if (dateStr.includes('/')) {
        const [year, month, day] = dateStr.split('/');
        return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
      }
      return dateStr;
    }
  }

  return null;
}

/**
 * AI 응답에서 자금 정보를 추출합니다.
 * @param text AI 응답 텍스트
 * @returns 추출된 자금 숫자 (없으면 null)
 */
export function extractBudget(text: string): number | null {
  // 다양한 자금 패턴 시도 (소수점 포함, 다양한 포맷 지원)
  const patterns = [
    // "보유 자금: 50억", "자금: 50.00억", "보유 자금: 50억원" 등
    /(?:자금|보유\s*자금|현재\s*자금|예산)[:\s]*([0-9,.]+)\s*([가-힣a-zA-Z]*)/i,
    // "50억", "50.00억", "50억원", "50억 원" 등
    /([0-9,.]+)\s*억\s*(?:원)?/i,
    // "5,000,000,000원" 같은 직접 숫자
    /([0-9,]+)\s*원/i,
    // "50억" (간단한 형태)
    /([0-9,.]+)\s*억/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      // 콤마 제거 후 숫자 추출 (소수점 포함)
      const amountStr = match[1].replace(/,/g, '');
      const amount = parseFloat(amountStr); // parseInt 대신 parseFloat 사용
      
      if (!isNaN(amount) && amount > 0) { // 0보다 큰 값만 유효
        // "억" 단위가 포함되어 있으면 100,000,000을 곱함
        const fullMatch = match[0];
        if (fullMatch.includes('억')) {
          return Math.floor(amount * 100000000);
        }
        // "만" 단위가 포함되어 있으면 10,000을 곱함
        if (fullMatch.includes('만')) {
          return Math.floor(amount * 10000);
        }
        // 그 외에는 그대로 반환 (이미 원 단위로 추정)
        return Math.floor(amount);
      }
    }
  }

  return null;
}

