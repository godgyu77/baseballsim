import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy } from 'lucide-react';
import { TeamRecord } from '../lib/utils';

interface StandingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  standings: Record<string, TeamRecord>;
  myTeam: string;
}

export default function StandingsModal({ isOpen, onClose, standings, myTeam }: StandingsModalProps) {
  if (!isOpen) return null;

  // 순위표 데이터를 배열로 변환하고 정렬
  const sortedStandings = Object.entries(standings)
    .map(([teamName, record]) => ({
      teamName,
      ...record,
    }))
    .sort((a, b) => {
      // 승률 기준 내림차순 정렬
      const winPctA = a.winPercentage || 0;
      const winPctB = b.winPercentage || 0;
      if (winPctB !== winPctA) {
        return winPctB - winPctA;
      }
      // 승률이 같으면 승수 기준
      return b.wins - a.wins;
    })
    .map((team, index) => ({
      ...team,
      rank: index + 1,
    }));

  // 게임 차 계산 (1위와의 승차)
  const calculateGamesBehind = (team: typeof sortedStandings[0]): number | null => {
    if (sortedStandings.length === 0) return null;
    const firstPlace = sortedStandings[0];
    if (team.rank === 1) return 0;
    
    const winDiff = firstPlace.wins - team.wins;
    const lossDiff = team.losses - firstPlace.losses;
    const gamesBehind = (winDiff + lossDiff) / 2;
    
    return gamesBehind >= 0 ? gamesBehind : 0;
  };

  // 승률 포맷팅
  const formatWinPercentage = (winPct: number | undefined): string => {
    if (winPct === undefined || winPct === 0) return '.000';
    return winPct.toFixed(3).substring(1); // 0.xxx 형식에서 .xxx만 표시
  };

  // 게임 차 포맷팅
  const formatGamesBehind = (gb: number | null): string => {
    if (gb === null || gb === 0) return '-';
    return gb.toFixed(1);
  };

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
            <div className="bg-white rounded-t-3xl sm:rounded-xl md:rounded-2xl shadow-2xl max-w-4xl w-full h-[90vh] sm:h-auto sm:max-h-[85vh] md:max-h-[80vh] overflow-hidden flex flex-col border-2 border-baseball-green/30">
              {/* Header */}
              <div className="bg-gradient-to-r from-baseball-green to-[#0a3528] px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-baseball-gold flex-shrink-0" />
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white truncate">리그 순위표</h2>
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
              <div className="flex-1 overflow-y-auto px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 overscroll-contain">
                {sortedStandings.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-gray-400">
                    <Trophy className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 opacity-50" />
                    <p className="text-sm sm:text-base md:text-lg font-medium text-center px-4">순위표 데이터가 없습니다.</p>
                    <p className="text-xs sm:text-sm text-gray-400 mt-2 text-center px-4">경기 결과가 반영되면 순위표가 표시됩니다.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto -mx-2 sm:-mx-3 md:-mx-4 px-2 sm:px-3 md:px-4 touch-pan-x" style={{ WebkitOverflowScrolling: 'touch' }}>
                    <table className="w-full border-collapse text-xs sm:text-sm md:text-base min-w-full">
                      <colgroup>
                        <col style={{ width: '50px' }} />
                        <col style={{ width: 'auto', minWidth: '100px' }} />
                        <col style={{ width: '50px' }} />
                        <col style={{ width: '50px' }} />
                        <col style={{ width: '50px' }} />
                        <col style={{ width: '50px' }} />
                        <col style={{ width: '70px' }} />
                        <col style={{ width: '70px' }} />
                      </colgroup>
                      <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr>
                          <th className="px-2 sm:px-3 py-2 text-center text-xs sm:text-sm font-bold text-gray-700 border-b-2 border-gray-200 w-12">
                            순위
                          </th>
                          <th className="px-2 sm:px-3 py-2 text-left text-xs sm:text-sm font-bold text-gray-700 border-b-2 border-gray-200 min-w-[100px]">
                            팀명
                          </th>
                          <th className="px-2 sm:px-3 py-2 text-center text-xs sm:text-sm font-bold text-gray-700 border-b-2 border-gray-200 w-16">
                            G
                          </th>
                          <th className="px-2 sm:px-3 py-2 text-center text-xs sm:text-sm font-bold text-gray-700 border-b-2 border-gray-200 w-16">
                            W
                          </th>
                          <th className="px-2 sm:px-3 py-2 text-center text-xs sm:text-sm font-bold text-gray-700 border-b-2 border-gray-200 w-16">
                            D
                          </th>
                          <th className="px-2 sm:px-3 py-2 text-center text-xs sm:text-sm font-bold text-gray-700 border-b-2 border-gray-200 w-16">
                            L
                          </th>
                          <th className="px-2 sm:px-3 py-2 text-center text-xs sm:text-sm font-bold text-gray-700 border-b-2 border-gray-200 w-20">
                            승률
                          </th>
                          <th className="px-2 sm:px-3 py-2 text-center text-xs sm:text-sm font-bold text-gray-700 border-b-2 border-gray-200 w-20">
                            게임차
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {sortedStandings.map((team) => {
                          const isMyTeam = team.teamName === myTeam;
                          const gamesBehind = calculateGamesBehind(team);
                          
                          return (
                            <tr
                              key={team.teamName}
                              className={`transition-colors ${
                                isMyTeam
                                  ? 'bg-yellow-900/30 hover:bg-yellow-900/40 border-l-4 border-yellow-400'
                                  : 'hover:bg-gray-50'
                              }`}
                            >
                              <td className={`px-2 sm:px-3 py-2 text-center font-bold ${
                                isMyTeam ? 'text-yellow-400' : 'text-gray-700'
                              }`}>
                                {team.rank === 1 ? (
                                  <div className="flex items-center justify-center gap-1">
                                    <Trophy className="w-4 h-4 text-baseball-gold" />
                                    <span>{team.rank}</span>
                                  </div>
                                ) : (
                                  team.rank
                                )}
                              </td>
                              <td className={`px-2 sm:px-3 py-2 font-semibold ${
                                isMyTeam ? 'text-yellow-400' : 'text-gray-800'
                              }`}>
                                {team.teamName}
                              </td>
                              <td className={`px-2 sm:px-3 py-2 text-center font-mono ${
                                isMyTeam ? 'text-yellow-400' : 'text-gray-700'
                              }`}>
                                {team.gamesPlayed}
                              </td>
                              <td className={`px-2 sm:px-3 py-2 text-center font-bold ${
                                isMyTeam ? 'text-yellow-400' : 'text-green-600'
                              }`}>
                                {team.wins}
                              </td>
                              <td className={`px-2 sm:px-3 py-2 text-center font-bold ${
                                isMyTeam ? 'text-yellow-400' : 'text-gray-500'
                              }`}>
                                {team.draws}
                              </td>
                              <td className={`px-2 sm:px-3 py-2 text-center font-bold ${
                                isMyTeam ? 'text-yellow-400' : 'text-red-600'
                              }`}>
                                {team.losses}
                              </td>
                              <td className={`px-2 sm:px-3 py-2 text-center font-mono font-semibold ${
                                isMyTeam ? 'text-yellow-400' : 'text-gray-700'
                              }`}>
                                {formatWinPercentage(team.winPercentage)}
                              </td>
                              <td className={`px-2 sm:px-3 py-2 text-center font-mono ${
                                isMyTeam ? 'text-yellow-400' : 'text-gray-600'
                              }`}>
                                {formatGamesBehind(gamesBehind)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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

