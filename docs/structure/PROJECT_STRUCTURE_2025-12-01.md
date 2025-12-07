# 프로젝트 구조 및 데이터 흐름 분석

## 📁 프로젝트 구조

```
baseballsim/
├── src/
│   ├── App.tsx                    # 메인 앱 컴포넌트 (라우팅 및 상태 관리)
│   ├── main.tsx                   # React 앱 진입점
│   ├── index.css                  # 전역 스타일
│   │
│   ├── components/                # UI 컴포넌트
│   │   ├── ApiKeyModal.tsx        # API 키 입력 모달
│   │   ├── ChatInterface.tsx     # 메인 채팅 인터페이스 (핵심)
│   │   ├── GameHeader.tsx         # 게임 헤더 (날짜, 자금, 난이도)
│   │   ├── MessageBubble.tsx     # 메시지 버블 컴포넌트
│   │   ├── OptionsModal.tsx       # 선택지 모달
│   │   ├── NewsSidebar.tsx        # 뉴스 사이드바
│   │   ├── FacilityManagement.tsx # 시설 관리 모달
│   │   ├── RandomEventModal.tsx   # 랜덤 이벤트 모달
│   │   ├── DifficultyModal.tsx    # 난이도 선택 모달
│   │   ├── TeamSelector.tsx       # 팀 선택 컴포넌트
│   │   ├── StartScreen.tsx        # 시작 화면
│   │   └── ...
│   │
│   ├── constants/                 # 상수 및 설정
│   │   ├── prompts/               # AI 프롬프트
│   │   │   ├── index.ts          # 프롬프트 export
│   │   │   ├── SystemLogic.ts    # 게임 로직 프롬프트 (2,856줄)
│   │   │   └── InitialData.ts    # 초기 로스터 데이터 (720줄)
│   │   ├── TeamData.ts            # 팀 정보 (10개 구단)
│   │   ├── GameConfig.ts          # 난이도별 설정
│   │   ├── GameEvents.ts          # 랜덤 이벤트 정의
│   │   └── Facilities.ts          # 시설 정의
│   │
│   ├── lib/                       # 유틸리티 및 API
│   │   ├── gemini.ts              # Gemini API 래퍼
│   │   └── utils.ts               # 파싱 및 유틸 함수
│   │
│   └── hooks/                     # 커스텀 훅
│       └── useSound.ts            # 사운드 효과
│
├── package.json                   # 의존성 및 스크립트
├── vite.config.ts                 # Vite 설정
├── tailwind.config.js             # Tailwind CSS 설정
└── README.md                      # 프로젝트 설명
```

---

## 🔄 데이터 흐름 (Data Flow)

### 1. **프롬프트 로딩 및 초기화**

```
[시작]
  ↓
[App.tsx]
  ├─ API 키 입력 (ApiKeyModal)
  ├─ 난이도 선택 (DifficultyModal)
  ├─ 팀 선택 (TeamSelector)
  └─ 게임 시작
      ↓
[ChatInterface.tsx]
  ├─ getGeminiModel(apiKey)
  │   └─ KBO_SYSTEM_LOGIC 로드 (SystemInstruction)
  │
  └─ initializeGameWithData(apiKey)
      └─ KBO_INITIAL_DATA 전송 (첫 메시지)
```

**핵심 파일:**
- `src/lib/gemini.ts`: Gemini API 초기화
  - `KBO_SYSTEM_LOGIC` → `systemInstruction`으로 설정
  - `KBO_INITIAL_DATA` → 첫 메시지로 전송

### 2. **프롬프트 정보 출처**

#### **SystemLogic.ts (게임 로직)**
- **위치**: `src/constants/prompts/SystemLogic.ts`
- **용도**: AI의 게임마스터 역할 정의
- **내용**:
  - 게임 규칙 및 원칙
  - 난이도별 설정 (이지/노말/헬)
  - 데이터 무결성 규칙
  - 로스터 출력 규칙
  - 경기 시뮬레이션 로직
  - 드래프트, FA, 트레이드 규칙
  - 재정 관리 규칙

#### **InitialData.ts (로스터 데이터)**
- **위치**: `src/constants/prompts/InitialData.ts`
- **용도**: KBO 전 구단 초기 로스터 (Single Source of Truth)
- **내용**:
  - 10개 구단 (한화, SSG, LG, 두산, 롯데, KT, 삼성, KIA, NC, 키움)
  - 각 구단별 1군/2군 투수·타자 로스터
  - 선수 정보: 이름, 나이, 포지션, 스탯, 기록, 연봉

#### **GameConfig.ts (게임 설정)**
- **위치**: `src/constants/GameConfig.ts`
- **용도**: 난이도별 수치 설정
- **내용**:
  - 초기 자금 (이지: 80억, 노말: 30억, 헬: 10억)
  - 샐러리캡 (한국인/용병/아시아쿼터)
  - 수입/지출 배율

### 3. **메시지 처리 흐름**

