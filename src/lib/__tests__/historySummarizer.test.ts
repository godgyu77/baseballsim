/**
 * [TEST] 히스토리 요약 함수 테스트
 * 히스토리 요약이 정상 작동하는지 확인합니다.
 */

import { summarizeHistoryWithPersona, compressHistory, HistoryMessage } from '../historySummarizer';

describe('History Summarizer', () => {
  const createMessage = (role: 'user' | 'model', text: string): HistoryMessage => ({
    role,
    parts: [{ text }],
  });

  describe('summarizeHistoryWithPersona', () => {
    it('빈 히스토리는 그대로 반환해야 함', () => {
      const oldHistory: HistoryMessage[] = [];
      const recentHistory: HistoryMessage[] = [
        createMessage('user', '테스트 메시지'),
        createMessage('model', '테스트 응답'),
      ];

      const result = summarizeHistoryWithPersona(oldHistory, recentHistory);

      expect(result).toEqual(recentHistory);
    });

    it('오래된 대화를 요약하고 최근 대화는 유지해야 함', () => {
      const oldHistory: HistoryMessage[] = [
        createMessage('model', '[STATUS] 날짜: 2026/01/01 | 자금: 30.0억 원'),
        createMessage('user', '일정 진행'),
        createMessage('model', '경기 결과...'),
      ];

      const recentHistory: HistoryMessage[] = [
        createMessage('user', '최근 메시지'),
        createMessage('model', '최근 응답'),
      ];

      const result = summarizeHistoryWithPersona(oldHistory, recentHistory);

      // 요약 메시지가 포함되어야 함
      expect(result.length).toBeGreaterThan(recentHistory.length);
      expect(result[0].role).toBe('model');
      expect(result[0].parts[0].text).toContain('이전 대화 요약');

      // 최근 대화는 그대로 유지되어야 함
      const recentStartIndex = result.findIndex(
        msg => msg.parts[0]?.text === '최근 메시지'
      );
      expect(recentStartIndex).toBeGreaterThan(0);
    });

    it('STATUS 태그에서 날짜와 자금 정보를 추출해야 함', () => {
      const oldHistory: HistoryMessage[] = [
        createMessage('model', '[STATUS] 날짜: 2026/01/15 | 자금: 45.5억 원'),
      ];

      const recentHistory: HistoryMessage[] = [];

      const result = summarizeHistoryWithPersona(oldHistory, recentHistory);

      expect(result[0].parts[0].text).toContain('2026/01/15');
      expect(result[0].parts[0].text).toContain('45.5억');
    });
  });

  describe('compressHistory', () => {
    it('히스토리가 maxRecentTurns 이하면 그대로 반환해야 함', () => {
      const history: HistoryMessage[] = [
        createMessage('user', '메시지 1'),
        createMessage('model', '응답 1'),
      ];

      const result = compressHistory(history, 15);

      expect(result).toEqual(history);
    });

    it('히스토리가 maxRecentTurns 초과하면 압축해야 함', () => {
      const history: HistoryMessage[] = [];
      
      // 20개의 메시지 생성
      for (let i = 0; i < 20; i++) {
        history.push(createMessage('user', `메시지 ${i}`));
        history.push(createMessage('model', `응답 ${i}`));
      }

      const result = compressHistory(history, 15);

      // 압축된 결과는 원본보다 작아야 함
      expect(result.length).toBeLessThan(history.length);
      // 요약 메시지가 포함되어야 함
      expect(result[0].parts[0].text).toContain('이전 대화 요약');
    });

    it('최근 대화는 항상 유지되어야 함', () => {
      const history: HistoryMessage[] = [];
      
      // 20개의 메시지 생성
      for (let i = 0; i < 20; i++) {
        history.push(createMessage('user', `메시지 ${i}`));
        history.push(createMessage('model', `응답 ${i}`));
      }

      const result = compressHistory(history, 10);

      // 최근 10개 턴(20개 메시지)은 유지되어야 함
      const lastMessages = result.slice(-20);
      expect(lastMessages[lastMessages.length - 1].parts[0].text).toBe('응답 19');
    });
  });
});

