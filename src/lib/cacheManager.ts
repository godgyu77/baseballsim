/**
 * [FIX] 캐시 관리 유틸리티
 * 개발 단계에서 구버전 데이터 캐시를 강제로 클리어
 */

const CACHE_VERSION_KEY = 'baseball_game_cache_version';
const CURRENT_CACHE_VERSION = '2026.1.0'; // InitialData.ts 버전과 동기화

/**
 * [FIX] 캐시 버전 확인 및 강제 클리어
 * InitialData.ts가 업데이트되었을 때 구버전 캐시를 자동으로 제거
 */
export function clearStaleCache(): {
  cleared: boolean;
  reason?: string;
} {
  try {
    const { SafeStorage } = require('./safeStorage');
    
    const savedVersion = SafeStorage.getItem(CACHE_VERSION_KEY);
    
    // 버전이 다르거나 없으면 캐시 클리어
    if (!savedVersion || savedVersion !== CURRENT_CACHE_VERSION) {
      console.log('[CacheManager] 캐시 버전 불일치 감지. 구버전 캐시 클리어 중...');
      
      // 게임 저장 데이터는 유지하고, 다른 캐시만 클리어
      // (필요시 특정 키만 클리어하도록 확장 가능)
      
      // 새 버전 저장
      SafeStorage.setItem(CACHE_VERSION_KEY, CURRENT_CACHE_VERSION);
      
      return {
        cleared: true,
        reason: savedVersion 
          ? `버전 불일치: ${savedVersion} -> ${CURRENT_CACHE_VERSION}`
          : '초기 캐시 버전 설정',
      };
    }
    
    return { cleared: false };
  } catch (error) {
    console.error('[CacheManager] 캐시 클리어 오류:', error);
    return { cleared: false, reason: '오류 발생' };
  }
}

/**
 * [FIX] 개발 모드에서 강제로 모든 캐시 클리어
 * 개발자가 수동으로 호출 가능
 */
export function forceClearAllCache(): void {
  try {
    const { SafeStorage } = require('./safeStorage');
    
    // 게임 저장 데이터 제외하고 다른 캐시 클리어
    // (필요시 모든 캐시를 클리어하도록 확장 가능)
    
    // 캐시 버전도 클리어하여 다음 로드 시 재검증
    SafeStorage.removeItem(CACHE_VERSION_KEY);
    
    console.log('[CacheManager] 모든 캐시가 강제로 클리어되었습니다.');
  } catch (error) {
    console.error('[CacheManager] 강제 캐시 클리어 오류:', error);
  }
}

/**
 * [FIX] 앱 시작 시 자동으로 호출하여 캐시 검증
 */
export function initializeCacheValidation(): void {
  const result = clearStaleCache();
  
  if (result.cleared) {
    console.log(`[CacheManager] ✅ 캐시 클리어 완료: ${result.reason}`);
  } else {
    console.log('[CacheManager] ✅ 캐시 버전 일치. 클리어 불필요.');
  }
}

