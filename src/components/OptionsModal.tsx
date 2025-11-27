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
  if (!isOpen || options.length === 0) return null;

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
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl max-w-lg w-full sm:max-h-[90vh] h-[85vh] sm:h-auto border-2 border-baseball-green/30 overflow-hidden flex flex-col">
              {/* Header */}
              <div className="bg-gradient-to-r from-baseball-green to-[#0a3528] px-4 sm:px-6 py-3 sm:py-4 rounded-t-3xl sm:rounded-t-2xl flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className="w-2 h-2 bg-baseball-gold rounded-full animate-pulse flex-shrink-0"></div>
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-white truncate">작전 지시</h2>
                    <p className="text-[10px] sm:text-xs text-baseball-gold/80 mt-0.5 hidden sm:block">원하는 작업을 선택하세요</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 sm:p-2 hover:bg-white/20 active:bg-white/30 rounded-lg transition-colors flex-shrink-0 touch-manipulation"
                  title="닫기 (직접 입력 가능)"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 overflow-y-auto flex-1">
                <div className="space-y-2 sm:space-y-2.5">
                  {options.map((option, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        onSelect(option.value);
                        onClose();
                      }}
                      className="w-full text-left px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-baseball-green/10 to-baseball-green/5 border-2 border-baseball-green/30 rounded-lg hover:border-baseball-green active:border-baseball-green active:bg-gradient-to-r active:from-baseball-green/20 active:to-baseball-green/10 hover:bg-gradient-to-r hover:from-baseball-green/20 hover:to-baseball-green/10 transition-all group touch-manipulation"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-xs sm:text-sm md:text-base text-gray-800 group-hover:text-baseball-green group-active:text-baseball-green transition-colors break-words flex-1 leading-relaxed">
                          {option.label}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-baseball-green opacity-50 sm:opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity flex-shrink-0" />
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* 하단 안내 */}
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 flex-shrink-0">
                  <p className="text-[10px] sm:text-xs text-center text-gray-500 px-2 leading-relaxed">
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

