import { processNewsItems } from './newsUtils';
import { ROSTER_DATA } from '../constants/prompts/InitialData';

export interface ParsedMessage {
  text: string;
  options: Array<{ label: string; value: string }>;
  guiEvent?: GUIEvent;
  status?: StatusInfo;
  news?: NewsItem[];
  financeUpdate?: FinanceUpdate; // FA 보상금 등 자금 변동 정보
  roster?: Player[]; // [Roster-Validation] 로스터 무결성 검사 추가 - 로스터 데이터
  gameResults?: GameResult[]; // [Sim-Engine] 경기 결과 파싱 및 전적 반영
  retirementResult?: import('../types').RetirementResult; // [Retirement] 선수 은퇴 심사 결과
}

// [Sim-Engine] 경기 결과 파싱 및 전적 반영 - 경기 결과 타입 정의
export interface GameResult {
  homeTeam: string; // 홈팀 이름 (예: "KIA", "한화")
  awayTeam: string; // 원정팀 이름
  homeScore: number; // 홈팀 점수
  awayScore: number; // 원정팀 점수
  winner: 'home' | 'away' | 'draw'; // 승자 (무승부 가능)
  isMyTeamGame?: boolean; // 우리 팀 경기 여부 (선택적)
  date?: string; // 경기 날짜 (선택적)
}

// [Sim-Engine] 경기 결과 파싱 및 전적 반영 - 팀 전적 타입 정의
export interface TeamRecord {
  wins: number; // 승수
  losses: number; // 패수
  draws: number; // 무승부 수
  gamesBehind?: number; // 게임 차 (1위와의 승차)
  winPercentage?: number; // 승률 (0.0 ~ 1.0)
  gamesPlayed: number; // 경기 수 (wins + losses + draws)
}

export interface GUIEvent {
  type: 'DRAFT' | 'FA' | 'TRADE' | 'NEGOTIATION' | 'RECRUIT';
  title?: string;
  candidates?: any[];
  data?: any;
}

export interface StatusInfo {
  date?: string;
  budget?: string;
  budgetValue?: number; // 숫자 형태의 자금 값 (억 단위)
  salaryCapUsage?: number; // 샐러리캡 소진율 (0.0 ~ 100.0)
}

export interface FinanceUpdate {
  amount: number; // 변동 금액 (원 단위, 음수면 차감, 양수면 증가)
  reason: string; // 변동 사유
}

// [Money-Validation] 자금 무결성 검증 로직 추가
export interface Transaction {
  id: string; // 고유 ID (타임스탬프 + 랜덤)
  date: string; // 거래 날짜 (게임 내 날짜 또는 ISO 문자열)
  amount: number; // 변동 금액 (원 단위, 음수면 차감, 양수면 증가)
  category: 'AI_REPORT' | 'FACILITY_UPGRADE' | 'RANDOM_EVENT' | 'FINANCE_UPDATE' | 'MANUAL_ADJUSTMENT' | 'INITIAL';
  description: string; // 거래 설명
  balanceAfter: number; // 거래 후 잔액 (원 단위)
}

// [Fix - Deduplication] 고유 ID 생성 카운터 (타임스탬프 충돌 방지)
let transactionIdCounter = 0;

/**
 * [Fix - Deduplication] 고유 거래 내역 ID 생성 함수
 * Date.now()와 랜덤 문자열, 카운터를 조합하여 고유 ID를 생성합니다.
 * @param prefix ID 접두사 (예: 'ai-report', 'finance-update')
 * @returns 고유 ID 문자열
 */
export function generateTransactionId(prefix: string): string {
  transactionIdCounter = (transactionIdCounter + 1) % 1000000; // 100만으로 나머지 연산하여 오버플로우 방지
  const timestamp = Date.now();
  const performanceTime = typeof performance !== 'undefined' ? performance.now() : 0;
  const random = Math.random().toString(36).substr(2, 9);
  return `${prefix}-${timestamp}-${performanceTime.toFixed(3)}-${transactionIdCounter}-${random}`;
}

/**
 * [Fix - Deduplication] 거래 내역 중복 체크 함수
 * 동일한 거래 내역이 이미 존재하는지 확인합니다.
 * @param transaction 확인할 거래 내역
 * @param existingTransactions 기존 거래 내역 배열
 * @returns 중복 여부 (true: 중복, false: 고유)
 */
export function isDuplicateTransaction(
  transaction: Transaction,
  existingTransactions: Transaction[]
): boolean {
  if (!transaction || !existingTransactions || existingTransactions.length === 0) {
    return false;
  }

  // 1. ID로 중복 체크 (가장 정확)
  if (transaction.id) {
    const duplicateById = existingTransactions.some(t => t.id === transaction.id);
    if (duplicateById) {
      console.warn(`[Transaction Deduplication] ID 중복 감지: ${transaction.id}`);
      return true;
    }
  }

  // 2. 내용 기반 중복 체크 (ID가 없거나 충돌하는 경우)
  // date, amount, description, balanceAfter가 모두 같으면 중복으로 간주
  const duplicateByContent = existingTransactions.some(t => {
    const dateMatch = t.date === transaction.date;
    const amountMatch = Math.abs(t.amount - transaction.amount) < 1; // 1원 이내 차이는 동일 금액으로 간주
    const descriptionMatch = t.description === transaction.description;
    const balanceMatch = Math.abs(t.balanceAfter - transaction.balanceAfter) < 1; // 1원 이내 차이는 동일 잔액으로 간주
    const categoryMatch = t.category === transaction.category;

    if (dateMatch && amountMatch && descriptionMatch && balanceMatch && categoryMatch) {
      console.warn(
        `[Transaction Deduplication] 내용 중복 감지:\n` +
        `  날짜: ${transaction.date}\n` +
        `  금액: ${transaction.amount}\n` +
        `  설명: ${transaction.description}\n` +
        `  잔액: ${transaction.balanceAfter}`
      );
      return true;
    }
    return false;
  });

  return duplicateByContent;
}

/**
 * [Fix - Deduplication] 거래 내역 배열에서 중복 제거
 * @param transactions 거래 내역 배열
 * @returns 중복이 제거된 거래 내역 배열
 */
export function deduplicateTransactions(transactions: Transaction[]): Transaction[] {
  if (!transactions || transactions.length === 0) {
    return [];
  }

  const seen = new Map<string, Transaction>();
  const uniqueTransactions: Transaction[] = [];

  for (const transaction of transactions) {
    // ID 기반 중복 체크
    if (transaction.id && seen.has(transaction.id)) {
      console.warn(`[Transaction Deduplication] ID 중복 제거: ${transaction.id}`);
      continue;
    }

    // 내용 기반 중복 체크 (ID가 없는 경우)
    const contentKey = `${transaction.date}|${transaction.amount}|${transaction.description}|${transaction.balanceAfter}|${transaction.category}`;
    if (seen.has(contentKey)) {
      console.warn(`[Transaction Deduplication] 내용 중복 제거: ${contentKey}`);
      continue;
    }

    // 고유한 거래 내역으로 확인
    if (transaction.id) {
      seen.set(transaction.id, transaction);
    }
    seen.set(contentKey, transaction);
    uniqueTransactions.push(transaction);
  }

  const removedCount = transactions.length - uniqueTransactions.length;
  if (removedCount > 0) {
    console.log(`[Transaction Deduplication] ${removedCount}개의 중복 거래 내역이 제거되었습니다.`);
  }

  return uniqueTransactions;
}

/**
 * [Money-Validation] 자금 무결성 검증 함수
 * AI 응답에서 파싱된 자금과 클라이언트 누적 자금을 비교하여 오차를 검증합니다.
 * @param aiReportedBudget AI가 보고한 자금 (원 단위)
 * @param clientCalculatedBudget 클라이언트가 계산한 누적 자금 (원 단위)
 * @param tolerance 허용 오차 범위 (원 단위, 기본값: 0.1억 = 10,000,000원)
 * @returns 검증 결과 { isValid: boolean, difference: number, warning?: string }
 */
