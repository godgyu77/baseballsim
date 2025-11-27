import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TEAMS, Team } from '../constants/TeamData';

interface TeamSelectorProps {
  onSelect: (team: Team) => void;
}

export default function TeamSelector({ onSelect }: TeamSelectorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? TEAMS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TEAMS.length - 1 ? 0 : prev + 1));
  };

  const handleSelect = () => {
    onSelect(TEAMS[currentIndex]);
  };

  return (
    <div className="min-h-screen bg-[#Fdfbf7] flex items-center justify-center p-3 sm:p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-baseball-green mb-2">⚾ 야구 매니지먼트 게임</h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">팀을 선택하세요</p>
        </div>

        <div className="relative">
          {/* 좌우 화살표 */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 shadow-lg rounded-full p-1.5 sm:p-2 transition-colors touch-manipulation"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-baseball-green" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 shadow-lg rounded-full p-1.5 sm:p-2 transition-colors touch-manipulation"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-baseball-green" />
          </button>

          {/* 카드 컨테이너 */}
          <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -300, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div
                  className="w-full max-w-md h-full rounded-xl sm:rounded-2xl shadow-2xl flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 cursor-pointer transform transition-transform active:scale-95 sm:hover:scale-105 touch-manipulation"
                  style={{
                    background: `linear-gradient(135deg, ${TEAMS[currentIndex].color} 0%, ${TEAMS[currentIndex].secondaryColor} 100%)`,
                  }}
                  onClick={handleSelect}
                >
                  <div className="text-5xl sm:text-6xl md:text-8xl mb-2 sm:mb-3 md:mb-4">{TEAMS[currentIndex].icon}</div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
                    {TEAMS[currentIndex].name}
                  </h2>
                  <p className="text-white/90 text-sm sm:text-base md:text-lg">{TEAMS[currentIndex].fullName}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 인디케이터 */}
          <div className="flex justify-center gap-2 mt-4 sm:mt-6">
            {TEAMS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 sm:h-2 rounded-full transition-all touch-manipulation ${
                  idx === currentIndex ? 'bg-baseball-green w-6 sm:w-8' : 'bg-gray-300 w-1.5 sm:w-2'
                }`}
              />
            ))}
          </div>

          {/* 선택 버튼 */}
          <div className="mt-4 sm:mt-6 md:mt-8 flex justify-center">
            <button
              onClick={handleSelect}
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-baseball-gold hover:bg-baseball-gold-dark active:bg-baseball-gold-dark text-baseball-green font-bold text-base sm:text-lg rounded-lg shadow-lg transition-colors touch-manipulation w-full sm:w-auto"
            >
              선택하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

