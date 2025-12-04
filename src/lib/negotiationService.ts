/**
 * [UPDATE] 연봉 협상 알고리즘 개선
 * 성적 기반 계수 강화 및 협상 실패 로직 개선
 */

export interface Player {
  id?: string;
  name: string;
  currentSalary: number; // 현재 연봉 (원 단위)
  war?: number; // WAR (Wins Above Replacement)
  age?: number;
  stats?: {
    overall?: number;
    [key: string]: any;
  };
  performance?: {
    grade?: 'S' | 'A' | 'B' | 'C' | 'D'; // 성적 등급
    [key: string]: any;
  };
  [key: string]: any;
}

export interface NegotiationState {
  playerId: string;
  attemptCount: number; // [UPDATE] 협상 시도 횟수
  lastOffer?: number; // 마지막 제안 금액
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'REVIEW_REQUESTED'; // [UPDATE] Soft Fail 추가
}

const MIN_SALARY = 30000000; // 최소 연봉 0.3억 원 (원 단위)
const MAX_NEGOTIATION_ATTEMPTS = 3; // [UPDATE] 최소 3회의 제안 기회 보장

/**
 * [UPDATE] 성적 기반 계수(Performance Factor) 강화
 * WAR 음수인 경우 요구 금액이 동결 또는 삭감되도록 로직 수정
 * 
 * @param player 선수 정보
 * @param baseDemand 기본 요구 금액
 * @returns 성적 보정된 요구 금액
 */
export function calculateSalaryDemand(
  player: Player,
  baseDemand: number
): number {
  if (!player || baseDemand <= 0) {
    return Math.max(MIN_SALARY, baseDemand);
  }

  let adjustedDemand = baseDemand;
  const currentSalary = player.currentSalary || MIN_SALARY;
  const war = player.war ?? 0;

  // [UPDATE] 성적 기반 계수 강화
  // WAR가 음수인 경우 요구 금액이 동결 또는 삭감(-10%~-20%)
  if (war < 0) {
    // [UPDATE] WAR 음수: 삭감 적용 (-10% ~ -20%)
    const reductionRate = Math.max(0.10, Math.min(0.20, Math.abs(war) / 10));
    adjustedDemand = currentSalary * (1 - reductionRate);
    
    console.log(
      `[NegotiationService] 성적 부진 선수 연봉 삭감: ${player.name} ` +
      `(WAR: ${war.toFixed(2)}, 삭감률: ${(reductionRate * 100).toFixed(1)}%)`
    );
  } else if (war === 0) {
    // [UPDATE] WAR 0: 동결 (현재 연봉 유지)
    adjustedDemand = currentSalary;
    
    console.log(
      `[NegotiationService] 성적 평균 선수 연봉 동결: ${player.name} (WAR: 0)`
    );
  } else if (war > 0) {
    // [UPDATE] WAR 양수: 인상 (기존 로직 유지)
    const performanceFactor = Math.min(2.0, 1 + (war / 5)); // WAR 5당 100% 인상 (최대 2배)
    adjustedDemand = currentSalary * performanceFactor;
  }

  // [UPDATE] Math Safety: 음수가 나오지 않도록 처리
  adjustedDemand = Math.max(MIN_SALARY, adjustedDemand);

  // 소수점 처리 (0.1억 단위로 반올림)
  adjustedDemand = Math.round(adjustedDemand / 10000000) * 10000000;

  return adjustedDemand;
}

/**
 * [UPDATE] 협상 실패 로직 개선
 * 즉시 결렬되기 전 최소 3회의 제안 기회를 보장하는 attemptCount 체크 추가
 * 
 * @param negotiationState 협상 상태
 * @param playerOffer 사용자 제안 금액
 * @param playerDemand 선수 요구 금액
 * @param tolerance 허용 오차 (기본값: 0.1 = 10%)
 * @returns 협상 결과
 */
