import { RandomEvent } from '../lib/utils';

/**
 * 랜덤 이벤트 데이터
 */
export const RANDOM_EVENTS: RandomEvent[] = [
  // 긍정 이벤트
  {
    id: 'sponsor-1',
    type: 'positive',
    title: '지역 기업 후원',
    message: '지역 유지와의 저녁 식사가 성공적으로 끝났습니다. 기업이 팀에 후원금을 제공하기로 결정했습니다.',
    effect: {
      budget: 300000000, // 3억 원
    },
  },
  {
    id: 'fan-service-1',
    type: 'positive',
    title: '유튜브 콘텐츠 대박',
    message: '팀의 유튜브 콘텐츠가 대박이 났습니다! 팬들의 관심이 급증했습니다.',
    effect: {
      fanLoyalty: 15,
      morale: 10,
    },
  },
  {
    id: 'player-breakthrough-1',
    type: 'positive',
    title: '선수 돌파구',
    message: '젊은 유망주가 훈련에서 놀라운 성장을 보였습니다. 팀 전체의 사기가 올라갔습니다.',
    effect: {
      morale: 20,
      playerCondition: 10,
    },
  },
  {
    id: 'media-praise-1',
    type: 'positive',
    title: '언론 찬사',
    message: '언론에서 팀의 전술과 선수 육성을 극찬했습니다. 팬들의 지지가 높아졌습니다.',
    effect: {
      fanLoyalty: 10,
      morale: 15,
    },
  },
  
  // 부정 이벤트
  {
    id: 'injury-1',
    type: 'negative',
    title: '주전 선수 부상',
    message: '훈련 도중 주전 투수가 발목을 삐끗했습니다. 컨디션이 크게 하락했습니다.',
    effect: {
      playerCondition: -20,
      morale: -10,
    },
  },
  {
    id: 'conflict-1',
    type: 'negative',
    title: '선수단 내부 불화',
    message: '선수단 내부에 불화설이 돌고 있습니다. 팀 사기가 크게 떨어졌습니다.',
    effect: {
      morale: -20,
    },
  },
  {
    id: 'media-criticism-1',
    type: 'negative',
    title: '언론 비판',
    message: '언론에서 팀의 전술과 운영을 강하게 비판했습니다. 팬들의 실망이 커졌습니다.',
    effect: {
      fanLoyalty: -15,
      morale: -10,
    },
  },
  {
    id: 'financial-loss-1',
    type: 'negative',
    title: '예상치 못한 지출',
    message: '구장 시설에 예상치 못한 문제가 발생했습니다. 긴급 수리가 필요합니다.',
    effect: {
      budget: -200000000, // -2억 원
    },
  },
  
  // 선택 이벤트
  {
    id: 'player-request-1',
    type: 'choice',
    title: '선수 요청',
    message: '주전 선수가 개인 트레이너 고용을 요청했습니다. 어떻게 하시겠습니까?',
    choices: [
      {
        label: '승인 (자금 -1억, 사기 +15)',
        effect: {
          budget: -100000000,
          morale: 15,
        },
      },
      {
        label: '거절 (사기 -10)',
        effect: {
          morale: -10,
        },
      },
    ],
  },
  {
    id: 'fan-event-1',
    type: 'choice',
    title: '팬 이벤트 제안',
    message: '팬클럽에서 대규모 팬 이벤트를 제안했습니다. 개최하시겠습니까?',
    choices: [
      {
        label: '개최 (자금 -0.5억, 팬 충성도 +20)',
        effect: {
          budget: -50000000,
          fanLoyalty: 20,
        },
      },
      {
        label: '거절 (팬 충성도 -5)',
        effect: {
          fanLoyalty: -5,
        },
      },
    ],
  },
  {
    id: 'scout-offer-1',
    type: 'choice',
    title: '스카우트 제안',
    message: '해외 리그에서 뛰어난 스카우트가 합류를 제안했습니다. 영입하시겠습니까?',
    choices: [
      {
        label: '영입 (자금 -2억, 스카우트 능력 향상)',
        effect: {
          budget: -200000000,
          // 스카우트 능력 향상은 시설 시스템에서 처리
        },
      },
      {
        label: '거절',
        effect: {},
      },
    ],
  },
];

/**
 * 랜덤 이벤트 발생 확률 (0 ~ 1)
 */
export const RANDOM_EVENT_CHANCE = 0.15; // 15% 확률

