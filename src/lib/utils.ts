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
 * AI 응답에서 OPTIONS JSON을 파싱하여 텍스트와 선택지를 분리합니다.
 * @param message AI가 보낸 원본 메시지
 * @returns 파싱된 텍스트와 옵션 배열
 */
export function parseAIResponse(message: string): ParsedMessage {
  let text = message;
  let options: Array<{ label: string; value: string }> = [];
  let guiEvent: GUIEvent | undefined = undefined;

  // 1단계: 먼저 JSON 데이터를 추출 (제거 전에 파싱)
  // [OPTIONS: ...] 패턴 찾기 및 제거 (완전한 형태와 불완전한 형태 모두 처리)
  const optionsRegex = /\[OPTIONS:\s*(\[.*?\])\]/gs;
  const optionsMatch = text.match(optionsRegex);
  
  if (optionsMatch) {
    try {
      // 첫 번째 매치만 파싱 (일반적으로 하나만 있음)
      const firstMatch = optionsMatch[0];
      const jsonMatch = firstMatch.match(/\[OPTIONS:\s*(\[.*?\])\]/s);
      if (jsonMatch && jsonMatch[1]) {
        options = JSON.parse(jsonMatch[1]);
      }
    } catch (e) {
      console.error('옵션 파싱 오류:', e);
    }
  }

  // [GUI_EVENT: ...] 패턴 찾기 및 제거 (완전한 형태와 불완전한 형태 모두 처리)
  const guiEventRegex = /\[GUI_EVENT:\s*(\{.*?\})\]/gs;
  const guiMatch = text.match(guiEventRegex);
  
  if (guiMatch) {
    try {
      // 첫 번째 매치만 파싱
      const firstMatch = guiMatch[0];
      const jsonMatch = firstMatch.match(/\[GUI_EVENT:\s*(\{.*?\})\]/s);
      if (jsonMatch && jsonMatch[1]) {
        guiEvent = JSON.parse(jsonMatch[1]);
      }
    } catch (e) {
      console.error('GUI 이벤트 파싱 오류:', e);
    }
  }
  
  // 2단계: 모든 제어 태그를 완전히 제거 (텍스트 정제 - 가장 먼저 실행)
  // 완전한 형태의 태그 제거
  text = text.replace(/\[OPTIONS:\s*\[.*?\]\]/gs, '').trim();
  text = text.replace(/\[GUI_EVENT:\s*\{.*?\}\]/gs, '').trim();
  text = text.replace(/\[STATUS:.*?\]/gs, '').trim();
  text = text.replace(/\[NEWS:.*?\]/gs, '').trim();
  text = text.replace(/\[STATUS\]/gs, '').trim();
  text = text.replace(/\[NEWS\]/gs, '').trim();
  
  // 불완전한 태그도 제거 (스트리밍 중 부분적으로 나타나는 경우)
  // 예: [GUI_EVENT: {"type" 또는 [GUI_EVENT: {"type": "DRAFT" 등
  // 재귀적으로 여러 번 실행하여 모든 패턴 제거
  let previousText = '';
  while (text !== previousText) {
    previousText = text;
    text = text.replace(/\[GUI_EVENT:[^\]]*/g, '').trim();
    text = text.replace(/\[OPTIONS:[^\]]*/g, '').trim();
    text = text.replace(/\[STATUS:[^\]]*/g, '').trim();
    text = text.replace(/\[NEWS:[^\]]*/g, '').trim();
    text = text.replace(/\[[A-Z_]+:[^\]]*/g, '').trim();
    // 대괄호로 시작해서 닫히지 않은 모든 패턴 제거
    text = text.replace(/\[[A-Z_]+[^\]]*/g, '').trim();
  }
  
  // 3단계: 남아있을 수 있는 모든 대괄호 패턴 제거 (최종 안전장치)
  // 모든 제어 태그 패턴을 전역으로 제거
  text = text.replace(/\[OPTIONS:.*?\]/gs, '').trim();
  text = text.replace(/\[GUI_EVENT:.*?\]/gs, '').trim();
  text = text.replace(/\[STATUS:.*?\]/gs, '').trim();
  text = text.replace(/\[NEWS:.*?\]/gs, '').trim();
  text = text.replace(/\[[A-Z_]+:.*?\]/gs, '').trim();
  
  // 4단계: 빈 줄 정리
  text = text.replace(/\n\s*\n\s*\n/g, '\n\n').trim();
  
  return { text, options, guiEvent };
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

