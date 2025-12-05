# 📁 프로젝트 구조 및 파일 역할 분석

## 🎯 프로젝트 개요

**KBO 프로야구 단장 웹 시뮬레이터** - Google Gemini API를 활용한 텍스트 기반 야구 매니지먼트 게임

---

## 📂 전체 디렉토리 구조

```
baseball/
├── src/
│   ├── main.tsx                    # React 앱 진입점
│   ├── App.tsx                     # 메인 앱 컴포넌트 (라우팅)
│   ├── index.css                   # 전역 스타일
│   │
│   ├── components/                  # UI 컴포넌트 (24개)
│   ├── constants/                   # 상수 및 설정 (8개)
│   ├── context/                    # React Context (2개)
│   ├── hooks/                      # 커스텀 훅 (1개)
│   ├── lib/                        # 유틸리티 및 API (10개)
│   ├── services/                   # 비즈니스 로직 서비스 (5개)
│   ├── styles/                     # 추가 스타일 (1개)
│   ├── types/                      # TypeScript 타입 정의 (1개)
│   └── utils/                      # 유틸리티 함수 (2개)
│
├── dist/                           # 빌드 결과물
├── node_modules/                    # 의존성 패키지
├── package.json                     # 프로젝트 설정
├── vite.config.ts                  # Vite 빌드 설정
├── tailwind.config.js              # Tailwind CSS 설정
├── tsconfig.json                   # TypeScript 설정
└── README.md                       # 프로젝트 설명
```

---

## 📁 상세 파일 역할

### 🎨 **Components** (`src/components/`)

| 파일명 | 역할 | 사용 여부 | 중요도 |
|--------|------|----------|--------|
| `ApiKeyModal.tsx` | API 키 입력 모달 | ✅ 사용 | ⭐⭐⭐ |
| `ChatInterface.tsx` | **메인 게임 인터페이스** (1,660줄) | ✅ 사용 | ⭐⭐⭐ |
| `DifficultyModal.tsx` | 난이도 선택 모달 | ✅ 사용 | ⭐⭐⭐ |
| `ExpansionTeamForm.tsx` | 신생 구단 창단 폼 | ✅ 사용 | ⭐⭐⭐ |
| `FacilityManagement.tsx` | 시설 관리 모달 | ✅ 사용 | ⭐⭐ |
| `GameHeader.tsx` | 게임 헤더 (날짜, 자금, 난이도) | ✅ 사용 | ⭐⭐⭐ |
| `GameResultModal.tsx` | 경기 결과 모달 | ✅ 사용 | ⭐⭐ |
| `LoadingOverlay.tsx` | 로딩 오버레이 | ✅ 사용 | ⭐⭐ |
| `MessageBubble.tsx` | 메시지 버블 컴포넌트 | ✅ 사용 | ⭐⭐⭐ |
| `NegotiationInput.tsx` | 협상 입력 컴포넌트 | ✅ 사용 | ⭐ |
| `NewsSidebar.tsx` | 뉴스 사이드바 | ✅ 사용 | ⭐⭐ |
| `OptionsModal.tsx` | 선택지 모달 | ✅ 사용 | ⭐⭐ |
| `RandomEventModal.tsx` | 랜덤 이벤트 모달 | ✅ 사용 | ⭐⭐ |
| `RetirementCeremonyModal.tsx` | 선수 은퇴식 모달 | ✅ 사용 | ⭐ |
| `StandingsModal.tsx` | 리그 순위표 모달 | ✅ 사용 | ⭐⭐ |
| `StartScreen.tsx` | 시작 화면 | ✅ 사용 | ⭐⭐⭐ |
| `TeamSelector.tsx` | 팀 선택 컴포넌트 | ✅ 사용 | ⭐⭐⭐ |
| `TransactionModal.tsx` | 거래 내역 모달 | ✅ 사용 | ⭐⭐ |
| `EventModal.tsx` | 이벤트 모달 | ⚠️ **미사용** | ❌ |
| `LoadGameModal.tsx` | 게임 불러오기 모달 | ⚠️ **미사용** | ❌ |
| `NewsTicker.tsx` | 뉴스 티커 | ⚠️ **미사용** | ❌ |
| `PlayerCard.tsx` | 선수 카드 (타입만 export) | ⚠️ **부분 사용** | ⚠️ |
| `PlayerCardModal.tsx` | 선수 카드 모달 | ⚠️ **미사용** | ❌ |
| `SettingsModal.tsx` | 설정 모달 | ⚠️ **미사용** | ❌ |

