import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Shield } from 'lucide-react';
import { Difficulty } from '../constants/GameConfig';

interface DifficultyModalProps {
  isOpen: boolean;
  onSelect: (difficulty: Difficulty) => void;
}

// [UI FIX] 난이도 카드 데이터 구조화 (코드 간결화)
const difficultyData = [
  {
    id: 'EASY' as Difficulty,
    name: '이지 모드',
    subtitle: '힐링/초보자',
    icon: Trophy,
    gradient: 'from-green-50 to-emerald-50',
    border: 'border-green-300',
    borderHover: 'hover:border-green-500',
    iconBg: 'bg-green-500',
    titleColor: 'text-green-800',
    subtitleColor: 'text-green-600',
    bulletColor: 'text-green-600',
    strongColor: 'text-green-800',
    features: [
      '초기 자금: 80.0억 원',
      '선수단 샐러리캡: 250억 원',
      '용병 샐러리캡: 무제한',
      '아시아 쿼터 샐러리캡: 무제한',
      '수입 1.5배 보너스',
      '부상 없음, 성장 2배',
    ],
  },
  {
    id: 'NORMAL' as Difficulty,
    name: '노말 모드',
    subtitle: '현실적/추천',
    icon: Shield,
    gradient: 'from-blue-50 to-cyan-50',
    border: 'border-blue-300',
    borderHover: 'hover:border-blue-500',
    iconBg: 'bg-blue-500',
    titleColor: 'text-blue-800',
    subtitleColor: 'text-blue-600',
    bulletColor: 'text-blue-600',
    strongColor: 'text-blue-800',
    features: [
      '초기 자금: 30.0억 원',
      '선수단 샐러리캡: 137억 원',
      '용병 샐러리캡: 55억 원',
      '아시아 쿼터 샐러리캡: 3.0억 원',
      '수입 보너스 없음',
      '순수 데이터 기반',
    ],
  },
  {
    id: 'HARD' as Difficulty,
    name: '하드 모드',
    subtitle: '도전적/공정',
    icon: Shield,
    gradient: 'from-orange-50 to-amber-50',
    border: 'border-orange-300',
    borderHover: 'hover:border-orange-500',
    iconBg: 'bg-orange-500',
    titleColor: 'text-orange-800',
    subtitleColor: 'text-orange-600',
    bulletColor: 'text-orange-600',
    strongColor: 'text-orange-800',
    features: [
      '초기 자금: 20.0억 원',
      '선수단 샐러리캡: 120억 원',
      '용병 샐러리캡: 47.5억 원',
      '아시아 쿼터 샐러리캡: 2.5억 원',
      '수입 0.9배 감소',
      '부상 빈도 1.5배, 소프트 캡',
    ],
  },
  {
    id: 'HELL' as Difficulty,
    name: '헬 모드',
    subtitle: '극한도전',
    icon: Shield,
    gradient: 'from-red-50 to-orange-50',
    border: 'border-red-300',
    borderHover: 'hover:border-red-500',
    iconBg: 'bg-red-600',
    titleColor: 'text-red-800',
    subtitleColor: 'text-red-600',
    bulletColor: 'text-red-600',
    strongColor: 'text-red-800',
    features: [
      '초기 자금: 10.0억 원',
      '선수단 샐러리캡: 100억 원',
      '용병 샐러리캡: 40억 원',
      '아시아 쿼터 샐러리캡: 2.0억 원',
      '수입 0.8배 감소',
      '부상 지옥, 하드 캡',
    ],
  },
];

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
            {/* [UI FIX] PC에서 4열이 잘 보이도록 max-width 확장 */}
            <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full border-2 border-baseball-green/30 overflow-hidden max-h-[90vh] overflow-y-auto">
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
                {/* [UI FIX] 반응형 그리드 적용: Mobile 1열, Tablet 2열, PC 4열 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {/* [UI FIX] map 함수로 카드 렌더링 (코드 간결화) */}
                  {difficultyData.map((difficulty) => {
                    const IconComponent = difficulty.icon;
                    return (
                      <motion.button
                        key={difficulty.id}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelect(difficulty.id)}
                        className={`
                          h-full p-5 sm:p-6 
                          bg-gradient-to-br ${difficulty.gradient} 
                          border-2 ${difficulty.border} ${difficulty.borderHover}
                          rounded-xl 
                          shadow-md hover:shadow-xl
                          transition-all duration-300
                          text-left 
                          touch-manipulation
                          flex flex-col
                        `}
                      >
                        {/* 헤더 영역 */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`p-2 ${difficulty.iconBg} rounded-lg shadow-sm`}>
                            <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                          </div>
                          <div>
                            <h3 className={`text-lg sm:text-xl font-bold ${difficulty.titleColor}`}>
                              {difficulty.name}
                            </h3>
                            <p className={`text-xs sm:text-sm ${difficulty.subtitleColor}`}>
                              {difficulty.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* 기능 리스트 */}
                        <ul className="space-y-2 text-sm text-gray-700 flex-1">
                          {difficulty.features.map((feature, index) => {
                            // 강조 텍스트 추출 (예: "80.0억 원", "1.5배" 등)
                            const parts = feature.split(/(\d+\.?\d*억 원|\d+\.?\d*배|무제한)/);
                            return (
                              <li key={index} className="flex items-start gap-2">
                                <span className={`${difficulty.bulletColor} mt-0.5 flex-shrink-0`}>•</span>
                                <span>
                                  {parts.map((part, i) => {
                                    if (part.match(/\d+\.?\d*억 원|\d+\.?\d*배|무제한/)) {
                                      return (
                                        <strong key={i} className={difficulty.strongColor}>
                                          {part}
                                        </strong>
                                      );
                                    }
                                    return <span key={i}>{part}</span>;
                                  })}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

