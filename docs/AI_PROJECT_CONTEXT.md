# AI 프로젝트 컨텍스트 문서

이 문서는 **KBO 프로야구 단장 웹 시뮬레이터** 프로젝트를 AI가 이해하고, 프로젝트 요구사항에 맞는 프롬프트를 생성할 수 있도록 필요한 모든 정보를 담고 있습니다.

---

## 📋 프로젝트 개요

### 프로젝트명
**KBO 프로야구 단장 웹 시뮬레이터** (Baseball Management Game)

### 프로젝트 목적
Google Gemini API를 활용한 텍스트 기반 야구 매니지먼트 게임입니다. 사용자는 KBO 리그의 한 구단 단장이 되어 팀 운영, 선수 관리, 재정 관리, 경기 시뮬레이션 등을 경험할 수 있습니다.

### 핵심 특징
- **AI 게임마스터**: Gemini API를 활용한 동적 게임 진행
- **실시간 스트리밍**: AI 응답을 실시간으로 스트리밍하여 표시
- **카카오톡 스타일 UI**: 친숙한 채팅 인터페이스
- **데이터 무결성**: Zero-Error Policy (1원의 오차도 허용 안 함)
- **난이도 시스템**: EASY / NORMAL / HARD / HELL 4단계 난이도
- **Supabase 연동**: 게임 상태, 로스터, 재정 데이터를 DB에 저장

---

## 🏗️ 기술 스택

### 프론트엔드
- **React 18** + **TypeScript**: UI 프레임워크
- **Vite 5**: 빌드 도구
- **Tailwind CSS**: 스타일링
- **Framer Motion**: 애니메이션
- **react-markdown** + **remark-gfm**: 마크다운 렌더링

### AI & API
- **Google Gemini API** (`@google/generative-ai`, `@ai-sdk/google`): AI 게임마스터
- **Gemini 2.5 Flash 모델**: 스트리밍 응답 생성

### 데이터베이스
- **Supabase**: PostgreSQL 기반 백엔드
  - `teams`: 구단 정보
  - `players`: 선수 정보 (로스터)
  - `game_state`: 게임 상태 (날짜, 난이도, 구단주 성향)
  - `game_messages`: 채팅 히스토리
  - `finance_logs`: 재정 로그
  - `retired_numbers`: 영구결번 정보

### 상태 관리
- **Zustand**: 전역 상태 관리
- **React Context**: Toast 알림 등
- **React Query**: 서버 상태 관리

---

## 📁 프로젝트 구조

```
baseball/
├── src/
│   ├── App.tsx                    # 메인 앱 (화면 라우팅: START → DIFFICULTY → TEAM_SELECT → GAME)
│   ├── main.tsx                   # React 진입점
│   │
│   ├── components/                # UI 컴포넌트
│   │   ├── ChatInterface.tsx     # 핵심: 채팅 인터페이스 (2,700+ 줄)
│   │   ├── GameHeader.tsx         # 게임 헤더 (날짜, 자금, 난이도)
│   │   ├── MessageBubble.tsx      # 메시지 버블 (카카오톡 스타일)
│   │   ├── OptionsModal.tsx       # 선택지 모달
│   │   ├── NewsSidebar.tsx        # 뉴스 사이드바
│   │   ├── SaveLoadModal.tsx      # 저장/불러오기 모달
│   │   ├── ApiKeyModal.tsx        # API 키 입력 모달
│   │   ├── DifficultySelect.tsx   # 난이도 선택
│   │   ├── TeamSelect.tsx         # 팀 선택
│   │   └── StartScreen.tsx        # 시작 화면
│   │
│   ├── constants/                 # 상수 및 설정
│   │   ├── prompts/               # AI 프롬프트 (핵심)
│   │   │   ├── SystemLogic.ts    # 게임 로직 프롬프트 (152줄)
│   │   │   ├── InitialData.ts    # 초기 로스터 데이터 (736줄)
│   │   │   └── index.ts          # 프롬프트 export
│   │   ├── TeamData.ts            # 10개 KBO 구단 정보
│   │   └── GameConfig.ts          # 난이도별 설정
│   │
│   ├── services/                  # 서비스 레이어
│   │   ├── ChatService.ts        # Gemini API 호출 (스트리밍)
│   │   ├── ContextService.ts     # 게임 컨텍스트 생성 (DB 조회)
│   │   └── GameService.ts         # 게임 상태 관리 (DB 저장/불러오기)
│   │
│   ├── lib/                       # 유틸리티
│   │   ├── supabase.ts           # Supabase 클라이언트
│   │   ├── safeStorage.ts        # 안전한 스토리지 접근
│   │   └── utils.ts              # 파싱 및 유틸 함수
│   │
│   └── types/                     # TypeScript 타입 정의
│       └── index.ts               # 공통 타입
│
├── docs/                          # 프로젝트 문서
└── package.json                   # 의존성 및 스크립트
```

