import { supabase } from '../lib/supabase';

export class ContextService {
  
  /**
   * AI에게 주입할 게임의 현재 상태 텍스트를 생성합니다.
   * @param teamCode 팀 코드 (예: 'kia', 'samsung', 'hanwha')
   * @param userId 사용자 ID (필수: game_players 조회를 위해)
   */
  static async generateGameContext(teamCode: string, userId: string): Promise<string> {
    // 팀 코드로 DB ID 조회
    const { data: teamData, error: teamError } = await supabase
      .from('teams')
      .select('id')
      .eq('code', teamCode)
      .single();

    if (teamError || !teamData) {
      return `❌ [SYSTEM ERROR] 팀 코드 "${teamCode}"에 해당하는 팀을 찾을 수 없습니다.`;
    }

    const teamId = teamData.id;
    
    // 1. 병렬 쿼리로 필요한 데이터 한 번에 조회 (속도 최적화)
    const [gameStateRes, teamRes, gamePlayersRes, masterPlayersRes, retiredRes] = await Promise.all([
      // game_state 조회 (user_id 필터링 필수)
      supabase.from('game_state')
        .select('*')
        .eq('user_id', userId)
        .eq('my_team_id', teamId)
        .single(),
      
      // 팀 정보 조회
      supabase.from('teams').select('*').eq('id', teamId).single(),
      
      // game_players 조회 (저장된 선수 스탯 - 우선 사용)
      supabase.from('game_players')
        .select(`
          *,
          players!inner(id, name, position)
        `)
        .eq('user_id', userId)
        .eq('team_id', teamId)
        .order('salary', { ascending: false })
        .limit(28),
      
      // 마스터 players 조회 (Fallback용 - game_players가 없을 경우)
      supabase.from('players')
        .select('id, name, position, role, stats, condition, salary')
        .eq('team_id', teamId)
        .or('role.eq.1군,role.eq.선발,role.eq.마무리,role.eq.불펜,role.eq.지명타자,role.eq.내야수,role.eq.외야수')
        .order('salary', { ascending: false })
        .limit(28),
        
      // 영구결번 조회
      supabase.from('retired_numbers').select('*').eq('team_id', teamId)
    ]);

    const gameState = gameStateRes.data;
    const team = teamRes.data;
    const gamePlayers = gamePlayersRes.data || [];
    const masterPlayers = masterPlayersRes.data || [];
    const retired = retiredRes.data || [];

    // 예외 처리: 게임 상태가 없으면 에러 메시지 반환
    if (!gameState || !team) {
      return "❌ [SYSTEM ERROR] 게임 상태를 불러올 수 없습니다. '게임 시작'을 먼저 진행해주세요.";
    }

    // 2. 로스터 결정: game_players 우선, 없으면 마스터 데이터 사용 (Fallback)
    let roster: Array<{
      name: string;
      position: string;
      role?: string;
      stats: any;
      condition: string;
      salary: number;
    }>;

    if (gamePlayers && gamePlayers.length > 0) {
      // game_players 데이터 사용 (저장된 스탯)
      roster = gamePlayers.map(gp => {
        const player = (gp as any).players;  // JOIN된 players 데이터
        return {
          name: player?.name || '알 수 없음',
          position: player?.position || '?',
          role: gp.role || '1군',
          stats: gp.stats || {},
          condition: gp.condition || '건강',
          salary: gp.salary || 0,
        };
      });
    } else {
      // Fallback: 마스터 데이터 사용 (구버전 호환성)
      console.warn(`[ContextService] game_players 데이터가 없습니다. 마스터 데이터를 사용합니다. (user_id: ${userId}, team_id: ${teamId})`);
      roster = masterPlayers.map(p => ({
        name: p.name,
        position: p.position,
        role: p.role || '1군',
        stats: p.stats || {},
        condition: p.condition || '건강',
        salary: p.salary || 0,
      }));
    }

    // 3. 샐러리캡 및 재정 계산
    const totalSalary = roster.reduce((sum, p) => sum + (p.salary || 0), 0);
    
    // 난이도별 샐러리캡 한도 (만원 단위)
    let capLimit = 1370000; // Normal: 137억
    if (gameState.difficulty === 'HELL') capLimit = 1000000; // Hell: 100억
    if (gameState.difficulty === 'EASY') capLimit = 2500000; // Easy: 250억
    if (gameState.difficulty === 'HARD') capLimit = 1200000; // Hard: 120억

    const salaryCapPercent = ((totalSalary / capLimit) * 100).toFixed(1);

    // 4. 로스터 문자열 포맷팅
    const rosterString = roster.map(p => {
      const s = p.stats as any; // JSONB 타입
      let statSummary = '';
      
      if (p.position === 'P') {
        statSummary = `구속${s.velocity || '?'}km/구위${s.stuff || '?'}/제구${s.control || '?'}`;
      } else {
        statSummary = `컨택${s.contact || '?'}/파워${s.power || '?'}/수비${s.field || '?'}`;
      }
      
      return `- [${p.position}] ${p.name} (${p.role || '1군'}): ${statSummary} | 연봉 ${(p.salary/10000).toFixed(1)}억 | 컨디션 ${p.condition}`;
    }).join('\n');

    // 5. 영구결번 문자열 포맷팅
    const retiredString = retired.length > 0 
      ? retired.map(r => `${r.back_number}번(${r.player_name})`).join(', ')
      : "없음";

    // 6. 최종 프롬프트 조립 (Markdown Format)
    // budget은 game_state.budget 사용 (teams.budget 사용 안 함)
    const budget = gameState.budget || 3000000000;  // 기본값: 30억

    return `
[CURRENT_GAME_CONTEXT]
- **일자**: ${gameState.current_year}년 ${gameState.current_month}월 ${gameState.current_week}주차
- **모드**: ${gameState.difficulty} (구단주 성향: ${gameState.owner_persona || 'A'})
- **구단**: ${team.name} (${team.region})
- **재정**: ${(budget / 100000000).toFixed(1)}억 원 (보유 자금)
- **샐러리캡**: ${(totalSalary/10000).toFixed(1)}억 / ${(capLimit/10000).toFixed(1)}억 (${salaryCapPercent}%)

**[1군 핵심 로스터 (Top 28)]**
${rosterString}

**[영구결번 (사용 금지)]**
${retiredString}
`;
  }
}