/**
 * [NEW] UI/UX 개선 유틸리티
 * 구단명 포맷팅 및 모바일 가독성 개선
 */

/**
 * [NEW] 구단명 포맷팅 함수
 * "서울 LG 트윈스" → "LG 트윈스"로 지역명을 정규식으로 제거
 * 
 * @param fullName 전체 구단명 (연고지 + 팀 이름)
 * @returns 포맷팅된 구단명 (지역명 제거)
 */
export function formatTeamName(fullName: string | null | undefined): string {
  if (!fullName || typeof fullName !== 'string') {
    return '우리 팀';
  }

  // [NEW] 정규식으로 지역명 제거
  // 패턴: 도시명(시/도/구/군) + 공백 + 팀명
  // 예: "서울 LG 트윈스" → "LG 트윈스"
  // 예: "부산 롯데 자이언츠" → "롯데 자이언츠"
  // 예: "인천 SSG 랜더스" → "SSG 랜더스"
  
  const cityPatterns = [
    /^서울\s+/i,
    /^부산\s+/i,
    /^대구\s+/i,
    /^인천\s+/i,
    /^광주\s+/i,
    /^대전\s+/i,
    /^울산\s+/i,
    /^수원\s+/i,
    /^성남\s+/i,
    /^고양\s+/i,
    /^용인\s+/i,
    /^부천\s+/i,
    /^안산\s+/i,
    /^안양\s+/i,
    /^평택\s+/i,
    /^시흥\s+/i,
    /^김포\s+/i,
    /^의정부\s+/i,
    /^광명\s+/i,
    /^파주\s+/i,
    /^이천\s+/i,
    /^오산\s+/i,
    /^의왕\s+/i,
    /^구리\s+/i,
    /^남양주\s+/i,
    /^하남\s+/i,
    /^양주\s+/i,
    /^포천\s+/i,
    /^여주\s+/i,
    /^양평\s+/i,
    /^동두천\s+/i,
    /^과천\s+/i,
    /^가평\s+/i,
    /^연천\s+/i,
    /^경기\s+/i,
    /^강원\s+/i,
    /^충북\s+/i,
    /^충남\s+/i,
    /^전북\s+/i,
    /^전남\s+/i,
    /^경북\s+/i,
    /^경남\s+/i,
    /^제주\s+/i,
    /^제주시\s+/i,
    /^제주도\s+/i,
    /^서울시\s+/i,
    /^부산시\s+/i,
    /^대구시\s+/i,
    /^인천시\s+/i,
    /^광주시\s+/i,
    /^대전시\s+/i,
    /^울산시\s+/i,
  ];

  let formattedName = fullName.trim();

  // [NEW] 각 지역명 패턴으로 제거 시도
  for (const pattern of cityPatterns) {
    formattedName = formattedName.replace(pattern, '');
  }

  // [NEW] 추가 패턴: "XX시", "XX도", "XX구", "XX군" 등으로 끝나는 경우
  formattedName = formattedName.replace(/^[가-힣]+(?:시|도|구|군|읍|면)\s+/i, '');

  // [NEW] 빈 문자열이면 원본 반환
  if (!formattedName.trim()) {
    return fullName;
  }

  return formattedName.trim();
}

/**
 * [NEW] 텍스트 말줄임표 처리
 * UI 영역을 넘치지 않도록 글자 수 제한
 * 
 * @param text 원본 텍스트
 * @param maxLength 최대 길이 (기본값: 50)
 * @returns 말줄임표 처리된 텍스트
 */
export function truncateText(text: string, maxLength: number = 50): string {
  if (!text || text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength - 3) + '...';
}

/**
 * [NEW] 모바일 환경 감지
 * 
 * @returns 모바일 환경 여부
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.innerWidth < 768;
}

/**
 * [NEW] 반응형 텍스트 크기 계산
 * 모바일: 작은 크기, 데스크톱: 큰 크기
 * 
 * @param mobileSize 모바일 크기 (rem)
 * @param desktopSize 데스크톱 크기 (rem)
 * @returns CSS 클래스 또는 스타일 객체
 */
export function getResponsiveTextSize(
  mobileSize: number = 0.875,
  desktopSize: number = 1
): string {
  // [NEW] Tailwind CSS 클래스 반환
  return `text-[${mobileSize}rem] sm:text-[${desktopSize}rem]`;
}

