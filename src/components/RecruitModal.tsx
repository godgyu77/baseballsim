'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { GUIEvent } from '../lib/utils';

type RecruitCandidate = {
  name?: string;
  position?: string;
  throwing_hand?: string | null;
  batting_hand?: string | null;
  scouting_report?: string;
  salary?: number | string;
};

function formatSalaryEok(salary: RecruitCandidate['salary']): string {
  const n = typeof salary === 'number' ? salary : parseFloat(String(salary));
  if (Number.isFinite(n)) return `${n.toFixed(1)}억`;
  return salary ? String(salary) : '-';
}

export default function RecruitModal({
  isOpen,
  onClose,
  event,
  onSelectCandidate,
  onFinishRecruit,
}: {
  isOpen: boolean;
  onClose: () => void;
  event: GUIEvent | null;
  onSelectCandidate: (candidate: RecruitCandidate) => void;
  onFinishRecruit: () => void;
}) {
  const candidates = (event?.candidates || []) as RecruitCandidate[];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[85vh] flex flex-col pointer-events-auto overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-baseball-green to-[#0a3528] px-6 py-4 flex items-center justify-between border-b-2 border-baseball-gold">
                <div className="text-white font-bold text-lg">
                  {event?.title || '외국인 선수 영입 후보 명단'}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="닫기"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="p-4 flex-1 overflow-auto">
                {candidates.length === 0 ? (
                  <div className="text-center text-gray-600 dark:text-gray-300 py-10">
                    후보 명단이 없습니다.
                  </div>
                ) : (
                  <div className="w-full overflow-x-auto">
                    <table className="min-w-[900px] w-full border-collapse">
                      <thead className="sticky top-0 bg-slate-100 dark:bg-slate-700">
                        <tr>
                          <th className="text-left text-sm font-semibold px-3 py-2 border-b border-slate-200 dark:border-slate-600">
                            이름
                          </th>
                          <th className="text-left text-sm font-semibold px-3 py-2 border-b border-slate-200 dark:border-slate-600">
                            포지션
                          </th>
                          <th className="text-left text-sm font-semibold px-3 py-2 border-b border-slate-200 dark:border-slate-600">
                            투/타
                          </th>
                          <th className="text-left text-sm font-semibold px-3 py-2 border-b border-slate-200 dark:border-slate-600">
                            희망 연봉
                          </th>
                          <th className="text-left text-sm font-semibold px-3 py-2 border-b border-slate-200 dark:border-slate-600">
                            스카우팅 리포트
                          </th>
                          <th className="px-3 py-2 border-b border-slate-200 dark:border-slate-600" />
                        </tr>
                      </thead>
                      <tbody>
                        {candidates.map((c, idx) => (
                          <tr
                            key={`${c.name || 'candidate'}-${idx}`}
                            className="hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors"
                          >
                            <td className="px-3 py-2 border-b border-slate-100 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 whitespace-nowrap">
                              {c.name || '-'}
                            </td>
                            <td className="px-3 py-2 border-b border-slate-100 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-200 whitespace-nowrap">
                              {c.position || '-'}
                            </td>
                            <td className="px-3 py-2 border-b border-slate-100 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-200 whitespace-nowrap">
                              {(c.throwing_hand || '-') + ' / ' + (c.batting_hand || '-')}
                            </td>
                            <td className="px-3 py-2 border-b border-slate-100 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-200 whitespace-nowrap">
                              {formatSalaryEok(c.salary)}
                            </td>
                            <td className="px-3 py-2 border-b border-slate-100 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-200">
                              {c.scouting_report || '-'}
                            </td>
                            <td className="px-3 py-2 border-b border-slate-100 dark:border-slate-700 text-right whitespace-nowrap">
                              <button
                                onClick={() => onSelectCandidate(c)}
                                className="px-3 py-2 rounded-lg bg-baseball-gold hover:bg-yellow-500 text-slate-900 font-semibold text-sm transition-colors"
                              >
                                영입 제안
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  후보를 선택하면 AI에게 “이름 영입” 명령이 전송됩니다.
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={onFinishRecruit}
                    className="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold text-sm transition-colors"
                  >
                    영입 종료
                  </button>
                  <button
                    onClick={onClose}
                    className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


