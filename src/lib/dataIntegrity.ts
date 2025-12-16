/**
 * [FIX] 데이터 무결성 검증 유틸리티
 * InitialData.ts가 유일한 데이터 소스임을 보장
 */

import { ROSTER_DATA, type TeamRoster } from '../constants/prompts/InitialData';
import type { Player } from './utils';

/**
 * [FIX] 팀 이름 매핑 테이블 (한글명 <-> 영문명)
 * InitialData.ts는 영문명으로 저장되지만, UI에서는 한글명을 사용
 */
const TEAM_NAME_MAP: Record<string, string[]> = {
  'KT Wiz': ['KT 위즈', 'KT Wiz', 'kt', 'KT'],
  'Samsung Lions': ['삼성 라이온즈', 'Samsung Lions', '삼성', 'samsung'],
  'Hanwha Eagles': ['한화 이글스', 'Hanwha Eagles', '한화', 'hanwha'],
  'SSG Landers': ['SSG 랜더스', 'SSG Landers', 'SSG', 'ssg'],
  'Kiwoom Heroes': ['키움 히어로즈', 'Kiwoom Heroes', '키움', 'kiwoom'],
  'NC Dinos': ['NC 다이노스', 'NC Dinos', 'NC', 'nc'],
  'LG Twins': ['LG 트윈스', 'LG Twins', 'LG', 'lg'],
  'Lotte Giants': ['롯데 자이언츠', 'Lotte Giants', '롯데', 'lotte'],
  'Doosan Bears': ['두산 베어스', 'Doosan Bears', '두산', 'doosan'],
  'KIA Tigers': ['KIA 타이거즈', 'KIA Tigers', 'KIA', 'kia'],
};

/**
 * [FIX] 팀 이름 정규화 (한글명/영문명 모두 매칭 가능하도록)
 */
