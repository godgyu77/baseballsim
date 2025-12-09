# Vercel 500 에러 진단 가이드

**현재 상태**: `api/SystemLogic.ts` 파일 존재, import 경로 올바름, 하지만 여전히 500 에러

---

## 🔍 1단계: Vercel 로그 확인

### 방법 1: Vercel Dashboard

1. [Vercel Dashboard](https://vercel.com) 접속
2. 프로젝트 선택
3. **Functions** 탭 클릭
4. `/api/cache/create` 함수 선택
5. **Logs** 탭에서 실제 에러 메시지 확인

### 방법 2: Vercel CLI (가능한 경우)

```bash
vercel logs --follow
```

---

## 🔍 2단계: 가능한 원인 확인

### 원인 1: System Logic 파일이 Git에 추가되지 않음

**확인**:
```bash
git status
git ls-files api/SystemLogic.ts
```

**해결**:
```bash
git add api/SystemLogic.ts
git commit -m "Add SystemLogic to api folder"
git push origin main
```

### 원인 2: Vercel 빌드 시 파일 크기 제한

System Logic 파일이 매우 크므로 (약 3,700줄), Vercel의 함수 크기 제한에 걸릴 수 있습니다.

**확인**: Vercel Functions 탭에서 함수 크기 확인

**해결**: 환경 변수 방식으로 전환 (아래 참고)

### 원인 3: SDK API 문제

`@google/generative-ai` SDK의 `cachedContents` API가 실제로 지원되지 않을 수 있습니다.

**확인**: Vercel 로그에서 실제 에러 메시지 확인

**해결**: SDK 문서 확인 또는 다른 방법 사용

---

## ✅ 3단계: 즉시 해결 방법

### 방법 A: Git 상태 확인 및 푸시

```bash
# 1. 파일이 Git에 추가되었는지 확인
git status

# 2. 추가되지 않았다면 추가
git add api/SystemLogic.ts

# 3. 커밋 및 푸시
git commit -m "Fix: Add SystemLogic for Context Caching"
git push origin main

# 4. Vercel 자동 재배포 대기 (약 1-2분)
```

### 방법 B: Vercel Functions 로그 확인

1. Vercel Dashboard → 프로젝트 → Functions
2. `/api/cache/create` 클릭
3. **Logs** 탭에서 실제 에러 메시지 확인
4. 에러 메시지를 기반으로 추가 수정

### 방법 C: 임시로 Context Caching 비활성화

Context Caching이 작동하지 않아도 게임은 정상 작동합니다 (단, 토큰 사용량이 높음).

**임시 해결**: `src/lib/gemini.ts`에서 서버 캐시 생성 시도를 주석 처리

```typescript
// 임시로 주석 처리
// const cacheName = await createCacheOnServer(apiKey);
```

---

## 🔧 4단계: 대안 해결 방법

### 대안 1: 환경 변수 방식 (파일 크기 문제 해결)

System Logic을 Vercel 환경 변수로 설정:

1. **System Logic 텍스트 추출**:
   ```bash
   # System Logic 내용을 파일로 저장
   node -e "const fs = require('fs'); const content = fs.readFileSync('src/constants/prompts/SystemLogic.ts', 'utf8'); const match = content.match(/export const KBO_SYSTEM_LOGIC = \`([\s\S]*)\`;/); if (match) fs.writeFileSync('system-logic.txt', match[1]);"
   ```

2. **Vercel 환경 변수 설정**:
   - Vercel Dashboard → Settings → Environment Variables
   - `KBO_SYSTEM_LOGIC` 추가 (값: `system-logic.txt` 내용)

3. **API Route 수정**:
   ```typescript
   const KBO_SYSTEM_LOGIC = process.env.KBO_SYSTEM_LOGIC || '';
   ```

**주의**: 환경 변수 크기 제한 확인 (일부 플랫폼은 4KB 제한)

### 대안 2: System Logic 경량 버전 생성

핵심 규칙만 추출하여 작은 버전 생성 (약 5,000자 → 50,000자)

---

## 📊 현재 상태 확인

### ✅ 완료된 사항

- [x] `api/SystemLogic.ts` 파일 생성됨
- [x] `api/cache/create.ts` import 경로 수정됨
- [x] 에러 처리 개선됨

### ⚠️ 확인 필요

- [ ] `api/SystemLogic.ts`가 Git에 추가되었는가?
- [ ] Vercel에 배포되었는가?
- [ ] Vercel Functions 로그의 실제 에러 메시지는?

---

## 🎯 다음 단계

1. **즉시**: Vercel Dashboard에서 Functions 로그 확인
2. **확인**: Git에 `api/SystemLogic.ts` 추가 및 푸시 여부 확인
3. **대안**: 로그 확인 후 필요시 환경 변수 방식으로 전환

---

## 📝 참고

- Context Caching이 작동하지 않아도 게임은 정상 작동합니다
- 단, 토큰 사용량이 높아질 수 있습니다 (System Logic 매번 전송)
- 로그 확인 후 정확한 원인 파악 가능
