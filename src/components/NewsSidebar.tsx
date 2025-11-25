import { motion, AnimatePresence } from 'framer-motion';
import { X, Newspaper } from 'lucide-react';

interface NewsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  newsItems?: string[];
}

export default function NewsSidebar({ isOpen, onClose, newsItems = [] }: NewsSidebarProps) {
  const defaultNews = [
    '2026 시즌 개막 임박...',
    'FA 시장 과열 중...',
    '신인 드래프트 주목...',
    '트레이드 데드라인 다가옴...',
  ];

  const items = newsItems.length > 0 ? newsItems : defaultNews;

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
            className="fixed inset-0 bg-black/20 z-40"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-baseball-green text-white p-4 flex items-center justify-between border-b border-baseball-gold">
              <div className="flex items-center gap-2">
                <Newspaper className="w-5 h-5" />
                <h2 className="text-lg font-bold">뉴스</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-baseball-green transition-colors"
                  >
                    <p className="text-sm text-gray-800">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

