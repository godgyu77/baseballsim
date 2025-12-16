-- ============================================
-- KBO GM 시뮬레이터 - Supabase 테이블 스키마
-- ============================================

-- 1. 사용자 인증은 Supabase Auth를 사용 (별도 테이블 불필요)
--    - auth.users 테이블이 자동 생성됨
--    - user_id는 auth.users.id를 사용

-- 2. 게임 상태 테이블
-- 기존 테이블이 있을 수 있으므로, 제약 조건만 추가
DO $$ 
BEGIN
  -- game_state 테이블이 없으면 생성
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'game_state') THEN
    CREATE TABLE game_state (
      id BIGSERIAL PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
      my_team_id BIGINT NOT NULL REFERENCES teams(id),
      difficulty TEXT NOT NULL DEFAULT 'NORMAL' CHECK (difficulty IN ('EASY', 'NORMAL', 'HARD', 'HELL')),
      owner_persona TEXT DEFAULT 'A',
      current_year INTEGER NOT NULL DEFAULT 2026,
      current_month INTEGER NOT NULL DEFAULT 1,
      current_week INTEGER NOT NULL DEFAULT 1,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      CONSTRAINT game_state_user_team_unique UNIQUE(user_id, my_team_id) -- 한 사용자는 한 팀당 하나의 게임만
    );
  ELSE
    -- 기존 테이블에 UNIQUE 제약 조건 추가 (없는 경우에만)
    IF NOT EXISTS (
      SELECT 1 FROM pg_constraint 
      WHERE conname = 'game_state_user_team_unique'
    ) THEN
      ALTER TABLE game_state 
      ADD CONSTRAINT game_state_user_team_unique UNIQUE(user_id, my_team_id);
    END IF;
  END IF;
END $$;

-- updated_at 자동 업데이트 트리거
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_game_state_updated_at
  BEFORE UPDATE ON game_state
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 3. 게임 메시지 히스토리 테이블 (채팅 기록 저장)
-- game_state에 UNIQUE 제약 조건이 있는지 확인 후 생성
DO $$
BEGIN
  -- game_state에 UNIQUE 제약 조건이 있는지 확인
  IF EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'game_state_user_team_unique'
  ) THEN
    -- game_messages 테이블 생성 (외래 키 포함)
    IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'game_messages') THEN
      CREATE TABLE game_messages (
        id BIGSERIAL PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
        team_id BIGINT NOT NULL, -- my_team_id와 타입 일치
        role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'model', 'system')),
        content TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        -- 외래 키: game_state의 (user_id, my_team_id) 조합 참조
        CONSTRAINT fk_game_messages_game_state 
          FOREIGN KEY (user_id, team_id) 
          REFERENCES game_state(user_id, my_team_id) 
          ON DELETE CASCADE
      );
    END IF;
  ELSE
    RAISE EXCEPTION 'game_state 테이블에 UNIQUE(user_id, my_team_id) 제약 조건이 없습니다. 먼저 제약 조건을 추가해주세요.';
  END IF;
END $$;

-- 인덱스 추가 (조회 성능 향상)
CREATE INDEX IF NOT EXISTS idx_game_messages_user_team ON game_messages(user_id, team_id);
CREATE INDEX IF NOT EXISTS idx_game_messages_created_at ON game_messages(created_at DESC);

-- 4. RLS (Row Level Security) 정책 설정
-- 사용자는 자신의 데이터만 조회/수정 가능

-- game_state RLS
ALTER TABLE game_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own game state"
  ON game_state FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own game state"
  ON game_state FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own game state"
  ON game_state FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own game state"
  ON game_state FOR DELETE
  USING (auth.uid() = user_id);

-- game_messages RLS
ALTER TABLE game_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own messages"
  ON game_messages FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own messages"
  ON game_messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own messages"
  ON game_messages FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own messages"
  ON game_messages FOR DELETE
  USING (auth.uid() = user_id);