**사용되지 않는 컴포넌트 (5개):**
- `EventModal.tsx` - ChatInterface에서 제거됨
- `LoadGameModal.tsx` - App.tsx에서 import되지만 실제 사용 안 함
- `NewsTicker.tsx` - NewsSidebar로 대체됨
- `PlayerCardModal.tsx` - 선수 상세 정보 기능 미구현
- `SettingsModal.tsx` - 설정 기능 미구현

---

### ⚙️ **Constants** (`src/constants/`)

| 파일명 | 역할 | 사용 여부 | 중요도 |
|--------|------|----------|--------|
| `prompts/SystemLogic.ts` | **AI 게임 로직 프롬프트** (3,654줄) | ✅ 사용 | ⭐⭐⭐ |
| `prompts/InitialData.ts` | **초기 로스터 데이터** (736줄) | ✅ 사용 | ⭐⭐⭐ |
| `prompts/index.ts` | 프롬프트 export | ✅ 사용 | ⭐⭐ |
| `TeamData.ts` | 팀 정보 (10개 구단) | ✅ 사용 | ⭐⭐⭐ |
| `GameConfig.ts` | 난이도별 설정 | ✅ 사용 | ⭐⭐⭐ |
| `GameEvents.ts` | 랜덤 이벤트 정의 | ✅ 사용 | ⭐⭐ |
| `Facilities.ts` | 시설 정의 | ✅ 사용 | ⭐⭐ |
| `GameConstants.ts` | 게임 상수 (3,285줄) | ⚠️ **미사용** | ❌ |
| `GameBalance.ts` | 게임 밸런스 설정 | ⚠️ **미사용** | ❌ |

**사용되지 않는 파일 (2개):**
- `GameConstants.ts` - SystemLogic.ts로 통합됨
- `GameBalance.ts` - GameConfig.ts로 통합됨

---

### 🔧 **Lib** (`src/lib/`)

| 파일명 | 역할 | 사용 여부 | 중요도 |
|--------|------|----------|--------|
| `gemini.ts` | **Gemini API 래퍼** | ✅ 사용 | ⭐⭐⭐ |
| `utils.ts` | **파싱 및 유틸 함수** (메인) | ✅ 사용 | ⭐⭐⭐ |
| `draftUtils.ts` | 드래프트 유틸리티 | ✅ 사용 | ⭐⭐ |
| `newsUtils.ts` | 뉴스 처리 유틸리티 | ✅ 사용 | ⭐ |
| `nameGenerator.ts` | 이름 생성기 | ⚠️ **미사용** | ❌ |
| `negotiationService.ts` | 협상 서비스 | ⚠️ **미사용** | ❌ |
| `statsCalculator.ts` | 스탯 계산기 | ⚠️ **미사용** | ❌ |
| `tradeManager.ts` | 트레이드 관리자 | ⚠️ **미사용** | ❌ |
| `transferMarket.ts` | 이적 시장 | ⚠️ **미사용** | ❌ |
| `uiUtils.ts` | UI 유틸리티 | ⚠️ **미사용** | ❌ |
| `dataLoader.ts` | 데이터 로더 | ⚠️ **부분 사용** | ⚠️ |

**사용되지 않는 파일 (6개):**
- `nameGenerator.ts` - AI가 이름 생성하므로 불필요
- `negotiationService.ts` - ChatInterface에서 직접 처리
- `statsCalculator.ts` - AI가 스탯 계산하므로 불필요
- `tradeManager.ts` - AI가 트레이드 처리하므로 불필요
- `transferMarket.ts` - AI가 이적 처리하므로 불필요
- `uiUtils.ts` - 사용되지 않음

