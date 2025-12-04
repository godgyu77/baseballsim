export type Difficulty = 'EASY' | 'NORMAL' | 'HARD' | 'HELL'; // [UPDATE] HARD 난이도 추가

export interface DifficultyConfig {
  initialBudget: number; // 초기 자금 (억 단위)
  squadSalaryCap: number; // 선수단 샐러리캡 (억 단위) - 한국인 선수만 포함
  mercenarySalaryCap: number; // 용병 샐러리캡 (억 단위) - 외국인 용병만 포함
  asianQuarterSalaryCap: number; // 아시아 쿼터 샐러리캡 (억 단위) - 아시아 쿼터 선수만 포함
  incomeMultiplier: number; // 수입 배율
  isHardCap: boolean; // 하드 캡 여부 (true: 초과 시 진행 불가, false: 사치세 적용)
  expenseMultiplier?: number; // 지출 배율 (헬 모드용)
}

export const GAME_CONFIG: Record<Difficulty, DifficultyConfig> = {
  EASY: {
    initialBudget: 80.0, // 프롬프트: 80억
    squadSalaryCap: 250.0, // 프롬프트: 250억 (사실상 무제한) - 한국인 선수만
    mercenarySalaryCap: 999.0, // 프롬프트: 무제한 - 외국인 용병만
    asianQuarterSalaryCap: 999.0, // 프롬프트: 무제한 - 아시아 쿼터만
    incomeMultiplier: 1.5, // 프롬프트: 1.5배(150%) 보너스
    isHardCap: false, // 소프트 캡 (사치세 적용)
  },
  NORMAL: {
    initialBudget: 30.0, // 프롬프트: 30억
    squadSalaryCap: 137.0, // 프롬프트: 137억 (KBO 규정 준수) - 한국인 선수만
    mercenarySalaryCap: 55.0, // 프롬프트: 55억 - 외국인 용병만
    asianQuarterSalaryCap: 3.0, // 프롬프트: 3.0억 원 - 아시아 쿼터만
    incomeMultiplier: 1.0, // 프롬프트: 1.0배 (정배율)
    isHardCap: false, // 소프트 캡 (사치세 50% 적용)
  },
  HARD: {
    // [UPDATE] HARD 모드: Normal과 Hell의 중간값
    initialBudget: 20.0, // 프롬프트: 20억 (Normal 30억과 Hell 10억의 중간)
    squadSalaryCap: 120.0, // 프롬프트: 120억 (Normal 137억과 Hell 100억의 중간) - 한국인 선수만
    mercenarySalaryCap: 47.5, // 프롬프트: 47.5억 (Normal 55억과 Hell 40억의 중간) - 외국인 용병만
    asianQuarterSalaryCap: 2.5, // 프롬프트: 2.5억 원 (Normal 3.0억과 Hell 2.0억의 중간) - 아시아 쿼터만
    incomeMultiplier: 0.9, // 프롬프트: 0.9배(90%) (Normal 1.0배와 Hell 0.8배의 중간)
    expenseMultiplier: 1.1, // 프롬프트: 지출 1.1배 증가 (Hell 1.2배보다 낮음)
    isHardCap: false, // 소프트 캡 (사치세 적용)
  },
  HELL: {
    initialBudget: 10.0, // 프롬프트: 10억
    squadSalaryCap: 100.0, // 프롬프트: 100억 (하드 캡) - 한국인 선수만
    mercenarySalaryCap: 40.0, // 프롬프트: 40억 - 외국인 용병만
    asianQuarterSalaryCap: 2.0, // 프롬프트: 2.0억 원 - 아시아 쿼터만
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
 * 난이도에 따른 아시아 쿼터 샐러리캡 반환 (억 단위)
 */
export function getAsianQuarterSalaryCap(difficulty: Difficulty): number {
  return GAME_CONFIG[difficulty].asianQuarterSalaryCap;
}

/**
 * 난이도에 따른 수입 배율 적용
 */
export function applyIncomeMultiplier(amount: number, difficulty: Difficulty): number {
  return amount * GAME_CONFIG[difficulty].incomeMultiplier;
}

