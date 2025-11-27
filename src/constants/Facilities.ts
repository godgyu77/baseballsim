import { Facility, FacilityState } from '../lib/utils';

/**
 * 시설 업그레이드 비용 계산 함수
 */
const calculateUpgradeCost = (baseCost: number, level: number): number => {
  // 레벨이 올라갈수록 비용 증가 (지수적)
  return Math.floor(baseCost * Math.pow(1.5, level - 1));
};

/**
 * 시설 데이터 정의
 */
export const FACILITY_DEFINITIONS: Facility[] = [
  {
    type: 'training',
    name: '훈련장',
    level: 1,
    maxLevel: 5,
    upgradeCost: (level) => calculateUpgradeCost(1000000000, level), // 10억부터 시작
    effect: (level) => ({
      description: `선수 경험치 획득량 +${level * 10}%`,
      value: level * 10,
    }),
  },
  {
    type: 'medical',
    name: '메디컬 센터',
    level: 1,
    maxLevel: 5,
    upgradeCost: (level) => calculateUpgradeCost(1000000000, level),
    effect: (level) => ({
      description: `부상 확률 -${level * 5}%, 회복 속도 +${level * 10}%`,
      value: level * 5,
    }),
  },
  {
    type: 'marketing',
    name: '마케팅 팀',
    level: 1,
    maxLevel: 5,
    upgradeCost: (level) => calculateUpgradeCost(1000000000, level),
    effect: (level) => ({
      description: `경기당 수익 +${level * 5}%, 후원금 +${level * 3}%`,
      value: level * 5,
    }),
  },
  {
    type: 'scouting',
    name: '스카우트 팀',
    level: 1,
    maxLevel: 5,
    upgradeCost: (level) => calculateUpgradeCost(1000000000, level),
    effect: (level) => ({
      description: `높은 등급 선수 발견 확률 +${level * 8}%`,
      value: level * 8,
    }),
  },
];

/**
 * 초기 시설 상태 생성
 */
export function createInitialFacilityState(): FacilityState {
  return {
    training: { ...FACILITY_DEFINITIONS[0] },
    medical: { ...FACILITY_DEFINITIONS[1] },
    marketing: { ...FACILITY_DEFINITIONS[2] },
    scouting: { ...FACILITY_DEFINITIONS[3] },
  };
}