---

## 🎮 핵심 시스템

### 1. 게임 초기화 흐름

```
1. 사용자 인증 (Supabase Auth)
   ↓
2. API 키 입력 (Gemini API Key)
   ↓
3. 난이도 선택 (EASY / NORMAL / HARD / HELL)
   ↓
4. 팀 선택 (10개 KBO 구단 중 선택)
   ↓
5. GameService.startNewGame() 호출
   - game_state 테이블에 초기 상태 저장
   - teams 테이블에 초기 자금 설정
   - finance_logs에 초기 자금 로그 기록
   ↓
6. ChatInterface 컴포넌트 렌더링
   - ContextService.generateGameContext()로 현재 게임 상태 조회
   - SystemLogic + GameContext를 System Prompt로 조립
   - InitialData를 첫 메시지로 전송
   ↓
7. AI가 게임 시작 메시지 생성
```

### 2. 메시지 처리 흐름

```
[사용자 입력]
  ↓
[ChatInterface.handleSend()]
  ├─ 사용자 메시지를 messages 배열에 추가
  ├─ ChatService.streamChat() 호출
  │   ├─ ContextService.generateGameContext()로 현재 상태 조회
  │   ├─ SystemLogic + GameContext를 System Prompt로 조립
  │   ├─ Gemini API 호출 (스트리밍)
  │   └─ ReadableStream 반환
  │
  └─ 스트리밍 응답 처리
      ├─ 실시간 텍스트 업데이트
      ├─ parseAIResponse()로 태그 파싱
      │   ├─ <STATUS>: 날짜, 자금 추출
      │   ├─ <OPTIONS>: 선택지 추출
      │   ├─ <NEWS>: 뉴스 아이템 추출
      │   └─ <GAME_RESULT>: 경기 결과 추출
      │
      └─ 상태 업데이트
          ├─ gameState (날짜, 자금)
          ├─ messages (채팅 히스토리)
          ├─ pendingOptions (선택지)
          └─ newsItems (뉴스)
```

### 3. AI 프롬프트 시스템

#### System Prompt 구조
```
[KBO_SYSTEM_LOGIC]
  - 게임 규칙 및 원칙
  - 난이도별 차별화 원칙
  - 경기 시뮬레이션 로직
  - 재정 관리 규칙
  - 로스터 출력 규칙

[CURRENT_GAME_CONTEXT] (동적 주입)
  - 현재 날짜 (년/월/주)
  - 난이도 및 구단주 성향
  - 구단명 및 보유 자금
  - 샐러리캡 현황
  - 1군 핵심 로스터 (Top 28)
  - 영구결번 리스트
```

#### Context Injection 로직
- **위치**: `src/services/ContextService.ts`
- **기능**: 
  - Supabase에서 현재 게임 상태 조회
  - 로스터 정보 조회 (1군 위주, 연봉 높은 순 28명)
  - 영구결번 정보 조회
  - Markdown 형식으로 포맷팅하여 반환

#### 초기 데이터
- **위치**: `src/constants/prompts/InitialData.ts`
- **내용**: 10개 구단의 초기 로스터 데이터 (CSV 형식)
- **사용**: 게임 시작 시 첫 메시지로 전송하여 AI에게 초기 로스터 정보 제공

---

## 🎯 게임 규칙 및 로직

### 난이도별 설정

| 난이도 | 초기 자금 | 샐러리캡 (국내) | 샐러리캡 (외국인) | 수입 배율 | 지출 배율 | 하드 캡 |
|--------|-----------|----------------|----------------|-----------|-----------|---------|
| EASY   | 80억      | 250억          | 무제한         | 1.5배     | 1.0배     | ❌      |
| NORMAL | 30억      | 137억          | 55억           | 1.0배     | 1.0배     | ❌      |
| HARD   | 20억      | 120억          | 47.5억         | 0.9배     | 1.0배     | ❌      |
| HELL   | 10억      | 100억          | 40억           | 0.8배     | 1.2배     | ✅      |

