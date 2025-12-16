'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, HelpCircle } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 기본 도움말 내용
const HELP_CONTENT = [
  { title: '게임 시작', description: 'AI에게 "게임을 시작해주세요"라고 말하면 게임이 시작됩니다.' },
  { title: '로스터 확인', description: '"로스터를 보여줘"라고 요청하면 현재 로스터를 확인할 수 있습니다.' },
  { title: '예산 확인', description: '"예산을 보여줘"라고 요청하면 현재 재정 상황을 확인할 수 있습니다.' },
  { title: '일정 진행', description: '상단의 "일정 진행" 버튼을 눌러 다음 이벤트로 넘어갈 수 있습니다.' },
];

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
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
                  <HelpCircle className="w-5 h-5 text-baseball-gold" />
                  <h2 className="text-xl font-bold text-white">도움말</h2>
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
                <div className="space-y-4">
                  {HELP_CONTENT.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4 border-l-4 border-baseball-green"
                    >
                      <h3 className="font-bold text-baseball-green dark:text-baseball-gold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {item.description}
                      </p>
                    </motion.div>
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

