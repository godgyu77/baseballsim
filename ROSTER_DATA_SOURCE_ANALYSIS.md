# 로스터 데이터 출처 분석 리포트

## 📍 현재 로스터 데이터를 가져오는 모든 경로

### ✅ InitialData.ts에서만 가져오는 경로 (올바름)

1. **`src/lib/dataIntegrity.ts` → `getRosterFromInitialDataOnly()`**
   - **위치**: 모든 `setCurrentRoster()` 호출 전
   - **출처**: `InitialData.ts`의 `ROSTER_DATA`에서 직접 로드
   - **호출 위치**:
     - `ChatInterface.tsx:649` - AI 응답 파싱 후
     - `ChatInterface.tsx:590` - 초기 로스터 로드
     - `ChatInterface.tsx:1103` - 저장된 데이터 복원
     - `ChatInterface.tsx:2125` - 게임 데이터 로드
     - `ChatInterface.tsx:2252` - 데이터 복원
     - `ChatInterface.tsx:2470` - 구버전 데이터 복원

2. **`src/lib/rosterFetcher.ts` → `fetchFullRosterSequentially()`**
   - **위치**: 순차적 로스터 요청 시
   - **출처**: `getRosterFromInitialDataOnly()` 호출 → `InitialData.ts`
   - **상태**: ✅ AI 응답 무시, InitialData.ts만 사용

3. **`src/lib/rosterFetcher.ts` → `fetchPitcherRoster()`**
   - **위치**: 투수 로스터 요청 시
   - **출처**: `getRosterFromInitialDataOnly()` 호출 → `InitialData.ts`
   - **상태**: ✅ AI 응답 무시, InitialData.ts만 사용

4. **`src/lib/rosterFetcher.ts` → `fetchBatterRoster()`**
   - **위치**: 타자 로스터 요청 시
   - **출처**: `getRosterFromInitialDataOnly()` 호출 → `InitialData.ts`
   - **상태**: ✅ AI 응답 무시, InitialData.ts만 사용

### ❌ AI 응답에서 파싱하는 경로 (비활성화됨)

1. **`src/lib/utils.ts` → `parseAIResponse()`**
   - **위치**: AI 응답 파싱 시
   - **상태**: ✅ `parsed.roster`는 항상 `undefined`로 설정됨
   - **코드**: AI 응답의 `[ROSTER]` 태그는 파싱하지 않음

2. **`src/lib/rosterFetcher.ts` → `parseRosterFromResponse()`**
   - **위치**: AI 응답에서 로스터 파싱 시
   - **상태**: ✅ 빈 배열 반환 (사용 안 함)

## 🔍 디버깅 로그 추가 위치

다음 위치에서 상세한 로그가 출력됩니다:

1. **`getRosterFromInitialDataOnly()` 호출 시**:
   - 팀 이름 검색어
   - 정규화된 검색어 목록
   - InitialData.ts의 팀 목록
   - 매칭 성공/실패 여부
   - 로드된 선수 목록 (처음 10명)
   - 특정 선수 확인 (최원태, 이정후, 김민석, 강백호, 고우석, 김혜성)

2. **`setCurrentRoster()` 호출 시**:
   - 호출 위치 (파일명:라인번호)
   - `selectedTeam.fullName` 값
   - 로드된 로스터 선수 수

## 🚨 문제 발생 시 확인 사항

1. **콘솔 로그 확인**:
   - `[Data Integrity] 🔍` 로그로 팀 이름 매칭 과정 확인
   - `[ChatInterface] 📍` 로그로 로스터 로드 위치 확인
   - `[Data Integrity] ✅` 로그로 로드된 선수 목록 확인

2. **팀 이름 불일치 확인**:
   - InitialData.ts의 팀 이름 형식: 영문명 (예: "KT Wiz", "Hanwha Eagles")
   - UI의 팀 이름 형식: 한글명 (예: "KT 위즈", "한화 이글스")
   - `TEAM_NAME_MAP`을 통해 자동 매칭됨

3. **선수 데이터 확인**:
   - `[Data Integrity] 📋 로드된 선수 목록` 로그에서 실제 로드된 선수 확인
   - 특정 선수(최원태, 이정후, 김민석 등)의 존재 여부 확인

## ✅ 보장 사항

1. **AI 응답의 로스터는 절대 사용하지 않음**
2. **저장된 로스터는 무시하고 InitialData.ts에서만 가져옴**
3. **모든 로스터 데이터는 InitialData.ts의 `ROSTER_DATA`에서만 로드됨**

## 📝 다음 단계

게임 실행 시 콘솔 로그를 확인하여:
1. 어떤 경로로 로스터가 로드되는지 확인
2. 팀 이름 매칭이 성공하는지 확인
3. 실제 로드된 선수 목록 확인
4. 이상한 선수가 어디서 오는지 추적