### 데이터 무결성 원칙 (Zero-Error Policy)
- 재정, 스탯, 기록 집계에서 오차 허용 안 함
- 수입/지출 계산 시 "1원"의 오차도 없어야 함
- 최종 표기는 "0.1억(천만 원)" 단위로 반올림/버림 처리
- Context 데이터가 항상 절대적 진실 (AI가 기억하는 것보다 우선)

### 스탯 시스템 (20-80 스케일)
- **투수**: 구속(km) / 구위 / 제구 / 체력 / 변화구
- **타자**: 컨택 / 갭파워 / 파워 / 선구안 / 주루 / 수비
- 능력치 70 이상(S급) 선수는 리그 상위권 성적 보장

### 샐러리캡 시스템 (Dual Cap)
- **국내 샐러리캡**: 한국 국적 선수의 연봉만 포함 (외국인/아시아쿼터 제외)
- **외국인 샐러리캡**: 외국인 용병 3인의 연봉 합계
- **아시아쿼터 캡**: 아시아쿼터 선수의 연봉
- 하드 캡 (HELL 모드): 초과 시 진행 불가
- 소프트 캡 (EASY/NORMAL/HARD): 초과 시 사치세 50% 적용

### 게임 일정
- **1월**: 방송국 중계권 계약 → 시즌 프리뷰
- **2월**: 외국인/아시아쿼터 영입 → 코칭스태프 선임 → 스프링캠프
- **3월**: 시범경기 → 개막 엔트리 확정
- **4~9월**: 정규시즌 (월 단위 시뮬레이션)
- **10월**: 포스트시즌 (WC → 준PO → PO → 한국시리즈)
- **11~12월**: 스토브리그 (신인 드래프트 → FA 시장 → 용병 계약 → 연봉 협상)

### 영구결번 시스템
- 각 구단별 영구결번 리스트는 `retired_numbers` 테이블에 저장
- Context에 주입되어 AI에게 전달
- 신인 드래프트, 등번호 변경, FA 영입 등 어떤 경우에도 사용 불가

---

## 📊 데이터 구조

### GameState (게임 상태)
```typescript
interface GameState {
  date: string | null;           // 현재 날짜 (YYYY/MM/DD 형식)
  budget: number | null;         // 현재 자금 (원 단위)
  morale: number;                // 팀 사기 (0 ~ 100)
  fanLoyalty: number;             // 팬 충성도 (0 ~ 100)
  difficulty: Difficulty;        // 난이도 (EASY/NORMAL/HARD/HELL)
  salaryCapUsage?: number;        // 샐러리캡 소진율 (0.0 ~ 100.0)
  teamName?: string;             // 구단 이름
}
```

### Player (선수)
```typescript
interface Player {
  name: string;                  // 선수 이름
  age: number;                   // 나이
  position: string;              // 포지션 (P, C, 1B, 2B, 3B, SS, LF, CF, RF, DH)
  role: string;                  // 역할 (1군, 2군, 선발, 마무리, 불펜 등)
  stats: {                       // 스탯 (20-80 스케일)
    // 투수
    velocity?: number;           // 구속 (km)
    stuff?: number;              // 구위
    control?: number;            // 제구
    stamina?: number;            // 체력
    // 타자
    contact?: number;            // 컨택
    gapPower?: number;           // 갭파워
    power?: number;              // 파워
    eye?: number;                // 선구안
    speed?: number;              // 주루
    field?: number;              // 수비
  };
  salary: number;                // 연봉 (원 단위)
  condition: string;             // 컨디션 (건강, 경미한 부상, 중상 등)
  team_id: number;               // 팀 ID (Supabase)
}
```

### Team (구단)
```typescript
interface Team {
  id: number;                    // DB ID
  code: string;                  // 팀 코드 (kia, samsung, lg 등)
  name: string;                  // 구단명
  region: string;                // 연고지
  budget: number;                // 보유 자금 (원 단위)
}
```

### Message (채팅 메시지)
```typescript
interface Message {
  role: 'user' | 'assistant';    // 사용자 / AI
  content: string;               // 메시지 내용 (마크다운 가능)
}
```

---

## 🔧 주요 서비스 및 함수

### ChatService
- **위치**: `src/services/ChatService.ts`
- **기능**: Gemini API 호출 및 스트리밍 응답 처리
- **주요 메서드**:
  - `streamChat()`: 채팅 메시지를 처리하고 스트리밍 응답 반환

