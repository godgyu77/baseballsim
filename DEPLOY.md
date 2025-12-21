# 야구 매니지먼트 게임 배포 가이드

이 게임을 다른 사람들이 PC나 모바일에서 플레이할 수 있도록 배포하는 방법입니다.

## 🚀 빠른 배포 (추천: Vercel)

### 1단계: GitHub에 코드 업로드

1. GitHub에 새 저장소 생성
2. 로컬에서 다음 명령어 실행:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/사용자명/저장소명.git
git push -u origin main
```

### 2단계: Vercel에 배포

1. [Vercel](https://vercel.com)에 가입/로그인
2. "New Project" 클릭
3. GitHub 저장소 선택
4. 설정:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. "Deploy" 클릭
6. 배포 완료 후 URL 받기 (예: `https://your-game.vercel.app`)

### 3단계: 환경 변수 설정 (필수: Supabase / 선택: Seed)

Vercel 대시보드 → Settings → Environment Variables 에 아래를 등록하세요:

- **(필수) Supabase**
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
  - (프론트 빌드용) `VITE_SUPABASE_URL`
  - (프론트 빌드용) `VITE_SUPABASE_ANON_KEY`

- **(선택) DB 시딩/검증 스크립트용**
  - `SUPABASE_SERVICE_ROLE_KEY` (절대 브라우저에 노출 금지)

## 📱 모바일 최적화 확인

현재 게임은 이미 모바일 반응형으로 설계되어 있습니다:
- ✅ Viewport 메타 태그 설정됨
- ✅ Tailwind CSS 반응형 클래스 사용
- ✅ 터치 친화적 UI

## 🌐 다른 배포 옵션

### Netlify

1. [Netlify](https://www.netlify.com) 가입
2. "Add new site" → "Import an existing project"
3. GitHub 저장소 연결
4. 빌드 설정:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. "Deploy site" 클릭

### GitHub Pages

1. `package.json`에 배포 스크립트 추가:
```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

2. `gh-pages` 설치:
```bash
npm install --save-dev gh-pages
```

3. 배포:
```bash
npm run deploy
```

4. GitHub 저장소 → Settings → Pages에서 배포 확인

## 🔒 보안 주의사항

⚠️ **중요**: 브라우저에서 Google Generative Language API를 직접 호출하지 않습니다. (API 키 노출 금지)
- 사용자는 브라우저 UI에서 Gemini API 키를 입력합니다.
- 키는 **서버(또는 Edge Function) `/api/chat`** 로 전송되어 서버에서만 Gemini 호출에 사용됩니다.
- 프론트는 서버가 내려주는 **AI SDK v5 UI Message Stream** 을 받아 스트리밍 렌더링합니다.

## 📝 배포 후 확인사항

- [ ] PC 브라우저에서 접속 테스트
- [ ] 모바일 브라우저에서 접속 테스트
- [ ] API 키 입력 모달이 정상 작동하는지 확인
- [ ] 게임 저장/불러오기 기능 테스트
- [ ] 반응형 레이아웃 확인

## 🐛 문제 해결

### 빌드 오류
```bash
npm install
npm run build
```

### 배포 후 404 오류
- Vercel/Netlify에서 SPA 라우팅 설정 확인
- `vercel.json` 또는 `netlify.toml`에 리다이렉트 규칙 추가

### 모바일에서 레이아웃 깨짐
- 브라우저 개발자 도구에서 모바일 뷰 확인
- Tailwind 반응형 클래스 확인

## 📞 지원

문제가 발생하면 GitHub Issues에 문의하세요.

