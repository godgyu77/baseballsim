/**
 * [Save/Load] 게임 데이터 저장/불러오기 커스텀 훅
 * 파일 저장과 브라우저 저장을 통합 관리
 */

import { useCallback, useState } from 'react';
import { FileStorageStrategy } from '../services/FileStorageStrategy';
import { StorageService, GameSaveData, SaveMetadata } from '../services/StorageService';
import { useToast } from '../context/ToastContext';

const SAVE_KEY = 'baseball_game_save';

export interface UseSaveLoadOptions {
  onSaveSuccess?: () => void;
  onLoadSuccess?: (data: GameSaveData) => void;
  onError?: (error: Error) => void;
}

export function useSaveLoad(options: UseSaveLoadOptions = {}) {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const storageService = new StorageService();

  /**
   * 파일로 저장 (다운로드)
   */
  const saveToFile = useCallback(async (saveData: GameSaveData) => {
    try {
      setIsLoading(true);
      FileStorageStrategy.exportSaveFile(saveData);
      showToast('파일이 다운로드되었습니다!', 'success');
      options.onSaveSuccess?.();
    } catch (error) {
      console.error('[useSaveLoad] 파일 저장 오류:', error);
      const errorMessage = error instanceof Error ? error.message : '파일 저장에 실패했습니다.';
      showToast(errorMessage, 'error');
      options.onError?.(error instanceof Error ? error : new Error(errorMessage));
    } finally {
      setIsLoading(false);
    }
  }, [showToast, options]);

  /**
   * 브라우저에 저장 (LocalStorage)
   */
  const saveToLocal = useCallback(async (saveData: GameSaveData) => {
    try {
      setIsLoading(true);
      const success = await storageService.save(SAVE_KEY, saveData);
      
      if (success) {
        const saveDate = new Date(saveData.metadata.lastModified);
        const formattedDate = saveDate.toLocaleString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        });
        showToast(`저장되었습니다! (${formattedDate})`, 'success');
        options.onSaveSuccess?.();
      } else {
        throw new Error('저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('[useSaveLoad] 브라우저 저장 오류:', error);
      const errorMessage = error instanceof Error ? error.message : '저장에 실패했습니다.';
      showToast(errorMessage, 'error');
      options.onError?.(error instanceof Error ? error : new Error(errorMessage));
    } finally {
      setIsLoading(false);
    }
  }, [storageService, showToast, options]);

  /**
   * 파일에서 불러오기
   */
  const loadFromFile = useCallback(async (file: File): Promise<GameSaveData | null> => {
    try {
      setIsLoading(true);
      const data = await FileStorageStrategy.importSaveFile(file);
      
      // 데이터 검증
      if (!validateSaveData(data)) {
        throw new Error('유효하지 않은 세이브 파일입니다.');
      }

      const saveDate = data.metadata?.lastModified 
        ? new Date(data.metadata.lastModified)
        : new Date();
      const formattedDate = saveDate.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
      
      showToast(`파일을 불러왔습니다! (${formattedDate} 저장)`, 'success');
      options.onLoadSuccess?.(data);
      return data;
    } catch (error) {
      console.error('[useSaveLoad] 파일 불러오기 오류:', error);
      const errorMessage = error instanceof Error ? error.message : '파일 불러오기에 실패했습니다.';
      showToast(errorMessage, 'error');
      options.onError?.(error instanceof Error ? error : new Error(errorMessage));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [showToast, options]);

  /**
   * 브라우저에서 불러오기
   */
  const loadFromLocal = useCallback(async (): Promise<GameSaveData | null> => {
    try {
      setIsLoading(true);
      const data = await storageService.load(SAVE_KEY);
      
      if (!data) {
        showToast('저장된 게임 데이터가 없습니다.', 'warning');
        return null;
      }

      // 데이터 검증
      if (!validateSaveData(data)) {
        throw new Error('저장된 데이터가 손상되었습니다.');
      }

      const saveDate = data.metadata?.lastModified 
        ? new Date(data.metadata.lastModified)
        : new Date();
      const formattedDate = saveDate.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
      
      showToast(`게임을 불러왔습니다! (${formattedDate} 저장)`, 'success');
      options.onLoadSuccess?.(data);
      return data;
    } catch (error) {
      console.error('[useSaveLoad] 브라우저 불러오기 오류:', error);
      const errorMessage = error instanceof Error ? error.message : '게임 불러오기에 실패했습니다.';
      showToast(errorMessage, 'error');
      options.onError?.(error instanceof Error ? error : new Error(errorMessage));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [storageService, showToast, options]);

  /**
   * 브라우저 저장 데이터 메타데이터 조회
   */
  const getLocalMetadata = useCallback(async (): Promise<SaveMetadata | null> => {
    try {
      return await storageService.getMetadata(SAVE_KEY);
    } catch (error) {
      console.error('[useSaveLoad] 메타데이터 조회 오류:', error);
      return null;
    }
  }, [storageService]);

  /**
   * 저장 데이터 유효성 검증
   */
  const validateSaveData = (data: any): data is GameSaveData => {
    if (!data || typeof data !== 'object') {
      return false;
    }

    // 필수 필드 확인
    if (!data.messages || !Array.isArray(data.messages)) {
      return false;
    }

    if (!data.gameState || typeof data.gameState !== 'object') {
      return false;
    }

    if (!data.metadata || typeof data.metadata !== 'object') {
      return false;
    }

    return true;
  };

  return {
    saveToFile,
    saveToLocal,
    loadFromFile,
    loadFromLocal,
    getLocalMetadata,
    isLoading,
  };
}

