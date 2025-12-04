import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Home, Plane } from 'lucide-react';
import { GameResult } from '../lib/utils';

interface GameResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  lastGameResult: GameResult | null;
}

export default function GameResultModal({ isOpen, onClose, lastGameResult }: GameResultModalProps) {
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
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-2 md:p-4"
            style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-t-3xl sm:rounded-xl md:rounded-2xl shadow-2xl max-w-2xl w-full h-[90vh] sm:h-auto sm:max-h-[85vh] md:max-h-[80vh] overflow-hidden flex flex-col border-2 border-baseball-green/30">
              {/* Header */}
              <div className="bg-gradient-to-r from-baseball-green to-[#0a3528] px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-baseball-gold flex-shrink-0" />
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white truncate">경기 결과</h2>
                  {lastGameResult?.date && (
                    <span className="text-xs sm:text-sm md:text-base text-baseball-gold/80 whitespace-nowrap flex-shrink-0 ml-2">
                      {lastGameResult.date}
                    </span>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 active:bg-white/30 rounded-lg transition-colors flex-shrink-0 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                  title="닫기"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6 overscroll-contain">
                {!lastGameResult ? (
                  <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-gray-400">
                    <Trophy className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 opacity-50" />
                    <p className="text-sm sm:text-base md:text-lg font-medium text-center px-4">최근 경기 기록이 없습니다.</p>
                    <p className="text-xs sm:text-sm text-gray-400 mt-2 text-center px-4">경기 결과가 반영되면 여기에 표시됩니다.</p>
                  </div>
                ) : (
                  <>
                    {/* 상단: 점수 표시 */}
                    <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
                      {/* 홈팀 */}
                      <div className={`flex-1 text-center ${lastGameResult.winner === 'home' ? 'opacity-100' : 'opacity-60'}`}>
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Home className="w-4 h-4 sm:w-5 sm:h-5 text-baseball-green" />
                          <span className="text-sm sm:text-base font-semibold text-gray-600">HOME</span>
                        </div>
                        <div className="text-2xl sm:text-3xl md:text-4xl font-black text-baseball-green mb-1">
                          {lastGameResult.homeTeam}
                        </div>
                        <div className={`text-4xl sm:text-5xl md:text-6xl font-black ${
                          lastGameResult.winner === 'home' ? 'text-baseball-green' : 'text-gray-400'
                        }`}>
                          {lastGameResult.homeScore}
                        </div>
                        {lastGameResult.winner === 'home' && (
                          <div className="mt-2 flex items-center justify-center gap-1">
                            <Trophy className="w-4 h-4 text-baseball-gold" />
                            <span className="text-xs sm:text-sm font-bold text-baseball-gold">승리</span>
                          </div>
                        )}
                      </div>

                      {/* VS */}
                      <div className="text-2xl sm:text-3xl font-bold text-gray-400">VS</div>

                      {/* 원정팀 */}
                      <div className={`flex-1 text-center ${lastGameResult.winner === 'away' ? 'opacity-100' : 'opacity-60'}`}>
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Plane className="w-4 h-4 sm:w-5 sm:h-5 text-baseball-green" />
                          <span className="text-sm sm:text-base font-semibold text-gray-600">AWAY</span>
                        </div>
                        <div className="text-2xl sm:text-3xl md:text-4xl font-black text-baseball-green mb-1">
                          {lastGameResult.awayTeam}
                        </div>
                        <div className={`text-4xl sm:text-5xl md:text-6xl font-black ${
                          lastGameResult.winner === 'away' ? 'text-baseball-green' : 'text-gray-400'
                        }`}>
                          {lastGameResult.awayScore}
                        </div>
                        {lastGameResult.winner === 'away' && (
                          <div className="mt-2 flex items-center justify-center gap-1">
                            <Trophy className="w-4 h-4 text-baseball-gold" />
                            <span className="text-xs sm:text-sm font-bold text-baseball-gold">승리</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 무승부 표시 */}
                    {lastGameResult.winner === 'draw' && (
                      <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                          <span className="text-sm sm:text-base font-semibold text-gray-600">무승부</span>
                        </div>
                      </div>
                    )}

                    {/* 중단: 주요 기록 (향후 확장 가능) */}
                    <div className="border-t border-gray-200 pt-4 sm:pt-6">
                      <div className="text-center text-sm sm:text-base text-gray-500">
                        {/* 향후 승리 투수, 패전 투수, 결승타 등 데이터가 있으면 여기에 표시 */}
                        <p className="text-gray-400">상세 기록은 추후 추가 예정입니다.</p>
                      </div>
                    </div>

                    {/* 우리 팀 경기 강조 */}
                    {lastGameResult.isMyTeamGame && (
                      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-baseball-green/10 rounded-lg border border-baseball-green/20">
                        <p className="text-sm sm:text-base text-center font-semibold text-baseball-green">
                          ⚾ 우리 팀 경기
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* 하단: 확인 버튼 */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200 flex-shrink-0">
                <button
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-baseball-green to-[#0a3528] text-white font-bold py-3 sm:py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all active:scale-95 touch-manipulation"
                >
                  확인
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

