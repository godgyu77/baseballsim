import { GoogleGenerativeAI } from '@google/generative-ai';
import { KBO_SYSTEM_LOGIC, KBO_INITIAL_DATA } from '../constants/prompts';
import { Team } from '../constants/TeamData';
import { Difficulty } from '../constants/GameConfig';
import { generateInitPromptFromTeam } from './promptGenerator';
import { retryRequest } from './retryUtils';

export const GEMINI_MODEL = 'gemini-2.5-flash';

/**
 * [Cost Optimization] 모델 인스턴스 캐시
 * 같은 API 키에 대해 모델 인스턴스를 재사용하여 불필요한 객체 생성을 방지합니다.
 * 
 * [Analysis] 문제점:
 * - 기존: 매번 새로운 GoogleGenerativeAI 인스턴스 생성 → 메모리 및 초기화 오버헤드
 * - 개선: Map 기반 캐싱으로 같은 API 키에 대해 인스턴스 재사용
 * 
 * [Expected Savings]: 모델 초기화 오버헤드 100% 제거, 중복 호출 시 즉시 반환
 */
const modelCache = new Map<string, any>();

/**
 * [Cost Optimization] Gemini 모델 인스턴스 가져오기 (캐싱 적용)
 * 
 * @param apiKey Gemini API 키
 * @returns 캐시된 모델 인스턴스 또는 새로 생성한 인스턴스
 */
export async function getGeminiModel(apiKey: string) {
  // [Cost Optimization] 캐시 확인: 같은 API 키로 이미 생성된 모델이 있으면 재사용
  if (modelCache.has(apiKey)) {
    console.log('[Cost Optimization] 모델 인스턴스 캐시에서 재사용:', apiKey.substring(0, 10) + '...');
    return modelCache.get(apiKey)!;
  }

  // [Cost Optimization] 캐시에 없으면 새로 생성하고 캐시에 저장
  console.log('[Cost Optimization] 새 모델 인스턴스 생성 및 캐싱:', apiKey.substring(0, 10) + '...');
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    systemInstruction: KBO_SYSTEM_LOGIC || '당신은 야구 매니지먼트 게임의 게임마스터입니다.',
  });
  
  // [Cost Optimization] 캐시에 저장하여 다음 호출 시 재사용
  modelCache.set(apiKey, model);
  
  return model;
}

/**
 * [Cost Optimization] 모델 캐시 초기화 (API 키 변경 시 사용)
 * 
 * @param apiKey 제거할 API 키 (선택적, 없으면 전체 캐시 클리어)
 */
export function clearModelCache(apiKey?: string) {
  if (apiKey) {
    modelCache.delete(apiKey);
    console.log('[Cost Optimization] 특정 API 키의 모델 캐시 제거:', apiKey.substring(0, 10) + '...');
  } else {
    modelCache.clear();
    console.log('[Cost Optimization] 전체 모델 캐시 초기화');
  }
}

/**
 * 게임 초기화 시 초기 데이터를 Gemini API에 전송하는 함수
 * [FIX] API History 강제 초기화 (User First 규칙 준수)
 * 
 * ⚠️ CRITICAL: 이 함수는 React 상태(messages)에 저장된 이전 AI 응답을 절대 history로 사용하지 않습니다.
 * Gemini API 규칙: "First content should be with role 'user', got model" 에러 방지를 위해
 * history를 무조건 빈 배열 []로 하드코딩합니다.
 * 
 * @param apiKey Gemini API 키
 * @param difficulty 사용자가 선택한 난이도
 * @param selectedTeam 사용자가 선택한 팀 정보
 * @param _ignoredHistory history 인자는 받더라도 무시합니다. (API 에러 방지용)
 * @returns AI의 초기 응답 텍스트
 */
export async function initializeGameWithData(
  apiKey: string,
  difficulty: Difficulty,
  selectedTeam: Team,
  // history 인자는 받더라도 무시합니다. (API 에러 방지용)
  _ignoredHistory: any[] = []
): Promise<string> {
  // 안전 장치: 데이터 길이 확인
  console.log("Data Length:", KBO_INITIAL_DATA.length);
  
  if (KBO_INITIAL_DATA.length < 5000) {
    console.error("❌ 로스터 데이터 누락됨!");
    throw new Error("로스터 데이터가 누락되었습니다. 데이터 길이가 5,000자 미만입니다.");
  }
  
  // Gemini 모델 초기화
  const model = await getGeminiModel(apiKey);
  
  // [CRITICAL FIX] API History 강제 초기화 (User First 규칙 준수)
  // 화면에 떠있는 텍스트(Model Role)가 history에 섞이면 에러가 발생합니다.
  // 따라서 무조건 빈 배열 []로 시작하여, 아래의 sendMessage가 '첫 번째 User 메시지'가 되게 합니다.
  // ⚠️ 주의: _ignoredHistory 인자는 절대 사용하지 않습니다. 무조건 빈 배열 []을 하드코딩합니다.
  const chat = model.startChat({
    history: [], // [CRITICAL] 변수를 넣지 말고 빈 배열을 직접 하드코딩할 것!
    generationConfig: {
      maxOutputTokens: 8000, // 최대 출력 토큰 수 설정
    },
  });
  
  // [NEW] 동적 프롬프트 생성 함수 사용
  // 초기 시설 레벨은 모두 1로 시작
  const initPromptText = generateInitPromptFromTeam(selectedTeam, difficulty);
  
  // Initial Data와 프롬프트 결합
  const initPrompt = `${KBO_INITIAL_DATA}

${initPromptText}

[SYSTEM INSTRUCTION: INITIALIZATION OVERRIDE]
1. The user has ALREADY selected the difficulty and team via the UI.
2. DO NOT output "Welcome" text or ask for difficulty.
3. DO NOT ask "어떤 난이도로 시작하시겠습니까?" or "난이도를 선택해주세요" or similar questions.
4. IMMEDIATELY assume the role of the GM/Assistant.
5. START THE GAME IMMEDIATELY with the <STATUS> dashboard for 2026-01-01 (2026년 1월 1주차), and <NEWS> tag right now.
6. Output <OPTIONS> tag with game action buttons (일정 진행, 로스터 확인, etc.) immediately.
7. Start directly with the game simulation. Skip all introductory steps and go directly to the main game screen.`;
  
  // [Auto-Retry] 초기 데이터 전송 (재시도 로직 적용)
  // 이것이 첫 번째 User 메시지가 됩니다
  const result = await retryRequest(
    async () => {
      const messageResult = await chat.sendMessage(initPrompt);
      const messageResponse = await messageResult.response;
      return messageResponse.text();
    },
    {
      maxRetries: 3,
      onRetry: (attempt, error) => {
        console.warn(`[Auto-Retry] 게임 초기화 재시도 ${attempt}/3:`, error);
      },
    }
  );
  
  return result;
}


