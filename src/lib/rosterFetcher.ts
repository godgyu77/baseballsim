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
 * AI 응답에서 로스터 데이터 파싱
 * [FIX] InitialData.ts에 없는 선수 필터링 및 잘못된 팀 배치 수정
 */
function parseRosterFromResponse(responseText: string, teamName: string): Player[] {
  const rosterRegex = /\[ROSTER:\s*(\[[\s\S]*?\])\]/gs;
  const rosterMatch = responseText.match(rosterRegex);
  
  if (!rosterMatch) {
    return [];
  }
  
  try {
    const firstMatch = rosterMatch[0];
    const jsonMatch = firstMatch.match(/\[ROSTER:\s*(\[[\s\S]*?\])\]/s);
    if (jsonMatch && jsonMatch[1]) {
      const rosterArray = JSON.parse(jsonMatch[1]);
      if (Array.isArray(rosterArray)) {
        // [FIX] InitialData.ts에서 모든 선수 이름 가져오기
        const validPlayerNames = getAllPlayerNamesFromInitialData();
        
        const filteredPlayers = rosterArray
          .map((player: any) => {
            const playerName = player.name || '';
            
            // [FIX] InitialData.ts에 없는 선수는 제외
            if (!validPlayerNames.has(playerName)) {
              console.warn(`[RosterFetcher] ⚠️ 유령 선수 감지 및 제외: "${playerName}" (InitialData.ts에 없음)`);
              return null;
            }
            
            // [FIX] 잘못된 팀에 배치된 선수 감지
            const correctTeam = findCorrectTeamForPlayer(playerName);
            if (correctTeam && correctTeam !== teamName) {
              console.warn(`[RosterFetcher] ⚠️ 잘못된 팀 배치 감지: "${playerName}"는 "${correctTeam}"에 있어야 하는데 "${teamName}"에 배치됨. 제외합니다.`);
              return null;
            }
            
            return {
              id: player.id || `${player.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              name: player.name || '',
              position: player.position || '',
              age: player.age,
              division: player.division,
              type: player.type,
              stats: player.stats,
              record: player.record,
              salary: player.salary,
              note: player.note,
            };
          })
          .filter((p: Player | null): p is Player => p !== null);
        
        if (filteredPlayers.length < rosterArray.length) {
          console.warn(`[RosterFetcher] ⚠️ ${rosterArray.length - filteredPlayers.length}명의 유령/잘못 배치된 선수가 필터링되었습니다.`);
        }
        
        return filteredPlayers;
      }
    }
  } catch (e) {
    console.error('[RosterFetcher] 로스터 파싱 오류:', e);
  }
  
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
  
  const pitchers = parseRosterFromResponse(fullText, teamName);
  console.log(`[RosterFetcher] 투수 로스터 수신 완료: ${pitchers.length}명`);
  
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
  
  const batters = parseRosterFromResponse(fullText, teamName);
  console.log(`[RosterFetcher] 타자 로스터 수신 완료: ${batters.length}명`);
  
  return batters;
}

/**
 * 투수와 타자 로스터를 순차적으로 요청하여 전체 로스터 완성
 */
export async function fetchFullRosterSequentially(
  chatInstance: any,
  teamName: string,
  onProgress?: (status: string) => void
): Promise<RosterFetchResult> {
  try {
    // Step 1: 투수 로스터 요청
    const pitchers = await fetchPitcherRoster(chatInstance, teamName, onProgress);
    
    if (pitchers.length < 20) {
      console.warn(`[RosterFetcher] 투수 로스터가 예상보다 적습니다: ${pitchers.length}명`);
    }
    
    // Step 2: 타자 로스터 요청
    const batters = await fetchBatterRoster(chatInstance, teamName, onProgress);
    
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

