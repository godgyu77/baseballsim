/**
 * [NEW] Hybrid Storage System - 클라우드 동기화 가능한 저장 시스템
 * 로컬 데이터와 클라우드 데이터의 버전(Timestamp) 충돌 방지
 */

/**
 * [NEW] 저장된 데이터 메타데이터
 */
export interface SaveMetadata {
  lastModified: number; // 타임스탬프 (밀리초)
  version?: string; // 데이터 버전 (선택적)
  userId?: string; // 유저 ID (클라우드 동기화용)
  deviceId?: string; // 디바이스 ID (로컬 백업용)
}

/**
 * [NEW] 저장된 게임 데이터 구조
 */
export interface GameSaveData {
  messages: any[];
  gameState: any;
  facilities?: any;
  newsItems?: any[];
  readNewsCount?: number;
  selectedTeam?: any;
  pendingOptions?: any[];
  difficulty?: string;
  metadata: SaveMetadata; // [NEW] 메타데이터 추가
}

/**
 * [NEW] 저장소 전략 인터페이스
 */
export interface IStorageStrategy {
  /**
   * 데이터 저장
   * @param key 저장 키
   * @param data 저장할 데이터
   * @returns 저장 성공 여부
   */
  save(key: string, data: GameSaveData): Promise<boolean>;

  /**
   * 데이터 로드
   * @param key 저장 키
   * @returns 로드된 데이터 또는 null
   */
  load(key: string): Promise<GameSaveData | null>;

  /**
   * 메타데이터만 조회 (타임스탬프 비교용)
   * @param key 저장 키
   * @returns 메타데이터 또는 null
   */
  getMetadata(key: string): Promise<SaveMetadata | null>;

  /**
   * 데이터 삭제
   * @param key 저장 키
   * @returns 삭제 성공 여부
   */
  delete(key: string): Promise<boolean>;
}

/**
 * [NEW] 로컬 스토리지 전략 구현
 */
export class LocalStorageStrategy implements IStorageStrategy {
  /**
   * [NEW] 데이터 저장
   */
  async save(key: string, data: GameSaveData): Promise<boolean> {
    try {
      // [NEW] 메타데이터 업데이트
      const saveData: GameSaveData = {
        ...data,
        metadata: {
          ...data.metadata,
          lastModified: Date.now(),
        },
      };

      localStorage.setItem(key, JSON.stringify(saveData));
      return true;
    } catch (error) {
      console.error('[LocalStorageStrategy] 저장 오류:', error);
      return false;
    }
  }

  /**
   * [NEW] 데이터 로드
   */
  async load(key: string): Promise<GameSaveData | null> {
    try {
      const savedData = localStorage.getItem(key);
      if (!savedData) {
        return null;
      }

      const parsed = JSON.parse(savedData);
      
      // [NEW] 기존 데이터 호환성: 메타데이터가 없으면 생성
      if (!parsed.metadata) {
        parsed.metadata = {
          lastModified: Date.now(),
        };
      }

      return parsed as GameSaveData;
    } catch (error) {
      console.error('[LocalStorageStrategy] 로드 오류:', error);
      return null;
    }
  }

  /**
   * [NEW] 메타데이터만 조회
   */
  async getMetadata(key: string): Promise<SaveMetadata | null> {
    try {
      const savedData = localStorage.getItem(key);
      if (!savedData) {
        return null;
      }

      const parsed = JSON.parse(savedData);
      
      // [NEW] 메타데이터가 없으면 기본값 반환
      if (!parsed.metadata) {
        return {
          lastModified: Date.now(),
        };
      }

      return parsed.metadata as SaveMetadata;
    } catch (error) {
      console.error('[LocalStorageStrategy] 메타데이터 조회 오류:', error);
      return null;
    }
  }

  /**
   * [NEW] 데이터 삭제
   */
  async delete(key: string): Promise<boolean> {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('[LocalStorageStrategy] 삭제 오류:', error);
      return false;
    }
  }
}

