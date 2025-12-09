/**
 * [FIX] Sequential Data Fetching - 로스터 데이터 분리 요청
 * 데이터 무결성을 위해 투수와 타자를 순차적으로 요청하여 데이터 잘림을 방지합니다.
 */

import { Player } from './utils';

export interface RosterFetchResult {
  pitchers: Player[];
  batters: Player[];
  success: boolean;
  error?: string;
}

/**
 * 투수 로스터만 요청하는 프롬프트 생성
 */
function createPitcherRosterPrompt(teamName: string): string {
  return `[ROSTER REQUEST: PITCHERS ONLY]
${teamName}의 투수진 로스터만 출력하십시오.

**요구사항:**
1. 1군과 2군 모든 투수를 포함하십시오.
2. [ROSTER: [...]] 형식으로 JSON 배열을 출력하십시오.
3. 타자 데이터는 포함하지 마십시오.
4. 데이터는 절대 잘리지 않도록 모든 투수를 포함하십시오.

각 선수는 다음 형식을 따르십시오:
{
  "id": "unique-id",
  "name": "선수명",
  "position": "포지션",
  "age": 나이,
  "division": "1군" 또는 "2군",
  "type": "pitcher",
  "stats": {...},
  "record": {...},
  "salary": 연봉,
  "note": "비고"
}`;
}

/**
 * 타자 로스터만 요청하는 프롬프트 생성
 */
function createBatterRosterPrompt(teamName: string): string {
  return `[ROSTER REQUEST: BATTERS ONLY]
${teamName}의 타자진 로스터만 출력하십시오.

**요구사항:**
1. 1군과 2군 모든 타자를 포함하십시오.
2. [ROSTER: [...]] 형식으로 JSON 배열을 출력하십시오.
3. 투수 데이터는 포함하지 마십시오.
4. 데이터는 절대 잘리지 않도록 모든 타자를 포함하십시오.

각 선수는 다음 형식을 따르십시오:
{
  "id": "unique-id",
  "name": "선수명",
  "position": "포지션",
  "age": 나이,
  "division": "1군" 또는 "2군",
  "type": "batter",
  "stats": {...},
  "record": {...},
  "salary": 연봉,
  "note": "비고"
}`;
}

import { ROSTER_DATA } from '../constants/prompts/InitialData';

/**
 * [FIX] InitialData.ts에서 모든 선수 이름 추출 (유령 데이터 필터링용)
 */
function getAllPlayerNamesFromInitialData(): Set<string> {
  const playerNames = new Set<string>();
  
  for (const team of ROSTER_DATA) {
    for (const pitcher of team.pitchers) {
      playerNames.add(pitcher.name);
    }
    for (const batter of team.batters) {
      playerNames.add(batter.name);
    }
  }
  
  return playerNames;
}

/**
 * [FIX] 팀 이름 정규화 헬퍼 (한글명/영문명 매칭용)
 */
function normalizeTeamNameForComparison(teamName: string): string[] {
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
  
  const normalized: string[] = [teamName];
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
 * [FIX] 팀 이름이 같은지 비교 (한글명/영문명 모두 매칭)
 */
function isSameTeam(team1: string, team2: string): boolean {
  const normalized1 = normalizeTeamNameForComparison(team1);
  const normalized2 = normalizeTeamNameForComparison(team2);
  
  return normalized1.some(n1 => 
    normalized2.some(n2 => n1.toLowerCase() === n2.toLowerCase())
  );
}

/**
 * [FIX] 선수 이름으로 올바른 팀 찾기 (잘못된 팀 배치 수정용)
 */
function findCorrectTeamForPlayer(playerName: string): string | null {
  for (const team of ROSTER_DATA) {
    const allPlayers = [...team.pitchers, ...team.batters];
    if (allPlayers.some(p => p.name === playerName)) {
      return team.team;
    }
  }
  
  return null;
}

/**
 * [CRITICAL] AI 응답에서 로스터 데이터 파싱 - 더 이상 사용하지 않음
 * InitialData.ts에서만 로스터를 가져오도록 변경
 * @deprecated AI 응답의 로스터를 파싱하지 않고, InitialData.ts에서 직접 가져오세요
 */
function parseRosterFromResponse(responseText: string, teamName: string): Player[] {
  // [CRITICAL] AI 응답의 로스터는 절대 사용하지 않음
  console.warn(`[RosterFetcher] ⚠️ AI 응답의 로스터 파싱은 무시됩니다. InitialData.ts에서만 로스터를 가져옵니다.`);
  return [];
}

/**
 * 투수 로스터만 요청
 */
export async function fetchPitcherRoster(
  chatInstance: any,
  teamName: string,
  onProgress?: (status: string) => void
): Promise<Player[]> {
  if (onProgress) {
    onProgress('투수 데이터 수신 중...');
  }
  
  const prompt = createPitcherRosterPrompt(teamName);
  const result = await chatInstance.sendMessageStream(prompt);
  
  let fullText = '';
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    if (chunkText) {
      fullText += chunkText;
    }
  }
  
  // [CRITICAL] AI 응답의 로스터를 무시하고 InitialData.ts에서만 가져오기
  console.warn(`[RosterFetcher] ⚠️ AI 응답의 투수 로스터는 무시하고 InitialData.ts에서 직접 로드합니다.`);
  const allPlayers = getRosterFromInitialDataOnly(teamName);
  const pitchers = allPlayers.filter(p => p.type === 'pitcher');
  console.log(`[RosterFetcher] InitialData.ts에서 투수 로스터 로드 완료: ${pitchers.length}명`);
  
  return pitchers;
}

