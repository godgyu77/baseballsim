import React from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, Play } from 'lucide-react';

interface StartScreenProps {
  onLoadGame: () => void;
  onStartNew: () => void;
}

export default function StartScreen({ onLoadGame, onStartNew }: StartScreenProps) {
  const isProcessingRef = React.useRef(false);
  
  const handleLoadGame = (e?: React.MouseEvent | React.TouchEvent) => {
    // 모바일 터치 이벤트 중복 방지
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // 중복 호출 방지
    if (isProcessingRef.current) {
      return;
    }
    
    isProcessingRef.current = true;
    
    try {
      const savedData = localStorage.getItem('baseball_game_save');
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          if (parsed.messages && Array.isArray(parsed.messages) && parsed.messages.length > 0) {
            onLoadGame();
            // 약간의 지연 후 플래그 해제
            setTimeout(() => {
              isProcessingRef.current = false;
            }, 1000);
            return;
          }
        } catch (e) {
          // 파싱 오류
          isProcessingRef.current = false;
        }
      }
      alert('저장된 데이터가 없습니다.');
      isProcessingRef.current = false;
    } catch (error) {
      console.error('불러오기 처리 오류:', error);
      isProcessingRef.current = false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-baseball-green via-[#0a3528] to-baseball-green-dark flex items-center justify-center p-3 sm:p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl w-full"
      >
        {/* 타이틀 */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-12"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl">
            KBO 프로야구
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-baseball-gold mb-6 drop-shadow-lg">
            단장 웹 시뮬레이터
          </h2>
          <div className="text-6xl sm:text-7xl md:text-8xl mb-8 text-white">⚾</div>
        </motion.div>

        {/* 버튼 그룹 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLoadGame}
            onTouchStart={handleLoadGame}
            className="flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-baseball-green font-bold text-lg px-8 py-4 rounded-xl shadow-2xl transition-all w-full sm:w-auto min-w-[200px] touch-manipulation"
          >
            <FolderOpen className="w-6 h-6" />
            불러오기
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartNew}
            className="flex items-center justify-center gap-3 bg-baseball-gold hover:bg-yellow-500 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-2xl transition-all w-full sm:w-auto min-w-[200px]"
          >
            <Play className="w-6 h-6" />
            새 게임 시작
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

