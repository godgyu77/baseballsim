import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Building2, Newspaper, ClipboardList, Trophy, Receipt, MonitorPlay } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { getGeminiModel, initializeGameWithData } from '../lib/gemini';
import GameHeader from './GameHeader';
import MessageBubble from './MessageBubble';
import LoadingOverlay from './LoadingOverlay';
import NegotiationInput from './NegotiationInput';
import RandomEventModal from './RandomEventModal';
import FacilityManagement from './FacilityManagement';
import OptionsModal from './OptionsModal';
import NewsSidebar, { NewsItem } from './NewsSidebar';
import TransactionModal from './TransactionModal';
import StandingsModal from './StandingsModal';
import GameResultModal from './GameResultModal';
import SaveLoadModal from './SaveLoadModal';
import { useToast } from '../context/ToastContext';
import { parseAIResponse, extractDate, extractBudget, GamePhase, GUIEvent, RandomEvent, FacilityType, FacilityState, StatusInfo, Transaction, validateBudgetIntegrity, Player, validateRosterIntegrity, extractPlayerNamesFromInitialData, GameResult, TeamRecord, isDuplicateTransaction, deduplicateTransactions, generateTransactionId } from '../lib/utils';
import { retryRequest } from '../lib/retryUtils';
import { debounce } from '../lib/debounce';
import { filterProtectedPlayers, validateDraftPicks, updatePlayerTeamAffiliation, sortDraftOrder, createDraftPool, DraftPlayer, ProtectedPlayer, TeamRank } from '../lib/draftUtils';
import { getInitialBudget } from '../constants/GameConfig';
import { Team } from '../constants/TeamData';
import { KBO_INITIAL_DATA } from '../constants/prompts';
import { useSound } from '../hooks/useSound';
import { RANDOM_EVENTS, RANDOM_EVENT_CHANCE } from '../constants/GameEvents';
import { createInitialFacilityState, FACILITY_DEFINITIONS } from '../constants/Facilities';
import { Difficulty } from '../constants/GameConfig';
import { GameSaveData } from '../services/StorageService';
import { FileStorageStrategy } from '../services/FileStorageStrategy';

