import { supabase } from '../lib/supabase';

/**
 * 팀 코드를 DB ID로 변환하는 헬퍼 함수
 */
async function getTeamIdByCode(teamCode: string): Promise<number> {
  const { data: team, error } = await supabase
    .from('teams')
    .select('id')
    .eq('code', teamCode)
    .single();

  if (error || !team) {
    throw new Error(`팀 코드 "${teamCode}"에 해당하는 팀을 찾을 수 없습니다.`);
  }

  return team.id;
}

export const GameService = {
  /**
   * 새 게임 시작: DB 초기화 및 기본 설정
   * @param userId 사용자 ID
   * @param teamCode 팀 코드 (예: 'kia', 'samsung', 'hanwha')
   * @param difficulty 난이도
   * @param ownerType 구단주 성향 (기본값: 'A')
   * @param teamName 팀 이름 (선택적, 표시용)
   */
  async startNewGame(
    userId: string, 
    teamCode: string, 
    difficulty: string, 
    ownerType: string = 'A',
    teamName?: string
  ) {
    console.log(`🚀 게임 시작: Team ${teamCode}${teamName ? ` (${teamName})` : ''}, Diff ${difficulty}`);

    // 팀 코드로 실제 DB ID 조회
    const actualTeamId = await getTeamIdByCode(teamCode);
    console.log(`[GameService] 팀 코드 "${teamCode}" -> ID ${actualTeamId}`);

    // 1. 난이도별 초기 자금 설정 (단위: 원)
    let startBudget = 3000000000; // NORMAL: 30억
    if (difficulty === 'EASY') startBudget = 8000000000; // 80억
    if (difficulty === 'HARD') startBudget = 2000000000; // 20억
    if (difficulty === 'HELL') startBudget = 1000000000; // 10억

    // 2. 기존 게임 상태 정리 (새 게임 덮어쓰기)
    await supabase.from('game_state').delete().eq('user_id', userId);
    await supabase.from('finance_logs').delete().eq('team_id', actualTeamId); 

    // 3. game_state 생성
    const { error: stateError } = await supabase
      .from('game_state')
      .insert({
        user_id: userId,
        my_team_id: actualTeamId, // 실제 DB ID 사용
        difficulty: difficulty,
        owner_persona: ownerType,
        current_year: 2026,
        current_month: 1,
        current_week: 1
      });
    
    if (stateError) throw new Error(`게임 상태 생성 실패: ${stateError.message}`);

    // 4. 팀 예산 업데이트
    const { error: teamError } = await supabase
      .from('teams')
      .update({ budget: startBudget })
      .eq('id', actualTeamId); // 실제 DB ID 사용
    
    if (teamError) throw new Error(`팀 예산 설정 실패: ${teamError.message}`);

    // 5. 초기 재정 로그 기록
    await supabase.from('finance_logs').insert({
      user_id: userId, // 사용자 ID 추가
      team_id: actualTeamId, // 실제 DB ID 사용
      year: 2026,
      month: 1,
      category: 'Initial',
      amount: startBudget,
      description: `2026 시즌 초기 자금 (${difficulty} 모드)`
    });

    return { success: true };
  },

  /**
   * 게임 상태 저장
   * @param userId 사용자 ID
   * @param teamCode 팀 코드 (예: 'kia', 'samsung', 'hanwha')
   * @param gameData 게임 데이터
   */
  async saveGame(userId: string, teamCode: string, gameData: {
    messages?: any[];
    currentYear?: number;
    currentMonth?: number;
    currentWeek?: number;
    budget?: number;
    difficulty?: string;
  }) {
    try {
      // 팀 코드를 DB ID로 변환
      const teamId = await getTeamIdByCode(teamCode);

      // 1. game_state 업데이트
      const updateData: any = {};
      if (gameData.currentYear !== undefined) updateData.current_year = gameData.currentYear;
      if (gameData.currentMonth !== undefined) updateData.current_month = gameData.currentMonth;
      if (gameData.currentWeek !== undefined) updateData.current_week = gameData.currentWeek;
      if (gameData.difficulty !== undefined) updateData.difficulty = gameData.difficulty;

      if (Object.keys(updateData).length > 0) {
        const { error: stateError } = await supabase
          .from('game_state')
          .update(updateData)
          .eq('user_id', userId)
          .eq('my_team_id', teamId);

        if (stateError) {
          console.error('게임 상태 저장 실패:', stateError);
          throw new Error(`게임 상태 저장 실패: ${stateError.message}`);
        }
      }

      // 2. 팀 예산 업데이트
      if (gameData.budget !== undefined) {
        const { error: budgetError } = await supabase
          .from('teams')
          .update({ budget: gameData.budget })
          .eq('id', teamId);

        if (budgetError) {
          console.error('예산 저장 실패:', budgetError);
          throw new Error(`예산 저장 실패: ${budgetError.message}`);
        }
      }

      // 3. 메시지 히스토리 저장
      if (gameData.messages && gameData.messages.length > 0) {
        // 기존 메시지 삭제 (중복 방지)
        await supabase
          .from('game_messages')
          .delete()
          .eq('user_id', userId)
          .eq('team_id', teamId);

        // 새 메시지 저장
        const messagesToInsert = gameData.messages.map((msg: any) => ({
          user_id: userId,
          team_id: teamId,
          role: msg.role === 'assistant' ? 'model' : msg.role, // Gemini는 'model' 사용
          content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content),
        }));

        if (messagesToInsert.length > 0) {
          const { error: messagesError } = await supabase
            .from('game_messages')
            .insert(messagesToInsert);

          if (messagesError) {
            console.error('메시지 저장 실패:', messagesError);
            // 메시지 저장 실패는 치명적이지 않으므로 경고만
          }
        }
      }

      return { success: true };
    } catch (error: any) {
      console.error('게임 저장 오류:', error);
      throw error;
    }
  },

  /**
   * 저장된 게임 목록 조회
   */
  async loadGameList(userId: string) {
    try {
      const { data: gameStates, error } = await supabase
        .from('game_state')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (error) {
        throw new Error(`게임 목록 조회 실패: ${error.message}`);
      }

      return gameStates || [];
    } catch (error: any) {
      console.error('게임 목록 조회 오류:', error);
      throw error;
    }
  },

  /**
   * 특정 게임 불러오기
   * @param userId 사용자 ID
   * @param teamCode 팀 코드 (예: 'kia', 'samsung', 'hanwha')
   */
  async loadGame(userId: string, teamCode: string) {
    try {
      // 팀 코드를 DB ID로 변환
      const teamId = await getTeamIdByCode(teamCode);

      // 1. game_state 조회
      const { data: gameState, error: stateError } = await supabase
        .from('game_state')
        .select('*')
        .eq('user_id', userId)
        .eq('my_team_id', teamId)
        .single();

      if (stateError || !gameState) {
        throw new Error(`게임 상태 조회 실패: ${stateError?.message || '게임을 찾을 수 없습니다.'}`);
      }

      // 2. 팀 정보 조회
      const { data: team, error: teamError } = await supabase
        .from('teams')
        .select('name, budget, code')
        .eq('id', teamId)
        .single();

      if (teamError || !team) {
        throw new Error(`팀 정보 조회 실패: ${teamError?.message || '팀을 찾을 수 없습니다.'}`);
      }

      // 3. 메시지 히스토리 조회
      const { data: messages, error: messagesError } = await supabase
        .from('game_messages')
        .select('*')
        .eq('user_id', userId)
        .eq('team_id', teamId)
        .order('created_at', { ascending: true });

      if (messagesError) {
        console.warn('메시지 히스토리 조회 실패:', messagesError);
        // 메시지가 없어도 게임은 불러올 수 있음
      }

      return {
        teamCode: team.code,
        teamId: gameState.my_team_id,
        teamName: team.name,
        difficulty: gameState.difficulty,
        currentYear: gameState.current_year,
        currentMonth: gameState.current_month,
        currentWeek: gameState.current_week,
        budget: team.budget,
        ownerPersona: gameState.owner_persona,
        messages: messages?.map((msg) => ({
          role: msg.role === 'model' ? 'assistant' : msg.role,
          content: msg.content,
        })) || [],
      };
    } catch (error: any) {
      console.error('게임 불러오기 오류:', error);
      throw error;
    }
  }
};
