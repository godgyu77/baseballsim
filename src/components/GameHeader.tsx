import { Calendar, DollarSign, Building2, Trophy, KeyRound, Settings, Newspaper, Save, FolderOpen } from 'lucide-react';

import { Difficulty } from '../constants/GameConfig';

interface GameHeaderProps {
  teamName?: string;
  budget?: number | null;
  date?: string | null;
  season?: string;
  difficulty?: Difficulty;
  onApiKeyClick?: () => void;
  onFacilityClick?: () => void;
  onNewsClick?: () => void;
  onSaveClick?: () => void;
  onLoadClick?: () => void;
  newsCount?: number;
}

export default function GameHeader({ 
  teamName = '우리 팀', 
  budget = null, 
  date = null,
  season = '2026 시즌',
  difficulty,
  onApiKeyClick,
  onFacilityClick,
  onNewsClick,
  onSaveClick,
  onLoadClick,
  newsCount = 0
}: GameHeaderProps) {
  // budget이 null이거나 0이면 "시즌 준비 중" 표시
  const displayBudget = (budget !== null && budget > 0) ? budget.toLocaleString('ko-KR') + '원' : '시즌 준비 중';
  const displayDate = date || '시즌 준비 중';

  return (
    <div className="bg-gradient-to-r from-[#0F4C3A] to-[#0a3528] text-white shadow-lg border-b-2 border-baseball-gold">
      <div className="container mx-auto px-2 sm:px-3 md:px-6 py-1.5 sm:py-2 md:py-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
          {/* 왼쪽: 팀 정보 */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-baseball-gold flex-shrink-0" />
            <span className="font-black text-sm sm:text-base md:text-lg lg:text-xl tracking-tight truncate">{teamName}</span>
            {/* 난이도 뱃지 */}
            {difficulty && (
              <>
                <span className="hidden sm:inline text-baseball-gold/60">|</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold ${
                  difficulty === 'EASY' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-red-600 text-white'
                }`}>
                  {difficulty === 'EASY' ? '이지' : '하드'}
                </span>
              </>
            )}
            <span className="hidden sm:inline text-baseball-gold/60">|</span>
            <div className="hidden sm:flex items-center gap-1.5 text-baseball-gold">
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-semibold">{season}</span>
            </div>
          </div>
          
          {/* 오른쪽: 버튼 및 정보 */}
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 lg:gap-4 flex-shrink-0 flex-wrap w-full sm:w-auto justify-end">
            {/* 시설 관리, 뉴스, 저장/불러오기 및 API 키 설정 버튼 */}
            {(onFacilityClick || onNewsClick || onSaveClick || onLoadClick || onApiKeyClick) && (
              <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2 border-r border-baseball-gold/40 pr-0.5 sm:pr-1 md:pr-2 lg:pr-4">
                {onSaveClick && (
                  <button
                    onClick={onSaveClick}
                    className="p-1.5 sm:p-1.5 md:p-2 hover:bg-white/10 rounded transition-colors touch-manipulation min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center"
                    title="게임 저장"
                  >
                    <Save className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-baseball-gold" />
                  </button>
                )}
                {onLoadClick && (
                  <button
                    onClick={onLoadClick}
                    className="p-1.5 sm:p-1.5 md:p-2 hover:bg-white/10 rounded transition-colors touch-manipulation min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center"
                    title="게임 불러오기"
                  >
                    <FolderOpen className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-baseball-gold" />
                  </button>
                )}
                {onFacilityClick && (
                  <button
                    onClick={onFacilityClick}
                    className="p-1.5 sm:p-1.5 md:p-2 hover:bg-white/10 rounded transition-colors touch-manipulation min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center"
                    title="시설 관리"
                  >
                    <Settings className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-baseball-gold" />
                  </button>
                )}
                {onNewsClick && (
                  <button
                    onClick={onNewsClick}
                    className="p-1.5 sm:p-1.5 md:p-2 hover:bg-white/10 rounded transition-colors relative touch-manipulation min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center"
                    title="뉴스"
                  >
                    <Newspaper className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-baseball-gold" />
                    {newsCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-baseball-gold text-baseball-green text-[9px] sm:text-[10px] font-bold rounded-full w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center">
                        {newsCount > 9 ? '9+' : newsCount}
                      </span>
                    )}
                  </button>
                )}
                {onApiKeyClick && (
                  <button
                    onClick={onApiKeyClick}
                    className="p-1.5 sm:p-1.5 md:p-2 hover:bg-white/10 rounded transition-colors touch-manipulation min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px] flex items-center justify-center"
                    title="API 키 설정"
                  >
                    <KeyRound className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 text-baseball-gold" />
                  </button>
                )}
              </div>
            )}

            <span className="hidden md:inline text-baseball-gold/60">|</span>
            
            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 min-w-0">
              <DollarSign className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-[#C5A059] flex-shrink-0" />
              <span className="hidden lg:inline text-xs text-gray-300 font-sans">보유 자금</span>
              <span className="hidden lg:inline text-baseball-gold/60">|</span>
              <span className="font-mono font-bold text-[#C5A059] text-[10px] sm:text-xs md:text-sm truncate">
                {displayBudget}
              </span>
            </div>
            
            <span className="hidden md:inline text-baseball-gold/60">|</span>
            
            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-1.5 min-w-0">
              <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-baseball-gold flex-shrink-0" />
              <span className="hidden lg:inline text-xs text-gray-300 font-sans">날짜</span>
              <span className="hidden lg:inline text-baseball-gold/60">|</span>
              <span className="font-mono font-semibold text-[10px] sm:text-xs md:text-sm truncate">{displayDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

