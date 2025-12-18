# 🔍 데이터베이스 아키텍처 감사 리포트
## 다중 사용자 격리 및 선수 스탯 영속성 분석

**작성일**: 2025-12-09  
**대상**: `GameService`, `ContextService`, Supabase 스키마  
**목적**: 다중 사용자 환경에서의 데이터 격리 및 선수 스탯 영속성 검증

---

## 📊 EXECUTIVE SUMMARY

### 🚨 **[CRITICAL WARNING]**

현재 시스템은 **다중 사용자 환경에서 선수 스탯 영속성을 지원하지 않습니다**. 

**핵심 문제점:**
1. `players` 테이블이 **정적(Static) 마스터 데이터**로 설계되어 모든 사용자가 공유
2. 게임 진행 중 변동된 선수 스탯이 **저장되지 않음**
3. 게임 로드 시 **초기 스탯만 복구**됨 (변동 사항 손실)

---

## 1️⃣ 멀티 유저 격리 분석

### ✅ **PASS** (부분적)

#### 격리된 데이터
- ✅ **`game_state`**: `user_id` 기준 완벽 격리
  - RLS 정책: `auth.uid() = user_id`
  - UNIQUE 제약: `(user_id, my_team_id)`
  - **위치**: `supabase-schema.sql:14-38`

- ✅ **`game_messages`**: `user_id` + `team_id` 기준 격리
  - RLS 정책: `auth.uid() = user_id`
  - 복합 외래 키: `(user_id, team_id)`
  - **위치**: `supabase-schema.sql:64-86`

- ✅ **`finance_logs`**: `user_id` 기준 격리
  - RLS 정책: `auth.uid() = user_id`
  - **위치**: `supabase-schema.sql:229-272`

#### ❌ **격리되지 않은 데이터**

- ❌ **`players` 테이블**: **전역 공유 데이터**
  - RLS 정책: `USING (true)` (모든 사용자 읽기 가능)
  - `user_id` 컬럼 없음
  - `game_id` 컬럼 없음
  - **위치**: `supabase-schema.sql:437-451`
  - **위험도**: 🔴 **CRITICAL**

- ⚠️ **`teams.budget`**: **유저별 격리 없음**
  - `teams` 테이블은 전역 공유
  - `budget` 컬럼이 유저별로 분리되지 않음
  - **위치**: `GameService.ts:127-138`
  - **위험도**: 🟡 **HIGH**

### 🔍 상세 분석

#### `players` 테이블 구조
```sql
-- supabase-schema.sql:437-451
CREATE POLICY "Allow public read access to players"
  ON players FOR SELECT
  USING (true);  -- 모든 사용자가 읽기 가능
```

**현재 스키마:**
- `id` (PK)
- `team_id` (FK → teams.id)
- `name`, `position`, `role`, `stats` (JSONB), `salary`, `condition`
- **`user_id` 없음** ❌
- **`game_id` 없음** ❌

**문제 시나리오:**
```
1. User A가 KIA 팀으로 게임 시작
2. User A가 선수 "고영표"의 구위를 55 → 70으로 성장시킴
3. User B가 KIA 팀으로 게임 시작
4. User B도 "고영표"의 구위가 70으로 표시됨 (User A의 변경사항 반영)
```

**실제 코드 확인:**
```typescript
// ContextService.ts:29-34
supabase.from('players')
  .select('name, position, role, stats, condition, salary')
  .eq('team_id', teamId)  // team_id만 필터링, user_id 없음
  .or('role.eq.1군,role.eq.선발,...')
```

---

## 2️⃣ 선수 스탯 저장 로직 분석

### ❌ **FAIL**

#### `saveGame` 메서드 분석

**위치**: `src/services/GameService.ts:95-174`

**저장되는 데이터:**
1. ✅ `game_state` (날짜, 난이도)
2. ✅ `teams.budget` (자금)
3. ✅ `game_messages` (채팅 히스토리)
4. ❌ **`players.stats` 저장 없음**