interface Message {
  text: string;
  isUser: boolean;
  isStreaming?: boolean; // [Performance] 스트리밍 중 표시 플래그
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
  const [hasStartedStreaming, setHasStartedStreaming] = useState(false); // 스트리밍 시작 여부 (스켈레톤 제어용)
  // [Money-Validation] 자금 무결성 검증 로직 추가 - 거래 내역 관리
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([]);
  // [Roster-Validation] 로스터 무결성 검사 추가 - 로스터 상태 관리
  const [currentRoster, setCurrentRoster] = useState<Player[]>([]); // 현재 로스터 상태
  // [Sim-Engine] 경기 결과 파싱 및 전적 반영 - 리그 순위표 상태 관리
  const [leagueStandings, setLeagueStandings] = useState<Record<string, TeamRecord>>({}); // 팀별 전적 맵 (팀 이름 -> 전적)
  const [lastGameResult, setLastGameResult] = useState<GameResult | null>(null); // 최근 경기 결과
  // 모달 상태 관리
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [isStandingsOpen, setIsStandingsOpen] = useState(false);
  const [isSaveLoadModalOpen, setIsSaveLoadModalOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const { showToast } = useToast(); // Toast 알림 훅
  const isLoadProcessingRef = useRef(false); // 불러오기 중복 방지 플래그
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInstanceRef = useRef<any>(null);
  const modelRef = useRef<any>(null);
  const messagesRef = useRef<Message[]>([]);
  const isLoadingRef = useRef(false);
  const handleSendRef = useRef<((messageText: string, options?: { hideFromUI?: boolean; displayMessage?: string }) => Promise<void>) | null>(null);
  const { playSound } = useSound();

  // handleSend 함수를 최상단으로 이동 (TDZ 문제 해결)
  const handleSend = useCallback(async (messageText: string, options?: { hideFromUI?: boolean; displayMessage?: string }) => {
    // 빈 값 방어 코드 추가
    if (!messageText || !messageText.trim() || isLoadingRef.current) {
      console.warn('[handleSend] 메시지가 비어있거나 이미 로딩 중입니다.');
      return;
    }

    console.log('[handleSend] 시작', { hideFromUI: options?.hideFromUI, messageLength: messageText.length });
    playSound('click');
    const userMessage = messageText.trim();
    const displayMessage = options?.displayMessage || userMessage; // 화면에 표시할 메시지
    const hideFromUI = options?.hideFromUI || false; // UI에 표시하지 않을지 여부
    setInput('');
    
    // 신생 구단인 경우 구단 이름은 expansionTeamData에서 받은 값으로 고정 (절대 변경하지 않음)
    // AI 응답이나 사용자 메시지에서 구단명을 추출해도 업데이트하지 않음
    
    // 사용자 메시지를 화면에 추가 (hideFromUI가 false인 경우만)
    // [4K 최적화] 메시지 개수 제한 (최대 150개 유지)
    if (!hideFromUI) {
      setMessages((prev) => {
        const newMessages = [...prev, { text: displayMessage, isUser: true }];
        return newMessages.length > 150 ? newMessages.slice(-150) : newMessages;
      });
    }
    
    // messagesRef 업데이트 (API 히스토리 생성을 위해 실제 전송할 메시지 저장)
    // hideFromUI가 true여도 API 히스토리를 위해 messagesRef에는 실제 메시지 저장
    messagesRef.current = [...messagesRef.current, { text: userMessage, isUser: true }];
    if (messagesRef.current.length > 150) {
      messagesRef.current = messagesRef.current.slice(-150);
    }
    
    // [UX Optimization] 로딩 오버레이 제거 - 스트리밍 텍스트가 자연스럽게 나타나도록
    // isLoading은 입력 필드 비활성화에만 사용 (로딩 오버레이 표시 안 함)
    setIsLoading(true);
    setCurrentOptions([]);
    setLoadingStatusText(undefined);
    setIsOptionsModalOpen(false);

    try {
      if (!modelRef.current) {
        console.error('[handleSend] modelRef.current가 null입니다.');
        throw new Error('모델이 초기화되지 않았습니다.');
      }

      console.log('[handleSend] 모델 확인 완료, 채팅 인스턴스 생성 중...');
      // 채팅 인스턴스가 없으면 새로 생성
      // messagesRef를 사용하여 최신 메시지 목록 참조 (방금 추가한 사용자 메시지 포함)
      if (!chatInstanceRef.current) {
        // [CRITICAL FIX] history 생성 시 주의:
        // 1. initializeGameWithData 이후에는 messagesRef가 초기화되어 있으므로 빈 배열로 시작
        // 2. 첫 번째 메시지는 반드시 user role이어야 함 (API 규칙)
        // 3. messagesRef.current에 AI 응답이 먼저 있으면 제거하고 user 메시지부터 시작
        const currentMessages = messagesRef.current;
        
        // AI 응답이 첫 번째로 오는 경우 제거 (API 규칙 위반 방지)
        const filteredMessages = currentMessages.length > 0 && !currentMessages[0].isUser
          ? currentMessages.filter((_, idx) => idx === 0 ? false : true) // 첫 번째 AI 메시지 제거
          : currentMessages;
        
        // 사용자 메시지를 제외한 히스토리 생성
        // hideFromUI가 true인 경우 방금 추가한 메시지가 없으므로 filteredMessages 그대로 사용
        const history = filteredMessages.length > 0
          ? filteredMessages.map(msg => ({
              role: msg.isUser ? 'user' : 'model',
              parts: [{ text: msg.text }],
            }))
          : [];

        // [CRITICAL] history의 첫 번째 항목이 'model'이면 제거 (API 규칙 위반 방지)
        const safeHistory = history.length > 0 && history[0].role === 'model'
          ? history.slice(1) // 첫 번째 model 메시지 제거
          : history;

        chatInstanceRef.current = modelRef.current.startChat({
          history: safeHistory, // 안전한 history 사용
        });
        console.log('[handleSend] 채팅 인스턴스 생성 완료');
      }

      console.log('[handleSend] API 호출 시작...', { messageLength: userMessage.length });
      
      // [Auto-Retry] API 호출에 재시도 로직 적용
      const result = await retryRequest(
        async () => {
          return await chatInstanceRef.current.sendMessageStream(userMessage);
        },
        {
          maxRetries: 3,
          onRetry: (attempt, error) => {
            console.warn(`[Auto-Retry] 메시지 전송 재시도 ${attempt}/3:`, error);
            // UI 피드백: 재시도 중 상태 표시
            setLoadingStatusText(`연결 재시도 중... (${attempt}/3)`);
          },
        }
      );
      
      console.log('[handleSend] API 호출 성공, 스트리밍 시작...');
      let fullText = '';
      let lastUpdateTime = 0;
      const UPDATE_THROTTLE_MS = 150; // [Performance] UI 업데이트 Throttle (150ms)
      
      // 스트리밍 시작 전 상태로 리셋
      setHasStartedStreaming(false);

      try {
        for await (const chunk of result.stream) {
          try {
            const chunkText = chunk.text();
            if (chunkText) {
              fullText += chunkText;
              
              // [UX Optimization] 첫 chunk 도착 시 즉시 텍스트 표시 시작
              // 로딩 오버레이 없이 자연스럽게 텍스트가 나타나도록
              if (!hasStartedStreaming) {
                setHasStartedStreaming(true);
                // isLoading은 입력 필드 비활성화에만 사용 (로딩 오버레이는 표시 안 함)
                console.log('[UX Optimization] 첫 chunk 도착, 스트리밍 텍스트 표시 시작');
              }
              
              // [Performance Optimization] Progressive Rendering: 스트리밍 중 실시간 UI 업데이트
              // Throttle 적용: 150ms마다 한 번씩만 UI 업데이트 (과도한 리렌더링 방지)
              const now = Date.now();
              if (now - lastUpdateTime >= UPDATE_THROTTLE_MS) {
                lastUpdateTime = now;
                
                // 실시간으로 메시지 업데이트 (파싱 없이 텍스트만 표시)
                setMessages((prev) => {
                  const lastMessage = prev[prev.length - 1];
                  // 마지막 메시지가 AI 메시지이고 스트리밍 중이면 업데이트
                  if (lastMessage && !lastMessage.isUser && lastMessage.isStreaming) {
                    const updated = [...prev];
                    updated[updated.length - 1] = { 
                      text: fullText, 
                      isUser: false,
                      isStreaming: true  // 스트리밍 중 표시
                    };
                    return updated;
                  } else {
                    // 새 스트리밍 메시지 추가
                    const newMessages = [...prev, { 
                      text: fullText, 
                      isUser: false, 
                      isStreaming: true 
                    }];
                    return newMessages.length > 150 ? newMessages.slice(-150) : newMessages;
                  }
                });
              }
              
              // 키워드 기반 상태 텍스트 업데이트 (진행률은 LoadingOverlay에서 자동 관리)
              if (fullText.includes('선수') || fullText.includes('명단')) {
                setLoadingStatusText('선수 데이터를 확인 중입니다...');
              } else if (fullText.includes('자금') || fullText.includes('예산')) {
                setLoadingStatusText('재무 상태를 분석 중입니다...');
              } else if (fullText.includes('표') || fullText.includes('명단')) {
                setLoadingStatusText('보고서를 작성 중입니다...');
              }
              
              // [Performance] 스트리밍 중에도 완성된 태그만 파싱 (옵션 등)
              // 전체 파싱은 스트리밍 완료 후 수행
              try {
                const parsed = parseAIResponse(fullText);
                if (parsed.options.length > 0) {
                  setCurrentOptions(parsed.options);
                }
              } catch (parseError) {
                // 불완전한 태그는 무시 (스트리밍 중이므로 정상)
              }
            }
          } catch (chunkError) {
            console.warn('Chunk 처리 오류:', chunkError);
          }
        }

        // [Performance Optimization] 스트리밍 루프 종료 후 마지막 업데이트 보장
        // Throttle 때문에 마지막 chunk가 UI에 반영되지 않을 수 있으므로 강제 업데이트
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage && !lastMessage.isUser && lastMessage.isStreaming) {
            const updated = [...prev];
            updated[updated.length - 1] = { 
              text: fullText, 
              isUser: false,
              isStreaming: true  // 아직 스트리밍 중 (파싱 전)
            };
            return updated;
          }
          return prev;
        });

        // 스트리밍 완료 후 최종 응답 확인
        const response = await result.response;
        const finalText = response.text();
        
        if (finalText && finalText !== fullText) {
          fullText = finalText;
          
          // 최종 텍스트가 다르면 한 번 더 업데이트
          setMessages((prev) => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage && !lastMessage.isUser && lastMessage.isStreaming) {
              const updated = [...prev];
              updated[updated.length - 1] = { 
                text: fullText, 
                isUser: false,
                isStreaming: true
              };
              return updated;
            }
            return prev;
          });
        }

        // [UX Optimization] 스트리밍 완료 - 로딩 오버레이 없이 자연스럽게 완료
        setLoadingStatusText(undefined);

