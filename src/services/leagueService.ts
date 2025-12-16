/**
 * 리그 서비스
 * Supabase를 통해 구단 및 선수 데이터를 조회합니다.
 */

import { supabase } from '../lib/supabase';
import type { Team, Player } from '../types/db';

/**
 * 포지션 정렬 순서 정의
 * 투수 -> 포수 -> 내야수 -> 외야수 순
 */
const POSITION_ORDER: Record<string, number> = {
  '투수': 1,
  '포수': 2,
  '1루수': 3,
  '2루수': 4,
  '3루수': 5,
  '유격수': 6,
  '좌익수': 7,
  '중견수': 8,
  '우익수': 9,
  '지명타자': 10,
};

/**
 * 포지션 정렬 순서 가져오기
 */
function getPositionOrder(position: string): number {
  return POSITION_ORDER[position] || 99; // 알 수 없는 포지션은 마지막
}

/**
 * 모든 구단 조회
 * 
 * @returns 구단 목록 (이름 순으로 정렬)
 * 
 * @example
 * ```typescript
 * const teams = await fetchAllTeams();
 * console.log(teams); // [{ id: '...', name: 'KIA', budget: 1000000000 }, ...]
 * ```
 */
export async function fetchAllTeams(): Promise<Team[]> {
  try {
    const { data, error } = await supabase
      .from('teams')
      .select('id, name, budget')
      .order('name', { ascending: true }); // 이름 순(가나다) 정렬

    if (error) {
      console.error('[leagueService] fetchAllTeams 오류:', error);
      throw new Error(`구단 목록을 가져오는데 실패했습니다: ${error.message}`);
    }

    if (!data) {
      console.warn('[leagueService] fetchAllTeams: 데이터가 없습니다.');
      return [];
    }

    return data as Team[];
  } catch (error) {
    console.error('[leagueService] fetchAllTeams 예외:', error);
    throw error;
  }
}

/**
 * 팀 로스터 조회
 * 
 * @param teamId 팀 ID (UUID)
 * @returns 선수 목록 (정렬: roster_level -> position -> salary)
 * 
 * 정렬 우선순위:
 * 1. roster_level ('1군'이 먼저)
 * 2. position (투수 -> 포수 -> 내야수 -> 외야수)
 * 3. salary (높은 순)
 * 
 * @example
 * ```typescript
 * const roster = await fetchTeamRoster('team-uuid-here');
 * console.log(roster); // Player[] 배열
 * ```
 */
export async function fetchTeamRoster(teamId: string): Promise<Player[]> {
  try {
    if (!teamId) {
      console.error('[leagueService] fetchTeamRoster: teamId가 필요합니다.');
      return [];
    }

    // 1. 먼저 기본 정렬로 데이터 가져오기 (roster_level, salary)
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('team_id', teamId)
      .eq('is_active', true) // 활성 선수만
      .order('roster_level', { ascending: true }) // 1군 우선 ('1군' < '2군')
      .order('salary', { ascending: false, nullsFirst: false }); // 연봉 높은 순 (null은 마지막)

    if (error) {
      console.error(`[leagueService] fetchTeamRoster 오류 (teamId: ${teamId}):`, error);
      return [];
    }

    if (!data) {
      console.warn(`[leagueService] fetchTeamRoster: 데이터가 없습니다 (teamId: ${teamId})`);
      return [];
    }

    // 2. 클라이언트 사이드에서 position 정렬 적용
    // 정렬 우선순위: roster_level -> position -> salary
    const sortedData = [...data].sort((a, b) => {
      // 1순위: roster_level (1군 우선)
      const levelA = a.roster_level || '';
      const levelB = b.roster_level || '';
      if (levelA !== levelB) {
        // '1군' < '2군' (문자열 비교)
        return levelA.localeCompare(levelB);
      }

      // 2순위: position (투수 -> 포수 -> 내야수 -> 외야수)
      const posOrderA = getPositionOrder(a.position);
      const posOrderB = getPositionOrder(b.position);
      if (posOrderA !== posOrderB) {
        return posOrderA - posOrderB;
      }

      // 3순위: salary (높은 순)
      const salaryA = a.salary ?? 0;
      const salaryB = b.salary ?? 0;
      return salaryB - salaryA; // 내림차순
    });

    return sortedData as Player[];
  } catch (error) {
    console.error(`[leagueService] fetchTeamRoster 예외 (teamId: ${teamId}):`, error);
    return [];
  }
}

