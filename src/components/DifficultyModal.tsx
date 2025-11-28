import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Shield } from 'lucide-react';
import { Difficulty } from '../constants/GameConfig';

interface DifficultyModalProps {
  isOpen: boolean;
  onSelect: (difficulty: Difficulty) => void;
}

export default function DifficultyModal({ isOpen, onSelect }: DifficultyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border-2 border-baseball-green/30 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-baseball-green to-[#0a3528] px-6 py-5 rounded-t-2xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-2">
                  난이도 선택
                </h2>
                <p className="text-sm sm:text-base text-baseball-gold/90 text-center">
                  한 번 선택한 난이도는 게임 도중 변경할 수 없습니다
                </p>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* 이지 모드 */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect('EASY')}
                    className="p-5 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl hover:border-green-500 transition-all text-left touch-manipulation"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-green-500 rounded-lg">
                        <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-green-800">이지 모드</h3>
                        <p className="text-xs sm:text-sm text-green-600">초보자 추천</p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span>초기 자금: <strong className="text-green-800">50.0억 원</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span>선수단 샐러리캡: <strong className="text-green-800">200억 원</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span>용병 샐러리캡: <strong className="text-green-800">60억 원</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span>수입 <strong className="text-green-800">1.2배</strong> 보너스</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span>소프트 캡 (사치세 적용)</span>
                      </li>
                    </ul>
                  </motion.button>

                  {/* 하드 모드 */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect('HARD')}
                    className="p-5 sm:p-6 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300 rounded-xl hover:border-red-500 transition-all text-left touch-manipulation"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-red-600 rounded-lg">
                        <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-red-800">하드 모드</h3>
                        <p className="text-xs sm:text-sm text-red-600">현실적 난이도</p>
                      </div>
                    </div>
                    <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">•</span>
                        <span>초기 자금: <strong className="text-red-800">20.0억 원</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">•</span>
                        <span>선수단 샐러리캡: <strong className="text-red-800">137억 원</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">•</span>
                        <span>용병 샐러리캡: <strong className="text-red-800">40억 원</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">•</span>
                        <span>수입 보너스 없음</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">•</span>
                        <span>하드 캡 (초과 시 진행 불가)</span>
                      </li>
                    </ul>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

