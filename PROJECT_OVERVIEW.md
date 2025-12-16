# KBO 프로야구 단장 시뮬레이터 - 프로젝트 개요

## 📋 프로젝트 개요

**KBO 프로야구 단장 웹 시뮬레이터**는 Google Gemini API를 활용한 텍스트 기반 야구 매니지먼트 게임입니다. 사용자는 KBO 리그의 한 구단 단장이 되어 팀 운영, 선수 관리, 재정 관리, 경기 시뮬레이션 등을 경험할 수 있습니다.

---

## 🏗️ 프로젝트 구조

### 기술 스택
- **프레임워크**: React 18 + TypeScript
- **빌드 도구**: Vite 5
- **스타일링**: Tailwind CSS
- **애니메이션**: Framer Motion
- **AI 엔진**: Google Gemini API (@google/generative-ai)
- **마크다운**: react-markdown + remark-gfm

### 디렉토리 구조

```
baseball/
├── src/
│   ├── App.tsx                    # 메인 앱 컴포넌트 (화면 라우팅)
│   ├── main.tsx                   # React 진입점
│   │
│   ├── components/                # UI 컴포넌트 (20개)
│   │   ├── ChatInterface.tsx     # 핵심: 채팅 인터페이스 (2,700+ 줄)
│   │   ├── GameHeader.tsx         # 게임 헤더 (날짜, 자금, 난이도)
│   │   ├── MessageBubble.tsx      # 메시지 버블 (카카오톡 스타일)
│   │   ├── OptionsModal.tsx       # 선택지 모달
│   │   ├── NewsSidebar.tsx        # 뉴스 사이드바
│   │   ├── FacilityManagement.tsx # 시설 관리 모달
│   │   ├── RandomEventModal.tsx   # 랜덤 이벤트 모달
│   │   ├── TransactionModal.tsx   # 거래 내역 모달
│   │   ├── StandingsModal.tsx     # 리그 순위표 모달
│   │   ├── GameResultModal.tsx    # 경기 결과 모달
│   │   ├── RetirementCeremonyModal.tsx # 선수 은퇴식 모달
│   │   ├── SaveLoadModal.tsx      # 저장/불러오기 모달
│   │   ├── LoadGameModal.tsx      # 게임 불러오기 모달
│   │   ├── MonitoringDashboard.tsx # 모니터링 대시보드
│   │   ├── ApiKeyModal.tsx        # API 키 입력 모달
│   │   ├── DifficultyModal.tsx    # 난이도 선택 모달
│   │   ├── TeamSelector.tsx       # 팀 선택 컴포넌트
│   │   ├── ExpansionTeamForm.tsx  # 신생 구단 창단 폼
│   │   └── StartScreen.tsx        # 시작 화면
│   │
│   ├── constants/                 # 상수 및 설정
│   │   ├── prompts/               # AI 프롬프트 (핵심)
│   │   │   ├── SystemLogic.ts    # 게임 로직 프롬프트 (3,701줄)
│   │   │   ├── InitialData.ts    # 초기 로스터 데이터 (736줄)
│   │   │   └── index.ts          # 프롬프트 export
│   │   ├── TeamData.ts            # 10개 KBO 구단 정보
│   │   ├── GameConfig.ts          # 난이도별 설정 (EASY/NORMAL/HARD/HELL)
│   │   ├── GameEvents.ts          # 랜덤 이벤트 정의
│   │   └── Facilities.ts          # 시설 정의 (트레이닝, 의료, 스카우팅 등)
│   │
│   ├── lib/                       # 유틸리티 및 API 래퍼
│   │   ├── gemini.ts              # Gemini API 래퍼 (Context Caching 지원)
│   │   ├── utils.ts               # 파싱 및 유틸 함수 (2,000+ 줄)
│   │   ├── promptGenerator.ts     # 프롬프트 생성기
│   │   ├── historySummarizer.ts   # 채팅 히스토리 압축
│   │   ├── tokenOptimizer.ts      # 토큰 사용량 최적화
│   │   ├── retryUtils.ts          # 재시도 로직
│   │   ├── errorUtils.ts          # 에러 처리
│   │   ├── monitoring.ts          # 모니터링 서비스
│   │   ├── safeStorage.ts         # 안전한 스토리지 접근
│   │   ├── rosterFetcher.ts       # 로스터 데이터 페칭
│   │   ├── draftUtils.ts          # 드래프트 유틸리티
│   │   ├── tradeFilter.ts         # 트레이드 필터
│   │   ├── newsUtils.ts           # 뉴스 유틸리티
│   │   ├── debounce.ts            # 디바운스 유틸
│   │   └── __tests__/             # 테스트 파일
│   │
│   ├── services/                  # 서비스 레이어
│   │   ├── StorageService.ts      # 저장소 서비스 인터페이스
│   │   ├── FileStorageStrategy.ts # 파일 저장 전략
│   │   └── FacilityService.ts     # 시설 관리 서비스
│   │
│   ├── context/                   # React Context
│   │   └── ToastContext.tsx       # 토스트 알림 컨텍스트
│   │
│   ├── hooks/                     # 커스텀 훅
│   │   ├── useSaveLoad.ts         # 저장/불러오기 훅
│   │   └── useSound.ts            # 사운드 효과 훅
│   │
│   ├── types/                     # TypeScript 타입 정의
│   │   └── index.ts               # 공통 타입
│   │
│   └── utils/                     # 유틸리티 함수
│       └── DateUtils.ts           # 날짜 유틸리티
│
├── docs/                          # 프로젝트 문서
│   ├── reports/                   # 보고서 (성능, 보안, 기능 상태)
│   ├── analysis/                  # 분석 문서 (구조, 버전 비교)
│   ├── strategies/                # 구현 전략 문서
│   ├── structure/                 # 프로젝트 구조 문서
│   └── patches/                   # 패치 노트
│
├── package.json                   # 의존성 및 스크립트
├── vite.config.ts                 # Vite 설정
├── tailwind.config.js             # Tailwind CSS 설정
├── vercel.json                    # Vercel 배포 설정
└── README.md                      # 프로젝트 설명
```

