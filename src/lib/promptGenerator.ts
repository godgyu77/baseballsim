/**
 * 게임 초기화 프롬프트 생성 유틸리티
 * 팀 선택 시 LLM에게 전송할 초기화 메시지를 동적으로 생성합니다.
 */

import { Team } from '../constants/TeamData';
import { Difficulty, GAME_CONFIG } from '../constants/GameConfig';
import { Facilities } from '../constants/Facilities';

/**
 * KBO 10개 구단 명단 (한국어 이름 순서)
 */
export const KBO_TEAMS: string[] = [
  '한화 이글스',
  'KIA 타이거즈',
  '삼성 라이온즈',
  'LG 트윈스',
  '두산 베어스',
  'SSG 랜더스',
  'KT 위즈',
  '롯데 자이언츠',
  'NC 다이노스',
  '키움 히어로즈',
];

/**
 * 게임 초기 설정값 상수 객체
 */
export const GAME_INIT_CONFIG = {
  // 시설 초기 레벨 (모든 시설은 레벨 1로 시작)
  FACILITY_LEVELS: {
    TRAINING: 1,      // 훈련장
    MEDICAL: 1,      // 메디컬 센터
    MARKETING: 1,    // 마케팅 팀
    SCOUTING: 1,     // 스카우트 팀
  },
} as const;

/**
 * 난이도별 한글 표시명
 */
const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  EASY: '이지 모드',
  NORMAL: '노말 모드',
  HARD: '노말 모드', // HARD는 NORMAL과 동일하게 표시
  HELL: '헬 모드',
};

/**
 * 동적 프롬프트 생성 함수
 * 팀 이름과 난이도를 받아 LLM에게 전송할 초기화 메시지를 생성합니다.
 * 
 * @param teamName 선택된 팀 이름 (예: "한화 이글스")
 * @param difficulty 선택된 난이도
 * @param facilities 시설 정보 (선택적, 기본값: 초기 레벨 1)
 * @returns 완성된 프롬프트 텍스트
 */
export function generateInitPrompt(
  teamName: string,
  difficulty: Difficulty,
  facilities?: {
    training: { level: number };
    medical: { level: number };
    marketing: { level: number };
    scouting: { level: number };
  }
): string {
  // 난이도 설정값 가져오기
  const config = GAME_CONFIG[difficulty];
  const difficultyLabel = DIFFICULTY_LABELS[difficulty];
  
  // 시설 레벨 (기본값: 모두 레벨 1)
  const facilityLevels = facilities || {
    training: { level: GAME_INIT_CONFIG.FACILITY_LEVELS.TRAINING },
    medical: { level: GAME_INIT_CONFIG.FACILITY_LEVELS.MEDICAL },
    marketing: { level: GAME_INIT_CONFIG.FACILITY_LEVELS.MARKETING },
    scouting: { level: GAME_INIT_CONFIG.FACILITY_LEVELS.SCOUTING },
  };

  // 전송 템플릿에 값 주입
  const prompt = `[System Command: Game Initialization]

사용자가 **'${teamName}'** 구단을 선택했습니다. 
아래 **[초기화 데이터]**를 바탕으로 시뮬레이션을 시작하십시오.

**[초기화 데이터]**
1. **선택 구단:** ${teamName}
2. **난이도:** ${difficultyLabel} (${difficulty})
3. **재정:** 초기 자금 ${config.initialBudget}억 원 / 샐러리캡 ${config.squadSalaryCap}억 원
4. **시설 레벨:** 훈련장 Lv.${facilityLevels.training.level}, 메디컬 Lv.${facilityLevels.medical.level}, 마케팅 Lv.${facilityLevels.marketing.level}, 스카우트 Lv.${facilityLevels.scouting.level}

**[행동 지침]**
- 위 데이터를 게임 메모리에 로드하십시오.
- 부가적인 설명은 생략하고, 즉시 **'GM Office Report'** 양식으로 첫 번째 리포트를 출력하세요.`;

  return prompt;
}

/**
 * Team 객체를 받아서 프롬프트 생성 (편의 함수)
 * 
 * @param team 선택된 팀 객체
 * @param difficulty 선택된 난이도
 * @param facilities 시설 정보 (선택적)
 * @returns 완성된 프롬프트 텍스트
 */
export function generateInitPromptFromTeam(
  team: Team,
  difficulty: Difficulty,
  facilities?: {
    training: { level: number };
    medical: { level: number };
    marketing: { level: number };
    scouting: { level: number };
  }
): string {
  return generateInitPrompt(team.fullName, difficulty, facilities);
}

