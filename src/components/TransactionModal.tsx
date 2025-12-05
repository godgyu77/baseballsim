import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, TrendingDown } from 'lucide-react';
import { Transaction, deduplicateTransactions } from '../lib/utils';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
}

export default function TransactionModal({ isOpen, onClose, transactions }: TransactionModalProps) {
  if (!isOpen) return null;

  // 날짜 형식 변환
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        // 게임 내 날짜 형식인 경우 그대로 반환
        return dateString;
      }
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  // 금액 포맷팅 (억 단위)
  const formatAmount = (amount: number): string => {
    const amountInHundredMillion = amount / 100000000;
    const sign = amount >= 0 ? '+' : '';
    return `${sign}${amountInHundredMillion.toFixed(1)}억 원`;
  };

  // 잔액 포맷팅
  const formatBalance = (balance: number): string => {
    const balanceInHundredMillion = balance / 100000000;
    return `${balanceInHundredMillion.toFixed(1)}억 원`;
  };

  // 카테고리 한글 변환
  const getCategoryLabel = (category: Transaction['category']): string => {
    const labels: Record<Transaction['category'], string> = {
      AI_REPORT: 'AI 보고',
      FACILITY_UPGRADE: '시설 업그레이드',
      RANDOM_EVENT: '랜덤 이벤트',
      FINANCE_UPDATE: 'FA 보상금',
      MANUAL_ADJUSTMENT: '수동 조정',
      INITIAL: '초기 자금',
    };
    return labels[category] || category;
  };

  // [Fix - Deduplication] 중복 제거 후 최신순 정렬
  const deduplicatedTransactions = deduplicateTransactions(transactions);
  const sortedTransactions = [...deduplicatedTransactions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <AnimatePresence>
      {isOpen && (
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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-2 md:p-4"
            style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-t-3xl sm:rounded-xl md:rounded-2xl shadow-2xl max-w-4xl w-full h-[90vh] sm:h-auto sm:max-h-[85vh] md:max-h-[80vh] overflow-hidden flex flex-col border-2 border-baseball-green/30">
              {/* Header */}
              <div className="bg-gradient-to-r from-baseball-green to-[#0a3528] px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-baseball-gold flex-shrink-0" />
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white truncate">거래 내역</h2>
                  <span className="text-xs sm:text-sm md:text-base text-baseball-gold/80 whitespace-nowrap flex-shrink-0">
                    ({transactions.length}건)
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 active:bg-white/30 rounded-lg transition-colors flex-shrink-0 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
                  title="닫기"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 overscroll-contain">
                {sortedTransactions.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-gray-400">
                    <TrendingDown className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 opacity-50" />
                    <p className="text-sm sm:text-base md:text-lg font-medium text-center px-4">거래 내역이 없습니다.</p>
                    <p className="text-xs sm:text-sm text-gray-400 mt-2 text-center px-4">게임을 진행하면 거래 내역이 표시됩니다.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto -mx-2 sm:-mx-3 md:-mx-4 px-2 sm:px-3 md:px-4 touch-pan-x" style={{ WebkitOverflowScrolling: 'touch' }}>
                    <table className="w-full border-collapse text-xs sm:text-sm md:text-base min-w-full">
                      <colgroup>
                        <col style={{ width: 'auto', minWidth: '70px' }} />
                        <col style={{ width: 'auto', minWidth: '80px' }} />
                        <col style={{ width: 'auto', minWidth: '90px' }} />
                        <col style={{ width: 'auto', minWidth: '120px' }} />
                        <col style={{ width: 'auto', minWidth: '90px' }} />
                      </colgroup>
                      <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr>
                          <th className="px-2 sm:px-3 py-2 text-left text-xs sm:text-sm font-bold text-gray-700 border-b-2 border-gray-200">
                            날짜
                          </th>
                          <th className="px-2 sm:px-3 py-2 text-left text-xs sm:text-sm font-bold text-gray-700 border-b-2 border-gray-200">
                            구분
                          </th>
                          <th className="px-2 sm:px-3 py-2 text-right text-xs sm:text-sm font-bold text-gray-700 border-b-2 border-gray-200">
                            금액
                          </th>
                          <th className="px-2 sm:px-3 py-2 text-left text-xs sm:text-sm font-bold text-gray-700 border-b-2 border-gray-200">
                            내용
                          </th>
                          <th className="px-2 sm:px-3 py-2 text-right text-xs sm:text-sm font-bold text-gray-700 border-b-2 border-gray-200">
                            잔액
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {sortedTransactions.map((transaction) => {
                          const isIncome = transaction.amount >= 0;
                          
                          return (
                            <tr
                              key={transaction.id}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-600 font-mono">
                                {formatDate(transaction.date)}
                              </td>
                              <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-700">
                                {getCategoryLabel(transaction.category)}
                              </td>
                              <td
                                className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-bold font-mono text-right ${
                                  isIncome ? 'text-blue-400' : 'text-red-400'
                                }`}
                              >
                                {formatAmount(transaction.amount)}
                              </td>
                              <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-700 max-w-xs truncate">
                                {transaction.description}
                              </td>
                              <td className="px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-700 font-mono text-right">
                                {formatBalance(transaction.balanceAfter)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

