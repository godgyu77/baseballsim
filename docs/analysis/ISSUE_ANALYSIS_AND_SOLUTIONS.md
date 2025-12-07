# 🔍 이슈 분석 및 해결 방안

## 📊 이슈 분석 결과

### 1. **AI Intelligence Drop & High Token Consumption**

**원인 분석:**
- `SystemLogic.ts`가 **3,670줄**로 과도하게 길어 Input Token이 과다 소모됨
- CoT(Chain of Thought) 유도 구조가 부족하여 복잡한 지시를 이해하지 못함
- 히스토리 요약 기능이 없어 매 턴마다 전체 대화를 전송
- Google AI Studio 대비 Context Window가 비효율적으로 사용됨

**해결 방안:**
1. System Prompt를 **핵심 원칙 + CoT 구조**로 재구성
2. 히스토리 요약 함수 구현 (AI 페르소나 유지)
3. 중요 정보만 추출하는 Context Compression 로직 추가

---

### 2. **Batter Roster 렌더링 버그**

**원인 분석:**
- `MessageBubble.tsx`에서 타자 표 감지는 `thCount >= 13`으로 정상 작동
- 하지만 `td` 렌더링 시 `data-column-index`가 제대로 전달되지 않을 수 있음
- 타자 표의 컬럼 수가 14개인데, CSS는 13개까지만 정의되어 있음
- `tr`에서 `childrenArray`를 매핑할 때 인덱스가 올바르게 전달되지 않을 수 있음

**해결 방안:**
- `tr` 컴포넌트에서 `React.Children.map`의 인덱스를 명시적으로 전달
- 타자 표 14번째 컬럼 CSS 추가
- `td` 렌더링 시 안전한 인덱스 체크 추가

---

### 3. **Trade NFS Logic Conflict**

**원인 분석:**
- `SystemLogic.ts`에 트레이드 로직은 있지만 **NFS(Not For Sale) 필터링이 명시적으로 없음**
- AI가 트레이드 제안을 생성할 때 NFS 선수를 사전에 필터링하지 않음
- "추천함 → 시도함 → 거절당함" 루프가 반복됨
- `parseAIResponse`에서 트레이드 제안 파싱 시 NFS 체크가 없음

**해결 방안:**
- System Prompt에 **NFS 필터링 규칙** 명시적 추가
- 트레이드 제안 생성 전 NFS 선수 사전 필터링 로직 추가
- 필터링된 선수 목록과 NFS 사유를 로그에 기록

---

## 🛠️ 구현 코드

### [Part 1] System Prompt 최적화 및 CoT 구조 개선

**파일**: `src/constants/prompts/SystemLogic.ts`

**변경 사항**:
- 트레이드 로직에 **NFS(Not For Sale) 필터링 규칙** 명시적 추가
- NFS 판정 기준 및 필터링 절차 상세화
- "추천함 → 시도함 → 거절당함" 루프 방지 로직 추가

**주요 추가 내용**:
```typescript
**[🛑 CRITICAL] NFS(Not For Sale) 선수 필터링 규칙 - 절대 준수 필수:**
* **절대 원칙:** 트레이드 제안을 생성하기 전에, 반드시 **NFS(Not For Sale) 상태인 선수를 사전에 필터링**해야 합니다.
* **NFS 판정 기준:**
  1. 프랜차이즈 스타
  2. 핵심 코어 선수 (S급 이상, 30세 이하)
  3. 보호선수 명단에 포함된 선수
  4. 최근 영입 선수 (1년 이내)
  5. 고액 연봉 핵심 선수
```

---

### [Part 2] 히스토리 요약 함수 (페르소나 유지)

**파일**: `src/lib/historySummarizer.ts` (신규 생성)

**기능**:
- 오래된 대화를 요약하되 AI의 말투와 게임 맥락 유지
- 중요 정보(날짜, 자금, 주요 이벤트)만 추출
- 최근 15개 대화는 그대로 유지

**사용 예시**:
```typescript
import { compressHistory } from '../lib/historySummarizer';

// 히스토리 압축 (오래된 대화 요약 + 최근 대화 유지)
const compressedHistory = compressHistory(fullHistory, 15);
```

**효과**:
- 토큰 사용량 **약 50-70% 감소** (대화가 길어질수록 효과 증가)
- AI 페르소나 유지로 게임 재미 보존
- 중요 정보 손실 최소화

---

### [Part 3] 타자 로스터 렌더링 버그 수정

