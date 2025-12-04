import { GoogleGenerativeAI } from '@google/generative-ai';
import { KBO_SYSTEM_LOGIC, KBO_INITIAL_DATA } from '../constants/prompts';
import { Team } from '../constants/TeamData';
import { Difficulty } from '../constants/GameConfig';

export const GEMINI_MODEL = 'gemini-2.5-flash';

export async function getGeminiModel(apiKey: string) {
  const genAI = new GoogleGenerativeAI(apiKey);
  
  return genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    systemInstruction: KBO_SYSTEM_LOGIC || '당신은 야구 매니지먼트 게임의 게임마스터입니다.',
  });
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
  
  // 난이도별 설정 정보
  const difficultyMode = difficulty === 'EASY' ? '이지 모드' : difficulty === 'NORMAL' ? '노말 모드' : '헬 모드';
  const difficultyConfig = difficulty === 'EASY' 
    ? '초기 자금: 80.0억 원, 샐러리캡: 250억 원'
    : difficulty === 'NORMAL'
    ? '초기 자금: 30.0억 원, 샐러리캡: 137억 원'
    : '초기 자금: 10.0억 원, 샐러리캡: 100억 원';
  
  // 사용자가 의도한 [지시] 문구가 가장 먼저 전송됩니다.
  const initPrompt = `${KBO_INITIAL_DATA}

[지시] ${selectedTeam.fullName}을 선택했습니다.

**[난이도 설정 - 절대 변경 금지]**
난이도: ${difficultyMode} (${difficulty})
${difficultyConfig}

위 정보를 바탕으로 게임을 초기화하십시오. 사용자는 "${selectedTeam.fullName}"의 단장으로 게임을 시작합니다.

[SYSTEM INSTRUCTION: INITIALIZATION OVERRIDE]
1. The user has ALREADY selected the difficulty (${difficultyMode}) and team (${selectedTeam.fullName}) via the UI.
2. DO NOT output "Welcome" text or ask for difficulty.
3. DO NOT ask "어떤 난이도로 시작하시겠습니까?" or "난이도를 선택해주세요" or similar questions.
4. IMMEDIATELY assume the role of the GM/Assistant.
5. START THE GAME IMMEDIATELY with the <STATUS> dashboard for 2026-01-01 (2026년 1월 1주차), funds (${difficultyConfig}), and <NEWS> tag right now.
6. Output <OPTIONS> tag with game action buttons (일정 진행, 로스터 확인, etc.) immediately.
7. Start directly with the game simulation. Skip all introductory steps and go directly to the main game screen.`;
  
  // 초기 데이터 전송 (이것이 첫 번째 User 메시지가 됩니다)
  const result = await chat.sendMessage(initPrompt);
  const response = await result.response;
  const text = response.text();
  
  return text;
}


