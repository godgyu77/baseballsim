/**
 * [FIX] 드래프트 로직 검증 및 수정 유틸리티
 * AI 응답에서 드래프트 데이터를 검증하고 필터링하는 함수들
 */

export interface DraftPlayer {
  id?: string;
  name: string;
  position: string;
  team?: string;
  currentTeamId?: string;
  stats?: any;
  [key: string]: any;
}

export interface ProtectedPlayer {
  id?: string;
  name: string;
  teamId?: string;
  [key: string]: any;
}

export interface DraftPick {
  playerId: string;
  playerName: string;
  teamId: string;
  pickNumber: number;
  originalTeamId?: string;
}

export interface TeamRank {
  teamId: string;
  teamName: string;
  lastSeasonRank: number; // 1 = 우승팀, 10 = 최하위팀
}

/**
 * [FIX] 드래프트 로직 수정: 보호선수 필터링 적용
 * 드래프트 풀 생성 시 보호선수 명단에 포함된 선수를 제외
 * 
 * @param draftPool 드래프트 후보 선수 목록
 * @param protectedPlayers 보호선수 명단 (20인 또는 25인)
 * @returns 필터링된 드래프트 풀
 */
export function filterProtectedPlayers(
  draftPool: DraftPlayer[],
  protectedPlayers: ProtectedPlayer[]
): DraftPlayer[] {
  if (!draftPool || !Array.isArray(draftPool)) {
    console.warn('[DraftService] 드래프트 풀이 유효하지 않습니다.');
    return [];
  }

  if (!protectedPlayers || !Array.isArray(protectedPlayers)) {
    console.warn('[DraftService] 보호선수 명단이 유효하지 않습니다.');
    return draftPool; // 보호선수 명단이 없으면 전체 반환
  }

  // [FIX] 보호선수 ID/이름 마스터 리스트 생성 (대소문자 무시)
  const protectedPlayerSet = new Set<string>();
  protectedPlayers.forEach(player => {
    if (player?.id) {
      protectedPlayerSet.add(player.id.toLowerCase().trim());
    }
    if (player?.name) {
      protectedPlayerSet.add(player.name.toLowerCase().trim());
    }
  });

  // [FIX] 보호선수 필터링 - 최상단에 적용
  const filteredPool = draftPool.filter(player => {
    if (!player) return false;

    // ID로 확인
    if (player.id && protectedPlayerSet.has(player.id.toLowerCase().trim())) {
      console.warn(`[DraftService] 보호선수 발견 (ID): ${player.id} - 드래프트 풀에서 제외`);
      return false;
    }

    // 이름으로 확인
    if (player.name && protectedPlayerSet.has(player.name.toLowerCase().trim())) {
      console.warn(`[DraftService] 보호선수 발견 (이름): ${player.name} - 드래프트 풀에서 제외`);
      return false;
    }

    return true;
  });

  const removedCount = draftPool.length - filteredPool.length;
  if (removedCount > 0) {
    console.log(`[DraftService] 보호선수 필터링 완료: ${removedCount}명 제외됨`);
  }

  return filteredPool;
}

/**
 * [FIX] 지명 인덱스 및 카운트 수정
 * 사용자 입력 playerId와 실제 배열 인덱스를 매핑하고, 10명(Max)이 정확히 채워지도록 검증
 * 
 * @param picks 사용자가 선택한 지명 목록
 * @param draftPool 드래프트 풀
 * @param maxPicks 최대 지명 수 (기본값: 10)
 * @returns 검증된 지명 목록
 */
