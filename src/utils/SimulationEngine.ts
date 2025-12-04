/**
 * [NEW] 게임 진행 속도 제어
 * 고속 스킵 기능 및 렌더링 생략 로직
 */

/**
 * [NEW] 시뮬레이션 진행 상태
 */
export interface SimulationState {
  currentDate: string; // 현재 날짜 (YYYY-MM-DD)
  daysElapsed: number; // 경과 일수
  eventsProcessed: number; // 처리된 이벤트 수
  [key: string]: any;
}

/**
 * [NEW] 시뮬레이션 엔진 클래스
 */
export class SimulationEngine {
  private state: SimulationState;

  constructor(initialDate: string = '2026-01-01') {
    this.state = {
      currentDate: initialDate,
      daysElapsed: 0,
      eventsProcessed: 0,
    };
  }

  /**
   * [NEW] 고속 스킵 기능
   * '다음 이벤트까지 진행' 버튼을 위해, 렌더링을 생략하고 로직만 수행
   * 
   * @param days 진행할 일수
   * @param onEvent 발생한 이벤트 콜백 (선택적)
   * @returns 진행 결과
   */
  async fastForward(
    days: number,
    onEvent?: (event: any) => void
  ): Promise<{
    newDate: string;
    daysElapsed: number;
    eventsProcessed: number;
    events: any[];
  }> {
    const events: any[] = [];
    let currentDate = new Date(this.state.currentDate);
    
    // [NEW] 렌더링 생략하고 로직만 수행
    for (let i = 0; i < days; i++) {
      // [NEW] 날짜 진행
      currentDate.setDate(currentDate.getDate() + 1);
      
      // [NEW] 이벤트 발생 체크 (예: 15% 확률)
      if (Math.random() < 0.15) {
        // [NEW] 이벤트 발생 (실제 이벤트는 EventManager에서 처리)
        const event = {
          id: `event-${Date.now()}-${i}`,
          date: currentDate.toISOString().split('T')[0],
          type: 'random',
        };
        
        events.push(event);
        
        if (onEvent) {
          onEvent(event);
        }
      }
    }

    // [NEW] 상태 업데이트
    this.state.currentDate = currentDate.toISOString().split('T')[0];
    this.state.daysElapsed += days;
    this.state.eventsProcessed += events.length;

    return {
      newDate: this.state.currentDate,
      daysElapsed: this.state.daysElapsed,
      eventsProcessed: this.state.eventsProcessed,
      events,
    };
  }

  /**
   * [NEW] 현재 날짜 조회
   */
  getCurrentDate(): string {
    return this.state.currentDate;
  }

  /**
   * [NEW] 상태 초기화
   */
  reset(initialDate: string = '2026-01-01'): void {
    this.state = {
      currentDate: initialDate,
      daysElapsed: 0,
      eventsProcessed: 0,
    };
  }

  /**
   * [NEW] 상태 조회
   */
  getState(): SimulationState {
    return { ...this.state };
  }
}

/**
 * [NEW] 전역 SimulationEngine 인스턴스 (싱글톤)
 */
let simulationEngineInstance: SimulationEngine | null = null;

/**
 * [NEW] SimulationEngine 인스턴스 가져오기
 */
export function getSimulationEngine(initialDate?: string): SimulationEngine {
  if (!simulationEngineInstance) {
    simulationEngineInstance = new SimulationEngine(initialDate);
  }
  return simulationEngineInstance;
}

