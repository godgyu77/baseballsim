export interface ParsedMessage {
  text: string;
  options: Array<{ label: string; value: string }>;
  guiEvent?: GUIEvent;
  status?: StatusInfo;
  news?: NewsItem[];
}

export interface GUIEvent {
  type: 'DRAFT' | 'FA' | 'TRADE' | 'NEGOTIATION' | 'RECRUIT';
  title?: string;
  candidates?: any[];
  data?: any;
}

export interface StatusInfo {
  date?: string;
  budget?: string;
  budgetValue?: number; // 숫자 형태의 자금 값 (억 단위)
}

export interface NewsItem {
  title: string;
  content: string;
}

export type GamePhase = 'TEAM_SELECTION' | 'MAIN_GAME' | 'EVENT_MODAL' | 'NEGOTIATION' | 'RANDOM_EVENT' | 'FACILITY_MANAGEMENT';

// 랜덤 이벤트 관련 타입
export type EventType = 'positive' | 'negative' | 'choice';

export interface RandomEvent {
  id: string;
  type: EventType;
  title: string;
  message: string;
  effect: {
    budget?: number; // 자금 변동 (원 단위)
    morale?: number; // 팀 사기 변동 (-100 ~ 100)
    playerCondition?: number; // 선수 컨디션 변동 (-100 ~ 100)
    fanLoyalty?: number; // 팬 충성도 변동 (-100 ~ 100)
  };
  choices?: Array<{
    label: string;
    effect: RandomEvent['effect'];
  }>;
}

// 구단 시설 관련 타입
export type FacilityType = 'training' | 'medical' | 'marketing' | 'scouting';

export interface Facility {
  type: FacilityType;
  name: string;
  level: number;
  maxLevel: number;
  upgradeCost: (level: number) => number; // 레벨별 업그레이드 비용 함수
  effect: (level: number) => {
    description: string;
    value: number;
  };
}

