import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import PlayerCard, { PlayerCardData } from './PlayerCard';

interface PlayerCardModalProps {
  isOpen: boolean;
  players: PlayerCardData[];
  onClose: () => void;
}

export default function PlayerCardModal({ isOpen, players, onClose }: PlayerCardModalProps) {
  if (!isOpen || !players || players.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && players.length > 0 && (
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-white/50">
              {/* Header */}
              <div className="bg-baseball-green text-white p-4 flex items-center justify-between flex-shrink-0">
                <h2 className="text-2xl font-bold">선수 목록</h2>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {players.map((player) => (
                    <PlayerCard
                      key={player.id}
                      player={player}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

