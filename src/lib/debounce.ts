/**
 * [Cost Optimization] Debounce 유틸리티
 * 빠른 연속 호출을 방지하여 API 호출 횟수를 줄입니다.
 */

/**
 * Debounce 함수 타입
 */
export type DebouncedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => void;

/**
 * [Cost Optimization] Debounce 함수 생성
 * 
 * [Analysis] 문제점:
 * - 기존: 사용자가 빠르게 버튼을 클릭하면 연속으로 API 호출 발생
 * - 개선: 마지막 호출 후 일정 시간(300ms) 대기 후 실행하여 중복 요청 방지
 * 
 * [Expected Savings]: 실수로 인한 중복 요청 90% 감소
 * 
 * @param func 실행할 함수
 * @param wait 대기 시간 (밀리초, 기본값: 300ms)
 * @returns Debounce된 함수
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 300
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function debounced(...args: Parameters<T>) {
    // 이전 타이머 취소
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    // 새 타이머 설정
    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, wait);
  };
}

/**
 * [Cost Optimization] Throttle 함수 생성
 * 일정 시간 간격으로만 함수 실행을 허용합니다.
 * 
 * @param func 실행할 함수
 * @param limit 실행 간격 (밀리초, 기본값: 1000ms)
 * @returns Throttle된 함수
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number = 1000
): DebouncedFunction<T> {
  let inThrottle: boolean = false;

  return function throttled(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