-- 5. teams 테이블에 code 컬럼 추가 (고유 문자열 코드)
DO $$
BEGIN
  -- teams 테이블에 code 컬럼이 없으면 추가
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'teams' 
    AND column_name = 'code'
  ) THEN
    ALTER TABLE teams ADD COLUMN code TEXT UNIQUE;
    CREATE INDEX IF NOT EXISTS idx_teams_code ON teams(code);
    COMMENT ON COLUMN teams.code IS '팀 고유 코드 (예: kia, samsung, hanwha)';
  END IF;
END $$;

-- teams RLS (모든 사용자가 읽기 가능)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'teams' 
    AND policyname = 'Allow public read access to teams'
  ) THEN
    ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
    CREATE POLICY "Allow public read access to teams"
      ON teams FOR SELECT
      USING (true);
  END IF;
END $$;

-- 6. finance_logs 테이블의 외래 키 제약 조건 수정 (ON DELETE CASCADE 추가)
DO $$
BEGIN
  -- finance_logs_team_id_fkey 제약 조건이 존재하는지 확인
  IF EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'finance_logs_team_id_fkey'
  ) THEN
    -- 기존 제약 조건 삭제
    ALTER TABLE finance_logs 
    DROP CONSTRAINT finance_logs_team_id_fkey;
    
    -- ON DELETE CASCADE가 포함된 새로운 제약 조건 추가
    ALTER TABLE finance_logs 
    ADD CONSTRAINT finance_logs_team_id_fkey 
    FOREIGN KEY (team_id) 
    REFERENCES teams(id) 
    ON DELETE CASCADE;
    
    RAISE NOTICE 'finance_logs_team_id_fkey 제약 조건이 ON DELETE CASCADE로 업데이트되었습니다.';
  ELSE
    -- 제약 조건이 없으면 새로 생성 (테이블이 존재하는 경우)
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'finance_logs') THEN
      ALTER TABLE finance_logs 
      ADD CONSTRAINT finance_logs_team_id_fkey 
      FOREIGN KEY (team_id) 
      REFERENCES teams(id) 
      ON DELETE CASCADE;
      
      RAISE NOTICE 'finance_logs_team_id_fkey 제약 조건이 생성되었습니다 (ON DELETE CASCADE 포함).';
    END IF;
  END IF;
END $$;

-- 7. game_state 테이블의 외래 키 제약 조건도 확인 및 수정
DO $$
DECLARE
  constraint_name TEXT;
BEGIN
  -- game_state의 my_team_id 외래 키 제약 조건 찾기
  SELECT conname INTO constraint_name
  FROM pg_constraint 
  WHERE conrelid = 'game_state'::regclass
  AND confrelid = 'teams'::regclass
  AND contype = 'f'
  AND pg_get_constraintdef(oid) LIKE '%my_team_id%'
  LIMIT 1;
  
  IF constraint_name IS NOT NULL THEN
    -- 기존 제약 조건 삭제
    EXECUTE format('ALTER TABLE game_state DROP CONSTRAINT %I', constraint_name);
    
    -- ON DELETE CASCADE가 포함된 새로운 제약 조건 추가
    ALTER TABLE game_state 
    ADD CONSTRAINT game_state_my_team_id_fkey 
    FOREIGN KEY (my_team_id) 
    REFERENCES teams(id) 
    ON DELETE CASCADE;
    
    RAISE NOTICE 'game_state_my_team_id_fkey 제약 조건이 ON DELETE CASCADE로 업데이트되었습니다.';
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'game_state 외래 키 제약 조건 수정 중 오류 (무시): %', SQLERRM;
END $$;

