/**
 * [OPTIMIZE] 토큰 절약을 위한 유틸리티 함수
 * Input Token 사용량을 줄이기 위한 최적화 로직
 */

// 토큰 절약 설정 상수
export const MAX_HISTORY_TURNS = 15; // 최대 전송할 대화 턴 수 (user + model = 1턴)
export const MAX_USER_INPUT_LENGTH = 10000; // 사용자 입력 최대 길이 (자)

/**
 * [OPTIMIZE] 토큰 절약을 위한 Sliding Window 적용
 * 최근 N개의 대화만 전송하여 토큰 사용량을 제한합니다.
 * 
 * @param history 전체 대화 히스토리 배열
 * @param maxTurns 최대 전송할 대화 턴 수 (기본값: 15)
 * @returns 최적화된 히스토리 배열 (최근 N개만 포함)
 */
export function optimizeHistory(
  history: Array<{ role: string; parts: Array<{ text: string }> }>,
  maxTurns: number = MAX_HISTORY_TURNS
): Array<{ role: string; parts: Array<{ text: string }> }> {
  if (history.length <= maxTurns) {
    return history;
  }

  // 오래된 대화가 잘려 나갈 때 로그
  const removedCount = history.length - maxTurns;
  console.log(`✂️ 오래된 대화 절삭됨: ${removedCount}개 턴 제거 (${history.length} → ${maxTurns})`);
  
  // 최근 N개만 반환 (Sliding Window)
  return history.slice(-maxTurns);
}

/**
 * [OPTIMIZE] 사용자 입력 길이 제한 (Input Truncation)
 * 너무 긴 사용자 입력을 자르거나 앞부분만 전송하도록 전처리합니다.
 * 
 * [FIX] 초기 데이터(Initial Data)가 포함된 프롬프트는 절대 잘리지 않도록 예외 처리
 * 
 * @param userInput 사용자 입력 텍스트
 * @param maxLength 최대 허용 길이 (기본값: 10,000자)
 * @returns 최적화된 사용자 입력 (길이 제한 적용)
 */
export function truncateUserInput(
  userInput: string,
  maxLength: number = MAX_USER_INPUT_LENGTH
): string {
  // [FIX] 초기 데이터가 포함된 프롬프트는 절대 잘리지 않도록 예외 처리
  const isInitialData = userInput.includes('[INITIAL_DATA_PACK]') || 
                        userInput.includes('KBO_INITIAL_DATA') ||
                        userInput.includes('[SYSTEM STATUS: FIXED]') ||
                        userInput.includes('Initial Data') ||
                        userInput.length > 30000; // 30,000자 이상이면 초기 데이터로 간주
  
  if (isInitialData) {
    console.log(`[TokenOptimizer] 초기 데이터 감지: 길이 제한 건너뛰기 (${userInput.length}자)`);
    return userInput; // 초기 데이터는 절대 잘리지 않음
  }
  
  if (userInput.length <= maxLength) {
    return userInput;
  }

  // 입력이 너무 길면 앞부분만 전송
  const truncated = userInput.substring(0, maxLength);
  console.log(`✂️ 사용자 입력 길이 제한: ${userInput.length}자 → ${maxLength}자로 절단`);
  console.log(`✂️ 절단된 내용: ${userInput.substring(maxLength, maxLength + 50)}...`);
  
  return truncated;
}

/**
 * [OPTIMIZE] 히스토리 객체 정리 (Data Cleaning)
 * 불필요한 메타데이터를 제거하고 경량 객체로 변환합니다.
 * 
 * @param history 원본 히스토리 배열
 * @returns 정리된 히스토리 배열 (role과 parts만 포함)
 */
export function cleanHistory(
  history: Array<{ role: string; parts: Array<{ text: string }>; [key: string]: any }>
): Array<{ role: string; parts: Array<{ text: string }> }> {
  return history.map(msg => ({
    role: msg.role,
    parts: msg.parts.map((part: any) => ({
      text: typeof part.text === 'string' ? part.text : String(part.text || '')
    }))
  }));
}

/**
 * [OPTIMIZE] 통합 토큰 최적화 함수
 * 히스토리와 사용자 입력을 모두 최적화합니다.
 * 
 * [FIX] 초기 데이터가 포함된 프롬프트는 절대 최적화하지 않도록 예외 처리
 * 
 * @param history 전체 대화 히스토리
 * @param userInput 사용자 입력 텍스트
 * @param isInitialSetup 초기 설정 프롬프트 여부 (선택적)
 * @returns 최적화된 히스토리와 사용자 입력
 */
export function optimizeForTokenUsage(
  history: Array<{ role: string; parts: Array<{ text: string }>; [key: string]: any }>,
  userInput: string,
  isInitialSetup?: boolean
): {
  optimizedHistory: Array<{ role: string; parts: Array<{ text: string }> }>;
  optimizedUserInput: string;
} {
  // [FIX] 초기 데이터가 포함된 프롬프트는 절대 최적화하지 않음
  const isInitialData = isInitialSetup || 
                        userInput.includes('[INITIAL_DATA_PACK]') || 
                        userInput.includes('KBO_INITIAL_DATA') ||
                        userInput.includes('[SYSTEM STATUS: FIXED]') ||
                        userInput.includes('Initial Data') ||
                        userInput.length > 30000; // 30,000자 이상이면 초기 데이터로 간주
  
  if (isInitialData) {
    console.log(`[TokenOptimizer] 초기 데이터 감지: 최적화 건너뛰기 (${userInput.length}자)`);
    return {
      optimizedHistory: cleanHistory(history), // 메타데이터만 정리
      optimizedUserInput: userInput // 절대 잘리지 않음
    };
  }
  
  // 1. 히스토리 정리 (메타데이터 제거)
  const cleanedHistory = cleanHistory(history);
  
  // 2. Sliding Window 적용 (최근 15개만)
  const optimizedHistory = optimizeHistory(cleanedHistory, MAX_HISTORY_TURNS);
  
  // 3. 사용자 입력 길이 제한
  const optimizedUserInput = truncateUserInput(userInput, MAX_USER_INPUT_LENGTH);
  
  return {
    optimizedHistory,
    optimizedUserInput
  };
}

