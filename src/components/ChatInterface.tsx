'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { Send, Key, AlertCircle, HelpCircle, Calendar, FastForward } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MessageBubble from './MessageBubble';
import GameHeader from './GameHeader';
import InstructionsModal from './InstructionsModal';
import HelpModal from './HelpModal';
import SaveLoadModal from './SaveLoadModal';
import TokenUsageModal from './TokenUsageModal';
import RecruitModal from './RecruitModal';
import { useToast } from '../context/ToastContext';
import { SafeStorage } from '../lib/safeStorage';
import { supabase } from '../lib/supabase';
import { parseAIResponse, type GUIEvent } from '../lib/utils';

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
 * - 사용자가 Gemini API Key를 입력합니다.
 * - API Key는 로컬 스토리지에 저장 (DB 저장 안 함)
 * - 브라우저에서 Gemini API를 직접 호출하지 않고, `/api/chat`(Edge Function)에서 호출 후
 *   AI SDK UI Message Stream 형태로 스트리밍 응답을 받아 렌더링합니다.
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
  const [headerBudget, setHeaderBudget] = useState<number | null>(null);
  const [headerDate, setHeaderDate] = useState<string | null>(null);
  const [headerSalaryCapUsage, setHeaderSalaryCapUsage] = useState<number | undefined>(undefined);
  const [activeGuiEvent, setActiveGuiEvent] = useState<GUIEvent | null>(null);
  const [showGuiEventModal, setShowGuiEventModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  // 로컬 스토리지에서 API Key 불러오기 (새 창/새 탭에서도 유지)
  useEffect(() => {
    const storedKey = SafeStorage.getItem('gemini_api_key');
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

  // AI SDK 기본 HTTP transport를 사용해
  // 서버(/api/chat)가 내려주는 UI Message Stream을 올바르게 파싱/처리합니다.
  // (커스텀 transport에서 Response를 반환하면 stream.pipeThrough 에러가 날 수 있음)
  const transport = useMemo(() => {
    return new DefaultChatTransport({
      api: '/api/chat',
      // 팀 코드는 body로 전달 (메시지 배열은 transport가 자동 포함)
      body: { teamCode: teamId },
      // Authorization + 사용자 Gemini 키는 매 요청 시점에 동적으로 평가
      headers: async () => {
        const storedKey = SafeStorage.getItem('gemini_api_key') || '';
        const { data: { session } } = await supabase.auth.getSession();
        const accessToken = session?.access_token || '';
        return {
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          ...(storedKey ? { 'x-gemini-api-key': storedKey } : {}),
        };
      },
    });
  }, [teamId]);

  // Vercel AI SDK의 useChat 훅 사용
  const {
    messages,
    sendMessage,
    status,
    error,
    setMessages,
  } = useChat({
    transport,
    onFinish: ({ message }: any) => {
      // 서버(api/chat.ts)가 finish 파트의 totalUsage를 message.metadata.usage로 주입합니다.
      const usage = message?.metadata?.usage;
      if (usage && typeof usage.totalTokens === 'number') {
        setTokenUsageHistory((prev) => [
          ...prev,
          {
            promptTokens: usage.promptTokens || 0,
            completionTokens: usage.completionTokens || 0,
            totalTokens: usage.totalTokens || 0,
            timestamp: new Date(),
          },
        ]);
      }
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

  // ⚠️ Hook은 조건/루프(messages.map) 안에서 호출하면 안 됩니다.
  // ReactMarkdown components 객체는 최상단에서 한 번만 생성해 재사용합니다.
  const markdownComponents = useMemo(() => ({
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
  }), []);

  // 입력 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // AI 응답이 끝나면(ready) 바로 입력 가능하도록 포커스
  useEffect(() => {
    if (status === 'ready') {
      // 다음 프레임에 포커스
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [status]);

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
    // API Key 확인 (LocalStorage 사용: 새 창/새 탭에서도 유지)
    let currentApiKey = apiKey;
    if (!currentApiKey || currentApiKey.trim().length === 0) {
      const storedKey = SafeStorage.getItem('gemini_api_key');
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
    // 요구사항: "다음 이벤트로 진행"
    sendMessage({ text: '다음 이벤트로 진행해주세요.' });
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
          // parseAIResponse를 사용하여 옵션/STATUS/NEWS/GUI_EVENT 등 추출
          const parsed = parseAIResponse(messageText);

          // 옵션(지시사항 버튼)
          if (parsed.options && parsed.options.length > 0) {
            setCurrentOptions(parsed.options);
          } else {
            setCurrentOptions([]);
          }

          // GUI 이벤트(예: 외국인 영입/드래프트 등) 자동 오픈
          if (parsed.guiEvent) {
            setActiveGuiEvent(parsed.guiEvent);
            setShowGuiEventModal(true);
          }

          // 헤더 상태(자금/날짜/샐러리캡)
          if (parsed.status) {
            if (typeof parsed.status.budgetValue === 'number') {
              setHeaderBudget(parsed.status.budgetValue);
            }
            if (typeof parsed.status.date === 'string') {
              setHeaderDate(parsed.status.date);
            }
            if (typeof parsed.status.salaryCapUsage === 'number') {
              setHeaderSalaryCapUsage(parsed.status.salaryCapUsage);
            }
          }
        }
      }
    }
  }, [messages]);

  const handleGuiCandidateSelect = (candidate: any) => {
    const name = candidate?.name ? String(candidate.name) : '';
    if (!name) return;
    // 후보 선택은 "이름 영입" 형태로 AI에게 전달 (프롬프트가 자연어 선택을 처리)
    sendMessage({ text: `${name} 영입` });
    setShowGuiEventModal(false);
  };

  const handleGuiEventClose = () => {
    setShowGuiEventModal(false);
  };

  const handleFinishRecruit = () => {
    sendMessage({ text: '외국인 영입 종료' });
    setShowGuiEventModal(false);
  };

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
            
    // 로컬 스토리지에 저장 (새 창/새 탭에서도 유지)
    try {
      SafeStorage.setItem('gemini_api_key', tempApiKey);
    } catch (error) {
      // Storage 접근 오류 처리 (예: iframe, 보안 컨텍스트 등)
      console.warn('LocalStorage 저장 불가:', error);
      // Fallback은 SafeStorage 내부에서 처리됨
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
    SafeStorage.removeItem('gemini_api_key');
    setApiKey('');
    setShowApiKeyModal(true);
    setMessages([]);
    
    if (onApiKeyChange) {
      onApiKeyChange('');
    }

    showToast('API Key가 삭제되었습니다.', 'info');
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-slate-900 text-slate-100">
      {/* 헤더 */}
        <GameHeader 
        teamName={selectedTeamName || 'KBO GM 시뮬레이터'}
        budget={headerBudget}
        date={headerDate}
        difficulty={difficulty as any}
        salaryCapUsage={headerSalaryCapUsage}
        onApiKeyClick={handleApiKeyReset}
        onSaveLoadClick={handleSaveLoadClick}
        onTokenUsageClick={() => setShowTokenUsageModal(true)}
        onLogout={onLogout}
      />

      {/* 메시지 영역 */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl px-4 py-4 space-y-4">
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
          // AI SDK v5는 message.content 대신 message.parts에 텍스트가 들어오는 경우가 많음
          let assistantContent = '';
          if (message.parts && Array.isArray(message.parts)) {
            assistantContent = message.parts
              .map((part: any) => {
                if (typeof part === 'string') return part;
                if (part.text) return part.text;
                if (part.content) return part.content;
                return '';
              })
              .filter((text: string) => text && text.trim().length > 0)
              .join(' ');
          } else if (message.content) {
            assistantContent = message.content;
          } else if (message.text) {
            assistantContent = message.text;
          }

          // [FIX] 시스템 태그([OPTIONS]/[GUI_EVENT]/[NEWS]/[STATUS] 등)는 채팅 본문에서 제거하고,
          // 옵션/GUI 이벤트는 별도 UI로 표시한다.
          const parsedAssistant = parseAIResponse(assistantContent);

          return (
            <div key={message.id} className="flex justify-start mb-4">
              <div className="bg-slate-800 rounded-lg p-4 max-w-3xl w-full">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={markdownComponents}
                >
                  {parsedAssistant.text}
                </ReactMarkdown>

                {/* OPTIONS 태그는 텍스트로 노출하지 않고, 실제 버튼 UI로만 제공 */}
                {parsedAssistant.options?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {parsedAssistant.options.map((opt, idx) => (
                      <button
                        key={`${message.id}-opt-${idx}`}
                        onClick={() => handleOptionSelect(opt.value)}
                        disabled={isLoading}
                        className="px-3 py-2 rounded-lg bg-baseball-gold hover:bg-yellow-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-slate-900 font-semibold text-sm transition-colors"
                        title={opt.value}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* GUI_EVENT가 있으면 '후보 목록 보기' 버튼 제공 (목록은 모달에서 렌더링) */}
                {parsedAssistant.guiEvent?.type === 'RECRUIT' && (
                  <div className="mt-3">
                    <button
                      onClick={() => {
                        setActiveGuiEvent(parsedAssistant.guiEvent || null);
                        setShowGuiEventModal(true);
                      }}
                      className="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-100 font-semibold text-sm transition-colors"
                    >
                      후보 명단 보기
                    </button>
                  </div>
                )}
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
      </div>

      {/* 입력 영역 */}
      <div className="border-t border-slate-700 bg-slate-800">
        <div className="mx-auto w-full max-w-3xl px-4 py-3 flex gap-2 items-center">
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

          {/* 일정 진행(다음 이벤트) 버튼: 지시사항 버튼 옆 */}
          <button
            onClick={handleScheduleProgress}
            disabled={isLoading || !apiKey}
            className="p-2 bg-baseball-gold hover:bg-yellow-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center justify-center min-w-[40px] min-h-[40px]"
            title="다음 이벤트로 진행"
          >
            <FastForward className="w-5 h-5" />
          </button>

          <form onSubmit={handleSubmit} className="flex-1 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="메시지를 입력하세요..."
              className="flex-1 bg-slate-700 text-slate-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading || !apiKey}
              ref={inputRef}
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

      {/* GUI 이벤트 모달 (예: 외국인 선수 영입 후보 명단) */}
      <RecruitModal
        isOpen={showGuiEventModal && activeGuiEvent?.type === 'RECRUIT'}
        onClose={handleGuiEventClose}
        event={activeGuiEvent}
        onSelectCandidate={handleGuiCandidateSelect}
        onFinishRecruit={handleFinishRecruit}
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
                <span className="text-yellow-400">⚠️ API Key는 DB에 저장되지 않으며, 요청 시에만 서버로 전달되어 Gemini 호출에 사용됩니다.</span>
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

    </div>
  );
}
