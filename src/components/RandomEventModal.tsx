import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { RandomEvent } from '../lib/utils';

interface RandomEventModalProps {
  event: RandomEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onChoiceSelect?: (choiceIndex: number) => void;
}

export default function RandomEventModal({
  event,
  isOpen,
  onClose,
  onChoiceSelect,
}: RandomEventModalProps) {
  if (!event || !isOpen) return null;

  const getTypeIcon = () => {
    switch (event.type) {
      case 'positive':
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case 'negative':
        return <XCircle className="w-8 h-8 text-red-500" />;
      case 'choice':
        return <AlertCircle className="w-8 h-8 text-yellow-500" />;
      default:
        return <AlertCircle className="w-8 h-8 text-gray-500" />;
    }
  };

  const getTypeColor = () => {
    switch (event.type) {
      case 'positive':
        return 'from-green-500/20 to-green-600/10 border-green-500/30';
      case 'negative':
        return 'from-red-500/20 to-red-600/10 border-red-500/30';
      case 'choice':
        return 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30';
      default:
        return 'from-gray-500/20 to-gray-600/10 border-gray-500/30';
    }
  };

  const formatEffect = (effect: RandomEvent['effect']) => {
    const effects: string[] = [];
    if (effect.budget) {
      const amount = Math.abs(effect.budget);
      const sign = effect.budget > 0 ? '+' : '-';
      effects.push(`${sign}${(amount / 100000000).toFixed(1)}억 원`);
    }
    if (effect.morale) {
      effects.push(`팀 사기 ${effect.morale > 0 ? '+' : ''}${effect.morale}`);
    }
    if (effect.playerCondition) {
      effects.push(`선수 컨디션 ${effect.playerCondition > 0 ? '+' : ''}${effect.playerCondition}`);
    }
    if (effect.fanLoyalty) {
      effects.push(`팬 충성도 ${effect.fanLoyalty > 0 ? '+' : ''}${effect.fanLoyalty}`);
    }
    return effects.length > 0 ? effects.join(', ') : '효과 없음';
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
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`bg-white rounded-2xl shadow-2xl max-w-md w-full border-2 ${getTypeColor()}`}>
              {/* Header */}
              <div className={`bg-gradient-to-r ${getTypeColor()} px-6 py-4 rounded-t-2xl flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  {getTypeIcon()}
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{event.title}</h2>
                    <p className="text-xs text-gray-600 mt-0.5">돌발 이벤트</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 py-5">
                <p className="text-gray-700 leading-relaxed mb-4">{event.message}</p>

                {/* Effect Display */}
                {!event.choices && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-baseball-green" />
                      <span className="font-semibold text-gray-700">효과:</span>
                      <span className="text-gray-600">{formatEffect(event.effect)}</span>
                    </div>
                  </div>
                )}

                {/* Choices */}
                {event.choices && event.choices.length > 0 && (
                  <div className="space-y-2 mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">선택하세요:</p>
                    {event.choices.map((choice, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          onChoiceSelect?.(index);
                          onClose();
                        }}
                        className="w-full text-left px-4 py-3 bg-gradient-to-r from-baseball-green/10 to-baseball-green/5 border-2 border-baseball-green/30 rounded-lg hover:border-baseball-green hover:bg-gradient-to-r hover:from-baseball-green/20 hover:to-baseball-green/10 transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-800">{choice.label}</span>
                          <div className="text-xs text-gray-600 bg-white/50 px-2 py-1 rounded">
                            {formatEffect(choice.effect)}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Close Button (for non-choice events) */}
                {!event.choices && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="w-full px-4 py-3 bg-gradient-to-r from-baseball-green to-[#0a3528] text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    확인
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

