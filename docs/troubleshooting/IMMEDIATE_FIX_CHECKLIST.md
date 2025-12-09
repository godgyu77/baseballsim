# Context Caching 500 에러 즉시 확인 체크리스트

## ✅ 1단계: 로컬 파일 확인

```bash
# 파일 존재 확인
ls api/SystemLogic.ts

# 파일 내용 확인 (첫 줄)
head -n 1 api/SystemLogic.ts
```

**예상 결과**: `// System Logic Prompts` 또는 `export const KBO_SYSTEM_LOGIC`

---

## ✅ 2단계: Git 상태 확인

```bash
# Git에 추가되었는지 확인
git status api/SystemLogic.ts

# Git에 추가되지 않았다면
git add api/SystemLogic.ts
git commit -m "Add SystemLogic to api folder for Context Caching"
git push origin main
```

**중요**: 파일이 Git에 추가되지 않으면 Vercel에 배포되지 않습니다!

---

## ✅ 3단계: Vercel 배포 확인

1. [Vercel Dashboard](https://vercel.com) 접속
2. 프로젝트 선택
3. **Deployments** 탭 확인
4. 최신 배포가 완료되었는지 확인
5. 배포 로그에서 에러 확인

---

## ✅ 4단계: Vercel Functions 로그 확인

1. Vercel Dashboard → 프로젝트
2. **Functions** 탭 클릭
3. `/api/cache/create` 함수 선택
4. **Logs** 탭에서 실제 에러 메시지 확인

**확인할 내용**:
- `System Logic이 로드되지 않았습니다` 메시지?
- `Failed to create cache` 메시지?
- 실제 스택 트레이스?

---

## ✅ 5단계: 브라우저에서 상세 에러 확인

개발자 도구 → Network 탭:
1. `/api/cache/create` 요청 클릭
2. **Response** 탭에서 실제 에러 메시지 확인

**개선된 에러 응답** (방금 추가됨):
```json
{
  "error": "Failed to create cache",
  "message": "...",
  "systemLogicLoaded": true/false,
  "systemLogicLength": 12345,
  "hint": "..."
}
```

이 정보로 정확한 원인 파악 가능!

---

## 🔧 빠른 해결 방법

### 방법 1: Git 푸시 확인

```bash
# 1. 파일 추가 확인
git add api/SystemLogic.ts

# 2. 커밋
git commit -m "Fix: Add SystemLogic for Context Caching"

# 3. 푸시
git push origin main

# 4. Vercel 자동 재배포 대기 (1-2분)
```

### 방법 2: Vercel Functions 로그 확인

Vercel Dashboard에서 실제 에러 메시지를 확인하면 정확한 원인을 알 수 있습니다.

---

## 📊 현재 상태

- ✅ `api/SystemLogic.ts` 파일 존재
- ✅ `api/cache/create.ts` import 경로 올바름
- ✅ 에러 처리 개선됨
- ⚠️ **확인 필요**: Git에 추가 및 Vercel 배포 여부

---

## 🎯 다음 행동

1. **즉시**: `git status`로 파일이 Git에 추가되었는지 확인
2. **확인**: Vercel Functions 로그에서 실제 에러 메시지 확인
3. **해결**: 로그 기반으로 추가 수정
