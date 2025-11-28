import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';

interface Option {
  label: string;
  value: string;
}

interface OptionsModalProps {
  isOpen: boolean;
  options: Option[];
  onSelect: (value: string) => void;
  onClose: () => void;
}

export default function OptionsModal({
  isOpen,
  options,
  onSelect,
  onClose,
}: OptionsModalProps) {
  // 일정 진행 버튼은 항상 표시되므로 options가 없어도 모달은 열 수 있음
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
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 safe-area-inset"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl max-w-lg w-full sm:max-h-[90vh] h-[85vh] sm:h-auto border-2 border-baseball-green/30 overflow-hidden flex flex-col safe-area-bottom">
              {/* Header */}
              <div className="bg-gradient-to-r from-baseball-green to-[#0a3528] px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 rounded-t-3xl sm:rounded-t-2xl flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-baseball-gold rounded-full animate-pulse flex-shrink-0"></div>
                  <div className="min-w-0">
                    <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white truncate">작전 지시</h2>
                    <p className="text-[9px] sm:text-[10px] md:text-xs text-baseball-gold/80 mt-0.5 hidden sm:block">원하는 작업을 선택하세요</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 sm:p-2 hover:bg-white/20 active:bg-white/30 rounded-lg transition-colors flex-shrink-0 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                  title="닫기 (직접 입력 가능)"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 lg:py-5 overflow-y-auto flex-1 overscroll-contain">
                <div className="space-y-2 sm:space-y-2.5">
                  {/* 고정 "일정 진행" 버튼 - 항상 맨 위에 표시 */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onSelect("다음 날로 진행");
                      onClose();
                    }}
                    className="w-full text-center px-3 sm:px-4 md:px-5 lg:px-6 py-2.5 sm:py-3 md:py-3.5 lg:py-4 bg-gradient-to-r from-baseball-gold via-yellow-400 to-baseball-gold border-2 border-baseball-green shadow-lg hover:shadow-xl active:shadow-md transition-all group touch-manipulation rounded-lg sm:rounded-xl relative overflow-hidden min-h-[48px] sm:min-h-[52px] md:min-h-[56px]"
                  >
                    {/* 배경 애니메이션 효과 */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 via-transparent to-yellow-300/20"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'loop',
                        ease: 'linear',
                      }}
                    />
                    <div className="relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3">
                      <span className="text-sm sm:text-base md:text-lg lg:text-xl font-black text-baseball-green drop-shadow-sm">
                        ⏭️
                      </span>
                      <span className="font-black text-xs sm:text-sm md:text-base lg:text-lg text-baseball-green drop-shadow-sm whitespace-nowrap">
                        일정 진행
                      </span>
                    </div>
                  </motion.button>

                  {/* 구분선 */}
                  <div className="py-1 sm:py-1.5">
                    <div className="border-t border-dashed border-baseball-green/30 sm:border-t-2"></div>
                  </div>

                  {/* 게임 관련 옵션들 (AI가 제공하는 옵션) */}
                  {options
                    .filter(option => {
                      // 필터링: 일정 진행, 난이도 선택, 지시사항/가이드 관련 옵션 제외
                      const label = option.label.toLowerCase();
                      const value = option.value.toLowerCase();
                      return !(
                        // 일정 진행 관련 필터링
                        (label.includes('일정') && label.includes('진행')) ||
                        (label.includes('다음') && (label.includes('날') || label.includes('일'))) ||
                        (value.includes('일정') && value.includes('진행')) ||
                        (value.includes('다음') && (value.includes('날') || value.includes('일'))) ||
                        // 난이도 선택 관련 필터링
                        label.includes('이지 모드') || label.includes('하드 모드') ||
                        label.includes('easy mode') || label.includes('hard mode') ||
                        label.includes('난이도') || label.includes('difficulty') ||
                        value.includes('이지 모드') || value.includes('하드 모드') ||
                        value.includes('easy') || value.includes('hard') ||
                        value.includes('난이도') ||
                        // 지시사항/가이드 관련 필터링
                        label.includes('지시사항') || label.includes('가이드') ||
                        label.includes('guide') || label.includes('instruction') ||
                        value.includes('지시사항') || value.includes('가이드') ||
                        value.includes('guide') || value.includes('instruction')
                      );
                    })
                    .map((option, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index + 1) * 0.05 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          onSelect(option.value);
                          onClose();
                        }}
                        className="w-full text-left px-2.5 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 bg-gradient-to-r from-baseball-green/10 to-baseball-green/5 border border-baseball-green/30 sm:border-2 rounded-md sm:rounded-lg hover:border-baseball-green active:border-baseball-green active:bg-gradient-to-r active:from-baseball-green/20 active:to-baseball-green/10 hover:bg-gradient-to-r hover:from-baseball-green/20 hover:to-baseball-green/10 transition-all group touch-manipulation min-h-[44px] sm:min-h-[48px]"
                      >
                        <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                          <span className="font-semibold text-[11px] sm:text-xs md:text-sm lg:text-base text-gray-800 group-hover:text-baseball-green group-active:text-baseball-green transition-colors break-words flex-1 leading-relaxed">
                            {option.label}
                          </span>
                          <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-baseball-green opacity-70 sm:opacity-50 sm:opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity flex-shrink-0" />
                        </div>
                      </motion.button>
                    ))}
                </div>

                {/* 하단 안내 */}
                <div className="mt-2 sm:mt-3 md:mt-4 pt-2 sm:pt-3 md:pt-4 border-t border-gray-200 flex-shrink-0 pb-safe">
                  <p className="text-[9px] sm:text-[10px] md:text-xs text-center text-gray-500 px-2 leading-relaxed">
                    모달을 닫으면 채팅창에서 직접 명령을 입력할 수 있습니다
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

