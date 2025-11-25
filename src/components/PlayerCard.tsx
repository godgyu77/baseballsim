import { motion } from 'framer-motion';

export interface PlayerCardData {
  id: string;
  name: string;
  position: string;
  grade?: 'S' | 'A' | 'B' | 'C' | 'D';
  stats?: {
    overall?: number;
    // 투수 스탯
    velocity?: number; // 구속
    movement?: number; // 구위
    control?: number; // 제구
    breaking?: number; // 변화구
    stamina?: number; // 체력
    // 타자 스탯
    contactL?: number; // 교타(좌)
    contactR?: number; // 교타(우)
    power?: number; // 장타
    eye?: number; // 선구안
    defense?: number; // 수비
    speed?: number; // 주루
    [key: string]: any;
  };
  age?: number;
  salary?: number;
  [key: string]: any;
}

interface PlayerCardProps {
  player: PlayerCardData;
  onClick?: () => void;
}

const gradeColors = {
  S: 'from-yellow-400 to-yellow-600',
  A: 'from-red-500 to-red-700',
  B: 'from-blue-500 to-blue-700',
  C: 'from-green-500 to-green-700',
  D: 'from-gray-400 to-gray-600',
};

const gradeLabels = {
  S: 'S급',
  A: 'A급',
  B: 'B급',
  C: 'C급',
  D: 'D급',
};

const PlayerCard = ({ player, onClick }: PlayerCardProps) => {
  const grade = player.grade || 'C';
  const overall = player.stats?.overall || 0;
  
  // 투수 포지션 판단 (더 정확하게: 좌투, 우투 추가)
  const pitcherKeywords = ['투수', '선발', '불펜', '마무리', '좌투', '우투', 'P', 'SP', 'RP', 'CP'];
  const isPitcher = pitcherKeywords.some(keyword => 
    player.position.includes(keyword) || player.position === keyword
  );
  
  const normalizeStat = (value: number | undefined, defaultValue: number = 50) => {
    if (value === undefined || value === null) return defaultValue;
    return Math.min(100, Math.max(0, value));
  };

  // 포지션별 스탯 구성 (기본값 제공)
  const pitcherStats = {
    velocity: normalizeStat(player.stats?.velocity, 70),
    movement: normalizeStat(player.stats?.movement, 65),
    control: normalizeStat(player.stats?.control, 60),
    breaking: normalizeStat(player.stats?.breaking, 65),
    stamina: normalizeStat(player.stats?.stamina, 70),
  };

  const batterStats = {
    contactL: normalizeStat(player.stats?.contactL, 65),
    contactR: normalizeStat(player.stats?.contactR, 70),
    power: normalizeStat(player.stats?.power, 60),
    eye: normalizeStat(player.stats?.eye, 65),
    defense: normalizeStat(player.stats?.defense, 65),
    speed: normalizeStat(player.stats?.speed, 60),
  };

  const statLabels = isPitcher ? {
    velocity: '구속',
    movement: '구위',
    control: '제구',
    breaking: '변화구',
    stamina: '체력',
  } : {
    contactL: '교타(좌)',
    contactR: '교타(우)',
    power: '장타',
    eye: '선구안',
    defense: '수비',
    speed: '주루',
  };

  const stats = isPitcher ? pitcherStats : batterStats;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative bg-white rounded-lg shadow-lg overflow-hidden border border-gray-300 cursor-pointer transition-all ${
        onClick ? 'hover:shadow-xl' : ''
      }`}
    >
      {/* 등급 배지 */}
      <div className={`absolute top-2 right-2 px-2 py-1 rounded text-white text-xs font-black shadow-md bg-gradient-to-r ${gradeColors[grade]} z-10`}>
        {gradeLabels[grade]}
      </div>

      {/* 선수 헤더 */}
      <div className="bg-gradient-to-r from-baseball-green to-baseball-green-dark p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-black text-xl mb-1">{player.name}</h3>
            <div className="flex items-center gap-3 text-sm">
              <span className="font-semibold">{player.position}</span>
              {player.age && (
                <>
                  <span className="text-white/60">|</span>
                  <span className="text-white/80">{player.age}세</span>
                </>
              )}
            </div>
          </div>
          <div className="text-5xl opacity-20">⚾</div>
        </div>
      </div>

      {/* 종합 능력치 */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">종합 능력치</span>
          <span className="text-lg font-black font-mono text-baseball-green">{overall}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-baseball-green to-baseball-gold h-3 rounded-full transition-all"
            style={{ width: `${overall}%` }}
          />
        </div>
      </div>

      {/* 상세 스탯 */}
      <div className="p-4 space-y-2.5">
        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
          {isPitcher ? '투수 스탯' : '타자 스탯'}
        </div>
        {Object.entries(stats).map(([key, value]) => {
          const label = statLabels[key as keyof typeof statLabels];
          return (
            <div key={key} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-700 font-medium w-20">{label}</span>
                <span className="text-xs font-mono font-bold text-gray-800 w-10 text-right">{value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    value >= 80 ? 'bg-green-500' :
                    value >= 60 ? 'bg-blue-500' :
                    value >= 40 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 연봉 정보 */}
      {player.salary && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">연봉</span>
            <span className="text-sm font-mono font-bold text-baseball-green">
              {player.salary.toLocaleString('ko-KR')}원
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PlayerCard;
