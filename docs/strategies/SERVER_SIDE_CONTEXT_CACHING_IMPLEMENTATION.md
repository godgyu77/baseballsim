# 서버 사이드 Context Caching 구현 가이드

**일자**: 2025-12-08  
**배포 환경**: Vercel (Serverless Functions 지원)  
**구현 가능**: ✅ 예

---

## 🎯 구현 개요

Vercel은 **Serverless Functions**를 지원하므로, API 라우트를 추가하여 서버 사이드 Context Caching을 구현할 수 있습니다.

### 구조

```
프론트엔드 (React)
  ↓ HTTP 요청
Vercel Serverless Function (/api/cache)
  ↓ Gemini API 호출
Google Gemini API
  ↓ 캐시 ID 반환
프론트엔드 (캐시 ID 사용)
```

---

## 📁 파일 구조

```
프로젝트 루트/
├── api/                    # [신규] Vercel API Routes
│   ├── cache/
│   │   └── create.ts      # 캐시 생성 API
│   └── chat/
│       └── stream.ts       # 채팅 스트리밍 API (선택적)
├── src/                    # 기존 프론트엔드 코드
└── vercel.json            # Vercel 설정
```

---

## 🛠️ 구현 단계

### 1단계: Vercel API Route 생성

#### `api/cache/create.ts`

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const GEMINI_MODEL = 'gemini-2.5-flash';

// System Logic (서버에서만 사용)
// 실제로는 파일에서 import하거나 환경 변수로 관리
const KBO_SYSTEM_LOGIC = `# Role & Objective
... (System Logic 전체 내용)
`;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { apiKey } = req.body;

    if (!apiKey) {
      return res.status(400).json({ error: 'API key is required' });
    }

    // Gemini API 초기화
    const genAI = new GoogleGenerativeAI(apiKey);

    // Context Caching 생성
    const cache = await genAI.cachedContents.create({
      model: GEMINI_MODEL,
      contents: [{
        role: 'system',
        parts: [{ text: KBO_SYSTEM_LOGIC }],
      }],
      ttlSeconds: 3600, // 1시간 유지
    });

    if (!cache.name) {
      throw new Error('Failed to create cache');
    }

    console.log(`[Context Caching] ✅ 캐시 생성 성공: ${cache.name}`);

    // 캐시 ID 반환
    return res.status(200).json({
      success: true,
      cacheId: cache.name,
      expiresAt: Date.now() + 3600 * 1000, // 1시간 후 만료
    });

  } catch (error: any) {
    console.error('[Context Caching] ❌ 캐시 생성 실패:', error);
    return res.status(500).json({
      error: 'Failed to create cache',
      message: error.message,
    });
  }
}
```

### 2단계: 프론트엔드 수정

#### `src/lib/gemini.ts` 수정

```typescript
// [Context Caching] 서버 사이드 캐시 생성 함수
async function createCacheOnServer(apiKey: string): Promise<string | null> {
  try {
    const response = await fetch('/api/cache/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apiKey }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success && data.cacheId) {
      console.log(`[Context Caching] ✅ 서버에서 캐시 생성 성공: ${data.cacheId}`);
      return data.cacheId;
    }

    return null;
  } catch (error: any) {
    console.error('[Context Caching] ❌ 서버 캐시 생성 실패:', error);
    return null;
  }
}

export async function getGeminiModel(apiKey: string) {
  const genAI = new GoogleGenerativeAI(apiKey);
  
  // [Context Caching] 1. 서버에서 캐시 생성 시도
  if (!activeCacheName && !cacheCreationAttempted) {
    cacheCreationAttempted = true;
    console.log('[Context Caching] ⚡ 서버에서 캐시 생성 시도...');
    
    const cacheId = await createCacheOnServer(apiKey);
    
    if (cacheId) {
      activeCacheName = cacheId;
      
      // 캐시된 컨텐츠를 사용하여 모델 생성
      const model = genAI.getGenerativeModel({
        model: GEMINI_MODEL,
        cachedContent: activeCacheName,
      });
      
      modelCache.set(apiKey, model);
      console.log('[Context Caching] ✅ Context Caching 활성화: System Instruction 토큰 비용 0원');
      return model;
    } else {
      console.warn('[Context Caching] ⚠️ 서버 캐시 생성 실패: 기존 방식 사용');
    }
  }
  
  // [Fallback] 캐시 생성 실패 시 기존 방식 사용
  if (modelCache.has(apiKey)) {
    return modelCache.get(apiKey)!;
  }

  const model = genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    systemInstruction: KBO_SYSTEM_LOGIC,
  });
  
  modelCache.set(apiKey, model);
  return model;
}
```

### 3단계: 의존성 추가

#### `package.json` 수정

```json
{
  "dependencies": {
    "@google/generative-ai": "^0.21.0",
    "@vercel/node": "^3.0.0"  // [신규] Vercel Serverless Functions 지원
  },
  "devDependencies": {
    "@types/node": "^20.0.0"  // [신규] Node.js 타입 정의
  }
}
```

### 4단계: System Logic 파일 공유

#### 옵션 1: 환경 변수 사용 (권장)

```typescript
// api/cache/create.ts
const KBO_SYSTEM_LOGIC = process.env.KBO_SYSTEM_LOGIC || '';
```

```bash
# .env.local (로컬 개발)
KBO_SYSTEM_LOGIC="..."

