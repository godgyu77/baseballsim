import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import PlayerCard, { PlayerCardData } from './PlayerCard';

export interface Player {
  id: string;
  name: string;
  position: string;
  stats?: {
    age?: number;
    overall?: number;
    salary?: number;
    [key: string]: any;
  };
  [key: string]: any;
}

interface EventModalProps {
  isOpen: boolean;
  type: 'DRAFT' | 'FA' | 'TRADE';
  title: string;
  players: Player[];
  onSelect: (player: Player) => void;
  onClose: () => void;
}

export default function EventModal({
  isOpen,
  type: _type,
  title,
  players,
  onSelect,
  onClose,
}: EventModalProps) {
  if (!isOpen) return null;

  const handleSelect = (player: Player) => {
    onSelect(player);
    onClose();
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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 safe-area-inset"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col border border-white/50">
              {/* Header */}
              <div className="bg-baseball-green text-white p-3 sm:p-4 flex items-center justify-between">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold truncate pr-2">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center flex-shrink-0"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 bg-gradient-to-b from-gray-50 to-white overscroll-contain">
                {players.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <div className="text-4xl mb-4">📋</div>
                    <p className="text-lg font-semibold mb-2">데이터가 없습니다</p>
                    <p className="text-sm text-gray-400">트레이드 가능한 선수가 없습니다.</p>
                    <button
                      onClick={onClose}
                      className="mt-6 px-6 py-2 bg-baseball-green hover:bg-baseball-green-dark text-white rounded-lg transition-colors"
                    >
                      닫기
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                    {players.map((player) => {
                    // 투수 포지션 판단 (키워드 확장: 좌투, 우투 추가)
                    const pitcherKeywords = ['투수', '선발', '불펜', '마무리', '좌투', '우투', 'P', 'SP', 'RP', 'CP'];
                    const isPitcher = pitcherKeywords.some(keyword => 
                      player.position.includes(keyword) || player.position === keyword
                    );
                    
                    // 현실적인 더미 데이터 생성 함수
                    const generateRandomStat = (min: number, max: number) => {
                      return Math.floor(Math.random() * (max - min + 1)) + min;
                    };
                    
                    // 스탯 값이 유효한지 확인하는 헬퍼 함수
                    const isValidStatValue = (value: any): boolean => {
                      return value !== null && value !== undefined && value !== 0 && !isNaN(value);
                    };
                    
                    // 기본 스탯 제공 (데이터가 없거나 0일 때 현실적인 더미 데이터)
                    const defaultPitcherStats = {
                      velocity: generateRandomStat(70, 95),
                      movement: generateRandomStat(60, 85),
                      control: generateRandomStat(55, 80),
                      breaking: generateRandomStat(60, 85),
                      stamina: generateRandomStat(65, 85),
                    };
                    
                    const defaultBatterStats = {
                      contactL: generateRandomStat(60, 85),
                      contactR: generateRandomStat(65, 90),
                      power: generateRandomStat(50, 80),
                      eye: generateRandomStat(55, 80),
                      defense: generateRandomStat(60, 85),
                      speed: generateRandomStat(55, 85),
                    };
                    
                    // 기존 스탯과 병합 (유효한 값만 사용, 0이거나 null이면 더미 데이터 사용)
                    const mergedStats = isPitcher ? {
                      velocity: isValidStatValue(player.stats?.velocity) ? player.stats!.velocity! : defaultPitcherStats.velocity,
                      movement: isValidStatValue(player.stats?.movement) ? player.stats!.movement! : defaultPitcherStats.movement,
                      control: isValidStatValue(player.stats?.control) ? player.stats!.control! : defaultPitcherStats.control,
                      breaking: isValidStatValue(player.stats?.breaking) ? player.stats!.breaking! : defaultPitcherStats.breaking,
                      stamina: isValidStatValue(player.stats?.stamina) ? player.stats!.stamina! : defaultPitcherStats.stamina,
                    } : {
                      contactL: isValidStatValue(player.stats?.contactL) ? player.stats!.contactL! : defaultBatterStats.contactL,
                      contactR: isValidStatValue(player.stats?.contactR) ? player.stats!.contactR! : defaultBatterStats.contactR,
                      power: isValidStatValue(player.stats?.power) ? player.stats!.power! : defaultBatterStats.power,
                      eye: isValidStatValue(player.stats?.eye) ? player.stats!.eye! : defaultBatterStats.eye,
                      defense: isValidStatValue(player.stats?.defense) ? player.stats!.defense! : defaultBatterStats.defense,
                      speed: isValidStatValue(player.stats?.speed) ? player.stats!.speed! : defaultBatterStats.speed,
                    };
                    
                    const cardData: PlayerCardData = {
                      id: player.id,
                      name: player.name,
                      position: player.position,
                      grade: player.stats?.overall 
                        ? player.stats.overall >= 90 ? 'S'
                        : player.stats.overall >= 80 ? 'A'
                        : player.stats.overall >= 70 ? 'B'
                        : player.stats.overall >= 60 ? 'C'
                        : 'D'
                        : 'C',
                      stats: {
                        ...mergedStats,
                        overall: player.stats?.overall || 65,
                        // 기존 stats의 다른 속성들도 유지
                        ...Object.fromEntries(
                          Object.entries(player.stats || {}).filter(([key]) => 
                            !['velocity', 'movement', 'control', 'breaking', 'stamina', 'contactL', 'contactR', 'power', 'eye', 'defense', 'speed', 'overall'].includes(key)
                          )
                        ),
                      },
                      age: player.stats?.age || player.age,
                      salary: player.stats?.salary || player.salary,
                    };
                    
                    return (
                      <PlayerCard
                        key={player.id}
                        player={cardData}
                        onClick={() => handleSelect(player)}
                      />
                    );
                  })}
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

