/**
 * [MONITORING] 토큰 사용량 및 NFS 필터링 통계 수집 시스템
 * API 호출 시 토큰 사용량을 추적하고, NFS 필터링 통계를 수집합니다.
 */

export interface TokenUsageStats {
  timestamp: number;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  historyLength: number;
  compressedHistoryLength?: number;
  compressionRatio?: number;
}

export interface NFSFilterStats {
  timestamp: number;
  totalSuggestions: number;
  filteredCount: number;
  nfsReasons: {
    FRANCHISE_STAR: number;
    CORE_PLAYER: number;
    PROTECTED: number;
    RECENT_ACQUISITION: number;
    HIGH_SALARY_CORE: number;
  };
  filteredPlayers: Array<{
    playerName: string;
    reason: string;
    description: string;
  }>;
}

class MonitoringService {
  private tokenStats: TokenUsageStats[] = [];
  private nfsStats: NFSFilterStats[] = [];
  private maxStatsHistory = 100; // 최대 100개 기록 유지

  /**
   * 토큰 사용량 기록
   */
  recordTokenUsage(
    inputTokens: number,
    outputTokens: number,
    historyLength: number,
    compressedHistoryLength?: number
  ): void {
    const stats: TokenUsageStats = {
      timestamp: Date.now(),
      inputTokens,
      outputTokens,
      totalTokens: inputTokens + outputTokens,
      historyLength,
      compressedHistoryLength,
      compressionRatio: compressedHistoryLength
        ? Math.round((1 - compressedHistoryLength / historyLength) * 100)
        : undefined,
    };

    this.tokenStats.push(stats);

    // 최대 기록 수 제한
    if (this.tokenStats.length > this.maxStatsHistory) {
      this.tokenStats.shift();
    }

    // 콘솔 로그 (개발 환경)
    if (process.env.NODE_ENV === 'development') {
      console.log('[Token Monitoring]', {
        input: inputTokens,
        output: outputTokens,
        total: stats.totalTokens,
        history: `${historyLength} → ${compressedHistoryLength || historyLength}`,
        compression: stats.compressionRatio ? `${stats.compressionRatio}%` : 'N/A',
      });
    }
  }

  /**
   * NFS 필터링 통계 기록
   */
  recordNFSFiltering(
    totalSuggestions: number,
    filteredCount: number,
    nfsReasons: NFSFilterStats['nfsReasons'],
    filteredPlayers: NFSFilterStats['filteredPlayers']
  ): void {
    const stats: NFSFilterStats = {
      timestamp: Date.now(),
      totalSuggestions,
      filteredCount,
      nfsReasons,
      filteredPlayers,
    };

    this.nfsStats.push(stats);

    // 최대 기록 수 제한
    if (this.nfsStats.length > this.maxStatsHistory) {
      this.nfsStats.shift();
    }

    // 콘솔 로그 (개발 환경)
    if (process.env.NODE_ENV === 'development') {
      console.log('[NFS Filter Monitoring]', {
        total: totalSuggestions,
        filtered: filteredCount,
        ratio: `${Math.round((filteredCount / totalSuggestions) * 100)}%`,
        reasons: nfsReasons,
      });
    }
  }

  /**
   * 토큰 사용량 통계 조회
   */
  getTokenStats(): {
    total: number;
    average: number;
    recent: TokenUsageStats[];
    compressionAverage?: number;
  } {
    if (this.tokenStats.length === 0) {
      return {
        total: 0,
        average: 0,
        recent: [],
      };
    }

    const total = this.tokenStats.reduce((sum, stat) => sum + stat.totalTokens, 0);
    const average = Math.round(total / this.tokenStats.length);
    const recent = this.tokenStats.slice(-10); // 최근 10개

    const compressionStats = this.tokenStats.filter(s => s.compressionRatio !== undefined);
    const compressionAverage =
      compressionStats.length > 0
        ? Math.round(
            compressionStats.reduce((sum, stat) => sum + (stat.compressionRatio || 0), 0) /
              compressionStats.length
          )
        : undefined;

    return {
      total,
      average,
      recent,
      compressionAverage,
    };
  }

  /**
   * NFS 필터링 통계 조회
   */
  getNFSStats(): {
    totalFiltered: number;
    averageFiltered: number;
    reasonBreakdown: {
      FRANCHISE_STAR: number;
      CORE_PLAYER: number;
      PROTECTED: number;
      RECENT_ACQUISITION: number;
      HIGH_SALARY_CORE: number;
    };
    recent: NFSFilterStats[];
  } {
    if (this.nfsStats.length === 0) {
      return {
        totalFiltered: 0,
        averageFiltered: 0,
        reasonBreakdown: {
          FRANCHISE_STAR: 0,
          CORE_PLAYER: 0,
          PROTECTED: 0,
          RECENT_ACQUISITION: 0,
          HIGH_SALARY_CORE: 0,
        },
        recent: [],
      };
    }

    const totalFiltered = this.nfsStats.reduce((sum, stat) => sum + stat.filteredCount, 0);
    const averageFiltered = Math.round(totalFiltered / this.nfsStats.length);
    const recent = this.nfsStats.slice(-10); // 최근 10개

    const reasonBreakdown = this.nfsStats.reduce(
      (acc, stat) => {
        acc.FRANCHISE_STAR += stat.nfsReasons.FRANCHISE_STAR;
        acc.CORE_PLAYER += stat.nfsReasons.CORE_PLAYER;
        acc.PROTECTED += stat.nfsReasons.PROTECTED;
        acc.RECENT_ACQUISITION += stat.nfsReasons.RECENT_ACQUISITION;
        acc.HIGH_SALARY_CORE += stat.nfsReasons.HIGH_SALARY_CORE;
        return acc;
      },
      {
        FRANCHISE_STAR: 0,
        CORE_PLAYER: 0,
        PROTECTED: 0,
        RECENT_ACQUISITION: 0,
        HIGH_SALARY_CORE: 0,
      }
    );

    return {
      totalFiltered,
      averageFiltered,
      reasonBreakdown,
      recent,
    };
  }

  /**
   * 전체 통계 요약 (대시보드용)
   */
  getSummary(): {
    tokenStats: ReturnType<typeof this.getTokenStats>;
    nfsStats: ReturnType<typeof this.getNFSStats>;
    timestamp: number;
  } {
    return {
      tokenStats: this.getTokenStats(),
      nfsStats: this.getNFSStats(),
      timestamp: Date.now(),
    };
  }

  /**
   * 통계 초기화
   */
  clear(): void {
    this.tokenStats = [];
    this.nfsStats = [];
  }
}

// 싱글톤 인스턴스
export const monitoringService = new MonitoringService();

/**
 * [HELPER] API 응답에서 토큰 사용량 추출 (Gemini API)
 * 실제 API 응답 객체에서 토큰 정보를 추출합니다.
 */
export function extractTokenUsageFromResponse(response: any): {
  inputTokens: number;
  outputTokens: number;
} {
  // Gemini API 응답 구조에 따라 토큰 정보 추출
  // 실제 구조는 API 문서 참조 필요
  const usageMetadata = response?.usageMetadata || response?.usage || {};
  
  return {
    inputTokens: usageMetadata.promptTokenCount || usageMetadata.inputTokens || 0,
    outputTokens: usageMetadata.candidatesTokenCount || usageMetadata.outputTokens || 0,
  };
}

