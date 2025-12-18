'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useChat } from '@ai-sdk/react';
import { Send, Key, AlertCircle, HelpCircle, Calendar } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MessageBubble from './MessageBubble';
import LoadingOverlay from './LoadingOverlay';
import GameHeader from './GameHeader';
import InstructionsModal from './InstructionsModal';
import HelpModal from './HelpModal';
import SaveLoadModal from './SaveLoadModal';
import TokenUsageModal from './TokenUsageModal';
import { useToast } from '../context/ToastContext';
import { ChatService } from '../services/ChatService';
import { SafeSessionStorage } from '../lib/safeStorage';
import { supabase } from '../lib/supabase';

interface ChatInterfaceProps {
  teamId: string; // 팀 코드 (예: 'kia', 'samsung', 'hanwha')
  selectedTeamName?: string; // 표시용 팀 이름
  difficulty?: string; // 난이도
  onApiKeyChange?: (apiKey: string) => void;
  onLogout?: () => void; // 로그아웃 핸들러
}

/**
 * ChatInterface 컴포넌트
 * 
 * - 사용자가 Google Gemini API Key를 직접 입력받습니다.
 * - API Key는 세션 스토리지에만 저장 (DB 저장 안 함)
 * - Vercel AI SDK의 useChat 훅을 사용하여 스트리밍 채팅 구현
 * - Gemini 2.5 Flash 모델 사용
 */
