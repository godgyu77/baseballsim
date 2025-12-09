# Context Caching 500 에러 빠른 해결

## 🔧 즉시 해결 방법

### 1단계: System Logic 파일 수동 복사

**Windows (PowerShell)**:
```powershell
Copy-Item "src\constants\prompts\SystemLogic.ts" "api\SystemLogic.ts"
```

**Mac/Linux**:
```bash
cp src/constants/prompts/SystemLogic.ts api/SystemLogic.ts
```

### 2단계: Git에 추가 및 푸시

```bash
git add api/SystemLogic.ts
git commit -m "Fix: Add SystemLogic to api folder for Vercel"
git push origin main
```

### 3단계: 배포 확인

Vercel이 자동으로 재배포합니다. 배포 완료 후 테스트하세요.

---

## ✅ 확인 사항

1. `api/SystemLogic.ts` 파일이 존재하는가?
2. `api/cache/create.ts`에서 `import { KBO_SYSTEM_LOGIC } from '../SystemLogic';`로 import하는가?
3. Vercel 빌드 로그에 에러가 없는가?

---

## 🎯 예상 결과

수정 후:
- ✅ `/api/cache/create` 200 OK
- ✅ 콘솔: `[Context Caching] ✅ 서버에서 캐시 생성 성공`
- ✅ Context Caching 정상 작동
