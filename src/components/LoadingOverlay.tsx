import { Loader2, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface LoadingOverlayProps {
  isLoading: boolean; // 로딩 상태
  statusText?: string;
}

export default function LoadingOverlay({ isLoading, statusText }: LoadingOverlayProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Trickle 알고리즘: 점진적으로 느려지는 가짜 진행률
  useEffect(() => {
    if (isLoading) {
      // 로딩 시작
      setProgress(0);
      setIsVisible(true);

      // Trickle 알고리즘 구현
      let currentProgress = 0;
      const MAX_PROGRESS = 95; // 최대 95%에서 멈춤

      const updateProgress = () => {
        if (currentProgress >= MAX_PROGRESS) {
          return; // 95%에서 멈춤
        }

        // 진행률에 따른 증가폭 계산 (점진적 감속)
        let increment: number;
        
        if (currentProgress < 20) {
          // 0-20%: 빠르게 증가 (1.5% ~ 2.5%)
          increment = 1.5 + Math.random() * 1.0;
        } else if (currentProgress < 50) {
          // 20-50%: 중간 속도 (0.8% ~ 1.5%)
          increment = 0.8 + Math.random() * 0.7;
        } else if (currentProgress < 80) {
          // 50-80%: 느리게 증가 (0.3% ~ 0.8%)
          increment = 0.3 + Math.random() * 0.5;
        } else {
          // 80-95%: 매우 느리게 증가 (0.1% ~ 0.3%)
          increment = 0.1 + Math.random() * 0.2;
        }

        // 랜덤성 추가 (약간의 변동)
        increment *= (0.9 + Math.random() * 0.2);

        currentProgress = Math.min(MAX_PROGRESS, currentProgress + increment);
        setProgress(currentProgress);
      };

      // 초기 빠른 증가를 위한 첫 업데이트
      updateProgress();

      // 주기적 업데이트 (200ms 간격)
      intervalRef.current = setInterval(updateProgress, 200);

    } else {
      // 로딩 완료
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      // 즉시 100%로 설정
      setProgress(100);

      // 0.5초(500ms) 대기 후 언마운트
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
        setProgress(0); // 다음 로딩을 위해 초기화
      }, 500);
    }

    // Cleanup
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isLoading]);

  // 진행률에 따라 상태 텍스트 결정
  const getStatusText = () => {
    if (statusText) return statusText;
    if (progress < 20) return '게임 상태를 분석 중입니다...';
    if (progress < 40) return '선수 데이터를 확인 중입니다...';
    if (progress < 60) return '전략을 수립 중입니다...';
    if (progress < 80) return '보고서를 작성 중입니다...';
    return '최종 검토 중입니다...';
  };

  if (!isVisible && !isLoading) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl max-w-md w-full mx-4 border-2 border-baseball-green/20"
          >
            <div className="flex flex-col items-center gap-4 sm:gap-5 lg:gap-6">
              {/* 로딩 아이콘 */}
              <div className="relative">
                <Loader2 className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-baseball-green animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="text-2xl sm:text-3xl"
                  >
                    ⚾
                  </motion.span>
                </div>
              </div>

              {/* 상태 텍스트 */}
              <div className="text-center w-full">
                <motion.p
                  key={getStatusText()}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-base sm:text-lg font-bold text-gray-800 mb-1 sm:mb-2 px-2"
                >
                  {getStatusText()}
                </motion.p>
                <p className="text-xs sm:text-sm text-gray-500">
                  잠시만 기다려주세요
                </p>
              </div>

              {/* 진행 바 */}
              <div className="w-full">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-baseball-green">진행률</span>
                  <span className="text-xs font-bold text-gray-700">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                  <div
                    style={{
                      width: `${progress}%`,
                      transition: 'width 200ms ease-out',
                    }}
                    className="h-full bg-gradient-to-r from-baseball-green via-[#0a3528] to-baseball-green relative overflow-hidden"
                  >
                    <motion.div
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear",
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* 추가 인디케이터 */}
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <TrendingUp className="w-4 h-4" />
                <span>GM Office System</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