**코드 확인:**
```typescript
// GameService.ts:95-174
async saveGame(userId: string, teamCode: string, gameData: {
  messages?: any[];
  currentYear?: number;
  currentMonth?: number;
  currentWeek?: number;
  budget?: number;
  difficulty?: string;
  // ❌ roster?: Player[] 없음
  // ❌ playerStats?: any 없음
}) {
  // ... game_state 업데이트
  // ... teams.budget 업데이트
  // ... game_messages 저장
  // ❌ players 테이블 업데이트 없음
}
```

**결론**: 게임 진행 중 변동된 선수 스탯이 **전혀 저장되지 않음**.

#### 선수 스탯 변경 흐름 추적

1. **게임 시작**: `InitialData.ts`에서 초기 로스터 제공
2. **게임 진행**: AI가 선수 스탯 변경 (예: 성장, 부상)
3. **Context 주입**: `ContextService.generateGameContext()`가 DB에서 조회
   - **문제**: DB에는 초기 스탯만 존재 → 변경사항 반영 안 됨
4. **게임 저장**: `saveGame()` 호출
   - **문제**: 선수 스탯 저장 로직 없음
5. **게임 로드**: `loadGame()` 호출
   - **문제**: `players` 테이블 조회 없음 → 초기 스탯만 복구

---

## 3️⃣ 선수 스탯 로드 로직 분석

### ❌ **FAIL**

#### `loadGame` 메서드 분석

**위치**: `src/services/GameService.ts:203-263`

**로드되는 데이터:**
1. ✅ `game_state` (날짜, 난이도)
2. ✅ `teams` (팀 정보, 예산)
3. ✅ `game_messages` (채팅 히스토리)
4. ❌ **`players` 테이블 조회 없음**

**코드 확인:**
```typescript
// GameService.ts:203-263
async loadGame(userId: string, teamCode: string) {
  // 1. game_state 조회 ✅
  // 2. teams 조회 ✅
  // 3. game_messages 조회 ✅
  // ❌ players 조회 없음
  return {
    // ... gameState, team, messages
    // ❌ roster 없음
  };
}
```

#### `ContextService.generateGameContext()` 분석

**위치**: `src/services/ContextService.ts:9-94`

**동작 방식:**
```typescript
// ContextService.ts:29-34
supabase.from('players')
  .select('name, position, role, stats, condition, salary')
  .eq('team_id', teamId)  // team_id만 필터링
  // ❌ user_id 필터링 없음
```

**문제점:**
- 항상 **초기 마스터 데이터**만 조회
- 게임 진행 중 변경된 스탯이 반영되지 않음
- 모든 사용자가 동일한 선수 데이터를 공유

---

## 4️⃣ 발견된 구조적 결함

### 🔴 **CRITICAL: 선수 스탯 영속성 부재**

#### 문제 1: `players` 테이블이 정적 마스터 데이터
- **현재 상태**: 모든 사용자가 공유하는 초기 로스터
- **문제**: 게임 진행 중 변동된 스탯을 저장할 수 없음
- **영향**: 선수 성장, 부상, 능력치 변화가 저장되지 않음

#### 문제 2: `teams.budget` 유저별 격리 없음
- **현재 상태**: `teams` 테이블의 `budget` 컬럼이 전역 공유
- **문제**: User A가 예산을 변경하면 User B의 예산도 영향받을 수 있음
- **위치**: `GameService.ts:127-138`
```typescript
// ❌ 문제: teams.budget이 전역 공유
await supabase
  .from('teams')
  .update({ budget: gameData.budget })
  .eq('id', teamId);  // user_id 필터링 없음
```

#### 문제 3: `saveGame`에 선수 스탯 저장 로직 없음
- **현재 상태**: `saveGame()` 메서드에 `roster` 또는 `playerStats` 파라미터 없음
- **문제**: 게임 진행 중 변경된 선수 스탯이 저장되지 않음