export function validateDraftPicks(
  picks: string[] | DraftPick[],
  draftPool: DraftPlayer[],
  maxPicks: number = 10
): DraftPick[] {
  if (!picks || !Array.isArray(picks)) {
    console.warn('[DraftService] 지명 목록이 유효하지 않습니다.');
    return [];
  }

  if (!draftPool || !Array.isArray(draftPool)) {
    console.warn('[DraftService] 드래프트 풀이 유효하지 않습니다.');
    return [];
  }

  const validatedPicks: DraftPick[] = [];
  const pickedPlayerIds = new Set<string>();

  // [FIX] 반복문 종료 조건 확인: < maxPicks (0부터 시작하므로)
  for (let i = 0; i < picks.length && i < maxPicks; i++) {
    const pick = picks[i];
    
    // 문자열인 경우 (playerId)
    if (typeof pick === 'string') {
      const playerId = pick.trim();
      
      // 중복 확인
      if (pickedPlayerIds.has(playerId)) {
        console.warn(`[DraftService] 중복 지명 감지: ${playerId} - 건너뜀`);
        continue;
      }

      // 드래프트 풀에서 선수 찾기
      const player = draftPool.find(p => 
        p?.id?.toLowerCase().trim() === playerId.toLowerCase().trim() ||
        p?.name?.toLowerCase().trim() === playerId.toLowerCase().trim()
      );

      if (!player) {
        console.warn(`[DraftService] 선수를 찾을 수 없음: ${playerId} - 건너뜀`);
        continue;
      }

      validatedPicks.push({
        playerId: player.id || player.name,
        playerName: player.name,
        teamId: '', // 나중에 설정됨
        pickNumber: i + 1,
        originalTeamId: player.currentTeamId || player.team,
      });

      pickedPlayerIds.add(playerId);
    }
    // 객체인 경우 (DraftPick)
    else if (pick && typeof pick === 'object') {
      const draftPick = pick as DraftPick;
      
      if (!draftPick.playerId && !draftPick.playerName) {
        console.warn(`[DraftService] 유효하지 않은 지명 객체: ${JSON.stringify(pick)}`);
        continue;
      }

      const playerId = draftPick.playerId || draftPick.playerName;
      
      // 중복 확인
      if (pickedPlayerIds.has(playerId)) {
        console.warn(`[DraftService] 중복 지명 감지: ${playerId} - 건너뜀`);
        continue;
      }

      // 드래프트 풀에서 선수 찾기
      const player = draftPool.find(p => 
        p?.id?.toLowerCase().trim() === playerId.toLowerCase().trim() ||
        p?.name?.toLowerCase().trim() === playerId.toLowerCase().trim()
      );

      if (!player) {
        console.warn(`[DraftService] 선수를 찾을 수 없음: ${playerId} - 건너뜀`);
        continue;
      }

      validatedPicks.push({
        playerId: player.id || player.name,
        playerName: player.name || draftPick.playerName,
        teamId: draftPick.teamId || '',
        pickNumber: i + 1,
        originalTeamId: player.currentTeamId || player.team || draftPick.originalTeamId,
      });

      pickedPlayerIds.add(playerId);
    }
  }

  // [FIX] 10명이 정확히 채워졌는지 확인
  if (validatedPicks.length !== maxPicks && validatedPicks.length < picks.length) {
    console.warn(
      `[DraftService] 지명 수 불일치: 요청 ${picks.length}명, 검증 ${validatedPicks.length}명, 최대 ${maxPicks}명`
    );
  }

  return validatedPicks;
}

/**
 * [FIX] 소속 팀 갱신 로직 수정
 * 선수가 지명되는 순간 currentTeamId를 즉시 갱신하고 UI 렌더링용 객체에도 반영
 * 
 * @param picks 지명된 선수 목록
 * @param newTeamId 새로운 소속 팀 ID
 * @returns 팀 정보가 갱신된 지명 목록
 */
export function updatePlayerTeamAffiliation(
  picks: DraftPick[],
  newTeamId: string
): DraftPick[] {
  if (!picks || !Array.isArray(picks)) {
    console.warn('[DraftService] 지명 목록이 유효하지 않습니다.');
    return [];
  }

  if (!newTeamId || typeof newTeamId !== 'string') {
    console.warn('[DraftService] 새로운 팀 ID가 유효하지 않습니다.');
    return picks;
  }

  // [FIX] 각 지명 선수의 소속 팀 즉시 갱신
  return picks.map((pick, index) => {
    const updatedPick: DraftPick = {
      ...pick,
      teamId: newTeamId, // [FIX] 즉시 갱신
      originalTeamId: pick.originalTeamId || pick.teamId, // 이전 팀 정보 보존
    };

    console.log(
      `[DraftService] 선수 소속 팀 갱신: ${pick.playerName} (${pick.originalTeamId || '알 수 없음'} → ${newTeamId})`
    );

    return updatedPick;
  });
}

