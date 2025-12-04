/**
 * [NEW] 데이터 로드 우선순위 로직
 * 게임 실행 시 로컬 vs 클라우드 중 더 최신 데이터를 로드
 */

import { StorageService, GameSaveData, getStorageService } from '../services/StorageService';
import { useAuth } from '../context/AuthContext';
import React from 'react';

/**
 * [NEW] 데이터 로드 결과
 */
export interface LoadResult {
  data: GameSaveData | null;
  source: 'local' | 'cloud' | 'none';
  error?: string;
}

/**
 * [NEW] DataLoader 함수
 * 게임 실행 시 데이터 로드 우선순위 처리
 * 
 * @param storageService StorageService 인스턴스
 * @param key 저장 키
 * @param isLoggedIn 로그인 상태
 * @returns 로드된 데이터 및 소스 정보
 */
export async function loadGameData(
  storageService: StorageService,
  key: string,
  isLoggedIn: boolean
): Promise<LoadResult> {
  try {
    // [NEW] 1. 유저가 로그인 상태인지 확인
    if (!isLoggedIn) {
      // [NEW] 비로그인 상태: 기존처럼 로컬 데이터 로드
      const localData = await storageService.load(key);
      return {
        data: localData,
        source: localData ? 'local' : 'none',
      };
    }

    // [NEW] 2. 로그인 상태: 클라우드에서 메타데이터(수정일) 조회
    const cloudMetadata = await storageService.getMetadata(key);
    const localData = await storageService.load(key);

    // [NEW] 3. 클라우드 메타데이터가 없으면 로컬 데이터 반환
    if (!cloudMetadata) {
      return {
        data: localData,
        source: localData ? 'local' : 'none',
      };
    }

    // [NEW] 4. 클라우드 데이터 로드
    const cloudData = await storageService.load(key);

    // [NEW] 5. 로컬 vs 클라우드 중 더 최신 데이터 선택
    if (localData && cloudData) {
      const localTime = localData.metadata?.lastModified || 0;
      const cloudTime = cloudData.metadata?.lastModified || 0;

      if (cloudTime > localTime) {
        // [NEW] 클라우드가 더 최신: 클라우드 데이터 반환
        return {
          data: cloudData,
          source: 'cloud',
        };
      } else {
        // [NEW] 로컬이 더 최신: 로컬 데이터 반환 (클라우드 동기화는 StorageService에서 처리)
        return {
          data: localData,
          source: 'local',
        };
      }
    } else if (cloudData) {
      // [NEW] 클라우드만 있으면 클라우드 데이터 반환
      return {
        data: cloudData,
        source: 'cloud',
      };
    } else if (localData) {
      // [NEW] 로컬만 있으면 로컬 데이터 반환
      return {
        data: localData,
        source: 'local',
      };
    }

    // [NEW] 둘 다 없으면 null 반환
    return {
      data: null,
      source: 'none',
    };
  } catch (error) {
    console.error('[DataLoader] 데이터 로드 오류:', error);
    return {
      data: null,
      source: 'none',
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    };
  }
}

/**
 * [NEW] React 훅 버전 DataLoader
 * 컴포넌트에서 사용하기 편한 훅 형태
 */
export function useGameDataLoader(key: string) {
  const { isLoggedIn, user } = useAuth();
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadResult, setLoadResult] = React.useState<LoadResult | null>(null);

  React.useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      try {
        // [FIX] 동적 import를 정적 import로 변경하여 Vite 경고 해결
        const storageService = getStorageService(user?.id);
        const result = await loadGameData(storageService, key, isLoggedIn);
        setLoadResult(result);
      } catch (error) {
        console.error('[useGameDataLoader] 데이터 로드 오류:', error);
        setLoadResult({
          data: null,
          source: 'none',
          error: error instanceof Error ? error.message : '알 수 없는 오류',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [key, isLoggedIn, user?.id]);

  return {
    isLoading,
    loadResult,
  };
}