---

## 🎮 핵심 기능

### 1. 게임 초기화 시스템

#### API 키 관리
- **위치**: `src/components/ApiKeyModal.tsx`
- **기능**:
  - Gemini API 키 입력 및 검증
  - 로컬 스토리지 자동 저장 (`SafeStorage` 사용)
  - API 키 재설정 기능
  - 브라우저 스토리지 접근 실패 시 메모리 Fallback

#### 난이도 선택
- **위치**: `src/components/DifficultyModal.tsx`, `src/constants/GameConfig.ts`
- **난이도 종류**:
  - **EASY**: 초기 자금 80억, 샐러리캡 250억, 수입 1.5배, 부상 없음
  - **NORMAL**: 초기 자금 30억, 샐러리캡 137억, 수입 1.0배, 현실적 밸런스
  - **HARD**: 초기 자금 20억, 샐러리캡 120억, 수입 0.9배, 지출 1.1배
  - **HELL**: 초기 자금 10억, 샐러리캡 100억, 수입 0.8배, 지출 1.2배, 하드 캡

#### 팀 선택
- **위치**: `src/components/TeamSelector.tsx`, `src/constants/TeamData.ts`
- **기능**:
  - 10개 KBO 구단 선택 (KIA, 삼성, LG, 두산, 롯데, KT, SSG, 한화, NC, 키움)
  - 신생 구단 창단 기능 (`ExpansionTeamForm.tsx`)
  - 구단별 색상, 아이콘, 영구결번 정보 표시

### 2. 채팅 인터페이스 (핵심)

#### 메시지 시스템
- **위치**: `src/components/ChatInterface.tsx` (2,700+ 줄)
- **기능**:
  - 카카오톡 스타일 메시지 버블 (`MessageBubble.tsx`)
  - 사용자/AI 메시지 구분
  - 마크다운 렌더링 (react-markdown)
  - 메시지 스크롤 자동 이동
  - 스트리밍 중 표시 (스켈레톤 UI)

#### 실시간 스트리밍
- **위치**: `src/lib/gemini.ts`
- **기능**:
  - Gemini API 스트리밍 응답 (`sendMessageStream`)
  - 실시간 텍스트 업데이트
  - Trickle 알고리즘 기반 진행률 계산
  - 로딩 오버레이 (`LoadingOverlay.tsx`)

