import React from 'react';
import { FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { parseAIResponse } from '../lib/utils';

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  isStreaming?: boolean;
}

export default function MessageBubble({ 
  message, 
  isUser, 
  isStreaming
}: MessageBubbleProps) {
  const parsed = parseAIResponse(message);

  // 사용자 메시지는 최소화된 로그 형태로 표시
  if (isUser) {
    return (
      <div className="mb-3 flex justify-end">
        <div className="bg-gray-100 border border-gray-200 rounded px-3 py-1.5 text-xs text-gray-600 font-mono">
          <span className="text-gray-400">[지시]</span> {parsed.text}
        </div>
      </div>
    );
  }

  // AI 메시지는 보고서 카드 형태로 표시
  return (
    <div className="mb-4">
      <div className="bg-white border border-gray-200 rounded shadow-sm hover:shadow-md transition-shadow">
        {/* 보고서 헤더 */}
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
          <FileText className="w-4 h-4 text-baseball-green" />
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">GM OFFICE REPORT</span>
          <span className="text-xs text-gray-400 ml-auto font-mono">
            {new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* 보고서 본문 */}
        <div className="px-4 py-3 text-sm text-gray-800">
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
                return (
                  <td className="border border-gray-300 px-2 py-1.5 text-xs font-mono cursor-default whitespace-nowrap">
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
            <span className="inline-block w-2 h-4 bg-baseball-green animate-pulse ml-1" />
          )}
        </div>
      </div>
    </div>
  );
}
