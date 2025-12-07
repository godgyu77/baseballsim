# 🧪 테스트 및 모니터링 가이드

## 📋 개요

이 문서는 구현된 기능들의 테스트 방법, 모니터링 사용법, 피드백 수집 방법을 안내합니다.

---

## 🧪 테스트

### 1. 히스토리 요약 함수 테스트

**파일**: `src/lib/__tests__/historySummarizer.test.ts`

**실행 방법**:
```bash
# Jest가 설정되어 있다면
npm test historySummarizer

# 또는 수동 테스트
# 브라우저 콘솔에서:
import { compressHistory } from './lib/historySummarizer';
const history = [...]; // 20개 이상의 메시지
const compressed = compressHistory(history, 15);
console.log('압축 전:', history.length, '압축 후:', compressed.length);
```

**확인 사항**:
- [ ] 오래된 대화가 요약되는가?
- [ ] 최근 15개 대화는 유지되는가?
- [ ] STATUS 태그 정보가 추출되는가?
- [ ] AI 페르소나가 유지되는가?

---

### 2. 타자 로스터 렌더링 테스트

**수동 테스트**:
1. 게임을 시작하고 AI에게 "타자 로스터 보여줘" 요청
2. 타자 표가 정상적으로 렌더링되는지 확인
3. 브라우저 개발자 도구에서 콘솔 오류 확인

**확인 사항**:
- [ ] 타자 표가 깨지지 않고 표시되는가?
- [ ] 모든 컬럼이 올바르게 정렬되는가?
- [ ] 모바일에서도 정상 작동하는가?
- [ ] 스크롤이 정상 작동하는가?

**디버깅**:
```javascript
// 브라우저 콘솔에서
const tables = document.querySelectorAll('.batter-table');
console.log('타자 표 개수:', tables.length);
tables.forEach((table, idx) => {
  const rows = table.querySelectorAll('tr');
  console.log(`표 ${idx + 1}: ${rows.length}개 행`);
});
```

---

### 3. 트레이드 NFS 필터링 테스트

**파일**: `src/lib/__tests__/tradeFilter.test.ts`

**수동 테스트**:
1. 게임을 시작하고 AI에게 "트레이드 제안해줘" 요청
2. 모니터링 대시보드에서 NFS 필터링 통계 확인
3. 콘솔에서 NFS 로그 확인

**확인 사항**:
- [ ] 프랜차이즈 스타가 제안에서 제외되는가?
- [ ] 보호선수가 제안에서 제외되는가?
- [ ] NFS 로그가 정상적으로 기록되는가?
- [ ] 필터링 후에도 제안이 정상적으로 생성되는가?

**디버깅**:
```javascript
// 브라우저 콘솔에서
import { filterNFSPlayers } from './lib/tradeFilter';
const suggestions = [...]; // AI가 생성한 제안
const allPlayers = [...]; // 전체 선수 목록
const { filteredSuggestions, nfsLog } = filterNFSPlayers(suggestions, allPlayers);
console.log('필터링 전:', suggestions.length);
console.log('필터링 후:', filteredSuggestions.length);
console.log('NFS 로그:', nfsLog);
```

---

## 📊 모니터링

### 모니터링 대시보드 사용법

1. **대시보드 열기**:
   - 게임 헤더의 "모니터링" 버튼 클릭 (BarChart3 아이콘)
   - 또는 개발자 도구 콘솔에서 `monitoringService.getSummary()` 실행

2. **토큰 사용량 통계**:
   - 총 토큰: 전체 API 호출에서 사용된 총 토큰 수
   - 평균 토큰: API 호출당 평균 토큰 수
   - 압축률: 히스토리 압축으로 절감된 토큰 비율
   - 최근 기록: 최근 10개 API 호출의 상세 정보

3. **NFS 필터링 통계**:
   - 총 필터링: 필터링된 NFS 선수 총 수
   - 평균 필터링: 트레이드 제안당 평균 필터링 수
   - 사유별 분류: 프랜차이즈 스타, 핵심 코어, 보호선수 등
   - 최근 기록: 최근 10개 필터링 이벤트

### 프로그래밍 방식 접근

```typescript
import { monitoringService } from './lib/monitoring';

// 전체 통계 조회
const summary = monitoringService.getSummary();
console.log('토큰 통계:', summary.tokenStats);
console.log('NFS 통계:', summary.nfsStats);

// 토큰 통계만 조회
const tokenStats = monitoringService.getTokenStats();
console.log('평균 토큰:', tokenStats.average);
console.log('압축률:', tokenStats.compressionAverage);

// NFS 통계만 조회
const nfsStats = monitoringService.getNFSStats();
console.log('총 필터링:', nfsStats.totalFiltered);
console.log('사유별 분류:', nfsStats.reasonBreakdown);

// 통계 초기화
monitoringService.clear();
```

---