#### 선택지 시스템
- **위치**: `src/components/OptionsModal.tsx`, `src/lib/utils.ts` (parseAIResponse)
- **기능**:
  - AI 응답에서 `<OPTIONS>` 태그 파싱
  - Primary/Secondary/Danger 버튼 스타일
  - 선택지 클릭 시 자동 메시지 전송

### 3. 게임 상태 관리

#### 날짜 추적
- **위치**: `src/lib/utils.ts` (extractDate)
- **기능**:
  - `<STATUS>` 태그에서 날짜 파싱
  - 게임 헤더에 날짜 표시 (`GameHeader.tsx`)
  - 시즌 진행 상태 추적 (시즌 전/시즌/포스트시즌)

#### 자금 관리
- **위치**: `src/lib/utils.ts` (extractBudget, validateBudgetIntegrity)
- **기능**:
  - `<STATUS>` 태그에서 자금 파싱
  - 난이도별 초기 자금 적용
  - 거래 내역 추적 (`Transaction[]`)
  - 자금 무결성 검증 (Zero-Error Policy)
  - 누적 계산 (전 턴 잔액 + 이번 턴 수입/지출)

#### 팀 사기/팬 충성도
- **위치**: `src/components/ChatInterface.tsx` (gameState)
- **기능**:
  - 팀 사기 (morale): 0 ~ 100
  - 팬 충성도 (fanLoyalty): 0 ~ 100
  - 시설 레벨, 경기 성적에 영향

#### 샐러리캡 관리
- **위치**: `src/constants/GameConfig.ts`
- **기능**:
  - 한국인 선수 샐러리캡 (squadSalaryCap)
  - 외국인 용병 샐러리캡 (mercenarySalaryCap)
  - 아시아 쿼터 샐러리캡 (asianQuarterSalaryCap)
  - 하드 캡/소프트 캡 (사치세) 지원

### 4. AI 게임마스터 시스템

#### 시스템 프롬프트
- **위치**: `src/constants/prompts/SystemLogic.ts` (3,701줄)
- **내용**:
  - 게임 규칙 및 원칙 (현실성, 데이터 무결성)
  - 난이도별 차별화 원칙
  - 경기 시뮬레이션 로직 (20-80 스케일 능력치)
  - 드래프트, FA, 트레이드 규칙
  - 재정 관리 규칙
  - 로스터 출력 규칙

#### 초기 데이터
- **위치**: `src/constants/prompts/InitialData.ts` (736줄)
- **내용**:
  - 10개 구단 초기 로스터 (Single Source of Truth)
  - 각 구단별 1군/2군 투수·타자 로스터
  - 선수 정보: 이름, 나이, 포지션, 스탯 (20-80 스케일), 기록, 연봉

#### Context Caching
- **위치**: `src/lib/gemini.ts`
- **기능**:
  - System Instruction 토큰 비용 절감
  - 캐시된 컨텐츠 재사용 (TTL: 1시간)
  - 브라우저 환경 제한 대응

### 5. 게임 기능

#### 선수 관리
- **로스터 조회**: AI가 현재 로스터 출력
- **선수 교체**: 1군/2군 이동
- **선수 은퇴**: 은퇴식 모달 (`RetirementCeremonyModal.tsx`)
  - KBO 리그 레전드 심사 (전체 팬 투표)
  - 구단 영구결번 심사 (팀 팬 투표)

#### 거래 시스템
- **트레이드**: 다른 구단과 선수 교환
- **FA (자유계약선수)**: FA 시장에서 영입
- **드래프트**: 신인 드래프트 참여
- **거래 내역**: `TransactionModal.tsx`에서 거래 추적
- **거래 필터**: `src/lib/tradeFilter.ts` (중복 거래 방지)

#### 시설 관리
- **위치**: `src/components/FacilityManagement.tsx`, `src/constants/Facilities.ts`
- **시설 종류**:
  - 트레이닝 시설: 선수 성장 속도 향상
  - 의료 시설: 부상 회복 속도 향상
  - 스카우팅 시설: 유망주 발굴 확률 향상
  - 팬 서비스 시설: 팬 충성도 향상
- **레벨 시스템**: 레벨별 효과 차등 적용

