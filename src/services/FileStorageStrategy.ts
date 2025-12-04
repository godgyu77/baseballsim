/**
 * [NEW] 완전 무료 파일 기반 저장 전략
 * 파일 다운로드/업로드 방식으로 클라우드 동기화 (서버 없음)
 */

import { GameSaveData, SaveMetadata } from './StorageService';
import { generateSaveFilename } from '../utils/DateUtils';

/**
 * [NEW] 저장 데이터 인터페이스 (Type Safety)
 * 메타데이터와 실제 데이터를 분리하여 위변조 방지
 */
export interface ISaveData {
  version: string; // 데이터 버전 (호환성 검증용)
  timestamp: string; // 저장 시점 (ISO 8601 형식)
  gameName: string; // 게임 이름 (유효성 검증용)
  data: GameSaveData; // 실제 게임 데이터
}

/**
 * [NEW] 저장 데이터 버전
 */
const SAVE_DATA_VERSION = '1.0';
const GAME_NAME = 'KBO_Baseball_Simulator';

/**
 * [NEW] 파일 기반 저장 전략
 * 사용자가 직접 파일을 다운로드/업로드하여 동기화
 */
export class FileStorageStrategy {
  /**
   * [NEW] 게임 데이터 추출 및 다운로드
   * 모든 게임 상태를 JSON으로 직렬화하여 파일로 다운로드
   * 
   * @param data 게임 저장 데이터
   * @param filename 파일명 (기본값: 자동 생성)
   */
  static exportSaveFile(data: GameSaveData, filename?: string): void {
    try {
      // [NEW] 메타데이터 포함한 저장 데이터 객체 생성
      const saveData: ISaveData = {
        version: SAVE_DATA_VERSION,
        timestamp: new Date().toISOString(),
        gameName: GAME_NAME,
        data: {
          ...data,
          metadata: {
            ...data.metadata,
            lastModified: Date.now(),
          },
        },
      };
      
      // [NEW] JSON 문자열로 변환 (가독성을 위해 들여쓰기 적용)
      const jsonString = JSON.stringify(saveData, null, 2);
      
      // [NEW] Blob 생성
      const blob = new Blob([jsonString], { type: 'application/json' });
      
      // [NEW] 파일명 생성 (날짜 포함)
      const finalFilename = filename || generateSaveFilename();
      
      // [NEW] 다운로드 링크 생성 및 실행
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = finalFilename;
      
      // [NEW] 다운로드 실행
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // [NEW] URL 해제 (메모리 누수 방지)
      URL.revokeObjectURL(url);
      
      console.log('[FileStorageStrategy] 파일 다운로드 완료:', finalFilename);
    } catch (error) {
      console.error('[FileStorageStrategy] 파일 다운로드 오류:', error);
      throw error;
    }
  }

  /**
   * [NEW] 기존 메서드 호환성을 위한 래퍼
   * @deprecated exportSaveFile 사용 권장
   */
  static downloadSaveFile(data: GameSaveData, filename: string = 'baseball_game_save.json'): void {
    this.exportSaveFile(data, filename);
  }

  /**
   * [NEW] 저장 데이터 유효성 검사
   * 파싱된 데이터가 유효한 게임 데이터 형식인지 확인
   * 
   * @param data 파싱된 데이터
   * @returns 유효성 검사 결과
   */
  static validateSaveData(data: any): { isValid: boolean; error?: string } {
    // [NEW] 기본 구조 확인
    if (!data || typeof data !== 'object') {
      return {
        isValid: false,
        error: '데이터가 올바른 형식이 아닙니다.',
      };
    }

    // [NEW] ISaveData 형식인지 확인 (버전 정보 포함)
    if (data.version && data.gameName && data.data) {
      // [NEW] 게임 이름 확인 (다른 게임의 JSON 방지)
      if (data.gameName !== GAME_NAME) {
        return {
          isValid: false,
          error: '올바르지 않은 세이브 파일입니다. 이 게임의 저장 파일이 아닙니다.',
        };
      }

      // [NEW] 데이터 버전 확인 (호환성 검증)
      if (data.version !== SAVE_DATA_VERSION) {
        return {
          isValid: false,
          error: `저장 파일 버전이 맞지 않습니다. (현재: ${SAVE_DATA_VERSION}, 파일: ${data.version})`,
        };
      }

      // [NEW] 필수 키값 존재 여부 확인
      const gameData = data.data;
      if (!gameData.messages || !Array.isArray(gameData.messages)) {
        return {
          isValid: false,
          error: '저장 데이터에 메시지 정보가 없습니다.',
        };
      }

      if (!gameData.gameState || typeof gameData.gameState !== 'object') {
        return {
          isValid: false,
          error: '저장 데이터에 게임 상태 정보가 없습니다.',
        };
      }

      return { isValid: true };
    }

    // [NEW] 기존 형식 호환성 (메타데이터 없이 저장된 파일)
    if (data.messages && Array.isArray(data.messages) && data.gameState) {
      return { isValid: true };
    }

    return {
      isValid: false,
      error: '올바르지 않은 세이브 파일입니다. 필수 데이터가 누락되었습니다.',
    };
  }

