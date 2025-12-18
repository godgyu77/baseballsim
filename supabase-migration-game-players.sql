-- ============================================
-- KBO GM 시뮬레이터 - 다중 사용자 격리 마이그레이션
-- ============================================
-- 실행 방법: Supabase SQL Editor에서 이 스크립트를 실행하세요.
-- 목적: 
--   1. game_players 테이블 생성 (유저별 선수 인스턴스 저장)
--   2. game_state에 budget 컬럼 추가 (teams.budget 대신 사용)

-- ============================================
-- STEP 1: game_state 테이블에 budget 컬럼 추가
-- ============================================
DO $$
BEGIN
  -- game_state 테이블에 budget 컬럼이 없으면 추가
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'game_state' 
    AND column_name = 'budget'
  ) THEN
    ALTER TABLE game_state 
    ADD COLUMN budget BIGINT DEFAULT 3000000000;  -- 기본값: 30억 원 (NORMAL 모드)
    
    COMMENT ON COLUMN game_state.budget IS '게임 보유 자금 (원 단위). teams.budget 대신 사용됨.';
    
    RAISE NOTICE 'game_state.budget 컬럼이 추가되었습니다.';
  ELSE
    RAISE NOTICE 'game_state.budget 컬럼이 이미 존재합니다.';
  END IF;
END $$;

-- ============================================
-- STEP 2: game_players 테이블 생성
-- ============================================
DO $$
BEGIN
  -- game_players 테이블이 없으면 생성
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'game_players') THEN
    CREATE TABLE game_players (
      id BIGSERIAL PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      team_id BIGINT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
      player_id BIGINT NOT NULL REFERENCES players(id) ON DELETE CASCADE,  -- 마스터 데이터 참조
      game_id BIGINT REFERENCES game_state(id) ON DELETE CASCADE,  -- 선택적: 게임별 인스턴스
      
      -- 변동 가능한 데이터
      stats JSONB NOT NULL,  -- 현재 스탯 (초기값은 players.stats 복사)
      salary BIGINT NOT NULL DEFAULT 0,  -- 현재 연봉 (원 단위)
      condition TEXT DEFAULT '건강',  -- 컨디션
      role TEXT,  -- 현재 역할 (1군/2군/선발/마무리 등)
      
      -- 메타데이터
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      
      -- 제약 조건
      CONSTRAINT game_players_stats_check 
        CHECK (stats IS NOT NULL),
      CONSTRAINT game_players_salary_check 
        CHECK (salary >= 0)
    );
    
    -- 복합 UNIQUE 제약 조건: 한 유저는 한 팀의 한 선수당 하나의 인스턴스만
    ALTER TABLE game_players 
    ADD CONSTRAINT game_players_user_team_player_unique 
    UNIQUE(user_id, team_id, player_id);
    
    -- 인덱스 생성 (조회 성능 향상)
    CREATE INDEX idx_game_players_user_team ON game_players(user_id, team_id);
    CREATE INDEX idx_game_players_player ON game_players(player_id);
    CREATE INDEX idx_game_players_game ON game_players(game_id) WHERE game_id IS NOT NULL;
    
    -- JSONB 인덱스 (stats 필드 쿼리 최적화)
    CREATE INDEX idx_game_players_stats ON game_players USING GIN (stats);
    
    COMMENT ON TABLE game_players IS '유저별 게임 인스턴스의 선수 데이터. players 테이블의 마스터 데이터를 복사하여 게임 진행 중 변동된 스탯을 저장.';
    COMMENT ON COLUMN game_players.user_id IS '게임을 플레이하는 사용자 ID';
    COMMENT ON COLUMN game_players.team_id IS '소속 팀 ID';
    COMMENT ON COLUMN game_players.player_id IS '마스터 players 테이블의 선수 ID';
    COMMENT ON COLUMN game_players.game_id IS '게임 인스턴스 ID (선택적)';
    COMMENT ON COLUMN game_players.stats IS '현재 선수 스탯 (JSONB). 게임 진행 중 변동 가능.';
    COMMENT ON COLUMN game_players.salary IS '현재 연봉 (원 단위)';
    COMMENT ON COLUMN game_players.condition IS '선수 컨디션 (건강, 경미한 부상, 중상 등)';
    COMMENT ON COLUMN game_players.role IS '현재 역할 (1군, 2군, 선발, 마무리 등)';
    
    RAISE NOTICE 'game_players 테이블이 생성되었습니다.';
  ELSE
    RAISE NOTICE 'game_players 테이블이 이미 존재합니다.';
  END IF;
