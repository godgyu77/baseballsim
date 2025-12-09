# Context Caching (컨텍스트 캐싱) 설명

## 📖 기본 개념

**Context Caching**은 Google Gemini API의 기능으로, **반복적으로 사용되는 큰 컨텍스트(프롬프트)를 미리 캐시에 저장**하고, 이후 요청에서 **캐시 ID만 참조**하여 토큰 비용을 대폭 절감하는 기능입니다.

---

## 🎯 왜 필요한가?

### 현재 문제 상황

```
매 요청마다:
1. System Logic (약 50,000 토큰) 전송
2. 히스토리 (약 30,000 토큰) 전송
3. 사용자 입력 (약 1,000 토큰) 전송
─────────────────────────────
총: 약 81,000 토큰/요청
```

**System Logic은 매번 동일한데도 불구하고 매 요청마다 전송되고 있습니다!**

### Context Caching 사용 시

```
첫 번째 요청:
1. System Logic을 캐시에 저장 (캐시 ID: "abc123")
2. 캐시 ID + 히스토리 + 사용자 입력 전송
─────────────────────────────
총: 약 81,000 토큰 (첫 요청만)

두 번째 요청부터:
1. 캐시 ID "abc123" 참조 (0 토큰!)
2. 히스토리 (약 30,000 토큰) 전송
3. 사용자 입력 (약 1,000 토큰) 전송
─────────────────────────────
총: 약 31,000 토큰/요청 (62% 절감!)
```

---

## 🔧 작동 원리

### 1. **캐시 생성 (최초 1회)**

```typescript
// System Logic을 캐시에 저장
const cache = await genAI.createCachedContent({
  model: 'gemini-2.5-flash',
  contents: [{
    role: 'system',
    parts: [{ text: KBO_SYSTEM_LOGIC }] // 약 50,000 토큰
  }],
  ttlSeconds: 3600 // 1시간 유지
});

// 캐시 ID 저장
const cacheId = cache.name; // 예: "cachedContents/abc123"
```

### 2. **캐시 사용 (이후 모든 요청)**

```typescript
// 캐시 ID만 참조 (토큰 비용 0원!)
const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
  cachedContent: cacheId // System Logic은 캐시에서 가져옴
});

// 이제 System Logic은 토큰으로 계산되지 않음!
```

---

## 💰 비용 절감 효과

### 토큰 비용 비교

| 항목 | 일반 방식 | Context Caching |
|------|----------|----------------|
| System Logic | 50,000 토큰 | **0 토큰** (캐시 사용) |
| 히스토리 | 30,000 토큰 | 30,000 토큰 |
| 사용자 입력 | 1,000 토큰 | 1,000 토큰 |
| **총합** | **81,000 토큰** | **31,000 토큰** |
| **절감률** | - | **62% 절감** |

### 실제 비용 (예시)

- **일반 방식**: 81,000 토큰 × $0.075/1M 토큰 = **$0.006/요청**
- **Context Caching**: 31,000 토큰 × $0.075/1M 토큰 = **$0.002/요청**
- **절감**: **67% 비용 절감**

---

## 🚧 현재 프로젝트의 문제

### 브라우저 환경 제한

현재 코드(`src/lib/gemini.ts`)를 보면:

```typescript
// [CRITICAL] 브라우저 환경에서 cachedContent 생성은 제한될 수 있습니다.
// Google Gemini API의 cachedContent는 주로 서버 사이드(Node.js/Python)에서 사용됩니다.
// 브라우저에서 직접 생성하려면 CORS 및 보안 정책을 통과해야 합니다.
```

**문제점:**
1. 브라우저에서 `createCachedContent` 호출이 실패함
2. CORS 및 보안 정책 제한
3. SDK가 브라우저 환경을 완전히 지원하지 않을 수 있음

### 현재 상태

```typescript
// 캐시 생성 시도 → 실패
const cacheName = await tryCreateCachedContent(genAI, apiKey);
// 결과: null (실패)

// Fallback: 매번 System Logic 전송
const model = genAI.getGenerativeModel({
  systemInstruction: KBO_SYSTEM_LOGIC // 매번 50,000 토큰 전송 😱
});
```

---

## 💡 해결 방안

### 옵션 1: 서버 사이드 Context Caching (권장)

**구조:**
```
브라우저 (프론트엔드)
  ↓ API 요청
서버 (Node.js/Express)
  ↓ 캐시 생성 및 관리
Gemini API
```

**장점:**
- Context Caching 완전 지원
- 보안 강화 (API 키 서버에서 관리)
- 토큰 비용 대폭 절감

**단점:**
- 서버 구축 필요
- 추가 인프라 비용

### 옵션 2: System Logic 경량 버전 생성

**구조:**
```
기존: KBO_SYSTEM_LOGIC (약 50,000 토큰)
  ↓ 핵심 규칙만 추출
경량: KBO_SYSTEM_LOGIC_LITE (약 5,000 토큰)
```

**장점:**
- 즉시 적용 가능
- 서버 구축 불필요
- 약 90% 토큰 절감

**단점:**
- 일부 세부 규칙 누락 가능
- 수동으로 핵심 규칙 추출 필요

### 옵션 3: 하이브리드 방식

1. **서버에서 캐시 생성** (최초 1회)
2. **브라우저에서 캐시 ID만 사용**
3. **System Logic은 서버에서 관리**

---

## 📊 예상 효과 비교

### 현재 (Context Caching 없음)
- 평균 토큰: **181,762 토큰/요청**
- System Logic: 매번 전송 (50,000 토큰)

### 옵션 1: 서버 사이드 Context Caching
- 평균 토큰: **약 31,000 토큰/요청** (83% 절감)
- System Logic: 캐시 사용 (0 토큰)

### 옵션 2: System Logic 경량 버전
- 평균 토큰: **약 36,000 토큰/요청** (80% 절감)
- System Logic: 경량 버전 (5,000 토큰)

---

## ✅ 권장 사항

**단기 (즉시 적용 가능):**
1. ✅ System Logic 경량 버전 생성
2. ✅ 히스토리 압축 강화 (이미 적용됨)

**중기 (1-2주 내):**
1. 서버 사이드 Context Caching 구현
2. API 키 서버에서 관리

**장기 (선택적):**
1. RAG 시스템 도입 (선수 데이터 동적 로딩)
2. 더 정교한 히스토리 요약 시스템

---

## 📝 참고 자료

- [Google Gemini API Caching 문서](https://ai.google.dev/gemini-api/docs/caching)
- [Vertex AI Context Caching 가이드](https://cloud.google.com/vertex-ai/generative-ai/docs/context-cache/context-cache-overview)

---

**요약**: Context Caching은 반복되는 큰 프롬프트를 캐시에 저장하여 토큰 비용을 절감하는 기능입니다. 현재는 브라우저 환경 제한으로 사용하지 못하고 있어, 서버 사이드 구현 또는 System Logic 경량 버전 생성이 필요합니다.