```
[사용자 입력]
  ↓
[ChatInterface.handleSend()]
  ├─ 사용자 메시지 추가
  ├─ Gemini API 호출 (스트리밍)
  │   └─ chatInstance.sendMessageStream()
  │
  └─ 응답 처리
      ├─ parseAIResponse() (utils.ts)
      │   ├─ JSON 태그 제거
      │   ├─ OPTIONS 파싱
      │   ├─ STATUS 파싱 (날짜, 자금)
      │   ├─ NEWS 파싱
      │   └─ GUI_EVENT 파싱
      │
      ├─ 상태 업데이트
      │   ├─ gameState (날짜, 자금, 난이도)
      │   ├─ messages (채팅 히스토리)
      │   ├─ pendingOptions (선택지)
      │   └─ newsItems (뉴스)
      │
      └─ UI 업데이트
          ├─ GameHeader (날짜, 자금 표시)
          ├─ MessageBubble (메시지 표시)
          ├─ OptionsModal (선택지 표시)
          └─ NewsSidebar (뉴스 표시)
```

### 4. **저장/불러오기 흐름**

```
[저장]
  ↓
[ChatInterface.handleSave()]
  ├─ localStorage에 저장
  │   ├─ messages (채팅 히스토리)
  │   ├─ gameState (게임 상태)
  │   ├─ facilities (시설 레벨)
  │   ├─ newsItems (뉴스)
  │   ├─ selectedTeam (선택한 팀)
  │   ├─ difficulty (난이도)
  │   └─ pendingOptions (선택지)
  │
  └─ JSON.stringify() → localStorage.setItem()

[불러오기]
  ↓
[ChatInterface.handleLoad()]
  ├─ localStorage에서 읽기
  │   └─ JSON.parse()
  │
  ├─ 상태 복원
  │   ├─ setMessages()
  │   ├─ setGameState()
  │   └─ ...
  │
  └─ Gemini API 히스토리 복원
      └─ model.startChat({ history })
```

---

## 🎮 현재 기능

### ✅ **구현된 기능**

1. **게임 초기화**
   - API 키 입력 및 저장
   - 난이도 선택 (이지/노말/헬)
   - 팀 선택 (10개 구단 + 신생 구단 창단)
   - 초기 로스터 로딩

2. **채팅 인터페이스**
   - 카카오톡 스타일 메시지 버블
   - 실시간 스트리밍 응답
   - 선택지 버튼 (플로팅 버튼)
   - 로딩 오버레이 (진행률 표시)

3. **게임 상태 관리**
   - 날짜 추적 (STATUS 태그 파싱)
   - 자금 관리 (STATUS 태그 파싱)
   - 샐러리캡 표시
   - 난이도 표시

4. **시설 관리**
   - 훈련장 (경험치 획득량 증가)
   - 메디컬 센터 (부상 확률 감소, 회복 속도 증가)
   - 마케팅 팀 (수익 증가)
   - 스카우트 팀 (고등급 선수 발견 확률 증가)

5. **뉴스 시스템**
   - NEWS 태그 파싱
   - 뉴스 사이드바
   - 읽지 않은 뉴스 알림

6. **랜덤 이벤트**
   - 날짜 진행 시 랜덤 발생
   - 선택지 기반 이벤트
   - 자금/사기/팬 충성도 변동

7. **저장/불러오기**
   - 로컬 스토리지 저장
   - 게임 상태 복원
   - 채팅 히스토리 복원

8. **모바일 지원**
   - 반응형 디자인
   - 터치 친화적 UI
   - 모바일 브라우저 최적화

---

## 🔧 보완해야 할 기능

### 🚨 **긴급 (Critical)**

1. **로스터 데이터 무결성 강화**
   - ✅ AI가 InitialData.ts를 정확히 읽도록 규칙 추가 완료
   - ⚠️ **추가 필요**: 로스터 출력 시 자동 검증 로직
   - ⚠️ **추가 필요**: 잘못된 로스터 감지 시 경고 시스템

2. **자금 계산 정확성**
   - ⚠️ **문제**: AI 응답의 자금과 실제 계산 불일치 가능
   - ⚠️ **해결**: 자금 변동 추적 시스템 (거래 내역)
   - ⚠️ **해결**: 자금 검증 로직 (AI 응답 vs 실제 계산)

3. **선수 데이터 관리**
   - ⚠️ **미구현**: 선수 스탯 변경 추적
   - ⚠️ **미구현**: 선수 부상 시스템
   - ⚠️ **미구현**: 선수 성장/노화 시스템

### 📊 **중요 (High Priority)**

4. **경기 시뮬레이션**
   - ⚠️ **미구현**: 실제 경기 결과 생성
   - ⚠️ **미구현**: 경기 통계 (타율, ERA 등)
   - ⚠️ **미구현**: 시즌 성적 집계

5. **드래프트 시스템**
   - ⚠️ **부분 구현**: 프롬프트에 규칙만 있음
   - ⚠️ **미구현**: 드래프트 UI
   - ⚠️ **미구현**: 드래프트 후보 목록 표시

