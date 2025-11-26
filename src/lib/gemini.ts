import { GoogleGenerativeAI } from '@google/generative-ai';

export const GEMINI_MODEL = 'gemini-2.5-flash';

export async function getGeminiModel(apiKey: string) {
  // SYSTEM_PROMPT를 동적으로 로드하여 초기 번들 크기 감소
  const { SYSTEM_PROMPT } = await import('../constants/GameConstants');
  
  const genAI = new GoogleGenerativeAI(apiKey);
  
  return genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    systemInstruction: SYSTEM_PROMPT || '당신은 야구 매니지먼트 게임의 게임마스터입니다.',
  });
}