  /**
   * [NEW] 파일 읽기 및 복구
   * 사용자가 업로드한 파일을 읽어서 게임 데이터로 변환
   * 
   * @param file 업로드된 파일
   * @returns 게임 저장 데이터
   */
  static async importSaveFile(file: File): Promise<GameSaveData> {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        
        reader.onload = (e) => {
          try {
            const text = e.target?.result as string;
            const parsed = JSON.parse(text);
            
            // [NEW] 유효성 검사
            const validation = this.validateSaveData(parsed);
            if (!validation.isValid) {
              reject(new Error(validation.error || '올바르지 않은 세이브 파일입니다.'));
              return;
            }

            // [NEW] ISaveData 형식인 경우 data 추출
            let gameData: GameSaveData;
            if (parsed.version && parsed.data) {
              gameData = parsed.data;
            } else {
              // [NEW] 기존 형식 호환성
              gameData = parsed as GameSaveData;
            }
            
            // [NEW] 메타데이터가 없으면 생성
            if (!gameData.metadata) {
              gameData.metadata = {
                lastModified: Date.now(),
              };
            }
            
            console.log('[FileStorageStrategy] 파일 로드 완료:', file.name);
            resolve(gameData);
          } catch (parseError) {
            console.error('[FileStorageStrategy] JSON 파싱 오류:', parseError);
            reject(new Error('파일 형식이 올바르지 않습니다. JSON 파일인지 확인해주세요.'));
          }
        };
        
        reader.onerror = () => {
          reject(new Error('파일 읽기 오류가 발생했습니다.'));
        };
        
        reader.readAsText(file);
      } catch (error) {
        console.error('[FileStorageStrategy] 파일 로드 오류:', error);
        reject(error);
      }
    });
  }

  /**
   * [NEW] 기존 메서드 호환성을 위한 래퍼
   * @deprecated importSaveFile 사용 권장
   */
  static async loadFromFile(file: File): Promise<GameSaveData> {
    return this.importSaveFile(file);
  }

  /**
   * [NEW] 파일 업로드 UI 생성
   * 
   * @param onLoad 파일 로드 완료 콜백
   * @param onError 에러 발생 콜백 (선택적)
   * @param onCancel 파일 선택 취소 콜백 (선택적)
   * @returns 파일 입력 요소
   */
  static createFileUploadInput(
    onLoad: (data: GameSaveData) => void,
    onError?: (error: Error) => void,
    onCancel?: () => void
  ): HTMLInputElement {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.style.display = 'none';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      
      // [NEW] 파일 선택 취소 처리
      if (!file) {
        if (onCancel) {
          onCancel();
        }
        // 입력 초기화
        input.value = '';
        return;
      }
      
      // [NEW] 파일 크기 검증 (10MB 제한)
      const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
      if (file.size > MAX_FILE_SIZE) {
        const error = new Error('파일 크기가 너무 큽니다. (최대 10MB)');
        console.error('[FileStorageStrategy] 파일 크기 오류:', error);
        alert(`파일 크기가 너무 큽니다.\n\n최대 크기: 10MB\n현재 크기: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
        if (onError) {
          onError(error);
        }
        input.value = '';
        return;
      }
      
      // [NEW] 파일 확장자 검증
      if (!file.name.toLowerCase().endsWith('.json')) {
        const error = new Error('JSON 파일만 선택할 수 있습니다.');
        console.error('[FileStorageStrategy] 파일 형식 오류:', error);
        alert('JSON 파일만 선택할 수 있습니다.\n\n올바른 세이브 파일을 선택해주세요.');
        if (onError) {
          onError(error);
        }
        input.value = '';
        return;
      }
      
      try {
        // [NEW] importSaveFile 사용 (유효성 검사 포함)
        const data = await FileStorageStrategy.importSaveFile(file);
        onLoad(data);
      } catch (error) {
        console.error('[FileStorageStrategy] 파일 업로드 오류:', error);
        
        // [NEW] Error Handling: 잘못된 파일일 때 경고창
        const errorMessage = error instanceof Error 
          ? error.message 
          : '알 수 없는 오류가 발생했습니다.';
        
        alert(`파일을 불러오는데 실패했습니다:\n\n${errorMessage}`);
        
        if (onError && error instanceof Error) {
          onError(error);
        }
      }
      
      // [NEW] 입력 초기화 (같은 파일 다시 선택 가능하도록)
      input.value = '';
    };
    
    // [NEW] 파일 선택 취소 이벤트 처리 (일부 브라우저)
    input.oncancel = () => {
      if (onCancel) {
        onCancel();
      }
    };
    
    return input;
  }
}

