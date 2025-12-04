/**
 * [NEW] AI 능동 트레이드 제안 시스템
 * AI 구단이 유저에게 트레이드를 먼저 제안하는 로직
 */

export interface TradeProposal {
  id: string;
  fromTeam: string; // AI 구단 이름
  toTeam: string; // 유저 구단 이름
  proposedPlayers: Array<{
    playerId: string;
    playerName: string;
    position: string;
    stats?: any;
    salary?: number;
  }>; // AI가 제안하는 선수들
  requestedPlayers: Array<{
    playerId: string;
    playerName: string;
    position: string;
    stats?: any;
    salary?: number;
  }>; // AI가 요청하는 선수들 (유저 팀)
  reason: string; // 제안 이유
  timestamp: number;
}

export interface TeamRoster {
  teamId: string;
  teamName: string;
  players: Array<{
    id: string;
    name: string;
    position: string;
    stats?: any;
    salary?: number;
    isStarter?: boolean;
  }>;
  surplusPositions?: string[]; // 잉여 자원 포지션
  needs?: string[]; // 필요한 포지션
}

/**
 * [NEW] AI 트레이드 제안 생성
 * 일정 확률(예: 5%)로 AI 구단이 유저 구단의 특정 포지션(잉여 자원)을 감지하여 트레이드 제안
 * 
 * @param aiTeam AI 구단 로스터
 * @param userTeam 유저 구단 로스터
 * @param proposalChance 제안 확률 (기본값: 0.05 = 5%)
 * @returns 트레이드 제안 또는 null
 */
export function proposeAiTrade(
  aiTeam: TeamRoster,
  userTeam: TeamRoster,
  proposalChance: number = 0.05
): TradeProposal | null {
  if (!aiTeam || !userTeam) {
    console.warn('[TradeManager] 팀 정보가 유효하지 않습니다.');
    return null;
  }

  // [NEW] 제안 확률 체크
  if (Math.random() > proposalChance) {
    return null; // 제안하지 않음
  }

  // [NEW] 유저 팀의 잉여 자원 감지
  const userSurplusPositions = detectSurplusPositions(userTeam);
  const aiNeeds = detectTeamNeeds(aiTeam);

  if (userSurplusPositions.length === 0 || aiNeeds.length === 0) {
    return null; // 잉여 자원이나 필요 포지션이 없으면 제안하지 않음
  }

  // [NEW] 매칭되는 포지션 찾기
  const matchingPosition = userSurplusPositions.find(pos => 
    aiNeeds.includes(pos)
  );

  if (!matchingPosition) {
    return null; // 매칭되는 포지션이 없으면 제안하지 않음
  }

  // [NEW] 유저 팀에서 해당 포지션의 선수 선택 (잉여 자원)
  const availablePlayers = userTeam.players.filter(
    p => p.position === matchingPosition && !p.isStarter
  );

  if (availablePlayers.length === 0) {
    return null; // 제안할 선수가 없음
  }

  const requestedPlayer = availablePlayers[0]; // 첫 번째 잉여 선수

  // [NEW] AI 팀에서 제안할 선수 선택 (필요 포지션에 맞는 선수 또는 유망주)
  const proposedPlayers = aiTeam.players
    .filter(p => p.position === matchingPosition || !p.isStarter)
    .slice(0, 1); // 1명만 제안

  if (proposedPlayers.length === 0) {
    return null; // 제안할 선수가 없음
  }

  // [NEW] 트레이드 제안 생성
  const proposal: TradeProposal = {
    id: `trade-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    fromTeam: aiTeam.teamName,
    toTeam: userTeam.teamName,
    proposedPlayers: proposedPlayers.map(p => ({
      playerId: p.id,
      playerName: p.name,
      position: p.position,
      stats: p.stats,
      salary: p.salary,
    })),
    requestedPlayers: [{
      playerId: requestedPlayer.id,
      playerName: requestedPlayer.name,
      position: requestedPlayer.position,
      stats: requestedPlayer.stats,
      salary: requestedPlayer.salary,
    }],
    reason: `[${aiTeam.teamName}]이 ${matchingPosition} 포지션 보강을 위해 트레이드를 제안했습니다.`,
    timestamp: Date.now(),
  };

  // [NEW] Logging: AI가 트레이드를 제안할 때 로그 남기기
  console.log(
    `[TradeManager] AI Trade Proposal Generated: ` +
    `${aiTeam.teamName} → ${userTeam.teamName} ` +
    `(${proposedPlayers[0].name} ↔ ${requestedPlayer.name})`
  );

  return proposal;
}

/**
 * [NEW] 잉여 자원 포지션 감지
 * 
 * @param team 팀 로스터
 * @returns 잉여 자원 포지션 목록
 */
function detectSurplusPositions(team: TeamRoster): string[] {
  if (!team.players || team.players.length === 0) {
    return [];
  }

  // 포지션별 선수 수 집계
  const positionCount = new Map<string, number>();
  
  team.players.forEach(player => {
    const pos = player.position || '기타';
    positionCount.set(pos, (positionCount.get(pos) || 0) + 1);
  });

  // [NEW] 잉여 자원 감지: 같은 포지션에 3명 이상 있으면 잉여로 간주
  const surplusPositions: string[] = [];
  positionCount.forEach((count, position) => {
    if (count >= 3) {
      surplusPositions.push(position);
    }
  });

  return surplusPositions;
}

/**
 * [NEW] 팀 필요 포지션 감지
 * 
 * @param team 팀 로스터
 * @returns 필요한 포지션 목록
 */
function detectTeamNeeds(team: TeamRoster): string[] {
  if (!team.players || team.players.length === 0) {
    return ['투수', '타자']; // 기본 필요 포지션
  }

  // 포지션별 선수 수 집계
  const positionCount = new Map<string, number>();
  
  team.players.forEach(player => {
    const pos = player.position || '기타';
    positionCount.set(pos, (positionCount.get(pos) || 0) + 1);
  });

  // [NEW] 필요 포지션 감지: 선수가 1명 이하인 포지션
  const needs: string[] = [];
  const essentialPositions = ['투수', '포수', '1루수', '2루수', '3루수', '유격수', '좌익수', '중견수', '우익수'];
  
  essentialPositions.forEach(position => {
    const count = positionCount.get(position) || 0;
    if (count <= 1) {
      needs.push(position);
    }
  });

  return needs;
}

/**
 * [NEW] 일일 처리 함수 (dailyProcess)
 * 일정 확률로 AI 트레이드 제안을 생성
 * 
 * @param aiTeams AI 구단 목록
 * @param userTeam 유저 구단
 * @param proposalChance 제안 확률 (기본값: 0.05)
 * @returns 생성된 트레이드 제안 목록
 */
export function dailyProcess(
  aiTeams: TeamRoster[],
  userTeam: TeamRoster,
  proposalChance: number = 0.05
): TradeProposal[] {
  if (!aiTeams || !Array.isArray(aiTeams) || aiTeams.length === 0) {
    return [];
  }

  if (!userTeam) {
    return [];
  }

  const proposals: TradeProposal[] = [];

  // [NEW] 각 AI 구단에 대해 트레이드 제안 생성 시도
  for (const aiTeam of aiTeams) {
    const proposal = proposeAiTrade(aiTeam, userTeam, proposalChance);
    if (proposal) {
      proposals.push(proposal);
    }
  }

  if (proposals.length > 0) {
    console.log(
      `[TradeManager] 일일 처리 완료: ${proposals.length}개의 AI 트레이드 제안 생성됨`
    );
  }

  return proposals;
}

