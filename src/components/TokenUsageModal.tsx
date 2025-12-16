'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, TrendingUp, Clock } from 'lucide-react';

interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  timestamp: Date;
}

interface TokenUsageModalProps {
  isOpen: boolean;
  onClose: () => void;
  usageHistory: TokenUsage[];
  totalUsage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    requestCount: number;
  };
}

export default function TokenUsageModal({
  isOpen,
  onClose,
  usageHistory,
  totalUsage,
}: TokenUsageModalProps) {
  const formatNumber = (num: number) => {
    return num.toLocaleString('ko-KR');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  // Gemini 2.5 Flash 가격 (예시, 실제 가격 확인 필요)
  // Input: $0.075 per 1M tokens
  // Output: $0.30 per 1M tokens
  const inputPricePer1M = 0.075;
  const outputPricePer1M = 0.30;
  
  const estimatedCost = (
    (totalUsage.promptTokens / 1_000_000) * inputPricePer1M +
    (totalUsage.completionTokens / 1_000_000) * outputPricePer1M
  ).toFixed(4);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 오버레이 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* 모달 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 헤더 */}
              <div className="bg-gradient-to-r from-baseball-green to-[#0a3528] px-6 py-4 rounded-t-2xl flex items-center justify-between border-b-2 border-baseball-gold">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-baseball-gold" />
                  <h2 className="text-xl font-bold text-white">토큰 사용량</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* 본문 */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* 총 사용량 요약 */}
                <div className="bg-gradient-to-r from-baseball-green/10 to-[#0a3528]/10 rounded-lg p-4 mb-6 border border-baseball-green/20">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-baseball-gold" />
                    <h3 className="font-bold text-lg text-baseball-green dark:text-baseball-gold">
                      총 사용량
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">요청 횟수</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formatNumber(totalUsage.requestCount)}회
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">총 토큰</p>
                      <p className="text-2xl font-bold text-baseball-green dark:text-baseball-gold">
                        {formatNumber(totalUsage.totalTokens)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">입력 토큰</p>
                      <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                        {formatNumber(totalUsage.promptTokens)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">출력 토큰</p>
                      <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                        {formatNumber(totalUsage.completionTokens)}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-baseball-green/20">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">예상 비용 (USD)</p>
                    <p className="text-xl font-bold text-baseball-gold">
                      ${estimatedCost}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      * Gemini 2.5 Flash 기준 (대략적인 추정치)
                    </p>
                  </div>
                </div>

                {/* 사용 내역 */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-baseball-gold" />
                    <h3 className="font-bold text-base text-baseball-green dark:text-baseball-gold">
                      최근 사용 내역
                    </h3>
                  </div>
                  {usageHistory.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <p>아직 사용 내역이 없습니다.</p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {usageHistory.slice().reverse().map((usage, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-3 border border-gray-200 dark:border-slate-600"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {formatTime(usage.timestamp)}
                            </span>
                            <span className="text-sm font-semibold text-baseball-green dark:text-baseball-gold">
                              {formatNumber(usage.totalTokens)} 토큰
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs">
                            <span className="text-gray-600 dark:text-gray-400">
                              입력: <span className="font-semibold">{formatNumber(usage.promptTokens)}</span>
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">
                              출력: <span className="font-semibold">{formatNumber(usage.completionTokens)}</span>
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