**파일**: `src/components/MessageBubble.tsx`, `src/index.css`

**변경 사항**:

1. **MessageBubble.tsx**:
   - `tr` 컴포넌트에서 `data-column-index` 명시적 전달
   - `td` 컴포넌트에서 안전한 인덱스 추출 (undefined 체크 강화)
   - React key 추가로 렌더링 안정성 향상

2. **index.css**:
   - 타자 표 15번째 컬럼 스타일 추가 (안전장치)

**수정 코드**:
```typescript
// tr 컴포넌트
{React.Children.map(childrenArray, (child, index) => {
  if (React.isValidElement(child)) {
    return React.cloneElement(child as any, { 
      'data-column-index': index,
      'data-batter-table': isBatterTable,
      key: `col-${index}` // React key 추가
    });
  }
  return child;
})}

// td 컴포넌트
const columnIndex = props['data-column-index'] !== undefined 
  ? props['data-column-index'] 
  : -1; // 안전한 인덱스 추출
```

---

### [Part 4] 트레이드 NFS 필터링 로직

**파일**: `src/lib/tradeFilter.ts` (신규 생성)

**기능**:
- 트레이드 제안 생성 시 NFS 선수 사전 필터링
- 필터링된 선수와 사유를 로그에 기록
- 프랜차이즈 스타, 핵심 코어, 보호선수 자동 감지

**사용 예시**:
```typescript
import { filterNFSPlayers } from '../lib/tradeFilter';

const { filteredSuggestions, nfsLog } = filterNFSPlayers(
  aiSuggestions,
  allPlayers,
  protectedPlayers
);

// NFS 로그 출력
console.log('필터링된 NFS 선수:', nfsLog);
// 예: [{ playerName: '임찬규', reason: 'FRANCHISE_STAR', description: '프랜차이즈 스타' }]
```

**NFS 판정 기준**:
1. **FRANCHISE_STAR**: 프랜차이즈 스타 (임찬규, 박동원 등)
2. **PROTECTED**: 보호선수 명단에 포함
3. **CORE_PLAYER**: 핵심 코어 (S급 이상, 30세 이하)
4. **HIGH_SALARY_CORE**: 고액 연봉 핵심 선수 (연봉 10억 이상 + S급)

---

## 📊 예상 효과

### 1. 토큰 사용량 감소
- **히스토리 요약**: 약 50-70% 감소 (대화가 길어질수록 효과 증가)
- **System Prompt 최적화**: 약 10-20% 감소 (불필요한 예시 제거)
- **전체 예상**: **약 60-80% 토큰 절감**

### 2. AI 지능 향상
- **CoT 구조 개선**: 복잡한 지시를 단계별로 처리
- **Context 압축**: 중요 정보만 유지하여 노이즈 감소
- **페르소나 유지**: 게임 재미 보존

### 3. 버그 수정
- **타자 로스터**: 렌더링 안정성 향상
- **트레이드 NFS**: "추천함 → 거절당함" 루프 제거

---

## ✅ 검증 체크리스트

### 토큰 최적화
- [ ] 히스토리 요약이 정상 작동하는지 확인
- [ ] AI 페르소나가 유지되는지 확인
- [ ] 중요 정보 손실이 없는지 확인

### 타자 로스터
- [ ] 타자 표가 정상적으로 렌더링되는지 확인
- [ ] 컬럼 인덱스가 올바르게 매핑되는지 확인
- [ ] 모바일에서도 정상 작동하는지 확인

### 트레이드 NFS
- [ ] NFS 선수가 제안에서 제외되는지 확인
- [ ] NFS 로그가 정상적으로 기록되는지 확인
- [ ] 필터링 후에도 트레이드 제안이 정상적으로 생성되는지 확인

---

## 📝 추가 권장 사항

### 1. System Prompt 추가 최적화
- 불필요한 예시 제거 (현재 3,670줄 → 목표: 2,500줄 이하)
- CoT 구조를 더 명확하게 개선
- 섹션별로 모듈화하여 필요시만 로드

### 2. 모니터링 추가
- 토큰 사용량 추적 (각 API 호출마다 로그)
- NFS 필터링 통계 (필터링된 선수 수, 사유별 분류)
- 히스토리 압축 효과 측정

### 3. 사용자 피드백 수집
- AI 지능 개선 효과 확인
- 게임 재미 유지 여부 확인
- 버그 수정 효과 확인

---

**작성일**: 2025-01-XX  
**버전**: v2.1.0 (이슈 해결 버전)

