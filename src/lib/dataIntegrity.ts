/**
 * [FIX] 데이터 무결성 검증 유틸리티
 * InitialData.ts가 유일한 데이터 소스임을 보장
 */

import { ROSTER_DATA, type TeamRoster } from '../constants/prompts/InitialData';

/**
 * [FIX] InitialData.ts에서 로드된 데이터 검증
 * 데이터 소스 오염 방지를 위한 엄격한 검증
 */
export function validateInitialDataIntegrity(): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 1. ROSTER_DATA가 존재하는지 확인
  if (!ROSTER_DATA || !Array.isArray(ROSTER_DATA)) {
    errors.push('ROSTER_DATA가 존재하지 않거나 배열이 아닙니다.');
    return { isValid: false, errors, warnings };
  }

  // 2. 각 팀의 데이터 검증
  const expectedTeams = [
    'KT Wiz',
    'KIA Tigers',
    'LG Twins',
    'SSG Landers',
    'Doosan Bears',
    'Samsung Lions',
    'Lotte Giants',
    'NC Dinos',
    'Hanwha Eagles',
    'Kiwoom Heroes',
  ];

  for (const expectedTeam of expectedTeams) {
    const team = ROSTER_DATA.find(t => t.team === expectedTeam);
    
    if (!team) {
      errors.push(`팀 "${expectedTeam}"의 데이터가 InitialData.ts에 없습니다.`);
      continue;
    }

    // 3. 각 팀의 선수 수 검증 (최소 기준)
    const minPitchers = 15;
    const minBatters = 20;
    
    if (!team.pitchers || team.pitchers.length < minPitchers) {
      warnings.push(`팀 "${expectedTeam}"의 투수 수가 부족합니다. (현재: ${team.pitchers?.length || 0}, 최소: ${minPitchers})`);
    }
    
    if (!team.batters || team.batters.length < minBatters) {
      warnings.push(`팀 "${expectedTeam}"의 타자 수가 부족합니다. (현재: ${team.batters?.length || 0}, 최소: ${minBatters})`);
    }

    // 4. 유령 데이터 검증 (이정후, 김하성 등 InitialData에 없는 선수)
    const ghostPlayers = ['이정후', '김하성'];
    const allPlayerNames = [
      ...(team.pitchers || []).map(p => p.name),
      ...(team.batters || []).map(b => b.name),
    ];

    for (const ghostName of ghostPlayers) {
      if (allPlayerNames.includes(ghostName)) {
        errors.push(`[데이터 소스 오염 감지] 팀 "${expectedTeam}"에 유령 선수 "${ghostName}"가 발견되었습니다. InitialData.ts에 없는 선수입니다.`);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * [FIX] 특정 팀의 로스터가 InitialData.ts와 일치하는지 검증
 */
export function validateTeamRosterIntegrity(
  teamName: string,
  loadedRoster?: { pitchers?: any[]; batters?: any[] }
): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  expectedSize: { pitchers: number; batters: number };
  loadedSize: { pitchers: number; batters: number };
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // InitialData.ts에서 해당 팀 찾기
  const expectedTeam = ROSTER_DATA.find(
    t => t.team === teamName || t.team.includes(teamName) || teamName.includes(t.team)
  );

  if (!expectedTeam) {
    errors.push(`팀 "${teamName}"의 데이터가 InitialData.ts에 없습니다.`);
    return {
      isValid: false,
      errors,
      warnings,
      expectedSize: { pitchers: 0, batters: 0 },
      loadedSize: { pitchers: 0, batters: 0 },
    };
  }

  const expectedSize = {
    pitchers: expectedTeam.pitchers.length,
    batters: expectedTeam.batters.length,
  };

  const loadedSize = {
    pitchers: loadedRoster?.pitchers?.length || 0,
    batters: loadedRoster?.batters?.length || 0,
  };

  // 크기 비교
  if (loadedRoster) {
    if (loadedSize.pitchers !== expectedSize.pitchers) {
      warnings.push(
        `투수 수 불일치: InitialData.ts에는 ${expectedSize.pitchers}명, 로드된 데이터에는 ${loadedSize.pitchers}명`
      );
    }

    if (loadedSize.batters !== expectedSize.batters) {
      warnings.push(
        `타자 수 불일치: InitialData.ts에는 ${expectedSize.batters}명, 로드된 데이터에는 ${loadedSize.batters}명`
      );
    }

    // 선수 이름 비교 (유령 데이터 감지)
    const expectedPlayerNames = new Set([
      ...expectedTeam.pitchers.map(p => p.name),
      ...expectedTeam.batters.map(b => b.name),
    ]);

    const loadedPlayerNames = [
      ...(loadedRoster.pitchers || []).map((p: any) => p.name),
      ...(loadedRoster.batters || []).map((b: any) => b.name),
    ];

    for (const loadedName of loadedPlayerNames) {
      if (!expectedPlayerNames.has(loadedName)) {
        errors.push(
          `[데이터 소스 오염] 팀 "${teamName}"에 InitialData.ts에 없는 선수 "${loadedName}"가 발견되었습니다.`
        );
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    expectedSize,
    loadedSize,
  };
}

/**
 * [FIX] InitialData.ts를 강제로 사용하도록 보장하는 헬퍼
 * 다른 데이터 소스와 병합하지 않고 순수하게 InitialData만 반환
 */
export function getInitialDataOnly(): TeamRoster[] {
  // [FIX] Force load from InitialData only - Deep Copy to prevent mutation
  const data = JSON.parse(JSON.stringify(ROSTER_DATA)) as TeamRoster[];
  
  // 검증 실행
  const validation = validateInitialDataIntegrity();
  
  if (!validation.isValid) {
    console.error('[Data Integrity] ❌ 데이터 무결성 검증 실패:', validation.errors);
    throw new Error(`데이터 무결성 검증 실패: ${validation.errors.join(', ')}`);
  }

  if (validation.warnings.length > 0) {
    console.warn('[Data Integrity] ⚠️ 데이터 무결성 경고:', validation.warnings);
  }

  console.log('[Data Integrity] ✅ InitialData.ts에서 데이터 로드 완료:', {
    teamCount: data.length,
    totalPitchers: data.reduce((sum, t) => sum + t.pitchers.length, 0),
    totalBatters: data.reduce((sum, t) => sum + t.batters.length, 0),
  });

  return data;
}

/**
 * [FIX] 특정 팀의 로스터를 InitialData.ts에서만 가져오기
 */
export function getTeamRosterFromInitialDataOnly(teamName: string): TeamRoster | null {
  const allData = getInitialDataOnly();
  const team = allData.find(
    t => t.team === teamName || t.team.includes(teamName) || teamName.includes(t.team)
  );

  if (!team) {
    console.warn(`[Data Integrity] 팀 "${teamName}"을 InitialData.ts에서 찾을 수 없습니다.`);
    return null;
  }

  // 검증
  const validation = validateTeamRosterIntegrity(teamName, team);
  
  if (!validation.isValid) {
    console.error(`[Data Integrity] 팀 "${teamName}" 데이터 검증 실패:`, validation.errors);
  }

  console.log(`[Data Integrity] ✅ 팀 "${teamName}" 로스터 로드 완료:`, {
    pitchers: team.pitchers.length,
    batters: team.batters.length,
  });

  return team;
}