#### 경기 시뮬레이션
- **위치**: `src/lib/utils.ts` (parseGameResult)
- **기능**:
  - AI가 경기 결과 생성 (20-80 스케일 능력치 기반)
  - 경기 결과 모달 (`GameResultModal.tsx`)
  - 리그 순위표 업데이트 (`StandingsModal.tsx`)
  - 팀별 전적 추적 (`TeamRecord`)

#### 랜덤 이벤트
- **위치**: `src/components/RandomEventModal.tsx`, `src/constants/GameEvents.ts`
- **기능**:
  - 확률 기반 랜덤 이벤트 발생
  - 긍정/부정 이벤트 (자금, 선수 부상, 팬 충성도 등)
  - 이벤트 선택지 제공

#### 뉴스 시스템
- **위치**: `src/components/NewsSidebar.tsx`, `src/lib/newsUtils.ts`
- **기능**:
  - AI가 생성한 뉴스 아이템 표시
  - `<NEWS>` 태그 파싱
  - 읽은 뉴스 개수 추적
  - 사이드바 토글

### 6. 저장/불러오기 시스템

#### 저장 전략
- **위치**: `src/services/StorageService.ts`, `src/services/FileStorageStrategy.ts`
- **기능**:
  - 로컬 스토리지 저장 (자동 저장)
  - 파일 저장 (JSON 다운로드)
  - 메타데이터 관리 (타임스탬프, 버전)

#### 불러오기 전략
- **위치**: `src/components/LoadGameModal.tsx`, `src/components/SaveLoadModal.tsx`
- **기능**:
  - 로컬 스토리지에서 불러오기
  - 파일에서 불러오기 (JSON 업로드)
  - 데이터 검증 (팀 정보, 메시지, 게임 상태)

#### 저장 데이터 구조
```typescript
interface GameSaveData {
  messages: Message[];           // 채팅 히스토리
  gameState: GameState;          // 게임 상태 (날짜, 자금, 난이도 등)
  facilities: FacilityState;     // 시설 레벨
  newsItems: NewsItem[];         // 뉴스 아이템
  readNewsCount: number;         // 읽은 뉴스 개수
  selectedTeam: Team;            // 선택한 팀
  pendingOptions: Option[];      // 대기 중인 선택지
  difficulty: Difficulty;        // 난이도
  metadata: SaveMetadata;        // 메타데이터 (타임스탬프, 버전)
}
```

### 7. 성능 최적화

#### 토큰 최적화
- **위치**: `src/lib/tokenOptimizer.ts`
- **기능**:
  - 불필요한 태그 제거
  - 중복 데이터 압축
  - 프롬프트 길이 최적화

#### 히스토리 압축
- **위치**: `src/lib/historySummarizer.ts`
- **기능**:
  - 채팅 히스토리 요약 (토큰 절감)
  - 중요 메시지 보존
  - 컨텍스트 길이 제한 대응

#### 재시도 로직
- **위치**: `src/lib/retryUtils.ts`
- **기능**:
  - API 호출 실패 시 자동 재시도
  - 지수 백오프 (Exponential Backoff)
  - 쿼터 초과 에러 처리

#### 모니터링
- **위치**: `src/lib/monitoring.ts`, `src/components/MonitoringDashboard.tsx`
- **기능**:
  - 토큰 사용량 추적
  - API 호출 횟수 추적
  - 응답 시간 측정
  - 대시보드 표시

### 8. 에러 처리

#### 에러 유틸리티
- **위치**: `src/lib/errorUtils.ts`
- **기능**:
  - 쿼터 초과 에러 감지 (`isQuotaExceededError`)
  - 에러 메시지 포맷팅
  - 사용자 친화적 에러 메시지

#### 안전한 스토리지
- **위치**: `src/lib/safeStorage.ts`
- **기능**:
  - 브라우저 스토리지 접근 실패 시 메모리 Fallback
  - 에러 핸들링
  - 타입 안전성 보장

---

## 🔄 데이터 흐름

### 1. 게임 시작 흐름

