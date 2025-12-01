import React, { useRef, useEffect, useState } from 'react';
import { FileText, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import { parseAIResponse } from '../lib/utils';
import { PlayerCardData } from './PlayerCard';

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
        <div className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 text-xs sm:text-sm text-gray-800 bg-white/50">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              // 제목 스타일링 (H1, H2, H3 구분)
              h1: ({ children }: any) => (
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-baseball-green mb-3 mt-4 pt-2 border-b-2 border-baseball-green/30 pb-2 first:mt-0">
                  {children}
                </h1>
              ),
              h2: ({ children }: any) => (
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0a3528] mb-2 mt-3 pt-1 border-b border-baseball-green/20 pb-1">
                  {children}
                </h2>
              ),
              h3: ({ children }: any) => (
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-baseball-green mb-2 mt-2">
                  {children}
                </h3>
              ),
              h4: ({ children }: any) => (
                <h4 className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 mb-1 mt-2">
                  {children}
                </h4>
              ),
              // 표 스타일링 (컴팩트, 고정 헤더, 반응형, 절대 깨짐 방지)
              table: ({ children }: any) => {
                // 타자 표인지 확인 (thead의 th 개수로 판단)
                const thead = React.Children.toArray(children).find((child: any) => 
                  React.isValidElement(child) && child.type === 'thead'
                );
                let isBatterTable = false;
                if (thead && React.isValidElement(thead)) {
                  const theadChildren = React.Children.toArray((thead as any).props.children);
                  const firstRow = theadChildren.find((child: any) => 
                    React.isValidElement(child) && child.type === 'tr'
                  );
                  if (firstRow && React.isValidElement(firstRow)) {
                    const thCount = React.Children.count((firstRow as any).props.children);
                    // 타자 표는 보통 13-14개 컬럼 (투수는 12개 정도)
                    isBatterTable = thCount >= 13;
                  }
                }
                
                return (
                  <div 
                    className={`w-full overflow-x-auto my-3 -mx-2 sm:-mx-4 px-2 sm:px-4 touch-pan-x ${isBatterTable ? 'batter-table-container' : ''}`}
                    style={{ 
                      WebkitOverflowScrolling: 'touch', 
                      maxWidth: '100%', 
                      overflowX: 'auto', 
                      overflowY: 'visible', 
                      display: 'block',
                      position: 'relative'
                    }}
                  >
                    <div 
                      className="inline-block min-w-full align-middle" 
                      style={{ 
                        minWidth: 'max-content', 
                        display: 'inline-block', 
                        width: 'max-content',
                        verticalAlign: 'top'
                      }}
                    >
                      <table 
                        className={`border-collapse bg-white text-[8px] sm:text-[9px] md:text-[10px] whitespace-nowrap ${isBatterTable ? 'batter-table' : ''}`}
                        style={{ 
                          tableLayout: isBatterTable ? 'fixed' : 'auto', 
                          minWidth: 'max-content', 
                          width: isBatterTable ? 'auto' : 'max-content', 
                          borderCollapse: 'collapse', 
                          display: 'table',
                          borderSpacing: '0'
                        }}
                        data-batter-table={isBatterTable}
                      >
                        {React.Children.map(React.Children.toArray(children), (child: any) => {
                          if (React.isValidElement(child)) {
                            return React.cloneElement(child as any, { 
                              'data-batter-table': isBatterTable
                            });
                          }
                          return child;
                        })}
                      </table>
                    </div>
                  </div>
                );
              },
              thead: ({ children, ...props }: any) => {
                const isBatterTable = props['data-batter-table'] === true;
                return (
                  <thead 
                    className="bg-baseball-green text-white sticky top-0 z-10"
                    data-batter-table={isBatterTable}
                  >
                    {React.Children.map(React.Children.toArray(children), (child: any) => {
                      if (React.isValidElement(child)) {
                        return React.cloneElement(child as any, { 
                          'data-batter-table': isBatterTable
                        });
                      }
                      return child;
                    })}
                  </thead>
                );
              },
              tbody: ({ children }: any) => (
                <tbody className="divide-y divide-gray-200 bg-white">
                  {children}
                </tbody>
              ),
              tr: ({ children, ...props }: any) => {
                // tr의 자식들을 배열로 변환하여 인덱스 추적
                const childrenArray = React.Children.toArray(children);
                const isBatterTable = props['data-batter-table'] === true;
                
                return (
                  <tr className="hover:bg-green-50 transition-colors cursor-default">
                    {React.Children.map(childrenArray, (child, index) => {
                      if (React.isValidElement(child)) {
                        return React.cloneElement(child as any, { 
                          'data-column-index': index,
                          'data-batter-table': isBatterTable
                        });
                      }
                      return child;
                    })}
                  </tr>
                );
              },
              th: ({ children, ...props }: any) => {
                const columnIndex = props['data-column-index'] ?? -1;
                const headerText = typeof children === 'string' ? children : String(children);
                const isBatterTable = props['data-batter-table'] === true;
                
                // 컬럼별 최소 너비 설정 (짧은 컬럼은 더 작게)
                const getMinWidth = () => {
                  if (isBatterTable) {
                    // 타자 표는 고정 너비 사용 (CSS에서 처리)
                    return undefined;
                  }
                  if (headerText.includes('구분')) return '35px';
                  if (headerText.includes('포지션')) return '45px';
                  if (headerText.includes('투구손') || headerText.includes('타격손')) return '40px';
                  if (headerText.includes('이름')) return '70px';
                  if (headerText.includes('구속') || headerText.includes('컨택') || headerText.includes('갭파') || headerText.includes('파워') || headerText.includes('선구') || headerText.includes('주루') || headerText.includes('수비') || headerText.includes('구위') || headerText.includes('제구') || headerText.includes('체력')) return '35px';
                  if (headerText.includes('기록') || headerText.includes('Stats')) return '110px';
                  if (headerText.includes('연봉')) return '45px';
                  if (headerText.includes('비고')) return '70px';
                  if (headerText.includes('원소속') || headerText.includes('변화구')) return '80px';
                  return '50px';
                };
                
                const minWidth = getMinWidth();
                
                return (
                  <th 
                    className={`border border-gray-300 px-0.5 sm:px-1 md:px-1.5 py-0.5 sm:py-1 md:py-1.5 text-left font-semibold text-[7px] sm:text-[8px] md:text-[9px] text-white bg-baseball-green whitespace-nowrap cursor-default ${isBatterTable ? 'batter-table-cell' : ''}`}
                    style={{ 
                      ...(minWidth ? { minWidth } : {}),
                      wordBreak: 'keep-all', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis',
                      paddingLeft: '1px',
                      paddingRight: '1px',
                      lineHeight: '1.2',
                      boxSizing: 'border-box'
                    }}
                  >
                    {children}
                  </th>
                );
              },
              td: ({ children, ...props }: any) => {
                const columnIndex = props['data-column-index'] ?? -1;
                const cellText = typeof children === 'string' ? children : String(children);
                // 첫 번째 컬럼(구분: 1군/2군) 스타일링
                const isDivisionColumn = columnIndex === 0 && (cellText.trim() === '1군' || cellText.trim() === '2군');
                
                // 부모 테이블이 타자 표인지 확인
                const isBatterTable = props['data-batter-table'] === true;
                
                // 컬럼별 최소 너비 설정 (헤더와 동일하게)
                const getMinWidth = () => {
                  if (isBatterTable) {
                    // 타자 표는 고정 너비 사용 (CSS에서 처리)
                    return undefined;
                  }
                  // 컬럼 인덱스에 따라 추정 (실제로는 헤더 텍스트를 확인해야 하지만, 인덱스로 추정)
                  if (columnIndex === 0) return '35px'; // 구분
                  if (columnIndex === 1) return '45px'; // 포지션
                  if (columnIndex === 2) return '40px'; // 투구손/타격손
                  if (columnIndex === 3) return '70px'; // 이름
                  if (columnIndex >= 4 && columnIndex <= 9) return '35px'; // 능력치들
                  if (columnIndex === 10) return '110px'; // 기록 (Stats)
                  if (columnIndex === 11) return '45px'; // 연봉
                  if (columnIndex === 12) return '70px'; // 비고
                  if (columnIndex === 13) return '80px'; // 원소속 구단
                  if (cellText.includes('기록') || cellText.includes('Stats') || cellText.length > 15) return '110px'; // 기록
                  if (cellText.includes('억') || cellText.includes('만')) return '45px'; // 연봉
                  if (cellText.length > 10) return '70px'; // 비고
                  return '50px';
                };
                
                const minWidth = getMinWidth();
                
                return (
                  <td 
                    className={`border border-gray-300 px-0.5 sm:px-1 md:px-1.5 py-0.5 sm:py-1 md:py-1.5 text-[7px] sm:text-[8px] md:text-[9px] font-mono cursor-default whitespace-nowrap ${
                      isDivisionColumn 
                        ? cellText.trim() === '1군' 
                          ? 'font-bold text-baseball-green bg-green-50' 
                          : 'font-bold text-gray-600 bg-gray-50'
                        : ''
                    } ${isBatterTable ? 'batter-table-cell' : ''}`}
                    style={{ 
                      ...(minWidth ? { minWidth } : {}),
                      wordBreak: 'keep-all', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis',
                      paddingLeft: '1px',
                      paddingRight: '1px',
                      lineHeight: '1.2',
                      boxSizing: 'border-box'
                    }}
                    title={cellText.length > 12 ? cellText : undefined}
                  >
                    {children}
                  </td>
                );
              },
              // 일반 텍스트 스타일
              p: ({ children }) => (
                <p className="mb-2 last:mb-0 whitespace-pre-wrap leading-relaxed text-gray-800 break-words">
                  {children}
                </p>
              ),
              // 코드 블록
              pre: ({ children }) => (
                <pre className="bg-gray-50 p-2 sm:p-3 rounded text-[10px] sm:text-xs font-mono overflow-x-auto my-2 border border-gray-200 touch-pan-x">
                  {children}
                </pre>
              ),
              // 인라인 코드
              code: ({ children, className }) => {
                const isInline = !className;
                return isInline ? (
                  <code className="bg-gray-100 px-1 py-0.5 rounded text-[10px] sm:text-xs font-mono text-baseball-green break-all">
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
