# ES Module Import 확장자 문제 해결

**에러 메시지**:
```
Cannot find module '/var/task/api/SystemLogic' 
imported from /var/task/api/cache/create.js
```

**원인**: Vercel Serverless Functions는 ES modules를 사용하며, import 시 `.js` 확장자를 명시해야 함

---

## ✅ 해결 방법

### 수정 내용

**수정 전**:
```typescript
import { KBO_SYSTEM_LOGIC } from '../SystemLogic';
```

**수정 후**:
```typescript
import { KBO_SYSTEM_LOGIC } from '../SystemLogic.js';
```

### 이유

1. **ES Modules 규칙**: ES modules에서는 상대 경로 import 시 확장자를 명시해야 함
2. **TypeScript vs JavaScript**: 
   - TypeScript에서는 `.ts` 파일로 작성
   - 하지만 런타임에는 `.js`로 컴파일됨
   - 따라서 import 경로에 `.js` 확장자를 사용해야 함

---

## 🔧 적용된 수정

`api/cache/create.ts` 파일이 수정되었습니다:

```typescript
import { KBO_SYSTEM_LOGIC } from '../SystemLogic.js';
```

---

## 📝 다음 단계

1. **Git에 추가 및 커밋**:
   ```bash
   git add api/cache/create.ts
   git commit -m "Fix: Add .js extension to SystemLogic import for ES modules"
   git push origin main
   ```

2. **Vercel 재배포 대기** (약 1-2분)

3. **테스트**: 게임 시작 후 Context Caching 작동 확인

---

## ✅ 예상 결과

수정 후:
- ✅ `/api/cache/create` 200 OK
- ✅ `[Context Caching] ✅ 서버에서 캐시 생성 성공`
- ✅ Context Caching 정상 작동

---

## 📚 참고

- [ES Modules 명세](https://nodejs.org/api/esm.html#esm_import_specifiers)
- [Vercel Serverless Functions 문서](https://vercel.com/docs/functions)