/**
 * 타자 로스터만 요청
 */
export async function fetchBatterRoster(
  chatInstance: any,
  teamName: string,
  onProgress?: (status: string) => void
): Promise<Player[]> {
  if (onProgress) {
    onProgress('타자 데이터 수신 중...');
  }
  
  const prompt = createBatterRosterPrompt(teamName);
  const result = await chatInstance.sendMessageStream(prompt);
  
  let fullText = '';
  for await (const chunk of result.stream) {
    const chunkText = chunk.text();
    if (chunkText) {
      fullText += chunkText;
    }
  }
  
  // [CRITICAL] AI 응답의 로스터를 무시하고 InitialData.ts에서만 가져오기
  console.warn(`[RosterFetcher] ⚠️ AI 응답의 타자 로스터는 무시하고 InitialData.ts에서 직접 로드합니다.`);
  const allPlayers = getRosterFromInitialDataOnly(teamName);
  const batters = allPlayers.filter(p => p.type === 'batter');
  console.log(`[RosterFetcher] InitialData.ts에서 타자 로스터 로드 완료: ${batters.length}명`);
  
  return batters;
}

/**
 * [CRITICAL] InitialData.ts에서 직접 전체 로스터 가져오기
 * AI 응답을 사용하지 않고 InitialData.ts만 사용
 */
export async function fetchFullRosterSequentially(
  chatInstance: any,
  teamName: string,
  onProgress?: (status: string) => void
): Promise<RosterFetchResult> {
  try {
    // [CRITICAL] AI 응답을 무시하고 InitialData.ts에서만 가져오기
    if (onProgress) {
      onProgress('InitialData.ts에서 로스터 로드 중...');
    }
    
    console.warn(`[RosterFetcher] ⚠️ AI 응답을 무시하고 InitialData.ts에서 직접 로스터를 로드합니다.`);
    const allPlayers = getRosterFromInitialDataOnly(teamName);
    
    // 투수와 타자 분리
    const pitchers = allPlayers.filter(p => p.type === 'pitcher');
    const batters = allPlayers.filter(p => p.type === 'batter');
    
    if (onProgress) {
      onProgress('로스터 로드 완료');
    }
    
    if (pitchers.length < 20) {
      console.warn(`[RosterFetcher] 투수 로스터가 예상보다 적습니다: ${pitchers.length}명`);
    }
    
    if (batters.length < 30) {
      console.warn(`[RosterFetcher] 타자 로스터가 예상보다 적습니다: ${batters.length}명`);
    }
    
    // Step 3: 두 배열 합치기
    const fullRoster = [...pitchers, ...batters];
    
    console.log(`[RosterFetcher] 전체 로스터 완성: 투수 ${pitchers.length}명 + 타자 ${batters.length}명 = 총 ${fullRoster.length}명`);
    
    return {
      pitchers,
      batters,
      success: true,
    };
  } catch (error) {
    console.error('[RosterFetcher] 로스터 요청 실패:', error);
    return {
      pitchers: [],
      batters: [],
      success: false,
      error: error instanceof Error ? error.message : '알 수 없는 오류',
    };
  }
}

