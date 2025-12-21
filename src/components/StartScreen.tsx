import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, Play, Key, X, AlertCircle, CheckCircle2, LogOut } from 'lucide-react';
import { SafeSessionStorage } from '../lib/safeStorage';

interface StartScreenProps {
  apiKey: string;
  onLoadGame: () => void;
  onStartNew: () => void;
  onLogout?: () => void;
  onGameStart?: (teamId: number, teamName?: string, difficulty?: string) => void;
  onApiKeySet?: (apiKey: string) => void;
  onApiKeyRequest?: () => void; // API Key 입력 요청 콜백
}

export default function StartScreen({ apiKey, onLoadGame, onStartNew, onLogout, onGameStart, onApiKeySet, onApiKeyRequest }: StartScreenProps) {
  const isProcessingRef = React.useRef(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');
  const [apiKeyError, setApiKeyError] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);

  // 세션 스토리지에서 API Key 확인 (로그인 후에만)
  useEffect(() => {
    const storedKey = SafeSessionStorage.getItem('gemini_api_key');
    if (storedKey && storedKey.trim().length > 0) {
      setHasApiKey(true);
      if (onApiKeySet) {
        onApiKeySet(storedKey);
      }
    } else {
      // API Key가 없으면 상태만 업데이트 (모달은 App.tsx에서 관리)
      setHasApiKey(false);
    }
  }, [onApiKeySet]);

  // API Key 유효성 검사
  const validateApiKey = (key: string): boolean => {
    if (!key || key.trim().length === 0) {
      setApiKeyError('API Key를 입력해주세요.');
      return false;
    }
    if (!key.startsWith('AIza')) {
      setApiKeyError('올바른 Google API Key 형식이 아닙니다. (AIza로 시작해야 합니다)');
      return false;
    }
    if (key.length < 30) {
      setApiKeyError('API Key가 너무 짧습니다.');
      return false;
    }
    return true;
  };

  // API Key 저장
  const handleSaveApiKey = () => {
    const trimmedKey = tempApiKey.trim();
    if (!validateApiKey(trimmedKey)) {
      return;
    }

    SafeSessionStorage.setItem('gemini_api_key', trimmedKey);
    setHasApiKey(true);
    setShowApiKeyModal(false);
    setApiKeyError('');
    setTempApiKey('');
    if (onApiKeySet) {
      onApiKeySet(trimmedKey);
    }
  };

  // API Key 수정
  const handleEditApiKey = () => {
    const storedKey = SafeSessionStorage.getItem('gemini_api_key');
    setTempApiKey(storedKey || '');
    setShowApiKeyModal(true);
  };
  
  const handleLoadGame = (e?: React.MouseEvent | React.TouchEvent) => {
    // 모바일 터치 이벤트 중복 방지
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // 중복 호출 방지
    if (isProcessingRef.current) {
      return;
    }
    
    isProcessingRef.current = true;
    
    // [NEW] 설정 모달 열기 (로컬/파일 선택)
    onLoadGame();
    
    // 약간의 지연 후 플래그 해제
    setTimeout(() => {
      isProcessingRef.current = false;
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-baseball-green via-[#0a3528] to-baseball-green-dark flex items-center justify-center p-3 sm:p-4 relative">
      {/* 로그아웃 버튼 (로그인 상태에서만 App.tsx가 onLogout을 전달) */}
      {onLogout && (
        <button
          onClick={onLogout}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-black/20 hover:bg-black/30 text-white border border-white/20 backdrop-blur-sm transition-colors"
          title="로그아웃"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-semibold">로그아웃</span>
        </button>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl w-full"
      >
        {/* 타이틀 */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-12"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl">
            KBO 프로야구
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-baseball-gold mb-6 drop-shadow-lg">
            단장 웹 시뮬레이터
          </h2>
          <div className="text-6xl sm:text-7xl md:text-8xl mb-8 text-white">⚾</div>
        </motion.div>

        {/* 버튼 그룹 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLoadGame}
            onTouchStart={handleLoadGame}
            className="flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-baseball-green font-bold text-lg px-8 py-4 rounded-xl shadow-2xl transition-all w-full sm:w-auto min-w-[200px] touch-manipulation"
          >
            <FolderOpen className="w-6 h-6" />
            불러오기
          </motion.button>

          <motion.button
            whileHover={hasApiKey ? { scale: 1.05 } : {}}
            whileTap={hasApiKey ? { scale: 0.95 } : {}}
            onClick={() => {
              if (!hasApiKey) {
                // API Key 입력 요청 (App.tsx에서 모달 표시)
                if (onApiKeyRequest) {
                  onApiKeyRequest();
                } else {
                  setShowApiKeyModal(true);
                }
                return;
              }
              if (isProcessingRef.current) return;
              isProcessingRef.current = true;
              console.log('[StartScreen] 새 게임 시작 버튼 클릭');
              onStartNew();
              // 약간의 지연 후 플래그 해제
              setTimeout(() => {
                isProcessingRef.current = false;
              }, 500);
            }}
            className={`flex items-center justify-center gap-3 font-bold text-lg px-8 py-4 rounded-xl shadow-2xl transition-all w-full sm:w-auto min-w-[200px] ${
              hasApiKey 
                ? 'bg-baseball-gold hover:bg-yellow-500 text-white cursor-pointer' 
                : 'bg-gray-400 text-gray-200 cursor-not-allowed'
            }`}
          >
            <Play className="w-6 h-6" />
            새 게임 시작
          </motion.button>
        </motion.div>

        {/* API Key 안내 */}
        {!hasApiKey && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-center"
          >
            <p className="text-white/70 text-sm">
              게임을 시작하려면 Google API Key가 필요합니다.
            </p>
          </motion.div>
        )}

        {/* API Key 상태 표시 */}
        {hasApiKey && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <span className="text-white/80 text-sm">API Key가 설정되었습니다</span>
            <button
              onClick={handleEditApiKey}
              className="text-baseball-gold hover:text-yellow-400 text-sm underline ml-2"
            >
              변경
            </button>
          </motion.div>
        )}

        {/* API Key 입력 모달 */}
        <AnimatePresence>
          {showApiKeyModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => {
                if (hasApiKey) {
                  setShowApiKeyModal(false);
                }
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-baseball-green/10 rounded-lg">
                      <Key className="w-6 h-6 text-baseball-green" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Google API Key 입력
                    </h3>
                  </div>
                  {hasApiKey && (
                    <button
                      onClick={() => setShowApiKeyModal(false)}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  )}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Gemini API를 사용하기 위해 Google API Key가 필요합니다.
                  <br />
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-baseball-green hover:underline"
                  >
                    여기서 API Key 발급받기
                  </a>
                </p>

                <div className="mb-4">
                  <input
                    type="password"
                    value={tempApiKey}
                    onChange={(e) => {
                      setTempApiKey(e.target.value);
                      setApiKeyError('');
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSaveApiKey();
                      }
                    }}
                    placeholder="AIza..."
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-baseball-green dark:bg-slate-700 dark:text-white"
                    autoFocus
                  />
                  {apiKeyError && (
                    <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{apiKeyError}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  {hasApiKey && (
                    <button
                      onClick={() => setShowApiKeyModal(false)}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      취소
                    </button>
                  )}
                  <button
                    onClick={handleSaveApiKey}
                    className="flex-1 px-4 py-2 bg-baseball-green hover:bg-baseball-green-dark text-white rounded-lg font-semibold transition-colors"
                  >
                    {hasApiKey ? '변경하기' : '저장하고 시작'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