6. **FA (자유계약선수) 시스템**
   - ⚠️ **부분 구현**: 프롬프트에 규칙만 있음
   - ⚠️ **미구현**: FA 명단 UI
   - ⚠️ **미구현**: FA 협상 시스템

7. **트레이드 시스템**
   - ⚠️ **부분 구현**: 프롬프트에 규칙만 있음
   - ⚠️ **미구현**: 트레이드 UI
   - ⚠️ **미구현**: 트레이드 제안/수락 시스템

8. **선수 상세 정보**
   - ⚠️ **미구현**: 선수 카드 모달 (PlayerCardModal.tsx는 있으나 미사용)
   - ⚠️ **미구현**: 선수 스탯 상세 보기
   - ⚠️ **미구현**: 선수 기록 히스토리

### 🎯 **개선 (Medium Priority)**

9. **UI/UX 개선**
   - ⚠️ **개선**: 로딩 상태 더 명확하게 표시
   - ⚠️ **개선**: 에러 메시지 더 친화적으로
   - ⚠️ **개선**: 모바일 키보드 대응

10. **성능 최적화**
    - ⚠️ **개선**: 긴 채팅 히스토리 최적화
    - ⚠️ **개선**: 메시지 파싱 성능 개선
    - ⚠️ **개선**: 불필요한 리렌더링 방지

11. **데이터 검증**
    - ⚠️ **추가**: AI 응답 형식 검증
    - ⚠️ **추가**: STATUS 태그 필수 필드 검증
    - ⚠️ **추가**: 자금 계산 자동 검증

12. **통계 및 분석**
    - ⚠️ **미구현**: 시즌 통계 대시보드
    - ⚠️ **미구현**: 팀 성적 그래프
    - ⚠️ **미구현**: 선수 성적 추이

### 💡 **추가 기능 (Low Priority)**

13. **소셜 기능**
    - 💡 **미구현**: 게임 결과 공유
    - 💡 **미구현**: 리더보드
    - 💡 **미구현**: 멀티플레이어 (협력/경쟁)

14. **커스터마이징**
    - 💡 **미구현**: 테마 변경
    - 💡 **미구현**: 사운드 on/off
    - 💡 **미구현**: 폰트 크기 조절

15. **접근성**
    - 💡 **개선**: 키보드 네비게이션
    - 💡 **개선**: 스크린 리더 지원
    - 💡 **개선**: 색상 대비 개선

---

## 📝 프롬프트 사용 위치

### **SystemLogic.ts 사용**
```typescript
// src/lib/gemini.ts
export async function getGeminiModel(apiKey: string) {
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    systemInstruction: KBO_SYSTEM_LOGIC, // ← 여기서 사용
  });
}
```

### **InitialData.ts 사용**
```typescript
// src/lib/gemini.ts
export async function initializeGameWithData(apiKey: string) {
  const model = await getGeminiModel(apiKey);
  const chatSession = model.startChat();
  const result = await chatSession.sendMessage(KBO_INITIAL_DATA); // ← 여기서 사용
  return result.response.text();
}
```

### **GameConfig.ts 사용**
```typescript
// src/constants/GameConfig.ts
export const GAME_CONFIG: Record<Difficulty, DifficultyConfig> = {
  EASY: { initialBudget: 80.0, ... },
  NORMAL: { initialBudget: 30.0, ... },
  HELL: { initialBudget: 10.0, ... },
};

// src/components/ChatInterface.tsx
const difficultyConfig = difficulty === 'EASY' 
  ? '초기 자금: 80.0억 원, 샐러리캡: 250억 원'
  : ...; // ← 여기서 사용
```

---

## 🔍 주요 파일 역할

| 파일 | 역할 | 중요도 |
|------|------|--------|
| `App.tsx` | 메인 라우팅 및 상태 관리 | ⭐⭐⭐ |
| `ChatInterface.tsx` | 게임 핵심 로직 (1,226줄) | ⭐⭐⭐ |
| `SystemLogic.ts` | AI 프롬프트 (2,856줄) | ⭐⭐⭐ |
| `InitialData.ts` | 로스터 데이터 (720줄) | ⭐⭐⭐ |
| `gemini.ts` | Gemini API 래퍼 | ⭐⭐ |
| `utils.ts` | 파싱 및 유틸 함수 | ⭐⭐ |
| `GameConfig.ts` | 난이도별 설정 | ⭐⭐ |

---

## 🎯 다음 단계 권장 사항

1. **로스터 데이터 검증 시스템 구축**
   - AI 응답에서 로스터 추출
   - InitialData.ts와 비교
   - 불일치 시 경고

2. **자금 추적 시스템 구축**
   - 모든 자금 변동 기록
   - 거래 내역 저장
   - 자동 검증 로직

3. **선수 데이터베이스 구축**
   - 선수 정보 저장소
   - 스탯 변경 추적
   - 성장/노화 계산

4. **경기 시뮬레이션 구현**
   - 경기 결과 생성
   - 통계 집계
   - 시즌 진행