export function validateBudgetIntegrity(
  aiReportedBudget: number,
  clientCalculatedBudget: number,
  tolerance: number = 10000000 // 0.1억 = 10,000,000원
): { isValid: boolean; difference: number; warning?: string } {
  const difference = Math.abs(aiReportedBudget - clientCalculatedBudget);
  const isValid = difference <= tolerance;
  
  if (!isValid) {
    const differenceInHundredMillion = (difference / 100000000).toFixed(2);
    const aiInHundredMillion = (aiReportedBudget / 100000000).toFixed(2);
    const clientInHundredMillion = (clientCalculatedBudget / 100000000).toFixed(2);
    
    const warning = `[자금 무결성 경고] AI 보고 자금과 클라이언트 누적 자금이 불일치합니다.
    - AI 보고 자금: ${aiInHundredMillion}억 원
    - 클라이언트 누적 자금: ${clientInHundredMillion}억 원
    - 차이: ${differenceInHundredMillion}억 원 (허용 범위: ${(tolerance / 100000000).toFixed(2)}억 원)`;
    
    return { isValid: false, difference, warning };
  }
  
  return { isValid: true, difference };
}

/**
 * [Sim-Engine] 경기 결과 파싱 및 전적 반영
 * AI 응답에서 <GAME_RESULTS> 태그를 파싱하여 경기 결과 배열을 반환합니다.
 * @param text AI 응답 텍스트
 * @returns 파싱된 경기 결과 배열 (파싱 실패 시 빈 배열)
 */
export function parseGameResults(text: string): GameResult[] {
  try {
    // <GAME_RESULTS> 태그 찾기
    const gameResultsRegex = /<GAME_RESULTS>\s*(\[[\s\S]*?\])\s*<\/GAME_RESULTS>/gs;
    const match = text.match(gameResultsRegex);
    
    if (!match || match.length === 0) {
      return [];
    }

    // 첫 번째 매치에서 JSON 배열 추출
    const jsonMatch = match[0].match(/<GAME_RESULTS>\s*(\[[\s\S]*?\])\s*<\/GAME_RESULTS>/s);
    if (!jsonMatch || !jsonMatch[1]) {
      return [];
    }

    // JSON 파싱
    const resultsArray = JSON.parse(jsonMatch[1]);
    
    if (!Array.isArray(resultsArray)) {
      console.error('[Sim-Engine] GAME_RESULTS 파싱 오류: 배열이 아닙니다.');
      return [];
    }

    // GameResult 형식으로 변환
    const gameResults: GameResult[] = resultsArray.map((result: any) => {
      // 다양한 필드명 지원 (home/homeTeam, away/awayTeam, h_score/homeScore 등)
      const homeTeam = result.home || result.homeTeam || '';
      const awayTeam = result.away || result.awayTeam || '';
      const homeScore = typeof result.h_score === 'number' 
        ? result.h_score 
        : (typeof result.homeScore === 'number' ? result.homeScore : parseInt(result.h_score || result.homeScore || '0'));
      const awayScore = typeof result.a_score === 'number'
        ? result.a_score
        : (typeof result.awayScore === 'number' ? result.awayScore : parseInt(result.a_score || result.awayScore || '0'));

      // 승자 결정
      let winner: 'home' | 'away' | 'draw';
      if (homeScore > awayScore) {
        winner = 'home';
      } else if (awayScore > homeScore) {
        winner = 'away';
      } else {
        winner = 'draw';
      }

      return {
        homeTeam,
        awayTeam,
        homeScore: isNaN(homeScore) ? 0 : homeScore,
        awayScore: isNaN(awayScore) ? 0 : awayScore,
        winner,
        date: result.date,
        isMyTeamGame: result.isMyTeamGame,
      };
    }).filter((result: GameResult) => {
      // 필수 필드 검증
      return result.homeTeam && result.awayTeam;
    });

    return gameResults;
  } catch (error) {
    console.error('[Sim-Engine] GAME_RESULTS 파싱 오류:', error);
    return [];
  }
}

/**
 * [Roster-Validation] InitialData.ts에서 선수 이름 추출 함수
 * KBO_INITIAL_DATA 문자열에서 모든 선수 이름을 추출하여 Set으로 반환합니다.
 * @param initialDataString KBO_INITIAL_DATA 문자열
 * @param teamName 검증할 팀 이름 (선택적, 특정 팀만 추출)
 * @returns 선수 이름 Set (예: "류현진", "문동주", "엄상백" 등)
 */
