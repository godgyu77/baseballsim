import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, X } from 'lucide-react';

interface NegotiationInputProps {
  playerName: string;
  onSubmit: (amount: number) => void;
  onClose: () => void;
}

export default function NegotiationInput({
  playerName,
  onSubmit,
  onClose,
}: NegotiationInputProps) {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseInt(amount.replace(/,/g, ''));
    if (!isNaN(numAmount) && numAmount > 0) {
      onSubmit(numAmount);
      setAmount('');
    }
  };

  const formatNumber = (value: string) => {
    const num = value.replace(/[^0-9]/g, '');
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-baseball-gold shadow-2xl z-40"
    >
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-lg text-gray-800">
              {playerName} 선수 연봉 협상
            </h3>
            <p className="text-sm text-gray-600">제시할 연봉을 입력하세요</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(formatNumber(e.target.value))}
              placeholder="예: 50,000,000"
              className="w-full px-4 py-3 border-2 border-baseball-green rounded-lg focus:outline-none focus:ring-2 focus:ring-baseball-green text-lg font-semibold"
              autoFocus
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
              원
            </span>
          </div>
          <button
            type="submit"
            disabled={!amount || parseInt(amount.replace(/,/g, '')) <= 0}
            className="px-6 py-3 bg-baseball-green hover:bg-baseball-green-dark disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors shadow-md"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </motion.div>
  );
}

