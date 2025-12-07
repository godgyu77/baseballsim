/**
 * [Auto-Retry] API 재시도 유틸리티
 * 네트워크 오류나 서버 에러 시 자동으로 재시도하는 로직
 */

// 재시도 설정 상수
export const MAX_RETRIES = 3; // 최대 재시도 횟수
export const INITIAL_DELAY = 1000; // 초기 대기 시간 (1초)
export const MAX_DELAY = 16000; // 최대 대기 시간 (16초)

/**
 * [UPDATE] 503 Service Unavailable 에러인지 확인
 * @param error 에러 객체
 * @returns 503 에러 여부
 */
export function isServiceUnavailableError(error: any): boolean {
  if (!error) {
    return false;
  }

  // 상태 코드 확인
  const statusCode = 
    (error && typeof error === 'object' && 'status' in error && error.status) ||
    (error && typeof error === 'object' && 'code' in error && error.code) ||
    (error && typeof error === 'object' && 'statusCode' in error && error.statusCode);
  
  if (statusCode === 503) {
    return true;
  }

  // 에러 메시지 확인
  const errorMessage = error instanceof Error ? error.message : String(error) || '';
  const errorString = errorMessage.toLowerCase();
  
  return (
    errorString.includes('503') ||
    errorString.includes('service unavailable') ||
    errorString.includes('overloaded')
  );
}

/**
 * 재시도 가능한 에러인지 확인
 * @param error 에러 객체
 * @returns 재시도 가능 여부
 */
export function isRetryableError(error: any): boolean {
  // 네트워크 에러 (연결 실패, 타임아웃 등)
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return true;
  }

  // GoogleGenerativeAI 에러 객체 확인
  if (error && typeof error === 'object') {
    // 상태 코드가 있는 경우
    const statusCode = error.status || error.code || error.statusCode;
    
    if (statusCode) {
      // 재시도하지 말아야 할 에러 (즉시 실패)
      if (statusCode === 401 || statusCode === 400 || statusCode === 403) {
        return false; // 인증 오류, 잘못된 요청, 권한 없음
      }
      
      // [UPDATE] 429 Quota Exceeded는 재시도하지 않음 (사용자에게 명확한 안내 필요)
      if (statusCode === 429) {
        return false; // Quota Exceeded는 재시도하지 않고 사용자에게 안내
      }
      
      // [UPDATE] 503 Service Unavailable은 재시도 가능 (일시적 장애)
      if (statusCode === 503) {
        return true; // 503은 일시적 장애이므로 재시도
      }
      
      // 재시도해야 할 에러
      if (statusCode === 408 || (statusCode >= 500 && statusCode < 600)) {
        return true; // 타임아웃, 서버 에러
      }
    }

    // 에러 메시지 기반 판단
    const errorMessage = error.message || error.toString() || '';
    const lowerMessage = errorMessage.toLowerCase();
    
    // [UPDATE] 429 Quota Exceeded 에러는 재시도하지 않음 (사용자에게 명확한 안내 필요)
    if (
      lowerMessage.includes('quota') ||
      lowerMessage.includes('exceeded') ||
      lowerMessage.includes('429') ||
      lowerMessage.includes('rate limit exceeded') ||
      lowerMessage.includes('quota exceeded')
    ) {
      return false; // Quota Exceeded는 재시도하지 않고 사용자에게 안내
    }
    
    // 네트워크 관련 에러
    if (
      lowerMessage.includes('network') ||
      lowerMessage.includes('timeout') ||
      lowerMessage.includes('connection') ||
      lowerMessage.includes('econnreset') ||
      lowerMessage.includes('enotfound') ||
      lowerMessage.includes('failed to fetch') ||
      lowerMessage.includes('networkerror')
    ) {
      return true;
    }

    // [UPDATE] 503 Service Unavailable 에러는 재시도 가능 (일시적 장애)
    if (
      lowerMessage.includes('service unavailable') ||
      lowerMessage.includes('overloaded') ||
      lowerMessage.includes('503')
    ) {
      return true; // 503은 일시적 장애이므로 재시도
    }

    // 서버 에러 관련 메시지
    if (
      lowerMessage.includes('internal server error') ||
      lowerMessage.includes('bad gateway') ||
      lowerMessage.includes('gateway timeout')
    ) {
      return true;
    }

    // 재시도하지 말아야 할 에러 메시지
    if (
      lowerMessage.includes('invalid api key') ||
      lowerMessage.includes('unauthorized') ||
      lowerMessage.includes('authentication') ||
      lowerMessage.includes('bad request') ||
      lowerMessage.includes('malformed')
    ) {
      return false;
    }
  }

  // 기본값: 알 수 없는 에러는 재시도 시도
  return true;
}

/**
 * Exponential Backoff 지연 시간 계산
 * @param attempt 시도 횟수 (0부터 시작)
 * @returns 대기 시간 (밀리초)
 */
export function calculateBackoffDelay(attempt: number): number {
  // Exponential Backoff: 1초 -> 2초 -> 4초 -> 8초 -> 16초
  const delay = Math.min(INITIAL_DELAY * Math.pow(2, attempt), MAX_DELAY);
  // 약간의 랜덤 지터 추가 (동시 재시도 방지)
  const jitter = Math.random() * 0.3 * delay; // 최대 30% 지터
  return Math.floor(delay + jitter);
}

/**
 * 지연 함수 (Promise 기반)
 * @param ms 대기 시간 (밀리초)
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 재시도 가능한 API 호출 래퍼 함수
 * @param fn 실행할 비동기 함수
 * @param options 재시도 옵션
 * @returns 함수 실행 결과
 */
export async function retryRequest<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number;
    onRetry?: (attempt: number, error: any) => void;
    shouldRetry?: (error: any) => boolean;
  } = {}
): Promise<T> {
  const maxRetries = options.maxRetries ?? MAX_RETRIES;
  const shouldRetry = options.shouldRetry ?? isRetryableError;
  let lastError: any;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // 마지막 시도이거나 재시도 불가능한 에러인 경우 즉시 throw
      if (attempt >= maxRetries || !shouldRetry(error)) {
        throw error;
      }

      // [UPDATE] 503 에러 시 특별한 로깅
      const is503Error = isServiceUnavailableError(error);
      if (is503Error) {
        console.log(`♻️ 503 에러 감지. 재시도 중... ${attempt + 1}/${maxRetries}`);
      }

      // 재시도 콜백 호출
      if (options.onRetry) {
        options.onRetry(attempt + 1, error);
      }

      // Exponential Backoff 대기
      const delayMs = calculateBackoffDelay(attempt);
      
      // 503 에러가 아닌 경우에만 일반 로그 출력 (503은 위에서 이미 로그 출력)
      if (!is503Error) {
        console.log(
          `[Auto-Retry] 재시도 ${attempt + 1}/${maxRetries} - ${delayMs}ms 후 재시도...`,
          error instanceof Error ? error.message : String(error)
        );
      } else {
        // 503 에러의 경우 대기 시간만 로그
        console.log(`♻️ ${delayMs}ms 대기 후 재시도...`);
      }
      
      await delay(delayMs);
    }
  }

  // 이 코드는 실행되지 않아야 하지만 TypeScript를 위해 필요
  throw lastError;
}

