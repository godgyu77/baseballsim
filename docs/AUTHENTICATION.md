# 인증 시스템 설명서

## 🔐 로그인 검증 방식

이 프로젝트는 **2단계 인증 시스템**을 사용합니다:

### 1단계: 클라이언트 사이드 검증 (프론트엔드)

#### 로그인/회원가입
```typescript
// AuthModal.tsx
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});

// 성공 시 data.user.id를 받아옴
if (data.user) {
  onAuthSuccess(data.user.id);
}
```

#### 세션 확인
```typescript
// App.tsx
const { data: { session } } = await supabase.auth.getSession();

if (session?.user) {
  // 로그인됨
  setUserId(session.user.id);
} else {
  // 로그인 안 됨
  setShowAuthModal(true);
}
```

#### 인증 상태 변경 감지
```typescript
// App.tsx
supabase.auth.onAuthStateChange((_event, session) => {
  if (session?.user) {
    // 로그인 성공
    setUserId(session.user.id);
  } else {
    // 로그아웃
    setUserId(null);
  }
});
```

### 2단계: 서버 사이드 검증 (데이터베이스 - RLS)

#### Row Level Security (RLS) 정책

데이터베이스 레벨에서 자동으로 사용자 검증을 수행합니다.

```sql
-- game_state 테이블 예시
ALTER TABLE game_state ENABLE ROW LEVEL SECURITY;

-- SELECT 정책: 자신의 데이터만 조회 가능
CREATE POLICY "Users can view their own game state"
  ON game_state FOR SELECT
  USING (auth.uid() = user_id);
  -- auth.uid()는 현재 로그인한 사용자의 ID를 반환
  -- user_id와 일치하는 행만 조회 가능

-- INSERT 정책: 자신의 user_id로만 삽입 가능
CREATE POLICY "Users can insert their own game state"
  ON game_state FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE 정책: 자신의 데이터만 수정 가능
CREATE POLICY "Users can update their own game state"
  ON game_state FOR UPDATE
  USING (auth.uid() = user_id)      -- 기존 행 검증
  WITH CHECK (auth.uid() = user_id); -- 새 값 검증

-- DELETE 정책: 자신의 데이터만 삭제 가능
CREATE POLICY "Users can delete their own game state"
  ON game_state FOR DELETE
  USING (auth.uid() = user_id);
```

## 🔒 보안 메커니즘

### 1. JWT 토큰 기반 인증
- Supabase Auth가 JWT(JSON Web Token) 토큰을 생성
- 토큰은 브라우저에 자동 저장 (localStorage)
- 모든 API 요청에 자동으로 토큰이 포함됨

### 2. 데이터베이스 레벨 보안
- **RLS 활성화**: 모든 테이블에 Row Level Security 적용
- **자동 필터링**: 쿼리 시 `auth.uid()`로 자동 필터링
- **다른 사용자 데이터 접근 불가**: 정책 위반 시 자동으로 차단

### 3. 클라이언트 사이드 보호
- 로그인하지 않으면 게임 시작 불가
- 세션 만료 시 자동으로 로그인 모달 표시

## 📋 인증 흐름

```
1. 앱 시작
   ↓
2. App.tsx에서 세션 확인
   ↓
3. 세션 없음 → AuthModal 표시
   ↓
4. 사용자가 로그인/회원가입
   ↓
5. Supabase Auth가 JWT 토큰 생성
   ↓
6. 세션 저장 (브라우저)
   ↓
7. onAuthStateChange 이벤트 발생
   ↓
8. userId 상태 업데이트
   ↓
9. API Key 입력 모달 표시
   ↓
10. 게임 시작 가능
```

## 🛡️ 데이터 접근 보호

### 예시: 게임 상태 조회

```typescript
// GameService.ts
const { data, error } = await supabase
  .from('game_state')
  .select('*')
  .eq('user_id', userId); // 명시적으로 user_id 필터링

// 하지만 RLS 정책이 이미 자동으로 필터링하므로
// 다른 사용자의 데이터는 절대 조회되지 않음
```

### RLS가 자동으로 수행하는 작업

1. **SELECT 쿼리**: `auth.uid() = user_id` 조건 자동 추가
2. **INSERT 쿼리**: `user_id`가 현재 사용자와 일치하는지 검증
3. **UPDATE 쿼리**: 수정 전후 모두 현재 사용자 데이터인지 검증
4. **DELETE 쿼리**: 삭제 대상이 현재 사용자 데이터인지 검증

## ⚠️ 주의사항

### 1. RLS 정책이 없으면?
- **모든 사용자가 모든 데이터에 접근 가능** (위험!)
- 반드시 RLS를 활성화하고 정책을 설정해야 함

### 2. `auth.uid()`는 언제 null?
- 로그인하지 않은 사용자
- 세션이 만료된 경우
- 토큰이 유효하지 않은 경우

### 3. 서비스 역할 키 사용 시
- 서비스 역할 키는 RLS를 우회함
- **절대 클라이언트에 노출하면 안 됨**
- 서버 사이드에서만 사용

## 🔍 디버깅

### 로그인 상태 확인
```typescript
const { data: { session } } = await supabase.auth.getSession();
console.log('현재 사용자:', session?.user?.id);
```

### RLS 정책 확인
```sql
-- 활성화된 정책 확인
SELECT * FROM pg_policies 
WHERE tablename = 'game_state';
```

### 세션 만료 확인
```typescript
supabase.auth.onAuthStateChange((event, session) => {
  console.log('인증 이벤트:', event); // 'SIGNED_OUT', 'TOKEN_REFRESHED' 등
  console.log('세션:', session);
});
```

## 📚 참고 자료

- [Supabase Auth 문서](https://supabase.com/docs/guides/auth)
- [Row Level Security 가이드](https://supabase.com/docs/guides/auth/row-level-security)
- [JWT 토큰 설명](https://jwt.io/introduction)