**부분 사용 (1개):**
- `dataLoader.ts` - App.tsx에서 import되지만 실제 사용 안 함 (StorageService로 대체)

---

### 🎯 **Services** (`src/services/`)

| 파일명 | 역할 | 사용 여부 | 중요도 |
|--------|------|----------|--------|
| `StorageService.ts` | 저장소 서비스 (인터페이스) | ✅ 사용 | ⭐⭐ |
| `FileStorageStrategy.ts` | 파일 저장 전략 | ✅ 사용 | ⭐⭐ |
| `FacilityService.ts` | 시설 관리 서비스 | ✅ 사용 | ⭐⭐ |
| `GitHubGistStrategy.ts` | GitHub Gist 저장 전략 | ⚠️ **미사용** | ❌ |
| `EventManager.ts` | 이벤트 관리자 | ⚠️ **미사용** | ❌ |

**사용되지 않는 파일 (2개):**
- `GitHubGistStrategy.ts` - 파일 저장만 사용 중
- `EventManager.ts` - ChatInterface에서 직접 처리

---

### 🎨 **Context** (`src/context/`)

| 파일명 | 역할 | 사용 여부 | 중요도 |
|--------|------|----------|--------|
| `ToastContext.tsx` | Toast 알림 컨텍스트 | ✅ 사용 | ⭐⭐ |
| `AuthContext.tsx` | 인증 컨텍스트 | ⚠️ **부분 사용** | ⚠️ |

**부분 사용 (1개):**
- `AuthContext.tsx` - App.tsx에서 import되지만 실제 인증 기능 미구현 (dataLoader.ts에서만 사용)

---

### 🪝 **Hooks** (`src/hooks/`)

| 파일명 | 역할 | 사용 여부 | 중요도 |
|--------|------|----------|--------|
| `useSound.ts` | 사운드 효과 훅 | ✅ 사용 | ⭐ |

---

### 📝 **Types** (`src/types/`)

| 파일명 | 역할 | 사용 여부 | 중요도 |
|--------|------|----------|--------|
| `index.ts` | TypeScript 타입 정의 | ✅ 사용 | ⭐⭐ |

---

### 🛠️ **Utils** (`src/utils/`)

| 파일명 | 역할 | 사용 여부 | 중요도 |
|--------|------|----------|--------|
| `DateUtils.ts` | 날짜 유틸리티 | ✅ 사용 | ⭐ |
| `SimulationEngine.ts` | 시뮬레이션 엔진 | ⚠️ **미사용** | ❌ |

**사용되지 않는 파일 (1개):**
- `SimulationEngine.ts` - AI가 시뮬레이션 처리하므로 불필요

---

### 🎨 **Styles** (`src/styles/`)

| 파일명 | 역할 | 사용 여부 | 중요도 |
|--------|------|----------|--------|
| `mobile.css` | 모바일 스타일 | ⚠️ **미사용** | ❌ |

**사용되지 않는 파일 (1개):**
- `mobile.css` - index.css와 Tailwind로 대체됨

---

## 📊 사용 현황 요약

### ✅ **사용 중인 파일 (활발히 사용)**

**핵심 파일 (필수):**
- `ChatInterface.tsx` - 게임 핵심 로직
- `gemini.ts` - API 통신
- `utils.ts` - 파싱 및 유틸
- `SystemLogic.ts` - AI 프롬프트
- `InitialData.ts` - 로스터 데이터
- `GameConfig.ts` - 게임 설정
- `TeamData.ts` - 팀 정보

**UI 컴포넌트 (활발히 사용):**
- `App.tsx`, `StartScreen.tsx`, `TeamSelector.tsx`
- `GameHeader.tsx`, `MessageBubble.tsx`
- `OptionsModal.tsx`, `NewsSidebar.tsx`
- `FacilityManagement.tsx`, `RandomEventModal.tsx`
- `TransactionModal.tsx`, `StandingsModal.tsx`, `GameResultModal.tsx`

