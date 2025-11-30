export type Difficulty = 'EASY' | 'NORMAL' | 'HELL';

export interface DifficultyConfig {
  initialBudget: number; // 초기 자금 (억 단위)
  squadSalaryCap: number; // 선수단 샐러리캡 (억 단위)
  mercenarySalaryCap: number; // 용병 샐러리캡 (억 단위)
  incomeMultiplier: number; // 수입 배율
  isHardCap: boolean; // 하드 캡 여부 (true: 초과 시 진행 불가, false: 사치세 적용)
  expenseMultiplier?: number; // 지출 배율 (헬 모드용)
}

export const GAME_CONFIG: Record<Difficulty, DifficultyConfig> = {
  EASY: {
    initialBudget: 80.0, // 프롬프트: 80억
    squadSalaryCap: 250.0, // 프롬프트: 250억 (사실상 무제한)
    mercenarySalaryCap: 999.0, // 프롬프트: 무제한
    incomeMultiplier: 1.5, // 프롬프트: 1.5배(150%) 보너스
    isHardCap: false, // 소프트 캡 (사치세 적용)
  },
  NORMAL: {
    initialBudget: 30.0, // 프롬프트: 30억
    squadSalaryCap: 137.0, // 프롬프트: 137억 (KBO 규정 준수)
    mercenarySalaryCap: 55.0, // 프롬프트: 55억
    incomeMultiplier: 1.0, // 프롬프트: 1.0배 (정배율)
    isHardCap: false, // 소프트 캡 (사치세 50% 적용)
  },
  HELL: {
    initialBudget: 10.0, // 프롬프트: 10억
    squadSalaryCap: 100.0, // 프롬프트: 100억 (하드 캡)
    mercenarySalaryCap: 40.0, // 프롬프트: 40억
    incomeMultiplier: 0.8, // 프롬프트: 0.8배(80%) 감소
    expenseMultiplier: 1.2, // 프롬프트: 지출 1.2배 증가
    isHardCap: true, // 하드 캡 (초과 시 진행 불가)
  },
};

/**
 * 난이도에 따른 초기 자금 반환 (원 단위)
 */
export function getInitialBudget(difficulty: Difficulty): number {
  return GAME_CONFIG[difficulty].initialBudget * 100000000;
}

/**
 * 난이도에 따른 선수단 샐러리캡 반환 (억 단위)
 */
export function getSquadSalaryCap(difficulty: Difficulty): number {
  return GAME_CONFIG[difficulty].squadSalaryCap;
}

/**
 * 난이도에 따른 용병 샐러리캡 반환 (억 단위)
 */
export function getMercenarySalaryCap(difficulty: Difficulty): number {
  return GAME_CONFIG[difficulty].mercenarySalaryCap;
}

/**
 * 난이도에 따른 수입 배율 적용
 */
export function applyIncomeMultiplier(amount: number, difficulty: Difficulty): number {
  return amount * GAME_CONFIG[difficulty].incomeMultiplier;
}