```
[App.tsx]
  ├─ API 키 입력 (ApiKeyModal)
  ├─ 난이도 선택 (DifficultyModal)
  ├─ 팀 선택 (TeamSelector)
  └─ 게임 시작
      ↓
[ChatInterface.tsx]
  ├─ getGeminiModel(apiKey)
  │   └─ KBO_SYSTEM_LOGIC 로드 (SystemInstruction)
  │       └─ Context Caching 시도
  │
  └─ initializeGameWithData(apiKey)
      └─ KBO_INITIAL_DATA 전송 (첫 메시지)
          └─ AI가 게임 시작 메시지 생성
```

### 2. 메시지 처리 흐름

```
[사용자 입력]
  ↓
[ChatInterface.handleSend()]
  ├─ 사용자 메시지 추가
  ├─ 히스토리 압축 (compressHistory)
  ├─ 토큰 최적화 (optimizeForTokenUsage)
  ├─ Gemini API 호출 (스트리밍)
  │   └─ chatInstance.sendMessageStream()
  │
  └─ 응답 처리
      ├─ parseAIResponse() (utils.ts)
      │   ├─ JSON 태그 제거
      │   ├─ <OPTIONS> 파싱
      │   ├─ <STATUS> 파싱 (날짜, 자금)
      │   ├─ <NEWS> 파싱
      │   ├─ <GUI_EVENT> 파싱
      │   └─ <GAME_RESULT> 파싱
      │
      ├─ 상태 업데이트
      │   ├─ gameState (날짜, 자금, 난이도)
      │   ├─ messages (채팅 히스토리)
      │   ├─ pendingOptions (선택지)
      │   ├─ newsItems (뉴스)
      │   └─ leagueStandings (리그 순위표)
      │
      └─ UI 업데이트
          ├─ GameHeader (날짜, 자금 표시)
          ├─ MessageBubble (메시지 표시)
          ├─ OptionsModal (선택지 표시)
          └─ NewsSidebar (뉴스 표시)
```

### 3. 저장/불러오기 흐름

```
[저장]
  ↓
[ChatInterface.handleSave()]
  ├─ GameSaveData 생성
  │   ├─ messages
  │   ├─ gameState
  │   ├─ facilities
  │   ├─ newsItems
  │   └─ metadata (타임스탬프)
  │
  └─ StorageService.save()
      ├─ 로컬 스토리지 저장 (SafeStorage)
      └─ 파일 저장 (FileStorageStrategy)

[불러오기]
  ↓
[App.handleLoadFromLocal/File()]
  ├─ StorageService.load()
  │   └─ 데이터 검증
  │       ├─ 팀 정보 확인
  │       ├─ 메시지 확인
  │       └─ 게임 상태 확인
  │
  └─ ChatInterface에 데이터 전달
      └─ 게임 상태 복원
```

---

## 🎯 주요 설계 원칙

### 1. 데이터 무결성 (Zero-Error Policy)
- 재정, 스탯, 기록 집계에서 오차 허용 안 함
- 수입/지출 계산 시 "1원"의 오차도 없어야 함
- 최종 표기는 "0.1억(천만 원)" 단위로 반올림/버림 처리

### 2. 현실성 및 스탯 절대 존중
- 경기 시뮬레이션 결과는 20-80 스케일 능력치 기반
- 능력치 70 이상(S급) 선수는 리그 상위권 성적 보장
- 난이도 조절은 경기장 안 승패 조작이 아닌 프런트 운영 환경 제약

### 3. 난이도별 차별화
- **EASY**: 부상 없음, 수입 1.5배, AI 호구 성향
- **NORMAL**: 현실적 밸런스, 공정한 시뮬레이션
- **HARD**: 지출 1.1배, 성장 정체
- **HELL**: 부상 빈도 2배, 수입 0.8배, 지출 1.2배, 하드 캡

### 4. 성능 최적화
- Context Caching으로 System Instruction 토큰 비용 절감
- 히스토리 압축으로 컨텍스트 길이 제한 대응
- 토큰 최적화로 불필요한 데이터 제거
- 재시도 로직으로 API 안정성 향상

---

## 📊 주요 타입 정의

