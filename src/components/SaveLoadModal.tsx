/**
 * [Save/Load] 게임 데이터 저장/불러오기 모달
 * 파일 저장과 브라우저 저장을 선택할 수 있는 UI
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, HardDrive, Upload, FolderOpen, Calendar, AlertCircle } from 'lucide-react';
import { useSaveLoad } from '../hooks/useSaveLoad';
import { GameSaveData } from '../services/StorageService';

interface SaveLoadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoad: (data: GameSaveData) => void;
  getSaveData: () => GameSaveData;
}

type TabType = 'save' | 'load';

export default function SaveLoadModal({ isOpen, onClose, onLoad, getSaveData }: SaveLoadModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('save');
  const [localMetadata, setLocalMetadata] = useState<{ lastModified: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { saveToFile, saveToLocal, loadFromFile, loadFromLocal, getLocalMetadata, isLoading } = useSaveLoad({
    onLoadSuccess: (data) => {
      onLoad(data);
      onClose();
    },
    onError: (error) => {
      console.error('[SaveLoadModal] 오류:', error);
    },
  });

  // 브라우저 저장 데이터 메타데이터 조회
  useEffect(() => {
    if (isOpen && activeTab === 'load') {
      getLocalMetadata().then((metadata) => {
        if (metadata) {
          setLocalMetadata({ lastModified: metadata.lastModified });
        } else {
          setLocalMetadata(null);
        }
      });
    }
  }, [isOpen, activeTab, getLocalMetadata]);

  // 파일 저장 핸들러
  const handleSaveToFile = useCallback(async () => {
    const saveData = getSaveData();
    await saveToFile(saveData);
  }, [getSaveData, saveToFile]);

  // 브라우저 저장 핸들러
  const handleSaveToLocal = useCallback(async () => {
    const saveData = getSaveData();
    await saveToLocal(saveData);
    // 저장 후 메타데이터 업데이트
    const metadata = await getLocalMetadata();
    if (metadata) {
      setLocalMetadata({ lastModified: metadata.lastModified });
    }
  }, [getSaveData, saveToLocal, getLocalMetadata]);

  // 파일 불러오기 핸들러
  const handleLoadFromFile = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const data = await loadFromFile(file);
    if (data) {
      onLoad(data);
      onClose();
    }

    // 파일 입력 초기화 (같은 파일을 다시 선택할 수 있도록)
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [loadFromFile, onLoad, onClose]);

  // 브라우저 불러오기 핸들러
  const handleLoadFromLocal = useCallback(async () => {
    const data = await loadFromLocal();
    if (data) {
      onLoad(data);
      onClose();
    }
  }, [loadFromLocal, onLoad, onClose]);

  // 파일 선택 버튼 클릭
  const handleFileSelectClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  // 날짜 포맷팅
  const formatDate = useCallback((timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col border-2 border-baseball-green/30">
              {/* Header */}
              <div className="bg-gradient-to-r from-baseball-green to-[#0a3528] px-6 py-4 flex items-center justify-between flex-shrink-0">
                <h2 className="text-2xl font-bold text-white">저장 / 불러오기</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 active:bg-white/30 rounded-lg transition-colors"
                  title="닫기"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 bg-gray-50">
                <button
                  onClick={() => setActiveTab('save')}
                  className={`flex-1 px-6 py-3 text-center font-semibold transition-colors ${
                    activeTab === 'save'
                      ? 'bg-white text-baseball-green border-b-2 border-baseball-green'
                      : 'text-gray-600 hover:text-baseball-green'
                  }`}
                >
                  저장하기
                </button>
                <button
                  onClick={() => setActiveTab('load')}
                  className={`flex-1 px-6 py-3 text-center font-semibold transition-colors ${
                    activeTab === 'load'
                      ? 'bg-white text-baseball-green border-b-2 border-baseball-green'
                      : 'text-gray-600 hover:text-baseball-green'
                  }`}
                >
                  불러오기
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'save' ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">게임 데이터 저장</h3>
                    
                    {/* 파일로 저장 */}
                    <div className="border-2 border-gray-200 rounded-xl p-5 hover:border-baseball-green/50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                          <Download className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-semibold text-gray-800 mb-1">파일로 저장</h4>
                          <p className="text-sm text-gray-600 mb-4">
                            JSON 파일로 다운로드하여 백업하거나 다른 기기로 이동할 수 있습니다.
                          </p>
                          <button
                            onClick={handleSaveToFile}
                            disabled={isLoading}
                            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
                          >
                            {isLoading ? '저장 중...' : '파일 다운로드'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 브라우저 저장 */}
                    <div className="border-2 border-gray-200 rounded-xl p-5 hover:border-baseball-green/50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                          <HardDrive className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-semibold text-gray-800 mb-1">브라우저에 저장</h4>
                          <p className="text-sm text-gray-600 mb-4">
                            현재 브라우저에 즉시 저장하여 빠르게 이어하기 할 수 있습니다.
                          </p>
                          <button
                            onClick={handleSaveToLocal}
                            disabled={isLoading}
                            className="w-full sm:w-auto px-6 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
                          >
                            {isLoading ? '저장 중...' : '브라우저 저장'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">게임 데이터 불러오기</h3>
                    
                    {/* 파일에서 불러오기 */}
                    <div className="border-2 border-gray-200 rounded-xl p-5 hover:border-baseball-green/50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                          <Upload className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-semibold text-gray-800 mb-1">파일 선택</h4>
                          <p className="text-sm text-gray-600 mb-4">
                            저장된 JSON 파일을 선택하여 게임을 불러옵니다.
                          </p>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".json"
                            onChange={handleLoadFromFile}
                            className="hidden"
                          />
                          <button
                            onClick={handleFileSelectClick}
                            disabled={isLoading}
                            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
                          >
                            {isLoading ? '불러오는 중...' : '파일 선택'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* 브라우저에서 불러오기 */}
                    <div className="border-2 border-gray-200 rounded-xl p-5 hover:border-baseball-green/50 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                          <FolderOpen className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-semibold text-gray-800 mb-1">브라우저에서 불러오기</h4>
                          {localMetadata ? (
                            <>
                              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(localMetadata.lastModified)}에 저장된 데이터</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-4">
                                브라우저에 저장된 게임 데이터를 불러옵니다.
                              </p>
                            </>
                          ) : (
                            <div className="flex items-center gap-2 text-sm text-amber-600 mb-4">
                              <AlertCircle className="w-4 h-4" />
                              <span>저장된 게임 데이터가 없습니다.</span>
                            </div>
                          )}
                          <button
                            onClick={handleLoadFromLocal}
                            disabled={isLoading || !localMetadata}
                            className="w-full sm:w-auto px-6 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
                          >
                            {isLoading ? '불러오는 중...' : '게임 불러오기'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

