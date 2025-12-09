import { GoogleGenerativeAI } from '@google/generative-ai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// [CRITICAL] System Logic import
// Vercel Serverless Functions에서는 같은 api/ 폴더 내의 파일을 import하는 것이 안전함
import { KBO_SYSTEM_LOGIC } from '../SystemLogic';

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

    // Gemini API 초기화
    const genAI = new GoogleGenerativeAI(apiKey);

    // Context Caching 생성
    // 참고: @google/generative-ai SDK 버전에 따라 API가 다를 수 있음
    // 방법 1: cachedContents.create (최신 SDK)
    // 방법 2: caches.create (일부 버전)
    // 방법 3: genAI.cachedContents (직접 접근)
    
    let cache: any = null;
    let cacheName: string | null = null;

    // 방법 1 시도: genAI.cachedContents.create
    try {
      if ((genAI as any).cachedContents && typeof (genAI as any).cachedContents.create === 'function') {
        cache = await (genAI as any).cachedContents.create({
          model: GEMINI_MODEL,
          contents: [{
            role: 'system',
            parts: [{ text: KBO_SYSTEM_LOGIC }],
          }],
          ttlSeconds: 3600, // 1시간 유지
        });
        cacheName = cache?.name;
      }
    } catch (error) {
      console.warn('[Context Caching] 방법 1 실패:', error);
    }

    // 방법 2 시도: genAI.caches.create
    if (!cacheName) {
      try {
        if ((genAI as any).caches && typeof (genAI as any).caches.create === 'function') {
          cache = await (genAI as any).caches.create({
            model: GEMINI_MODEL,
            config: {
              contents: [{
                role: 'system',
                parts: [{ text: KBO_SYSTEM_LOGIC }],
              }],
            },
            ttlSeconds: 3600,
          });
          cacheName = cache?.name;
        }
      } catch (error) {
        console.warn('[Context Caching] 방법 2 실패:', error);
      }
    }

    // 방법 3 시도: 모델 인스턴스를 통한 생성
    if (!cacheName) {
      try {
        const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
        if ((model as any).createCachedContent && typeof (model as any).createCachedContent === 'function') {
          cache = await (model as any).createCachedContent({
            model: GEMINI_MODEL,
            contents: [{
              role: 'system',
              parts: [{ text: KBO_SYSTEM_LOGIC }],
            }],
            ttlSeconds: 3600,
          });
          cacheName = cache?.name;
        }
      } catch (error) {
        console.warn('[Context Caching] 방법 3 실패:', error);
      }
    }

    if (!cacheName) {
      throw new Error('Failed to create cache: All methods failed. SDK may not support cachedContents or API has changed.');
    }

    console.log(`[Context Caching] ✅ 캐시 생성 성공: ${cache.name}`);

    // 캐시 ID 반환
    return res.status(200).json({
      success: true,
      cacheId: cache.name,
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
