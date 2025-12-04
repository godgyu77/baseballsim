/**
 * [NEW] 이벤트 시스템 고도화
 * 카테고리별 이벤트 분리 및 랜덤 이벤트 발생 로직
 */

import { RandomEvent } from '../lib/utils';

/**
 * [NEW] 이벤트 카테고리
 */
export type EventCategory = 'GM_MODE' | 'CAREER_MODE' | 'POSITIVE' | 'NEGATIVE' | 'CHOICE';

/**
 * [NEW] 확장된 이벤트 인터페이스
 */
export interface ExtendedEvent extends RandomEvent {
  category: EventCategory;
  probability?: number; // 발생 확률 (0 ~ 1, 기본값: 0.1)
  cooldown?: number; // 쿨다운 시간 (밀리초)
}

/**
 * [NEW] GM Mode 이벤트 (구단주 압박, 라커룸 불화, 팬들의 시위)
 */
export const GM_MODE_EVENTS: ExtendedEvent[] = [
  {
    id: 'owner-pressure-1',
    category: 'GM_MODE',
    type: 'negative',
    title: '구단주 압박',
    message: '구단주가 성적 개선을 요구하며 압박을 가하고 있습니다. "이번 시즌 성적이 나아지지 않으면 구조조정을 검토하겠다"는 경고를 받았습니다.',
    effect: {
      morale: -15,
      fanLoyalty: -10,
    },
    probability: 0.08,
  },
  {
    id: 'locker-room-conflict-1',
    category: 'GM_MODE',
    type: 'negative',
    title: '라커룸 불화',
    message: '선수단 내부에 심각한 불화가 발생했습니다. 베테랑 선수와 유망주 간의 갈등이 표면화되었습니다.',
    effect: {
      morale: -25,
      playerCondition: -15,
    },
    probability: 0.1,
  },
  {
    id: 'fan-protest-1',
    category: 'GM_MODE',
    type: 'negative',
    title: '팬들의 시위',
    message: '팬들이 구단 운영에 불만을 표시하며 구장 앞에서 시위를 벌이고 있습니다. 언론의 관심도 높아지고 있습니다.',
    effect: {
      fanLoyalty: -20,
      morale: -10,
    },
    probability: 0.07,
  },
  {
    id: 'owner-support-1',
    category: 'GM_MODE',
    type: 'positive',
    title: '구단주 지지',
    message: '구단주가 팀의 장기 계획을 지지하며 추가 투자를 약속했습니다. 선수단의 사기가 올라갔습니다.',
    effect: {
      morale: 20,
      budget: 500000000, // 5억 원
    },
    probability: 0.05,
  },
];

/**
 * [NEW] Career Mode 이벤트 (연애 시뮬레이션 요소, 라이벌 도발, 개인 스폰서 제안)
 */
export const CAREER_MODE_EVENTS: ExtendedEvent[] = [
  {
    id: 'romance-1',
    category: 'CAREER_MODE',
    type: 'choice',
    title: '연애 시뮬레이션 요소',
    message: '유명 스포츠 기자가 당신에게 관심을 보이고 있습니다. 개인적인 만남을 제안받았습니다. 어떻게 하시겠습니까?',
    choices: [
      {
        label: '만남 수락 (사기 +10, 팬 충성도 +5)',
        effect: {
          morale: 10,
          fanLoyalty: 5,
        },
      },
      {
        label: '거절 (사기 -5)',
        effect: {
          morale: -5,
        },
      },
    ],
    probability: 0.06,
  },
  {
    id: 'rival-taunt-1',
    category: 'CAREER_MODE',
    type: 'negative',
    title: '라이벌 도발',
    message: '다른 구단의 단장이 언론을 통해 당신의 운영 능력을 비판했습니다. "그 정도 실력으로는 우승은 꿈도 꾸지 마라"는 도발적인 발언을 했습니다.',
    effect: {
      morale: -15,
    },
    probability: 0.08,
  },
  {
    id: 'personal-sponsor-1',
    category: 'CAREER_MODE',
    type: 'choice',
    title: '개인 스폰서 제안',
    message: '대형 기업이 당신에게 개인 스폰서 계약을 제안했습니다. 계약하면 개인 수입이 늘어나지만, 일부 팬들이 비판할 수 있습니다.',
    choices: [
      {
        label: '계약 수락 (자금 +3억, 팬 충성도 -5)',
        effect: {
          budget: 300000000,
          fanLoyalty: -5,
        },
      },
      {
        label: '거절 (팬 충성도 +10)',
        effect: {
          fanLoyalty: 10,
        },
      },
    ],
    probability: 0.05,
  },
  {
    id: 'media-praise-1',
    category: 'CAREER_MODE',
    type: 'positive',
    title: '언론 찬사',
    message: '언론에서 당신의 리더십과 전략적 사고를 극찬했습니다. 업계에서 인정받는 단장으로 평가받고 있습니다.',
    effect: {
      morale: 15,
      fanLoyalty: 10,
    },
    probability: 0.07,
  },
];

