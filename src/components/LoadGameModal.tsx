import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, HardDrive, X } from 'lucide-react';

interface LoadGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadFromLocal: () => Promise<void>;
  onLoadFromFile: () => Promise<void>;
}

export default function LoadGameModal({ isOpen, onClose, onLoadFromLocal, onLoadFromFile }: LoadGameModalProps) {
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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              <div className="text-center mb-6">
                <div className="bg-baseball-green p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <FolderOpen className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">게임 불러오기</h2>
                <p className="text-gray-600">
                  저장된 게임을 불러오는 방법을 선택하세요
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={async () => {
                    await onLoadFromLocal();
                    onClose();
                  }}
                  className="flex items-center justify-center gap-2 bg-baseball-green hover:bg-baseball-green-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  <HardDrive className="w-5 h-5" />
                  로컬 저장소에서 불러오기
                </button>
                <button
                  onClick={async () => {
                    await onLoadFromFile();
                    onClose();
                  }}
                  className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  <FolderOpen className="w-5 h-5" />
                  파일에서 불러오기
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