**서비스 (활발히 사용):**
- `StorageService.ts`, `FileStorageStrategy.ts`
- `FacilityService.ts`

---

### ⚠️ **사용되지 않는 파일 (삭제 고려)**

**컴포넌트 (5개):**
1. `EventModal.tsx` - ChatInterface에서 제거됨
2. `LoadGameModal.tsx` - App.tsx에서 import만 있고 사용 안 함
3. `NewsTicker.tsx` - NewsSidebar로 대체됨
4. `PlayerCardModal.tsx` - 선수 상세 기능 미구현
5. `SettingsModal.tsx` - 설정 기능 미구현

**Constants (2개):**
6. `GameConstants.ts` - SystemLogic.ts로 통합됨
7. `GameBalance.ts` - GameConfig.ts로 통합됨

**Lib (6개):**
8. `nameGenerator.ts` - AI가 이름 생성
9. `negotiationService.ts` - ChatInterface에서 직접 처리
10. `statsCalculator.ts` - AI가 스탯 계산
11. `tradeManager.ts` - AI가 트레이드 처리
12. `transferMarket.ts` - AI가 이적 처리
13. `uiUtils.ts` - 사용되지 않음

**Services (2개):**
14. `GitHubGistStrategy.ts` - 파일 저장만 사용 중
15. `EventManager.ts` - ChatInterface에서 직접 처리

**Utils (1개):**
16. `SimulationEngine.ts` - AI가 시뮬레이션 처리

**Styles (1개):**
17. `mobile.css` - index.css와 Tailwind로 대체됨

**총 17개 파일 삭제 고려 가능**

---

### ⚠️ **부분 사용 파일 (향후 확장용)**

1. `PlayerCard.tsx` - 타입만 export, 실제 컴포넌트 미사용
2. `dataLoader.ts` - App.tsx에서 import만 있고 실제 사용 안 함
3. `AuthContext.tsx` - dataLoader.ts에서만 사용, 실제 인증 기능 미구현

---

## 🔄 데이터 흐름 (Data Flow)

### 1. **게임 초기화**
```
[사용자]
  ↓
[App.tsx]
  ├─ ApiKeyModal (API 키 입력)
  ├─ DifficultyModal (난이도 선택)
  ├─ TeamSelector (팀 선택)
  └─ StartScreen (게임 시작)
      ↓
[ChatInterface.tsx]
  ├─ initializeGameWithData()
  │   ├─ getGeminiModel() → SystemLogic.ts 로드
  │   └─ KBO_INITIAL_DATA 전송
  └─ 초기 응답 처리
```

### 2. **메시지 처리**
```
[사용자 입력]
  ↓
[ChatInterface.handleSend()]
  ├─ Gemini API 호출 (스트리밍)
  ├─ parseAIResponse() (utils.ts)
  │   ├─ JSON 태그 제거
  │   ├─ OPTIONS 파싱
  │   ├─ STATUS 파싱 (날짜, 자금)
  │   ├─ NEWS 파싱
  │   ├─ FINANCE_UPDATE 파싱
  │   ├─ ROSTER 파싱
  │   └─ GAME_RESULTS 파싱
  └─ 상태 업데이트
      ├─ gameState
      ├─ messages
      ├─ pendingOptions
      ├─ newsItems
      ├─ transactionHistory
      ├─ currentRoster
      └─ leagueStandings
```

### 3. **저장/불러오기**
```
[저장]
  ↓
[ChatInterface.handleSave()]
  ├─ getSaveData() → 모든 상태 수집
  ├─ FileStorageStrategy.exportSaveFile()
  └─ localStorage.setItem()

[불러오기]
  ↓
[ChatInterface.handleLoad()]
  ├─ localStorage.getItem() 또는 파일 업로드
  ├─ 데이터 검증
  ├─ 상태 복원
  └─ Gemini API 히스토리 복원
```

---

## 🎯 주요 기능별 파일 매핑