END $$;

-- ============================================
-- STEP 3: updated_at 자동 업데이트 트리거
-- ============================================
-- update_updated_at_column 함수는 이미 존재할 수 있으므로 CREATE OR REPLACE 사용
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- game_players 테이블의 updated_at 트리거 생성
DROP TRIGGER IF EXISTS update_game_players_updated_at ON game_players;
CREATE TRIGGER update_game_players_updated_at
  BEFORE UPDATE ON game_players
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- STEP 4: RLS (Row Level Security) 정책 설정
-- ============================================
DO $$
BEGIN
  -- game_players RLS 활성화
  ALTER TABLE game_players ENABLE ROW LEVEL SECURITY;
  
  -- 기존 정책 삭제 (있다면)
  DROP POLICY IF EXISTS "Users can view their own game players" ON game_players;
  DROP POLICY IF EXISTS "Users can insert their own game players" ON game_players;
  DROP POLICY IF EXISTS "Users can update their own game players" ON game_players;
  DROP POLICY IF EXISTS "Users can delete their own game players" ON game_players;
  
  -- 새 정책 생성
  CREATE POLICY "Users can view their own game players"
    ON game_players FOR SELECT
    USING (auth.uid() = user_id);
  
  CREATE POLICY "Users can insert their own game players"
    ON game_players FOR INSERT
    WITH CHECK (auth.uid() = user_id);
  
  CREATE POLICY "Users can update their own game players"
    ON game_players FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);
  
  CREATE POLICY "Users can delete their own game players"
    ON game_players FOR DELETE
    USING (auth.uid() = user_id);
  
  RAISE NOTICE 'game_players RLS 정책이 설정되었습니다.';
END $$;

-- ============================================
-- STEP 5: 기존 데이터 마이그레이션 (선택적)
-- ============================================
-- 주의: 이 섹션은 기존 게임 데이터가 있는 경우에만 실행하세요.
-- 기존 game_state의 budget을 teams.budget에서 복사하는 로직
-- (실제로는 게임 시작 시점에 budget이 설정되므로 대부분 불필요)

-- 기존 game_state에 budget이 NULL인 경우, teams.budget을 복사 (한 번만 실행)
DO $$
BEGIN
  UPDATE game_state gs
  SET budget = t.budget
  FROM teams t
  WHERE gs.my_team_id = t.id
    AND gs.budget IS NULL
    AND t.budget IS NOT NULL;
  
  IF FOUND THEN
    RAISE NOTICE '기존 game_state의 budget이 teams.budget에서 복사되었습니다.';
  ELSE
    RAISE NOTICE '마이그레이션할 기존 budget 데이터가 없습니다.';
  END IF;
END $$;

-- ============================================
-- 완료 메시지
-- ============================================
DO $$
BEGIN
  RAISE NOTICE '============================================';
  RAISE NOTICE '마이그레이션 완료!';
  RAISE NOTICE '============================================';
  RAISE NOTICE '1. game_state.budget 컬럼 추가됨';
  RAISE NOTICE '2. game_players 테이블 생성됨';
  RAISE NOTICE '3. RLS 정책 설정됨';
  RAISE NOTICE '4. 인덱스 생성됨';
  RAISE NOTICE '';
  RAISE NOTICE '다음 단계:';
  RAISE NOTICE '- GameService.ts 수정 (startNewGame, saveGame, loadGame)';
  RAISE NOTICE '- ContextService.ts 수정 (generateGameContext)';
  RAISE NOTICE '- TypeScript 타입 정의 업데이트';
  RAISE NOTICE '============================================';
END $$;

