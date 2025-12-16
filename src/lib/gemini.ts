import { GoogleGenerativeAI } from '@google/generative-ai';
import { KBO_SYSTEM_LOGIC, KBO_INITIAL_DATA } from '../constants/prompts';
import { Team } from '../constants/TeamData';
import { Difficulty } from '../constants/GameConfig';
import { generateInitPromptFromTeam } from './promptGenerator';
import { retryRequest } from './retryUtils';
import { getInitialRosterForTeam } from './rosterFormatter';
import { validateInitialDataIntegrity, validateTeamRosterIntegrity } from './dataIntegrity';

// 2025년 12월 기준 최신 모델 사용
export const GEMINI_MODEL = 'gemini-2.5-flash';

/**
 * [Context Caching] 캐시된 컨텐츠의 이름(ID)을 저장할 변수
 * API 레벨 캐싱을 사용하여 System Instruction 토큰 비용을 절감합니다.
 */
let activeCacheName: string | null = null;
let cacheCreationAttempted = false; // 캐시 생성 시도 여부 (중복 시도 방지)

/**
 * [Cost Optimization] 모델 인스턴스 캐시 (로컬 변수)
 * 같은 API 키에 대해 모델 인스턴스를 재사용하여 불필요한 객체 생성을 방지합니다.
 * * ⚠️ 참고: 이것은 로컬 변수 재사용이며, API 레벨 Context Caching(cachedContent)과는 별개입니다.
 */
const modelCache = new Map<string, any>();

/**
 * [Context Caching] 서버 사이드에서 캐시 생성 (Vercel API Route 사용)
 * * @param apiKey API 키
 * @returns 캐시 이름 또는 null (생성 실패 시)
 */