        if (fullText) {
          // [Performance Optimization] 스트리밍 완료 후 최종 파싱 및 정리
          const parsed = parseAIResponse(fullText);
          
          // 파싱된 텍스트로 업데이트 (태그 제거, 스트리밍 완료 표시)
          // [4K 최적화] 메시지 개수 제한 (최대 150개 유지)
          setMessages((prev) => {
            const lastMessage = prev[prev.length - 1];
            // 마지막 메시지가 스트리밍 중이면 업데이트, 아니면 새로 추가
            if (lastMessage && !lastMessage.isUser && lastMessage.isStreaming) {
              const updated = [...prev];
              updated[updated.length - 1] = { 
                text: parsed.text,  // 파싱된 깨끗한 텍스트
                isUser: false,
                isStreaming: false  // 스트리밍 완료
              };
              return updated;
            } else {
              const newMessages = [...prev, { 
                text: parsed.text, 
                isUser: false,
                isStreaming: false 
              }];
              return newMessages.length > 150 ? newMessages.slice(-150) : newMessages;
            }
          });
          
          // STATUS 태그 처리 (헤더 업데이트)
          if (parsed.status) {
            if (parsed.status.date) {
              setGameState(prev => ({ ...prev, date: parsed.status!.date! }));
            }
            if (parsed.status.budget) {
              // [Money-Validation] 자금 무결성 검증 로직 추가
              // "50억 원" 또는 "-30.0억 원" 형식에서 숫자 추출 (마이너스 값도 처리)
              const budgetMatch = parsed.status.budget.match(/(-?[0-9,.]+)\s*억/i);
              if (budgetMatch) {
                const amount = parseFloat(budgetMatch[1].replace(/,/g, ''));
                if (!isNaN(amount)) {
                  const aiReportedBudget = Math.floor(amount * 100000000); // 원 단위로 변환
                  
                  setGameState(prev => {
                    // transactionHistory의 마지막 잔액과 비교하여 검증
                    const lastTransaction = transactionHistory[transactionHistory.length - 1];
                    const clientCalculatedBudget = lastTransaction ? lastTransaction.balanceAfter : (prev.budget || 0);
                    
                    // 자금 무결성 검증
                    const validation = validateBudgetIntegrity(aiReportedBudget, clientCalculatedBudget);
                    if (!validation.isValid && validation.warning) {
                      console.warn(validation.warning);
                    }
                    
                    // 거래 내역에 기록
                    const transaction: Transaction = {
                      id: generateTransactionId('ai-report'),
                      date: parsed.status!.date || new Date().toISOString(),
                      amount: aiReportedBudget - clientCalculatedBudget, // 변동 금액
                      category: 'AI_REPORT',
                      description: `AI 응답: ${parsed.status.budget}`,
                      balanceAfter: aiReportedBudget,
                    };
                    
                    // [Fix - Deduplication] 중복 체크 후 추가
                    setTransactionHistory(prevHistory => {
                      if (isDuplicateTransaction(transaction, prevHistory)) {
                        console.warn('[Transaction] 중복 거래 내역 감지, 추가하지 않음:', transaction.id);
                        return prevHistory;
                      }
                      return [...prevHistory, transaction];
                    });
                    
                    // 마이너스 값도 허용 (부채 상태)
                    return { ...prev, budget: aiReportedBudget };
                  });
                }
              }
            }
            if (parsed.status.salaryCapUsage !== undefined) {
              setGameState(prev => ({ ...prev, salaryCapUsage: parsed.status!.salaryCapUsage }));
            }
          }
          
          // FINANCE_UPDATE 태그 처리 (FA 보상금 등 자금 변동)
          if (parsed.financeUpdate) {
            // [Money-Validation] 자금 무결성 검증 로직 추가
            const { amount, reason } = parsed.financeUpdate;
            console.log(`[자금 변동] ${reason}: ${amount > 0 ? '+' : ''}${(amount / 100000000).toFixed(1)}억 원`);
            setGameState(prev => {
              if (prev.budget !== null) {
                const newBudget = Math.max(0, prev.budget + amount);
                console.log(`[자금 변동] ${(prev.budget / 100000000).toFixed(1)}억 원 → ${(newBudget / 100000000).toFixed(1)}억 원`);
                
                // 거래 내역에 기록
                const transaction: Transaction = {
                  id: generateTransactionId('finance-update'),
                  date: parsed.status?.date || new Date().toISOString(),
                  amount: amount,
                  category: 'FINANCE_UPDATE',
                  description: reason,
                  balanceAfter: newBudget,
                };
                
                // [Fix - Deduplication] 중복 체크 후 추가
                setTransactionHistory(prevHistory => {
                  if (isDuplicateTransaction(transaction, prevHistory)) {
                    console.warn('[Transaction] 중복 거래 내역 감지, 추가하지 않음:', transaction.id);
                    return prevHistory;
                  }
                  return [...prevHistory, transaction];
                });
                
                // Toast 알림: 자금 변동
                if (amount > 0) {
                  showToast(`${(amount / 100000000).toFixed(1)}억 원 수입이 발생했습니다`, 'success');
                } else {
                  showToast(`${Math.abs(amount / 100000000).toFixed(1)}억 원을 지출했습니다`, 'warning');
                }
                
                return { ...prev, budget: newBudget };
              }
              return prev;
            });
          }

          // NEWS 태그 처리 (뉴스 사이드바에 추가)
          if (parsed.news && parsed.news.length > 0) {
            setNewsItems(prev => [...prev, ...parsed.news!]);
          }

          // [Roster-Validation] 로스터 무결성 검사 추가
          // [ROSTER] 태그에서 로스터 데이터가 있는 경우 검증 및 업데이트
          if (parsed.roster && Array.isArray(parsed.roster) && parsed.roster.length > 0) {
            // 초기 로스터 출력 시 InitialData.ts와 비교 검증 (currentRoster가 비어있을 때만)
            const isInitialRoster = currentRoster.length === 0;
            // InitialData.ts의 팀 이름 형식과 매칭 (예: "한화 이글스", "KT 위즈" 등)
            const teamNameForValidation = selectedTeam.fullName; // "한화 이글스", "KT 위즈" 등
            const initialDataPlayerNames = isInitialRoster 
              ? extractPlayerNamesFromInitialData(KBO_INITIAL_DATA, teamNameForValidation)
              : undefined;
            
            // 로스터 무결성 검증
            const validation = validateRosterIntegrity(
              parsed.roster, 
              currentRoster,
              initialDataPlayerNames
            );
            
            if (!validation.isValid) {
              // 검증 실패: 경고 로그 출력 및 기존 로스터 유지 (Fail-Safe)
              console.error('[Roster-Validation] AI 데이터 오류 감지: 로스터 업데이트를 건너뜁니다.');
              console.error('[Roster-Validation] 검증 실패 사유:');
              validation.errors.forEach((error, index) => {
                console.error(`  ${index + 1}. ${error}`);
              });
              if (validation.warnings.length > 0) {
                console.warn('[Roster-Validation] 경고 사항:');
                validation.warnings.forEach((warning, index) => {
                  console.warn(`  ${index + 1}. ${warning}`);
                });
              }
              // 기존 로스터 상태 유지 (업데이트 방지)
            } else {
              // 검증 성공: 로스터 업데이트
              if (validation.warnings.length > 0) {
                console.warn('[Roster-Validation] 경고 사항 (업데이트는 진행):');
                validation.warnings.forEach((warning, index) => {
                  console.warn(`  ${index + 1}. ${warning}`);
                });
              }
              setCurrentRoster(parsed.roster);
              console.log(`[Roster-Validation] ✅ 로스터 업데이트 완료: ${parsed.roster.length}명`);
            }
          }

          // GUI_EVENT에서 로스터 데이터가 있는 경우 검증 (향후 확장용)
          if (parsed.guiEvent && parsed.guiEvent.type === 'RECRUIT' && parsed.guiEvent.candidates) {
            // 후보 선수 목록이 있는 경우 (드래프트, FA 등)
            // 현재는 후보 목록이므로 로스터 검증은 생략
            // 향후 실제 로스터 업데이트 시 검증 로직 적용
          }

          // [Sim-Engine] 경기 결과 파싱 및 전적 반영
          if (parsed.gameResults && parsed.gameResults.length > 0) {
            // 최근 경기 결과 저장 (첫 번째 경기 또는 우리 팀 경기)
            const myTeamGame = parsed.gameResults.find(r => r.isMyTeamGame);
            if (myTeamGame) {
              setLastGameResult(myTeamGame);
            } else if (parsed.gameResults.length > 0) {
              setLastGameResult(parsed.gameResults[0]);
            }
            
            // Toast 알림: 경기 결과 도착
            showToast('경기 결과가 도착했습니다', 'info');
            
            setLeagueStandings(prevStandings => {
              const newStandings = { ...prevStandings };
              let myTeamWins = 0;
              let myTeamLosses = 0;
              let myTeamDraws = 0;

              parsed.gameResults!.forEach((result) => {
                // 홈팀 전적 업데이트
                if (!newStandings[result.homeTeam]) {
                  newStandings[result.homeTeam] = {
                    wins: 0,
                    losses: 0,
                    draws: 0,
                    gamesPlayed: 0,
                  };
                }

                // 원정팀 전적 업데이트
                if (!newStandings[result.awayTeam]) {
                  newStandings[result.awayTeam] = {
                    wins: 0,
                    losses: 0,
                    draws: 0,
                    gamesPlayed: 0,
                  };
                }

                // 승/패/무 업데이트
                if (result.winner === 'home') {
                  newStandings[result.homeTeam].wins++;
                  newStandings[result.awayTeam].losses++;
                  
                  // 우리 팀 경기인 경우 전적 추적
                  if (result.isMyTeamGame) {
                    if (result.homeTeam === selectedTeam.name || result.homeTeam === selectedTeam.fullName) {
                      myTeamWins++;
                    } else {
                      myTeamLosses++;
                    }
                  }
                } else if (result.winner === 'away') {
                  newStandings[result.homeTeam].losses++;
                  newStandings[result.awayTeam].wins++;
                  
                  // 우리 팀 경기인 경우 전적 추적
                  if (result.isMyTeamGame) {
                    if (result.awayTeam === selectedTeam.name || result.awayTeam === selectedTeam.fullName) {
                      myTeamWins++;
                    } else {
                      myTeamLosses++;
                    }
                  }
                } else {
                  // 무승부
                  newStandings[result.homeTeam].draws++;
                  newStandings[result.awayTeam].draws++;
                  
                  if (result.isMyTeamGame) {
                    myTeamDraws++;
                  }
                }

                // 경기 수 업데이트
                newStandings[result.homeTeam].gamesPlayed++;
                newStandings[result.awayTeam].gamesPlayed++;
              });

              // 승률 계산
              Object.keys(newStandings).forEach(teamName => {
                const record = newStandings[teamName];
                if (record.gamesPlayed > 0) {
                  record.winPercentage = record.wins / record.gamesPlayed;
                } else {
                  record.winPercentage = 0;
                }
              });

              // UI Feedback: 경기 결과가 파싱되면 사용자에게 알림
              if (myTeamWins > 0 || myTeamLosses > 0 || myTeamDraws > 0) {
                const myTeamRecord = newStandings[selectedTeam.name] || newStandings[selectedTeam.fullName];
                if (myTeamRecord) {
                  console.log(
                    `[Sim-Engine] 경기 결과가 반영되었습니다. ` +
                    `현재 전적: ${myTeamRecord.wins}승 ${myTeamRecord.losses}패 ${myTeamRecord.draws}무 ` +
                    `(승률: ${(myTeamRecord.winPercentage! * 100).toFixed(3)}%)`
                  );
                }
              } else {
                console.log(`[Sim-Engine] 경기 결과가 반영되었습니다. (${parsed.gameResults.length}경기 처리)`);
              }

              return newStandings;
            });
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
            // [4K 최적화] 메시지 개수 제한 (최대 150개 유지)
            setMessages((prev) => {
              const newMessages = [...prev, { text: parsed.text, isUser: false }];
              return newMessages.length > 150 ? newMessages.slice(-150) : newMessages;
            });
            
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
        setHasStartedStreaming(false); // 로딩 완료 시 리셋
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : String(error) || '알 수 없는 오류';
      // [4K 최적화] 메시지 개수 제한 (최대 150개 유지)
      setMessages((prev) => {
        const newMessages = [
          ...prev,
          {
            text: `오류가 발생했습니다: ${errorMessage}\n\nAPI 키와 인터넷 연결을 확인해주세요.`,
            isUser: false,
          },
        ];
        return newMessages.length > 150 ? newMessages.slice(-150) : newMessages;
      });
      setCurrentOptions([]);
      setPendingOptions([]);
      setLoadingStatusText(undefined);
    } finally {
      // 로딩 종료
      setIsLoading(false);
      setHasStartedStreaming(false); // 로딩 완료 시 리셋
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
        // [Cost Optimization] 이미 모델이 있고 같은 API 키면 재사용 (중복 호출 방지)
        if (!modelRef.current) {
          modelRef.current = await getGeminiModel(apiKey);
        } else {
          console.log('[Cost Optimization] 기존 모델 인스턴스 재사용 (중복 호출 방지)');
        }
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
                // [Money-Validation] 자금 무결성 검증 로직 추가 - 거래 내역 복원
                if (parsed.transactionHistory && Array.isArray(parsed.transactionHistory)) {
                  setTransactionHistory(parsed.transactionHistory);
                }
                // [Roster-Validation] 로스터 무결성 검사 추가 - 로스터 복원
                if (parsed.currentRoster && Array.isArray(parsed.currentRoster)) {
                  setCurrentRoster(parsed.currentRoster);
                }
                // [Sim-Engine] 경기 결과 파싱 및 전적 반영 - 리그 순위표 복원
                if (parsed.leagueStandings && typeof parsed.leagueStandings === 'object') {
                  setLeagueStandings(parsed.leagueStandings);
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

  // 게임 초기화 플래그 (중복 호출 방지)
  const isInitializingRef = useRef(false);

  // handleSend가 정의된 후에 초기화 로직 실행
  useEffect(() => {
    const savedData = localStorage.getItem(SAVE_KEY);
    const hasSavedData = savedData && JSON.parse(savedData).messages?.length > 0;
    
    // 새 게임 시작 시: 저장된 데이터가 없으면 initializeGameWithData 호출
    if (selectedTeam && messages.length === 0 && isModelReady && modelRef.current && !hasSavedData && !isInitializingRef.current) {
      isInitializingRef.current = true;
      
      // [CRITICAL FIX] 이전 메시지 및 채팅 인스턴스 완전 초기화
      // 화면에 표시된 모든 메시지와 AI 응답을 제거하여 API 오류 방지
      setMessages([]);
      messagesRef.current = [];
      chatInstanceRef.current = null; // 채팅 인스턴스 초기화 (새 세션 시작)
      
      // 옵션 초기화 (일정 진행 버튼만 표시되도록) - 함수형 업데이트로 중복 방지
      setPendingOptions(prev => prev.length === 0 ? prev : []);
      setCurrentOptions(prev => prev.length === 0 ? prev : []);
      
      // [FIX] 로딩 상태는 handleSend에서 관리하므로 여기서는 설정하지 않음
      // setIsLoading(true)를 제거하여 handleSend가 정상적으로 실행되도록 함
      setLoadingStatusText(undefined); // 롤링 텍스트 사용
      
      // isLoadingRef도 리셋하여 handleSend가 실행되도록 함
      isLoadingRef.current = false;
      
      // [FIX] 팀 선택 정보를 먼저 전송하고, 그 후에 GM Office Report 생성
      // 1단계: 사용자 메시지 표시 (팀 선택 정보)
      const displayMessage = selectedTeam.id === 'expansion' 
        ? `✨ 신생 구단 창단 (11구단)으로 게임을 시작합니다.`
        : `${selectedTeam.fullName}으로 게임을 시작합니다.`;
      
      // 화면에 사용자 메시지 먼저 표시
      setMessages([{ text: displayMessage, isUser: true }]);
      
      // 2단계: 팀 정보를 포함한 프롬프트 생성 및 전송
      if (selectedTeam.id === 'expansion') {
        const difficultyMode = difficulty === 'EASY' ? '이지 모드' : difficulty === 'NORMAL' ? '노말 모드' : '헬 모드';
        const difficultyCode = difficulty;
        const difficultyConfig = difficulty === 'EASY' 
          ? '초기 자금: 80.0억 원, 샐러리캡: 250억 원'
          : difficulty === 'NORMAL'
          ? '초기 자금: 30.0억 원, 샐러리캡: 137억 원'
          : '초기 자금: 10.0억 원, 샐러리캡: 100억 원';
        
        const ownerTypeName = expansionTeamData?.ownerType === 'A' 
          ? 'A유형: 성적 지상주의 (Win-Now)'
          : expansionTeamData?.ownerType === 'B'
          ? 'B유형: 비즈니스맨 (Profit-First)'
          : expansionTeamData?.ownerType === 'C'
          ? 'C유형: 시스템/재건 (Rebuilder)'
          : 'D유형: 의리의 대부 (The Godfather)';
        
        const facilityInfo = `**[현재 시설 레벨]**
- 훈련장: Lv.${facilities.training.level} (경험치 획득량 +${facilities.training.level * 10}%)
- 메디컬 센터: Lv.${facilities.medical.level} (부상 확률 -${facilities.medical.level * 5}%, 회복 속도 +${facilities.medical.level * 10}%)
- 마케팅 팀: Lv.${facilities.marketing.level} (경기당 수익 +${facilities.marketing.level * 5}%, 후원금 +${facilities.marketing.level * 3}%)
- 스카우트 팀: Lv.${facilities.scouting.level} (높은 등급 선수 발견 확률 +${facilities.scouting.level * 8}%)

위 시설 레벨에 따라 게임 로직(부상 회복 속도, 경험치 획득량, 수익 등)을 적용해주세요.`;

        // 내부 로직용 프롬프트 (긴 지시문) - API로만 전송
        const fullPrompt = `✨ 신생 구단 창단 (11구단)을 선택했습니다. 

**[구단 정보]**
연고지: ${expansionTeamData?.city || '미정'}
구단명: ${expansionTeamData?.teamName || '미정'}
구단주 유형: ${ownerTypeName}

**[난이도 설정 - 절대 변경 금지]**
난이도: ${difficultyMode} (${difficultyCode})
${difficultyConfig}

이 난이도는 게임 진행 중 절대로 변경할 수 없습니다. 위 설정값을 정확히 적용하여 신생 구단 창단 프로세스를 시작해주세요.

${facilityInfo}`;
        
        // InitialData를 포함한 전체 프롬프트 생성
        const fullPromptWithData = `${KBO_INITIAL_DATA}

${fullPrompt}

[SYSTEM INSTRUCTION: INITIALIZATION OVERRIDE]
1. The user has ALREADY selected the difficulty and team via the UI.
2. DO NOT output "Welcome" text or ask for difficulty.
3. DO NOT ask "어떤 난이도로 시작하시겠습니까?" or "난이도를 선택해주세요" or similar questions.
4. IMMEDIATELY assume the role of the GM/Assistant.
5. START THE GAME IMMEDIATELY with the <STATUS> dashboard for 2026-01-01 (2026년 1월 1주차), and <NEWS> tag right now.
6. Output <OPTIONS> tag with game action buttons (일정 진행, 로스터 확인, etc.) immediately.
7. Start directly with the game simulation. Skip all introductory steps and go directly to the main game screen.`;
        
        // [Cost Optimization] 모델 초기화 후 팀 정보 전송하여 GM Office Report 생성
        // 이미 모델이 있으면 재사용 (중복 호출 방지)
        const initializeModel = async () => {
          if (!modelRef.current) {
            modelRef.current = await getGeminiModel(apiKey);
            setIsModelReady(true);
          } else {
            console.log('[Cost Optimization] 기존 모델 인스턴스 재사용 (신생 구단 초기화)');
          }
        };
        
        initializeModel()
          .then(() => {
            // handleSend를 직접 호출 (handleSendRef 대신)
            // handleSend는 이미 정의되어 있으므로 직접 호출 가능
            console.log('[초기화] 모델 준비 완료, handleSend 호출 준비...', { 
              messageLength: fullPromptWithData.length,
              isLoadingRef: isLoadingRef.current 
            });
            
            // isLoadingRef를 명시적으로 false로 설정하여 handleSend가 실행되도록 함
            isLoadingRef.current = false;
            
            setTimeout(() => {
              try {
                console.log('[초기화] handleSend 호출 시도...', { 
                  messageLength: fullPromptWithData.length,
                  isLoadingRef: isLoadingRef.current 
                });
                // handleSend를 직접 호출
                handleSend(fullPromptWithData, { hideFromUI: true });
              } catch (error) {
                console.error('[초기화] handleSend 호출 실패:', error);
                setIsLoading(false);
                isInitializingRef.current = false;
                alert('게임 초기화에 실패했습니다. 페이지를 새로고침해주세요.');
              }
            }, 300);
          })
          .catch((error) => {
            console.error('게임 초기화 실패:', error);
            alert('게임 초기화에 실패했습니다. 다시 시도해주세요.');
            setIsLoading(false);
            isInitializingRef.current = false;
          });
      } else {
        // 일반 구단인 경우
        const difficultyMode = difficulty === 'EASY' ? '이지 모드' : difficulty === 'NORMAL' ? '노말 모드' : '헬 모드';
        const difficultyCode = difficulty;
        const difficultyConfig = difficulty === 'EASY' 
          ? '초기 자금: 80.0억 원, 샐러리캡: 250억 원'
          : difficulty === 'NORMAL'
          ? '초기 자금: 30.0억 원, 샐러리캡: 137억 원'
          : '초기 자금: 10.0억 원, 샐러리캡: 100억 원';
        
        const facilityInfo = `**[현재 시설 레벨]**
- 훈련장: Lv.${facilities.training.level} (경험치 획득량 +${facilities.training.level * 10}%)
- 메디컬 센터: Lv.${facilities.medical.level} (부상 확률 -${facilities.medical.level * 5}%, 회복 속도 +${facilities.medical.level * 10}%)
- 마케팅 팀: Lv.${facilities.marketing.level} (경기당 수익 +${facilities.marketing.level * 5}%, 후원금 +${facilities.marketing.level * 3}%)
- 스카우트 팀: Lv.${facilities.scouting.level} (높은 등급 선수 발견 확률 +${facilities.scouting.level * 8}%)

위 시설 레벨에 따라 게임 로직(부상 회복 속도, 경험치 획득량, 수익 등)을 적용해주세요.`;

        // 내부 로직용 프롬프트 (긴 지시문) - API로만 전송
        const fullPrompt = `${selectedTeam.fullName}을 선택했습니다. 

**[난이도 설정 - 절대 변경 금지]**
난이도: ${difficultyMode} (${difficultyCode})
${difficultyConfig}

이 난이도는 게임 진행 중 절대로 변경할 수 없습니다. 위 설정값을 정확히 적용하여 Step 3: 데이터 초기화 및 게임을 시작해주세요.

${facilityInfo}`;
        
        // InitialData를 포함한 전체 프롬프트 생성
        const fullPromptWithData = `${KBO_INITIAL_DATA}

${fullPrompt}

[SYSTEM INSTRUCTION: INITIALIZATION OVERRIDE]
1. The user has ALREADY selected the difficulty and team via the UI.
2. DO NOT output "Welcome" text or ask for difficulty.
3. DO NOT ask "어떤 난이도로 시작하시겠습니까?" or "난이도를 선택해주세요" or similar questions.
4. IMMEDIATELY assume the role of the GM/Assistant.
5. START THE GAME IMMEDIATELY with the <STATUS> dashboard for 2026-01-01 (2026년 1월 1주차), and <NEWS> tag right now.
6. Output <OPTIONS> tag with game action buttons (일정 진행, 로스터 확인, etc.) immediately.
7. Start directly with the game simulation. Skip all introductory steps and go directly to the main game screen.`;
        
        // [Cost Optimization] 모델 초기화 후 팀 정보 전송하여 GM Office Report 생성
        // 이미 모델이 있으면 재사용 (중복 호출 방지)
        const initializeModel = async () => {
          if (!modelRef.current) {
            modelRef.current = await getGeminiModel(apiKey);
            setIsModelReady(true);
          } else {
            console.log('[Cost Optimization] 기존 모델 인스턴스 재사용 (일반 구단 초기화)');
          }
        };
        
        initializeModel()
          .then(() => {
            // handleSend를 직접 호출 (handleSendRef 대신)
            // handleSend는 이미 정의되어 있으므로 직접 호출 가능
            console.log('[초기화] 모델 준비 완료, handleSend 호출 준비...', { 
              messageLength: fullPromptWithData.length,
              isLoadingRef: isLoadingRef.current 
            });
            
            // isLoadingRef를 명시적으로 false로 설정하여 handleSend가 실행되도록 함
            isLoadingRef.current = false;
            
            setTimeout(() => {
              try {
                console.log('[초기화] handleSend 호출 시도...', { 
                  messageLength: fullPromptWithData.length,
                  isLoadingRef: isLoadingRef.current 
                });
                // handleSend를 직접 호출
                handleSend(fullPromptWithData, { hideFromUI: true });
              } catch (error) {
                console.error('[초기화] handleSend 호출 실패:', error);
                setIsLoading(false);
                isInitializingRef.current = false;
                alert('게임 초기화에 실패했습니다. 페이지를 새로고침해주세요.');
              }
            }, 300);
          })
          .catch((error) => {
            console.error('게임 초기화 실패:', error);
            alert('게임 초기화에 실패했습니다. 다시 시도해주세요.');
            setIsLoading(false);
            isInitializingRef.current = false;
          });
      }
      
      // [NOTE] setIsLoading(false)는 handleSend 내부에서 관리되므로 여기서는 제거
      // 모델 초기화와 메시지 전송이 비동기로 실행되므로, 로딩 상태는 handleSend에서 관리
    }
    // handleSend가 정의된 후에 실행되도록 의존성 배열에 포함
    // eslint-disable-next-line react-hooks/exhaustive-deps
    
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
      
      // [Money-Validation] 자금 무결성 검증 로직 추가
      // 자금 업데이트: 시설 업그레이드 등으로 로컬에서 차감한 경우, AI 응답의 자금이 더 크면 업데이트하지 않음
      if (extractedBudget !== null && extractedBudget > 0) {
        setGameState(prev => {
          // transactionHistory의 마지막 잔액과 비교하여 검증
          const lastTransaction = transactionHistory[transactionHistory.length - 1];
          const clientCalculatedBudget = lastTransaction ? lastTransaction.balanceAfter : (prev.budget || 0);
          
          // 자금 무결성 검증
          const validation = validateBudgetIntegrity(extractedBudget!, clientCalculatedBudget);
          if (!validation.isValid && validation.warning) {
            console.warn(validation.warning);
          }
          
          // 로컬 자금이 AI 응답 자금보다 작으면 (차감이 발생한 경우) 로컬 자금 유지
          if (prev.budget !== null && prev.budget < extractedBudget!) {
            console.log('[자금 파싱] ⚠️ 로컬 자금이 더 작음 (차감 발생). 로컬 자금 유지:', prev.budget.toLocaleString('ko-KR') + '원');
            return prev;
          }
          
          // 거래 내역에 기록 (AI 응답으로 업데이트하는 경우)
          const transaction: Transaction = {
            id: generateTransactionId('text-extract'),
            date: parsed.status?.date || new Date().toISOString(),
            amount: extractedBudget! - clientCalculatedBudget, // 변동 금액
            category: 'AI_REPORT',
            description: '텍스트에서 자금 추출',
            balanceAfter: extractedBudget!,
          };
          
          // [Fix - Deduplication] 중복 체크 후 추가
          setTransactionHistory(prevHistory => {
            if (isDuplicateTransaction(transaction, prevHistory)) {
              console.warn('[Transaction] 중복 거래 내역 감지, 추가하지 않음:', transaction.id);
              return prevHistory;
            }
            return [...prevHistory, transaction];
          });
          
          // 그 외의 경우 (AI 응답이 더 작거나 같으면) AI 응답으로 업데이트
          console.log('[자금 파싱] ✅ 자금 업데이트:', extractedBudget!.toLocaleString('ko-KR') + '원');
          return { ...prev, budget: extractedBudget! };
        });
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

  // [Money-Validation] 자금 무결성 검증 로직 추가 - 초기 자금 Transaction 기록
  // 게임 시작 시 초기 자금이 설정되고 transactionHistory가 비어있을 때 초기 Transaction 기록
  useEffect(() => {
    if (gameState.budget !== null && transactionHistory.length === 0) {
      const initialBudget = getInitialBudget(difficulty);
      // 초기 자금이 설정되었고 거래 내역이 없으면 초기 Transaction 기록
      if (Math.abs(gameState.budget - initialBudget) < 10000000) { // 0.1억 이내 차이면 초기 자금으로 간주
        const initialTransaction: Transaction = {
          id: generateTransactionId('initial'),
          date: gameState.date || new Date().toISOString(),
          amount: initialBudget,
          category: 'INITIAL',
          description: `게임 시작 - ${difficulty} 모드 초기 자금`,
          balanceAfter: initialBudget,
        };
        setTransactionHistory([initialTransaction]);
      }
    }
  }, [gameState.budget, gameState.date, difficulty, transactionHistory.length]);

  // [Cost Optimization] Debounce 적용: 빠른 연속 클릭 방지
  // [Analysis] 문제점: 사용자가 빠르게 버튼을 클릭하면 연속으로 API 호출 발생
  // [Expected Savings]: 실수로 인한 중복 요청 90% 감소
  const debouncedHandleSend = useRef(
    debounce((message: string) => {
      handleSend(message);
    }, 300)
  ).current;

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoadingRef.current) {
      return; // 빈 메시지나 로딩 중이면 무시
    }
    // [Cost Optimization] Debounce된 함수 사용
    debouncedHandleSend(input);
  }, [input, debouncedHandleSend, handleSend]);

  const handleOptionClick = useCallback((value: string) => {
    playSound('click');
    
    // "다음 이벤트까지 진행" 또는 "다음 날로 진행" 같은 날짜 진행 명령인지 확인 (더 정확한 패턴 매칭)
    const dateProgressPatterns = [
      /다음\s*이벤트\s*까지\s*진행/,
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
    // [Money-Validation] 자금 무결성 검증 로직 추가
    setGameState((prev) => {
      const newState = { ...prev };
      
      if (effect.budget !== undefined && newState.budget !== null) {
        const oldBudget = newState.budget;
        newState.budget = Math.max(0, newState.budget + effect.budget);
        const change = newState.budget - oldBudget;
        
        // 자금 변동이 있으면 콘솔에 로그 (디버깅용)
        if (change !== 0) {
          console.log(`[랜덤 이벤트] 자금 변동: ${change > 0 ? '+' : ''}${(change / 100000000).toFixed(1)}억 원`);
          
          // 거래 내역에 기록
          const transaction: Transaction = {
            id: generateTransactionId('random-event'),
            date: newState.date || new Date().toISOString(),
            amount: change,
            category: 'RANDOM_EVENT',
            description: `랜덤 이벤트: ${change > 0 ? '수익' : '손실'}`,
            balanceAfter: newState.budget,
          };
          
          // [Fix - Deduplication] 중복 체크 후 추가
          setTransactionHistory(prevHistory => {
            if (isDuplicateTransaction(transaction, prevHistory)) {
              console.warn('[Transaction] 중복 거래 내역 감지, 추가하지 않음:', transaction.id);
              return prevHistory;
            }
            return [...prevHistory, transaction];
          });
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
    const definition = FACILITY_DEFINITIONS.find((f) => f.type === type);
    
    if (!definition) {
      console.error(`[시설 업그레이드] 정의를 찾을 수 없습니다: ${type}`);
      return;
    }
    
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
        // [Money-Validation] 자금 무결성 검증 로직 추가
        // 거래 내역에 기록
        const transaction: Transaction = {
          id: generateTransactionId('facility-upgrade'),
          date: gameState.date || new Date().toISOString(),
          amount: -result.cost, // 차감이므로 음수
          category: 'FACILITY_UPGRADE',
          description: `${definition.name} Lv.${facility.level} → Lv.${result.newLevel} 업그레이드`,
          balanceAfter: gameState.budget !== null ? gameState.budget - result.cost : 0,
        };
        
        // [Fix - Deduplication] 중복 체크 후 추가
        setTransactionHistory(prevHistory => {
          if (isDuplicateTransaction(transaction, prevHistory)) {
            console.warn('[Transaction] 중복 거래 내역 감지, 추가하지 않음:', transaction.id);
            return prevHistory;
          }
          return [...prevHistory, transaction];
        });
        
        // [FIX] 시설 레벨 업데이트
        setFacilities((prev) => ({
          ...prev,
          [type]: {
            ...prev[type],
            level: result.newLevel,
          },
        }));
        
        playSound('coin');
        console.log(`[시설 업그레이드] ${definition.name} Lv.${facility.level} → Lv.${result.newLevel} (비용: ${(result.cost / 100000000).toFixed(1)}억 원)`);
        
        // AI에게 시설 업그레이드 및 자금 차감 정보 전달
        const newBudget = gameState.budget !== null ? gameState.budget - result.cost : 0;
        const facilityMessage = `[시설 업그레이드 완료]

${definition.name}을(를) Lv.${facility.level}에서 Lv.${result.newLevel}로 업그레이드했습니다.

**[자금 변동]**
- 업그레이드 비용: ${(result.cost / 100000000).toFixed(1)}억 원
- 업그레이드 전 자금: ${gameState.budget !== null ? (gameState.budget / 100000000).toFixed(1) : '0.0'}억 원
- 업그레이드 후 자금: ${(newBudget / 100000000).toFixed(1)}억 원

**[시설 효과]**
${definition.effect(result.newLevel).description}

위 자금 변동을 반영하여 [STATUS] 태그에 업데이트된 자금을 표시해주세요.`;
        
        // 약간의 지연을 두어 상태 업데이트가 완료된 후 메시지 전송
        setTimeout(() => {
          if (handleSendRef.current) {
            handleSendRef.current(facilityMessage);
          }
        }, 100);
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
      readNewsCount, // 읽은 뉴스 개수도 저장
      selectedTeam: selectedTeam, // 팀 전체 정보 저장
      pendingOptions: pendingOptions, // 지시사항 버튼을 위한 옵션 저장
      difficulty: difficulty, // 난이도 저장
      transactionHistory: transactionHistory, // [Money-Validation] 자금 무결성 검증 로직 추가 - 거래 내역 저장
      currentRoster: currentRoster, // [Roster-Validation] 로스터 무결성 검사 추가 - 로스터 저장
      leagueStandings: leagueStandings, // [Sim-Engine] 경기 결과 파싱 및 전적 반영 - 리그 순위표 저장
      timestamp: new Date().toISOString(),
      metadata: {
        lastModified: Date.now(),
      },
    };
  }, [gameState, facilities, newsItems, readNewsCount, selectedTeam, pendingOptions, difficulty, transactionHistory, currentRoster, leagueStandings]);

  // [NEW] 파일로 저장 (백업)
  const handleSaveToFile = useCallback(() => {
    try {
      const saveData = getSaveData();
      
      FileStorageStrategy.exportSaveFile(saveData);
      
      playSound('success');
      alert('파일이 다운로드되었습니다!\n\n파일을 Google Drive, Dropbox 등에 업로드하면 다른 기기에서 사용할 수 있습니다.');
    } catch (e) {
      console.error('파일 저장 오류:', e);
      alert('파일 저장에 실패했습니다.');
    }
  }, [getSaveData, playSound]);

  // [NEW] 파일에서 불러오기
  const handleLoadFromFile = useCallback(() => {
    try {
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
            // [Money-Validation] 자금 무결성 검증 로직 추가 - 거래 내역 복원
            if (data.transactionHistory && Array.isArray(data.transactionHistory)) {
              setTransactionHistory(data.transactionHistory);
            }
            // [Roster-Validation] 로스터 무결성 검사 추가 - 로스터 복원
            if (data.currentRoster && Array.isArray(data.currentRoster)) {
              setCurrentRoster(data.currentRoster);
            }
            // [Sim-Engine] 경기 결과 파싱 및 전적 반영 - 리그 순위표 복원
            if (data.leagueStandings && typeof data.leagueStandings === 'object') {
              setLeagueStandings(data.leagueStandings);
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

  // 저장/불러오기 모달 열기 (통합 버튼)
  const handleSaveLoad = useCallback(() => {
    setIsSaveLoadModalOpen(true);
    playSound('click');
  }, [playSound]);

  // [SaveLoadModal] 데이터 복원 핸들러
  const handleLoadData = useCallback(async (data: GameSaveData) => {
    // 중복 호출 방지
    if (isLoadProcessingRef.current) {
      console.log('[불러오기] 이미 진행 중입니다.');
      return;
    }
    
    isLoadProcessingRef.current = true;
    
    try {
      // 필수 데이터 검증
      if (!data || typeof data !== 'object') {
        alert('저장 데이터가 올바른 형식이 아닙니다.\n\n올바른 세이브 파일을 선택해주세요.');
        isLoadProcessingRef.current = false;
        return;
      }
      
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
      
      if (!data.gameState || typeof data.gameState !== 'object') {
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
      setMessages(data.messages);
      messagesRef.current = data.messages;

      // 게임 상태 복원
      if (data.gameState) {
        const restoredGameState = {
          ...data.gameState,
          difficulty: data.gameState.difficulty || difficulty,
        };
        setGameState(restoredGameState);
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
      // [Money-Validation] 자금 무결성 검증 로직 추가 - 거래 내역 복원
      if (data.transactionHistory && Array.isArray(data.transactionHistory)) {
        setTransactionHistory(data.transactionHistory);
      }
      // [Roster-Validation] 로스터 무결성 검사 추가 - 로스터 복원
      if (data.currentRoster && Array.isArray(data.currentRoster)) {
        setCurrentRoster(data.currentRoster);
      }
      // [Sim-Engine] 경기 결과 파싱 및 전적 반영 - 리그 순위표 복원
      if (data.leagueStandings && typeof data.leagueStandings === 'object') {
        setLeagueStandings(data.leagueStandings);
      }

      // **핵심**: 모델에 메시지 히스토리 복원하여 API 연결 유지
      if (data.messages.length > 0) {
        const history = data.messages.map((msg: Message) => ({
          role: msg.isUser ? 'user' : 'model',
          parts: [{ text: msg.text }],
        }));

        // 첫 번째 메시지가 model이면 제거 (API 규칙 준수)
        const safeHistory = history[0]?.role === 'model'
          ? history.slice(1)
          : history;

        chatInstanceRef.current = modelRef.current.startChat({
          history: safeHistory,
        });
      }

      playSound('success');
      isLoadProcessingRef.current = false;
    } catch (error) {
      console.error('[ChatInterface] 데이터 복원 오류:', error);
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류';
      alert(`게임 데이터 복원에 실패했습니다.\n\n오류: ${errorMessage}`);
      isLoadProcessingRef.current = false;
    }
  }, [difficulty, playSound]);

  // [DEPRECATED] 기존 불러오기 기능 (하위 호환성 유지)
  const handleLoadOld = useCallback(async () => {
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
      // [Money-Validation] 자금 무결성 검증 로직 추가 - 거래 내역 복원
      if (parsed.transactionHistory && Array.isArray(parsed.transactionHistory)) {
        setTransactionHistory(parsed.transactionHistory);
      }
      // [Roster-Validation] 로스터 무결성 검사 추가 - 로스터 복원
      if (parsed.currentRoster && Array.isArray(parsed.currentRoster)) {
        setCurrentRoster(parsed.currentRoster);
      }
      // [Sim-Engine] 경기 결과 파싱 및 전적 반영 - 리그 순위표 복원
      if (parsed.leagueStandings && typeof parsed.leagueStandings === 'object') {
        setLeagueStandings(parsed.leagueStandings);
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

  // 옵션 모달 닫기 핸들러
  const handleOptionsModalClose = () => {
    setIsOptionsModalOpen(false);
    // 모달을 닫아도 옵션은 유지 (플로팅 버튼으로 다시 열 수 있음)
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#Fdfbf7] overflow-hidden">
      {/* 헤더 - 상태바 */}
      <div className="flex-none">
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
          onSaveLoadClick={handleSaveLoad}
          onStandingsClick={() => {
            setIsStandingsOpen(true);
            playSound('click');
          }}
          onTransactionClick={() => {
            setIsTransactionOpen(true);
            playSound('click');
          }}
          onResultClick={() => {
            setIsResultOpen(true);
            playSound('click');
          }}
        />
      </div>

      {/* 메인 - 채팅 영역 */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 lg:py-6 overscroll-contain min-h-0">
        <div className="max-w-5xl mx-auto w-full">
          {messages.map((msg, idx) => (
            <MessageBubble
              key={idx}
              message={msg.text}
              isUser={msg.isUser}
              isStreaming={msg.isStreaming}
            />
          ))}
          {/* 로딩 스켈레톤 - 내용이 나오기 전까지 표시 */}
          {isLoading && !hasStartedStreaming && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4"
            >
              <div className="bg-gradient-to-br from-white to-gray-50/50 border-2 border-baseball-green/20 rounded-xl shadow-lg overflow-hidden">
                {/* 게임스러운 헤더 스켈레톤 */}
                <div className="bg-gradient-to-r from-baseball-green/50 to-[#0a3528]/50 border-b-2 border-baseball-gold/30 px-4 py-3 flex items-center gap-2">
                  <motion.div
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-5 h-5 bg-white/30 rounded"
                  ></motion.div>
                  <motion.div
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                    className="h-4 w-32 bg-white/30 rounded"
                  ></motion.div>
                  <motion.div
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
                    className="h-4 w-16 bg-white/30 rounded ml-auto"
                  ></motion.div>
                </div>
                {/* 본문 스켈레톤 */}
                <div className="px-4 py-4 space-y-3">
                  <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="h-4 bg-gray-200/50 rounded w-full"
                  ></motion.div>
                  <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.1 }}
                    className="h-4 bg-gray-200/50 rounded w-5/6"
                  ></motion.div>
                  <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                    className="h-4 bg-gray-200/50 rounded w-4/5"
                  ></motion.div>
                  <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
                    className="h-4 bg-gray-200/50 rounded w-full"
                  ></motion.div>
                  <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
                    className="h-4 bg-gray-200/50 rounded w-3/4"
                  ></motion.div>
                  <motion.div
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
                    className="mt-4 h-32 bg-gray-200/30 rounded"
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 푸터 - 입력 영역 */}
      <div className="flex-none border-t-2 border-baseball-green/20 bg-gradient-to-b from-gray-50 to-white shadow-2xl z-40 pb-[env(safe-area-inset-bottom)] mobile-input-container">
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

      {/* [UX Optimization] 로딩 오버레이 제거 - 스트리밍 텍스트가 자연스럽게 나타나도록 */}
      {/* isLoading은 입력 필드 비활성화에만 사용 */}
      {/* <LoadingOverlay 
        isLoading={isLoading}
        statusText={loadingStatusText}
      /> */}

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

      {/* 거래 내역 모달 */}
      <TransactionModal
        isOpen={isTransactionOpen}
        onClose={() => setIsTransactionOpen(false)}
        transactions={transactionHistory}
      />

      {/* 리그 순위표 모달 */}
      <StandingsModal
        isOpen={isStandingsOpen}
        onClose={() => setIsStandingsOpen(false)}
        standings={leagueStandings}
        myTeam={selectedTeam.id === 'expansion' 
          ? (expansionTeamData?.teamName || selectedTeam.fullName)
          : (gameState.teamName || selectedTeam.fullName)}
      />

      {/* 경기 결과 모달 */}
      <GameResultModal
        isOpen={isResultOpen}
        onClose={() => setIsResultOpen(false)}
        lastGameResult={lastGameResult}
      />

      <SaveLoadModal
        isOpen={isSaveLoadModalOpen}
        onClose={() => setIsSaveLoadModalOpen(false)}
        onLoad={handleLoadData}
        getSaveData={getSaveData}
      />

    </div>
  );
}
