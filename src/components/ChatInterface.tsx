import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Building2, Newspaper, ClipboardList } from 'lucide-react';
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
import NewsSidebar, { NewsItem } from './NewsSidebar';
import SettingsModal from './SettingsModal';
import { parseAIResponse, extractDate, extractBudget, extractTeamName, GamePhase, GUIEvent, RandomEvent, FacilityType, FacilityState, StatusInfo } from '../lib/utils';
import { filterProtectedPlayers, validateDraftPicks, updatePlayerTeamAffiliation, sortDraftOrder, createDraftPool, DraftPlayer, ProtectedPlayer, TeamRank } from '../lib/draftUtils';
import { Team } from '../constants/TeamData';
import { useSound } from '../hooks/useSound';
import { RANDOM_EVENTS, RANDOM_EVENT_CHANCE } from '../constants/GameEvents';
import { createInitialFacilityState, FACILITY_DEFINITIONS } from '../constants/Facilities';
import { Difficulty, GAME_CONFIG, applyIncomeMultiplier } from '../constants/GameConfig';

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatInterfaceProps {
  apiKey: string;
  selectedTeam: Team;
  difficulty: Difficulty;
  expansionTeamData?: { city: string; teamName: string; ownerType: 'A' | 'B' | 'C' | 'D' } | null;
  onResetApiKey?: () => void;
  shouldLoadGame?: boolean;
  onGameLoaded?: () => void;
}

const SAVE_KEY = 'baseball_game_save';

