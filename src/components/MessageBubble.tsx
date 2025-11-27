import React from 'react';
import { FileText, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import { parseAIResponse } from '../lib/utils';

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  isStreaming?: boolean;
}

function MessageBubble({ 
  message, 
  isUser, 
  isStreaming
}: MessageBubbleProps) {
  const parsed = parseAIResponse(message);

  // 사용자 메시지는 최소화된 로그 형태로 표시
  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-3 flex justify-end"
      >
        <div className="bg-gradient-to-r from-baseball-green/10 to-baseball-green/5 border-2 border-baseball-green/30 rounded-lg px-4 py-2 text-xs text-gray-700 font-mono shadow-sm hover:shadow-md transition-all hover:border-baseball-green/50">
          <span className="text-baseball-green font-semibold">[지시]</span> {parsed.text}
        </div>
      </motion.div>
    );
  }

  // AI 메시지는 게임스러운 카드 형태로 표시
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mb-4"
    >
      <div className="bg-gradient-to-br from-white to-gray-50/50 border-2 border-baseball-green/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-baseball-green/40 hover:-translate-y-1 overflow-hidden">
        {/* 게임스러운 헤더 */}
        <div className="bg-gradient-to-r from-baseball-green to-[#0a3528] border-b-2 border-baseball-gold/30 px-4 py-3 flex items-center gap-2 shadow-md">
          <div className="relative">
            <FileText className="w-5 h-5 text-baseball-gold" />
            {isStreaming && (
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute -top-1 -right-1"
              >
                <Sparkles className="w-3 h-3 text-yellow-400" />
              </motion.div>
            )}
          </div>
          <span className="text-xs font-bold text-white uppercase tracking-wider drop-shadow-sm">
            GM OFFICE REPORT
          </span>
          <span className="text-xs text-baseball-gold/80 ml-auto font-mono font-semibold">
            {new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* 게임스러운 본문 */}
        <div className="px-4 py-4 text-sm text-gray-800 bg-white/50">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // 표 스타일링 (컴팩트, 고정 헤더, 반응형)
              table: ({ children }: any) => (
                <div className="w-full overflow-x-auto my-3 -mx-4 px-4">
                  <div className="inline-block min-w-full align-middle">
                    <table className="w-full border-collapse bg-white text-xs">
                      {children}
                    </table>
                  </div>
                </div>
              ),
              thead: ({ children }: any) => (
                <thead className="bg-baseball-green text-white sticky top-0 z-10">
                  {children}
                </thead>
              ),
              tbody: ({ children }: any) => (
                <tbody className="divide-y divide-gray-200 bg-white">
                  {children}
                </tbody>
              ),
              tr: ({ children }: any) => {
                // tr의 자식들을 배열로 변환하여 인덱스 추적
                const childrenArray = React.Children.toArray(children);
                return (
                  <tr className="hover:bg-green-50 transition-colors cursor-default">
                    {React.Children.map(childrenArray, (child, index) => {
                      if (React.isValidElement(child)) {
                        return React.cloneElement(child as any, { 
                          'data-column-index': index 
                        });
                      }
                      return child;
                    })}
                  </tr>
                );
              },
              th: ({ children }: any) => (
                <th className="border border-gray-300 px-2 py-1.5 text-left font-semibold text-xs text-white bg-baseball-green whitespace-nowrap cursor-default">
                  {children}
                </th>
              ),
              td: ({ children, ...props }: any) => {
                const columnIndex = props['data-column-index'] ?? -1;
                const cellText = typeof children === 'string' ? children : String(children);
                // 첫 번째 컬럼(구분: 1군/2군) 스타일링
                const isDivisionColumn = columnIndex === 0 && (cellText.trim() === '1군' || cellText.trim() === '2군');
                
                return (
                  <td 
                    className={`border border-gray-300 px-2 py-1.5 text-xs font-mono cursor-default whitespace-nowrap ${
                      isDivisionColumn 
                        ? cellText.trim() === '1군' 
                          ? 'font-bold text-baseball-green bg-green-50' 
                          : 'font-bold text-gray-600 bg-gray-50'
                        : ''
                    }`}
                  >
                    {children}
                  </td>
                );
              },
              // 일반 텍스트 스타일
              p: ({ children }) => (
                <p className="mb-2 last:mb-0 whitespace-pre-wrap leading-relaxed text-gray-800">
                  {children}
                </p>
              ),
              // 코드 블록
              pre: ({ children }) => (
                <pre className="bg-gray-50 p-2 rounded text-xs font-mono overflow-x-auto my-2 border border-gray-200">
                  {children}
                </pre>
              ),
              // 인라인 코드
              code: ({ children, className }) => {
                const isInline = !className;
                return isInline ? (
                  <code className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono text-baseball-green">
                    {children}
                  </code>
                ) : (
                  <code className={className}>{children}</code>
                );
              },
              // 리스트
              ul: ({ children }) => (
                <ul className="list-disc list-inside my-2 space-y-1 text-gray-700">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside my-2 space-y-1 text-gray-700">
                  {children}
                </ol>
              ),
              // 강조
              strong: ({ children }) => (
                <strong className="font-bold text-baseball-green">
                  {children}
                </strong>
              ),
            }}
          >
            {parsed.text}
          </ReactMarkdown>
          {isStreaming && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-1 ml-2"
            >
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                className="inline-block w-2 h-4 bg-baseball-green rounded-full"
              />
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1, delay: 0.2, ease: "easeInOut" }}
                className="inline-block w-2 h-4 bg-baseball-green rounded-full"
              />
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1, delay: 0.4, ease: "easeInOut" }}
                className="inline-block w-2 h-4 bg-baseball-green rounded-full"
              />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// React.memo로 불필요한 재렌더링 방지
// text와 isUser가 동일하면 리렌더링 건너뛰기
export default React.memo(MessageBubble, (prevProps, nextProps) => {
  return prevProps.message === nextProps.message && 
         prevProps.isUser === nextProps.isUser &&
         prevProps.isStreaming === nextProps.isStreaming;
});