async function createCacheOnServer(apiKey: string): Promise<string | null> {
  try {
    console.log('[Context Caching] ⚡ 서버에서 캐시 생성 시도...');
    
    // API 라우트 경로가 프로젝트 구조에 맞는지 확인 필요 (/api/cache/create)
    const response = await fetch('/api/cache/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apiKey }),
    });

    if (!response.ok) {
      // 404 에러(API 라우트 없음)는 조용히 처리하고 Fallback
      if (response.status === 404) {
        console.warn('[Context Caching] ⚠️ 서버 API 라우트(/api/cache/create)를 찾을 수 없습니다.');
        return null;
      }
      
      const errorData = await response.json().catch(() => ({}));
      // 무료 티어 제한인 경우 명확하게 처리
      if (errorData.error === 'Free tier limit') {
        console.warn('[Context Caching] ⚠️ 무료 티어 제한: Context Caching 사용 불가');
        return null; // Fallback으로 기존 방식 사용
      }
      
      throw new Error(`Server error: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    if (data.success && data.cacheId) {
      console.log(`[Context Caching] ✅ 서버에서 캐시 생성 성공: ${data.cacheId}`);
      console.log(`[Context Caching] 캐시 만료 시간: ${new Date(data.expiresAt).toLocaleString()}`);
      return data.cacheId;
    }

    return null;
  } catch (error: any) {
    console.warn('[Context Caching] 💡 서버 캐시 생성 실패 (Fallback 사용):', error.message || error);
    return null;
  }
}

/**
 * [Cost Optimization] Gemini 모델 인스턴스 가져오기 (Context Caching 적용)
 * * @param apiKey Gemini API 키
 * @returns 캐시된 모델 인스턴스 또는 새로 생성한 인스턴스
 */
export async function getGeminiModel(apiKey: string) {
  const genAI = new GoogleGenerativeAI(apiKey);
  
  // [Context Caching] 1. 이미 캐시가 생성되어 있다면, 해당 캐시 ID를 사용하여 가벼운 모델 생성
  if (activeCacheName) {
    // console.log(`[Context Caching] ✅ Using Active Cache: ${activeCacheName.substring(0, 20)}...`);
    // 모델 인스턴스 재생성 대신 캐시된 인스턴스가 있으면 반환
    if (modelCache.has(apiKey)) {
        return modelCache.get(apiKey);
    }

    const model = genAI.getGenerativeModel({
      model: GEMINI_MODEL,
      cachedContent: activeCacheName, // 캐시된 컨텐츠 사용 (System Instruction 토큰 비용 0원)
      generationConfig: {
        temperature: 0.4, // 시뮬레이션 정합성을 위한 설정
        topP: 0.85,
        topK: 40,
      }
    });
    
    // 로컬 캐시에도 저장 (객체 재사용)
    modelCache.set(apiKey, model);
    return model;
  }
  
  // [Context Caching] 2. 캐시가 없다면 서버에서 생성 시도 (최초 1회만)
  if (!cacheCreationAttempted) {
    cacheCreationAttempted = true;
    
    // 서버 사이드 Context Caching 사용 (권장)
    const cacheName = await createCacheOnServer(apiKey);
    
    if (cacheName) {
      // 캐시 생성 성공: 캐시 이름 저장
      activeCacheName = cacheName;
      
      // 캐시된 컨텐츠를 사용하여 모델 생성
      const model = genAI.getGenerativeModel({
        model: GEMINI_MODEL,
        cachedContent: activeCacheName,
        generationConfig: {
          temperature: 0.4,
          topP: 0.85,
          topK: 40,
        }
      });
      
      modelCache.set(apiKey, model);
      console.log('[Context Caching] ✅ Context Caching 활성화: System Instruction 토큰 비용 0원');
      return model;
    } 
    // 생성 실패 시 아래 Fallback 로직으로 자연스럽게 진행
  }
  
  // [Fallback] 캐시 생성 실패 또는 브라우저 환경 제한: 기존 방식 사용
  // System Instruction은 매 요청마다 토큰으로 계산됩니다.
  if (modelCache.has(apiKey)) {
    // console.log('[Cost Optimization] 모델 인스턴스 재사용 (Fallback 모드)');
    return modelCache.get(apiKey)!;
  }

  // [Cost Optimization] 캐시에 없으면 새로 생성하고 캐시에 저장
  console.log('[Cost Optimization] 새 모델 인스턴스 생성 (Fallback 모드 - System Instruction 포함)');
  const model = genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    // KBO_SYSTEM_LOGIC이 없으면 기본값 사용
    systemInstruction: KBO_SYSTEM_LOGIC || '당신은 야구 매니지먼트 게임의 게임마스터입니다.',
    generationConfig: {
        temperature: 0.4,
        topP: 0.85,
        topK: 40,
      }
  });
  
  // 모델 인스턴스 캐싱
  modelCache.set(apiKey, model);
  
  return model;
}

/**
 * [Cost Optimization] 모델 캐시 초기화 (API 키 변경 시 사용)
 * * @param apiKey 제거할 API 키 (선택적, 없으면 전체 캐시 클리어)
 */
export function clearModelCache(apiKey?: string) {
  if (apiKey) {
    modelCache.delete(apiKey);
    console.log('[Cost Optimization] 특정 API 키의 모델 캐시 제거');
  } else {
    modelCache.clear();
    console.log('[Cost Optimization] 전체 모델 캐시 초기화');
  }
  
  // [Context Caching] 캐시 이름도 초기화
  activeCacheName = null;
  cacheCreationAttempted = false;
  console.log('[Context Caching] 캐시 상태 초기화 완료');
}

/**
 * 게임 초기화 시 초기 데이터를 Gemini API에 전송하는 함수
 * [FIX] API History 강제 초기화 (User First 규칙 준수)
 * * ⚠️ CRITICAL: 이 함수는 React 상태(messages)에 저장된 이전 AI 응답을 절대 history로 사용하지 않습니다.
 * Gemini API 규칙: "First content should be with role 'user', got model" 에러 방지를 위해
 * history를 무조건 빈 배열 []로 하드코딩합니다.
 * * @param apiKey Gemini API 키
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
  // [FIX] 데이터 무결성 검증 - InitialData.ts가 유일한 데이터 소스임을 보장
  
  // 전체 데이터 검증
  const globalValidation = validateInitialDataIntegrity();
  if (!globalValidation.isValid) {
    console.error('[Data Integrity] ❌ 초기 데이터 무결성 검증 실패:', globalValidation.errors);
    throw new Error(`데이터 무결성 검증 실패: ${globalValidation.errors.join(', ')}`);
  }
  
  if (globalValidation.warnings.length > 0) {
    console.warn('[Data Integrity] ⚠️ 초기 데이터 무결성 경고:', globalValidation.warnings);
  }
  
  // 선택된 팀의 데이터 검증
  const teamValidation = validateTeamRosterIntegrity(selectedTeam.fullName);
  if (!teamValidation.isValid) {
    console.error(`[Data Integrity] ❌ 팀 "${selectedTeam.fullName}" 데이터 검증 실패:`, teamValidation.errors);
    throw new Error(`팀 데이터 검증 실패: ${teamValidation.errors.join(', ')}`);
  }
  
  console.log(`[Data Integrity] ✅ 팀 "${selectedTeam.fullName}" 데이터 검증 완료`);
  
  // 안전 장치: 데이터 길이 확인
  if (KBO_INITIAL_DATA.length < 5000) {
    console.error("❌ 로스터 데이터 누락됨!");
    throw new Error("로스터 데이터가 누락되었습니다. 데이터 길이가 5,000자 미만입니다.");
  }
  
  // Gemini 모델 초기화
  const model = await getGeminiModel(apiKey);
  
  // [CRITICAL FIX] API History 강제 초기화 (User First 규칙 준수)
  // 화면에 떠있는 텍스트(Model Role)가 history에 섞이면 에러가 발생합니다.
  // 따라서 무조건 빈 배열 []로 시작하여, 아래의 sendMessage가 '첫 번째 User 메시지'가 되게 합니다.
  const chat = model.startChat({
    history: [], // [CRITICAL] 변수를 넣지 말고 빈 배열을 직접 하드코딩할 것!
    generationConfig: {
        // [FIX] 로스터 데이터 완결성 보장: 투수+타자 전체 데이터 수용을 위해 토큰 수 증가
      maxOutputTokens: 16384, 
    },
  });
  
  // [NEW] 동적 프롬프트 생성 함수 사용
  // 초기 시설 레벨은 모두 1로 시작
  const initPromptText = generateInitPromptFromTeam(selectedTeam, difficulty);
  
  // [TOKEN OPTIMIZATION] 초기화 시에만 선택된 팀의 로스터 전송
  // 이후 요청에서는 Roster Store를 통해 필요한 데이터만 동적으로 주입
  const selectedTeamRoster = getInitialRosterForTeam(selectedTeam.fullName);
  
  // Initial Data와 프롬프트 결합 (초기화 시에만)
  const initPrompt = `${selectedTeamRoster}

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
      const messageResult = await chat.sendMessageStream(initPrompt);
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