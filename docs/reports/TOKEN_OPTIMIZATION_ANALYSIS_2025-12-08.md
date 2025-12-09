# 토큰 사용량 최적화 분석 및 개선 방안

**분석 일자**: 2025-12-08  
**현재 문제**: 단 몇 턴만에 누적 토큰 556,201개 (비정상적으로 높음)

---

## 🔍 문제 원인 분석

### 1. **히스토리 누적 문제**
- `messagesRef.current`가 최대 **150개**까지 저장됨 (`ChatInterface.tsx:170`)
- 각 메시지가 게임 리포트로 인해 매우 길 수 있음 (수천~수만 토큰)
- `compressHistory`는 최근 15개만 유지하지만, 그 15개가 매우 길 수 있음

### 2. **System Logic 크기**
- `KBO_SYSTEM_LOGIC`이 매우 큰 프롬프트 (약 3,700줄)
- Context Caching 시도했지만 브라우저 환경에서 실패
- 매 요청마다 System Instruction으로 전송될 가능성

### 3. **Initial Data 중복**
- 초기화 시 `KBO_INITIAL_DATA` 전송 (약 20,000자 이상)
- 이후 히스토리에 남아있어 계속 전송될 수 있음

### 4. **메시지 길이 제한 부족**
- 각 메시지당 길이 제한이 없음
- 게임 리포트가 매우 길어질 수 있음

---

## 🛠️ 최적화 방안

### 즉시 적용 가능한 개선사항

#### 1. 히스토리 크기 대폭 축소
- 현재: 최근 15개 턴 유지
- 개선: 최근 **5-8개 턴**만 유지
- 예상 절감: **50-70%**

#### 2. 메시지 길이 제한 추가
- 각 메시지당 최대 길이 제한 (예: 5,000자)
- 초과 시 요약 또는 앞부분만 전송
- 예상 절감: **30-50%**

#### 3. 더 적극적인 히스토리 압축
- `compressHistory` 함수 개선
- 오래된 메시지는 요약만 유지
- 예상 절감: **40-60%**

#### 4. Initial Data 제거
- 초기화 후 히스토리에서 Initial Data 제거
- 이후에는 요약만 전송
- 예상 절감: **10-20%**

---

## 📝 구현 코드

### 1. 히스토리 크기 축소 및 메시지 길이 제한

```typescript
// src/lib/tokenOptimizer.ts

// [CRITICAL] 히스토리 크기 대폭 축소
export const MAX_HISTORY_TURNS = 6; // 15 → 6으로 축소 (약 60% 절감)
export const MAX_USER_INPUT_LENGTH = 5000; // 10,000 → 5,000으로 축소
export const MAX_MESSAGE_LENGTH = 5000; // 각 메시지당 최대 길이 (신규 추가)

/**
 * [OPTIMIZE] 개별 메시지 길이 제한
 * 각 메시지가 너무 길면 앞부분만 유지하고 나머지는 요약
 */
export function truncateMessage(
  message: { role: string; parts: Array<{ text: string }> },
  maxLength: number = MAX_MESSAGE_LENGTH
): { role: string; parts: Array<{ text: string }> } {
  const text = message.parts[0]?.text || '';
  
  // 초기 데이터는 제외
  if (text.includes('[INITIAL_DATA_PACK]') || 
      text.includes('KBO_INITIAL_DATA') ||
      text.length > 30000) {
    return message;
  }
  
  if (text.length <= maxLength) {
    return message;
  }
  
  // 앞부분만 유지하고 나머지는 요약 표시
  const truncated = text.substring(0, maxLength);
  const summary = `\n\n[메시지 길이 제한: ${text.length}자 중 ${maxLength}자만 표시. 나머지는 생략됨]`;
  
  console.log(`✂️ 메시지 길이 제한: ${text.length}자 → ${maxLength}자로 절단`);
  
  return {
    role: message.role,
    parts: [{ text: truncated + summary }]
  };
}

/**
 * [OPTIMIZE] 히스토리 압축 (개선 버전)
 * 오래된 메시지는 요약하고, 최근 메시지는 길이 제한
 */
export function compressHistoryAdvanced(
  history: Array<{ role: string; parts: Array<{ text: string }> }>,
  maxRecentTurns: number = MAX_HISTORY_TURNS
): Array<{ role: string; parts: Array<{ text: string }> }> {
  if (history.length <= maxRecentTurns) {
    // 모든 메시지에 길이 제한 적용
    return history.map(msg => truncateMessage(msg));
  }

  // 최근 N개와 오래된 대화 분리
  const recentHistory = history.slice(-maxRecentTurns);
  const oldHistory = history.slice(0, -maxRecentTurns);

  // 오래된 대화 요약
  const summaryText = `[이전 대화 요약 (${oldHistory.length}개 턴)]\n` +
    `게임 진행 중... 주요 이벤트만 요약되어 있습니다.\n` +
    `(최근 ${maxRecentTurns}개 턴의 대화는 그대로 유지됩니다.)`;

  // 최근 메시지에 길이 제한 적용
  const truncatedRecent = recentHistory.map(msg => truncateMessage(msg));

  // 요약 + 최근 대화
  return [
    {
      role: 'model',
      parts: [{ text: summaryText }]
    },
    ...truncatedRecent
  ];
}
```