## 💬 피드백 수집

### 피드백 기록

```typescript
import { recordFeedback } from './lib/feedback';

// 버그 리포트
recordFeedback('BUG', 'AI_INTELLIGENCE', 'AI가 복잡한 지시를 이해하지 못함', {
  userAction: '트레이드 제안 요청',
  errorMessage: 'AI가 NFS 선수를 제안함'
});

// 제안
recordFeedback('SUGGESTION', 'TOKEN_USAGE', '히스토리 압축률을 더 높일 수 있을 것 같음');

// 칭찬
recordFeedback('PRAISE', 'UI_UX', '모니터링 대시보드가 유용함');

// 불만
recordFeedback('COMPLAINT', 'TRADE_LOGIC', '트레이드 제안이 너무 보수적임');
```

### 피드백 조회

```typescript
import { feedbackService } from './lib/feedback';

// 전체 피드백 조회
const allFeedbacks = feedbackService.getFeedbacks();

// 타입별 필터링
const bugs = feedbackService.getFeedbacks({ type: 'BUG' });

// 카테고리별 필터링
const aiFeedbacks = feedbackService.getFeedbacks({ category: 'AI_INTELLIGENCE' });

// 통계 조회
const stats = feedbackService.getStats();
console.log('총 피드백:', stats.total);
console.log('타입별:', stats.byType);
console.log('카테고리별:', stats.byCategory);

// 내보내기
const json = feedbackService.exportFeedbacks();
console.log(json);

// 초기화
feedbackService.clear();
```

### 피드백 카테고리

- **타입 (Type)**:
  - `BUG`: 버그 리포트
  - `SUGGESTION`: 개선 제안
  - `COMPLAINT`: 불만 사항
  - `PRAISE`: 칭찬
  - `QUESTION`: 질문

- **카테고리 (Category)**:
  - `AI_INTELLIGENCE`: AI 지능 관련
  - `TOKEN_USAGE`: 토큰 사용량 관련
  - `TRADE_LOGIC`: 트레이드 로직 관련
  - `UI_UX`: UI/UX 관련
  - `PERFORMANCE`: 성능 관련
  - `OTHER`: 기타

---

## 📈 성능 모니터링 체크리스트

### 정기 점검 사항

**일일**:
- [ ] 토큰 사용량이 정상 범위인가? (평균 토큰 수 확인)
- [ ] 히스토리 압축률이 50% 이상인가?
- [ ] NFS 필터링이 정상 작동하는가?

**주간**:
- [ ] 토큰 사용량 추세 분석 (증가/감소)
- [ ] NFS 필터링 통계 분석 (어떤 사유가 가장 많은가?)
- [ ] 사용자 피드백 검토 및 우선순위 결정

**월간**:
- [ ] 전체 통계 리포트 작성
- [ ] 개선 사항 도출 및 계획 수립
- [ ] 사용자 피드백 기반 기능 개선

---

## 🔧 문제 해결

### 토큰 사용량이 예상보다 높은 경우

1. **히스토리 압축 확인**:
   ```typescript
   const stats = monitoringService.getTokenStats();
   if (stats.compressionAverage < 30) {
     console.warn('압축률이 낮습니다. 히스토리 요약 로직을 확인하세요.');
   }
   ```

2. **System Prompt 길이 확인**:
   - `SystemLogic.ts` 파일이 3,670줄로 매우 길 수 있음
   - 불필요한 예시 제거 검토

3. **사용자 입력 길이 확인**:
   - 10,000자 제한이 적용되는지 확인
   - 콘솔에서 `✂️ 사용자 입력 길이 제한` 로그 확인

### NFS 필터링이 작동하지 않는 경우

1. **로그 확인**:
   ```javascript
   // 브라우저 콘솔에서
   const nfsStats = monitoringService.getNFSStats();
   console.log('NFS 통계:', nfsStats);
   ```

2. **필터링 함수 직접 테스트**:
   ```typescript
   import { isNFSPlayer } from './lib/tradeFilter';
   const player = { name: '임찬규', stats: { contact: 50, power: 50 } };
   const result = isNFSPlayer(player);
   console.log('NFS 여부:', result.isNFS, '사유:', result.reason);
   ```

3. **보호선수 명단 확인**:
   - 보호선수 명단이 올바르게 전달되는지 확인

---

## 📝 추가 권장 사항

### 1. 자동화된 테스트

- CI/CD 파이프라인에 테스트 추가
- 정기적인 성능 벤치마크 실행

### 2. 알림 시스템

- 토큰 사용량이 임계값을 초과하면 알림
- NFS 필터링 비율이 비정상적으로 높으면 알림

### 3. 대시보드 개선

- 그래프 시각화 추가
- 시간대별 통계 분석
- 비교 분석 기능 (이전 주/월 대비)

---

**작성일**: 2025-01-XX  
**버전**: v2.1.0

