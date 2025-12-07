/**
 * [FIX] 트레이드 NFS 필터링 유틸리티
 * 트레이드 제안 생성 시 NFS(Not For Sale) 선수를 사전에 필터링
 */

export interface Player {
  id?: string;
  name: string;
  position?: string;
  age?: number;
  stats?: any;
  salary?: number;
  note?: string;
  team?: string;
}

export interface TradeSuggestion {
  playerName: string;
  playerId?: string;
  fromTeam: string;
  toTeam: string;
  reason?: string;
}

export interface NFSReason {
  playerName: string;
  reason: 'FRANCHISE_STAR' | 'CORE_PLAYER' | 'PROTECTED' | 'RECENT_ACQUISITION' | 'HIGH_SALARY_CORE';
  description: string;
}

/**
 * [FIX] NFS 선수 판정 함수
 * 프랜차이즈 스타, 핵심 코어, 보호선수 등을 NFS로 판정
 * 
 * @param player 선수 정보
 * @param protectedPlayers 보호선수 명단 (선택적)
 * @returns NFS 여부 및 사유
 */
export function isNFSPlayer(
  player: Player,
  protectedPlayers?: Array<{ id?: string; name?: string }>
): { isNFS: boolean; reason?: NFSReason } {
  if (!player || !player.name) {
    return { isNFS: false };
  }

  const playerName = player.name.toLowerCase().trim();

  // 1. 프랜차이즈 스타 체크 (주요 팀의 상징적 선수)
  const franchiseStars = [
    '임찬규', '박동원', '문보경', '홍창기', '박해민', '오지환', '김현수',
    '양의지', '김도영', '이정후', '강백호', '이정훈', '최정', '김하성'
  ];
  
  if (franchiseStars.some(star => playerName.includes(star.toLowerCase()))) {
    return {
      isNFS: true,
      reason: {
        playerName: player.name,
        reason: 'FRANCHISE_STAR',
        description: '프랜차이즈 스타 - 팀의 상징적 선수'
      }
    };
  }

  // 2. 보호선수 체크
  if (protectedPlayers && protectedPlayers.length > 0) {
    const isProtected = protectedPlayers.some(protected => {
      const protectedId = protected.id?.toLowerCase().trim();
      const protectedName = protected.name?.toLowerCase().trim();
      const playerId = player.id?.toLowerCase().trim();
      
      return (
        (protectedId && playerId && protectedId === playerId) ||
        (protectedName && playerName && protectedName === playerName)
      );
    });

    if (isProtected) {
      return {
        isNFS: true,
        reason: {
          playerName: player.name,
          reason: 'PROTECTED',
          description: '보호선수 명단에 포함된 선수'
        }
      };
    }
  }

  // 3. 핵심 코어 선수 체크 (S급 이상, 30세 이하)
  const stats = player.stats || {};
  const contact = stats.contact || 0;
  const power = stats.power || 0;
  const control = stats.control || 0;
  const velocity = stats.velocity || 0;
  
  const totalStat = (contact + power) || (control + velocity);
  const isCorePlayer = totalStat >= 110 && (player.age || 99) <= 30;

  if (isCorePlayer) {
    return {
      isNFS: true,
      reason: {
        playerName: player.name,
        reason: 'CORE_PLAYER',
        description: '핵심 코어 선수 (S급 이상, 30세 이하)'
      }
    };
  }

  // 4. 고액 연봉 핵심 선수 체크 (연봉 10억 이상 + S급)
  if (player.salary && player.salary >= 1000000000 && totalStat >= 110) {
    return {
      isNFS: true,
      reason: {
        playerName: player.name,
        reason: 'HIGH_SALARY_CORE',
        description: '고액 연봉 핵심 선수 (연봉 10억 이상 + S급)'
      }
    };
  }

  return { isNFS: false };
}

/**
 * [FIX] 트레이드 제안에서 NFS 선수 필터링
 * 
 * @param suggestions 트레이드 제안 목록
 * @param allPlayers 전체 선수 목록 (NFS 판정용)
 * @param protectedPlayers 보호선수 명단 (선택적)
 * @returns 필터링된 제안 목록 및 NFS 로그
 */
export function filterNFSPlayers(
  suggestions: TradeSuggestion[],
  allPlayers: Player[],
  protectedPlayers?: Array<{ id?: string; name?: string }>
): {
  filteredSuggestions: TradeSuggestion[];
  nfsLog: NFSReason[];
} {
  const nfsLog: NFSReason[] = [];
  const filteredSuggestions: TradeSuggestion[] = [];

  suggestions.forEach(suggestion => {
    // 선수 정보 찾기
    const player = allPlayers.find(
      p => 
        (p.id && suggestion.playerId && p.id.toLowerCase() === suggestion.playerId.toLowerCase()) ||
        (p.name && suggestion.playerName && p.name.toLowerCase() === suggestion.playerName.toLowerCase())
    );

    if (!player) {
      // 선수를 찾을 수 없으면 그대로 포함 (AI가 생성한 제안이므로)
      filteredSuggestions.push(suggestion);
      return;
    }

    // NFS 체크
    const { isNFS, reason } = isNFSPlayer(player, protectedPlayers);

    if (isNFS && reason) {
      // NFS 선수는 제외하고 로그에 기록
      nfsLog.push(reason);
      console.warn(
        `[TradeFilter] NFS 선수 필터링: ${reason.playerName} - ${reason.description}`
      );
    } else {
      // NFS가 아니면 포함
      filteredSuggestions.push(suggestion);
    }
  });

  // [MONITORING] NFS 필터링 통계 수집
  if (nfsLog.length > 0 || suggestions.length > 0) {
    const nfsReasons = {
      FRANCHISE_STAR: nfsLog.filter(r => r.reason === 'FRANCHISE_STAR').length,
      CORE_PLAYER: nfsLog.filter(r => r.reason === 'CORE_PLAYER').length,
      PROTECTED: nfsLog.filter(r => r.reason === 'PROTECTED').length,
      RECENT_ACQUISITION: nfsLog.filter(r => r.reason === 'RECENT_ACQUISITION').length,
      HIGH_SALARY_CORE: nfsLog.filter(r => r.reason === 'HIGH_SALARY_CORE').length,
    };

    // monitoringService가 있으면 통계 기록
    try {
      const { monitoringService } = require('./monitoring');
      monitoringService.recordNFSFiltering(
        suggestions.length,
        nfsLog.length,
        nfsReasons,
        nfsLog.map(r => ({
          playerName: r.playerName,
          reason: r.reason,
          description: r.description,
        }))
      );
    } catch (e) {
      // monitoringService가 없으면 무시 (선택적 의존성)
    }
  }

  if (nfsLog.length > 0) {
    console.log(
      `[TradeFilter] 총 ${suggestions.length}개 제안 중 ${nfsLog.length}개 NFS 선수 필터링됨`
    );
    console.log('[TradeFilter] NFS 선수 목록:', nfsLog.map(r => `${r.playerName} (${r.description})`));
  }

  return {
    filteredSuggestions,
    nfsLog
  };
}