#### 문제 4: `loadGame`에 선수 스탯 로드 로직 없음
- **현재 상태**: `loadGame()` 메서드가 `players` 테이블을 조회하지 않음
- **문제**: 저장된 선수 스탯을 복구할 수 없음

---

## 5️⃣ 추천 해결 방안

### 🎯 **솔루션 1: `game_players` 테이블 생성 (권장)**

유저별/게임별 선수 인스턴스를 저장하는 별도 테이블 생성.

#### 스키마 설계
```sql
-- game_players 테이블 생성
CREATE TABLE game_players (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  team_id BIGINT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  player_id BIGINT NOT NULL REFERENCES players(id) ON DELETE CASCADE,  -- 마스터 데이터 참조
  game_id BIGINT REFERENCES game_state(id) ON DELETE CASCADE,  -- 선택적: 게임별 인스턴스
  
  -- 변동 가능한 데이터
  stats JSONB NOT NULL,  -- 현재 스탯 (초기값은 players.stats 복사)
  salary BIGINT NOT NULL,  -- 현재 연봉
  condition TEXT DEFAULT '건강',  -- 컨디션
  role TEXT,  -- 현재 역할 (1군/2군/선발 등)
  
  -- 메타데이터
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- 제약 조건
  CONSTRAINT game_players_user_team_player_unique 
    UNIQUE(user_id, team_id, player_id),
  CONSTRAINT game_players_stats_check 
    CHECK (stats IS NOT NULL)
);

-- 인덱스
CREATE INDEX idx_game_players_user_team ON game_players(user_id, team_id);
CREATE INDEX idx_game_players_player ON game_players(player_id);

-- RLS 정책
ALTER TABLE game_players ENABLE ROW LEVEL SECURITY;

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

-- updated_at 자동 업데이트
CREATE TRIGGER update_game_players_updated_at
  BEFORE UPDATE ON game_players
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

#### `GameService.startNewGame()` 수정
```typescript
async startNewGame(userId: string, teamCode: string, difficulty: string, ...) {
  // ... 기존 로직 ...
  
  // 6. 초기 로스터를 game_players에 복사
  const { data: masterPlayers } = await supabase
    .from('players')
    .select('id, stats, salary, condition, role')
    .eq('team_id', actualTeamId);
  
  if (masterPlayers && masterPlayers.length > 0) {
    const gamePlayers = masterPlayers.map(p => ({
      user_id: userId,
      team_id: actualTeamId,
      player_id: p.id,
      stats: p.stats,  // 초기 스탯 복사
      salary: p.salary,
      condition: p.condition || '건강',
      role: p.role,
    }));
    
    await supabase.from('game_players').insert(gamePlayers);
  }
}
```

#### `GameService.saveGame()` 수정
```typescript
async saveGame(userId: string, teamCode: string, gameData: {
  // ... 기존 파라미터 ...
  roster?: Array<{
    playerId: number;
    stats: any;
    salary: number;
    condition: string;
    role: string;
  }>;
}) {
  // ... 기존 로직 ...
  
  // 4. 선수 스탯 저장
  if (gameData.roster && gameData.roster.length > 0) {
    const updates = gameData.roster.map(p => ({
      user_id: userId,
      team_id: teamId,
      player_id: p.playerId,
      stats: p.stats,
      salary: p.salary,
      condition: p.condition,
      role: p.role,
    }));
    
    // UPSERT (존재하면 업데이트, 없으면 삽입)
    for (const update of updates) {
      await supabase
        .from('game_players')
        .upsert(update, {
          onConflict: 'user_id,team_id,player_id',
        });
    }
  }
}
```

#### `ContextService.generateGameContext()` 수정
```typescript
static async generateGameContext(teamCode: string, userId?: string): Promise<string> {
  // ... 기존 로직 ...
  
  // game_players에서 조회 (저장된 스탯 우선)
  const { data: gamePlayers } = await supabase
    .from('game_players')
    .select('*, players!inner(name, position)')
    .eq('user_id', userId)
    .eq('team_id', teamId);
  
  // game_players가 없으면 마스터 데이터 사용 (하위 호환성)
  const roster = gamePlayers || await getMasterRoster(teamId);
  
  // ... 나머지 로직 ...
}
```

---

### 🎯 **솔루션 2: `game_state`에 JSONB 필드 추가 (간단한 대안)**

`game_state` 테이블에 `roster_snapshot` JSONB 필드를 추가하여 선수 스탯을 저장.

#### 스키마 수정
```sql
-- game_state에 roster_snapshot 추가
ALTER TABLE game_state 
ADD COLUMN roster_snapshot JSONB DEFAULT '{}'::jsonb;