### ContextService
- **위치**: `src/services/ContextService.ts`
- **기능**: 게임의 현재 상태를 조회하여 AI에게 주입할 컨텍스트 생성
- **주요 메서드**:
  - `generateGameContext(teamCode)`: 현재 게임 상태를 Markdown 형식으로 반환

### GameService
- **위치**: `src/services/GameService.ts`
- **기능**: 게임 상태를 DB에 저장/불러오기
- **주요 메서드**:
  - `startNewGame()`: 새 게임 시작 (DB 초기화)
  - `saveGame()`: 게임 상태 저장
  - `loadGame()`: 저장된 게임 불러오기
  - `loadGameList()`: 저장된 게임 목록 조회

---

## 📝 AI 응답 파싱 규칙

### 필수 태그 형식

#### 1. STATUS 태그 (상태바)
```
---
## ⚾ **[KBO GM Simulator 2026]**

"[STATUS] 날짜: 2026/01/01 | 자금: 30.0억 원 | 샐러리캡: 45.0%"
---
```
- **위치**: 응답 상단 (모바일 앱 상단바 가림 방지를 위해 3줄 공백 후 출력)
- **파싱**: `extractDate()`, `extractBudget()` 함수로 추출

#### 2. OPTIONS 태그 (선택지)
```
[OPTIONS: [{"label": "버튼명", "value": "명령어", "style": "primary"}]]
```
- **위치**: 응답 맨 마지막 줄
- **스타일**: `primary` (파란색), `secondary` (회색), `danger` (빨간색)

#### 3. NEWS 태그 (뉴스)
```
[NEWS: {"type": "CATEGORY", "title": "제목", "content": "내용"}]
```
- **위치**: 응답 중간 어디든
- **타입**: `TRADE`, `FA`, `DRAFT`, `INJURY`, `GAME`, `EVENT` 등

#### 4. GAME_RESULT 태그 (경기 결과)
```
[GAME_RESULT: {"home": "팀명", "away": "팀명", "score": "5:3", ...}]
```
- **위치**: 경기 시뮬레이션 시 출력

---

## 🎯 AI가 준수해야 할 핵심 원칙

### 1. Context 우선 원칙
- **절대적 진실**: `[CURRENT_GAME_CONTEXT]`의 데이터가 항상 옳음
- **환각 방지**: Context에 없는 선수는 절대 언급하지 않음
- **자금 계산**: Context의 '현재 보유 자금'을 기준으로 계산
- **영구결번 준수**: Context의 영구결번 리스트를 절대 사용하지 않음

### 2. 데이터 무결성
- 수입/지출 계산 시 "1원"의 오차도 허용 안 함
- 모든 계산은 Context에 제공된 수치를 기준으로 수행
- 최종 표기는 "0.1억(천만 원)" 단위로 반올림/버림

### 3. 현실성 및 스탯 존중
- 경기 시뮬레이션 결과는 20-80 스케일 능력치 기반
- 능력치 70 이상(S급) 선수는 리그 상위권 성적 보장
- 난이도 조절은 경기장 안 승패 조작이 아닌 프런트 운영 환경 제약

### 4. 난이도별 차별화
- **EASY**: 부상 없음, 수입 1.5배, AI 호구 성향
- **NORMAL**: 현실적 밸런스, 공정한 시뮬레이션
- **HARD**: 지출 증가 없음, 수입 0.9배, 성장 정체
- **HELL**: 부상 빈도 2배, 수입 0.8배, 지출 1.2배, 하드 캡

### 5. 출력 형식 준수
- 상태바는 반드시 3줄 공백 후 출력
- 선수 명단은 반드시 Markdown Table 형식
- 선택지는 응답 맨 마지막 줄에 `[OPTIONS]` 태그로 출력

---

## 🔄 데이터베이스 스키마

### teams 테이블
- `id` (number): 팀 ID
- `code` (string): 팀 코드 (kia, samsung, lg 등)
- `name` (string): 구단명
- `region` (string): 연고지
- `budget` (number): 보유 자금 (원 단위)

### players 테이블
- `id` (number): 선수 ID
- `team_id` (number): 팀 ID (외래키)
- `name` (string): 선수 이름
- `position` (string): 포지션
- `role` (string): 역할 (1군, 2군, 선발, 마무리 등)
- `stats` (jsonb): 스탯 (JSON 형식)
- `salary` (number): 연봉 (원 단위)
- `condition` (string): 컨디션

### game_state 테이블
- `user_id` (string): 사용자 ID (Supabase Auth)
- `my_team_id` (number): 플레이어 팀 ID
- `difficulty` (string): 난이도
- `owner_persona` (string): 구단주 성향 (A, B, C 등)
- `current_year` (number): 현재 연도
- `current_month` (number): 현재 월
- `current_week` (number): 현재 주차