/**
 * [NEW] 클라우드 스토리지 전략 스켈레톤 구현
 * 향후 Firebase/Supabase 연동을 위한 껍데기
 */
export class CloudStorageStrategy implements IStorageStrategy {
  private userId: string | null = null;

  constructor(userId?: string) {
    this.userId = userId || null;
  }

  /**
   * [NEW] 데이터 저장
   * [TODO] 이곳에 Firebase/API 연동 코드를 넣으세요
   */
  async save(key: string, data: GameSaveData): Promise<boolean> {
    try {
      if (!this.userId) {
        console.warn('[CloudStorageStrategy] 유저 ID가 없어 저장할 수 없습니다.');
        return false;
      }

      // [TODO] 이곳에 Firebase/API 연동 코드를 넣으세요
      // 예시:
      // const response = await fetch(`/api/save/${this.userId}/${key}`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // return response.ok;

      // [NEW] 현재는 스켈레톤이므로 항상 실패로 처리
      console.log('[CloudStorageStrategy] 저장 요청 (스켈레톤):', key);
      return false;
    } catch (error) {
      console.error('[CloudStorageStrategy] 저장 오류:', error);
      return false;
    }
  }

  /**
   * [NEW] 데이터 로드
   * [TODO] 이곳에 Firebase/API 연동 코드를 넣으세요
   */
  async load(key: string): Promise<GameSaveData | null> {
    try {
      if (!this.userId) {
        console.warn('[CloudStorageStrategy] 유저 ID가 없어 로드할 수 없습니다.');
        return null;
      }

      // [TODO] 이곳에 Firebase/API 연동 코드를 넣으세요
      // 예시:
      // const response = await fetch(`/api/load/${this.userId}/${key}`);
      // if (!response.ok) return null;
      // const data = await response.json();
      // return data as GameSaveData;

      // [NEW] 현재는 스켈레톤이므로 항상 null 반환
      console.log('[CloudStorageStrategy] 로드 요청 (스켈레톤):', key);
      return null;
    } catch (error) {
      console.error('[CloudStorageStrategy] 로드 오류:', error);
      return null;
    }
  }

  /**
   * [NEW] 메타데이터만 조회
   * [TODO] 이곳에 Firebase/API 연동 코드를 넣으세요
   */
  async getMetadata(key: string): Promise<SaveMetadata | null> {
    try {
      if (!this.userId) {
        console.warn('[CloudStorageStrategy] 유저 ID가 없어 메타데이터를 조회할 수 없습니다.');
        return null;
      }

      // [TODO] 이곳에 Firebase/API 연동 코드를 넣으세요
      // 예시:
      // const response = await fetch(`/api/metadata/${this.userId}/${key}`);
      // if (!response.ok) return null;
      // const metadata = await response.json();
      // return metadata as SaveMetadata;

      // [NEW] 현재는 스켈레톤이므로 항상 null 반환
      console.log('[CloudStorageStrategy] 메타데이터 조회 요청 (스켈레톤):', key);
      return null;
    } catch (error) {
      console.error('[CloudStorageStrategy] 메타데이터 조회 오류:', error);
      return null;
    }
  }

  /**
   * [NEW] 데이터 삭제
   * [TODO] 이곳에 Firebase/API 연동 코드를 넣으세요
   */
  async delete(key: string): Promise<boolean> {
    try {
      if (!this.userId) {
        console.warn('[CloudStorageStrategy] 유저 ID가 없어 삭제할 수 없습니다.');
        return false;
      }

      // [TODO] 이곳에 Firebase/API 연동 코드를 넣으세요
      // 예시:
      // const response = await fetch(`/api/delete/${this.userId}/${key}`, {
      //   method: 'DELETE',
      // });
      // return response.ok;

      // [NEW] 현재는 스켈레톤이므로 항상 실패로 처리
      console.log('[CloudStorageStrategy] 삭제 요청 (스켈레톤):', key);
      return false;
    } catch (error) {
      console.error('[CloudStorageStrategy] 삭제 오류:', error);
      return false;
    }
  }
}

