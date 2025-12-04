/**
 * [FIX] 스탯 집계 로직 재검증
 * WAR 계산 및 스탯 총합 검증 유틸리티
 */

export interface GameLog {
  date: string;
  playerId: string;
  playerName: string;
  // 투수 스탯
  inningsPitched?: number;
  earnedRuns?: number;
  strikeouts?: number;
  walks?: number;
  hits?: number;
  wins?: number;
  losses?: number;
  saves?: number;
  holds?: number;
  // 타자 스탯
  atBats?: number;
  hits?: number;
  homeRuns?: number;
  runsBattedIn?: number;
  runs?: number;
  stolenBases?: number;
  walks?: number;
  strikeouts?: number;
  [key: string]: any;
}

export interface SeasonStats {
  // 투수
  inningsPitched: number;
  earnedRuns: number;
  strikeouts: number;
  walks: number;
  hits: number;
  wins: number;
  losses: number;
  saves: number;
  holds: number;
  // 타자
  atBats: number;
  hits: number;
  homeRuns: number;
  runsBattedIn: number;
  runs: number;
  stolenBases: number;
  walks: number;
  strikeouts: number;
  // 계산된 값
  era?: number;
  avg?: number;
  ops?: number;
  war?: number;
}

/**
 * [FIX] 스탯 재계산 함수
 * 기존 totalStats를 믿지 않고 gameLogs 배열을 순회하며 reduce로 실시간 재계산
 * 
 * @param gameLogs 경기 로그 배열
 * @param playerId 선수 ID
 * @param isPitcher 투수 여부
 * @returns 재계산된 시즌 스탯
 */
export function recalculateSeasonStats(
  gameLogs: GameLog[],
  playerId: string,
  isPitcher: boolean = false
): SeasonStats {
  if (!gameLogs || !Array.isArray(gameLogs)) {
    console.warn('[StatsCalculator] 경기 로그가 유효하지 않습니다.');
    return createEmptyStats();
  }

  if (!playerId) {
    console.warn('[StatsCalculator] 선수 ID가 유효하지 않습니다.');
    return createEmptyStats();
  }

  // [FIX] 해당 선수의 로그만 필터링
  const playerLogs = gameLogs.filter(
    log => log?.playerId === playerId || log?.playerName === playerId
  );

  if (playerLogs.length === 0) {
    console.warn(`[StatsCalculator] 선수 ${playerId}의 경기 로그가 없습니다.`);
    return createEmptyStats();
  }

  // [FIX] reduce로 실시간 재계산
  const stats = playerLogs.reduce(
    (accumulator, log) => {
      if (!log || typeof log !== 'object') {
        return accumulator;
      }

      if (isPitcher) {
        // [FIX] 투수 스탯 누적 (소수점 처리: Math.floor 또는 toFixed 사용)
        return {
          ...accumulator,
          inningsPitched: accumulator.inningsPitched + (log.inningsPitched || 0),
          earnedRuns: accumulator.earnedRuns + (log.earnedRuns || 0),
          strikeouts: accumulator.strikeouts + (log.strikeouts || 0),
          walks: accumulator.walks + (log.walks || 0),
          hits: accumulator.hits + (log.hits || 0),
          wins: accumulator.wins + (log.wins || 0),
          losses: accumulator.losses + (log.losses || 0),
          saves: accumulator.saves + (log.saves || 0),
          holds: accumulator.holds + (log.holds || 0),
        };
      } else {
        // [FIX] 타자 스탯 누적
        return {
          ...accumulator,
          atBats: accumulator.atBats + (log.atBats || 0),
          hits: accumulator.hits + (log.hits || 0),
          homeRuns: accumulator.homeRuns + (log.homeRuns || 0),
          runsBattedIn: accumulator.runsBattedIn + (log.runsBattedIn || 0),
          runs: accumulator.runs + (log.runs || 0),
          stolenBases: accumulator.stolenBases + (log.stolenBases || 0),
          walks: accumulator.walks + (log.walks || 0),
          strikeouts: accumulator.strikeouts + (log.strikeouts || 0),
        };
      }
    },
    createEmptyStats()
  );

  // [FIX] 계산된 값 추가 (ERA, AVG, OPS 등)
  if (isPitcher) {
    // ERA = (자책점 * 9) / 이닝
    if (stats.inningsPitched > 0) {
      stats.era = parseFloat(
        ((stats.earnedRuns * 9) / stats.inningsPitched).toFixed(3)
      );
    } else {
      stats.era = 0;
    }
  } else {
    // AVG = 안타 / 타석
    if (stats.atBats > 0) {
      stats.avg = parseFloat((stats.hits / stats.atBats).toFixed(3));
    } else {
      stats.avg = 0;
    }

    // OPS = OBP + SLG (단순화)
    const obp = stats.atBats + stats.walks > 0
      ? parseFloat(((stats.hits + stats.walks) / (stats.atBats + stats.walks)).toFixed(3))
      : 0;
    const slg = stats.atBats > 0
      ? parseFloat(((stats.hits + stats.homeRuns * 2) / stats.atBats).toFixed(3))
      : 0;
    stats.ops = parseFloat((obp + slg).toFixed(3));
  }

  console.log(
    `[StatsCalculator] 스탯 재계산 완료: ${playerId} (${playerLogs.length}경기)`
  );

  return stats;
}

