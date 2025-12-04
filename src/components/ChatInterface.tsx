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
import { useToast } from '../context/ToastContext';
import { parseAIResponse, extractDate, extractBudget, GamePhase, GUIEvent, RandomEvent, FacilityType, FacilityState, StatusInfo, Transaction, validateBudgetIntegrity, Player, validateRosterIntegrity, extractPlayerNamesFromInitialData, GameResult, TeamRecord } from '../lib/utils';
import { getInitialBudget } from '../constants/GameConfig';
import { Team } from '../constants/TeamData';
import { KBO_INITIAL_DATA } from '../constants/prompts';
import { useSound } from '../hooks/useSound';
import { RANDOM_EVENTS, RANDOM_EVENT_CHANCE } from '../constants/GameEvents';
import { createInitialFacilityState, FACILITY_DEFINITIONS } from '../constants/Facilities';
import { Difficulty } from '../constants/GameConfig';

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
  const [negotiationPlayer, setNegotiationPlayer] = useState<string | null>(null);
  const [isModelReady, setIsModelReady] = useState(false);
  const [randomEvent, setRandomEvent] = useState<RandomEvent | null>(null);
  const [isRandomEventOpen, setIsRandomEventOpen] = useState(false);
  const [isFacilityOpen, setIsFacilityOpen] = useState(false);
  const [facilities, setFacilities] = useState<FacilityState>(createInitialFacilityState());
  const [loadingStatusText, setLoadingStatusText] = useState<string | undefined>(undefined);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [pendingOptions, setPendingOptions] = useState<Array<{ label: string; value: string; style?: 'primary' | 'secondary' | 'danger' }>>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const [readNewsCount, setReadNewsCount] = useState(0); // 읽은 뉴스 개수 추적
  const [hasCheckedLoadGame, setHasCheckedLoadGame] = useState(false); // 불러오기 시 옵션 체크 플래그
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
  const [isResultOpen, setIsResultOpen] = useState(false);
  const { showToast } = useToast(); // Toast 알림 훅
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
        // [CRITICAL FIX] history 생성 시 주의:
        // 1. initializeGameWithData 이후에는 messagesRef가 초기화되어 있으므로 빈 배열로 시작
        // 2. 첫 번째 메시지는 반드시 user role이어야 함 (API 규칙)
        // 3. messagesRef.current에 AI 응답이 먼저 있으면 제거하고 user 메시지부터 시작
        const currentMessages = messagesRef.current;
        
        // AI 응답이 첫 번째로 오는 경우 제거 (API 규칙 위반 방지)
        const filteredMessages = currentMessages.length > 0 && !currentMessages[0].isUser
          ? currentMessages.filter((_, idx) => idx === 0 ? false : true) // 첫 번째 AI 메시지 제거
          : currentMessages;
        
        // 사용자 메시지를 제외한 히스토리 생성 (방금 추가한 사용자 메시지 제외)
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
                      id: `ai-report-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                      date: parsed.status!.date || new Date().toISOString(),
                      amount: aiReportedBudget - clientCalculatedBudget, // 변동 금액
                      category: 'AI_REPORT',
                      description: `AI 응답: ${parsed.status.budget}`,
                      balanceAfter: aiReportedBudget,
                    };
                    
                    setTransactionHistory(prevHistory => [...prevHistory, transaction]);
                    
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
                  id: `finance-update-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                  date: parsed.status?.date || new Date().toISOString(),
                  amount: amount,
                  category: 'FINANCE_UPDATE',
                  description: reason,
                  balanceAfter: newBudget,
                };
                
                setTransactionHistory(prevHistory => [...prevHistory, transaction]);
                
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
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : String(error) || '알 수 없는 오류';
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
      
      // 로딩 시작
      setIsLoading(true);
      setLoadingStatusText(undefined); // 롤링 텍스트 사용
      
      // [FIX] Force Empty History to prevent API Error
      // initializeGameWithData 호출 (팀 정보 및 난이도 포함)
      // 주의: messages 상태를 인자로 넘기지 않음 (API 규칙 준수)
      // initializeGameWithData 내부에서 history: []로 빈 세션을 강제로 시작하므로,
      // 이전 UI에 있던 텍스트(Model 응답)는 절대 전달되지 않음
      // 함수 시그니처에 _ignoredHistory가 있더라도 무시하고 빈 배열로 시작함
      initializeGameWithData(apiKey, difficulty, selectedTeam)
        .then((initialResponse) => {
          // 초기 응답을 첫 메시지로 추가
          setMessages([{ text: initialResponse, isUser: false }]);
          messagesRef.current = [{ text: initialResponse, isUser: false }];
          
          // [CRITICAL FIX] initializeGameWithData는 독립적인 세션이므로
          // 이후 handleSend에서 사용할 chatInstanceRef를 null로 유지하여
          // 다음 메시지 전송 시 새 세션을 시작하도록 함
          // (또는 initializeGameWithData의 세션을 재사용하려면 별도 관리 필요)
          // 현재는 null로 두어 handleSend에서 새로 생성하도록 함
          
          // 신생 구단인 경우 추가 정보 전송
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

            const teamMessage = `✨ 신생 구단 창단 (11구단)을 선택했습니다. 

**[구단 정보]**
연고지: ${expansionTeamData?.city || '미정'}
구단명: ${expansionTeamData?.teamName || '미정'}
구단주 유형: ${ownerTypeName}

**[난이도 설정 - 절대 변경 금지]**
난이도: ${difficultyMode} (${difficultyCode})
${difficultyConfig}

이 난이도는 게임 진행 중 절대로 변경할 수 없습니다. 위 설정값을 정확히 적용하여 신생 구단 창단 프로세스를 시작해주세요.

${facilityInfo}`;
            
            setTimeout(() => {
              if (handleSendRef.current) {
                handleSendRef.current(teamMessage);
              }
            }, 500);
          } else {
            // 일반 구단인 경우 난이도 정보만 전송
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

            const teamMessage = `${selectedTeam.fullName}을 선택했습니다. 

**[난이도 설정 - 절대 변경 금지]**
난이도: ${difficultyMode} (${difficultyCode})
${difficultyConfig}

이 난이도는 게임 진행 중 절대로 변경할 수 없습니다. 위 설정값을 정확히 적용하여 Step 3: 데이터 초기화 및 게임을 시작해주세요.

${facilityInfo}`;
            
            setTimeout(() => {
              if (handleSendRef.current) {
                handleSendRef.current(teamMessage);
              }
            }, 500);
          }
          
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('게임 초기화 실패:', error);
          alert('게임 초기화에 실패했습니다. 다시 시도해주세요.');
          setIsLoading(false);
          isInitializingRef.current = false;
        });
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
            id: `text-extract-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            date: parsed.status?.date || new Date().toISOString(),
            amount: extractedBudget! - clientCalculatedBudget, // 변동 금액
            category: 'AI_REPORT',
            description: '텍스트에서 자금 추출',
            balanceAfter: extractedBudget!,
          };
          
          setTransactionHistory(prevHistory => [...prevHistory, transaction]);
          
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
          id: `initial-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
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

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  }, [handleSend, input]);

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
            id: `random-event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            date: newState.date || new Date().toISOString(),
            amount: change,
            category: 'RANDOM_EVENT',
            description: `랜덤 이벤트: ${change > 0 ? '수익' : '손실'}`,
            balanceAfter: newState.budget,
          };
          
          setTransactionHistory(prevHistory => [...prevHistory, transaction]);
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
    
    const newBudget = gameState.budget - upgradeCost;
    const newLevel = facility.level + 1;
    
    // [Money-Validation] 자금 무결성 검증 로직 추가
    // 거래 내역에 기록
    const transaction: Transaction = {
      id: `facility-upgrade-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      date: gameState.date || new Date().toISOString(),
      amount: -upgradeCost, // 차감이므로 음수
      category: 'FACILITY_UPGRADE',
      description: `${definition.name} Lv.${facility.level} → Lv.${newLevel} 업그레이드`,
      balanceAfter: newBudget,
    };
    
    setTransactionHistory(prevHistory => [...prevHistory, transaction]);
    
    // 로컬 상태 업데이트
    setGameState((prev) => ({
      ...prev,
      budget: newBudget,
    }));
    
    setFacilities((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        level: newLevel,
      },
    }));
    
    playSound('coin');
    console.log(`[시설 업그레이드] ${definition.name} Lv.${facility.level} → Lv.${newLevel} (비용: ${(upgradeCost / 100000000).toFixed(1)}억 원)`);
    
    // AI에게 시설 업그레이드 및 자금 차감 정보 전달
    const facilityMessage = `[시설 업그레이드 완료]

${definition.name}을(를) Lv.${facility.level}에서 Lv.${newLevel}로 업그레이드했습니다.

**[자금 변동]**
- 업그레이드 비용: ${(upgradeCost / 100000000).toFixed(1)}억 원
- 업그레이드 전 자금: ${(gameState.budget / 100000000).toFixed(1)}억 원
- 업그레이드 후 자금: ${(newBudget / 100000000).toFixed(1)}억 원

**[시설 효과]**
${definition.effect(newLevel).description}

위 자금 변동을 반영하여 [STATUS] 태그에 업데이트된 자금을 표시해주세요.`;
    
    // 약간의 지연을 두어 상태 업데이트가 완료된 후 메시지 전송
    setTimeout(() => {
      if (handleSendRef.current) {
        handleSendRef.current(facilityMessage);
      }
    }, 100);
  };

  // 저장 기능
  const handleSave = useCallback(() => {
    try {
      const saveData = {
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
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
      playSound('success');
      alert('게임이 저장되었습니다!');
    } catch (e) {
      console.error('저장 오류:', e);
      alert('저장에 실패했습니다.');
    }
  }, [gameState, facilities, newsItems, readNewsCount, selectedTeam, pendingOptions, difficulty, transactionHistory, currentRoster, leagueStandings, playSound]);

  // 불러오기 기능
  const handleLoad = useCallback(async () => {
    // 중복 호출 방지 (모바일 터치 이벤트 중복 방지)
    if (isLoadProcessingRef.current) {
      console.log('[불러오기] 이미 진행 중입니다.');
      return;
    }
    
    isLoadProcessingRef.current = true;
    
    try {
      const savedData = localStorage.getItem(SAVE_KEY);
      if (!savedData) {
        alert('저장된 게임이 없습니다.');
        isLoadProcessingRef.current = false;
        return;
      }

      const parsed = JSON.parse(savedData);
      
      if (!parsed.messages || !Array.isArray(parsed.messages)) {
        alert('저장 데이터가 손상되었습니다.');
        return;
      }

      // 모델이 준비되지 않았으면 대기
      if (!modelRef.current) {
        alert('API 연결을 기다리는 중입니다. 잠시 후 다시 시도해주세요.');
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
    } catch (e) {
      console.error('불러오기 오류:', e);
      alert('불러오기에 실패했습니다.');
    } finally {
      // 중복 방지 플래그 해제 (약간의 지연을 두어 상태 업데이트 완료 보장)
      setTimeout(() => {
        isLoadProcessingRef.current = false;
      }, 500);
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
      <div className="flex-none pt-[env(safe-area-inset-top)]">
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
          onSaveClick={handleSave}
          onLoadClick={handleLoad}
        />
      </div>

      {/* 경영 대시보드 툴바 */}
      <div className="flex-none bg-gradient-to-r from-gray-50 to-white border-b-2 border-baseball-green/20 shadow-sm z-30">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-3.5">
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
            {/* 순위표 버튼 */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsStandingsOpen(true);
                playSound('click');
              }}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-baseball-green/10 to-baseball-green/5 hover:from-baseball-green/20 hover:to-baseball-green/10 active:from-baseball-green/30 active:to-baseball-green/15 border-2 border-baseball-green/30 rounded-lg transition-all shadow-sm hover:shadow-md touch-manipulation min-h-[44px] min-w-[44px] flex-shrink-0"
              title="리그 순위표"
            >
              <Trophy className="w-5 h-5 sm:w-5 sm:h-5 text-baseball-green flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-baseball-green hidden sm:inline whitespace-nowrap">순위표</span>
            </motion.button>

            {/* 장부 버튼 */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsTransactionOpen(true);
                playSound('click');
              }}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-baseball-green/10 to-baseball-green/5 hover:from-baseball-green/20 hover:to-baseball-green/10 active:from-baseball-green/30 active:to-baseball-green/15 border-2 border-baseball-green/30 rounded-lg transition-all shadow-sm hover:shadow-md touch-manipulation min-h-[44px] min-w-[44px] flex-shrink-0"
              title="거래 내역"
            >
              <Receipt className="w-5 h-5 sm:w-5 sm:h-5 text-baseball-green flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-baseball-green hidden sm:inline whitespace-nowrap">장부</span>
            </motion.button>

            {/* 최근 경기 버튼 */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsResultOpen(true);
                playSound('click');
              }}
              className="flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-baseball-green/10 to-baseball-green/5 hover:from-baseball-green/20 hover:to-baseball-green/10 active:from-baseball-green/30 active:to-baseball-green/15 border-2 border-baseball-green/30 rounded-lg transition-all shadow-sm hover:shadow-md touch-manipulation min-h-[44px] min-w-[44px] flex-shrink-0"
              title="최근 경기 결과"
            >
              <MonitorPlay className="w-5 h-5 sm:w-5 sm:h-5 text-baseball-green flex-shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-baseball-green hidden sm:inline whitespace-nowrap">경기 결과</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* 메인 - 채팅 영역 */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 lg:py-6 overscroll-contain min-h-0">
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
      <div className="flex-none border-t-2 border-baseball-green/20 bg-gradient-to-b from-gray-50 to-white shadow-2xl z-40 pb-[env(safe-area-inset-bottom)]">
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
              className="flex-1 px-3 sm:px-4 md:px-5 py-3 sm:py-3.5 text-base sm:text-base border-2 border-baseball-green/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-baseball-green/50 focus:border-baseball-green disabled:bg-gray-100 font-sans shadow-sm focus:shadow-md transition-all touch-manipulation min-h-[44px]"
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

    </div>
  );
}
