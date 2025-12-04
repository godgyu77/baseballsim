/**
 * 선수 은퇴 심사 결과 타입 정의
 * KBO 리그 레전드 심사와 구단 영구결번 심사는 완전히 독립적인 프로세스입니다.
 */
export interface RetirementResult {
  playerName: string;
  teamId: string; // 소속 구단 (한화, 삼성 등)
  statsSummary: string; // 통산 기록 요약

  // [Track A] KBO 리그 레전드 심사 (전체 팬 투표)
  leagueLegendVote: {
    score: number;        // 100점 만점
    rankPrediction: string; // "역대 15위권 예상" 등
    isInducted: boolean;  // 헌액 여부
    comment: string;      // "국가대표 에이스로서의 위엄..."
  };

  // [Track B] 구단 영구결번 심사 (해당 팀 팬 투표)
  teamRetiredNumberVote: {
    score: number;        // 100점 만점
    isRetired: boolean;   // 영구결번 확정 여부
    teamName: string;     // 심사한 구단명
    comment: string;      // "이글스의 영원한 4번타자..."
  };
}

