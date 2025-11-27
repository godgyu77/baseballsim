import { motion, AnimatePresence } from 'framer-motion';
import { X, Newspaper } from 'lucide-react';

export interface NewsItem {
  title: string;
  content: string;
}

interface NewsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  newsItems?: NewsItem[];
}

export default function NewsSidebar({ isOpen, onClose, newsItems = [] }: NewsSidebarProps) {
  const defaultNews: NewsItem[] = [
    { title: '2026 시즌 개막 임박', content: '2026 시즌 개막이 임박했습니다...' },
    { title: 'FA 시장 과열', content: 'FA 시장이 과열 중입니다...' },
    { title: '신인 드래프트 주목', content: '신인 드래프트가 주목받고 있습니다...' },
    { title: '트레이드 데드라인', content: '트레이드 데드라인이 다가옵니다...' },
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
            className="fixed right-0 top-0 h-full w-full sm:w-80 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-baseball-green text-white p-3 sm:p-4 flex items-center justify-between border-b border-baseball-gold flex-shrink-0">
              <div className="flex items-center gap-2">
                <Newspaper className="w-4 h-4 sm:w-5 sm:h-5" />
                <h2 className="text-base sm:text-lg font-bold">뉴스</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 sm:p-1.5 hover:bg-white/20 active:bg-white/30 rounded transition-colors touch-manipulation"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4">
              <div className="space-y-2.5 sm:space-y-3">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 sm:p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-baseball-green active:border-baseball-green transition-colors"
                  >
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1 leading-snug">{item.title}</h3>
                    <p className="text-[10px] sm:text-xs text-gray-600 leading-relaxed">{item.content}</p>
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