export function extractPlayerNamesFromInitialData(
  initialDataString: string,
  teamName?: string
): Set<string> {
  const playerNames = new Set<string>();
  
  // 팀 섹션 찾기 (특정 팀만 검색하는 경우)
  let searchText = initialDataString;
  if (teamName) {
    // InitialData.ts 형식: "### **1. KT 위즈 (KT Wiz)**" 또는 "### **3. 한화 이글스 (Hanwha Eagles)**"
    // 팀 이름만으로 매칭 (괄호 안의 영어 이름은 무시)
    // 예: "KT 위즈" 또는 "한화 이글스" 등
    const escapedTeamName = teamName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const teamRegex = new RegExp(`###\\s*\\*\\*\\d+\\.\\s*${escapedTeamName}[\\s\\S]*?(?=###|$)`, 'i');
    const teamMatch = searchText.match(teamRegex);
    if (teamMatch) {
      searchText = teamMatch[0];
    } else {
      // 매칭 실패 시 전체 데이터에서 검색 (디버깅용)
      console.warn(`[Roster-Validation] 팀 이름 "${teamName}"을 InitialData.ts에서 찾을 수 없습니다. 전체 데이터에서 검색합니다.`);
    }
  }
  
  // 투수진에서 선수 이름 추출: POS,NAME,HAND,VEL,STF,MOV,CTL,STA,NOTE 형식
  // 예: "선발,류현진 (39),좌투,138-143,45,60,80,60,괴물"
  const pitcherRegex = /^[^,]+,\s*([^(]+)\s*\(/gm;
  let match;
  while ((match = pitcherRegex.exec(searchText)) !== null) {
    const name = match[1].trim();
    if (name && name.length > 0) {
      playerNames.add(name);
    }
  }
  
  // 타자진에서 선수 이름 추출: DIV,POS,HAND,NAME,CON,GAP,POW,EYE,RUN,FLD,STATS,SAL,NOTE 형식
  // 예: "1군,포수,우타,최재훈(37),55,45,35,65,35,60,주전 / .286 AVG /  1 HR /  46 BB,-,-"
  const batterRegex = /^[^,]+,[^,]+,[^,]+,\s*([^(]+)\s*\(/gm;
  while ((match = batterRegex.exec(searchText)) !== null) {
    const name = match[1].trim();
    if (name && name.length > 0) {
      playerNames.add(name);
    }
  }
  
  return playerNames;
}

// [FIX] 로스터 데이터 완결성 보장 - 최소 선수 수 상수
const MIN_PITCHER_COUNT = 20; // 최소 투수 수 (1군 + 2군 합계)
const MIN_BATTER_COUNT = 30; // 최소 타자 수 (1군 + 2군 합계)
const MIN_TOTAL_ROSTER_COUNT = 50; // 최소 전체 로스터 수

/**
 * [Roster-Validation] 로스터 무결성 검사 추가
 * AI 응답에서 파싱된 로스터와 현재 로스터를 비교하여 유효성을 검증합니다.
 * @param newRoster AI가 보고한 새로운 로스터
 * @param currentRoster 현재 게임 상태의 로스터 (비교 기준)
 * @param initialDataPlayerNames InitialData.ts에서 추출한 선수 이름 Set (선택적, 있으면 InitialData.ts와 비교)
 * @returns 검증 결과 { isValid: boolean, errors: string[], warnings: string[], isTruncated: boolean }
 */
export function validateRosterIntegrity(
  newRoster: Player[],
  currentRoster: Player[],
  initialDataPlayerNames?: Set<string>
): RosterValidationResult & { isTruncated?: boolean } {
  const errors: string[] = [];
  const warnings: string[] = [];
  let isTruncated = false;

  // [FIX] 검증 로직 0: 최소 개수 체크 (로스터 데이터 잘림 감지)
  const pitchers = newRoster.filter(p => p.type === 'pitcher' || p.position?.includes('투수') || p.position?.includes('선발') || p.position?.includes('중간') || p.position?.includes('마무리'));
  const batters = newRoster.filter(p => p.type === 'batter' || (!p.type && !pitchers.includes(p)));
  
  if (pitchers.length < MIN_PITCHER_COUNT) {
    isTruncated = true;
    errors.push(
      `[⚠️ Roster Truncated!] 투수진 데이터가 잘렸습니다. ` +
      `예상 최소: ${MIN_PITCHER_COUNT}명, 실제: ${pitchers.length}명 ` +
      `(부족: ${MIN_PITCHER_COUNT - pitchers.length}명)`
    );
  }
  
  if (batters.length < MIN_BATTER_COUNT) {
    isTruncated = true;
    errors.push(
      `[⚠️ Roster Truncated!] 타자진 데이터가 잘렸습니다. ` +
      `예상 최소: ${MIN_BATTER_COUNT}명, 실제: ${batters.length}명 ` +
      `(부족: ${MIN_BATTER_COUNT - batters.length}명)`
    );
  }
  
  if (newRoster.length < MIN_TOTAL_ROSTER_COUNT) {
    isTruncated = true;
    errors.push(
      `[⚠️ Roster Truncated!] 전체 로스터 데이터가 잘렸습니다. ` +
      `예상 최소: ${MIN_TOTAL_ROSTER_COUNT}명, 실제: ${newRoster.length}명 ` +
      `(부족: ${MIN_TOTAL_ROSTER_COUNT - newRoster.length}명)`
    );
  }

  // 검증 로직 1: 수량 체크
  if (currentRoster.length > 0) {
    const sizeRatio = newRoster.length / currentRoster.length;
    
    // 로스터가 50% 이상 줄어들면 경고 (삭제 버그 가능성)
    if (sizeRatio < 0.5) {
      errors.push(
        `[수량 체크 실패] 로스터 인원이 50% 이상 감소했습니다. ` +
        `현재: ${currentRoster.length}명 → 새로운: ${newRoster.length}명 ` +
        `(감소율: ${((1 - sizeRatio) * 100).toFixed(1)}%)`
      );
    }
    
    // 로스터가 비상식적으로 늘어나면 경고 (중복 추가 버그 가능성)
    if (sizeRatio > 2.0) {
      warnings.push(
        `[수량 체크 경고] 로스터 인원이 비상식적으로 증가했습니다. ` +
        `현재: ${currentRoster.length}명 → 새로운: ${newRoster.length}명 ` +
        `(증가율: ${((sizeRatio - 1) * 100).toFixed(1)}%)`
      );
    }
  }

  // 검증 로직 2: 필수 데이터 체크
  const missingDataPlayers: string[] = [];
  newRoster.forEach((player, index) => {
    if (!player.name || player.name.trim() === '') {
      missingDataPlayers.push(`인덱스 ${index}: 이름 없음`);
    }
    if (!player.position || player.position.trim() === '') {
      missingDataPlayers.push(`인덱스 ${index} (${player.name || '이름 없음'}): 포지션 없음`);
    }
  });

  if (missingDataPlayers.length > 0) {
    errors.push(
      `[필수 데이터 누락] 다음 선수들의 필수 정보가 누락되었습니다:\n` +
      missingDataPlayers.map(p => `  - ${p}`).join('\n')
    );
  }

  // 검증 로직 3: 중복 체크
  const nameCounts = new Map<string, number>();
  const duplicatePlayers: string[] = [];

  newRoster.forEach((player) => {
    if (player.name) {
      const count = nameCounts.get(player.name) || 0;
      nameCounts.set(player.name, count + 1);
      
      if (count === 1) {
        // 중복 발견 (두 번째 발견)
        duplicatePlayers.push(player.name);
      }
    }
  });

  if (duplicatePlayers.length > 0) {
    errors.push(
      `[중복 선수 발견] 다음 선수들이 중복되어 있습니다:\n` +
      duplicatePlayers.map(name => `  - ${name} (${nameCounts.get(name)}회 등장)`).join('\n')
    );
  }

  // 검증 로직 4: ID 중복 체크 (ID가 있는 경우)
  const idCounts = new Map<string, number>();
  const duplicateIds: string[] = [];

  newRoster.forEach((player) => {
    if (player.id) {
      const count = idCounts.get(player.id) || 0;
      idCounts.set(player.id, count + 1);
      
      if (count === 1) {
        duplicateIds.push(player.id);
      }
    }
  });

  if (duplicateIds.length > 0) {
    errors.push(
      `[중복 ID 발견] 다음 ID들이 중복되어 있습니다:\n` +
      duplicateIds.map(id => `  - ${id}`).join('\n')
    );
  }

  // 검증 로직 5: InitialData.ts와 비교 검증 (초기 로스터 검증 시)
  if (initialDataPlayerNames && initialDataPlayerNames.size > 0) {
    const invalidPlayers: string[] = [];
    const missingPlayers: string[] = [];
    
    // AI가 출력한 선수 중 InitialData.ts에 없는 선수 찾기
    newRoster.forEach((player) => {
      if (player.name) {
        const cleanName = player.name.trim();
        // 나이 제거 (예: "류현진 (39)" -> "류현진")
        const nameWithoutAge = cleanName.replace(/\s*\([^)]*\)\s*$/, '').trim();
        
        // InitialData.ts에 없는 선수인지 확인
        if (!initialDataPlayerNames.has(nameWithoutAge) && !initialDataPlayerNames.has(cleanName)) {
          invalidPlayers.push(`${player.name} (InitialData.ts에 존재하지 않음)`);
        }
      }
    });
    
    // InitialData.ts에 있는 선수 중 AI가 출력하지 않은 선수 찾기 (경고만)
    // 주의: 이 검증은 초기 로스터 출력 시에만 의미가 있음
    if (invalidPlayers.length > 0) {
      errors.push(
        `[InitialData.ts 불일치] 다음 선수들이 InitialData.ts에 존재하지 않습니다 (AI가 잘못 생성한 선수):\n` +
        invalidPlayers.map(name => `  - ${name}`).join('\n') +
        `\n\n⚠️ 이 선수들은 AI의 외부 지식(예: 2024년 실제 용병, 은퇴 선수 등)에서 생성된 것으로 보입니다. ` +
        `InitialData.ts에 명시된 선수만 출력해야 합니다.`
      );
    }
  }

  // 최종 검증 결과
  const isValid = errors.length === 0;

  return {
    isValid,
    errors,
    warnings,
    isTruncated, // [FIX] 로스터 데이터 잘림 여부 반환
  };
}

export interface NewsItem {
  title: string;
  content: string;
  type?: string;
  playerId?: string;
  playerName?: string;
  fromTeam?: string;
  toTeam?: string;
}

// [Roster-Validation] 로스터 무결성 검사 추가 - Player 타입 정의
export interface Player {
  id?: string; // 고유 ID (선택적)
  name: string; // 선수 이름 (필수)
  position: string; // 포지션 (필수)
  age?: number; // 나이 (선택적)
  division?: '1군' | '2군' | string; // 구분 (1군/2군)
  type?: 'pitcher' | 'batter'; // 투수/타자 구분
  stats?: {
    // 투수 스탯
    velocity?: string; // 구속
    stuff?: number; // 구위 (20-80)
    movement?: number; // 무브먼트 (20-80)
    control?: number; // 제구 (20-80)
    stamina?: number; // 체력 (20-80)
    // 타자 스탯
    contact?: number; // 컨택 (20-80)
    gapPower?: number; // 갭파워 (20-80)
    power?: number; // 파워 (20-80)
    eye?: number; // 선구안 (20-80)
    running?: number; // 주루 (20-80)
    defense?: number; // 수비 (20-80)
  };
  record?: string; // 기록 (선택적)
  salary?: number; // 연봉 (선택적)
  note?: string; // 비고 (선택적)
}

export interface RosterValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export type GamePhase = 'TEAM_SELECTION' | 'MAIN_GAME' | 'EVENT_MODAL' | 'NEGOTIATION' | 'RANDOM_EVENT' | 'FACILITY_MANAGEMENT';

// 랜덤 이벤트 관련 타입
export type EventType = 'positive' | 'negative' | 'choice';

export interface RandomEvent {
  id: string;
  type: EventType;
  title: string;
  message: string;
  effect: {
    budget?: number; // 자금 변동 (원 단위)
    morale?: number; // 팀 사기 변동 (-100 ~ 100)
    playerCondition?: number; // 선수 컨디션 변동 (-100 ~ 100)
    fanLoyalty?: number; // 팬 충성도 변동 (-100 ~ 100)
  };
  choices?: Array<{
    label: string;
    effect: RandomEvent['effect'];
  }>;
}

// 구단 시설 관련 타입
export type FacilityType = 'training' | 'medical' | 'marketing' | 'scouting';

export interface Facility {
  type: FacilityType;
  name: string;
  level: number;
  maxLevel: number;
  upgradeCost: (level: number) => number; // 레벨별 업그레이드 비용 함수
  effect: (level: number) => {
    description: string;
    value: number;
  };
}

export interface FacilityState {
  training: Facility;
  medical: Facility;
  marketing: Facility;
  scouting: Facility;
}

/**
 * 시스템 태그를 완전히 제거하는 전용 함수
 * 멀티라인 JSON과 중첩 구조를 모두 처리합니다.
 */
function removeSystemTags(text: string): string {
  let cleaned = text;
  
  // 중첩된 JSON 구조를 포함한 완전한 매칭을 위한 헬퍼 함수
  const findMatchingBracket = (str: string, startIndex: number, openChar: string, closeChar: string): number => {
    let depth = 0;
    let inString = false;
    let escapeNext = false;
    
    for (let i = startIndex; i < str.length; i++) {
      const char = str[i];
      
      if (escapeNext) {
        escapeNext = false;
        continue;
      }
      
      if (char === '\\') {
        escapeNext = true;
        continue;
      }
      
      if (char === '"') {
        inString = !inString;
        continue;
      }
      
      if (inString) continue;
      
      if (char === openChar) depth++;
      if (char === closeChar) {
        depth--;
        if (depth === 0) return i;
      }
    }
    return -1;
  };
  
  // 반복적으로 모든 시스템 태그를 제거 (무한 루프 방지)
  let previousText = '';
  let iterations = 0;
  const maxIterations = 20;
  
  while (cleaned !== previousText && iterations < maxIterations) {
    previousText = cleaned;
    iterations++;
    
    // [GUI_EVENT: ...] 패턴 제거 (멀티라인, 중첩 JSON 모두 처리)
    const guiEventPattern = /\[GUI_EVENT:\s*\{/gs;
    let match;
    while ((match = guiEventPattern.exec(cleaned)) !== null) {
      const startIndex = match.index;
      const jsonStart = match.index + match[0].length - 1; // '{' 위치
      const jsonEnd = findMatchingBracket(cleaned, jsonStart, '{', '}');
      
      if (jsonEnd !== -1) {
        // ']'까지 찾기
        const tagEnd = cleaned.indexOf(']', jsonEnd);
        if (tagEnd !== -1) {
          cleaned = cleaned.substring(0, startIndex) + cleaned.substring(tagEnd + 1);
          guiEventPattern.lastIndex = 0; // 리셋
        }
      }
    }
    
    // [OPTIONS: ...] 패턴 제거 (멀티라인, 중첩 배열 모두 처리)
    const optionsPattern = /\[OPTIONS:\s*\[/gs;
    while ((match = optionsPattern.exec(cleaned)) !== null) {
      const startIndex = match.index;
      const arrayStart = match.index + match[0].length - 1; // '[' 위치
      const arrayEnd = findMatchingBracket(cleaned, arrayStart, '[', ']');
      
      if (arrayEnd !== -1) {
        // ']'까지 찾기
        const tagEnd = cleaned.indexOf(']', arrayEnd);
        if (tagEnd !== -1) {
          cleaned = cleaned.substring(0, startIndex) + cleaned.substring(tagEnd + 1);
          optionsPattern.lastIndex = 0; // 리셋
        }
      }
    }
    
    // [STATUS: ...] 패턴 제거 (멀티라인 지원)
    cleaned = cleaned.replace(/\[STATUS:[\s\S]*?\]/gs, '');
    
    // [NEWS: ...] 패턴 제거 (멀티라인 지원)
    cleaned = cleaned.replace(/\[NEWS:[\s\S]*?\]/gs, '');
    
    // [FINANCE_UPDATE: ...] 패턴 제거 (멀티라인 지원)
    cleaned = cleaned.replace(/\[FINANCE_UPDATE:[\s\S]*?\]/gs, '');
    
    // <RETIREMENT_RESULT> ... </RETIREMENT_RESULT> 패턴 제거 (멀티라인 지원)
    cleaned = cleaned.replace(/<RETIREMENT_RESULT>[\s\S]*?<\/RETIREMENT_RESULT>/gs, '');
    
    // <GAME_RESULTS> ... </GAME_RESULTS> 패턴 제거 (멀티라인 지원)
    cleaned = cleaned.replace(/<GAME_RESULTS>[\s\S]*?<\/GAME_RESULTS>/gs, '');
    
    // [ROSTER: ...] 패턴 제거 (멀티라인 지원)
    cleaned = cleaned.replace(/\[ROSTER:[\s\S]*?\]/gs, '');
    
    // 불완전한 태그도 제거 (스트리밍 중 부분적으로 나타나는 경우)
    cleaned = cleaned.replace(/\[GUI_EVENT:[\s\S]*$/gs, '');
    cleaned = cleaned.replace(/\[OPTIONS:[\s\S]*$/gs, '');
    cleaned = cleaned.replace(/\[STATUS:[\s\S]*$/gs, '');
    cleaned = cleaned.replace(/\[FINANCE_UPDATE:[\s\S]*$/gs, '');
    cleaned = cleaned.replace(/\[NEWS:[\s\S]*$/gs, '');
    cleaned = cleaned.replace(/\[ROSTER:[\s\S]*$/gs, '');
    cleaned = cleaned.replace(/<RETIREMENT_RESULT>[\s\S]*$/gs, '');
    cleaned = cleaned.replace(/<GAME_RESULTS>[\s\S]*$/gs, '');
    
    // 일반적인 시스템 태그 패턴 제거
    cleaned = cleaned.replace(/\[[A-Z_]+:[\s\S]*?\]/gs, '');
  }
  
  // JSON처럼 보이는 텍스트 블록 제거 (찌꺼기 제거)
  // 중첩된 JSON 객체를 재귀적으로 찾아서 제거
  const removeJsonObjects = (str: string): string => {
    let result = str;
    let changed = true;
    let iterations = 0;
    const maxIterations = 10;
    
    while (changed && iterations < maxIterations) {
      changed = false;
      iterations++;
      const before = result;
      
      // 중괄호로 시작하는 JSON 객체 패턴 찾기
      const jsonPattern = /\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/gs;
      result = result.replace(jsonPattern, (match) => {
        // 시스템 관련 키워드나 JSON 키가 포함된 경우 제거
        if (/prev_league|cost|GUI_EVENT|OPTIONS|STATUS|NEWS|"id"|"name"|"label"|"value"|"type"|"data"/i.test(match)) {
          changed = true;
          return '';
        }
        return match;
      });
      
      // }, { "label": ... 같은 패턴 제거
      result = result.replace(/,\s*\{\s*"label"/gs, '');
      result = result.replace(/\}\s*,\s*\{/gs, '');
      
      // 혼자 떨어진 JSON 키-값 쌍 제거
      result = result.replace(/,\s*"prev_league"\s*:\s*"[^"]*"/gs, '');
      result = result.replace(/,\s*"cost"\s*:\s*[^,\}]+/gs, '');
      result = result.replace(/"prev_league"\s*:\s*"[^"]*"\s*,?/gs, '');
      result = result.replace(/"cost"\s*:\s*[^,\}]+/gs, '');
    }
    
    return result;
  };
  
  cleaned = removeJsonObjects(cleaned);
  
  // 혼자 떨어진 대괄호 제거 (시스템 태그 제거 후 남은 찌꺼기)
  // 여러 번 반복하여 확실히 제거
  let previousCleaned = '';
  let bracketIterations = 0;
  while (cleaned !== previousCleaned && bracketIterations < 15) {
    previousCleaned = cleaned;
    bracketIterations++;
    
    // 줄 단위로 처리
    cleaned = cleaned.replace(/^\s*\]\s*/gm, ''); // 줄 시작의 ]
    cleaned = cleaned.replace(/\s*\]\s*$/gm, ''); // 줄 끝의 ]
    cleaned = cleaned.replace(/\s+\]\s+/g, ' '); // 중간의 혼자 있는 ]
    cleaned = cleaned.replace(/\]\s*\]/g, ''); // 연속된 ]
    cleaned = cleaned.replace(/\[\s*\]/g, ''); // 빈 대괄호 []
    
    // 표나 코드 블록 다음에 오는 ] 제거
    cleaned = cleaned.replace(/\|\s*\]/g, '|'); // 표 셀 끝의 ]
    cleaned = cleaned.replace(/\n\s*\]/g, '\n'); // 줄바꿈 후 ]
    cleaned = cleaned.replace(/```\s*\]/g, '```'); // 코드 블록 끝의 ]
    
    // 텍스트 끝의 ] 제거 (여러 패턴)
    cleaned = cleaned.replace(/\s*\]\s*$/g, ''); // 공백 포함 끝의 ]
    cleaned = cleaned.replace(/\]\s*$/g, ''); // 공백 없이 끝에 있는 ]
    cleaned = cleaned.replace(/\]\s*\n\s*$/g, '\n'); // 줄바꿈 전 ]
  }
  
  // 최종적으로 텍스트 끝의 ] 제거 (여러 번 반복, 더 강력하게)
  let finalIterations = 0;
  while (finalIterations < 10) {
    const beforeFinal = cleaned;
    cleaned = cleaned.replace(/\]+$/gm, ''); // 각 줄 끝의 모든 ]
    cleaned = cleaned.replace(/\s+\]+$/g, ''); // 끝에 있는 공백과 ]
    cleaned = cleaned.replace(/\]\s*$/g, ''); // 끝의 ]
    cleaned = cleaned.replace(/\]\s*\n\s*$/g, '\n'); // 줄바꿈 전 ]
    cleaned = cleaned.replace(/\]\s*$/g, ''); // 끝의 ] (다시 한 번)
    cleaned = cleaned.trim();
    
    if (cleaned === beforeFinal) break;
    finalIterations++;
  }
  
  // 빈 줄 정리
  cleaned = cleaned.replace(/\n\s*\n\s*\n+/g, '\n\n');
  cleaned = cleaned.trim();
  
  // 마지막 한 번 더 확인하여 끝의 ] 제거 (더 강력하게)
  cleaned = cleaned.replace(/\]+$/g, '');
  cleaned = cleaned.replace(/\s+\]+$/g, '');
  cleaned = cleaned.replace(/\]\s*$/g, '');
  cleaned = cleaned.trim();
  
  // 혼자 떨어진 대괄호 쌍 제거 (빈 대괄호)
  cleaned = cleaned.replace(/\[\s*\]/g, '');
  cleaned = cleaned.replace(/\[\s*\]\s*/g, '');
  
  // 텍스트 끝의 모든 대괄호 제거 (최종 확인)
  cleaned = cleaned.replace(/[\[\]]+$/g, '');
  cleaned = cleaned.replace(/\s+[\[\]]+\s*$/g, '');
  cleaned = cleaned.trim();
  
  // 백틱(`) 문자 제거 (마크다운 코드 블록 찌꺼기)
  // 여러 번 반복하여 확실히 제거
  let backtickIterations = 0;
  while (backtickIterations < 10) {
    const beforeBacktick = cleaned;
    
    // 혼자 떨어진 백틱 1-2개 제거 (3개 이상은 코드 블록이므로 보존)
    cleaned = cleaned.replace(/\b`{1,2}\b/g, ''); // 단어 경계 사이의 백틱 1-2개
    cleaned = cleaned.replace(/\s`{1,2}\s/g, ' '); // 공백 사이의 백틱 1-2개
    cleaned = cleaned.replace(/^`{1,2}\s/gm, ''); // 줄 시작의 백틱 1-2개
    cleaned = cleaned.replace(/\s`{1,2}$/gm, ''); // 줄 끝의 백틱 1-2개
    cleaned = cleaned.replace(/^`{1,2}$/gm, ''); // 줄 전체가 백틱 1-2개인 경우
    
    // 텍스트 끝의 백틱 제거
    cleaned = cleaned.replace(/`+$/g, ''); // 끝의 모든 백틱 제거
    cleaned = cleaned.replace(/\s+`+$/g, ''); // 공백과 함께 끝의 백틱 제거
    cleaned = cleaned.replace(/`+\s*$/g, ''); // 백틱과 공백 제거
    
    // 텍스트 시작의 백틱 제거
    cleaned = cleaned.replace(/^`+/gm, ''); // 줄 시작의 모든 백틱 제거
    
    // 공백 사이의 백틱 제거
    cleaned = cleaned.replace(/\s+`+\s+/g, ' '); // 공백 사이의 백틱 제거
    cleaned = cleaned.replace(/`+\s+/g, ' '); // 백틱 뒤 공백 제거
    cleaned = cleaned.replace(/\s+`+/g, ' '); // 공백 뒤 백틱 제거
    
    cleaned = cleaned.trim();
    
    if (cleaned === beforeBacktick) break;
    backtickIterations++;
  }
  
  // 빈 줄 정리
  cleaned = cleaned.replace(/\n\s*\n\s*\n+/g, '\n\n');
  cleaned = cleaned.trim();
  
  return cleaned;
}