# Vercel 환경 변수 설정
# Vercel Dashboard → Settings → Environment Variables
```

#### 옵션 2: 공통 파일 생성

```typescript
// shared/prompts/systemLogic.ts
export const KBO_SYSTEM_LOGIC = `...`;

// api/cache/create.ts
import { KBO_SYSTEM_LOGIC } from '../../shared/prompts/systemLogic';

// src/lib/gemini.ts
import { KBO_SYSTEM_LOGIC } from '../constants/prompts/SystemLogic';
```

---

## 🔒 보안 고려사항

### API 키 관리

**현재 방식 (사용자 입력):**
- ✅ API 키는 사용자가 직접 입력
- ✅ 서버에 저장되지 않음
- ✅ 각 사용자가 자신의 키 사용

**서버 사이드 구현 시:**
- ⚠️ API 키를 서버로 전송해야 함
- ✅ HTTPS로 암호화 전송
- ✅ 서버에서 API 키를 저장하지 않음 (요청마다 받아서 사용)

### 개선 방안

```typescript
// API 키를 암호화하여 전송 (선택적)
const encryptedApiKey = encrypt(apiKey); // 클라이언트 사이드 암호화
const response = await fetch('/api/cache/create', {
  body: JSON.stringify({ apiKey: encryptedApiKey }),
});
```

---

## 📊 예상 효과

### 토큰 사용량 비교

| 항목 | 현재 | Context Caching 적용 후 |
|------|------|------------------------|
| System Logic | 50,000 토큰 | **0 토큰** (캐시 사용) |
| 히스토리 | 30,000 토큰 | 30,000 토큰 |
| 사용자 입력 | 1,000 토큰 | 1,000 토큰 |
| **총합** | **81,000 토큰** | **31,000 토큰** |
| **절감률** | - | **62% 절감** |

### 비용 절감

- **현재**: 81,000 토큰 × $0.075/1M = **$0.006/요청**
- **적용 후**: 31,000 토큰 × $0.075/1M = **$0.002/요청**
- **절감**: **67% 비용 절감**

---

## ✅ 구현 체크리스트

- [ ] `api/cache/create.ts` 파일 생성
- [ ] `@vercel/node` 패키지 설치
- [ ] `src/lib/gemini.ts` 수정 (서버 캐시 생성 함수 추가)
- [ ] System Logic 파일 공유 방법 결정
- [ ] 로컬 테스트 (`vercel dev`)
- [ ] Vercel 배포 및 테스트
- [ ] 모니터링 대시보드에서 토큰 사용량 확인

---

## 🚀 배포 방법

### 로컬 테스트

```bash
# Vercel CLI 설치
npm i -g vercel

# 로컬에서 서버 실행
vercel dev
```

### 프로덕션 배포

```bash
# Vercel에 배포 (자동)
git push origin main
# Vercel이 자동으로 배포함
```

---

## ⚠️ 주의사항

1. **Vercel Serverless Functions 제한**
   - 실행 시간: 최대 60초 (Hobby), 300초 (Pro)
   - 메모리: 1GB (Hobby), 3GB (Pro)
   - 캐시 생성은 빠르므로 문제 없음

2. **Cold Start**
   - 첫 요청 시 약 1-2초 지연 가능
   - 이후 요청은 빠름

3. **캐시 만료**
   - TTL: 1시간 (설정 가능)
   - 만료 시 자동으로 새 캐시 생성

---

## 📝 대안: 더 간단한 방법

서버 구축이 부담스럽다면:

1. **System Logic 경량 버전 생성** (즉시 적용 가능)
   - 핵심 규칙만 추출 (50,000 → 5,000 토큰)
   - 약 80% 토큰 절감

2. **하이브리드 방식**
   - 첫 요청: 전체 System Logic 전송
   - 이후: 경량 버전만 전송

---

## 🎯 결론

**서버 사이드 Context Caching은 구현 가능합니다!**

Vercel의 Serverless Functions를 활용하면:
- ✅ 추가 서버 구축 불필요
- ✅ 무료 플랜에서도 사용 가능
- ✅ 약 62% 토큰 절감 예상
- ✅ 구현 난이도: 중간

**구현을 진행할까요?**
