// src/store/useRosterStore.ts
/**
 * [TOKEN OPTIMIZATION] Client-side RAG 패턴 구현
 * 전체 로스터 데이터를 메모리에 저장하고, 사용자 질문에 따라 관련 데이터만 필터링하여 반환
 */

import { create } from 'zustand';
import { ROSTER_DATA, type TeamRoster, type Player } from '../data/RosterData';

interface RosterStore {
  // State
  fullRoster: TeamRoster[];
  isInitialized: boolean;
  
  // Actions
  initializeData: () => void;
  getRelevantContext: (userQuery: string) => string;
}

/**
 * 팀 이름 매핑 (사용자 입력과 매칭)
 */
const TEAM_NAME_VARIANTS: Record<string, string[]> = {
  'KT Wiz': ['kt', '위즈', 'wiz'],
  'Samsung Lions': ['삼성', '라이온즈', 'samsung', 'lions'],
  'Hanwha Eagles': ['한화', '이글스', 'hanwha', 'eagles'],
  'SSG Landers': ['ssg', '랜더스', 'landers'],
  'Kiwoom Heroes': ['키움', '히어로즈', 'kiwoom', 'heroes'],
  'NC Dinos': ['nc', '다이노스', 'dinos'],
  'LG Twins': ['lg', '트윈스', 'twins'],
  'Lotte Giants': ['롯데', '자이언츠', 'lotte', 'giants'],
  'Doosan Bears': ['두산', '베어스', 'doosan', 'bears'],
  'KIA Tigers': ['kia', '타이거즈', 'tigers'],
};

/**
 * 포지션 키워드 매핑
 */
const POSITION_KEYWORDS: Record<string, string[]> = {
  pitcher: ['투수', '선발', '불펜', '마무리', '셋업', 'pitcher'],
  batter: ['타자', '포수', '1루', '2루', '3루', '유격', '외야', '지명타자', 'batter'],
};

/**
 * Zustand 스토어 생성
 */
export const useRosterStore = create<RosterStore>((set, get) => ({
  fullRoster: [],
  isInitialized: false,
  
  /**
   * InitialData.ts에서 로스터 데이터를 파싱하여 메모리에 저장
   * 앱 초기화 시 한 번만 실행
   */
  initializeData: () => {
    if (get().isInitialized) {
      console.log('[RosterStore] 이미 초기화됨');
      return;
    }
    
    console.log('[RosterStore] 로스터 데이터 초기화 시작...');
    set({ 
      fullRoster: ROSTER_DATA,
      isInitialized: true 
    });
    console.log(`[RosterStore] ✅ 초기화 완료: ${ROSTER_DATA.length}개 팀`);
  },
  
  /**
   * 사용자 질문을 분석하여 관련 데이터만 필터링하여 JSON 문자열로 반환
   * 
   * 필터링 로직:
   * 1. 팀 이름 키워드 매칭 → 해당 팀의 로스터만 반환
   * 2. 포지션 키워드 매칭 → 해당 포지션 선수만 반환
   * 3. 매칭 없음 → 상위 20명 또는 빈 문자열 반환
   */
  getRelevantContext: (userQuery: string) => {
    const { fullRoster, isInitialized } = get();
    
    if (!isInitialized || fullRoster.length === 0) {
      console.warn('[RosterStore] 데이터가 초기화되지 않음');
      return '';
    }
    
    const query = userQuery.toLowerCase();
    let filteredPlayers: Player[] = [];
    
    // 1. 팀 이름 매칭
    let matchedTeam: TeamRoster | null = null;
    for (const [teamName, variants] of Object.entries(TEAM_NAME_VARIANTS)) {
      if (variants.some(variant => query.includes(variant.toLowerCase()))) {
        matchedTeam = fullRoster.find(roster => roster.team === teamName) || null;
        if (matchedTeam) {
          console.log(`[RosterStore] 팀 매칭: ${teamName}`);
          break;
        }
      }
    }
    
    // 2. 포지션 키워드 매칭
    const isPitcherQuery = POSITION_KEYWORDS.pitcher.some(kw => query.includes(kw));
    const isBatterQuery = POSITION_KEYWORDS.batter.some(kw => query.includes(kw));
    
    // 3. 데이터 필터링
    if (matchedTeam) {
      if (isPitcherQuery) {
        filteredPlayers = matchedTeam.pitchers;
      } else if (isBatterQuery) {
        filteredPlayers = matchedTeam.batters;
      } else {
        // 팀 매칭되었지만 포지션 지정 없음 → 전체 로스터
        filteredPlayers = [...matchedTeam.pitchers, ...matchedTeam.batters];
      }
    } else {
      // 팀 매칭 없음 → 전체 로스터에서 포지션만 필터링
      if (isPitcherQuery) {
        filteredPlayers = fullRoster.flatMap(team => team.pitchers);
      } else if (isBatterQuery) {
        filteredPlayers = fullRoster.flatMap(team => team.batters);
      } else {
        // 아무 매칭 없음 → 상위 20명만 반환 (토큰 절감)
        const allPlayers = fullRoster.flatMap(team => [...team.pitchers, ...team.batters]);
        filteredPlayers = allPlayers.slice(0, 20);
      }
    }
    
    // 4. JSON 형식으로 변환 (간결하게)
    if (filteredPlayers.length === 0) {
      return '';
    }
    
    // 최대 50명까지만 전송 (토큰 절감)
    const displayPlayers = filteredPlayers.slice(0, 50);
    
    const contextData = {
      count: filteredPlayers.length,
      displayed: displayPlayers.length,
      players: displayPlayers.map(player => ({
        team: matchedTeam?.team || 'ALL',
        name: player.name,
        age: player.age,
        position: player.position,
        hand: player.hand,
        division: player.division,
        stats: player.stats,
        note: player.note,
      })),
    };
    
    return JSON.stringify(contextData, null, 0); // 압축된 JSON
  },
}));
