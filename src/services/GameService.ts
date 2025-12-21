import { supabase } from '../lib/supabase';
import type { GamePlayer } from '../types/index';

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
    // game_players도 함께 삭제 (CASCADE로 자동 삭제되지만 명시적으로)
    await supabase.from('game_players').delete().eq('user_id', userId).eq('team_id', actualTeamId);
    // ⚠️ 주의: user_id만으로 삭제하면 다른 팀 세이브까지 전부 삭제될 수 있음
    await supabase.from('game_state').delete().eq('user_id', userId).eq('my_team_id', actualTeamId);
    await supabase.from('finance_logs').delete().eq('user_id', userId).eq('team_id', actualTeamId); 
    await supabase.from('game_messages').delete().eq('user_id', userId).eq('team_id', actualTeamId);

    // 3. game_state 생성 (budget 포함)
    const { data: newGameState, error: stateError } = await supabase
      .from('game_state')
      .insert({
        user_id: userId,
        my_team_id: actualTeamId, // 실제 DB ID 사용
        difficulty: difficulty,
        owner_persona: ownerType,
        current_year: 2026,
        current_month: 1,
        current_week: 1,
        budget: startBudget  // game_state.budget에 저장 (teams.budget 사용 안 함)
      })
      .select('id')
      .single();
    
    if (stateError || !newGameState) {
      throw new Error(`게임 상태 생성 실패: ${stateError?.message || '알 수 없는 오류'}`);
    }

    const gameId = newGameState.id;

    // 4. 초기 로스터를 game_players에 복사 (마스터 데이터 → 유저 인스턴스)
    const { data: masterPlayers, error: playersError } = await supabase
      .from('players')
      .select('id, stats, salary, condition, role')
      .eq('team_id', actualTeamId);

    if (playersError) {
      console.error('마스터 선수 데이터 조회 실패:', playersError);
      throw new Error(`초기 로스터 조회 실패: ${playersError.message}`);
    }

    if (masterPlayers && masterPlayers.length > 0) {
      const gamePlayers = masterPlayers.map(p => ({
        user_id: userId,
        team_id: actualTeamId,
        player_id: p.id,
        game_id: gameId,
        stats: p.stats || {},  // 초기 스탯 복사
        salary: p.salary || 0,
        condition: p.condition || '건강',
        role: p.role || '1군',
      }));

      // 배치 삽입 (성능 최적화)
      const BATCH_SIZE = 50;
      for (let i = 0; i < gamePlayers.length; i += BATCH_SIZE) {
        const batch = gamePlayers.slice(i, i + BATCH_SIZE);
        const { error: insertError } = await supabase
          .from('game_players')
          .insert(batch);

        if (insertError) {
          console.error(`게임 선수 데이터 삽입 실패 (배치 ${Math.floor(i / BATCH_SIZE) + 1}):`, insertError);
          throw new Error(`초기 로스터 저장 실패: ${insertError.message}`);
        }
      }

      console.log(`✅ 초기 로스터 ${gamePlayers.length}명이 game_players에 복사되었습니다.`);
    }

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
    roster?: Array<{
      playerId: number;  // players 테이블의 ID
      stats: any;       // JSONB 스탯
      salary: number;   // 연봉 (원 단위)
      condition: string; // 컨디션
      role?: string;    // 역할
    }>;
  }) {
    try {
      // 팀 코드를 DB ID로 변환
      const teamId = await getTeamIdByCode(teamCode);

      // 1. game_state 업데이트 (budget 포함)
      const updateData: any = {};
      if (gameData.currentYear !== undefined) updateData.current_year = gameData.currentYear;
      if (gameData.currentMonth !== undefined) updateData.current_month = gameData.currentMonth;
      if (gameData.currentWeek !== undefined) updateData.current_week = gameData.currentWeek;
      if (gameData.difficulty !== undefined) updateData.difficulty = gameData.difficulty;
      if (gameData.budget !== undefined) updateData.budget = gameData.budget;  // game_state.budget 사용

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

      // 2. 선수 스탯 저장 (game_players 테이블에 UPSERT)
      if (gameData.roster && gameData.roster.length > 0) {
        // Promise.all을 사용하여 병렬 처리 (성능 최적화)
        const upsertPromises = gameData.roster.map(async (player) => {
          const { error: upsertError } = await supabase
            .from('game_players')
            .upsert({
              user_id: userId,
              team_id: teamId,
              player_id: player.playerId,
              stats: player.stats,
              salary: player.salary,
              condition: player.condition,
              role: player.role || '1군',
            }, {
              onConflict: 'user_id,team_id,player_id',  // UNIQUE 제약 조건
            });

          if (upsertError) {
            console.error(`선수 스탯 저장 실패 (player_id: ${player.playerId}):`, upsertError);
            throw new Error(`선수 스탯 저장 실패: ${upsertError.message}`);
          }
        });

        await Promise.all(upsertPromises);
        console.log(`✅ ${gameData.roster.length}명의 선수 스탯이 저장되었습니다.`);
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

      // 1. game_state 조회 (budget 포함)
      const { data: gameState, error: stateError } = await supabase
        .from('game_state')
        .select('*')
        .eq('user_id', userId)
        .eq('my_team_id', teamId)
        .single();

      if (stateError || !gameState) {
        throw new Error(`게임 상태 조회 실패: ${stateError?.message || '게임을 찾을 수 없습니다.'}`);
      }

      // 2. 팀 정보 조회 (budget은 game_state에서 가져오므로 teams.budget은 사용 안 함)
      const { data: team, error: teamError } = await supabase
        .from('teams')
        .select('name, code')
        .eq('id', teamId)
        .single();

      if (teamError || !team) {
        throw new Error(`팀 정보 조회 실패: ${teamError?.message || '팀을 찾을 수 없습니다.'}`);
      }

      // 3. game_players 조회 (저장된 선수 스탯)
      const { data: gamePlayers, error: playersError } = await supabase
        .from('game_players')
        .select('*')
        .eq('user_id', userId)
        .eq('team_id', teamId);

      if (playersError) {
        console.warn('게임 선수 데이터 조회 실패:', playersError);
        // game_players가 없으면 구버전 데이터일 수 있음 (Fallback 처리)
      }

      // 4. 메시지 히스토리 조회
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
        budget: gameState.budget || 3000000000,  // game_state.budget 사용 (기본값: 30억)
        ownerPersona: gameState.owner_persona,
        roster: gamePlayers || [],  // 저장된 선수 데이터 (없으면 빈 배열)
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
