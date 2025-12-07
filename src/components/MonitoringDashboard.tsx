/**
 * [MONITORING] 모니터링 대시보드 컴포넌트
 * 토큰 사용량 및 NFS 필터링 통계를 시각화합니다.
 */

import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Filter, X } from 'lucide-react';
import { monitoringService } from '../lib/monitoring';

interface MonitoringDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MonitoringDashboard({ isOpen, onClose }: MonitoringDashboardProps) {
  const [stats, setStats] = useState(monitoringService.getSummary());

  useEffect(() => {
    if (!isOpen) return;

    // 1초마다 통계 업데이트
    const interval = setInterval(() => {
      setStats(monitoringService.getSummary());
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const { tokenStats, nfsStats } = stats;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-baseball-green" />
            <h2 className="text-xl font-bold">모니터링 대시보드</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 내용 */}
        <div className="p-6 space-y-6">
          {/* 토큰 사용량 통계 */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-baseball-green" />
              <h3 className="text-lg font-semibold">토큰 사용량 통계</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">총 토큰</div>
                <div className="text-2xl font-bold text-baseball-green">
                  {tokenStats.total.toLocaleString()}
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">평균 토큰</div>
                <div className="text-2xl font-bold text-blue-600">
                  {tokenStats.average.toLocaleString()}
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">압축률</div>
                <div className="text-2xl font-bold text-purple-600">
                  {tokenStats.compressionAverage ? `${tokenStats.compressionAverage}%` : 'N/A'}
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">기록 수</div>
                <div className="text-2xl font-bold text-orange-600">
                  {tokenStats.recent.length}
                </div>
              </div>
            </div>

            {/* 최근 토큰 사용량 */}
            {tokenStats.recent.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">최근 토큰 사용량</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {tokenStats.recent.slice().reverse().map((stat, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                      <span>
                        {new Date(stat.timestamp).toLocaleTimeString()}
                      </span>
                      <span className="font-mono">
                        {stat.totalTokens.toLocaleString()} 토큰
                        {stat.compressionRatio && (
                          <span className="text-green-600 ml-2">
                            ({stat.compressionRatio}% 압축)
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* NFS 필터링 통계 */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-baseball-green" />
              <h3 className="text-lg font-semibold">NFS 필터링 통계</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">총 필터링</div>
                <div className="text-2xl font-bold text-red-600">
                  {nfsStats.totalFiltered}
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">평균 필터링</div>
                <div className="text-2xl font-bold text-yellow-600">
                  {nfsStats.averageFiltered}
                </div>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">기록 수</div>
                <div className="text-2xl font-bold text-indigo-600">
                  {nfsStats.recent.length}
                </div>
              </div>
            </div>

            {/* 사유별 분류 */}
            {Object.values(nfsStats.reasonBreakdown).some(v => v > 0) && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">사유별 필터링</h4>
                <div className="space-y-2">
                  {Object.entries(nfsStats.reasonBreakdown).map(([reason, count]) => {
                    if (count === 0) return null;
                    const labels: Record<string, string> = {
                      FRANCHISE_STAR: '프랜차이즈 스타',
                      CORE_PLAYER: '핵심 코어',
                      PROTECTED: '보호선수',
                      RECENT_ACQUISITION: '최근 영입',
                      HIGH_SALARY_CORE: '고액 연봉 핵심',
                    };
                    return (
                      <div key={reason} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
                        <span>{labels[reason] || reason}</span>
                        <span className="font-semibold text-red-600">{count}명</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 최근 필터링 기록 */}
            {nfsStats.recent.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">최근 필터링 기록</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {nfsStats.recent.slice().reverse().map((stat, idx) => (
                    <div key={idx} className="text-sm bg-gray-50 p-2 rounded">
                      <div className="flex items-center justify-between mb-1">
                        <span>{new Date(stat.timestamp).toLocaleTimeString()}</span>
                        <span className="font-semibold">
                          {stat.filteredCount}/{stat.totalSuggestions} 필터링
                        </span>
                      </div>
                      {stat.filteredPlayers.length > 0 && (
                        <div className="text-xs text-gray-600 mt-1">
                          {stat.filteredPlayers.slice(0, 3).map(p => p.playerName).join(', ')}
                          {stat.filteredPlayers.length > 3 && '...'}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* 푸터 */}
        <div className="p-4 border-t bg-gray-50">
          <button
            onClick={() => {
              monitoringService.clear();
              setStats(monitoringService.getSummary());
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            통계 초기화
          </button>
        </div>
      </div>
    </div>
  );
}

