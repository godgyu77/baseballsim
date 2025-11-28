export type Difficulty = 'EASY' | 'HARD';

export interface DifficultyConfig {
  initialBudget: number; // 초기 자금 (억 단위)
  squadSalaryCap: number; // 선수단 샐러리캡 (억 단위)
  mercenarySalaryCap: number; // 용병 샐러리캡 (억 단위)
  incomeMultiplier: number; // 수입 배율
  isHardCap: boolean; // 하드 캡 여부 (true: 초과 시 진행 불가, false: 사치세 적용)
}

export const GAME_CONFIG: Record<Difficulty, DifficultyConfig> = {
  EASY: {
    initialBudget: 50.0,
    squadSalaryCap: 200.0,
    mercenarySalaryCap: 60.0,
    incomeMultiplier: 1.2,
    isHardCap: false, // 소프트 캡 (사치세 적용)
  },
  HARD: {
    initialBudget: 20.0,
    squadSalaryCap: 137.0,
    mercenarySalaryCap: 40.0,
    incomeMultiplier: 1.0,
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