### game_messages 테이블
- `user_id` (string): 사용자 ID
- `team_id` (number): 팀 ID
- `role` (string): 메시지 역할 (user, model)
- `content` (text): 메시지 내용
- `created_at` (timestamp): 생성 시간

### finance_logs 테이블
- `user_id` (string): 사용자 ID
- `team_id` (number): 팀 ID
- `year` (number): 연도
- `month` (number): 월
- `category` (string): 카테고리 (Initial, Trade, FA, Facility 등)
- `amount` (number): 금액 (원 단위)
- `description` (string): 설명

### retired_numbers 테이블
- `team_id` (number): 팀 ID
- `back_number` (number): 등번호
- `player_name` (string): 선수 이름

---

## 🚀 AI 프롬프트 생성 가이드

이 프로젝트에서 AI 프롬프트를 생성할 때는 다음을 고려해야 합니다:

### 1. 프로젝트 컨텍스트 이해
- 이 프로젝트는 **KBO 프로야구 단장 시뮬레이터**입니다
- **Google Gemini API**를 사용하여 AI 게임마스터 역할을 수행합니다
- **Supabase**를 백엔드로 사용하여 게임 상태를 저장합니다

### 2. 프롬프트 구조
- **System Prompt**: `KBO_SYSTEM_LOGIC` (게임 규칙 및 원칙)
- **Dynamic Context**: `CURRENT_GAME_CONTEXT` (현재 게임 상태, DB에서 조회)
- **Initial Data**: `KBO_INITIAL_DATA` (초기 로스터, 게임 시작 시 전송)

### 3. 프롬프트 작성 시 주의사항
- **데이터 무결성**: 모든 수치 계산은 정확해야 함 (1원 오차도 안 됨)
- **Context 우선**: AI가 기억하는 것보다 DB에서 조회한 Context가 우선
- **출력 형식**: STATUS, OPTIONS, NEWS 태그 형식 준수
- **난이도별 차별화**: 난이도에 따라 AI 행동 패턴이 달라져야 함

### 4. 프롬프트 최적화
- **토큰 절약**: 불필요한 반복 제거
- **명확성**: AI가 이해하기 쉬운 명확한 지시사항
- **일관성**: 다른 프롬프트와 일관된 형식 유지

---

## 📚 참고 문서

- **프로젝트 개요**: `PROJECT_OVERVIEW.md`
- **프로젝트 구조**: `docs/structure/PROJECT_STRUCTURE_2025-12-01.md`
- **기능 현황**: `docs/reports/FEATURE_STATUS_REPORT_2025-12-01.md`
- **성능 분석**: `docs/reports/PERFORMANCE_ANALYSIS_REPORT_2025-12-01.md`
- **보안 감사**: `docs/reports/SECURITY_AUDIT_2025-12-08.md`

---

## 💡 AI 프롬프트 생성 예시

### 예시 1: 새로운 게임 기능 추가 요청
```
사용자: "FA 시장에서 선수 영입 시 보상금 계산 로직을 추가해줘"

AI가 생성해야 할 프롬프트:
- SystemLogic.ts에 FA 보상금 계산 규칙 추가
- 등급별 보상금 표 (S급: 5억, A급: 3억 등)
- 보상선수 지명 절차 설명
- Context에 보상금 정보 포함 여부 확인
```

### 예시 2: 게임 밸런스 조정 요청
```
사용자: "HELL 모드가 너무 어려워서 조금 완화해줘"

AI가 생성해야 할 프롬프트:
- GameConfig.ts의 HELL 설정 수정
- 초기 자금 증가 (10억 → 15억)
- 샐러리캡 증가 (100억 → 110억)
- SystemLogic.ts에 변경사항 반영
```

### 예시 3: 새로운 이벤트 추가 요청
```
사용자: "선수 은퇴식 이벤트를 추가해줘"

AI가 생성해야 할 프롬프트:
- SystemLogic.ts에 은퇴식 이벤트 규칙 추가
- 은퇴식 조건 (연령, 경력 등)
- 은퇴식 보상 (팬 충성도 증가, 자금 보너스 등)
- GUI_EVENT 태그 형식으로 출력 규칙 추가
```

---

이 문서를 참고하여 AI가 프로젝트를 이해하고 적절한 프롬프트를 생성할 수 있습니다.