### GameState
```typescript
interface GameState {
  date: string | null;           // 현재 날짜
  budget: number | null;         // 현재 자금 (원 단위)
  morale: number;                // 팀 사기 (0 ~ 100)
  fanLoyalty: number;             // 팬 충성도 (0 ~ 100)
  difficulty: Difficulty;        // 난이도
  salaryCapUsage?: number;        // 샐러리캡 소진율 (0.0 ~ 100.0)
  teamName?: string;             // 구단 이름 (신생 구단)
}
```

### Player
```typescript
interface Player {
  name: string;                  // 선수 이름
  age: number;                   // 나이
  position: string;              // 포지션
  stats: {                       // 스탯 (20-80 스케일)
    contact: number;             // 컨택
    power: number;               // 파워
    speed: number;               // 스피드
    defense: number;             // 수비
    // ... (투수 스탯도 포함)
  };
  salary: number;                // 연봉 (원 단위)
  // ... (기록, 부상 정보 등)
}
```

### Transaction
```typescript
interface Transaction {
  id: string;                    // 거래 ID
  type: 'TRADE' | 'FA' | 'DRAFT' | 'SALARY' | 'FACILITY' | 'EVENT';
  amount: number;                // 금액 (원 단위)
  description: string;           // 거래 설명
  date: string;                  // 거래 날짜
  playerName?: string;           // 관련 선수 이름
}
```

---

## 🔧 주요 유틸리티 함수

### 파싱 함수 (`src/lib/utils.ts`)
- `parseAIResponse()`: AI 응답 파싱 (태그 제거, 옵션 추출)
- `extractDate()`: 날짜 추출
- `extractBudget()`: 자금 추출
- `parseGameResult()`: 경기 결과 파싱
- `validateBudgetIntegrity()`: 자금 무결성 검증
- `validateRosterIntegrity()`: 로스터 무결성 검증

### 최적화 함수
- `compressHistory()`: 히스토리 압축 (`historySummarizer.ts`)
- `optimizeForTokenUsage()`: 토큰 최적화 (`tokenOptimizer.ts`)
- `retryRequest()`: 재시도 로직 (`retryUtils.ts`)

### 드래프트 함수 (`src/lib/draftUtils.ts`)
- `filterProtectedPlayers()`: 보호 선수 필터링
- `validateDraftPicks()`: 드래프트 픽 검증
- `sortDraftOrder()`: 드래프트 순서 정렬
- `createDraftPool()`: 드래프트 풀 생성

---

## 🚀 배포

### Vercel 배포
- **설정 파일**: `vercel.json`
- **빌드 명령**: `npm run build`
- **출력 디렉토리**: `dist/`

### 환경 요구사항
- Node.js 18+
- npm 또는 yarn
- Google Gemini API 키 (사용자 입력)

---

## 📝 참고 문서

- **프로젝트 구조**: `docs/structure/PROJECT_STRUCTURE_2025-12-01.md`
- **기능 현황**: `docs/reports/FEATURE_STATUS_REPORT_2025-12-01.md`
- **성능 분석**: `docs/reports/PERFORMANCE_ANALYSIS_REPORT_2025-12-01.md`
- **보안 감사**: `docs/reports/SECURITY_AUDIT_2025-12-08.md`
- **배포 가이드**: `DEPLOY.md`

---

## 🎮 게임 플레이 흐름

1. **게임 시작**
   - API 키 입력 → 난이도 선택 → 팀 선택 → 게임 시작

2. **게임 진행**
   - AI가 게임 상황 설명
   - 사용자가 선택지 선택 또는 텍스트 입력
   - AI가 응답 생성 (스트리밍)
   - 게임 상태 업데이트 (날짜, 자금, 뉴스 등)

3. **게임 기능**
   - 선수 관리 (로스터 조회, 교체)
   - 거래 (트레이드, FA, 드래프트)
   - 시설 관리 (레벨 업그레이드)
   - 경기 시뮬레이션 (리그 순위표 업데이트)
   - 랜덤 이벤트 (확률 기반)

4. **게임 저장/불러오기**
   - 자동 저장 (로컬 스토리지)
   - 수동 저장 (파일 다운로드)
   - 불러오기 (로컬 스토리지 또는 파일)

---

이 문서는 프로젝트의 전체적인 구조와 기능을 AI가 이해할 수 있도록 정리한 것입니다. 각 기능의 구현 세부사항은 해당 소스 코드 파일을 참고하세요.

