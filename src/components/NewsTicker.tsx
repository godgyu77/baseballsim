import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsItem {
  id: string;
  text: string;
}

const defaultNews: NewsItem[] = [
  { id: '1', text: '2026 시즌 개막 임박...' },
  { id: '2', text: 'FA 시장 과열 중...' },
  { id: '3', text: '신인 드래프트 주목...' },
  { id: '4', text: '트레이드 데드라인 다가옴...' },
];

interface NewsTickerProps {
  customNews?: string[];
}

export default function NewsTicker({ customNews }: NewsTickerProps) {
  const [newsItems, setNewsItems] = useState<NewsItem[]>(defaultNews);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (customNews && customNews.length > 0) {
      setNewsItems(
        customNews.map((text, idx) => ({ id: `custom-${idx}`, text }))
      );
    }
  }, [customNews]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsItems.length);
    }, 5000); // 5초마다 변경

    return () => clearInterval(interval);
  }, [newsItems.length]);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 bg-black/60 backdrop-blur-md border-t border-baseball-gold/30 z-30 overflow-hidden">
      <div className="flex items-center h-full">
        <div className="bg-baseball-gold px-4 py-2 flex items-center justify-center">
          <span className="text-white text-xs font-bold">⚾ NEWS</span>
        </div>
        <div className="flex-1 relative h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center px-4"
            >
              <span className="text-white text-sm whitespace-nowrap">
                {newsItems[currentIndex]?.text}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