export function processNegotiation(
  negotiationState: NegotiationState,
  playerOffer: number,
  playerDemand: number,
  tolerance: number = 0.1
): {
  success: boolean;
  status: NegotiationState['status'];
  message: string;
  nextAttempt?: number;
} {
  if (!negotiationState || negotiationState.attemptCount < 0) {
    return {
      success: false,
      status: 'REJECTED',
      message: '협상 상태가 유효하지 않습니다.',
    };
  }

  const attemptCount = negotiationState.attemptCount + 1;
  const difference = Math.abs(playerOffer - playerDemand);
  const differenceRate = difference / playerDemand;

  // [UPDATE] 최소 3회의 제안 기회 보장
  if (attemptCount < MAX_NEGOTIATION_ATTEMPTS) {
    // [UPDATE] 허용 오차 내에 있으면 수락
    if (differenceRate <= tolerance) {
      return {
        success: true,
        status: 'ACCEPTED',
        message: `협상 성공! ${playerOffer.toLocaleString('ko-KR')}원에 계약했습니다.`,
      };
    }

    // [UPDATE] 아직 시도 횟수가 부족하면 계속 협상
    return {
      success: false,
      status: 'PENDING',
      message: `제안이 거절되었습니다. (시도 ${attemptCount}/${MAX_NEGOTIATION_ATTEMPTS}) ` +
        `요구 금액과의 차이: ${(differenceRate * 100).toFixed(1)}%`,
      nextAttempt: attemptCount,
    };
  }

  // [UPDATE] 최대 시도 횟수 도달 시 Soft Fail 처리
  // 무조건 'FA 미아'가 되는 것이 아니라, '구단 재검토 요청' 상태로 돌아가는 확률 추가
  const softFailChance = 0.3; // 30% 확률로 재검토 요청
  const shouldSoftFail = Math.random() < softFailChance;

  if (shouldSoftFail) {
    // [UPDATE] Soft Fail: 구단 재검토 요청
    return {
      success: false,
      status: 'REVIEW_REQUESTED',
      message: `협상이 결렬되었지만, 선수가 구단 재검토를 요청했습니다. ` +
        `다시 협상할 기회가 있습니다.`,
      nextAttempt: attemptCount,
    };
  }

  // [UPDATE] Hard Fail: 완전 결렬
  return {
    success: false,
    status: 'REJECTED',
    message: `협상이 결렬되었습니다. 선수가 FA 시장에 나갑니다.`,
  };
}

/**
 * [UPDATE] 협상 상태 초기화
 * 
 * @param playerId 선수 ID
 * @returns 초기 협상 상태
 */
export function createNegotiationState(playerId: string): NegotiationState {
  return {
    playerId,
    attemptCount: 0,
    status: 'PENDING',
  };
}

/**
 * [UPDATE] 협상 제안 검증
 * 
 * @param offer 제안 금액
 * @param minSalary 최소 연봉
 * @param maxSalary 최대 연봉 (예산 한도)
 * @returns 검증 결과
 */
export function validateNegotiationOffer(
  offer: number,
  minSalary: number = MIN_SALARY,
  maxSalary?: number
): {
  isValid: boolean;
  error?: string;
  adjustedOffer?: number;
} {
  // [UPDATE] Math Safety: 음수 체크
  if (offer < 0) {
    return {
      isValid: false,
      error: '연봉은 음수가 될 수 없습니다.',
      adjustedOffer: minSalary,
    };
  }

  // [UPDATE] 최소 연봉 체크
  if (offer < minSalary) {
    return {
      isValid: false,
      error: `최소 연봉(${(minSalary / 100000000).toFixed(1)}억 원) 이상이어야 합니다.`,
      adjustedOffer: minSalary,
    };
  }

  // [UPDATE] 최대 연봉 체크 (예산 한도)
  if (maxSalary && offer > maxSalary) {
    return {
      isValid: false,
      error: `예산 한도(${(maxSalary / 100000000).toFixed(1)}억 원)를 초과했습니다.`,
      adjustedOffer: maxSalary,
    };
  }

  return {
    isValid: true,
  };
}