-- 8. finance_logs 테이블에 user_id 추가 및 RLS 정책 설정
DO $$
BEGIN
  -- finance_logs 테이블에 user_id 컬럼이 없으면 추가
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'finance_logs') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'finance_logs' 
      AND column_name = 'user_id'
    ) THEN
      ALTER TABLE finance_logs ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
      CREATE INDEX IF NOT EXISTS idx_finance_logs_user_id ON finance_logs(user_id);
      RAISE NOTICE 'finance_logs 테이블에 user_id 컬럼이 추가되었습니다.';
    END IF;
    
    -- RLS 활성화 및 정책 추가
    ALTER TABLE finance_logs ENABLE ROW LEVEL SECURITY;
    
    -- 기존 정책 삭제 (있다면)
    DROP POLICY IF EXISTS "Users can view their own finance logs" ON finance_logs;
    DROP POLICY IF EXISTS "Users can insert their own finance logs" ON finance_logs;
    DROP POLICY IF EXISTS "Users can update their own finance logs" ON finance_logs;
    DROP POLICY IF EXISTS "Users can delete their own finance logs" ON finance_logs;
    
    -- 새 정책 생성
    CREATE POLICY "Users can view their own finance logs"
      ON finance_logs FOR SELECT
      USING (auth.uid() = user_id);
    
    CREATE POLICY "Users can insert their own finance logs"
      ON finance_logs FOR INSERT
      WITH CHECK (auth.uid() = user_id);
    
    CREATE POLICY "Users can update their own finance logs"
      ON finance_logs FOR UPDATE
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
    
    CREATE POLICY "Users can delete their own finance logs"
      ON finance_logs FOR DELETE
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- 9. coaches 테이블에 user_id 추가 및 RLS 정책 설정
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'coaches') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'coaches' 
      AND column_name = 'user_id'
    ) THEN
      ALTER TABLE coaches ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
      CREATE INDEX IF NOT EXISTS idx_coaches_user_id ON coaches(user_id);
      RAISE NOTICE 'coaches 테이블에 user_id 컬럼이 추가되었습니다.';
    END IF;
    
    -- RLS 활성화 및 정책 추가
    ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
    
    DROP POLICY IF EXISTS "Users can view their own coaches" ON coaches;
    DROP POLICY IF EXISTS "Users can insert their own coaches" ON coaches;
    DROP POLICY IF EXISTS "Users can update their own coaches" ON coaches;
    DROP POLICY IF EXISTS "Users can delete their own coaches" ON coaches;
    
    CREATE POLICY "Users can view their own coaches"
      ON coaches FOR SELECT
      USING (auth.uid() = user_id);
    
    CREATE POLICY "Users can insert their own coaches"
      ON coaches FOR INSERT
      WITH CHECK (auth.uid() = user_id);
    
    CREATE POLICY "Users can update their own coaches"
      ON coaches FOR UPDATE
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
    
    CREATE POLICY "Users can delete their own coaches"
      ON coaches FOR DELETE
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- 10. season_stats 테이블에 user_id 추가 및 RLS 정책 설정
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'season_stats') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'season_stats' 
      AND column_name = 'user_id'
    ) THEN
      ALTER TABLE season_stats ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
      CREATE INDEX IF NOT EXISTS idx_season_stats_user_id ON season_stats(user_id);
      RAISE NOTICE 'season_stats 테이블에 user_id 컬럼이 추가되었습니다.';
    END IF;
    
    -- RLS 활성화 및 정책 추가
    ALTER TABLE season_stats ENABLE ROW LEVEL SECURITY;
    
    DROP POLICY IF EXISTS "Users can view their own season stats" ON season_stats;
    DROP POLICY IF EXISTS "Users can insert their own season stats" ON season_stats;
    DROP POLICY IF EXISTS "Users can update their own season stats" ON season_stats;
    DROP POLICY IF EXISTS "Users can delete their own season stats" ON season_stats;
    
    CREATE POLICY "Users can view their own season stats"
      ON season_stats FOR SELECT
      USING (auth.uid() = user_id);
    
    CREATE POLICY "Users can insert their own season stats"
      ON season_stats FOR INSERT
      WITH CHECK (auth.uid() = user_id);
    
    CREATE POLICY "Users can update their own season stats"
      ON season_stats FOR UPDATE
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
    
    CREATE POLICY "Users can delete their own season stats"
      ON season_stats FOR DELETE
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- 11. retired_numbers 테이블에 user_id 추가 및 RLS 정책 설정 (선택적 - 공통 데이터일 수도 있음)
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'retired_numbers') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'retired_numbers' 
      AND column_name = 'user_id'
    ) THEN
      -- user_id를 nullable로 추가 (공통 데이터일 수도 있음)
      ALTER TABLE retired_numbers ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;
      CREATE INDEX IF NOT EXISTS idx_retired_numbers_user_id ON retired_numbers(user_id);
      RAISE NOTICE 'retired_numbers 테이블에 user_id 컬럼이 추가되었습니다 (nullable).';
    END IF;
    
    -- RLS 활성화 및 정책 추가 (user_id가 null이면 공통 데이터로 간주)
    ALTER TABLE retired_numbers ENABLE ROW LEVEL SECURITY;
    
    DROP POLICY IF EXISTS "Users can view their own retired numbers" ON retired_numbers;
    DROP POLICY IF EXISTS "Users can view public retired numbers" ON retired_numbers;
    DROP POLICY IF EXISTS "Users can insert their own retired numbers" ON retired_numbers;
    DROP POLICY IF EXISTS "Users can update their own retired numbers" ON retired_numbers;
    DROP POLICY IF EXISTS "Users can delete their own retired numbers" ON retired_numbers;
    
    -- 자신의 데이터 또는 공통 데이터(user_id가 null) 조회 가능
    CREATE POLICY "Users can view retired numbers"
      ON retired_numbers FOR SELECT
      USING (auth.uid() = user_id OR user_id IS NULL);
    
    CREATE POLICY "Users can insert their own retired numbers"
      ON retired_numbers FOR INSERT
      WITH CHECK (auth.uid() = user_id);
    
    CREATE POLICY "Users can update their own retired numbers"
      ON retired_numbers FOR UPDATE
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
    
    CREATE POLICY "Users can delete their own retired numbers"
      ON retired_numbers FOR DELETE
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- 12. game_messages 테이블의 잘못된 외래 키 제약 조건 수정
DO $$
BEGIN
  -- 잘못된 외래 키 제약 조건들 삭제
  IF EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'fk_game_messages_game_state' 
    AND conrelid = 'game_messages'::regclass
  ) THEN
    -- 여러 개의 같은 이름 제약 조건이 있을 수 있으므로 모두 삭제
    ALTER TABLE game_messages DROP CONSTRAINT IF EXISTS fk_game_messages_game_state;
  END IF;
  
  -- 올바른 복합 외래 키 제약 조건 추가 (이미 있다면 스킵)
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'fk_game_messages_game_state_composite'
    AND conrelid = 'game_messages'::regclass
  ) THEN
    IF EXISTS (
      SELECT 1 FROM pg_constraint 
      WHERE conname = 'game_state_user_team_unique'
    ) THEN
      ALTER TABLE game_messages 
      ADD CONSTRAINT fk_game_messages_game_state_composite
      FOREIGN KEY (user_id, team_id) 
      REFERENCES game_state(user_id, my_team_id) 
      ON DELETE CASCADE;
      
      RAISE NOTICE 'game_messages 테이블의 외래 키 제약 조건이 수정되었습니다.';
    END IF;
  END IF;
END $$;

-- 13. players 테이블 RLS 정책 (공통 데이터이므로 모든 사용자가 읽기 가능)
DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'players') THEN
    ALTER TABLE players ENABLE ROW LEVEL SECURITY;
    
    DROP POLICY IF EXISTS "Allow public read access to players" ON players;
    
    CREATE POLICY "Allow public read access to players"
      ON players FOR SELECT
      USING (true);
    
    -- INSERT, UPDATE, DELETE는 서비스 역할 키로만 가능 (RLS 정책 없음 = 차단)
  END IF;
END $$;

-- 14. 기존 테이블들 (teams는 이미 RLS 정책이 설정됨)

