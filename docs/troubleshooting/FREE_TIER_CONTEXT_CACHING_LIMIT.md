# 무료 티어 Context Caching 제한 해결

**에러 메시지**:
```
TotalCachedContentStorageTokensPerModelFreeTier limit exceeded for model gemini-2.5-flash: limit=0, requested=116563
```

**원인**: Google Gemini API 무료 티어에서는 Context Caching 저장소가 0 토큰으로 제한됨

---

## 🔍 문제 분석

### 에러 상세

- **상태 코드**: 429 (Too Many Requests)
- **에러 코드**: RESOURCE_EXHAUSTED
- **제한**: 무료 티어 Context Caching 저장소 = 0 토큰
- **요청**: 116,563 토큰 (System Logic 크기)

### 결론

**Context Caching은 유료 플랜에서만 사용 가능합니다.**

무료 티어에서는:
- Context Caching 저장소: 0 토큰
- Context Caching 사용 불가
- 기존 방식 사용 (System Instruction 매번 전송)

---

## ✅ 해결 방법

### 자동 Fallback (이미 구현됨)

코드가 자동으로 Fallback을 처리합니다:

1. **Context Caching 시도** → 무료 티어 제한 에러
2. **자동 Fallback** → 기존 방식 사용
3. **게임 정상 작동** (단, 토큰 사용량 높음)

### 수정된 동작

**이전**: 에러 발생 시 500 에러 반환  
**현재**: 무료 티어 제한 감지 시 정상 응답 + Fallback 안내

```json
{
  "success": false,
  "error": "Free tier limit",
  "message": "Context Caching은 무료 티어에서 사용할 수 없습니다.",
  "fallback": true
}
```

---

## 📊 토큰 사용량 비교

### 무료 티어 (Context Caching 불가)

| 항목 | 토큰 |
|------|------|
| System Logic | 116,563 토큰 (매번 전송) |
| 히스토리 | 30,000 토큰 |
| 사용자 입력 | 1,000 토큰 |
| **총합** | **약 147,563 토큰** |

### 유료 플랜 (Context Caching 사용 가능)

| 항목 | 토큰 |
|------|------|
| System Logic | **0 토큰** (캐시 사용) |
| 히스토리 | 30,000 토큰 |
| 사용자 입력 | 1,000 토큰 |
| **총합** | **약 31,000 토큰** |
| **절감률** | **79% 절감** |

---

## 💡 대안 해결 방법

### 방법 1: System Logic 경량화 (무료 티어용)

System Logic을 핵심 규칙만 추출하여 경량화:

- **현재**: 181,522자 (약 116,563 토큰)
- **목표**: 20,000자 (약 13,000 토큰)
- **절감**: 약 89% 감소

**장점**: 무료 티어에서도 토큰 사용량 감소  
**단점**: 일부 상세 규칙 제거 필요

### 방법 2: 유료 플랜 사용

Google Gemini API 유료 플랜으로 업그레이드:

- Context Caching 사용 가능
- 약 79% 토큰 절감
- 추가 기능 사용 가능

### 방법 3: 현재 상태 유지 (권장)

- Context Caching 시도 → 실패 감지 → 자동 Fallback
- 게임은 정상 작동
- 사용자 경험에 영향 없음

---

## 🔧 구현된 수정 사항

### 1. 무료 티어 제한 감지

```typescript
if (cacheResponse.status === 429 && errorMessage.includes('TotalCachedContentStorageTokensPerModelFreeTier')) {
  // 무료 티어 제한 에러 처리
  return res.status(200).json({
    success: false,
    error: 'Free tier limit',
    fallback: true,
  });
}
```

### 2. 클라이언트 Fallback 처리

```typescript
if (data.success === false && data.error === 'Free tier limit') {
  console.warn('[Context Caching] ⚠️ 무료 티어 제한: Context Caching 사용 불가');
  return null; // 기존 방식 사용
}
```

---

## ✅ 현재 상태

- ✅ **자동 Fallback 작동**: 무료 티어 제한 시 자동으로 기존 방식 사용
- ✅ **에러 처리 개선**: 명확한 에러 메시지 및 안내
- ✅ **게임 정상 작동**: Context Caching 실패해도 게임은 정상 작동

---

## 📝 결론

**무료 티어에서는 Context Caching을 사용할 수 없지만, 자동 Fallback으로 게임은 정상 작동합니다.**

토큰 사용량을 줄이려면:
1. **System Logic 경량화** (무료 티어용)
2. **유료 플랜 사용** (Context Caching 활성화)

현재 구현은 두 경우 모두 처리할 수 있도록 설계되어 있습니다.