export default function ChatInterface({ 
  teamId, 
  selectedTeamName,
  difficulty,
  onApiKeyChange,
  onLogout
}: ChatInterfaceProps) {
  const [apiKey, setApiKey] = useState<string>('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [tempApiKey, setTempApiKey] = useState('');
  const [apiKeyError, setApiKeyError] = useState('');
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showSaveLoadModal, setShowSaveLoadModal] = useState(false);
  const [showTokenUsageModal, setShowTokenUsageModal] = useState(false);
  const [currentOptions, setCurrentOptions] = useState<Array<{ label: string; value: string }>>([]);
  const [hasAutoStarted, setHasAutoStarted] = useState(false);
  
  // 토큰 사용량 추적
  const [tokenUsageHistory, setTokenUsageHistory] = useState<Array<{
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    timestamp: Date;
  }>>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();
  const [userId, setUserId] = useState<string | null>(null);

  // Supabase 세션에서 userId 가져오기
  useEffect(() => {
    const getUserId = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUserId(session.user.id);
        } else {
          console.error('사용자 세션이 없습니다.');
        }
      } catch (error) {
        console.error('사용자 ID 조회 실패:', error);
      }
    };
    getUserId();
  }, []);

  // 세션 스토리지에서 API Key 불러오기
  useEffect(() => {
    const storedKey = SafeSessionStorage.getItem('gemini_api_key');
    if (storedKey) {
      setApiKey(storedKey);
      if (onApiKeyChange) {
        onApiKeyChange(storedKey);
      }
        } else {
      setShowApiKeyModal(true);
    }
  }, [onApiKeyChange]);

  // 입력 상태 관리
  const [input, setInput] = useState('');

  // Vercel AI SDK의 useChat 훅 사용 (v2 API) - 클라이언트에서 직접 호출
  const {
    messages,
    sendMessage,
    status,
    error,
    setMessages,
  } = useChat({
    transport: {
      async sendMessages({ messages: chatMessages }) {
        try {
          // API Key 확인 (상태가 비어있을 수 있으므로 sessionStorage에서 직접 가져오기)
          let currentApiKey = apiKey;
          if (!currentApiKey || currentApiKey.trim().length === 0) {
            const storedKey = SafeSessionStorage.getItem('gemini_api_key');
            if (storedKey && storedKey.trim().length > 0) {
              currentApiKey = storedKey;
              setApiKey(storedKey); // 상태도 업데이트
                  } else {
              setShowApiKeyModal(true);
              throw new Error('API Key가 필요합니다. 먼저 API Key를 입력해주세요.');
            }
          }

          // ChatService를 통해 클라이언트에서 직접 Gemini API 호출
          // @ai-sdk/react v2의 메시지 형식 변환 (parts, text, content 속성 모두 지원)
          const formattedMessages = chatMessages.map((msg: any) => {
            let content = '';
            const role = msg.role || 'user';
            
            // parts 배열에서 텍스트 추출 (우선순위 1)
            if (msg.parts && Array.isArray(msg.parts) && msg.parts.length > 0) {
              // parts 배열의 각 요소에서 텍스트 추출
              content = msg.parts
                .map((part: any) => {
                  if (typeof part === 'string') return part;
                  if (part.text) return part.text;
                  if (part.content) return part.content;
                  return '';
                })
                .filter((text: string) => text && text.trim().length > 0)
                .join(' ');
            }
            
            // text 속성 확인 (우선순위 2)
            if (!content && msg.text) {
              content = typeof msg.text === 'string' ? msg.text : String(msg.text);
            }
            
            // content 속성 확인 (우선순위 3)
            if (!content && msg.content) {
              content = typeof msg.content === 'string' ? msg.content : String(msg.content);
            }
            
            if (!content) {
              console.warn('메시지에 content가 없습니다:', msg);
            }
            
            return {
              role: role,
              content: content,
            };
          }).filter((msg: any) => msg.content && msg.content.trim().length > 0); // 빈 메시지 제거

          if (formattedMessages.length === 0) {
            throw new Error('전송할 메시지가 없습니다.');
          }

          // userId 확인 (상태가 없으면 직접 세션에서 가져오기)
          let currentUserId = userId;
          if (!currentUserId) {
            try {
              const { data: { session } } = await supabase.auth.getSession();
              if (session?.user) {
                currentUserId = session.user.id;
                setUserId(currentUserId); // 상태도 업데이트
              } else {
                throw new Error('사용자 세션이 없습니다. 다시 로그인해주세요.');
              }
            } catch (error: any) {
              console.error('사용자 ID 조회 실패:', error);
              throw new Error('사용자 인증이 필요합니다. 다시 로그인해주세요.');
            }
          }

          // ChatService가 toDataStreamResponse 형식으로 반환하므로
          // useChat이 자동으로 처리할 수 있도록 Response 객체를 직접 반환
          const response = await ChatService.streamChat({
            messages: formattedMessages,
            apiKey: currentApiKey, // sessionStorage에서 가져온 키 사용
            teamCode: teamId, // teamId는 이제 코드
            userId: currentUserId, // Supabase auth에서 가져온 userId
          });

          // toDataStreamResponse가 반환한 Response 객체를 그대로 반환
          // useChat이 자동으로 스트림을 파싱하여 처리함
          return response;
        } catch (error: any) {
          console.error('ChatService error:', error);
          throw error;
        }
      },
      async reconnectToStream() {
        return null; // 재연결 기능은 구현하지 않음
      },
    },
    onError: (error: any) => {
      console.error('Chat error:', error);
      showToast('채팅 중 오류가 발생했습니다.', 'error');
      
      // API Key 오류인 경우 모달 다시 표시
      if (error.message?.includes('API') || error.message?.includes('key')) {
        setShowApiKeyModal(true);
        setApiKeyError('API Key가 유효하지 않습니다. 다시 입력해주세요.');
      }
    },
  });

  const isLoading = status === 'streaming' || status === 'submitted';

  // 입력 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // 폼 제출 핸들러
  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }

    // 입력이 비어있으면 무시
    if (!input.trim()) {
      return;
    }
    
    // API Key가 없으면 모달 표시
    if (!apiKey || apiKey.trim().length === 0) {
      setShowApiKeyModal(true);
      setApiKeyError('API Key를 먼저 입력해주세요.');
      return;
    }
    
    // 메시지 전송
    sendMessage({ text: input });
    setInput('');
  };

  // 처음 시작 시 AI 자동 시작
  useEffect(() => {
    // API Key 확인 (SafeSessionStorage 사용)
    let currentApiKey = apiKey;
    if (!currentApiKey || currentApiKey.trim().length === 0) {
      const storedKey = SafeSessionStorage.getItem('gemini_api_key');
      if (storedKey && storedKey.trim().length > 0) {
        currentApiKey = storedKey;
        setApiKey(storedKey);
      }
    }

    // API Key가 있고, 아직 자동 시작하지 않았고, 메시지가 없을 때
    if (currentApiKey && !hasAutoStarted && messages.length === 0 && teamId) {
      setHasAutoStarted(true);
      // 약간의 지연 후 AI에게 시작 메시지 전송
      const timer = setTimeout(() => {
        console.log('[ChatInterface] 자동 시작: 게임을 시작해주세요.');
        sendMessage({ text: '게임을 시작해주세요.' });
      }, 1000); // 지연 시간을 늘려서 컴포넌트가 완전히 마운트된 후 실행
      return () => clearTimeout(timer);
    }
  }, [apiKey, hasAutoStarted, messages.length, sendMessage, teamId]);

  // 메시지 스크롤 자동 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 저장/불러오기 모달 열기
  const handleSaveLoadClick = () => {
    setShowSaveLoadModal(true);
  };

  // 게임 불러오기 핸들러
  const handleLoadGame = (gameData: { teamCode: string; teamName: string; difficulty: string; messages: any[] }) => {
    // 메시지 복원
    setMessages(gameData.messages || []);
    // 다른 상태는 App.tsx에서 관리하므로 여기서는 메시지만 복원
    showToast('게임이 불러와졌습니다.', 'success');
  };

  // 일정 진행 핸들러
  const handleScheduleProgress = () => {
    if (!apiKey) {
      setShowApiKeyModal(true);
      showToast('먼저 API Key를 입력해주세요.', 'warning');
      return;
    }
    sendMessage({ text: '일정을 진행해주세요.' });
  };

  // 지시사항 옵션 선택 핸들러
  const handleOptionSelect = (value: string) => {
    // 모달 닫기
    setShowInstructionsModal(false);
    
    if (!apiKey) {
      setShowApiKeyModal(true);
      showToast('먼저 API Key를 입력해주세요.', 'warning');
      return;
    }
    sendMessage({ text: value });
  };

  // AI 메시지에서 options 추출하여 지시사항 업데이트
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      // @ai-sdk/react의 UIMessage는 parts 배열을 사용
      if (lastMessage.role === 'assistant') {
        // parts 배열에서 텍스트 추출
        let messageText = '';
        if (lastMessage.parts && Array.isArray(lastMessage.parts)) {
          messageText = lastMessage.parts
            .map((part: any) => {
              if (typeof part === 'string') return part;
              if (part.text) return part.text;
              if (part.content) return part.content;
              return '';
            })
            .filter((text: string) => text && text.trim().length > 0)
            .join(' ');
        } else if ((lastMessage as any).content) {
          messageText = (lastMessage as any).content;
        } else if ((lastMessage as any).text) {
          messageText = (lastMessage as any).text;
        }

        if (messageText) {
          // parseAIResponse를 사용하여 options 추출
          const { parseAIResponse } = require('../lib/utils');
          const parsed = parseAIResponse(messageText);
          if (parsed.options && parsed.options.length > 0) {
            setCurrentOptions(parsed.options);
      } else {
            setCurrentOptions([]);
          }
        }
      }
    }
  }, [messages]);

  // API Key 저장 핸들러
  const handleApiKeySubmit = () => {
    if (!tempApiKey.trim()) {
      setApiKeyError('API Key를 입력해주세요.');
              return;
            }
            
    // Google Gemini API Key 형식 검증 (AIza로 시작하는지 확인)
    if (!tempApiKey.startsWith('AIza')) {
      setApiKeyError('올바른 Google Gemini API Key 형식이 아닙니다. (AIza로 시작해야 합니다)');
              return;
            }
            
    // 세션 스토리지에 저장
    try {
      sessionStorage.setItem('gemini_api_key', tempApiKey);
    } catch (error) {
      // Storage 접근 오류 처리 (예: iframe, 보안 컨텍스트 등)
      console.warn('SessionStorage 저장 불가:', error);
      // 메모리에만 저장 (페이지 새로고침 시 사라짐)
    }
    
    setApiKey(tempApiKey);
    setShowApiKeyModal(false);
    setApiKeyError('');
    setTempApiKey('');

    if (onApiKeyChange) {
      onApiKeyChange(tempApiKey);
    }

    showToast('API Key가 저장되었습니다.', 'success');
  };

  // API Key 삭제 핸들러
  const handleApiKeyReset = () => {
    SafeSessionStorage.removeItem('gemini_api_key');
    setApiKey('');
    setShowApiKeyModal(true);
    setMessages([]);
    
    if (onApiKeyChange) {
      onApiKeyChange('');
    }

    showToast('API Key가 삭제되었습니다.', 'info');
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-slate-100">
      {/* 헤더 */}
        <GameHeader 
        teamName={selectedTeamName || 'KBO GM 시뮬레이터'}
        difficulty={difficulty as any}
        onApiKeyClick={handleApiKeyReset}
        onSaveLoadClick={handleSaveLoadClick}
        onTokenUsageClick={() => setShowTokenUsageModal(true)}
        onLogout={onLogout}
      />

      {/* 메시지 영역 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-slate-400">
              <p className="text-lg mb-2">KBO GM 시뮬레이터에 오신 것을 환영합니다!</p>
              <p className="text-sm">아래 입력창에 메시지를 입력하여 게임을 시작하세요.</p>
      </div>
          </div>
        )}

        {messages.map((message: any) => {
          // 사용자 메시지는 기존 MessageBubble 사용
          if (message.role === 'user') {
            // 사용자 메시지의 content 추출
            let userContent = '';
            if (message.parts && Array.isArray(message.parts)) {
              userContent = message.parts
                .map((part: any) => {
                  if (typeof part === 'string') return part;
                  if (part.text) return part.text;
                  if (part.content) return part.content;
                  return '';
                })
                .filter((text: string) => text && text.trim().length > 0)
                .join(' ');
            } else if (message.content) {
              userContent = message.content;
            } else if (message.text) {
              userContent = message.text;
            }
            
            return (
            <MessageBubble
                key={message.id}
                message={userContent}
                isUser={true}
                isStreaming={false}
              />
            );
          }
          
          // AI 메시지는 마크다운으로 직접 렌더링
          return (
            <div key={message.id} className="flex justify-start mb-4">
              <div className="bg-slate-800 rounded-lg p-4 max-w-3xl w-full">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={useMemo(() => ({
                    // 테이블 스타일링
                    table: ({ children }: any) => (
                      <div className="overflow-x-auto my-4 -mx-2 px-2">
                        <table className="min-w-full border-collapse border border-slate-600 bg-slate-700">
                          {children}
                        </table>
                      </div>
                    ),
                    thead: ({ children }: any) => (
                      <thead className="bg-slate-600 text-slate-100">
                        {children}
                      </thead>
                    ),
                    tbody: ({ children }: any) => (
                      <tbody className="divide-y divide-slate-600 bg-slate-700">
                        {children}
                      </tbody>
                    ),
                    tr: ({ children }: any) => (
                      <tr className="hover:bg-slate-600/50 transition-colors">
                        {children}
                      </tr>
                    ),
                    th: ({ children }: any) => (
                      <th className="border border-slate-500 px-3 py-2 text-left font-semibold text-sm bg-slate-600 text-slate-100">
                        {children}
                      </th>
                    ),
                    td: ({ children }: any) => (
                      <td className="border border-slate-500 px-3 py-2 text-sm text-slate-200">
                        {children}
                      </td>
                    ),
                    // 제목 스타일링
                    h1: ({ children }: any) => (
                      <h1 className="text-2xl font-bold text-slate-100 mb-3 mt-4 first:mt-0">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }: any) => (
                      <h2 className="text-xl font-bold text-slate-100 mb-2 mt-3">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }: any) => (
                      <h3 className="text-lg font-semibold text-slate-100 mb-2 mt-2">
                        {children}
                      </h3>
                    ),
                    // 문단
                    p: ({ children }: any) => (
                      <p className="mb-3 text-slate-200 leading-relaxed last:mb-0">
                        {children}
                      </p>
                    ),
                    // 리스트
                    ul: ({ children }: any) => (
                      <ul className="list-disc list-inside mb-3 space-y-1 text-slate-200">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }: any) => (
                      <ol className="list-decimal list-inside mb-3 space-y-1 text-slate-200">
                        {children}
                      </ol>
                    ),
                    // 강조
                    strong: ({ children }: any) => (
                      <strong className="font-bold text-slate-100">
                        {children}
                      </strong>
                    ),
                    // 코드
                    code: ({ children, className }: any) => {
                      const isInline = !className;
                      return isInline ? (
                        <code className="bg-slate-700 px-1.5 py-0.5 rounded text-sm font-mono text-slate-100">
                          {children}
                        </code>
                      ) : (
                        <code className={className}>{children}</code>
                      );
                    },
                    pre: ({ children }: any) => (
                      <pre className="bg-slate-700 p-3 rounded text-sm font-mono overflow-x-auto my-3 text-slate-100">
                        {children}
                      </pre>
                    ),
                    // 링크
                    a: ({ children, href }: any) => (
                      <a 
                        href={href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        {children}
                      </a>
                    ),
                  }), [])}
                >
                  {message.content}
                </ReactMarkdown>
                {isLoading && message.role === 'assistant' && (
                  <div className="inline-flex items-center gap-1 ml-2 mt-2">
                    <div className="w-2 h-4 bg-blue-400 rounded-full animate-pulse" />
                </div>
                )}
                </div>
              </div>
          );
        })}

        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex justify-start">
            <div className="bg-slate-800 rounded-lg p-4 max-w-3xl">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
      </div>
                </div>
                </div>
        )}

        {error && (
          <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 text-red-200">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5" />
              <span>{error.message || '알 수 없는 오류가 발생했습니다.'}</span>
              </div>
      </div>
          )}

          <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <div className="border-t border-slate-700 p-4 bg-slate-800">
        <div className="flex gap-2 items-center">
          {/* 도움말 버튼 (위로 이동) */}
              <button
            onClick={() => setShowHelpModal(true)}
            className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-lg transition-colors flex items-center justify-center min-w-[40px] min-h-[40px]"
            title="도움말"
          >
            <HelpCircle className="w-5 h-5" />
              </button>

          {/* 지시사항 버튼 (원래 도움말 위치) */}
          <div className="relative">
              <button
              onClick={() => setShowInstructionsModal(true)}
              className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-lg transition-colors flex items-center justify-center min-w-[40px] min-h-[40px]"
              title={currentOptions.length > 0 ? `지시사항 (${currentOptions.length}개)` : '지시사항'}
            >
              <Calendar className="w-5 h-5" />
            </button>
            {currentOptions.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-baseball-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {currentOptions.length}
                  </span>
                )}
            </div>

          <form onSubmit={handleSubmit} className="flex-1 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="메시지를 입력하세요..."
              className="flex-1 bg-slate-700 text-slate-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading || !apiKey}
            />
            <button
              type="submit"
              disabled={isLoading || !apiKey || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg px-6 py-2 flex items-center gap-2 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>전송</span>
            </button>
        </form>
        </div>
      </div>

      {/* 지시사항 모달 (AI 선택지 버튼) */}
      <InstructionsModal
        isOpen={showInstructionsModal}
        onClose={() => setShowInstructionsModal(false)}
        options={currentOptions}
        onOptionSelect={handleOptionSelect}
        onScheduleProgress={handleScheduleProgress}
        isLoading={isLoading}
        hasApiKey={!!apiKey}
      />

      {/* 도움말 모달 */}
      <HelpModal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
      />

      {/* 저장/불러오기 모달 */}
      <SaveLoadModal
        isOpen={showSaveLoadModal}
        onClose={() => setShowSaveLoadModal(false)}
        teamCode={teamId}
        teamName={selectedTeamName}
        difficulty={difficulty}
        messages={messages}
        onLoadGame={handleLoadGame}
      />

      {/* 토큰 사용량 모달 */}
      <TokenUsageModal
        isOpen={showTokenUsageModal}
        onClose={() => setShowTokenUsageModal(false)}
        usageHistory={tokenUsageHistory}
        totalUsage={{
          promptTokens: tokenUsageHistory.reduce((sum, u) => sum + u.promptTokens, 0),
          completionTokens: tokenUsageHistory.reduce((sum, u) => sum + u.completionTokens, 0),
          totalTokens: tokenUsageHistory.reduce((sum, u) => sum + u.totalTokens, 0),
          requestCount: tokenUsageHistory.length,
        }}
      />

      {/* API Key 입력 모달 */}
      <AnimatePresence>
        {showApiKeyModal && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => !apiKey && setShowApiKeyModal(false)}
            >
                  <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4 border border-slate-700"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Key className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-bold text-slate-100">Google Gemini API Key 입력</h2>
                </div>

              <p className="text-slate-400 text-sm mb-4">
                채팅 기능을 사용하려면 Google Gemini API Key가 필요합니다.
                <br />
                <span className="text-yellow-400">⚠️ API Key는 브라우저에만 저장되며, 서버로 전송되지 않습니다.</span>
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    API Key
                  </label>
                  <input
                    type="password"
                    value={tempApiKey}
                    onChange={(e) => {
                      setTempApiKey(e.target.value);
                      setApiKeyError('');
                    }}
                    placeholder="AIza..."
                    className="w-full bg-slate-700 text-slate-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  {apiKeyError && (
                    <p className="text-red-400 text-sm mt-1">{apiKeyError}</p>
                  )}
      </div>

                <div className="flex space-x-2">
              <button
                    onClick={handleApiKeySubmit}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-colors"
                  >
                    저장
              </button>
                  {apiKey && (
              <button
                      onClick={() => setShowApiKeyModal(false)}
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-lg transition-colors"
                    >
                      취소
              </button>
                  )}
      </div>

                <p className="text-xs text-slate-500">
                  API Key는 <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Google AI Studio</a>에서 발급받을 수 있습니다.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 로딩 오버레이 */}
      {isLoading && <LoadingOverlay isLoading={isLoading} />}
    </div>
  );
}