/**
 * [FIX] 드래프트 순번 정렬 로직
 * 전년도 우승팀(상위팀)이 하위팀보다 먼저 유망주를 지명하는 오류 수정
 * Reverse Order 적용: 하위팀(높은 순위 번호)이 먼저 지명
 * 
 * @param teams 팀 목록 (순위 정보 포함)
 * @returns 드래프트 순서대로 정렬된 팀 목록
 */
export function sortDraftOrder(teams: TeamRank[]): TeamRank[] {
  if (!teams || !Array.isArray(teams)) {
    console.warn('[DraftService] 팀 목록이 유효하지 않습니다.');
    return [];
  }

  // [FIX] lastSeasonRank 기준 내림차순 정렬 (하위팀 먼저)
  // 10위(최하위) → 1위(우승팀) 순서로 정렬
  const sorted = [...teams].sort((a, b) => {
    const rankA = a?.lastSeasonRank ?? 999; // 순위 정보가 없으면 최하위로 처리
    const rankB = b?.lastSeasonRank ?? 999;

    // [FIX] 내림차순 정렬: 높은 순위 번호(하위팀)가 먼저
    // rankB - rankA: 10위(10) - 1위(1) = 9 (양수) → 10위가 앞에 옴
    if (rankA !== rankB) {
      return rankB - rankA; // 내림차순 정렬 (하위팀 우선)
    }

    // 순위가 같으면 팀명으로 정렬 (일관성 유지)
    const nameA = a?.teamName?.toLowerCase() || '';
    const nameB = b?.teamName?.toLowerCase() || '';
    return nameA.localeCompare(nameB);
  });

  console.log(
    `[DraftService] 드래프트 순번 정렬 완료: ${sorted.length}개 팀 (하위팀 우선)`
  );
  sorted.forEach((team, index) => {
    console.log(
      `  ${index + 1}순위: ${team.teamName} (전년도 ${team.lastSeasonRank}위)`
    );
  });

  return sorted;
}

/**
 * [FIX] 드래프트 풀 생성 함수 (통합)
 * 보호선수 필터링, 순번 정렬, 검증을 모두 포함
 * 
 * @param allPlayers 전체 선수 목록
 * @param protectedPlayers 보호선수 명단
 * @param teamRanks 팀 순위 정보
 * @param maxPicks 최대 지명 수
 * @returns 검증된 드래프트 풀 및 순번 정보
 */
export function createDraftPool(
  allPlayers: DraftPlayer[],
  protectedPlayers: ProtectedPlayer[],
  teamRanks?: TeamRank[],
  maxPicks: number = 10
): {
  draftPool: DraftPlayer[];
  draftOrder: TeamRank[];
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // [FIX] 1. 보호선수 필터링 (최상단 적용)
  const draftPool = filterProtectedPlayers(allPlayers, protectedPlayers);

  if (draftPool.length === 0) {
    errors.push('드래프트 풀이 비어있습니다. 보호선수 필터링 후 선수가 없습니다.');
  }

  // [FIX] 2. 드래프트 순번 정렬
  let draftOrder: TeamRank[] = [];
  if (teamRanks && Array.isArray(teamRanks) && teamRanks.length > 0) {
    draftOrder = sortDraftOrder(teamRanks);
  } else {
    errors.push('팀 순위 정보가 없어 드래프트 순번을 정렬할 수 없습니다.');
  }

  // [FIX] 3. 최종 검증
  const isValid = errors.length === 0 && draftPool.length > 0;

  return {
    draftPool,
    draftOrder,
    isValid,
    errors,
  };
}

