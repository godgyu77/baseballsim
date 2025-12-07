/**
 * [OPTIMIZE] 히스토리 요약 유틸리티
 * 게임의 재미를 위해 AI의 '페르소나(말투)'를 유지하면서 요약하는 함수
 */

export interface HistoryMessage {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

/**
 * [OPTIMIZE] 히스토리 요약 함수 (페르소나 유지)
 * 오래된 대화를 요약하되, AI의 말투와 게임 맥락을 유지합니다.
 * 
 * @param oldHistory 오래된 대화 히스토리 (최근 15개 제외)
 * @param recentHistory 최근 대화 히스토리 (최근 15개)
 * @returns 요약된 히스토리 + 최근 대화
 */
export function summarizeHistoryWithPersona(
  oldHistory: HistoryMessage[],
  recentHistory: HistoryMessage[]
): HistoryMessage[] {
  if (oldHistory.length === 0) {
    return recentHistory;
  }

  // 오래된 대화에서 중요한 정보만 추출
  const summaryPoints: string[] = [];
  
  // 게임 상태 정보 추출 (날짜, 자금, 주요 이벤트)
  oldHistory.forEach((msg, idx) => {
    if (msg.role === 'model') {
      const text = msg.parts[0]?.text || '';
      
      // STATUS 태그에서 날짜/자금 정보 추출
      const statusMatch = text.match(/\[STATUS\][\s\S]*?날짜[:\s]*(\d{4}\/\d{1,2}\/\d{1,2})[\s\S]*?자금[:\s]*([0-9,.]+)\s*억/i);
      if (statusMatch) {
        summaryPoints.push(`[${statusMatch[1]}] 자금: ${statusMatch[2]}억 원`);
      }
      
      // 주요 트레이드/FA 영입 정보 추출
      const tradeMatch = text.match(/트레이드|FA 영입|선수 영입/i);
      if (tradeMatch && idx < 5) { // 최근 5개 메시지에서만
        const shortText = text.substring(0, 200).replace(/\n/g, ' ');
        summaryPoints.push(`[주요 이벤트] ${shortText}...`);
      }
    }
  });

  // 요약 메시지 생성 (AI 페르소나 유지)
  const summaryText = summaryPoints.length > 0
    ? `[이전 대화 요약]\n${summaryPoints.join('\n')}\n\n(이전 대화는 요약되었으며, 최근 대화는 그대로 유지됩니다.)`
    : '[이전 대화 요약]\n게임 진행 중...\n\n(최근 대화는 그대로 유지됩니다.)';

  // 요약된 히스토리 구성: 요약 메시지 + 최근 대화
  return [
    {
      role: 'model',
      parts: [{ text: summaryText }]
    },
    ...recentHistory
  ];
}

/**
 * [OPTIMIZE] 스마트 히스토리 압축
 * 중요 정보는 유지하고 불필요한 반복은 제거합니다.
 * 
 * @param history 전체 히스토리
 * @param maxRecentTurns 최근 유지할 대화 턴 수 (기본값: 15)
 * @returns 압축된 히스토리
 */
export function compressHistory(
  history: HistoryMessage[],
  maxRecentTurns: number = 15
): HistoryMessage[] {
  if (history.length <= maxRecentTurns) {
    return history;
  }

  // 최근 N개와 오래된 대화 분리
  const recentHistory = history.slice(-maxRecentTurns);
  const oldHistory = history.slice(0, -maxRecentTurns);

  // 오래된 대화 요약 (페르소나 유지)
  const summarized = summarizeHistoryWithPersona(oldHistory, recentHistory);

  console.log(`[History Compression] ${history.length}개 턴 → ${summarized.length}개 턴 (요약 적용)`);

  return summarized;
}

