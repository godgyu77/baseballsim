# Vercel CLI SSL 인증서 에러 해결 가이드

**에러 메시지**:
```
Error: request to https://vercel.com/.well-known/openid-configuration failed, reason: self-signed certificate in certificate chain
Error: Failed to get package info: Error: self-signed certificate in certificate chain
```

---

## 🔍 원인 분석

이 에러는 **SSL 인증서 검증 실패**로 발생합니다. 주로 다음과 같은 환경에서 발생:

1. **회사/기관 네트워크**: 프록시나 방화벽이 자체 인증서를 사용
2. **보안 소프트웨어**: 바이러스 백신이나 보안 프로그램이 SSL 가로채기
3. **프록시 서버**: 중간자 프록시가 자체 인증서로 교체

---

## ✅ 해결 방법

### 방법 1: 환경 변수로 SSL 검증 비활성화 (임시 해결책)

⚠️ **보안 경고**: 이 방법은 SSL 검증을 비활성화하므로 보안상 권장하지 않습니다. 개발 환경에서만 사용하세요.

#### Windows (PowerShell)
```powershell
$env:NODE_TLS_REJECT_UNAUTHORIZED = "0"
vercel login
```

#### Windows (CMD)
```cmd
set NODE_TLS_REJECT_UNAUTHORIZED=0
vercel login
```

#### Linux/Mac
```bash
export NODE_TLS_REJECT_UNAUTHORIZED=0
vercel login
```

**주의**: 이 설정은 현재 터미널 세션에만 적용됩니다. 터미널을 닫으면 초기화됩니다.

---

### 방법 2: 프록시 설정 (회사 네트워크인 경우)

회사 네트워크를 사용하는 경우, 프록시 설정이 필요할 수 있습니다:

```bash
# HTTP 프록시 설정
set HTTP_PROXY=http://proxy.company.com:8080
set HTTPS_PROXY=http://proxy.company.com:8080

# 또는 npm 설정
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
```

---

### 방법 3: Vercel CLI 대신 웹 인터페이스 사용

로컬 테스트가 필수가 아니라면, **Vercel 웹 대시보드**를 통해 배포할 수 있습니다:

1. GitHub에 코드 푸시
2. [Vercel Dashboard](https://vercel.com) 접속
3. "New Project" 클릭
4. GitHub 저장소 연결
5. 자동 배포 완료

이 방법은 SSL 인증서 문제를 완전히 우회합니다.

---

### 방법 4: 회사 IT 부서에 문의

회사 네트워크를 사용하는 경우:
1. IT 부서에 Vercel CLI SSL 인증서 문제 보고
2. 프록시 인증서를 시스템에 추가 요청
3. 또는 Vercel 도메인을 화이트리스트에 추가 요청

---

## 🎯 Context Caching 구현과의 관계

**중요**: 이 SSL 에러는 **Context Caching 구현과는 무관**합니다.

- **로컬 테스트 (`vercel dev`)**: 선택사항 (웹 대시보드로 배포 가능)
- **프로덕션 배포**: Git 푸시만으로 자동 배포됨 (CLI 불필요)

### 권장 워크플로우

1. **로컬 개발**: `npm run dev` (Vercel CLI 불필요)
2. **배포**: Git 푸시 → Vercel 자동 배포 (CLI 불필요)
3. **로컬 API 테스트**: 필요시만 `vercel dev` (SSL 문제 해결 후)

---

## 📝 빠른 해결책 (권장)

**가장 간단한 방법**: Vercel CLI 없이 배포

```bash
# 1. 코드 커밋
git add .
git commit -m "Add server-side Context Caching"

# 2. GitHub에 푸시
git push origin main

# 3. Vercel 웹 대시보드에서 자동 배포 확인
# (CLI 로그인 불필요)
```

이 방법은 SSL 인증서 문제를 완전히 우회하며, Context Caching 기능은 정상 작동합니다.

---

## 🔧 추가 확인 사항

### Vercel CLI가 필수인가?

**답**: 아니요. Context Caching 구현은 다음으로 작동합니다:

1. ✅ **프로덕션 배포**: Git 푸시만으로 자동 배포
2. ✅ **API Route**: `api/cache/create.ts` 자동 인식
3. ✅ **프론트엔드**: `/api/cache/create` 엔드포인트 자동 사용

**로컬 테스트가 필요한 경우에만** `vercel dev`가 필요하며, 이는 선택사항입니다.

---

## ✅ 결론

1. **즉시 해결**: Git 푸시로 배포 (CLI 불필요)
2. **로컬 테스트 필요 시**: 방법 1 사용 (임시 SSL 검증 비활성화)
3. **장기 해결**: IT 부서에 프록시 인증서 추가 요청

**Context Caching 기능은 CLI 없이도 정상 작동합니다!** 🎉
