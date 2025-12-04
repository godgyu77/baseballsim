/**
 * [UPDATE] 난이도 밸런싱 - 난이도 세분화 및 부상 확률 조정
 * HARD 난이도 추가 및 부상 확률 조정
 */

import { Difficulty } from './GameConfig';

/**
 * [UPDATE] Difficulty Enum에 HARD 추가
 */
export type ExtendedDifficulty = Difficulty | 'HARD';

/**
 * [UPDATE] 난이도별 부상 확률 상수 (난이도별 객체로 분리)
 * Hell 모드의 확률을 60~70% 수준으로 낮추고, Hard 모드는 Normal과 Hell의 중간값으로 설정
 */
export interface InjuryProbabilityConfig {
  baseProbability: number; // 기본 부상 확률 (0.0 ~ 1.0)
  multiplier: number; // 부상 빈도 배율 (1.0 = 정상, 2.0 = 2배)
  monthlyInjuryLimit: number; // 월별 최대 부상자 수
}

export const INJURY_PROBABILITY: Record<Difficulty | 'HARD', InjuryProbabilityConfig> = {
  EASY: {
    baseProbability: 0.0, // [UPDATE] 부상 없음
    multiplier: 0.0,
    monthlyInjuryLimit: 0,
  },
  NORMAL: {
    baseProbability: 0.15, // [UPDATE] 기본 부상 확률 15%
    multiplier: 1.0, // 정상 빈도
    monthlyInjuryLimit: 2, // 월 최대 2명
  },
  HARD: {
    baseProbability: 0.25, // [UPDATE] Hard 모드: Normal과 Hell의 중간값
    multiplier: 1.5, // [UPDATE] 부상 빈도 1.5배 (Normal과 Hell의 중간)
    monthlyInjuryLimit: 3, // 월 최대 3명
  },
  HELL: {
    baseProbability: 0.35, // [UPDATE] Hell 모드: 60~70% 수준으로 낮춤 (기존 2배에서 조정)
    multiplier: 2.0, // [UPDATE] 부상 빈도 2배 (기존 유지)
    monthlyInjuryLimit: 4, // [UPDATE] 월 최대 4명 (기존 3-4명에서 조정)
  },
};

/**
 * [UPDATE] 난이도별 부상 확률 조회
 * 
 * @param difficulty 난이도
 * @returns 부상 확률 설정
 */
export function getInjuryProbability(
  difficulty: Difficulty | 'HARD'
): InjuryProbabilityConfig {
  return INJURY_PROBABILITY[difficulty] || INJURY_PROBABILITY.NORMAL;
}

/**
 * [UPDATE] 부상 발생 여부 계산
 * 
 * @param difficulty 난이도
 * @param playerAge 선수 나이 (나이가 많을수록 부상 확률 증가)
 * @param playerStats 선수 스탯 (낮을수록 부상 확률 증가)
 * @returns 부상 발생 여부
 */
export function calculateInjuryChance(
  difficulty: Difficulty | 'HARD',
  playerAge: number = 30,
  playerStats: number = 50
): boolean {
  const config = getInjuryProbability(difficulty);
  
  // [UPDATE] 기본 확률에 나이 및 스탯 보정 적용
  let adjustedProbability = config.baseProbability;
  
  // 나이 보정 (30세 이상: +0.05, 35세 이상: +0.10)
  if (playerAge >= 35) {
    adjustedProbability += 0.10;
  } else if (playerAge >= 30) {
    adjustedProbability += 0.05;
  }
  
  // 스탯 보정 (낮은 스탯: +0.05)
  if (playerStats < 40) {
    adjustedProbability += 0.05;
  }
  
  // 배율 적용
  adjustedProbability *= config.multiplier;
  
  // 최대 1.0으로 제한
  adjustedProbability = Math.min(1.0, adjustedProbability);
  
  // 랜덤 발생 여부 결정
  return Math.random() < adjustedProbability;
}

