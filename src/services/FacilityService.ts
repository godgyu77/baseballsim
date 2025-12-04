/**
 * [FIX] 시설 업그레이드 및 비용 처리
 * 실제 유저 자금(Budget) 상태를 업데이트하여 UI에 즉시 반영
 */

import { FacilityType, FacilityState } from '../lib/utils';
import { FACILITY_DEFINITIONS } from '../constants/Facilities';

/**
 * [FIX] 시설 업그레이드 결과
 */
export interface UpgradeResult {
  success: boolean;
  newLevel: number;
  cost: number;
  error?: string;
}

/**
 * [FIX] 시설 서비스 클래스
 */
export class FacilityService {
  /**
   * [FIX] 시설 업그레이드 함수
   * 비용 차감 로직이 실제 유저 자금(Budget) 상태를 업데이트
   * 
   * @param type 시설 타입
   * @param currentLevel 현재 레벨
   * @param currentBudget 현재 자금
   * @param onBudgetUpdate 자금 업데이트 콜백 함수 (UI에 즉시 반영)
   * @returns 업그레이드 결과
   */
  upgradeFacility(
    type: FacilityType,
    currentLevel: number,
    currentBudget: number | null,
    onBudgetUpdate: (newBudget: number) => void
  ): UpgradeResult {
    // [FIX] 시설 정의 찾기
    const definition = FACILITY_DEFINITIONS.find((f) => f.type === type);
    
    if (!definition) {
      return {
        success: false,
        newLevel: currentLevel,
        cost: 0,
        error: `시설 정의를 찾을 수 없습니다: ${type}`,
      };
    }

    // [FIX] 최대 레벨 체크
    if (currentLevel >= definition.maxLevel) {
      return {
        success: false,
        newLevel: currentLevel,
        cost: 0,
        error: `이미 최대 레벨입니다: ${type} (Lv.${currentLevel})`,
      };
    }

    // [FIX] 업그레이드 비용 계산
    const upgradeCost = definition.upgradeCost(currentLevel);

    // [FIX] 자금 정보 확인
    if (currentBudget === null) {
      return {
        success: false,
        newLevel: currentLevel,
        cost: upgradeCost,
        error: '자금 정보가 없습니다.',
      };
    }

    // [FIX] Negative Check: 자금이 부족하면 실패
    if (currentBudget < upgradeCost) {
      return {
        success: false,
        newLevel: currentLevel,
        cost: upgradeCost,
        error: `자금이 부족합니다. 필요: ${(upgradeCost / 100000000).toFixed(1)}억 원, 보유: ${(currentBudget / 100000000).toFixed(1)}억 원`,
      };
    }

    // [FIX] 실제 유저 자금(Budget) 상태 업데이트
    const newBudget = currentBudget - upgradeCost;
    onBudgetUpdate(newBudget); // [FIX] UI에 즉시 반영

    console.log(
      `[FacilityService] 시설 업그레이드 성공: ${definition.name} ` +
      `Lv.${currentLevel} → Lv.${currentLevel + 1} ` +
      `(비용: ${(upgradeCost / 100000000).toFixed(1)}억 원, ` +
      `잔액: ${(newBudget / 100000000).toFixed(1)}억 원)`
    );

    return {
      success: true,
      newLevel: currentLevel + 1,
      cost: upgradeCost,
    };
  }

  /**
   * [FIX] 업그레이드 가능 여부 확인
   * 
   * @param type 시설 타입
   * @param currentLevel 현재 레벨
   * @param currentBudget 현재 자금
   * @returns 업그레이드 가능 여부
   */
  canUpgrade(
    type: FacilityType,
    currentLevel: number,
    currentBudget: number | null
  ): boolean {
    const definition = FACILITY_DEFINITIONS.find((f) => f.type === type);
    
    if (!definition) {
      return false;
    }

    if (currentLevel >= definition.maxLevel) {
      return false;
    }

    if (currentBudget === null) {
      return false;
    }

    const upgradeCost = definition.upgradeCost(currentLevel);
    return currentBudget >= upgradeCost;
  }

  /**
   * [FIX] 업그레이드 비용 조회
   * 
   * @param type 시설 타입
   * @param currentLevel 현재 레벨
   * @returns 업그레이드 비용
   */
  getUpgradeCost(type: FacilityType, currentLevel: number): number {
    const definition = FACILITY_DEFINITIONS.find((f) => f.type === type);
    
    if (!definition) {
      return 0;
    }

    if (currentLevel >= definition.maxLevel) {
      return 0;
    }

    return definition.upgradeCost(currentLevel);
  }
}

/**
 * [FIX] 전역 FacilityService 인스턴스 (싱글톤)
 */
let facilityServiceInstance: FacilityService | null = null;

/**
 * [FIX] FacilityService 인스턴스 가져오기
 */
export function getFacilityService(): FacilityService {
  if (!facilityServiceInstance) {
    facilityServiceInstance = new FacilityService();
  }
  return facilityServiceInstance;
}

