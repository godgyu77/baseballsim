# 🔍 Google Gemini API 구현 검증 리포트

**작성일**: 2025-12-XX  
**검증 대상**: System Instructions & Context Caching 구현

---

## 📊 [구현 방식 진단]

### ✅ **System Instruction: Native Implementation (올바름)**

**현재 구현 방식:**
```typescript
// src/lib/gemini.ts:38-41
const model = genAI.getGenerativeModel({
  model: GEMINI_MODEL,
  systemInstruction: KBO_SYSTEM_LOGIC || '당신은 야구 매니지먼트 게임의 게임마스터입니다.',
});
```

**진단 결과:**
- ✅ **Native System Instruction 사용**: `systemInstruction` 파라미터를 별도로 전달하고 있습니다.
- ✅ **Google AI Studio와 동일한 방식**: AI Studio의 "System Instructions" 기능과 동일하게 구현되어 있습니다.
- ❌ **Message Appending 아님**: System Instruction이 메시지 배열에 포함되지 않습니다.

**실제 API 페이로드 구조 (시뮬레이션):**
```json
{
  "model": "gemini-2.5-flash",
  "systemInstruction": {
    "parts": [
      {
        "text": "# Role & Objective\n\n당신은 'KBO 프로야구 단장 웹 시뮬레이터'의 게임 엔진..."
      }
    ]
  },
  "contents": [
    {
      "role": "user",
      "parts": [
        {
          "text": "[SYSTEM STATUS: FIXED]\n- User Selected Team: KIA 타이거즈..."
        }
      ]
    }
  ],
  "generationConfig": {
    "maxOutputTokens": 16384
  }
}
```

**결론:** System Instruction은 올바르게 구현되어 있습니다. ✅

---

## 💰 [비용 효율 진단]

### ❌ **Context Caching: 로컬 변수 재사용 (비용 절감 없음)**

**현재 구현 방식:**
```typescript
// src/lib/gemini.ts:20-32
const modelCache = new Map<string, any>();

export async function getGeminiModel(apiKey: string) {
  if (modelCache.has(apiKey)) {
    console.log('[Cost Optimization] 모델 인스턴스 캐시에서 재사용');
    return modelCache.get(apiKey)!;
  }
  // ...
  const model = genAI.getGenerativeModel({
    systemInstruction: KBO_SYSTEM_LOGIC,
  });
  modelCache.set(apiKey, model);
  return model;
}
```

**진단 결과:**
- ❌ **API 레벨 캐싱 아님**: `cachedContent` API 기능을 사용하지 않습니다.
- ⚠️ **로컬 변수 재사용**: 프론트엔드 JavaScript 변수(Map)에 저장하여 재사용하는 방식입니다.
- ❌ **비용 절감 없음**: 매 API 호출마다 System Instruction이 토큰으로 계산됩니다.

**실제 비용 구조:**
```
매 API 호출마다:
- System Instruction (KBO_SYSTEM_LOGIC): ~3,700 토큰 (매번 계산됨)
- User Message: ~500-33,000 토큰
- History: ~1,000-5,000 토큰
= 총 Input Tokens: 매번 System Instruction 포함
```

**Google AI Studio의 Context Caching:**
- AI Studio는 `cachedContent` API를 사용하여 System Instruction을 서버에 캐시합니다.
- 첫 요청 후 System Instruction은 토큰으로 계산되지 않습니다.
- **예상 절감**: System Instruction 토큰 비용 100% 절감 (약 3,700 토큰/요청)

---

## 🛠️ [개선안]

### **Option 1: CachedContent API 사용 (권장)**

**Google Gemini API의 `cachedContent` 기능을 사용하여 System Instruction을 서버에 캐시합니다.**

```typescript
// src/lib/gemini.ts (개선안)
import { GoogleGenerativeAI, CachedContent } from '@google/generative-ai';

let cachedContentRef: CachedContent | null = null;

export async function getGeminiModel(apiKey: string) {
  const genAI = new GoogleGenerativeAI(apiKey);
  
  // [NEW] CachedContent 생성 (System Instruction 캐싱)
  if (!cachedContentRef) {
    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      systemInstruction: KBO_SYSTEM_LOGIC,
    });
    
    // System Instruction을 서버에 캐시
    cachedContentRef = await model.createCachedContent({
      model: GEMINI_MODEL,
      contents: [{
        role: 'system',
        parts: [{ text: KBO_SYSTEM_LOGIC }],
      }],
      ttlSeconds: 3600, // 1시간 캐시 유지
    });
    
    console.log('[Cost Optimization] System Instruction 캐시 생성 완료');
  }
  
  // 캐시된 컨텐츠를 사용하여 모델 생성
  const model = genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    cachedContent: cachedContentRef.name, // 캐시 이름 사용
  });
  
  return model;
}
```

**효과:**
- System Instruction 토큰 비용 100% 절감
- 매 요청마다 ~3,700 토큰 절약
- 월 1,000회 요청 기준: 약 3,700,000 토큰 절약

### **Option 2: 현재 방식 유지 + 설명 보완**

현재 방식도 올바르게 구현되어 있지만, 비용 절감은 없습니다. 로그 메시지를 명확히 수정:

```typescript
// src/lib/gemini.ts (로그 메시지 수정)
if (modelCache.has(apiKey)) {
  console.log('[Cost Optimization] 모델 인스턴스 캐시에서 재사용 (로컬 변수, API 레벨 캐싱 아님)');
  return modelCache.get(apiKey)!;
}
```

---

## 📈 [비용 비교]

### **현재 방식 (로컬 변수 재사용)**
```
요청 1: System Instruction (3,700) + User (500) = 4,200 토큰
요청 2: System Instruction (3,700) + User (500) = 4,200 토큰
요청 3: System Instruction (3,700) + User (500) = 4,200 토큰
총: 12,600 토큰
```

### **CachedContent API 사용 시**
```
요청 1: System Instruction (3,700) + User (500) = 4,200 토큰 (캐시 생성)
요청 2: System Instruction (0) + User (500) = 500 토큰 (캐시 사용)
요청 3: System Instruction (0) + User (500) = 500 토큰 (캐시 사용)
총: 5,200 토큰 (58% 절감)
```

---

## ✅ [최종 진단 요약]

### **System Instruction 구현**
- ✅ **올바름**: Native `systemInstruction` 파라미터 사용
- ✅ **Google AI Studio와 동일**: 올바른 구현 방식

### **Context Caching 구현**
- ❌ **부족함**: API 레벨 캐싱 미사용
- ⚠️ **현재**: 로컬 변수 재사용 (비용 절감 없음)
- 💡 **개선 필요**: `cachedContent` API 도입 권장

### **권장 사항**
1. **단기**: 로그 메시지 명확화 (현재 방식이 비용 절감이 아님을 명시)
2. **장기**: `cachedContent` API 도입으로 System Instruction 토큰 비용 절감

---

## 📝 [참고 자료]

- [Google Gemini API - CachedContent](https://ai.google.dev/gemini-api/docs/cached-content)
- [Google AI Studio - System Instructions](https://aistudio.google.com/)

