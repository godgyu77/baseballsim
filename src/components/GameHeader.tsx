import { Calendar, DollarSign, Building2, Trophy, KeyRound, Settings } from 'lucide-react';

interface GameHeaderProps {
  teamName?: string;
  budget?: number | null;
  date?: string | null;
  season?: string;
  onApiKeyClick?: () => void;
  onFacilityClick?: () => void;
}

export default function GameHeader({ 
  teamName = '우리 팀', 
  budget = null, 
  date = null,
  season = '2026 시즌',
  onApiKeyClick,
  onFacilityClick
}: GameHeaderProps) {
  // budget이 null이거나 0이면 "시즌 준비 중" 표시
  const displayBudget = (budget !== null && budget > 0) ? budget.toLocaleString('ko-KR') + '원' : '시즌 준비 중';
  const displayDate = date || '시즌 준비 중';

  return (
    <div className="bg-gradient-to-r from-[#0F4C3A] to-[#0a3528] text-white shadow-lg border-b-2 border-baseball-gold">
      <div className="container mx-auto px-3 sm:px-6 py-2 sm:py-3">
        <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-3">
          <div className="flex items-center gap-4">
            <Building2 className="w-5 h-5 text-baseball-gold" />
            <span className="font-black text-lg sm:text-xl tracking-tight truncate max-w-[150px] sm:max-w-none">{teamName}</span>
            <span className="text-baseball-gold/60">|</span>
            <div className="flex items-center gap-1.5 text-baseball-gold">
              <Trophy className="w-4 h-4" />
              <span className="text-sm font-semibold">{season}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-4 flex-shrink-0 flex-wrap">
            {/* 시설 관리 및 API 키 설정 버튼 */}
            {(onFacilityClick || onApiKeyClick) && (
              <div className="flex items-center gap-1 sm:gap-2 border-r border-baseball-gold/40 pr-1 sm:pr-2 lg:pr-4">
                {onFacilityClick && (
                  <button
                    onClick={onFacilityClick}
                    className="p-1 sm:p-1.5 hover:bg-white/10 rounded transition-colors"
                    title="시설 관리"
                  >
                    <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-baseball-gold" />
                  </button>
                )}
                {onApiKeyClick && (
                  <button
                    onClick={onApiKeyClick}
                    className="p-1 sm:p-1.5 hover:bg-white/10 rounded transition-colors"
                    title="API 키 설정"
                  >
                    <KeyRound className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-baseball-gold" />
                  </button>
                )}
              </div>
            )}

            <span className="hidden sm:inline text-baseball-gold/60">|</span>
            
            <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
              <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A059] flex-shrink-0" />
              <span className="hidden sm:inline text-xs text-gray-300 font-sans">보유 자금</span>
              <span className="hidden sm:inline text-baseball-gold/60">|</span>
              <span className="font-mono font-bold text-[#C5A059] text-xs sm:text-sm truncate">
                {displayBudget}
              </span>
            </div>
            
            <span className="hidden sm:inline text-baseball-gold/60">|</span>
            
            <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-baseball-gold flex-shrink-0" />
              <span className="hidden sm:inline text-xs text-gray-300 font-sans">날짜</span>
              <span className="hidden sm:inline text-baseball-gold/60">|</span>
              <span className="font-mono font-semibold text-xs sm:text-sm truncate">{displayDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