/**
 * AI 응답에서 OPTIONS JSON을 파싱하여 텍스트와 선택지를 분리합니다.
 * @param message AI가 보낸 원본 메시지
 * @returns 파싱된 텍스트와 옵션 배열
 */
export function parseAIResponse(message: string): ParsedMessage {
  // message가 undefined나 null일 때 안전하게 처리
  if (!message || typeof message !== 'string') {
    return {
      text: '',
      options: [],
      guiEvent: undefined,
    };
  }

  const originalText = message;
  let options: Array<{ label: string; value: string }> = [];
  let guiEvent: GUIEvent | undefined = undefined;

  // 1단계: 원본 텍스트에서 데이터 추출 (제거 전에 파싱)
  
  // [OPTIONS: ...] 패턴 찾기 및 파싱
  const optionsRegex = /\[OPTIONS:\s*(\[[\s\S]*?\])\]/gs;
  const optionsMatch = originalText.match(optionsRegex);
  
  if (optionsMatch) {
    try {
      const firstMatch = optionsMatch[0];
      const jsonMatch = firstMatch.match(/\[OPTIONS:\s*(\[[\s\S]*?\])\]/s);
      if (jsonMatch && jsonMatch[1]) {
        options = JSON.parse(jsonMatch[1]);
      }
    } catch (e) {
      console.error('옵션 파싱 오류:', e);
    }
  }

  // [GUI_EVENT: ...] 패턴 찾기 및 파싱 (중첩된 JSON 구조 처리)
  const findNestedJson = (str: string, startIndex: number): number => {
    let depth = 0;
    let inString = false;
    let escapeNext = false;
    
    for (let i = startIndex; i < str.length; i++) {
      const char = str[i];
      
      if (escapeNext) {
        escapeNext = false;
        continue;
      }
      
      if (char === '\\') {
        escapeNext = true;
        continue;
      }
      
      if (char === '"') {
        inString = !inString;
        continue;
      }
      
      if (inString) continue;
      
      if (char === '{') depth++;
      if (char === '}') {
        depth--;
        if (depth === 0) return i;
      }
    }
    return -1;
  };
  
  // GUI_EVENT 태그 찾기 및 파싱
  const guiEventStartRegex = /\[GUI_EVENT:\s*\{/gs;
  let guiEventMatch;
  while ((guiEventMatch = guiEventStartRegex.exec(originalText)) !== null) {
    const startIndex = guiEventMatch.index + guiEventMatch[0].length - 1; // '{' 위치
    const endIndex = findNestedJson(originalText, startIndex);
    
    if (endIndex !== -1) {
      try {
        const jsonStr = originalText.substring(startIndex, endIndex + 1);
        // JSON 유효성 검사 (빈 문자열이나 불완전한 JSON 체크)
        if (jsonStr.trim().length > 0) {
          guiEvent = JSON.parse(jsonStr);
          break; // 첫 번째 유효한 이벤트만 파싱
        }
      } catch (e) {
        // 파싱 오류 발생 시 로그만 남기고 계속 진행 (태그는 나중에 제거됨)
        console.warn('GUI 이벤트 파싱 오류 (태그는 자동 제거됨):', e);
      }
    }
  }

  // [STATUS] 태그 찾기 및 파싱
  let status: StatusInfo | undefined = undefined;
  const statusRegex = /\[STATUS\]\s*(.+?)(?=\[|$)/gs;
  const statusMatch = originalText.match(statusRegex);
  
  if (statusMatch) {
    try {
      const statusText = statusMatch[0].replace(/\[STATUS\]\s*/, '').trim();
      // "날짜: YYYY/MM/DD | 자금: 0,000억 원" 형식 파싱
      const dateMatch = statusText.match(/날짜[:\s]*(\d{4}\/\d{1,2}\/\d{1,2})/i);
      const budgetMatch = statusText.match(/자금[:\s]*([0-9,.]+)\s*억/i);
      
      status = {};
      if (dateMatch && dateMatch[1]) {
        const [year, month, day] = dateMatch[1].split('/');
        status.date = `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
      }
      if (budgetMatch && budgetMatch[1]) {
        const budgetStr = budgetMatch[1].replace(/,/g, '');
        const budgetValue = parseFloat(budgetStr);
        if (!isNaN(budgetValue) && budgetValue > 0) {
          status.budget = budgetMatch[1] + '억 원';
          status.budgetValue = budgetValue * 100000000; // 억 단위를 원 단위로 변환
        }
      }
    } catch (e) {
      console.warn('STATUS 파싱 오류:', e);
    }
  }

  // [NEWS] 태그 찾기 및 파싱 (여러 개 가능)
  const news: NewsItem[] = [];
  const newsRegex = /\[NEWS:\s*(\{[\s\S]*?\})\]/gs;
  let newsMatch;
  
  while ((newsMatch = newsRegex.exec(originalText)) !== null) {
    try {
      const newsJson = JSON.parse(newsMatch[1]);
      if (newsJson.title && newsJson.content) {
        news.push({
          title: newsJson.title,
          content: newsJson.content,
          type: newsJson.type,
          playerId: newsJson.playerId,
          playerName: newsJson.playerName,
          fromTeam: newsJson.fromTeam,
          toTeam: newsJson.toTeam,
        });
      }
    } catch (e) {
      console.warn('NEWS 파싱 오류:', e);
    }
  }

  // [FINANCE_UPDATE] 태그 찾기 및 파싱
  let financeUpdate: FinanceUpdate | undefined = undefined;
  const financeUpdateRegex = /\[FINANCE_UPDATE:\s*(\{[\s\S]*?\})\]/gs;
  const financeUpdateMatch = originalText.match(financeUpdateRegex);
  
  if (financeUpdateMatch) {
    try {
      const firstMatch = financeUpdateMatch[0];
      const jsonMatch = firstMatch.match(/\[FINANCE_UPDATE:\s*(\{[\s\S]*?\})\]/s);
      if (jsonMatch && jsonMatch[1]) {
        const financeJson = JSON.parse(jsonMatch[1]);
        if (financeJson.amount !== undefined && financeJson.reason) {
          financeUpdate = {
            amount: typeof financeJson.amount === 'number' ? financeJson.amount : parseFloat(financeJson.amount),
            reason: financeJson.reason,
          };
        }
      }
    } catch (e) {
      console.warn('FINANCE_UPDATE 파싱 오류:', e);
    }
  }

  // [CRITICAL] AI 응답의 로스터는 절대 사용하지 않음
  // InitialData.ts에서만 로스터를 가져오도록 변경
  // [Roster-Validation] 로스터 무결성 검사 추가 - [ROSTER] 태그는 파싱하지 않음
  let roster: Player[] | undefined = undefined;
  
  // [CRITICAL] AI 응답의 [ROSTER] 태그는 무시
  // 로스터는 InitialData.ts에서만 가져오므로 여기서는 파싱하지 않음
  const rosterRegex = /\[ROSTER:\s*(\[[\s\S]*?\])\]/gs;
  const rosterMatch = originalText.match(rosterRegex);
  
  if (rosterMatch) {
    console.warn(`[Roster-Validation] ⚠️ AI 응답의 [ROSTER] 태그는 무시됩니다. InitialData.ts에서만 로스터를 가져옵니다.`);
    // roster는 undefined로 유지 (사용하지 않음)
  }

  // [Sim-Engine] 경기 결과 파싱 및 전적 반영 - <GAME_RESULTS> 태그 파싱
  const gameResults = parseGameResults(originalText);
  
  // [Retirement] 선수 은퇴 심사 결과 파싱 - <RETIREMENT_RESULT> 태그 파싱
  let retirementResult: import('../types').RetirementResult | undefined = undefined;
  const retirementRegex = /<RETIREMENT_RESULT>\s*(\{[\s\S]*?\})\s*<\/RETIREMENT_RESULT>/gs;
  const retirementMatch = originalText.match(retirementRegex);
  
  if (retirementMatch) {
    try {
      const firstMatch = retirementMatch[0];
      const jsonMatch = firstMatch.match(/<RETIREMENT_RESULT>\s*(\{[\s\S]*?\})\s*<\/RETIREMENT_RESULT>/s);
      if (jsonMatch && jsonMatch[1]) {
        const retirementJson = JSON.parse(jsonMatch[1]);
        // 필수 필드 검증
        if (
          retirementJson.playerName &&
          retirementJson.teamId &&
          retirementJson.leagueLegendVote &&
          retirementJson.teamRetiredNumberVote &&
          typeof retirementJson.leagueLegendVote.score === 'number' &&
          typeof retirementJson.teamRetiredNumberVote.score === 'number'
        ) {
          retirementResult = retirementJson as import('../types').RetirementResult;
        }
      }
    } catch (e) {
      console.warn('[Retirement] RETIREMENT_RESULT 태그 파싱 오류:', e);
    }
  }
  
  // [FIX] 중복 이적 뉴스 방지 - 뉴스 생성 트랜잭션 처리
  if (news.length > 0) {
    try {
      // [FIX] 뉴스 생성 트랜잭션 처리 (중복 이적 뉴스 방지)
      const processedNews = processNewsItems(news);
      // 처리된 뉴스로 교체 (중복 제거됨)
      news.length = 0;
      news.push(...processedNews);
    } catch (e) {
      console.warn('[NewsService] 뉴스 필터링 오류:', e);
      // 오류 발생 시 원본 뉴스 유지
    }
  }
  
  // 2단계: 화면 표시용 텍스트 생성 (모든 시스템 태그 제거)
  const cleanText = removeSystemTags(originalText);
  
  return { 
    text: cleanText, 
    options, 
    guiEvent, 
    status: status || undefined,
    news: news.length > 0 ? news : undefined,
    financeUpdate: financeUpdate || undefined,
    roster: roster || undefined, // [Roster-Validation] 로스터 무결성 검사 추가
    gameResults: gameResults.length > 0 ? gameResults : undefined, // [Sim-Engine] 경기 결과 파싱 및 전적 반영
    retirementResult: retirementResult || undefined // [Retirement] 선수 은퇴 심사 결과
  };
}

/**
 * 클래스명을 병합하는 유틸리티 함수
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * AI 응답에서 날짜 정보를 추출합니다.
 * @param text AI 응답 텍스트
 * @returns 추출된 날짜 문자열 (없으면 null)
 */
export function extractDate(text: string): string | null {
  // 다양한 날짜 패턴 시도
  const patterns = [
    /날짜[:\s]*(\d{4}\/\d{1,2}\/\d{1,2})/i,
    /날짜[:\s]*(\d{4}년\s*\d{1,2}월\s*\d{1,2}일)/i,
    /(\d{4}\/\d{1,2}\/\d{1,2})/,
    /(\d{4}년\s*\d{1,2}월\s*\d{1,2}일)/,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      // YYYY/MM/DD 형식을 YYYY년 M월 D일 형식으로 변환
      const dateStr = match[1];
      if (dateStr.includes('/')) {
        const [year, month, day] = dateStr.split('/');
        return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
      }
      return dateStr;
    }
  }

  return null;
}

/**
 * AI 응답에서 자금 정보를 추출합니다.
 * @param text AI 응답 텍스트
 * @returns 추출된 자금 숫자 (없으면 null)
 */
export function extractBudget(text: string): number | null {
  // 다양한 자금 패턴 시도 (소수점 포함, 다양한 포맷 지원)
  const patterns = [
    // "보유 자금: 50억", "자금: 50.00억", "보유 자금: 50억원" 등
    /(?:자금|보유\s*자금|현재\s*자금|예산)[:\s]*([0-9,.]+)\s*([가-힣a-zA-Z]*)/i,
    // "50억", "50.00억", "50억원", "50억 원" 등
    /([0-9,.]+)\s*억\s*(?:원)?/i,
    // "5,000,000,000원" 같은 직접 숫자
    /([0-9,]+)\s*원/i,
    // "50억" (간단한 형태)
    /([0-9,.]+)\s*억/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      // 콤마 제거 후 숫자 추출 (소수점 포함)
      const amountStr = match[1].replace(/,/g, '');
      const amount = parseFloat(amountStr); // parseInt 대신 parseFloat 사용
      
      if (!isNaN(amount) && amount > 0) { // 0보다 큰 값만 유효
        // "억" 단위가 포함되어 있으면 100,000,000을 곱함
        const fullMatch = match[0];
        if (fullMatch.includes('억')) {
          return Math.floor(amount * 100000000);
        }
        // "만" 단위가 포함되어 있으면 10,000을 곱함
        if (fullMatch.includes('만')) {
          return Math.floor(amount * 10000);
        }
        // 그 외에는 그대로 반환 (이미 원 단위로 추정)
        return Math.floor(amount);
      }
    }
  }

  return null;
}

/**
 * 텍스트에서 연고지와 팀 이름을 함께 추출합니다 (신생 구단 창단 시 사용)
 * @param text 사용자 입력 또는 AI 응답 텍스트
 * @returns 추출된 전체 구단명 (연고지 + 팀 이름 또는 팀 이름만, 없으면 null)
 */
export function extractFullTeamName(text: string): string | null {
  // 제외할 키워드 목록
  const excludeKeywords = [
    '당신의', '새로운', '노말', '이지', '헬', '모드', '난이도', 'difficulty',
    '선택', '설정', '적용', '변경', '금지', '절대', '시즌', 'season',
    '구단', '팀', '야구단', 'city', 'team', 'name'
  ];
  
  // 패턴 1: "연고지: 제주시, 팀이름: 한라 감귤스" 형식 → "한라 감귤스" (팀 이름만)
  const pattern1 = /(?:연고지|연고)[:\s]*([가-힣a-zA-Z0-9\s]+?)(?:[,\s]+팀이름|팀\s*이름)[:\s]*([가-힣a-zA-Z0-9\s]+?)(?:입니다|이다|\.|$|,)/i;
  const match1 = text.match(pattern1);
  if (match1 && match1[1] && match1[2]) {
    const city = match1[1].trim();
    const teamName = match1[2].trim();
    // 제외 키워드 체크
    if (!excludeKeywords.some(k => city.includes(k) || teamName.includes(k))) {
      if (city.length >= 2 && teamName.length >= 2) {
        // 연고지와 팀 이름이 명시적으로 구분된 경우 → 팀 이름만 반환
        return teamName;
      }
    }
  }
  
  // 패턴 2: "연고지는 제주시이고, 팀 이름은 한라 감귤스입니다" 형식 → "한라 감귤스" (팀 이름만)
  const pattern2 = /(?:연고지|연고)[은는]\s*([가-힣a-zA-Z0-9\s]+?)(?:이고|이고,|이고\s*팀|이고\s*구단).*?(?:팀|구단)\s*이름[은는]\s*([가-힣a-zA-Z0-9\s]+?)(?:입니다|이다|\.|$)/i;
  const match2 = text.match(pattern2);
  if (match2 && match2[1] && match2[2]) {
    const city = match2[1].trim();
    const teamName = match2[2].trim();
    if (!excludeKeywords.some(k => city.includes(k) || teamName.includes(k))) {
      if (city.length >= 2 && teamName.length >= 2) {
        // 연고지와 팀 이름이 명시적으로 구분된 경우 → 팀 이름만 반환
        return teamName;
      }
    }
  }
  
  // 패턴 3: "제주시 한라 감귤스" 형식 (연고지 + 팀 이름이 공백으로 구분)
  // 도시명(시/도로 끝나는 부분) 뒤의 모든 것이 팀명
  // 예: "제주시 한라 감귤스" → 도시: "제주시", 팀명: "한라 감귤스" → 표시: "제주시 한라 감귤스" (전체)
  // 이 패턴은 문장 어디에나 나타날 수 있으므로 더 넓은 범위로 매칭
  const pattern3 = /([가-힣]+(?:시|도|특별시|광역시|특별자치시))\s+([가-힣a-zA-Z0-9\s]+?)(?:\s|$|입니다|이다|\.|로|으로|로\s*결정|으로\s*결정|로\s*정했습니다|으로\s*정했습니다|로\s*설정|으로\s*설정)/i;
  const match3 = text.match(pattern3);
  if (match3 && match3[1] && match3[2]) {
    const city = match3[1].trim();
    const teamName = match3[2].trim();
    // 제외 키워드 체크
    if (!excludeKeywords.some(k => city.includes(k) || teamName.includes(k))) {
      if (city.length >= 2 && teamName.length >= 2 && teamName.length <= 30) {
        // 연고지와 팀 이름이 공백으로 구분된 경우 → 전체 반환 (도시명 + 팀명)
        // 예: "제주시 한라 감귤스" → "제주시 한라 감귤스"
        return `${city} ${teamName}`;
      }
    }
  }
  
  return null;
}

/**
 * 텍스트에서 구단 이름을 추출합니다 (신생 구단 창단 시 사용)
 * @param text 사용자 입력 또는 AI 응답 텍스트
 * @returns 추출된 구단 이름 (없으면 null)
 */
/**
 * 구단명에서 지역명을 제거하고 팀 애칭만 반환합니다
 * 예: "수원 KT 위즈" -> "KT 위즈", "서울 LG 트윈스" -> "LG 트윈스"
 * @param teamName 전체 구단명 (지역명 포함 가능)
 * @returns 지역명이 제거된 팀 애칭
 */
export function getTeamNickname(teamName: string | null | undefined): string {
  if (!teamName) return '우리 팀';
  
  // 한국 주요 도시명 패턴 (시, 도, 특별시, 광역시 등 제거)
  const cityPatterns = [
    /^(서울|부산|대구|인천|광주|대전|울산|세종|수원|성남|고양|용인|부천|청주|천안|전주|포항|창원|김해|제주|수원시|성남시|고양시|용인시|부천시|청주시|천안시|전주시|포항시|창원시|김해시|제주시|제주특별자치도)\s+/i,
  ];
  
  // 도시명 제거
  let nickname = teamName.trim();
  for (const pattern of cityPatterns) {
    nickname = nickname.replace(pattern, '');
  }
  
  // 빈 문자열이면 원본 반환
  if (!nickname || nickname.trim().length === 0) {
    return teamName;
  }
  
  return nickname.trim();
}

export function extractTeamName(text: string): string | null {
  // 먼저 전체 구단명(연고지 + 팀 이름) 추출 시도
  const fullName = extractFullTeamName(text);
  if (fullName) {
    return fullName;
  }
  
  // 제외할 키워드 목록 (이런 단어가 포함된 텍스트는 팀 이름으로 추출하지 않음)
  const excludeKeywords = [
    '당신의', '새로운', '노말', '이지', '헬', '모드', '난이도', 'difficulty',
    '선택', '설정', '적용', '변경', '금지', '절대', '시즌', 'season',
    '구단', '팀', '야구단', '연고지', 'city', 'team', 'name'
  ];
  
  // 다양한 패턴 시도
  const patterns = [
    // "구단 이름을 '제주 감귤스'로 정했습니다", "팀 이름을 '제주 감귤스'로 정했습니다"
    /(?:구단|팀)\s*이름[을를]\s*['"]([가-힣a-zA-Z0-9\s]+?)['"]/i,
    // "구단 이름은 '제주 감귤스'입니다", "팀 이름은 '제주 감귤스'입니다"
    /(?:구단|팀)\s*이름[은는]\s*['"]([가-힣a-zA-Z0-9\s]+?)['"]/i,
    // "연고지는 제주시이고, 팀 이름은 한라 감귤스입니다" - 연고지와 팀 이름이 함께 나오는 경우
    /(?:연고지|연고)[은는]\s*[가-힣a-zA-Z0-9\s]+(?:이고|이고,|이고\s*팀|이고\s*구단).*?(?:팀|구단)\s*이름[은는]\s*([가-힣a-zA-Z0-9\s]+?)(?:입니다|이다|\.|$)/i,
    // "팀이름은 감귤 파이터즈야", "팀 이름은 감귤 파이터즈", "팀이름: 감귤 파이터즈"
    /(?:팀\s*이름|팀이름|구단\s*이름|구단이름)[은는:\s]+([가-힣a-zA-Z0-9\s]+?)(?:야|입니다|이다|로|으로|입니다|\.|$)/i,
    // "연고지는 제주도이고 팀이름은 감귤 파이터즈야"
    /(?:팀이름|팀\s*이름)[은는:\s]+([가-힣a-zA-Z0-9\s]+?)(?:야|입니다|이다|로|으로|입니다|\.|$)/i,
    // "제주 감귤 파이터즈", "감귤 파이터즈" (직접 언급) - 단, "구단", "팀", "야구단" 앞에 오는 경우만
    /([가-힣a-zA-Z0-9\s]+?)\s*(?:구단|팀|야구단)(?:\s|$|입니다|이다|\.)/i,
    // "팀 이름: 감귤 파이터즈"
    /(?:팀|구단)\s*이름[:\s]+([가-힣a-zA-Z0-9\s]+?)(?:입니다|이다|로|으로|\.|$)/i,
    // "제주 감귤스로 정했습니다", "제주 감귤스로 결정했습니다"
    /([가-힣a-zA-Z0-9\s]+?)\s*(?:로|으로)\s*(?:정했습니다|결정했습니다|설정했습니다)/i,
    // "구단명은 제주 감귤스입니다", "팀명은 제주 감귤스입니다"
    /(?:구단명|팀명)[은는:\s]+([가-힣a-zA-Z0-9\s]+?)(?:입니다|이다|\.|$)/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      // 패턴이 도시명과 팀명을 모두 캡처하는 경우 (match[2]가 있는 경우)
      if (match[2]) {
        const city = match[1].trim();
        const teamName = match[2].trim();
        // 제외 키워드 체크
        if (!excludeKeywords.some(k => city.includes(k) || teamName.includes(k))) {
          if (city.length >= 2 && teamName.length >= 2 && teamName.length <= 30) {
            // 도시명 + 팀명 전체 반환
            return `${city} ${teamName}`;
          }
        }
        // 매칭은 되었지만 유효하지 않은 경우 다음 패턴 시도
        continue;
      }
      
      // 일반적인 경우 (팀 이름만 추출)
      const teamName = match[1].trim();
      
      // 제외 키워드 체크
      const containsExcludeKeyword = excludeKeywords.some(keyword => 
        teamName.includes(keyword)
      );
      if (containsExcludeKeyword) {
        continue; // 다음 패턴 시도
      }
      
      // 너무 짧거나 의미 없는 이름은 제외
      // "로", "으로", "입니다", "이다" 같은 단어가 포함된 경우 제외
      if (teamName.length >= 2 && teamName.length <= 30 && 
          !/^(로|으로|입니다|이다|야|입니다|\.)$/.test(teamName)) {
        return teamName;
      }
    }
  }

  return null;
}

/**
 * 입력된 연고지가 대한민국의 실제 도시인지 검증합니다
 * @param city 입력된 연고지 이름
 * @returns 유효한 도시인 경우 true, 그렇지 않으면 false
 */
export function isValidKoreanCity(city: string): boolean {
  if (!city || city.trim().length === 0) return false;
  
  const normalizedCity = city.trim().replace(/시$/, '').replace(/특별시$/, '').replace(/광역시$/, '').replace(/특별자치시$/, '');
  
  // 대한민국 도시 목록 (시 단위)
  const validCities = [
    // 특별시
    '서울',
    // 광역시
    '부산', '대구', '인천', '광주', '대전', '울산',
    // 특별자치시
    '세종',
    // 경기도
    '수원', '고양', '용인', '성남', '부천', '안산', '안양', '남양주', '화성', '평택', '의정부', '시흥', '파주', '광명', '김포', '광주', '군포', '이천', '오산', '하남', '양주', '구리', '안성', '포천', '의왕', '여주', '동두천',
    // 강원특별자치도
    '춘천', '원주', '강릉', '동해', '태백', '속초', '삼척',
    // 충청북도
    '청주', '충주', '제천',
    // 충청남도
    '천안', '공주', '보령', '아산', '서산', '논산', '계룡', '당진',
    // 전북특별자치도
    '전주', '군산', '익산', '정읍', '남원', '김제',
    // 전라남도
    '목포', '여수', '순천', '나주', '광양',
    // 경상북도
    '포항', '경주', '김천', '안동', '구미', '영주', '영천', '상주', '문경', '경산',
    // 경상남도
    '창원', '진주', '통영', '사천', '김해', '밀양', '거제', '양산',
    // 제주특별자치도
    '제주', '서귀포',
  ];
  
  return validCities.includes(normalizedCity);
}

