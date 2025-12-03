import { GoogleGenerativeAI } from '@google/generative-ai';
import { KBO_SYSTEM_LOGIC, KBO_INITIAL_DATA } from '../constants/prompts';

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
 * @param apiKey Gemini API 키
 * @returns AI의 초기 응답 텍스트
 */
export async function initializeGameWithData(apiKey: string): Promise<string> {
  // 안전 장치: 데이터 길이 확인
  console.log("Data Length:", KBO_INITIAL_DATA.length);
  
  if (KBO_INITIAL_DATA.length < 5000) {
    console.error("❌ 로스터 데이터 누락됨!");
    throw new Error("로스터 데이터가 누락되었습니다. 데이터 길이가 5,000자 미만입니다.");
  }
  
  // Gemini 모델 초기화
  const model = await getGeminiModel(apiKey);
  
  // 채팅 세션 시작
  const chatSession = model.startChat();
  
  // 초기 데이터 전송
  const result = await chatSession.sendMessage(KBO_INITIAL_DATA);
  const response = await result.response;
  const text = response.text();
  
  return text;
}


