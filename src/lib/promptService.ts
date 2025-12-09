/**
 * 동적 프롬프트 서비스
 * 
 * 게임 상황에 따라 필요한 데이터만 동적으로 주입하여 토큰 사용량을 최소화합니다.
 * System Logic(규칙)은 보존하되, 정적 데이터는 상황에 맞게 주입합니다.
 */

import { ContextInjectionOptions, getRelevantContext, determineContextType } from './contextInjector';
import { KBO_SYSTEM_LOGIC } from '../constants/prompts/SystemLogic';
import { KBO_INITIAL_DATA } from '../constants/prompts/InitialData';

/**
 * 프롬프트 구성 옵션
 */
export interface PromptCompositionOptions {
  gamePhase: string;
  userMessage: string;
  currentRoster?: any[];
  targetPlayer?: any;
  teamBudget?: number;
  facilities?: any;
  leagueStandings?: any;
  transactionHistory?: any[];
  isInitialization?: boolean;
}

/**
 * 동적 프롬프트 생성
 * 
 * System Logic(규칙)은 항상 포함하되, 정적 데이터는 상황에 맞게 주입합니다.
 * 
 * @param options 프롬프트 구성 옵션
 * @returns 최적화된 프롬프트
 */
export function composeDynamicPrompt(options: PromptCompositionOptions): string {
  const { isInitialization, userMessage, gamePhase } = options;

  // 1. System Logic (규칙) - 항상 포함 (경량화 버전 사용 가능)
  const systemLogic = KBO_SYSTEM_LOGIC;

  // 2. Initial Data - 초기화 시에만 포함
  let initialData = '';
  if (isInitialization) {
    initialData = `\n\n${KBO_INITIAL_DATA}`;
  }

  // 3. 동적 컨텍스트 - 상황에 맞는 데이터만 주입
  const contextOptions: ContextInjectionOptions = {
    gamePhase: gamePhase as any,
    userMessage,
    currentRoster: options.currentRoster,
    targetPlayer: options.targetPlayer,
    teamBudget: options.teamBudget,
    facilities: options.facilities,
    leagueStandings: options.leagueStandings,
    transactionHistory: options.transactionHistory,
  };

  const contextType = determineContextType(contextOptions);
  const dynamicContext = getRelevantContext(contextType, contextOptions);

  // 4. 프롬프트 조합
  const parts: string[] = [];

  // System Logic (규칙)
  parts.push(systemLogic);

  // Initial Data (초기화 시에만)
  if (initialData) {
    parts.push(initialData);
  }

  // 사용자 메시지
  parts.push(`\n\n[USER MESSAGE]\n${userMessage}`);

  // 동적 컨텍스트 (필요한 경우만)
  if (dynamicContext && !isInitialization) {
    parts.push(`\n\n${dynamicContext}`);
  }

  const finalPrompt = parts.join('\n');

  // 토큰 사용량 로깅
  const estimatedTokens = Math.ceil(finalPrompt.length / 4); // 대략적인 토큰 추정 (1 토큰 ≈ 4자)
  console.log(`[Prompt Service] 프롬프트 구성 완료:`);
  console.log(`  - System Logic: ${systemLogic.length}자`);
  console.log(`  - Initial Data: ${initialData.length}자 (초기화: ${isInitialization ? '포함' : '제외'})`);
  console.log(`  - 동적 컨텍스트: ${dynamicContext.length}자 (타입: ${contextType})`);
  console.log(`  - 총 길이: ${finalPrompt.length}자 (예상 토큰: ~${estimatedTokens})`);

  return finalPrompt;
}

/**
 * 상황별 데이터 주입 함수
 * 
 * 게임 단계에 따라 필요한 데이터만 반환합니다.
 * 
 * @param stage 게임 단계
 * @param options 게임 상태 옵션
 * @returns 필요한 데이터만 포함된 문자열
 */
export function getContextData(
  stage: string,
  options: PromptCompositionOptions
): string {
  const contextOptions: ContextInjectionOptions = {
    gamePhase: stage as any,
    userMessage: options.userMessage,
    currentRoster: options.currentRoster,
    targetPlayer: options.targetPlayer,
    teamBudget: options.teamBudget,
    facilities: options.facilities,
    leagueStandings: options.leagueStandings,
    transactionHistory: options.transactionHistory,
  };

  return getRelevantContext(determineContextType(contextOptions), contextOptions);
}

/**
 * System Logic 경량화 버전 생성 (선택적)
 * 
 * 핵심 규칙만 남기고 불필요한 반복 설명을 제거합니다.
 * 
 * @returns 경량화된 System Logic
 */
export function getLightweightSystemLogic(): string {
  // TODO: SystemLogic.ts에서 핵심 규칙만 추출하여 경량화 버전 생성
  // 현재는 원본을 반환하지만, 추후 경량화 버전으로 교체 가능
  return KBO_SYSTEM_LOGIC;
}
