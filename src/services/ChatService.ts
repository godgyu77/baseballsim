import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { ContextService } from './ContextService';
import { KBO_SYSTEM_LOGIC } from '../constants/prompts/SystemLogic';

/**
 * ChatService
 * 
 * Vite 환경에서 클라이언트 사이드에서 직접 Gemini API를 호출하는 서비스
 */
export class ChatService {
  /**
   * 채팅 메시지를 처리하고 스트리밍 응답을 반환합니다.
   */
  static async streamChat({
    messages,
    apiKey,
    teamCode,
  }: {
    messages: Array<{ role: string; content: string }>;
    apiKey: string;
    teamCode: string;
  }) {
    // 1. 필수 파라미터 검증
    if (!apiKey) {
      throw new Error('API Key가 필요합니다.');
    }

    if (!teamCode) {
      throw new Error('Team Code가 필요합니다.');
    }

    // 2. ContextService를 통해 게임 컨텍스트 생성
    const gameContext = await ContextService.generateGameContext(teamCode);

    // 3. 시스템 프롬프트 조립
    const systemPrompt = `${KBO_SYSTEM_LOGIC}

${gameContext}

**[중요]**
- 위 [CURRENT_GAME_CONTEXT] 섹션의 데이터를 절대적 진실로 받아들이세요.
- Context에 없는 선수는 언급하지 마세요.
- 자금 계산은 Context의 '현재 보유 자금'을 기준으로 수행하세요.
- 영구결번 리스트의 등번호는 절대 사용하지 마세요.`;

    // 4. 동적으로 Google Gemini 클라이언트 생성
    const googleGenerativeAI = createGoogleGenerativeAI({
      apiKey: apiKey,
    });

    // 5. 스트리밍 응답 생성 (Gemini 2.5 Flash 모델 사용)
    const result = await streamText({
      model: googleGenerativeAI('gemini-2.5-flash'),
      system: systemPrompt,
      messages: messages.map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'model', // Gemini는 'assistant' 대신 'model' 사용
        content: msg.content,
      })),
      temperature: 0.7,
    });

    // 6. 스트리밍 응답 반환
    // result.textStream을 직접 반환하여 ChatInterface에서 처리
    // ReadableStream<Uint8Array> 형식으로 변환
    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const chunk of result.textStream) {
            // text-delta 형식으로 변환
            const data = JSON.stringify({
              type: 'text-delta',
              textDelta: chunk,
            }) + '\n';
            controller.enqueue(encoder.encode(data));
          }
          
          // 토큰 사용량 정보를 스트림 끝에 추가
          try {
            const usage = await result.usage;
            if (usage) {
              const usageData = JSON.stringify({
                type: 'token-usage',
                usage: {
                  promptTokens: usage.promptTokens || 0,
                  completionTokens: usage.completionTokens || 0,
                  totalTokens: usage.totalTokens || 0,
                },
              }) + '\n';
              controller.enqueue(encoder.encode(usageData));
            }
          } catch (e) {
            // usage 정보를 가져올 수 없으면 무시
            console.warn('Token usage 정보를 가져올 수 없습니다:', e);
          }
          
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    // Response 객체로 래핑하여 반환
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }
}

