'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { TEAMS, type Team } from '../constants/TeamData';
import type { Difficulty } from '../constants/GameConfig';

interface TeamSelectProps {
  difficulty: Difficulty;
  onSelect: (teamCode: string, teamName: string) => void;
  onBack: () => void;
}

export default function TeamSelect({ difficulty, onSelect, onBack }: TeamSelectProps) {
  const handleTeamSelect = (team: Team) => {
    // TeamData의 id가 이미 코드입니다 (예: 'kia', 'samsung', 'hanwha')
    const teamCode = team.id;
    console.log(`[TeamSelect] 팀 선택: ${team.fullName} (Code: ${teamCode})`);
    onSelect(teamCode, team.fullName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-baseball-green via-[#0a3528] to-baseball-green-dark flex items-center justify-center p-3 sm:p-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-6xl w-full"
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
            구단 선택
          </h1>
          <p className="text-lg sm:text-xl text-baseball-gold/90 mb-2">
            운영할 구단을 선택해주세요
          </p>
          <p className="text-sm text-white/70">
            선택된 난이도: <span className="text-baseball-gold font-semibold">
              {difficulty === 'EASY' ? '이지' : 
               difficulty === 'NORMAL' ? '노말' : 
               difficulty === 'HARD' ? '하드' : 
               '헬'}
            </span>
          </p>
        </motion.div>

        {/* 팀 그리드 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4"
        >
          {TEAMS.map((team, index) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() => handleTeamSelect(team)}
                className={`
                  w-full p-4 sm:p-6 rounded-xl
                  bg-white/10 backdrop-blur-sm
                  border-2 border-white/20 hover:border-white/40
                  shadow-lg hover:shadow-2xl
                  transition-all duration-300
                  flex flex-col items-center justify-center
                  min-h-[140px] sm:min-h-[160px]
                  group
                `}
                style={{
                  borderColor: `${team.color}80`,
                }}
              >
                {/* 팀 아이콘 */}
                <div 
                  className="text-4xl sm:text-5xl mb-3 group-hover:scale-110 transition-transform duration-300"
                  style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
                >
                  {team.icon}
                </div>

                {/* 팀 이름 */}
                <h3 
                  className="text-base sm:text-lg font-bold text-white mb-1 group-hover:text-baseball-gold transition-colors"
                  style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                >
                  {team.name}
                </h3>

                {/* 팀 전체 이름 */}
                <p 
                  className="text-xs sm:text-sm text-white/70 group-hover:text-white/90 transition-colors"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                >
                  {team.fullName}
                </p>

                {/* 팀 색상 인디케이터 */}
                <div 
                  className="mt-3 w-12 h-1 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: team.color }}
                />
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* 하단 안내 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-white/60 text-sm"
        >
          <p>원하는 구단을 클릭하여 선택하세요</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