/**
 * [FIX] 빈 스탯 객체 생성
 */
function createEmptyStats(): SeasonStats {
  return {
    inningsPitched: 0,
    earnedRuns: 0,
    strikeouts: 0,
    walks: 0,
    hits: 0,
    wins: 0,
    losses: 0,
    saves: 0,
    holds: 0,
    atBats: 0,
    homeRuns: 0,
    runsBattedIn: 0,
    runs: 0,
    stolenBases: 0,
    era: 0,
    avg: 0,
    ops: 0,
    war: 0,
  };
}

/**
 * [FIX] WAR 계산 함수
 * 가중치(Weights) 상수가 올바르게 적용되는지 확인
 * 
 * @param stats 시즌 스탯
 * @param isPitcher 투수 여부
 * @returns 계산된 WAR 값
 */
export function calculateWAR(stats: SeasonStats, isPitcher: boolean = false): number {
  if (!stats) {
    console.warn('[StatsCalculator] 스탯 데이터가 유효하지 않습니다.');
    return 0;
  }

  // [FIX] WAR 계산 가중치 상수
  const WEIGHTS = {
    // 투수 가중치
    PITCHER: {
      inningsPitched: 0.1,
      strikeouts: 0.05,
      walks: -0.02,
      era: -2.0, // ERA가 낮을수록 좋음 (음수 가중치)
      wins: 0.3,
      saves: 0.2,
      holds: 0.1,
    },
    // 타자 가중치
    BATTER: {
      atBats: 0.01,
      hits: 0.1,
      homeRuns: 0.5,
      runsBattedIn: 0.3,
      runs: 0.2,
      stolenBases: 0.15,
      walks: 0.1,
      strikeouts: -0.05,
      avg: 2.0,
      ops: 3.0,
    },
  };

  let war = 0;

  if (isPitcher) {
    const w = WEIGHTS.PITCHER;
    
    // [FIX] 가중치 상수 적용
    war += (stats.inningsPitched || 0) * w.inningsPitched;
    war += (stats.strikeouts || 0) * w.strikeouts;
    war += (stats.walks || 0) * w.walks;
    war += (stats.era || 0) * w.era; // ERA는 낮을수록 좋으므로 음수 가중치
    war += (stats.wins || 0) * w.wins;
    war += (stats.saves || 0) * w.saves;
    war += (stats.holds || 0) * w.holds;
  } else {
    const w = WEIGHTS.BATTER;
    
    // [FIX] 가중치 상수 적용
    war += (stats.atBats || 0) * w.atBats;
    war += (stats.hits || 0) * w.hits;
    war += (stats.homeRuns || 0) * w.homeRuns;
    war += (stats.runsBattedIn || 0) * w.runsBattedIn;
    war += (stats.runs || 0) * w.runs;
    war += (stats.stolenBases || 0) * w.stolenBases;
    war += (stats.walks || 0) * w.walks;
    war += (stats.strikeouts || 0) * w.strikeouts;
    war += (stats.avg || 0) * w.avg;
    war += (stats.ops || 0) * w.ops;
  }

  // [FIX] 소수점 처리: toFixed(3) 사용
  const finalWar = parseFloat(war.toFixed(3));

  console.log(
    `[StatsCalculator] WAR 계산 완료: ${isPitcher ? '투수' : '타자'} WAR = ${finalWar}`
  );

  return finalWar;
}

