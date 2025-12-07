/**
 * [TEST] 트레이드 NFS 필터링 테스트
 * NFS 필터링이 정상 작동하는지 확인합니다.
 */

import { isNFSPlayer, filterNFSPlayers, Player, TradeSuggestion } from '../tradeFilter';

describe('Trade Filter', () => {
  const createPlayer = (
    name: string,
    stats?: any,
    age?: number,
    salary?: number
  ): Player => ({
    name,
    stats: stats || { contact: 50, power: 50 },
    age: age || 25,
    salary: salary || 500000000, // 5억
  });

  describe('isNFSPlayer', () => {
    it('프랜차이즈 스타는 NFS로 판정해야 함', () => {
      const player = createPlayer('임찬규');
      const result = isNFSPlayer(player);

      expect(result.isNFS).toBe(true);
      expect(result.reason?.reason).toBe('FRANCHISE_STAR');
    });

    it('일반 선수는 NFS가 아니어야 함', () => {
      const player = createPlayer('홍길동');
      const result = isNFSPlayer(player);

      expect(result.isNFS).toBe(false);
    });

    it('보호선수는 NFS로 판정해야 함', () => {
      const player = createPlayer('보호선수', undefined, undefined, undefined);
      const protectedPlayers = [{ name: '보호선수' }];

      const result = isNFSPlayer(player, protectedPlayers);

      expect(result.isNFS).toBe(true);
      expect(result.reason?.reason).toBe('PROTECTED');
    });

    it('핵심 코어 선수(S급, 30세 이하)는 NFS로 판정해야 함', () => {
      const player = createPlayer('S급선수', { contact: 60, power: 60 }, 28);
      const result = isNFSPlayer(player);

      expect(result.isNFS).toBe(true);
      expect(result.reason?.reason).toBe('CORE_PLAYER');
    });

    it('고액 연봉 핵심 선수는 NFS로 판정해야 함', () => {
      const player = createPlayer('고액선수', { contact: 60, power: 60 }, 32, 12000000000); // 12억
      const result = isNFSPlayer(player);

      expect(result.isNFS).toBe(true);
      expect(result.reason?.reason).toBe('HIGH_SALARY_CORE');
    });
  });

  describe('filterNFSPlayers', () => {
    it('NFS 선수를 필터링해야 함', () => {
      const suggestions: TradeSuggestion[] = [
        { playerName: '임찬규', fromTeam: 'LG', toTeam: 'KT' },
        { playerName: '홍길동', fromTeam: 'LG', toTeam: 'KT' },
      ];

      const allPlayers: Player[] = [
        createPlayer('임찬규'),
        createPlayer('홍길동'),
      ];

      const result = filterNFSPlayers(suggestions, allPlayers);

      // 임찬규는 NFS이므로 필터링되어야 함
      expect(result.filteredSuggestions.length).toBe(1);
      expect(result.filteredSuggestions[0].playerName).toBe('홍길동');
      expect(result.nfsLog.length).toBe(1);
      expect(result.nfsLog[0].playerName).toBe('임찬규');
    });

    it('모든 선수가 NFS가 아니면 모두 통과해야 함', () => {
      const suggestions: TradeSuggestion[] = [
        { playerName: '홍길동', fromTeam: 'LG', toTeam: 'KT' },
        { playerName: '김철수', fromTeam: 'LG', toTeam: 'KT' },
      ];

      const allPlayers: Player[] = [
        createPlayer('홍길동'),
        createPlayer('김철수'),
      ];

      const result = filterNFSPlayers(suggestions, allPlayers);

      expect(result.filteredSuggestions.length).toBe(2);
      expect(result.nfsLog.length).toBe(0);
    });

    it('선수를 찾을 수 없으면 그대로 포함해야 함', () => {
      const suggestions: TradeSuggestion[] = [
        { playerName: '알수없는선수', fromTeam: 'LG', toTeam: 'KT' },
      ];

      const allPlayers: Player[] = [];

      const result = filterNFSPlayers(suggestions, allPlayers);

      // 선수를 찾을 수 없으면 그대로 포함 (AI가 생성한 제안이므로)
      expect(result.filteredSuggestions.length).toBe(1);
    });
  });
});

