import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { getGeminiModel } from '../lib/gemini';
import GameHeader from './GameHeader';
import MessageBubble from './MessageBubble';
import LoadingOverlay from './LoadingOverlay';
import EventModal, { Player } from './EventModal';
import NegotiationInput from './NegotiationInput';
import NewsSidebar from './NewsSidebar';
import { parseAIResponse, extractDate, extractBudget, GamePhase, GUIEvent } from '../lib/utils';
import { Team } from '../constants/TeamData';
import { useSound } from '../hooks/useSound';

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatInterfaceProps {
  apiKey: string;
  selectedTeam: Team;
  onResetApiKey?: () => void;
}

const SAVE_KEY = 'baseball_game_save';

export default function ChatInterface({ apiKey, selectedTeam, onResetApiKey }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [currentOptions, setCurrentOptions] = useState<Array<{ label: string; value: string }>>([]);
  const [gameState, setGameState] = useState<{ date: string | null; budget: number | null }>({
    date: null,
    budget: null, // 초기값은 null (0이 아닌 null로 명확히 구분)
  });
  const [gamePhase, setGamePhase] = useState<GamePhase>('MAIN_GAME');
  const [guiEvent, setGuiEvent] = useState<GUIEvent | null>(null);
  const [negotiationPlayer, setNegotiationPlayer] = useState<string | null>(null);
  const [isModelReady, setIsModelReady] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInstanceRef = useRef<any>(null);
  const modelRef = useRef<any>(null);
  const { playSound } = useSound();

  useEffect(() => {
    if (apiKey) {
      modelRef.current = getGeminiModel(apiKey);
      chatInstanceRef.current = null;
      setIsModelReady(true);
    } else {
      setIsModelReady(false);
    }
  }, [apiKey]);

  // 게임 시작 시 팀 정보 전송 (모델 초기화 후)
  useEffect(() => {
    if (selectedTeam && messages.length === 0 && isModelReady && modelRef.current) {
      const teamMessage = `${selectedTeam.fullName}을 선택했습니다. 게임을 시작해주세요.`;
      // 약간의 지연을 두어 모든 초기화가 완료되도록 함
      const timer = setTimeout(() => {
        handleSend(teamMessage);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [selectedTeam, isModelReady, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingMessage]);

  // 메시지 변경 시 헤더 정보 업데이트
  useEffect(() => {
    // 마지막 AI 메시지에서 날짜와 자금 정보 추출
    const aiMessages = messages.filter(m => !m.isUser);
    if (aiMessages.length > 0) {
      const lastAIMessage = aiMessages[aiMessages.length - 1];
      const parsed = parseAIResponse(lastAIMessage.text);
      
      // 날짜 추출
      const extractedDate = extractDate(parsed.text);
      if (extractedDate) {
        setGameState(prev => ({ ...prev, date: extractedDate }));
      }
      
      // 자금 추출
      const extractedBudget = extractBudget(parsed.text);
      console.log('[자금 파싱] 원본 텍스트:', lastAIMessage.text.substring(0, 200)); // 처음 200자만
      console.log('[자금 파싱] 파싱된 텍스트:', parsed.text.substring(0, 200));
      console.log('[자금 파싱] 추출된 자금:', extractedBudget);
      if (extractedBudget !== null && extractedBudget > 0) { // 0보다 큰 값만 업데이트
        console.log('[자금 파싱] ✅ 자금 업데이트:', extractedBudget.toLocaleString('ko-KR') + '원');
        setGameState(prev => ({ ...prev, budget: extractedBudget }));
      } else {
        console.log('[자금 파싱] ❌ 자금 추출 실패 또는 0원');
      }
    }
  }, [messages]);

  // 스트리밍 중에도 헤더 정보 업데이트
  useEffect(() => {
    if (streamingMessage) {
      const parsed = parseAIResponse(streamingMessage);
      
      const extractedDate = extractDate(parsed.text);
      if (extractedDate) {
        setGameState(prev => ({ ...prev, date: extractedDate }));
      }
      
      const extractedBudget = extractBudget(parsed.text);
      console.log('[자금 파싱 - 스트리밍] 원본 텍스트:', streamingMessage.substring(0, 200));
      console.log('[자금 파싱 - 스트리밍] 파싱된 텍스트:', parsed.text.substring(0, 200));
      console.log('[자금 파싱 - 스트리밍] 추출된 자금:', extractedBudget);
      if (extractedBudget !== null && extractedBudget > 0) { // 0보다 큰 값만 업데이트
        console.log('[자금 파싱 - 스트리밍] ✅ 자금 업데이트:', extractedBudget.toLocaleString('ko-KR') + '원');
        setGameState(prev => ({ ...prev, budget: extractedBudget }));
      } else {
        console.log('[자금 파싱 - 스트리밍] ❌ 자금 추출 실패 또는 0원');
      }
    }
  }, [streamingMessage]);

  const handleSend = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    playSound('click');
    const userMessage = messageText.trim();
    setInput('');
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);
    setStreamingMessage('');
    setCurrentOptions([]);

    try {
      if (!modelRef.current) {
        throw new Error('모델이 초기화되지 않았습니다.');
      }

      // 채팅 인스턴스가 없으면 새로 생성
      if (!chatInstanceRef.current) {
        const history = messages.length > 1 
          ? messages.slice(1, -1).map(msg => ({
              role: msg.isUser ? 'user' : 'model',
              parts: [{ text: msg.text }],
            }))
          : [];

        chatInstanceRef.current = modelRef.current.startChat({
          history: history,
        });
      }

      const result = await chatInstanceRef.current.sendMessageStream(userMessage);
      let fullText = '';

      try {
        for await (const chunk of result.stream) {
          try {
            const chunkText = chunk.text();
            if (chunkText) {
              fullText += chunkText;
              setStreamingMessage(fullText);
              
              // 스트리밍 중에도 옵션 파싱 시도
              const parsed = parseAIResponse(fullText);
              if (parsed.options.length > 0) {
                setCurrentOptions(parsed.options);
              }
            }
          } catch (chunkError) {
            console.warn('Chunk 처리 오류:', chunkError);
          }
        }

        // 스트리밍 완료 후 최종 응답 확인
        const response = await result.response;
        const finalText = response.text();
        
        if (finalText && finalText !== fullText) {
          fullText = finalText;
          setStreamingMessage(fullText);
        }

        if (fullText) {
          // 최종 메시지에서 옵션 및 GUI 이벤트 파싱
          const parsed = parseAIResponse(fullText);
          setMessages((prev) => [...prev, { text: fullText, isUser: false }]);
          setCurrentOptions(parsed.options);
          
          // GUI 이벤트 처리
          if (parsed.guiEvent) {
            setGuiEvent(parsed.guiEvent);
            setGamePhase('EVENT_MODAL');
            playSound('swoosh');
          } else {
            playSound('success');
          }
        } else {
          throw new Error('응답을 받을 수 없었습니다.');
        }
      } catch (streamError) {
        console.error('스트리밍 오류:', streamError);
        try {
          const response = await result.response;
          const text = response.text();
          if (text) {
            const parsed = parseAIResponse(text);
            setMessages((prev) => [...prev, { text, isUser: false }]);
            setCurrentOptions(parsed.options);
            
            // GUI 이벤트 처리
            if (parsed.guiEvent) {
              setGuiEvent(parsed.guiEvent);
              setGamePhase('EVENT_MODAL');
            }
          } else {
            throw streamError;
          }
        } catch {
          throw streamError;
        }
      } finally {
        setStreamingMessage('');
      }
    } catch (error: any) {
      console.error('Error:', error);
      const errorMessage = error?.message || error?.toString() || '알 수 없는 오류';
      setMessages((prev) => [
        ...prev,
        {
          text: `오류가 발생했습니다: ${errorMessage}\n\nAPI 키와 인터넷 연결을 확인해주세요.`,
          isUser: false,
        },
      ]);
      setStreamingMessage('');
      setCurrentOptions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  const handleOptionClick = (value: string) => {
    playSound('click');
    handleSend(value);
  };

  // 세이브 기능
  const handleSave = () => {
    try {
      const saveData = {
        messages,
        gameState,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
      alert('게임이 저장되었습니다.');
    } catch (error) {
      console.error('저장 오류:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  // 불러오기 기능
  const handleLoad = () => {
    try {
      const savedData = localStorage.getItem(SAVE_KEY);
      if (!savedData) {
        alert('저장된 파일이 없습니다.');
        return;
      }

      const parsed = JSON.parse(savedData);
      if (parsed.messages && Array.isArray(parsed.messages)) {
        setMessages(parsed.messages);
        if (parsed.gameState) {
          setGameState(parsed.gameState);
        }
        // 채팅 인스턴스 초기화 (새로운 히스토리로 시작)
        chatInstanceRef.current = null;
        alert('게임을 불러왔습니다.');
      } else {
        alert('저장 파일 형식이 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('불러오기 오류:', error);
      alert('불러오기 중 오류가 발생했습니다.');
    }
  };

  // GUI 이벤트 핸들러
  const handlePlayerSelect = (player: Player) => {
    playSound('coin');
    const message = `${player.name} 선수 선택`;
    setGamePhase('NEGOTIATION');
    setNegotiationPlayer(player.name);
    handleSend(message);
  };

  const handleNegotiationSubmit = (amount: number) => {
    const message = `${negotiationPlayer} 선수에게 ${amount.toLocaleString()}원 제시`;
    setGamePhase('MAIN_GAME');
    setNegotiationPlayer(null);
    handleSend(message);
  };

  const handleEventModalClose = () => {
    setGamePhase('MAIN_GAME');
    setGuiEvent(null);
  };

  // 마지막 AI 메시지에서 옵션 추출 (표시용)
  const lastAIMessage = messages.filter(m => !m.isUser).slice(-1)[0];
  const displayOptions = streamingMessage 
    ? currentOptions 
    : lastAIMessage 
      ? parseAIResponse(lastAIMessage.text).options 
      : [];

  return (
    <div className="flex flex-col h-screen bg-[#Fdfbf7]">
      {/* 헤더 - 상태바 */}
      <GameHeader 
        teamName={selectedTeam.fullName}
        budget={gameState.budget}
        date={gameState.date}
        season="2026 시즌"
        onSave={handleSave}
        onLoad={handleLoad}
        onNewsClick={() => setIsNewsOpen(true)}
        onApiKeyClick={onResetApiKey}
      />

      {/* 메인 - 채팅 영역 */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-4 sm:py-6">
        <div className="max-w-5xl mx-auto w-full">
          {messages.map((msg, idx) => (
            <MessageBubble
              key={idx}
              message={msg.text}
              isUser={msg.isUser}
            />
          ))}
          {streamingMessage && (
            <MessageBubble
              message={streamingMessage}
              isUser={false}
              isStreaming={true}
            />
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 푸터 - 입력 영역 */}
      <div className="border-t border-gray-300 bg-gray-50 shadow-lg">
        {/* 선택지 버튼 (작전 지시 패널) */}
        {displayOptions.length > 0 && !isLoading && (
          <div className="px-4 pt-3 pb-2 border-b border-gray-300 bg-white">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">작전 지시</div>
            <div className="flex flex-wrap gap-2">
              {displayOptions.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(option.value)}
                  disabled={isLoading}
                  className="px-4 py-2 bg-white border-2 border-gray-300 hover:border-baseball-green hover:bg-baseball-green/5 disabled:bg-gray-200 disabled:border-gray-200 disabled:cursor-not-allowed text-baseball-green text-sm font-semibold rounded transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit} className="p-4">
          <div className="flex gap-2 max-w-5xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="명령을 입력하세요..."
              className="flex-1 px-4 py-2.5 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-baseball-green focus:border-transparent disabled:bg-gray-100 font-sans"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 py-2.5 bg-baseball-green hover:bg-baseball-green-dark disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 border-b-2 border-baseball-green-dark"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>

      {/* 로딩 오버레이 */}
      {isLoading && <LoadingOverlay />}

      {/* 이벤트 모달 */}
      <AnimatePresence>
        {gamePhase === 'EVENT_MODAL' && guiEvent && (
          <EventModal
            isOpen={true}
            type={guiEvent.type as 'DRAFT' | 'FA' | 'TRADE'}
            title={
              guiEvent.type === 'DRAFT' ? '신인 드래프트' :
              guiEvent.type === 'FA' ? 'FA 시장' :
              '트레이드 제안'
            }
            players={guiEvent.data?.players || []}
            onSelect={handlePlayerSelect}
            onClose={handleEventModalClose}
          />
        )}
      </AnimatePresence>

      {/* 협상 입력 */}
      <AnimatePresence>
        {gamePhase === 'NEGOTIATION' && negotiationPlayer && (
          <NegotiationInput
            playerName={negotiationPlayer}
            onSubmit={handleNegotiationSubmit}
            onClose={() => {
              setGamePhase('MAIN_GAME');
              setNegotiationPlayer(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* 뉴스 사이드바 */}
      <NewsSidebar
        isOpen={isNewsOpen}
        onClose={() => setIsNewsOpen(false)}
      />

    </div>
  );
}
