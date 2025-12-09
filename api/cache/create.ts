import type { VercelRequest, VercelResponse } from '@vercel/node';

// [CRITICAL] System Logic import
// Vercel Serverless Functions에서는 같은 api/ 폴더 내의 파일을 import하는 것이 안전함
// ES modules에서는 .js 확장자를 명시해야 함 (TypeScript는 .ts로 작성하지만 런타임에는 .js)
import { KBO_SYSTEM_LOGIC } from '../SystemLogic.js';

const GEMINI_MODEL = 'gemini-2.5-flash';

/**
 * Context Caching 생성 API
 * 
 * POST /api/cache/create
 * Body: { apiKey: string }
 * Response: { success: boolean, cacheId: string, expiresAt: number }
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS 설정
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { apiKey } = req.body;

    if (!apiKey || typeof apiKey !== 'string') {
      return res.status(400).json({ error: 'API key is required' });
    }

    // System Logic 확인
    if (!KBO_SYSTEM_LOGIC || KBO_SYSTEM_LOGIC.length < 1000) {
      console.error('[Context Caching] System Logic이 로드되지 않았습니다.');
      return res.status(500).json({
        error: 'System Logic not loaded',
        message: 'System Logic 파일을 불러올 수 없습니다. Vercel 빌드 설정을 확인하세요.',
      });
    }

    // Context Caching 생성
    // 참고: @google/generative-ai SDK 0.21.0에서는 cachedContents API가 직접 지원되지 않음
    // 따라서 REST API를 직접 호출하여 캐시 생성
    // 엔드포인트: POST https://generativelanguage.googleapis.com/v1beta/cachedContents
    
    console.log('[Context Caching] REST API로 캐시 생성 시도...');
    console.log(`[Context Caching] System Logic 길이: ${KBO_SYSTEM_LOGIC.length}자`);
    
    const cacheResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/cachedContents?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: `models/${GEMINI_MODEL}`,
          systemInstruction: {
            parts: [{ text: KBO_SYSTEM_LOGIC }],
          },
          ttl: '3600s', // 1시간 (ISO 8601 duration format: "3600s" = 3600초)
        }),
      }
    );

    if (!cacheResponse.ok) {
      const errorText = await cacheResponse.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText };
      }
      
      console.error('[Context Caching] REST API 호출 실패:', {
        status: cacheResponse.status,
        statusText: cacheResponse.statusText,
        error: errorData,
      });
      
      throw new Error(
        `Failed to create cache via REST API: ${cacheResponse.status} - ${errorData.error?.message || errorData.message || 'Unknown error'}`
      );
    }

    const cache = await cacheResponse.json();
    
    if (!cache || !cache.name) {
      throw new Error('Failed to create cache: Invalid response from API');
    }
    
    const cacheName = cache.name;

    console.log(`[Context Caching] ✅ 캐시 생성 성공: ${cacheName}`);

    // 캐시 ID 반환
    return res.status(200).json({
      success: true,
      cacheId: cacheName,
      expiresAt: Date.now() + 3600 * 1000, // 1시간 후 만료 (밀리초)
    });

  } catch (error: any) {
    // 상세한 에러 로깅
    const errorDetails = {
      message: error.message,
      stack: error.stack,
      name: error.name,
      systemLogicLoaded: !!KBO_SYSTEM_LOGIC,
      systemLogicLength: KBO_SYSTEM_LOGIC?.length || 0,
    };
    
    console.error('[Context Caching] ❌ 캐시 생성 실패:', errorDetails);
    
    // 에러 타입별 처리
    if (error.message?.includes('API key') || error.message?.includes('401')) {
      return res.status(401).json({
        error: 'Invalid API key',
        message: error.message,
      });
    }

    // 상세한 에러 정보 반환 (프로덕션에서도 일부 정보 제공)
    return res.status(500).json({
      error: 'Failed to create cache',
      message: error.message || 'Unknown error',
      systemLogicLoaded: !!KBO_SYSTEM_LOGIC,
      systemLogicLength: KBO_SYSTEM_LOGIC?.length || 0,
      hint: !KBO_SYSTEM_LOGIC ? 'System Logic 파일이 로드되지 않았습니다. Vercel 배포 로그를 확인하세요.' : 'SDK API 문제일 수 있습니다. Vercel Functions 로그를 확인하세요.',
    });
  }
}