/**
 * [NEW] 이벤트 매니저 클래스
 */
export class EventManager {
  private triggeredEvents: Set<string> = new Set(); // 발생한 이벤트 추적
  private eventCooldowns: Map<string, number> = new Map(); // 이벤트 쿨다운 추적

  /**
   * [NEW] 랜덤 이벤트 발생
   * Math.random() 확률에 따라 이벤트 발생
   * 
   * @param baseChance 기본 발생 확률 (기본값: 0.15)
   * @param category 필터링할 카테고리 (선택적)
   * @returns 발생한 이벤트 또는 null
   */
  triggerRandomEvent(
    baseChance: number = 0.15,
    category?: EventCategory
  ): ExtendedEvent | null {
    // [NEW] 기본 발생 확률 체크
    if (Math.random() > baseChance) {
      return null;
    }

    // [NEW] 카테고리별 이벤트 풀 선택
    let eventPool: ExtendedEvent[] = [];
    
    if (category === 'GM_MODE') {
      eventPool = GM_MODE_EVENTS;
    } else if (category === 'CAREER_MODE') {
      eventPool = CAREER_MODE_EVENTS;
    } else {
      // [NEW] 모든 카테고리 통합
      eventPool = [...GM_MODE_EVENTS, ...CAREER_MODE_EVENTS];
    }

    // [NEW] 쿨다운이 지난 이벤트만 필터링
    const now = Date.now();
    const availableEvents = eventPool.filter(event => {
      const cooldownEnd = this.eventCooldowns.get(event.id) || 0;
      return now >= cooldownEnd;
    });

    if (availableEvents.length === 0) {
      return null; // 사용 가능한 이벤트가 없음
    }

    // [NEW] 확률 가중치 적용하여 이벤트 선택
    const totalWeight = availableEvents.reduce((sum, event) => {
      return sum + (event.probability || 0.1);
    }, 0);

    let random = Math.random() * totalWeight;
    let selectedEvent: ExtendedEvent | null = null;

    for (const event of availableEvents) {
      const weight = event.probability || 0.1;
      random -= weight;
      if (random <= 0) {
        selectedEvent = event;
        break;
      }
    }

    if (!selectedEvent) {
      // [NEW] 폴백: 첫 번째 이벤트 선택
      selectedEvent = availableEvents[0];
    }

    // [NEW] 이벤트 발생 기록 및 쿨다운 설정
    this.triggeredEvents.add(selectedEvent.id);
    
    if (selectedEvent.cooldown) {
      this.eventCooldowns.set(selectedEvent.id, now + selectedEvent.cooldown);
    } else {
      // [NEW] 기본 쿨다운: 1시간
      this.eventCooldowns.set(selectedEvent.id, now + 60 * 60 * 1000);
    }

    return selectedEvent;
  }

  /**
   * [NEW] 이벤트 효과 적용
   * 선택지에 따라 스탯이나 자금이 변동되는 로직
   * 
   * @param event 이벤트
   * @param choiceIndex 선택한 선택지 인덱스 (선택 이벤트인 경우)
   * @returns 적용된 효과
   */
  applyEventEffect(
    event: ExtendedEvent,
    choiceIndex?: number
  ): {
    budget?: number;
    morale?: number;
    fanLoyalty?: number;
    playerCondition?: number;
    [key: string]: any;
  } {
    if (event.type === 'choice' && event.choices && choiceIndex !== undefined) {
      // [NEW] 선택 이벤트: 선택한 선택지의 효과 적용
      const selectedChoice = event.choices[choiceIndex];
      return selectedChoice?.effect || {};
    } else {
      // [NEW] 일반 이벤트: 기본 효과 적용
      return event.effect || {};
    }
  }

  /**
   * [NEW] 이벤트 발생 기록 초기화
   */
  reset(): void {
    this.triggeredEvents.clear();
    this.eventCooldowns.clear();
  }
}

/**
 * [NEW] 전역 EventManager 인스턴스 (싱글톤)
 */
let eventManagerInstance: EventManager | null = null;

/**
 * [NEW] EventManager 인스턴스 가져오기
 */
export function getEventManager(): EventManager {
  if (!eventManagerInstance) {
    eventManagerInstance = new EventManager();
  }
  return eventManagerInstance;
}