### **게임 초기화**
- `App.tsx` - 라우팅 및 초기화
- `StartScreen.tsx` - 시작 화면
- `DifficultyModal.tsx` - 난이도 선택
- `TeamSelector.tsx` - 팀 선택
- `gemini.ts` - API 초기화
- `SystemLogic.ts` - AI 프롬프트
- `InitialData.ts` - 로스터 데이터

### **게임 플레이**
- `ChatInterface.tsx` - 메인 게임 로직
- `MessageBubble.tsx` - 메시지 표시
- `OptionsModal.tsx` - 선택지 표시
- `GameHeader.tsx` - 상태 표시

### **시설 관리**
- `FacilityManagement.tsx` - 시설 UI
- `FacilityService.ts` - 시설 로직
- `Facilities.ts` - 시설 정의

### **뉴스 시스템**
- `NewsSidebar.tsx` - 뉴스 UI
- `newsUtils.ts` - 뉴스 처리

### **거래 내역**
- `TransactionModal.tsx` - 거래 내역 UI
- `utils.ts` - 거래 내역 파싱

### **리그 순위**
- `StandingsModal.tsx` - 순위표 UI
- `utils.ts` - 경기 결과 파싱

### **저장/불러오기**
- `StorageService.ts` - 저장소 인터페이스
- `FileStorageStrategy.ts` - 파일 저장
- `ChatInterface.tsx` - 저장/불러오기 로직

---

## 🧹 정리 권장 사항

### **즉시 삭제 가능 (17개 파일)**

1. **컴포넌트 (5개)**
   - `src/components/EventModal.tsx`
   - `src/components/LoadGameModal.tsx`
   - `src/components/NewsTicker.tsx`
   - `src/components/PlayerCardModal.tsx`
   - `src/components/SettingsModal.tsx`

2. **Constants (2개)**
   - `src/constants/GameConstants.ts`
   - `src/constants/GameBalance.ts`

3. **Lib (6개)**
   - `src/lib/nameGenerator.ts`
   - `src/lib/negotiationService.ts`
   - `src/lib/statsCalculator.ts`
   - `src/lib/tradeManager.ts`
   - `src/lib/transferMarket.ts`
   - `src/lib/uiUtils.ts`

4. **Services (2개)**
   - `src/services/GitHubGistStrategy.ts`
   - `src/services/EventManager.ts`

5. **Utils (1개)**
   - `src/utils/SimulationEngine.ts`

6. **Styles (1개)**
   - `src/styles/mobile.css`

### **향후 확장용 보관 (3개 파일)**

- `src/components/PlayerCard.tsx` - 선수 상세 기능 구현 시 사용
- `src/lib/dataLoader.ts` - 향후 데이터 로딩 기능 확장 시 사용
- `src/context/AuthContext.tsx` - 향후 인증 기능 구현 시 사용

---

## 📈 프로젝트 통계

- **총 파일 수**: 약 70개
- **사용 중인 파일**: 약 53개 (76%)
- **미사용 파일**: 약 17개 (24%)
- **부분 사용 파일**: 약 3개 (4%)

**코드베이스 크기:**
- `ChatInterface.tsx`: 1,660줄 (가장 큰 파일)
- `SystemLogic.ts`: 3,654줄 (AI 프롬프트)
- `InitialData.ts`: 736줄 (로스터 데이터)
- `GameConstants.ts`: 3,285줄 (미사용)

---

## 🎯 결론

프로젝트는 **AI 기반 게임**이므로 많은 비즈니스 로직이 AI 프롬프트로 처리됩니다. 따라서 다음과 같은 파일들이 불필요합니다:

1. **계산/생성 로직** - AI가 처리하므로 불필요
2. **미구현 기능** - UI만 있고 로직이 없는 파일
3. **중복 파일** - 다른 파일로 통합된 파일

**권장 사항:**
- 17개 미사용 파일 삭제로 코드베이스 정리
- 향후 확장 계획이 있는 파일은 보관
- 정기적인 코드 리뷰로 미사용 파일 제거