### 2. ChatInterface.tsx 개선

```typescript
// src/components/ChatInterface.tsx

// [OPTIMIZE] messagesRef 크기 축소
if (messagesRef.current.length > 50) { // 150 → 50으로 축소
  messagesRef.current = messagesRef.current.slice(-50);
}

// [OPTIMIZE] 히스토리 압축 개선
let finalSafeHistory = safeHistory;
if (!isInitialData) {
  const { optimizedHistory } = optimizeForTokenUsage(safeHistory, '', false);
  // compressHistory 대신 compressHistoryAdvanced 사용
  finalSafeHistory = compressHistoryAdvanced(optimizedHistory, 6); // 15 → 6으로 축소
} else {
  console.log('[TokenOptimizer] 초기 데이터 프롬프트: 히스토리 최적화 건너뛰기');
}

// [OPTIMIZE] Initial Data 제거
// 초기화 후 히스토리에서 Initial Data 포함 메시지 제거
if (finalSafeHistory.length > 0) {
  finalSafeHistory = finalSafeHistory.filter(msg => {
    const text = msg.parts[0]?.text || '';
    return !text.includes('[INITIAL_DATA_PACK]') && 
           !text.includes('KBO_INITIAL_DATA');
  });
}
```

### 3. System Logic 최적화 (선택적)

```typescript
// src/lib/gemini.ts

// [OPTIMIZE] System Logic을 더 짧은 버전으로 분리
// 핵심 규칙만 포함하는 경량 버전 생성
const KBO_SYSTEM_LOGIC_LITE = `
# 핵심 규칙만 포함 (전체 규칙은 별도 참조)
- 난이도별 설정 준수
- 데이터 무결성 유지
- 현실성 보장
... (핵심만 추출)
`;

// Context Caching 실패 시 경량 버전 사용
const systemInstruction = activeCacheName 
  ? null // Context Caching 사용
  : KBO_SYSTEM_LOGIC_LITE; // 경량 버전 사용
```

---

## 📊 예상 토큰 절감 효과

### 현재 상태 (추정)
- 히스토리: 15개 턴 × 평균 5,000 토큰 = **75,000 토큰**
- System Logic: 약 **50,000 토큰** (매 요청마다)
- Initial Data: 약 **30,000 토큰** (히스토리에 남아있을 경우)
- 사용자 입력: 평균 **1,000 토큰**
- **총합: 약 156,000 토큰/요청**

### 최적화 후 (추정)
- 히스토리: 6개 턴 × 평균 2,000 토큰 (길이 제한) = **12,000 토큰** (84% 절감)
- System Logic: Context Caching 또는 경량 버전 = **0-10,000 토큰** (80-100% 절감)
- Initial Data: 제거 = **0 토큰** (100% 절감)
- 사용자 입력: 평균 **500 토큰** (50% 절감)
- **총합: 약 12,500-22,500 토큰/요청**

### 예상 절감률
- **최소 85% 절감** (156,000 → 22,500 토큰)
- **최대 92% 절감** (156,000 → 12,500 토큰)

---

## ✅ 구현 우선순위

1. **즉시 적용 (High Priority)**
   - 히스토리 크기 15 → 6으로 축소
   - 메시지 길이 제한 추가
   - Initial Data 히스토리에서 제거

2. **단기 적용 (Medium Priority)**
   - `compressHistoryAdvanced` 함수 구현
   - messagesRef 크기 150 → 50으로 축소

3. **장기 적용 (Low Priority)**
   - System Logic 경량 버전 생성
   - 서버 사이드 Context Caching 구현

---

## 📌 참고사항

- 초기 데이터는 게임 시작 시에만 필요하므로, 이후 히스토리에서 제거해도 무방
- 최근 6개 턴만 유지해도 게임 맥락 유지 가능
- 메시지 길이 제한 시 중요한 정보(STATUS, OPTIONS 등)는 유지되도록 주의
