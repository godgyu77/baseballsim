# 야구 매니지먼트 게임

텍스트 기반의 야구 매니지먼트 시뮬레이션 게임입니다.

## 기술 스택

- React 18
- TypeScript
- Tailwind CSS
- Lucide React
- Google Gemini API (@google/generative-ai)

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

## 주요 기능

- 카카오톡 스타일의 채팅 인터페이스
- Google Gemini API를 활용한 AI 게임마스터
- 실시간 스트리밍 응답
- 모바일 친화적인 디자인
- API 키 로컬 스토리지 저장

## 설정

1. 게임 시작 시 Gemini API 키를 입력해야 합니다.
2. API 키는 브라우저 로컬 스토리지에 저장됩니다.
3. 시스템 프롬프트는 `src/constants/prompts/SystemLogic.ts`의 `KBO_SYSTEM_LOGIC`에 설정되어 있습니다.
4. 게임 설정(난이도별 자금, 샐러리캡 등)은 `src/constants/GameConfig.ts`에서 관리됩니다.

## 📚 문서

프로젝트의 모든 문서는 **[docs/](./docs/)** 폴더에 정리되어 있습니다:

- 📝 **[패치 노트](./docs/patches/)** - 버전별 업데이트 내용
- 📊 **[보고서](./docs/reports/)** - 최적화, 성능, 기능 상태 보고서
- 🔍 **[진단 리포트](./docs/analysis/)** - 구조 분석, 버전 비교
- 🎯 **[구현 전략](./docs/strategies/)** - 설계 및 기술 문서
- 🏗️ **[프로젝트 구조](./docs/structure/)** - 구조 및 아키텍처 문서

## 배포하기

다른 사람들이 PC나 모바일에서 플레이할 수 있도록 배포하는 방법은 **[DEPLOY.md](./DEPLOY.md)** 파일을 참고하세요.

### 빠른 배포 (Vercel 추천)

1. GitHub에 코드 업로드
2. [Vercel](https://vercel.com)에 가입
3. GitHub 저장소 연결
4. 자동 배포 완료!

### 모바일 지원

- ✅ 반응형 디자인 (모바일/태블릿/PC 모두 지원)
- ✅ 터치 친화적 UI
- ✅ 모바일 브라우저 최적화

