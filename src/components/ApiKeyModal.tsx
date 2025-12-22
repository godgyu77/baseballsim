'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { SafeStorage } from '../lib/safeStorage';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApiKeySet: (apiKey: string) => void;
  initialApiKey?: string;
}

export default function ApiKeyModal({ isOpen, onClose, onApiKeySet, initialApiKey }: ApiKeyModalProps) {
  const [tempApiKey, setTempApiKey] = useState('');
  const [apiKeyError, setApiKeyError] = useState('');

  // 모달이 열릴 때 기존 API Key 로드
  useEffect(() => {
    if (isOpen) {
      try {
        const storedKey = SafeStorage.getItem('gemini_api_key');
        setTempApiKey(storedKey || initialApiKey || '');
      } catch (error) {
        console.warn('LocalStorage 읽기 불가:', error);
        setTempApiKey(initialApiKey || '');
      }
    }
  }, [isOpen, initialApiKey]);

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

    try {
      SafeStorage.setItem('gemini_api_key', trimmedKey);
      setApiKeyError('');
      onApiKeySet(trimmedKey);
      onClose();
    } catch (error) {
      // Storage 접근 오류 처리
      console.warn('LocalStorage 저장 불가:', error);
      // 메모리에만 저장 (페이지 새로고침 시 사라짐)
      setApiKeyError('');
      onApiKeySet(trimmedKey);
      onClose();
    }
  };

  const hasExistingKey = tempApiKey && tempApiKey.trim().length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-baseball-green to-[#0a3528] px-6 py-4 rounded-t-2xl flex items-center justify-between border-b-2 border-baseball-gold">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-baseball-gold/20 rounded-lg">
                    <Key className="w-6 h-6 text-baseball-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Google API Key 입력
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="p-6">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Gemini API를 사용하기 위해 Google API Key가 필요합니다.
                  <br />
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-baseball-green hover:underline font-semibold"
                  >
                    여기서 API Key 발급받기
                  </a>
                </p>

                {hasExistingKey && (
                  <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <p className="text-sm text-green-700 dark:text-green-400">
                      기존 API Key가 감지되었습니다. 변경하려면 새로 입력하세요.
                    </p>
                  </div>
                )}

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    API Key
                  </label>
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
                  {hasExistingKey && (
                    <button
                      onClick={onClose}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      나중에
                    </button>
                  )}
                  <button
                    onClick={handleSaveApiKey}
                    className="flex-1 px-4 py-2 bg-baseball-green hover:bg-baseball-green-dark text-white rounded-lg font-semibold transition-colors"
                  >
                    {hasExistingKey ? '변경하기' : '저장하고 시작'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

