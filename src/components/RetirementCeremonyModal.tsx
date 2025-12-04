import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Shirt, Award, Sparkles } from 'lucide-react';
import { RetirementResult } from '../types';
import { Team } from '../constants/TeamData';

interface RetirementCeremonyModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: RetirementResult | null;
  team?: Team; // 구단 정보 (색상 등)
}

export default function RetirementCeremonyModal({
  isOpen,
  onClose,
  result,
  team,
}: RetirementCeremonyModalProps) {
  if (!isOpen || !result) return null;

  // 구단 색상 가져오기
  const teamColor = team?.color || '#0F4C3A';
  const teamSecondaryColor = team?.secondaryColor || '#C5A059';

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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
            style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-5xl w-full h-[90vh] sm:h-auto sm:max-h-[90vh] overflow-hidden flex flex-col border-2 border-gray-200">
              {/* Header */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                    {result.playerName} 선수 은퇴식
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 active:bg-white/30 rounded-lg transition-colors flex-shrink-0 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                  title="닫기"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Content - 좌/우 분할 */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                <div className="grid grid-cols-1 md:grid-cols-2 h-full min-h-[500px]">
                  {/* 좌측: KBO 리그 레전드 심사 */}
                  <div className="bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100 border-r-2 border-yellow-300 p-4 sm:p-6 flex flex-col">
                    {/* 헤더 */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                        <Trophy className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900">
                          KBO 명예의 전당
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600">전체 팬 투표</p>
                      </div>
                    </div>

                    {/* 점수 */}
                    <div className="mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl sm:text-5xl md:text-6xl font-black text-yellow-600">
                          {result.leagueLegendVote.score}
                        </span>
                        <span className="text-xl sm:text-2xl text-gray-600">/ 100</span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-700 mt-1">
                        {result.leagueLegendVote.rankPrediction}
                      </p>
                    </div>

                    {/* 헌액 결과 */}
                    {result.leagueLegendVote.isInducted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-yellow-200 to-amber-300 rounded-xl p-6 mb-4 relative overflow-hidden"
                      >
                        {/* 금가루 애니메이션 효과 */}
                        <motion.div
                          animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 1, 0.3],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <Sparkles className="w-24 h-24 text-yellow-500 opacity-30" />
                        </motion.div>
                        <Trophy className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-600 mb-3 relative z-10" />
                        <p className="text-xl sm:text-2xl font-black text-gray-900 relative z-10">
                          헌액 확정
                        </p>
                        <p className="text-sm sm:text-base text-gray-700 mt-2 relative z-10 text-center">
                          명예의 전당에 헌액되었습니다
                        </p>
                      </motion.div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 rounded-xl p-6 mb-4">
                        <Award className="w-16 h-16 sm:w-20 sm:h-20 text-gray-400 mb-3" />
                        <p className="text-lg sm:text-xl font-bold text-gray-600">
                          헌액 실패
                        </p>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                          기준 점수 미달
                        </p>
                      </div>
                    )}

                    {/* 코멘트 */}
                    <div className="bg-white/80 rounded-lg p-3 sm:p-4 border border-yellow-200">
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                        {result.leagueLegendVote.comment}
                      </p>
                    </div>
                  </div>

                  {/* 우측: 구단 영구결번 심사 */}
                  <div
                    className="bg-gradient-to-br p-4 sm:p-6 flex flex-col"
                    style={{
                      background: `linear-gradient(to bottom right, ${teamColor}15, ${teamSecondaryColor}15, white)`,
                      borderLeft: `2px solid ${teamColor}40`,
                    }}
                  >
                    {/* 헤더 */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: teamColor }}
                      >
                        <Shirt className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <div>
                        <h3
                          className="text-lg sm:text-xl md:text-2xl font-black"
                          style={{ color: teamColor }}
                        >
                          {result.teamRetiredNumberVote.teamName} 영구결번 심사
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600">구단 팬 투표</p>
                      </div>
                    </div>

                    {/* 점수 */}
                    <div className="mb-4">
                      <div className="flex items-baseline gap-2">
                        <span
                          className="text-4xl sm:text-5xl md:text-6xl font-black"
                          style={{ color: teamColor }}
                        >
                          {result.teamRetiredNumberVote.score}
                        </span>
                        <span className="text-xl sm:text-2xl text-gray-600">/ 100</span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-700 mt-1">
                        기준: 90점 이상
                      </p>
                    </div>

                    {/* 영구결번 결과 */}
                    {result.teamRetiredNumberVote.isRetired ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex-1 flex flex-col items-center justify-center rounded-xl p-6 mb-4 relative overflow-hidden"
                        style={{
                          background: `linear-gradient(to bottom right, ${teamColor}20, ${teamSecondaryColor}20)`,
                          border: `3px solid ${teamColor}`,
                        }}
                      >
                        {/* 유니폼 액자 연출 */}
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="relative z-10"
                        >
                          <div
                            className="w-32 h-40 sm:w-40 sm:h-48 bg-white rounded-lg shadow-2xl border-4 mb-4 flex items-center justify-center"
                            style={{ borderColor: teamColor }}
                          >
                            <Shirt
                              className="w-20 h-20 sm:w-24 sm:h-24"
                              style={{ color: teamColor }}
                            />
                          </div>
                        </motion.div>
                        <p
                          className="text-xl sm:text-2xl font-black relative z-10"
                          style={{ color: teamColor }}
                        >
                          영구결번 확정
                        </p>
                        <p className="text-sm sm:text-base text-gray-700 mt-2 relative z-10 text-center">
                          등번호가 영구 봉인되었습니다
                        </p>
                      </motion.div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 rounded-xl p-6 mb-4">
                        <Shirt className="w-16 h-16 sm:w-20 sm:h-20 text-gray-400 mb-3" />
                        <p className="text-lg sm:text-xl font-bold text-gray-600">
                          영구결번 실패
                        </p>
                        <p className="text-sm text-gray-500 mt-2 text-center">
                          기준 점수 미달
                        </p>
                      </div>
                    )}

                    {/* 코멘트 */}
                    <div
                      className="bg-white/80 rounded-lg p-3 sm:p-4 border"
                      style={{ borderColor: `${teamColor}40` }}
                    >
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                        {result.teamRetiredNumberVote.comment}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 통산 기록 요약 */}
                <div className="bg-gray-50 border-t-2 border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
                  <h4 className="text-sm sm:text-base font-bold text-gray-700 mb-2">통산 기록</h4>
                  <p className="text-xs sm:text-sm text-gray-600">{result.statsSummary}</p>
                </div>
              </div>

              {/* 하단: 확인 버튼 */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200 flex-shrink-0">
                <button
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold py-3 sm:py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all active:scale-95 touch-manipulation"
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

