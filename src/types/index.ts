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

/**
 * 게임 상태 타입 정의
 * game_state 테이블과 매핑됨
 */
export interface GameState {
  id?: number;
  user_id: string;
  my_team_id: number;
  difficulty: 'EASY' | 'NORMAL' | 'HARD' | 'HELL';
  owner_persona?: string;
  current_year: number;
  current_month: number;
  current_week: number;
  budget: number;  // 게임 보유 자금 (원 단위) - 필수 필드
  created_at?: string;
  updated_at?: string;
}

/**
 * 게임 선수 타입 정의
 * game_players 테이블과 매핑됨 (유저별 선수 인스턴스)
 */
export interface GamePlayer {
  id?: number;
  user_id: string;
  team_id: number;
  player_id: number;  // players 테이블의 마스터 데이터 참조
  game_id?: number;   // game_state.id (선택적)
  stats: {
    // 투수 스탯
    velocity?: string | number;  // 구속 (km 또는 범위 문자열)
    stuff?: number;             // 구위 (20-80)
    movement?: number;           // 무브먼트 (20-80)
    control?: number;            // 제구 (20-80)
    stamina?: number;            // 체력 (20-80)
    // 타자 스탯
    contact?: number;            // 컨택 (20-80)
    gap?: number;                // 갭파워 (20-80)
    gapPower?: number;           // 갭파워 (별칭)
    power?: number;              // 파워 (20-80)
    eye?: number;                // 선구안 (20-80)
    run?: number;                // 주루 (20-80)
    running?: number;            // 주루 (별칭)
    field?: number;              // 수비 (20-80)
    defense?: number;            // 수비 (별칭)
  };
  salary: number;      // 현재 연봉 (원 단위)
  condition: string;   // 컨디션 (건강, 경미한 부상, 중상 등)
  role?: string;      // 현재 역할 (1군, 2군, 선발, 마무리 등)
  created_at?: string;
  updated_at?: string;
}

/**
 * 마스터 선수 타입 정의
 * players 테이블과 매핑됨 (정적 마스터 데이터)
 */
export interface MasterPlayer {
  id: number;
  team_id: number;
  name: string;
  age: number;
  position: string;
  role?: string;
  stats: GamePlayer['stats'];  // 동일한 스탯 구조
  salary: number;
  condition: string;
  hand?: string;
  note?: string;
}