/**
 * [NEW] 데이터 동기화 함수
 * 로컬 데이터와 클라우드 데이터의 타임스탬프를 비교해 더 최신 데이터로 덮어씌우는 로직
 * 
 * @param localData 로컬 데이터
 * @param cloudData 클라우드 데이터
 * @returns 동기화된 데이터 (더 최신 데이터)
 */
export function syncData(
  localData: GameSaveData | null,
  cloudData: GameSaveData | null
): {
  data: GameSaveData | null;
  source: 'local' | 'cloud' | 'none';
  needsSync: boolean; // 클라우드에 동기화가 필요한지 여부
} {
  // [NEW] 둘 다 없으면 null 반환
  if (!localData && !cloudData) {
    return {
      data: null,
      source: 'none',
      needsSync: false,
    };
  }

  // [NEW] 로컬만 있으면 로컬 반환 (클라우드 동기화 필요)
  if (localData && !cloudData) {
    return {
      data: localData,
      source: 'local',
      needsSync: true, // 클라우드에 동기화 필요
    };
  }

  // [NEW] 클라우드만 있으면 클라우드 반환
  if (!localData && cloudData) {
    return {
      data: cloudData,
      source: 'cloud',
      needsSync: false,
    };
  }

  // [NEW] 둘 다 있으면 타임스탬프 비교
  if (localData && cloudData) {
    const localTime = localData.metadata?.lastModified || 0;
    const cloudTime = cloudData.metadata?.lastModified || 0;

    if (localTime > cloudTime) {
      // [NEW] 로컬이 더 최신: 로컬 반환 (클라우드 동기화 필요)
      return {
        data: localData,
        source: 'local',
        needsSync: true,
      };
    } else if (cloudTime > localTime) {
      // [NEW] 클라우드가 더 최신: 클라우드 반환
      return {
        data: cloudData,
        source: 'cloud',
        needsSync: false,
      };
    } else {
      // [NEW] 타임스탬프가 같으면 로컬 우선 (기본값)
      return {
        data: localData,
        source: 'local',
        needsSync: false,
      };
    }
  }

  // [NEW] 예외 상황: null 반환
  return {
    data: null,
    source: 'none',
    needsSync: false,
  };
}

/**
 * [NEW] 하이브리드 저장소 서비스
 * 로컬과 클라우드 저장소를 통합 관리
 */
export class StorageService {
  private localStrategy: IStorageStrategy;
  private cloudStrategy: IStorageStrategy | null = null;
  private isLoggedIn: boolean = false;

  constructor(userId?: string) {
    this.localStrategy = new LocalStorageStrategy();
    
    // [NEW] 유저 ID가 있으면 클라우드 전략 초기화
    if (userId) {
      this.cloudStrategy = new CloudStorageStrategy(userId);
      this.isLoggedIn = true;
    }
  }

  /**
   * [NEW] 로그인 상태 업데이트
   */
  setLoginState(userId: string | null): void {
    this.isLoggedIn = !!userId;
    if (userId) {
      this.cloudStrategy = new CloudStorageStrategy(userId);
    } else {
      this.cloudStrategy = null;
    }
  }