function normalizeTeamName(teamName: string): string[] {
  const normalized: string[] = [teamName];
  
  // 매핑 테이블에서 찾기
  for (const [englishName, aliases] of Object.entries(TEAM_NAME_MAP)) {
    if (aliases.some(alias => alias.toLowerCase() === teamName.toLowerCase())) {
      normalized.push(...aliases);
      normalized.push(englishName);
      break;
    }
  }
  
  return normalized;
}

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

    // 4. 유령 데이터 검증 (이정후, 김하성, 김혜성, 오스틴 딘, 박병호 등 InitialData에 없는 선수)
    const ghostPlayers = ['이정후', '김하성', '김혜성', '오스틴 딘', 'Austin Dean', '박병호'];
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

  // [FIX] InitialData.ts에서 해당 팀 찾기 (한글명/영문명 모두 매칭)
  const normalizedNames = normalizeTeamName(teamName);
  const expectedTeam = ROSTER_DATA.find(t => {
    const teamNameLower = t.team.toLowerCase();
    return normalizedNames.some(name => {
      const nameLower = name.toLowerCase();
      return teamNameLower === nameLower || 
             teamNameLower.includes(nameLower) || 
             nameLower.includes(teamNameLower);
    });
  });

  if (!expectedTeam) {
    errors.push(`팀 "${teamName}"의 데이터가 InitialData.ts에 없습니다.`);
    console.warn(`[Data Integrity] 사용 가능한 팀 목록:`, ROSTER_DATA.map(t => t.team));
    console.warn(`[Data Integrity] 정규화된 검색어:`, normalizedNames);
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
  
  // [FIX] 팀 이름 정규화 (한글명/영문명 모두 매칭)
  const normalizedNames = normalizeTeamName(teamName);
  
  console.log(`[Data Integrity] 🔍 팀 이름 검색: "${teamName}"`);
  console.log(`[Data Integrity] 🔍 정규화된 검색어:`, normalizedNames);
  console.log(`[Data Integrity] 🔍 InitialData.ts의 팀 목록:`, allData.map(t => t.team));
  
  const team = allData.find(t => {
    const teamNameLower = t.team.toLowerCase();
    const matched = normalizedNames.some(name => {
      const nameLower = name.toLowerCase();
      const isMatch = teamNameLower === nameLower || 
             teamNameLower.includes(nameLower) || 
             nameLower.includes(teamNameLower);
      if (isMatch) {
        console.log(`[Data Integrity] ✅ 매칭 성공: "${t.team}" <-> "${name}"`);
      }
      return isMatch;
    });
    return matched;
  });

  if (!team) {
    console.error(`[Data Integrity] ❌ 팀 "${teamName}"을 InitialData.ts에서 찾을 수 없습니다.`);
    console.error(`[Data Integrity] 사용 가능한 팀 목록:`, allData.map(t => t.team));
    console.error(`[Data Integrity] 정규화된 검색어:`, normalizedNames);
    console.error(`[Data Integrity] 매칭 실패 - InitialData.ts의 팀 이름 형식과 UI의 팀 이름 형식이 일치하지 않을 수 있습니다.`);
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

/**
 * [CRITICAL] InitialData.ts에서 직접 로스터를 Player[] 형식으로 변환
 * AI 응답을 절대 사용하지 않고, InitialData.ts만 사용
 */
export function getRosterFromInitialDataOnly(teamName: string): Player[] {
  console.log(`[Data Integrity] 📍 getRosterFromInitialDataOnly() 호출됨 - 팀: "${teamName}"`);
  console.trace(`[Data Integrity] 📍 호출 스택:`);
  
  const teamRoster = getTeamRosterFromInitialDataOnly(teamName);
  
  if (!teamRoster) {
    console.error(`[Data Integrity] ❌ 팀 "${teamName}"의 로스터를 InitialData.ts에서 찾을 수 없습니다.`);
    console.error(`[Data Integrity] ❌ 빈 배열을 반환합니다.`);
    return [];
  }

  console.log(`[Data Integrity] ✅ 팀 "${teamName}" 로스터 찾음:`, {
    team: teamRoster.team,
    pitchers: teamRoster.pitchers.length,
    batters: teamRoster.batters.length,
  });

  const players: Player[] = [];

  // 투수 추가
  for (const pitcher of teamRoster.pitchers) {
    players.push({
      id: `pitcher-${pitcher.name}-${Date.now()}`,
      name: pitcher.name,
      position: pitcher.position || '투수',
      age: pitcher.age,
      division: pitcher.division || '1군',
      type: 'pitcher',
      stats: pitcher.stats,
      record: pitcher.record,
      salary: pitcher.salary,
      note: pitcher.note,
    });
  }

  // 타자 추가
  for (const batter of teamRoster.batters) {
    players.push({
      id: `batter-${batter.name}-${Date.now()}`,
      name: batter.name,
      position: batter.position || '타자',
      age: batter.age,
      division: batter.division || '1군',
      type: 'batter',
      stats: batter.stats,
      record: batter.record,
      salary: batter.salary,
      note: batter.note,
    });
  }

  // 선수 이름 목록 출력 (디버깅용)
  const playerNames = players.map(p => p.name);
  console.log(`[Data Integrity] ✅ InitialData.ts에서 직접 로스터 로드 완료: ${teamName} - ${players.length}명 (투수 ${teamRoster.pitchers.length}명, 타자 ${teamRoster.batters.length}명)`);
  console.log(`[Data Integrity] 📋 로드된 선수 목록 (처음 10명):`, playerNames.slice(0, 10));
  
  // 특정 선수 확인 (디버깅용)
  const checkPlayers = ['최원태', '이정후', '김민석', '강백호', '고우석', '김혜성'];
  for (const checkName of checkPlayers) {
    const found = players.find(p => p.name === checkName);
    if (found) {
      console.log(`[Data Integrity] ✅ "${checkName}" 발견: 팀="${teamRoster.team}", 포지션="${found.position}"`);
    }
  }
  
  return players;
}

/**
 * [DEPRECATED] 로스터 필터링 함수 - 더 이상 사용하지 않음
 * 대신 getRosterFromInitialDataOnly()를 사용하세요
 * @deprecated AI 응답의 로스터를 필터링하는 대신, InitialData.ts에서 직접 가져오세요
 */
export function filterRosterByInitialData(
  roster: Player[],
  currentTeamName: string
): Player[] {
  // [CRITICAL] 필터링 대신 InitialData.ts에서 직접 가져오기
  console.warn(`[Data Integrity] ⚠️ filterRosterByInitialData()는 deprecated입니다. getRosterFromInitialDataOnly()를 사용하세요.`);
  return getRosterFromInitialDataOnly(currentTeamName);
}

