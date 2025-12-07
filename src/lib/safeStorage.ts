/**
 * [FIX] 안전한 스토리지 접근 유틸리티
 * localStorage 접근 실패 시 메모리 기반 Fallback 제공
 * 브라우저 보안 정책(시크릿 모드, iframe 등)으로 인한 크래시 방지
 */

// 인메모리 저장소 (Fallback)
const memoryStorage = new Map<string, string>();

// 스토리지 접근 가능 여부 캐시 (한 번만 체크)
let isStorageAvailable: boolean | null = null;
let hasWarnedStorageBlocked = false;

/**
 * localStorage 접근 가능 여부 확인
 */
function checkStorageAvailability(): boolean {
  if (isStorageAvailable !== null) {
    return isStorageAvailable;
  }

  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    isStorageAvailable = true;
    return true;
  } catch (e) {
    isStorageAvailable = false;
    
    // 한 번만 경고 메시지 출력
    if (!hasWarnedStorageBlocked) {
      console.warn(
        '[SafeStorage] Storage blocked, using memory instead. ' +
        'Data will be lost on page refresh.'
      );
      hasWarnedStorageBlocked = true;
    }
    
    return false;
  }
}

/**
 * 안전한 스토리지 유틸리티 클래스
 */
export class SafeStorage {
  /**
   * 데이터 저장
   * @param key 저장 키
   * @param value 저장할 값 (문자열)
   * @returns 성공 여부
   */
  static setItem(key: string, value: string): boolean {
    try {
      if (checkStorageAvailability()) {
        localStorage.setItem(key, value);
        // 성공 시 메모리에서도 제거 (localStorage가 우선)
        memoryStorage.delete(key);
        return true;
      } else {
        // Fallback: 메모리에 저장
        memoryStorage.set(key, value);
        return true;
      }
    } catch (error) {
      // 예상치 못한 에러도 메모리에 저장
      console.warn('[SafeStorage] setItem failed, using memory:', error);
      memoryStorage.set(key, value);
      return true; // 메모리 저장은 성공으로 간주
    }
  }

  /**
   * 데이터 조회
   * @param key 조회할 키
   * @returns 저장된 값 또는 null
   */
  static getItem(key: string): string | null {
    try {
      if (checkStorageAvailability()) {
        const value = localStorage.getItem(key);
        // localStorage에 있으면 메모리에서도 제거 (동기화)
        if (value !== null) {
          memoryStorage.delete(key);
        }
        return value;
      } else {
        // Fallback: 메모리에서 조회
        return memoryStorage.get(key) || null;
      }
    } catch (error) {
      // 예상치 못한 에러도 메모리에서 조회
      console.warn('[SafeStorage] getItem failed, using memory:', error);
      return memoryStorage.get(key) || null;
    }
  }

  /**
   * 데이터 삭제
   * @param key 삭제할 키
   * @returns 성공 여부
   */
  static removeItem(key: string): boolean {
    try {
      if (checkStorageAvailability()) {
        localStorage.removeItem(key);
      }
      // 메모리에서도 삭제
      memoryStorage.delete(key);
      return true;
    } catch (error) {
      // 에러 발생해도 메모리에서 삭제는 시도
      console.warn('[SafeStorage] removeItem failed, clearing memory:', error);
      memoryStorage.delete(key);
      return true;
    }
  }

  /**
   * 모든 데이터 삭제 (주의: 메모리와 localStorage 모두)
   */
  static clear(): void {
    try {
      if (checkStorageAvailability()) {
        localStorage.clear();
      }
      memoryStorage.clear();
    } catch (error) {
      console.warn('[SafeStorage] clear failed, clearing memory:', error);
      memoryStorage.clear();
    }
  }

  /**
   * 스토리지 접근 가능 여부 확인
   */
  static isAvailable(): boolean {
    return checkStorageAvailability();
  }

  /**
   * 메모리 저장소 크기 (디버깅용)
   */
  static getMemorySize(): number {
    return memoryStorage.size;
  }

  /**
   * 메모리 저장소 키 목록 (디버깅용)
   */
  static getMemoryKeys(): string[] {
    return Array.from(memoryStorage.keys());
  }
}

/**
 * [HELPER] JSON 객체를 안전하게 저장
 */
export function safeSetJSON(key: string, value: any): boolean {
  try {
    const jsonString = JSON.stringify(value);
    return SafeStorage.setItem(key, jsonString);
  } catch (error) {
    console.error('[SafeStorage] JSON stringify failed:', error);
    return false;
  }
}

/**
 * [HELPER] JSON 객체를 안전하게 조회
 */
export function safeGetJSON<T = any>(key: string): T | null {
  try {
    const jsonString = SafeStorage.getItem(key);
    if (jsonString === null) {
      return null;
    }
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error('[SafeStorage] JSON parse failed:', error);
    return null;
  }
}

