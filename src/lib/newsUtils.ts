/**
 * [FIX] 뉴스 생성 논리 충돌 해결 유틸리티
 * 중복 이적 뉴스 방지 및 뉴스 무결성 검증
 */

export interface NewsItem {
  title: string;
  content: string;
  type?: string;
  playerId?: string;
  playerName?: string;
  fromTeam?: string;
  toTeam?: string;
}

/**
 * [FIX] 중복 이적 뉴스 방지
 * 뉴스 생성 루프 내에서 transferredPlayerIds Set을 사용하여 중복 이적 뉴스 방지
 * 
 * @param newsItems 파싱된 뉴스 목록
 * @returns 필터링된 뉴스 목록 (중복 이적 뉴스 제거)
 */
export function filterDuplicateTransferNews(newsItems: NewsItem[]): NewsItem[] {
  if (!newsItems || !Array.isArray(newsItems)) {
    console.warn('[NewsService] 뉴스 목록이 유효하지 않습니다.');
    return [];
  }

  // [FIX] transferredPlayerIds Set 자료구조 추가
  const transferredPlayerIds = new Set<string>();
  const filteredNews: NewsItem[] = [];

  // [FIX] 뉴스 생성 루프 내에서 중복 체크
  for (const news of newsItems) {
    if (!news || typeof news !== 'object') {
      continue;
    }

    // [FIX] 이적/트레이드 관련 뉴스인지 확인
    const isTransferNews = 
      news.type === 'TRADE' || 
      news.type === 'ROSTER' ||
      (news.title && (
        news.title.includes('이적') ||
        news.title.includes('트레이드') ||
        news.title.includes('영입') ||
        news.title.includes('FA')
      )) ||
      (news.content && (
        news.content.includes('이적') ||
        news.content.includes('트레이드') ||
        news.content.includes('영입') ||
        news.content.includes('FA')
      ));

    if (isTransferNews) {
      // [FIX] 선수 ID 또는 이름 추출
      const playerId = news.playerId || news.playerName || '';
      
      // [FIX] 뉴스 제목/내용에서 선수 이름 추출 시도
      let extractedPlayerName = '';
      if (!playerId && news.title) {
        // "OOO 선수 이적" 패턴에서 선수 이름 추출
        const nameMatch = news.title.match(/([가-힣a-zA-Z\s]+?)\s*(?:선수|이적|트레이드|영입|FA)/);
        if (nameMatch && nameMatch[1]) {
          extractedPlayerName = nameMatch[1].trim();
        }
      }
      
      if (!playerId && !extractedPlayerName && news.content) {
        // 내용에서 선수 이름 추출
        const nameMatch = news.content.match(/([가-힣a-zA-Z\s]+?)\s*(?:선수|이|가|을|를)\s*(?:이적|트레이드|영입)/);
        if (nameMatch && nameMatch[1]) {
          extractedPlayerName = nameMatch[1].trim();
        }
      }

      const identifier = playerId || extractedPlayerName;
      
      // [FIX] 해당 선수의 ID가 이미 Set에 있는지 확인
      if (identifier && transferredPlayerIds.has(identifier.toLowerCase().trim())) {
        console.warn(
          `[NewsService] 중복 이적 뉴스 감지: ${identifier} - 스킵됨\n` +
          `  제목: ${news.title}\n` +
          `  내용: ${news.content?.substring(0, 50)}...`
        );
        continue; // [FIX] 뉴스 생성 스킵
      }

      // [FIX] 선수 ID를 Set에 추가 (Atomic Operation: 한 선수의 상태 변경은 한 번만)
      if (identifier) {
        transferredPlayerIds.add(identifier.toLowerCase().trim());
      }
    }

    // [FIX] 중복이 아닌 뉴스는 필터링된 목록에 추가
    filteredNews.push(news);
  }

  const removedCount = newsItems.length - filteredNews.length;
  if (removedCount > 0) {
    console.log(
      `[NewsService] 중복 이적 뉴스 필터링 완료: ${removedCount}개 제거됨 (총 ${newsItems.length}개 → ${filteredNews.length}개)`
    );
  }

  return filteredNews;
}

/**
 * [FIX] 뉴스 무결성 검증
 * 논리적 모순이 있는 뉴스를 감지하고 제거
 * 
 * @param newsItems 뉴스 목록
 * @returns 검증된 뉴스 목록
 */
export function validateNewsIntegrity(newsItems: NewsItem[]): NewsItem[] {
  if (!newsItems || !Array.isArray(newsItems)) {
    return [];
  }

  const validatedNews: NewsItem[] = [];
  const playerTeamMap = new Map<string, string>(); // 선수 ID/이름 -> 현재 소속 팀

  for (const news of newsItems) {
    if (!news || typeof news !== 'object') {
      continue;
    }

    // 이적 관련 뉴스인 경우
    if (news.type === 'TRADE' || news.type === 'ROSTER') {
      const playerId = news.playerId || news.playerName || '';
      const fromTeam = news.fromTeam || '';
      const toTeam = news.toTeam || '';

      if (playerId && toTeam) {
        const currentTeam = playerTeamMap.get(playerId.toLowerCase().trim());
        
        // [FIX] 논리적 모순 검증: 선수가 이미 다른 팀으로 이적했다면 이 뉴스는 무효
        if (currentTeam && currentTeam !== fromTeam) {
          console.warn(
            `[NewsService] 논리적 모순 감지: ${playerId}는 이미 ${currentTeam} 소속인데 ${fromTeam}에서 ${toTeam}으로 이적 뉴스 생성됨 - 스킵`
          );
          continue;
        }

        // [FIX] 선수의 현재 소속 팀 업데이트
        playerTeamMap.set(playerId.toLowerCase().trim(), toTeam);
      }
    }

    validatedNews.push(news);
  }

  return validatedNews;
}

/**
 * [FIX] 뉴스 생성 트랜잭션 처리 (통합 함수)
 * 중복 이적 뉴스 방지 + 논리적 모순 검증
 * 
 * @param newsItems 원본 뉴스 목록
 * @returns 검증 및 필터링된 뉴스 목록
 */
export function processNewsItems(newsItems: NewsItem[]): NewsItem[] {
  if (!newsItems || !Array.isArray(newsItems)) {
    return [];
  }

  // [FIX] 1단계: 중복 이적 뉴스 필터링
  const deduplicatedNews = filterDuplicateTransferNews(newsItems);

  // [FIX] 2단계: 논리적 모순 검증
  const validatedNews = validateNewsIntegrity(deduplicatedNews);

  return validatedNews;
}

