'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Target, Skull, Flame } from 'lucide-react';
import { GAME_CONFIG } from '../constants/GameConfig';
import type { Difficulty } from '../constants/GameConfig';

interface DifficultySelectProps {
  onSelect: (difficulty: Difficulty) => void;
  onBack: () => void;
}

const DIFFICULTY_INFO: Record<Difficulty, {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  bgColor: string;
}> = {
  EASY: {
    title: '이지 모드',
    subtitle: '힐링 / 초보자',
    icon: <Trophy className="w-8 h-8" />,
    description: '자금 80억, 성장 2배, 부상 없음, AI 호구 성향',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20 hover:bg-green-500/30 border-green-400/50',
  },
  NORMAL: {
    title: '노말 모드',
    subtitle: '현실적 / 추천',
    icon: <Target className="w-8 h-8" />,
    description: '자금 30억, 순수 데이터 기반, AI 비즈니스 성향',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20 hover:bg-blue-500/30 border-blue-400/50',
  },
  HARD: {
    title: '하드 모드',
    subtitle: '도전 / 중급자',
    icon: <Skull className="w-8 h-8" />,
    description: '자금 20억, 수입 -10%, 부상 1.5배, 샐러리캡 소프트캡',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20 hover:bg-orange-500/30 border-orange-400/50',
  },
  HELL: {
    title: '헬 모드',
    subtitle: '극한 도전 / 고수',
    icon: <Flame className="w-8 h-8" />,
    description: '자금 10억, 수입 -20%, 부상 2배, 지출 +20%, AI 적대적',
    color: 'text-red-400',
    bgColor: 'bg-red-500/20 hover:bg-red-500/30 border-red-400/50',
  },
};

export default function DifficultySelect({ onSelect, onBack }: DifficultySelectProps) {
  const difficulties: Difficulty[] = ['EASY', 'NORMAL', 'HARD', 'HELL'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-baseball-green via-[#0a3528] to-baseball-green-dark flex items-center justify-center p-3 sm:p-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl w-full"
      >
        {/* 헤더 */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-8"
        >
          <button
            onClick={onBack}
            className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">뒤로</span>
          </button>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl">
            난이도 선택
          </h1>
          <p className="text-lg sm:text-xl text-baseball-gold/90 mb-8">
            게임을 시작할 난이도를 선택해주세요
          </p>
        </motion.div>

        {/* 난이도 카드 그리드 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {difficulties.map((difficulty, index) => {
            const info = DIFFICULTY_INFO[difficulty];
            const config = GAME_CONFIG[difficulty];

            return (
              <motion.div
                key={difficulty}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`
                  bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8
                  border-2 ${info.bgColor}
                  shadow-2xl hover:shadow-3xl
                  transition-all duration-300
                  cursor-pointer
                  h-full flex flex-col
                `}
                onClick={() => onSelect(difficulty)}
                >
                  {/* 아이콘 */}
                  <div className={`${info.color} mb-4 flex justify-center`}>
                    {info.icon}
                  </div>

                  {/* 제목 */}
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {info.title}
                  </h2>
                  <p className="text-baseball-gold text-sm sm:text-base mb-4">
                    {info.subtitle}
                  </p>

                  {/* 설명 */}
                  <p className="text-white/80 text-sm mb-6 flex-grow">
                    {info.description}
                  </p>

                  {/* 설정 정보 */}
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">초기 자금:</span>
                      <span className="text-white font-semibold">{config.initialBudget}억 원</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">샐러리캡:</span>
                      <span className="text-white font-semibold">{config.squadSalaryCap}억 원</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">수입 배율:</span>
                      <span className="text-white font-semibold">
                        {config.incomeMultiplier > 1 ? '+' : ''}
                        {((config.incomeMultiplier - 1) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  {/* 선택 버튼 */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      mt-6 w-full py-3 px-6 rounded-lg font-bold text-white
                      transition-all duration-200
                      ${difficulty === 'EASY' ? 'bg-green-500 hover:bg-green-600' : ''}
                      ${difficulty === 'NORMAL' ? 'bg-blue-500 hover:bg-blue-600' : ''}
                      ${difficulty === 'HARD' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                      ${difficulty === 'HELL' ? 'bg-red-500 hover:bg-red-600' : ''}
                      shadow-lg hover:shadow-xl
                    `}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(difficulty);
                    }}
                  >
                    선택하기
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}

