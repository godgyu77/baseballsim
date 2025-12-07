/**
 * [UPDATE] 429 Quota Exceeded 에러 감지 유틸리티
 * Google Gemini API의 429 Quota Exceeded 에러를 감지하는 헬퍼 함수
 */

/**
 * 에러가 429 Quota Exceeded 에러인지 확인
 * @param error 에러 객체
 * @returns 429 Quota Exceeded 에러 여부
 */
export function isQuotaExceededError(error: any): boolean {
  if (!error) {
    return false;
  }

  // 상태 코드 확인
  const statusCode = 
    (error && typeof error === 'object' && 'status' in error && error.status) ||
    (error && typeof error === 'object' && 'code' in error && error.code) ||
    (error && typeof error === 'object' && 'statusCode' in error && error.statusCode);
  
  if (statusCode === 429) {
    return true;
  }

  // 에러 메시지 확인
  const errorMessage = error instanceof Error ? error.message : String(error) || '';
  const errorString = errorMessage.toLowerCase();
  
  return (
    errorString.includes('429') ||
    errorString.includes('quota') ||
    errorString.includes('exceeded') ||
    errorString.includes('rate limit exceeded') ||
    errorString.includes('quota exceeded')
  );
}

/**
 * 429 Quota Exceeded 에러에 대한 사용자 친화적인 메시지 생성
 * @returns 사용자 친화적인 에러 메시지 (마크다운 형식)
 */
export function getQuotaExceededMessage(): string {
  return `🚨 **API 사용량 한도 초과 (Quota Exceeded)**

현재 무료 사용량(토큰) 한도를 초과하여 작업이 중단되었습니다.

**해결 방안:**

**방법 1 (즉시 해결):** Google Cloud Console에서 결제 정보를 등록하여 'Pay-as-you-go'로 전환하세요.
- [Google Cloud Console](https://console.cloud.google.com/) 접속
- 결제 계정 추가 및 활성화
- API 할당량 증가 또는 제한 해제

**방법 2 (대기/조정):** 
- 잠시 기다린 후 다시 시도하세요 (일일 할당량이 리셋될 때까지)
- 입력하는 텍스트 양을 줄여서 다시 시도하세요
- 더 짧은 메시지로 요청을 나누어 보내세요`;
}

/**
 * 429 Quota Exceeded 에러에 대한 간단한 알림 메시지 (alert용)
 * @returns 간단한 알림 메시지
 */
export function getQuotaExceededAlertMessage(): string {
  return '🚨 API 사용량 한도 초과\n\n무료 사용량 한도를 초과했습니다.\n\n해결 방법:\n1. Google Cloud Console에서 결제 정보 등록\n2. 잠시 기다린 후 다시 시도';
}

