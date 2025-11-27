import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Building2, Activity, Megaphone, Search, ChevronRight } from 'lucide-react';
import { FacilityState, FacilityType } from '../lib/utils';
import { FACILITY_DEFINITIONS } from '../constants/Facilities';

interface FacilityManagementProps {
  isOpen: boolean;
  onClose: () => void;
  facilities: FacilityState;
  budget: number | null;
  onUpgrade: (type: FacilityType) => void;
}

const facilityIcons = {
  training: Building2,
  medical: Activity,
  marketing: Megaphone,
  scouting: Search,
};

const facilityDescriptions = {
  training: '선수들의 훈련 효율을 높여 경험치 획득량을 증가시킵니다.',
  medical: '선수들의 부상 확률을 낮추고 회복 속도를 높입니다.',
  marketing: '경기 수익과 후원금을 증가시킵니다.',
  scouting: '더 높은 등급의 유망주를 발견할 확률을 높입니다.',
};

export default function FacilityManagement({
  isOpen,
  onClose,
  facilities,
  budget,
  onUpgrade,
}: FacilityManagementProps) {
  if (!isOpen) return null;

  const canAfford = (cost: number) => {
    return budget !== null && budget >= cost;
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border-2 border-baseball-green/20 max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="bg-gradient-to-r from-baseball-green to-[#0a3528] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-baseball-gold" />
                  <div>
                    <h2 className="text-xl font-bold text-white">구단 시설 관리</h2>
                    <p className="text-xs text-baseball-gold/80 mt-0.5">시설을 업그레이드하여 팀을 강화하세요</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-6 py-5">
                <div className="space-y-4">
                  {(Object.keys(facilities) as FacilityType[]).map((type) => {
                    const facility = facilities[type];
                    const definition = FACILITY_DEFINITIONS.find((f) => f.type === type);
                    if (!definition) return null;
                    const currentEffect = definition.effect(facility.level);
                    const nextLevelEffect = facility.level < definition.maxLevel 
                      ? definition.effect(facility.level + 1)
                      : null;
                    const upgradeCost = definition.upgradeCost(facility.level);
                    const canUpgrade = facility.level < definition.maxLevel && canAfford(upgradeCost);
                    const Icon = facilityIcons[type];

                    return (
                      <motion.div
                        key={type}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (Object.keys(facilities) as FacilityType[]).indexOf(type) * 0.1 }}
                        className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-5 hover:border-baseball-green/30 transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-baseball-green/10 rounded-lg">
                              <Icon className="w-6 h-6 text-baseball-green" />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-gray-800">{definition.name}</h3>
                              <p className="text-xs text-gray-600 mt-0.5">{facilityDescriptions[type]}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-baseball-green">
                              Lv.{facility.level} / {definition.maxLevel}
                            </div>
                            {facility.level < definition.maxLevel && (
                              <div className="text-xs text-gray-500 mt-1">
                                다음 레벨: Lv.{facility.level + 1}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Current Effect */}
                        <div className="bg-white rounded-lg p-3 mb-3 border border-gray-200">
                          <div className="flex items-center gap-2 text-sm">
                            <TrendingUp className="w-4 h-4 text-baseball-green" />
                            <span className="font-semibold text-gray-700">현재 효과:</span>
                            <span className="text-gray-600">{currentEffect.description}</span>
                          </div>
                        </div>

                        {/* Next Level Effect */}
                        {nextLevelEffect && (
                          <div className="bg-baseball-green/5 rounded-lg p-3 mb-3 border border-baseball-green/20">
                            <div className="flex items-center gap-2 text-sm">
                              <ChevronRight className="w-4 h-4 text-baseball-green" />
                              <span className="font-semibold text-baseball-green">다음 레벨 효과:</span>
                              <span className="text-gray-700">{nextLevelEffect.description}</span>
                            </div>
                          </div>
                        )}

                        {/* Upgrade Button */}
                        {facility.level < definition.maxLevel ? (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => canUpgrade && onUpgrade(type)}
                            disabled={!canUpgrade}
                            className={`w-full px-4 py-3 rounded-lg font-bold transition-all ${
                              canUpgrade
                                ? 'bg-gradient-to-r from-baseball-green to-[#0a3528] text-white shadow-lg hover:shadow-xl'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {canUpgrade ? (
                              <div className="flex items-center justify-between">
                                <span>업그레이드</span>
                                <span className="text-sm">{(upgradeCost / 100000000).toFixed(1)}억 원</span>
                              </div>
                            ) : (
                              <div className="flex items-center justify-between">
                                <span>자금 부족</span>
                                <span className="text-sm">{(upgradeCost / 100000000).toFixed(1)}억 원 필요</span>
                              </div>
                            )}
                          </motion.button>
                        ) : (
                          <div className="w-full px-4 py-3 bg-gray-100 rounded-lg text-center text-sm font-semibold text-gray-500">
                            최대 레벨 달성
                          </div>
                        )}
                      </motion.div>
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

