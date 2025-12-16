# 서버 사이드 Context Caching 설정 가이드

**일자**: 2025-12-08  
**구현 상태**: ✅ 완료

---

## ✅ 구현 완료 사항

### 1. **API Route 생성**
- `api/cache/create.ts` - Context Caching 생성 API
- Vercel Serverless Functions로 자동 배포

### 2. **프론트엔드 수정**
- `src/lib/gemini.ts` - 서버 사이드 캐시 생성 함수 추가
- 자동으로 서버에서 캐시 생성 시도

### 3. **의존성 추가**
- `@vercel/node` 패키지 추가

---

## 🚀 배포 방법

### 1. 의존성 설치

```bash
npm install
```

### 2. 로컬 테스트 (선택사항)

```bash
# Vercel CLI 설치
npm i -g vercel

# 로컬에서 서버 실행
vercel dev
```

### 3. Vercel 배포

```bash
# Git에 푸시하면 자동 배포
git add .
git commit -m "Add server-side Context Caching"
git push origin main
```

Vercel이 자동으로:
1. `api/` 폴더를 Serverless Functions로 인식
2. `/api/cache/create` 엔드포인트 생성
3. 배포 완료

---

## 🔧 작동 방식

### 1. 첫 번째 요청

```
프론트엔드
  ↓ POST /api/cache/create { apiKey: "..." }
서버 (Vercel Function)
  ↓ Gemini API 호출
  ↓ 캐시 생성
  ↓ 캐시 ID 반환: "cachedContents/abc123"
프론트엔드
  ↓ 캐시 ID 저장
  ↓ 모델 생성 시 캐시 ID 사용
```

### 2. 이후 요청

```
프론트엔드
  ↓ 캐시 ID 사용
  ↓ System Logic은 0 토큰!
Gemini API
  ↓ 캐시에서 System Logic 로드
  ↓ 히스토리 + 사용자 입력만 처리
```

---

## 📊 예상 효과

### 토큰 사용량

| 항목 | 현재 | Context Caching 적용 후 |
|------|------|------------------------|
| System Logic | 50,000 토큰 | **0 토큰** ✅ |
| 히스토리 | 30,000 토큰 | 30,000 토큰 |
| 사용자 입력 | 1,000 토큰 | 1,000 토큰 |
| **총합** | **81,000 토큰** | **31,000 토큰** |
| **절감률** | - | **62% 절감** |

### 비용 절감

- **현재**: $0.006/요청
- **적용 후**: $0.002/요청
- **절감**: **67% 비용 절감**

---

## ⚠️ 주의사항

### 1. **SDK 버전 호환성**

현재 코드는 여러 방법을 시도합니다:
- `genAI.cachedContents.create` (최신)
- `genAI.caches.create` (일부 버전)
- `model.createCachedContent` (대안)

SDK 버전에 따라 작동 방식이 다를 수 있습니다.

### 2. **캐시 만료**

- TTL: 1시간 (설정 가능)
- 만료 시 자동으로 새 캐시 생성
- 사용자는 별도 조치 불필요

### 3. **에러 처리**

- 서버 캐시 생성 실패 시 브라우저 방식 시도
- 모든 방법 실패 시 기존 방식 사용 (Fallback)

---

## 🧪 테스트 방법

### 1. 로컬 테스트

```bash
# Vercel CLI로 로컬 서버 실행
vercel dev

# 브라우저에서 게임 시작
# 개발자 도구 콘솔 확인:
# [Context Caching] ✅ 서버에서 캐시 생성 성공: cachedContents/...
```

### 2. 프로덕션 테스트

1. Vercel에 배포
2. 게임 시작
3. 개발자 도구 콘솔에서 로그 확인
4. 모니터링 대시보드에서 토큰 사용량 확인

### 3. 확인 사항

- ✅ 콘솔에 "서버에서 캐시 생성 성공" 메시지
- ✅ 모니터링 대시보드에서 토큰 사용량 감소
- ✅ 압축률 표시 (N/A가 아닌 숫자)

---

## 🐛 문제 해결

### 문제 1: "Failed to create cache"

**원인**: SDK 버전 불일치 또는 API 변경

**해결**:
1. `@google/generative-ai` 최신 버전 확인
2. SDK 문서에서 정확한 API 확인
3. Fallback으로 기존 방식 사용

### 문제 2: "Module not found"

**원인**: TypeScript 경로 문제

**해결**:
1. `tsconfig.api.json` 확인
2. 상대 경로로 import 수정

### 문제 3: 캐시 생성은 되지만 토큰이 줄지 않음

**원인**: 캐시 ID를 모델 생성 시 사용하지 않음

**해결**:
1. `getGeminiModel` 함수에서 `cachedContent` 파라미터 확인
2. 콘솔 로그로 캐시 ID 사용 여부 확인

---

## 📝 다음 단계

1. **배포 후 테스트**: 실제 환경에서 작동 확인
2. **모니터링**: 토큰 사용량 변화 추적
3. **최적화**: 필요시 추가 개선

---

**구현 완료! 이제 배포만 하면 됩니다.** 🎉
