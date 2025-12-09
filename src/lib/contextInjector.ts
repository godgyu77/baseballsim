/**
 * 동적 컨텍스트 주입 시스템
 * 
 * 게임 상황에 따라 필요한 데이터만 선별하여 프롬프트에 주입합니다.
 * 전체 로스터나 게임 로그를 매번 전송하지 않고, 필요한 부분만 동적으로 추가합니다.
 */

import { Player, GamePhase } from './utils';

/**
 * 게임 단계별 필요한 컨텍스트 타입
 */
export type ContextType = 
  | 'initialization'      // 게임 초기화 (전체 로스터 필요)
  | 'roster_management'   // 로스터 관리 (내 팀 로스터만)
  | 'fa_negotiation'       // FA 협상 (대상 선수 + 예산)
  | 'trade_negotiation'    // 트레이드 협상 (관련 선수들만)
  | 'lineup_planning'      // 라인업 구상 (내 팀 로스터만)
  | 'game_simulation'     // 경기 시뮬레이션 (최소 데이터)
  | 'draft_preparation'   // 드래프트 준비 (보호선수 + 드래프트 풀)
  | 'general'             // 일반 대화 (컨텍스트 불필요)
  | 'facility_management' // 시설 관리 (시설 정보만)
  | 'news_generation';     // 뉴스 생성 (최소 데이터)

/**
 * 컨텍스트 주입 옵션
 */
export interface ContextInjectionOptions {
  gamePhase: GamePhase;
  userMessage: string;
  currentRoster?: Player[];
  targetPlayer?: Player;
  teamBudget?: number;
  facilities?: any;
  leagueStandings?: any;
  transactionHistory?: any[];
}

/**
 * 게임 단계를 분석하여 필요한 컨텍스트 타입 결정
 */
export function determineContextType(options: ContextInjectionOptions): ContextType {
  const { gamePhase, userMessage } = options;
  const message = userMessage.toLowerCase();

  // 게임 단계 기반 판단
  // Note: GamePhase에 'INITIALIZATION'이 없으므로 TEAM_SELECTION으로 판단
  if (gamePhase === 'TEAM_SELECTION') {
    return 'initialization';
  }

  // 사용자 메시지 키워드 기반 판단
  if (message.includes('fa') || message.includes('자유계약') || message.includes('협상')) {
    return 'fa_negotiation';
  }

  if (message.includes('트레이드') || message.includes('trade') || message.includes('교환')) {
    return 'trade_negotiation';
  }

  if (message.includes('로스터') || message.includes('선수단') || message.includes('roster')) {
    return 'roster_management';
  }

  if (message.includes('라인업') || message.includes('lineup') || message.includes('선발')) {
    return 'lineup_planning';
  }

  if (message.includes('드래프트') || message.includes('draft') || message.includes('보호선수')) {
    return 'draft_preparation';
  }

  if (message.includes('시설') || message.includes('facility') || message.includes('투자')) {
    return 'facility_management';
  }

  if (message.includes('경기') || message.includes('game') || message.includes('시뮬레이션')) {
    return 'game_simulation';
  }

  if (message.includes('뉴스') || message.includes('news') || message.includes('소식')) {
    return 'news_generation';
  }

  // 기본값: 일반 대화
  return 'general';
}

/**
 * 컨텍스트 타입에 따라 필요한 데이터만 추출
 */
export function getRelevantContext(
  contextType: ContextType,
  options: ContextInjectionOptions
): string {
  const { currentRoster, targetPlayer, teamBudget, facilities, leagueStandings } = options;

  switch (contextType) {
    case 'initialization':
      // 초기화: 전체 로스터 필요 (InitialData는 별도로 전송)
      return '[CONTEXT: Initialization] 전체 로스터 데이터는 InitialData에서 참조하세요.';

    case 'roster_management':
      // 로스터 관리: 내 팀 로스터만
      if (!currentRoster || currentRoster.length === 0) {
        return '[CONTEXT: Roster] 로스터 데이터를 불러오는 중입니다.';
      }
      return formatRosterContext(currentRoster, 'my_team');

    case 'fa_negotiation':
      // FA 협상: 대상 선수 + 예산
      const faContext: string[] = [];
      if (targetPlayer) {
        faContext.push(formatPlayerContext(targetPlayer));
      }
      if (teamBudget !== undefined) {
        faContext.push(`[예산] 현재 가용 자금: ${teamBudget.toFixed(1)}억 원`);
      }
      return faContext.length > 0 ? faContext.join('\n\n') : '';

    case 'trade_negotiation':
      // 트레이드 협상: 관련 선수들만
      if (targetPlayer) {
        return formatPlayerContext(targetPlayer);
      }
      if (currentRoster && currentRoster.length > 0) {
        // 내 팀의 주요 선수만 (상위 10명)
        const topPlayers = currentRoster
          .filter(p => p.division === '1군')
          .slice(0, 10);
        return formatRosterContext(topPlayers, 'trade_candidates');
      }
      return '';

    case 'lineup_planning':
      // 라인업 구상: 내 팀 1군 로스터만
      if (!currentRoster || currentRoster.length === 0) {
        return '[CONTEXT: Lineup] 로스터 데이터를 불러오는 중입니다.';
      }
      const lineupPlayers = currentRoster.filter(p => p.division === '1군');
      return formatRosterContext(lineupPlayers, 'lineup');

    case 'game_simulation':
      // 경기 시뮬레이션: 최소 데이터 (리그 순위표만)
      if (leagueStandings) {
        return formatLeagueStandings(leagueStandings);
      }
      return '';

    case 'draft_preparation':
      // 드래프트 준비: 보호선수 + 드래프트 풀 (필요시 구현)
      return '[CONTEXT: Draft] 드래프트 관련 데이터는 별도로 요청하세요.';

    case 'facility_management':
      // 시설 관리: 시설 정보만
      if (facilities) {
        return formatFacilitiesContext(facilities);
      }
      return '';

    case 'news_generation':
      // 뉴스 생성: 최소 데이터
      return '[CONTEXT: News] 뉴스 생성에 필요한 최소 데이터만 사용하세요.';

    case 'general':
    default:
      // 일반 대화: 컨텍스트 불필요
      return '';
  }
}

