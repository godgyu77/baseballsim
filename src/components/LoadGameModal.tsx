import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, Play } from 'lucide-react';

interface LoadGameModalProps {
  isOpen: boolean;
  onLoadGame: () => void;
  onStartNew: () => void;
}

export default function LoadGameModal({ isOpen, onLoadGame, onStartNew }: LoadGameModalProps) {
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8">
              <div className="text-center mb-6">
                <div className="bg-baseball-green p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <FolderOpen className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">저장된 게임 발견</h2>
                <p className="text-gray-600">
                  저장된 게임을 불러오시겠습니까?
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onLoadGame}
                  className="flex-1 flex items-center justify-center gap-2 bg-baseball-green hover:bg-baseball-green-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  <FolderOpen className="w-5 h-5" />
                  불러오기
                </button>
                <button
                  onClick={onStartNew}
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  <Play className="w-5 h-5" />
                  새 게임 시작
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