-- 인덱스 (선택적)
CREATE INDEX idx_game_state_roster_snapshot 
ON game_state USING GIN (roster_snapshot);
```

#### 장점
- 구현이 간단함
- 별도 테이블 불필요
- 쿼리 성능은 낮지만 작은 규모에서는 충분

#### 단점
- JSONB 쿼리 성능 제한
- 선수별 개별 업데이트 어려움
- 확장성 낮음

---

### 🎯 **솔루션 3: `teams.budget` 유저별 격리**

`game_state`에 `budget` 필드를 추가하고, `teams.budget`는 초기값만 저장.

#### 스키마 수정
```sql
-- game_state에 budget 추가
ALTER TABLE game_state 
ADD COLUMN budget BIGINT DEFAULT 3000000000;  -- 기본값 30억
```

#### `GameService` 수정
```typescript
// saveGame에서 teams.budget 대신 game_state.budget 사용
await supabase
  .from('game_state')
  .update({ budget: gameData.budget })
  .eq('user_id', userId)
  .eq('my_team_id', teamId);
```

---

## 📋 구현 우선순위

### Phase 1: 긴급 수정 (즉시)
1. ✅ `teams.budget` → `game_state.budget`로 이동
2. ✅ `GameService.saveGame()`에 `roster` 파라미터 추가
3. ✅ `GameService.loadGame()`에 `roster` 반환 추가

### Phase 2: 핵심 기능 (1주일 내)
1. ✅ `game_players` 테이블 생성
2. ✅ `GameService.startNewGame()`에 초기 로스터 복사 로직 추가
3. ✅ `GameService.saveGame()`에 선수 스탯 저장 로직 추가
4. ✅ `ContextService.generateGameContext()` 수정 (game_players 우선 조회)

### Phase 3: 최적화 (2주일 내)
1. ✅ 선수 스탯 변경 이력 추적 (선택적)
2. ✅ 배치 업데이트 최적화
3. ✅ 인덱스 튜닝

---

## ✅ 검증 체크리스트

구현 후 다음을 검증해야 합니다:

- [ ] User A가 선수 스탯을 변경해도 User B의 게임에 영향 없음
- [ ] 게임 저장 후 로드 시 변경된 스탯이 정확히 복구됨
- [ ] `game_players` 테이블에 `user_id` 기준으로 데이터 격리됨
- [ ] RLS 정책이 올바르게 작동하여 다른 유저 데이터 접근 불가
- [ ] 초기 게임 시작 시 마스터 데이터가 `game_players`로 복사됨
- [ ] `teams.budget` 대신 `game_state.budget` 사용

---

## 📝 결론

현재 시스템은 **다중 사용자 환경에서 선수 스탯 영속성을 지원하지 않습니다**. 

**즉시 조치 필요:**
1. `game_players` 테이블 생성 (솔루션 1 권장)
2. `teams.budget` → `game_state.budget`로 이동
3. `GameService` 및 `ContextService` 수정

**위험도**: 🔴 **CRITICAL**  
**영향 범위**: 모든 사용자의 게임 진행 데이터  
**예상 작업 시간**: 2-3일

---

**리포트 작성자**: AI Database Architect  
**검토 필요**: 백엔드 리드 개발자, 데이터베이스 관리자