/**
 * [FIX] 스탯 총합 검증
 * 타자의 홈런 개수 등 세부 스탯의 총합이 실제 로그와 일치하는지 확인
 * 
 * @param totalStats 저장된 총합 스탯
 * @param gameLogs 실제 경기 로그
 * @param playerId 선수 ID
 * @param isPitcher 투수 여부
 * @returns 검증 결과 및 재계산된 스탯
 */
export function validateStatsTotal(
  totalStats: SeasonStats,
  gameLogs: GameLog[],
  playerId: string,
  isPitcher: boolean = false
): {
  isValid: boolean;
  recalculatedStats: SeasonStats;
  discrepancies: string[];
} {
  const discrepancies: string[] = [];

  // [FIX] gameLogs를 순회하며 실시간 재계산
  const recalculatedStats = recalculateSeasonStats(gameLogs, playerId, isPitcher);

  // [FIX] 총합 검증
  if (isPitcher) {
    if (totalStats.inningsPitched !== recalculatedStats.inningsPitched) {
      discrepancies.push(
        `이닝: 저장 ${totalStats.inningsPitched} vs 계산 ${recalculatedStats.inningsPitched}`
      );
    }
    if (totalStats.earnedRuns !== recalculatedStats.earnedRuns) {
      discrepancies.push(
        `자책점: 저장 ${totalStats.earnedRuns} vs 계산 ${recalculatedStats.earnedRuns}`
      );
    }
    if (totalStats.strikeouts !== recalculatedStats.strikeouts) {
      discrepancies.push(
        `삼진: 저장 ${totalStats.strikeouts} vs 계산 ${recalculatedStats.strikeouts}`
      );
    }
  } else {
    // [FIX] 타자 스탯 검증 (홈런 개수 등)
    if (totalStats.homeRuns !== recalculatedStats.homeRuns) {
      discrepancies.push(
        `홈런: 저장 ${totalStats.homeRuns} vs 계산 ${recalculatedStats.homeRuns}`
      );
    }
    if (totalStats.hits !== recalculatedStats.hits) {
      discrepancies.push(
        `안타: 저장 ${totalStats.hits} vs 계산 ${recalculatedStats.hits}`
      );
    }
    if (totalStats.runsBattedIn !== recalculatedStats.runsBattedIn) {
      discrepancies.push(
        `타점: 저장 ${totalStats.runsBattedIn} vs 계산 ${recalculatedStats.runsBattedIn}`
      );
    }
    if (totalStats.atBats !== recalculatedStats.atBats) {
      discrepancies.push(
        `타석: 저장 ${totalStats.atBats} vs 계산 ${recalculatedStats.atBats}`
      );
    }
  }

  const isValid = discrepancies.length === 0;

  if (!isValid) {
    console.warn(
      `[StatsCalculator] 스탯 총합 불일치 감지: ${playerId}\n` +
      `  불일치 항목:\n${discrepancies.map(d => `    - ${d}`).join('\n')}`
    );
  }

  return {
    isValid,
    recalculatedStats,
    discrepancies,
  };
}

