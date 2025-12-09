# 무료 티어 토큰 최적화 전략

**일자**: 2025-12-09  
**목적**: Context Caching 없이도 토큰 사용량을 줄이는 방법

---

## 🔍 현재 상황

- **Context Caching**: 무료 티어에서 사용 불가 (저장소 제한 0 토큰)
- **Implicit Caching**: 무료 티어에서 사용 불가 (유료 플랜 전용)
- **System Logic 크기**: 181,522자 (약 116,563 토큰)
- **현재 토큰 사용량**: 약 147,563 토큰/요청

---

## ✅ 무료로 구현 가능한 방법

### 방법 1: System Logic 경량화 (가장 효과적) ⭐

**목표**: 핵심 규칙만 추출하여 토큰 수를 80-90% 감소

#### 현재 vs 목표

| 항목 | 현재 | 목표 | 절감률 |
|------|------|------|--------|
| System Logic | 181,522자 | 20,000자 | 89% |
| 토큰 수 | 116,563 | 13,000 | 89% |
| 총 토큰/요청 | 147,563 | 44,000 | 70% |

#### 구현 방법

1. **핵심 규칙만 추출**:
   - 난이도별 설정 (EASY, NORMAL, HARD, HELL)
   - 데이터 무결성 규칙
   - 로스터 출력 규칙
   - 경기 시뮬레이션 로직

2. **제거 가능한 부분**:
   - 상세한 예시 및 설명
   - 반복되는 규칙 설명
   - 과도한 주의사항

3. **경량 버전 생성**:
   ```typescript
   // src/constants/prompts/SystemLogicLite.ts
   export const KBO_SYSTEM_LOGIC_LITE = `# 핵심 규칙만 포함된 경량 버전
   ... (20,000자 정도)
   `;
   ```

#### 예상 효과

- **토큰 절감**: 약 70% (147,563 → 44,000 토큰)
- **비용 절감**: 약 70% 감소
- **무료 티어 호환**: 완전히 무료로 사용 가능

---

### 방법 2: 메시지 순서 최적화 (유료 전환 대비)

**목표**: 나중에 유료 플랜으로 전환 시 Implicit Caching 활용 가능하도록 구조화

#### 원칙

1. **System Logic을 항상 첫 번째로 배치**
2. **변경되지 않는 내용을 앞에 배치**
3. **변동적인 내용(히스토리, 사용자 입력)을 뒤에 배치**

#### 현재 구조 (이미 최적화됨)

```typescript
// systemInstruction으로 전달 (항상 첫 번째)
const model = genAI.getGenerativeModel({
  model: GEMINI_MODEL,
  systemInstruction: KBO_SYSTEM_LOGIC, // 항상 동일
});

// 이후 히스토리와 사용자 입력 추가
const chat = model.startChat({
  history: [...], // 변동적
});
```

**평가**: ✅ 이미 최적화되어 있음

---

### 방법 3: System Logic 압축 및 요약

**목표**: System Logic을 압축하여 전송

#### 방법

1. **중복 제거**: 반복되는 규칙 통합
2. **약어 사용**: 긴 설명을 짧은 키워드로 변경
3. **구조화**: 마크다운 구조를 더 간결하게

#### 예시

```markdown
# Before (길게)
**절대 원칙:** 경기 시뮬레이션 결과는 철저하게 선수의 20-80 스케일 능력치를 따릅니다.

# After (짧게)
**원칙:** 시뮬레이션 = 20-80 스케일 능력치 기반
```

#### 예상 효과

- **토큰 절감**: 약 30-40%
- **구현 난이도**: 중간
- **기능 영향**: 최소 (핵심 규칙 유지)

---

### 방법 4: 하이브리드 방식

**목표**: 초기에는 전체 전송, 이후에는 변경사항만 전송

#### 방법

1. **첫 요청**: 전체 System Logic 전송
2. **이후 요청**: 변경된 부분만 전송
3. **히스토리에 누적**: 이전 System Logic은 히스토리에서 참조

#### 문제점

- System Logic은 변경되지 않으므로 효과 없음
- 히스토리에 System Logic을 포함하면 오히려 토큰 증가

**평가**: ❌ 비효율적

---

## 🎯 권장 방법: System Logic 경량화

### 구현 계획

#### 1단계: 경량 버전 생성

```typescript
// src/constants/prompts/SystemLogicLite.ts
export const KBO_SYSTEM_LOGIC_LITE = `# KBO 게임 마스터 (경량 버전)

## 핵심 원칙
1. 능력치 20-80 스케일 절대 존중
2. 난이도별 차별화 (자금, 부상, AI 성향)
3. 데이터 무결성 (재정, 스탯, 기록)

## 난이도 설정
- EASY: 자금 80억, 부상 없음, 승률 +10%
- NORMAL: 자금 30억, 현실적 밸런스
- HARD: 자금 20억, 수입 90%, 부상 1.5배
- HELL: 자금 10억, 수입 80%, 부상 2배

## 로스터 규칙
- InitialData에 있는 선수만 존재
- 외부 지식 사용 금지
- 로스터 일치 필수

... (핵심 규칙만 포함, 약 20,000자)
`;
```

#### 2단계: 무료 티어 감지 및 자동 전환

```typescript
// src/lib/gemini.ts
export async function getGeminiModel(apiKey: string, useLite: boolean = false) {
  const systemLogic = useLite ? KBO_SYSTEM_LOGIC_LITE : KBO_SYSTEM_LOGIC;
  
  const model = genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    systemInstruction: systemLogic,
  });
  
  return model;
}
```

#### 3단계: 무료 티어 자동 감지

```typescript
// Context Caching 실패 시 자동으로 경량 버전 사용
if (cacheCreationFailed && error.includes('Free tier limit')) {
  console.log('[Token Optimization] 무료 티어 감지: 경량 버전 사용');
  return getGeminiModel(apiKey, true); // 경량 버전 사용
}
```

---

## 📊 예상 효과 비교

### 현재 (무료 티어, 전체 System Logic)

| 항목 | 토큰 |
|------|------|
| System Logic | 116,563 |
| 히스토리 | 30,000 |
| 사용자 입력 | 1,000 |
| **총합** | **147,563** |

### 경량화 후 (무료 티어, 경량 System Logic)

| 항목 | 토큰 |
|------|------|
| System Logic (경량) | 13,000 |
| 히스토리 | 30,000 |
| 사용자 입력 | 1,000 |
| **총합** | **44,000** |
| **절감률** | **70% 절감** |

### 유료 플랜 (Context Caching 사용)

| 항목 | 토큰 |
|------|------|
| System Logic (캐시) | 0 |
| 히스토리 | 30,000 |
| 사용자 입력 | 1,000 |
| **총합** | **31,000** |
| **절감률** | **79% 절감** |

---

## ✅ 구현 우선순위

1. **즉시 구현 가능**: System Logic 경량화 (가장 효과적)
2. **중기 구현**: 무료 티어 자동 감지 및 경량 버전 전환
3. **장기 고려**: 유료 플랜 전환 시 Context Caching 활성화

---

## 🎯 결론

**무료로 Context Caching을 대체할 수 있는 가장 효과적인 방법은 System Logic 경량화입니다.**

- ✅ **70% 토큰 절감** 예상
- ✅ **무료 티어에서 완전히 작동**
- ✅ **기능 영향 최소화** (핵심 규칙 유지)
- ✅ **구현 난이도 낮음**

**경량 버전 생성 작업을 진행할까요?**