  /**
   * [NEW] 데이터 저장 (하이브리드)
   * 로컬에 먼저 저장하고, 로그인 상태면 클라우드에도 저장
   */
  async save(key: string, data: GameSaveData): Promise<boolean> {
    // [NEW] 메타데이터 업데이트
    const saveData: GameSaveData = {
      ...data,
      metadata: {
        ...data.metadata,
        lastModified: Date.now(),
      },
    };

    // [NEW] Fail-Safe: 로컬에 먼저 저장 (항상 성공해야 함)
    const localSuccess = await this.localStrategy.save(key, saveData);
    
    if (!localSuccess) {
      console.error('[StorageService] 로컬 저장 실패');
      return false;
    }

    // [NEW] 로그인 상태면 클라우드에도 저장 시도
    if (this.isLoggedIn && this.cloudStrategy) {
      try {
        const cloudSuccess = await this.cloudStrategy.save(key, saveData);
        if (!cloudSuccess) {
          console.warn('[StorageService] 클라우드 저장 실패, 로컬 백업은 유지됨');
          // [NEW] 클라우드 저장 실패해도 로컬은 성공했으므로 true 반환
        }
      } catch (error) {
        console.error('[StorageService] 클라우드 저장 오류:', error);
        // [NEW] 클라우드 저장 실패 시 자동으로 로컬에 백업 저장 (이미 저장됨)
      }
    }

    return true;
  }

  /**
   * [NEW] 데이터 로드 (하이브리드)
   * 로그인 상태면 클라우드와 로컬을 비교하여 더 최신 데이터 로드
   */
  async load(key: string): Promise<GameSaveData | null> {
    // [NEW] 로그인 상태면 클라우드 메타데이터 조회
    if (this.isLoggedIn && this.cloudStrategy) {
      try {
        const localData = await this.localStrategy.load(key);
        const cloudMetadata = await this.cloudStrategy.getMetadata(key);

        // [NEW] 클라우드 메타데이터가 있으면 클라우드 데이터 로드
        if (cloudMetadata) {
          const cloudData = await this.cloudStrategy.load(key);
          
          // [NEW] 동기화 로직 적용
          const syncResult = syncData(localData, cloudData);
          
          // [NEW] 클라우드가 더 최신이면 로컬에 백업 저장
          if (syncResult.source === 'cloud' && syncResult.data) {
            await this.localStrategy.save(key, syncResult.data);
          }
          
          // [NEW] 로컬이 더 최신이면 클라우드에 동기화
          if (syncResult.needsSync && syncResult.data && this.cloudStrategy) {
            await this.cloudStrategy.save(key, syncResult.data);
          }

          return syncResult.data;
        }
      } catch (error) {
        console.error('[StorageService] 클라우드 로드 오류:', error);
        // [NEW] 클라우드 로드 실패 시 로컬 데이터로 폴백
      }
    }

    // [NEW] 비로그인 상태 또는 클라우드 로드 실패 시 로컬 데이터 로드
    return await this.localStrategy.load(key);
  }

  /**
   * [NEW] 데이터 삭제 (하이브리드)
   */
  async delete(key: string): Promise<boolean> {
    const localSuccess = await this.localStrategy.delete(key);
    
    if (this.isLoggedIn && this.cloudStrategy) {
      try {
        await this.cloudStrategy.delete(key);
      } catch (error) {
        console.error('[StorageService] 클라우드 삭제 오류:', error);
      }
    }

    return localSuccess;
  }

  /**
   * [NEW] 메타데이터 조회 (하이브리드)
   */
  async getMetadata(key: string): Promise<SaveMetadata | null> {
    if (this.isLoggedIn && this.cloudStrategy) {
      try {
        const cloudMetadata = await this.cloudStrategy.getMetadata(key);
        if (cloudMetadata) {
          return cloudMetadata;
        }
      } catch (error) {
        console.error('[StorageService] 클라우드 메타데이터 조회 오류:', error);
      }
    }

    return await this.localStrategy.getMetadata(key);
  }
}

/**
 * [NEW] 전역 StorageService 인스턴스 (싱글톤)
 */
let storageServiceInstance: StorageService | null = null;

/**
 * [NEW] StorageService 인스턴스 가져오기
 */
export function getStorageService(userId?: string): StorageService {
  if (!storageServiceInstance) {
    storageServiceInstance = new StorageService(userId);
  } else if (userId) {
    storageServiceInstance.setLoginState(userId);
  }
  
  return storageServiceInstance;
}

