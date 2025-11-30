import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TEAMS, Team } from '../constants/TeamData';

// 신생 구단 옵션 (가상의 팀)
const EXPANSION_TEAM: Team = {
  id: 'expansion',
  name: '신생 구단',
  fullName: '✨ 신생 구단 창단 (11구단)',
  color: '#8B5CF6',
  secondaryColor: '#EC4899',
  icon: '⭐',
};

const ALL_TEAMS = [...TEAMS, EXPANSION_TEAM];

interface TeamSelectorProps {
  onSelect: (team: Team | 'expansion') => void;
}

export default function TeamSelector({ onSelect }: TeamSelectorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 스와이프 제스처 처리
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? ALL_TEAMS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === ALL_TEAMS.length - 1 ? 0 : prev + 1));
  };

  const handleSelect = () => {
    const selected = ALL_TEAMS[currentIndex];
    if (selected.id === 'expansion') {
      onSelect('expansion');
    } else {
      onSelect(selected);
    }
  };

  return (
    <div className="min-h-screen bg-[#Fdfbf7] flex items-center justify-center p-0 sm:p-2 md:p-4 overflow-x-hidden">
      <div className="w-full max-w-4xl px-3 sm:px-4 md:px-6">
        {/* 헤더 */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8 px-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-baseball-green mb-1 sm:mb-2">⚾ 야구 매니지먼트 게임</h1>
          <p className="text-gray-600 text-xs sm:text-sm md:text-base lg:text-lg">팀을 선택하세요</p>
        </div>

        {/* 모바일 전용 레이아웃 */}
        <div className="block md:hidden">
          <div 
            ref={containerRef}
            className="relative w-full"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* 카드 컨테이너 - 모바일 */}
            <div className="relative h-[280px] sm:h-[320px] overflow-hidden mx-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 300, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -300, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 flex items-center justify-center px-2"
                >
                  <div
                    className="w-full h-full rounded-xl shadow-2xl flex flex-col items-center justify-center p-4 sm:p-6 cursor-pointer transform transition-transform active:scale-[0.98] touch-manipulation"
                    style={{
                      background: `linear-gradient(135deg, ${ALL_TEAMS[currentIndex].color} 0%, ${ALL_TEAMS[currentIndex].secondaryColor} 100%)`,
                    }}
                    onClick={handleSelect}
                  >
                    <div className="text-5xl sm:text-6xl mb-2 sm:mb-3">{ALL_TEAMS[currentIndex].icon}</div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2 text-center px-2 break-words">
                      {ALL_TEAMS[currentIndex].name}
                    </h2>
                    <p className="text-white/90 text-sm sm:text-base text-center px-2 break-words">{ALL_TEAMS[currentIndex].fullName}</p>
                    {ALL_TEAMS[currentIndex].id === 'expansion' && (
                      <p className="text-white/80 text-xs sm:text-sm text-center px-2 mt-2 break-words">
                        특별 지명, 용병 4명, 신인 우선 지명 혜택
                      </p>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 좌우 화살표 - 모바일 (카드 내부) */}
            <div className="absolute left-2 right-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none flex justify-between">
              <button
                onClick={handlePrevious}
                className="pointer-events-auto bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-colors touch-manipulation"
                aria-label="이전 팀"
              >
                <ChevronLeft className="w-5 h-5 text-baseball-green" />
              </button>
              <button
                onClick={handleNext}
                className="pointer-events-auto bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-colors touch-manipulation"
                aria-label="다음 팀"
              >
                <ChevronRight className="w-5 h-5 text-baseball-green" />
              </button>
            </div>

            {/* 인디케이터 - 모바일 */}
            <div className="flex justify-center gap-2 mt-4 sm:mt-6 px-2">
              {ALL_TEAMS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all touch-manipulation ${
                    idx === currentIndex ? 'bg-baseball-green w-8' : 'bg-gray-300 w-2'
                  }`}
                  aria-label={`팀 ${idx + 1} 선택`}
                />
              ))}
            </div>

            {/* 선택 버튼 - 모바일 */}
            <div className="mt-4 sm:mt-6 flex justify-center px-2">
              <button
                onClick={handleSelect}
                className="px-8 py-3 bg-baseball-gold hover:bg-baseball-gold-dark active:bg-baseball-gold-dark text-baseball-green font-bold text-base rounded-lg shadow-lg transition-colors touch-manipulation w-full max-w-xs"
              >
                선택하기
              </button>
            </div>
          </div>
        </div>

        {/* 데스크톱/태블릿 레이아웃 */}
        <div className="hidden md:block">
          <div className="relative">
            {/* 좌우 화살표 - 데스크톱 */}
            <button
              onClick={handlePrevious}
              className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 shadow-lg rounded-full p-2 lg:p-3 transition-colors touch-manipulation"
              aria-label="이전 팀"
            >
              <ChevronLeft className="w-6 h-6 lg:w-7 lg:h-7 text-baseball-green" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-100 shadow-lg rounded-full p-2 lg:p-3 transition-colors touch-manipulation"
              aria-label="다음 팀"
            >
              <ChevronRight className="w-6 h-6 lg:w-7 lg:h-7 text-baseball-green" />
            </button>

            {/* 카드 컨테이너 - 데스크톱 */}
            <div className="relative h-80 lg:h-96 overflow-hidden mx-8 lg:mx-12">
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
                    className="w-full max-w-md h-full rounded-xl lg:rounded-2xl shadow-2xl flex flex-col items-center justify-center p-6 lg:p-8 cursor-pointer transform transition-transform hover:scale-105 touch-manipulation"
                    style={{
                      background: `linear-gradient(135deg, ${ALL_TEAMS[currentIndex].color} 0%, ${ALL_TEAMS[currentIndex].secondaryColor} 100%)`,
                    }}
                    onClick={handleSelect}
                  >
                    <div className="text-6xl lg:text-8xl mb-3 lg:mb-4">{ALL_TEAMS[currentIndex].icon}</div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2 text-center px-2 break-words">
                      {ALL_TEAMS[currentIndex].name}
                    </h2>
                    <p className="text-white/90 text-base lg:text-lg text-center px-2 break-words">{ALL_TEAMS[currentIndex].fullName}</p>
                    {ALL_TEAMS[currentIndex].id === 'expansion' && (
                      <p className="text-white/80 text-sm lg:text-base text-center px-2 mt-2 break-words">
                        특별 지명, 용병 4명, 신인 우선 지명 혜택
                      </p>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 인디케이터 - 데스크톱 */}
            <div className="flex justify-center gap-2 mt-6 lg:mt-8">
              {ALL_TEAMS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all touch-manipulation ${
                    idx === currentIndex ? 'bg-baseball-green w-8' : 'bg-gray-300 w-2'
                  }`}
                  aria-label={`팀 ${idx + 1} 선택`}
                />
              ))}
            </div>

            {/* 선택 버튼 - 데스크톱 */}
            <div className="mt-6 lg:mt-8 flex justify-center">
              <button
                onClick={handleSelect}
                className="px-8 lg:px-10 py-3 lg:py-4 bg-baseball-gold hover:bg-baseball-gold-dark active:bg-baseball-gold-dark text-baseball-green font-bold text-lg lg:text-xl rounded-lg shadow-lg transition-colors touch-manipulation"
              >
                선택하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