/**
 * 로스터를 포맷팅하여 컨텍스트로 변환
 */
function formatRosterContext(roster: Player[], type: 'my_team' | 'lineup' | 'trade_candidates'): string {
  if (roster.length === 0) {
    return '[CONTEXT: Empty Roster] 로스터가 비어있습니다.';
  }

  const lines: string[] = [];
  lines.push(`[CONTEXT: ${type === 'my_team' ? 'My Team Roster' : type === 'lineup' ? 'Lineup Candidates' : 'Trade Candidates'}]`);
  lines.push(`총 ${roster.length}명의 선수:`);
  lines.push('');

  // 선수를 간결하게 포맷팅 (이름, 포지션, 주요 스탯만)
  roster.forEach((player, index) => {
    const stats = player.stats;
    const statSummary = stats
      ? `[${getStatSummary(stats)}]`
      : '';
    
    lines.push(`${index + 1}. ${player.name} (${player.position || 'N/A'}) ${statSummary}`);
  });

  return lines.join('\n');
}

/**
 * 선수 정보를 포맷팅
 */
function formatPlayerContext(player: Player): string {
  const lines: string[] = [];
  lines.push('[CONTEXT: Player Info]');
  lines.push(`이름: ${player.name}`);
  lines.push(`포지션: ${player.position || 'N/A'}`);
  lines.push(`나이: ${player.age || 'N/A'}`);
  
  if (player.stats) {
    lines.push(`스탯: ${getStatSummary(player.stats)}`);
  }
  
  if (player.salary) {
    lines.push(`연봉: ${player.salary.toFixed(1)}억 원`);
  }
  
  if (player.record) {
    lines.push(`기록: ${player.record}`);
  }

  return lines.join('\n');
}

/**
 * 스탯 요약 생성 (간결하게)
 */
function getStatSummary(stats: Player['stats']): string {
  if (!stats) return '';

  const parts: string[] = [];
  
  // 투수 스탯
  if (stats.stuff !== undefined) {
    parts.push(`구위:${stats.stuff}`);
  }
  if (stats.control !== undefined) {
    parts.push(`제구:${stats.control}`);
  }
  
  // 타자 스탯
  if (stats.contact !== undefined) {
    parts.push(`컨택:${stats.contact}`);
  }
  if (stats.power !== undefined) {
    parts.push(`파워:${stats.power}`);
  }

  return parts.join(' ');
}

/**
 * 리그 순위표 포맷팅
 */
function formatLeagueStandings(standings: any): string {
  const lines: string[] = [];
  lines.push('[CONTEXT: League Standings]');
  
  // 간결한 순위표만 제공
  if (typeof standings === 'object') {
    const teams = Object.keys(standings).slice(0, 10); // 상위 10팀만
    teams.forEach((team, index) => {
      const record = standings[team];
      if (record) {
        lines.push(`${index + 1}. ${team}: ${record.wins}승 ${record.losses}패`);
      }
    });
  }

  return lines.length > 1 ? lines.join('\n') : '';
}

/**
 * 시설 정보 포맷팅
 */
function formatFacilitiesContext(facilities: any): string {
  const lines: string[] = [];
  lines.push('[CONTEXT: Facilities]');
  
  if (facilities.training) {
    lines.push(`훈련장: Lv.${facilities.training.level || 1}`);
  }
  if (facilities.medical) {
    lines.push(`메디컬: Lv.${facilities.medical.level || 1}`);
  }
  if (facilities.marketing) {
    lines.push(`마케팅: Lv.${facilities.marketing.level || 1}`);
  }
  if (facilities.scouting) {
    lines.push(`스카우트: Lv.${facilities.scouting.level || 1}`);
  }

  return lines.join('\n');
}

/**
 * 동적 컨텍스트 주입 메인 함수
 * 
 * @param userMessage 사용자 메시지
 * @param options 게임 상태 옵션
 * @returns 컨텍스트가 주입된 메시지
 */
export function injectDynamicContext(
  userMessage: string,
  options: ContextInjectionOptions
): string {
  // 초기화 단계가 아니고 InitialData가 포함되어 있으면 제거
  if (options.gamePhase !== 'INITIALIZATION' && 
      (userMessage.includes('KBO_INITIAL_DATA') || userMessage.includes('[INITIAL_DATA_PACK]'))) {
    console.warn('[Context Injector] ⚠️ InitialData가 일반 메시지에 포함됨. 제거합니다.');
    userMessage = userMessage
      .replace(/\[INITIAL_DATA_PACK\][\s\S]*?(?=\n\n|$)/g, '')
      .replace(/KBO_INITIAL_DATA/g, '');
  }

  // 컨텍스트 타입 결정
  const contextType = determineContextType({ ...options, userMessage });

  // 필요한 컨텍스트 추출
  const context = getRelevantContext(contextType, options);

  // 컨텍스트가 있으면 메시지에 추가
  if (context) {
    console.log(`[Context Injector] 컨텍스트 타입: ${contextType}, 크기: ${context.length}자`);
    return `${userMessage}\n\n${context}`;
  }

  return userMessage;
}
