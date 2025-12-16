'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ChevronRight } from 'lucide-react';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  options: Array<{ label: string; value: string }>;
  onOptionSelect: (value: string) => void;
  onScheduleProgress: () => void;
  isLoading?: boolean;
  hasApiKey?: boolean;
}

export default function InstructionsModal({ 
  isOpen, 
  onClose,
  options,
  onOptionSelect,
  onScheduleProgress,
  isLoading = false,
  hasApiKey = true
}: InstructionsModalProps) {
  const handleOptionClick = (value: string) => {
    // 먼저 모달 닫기
    onClose();
    // 그 다음 옵션 선택 처리 (모달이 닫힌 후 실행)
    setTimeout(() => {
      onOptionSelect(value);
    }, 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* 모달 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 헤더 - 일정 진행 버튼 고정 */}
              <div className="bg-gradient-to-r from-baseball-green to-[#0a3528] px-6 py-4 rounded-t-2xl flex items-center justify-between border-b-2 border-baseball-gold">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-baseball-gold" />
                  <h2 className="text-xl font-bold text-white">지시사항</h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onScheduleProgress}
                    disabled={isLoading || !hasApiKey}
                    className="px-4 py-2 bg-baseball-gold hover:bg-yellow-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                  >
                    <ChevronRight className="w-4 h-4" />
                    일정 진행
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* 본문 - AI가 생성한 선택지 버튼들 */}
              <div className="flex-1 overflow-y-auto p-6">
                {options.length === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    <p>현재 사용 가능한 지시사항이 없습니다.</p>
                    <p className="text-sm mt-2">AI가 선택지를 제공하면 여기에 표시됩니다.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {options.map((option, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleOptionClick(option.value)}
                        className="bg-gradient-to-r from-baseball-green to-[#0a3528] hover:from-baseball-green-dark hover:to-[#082a1f] text-white font-semibold rounded-lg p-4 text-left transition-all transform hover:scale-105 hover:shadow-lg border-2 border-baseball-gold/30 hover:border-baseball-gold"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-baseball-gold font-bold">▶</span>
                          <span>{option.label}</span>
                        </div>
                      </motion.button>
                    ))}
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

