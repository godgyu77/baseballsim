# Context Caching 500 에러 해결 가이드

**에러**: `/api/cache/create` 500 Internal Server Error  
**원인**: Vercel Serverless Functions에서 `src/` 폴더 import 실패

---

## 🔍 문제 원인

Vercel Serverless Functions는 빌드 시 `api/` 폴더만 번들링합니다. `src/` 폴더의 파일을 import하면 런타임에 찾을 수 없어 에러가 발생합니다.

**에러 발생 코드**:
```typescript
// ❌ 작동하지 않음
import { KBO_SYSTEM_LOGIC } from '../../src/constants/prompts/SystemLogic';
```

---

## ✅ 해결 방법

### 방법 1: System Logic을 `api/` 폴더로 복사 (권장)

1. **System Logic 파일 복사**:
   ```bash
   cp src/constants/prompts/SystemLogic.ts api/SystemLogic.ts
   ```

2. **import 경로 수정**:
   ```typescript
   // ✅ 작동함
   import { KBO_SYSTEM_LOGIC } from '../SystemLogic';
   ```

### 방법 2: 공통 폴더 생성

1. **공통 폴더 생성**:
   ```
   프로젝트 루트/
   ├── shared/
   │   └── prompts/
   │       └── SystemLogic.ts
   ├── api/
   │   └── cache/
   │       └── create.ts
   └── src/
       └── constants/
           └── prompts/
               └── SystemLogic.ts (symlink 또는 복사)
   ```

2. **양쪽에서 import**:
   ```typescript
   // api/cache/create.ts
   import { KBO_SYSTEM_LOGIC } from '../../shared/prompts/SystemLogic';
   
   // src/lib/gemini.ts
   import { KBO_SYSTEM_LOGIC } from '../constants/prompts/SystemLogic';
   ```

### 방법 3: 환경 변수 사용 (대용량 데이터)

1. **Vercel 환경 변수 설정**:
   - Vercel Dashboard → Settings → Environment Variables
   - `KBO_SYSTEM_LOGIC` 추가 (값: System Logic 전체 텍스트)

2. **API Route에서 읽기**:
   ```typescript
   const KBO_SYSTEM_LOGIC = process.env.KBO_SYSTEM_LOGIC || '';
   ```

**주의**: 환경 변수 크기 제한 (일부 플랫폼은 4KB 제한)

---

## 🔧 적용된 수정 사항

### 1. System Logic 파일 복사
- `src/constants/prompts/SystemLogic.ts` → `api/SystemLogic.ts`

### 2. Import 경로 수정
```typescript
// 수정 전
import { KBO_SYSTEM_LOGIC } from '../../src/constants/prompts/SystemLogic';

// 수정 후
import { KBO_SYSTEM_LOGIC } from '../SystemLogic';
```

### 3. 에러 처리 개선
- System Logic 로드 실패 시 명확한 에러 메시지
- 상세한 에러 로깅 추가

---

## 📝 배포 후 확인

1. **Git 푸시**:
   ```bash
   git add .
   git commit -m "Fix: Move SystemLogic to api folder for Vercel compatibility"
   git push origin main
   ```

2. **Vercel 로그 확인**:
   - Vercel Dashboard → 프로젝트 → Functions 탭
   - `/api/cache/create` 함수 로그 확인

3. **브라우저 콘솔 확인**:
   - 개발자 도구 → Network 탭
   - `/api/cache/create` 요청 확인
   - 응답 상태 코드 확인 (200이어야 함)

---

## 🐛 추가 문제 해결

### 문제: 여전히 500 에러

**확인 사항**:
1. `api/SystemLogic.ts` 파일이 존재하는가?
2. Vercel 빌드 로그에서 import 에러가 있는가?
3. System Logic 파일 크기가 너무 큰가? (Vercel 제한 확인)

**해결**:
- Vercel Functions 탭에서 실제 에러 메시지 확인
- 필요시 환경 변수 방식으로 전환

### 문제: 캐시 생성은 되지만 SDK 에러

**확인 사항**:
- `@google/generative-ai` SDK 버전
- Gemini API의 `cachedContents` 지원 여부

**해결**:
- SDK 최신 버전으로 업데이트
- API 문서에서 정확한 메서드 확인

---

## ✅ 예상 결과

수정 후:
- ✅ `/api/cache/create` 200 OK 응답
- ✅ 콘솔: `[Context Caching] ✅ 서버에서 캐시 생성 성공`
- ✅ Context Caching 정상 작동
- ✅ 토큰 사용량 감소

---

## 📚 참고 자료

- [Vercel Serverless Functions 문서](https://vercel.com/docs/functions)
- [Vercel 빌드 설정](https://vercel.com/docs/build-step)
- [Google Gemini API 문서](https://ai.google.dev/docs)
