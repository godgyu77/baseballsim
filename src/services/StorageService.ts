/**
 * 로컬 스토리지 기반 저장 시스템
 */

/**
 * [NEW] 저장된 데이터 메타데이터
 */
export interface SaveMetadata {
  lastModified: number; // 타임스탬프 (밀리초)
  version?: string; // 데이터 버전 (선택적)
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
 * [FIX] SafeStorage를 사용하여 스토리지 접근 실패 시 메모리 Fallback 제공
 */
import { SafeStorage, safeSetJSON, safeGetJSON } from '../lib/safeStorage';

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

      // [FIX] SafeStorage 사용 (메모리 Fallback 포함)
      return safeSetJSON(key, saveData);
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
      // [FIX] SafeStorage 사용 (메모리 Fallback 포함)
      const parsed = safeGetJSON<GameSaveData>(key);
      if (!parsed) {
        return null;
      }
      
      // [NEW] 기존 데이터 호환성: 메타데이터가 없으면 생성
      if (!parsed.metadata) {
        parsed.metadata = {
          lastModified: Date.now(),
        };
      }

      return parsed;
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
      // [FIX] SafeStorage 사용 (메모리 Fallback 포함)
      const parsed = safeGetJSON<GameSaveData>(key);
      if (!parsed) {
        return null;
      }
      
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
      // [FIX] SafeStorage 사용 (메모리 Fallback 포함)
      SafeStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('[LocalStorageStrategy] 삭제 오류:', error);
      return false;
    }
  }
}

/**
 * 로컬 스토리지 저장소 서비스
 */
export class StorageService {
  private localStrategy: IStorageStrategy;

  constructor() {
    this.localStrategy = new LocalStorageStrategy();
  }

  /**
   * 데이터 저장
   */
  async save(key: string, data: GameSaveData): Promise<boolean> {
    // 메타데이터 업데이트
    const saveData: GameSaveData = {
      ...data,
      metadata: {
        ...data.metadata,
        lastModified: Date.now(),
      },
    };

    return await this.localStrategy.save(key, saveData);
  }

  /**
   * 데이터 로드
   */
  async load(key: string): Promise<GameSaveData | null> {
    return await this.localStrategy.load(key);
  }

  /**
   * 데이터 삭제
   */
  async delete(key: string): Promise<boolean> {
    return await this.localStrategy.delete(key);
  }

  /**
   * 메타데이터 조회
   */
  async getMetadata(key: string): Promise<SaveMetadata | null> {
    return await this.localStrategy.getMetadata(key);
  }
}

/**
 * 전역 StorageService 인스턴스 (싱글톤)
 */
let storageServiceInstance: StorageService | null = null;

/**
 * StorageService 인스턴스 가져오기
 */
export function getStorageService(): StorageService {
  if (!storageServiceInstance) {
    storageServiceInstance = new StorageService();
  }
  
  return storageServiceInstance;
}

