/**
 * [FEEDBACK] 사용자 피드백 수집 시스템
 * 게임 플레이 중 사용자 피드백을 수집하고 분석합니다.
 */

import { SafeStorage, safeSetJSON, safeGetJSON } from './safeStorage';

export interface UserFeedback {
  timestamp: number;
  type: 'BUG' | 'SUGGESTION' | 'COMPLAINT' | 'PRAISE' | 'QUESTION';
  category: 'AI_INTELLIGENCE' | 'TOKEN_USAGE' | 'TRADE_LOGIC' | 'UI_UX' | 'PERFORMANCE' | 'OTHER';
  message: string;
  context?: {
    gameState?: any;
    errorMessage?: string;
    userAction?: string;
  };
}

class FeedbackService {
  private feedbacks: UserFeedback[] = [];
  private maxFeedbacks = 50; // 최대 50개 피드백 유지

  /**
   * 피드백 기록
   */
  recordFeedback(feedback: Omit<UserFeedback, 'timestamp'>): void {
    const fullFeedback: UserFeedback = {
      ...feedback,
      timestamp: Date.now(),
    };

    this.feedbacks.push(fullFeedback);

    // 최대 기록 수 제한
    if (this.feedbacks.length > this.maxFeedbacks) {
      this.feedbacks.shift();
    }

    // 콘솔 로그 (개발 환경)
    if (process.env.NODE_ENV === 'development') {
      console.log('[Feedback]', {
        type: feedback.type,
        category: feedback.category,
        message: feedback.message.substring(0, 100),
      });
    }

    // 로컬 스토리지에 저장 (선택적)
    // [FIX] SafeStorage를 사용하여 스토리지 접근 실패 시 메모리 Fallback 제공
    try {
      const storedFeedbacks = safeGetJSON<UserFeedback[]>('user_feedbacks') || [];
      storedFeedbacks.push(fullFeedback);
      
      // 최대 100개만 저장
      const trimmed = storedFeedbacks.slice(-100);
      safeSetJSON('user_feedbacks', trimmed);
    } catch (e) {
      // 로컬 스토리지 오류는 무시
      console.warn('[Feedback] 저장 실패:', e);
    }
  }

  /**
   * 피드백 조회
   */
  getFeedbacks(filter?: {
    type?: UserFeedback['type'];
    category?: UserFeedback['category'];
  }): UserFeedback[] {
    let filtered = [...this.feedbacks];

    if (filter?.type) {
      filtered = filtered.filter(f => f.type === filter.type);
    }

    if (filter?.category) {
      filtered = filtered.filter(f => f.category === filter.category);
    }

    return filtered.sort((a, b) => b.timestamp - a.timestamp);
  }

  /**
   * 피드백 통계
   */
  getStats(): {
    total: number;
    byType: Record<UserFeedback['type'], number>;
    byCategory: Record<UserFeedback['category'], number>;
  } {
    const byType: Record<UserFeedback['type'], number> = {
      BUG: 0,
      SUGGESTION: 0,
      COMPLAINT: 0,
      PRAISE: 0,
      QUESTION: 0,
    };

    const byCategory: Record<UserFeedback['category'], number> = {
      AI_INTELLIGENCE: 0,
      TOKEN_USAGE: 0,
      TRADE_LOGIC: 0,
      UI_UX: 0,
      PERFORMANCE: 0,
      OTHER: 0,
    };

    this.feedbacks.forEach(feedback => {
      byType[feedback.type]++;
      byCategory[feedback.category]++;
    });

    return {
      total: this.feedbacks.length,
      byType,
      byCategory,
    };
  }

  /**
   * 피드백 내보내기 (JSON)
   */
  exportFeedbacks(): string {
    return JSON.stringify(this.feedbacks, null, 2);
  }

  /**
   * 피드백 초기화
   */
  clear(): void {
    this.feedbacks = [];
    try {
      // [FIX] SafeStorage를 사용하여 스토리지 접근 실패 시 메모리 Fallback 제공
      SafeStorage.removeItem('user_feedbacks');
    } catch (e) {
      // 무시
    }
  }
}

// 싱글톤 인스턴스
export const feedbackService = new FeedbackService();

/**
 * [HELPER] 간편 피드백 기록 함수
 */
export function recordFeedback(
  type: UserFeedback['type'],
  category: UserFeedback['category'],
  message: string,
  context?: UserFeedback['context']
): void {
  feedbackService.recordFeedback({
    type,
    category,
    message,
    context,
  });
}

