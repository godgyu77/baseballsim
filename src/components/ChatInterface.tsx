import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { getGeminiModel } from '../lib/gemini';
import GameHeader from './GameHeader';
import MessageBubble from './MessageBubble';
import LoadingOverlay from './LoadingOverlay';
import EventModal, { Player } from './EventModal';
import NegotiationInput from './NegotiationInput';
import RandomEventModal from './RandomEventModal';
import FacilityManagement from './FacilityManagement';
import OptionsModal from './OptionsModal';
import { parseAIResponse, extractDate, extractBudget, GamePhase, GUIEvent, RandomEvent, FacilityType, FacilityState } from '../lib/utils';
import { Team } from '../constants/TeamData';
import { useSound } from '../hooks/useSound';
import { RANDOM_EVENTS, RANDOM_EVENT_CHANCE } from '../constants/GameEvents';
import { createInitialFacilityState, FACILITY_DEFINITIONS } from '../constants/Facilities';

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatInterfaceProps {
  apiKey: string;
  selectedTeam: Team;
  onResetApiKey?: () => void;
}

// 저장/불러오기 기능 제거됨
// const SAVE_KEY = 'baseball_game_save';

export default function ChatInterface({ apiKey, selectedTeam, onResetApiKey }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [currentOptions, setCurrentOptions] = useState<Array<{ label: string; value: string }>>([]);
  const [gameState, setGameState] = useState<{ 
    date: string | null; 
    budget: number | null;
    morale: number; // 팀 사기 (0 ~ 100)
    fanLoyalty: number; // 팬 충성도 (0 ~ 100)
  }>({
    date: null,
    budget: null, // 초기값은 null (0이 아닌 null로 명확히 구분)
    morale: 50, // 초기값 50
    fanLoyalty: 50, // 초기값 50
  });
  const [gamePhase, setGamePhase] = useState<GamePhase>('MAIN_GAME');
  const [guiEvent, setGuiEvent] = useState<GUIEvent | null>(null);
  const [negotiationPlayer, setNegotiationPlayer] = useState<string | null>(null);
  const [isModelReady, setIsModelReady] = useState(false);
  const [randomEvent, setRandomEvent] = useState<RandomEvent | null>(null);
  const [isRandomEventOpen, setIsRandomEventOpen] = useState(false);
  const [isFacilityOpen, setIsFacilityOpen] = useState(false);
  const [facilities, setFacilities] = useState<FacilityState>(createInitialFacilityState());
  const [loadingStatusText, setLoadingStatusText] = useState<string | undefined>(undefined);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [pendingOptions, setPendingOptions] = useState<Array<{ label: string; value: string }>>([]);
  // 뉴스 기능 제거됨
  // const [isNewsOpen, setIsNewsOpen] = useState(false);
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
    setStreamingMessage(''); // 스트리밍 텍스트는 숨김
    setCurrentOptions([]);
    setLoadingStatusText(undefined);
    setIsOptionsModalOpen(false);

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
              // 스트리밍 텍스트는 내부적으로만 저장 (화면에는 표시 안 함)
              // setStreamingMessage(fullText); // 주석 처리 - 로딩 화면만 표시
              
              // 키워드 기반 상태 텍스트 업데이트 (진행률은 LoadingOverlay에서 자동 관리)
              if (fullText.includes('선수') || fullText.includes('명단')) {
                setLoadingStatusText('선수 데이터를 확인 중입니다...');
              } else if (fullText.includes('자금') || fullText.includes('예산')) {
                setLoadingStatusText('재무 상태를 분석 중입니다...');
              } else if (fullText.includes('표') || fullText.includes('명단')) {
                setLoadingStatusText('보고서를 작성 중입니다...');
              }
              
              // 스트리밍 중에도 옵션 파싱 시도 (내부적으로만)
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
        }

        // 로딩 완료 (진행률은 LoadingOverlay에서 자동으로 100% 처리)
        setLoadingStatusText('완료!');

        if (fullText) {
          // 최종 메시지에서 옵션 및 GUI 이벤트 파싱
          const parsed = parseAIResponse(fullText);
          // 파싱된 텍스트만 저장 (JSON 태그 제거된 깨끗한 텍스트)
          setMessages((prev) => [...prev, { text: parsed.text, isUser: false }]);
          
          // 옵션이 있으면 플로팅 버튼만 표시 (모달은 즉시 띄우지 않음)
          if (parsed.options.length > 0) {
            setPendingOptions(parsed.options);
            setCurrentOptions(parsed.options);
            // 모달은 즉시 띄우지 않고, 플로팅 버튼만 표시
            setIsOptionsModalOpen(false);
          } else {
            setCurrentOptions([]);
            setPendingOptions([]);
          }
          
          // GUI 이벤트 처리
          if (parsed.guiEvent) {
            console.log('[GUI_EVENT] 수신:', parsed.guiEvent);
            // players 데이터가 있는지 확인
            const hasPlayers = parsed.guiEvent.data?.players && Array.isArray(parsed.guiEvent.data.players) && parsed.guiEvent.data.players.length > 0;
            if (hasPlayers) {
              setGuiEvent(parsed.guiEvent);
              setGamePhase('EVENT_MODAL');
              playSound('swoosh');
            } else {
              console.warn('[GUI_EVENT] players 데이터가 없거나 비어있음:', parsed.guiEvent);
              // 데이터가 없으면 모달을 열지 않고 채팅으로만 표시
              playSound('success');
            }
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
            // 파싱된 텍스트만 저장 (JSON 태그 제거된 깨끗한 텍스트)
            setMessages((prev) => [...prev, { text: parsed.text, isUser: false }]);
            
            // 옵션이 있으면 플로팅 버튼만 표시 (모달은 즉시 띄우지 않음)
            if (parsed.options.length > 0) {
              setPendingOptions(parsed.options);
              setCurrentOptions(parsed.options);
              setIsOptionsModalOpen(false);
            } else {
              setCurrentOptions([]);
              setPendingOptions([]);
            }
            
            // GUI 이벤트 처리
            if (parsed.guiEvent) {
              console.log('[GUI_EVENT] 수신:', parsed.guiEvent);
              // players 데이터가 있는지 확인
              const hasPlayers = parsed.guiEvent.data?.players && Array.isArray(parsed.guiEvent.data.players) && parsed.guiEvent.data.players.length > 0;
              if (hasPlayers) {
                setGuiEvent(parsed.guiEvent);
                setGamePhase('EVENT_MODAL');
              } else {
                console.warn('[GUI_EVENT] players 데이터가 없거나 비어있음:', parsed.guiEvent);
                // 데이터가 없으면 모달을 열지 않고 채팅으로만 표시
              }
            }
          } else {
            throw streamError;
          }
        } catch {
          throw streamError;
        }
      } finally {
        setStreamingMessage('');
        setLoadingStatusText(undefined);
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
      setPendingOptions([]);
      setLoadingStatusText(undefined);
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
    
    // "다음 날로 진행" 같은 날짜 진행 명령인지 확인 (더 정확한 패턴 매칭)
    const dateProgressPatterns = [
      /다음\s*(날|일|날짜|하루)/,
      /(하루|날짜|일정)\s*(진행|넘기|건너뛰)/,
      /(진행|넘기|건너뛰)\s*(하루|날짜|일정)/,
    ];
    
    const isDateProgress = dateProgressPatterns.some(pattern => pattern.test(value));
    
    if (isDateProgress) {
      // 랜덤 이벤트 발생 체크
      if (Math.random() < RANDOM_EVENT_CHANCE) {
        const availableEvents = RANDOM_EVENTS;
        const randomIndex = Math.floor(Math.random() * availableEvents.length);
        const selectedEvent = { ...availableEvents[randomIndex] };
        setRandomEvent(selectedEvent);
        setIsRandomEventOpen(true);
        playSound('swoosh');
        // 이벤트 모달이 열려있으면 메시지 전송은 이벤트 처리 후에 하도록 지연
        // (이벤트 모달이 닫힐 때까지 대기하지 않고, 이벤트 발생만 표시)
        // 실제 날짜 진행은 AI가 처리하므로 메시지는 그대로 전송
      }
    }
    
    handleSend(value);
  };

  // 랜덤 이벤트 효과 적용
  const applyEventEffect = (effect: RandomEvent['effect']) => {
    setGameState((prev) => {
      const newState = { ...prev };
      
      if (effect.budget !== undefined && newState.budget !== null) {
        const oldBudget = newState.budget;
        newState.budget = Math.max(0, newState.budget + effect.budget);
        const change = newState.budget - oldBudget;
        
        // 자금 변동이 있으면 콘솔에 로그 (디버깅용)
        if (change !== 0) {
          console.log(`[랜덤 이벤트] 자금 변동: ${change > 0 ? '+' : ''}${(change / 100000000).toFixed(1)}억 원`);
        }
      }
      
      if (effect.morale !== undefined) {
        const oldMorale = newState.morale;
        newState.morale = Math.max(0, Math.min(100, newState.morale + effect.morale));
        const change = newState.morale - oldMorale;
        if (change !== 0) {
          console.log(`[랜덤 이벤트] 팀 사기 변동: ${change > 0 ? '+' : ''}${change}`);
        }
      }
      
      if (effect.fanLoyalty !== undefined) {
        const oldLoyalty = newState.fanLoyalty;
        newState.fanLoyalty = Math.max(0, Math.min(100, newState.fanLoyalty + effect.fanLoyalty));
        const change = newState.fanLoyalty - oldLoyalty;
        if (change !== 0) {
          console.log(`[랜덤 이벤트] 팬 충성도 변동: ${change > 0 ? '+' : ''}${change}`);
        }
      }
      
      // playerCondition은 추후 선수 시스템에 반영
      // if (effect.playerCondition !== undefined) { ... }
      
      return newState;
    });
  };

  // 랜덤 이벤트 선택 처리
  const handleEventChoice = (choiceIndex: number) => {
    if (randomEvent && randomEvent.choices && randomEvent.choices[choiceIndex]) {
      const selectedChoice = randomEvent.choices[choiceIndex];
      applyEventEffect(selectedChoice.effect);
    }
  };

  // 랜덤 이벤트 닫기
  const handleRandomEventClose = () => {
    if (randomEvent && !randomEvent.choices) {
      // 선택이 없는 이벤트는 바로 효과 적용
      applyEventEffect(randomEvent.effect);
    }
    setIsRandomEventOpen(false);
    setRandomEvent(null);
  };

  // 시설 업그레이드
  const handleFacilityUpgrade = (type: FacilityType) => {
    const facility = facilities[type];
    const definition = FACILITY_DEFINITIONS.find((f) => f.type === type);
    
    if (!definition) {
      console.error(`[시설 업그레이드] 정의를 찾을 수 없습니다: ${type}`);
      return;
    }
    
    if (facility.level >= definition.maxLevel) {
      console.warn(`[시설 업그레이드] 이미 최대 레벨입니다: ${type} (Lv.${facility.level})`);
      return;
    }
    
    const upgradeCost = definition.upgradeCost(facility.level);
    
    if (gameState.budget === null) {
      console.warn('[시설 업그레이드] 자금 정보가 없습니다.');
      return;
    }
    
    if (gameState.budget < upgradeCost) {
      console.warn(`[시설 업그레이드] 자금이 부족합니다. 필요: ${(upgradeCost / 100000000).toFixed(1)}억 원, 보유: ${(gameState.budget / 100000000).toFixed(1)}억 원`);
      return;
    }
    
    setGameState((prev) => ({
      ...prev,
      budget: prev.budget! - upgradeCost,
    }));
    
    setFacilities((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        level: prev[type].level + 1,
      },
    }));
    
    playSound('coin');
    console.log(`[시설 업그레이드] ${definition.name} Lv.${facility.level} → Lv.${facility.level + 1} (비용: ${(upgradeCost / 100000000).toFixed(1)}억 원)`);
  };

  // 저장/불러오기 기능 제거됨
  // const handleSave = () => { ... }
  // const handleLoad = () => { ... }

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

  // 옵션 모달 닫기 핸들러
  const handleOptionsModalClose = () => {
    setIsOptionsModalOpen(false);
    // 모달을 닫아도 옵션은 유지 (플로팅 버튼으로 다시 열 수 있음)
  };

  return (
    <div className="flex flex-col h-screen bg-[#Fdfbf7]">
      {/* 헤더 - 상태바 */}
      <GameHeader 
        teamName={selectedTeam.fullName}
        budget={gameState.budget}
        date={gameState.date}
        season="2026 시즌"
        onApiKeyClick={onResetApiKey}
        onFacilityClick={() => setIsFacilityOpen(true)}
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
          {/* 스트리밍 중에는 텍스트를 표시하지 않음 (로딩 오버레이만 표시) */}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 푸터 - 입력 영역 */}
      <div className="border-t-2 border-baseball-green/20 bg-gradient-to-b from-gray-50 to-white shadow-2xl">
        {/* 선택지 버튼 패널 제거됨 - 모달로 대체 */}

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit} className="p-4">
          <div className="flex gap-3 max-w-5xl mx-auto">
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="명령을 입력하세요..."
              className="flex-1 px-5 py-3 border-2 border-baseball-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-baseball-green/50 focus:border-baseball-green disabled:bg-gray-100 font-sans shadow-sm focus:shadow-md transition-all"
              disabled={isLoading}
            />
            <motion.button
              type="submit"
              disabled={isLoading || !input.trim()}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-7 py-3 bg-gradient-to-r from-baseball-green to-[#0a3528] hover:from-baseball-green-dark hover:to-[#08251f] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl active:shadow-md border-b-2 border-baseball-green-dark/50"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </form>
      </div>

      {/* 로딩 오버레이 (자동 진행 바 포함) */}
      <LoadingOverlay 
        isLoading={isLoading}
        statusText={loadingStatusText}
      />

      {/* 선택지 모달 */}
      <OptionsModal
        isOpen={isOptionsModalOpen}
        options={pendingOptions}
        onSelect={(value) => {
          handleOptionClick(value);
          setIsOptionsModalOpen(false);
          setPendingOptions([]); // 선택 후 옵션 초기화
        }}
        onClose={handleOptionsModalClose}
      />

      {/* 작전 지시 플로팅 버튼 (트리거 방식) */}
      {!isOptionsModalOpen && !isLoading && pendingOptions.length > 0 && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
          }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOptionsModalOpen(true)}
          className="fixed bottom-24 right-4 sm:right-6 z-40 bg-gradient-to-r from-baseball-green to-[#0a3528] text-white px-4 sm:px-5 py-3 sm:py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all border-2 border-baseball-gold/30 flex items-center justify-center gap-2 group"
          title="작전 지시 확인"
        >
          {/* 펄스 애니메이션 링 */}
          <motion.div
            className="absolute inset-0 rounded-full bg-baseball-green/30"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* 버튼 내용 */}
          <motion.span
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-lg sm:text-xl relative z-10"
          >
            📋
          </motion.span>
          <span className="text-xs sm:text-sm font-bold hidden sm:inline whitespace-nowrap relative z-10">
            작전 지시
          </span>
          
          {/* 알림 뱃지 (선택지 개수) */}
          {pendingOptions.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-baseball-gold text-baseball-green text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-lg relative z-10"
            >
              {pendingOptions.length}
            </motion.span>
          )}
        </motion.button>
      )}

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

      {/* 뉴스 사이드바 제거됨 */}

      {/* 랜덤 이벤트 모달 */}
      <RandomEventModal
        event={randomEvent}
        isOpen={isRandomEventOpen}
        onClose={handleRandomEventClose}
        onChoiceSelect={handleEventChoice}
      />

      {/* 시설 관리 모달 */}
      <FacilityManagement
        isOpen={isFacilityOpen}
        onClose={() => setIsFacilityOpen(false)}
        facilities={facilities}
        budget={gameState.budget}
        onUpgrade={handleFacilityUpgrade}
      />

    </div>
  );
}