export default function ChatInterface({ apiKey, selectedTeam, difficulty, expansionTeamData, onResetApiKey, shouldLoadGame = false, onGameLoaded }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentOptions, setCurrentOptions] = useState<Array<{ label: string; value: string; style?: 'primary' | 'secondary' | 'danger' }>>([]);
  const [gameState, setGameState] = useState<{ 
    date: string | null; 
    budget: number | null;
    morale: number; // 팀 사기 (0 ~ 100)
    fanLoyalty: number; // 팬 충성도 (0 ~ 100)
    difficulty: Difficulty; // 난이도
    salaryCapUsage?: number; // 샐러리캡 소진율 (0.0 ~ 100.0)
    teamName?: string; // 구단 이름 (신생 구단 창단 시 사용)
  }>({
    date: null,
    budget: null, // 초기값은 null (0이 아닌 null로 명확히 구분)
    morale: 50, // 초기값 50
    fanLoyalty: 50, // 초기값 50
    difficulty: difficulty, // 난이도 저장
    salaryCapUsage: undefined, // 초기값 없음
    teamName: undefined, // 초기값 없음
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
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [pendingOptions, setPendingOptions] = useState<Array<{ label: string; value: string; style?: 'primary' | 'secondary' | 'danger' }>>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const [readNewsCount, setReadNewsCount] = useState(0); // 읽은 뉴스 개수 추적
  const [hasCheckedLoadGame, setHasCheckedLoadGame] = useState(false); // 불러오기 시 옵션 체크 플래그
  const isLoadProcessingRef = useRef(false); // 불러오기 중복 방지 플래그
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInstanceRef = useRef<any>(null);
  const modelRef = useRef<any>(null);
  const messagesRef = useRef<Message[]>([]);
  const isLoadingRef = useRef(false);
  const handleSendRef = useRef<((messageText: string) => Promise<void>) | null>(null);
  const { playSound } = useSound();

  // handleSend 함수를 최상단으로 이동 (TDZ 문제 해결)
  const handleSend = useCallback(async (messageText: string) => {
    if (!messageText.trim() || isLoadingRef.current) return;

    playSound('click');
    const userMessage = messageText.trim();
    setInput('');
    
    // 신생 구단인 경우 구단 이름은 expansionTeamData에서 받은 값으로 고정 (절대 변경하지 않음)
    // AI 응답이나 사용자 메시지에서 구단명을 추출해도 업데이트하지 않음
    
    // 사용자 메시지를 먼저 추가
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);
    
    // 로딩 시작 (임시 말풍선은 추가하지 않음)
    setIsLoading(true);
    setCurrentOptions([]);
    setLoadingStatusText(undefined);
    setIsOptionsModalOpen(false);

    try {
      if (!modelRef.current) {
        throw new Error('모델이 초기화되지 않았습니다.');
      }

      // 채팅 인스턴스가 없으면 새로 생성
      // messagesRef를 사용하여 최신 메시지 목록 참조 (방금 추가한 사용자 메시지 포함)
      if (!chatInstanceRef.current) {
        // 사용자 메시지를 제외한 히스토리 생성 (방금 추가한 메시지 제외)
        const currentMessages = [...messagesRef.current, { text: userMessage, isUser: true }];
        const history = currentMessages.length > 1 
          ? currentMessages.slice(0, -1).map(msg => ({
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
          
          // STATUS 태그 처리 (헤더 업데이트)
          if (parsed.status) {
            if (parsed.status.date) {
              setGameState(prev => ({ ...prev, date: parsed.status!.date! }));
            }
            if (parsed.status.budget) {
              // "50억 원" 또는 "-30.0억 원" 형식에서 숫자 추출 (마이너스 값도 처리)
              const budgetMatch = parsed.status.budget.match(/(-?[0-9,.]+)\s*억/i);
              if (budgetMatch) {
                const amount = parseFloat(budgetMatch[1].replace(/,/g, ''));
                if (!isNaN(amount)) {
                  // 마이너스 값도 허용 (부채 상태)
                  setGameState(prev => ({ ...prev, budget: Math.floor(amount * 100000000) }));
                }
              }
            }
            if (parsed.status.salaryCapUsage !== undefined) {
              setGameState(prev => ({ ...prev, salaryCapUsage: parsed.status!.salaryCapUsage }));
            }
          }
          
          // NEWS 태그 처리 (뉴스 사이드바에 추가)
          if (parsed.news && parsed.news.length > 0) {
            setNewsItems(prev => [...prev, ...parsed.news!]);
          }
          
          // 옵션이 있으면 플로팅 버튼만 표시 (모달은 즉시 띄우지 않음)
          if (parsed.options.length > 0) {
            // 난이도 선택 및 지시사항 관련 옵션 필터링
            const filteredOptions = parsed.options.filter(opt => {
              const label = opt.label.toLowerCase();
              const value = opt.value.toLowerCase();
              return !(
                // 난이도 선택 관련 필터링
                label.includes('이지 모드') || label.includes('하드 모드') ||
                label.includes('easy mode') || label.includes('hard mode') ||
                label.includes('난이도') || label.includes('difficulty') ||
                value.includes('이지 모드') || value.includes('하드 모드') ||
                value.includes('easy') || value.includes('hard') ||
                value.includes('난이도') ||
                // 지시사항/가이드 관련 필터링
                label.includes('지시사항') || label.includes('가이드') ||
                label.includes('guide') || label.includes('instruction') ||
                value.includes('지시사항') || value.includes('가이드') ||
                value.includes('guide') || value.includes('instruction')
              );
            });
            
            if (filteredOptions.length > 0) {
              setPendingOptions(filteredOptions);
              setCurrentOptions(filteredOptions);
            } else {
              // 필터링 후 옵션이 없으면 빈 배열로 설정 (일정 진행 버튼만 표시)
              setPendingOptions([]);
              setCurrentOptions([]);
            }
            // 모달은 즉시 띄우지 않고, 플로팅 버튼만 표시
            setIsOptionsModalOpen(false);
          } else {
            // 옵션이 없으면 빈 배열로 설정 (일정 진행 버튼만 표시)
            setPendingOptions([]);
            setCurrentOptions([]);
          }
          
          // GUI 이벤트 처리 (RECRUIT 타입 포함)
          // 선수 목록 모달은 표시하지 않고 채팅으로만 처리
          if (parsed.guiEvent) {
            console.log('[GUI_EVENT] 수신:', parsed.guiEvent);
            
            // [FIX] 드래프트 로직 검증 및 수정
            if (parsed.guiEvent.type === 'DRAFT') {
              try {
                const draftData = parsed.guiEvent.data || parsed.guiEvent.candidates || [];
                const protectedList = parsed.guiEvent.protectedPlayers || [];
                const teamRanks = parsed.guiEvent.teamRanks || [];
                
                // [FIX] 1. 보호선수 필터링 적용
                if (Array.isArray(draftData) && Array.isArray(protectedList)) {
                  const filteredPool = filterProtectedPlayers(
                    draftData as DraftPlayer[],
                    protectedList as ProtectedPlayer[]
                  );
                  
                  // 필터링된 풀을 GUI_EVENT에 반영
                  if (filteredPool.length !== draftData.length) {
                    console.warn(
                      `[DraftService] 보호선수 필터링: ${draftData.length}명 → ${filteredPool.length}명`
                    );
                    parsed.guiEvent.candidates = filteredPool;
                    parsed.guiEvent.data = { ...parsed.guiEvent.data, candidates: filteredPool };
                  }
                }
                
                // [FIX] 2. 드래프트 순번 정렬 검증
                if (Array.isArray(teamRanks) && teamRanks.length > 0) {
                  const sortedOrder = sortDraftOrder(teamRanks as TeamRank[]);
                  parsed.guiEvent.teamRanks = sortedOrder;
                  parsed.guiEvent.data = { ...parsed.guiEvent.data, draftOrder: sortedOrder };
                }
                
                // [FIX] 3. 지명 검증 (사용자가 선택한 경우)
                if (parsed.guiEvent.picks && Array.isArray(parsed.guiEvent.picks)) {
                  const validatedPicks = validateDraftPicks(
                    parsed.guiEvent.picks,
                    (parsed.guiEvent.candidates || parsed.guiEvent.data?.candidates || []) as DraftPlayer[],
                    10 // maxPicks
                  );
                  
                  if (validatedPicks.length !== parsed.guiEvent.picks.length) {
                    console.warn(
                      `[DraftService] 지명 검증: ${parsed.guiEvent.picks.length}명 → ${validatedPicks.length}명`
                    );
                  }
                  
                  // [FIX] 4. 소속 팀 갱신
                  if (selectedTeam?.id) {
                    const updatedPicks = updatePlayerTeamAffiliation(validatedPicks, selectedTeam.id);
                    parsed.guiEvent.picks = updatedPicks;
                    parsed.guiEvent.data = { ...parsed.guiEvent.data, picks: updatedPicks };
                  }
                }
              } catch (draftError) {
                console.error('[DraftService] 드래프트 검증 오류:', draftError);
                // 오류가 발생해도 게임 진행은 계속
              }
            }
            
            setGuiEvent(parsed.guiEvent);
            // 모달을 표시하지 않고 채팅으로만 표시
            playSound('success');
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
              // 난이도 선택 및 지시사항 관련 옵션 필터링
              const filteredOptions = parsed.options.filter(opt => {
                const label = opt.label.toLowerCase();
                const value = opt.value.toLowerCase();
                return !(
                  // 난이도 선택 관련 필터링
                  label.includes('이지 모드') || label.includes('하드 모드') ||
                  label.includes('easy mode') || label.includes('hard mode') ||
                  label.includes('난이도') || label.includes('difficulty') ||
                  value.includes('이지 모드') || value.includes('하드 모드') ||
                  value.includes('easy') || value.includes('hard') ||
                  value.includes('난이도') ||
                  // 지시사항/가이드 관련 필터링
                  label.includes('지시사항') || label.includes('가이드') ||
                  label.includes('guide') || label.includes('instruction') ||
                  value.includes('지시사항') || value.includes('가이드') ||
                  value.includes('guide') || value.includes('instruction')
                );
              });
              
              if (filteredOptions.length > 0) {
                setPendingOptions(filteredOptions);
                setCurrentOptions(filteredOptions);
              } else {
                // 필터링 후 옵션이 없으면 빈 배열로 설정 (일정 진행 버튼만 표시)
                setPendingOptions([]);
                setCurrentOptions([]);
              }
              setIsOptionsModalOpen(false);
            } else {
              // 옵션이 없으면 빈 배열로 설정 (일정 진행 버튼만 표시)
              setPendingOptions([]);
              setCurrentOptions([]);
            }
            
            // GUI 이벤트 처리
            // 선수 목록 모달은 표시하지 않고 채팅으로만 처리
            if (parsed.guiEvent) {
              console.log('[GUI_EVENT] 수신:', parsed.guiEvent);
              
              // [FIX] 드래프트 로직 검증 및 수정 (동일한 로직 적용)
              if (parsed.guiEvent.type === 'DRAFT') {
                try {
                  const draftData = parsed.guiEvent.data || parsed.guiEvent.candidates || [];
                  const protectedList = parsed.guiEvent.protectedPlayers || [];
                  const teamRanks = parsed.guiEvent.teamRanks || [];
                  
                  // [FIX] 1. 보호선수 필터링 적용
                  if (Array.isArray(draftData) && Array.isArray(protectedList)) {
                    const filteredPool = filterProtectedPlayers(
                      draftData as DraftPlayer[],
                      protectedList as ProtectedPlayer[]
                    );
                    
                    if (filteredPool.length !== draftData.length) {
                      console.warn(
                        `[DraftService] 보호선수 필터링: ${draftData.length}명 → ${filteredPool.length}명`
                      );
                      parsed.guiEvent.candidates = filteredPool;
                      parsed.guiEvent.data = { ...parsed.guiEvent.data, candidates: filteredPool };
                    }
                  }
                  
                  // [FIX] 2. 드래프트 순번 정렬 검증
                  if (Array.isArray(teamRanks) && teamRanks.length > 0) {
                    const sortedOrder = sortDraftOrder(teamRanks as TeamRank[]);
                    parsed.guiEvent.teamRanks = sortedOrder;
                    parsed.guiEvent.data = { ...parsed.guiEvent.data, draftOrder: sortedOrder };
                  }
                  
                  // [FIX] 3. 지명 검증
                  if (parsed.guiEvent.picks && Array.isArray(parsed.guiEvent.picks)) {
                    const validatedPicks = validateDraftPicks(
                      parsed.guiEvent.picks,
                      (parsed.guiEvent.candidates || parsed.guiEvent.data?.candidates || []) as DraftPlayer[],
                      10
                    );
                    
                    // [FIX] 4. 소속 팀 갱신
                    if (selectedTeam?.id) {
                      const updatedPicks = updatePlayerTeamAffiliation(validatedPicks, selectedTeam.id);
                      parsed.guiEvent.picks = updatedPicks;
                      parsed.guiEvent.data = { ...parsed.guiEvent.data, picks: updatedPicks };
                    }
                  }
                } catch (draftError) {
                  console.error('[DraftService] 드래프트 검증 오류:', draftError);
                }
              }
              
              setGuiEvent(parsed.guiEvent);
              // 모달을 표시하지 않고 채팅으로만 표시
            }
          } else {
            throw streamError;
          }
        } catch {
          throw streamError;
        }
      } finally {
        setLoadingStatusText(undefined);
        setIsLoading(false);
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
      setCurrentOptions([]);
      setPendingOptions([]);
      setLoadingStatusText(undefined);
    } finally {
      // 로딩 종료
      setIsLoading(false);
    }
  }, [playSound]);

  // handleSend ref 업데이트 (의존성 배열에서 제거하기 위해)
  useEffect(() => {
    handleSendRef.current = handleSend;
  }, [handleSend]);
  
  // shouldLoadGame이 변경되면 체크 플래그 리셋
  useEffect(() => {
    if (!shouldLoadGame) {
      setHasCheckedLoadGame(false);
    }
  }, [shouldLoadGame]);

  useEffect(() => {
    if (apiKey) {
      (async () => {
        modelRef.current = await getGeminiModel(apiKey);
        chatInstanceRef.current = null;
        setIsModelReady(true);
        
        // 불러오기 요청이 있으면 게임 상태 복원
        if (shouldLoadGame) {
          const savedData = localStorage.getItem(SAVE_KEY);
          if (savedData) {
            try {
              const parsed = JSON.parse(savedData);
              if (parsed.messages && Array.isArray(parsed.messages) && parsed.messages.length > 0) {
                // 메시지 복원
                setMessages(parsed.messages);
                messagesRef.current = parsed.messages;
                
                // 게임 상태 복원
                if (parsed.gameState) {
                  // 난이도 복원 (기존 저장 데이터 호환성)
                  const restoredGameState = {
                    ...parsed.gameState,
                    difficulty: parsed.gameState.difficulty || difficulty, // 저장된 난이도가 없으면 현재 난이도 사용
                    // teamName이 빈 문자열이거나 유효하지 않으면 undefined로 설정
                    teamName: parsed.gameState.teamName && parsed.gameState.teamName.trim() !== '' 
                      ? parsed.gameState.teamName 
                      : undefined,
                  };
                  setGameState(restoredGameState);
                }
                if (parsed.facilities) {
                  setFacilities(parsed.facilities);
                }
                if (parsed.newsItems) {
                  setNewsItems(parsed.newsItems);
                }
                if (parsed.readNewsCount !== undefined) {
                  setReadNewsCount(parsed.readNewsCount);
                }
                
                // 모델에 메시지 히스토리 복원 (API 연결 유지)
                if (modelRef.current && parsed.messages.length > 0) {
                  const history = parsed.messages.map((msg: Message) => ({
                    role: msg.isUser ? 'user' : 'model',
                    parts: [{ text: msg.text }],
                  }));
                  
                  chatInstanceRef.current = modelRef.current.startChat({
                    history: history,
                  });
                  
                  // **지시사항 버튼 복원**: 저장된 옵션이 있으면 필터링하여 복원
                  if (parsed.pendingOptions && Array.isArray(parsed.pendingOptions) && parsed.pendingOptions.length > 0) {
                    // 난이도 선택 및 지시사항 관련 옵션 필터링
                    const filteredOptions = parsed.pendingOptions.filter(opt => {
                      const label = opt.label.toLowerCase();
                      const value = opt.value.toLowerCase();
                      return !(
                        // 난이도 선택 관련 필터링
                        label.includes('이지 모드') || label.includes('하드 모드') ||
                        label.includes('easy mode') || label.includes('hard mode') ||
                        label.includes('난이도') || label.includes('difficulty') ||
                        value.includes('이지 모드') || value.includes('하드 모드') ||
                        value.includes('easy') || value.includes('hard') ||
                        value.includes('난이도') ||
                        // 지시사항/가이드 관련 필터링
                        label.includes('지시사항') || label.includes('가이드') ||
                        label.includes('guide') || label.includes('instruction') ||
                        value.includes('지시사항') || value.includes('가이드') ||
                        value.includes('guide') || value.includes('instruction')
                      );
                    });
                    
                    if (filteredOptions.length > 0) {
                      setPendingOptions(filteredOptions);
                      setCurrentOptions(filteredOptions);
                    } else {
                      // 필터링 후 옵션이 없으면 빈 배열로 설정 (일정 진행 버튼만 표시)
                      setPendingOptions([]);
                      setCurrentOptions([]);
                    }
                  } else {
                    // 저장된 옵션이 없으면 마지막 AI 메시지에서 옵션 파싱
                    const aiMessages = parsed.messages.filter((m: Message) => !m.isUser);
                    if (aiMessages.length > 0) {
                      const lastAIMessage = aiMessages[aiMessages.length - 1];
                      const parsedResponse = parseAIResponse(lastAIMessage.text);
                      if (parsedResponse.options.length > 0) {
                        // 난이도 선택 및 지시사항 관련 옵션 필터링
                        const filteredOptions = parsedResponse.options.filter(opt => {
                          const label = opt.label.toLowerCase();
                          const value = opt.value.toLowerCase();
                          return !(
                            // 난이도 선택 관련 필터링
                            label.includes('이지 모드') || label.includes('하드 모드') ||
                            label.includes('easy mode') || label.includes('hard mode') ||
                            label.includes('난이도') || label.includes('difficulty') ||
                            value.includes('이지 모드') || value.includes('하드 모드') ||
                            value.includes('easy') || value.includes('hard') ||
                            value.includes('난이도') ||
                            // 지시사항/가이드 관련 필터링
                            label.includes('지시사항') || label.includes('가이드') ||
                            label.includes('guide') || label.includes('instruction') ||
                            value.includes('지시사항') || value.includes('가이드') ||
                            value.includes('guide') || value.includes('instruction')
                          );
                        });
                        
                        if (filteredOptions.length > 0) {
                          setPendingOptions(filteredOptions);
                          setCurrentOptions(filteredOptions);
                        } else {
                          // 필터링 후 옵션이 없으면 빈 배열로 설정 (일정 진행 버튼만 표시)
                          setPendingOptions([]);
                          setCurrentOptions([]);
                        }
                      } else {
                        // 옵션이 없으면 빈 배열로 설정 (일정 진행 버튼만 표시)
                        setPendingOptions([]);
                        setCurrentOptions([]);
                      }
                    } else {
                      // AI 메시지가 없으면 빈 배열로 설정 (일정 진행 버튼만 표시)
                      setPendingOptions([]);
                      setCurrentOptions([]);
                    }
                  }
                }
                
                if (onGameLoaded) {
                  onGameLoaded();
                }
              }
            } catch (e) {
              console.error('불러오기 오류:', e);
            }
          }
        }
      })();
    } else {
      setIsModelReady(false);
    }
  }, [apiKey, shouldLoadGame, onGameLoaded]);

  // 게임 시작 시 팀 정보 전송 (모델 초기화 후, 저장된 데이터가 없을 때만)
  // 불러오기 시에도 마지막 메시지에 옵션이 없으면 초기 메시지 전송 (지시사항 버튼 표시를 위해)
  const pendingOptionsRef = useRef<Array<{ label: string; value: string }>>([]);
  useEffect(() => {
    pendingOptionsRef.current = pendingOptions;
  }, [pendingOptions]);

  useEffect(() => {
    const savedData = localStorage.getItem(SAVE_KEY);
    const hasSavedData = savedData && JSON.parse(savedData).messages?.length > 0;
    
    // 새 게임 시작 시: 저장된 데이터가 없으면 초기 메시지 전송
    if (selectedTeam && messages.length === 0 && isModelReady && modelRef.current && !hasSavedData) {
      // 옵션 초기화 (일정 진행 버튼만 표시되도록) - 함수형 업데이트로 중복 방지
      setPendingOptions(prev => prev.length === 0 ? prev : []);
      setCurrentOptions(prev => prev.length === 0 ? prev : []);
      
      // 신생 구단인 경우 특별 처리
      // 프롬프트의 Step 2에 따라 난이도를 명시적으로 전달
      const difficultyMode = difficulty === 'EASY' ? '이지 모드' : difficulty === 'NORMAL' ? '노말 모드' : '헬 모드';
      const difficultyCode = difficulty; // EASY, NORMAL, HELL
      
      // 난이도별 초기 자금 및 샐러리캡 정보를 명시적으로 전달 (AI가 변경하지 못하도록)
      const difficultyConfig = difficulty === 'EASY' 
        ? '초기 자금: 80.0억 원, 샐러리캡: 250억 원'
        : difficulty === 'NORMAL'
        ? '초기 자금: 30.0억 원, 샐러리캡: 137억 원'
        : '초기 자금: 10.0억 원, 샐러리캡: 100억 원';
      
      let teamMessage: string;
      if (selectedTeam.id === 'expansion') {
        // 프롬프트 Step 2-1: 신생 구단 창단 절차 시작
        const ownerTypeName = expansionTeamData?.ownerType === 'A' 
          ? 'A유형: 성적 지상주의 (Win-Now)'
          : expansionTeamData?.ownerType === 'B'
          ? 'B유형: 비즈니스맨 (Profit-First)'
          : expansionTeamData?.ownerType === 'C'
          ? 'C유형: 시스템/재건 (Rebuilder)'
          : 'D유형: 의리의 대부 (The Godfather)';
        
        teamMessage = `✨ 신생 구단 창단 (11구단)을 선택했습니다. 

**[구단 정보]**
연고지: ${expansionTeamData?.city || '미정'}
구단명: ${expansionTeamData?.teamName || '미정'}
구단주 유형: ${ownerTypeName}

**[난이도 설정 - 절대 변경 금지]**
난이도: ${difficultyMode} (${difficultyCode})
${difficultyConfig}

이 난이도는 게임 진행 중 절대로 변경할 수 없습니다. 위 설정값을 정확히 적용하여 신생 구단 창단 프로세스를 시작해주세요.`;
      } else {
        // 프롬프트 Step 2: 구단 선택 완료, Step 3으로 진행
        teamMessage = `${selectedTeam.fullName}을 선택했습니다. 

**[난이도 설정 - 절대 변경 금지]**
난이도: ${difficultyMode} (${difficultyCode})
${difficultyConfig}

이 난이도는 게임 진행 중 절대로 변경할 수 없습니다. 위 설정값을 정확히 적용하여 Step 3: 데이터 초기화 및 게임을 시작해주세요.`;
      }
      // 약간의 지연을 두어 모든 초기화가 완료되도록 함
      const timer = setTimeout(() => {
        if (handleSendRef.current) {
          handleSendRef.current(teamMessage);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
    
    // 불러오기 시: 저장된 메시지가 복원된 후, 마지막 AI 응답에 옵션이 없으면 초기 메시지 전송
    // 한 번만 체크하도록 hasCheckedLoadGame 플래그 사용
    // handleLoad에서 이미 pendingOptions를 복원했으므로, 여기서는 옵션이 없을 때만 처리
    if (selectedTeam && shouldLoadGame && messages.length > 0 && isModelReady && modelRef.current && !hasCheckedLoadGame) {
      // handleLoad에서 pendingOptions를 복원했으므로, 여기서는 옵션이 없는 경우만 처리
      // 약간의 지연을 두어 handleLoad의 상태 업데이트가 완료되도록 함
      const checkTimer = setTimeout(() => {
        // 마지막 AI 메시지 확인
        const aiMessages = messages.filter(m => !m.isUser);
        if (aiMessages.length > 0) {
          const lastAIMessage = aiMessages[aiMessages.length - 1];
          const parsed = parseAIResponse(lastAIMessage.text);
          
          // 마지막 메시지에 옵션이 없고, pendingOptions도 없으면 초기 메시지 전송 (지시사항 버튼 표시를 위해)
          // ref를 사용하여 pendingOptions.length 체크 (의존성 배열에서 제거)
          if (parsed.options.length === 0 && pendingOptionsRef.current.length === 0) {
            setHasCheckedLoadGame(true);
            const teamMessage = `${selectedTeam.fullName}을 선택했습니다. 게임을 시작해주세요.`;
            // 약간의 지연을 두어 모든 초기화가 완료되도록 함
            setTimeout(() => {
              if (handleSendRef.current) {
                handleSendRef.current(teamMessage);
              }
            }, 500);
          } else if (pendingOptionsRef.current.length > 0) {
            // 옵션이 있으면 체크 완료로 표시 (지시사항 버튼이 이미 표시됨)
            setHasCheckedLoadGame(true);
          }
        } else {
          // AI 메시지가 없으면 초기 메시지 전송
          setHasCheckedLoadGame(true);
          const teamMessage = `${selectedTeam.fullName}을 선택했습니다. 게임을 시작해주세요.`;
          setTimeout(() => {
            if (handleSendRef.current) {
              handleSendRef.current(teamMessage);
            }
          }, 500);
        }
      }, 1000); // handleLoad의 상태 업데이트 완료 대기
      
      return () => clearTimeout(checkTimer);
    }
  }, [selectedTeam, isModelReady, messages.length, shouldLoadGame, hasCheckedLoadGame, difficulty]);

  useEffect(() => {
    messagesRef.current = messages;
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 메시지 변경 시 헤더 정보 업데이트
  useEffect(() => {
    // 마지막 AI 메시지에서 날짜와 자금 정보 추출
    const aiMessages = messages.filter(m => !m.isUser);
    if (aiMessages.length > 0) {
      const lastAIMessage = aiMessages[aiMessages.length - 1];
      const parsed = parseAIResponse(lastAIMessage.text);
      
      // 날짜 추출 (STATUS 태그 우선, 없으면 텍스트에서 추출)
      if (parsed.status?.date) {
        setGameState(prev => ({ ...prev, date: parsed.status!.date! }));
      } else {
        const extractedDate = extractDate(parsed.text);
        if (extractedDate) {
          setGameState(prev => ({ ...prev, date: extractedDate }));
        }
      }
      
      // 자금 추출 (STATUS 태그 우선, 없으면 텍스트에서 추출)
      let extractedBudget: number | null = null;
      
      // 1순위: STATUS 태그에서 자금 추출
      if (parsed.status?.budgetValue) {
        extractedBudget = parsed.status.budgetValue;
        console.log('[자금 파싱] ✅ STATUS 태그에서 자금 추출:', extractedBudget.toLocaleString('ko-KR') + '원');
      } else {
        // 2순위: 텍스트에서 자금 추출
        extractedBudget = extractBudget(parsed.text);
        console.log('[자금 파싱] 텍스트에서 자금 추출:', extractedBudget);
      }
      
      if (extractedBudget !== null && extractedBudget > 0) { // 0보다 큰 값만 업데이트
        console.log('[자금 파싱] ✅ 자금 업데이트:', extractedBudget.toLocaleString('ko-KR') + '원');
        setGameState(prev => ({ ...prev, budget: extractedBudget }));
      } else {
        console.log('[자금 파싱] ❌ 자금 추출 실패 또는 0원');
      }
      
      // 신생 구단인 경우 구단명은 expansionTeamData에서 받은 값으로 고정 (절대 변경하지 않음)
      // AI 응답이나 사용자 메시지에서 구단명을 추출해도 업데이트하지 않음
    }
  }, [messages, selectedTeam.id]);
  
  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  }, [handleSend, input]);

  const handleOptionClick = useCallback((value: string) => {
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
  }, [handleSend, playSound]);

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

  // [FIX] 시설 업그레이드 - FacilityService 사용
  const handleFacilityUpgrade = (type: FacilityType) => {
    const facility = facilities[type];
    
    // [FIX] FacilityService를 사용하여 업그레이드 처리
    import('../services/FacilityService').then(({ getFacilityService }) => {
      const facilityService = getFacilityService();
      
      const result = facilityService.upgradeFacility(
        type,
        facility.level,
        gameState.budget,
        (newBudget) => {
          // [FIX] 실제 유저 자금(Budget) 상태 업데이트 - UI에 즉시 반영
          setGameState((prev) => ({
            ...prev,
            budget: newBudget,
          }));
        }
      );

      if (result.success) {
        // [FIX] 시설 레벨 업데이트
        setFacilities((prev) => ({
          ...prev,
          [type]: {
            ...prev[type],
            level: result.newLevel,
          },
        }));
        
        playSound('coin');
      } else {
        console.warn(`[시설 업그레이드] 실패: ${result.error}`);
        if (result.error) {
          alert(result.error);
        }
      }
    });
  };

  // [NEW] 게임 데이터 추출 (공통 함수)
  const getSaveData = useCallback(() => {
    return {
      messages: messagesRef.current,
      gameState,
      facilities,
      newsItems,
      readNewsCount,
      selectedTeam: selectedTeam,
      pendingOptions: pendingOptions,
      difficulty: difficulty,
      timestamp: new Date().toISOString(),
      metadata: {
        lastModified: Date.now(),
      },
    };
  }, [gameState, facilities, newsItems, readNewsCount, selectedTeam, pendingOptions, difficulty]);

  // [NEW] 파일로 저장 (백업)
  const handleSaveToFile = useCallback(async () => {
    try {
      const saveData = getSaveData();
      
      const { FileStorageStrategy } = await import('../services/FileStorageStrategy');
      FileStorageStrategy.exportSaveFile(saveData);
      
      playSound('success');
      alert('파일이 다운로드되었습니다!\n\n파일을 Google Drive, Dropbox 등에 업로드하면 다른 기기에서 사용할 수 있습니다.');
    } catch (e) {
      console.error('파일 저장 오류:', e);
      alert('파일 저장에 실패했습니다.');
    }
  }, [getSaveData, playSound]);

  // [NEW] 파일에서 불러오기
  const handleLoadFromFile = useCallback(async () => {
    try {
      const { FileStorageStrategy } = await import('../services/FileStorageStrategy');
      const input = FileStorageStrategy.createFileUploadInput(
        (data) => {
          try {
            // [NEW] 필수 데이터 검증
            if (!data || typeof data !== 'object') {
              alert('저장 데이터가 올바른 형식이 아닙니다.\n\n올바른 세이브 파일을 선택해주세요.');
              return;
            }
            
            // [NEW] 메시지 데이터 검증
            if (!data.messages || !Array.isArray(data.messages)) {
              alert('저장 데이터에 메시지 정보가 없습니다.\n\n게임을 불러올 수 없습니다.');
              return;
            }
            
            if (data.messages.length === 0) {
              alert('저장 데이터에 게임 진행 정보가 없습니다.\n\n새 게임을 시작해주세요.');
              return;
            }
            
            // [NEW] 게임 상태 검증
            if (!data.gameState || typeof data.gameState !== 'object') {
              alert('저장 데이터에 게임 상태 정보가 없습니다.\n\n게임을 불러올 수 없습니다.');
              return;
            }
            
            // [NEW] 데이터 복원
            setMessages(data.messages);
            messagesRef.current = data.messages;
            
            if (data.gameState) {
              setGameState({
                ...data.gameState,
                difficulty: data.gameState.difficulty || difficulty,
              });
            }
            if (data.facilities) {
              setFacilities(data.facilities);
            }
            if (data.newsItems) {
              setNewsItems(data.newsItems);
            }
            if (data.readNewsCount !== undefined) {
              setReadNewsCount(data.readNewsCount);
            }
            if (data.pendingOptions) {
              setPendingOptions(data.pendingOptions);
            }
            
            playSound('success');
            alert('게임이 불러와졌습니다!');
          } catch (validationError) {
            console.error('[ChatInterface] 데이터 검증 오류:', validationError);
            const errorMessage = validationError instanceof Error ? validationError.message : '알 수 없는 오류';
            alert(`게임 데이터 검증에 실패했습니다.\n\n오류: ${errorMessage}`);
          }
        },
        (error) => {
          console.error('[ChatInterface] 파일 불러오기 오류:', error);
          const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
          alert(`파일을 불러오는데 실패했습니다.\n\n오류: ${errorMessage}\n\n올바른 세이브 파일인지 확인해주세요.`);
        }
      );
      
      input.click();
    } catch (error) {
      console.error('[ChatInterface] 파일 선택 오류:', error);
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
      alert(`파일 선택에 실패했습니다.\n\n오류: ${errorMessage}`);
    }
  }, [difficulty, playSound]);

  // 로컬 저장 기능
  const handleLocalSave = useCallback(() => {
    try {
      const saveData = getSaveData();
      
      // [NEW] 로컬 저장소에 저장
      localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
      
      playSound('success');
      alert('게임이 저장되었습니다!');
    } catch (e) {
      console.error('저장 오류:', e);
      alert('저장에 실패했습니다.');
    }
  }, [getSaveData, playSound]);

  // 저장 기능 (기존 호환성 유지)
  const handleSave = useCallback(() => {
    handleLocalSave();
  }, [handleLocalSave]);

  // 불러오기 기능
  const handleLoad = useCallback(async () => {
    // 중복 호출 방지 (모바일 터치 이벤트 중복 방지)
    if (isLoadProcessingRef.current) {
      console.log('[불러오기] 이미 진행 중입니다.');
      return;
    }
    
    // [NEW] 파일 업로드 옵션 제공 (완전 무료 클라우드 동기화)
    const useFileUpload = confirm(
      '게임 불러오기\n\n' +
      '로컬 저장소에서 불러오려면 "취소"를 누르세요.\n' +
      '파일에서 불러오려면 "확인"을 누르세요.\n' +
      '(Google Drive, Dropbox 등에서 다운로드한 파일)'
    );
    
    if (useFileUpload) {
      try {
        const { FileStorageStrategy } = await import('../services/FileStorageStrategy');
        const input = FileStorageStrategy.createFileUploadInput(
          (data) => {
            try {
              // [NEW] 필수 데이터 검증
              if (!data || typeof data !== 'object') {
                alert('저장 데이터가 올바른 형식이 아닙니다.\n\n올바른 세이브 파일을 선택해주세요.');
                isLoadProcessingRef.current = false;
                return;
              }
              
              // [NEW] 메시지 데이터 검증
              if (!data.messages || !Array.isArray(data.messages)) {
                alert('저장 데이터에 메시지 정보가 없습니다.\n\n게임을 불러올 수 없습니다.');
                isLoadProcessingRef.current = false;
                return;
              }
              
              if (data.messages.length === 0) {
                alert('저장 데이터에 게임 진행 정보가 없습니다.\n\n새 게임을 시작해주세요.');
                isLoadProcessingRef.current = false;
                return;
              }
              
              // [NEW] 게임 상태 검증
              if (!data.gameState || typeof data.gameState !== 'object') {
                alert('저장 데이터에 게임 상태 정보가 없습니다.\n\n게임을 불러올 수 없습니다.');
                isLoadProcessingRef.current = false;
                return;
              }
              
              // [NEW] 데이터 복원
              setMessages(data.messages);
              messagesRef.current = data.messages;
              
              if (data.gameState) {
                setGameState({
                  ...data.gameState,
                  difficulty: data.gameState.difficulty || difficulty,
                });
              }
              if (data.facilities) {
                setFacilities(data.facilities);
              }
              if (data.newsItems) {
                setNewsItems(data.newsItems);
              }
              if (data.readNewsCount !== undefined) {
                setReadNewsCount(data.readNewsCount);
              }
              if (data.pendingOptions) {
                setPendingOptions(data.pendingOptions);
              }
              
              playSound('success');
              alert('게임이 불러와졌습니다!');
              isLoadProcessingRef.current = false;
            } catch (validationError) {
              console.error('[ChatInterface] 데이터 검증 오류:', validationError);
              const errorMessage = validationError instanceof Error ? validationError.message : '알 수 없는 오류';
              alert(`게임 데이터 검증에 실패했습니다.\n\n오류: ${errorMessage}`);
              isLoadProcessingRef.current = false;
            }
          },
          (error) => {
            console.error('[ChatInterface] 파일 불러오기 오류:', error);
            const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
            alert(`파일을 불러오는데 실패했습니다.\n\n오류: ${errorMessage}\n\n올바른 세이브 파일인지 확인해주세요.`);
            isLoadProcessingRef.current = false;
          }
        );
        
        input.click();
        return;
      } catch (error) {
        console.error('[ChatInterface] 파일 선택 오류:', error);
        const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
        alert(`파일 선택에 실패했습니다.\n\n오류: ${errorMessage}`);
        isLoadProcessingRef.current = false;
        return;
      }
    }
    
    isLoadProcessingRef.current = true;
    
    try {
      const savedData = localStorage.getItem(SAVE_KEY);
      if (!savedData) {
        alert('저장된 게임이 없습니다.\n\n새 게임을 시작하거나 파일에서 불러오기를 시도해주세요.');
        isLoadProcessingRef.current = false;
        return;
      }

      let parsed;
      try {
        parsed = JSON.parse(savedData);
      } catch (parseError) {
        console.error('[ChatInterface] JSON 파싱 오류:', parseError);
        alert('저장 데이터를 읽을 수 없습니다.\n\n파일이 손상되었거나 올바른 형식이 아닙니다.');
        isLoadProcessingRef.current = false;
        return;
      }
      
      // [NEW] 필수 데이터 검증
      if (!parsed || typeof parsed !== 'object') {
        alert('저장 데이터가 올바른 형식이 아닙니다.\n\n올바른 세이브 파일이 아닙니다.');
        isLoadProcessingRef.current = false;
        return;
      }
      
      if (!parsed.messages || !Array.isArray(parsed.messages)) {
        alert('저장 데이터에 메시지 정보가 없습니다.\n\n게임을 불러올 수 없습니다.');
        isLoadProcessingRef.current = false;
        return;
      }
      
      if (parsed.messages.length === 0) {
        alert('저장 데이터에 게임 진행 정보가 없습니다.\n\n새 게임을 시작해주세요.');
        isLoadProcessingRef.current = false;
        return;
      }
      
      // [NEW] 게임 상태 검증
      if (!parsed.gameState || typeof parsed.gameState !== 'object') {
        alert('저장 데이터에 게임 상태 정보가 없습니다.\n\n게임을 불러올 수 없습니다.');
        isLoadProcessingRef.current = false;
        return;
      }

      // 모델이 준비되지 않았으면 대기
      if (!modelRef.current) {
        alert('API 연결을 기다리는 중입니다. 잠시 후 다시 시도해주세요.');
        isLoadProcessingRef.current = false;
        return;
      }

      // 메시지 복원
        setMessages(parsed.messages);
      messagesRef.current = parsed.messages;

      // 게임 상태 복원
        if (parsed.gameState) {
        // 난이도 복원 (기존 저장 데이터 호환성)
        const restoredGameState = {
          ...parsed.gameState,
          difficulty: parsed.gameState.difficulty || difficulty, // 저장된 난이도가 없으면 현재 난이도 사용
        };
        setGameState(restoredGameState);
      }
      if (parsed.facilities) {
        setFacilities(parsed.facilities);
      }
      if (parsed.newsItems) {
        setNewsItems(parsed.newsItems);
      }
      if (parsed.readNewsCount !== undefined) {
        setReadNewsCount(parsed.readNewsCount);
      }

      // **핵심**: 모델에 메시지 히스토리 복원하여 API 연결 유지
      if (parsed.messages.length > 0) {
        const history = parsed.messages.map((msg: Message) => ({
          role: msg.isUser ? 'user' : 'model',
          parts: [{ text: msg.text }],
        }));

        chatInstanceRef.current = modelRef.current.startChat({
          history: history,
        });
        
        // **지시사항 버튼 복원**: 저장된 옵션이 있으면 필터링하여 복원
        if (parsed.pendingOptions && Array.isArray(parsed.pendingOptions) && parsed.pendingOptions.length > 0) {
          // 난이도 선택 및 지시사항 관련 옵션 필터링
          const filteredOptions = parsed.pendingOptions.filter(opt => {
            const label = opt.label.toLowerCase();
            const value = opt.value.toLowerCase();
            return !(
              // 난이도 선택 관련 필터링
              label.includes('이지 모드') || label.includes('하드 모드') ||
              label.includes('easy mode') || label.includes('hard mode') ||
              label.includes('난이도') || label.includes('difficulty') ||
              value.includes('이지 모드') || value.includes('하드 모드') ||
              value.includes('easy') || value.includes('hard') ||
              value.includes('난이도') ||
              // 지시사항/가이드 관련 필터링
              label.includes('지시사항') || label.includes('가이드') ||
              label.includes('guide') || label.includes('instruction') ||
              value.includes('지시사항') || value.includes('가이드') ||
              value.includes('guide') || value.includes('instruction')
            );
          });
          
          if (filteredOptions.length > 0) {
            setPendingOptions(filteredOptions);
            setCurrentOptions(filteredOptions);
          } else {
            // 필터링 후 옵션이 없으면 빈 배열로 설정 (일정 진행 버튼만 표시)
            setPendingOptions([]);
            setCurrentOptions([]);
          }
        } else {
          // 저장된 옵션이 없으면 마지막 AI 메시지에서 옵션 파싱
          const aiMessages = parsed.messages.filter((m: Message) => !m.isUser);
          if (aiMessages.length > 0) {
            const lastAIMessage = aiMessages[aiMessages.length - 1];
            const parsedResponse = parseAIResponse(lastAIMessage.text);
            if (parsedResponse.options.length > 0) {
              // 난이도 선택 및 지시사항 관련 옵션 필터링
              const filteredOptions = parsedResponse.options.filter(opt => {
                const label = opt.label.toLowerCase();
                const value = opt.value.toLowerCase();
                return !(
                  // 난이도 선택 관련 필터링
                  label.includes('이지 모드') || label.includes('하드 모드') ||
                  label.includes('easy mode') || label.includes('hard mode') ||
                  label.includes('난이도') || label.includes('difficulty') ||
                  value.includes('이지 모드') || value.includes('하드 모드') ||
                  value.includes('easy') || value.includes('hard') ||
                  value.includes('난이도') ||
                  // 지시사항/가이드 관련 필터링
                  label.includes('지시사항') || label.includes('가이드') ||
                  label.includes('guide') || label.includes('instruction') ||
                  value.includes('지시사항') || value.includes('가이드') ||
                  value.includes('guide') || value.includes('instruction')
                );
              });
              
              if (filteredOptions.length > 0) {
                setPendingOptions(filteredOptions);
                setCurrentOptions(filteredOptions);
              } else {
                // 필터링 후 옵션이 없으면 빈 배열로 설정 (일정 진행 버튼만 표시)
                setPendingOptions([]);
                setCurrentOptions([]);
              }
            } else {
              // 옵션이 없으면 빈 배열로 설정 (일정 진행 버튼만 표시)
              setPendingOptions([]);
              setCurrentOptions([]);
            }
      } else {
            // AI 메시지가 없으면 빈 배열로 설정 (일정 진행 버튼만 표시)
            setPendingOptions([]);
            setCurrentOptions([]);
          }
        }
      }

      playSound('success');
      alert('게임을 불러왔습니다!');
      isLoadProcessingRef.current = false;
    } catch (e) {
      console.error('[ChatInterface] 불러오기 오류:', e);
      const errorMessage = e instanceof Error ? e.message : '알 수 없는 오류';
      alert(`게임 불러오기에 실패했습니다.\n\n오류: ${errorMessage}\n\n새 게임을 시작하거나 파일에서 불러오기를 시도해주세요.`);
      isLoadProcessingRef.current = false;
    }
  }, [playSound]);

  // GUI 이벤트 핸들러
  const handlePlayerSelect = useCallback((player: Player) => {
    playSound('coin');
    const message = `${player.name} 선수 선택`;
    setGamePhase('NEGOTIATION');
    setNegotiationPlayer(player.name);
    handleSend(message);
  }, [handleSend, playSound]);

  const handleNegotiationSubmit = useCallback((amount: number) => {
    setNegotiationPlayer((prevPlayer) => {
      if (prevPlayer) {
        const message = `${prevPlayer} 선수에게 ${amount.toLocaleString()}원 제시`;
        handleSend(message);
      }
      return null;
    });
    setGamePhase('MAIN_GAME');
  }, [handleSend]);

  const handleEventModalClose = useCallback(() => {
    setGamePhase('MAIN_GAME');
    setGuiEvent(null);
  }, []);

  // 옵션 모달 닫기 핸들러
  const handleOptionsModalClose = () => {
    setIsOptionsModalOpen(false);
    // 모달을 닫아도 옵션은 유지 (플로팅 버튼으로 다시 열 수 있음)
  };

  return (
    <div className="flex flex-col h-screen bg-[#Fdfbf7]">
      {/* 헤더 - 상태바 */}
      <GameHeader 
        teamName={
          selectedTeam.id === 'expansion' 
            ? (expansionTeamData?.teamName || selectedTeam.fullName)
            : (gameState.teamName || selectedTeam.fullName)
        }
        budget={gameState.budget}
        date={gameState.date}
        season="2026 시즌"
        difficulty={difficulty}
        salaryCapUsage={gameState.salaryCapUsage}
        onApiKeyClick={onResetApiKey}
        onSaveClick={() => setIsSettingsModalOpen(true)}
        onLoadClick={() => setIsSettingsModalOpen(true)}
      />

      {/* 메인 - 채팅 영역 */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 lg:py-6 overscroll-contain">
        <div className="max-w-5xl mx-auto w-full">
          {messages.map((msg, idx) => (
            <MessageBubble
              key={idx}
              message={msg.text}
              isUser={msg.isUser}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 푸터 - 입력 영역 */}
      <div className="border-t-2 border-baseball-green/20 bg-gradient-to-b from-gray-50 to-white shadow-2xl mobile-input-container">
        {/* 선택지 버튼 패널 제거됨 - 모달로 대체 */}

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit} className="p-2 sm:p-3 md:p-4">
          <div className="flex gap-2 sm:gap-3 max-w-5xl mx-auto">
            {/* 지시사항, 뉴스 및 시설 관리 버튼 */}
            <div className="flex items-center gap-1 sm:gap-1.5 border-r border-baseball-green/20 pr-1.5 sm:pr-2 md:pr-3 flex-shrink-0">
              <button
                type="button"
                onClick={() => {
                  setIsOptionsModalOpen(true);
                  playSound('click');
                }}
                className="p-2 hover:bg-baseball-green/10 rounded-lg transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center active:bg-baseball-green/20"
                title="작전 지시"
              >
                <ClipboardList className="w-5 h-5 text-baseball-green" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsNewsOpen(true);
                  setReadNewsCount(newsItems.length);
                }}
                className="p-2 hover:bg-baseball-green/10 rounded-lg transition-colors relative touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center active:bg-baseball-green/20"
                title="뉴스"
              >
                <Newspaper className="w-5 h-5 text-baseball-green" />
                {Math.max(0, newsItems.length - readNewsCount) > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-baseball-gold text-baseball-green text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                    {Math.max(0, newsItems.length - readNewsCount) > 9 ? '9+' : Math.max(0, newsItems.length - readNewsCount)}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setIsFacilityOpen(true)}
                className="p-2 hover:bg-baseball-green/10 rounded-lg transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center active:bg-baseball-green/20"
                title="시설 관리"
              >
                <Building2 className="w-5 h-5 text-baseball-green" />
              </button>
            </div>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="명령을 입력하세요..."
              className="flex-1 px-3 sm:px-4 md:px-5 py-3 sm:py-3.5 text-base sm:text-base border-2 border-baseball-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-baseball-green/50 focus:border-baseball-green disabled:bg-gray-100 font-sans shadow-sm focus:shadow-md transition-all touch-manipulation min-h-[44px] mobile-input"
              disabled={isLoading}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
            <motion.button
              type="submit"
              disabled={isLoading || !input.trim()}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 sm:px-6 md:px-7 py-3 sm:py-3.5 min-w-[44px] min-h-[44px] bg-gradient-to-r from-baseball-green to-[#0a3528] hover:from-baseball-green-dark hover:to-[#08251f] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl active:shadow-md border-b-2 border-baseball-green-dark/50 touch-manipulation flex-shrink-0 flex items-center justify-center"
            >
              <Send className="w-5 h-5 sm:w-5 sm:h-5" />
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
          // 선택 후 옵션 초기화하지 않음 - 지시사항 버튼이 항상 보이도록 유지
        }}
        onClose={handleOptionsModalClose}
      />


      {/* 이벤트 모달 - 선수 목록 모달은 표시하지 않음 */}

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
        newsItems={newsItems}
      />

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

      {/* 설정 모달 */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        onSaveToFile={handleSaveToFile}
        onLoadFromFile={handleLoadFromFile}
        onLocalSave={handleLocalSave}
        onLocalLoad={handleLoad}
      />

    </div>
  );
}