export interface FacilityState {
  training: Facility;
  medical: Facility;
  marketing: Facility;
  scouting: Facility;
}

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
  
  // 혼자 떨어진 대괄호 제거 (시스템 태그 제거 후 남은 찌꺼기)
  // 여러 번 반복하여 확실히 제거
  let previousCleaned = '';
  let bracketIterations = 0;
  while (cleaned !== previousCleaned && bracketIterations < 15) {
    previousCleaned = cleaned;
    bracketIterations++;
    
    // 줄 단위로 처리
    cleaned = cleaned.replace(/^\s*\]\s*/gm, ''); // 줄 시작의 ]
    cleaned = cleaned.replace(/\s*\]\s*$/gm, ''); // 줄 끝의 ]
    cleaned = cleaned.replace(/\s+\]\s+/g, ' '); // 중간의 혼자 있는 ]
    cleaned = cleaned.replace(/\]\s*\]/g, ''); // 연속된 ]
    cleaned = cleaned.replace(/\[\s*\]/g, ''); // 빈 대괄호 []
    
    // 표나 코드 블록 다음에 오는 ] 제거
    cleaned = cleaned.replace(/\|\s*\]/g, '|'); // 표 셀 끝의 ]
    cleaned = cleaned.replace(/\n\s*\]/g, '\n'); // 줄바꿈 후 ]
    cleaned = cleaned.replace(/```\s*\]/g, '```'); // 코드 블록 끝의 ]
    
    // 텍스트 끝의 ] 제거 (여러 패턴)
    cleaned = cleaned.replace(/\s*\]\s*$/g, ''); // 공백 포함 끝의 ]
    cleaned = cleaned.replace(/\]\s*$/g, ''); // 공백 없이 끝에 있는 ]
    cleaned = cleaned.replace(/\]\s*\n\s*$/g, '\n'); // 줄바꿈 전 ]
  }
  
  // 최종적으로 텍스트 끝의 ] 제거 (여러 번 반복, 더 강력하게)
  let finalIterations = 0;
  while (finalIterations < 10) {
    const beforeFinal = cleaned;
    cleaned = cleaned.replace(/\]+$/gm, ''); // 각 줄 끝의 모든 ]
    cleaned = cleaned.replace(/\s+\]+$/g, ''); // 끝에 있는 공백과 ]
    cleaned = cleaned.replace(/\]\s*$/g, ''); // 끝의 ]
    cleaned = cleaned.replace(/\]\s*\n\s*$/g, '\n'); // 줄바꿈 전 ]
    cleaned = cleaned.replace(/\]\s*$/g, ''); // 끝의 ] (다시 한 번)
    cleaned = cleaned.trim();
    
    if (cleaned === beforeFinal) break;
    finalIterations++;
  }
  
  // 빈 줄 정리
  cleaned = cleaned.replace(/\n\s*\n\s*\n+/g, '\n\n');
  cleaned = cleaned.trim();
  
  // 마지막 한 번 더 확인하여 끝의 ] 제거 (더 강력하게)
  cleaned = cleaned.replace(/\]+$/g, '');
  cleaned = cleaned.replace(/\s+\]+$/g, '');
  cleaned = cleaned.replace(/\]\s*$/g, '');
  cleaned = cleaned.trim();
  
  // 혼자 떨어진 대괄호 쌍 제거 (빈 대괄호)
  cleaned = cleaned.replace(/\[\s*\]/g, '');
  cleaned = cleaned.replace(/\[\s*\]\s*/g, '');
  
  // 텍스트 끝의 모든 대괄호 제거 (최종 확인)
  cleaned = cleaned.replace(/[\[\]]+$/g, '');
  cleaned = cleaned.replace(/\s+[\[\]]+\s*$/g, '');
  cleaned = cleaned.trim();
  
  // 백틱(`) 문자 제거 (마크다운 코드 블록 찌꺼기)
  // 여러 번 반복하여 확실히 제거
  let backtickIterations = 0;
  while (backtickIterations < 10) {
    const beforeBacktick = cleaned;
    
    // 혼자 떨어진 백틱 1-2개 제거 (3개 이상은 코드 블록이므로 보존)
    cleaned = cleaned.replace(/\b`{1,2}\b/g, ''); // 단어 경계 사이의 백틱 1-2개
    cleaned = cleaned.replace(/\s`{1,2}\s/g, ' '); // 공백 사이의 백틱 1-2개
    cleaned = cleaned.replace(/^`{1,2}\s/gm, ''); // 줄 시작의 백틱 1-2개
    cleaned = cleaned.replace(/\s`{1,2}$/gm, ''); // 줄 끝의 백틱 1-2개
    cleaned = cleaned.replace(/^`{1,2}$/gm, ''); // 줄 전체가 백틱 1-2개인 경우
    
    // 텍스트 끝의 백틱 제거
    cleaned = cleaned.replace(/`+$/g, ''); // 끝의 모든 백틱 제거
    cleaned = cleaned.replace(/\s+`+$/g, ''); // 공백과 함께 끝의 백틱 제거
    cleaned = cleaned.replace(/`+\s*$/g, ''); // 백틱과 공백 제거
    
    // 텍스트 시작의 백틱 제거
    cleaned = cleaned.replace(/^`+/gm, ''); // 줄 시작의 모든 백틱 제거
    
    // 공백 사이의 백틱 제거
    cleaned = cleaned.replace(/\s+`+\s+/g, ' '); // 공백 사이의 백틱 제거
    cleaned = cleaned.replace(/`+\s+/g, ' '); // 백틱 뒤 공백 제거
    cleaned = cleaned.replace(/\s+`+/g, ' '); // 공백 뒤 백틱 제거
    
    cleaned = cleaned.trim();
    
    if (cleaned === beforeBacktick) break;
    backtickIterations++;
  }
  
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
        // JSON 유효성 검사 (빈 문자열이나 불완전한 JSON 체크)
        if (jsonStr.trim().length > 0) {
          guiEvent = JSON.parse(jsonStr);
          break; // 첫 번째 유효한 이벤트만 파싱
        }
      } catch (e) {
        // 파싱 오류 발생 시 로그만 남기고 계속 진행 (태그는 나중에 제거됨)
        console.warn('GUI 이벤트 파싱 오류 (태그는 자동 제거됨):', e);
      }
    }
  }

  // [STATUS] 태그 찾기 및 파싱
  let status: StatusInfo | undefined = undefined;
  const statusRegex = /\[STATUS\]\s*(.+?)(?=\[|$)/gs;
  const statusMatch = originalText.match(statusRegex);
  
  if (statusMatch) {
    try {
      const statusText = statusMatch[0].replace(/\[STATUS\]\s*/, '').trim();
      // "날짜: YYYY/MM/DD | 자금: 0,000억 원" 형식 파싱
      const dateMatch = statusText.match(/날짜[:\s]*(\d{4}\/\d{1,2}\/\d{1,2})/i);
      const budgetMatch = statusText.match(/자금[:\s]*([0-9,.]+)\s*억/i);
      
      status = {};
      if (dateMatch && dateMatch[1]) {
        const [year, month, day] = dateMatch[1].split('/');
        status.date = `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
      }
      if (budgetMatch && budgetMatch[1]) {
        const budgetStr = budgetMatch[1].replace(/,/g, '');
        const budgetValue = parseFloat(budgetStr);
        if (!isNaN(budgetValue) && budgetValue > 0) {
          status.budget = budgetMatch[1] + '억 원';
          status.budgetValue = budgetValue * 100000000; // 억 단위를 원 단위로 변환
        }
      }
    } catch (e) {
      console.warn('STATUS 파싱 오류:', e);
    }
  }

  // [NEWS] 태그 찾기 및 파싱 (여러 개 가능)
  const news: NewsItem[] = [];
  const newsRegex = /\[NEWS:\s*(\{[\s\S]*?\})\]/gs;
  let newsMatch;
  
  while ((newsMatch = newsRegex.exec(originalText)) !== null) {
    try {
      const newsJson = JSON.parse(newsMatch[1]);
      if (newsJson.title && newsJson.content) {
        news.push({
          title: newsJson.title,
          content: newsJson.content,
        });
      }
    } catch (e) {
      console.warn('NEWS 파싱 오류:', e);
    }
  }
  
  // 2단계: 화면 표시용 텍스트 생성 (모든 시스템 태그 제거)
  const cleanText = removeSystemTags(originalText);
  
  return { 
    text: cleanText, 
    options, 
    guiEvent, 
    status: status || undefined,
    news: news.length > 0 ? news : undefined
  };
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

/**
 * 텍스트에서 연고지와 팀 이름을 함께 추출합니다 (신생 구단 창단 시 사용)
 * @param text 사용자 입력 또는 AI 응답 텍스트
 * @returns 추출된 전체 구단명 (연고지 + 팀 이름 또는 팀 이름만, 없으면 null)
 */
export function extractFullTeamName(text: string): string | null {
  // 제외할 키워드 목록
  const excludeKeywords = [
    '당신의', '새로운', '노말', '이지', '헬', '모드', '난이도', 'difficulty',
    '선택', '설정', '적용', '변경', '금지', '절대', '시즌', 'season',
    '구단', '팀', '야구단', 'city', 'team', 'name'
  ];
  
  // 패턴 1: "연고지: 제주시, 팀이름: 한라 감귤스" 형식 → "한라 감귤스" (팀 이름만)
  const pattern1 = /(?:연고지|연고)[:\s]*([가-힣a-zA-Z0-9\s]+?)(?:[,\s]+팀이름|팀\s*이름)[:\s]*([가-힣a-zA-Z0-9\s]+?)(?:입니다|이다|\.|$|,)/i;
  const match1 = text.match(pattern1);
  if (match1 && match1[1] && match1[2]) {
    const city = match1[1].trim();
    const teamName = match1[2].trim();
    // 제외 키워드 체크
    if (!excludeKeywords.some(k => city.includes(k) || teamName.includes(k))) {
      if (city.length >= 2 && teamName.length >= 2) {
        // 연고지와 팀 이름이 명시적으로 구분된 경우 → 팀 이름만 반환
        return teamName;
      }
    }
  }
  
  // 패턴 2: "연고지는 제주시이고, 팀 이름은 한라 감귤스입니다" 형식 → "한라 감귤스" (팀 이름만)
  const pattern2 = /(?:연고지|연고)[은는]\s*([가-힣a-zA-Z0-9\s]+?)(?:이고|이고,|이고\s*팀|이고\s*구단).*?(?:팀|구단)\s*이름[은는]\s*([가-힣a-zA-Z0-9\s]+?)(?:입니다|이다|\.|$)/i;
  const match2 = text.match(pattern2);
  if (match2 && match2[1] && match2[2]) {
    const city = match2[1].trim();
    const teamName = match2[2].trim();
    if (!excludeKeywords.some(k => city.includes(k) || teamName.includes(k))) {
      if (city.length >= 2 && teamName.length >= 2) {
        // 연고지와 팀 이름이 명시적으로 구분된 경우 → 팀 이름만 반환
        return teamName;
      }
    }
  }
  
  // 패턴 3: "제주시 한라 감귤스" 형식 (연고지 + 팀 이름이 공백으로 구분) → "제주시 한라 감귤스" (전체)
  const pattern3 = /([가-힣]+(?:시|도|특별시|광역시|특별자치시))\s+([가-힣a-zA-Z0-9\s]+?)(?:\s|$|입니다|이다|\.|로|으로)/i;
  const match3 = text.match(pattern3);
  if (match3 && match3[1] && match3[2]) {
    const city = match3[1].trim();
    const teamName = match3[2].trim();
    if (!excludeKeywords.some(k => city.includes(k) || teamName.includes(k))) {
      if (city.length >= 2 && teamName.length >= 2 && teamName.length <= 30) {
        // 연고지와 팀 이름이 공백으로 구분된 경우 → 전체 반환
        return `${city} ${teamName}`;
      }
    }
  }
  
  return null;
}

/**
 * 텍스트에서 구단 이름을 추출합니다 (신생 구단 창단 시 사용)
 * @param text 사용자 입력 또는 AI 응답 텍스트
 * @returns 추출된 구단 이름 (없으면 null)
 */
export function extractTeamName(text: string): string | null {
  // 먼저 전체 구단명(연고지 + 팀 이름) 추출 시도
  const fullName = extractFullTeamName(text);
  if (fullName) {
    return fullName;
  }
  // 제외할 키워드 목록 (이런 단어가 포함된 텍스트는 팀 이름으로 추출하지 않음)
  const excludeKeywords = [
    '당신의', '새로운', '노말', '이지', '헬', '모드', '난이도', 'difficulty',
    '선택', '설정', '적용', '변경', '금지', '절대', '시즌', 'season',
    '구단', '팀', '야구단', '연고지', 'city', 'team', 'name'
  ];
  
  // 다양한 패턴 시도
  const patterns = [
    // "구단 이름을 '제주 감귤스'로 정했습니다", "팀 이름을 '제주 감귤스'로 정했습니다"
    /(?:구단|팀)\s*이름[을를]\s*['"]([가-힣a-zA-Z0-9\s]+?)['"]/i,
    // "구단 이름은 '제주 감귤스'입니다", "팀 이름은 '제주 감귤스'입니다"
    /(?:구단|팀)\s*이름[은는]\s*['"]([가-힣a-zA-Z0-9\s]+?)['"]/i,
    // "연고지는 제주시이고, 팀 이름은 한라 감귤스입니다" - 연고지와 팀 이름이 함께 나오는 경우
    /(?:연고지|연고)[은는]\s*[가-힣a-zA-Z0-9\s]+(?:이고|이고,|이고\s*팀|이고\s*구단).*?(?:팀|구단)\s*이름[은는]\s*([가-힣a-zA-Z0-9\s]+?)(?:입니다|이다|\.|$)/i,
    // "팀이름은 감귤 파이터즈야", "팀 이름은 감귤 파이터즈", "팀이름: 감귤 파이터즈"
    /(?:팀\s*이름|팀이름|구단\s*이름|구단이름)[은는:\s]+([가-힣a-zA-Z0-9\s]+?)(?:야|입니다|이다|로|으로|입니다|\.|$)/i,
    // "연고지는 제주도이고 팀이름은 감귤 파이터즈야"
    /(?:팀이름|팀\s*이름)[은는:\s]+([가-힣a-zA-Z0-9\s]+?)(?:야|입니다|이다|로|으로|입니다|\.|$)/i,
    // "제주 감귤 파이터즈", "감귤 파이터즈" (직접 언급) - 단, "구단", "팀", "야구단" 앞에 오는 경우만
    /([가-힣a-zA-Z0-9\s]+?)\s*(?:구단|팀|야구단)(?:\s|$|입니다|이다|\.)/i,
    // "팀 이름: 감귤 파이터즈"
    /(?:팀|구단)\s*이름[:\s]+([가-힣a-zA-Z0-9\s]+?)(?:입니다|이다|로|으로|\.|$)/i,
    // "제주 감귤스로 정했습니다", "제주 감귤스로 결정했습니다"
    /([가-힣a-zA-Z0-9\s]+?)\s*(?:로|으로)\s*(?:정했습니다|결정했습니다|설정했습니다)/i,
    // "구단명은 제주 감귤스입니다", "팀명은 제주 감귤스입니다"
    /(?:구단명|팀명)[은는:\s]+([가-힣a-zA-Z0-9\s]+?)(?:입니다|이다|\.|$)/i,
    // "제주시 한라감귤봉" 같은 형식 - 연고지와 팀 이름이 공백으로 구분된 경우 (뒤의 부분이 팀 이름)
    /(?:[가-힣]+시|[가-힣]+도)\s+([가-힣a-zA-Z0-9\s]+?)(?:\s|$|입니다|이다|\.)/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const teamName = match[1].trim();
      
      // 제외 키워드 체크
      const containsExcludeKeyword = excludeKeywords.some(keyword => 
        teamName.includes(keyword)
      );
      if (containsExcludeKeyword) {
        continue; // 다음 패턴 시도
      }
      
      // 너무 짧거나 의미 없는 이름은 제외
      // "로", "으로", "입니다", "이다" 같은 단어가 포함된 경우 제외
      if (teamName.length >= 2 && teamName.length <= 30 && 
          !/^(로|으로|입니다|이다|야|입니다|\.)$/.test(teamName)) {
        return teamName;
      }
    }
  }

  return null;
}

/**
 * 입력된 연고지가 대한민국의 실제 도시인지 검증합니다
 * @param city 입력된 연고지 이름
 * @returns 유효한 도시인 경우 true, 그렇지 않으면 false
 */
export function isValidKoreanCity(city: string): boolean {
  if (!city || city.trim().length === 0) return false;
  
  const normalizedCity = city.trim().replace(/시$/, '').replace(/특별시$/, '').replace(/광역시$/, '').replace(/특별자치시$/, '');
  
  // 대한민국 도시 목록 (시 단위)
  const validCities = [
    // 특별시
    '서울',
    // 광역시
    '부산', '대구', '인천', '광주', '대전', '울산',
    // 특별자치시
    '세종',
    // 경기도
    '수원', '고양', '용인', '성남', '부천', '안산', '안양', '남양주', '화성', '평택', '의정부', '시흥', '파주', '광명', '김포', '광주', '군포', '이천', '오산', '하남', '양주', '구리', '안성', '포천', '의왕', '여주', '동두천',
    // 강원특별자치도
    '춘천', '원주', '강릉', '동해', '태백', '속초', '삼척',
    // 충청북도
    '청주', '충주', '제천',
    // 충청남도
    '천안', '공주', '보령', '아산', '서산', '논산', '계룡', '당진',
    // 전북특별자치도
    '전주', '군산', '익산', '정읍', '남원', '김제',
    // 전라남도
    '목포', '여수', '순천', '나주', '광양',
    // 경상북도
    '포항', '경주', '김천', '안동', '구미', '영주', '영천', '상주', '문경', '경산',
    // 경상남도
    '창원', '진주', '통영', '사천', '김해', '밀양', '거제', '양산',
    // 제주특별자치도
    '제주', '서귀포',
  ];
  
  return validCities.includes(normalizedCity);
}

