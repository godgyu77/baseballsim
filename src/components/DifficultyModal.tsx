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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* 이지 모드 */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect('EASY')}
                    className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl hover:border-green-500 transition-all text-left touch-manipulation"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="p-1.5 sm:p-2 bg-green-500 rounded-lg">
                        <Trophy className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-green-800">이지 모드</h3>
                        <p className="text-[10px] sm:text-xs md:text-sm text-green-600">힐링/초보자</p>
                      </div>
                    </div>
                    <ul className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs md:text-sm text-gray-700">
                      <li className="flex items-start gap-1.5 sm:gap-2">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span>초기 자금: <strong className="text-green-800">80.0억 원</strong></span>
                      </li>
                      <li className="flex items-start gap-1.5 sm:gap-2">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span>선수단 샐러리캡: <strong className="text-green-800">250억 원</strong></span>
                      </li>
                      <li className="flex items-start gap-1.5 sm:gap-2">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span>용병 샐러리캡: <strong className="text-green-800">무제한</strong></span>
                      </li>
                      <li className="flex items-start gap-1.5 sm:gap-2">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span>수입 <strong className="text-green-800">1.5배</strong> 보너스</span>
                      </li>
                      <li className="flex items-start gap-1.5 sm:gap-2">
                        <span className="text-green-600 mt-0.5">•</span>
                        <span>부상 없음, 성장 2배</span>
                      </li>
                    </ul>
                  </motion.button>

                  {/* 노말 모드 */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect('NORMAL')}
                    className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-xl hover:border-blue-500 transition-all text-left touch-manipulation"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="p-1.5 sm:p-2 bg-blue-500 rounded-lg">
                        <Shield className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-blue-800">노말 모드</h3>
                        <p className="text-[10px] sm:text-xs md:text-sm text-blue-600">현실적/추천</p>
                      </div>
                    </div>
                    <ul className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs md:text-sm text-gray-700">
                      <li className="flex items-start gap-1.5 sm:gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>초기 자금: <strong className="text-blue-800">30.0억 원</strong></span>
                      </li>
                      <li className="flex items-start gap-1.5 sm:gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>선수단 샐러리캡: <strong className="text-blue-800">137억 원</strong></span>
                      </li>
                      <li className="flex items-start gap-1.5 sm:gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>용병 샐러리캡: <strong className="text-blue-800">55억 원</strong></span>
                      </li>
                      <li className="flex items-start gap-1.5 sm:gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>수입 보너스 없음</span>
                      </li>
                      <li className="flex items-start gap-1.5 sm:gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>순수 데이터 기반</span>
                      </li>
                    </ul>
                  </motion.button>

                  {/* 헬 모드 */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect('HELL')}
                    className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300 rounded-xl hover:border-red-500 transition-all text-left touch-manipulation"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="p-1.5 sm:p-2 bg-red-600 rounded-lg">
                        <Shield className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-red-800">헬 모드</h3>
                        <p className="text-[10px] sm:text-xs md:text-sm text-red-600">극한도전</p>
                      </div>
                    </div>
                    <ul className="space-y-1.5 sm:space-y-2 text-[10px] sm:text-xs md:text-sm text-gray-700">
                      <li className="flex items-start gap-1.5 sm:gap-2">
                        <span className="text-red-600 mt-0.5">•</span>
                        <span>초기 자금: <strong className="text-red-800">10.0억 원</strong></span>
                      </li>
                      <li className="flex items-start gap-1.5 sm:gap-2">
                        <span className="text-red-600 mt-0.5">•</span>
                        <span>선수단 샐러리캡: <strong className="text-red-800">100억 원</strong></span>
                      </li>
                      <li className="flex items-start gap-1.5 sm:gap-2">
                        <span className="text-red-600 mt-0.5">•</span>
                        <span>용병 샐러리캡: <strong className="text-red-800">40억 원</strong></span>
                      </li>
                      <li className="flex items-start gap-1.5 sm:gap-2">
                        <span className="text-red-600 mt-0.5">•</span>
                        <span>수입 <strong className="text-red-800">0.8배</strong> 감소</span>
                      </li>
                      <li className="flex items-start gap-1.5 sm:gap-2">
                        <span className="text-red-600 mt-0.5">•</span>
                        <span>부상 지옥, 하드 캡</span>
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

