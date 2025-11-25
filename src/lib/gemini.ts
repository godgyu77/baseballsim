import { GoogleGenerativeAI } from '@google/generative-ai';
import { SYSTEM_PROMPT } from '../constants/GameConstants';

export const GEMINI_MODEL = 'gemini-2.5-flash';

export function getGeminiModel(apiKey: string) {
  const genAI = new GoogleGenerativeAI(apiKey);
  
  return genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    systemInstruction: SYSTEM_PROMPT || '당신은 야구 매니지먼트 게임의 게임마스터입니다.',
  });
}


