/**
 * [NEW] 외국인 영입 유예 기간 시스템
 * AI가 외국인 선수를 입도선매하기 전, offerWindow 상태를 두어 유저가 재오퍼할 수 있는 로직
 */

export interface ForeignPlayer {
  id: string;
  name: string;
  position: string;
  nationality: string;
  desiredSalary: number; // 희망 연봉 (원 단위)
  desiredBonus: number; // 희망 계약금 (원 단위)
  totalCap: number; // 총액 (원 단위)
  [key: string]: any;
}

export interface OfferWindow {
  playerId: string;
  playerName: string;
  startTime: number; // 시작 시간 (timestamp)
  endTime: number; // 종료 시간 (timestamp)
  duration: number; // 유예 기간 (밀리초, 기본값: 2일 = 172800000ms)
  currentOffers: Array<{
    teamId: string;
    teamName: string;
    salary: number;
    bonus: number;
    totalCap: number;
    timestamp: number;
  }>; // 현재 제안 목록
  status: 'OPEN' | 'CLOSED' | 'ACCEPTED';
}

const DEFAULT_OFFER_WINDOW_DURATION = 2 * 24 * 60 * 60 * 1000; // [NEW] 2일 (밀리초)

/**
 * [NEW] 외국인 영입 유예 기간 생성
 * AI가 외국인 선수를 입도선매하기 전, offerWindow 상태를 두어 유저가 재오퍼할 수 있도록 함
 * 
 * @param player 외국인 선수 정보
 * @param duration 유예 기간 (밀리초, 기본값: 2일)
 * @returns OfferWindow 객체
 */
export function createOfferWindow(
  player: ForeignPlayer,
  duration: number = DEFAULT_OFFER_WINDOW_DURATION
): OfferWindow {
  const now = Date.now();

  return {
    playerId: player.id,
    playerName: player.name,
    startTime: now,
    endTime: now + duration,
    duration,
    currentOffers: [],
    status: 'OPEN',
  };
}

/**
 * [NEW] 유예 기간 내 제안 추가
 * 
 * @param offerWindow OfferWindow 객체
 * @param teamId 팀 ID
 * @param teamName 팀 이름
 * @param salary 제안 연봉
 * @param bonus 제안 계약금
 * @returns 업데이트된 OfferWindow
 */
export function addOfferToWindow(
  offerWindow: OfferWindow,
  teamId: string,
  teamName: string,
  salary: number,
  bonus: number
): OfferWindow {
  if (offerWindow.status !== 'OPEN') {
    console.warn(
      `[TransferMarket] OfferWindow가 이미 닫혔습니다: ${offerWindow.playerName}`
    );
    return offerWindow;
  }

  const now = Date.now();
  if (now > offerWindow.endTime) {
    console.warn(
      `[TransferMarket] OfferWindow 기간이 만료되었습니다: ${offerWindow.playerName}`
    );
    return { ...offerWindow, status: 'CLOSED' };
  }

  // [NEW] 기존 제안이 있으면 업데이트, 없으면 추가
  const existingOfferIndex = offerWindow.currentOffers.findIndex(
    offer => offer.teamId === teamId
  );

  const newOffer = {
    teamId,
    teamName,
    salary,
    bonus,
    totalCap: salary + bonus,
    timestamp: now,
  };

  const updatedOffers = [...offerWindow.currentOffers];
  
  if (existingOfferIndex >= 0) {
    // [NEW] 기존 제안 업데이트 (재오퍼)
    updatedOffers[existingOfferIndex] = newOffer;
    console.log(
      `[TransferMarket] 재오퍼 추가: ${teamName} → ${offerWindow.playerName} ` +
      `(연봉: ${(salary / 100000000).toFixed(1)}억, 계약금: ${(bonus / 100000000).toFixed(1)}억)`
    );
  } else {
    // [NEW] 새 제안 추가
    updatedOffers.push(newOffer);
    console.log(
      `[TransferMarket] 새 제안 추가: ${teamName} → ${offerWindow.playerName} ` +
      `(연봉: ${(salary / 100000000).toFixed(1)}억, 계약금: ${(bonus / 100000000).toFixed(1)}억)`
    );
  }

  return {
    ...offerWindow,
    currentOffers: updatedOffers,
  };
}

/**
 * [NEW] 유예 기간 종료 및 최종 결정
 * 
 * @param offerWindow OfferWindow 객체
 * @param player 외국인 선수 정보
 * @returns 최종 계약 결과
 */
export function finalizeOfferWindow(
  offerWindow: OfferWindow,
  player: ForeignPlayer
): {
  accepted: boolean;
  winningTeam?: {
    teamId: string;
    teamName: string;
    salary: number;
    bonus: number;
    totalCap: number;
  };
  message: string;
} {
  if (offerWindow.status !== 'OPEN') {
    return {
      accepted: false,
      message: 'OfferWindow가 이미 처리되었습니다.',
    };
  }

  const now = Date.now();
  if (now < offerWindow.endTime) {
    return {
      accepted: false,
      message: '아직 유예 기간이 남았습니다.',
    };
  }

  // [NEW] 최고 제안 선택 (총액 기준)
  if (offerWindow.currentOffers.length === 0) {
    return {
      accepted: false,
      message: '제안이 없어 계약이 성사되지 않았습니다.',
    };
  }

  // [NEW] 총액이 가장 높은 제안 선택
  const winningOffer = offerWindow.currentOffers.reduce((best, current) => {
    return current.totalCap > best.totalCap ? current : best;
  });

  // [NEW] 선수의 희망 금액과 비교
  const playerDesiredTotal = player.desiredSalary + player.desiredBonus;
  
  if (winningOffer.totalCap >= playerDesiredTotal) {
    return {
      accepted: true,
      winningTeam: {
        teamId: winningOffer.teamId,
        teamName: winningOffer.teamName,
        salary: winningOffer.salary,
        bonus: winningOffer.bonus,
        totalCap: winningOffer.totalCap,
      },
      message: `${winningOffer.teamName}이 ${offerWindow.playerName}과 계약했습니다. ` +
        `(연봉: ${(winningOffer.salary / 100000000).toFixed(1)}억, ` +
        `계약금: ${(winningOffer.bonus / 100000000).toFixed(1)}억)`,
    };
  } else {
    return {
      accepted: false,
      message: `제안 금액이 부족하여 ${offerWindow.playerName}과 계약이 성사되지 않았습니다.`,
    };
  }
}

/**
 * [NEW] 유예 기간 상태 확인
 * 
 * @param offerWindow OfferWindow 객체
 * @returns 유예 기간 상태 정보
 */
export function getOfferWindowStatus(offerWindow: OfferWindow): {
  isOpen: boolean;
  timeRemaining: number; // 남은 시간 (밀리초)
  timeRemainingText: string; // 남은 시간 텍스트
  offerCount: number;
} {
  const now = Date.now();
  const isOpen = offerWindow.status === 'OPEN' && now < offerWindow.endTime;
  const timeRemaining = Math.max(0, offerWindow.endTime - now);
  
  // [NEW] 남은 시간 텍스트 변환
  const hours = Math.floor(timeRemaining / (60 * 60 * 1000));
  const minutes = Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000));
  const timeRemainingText = hours > 0 
    ? `${hours}시간 ${minutes}분`
    : `${minutes}분`;

  return {
    isOpen,
    timeRemaining,
    timeRemainingText,
    offerCount: offerWindow.currentOffers.length,
  };
}

