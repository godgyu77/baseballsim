import { supabase } from '../lib/supabase';

export class ContextService {
  
  /**
   * AI에게 주입할 게임의 현재 상태 텍스트를 생성합니다.
   * @param teamCode 팀 코드 (예: 'kia', 'samsung', 'hanwha')
   */
  static async generateGameContext(teamCode: string): Promise<string> {
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
    const [gameStateRes, teamRes, rosterRes, retiredRes] = await Promise.all([
      supabase.from('game_state').select('*').eq('my_team_id', teamId).single(),
      supabase.from('teams').select('*').eq('id', teamId).single(),
      
      // 로스터: 1군 위주로, 연봉 높은 순으로 상위 28명만 조회 (토큰 절약)
      supabase.from('players')
        .select('name, position, role, stats, condition, salary')
        .eq('team_id', teamId)
        .or('role.eq.1군,role.eq.선발,role.eq.마무리,role.eq.불펜,role.eq.지명타자,role.eq.내야수,role.eq.외야수')
        .order('salary', { ascending: false })
        .limit(28),
        
      supabase.from('retired_numbers').select('*').eq('team_id', teamId)
    ]);

    const gameState = gameStateRes.data;
    const team = teamRes.data;
    const roster = rosterRes.data || [];
    const retired = retiredRes.data || [];

    // 예외 처리: 게임 상태가 없으면 에러 메시지 반환
    if (!gameState || !team) {
      return "❌ [SYSTEM ERROR] 게임 상태를 불러올 수 없습니다. '게임 시작'을 먼저 진행해주세요.";
    }

    // 2. 샐러리캡 및 재정 계산
    // (간략화: 실제로는 외국인/국내 구분 로직이 더 필요할 수 있음)
    const totalSalary = roster.reduce((sum, p) => sum + (p.salary || 0), 0);
    
    // 난이도별 샐러리캡 한도 (만원 단위)
    let capLimit = 1370000; // Normal: 137억
    if (gameState.difficulty === 'HELL') capLimit = 1000000; // Hell: 100억
    if (gameState.difficulty === 'EASY') capLimit = 2500000; // Easy: 250억

    const salaryCapPercent = ((totalSalary / capLimit) * 100).toFixed(1);

    // 3. 로스터 문자열 포맷팅
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

    // 4. 영구결번 문자열 포맷팅
    const retiredString = retired.length > 0 
      ? retired.map(r => `${r.back_number}번(${r.player_name})`).join(', ')
      : "없음";

    // 5. 최종 프롬프트 조립 (Markdown Format)
    return `
[CURRENT_GAME_CONTEXT]
- **일자**: ${gameState.current_year}년 ${gameState.current_month}월 ${gameState.current_week}주차
- **모드**: ${gameState.difficulty} (구단주 성향: ${gameState.owner_persona || 'A'})
- **구단**: ${team.name} (${team.region})
- **재정**: ${(team.budget / 100000000).toFixed(1)}억 원 (보유 자금)
- **샐러리캡**: ${(totalSalary/10000).toFixed(1)}억 / ${(capLimit/10000).toFixed(1)}억 (${salaryCapPercent}%)

**[1군 핵심 로스터 (Top 28)]**
${rosterString}

**[영구결번 (사용 금지)]**
${retiredString}
`;
  }
}