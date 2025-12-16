/**
 * 리그 뷰어 컴포넌트
 * Football Manager 스타일의 2단 레이아웃으로 모든 구단의 로스터를 조회합니다.
 */

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllTeams, fetchTeamRoster } from '../services/leagueService';

export default function LeagueViewer() {
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pitchers' | 'batters'>('pitchers');

  // 모든 구단 조회
  const { data: teams, isLoading: teamsLoading } = useQuery({
    queryKey: ['teams'],
    queryFn: fetchAllTeams,
  });

  // 선택된 팀의 로스터 조회
  const { data: roster, isLoading: rosterLoading } = useQuery({
    queryKey: ['roster', selectedTeamId],
    queryFn: () => fetchTeamRoster(selectedTeamId!),
    enabled: !!selectedTeamId,
  });

  // 선수를 투수와 타자로 분류
  const pitchers = roster?.filter(p => p.position === '투수') || [];
  const batters = roster?.filter(p => p.position !== '투수') || [];

  // 총 연봉 계산
  const totalSalary = roster?.reduce((sum, player) => {
    return sum + (player.salary ?? 0);
  }, 0) || 0;

  // 스탯 값 포맷팅
  const formatStat = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return '-';
    return value.toString();
  };

  // 구속 범위 포맷팅
  const formatVelocity = (min: number | null | undefined, max: number | null | undefined): string => {
    if (min === null || min === undefined) return '-';
    if (max === null || max === undefined) return `${min}+`;
    if (min === max) return min.toString();
    return `${min}-${max}`;
  };

  // 연봉 포맷팅 (억 단위)
  const formatSalary = (salary: number | null | undefined): string => {
    if (salary === null || salary === undefined) return '-';
    const eok = salary / 100000000;
    return `${eok.toFixed(1)}억`;
  };

  // 예산 포맷팅 (억 단위)
  const formatBudget = (budget: number | null | undefined): string => {
    if (budget === null || budget === undefined) return '-';
    const eok = budget / 100000000;
    return `${eok.toFixed(1)}억`;
  };

  // 선택된 팀 정보
  const selectedTeam = teams?.find(t => t.id === selectedTeamId);

  return (
    <div className="w-full h-screen bg-slate-900 text-slate-100 flex overflow-hidden">
      {/* 좌측 사이드바 (w-64) */}
      <div className="w-64 border-r border-slate-700 bg-slate-800 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4 text-yellow-400 border-b border-slate-700 pb-2">
            구단 목록
          </h2>

          {/* 구단 목록 로딩 스켈레톤 */}
          {teamsLoading && (
            <div className="space-y-2">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 bg-slate-700 rounded-lg animate-pulse"
                />
              ))}
            </div>
          )}

          {/* 구단 목록 */}
          {teams && teams.length > 0 && (
            <div className="space-y-2">
              {teams.map((team) => (
                <button
                  key={team.id}
                  onClick={() => {
                    setSelectedTeamId(team.id);
                    setActiveTab('pitchers'); // 탭 초기화
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors border ${
                    selectedTeamId === team.id
                      ? 'bg-blue-600 border-blue-500 text-white shadow-lg'
                      : 'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600'
                  }`}
                >
                  <div className="font-semibold">{team.name}</div>
                  {team.budget !== null && team.budget !== undefined && (
                    <div className="text-xs text-slate-300 mt-1">
                      예산: {formatBudget(team.budget)}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 우측 메인 패널 (flex-1) */}
      <div className="flex-1 overflow-y-auto bg-slate-900">
        {!selectedTeamId ? (
          <div className="flex items-center justify-center h-full text-slate-400 text-xl">
            구단을 선택하세요
          </div>
        ) : (
          <div className="p-6">
            {/* 상단: 구단 정보 및 총 연봉 */}
            <div className="mb-6 bg-slate-800 rounded-lg p-4 border border-slate-700">
              <h2 className="text-2xl font-bold text-yellow-400 mb-2">
                {selectedTeam?.name || '선택된 구단'}
              </h2>
              <div className="flex items-center gap-6 text-slate-300">
                <div>
                  <span className="text-slate-400">총 연봉: </span>
                  <span className="font-semibold text-white">
                    {formatSalary(totalSalary)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">선수 수: </span>
                  <span className="font-semibold text-white">
                    {roster?.length || 0}명
                  </span>
                </div>
                {selectedTeam?.budget && (
                  <div>
                    <span className="text-slate-400">예산: </span>
                    <span className="font-semibold text-white">
                      {formatBudget(selectedTeam.budget)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* 로딩 스켈레톤 */}
            {rosterLoading && (
              <div className="space-y-4">
                <div className="h-12 bg-slate-800 rounded-lg animate-pulse" />
                <div className="space-y-2">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className="h-10 bg-slate-800 rounded animate-pulse"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 로스터 데이터 */}
            {roster && !rosterLoading && (
              <div>
                {/* 탭 메뉴 */}
                <div className="flex gap-2 mb-4 border-b border-slate-700">
                  <button
                    onClick={() => setActiveTab('pitchers')}
                    className={`px-6 py-2 font-semibold transition-colors ${
                      activeTab === 'pitchers'
                        ? 'text-blue-400 border-b-2 border-blue-400'
                        : 'text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    투수진 ({pitchers.length}명)
                  </button>
                  <button
                    onClick={() => setActiveTab('batters')}
                    className={`px-6 py-2 font-semibold transition-colors ${
                      activeTab === 'batters'
                        ? 'text-green-400 border-b-2 border-green-400'
                        : 'text-slate-400 hover:text-slate-300'
                    }`}
                  >
                    타자진 ({batters.length}명)
                  </button>
                </div>

                {/* 투수 테이블 */}
                {activeTab === 'pitchers' && (
                  <div className="overflow-x-auto border border-slate-700 rounded-lg">
                    <table className="w-full border-collapse bg-slate-800">
                      <thead className="bg-slate-700 sticky top-0 z-10">
                        <tr>
                          <th className="px-4 py-3 text-left border-b border-r border-slate-600 font-semibold text-sm text-slate-200">
                            이름
                          </th>
                          <th className="px-4 py-3 text-center border-b border-r border-slate-600 font-semibold text-sm text-slate-200">
                            나이
                          </th>
                          <th className="px-4 py-3 text-center border-b border-r border-slate-600 font-semibold text-sm text-slate-200">
                            포지션
                          </th>
                          <th className="px-4 py-3 text-center border-b border-r border-slate-600 font-semibold text-sm text-slate-200">
                            1군여부
                          </th>
                          <th className="px-4 py-3 text-center border-b border-r border-slate-600 font-semibold text-sm text-slate-200">
                            구속
                          </th>
                          <th className="px-4 py-3 text-center border-b border-r border-slate-600 font-semibold text-sm text-slate-200">
                            구위
                          </th>
                          <th className="px-4 py-3 text-center border-b border-r border-slate-600 font-semibold text-sm text-slate-200">
                            제구
                          </th>
                          <th className="px-4 py-3 text-center border-b border-r border-slate-600 font-semibold text-sm text-slate-200">
                            무브
                          </th>
                          <th className="px-4 py-3 text-center border-b border-slate-600 font-semibold text-sm text-slate-200">
                            연봉
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {pitchers.length === 0 ? (
                          <tr>
                            <td
                              colSpan={9}
                              className="px-4 py-8 text-center text-slate-400"
                            >
                              투수 데이터가 없습니다.
                            </td>
                          </tr>
                        ) : (
                          pitchers.map((player, index) => (
                            <tr
                              key={player.id}
                              className={`border-b border-slate-700 hover:bg-slate-700 ${
                                index % 2 === 0 ? 'bg-slate-800' : 'bg-slate-900'
                              }`}
                            >
                              <td className="px-4 py-2 border-r border-slate-700 text-slate-100 font-medium">
                                {player.name}
                              </td>
                              <td className="px-4 py-2 border-r border-slate-700 text-center text-slate-300">
                                {player.age}
                              </td>
                              <td className="px-4 py-2 border-r border-slate-700 text-center text-slate-300">
                                {player.position}
                              </td>
                              <td className="px-4 py-2 border-r border-slate-700 text-center">
                                <span
                                  className={`px-2 py-1 rounded text-xs font-semibold ${
                                    player.roster_level === '1군'
                                      ? 'bg-green-600 text-white'
                                      : 'bg-slate-600 text-slate-200'
                                  }`}
                                >
                                  {player.roster_level || '-'}
                                </span>
                              </td>
                              <td className="px-4 py-2 border-r border-slate-700 text-center text-slate-300">
                                {formatVelocity(player.velocity_min, player.velocity_max)}
                              </td>
                              <td className="px-4 py-2 border-r border-slate-700 text-center text-slate-300">
                                {formatStat(player.stuff)}
                              </td>
                              <td className="px-4 py-2 border-r border-slate-700 text-center text-slate-300">
                                {formatStat(player.control)}
                              </td>
                              <td className="px-4 py-2 border-r border-slate-700 text-center text-slate-300">
                                {formatStat(player.movement)}
                              </td>
                              <td className="px-4 py-2 text-center text-slate-300">
                                {formatSalary(player.salary)}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* 타자 테이블 */}
                {activeTab === 'batters' && (
                  <div className="overflow-x-auto border border-slate-700 rounded-lg">
                    <table className="w-full border-collapse bg-slate-800">
                      <thead className="bg-slate-700 sticky top-0 z-10">
                        <tr>
                          <th className="px-4 py-3 text-left border-b border-r border-slate-600 font-semibold text-sm text-slate-200">
                            이름
                          </th>
                          <th className="px-4 py-3 text-center border-b border-r border-slate-600 font-semibold text-sm text-slate-200">
                            나이
                          </th>
                          <th className="px-4 py-3 text-center border-b border-r border-slate-600 font-semibold text-sm text-slate-200">
                            포지션
                          </th>
                          <th className="px-4 py-3 text-center border-b border-r border-slate-600 font-semibold text-sm text-slate-200">
                            1군여부
                          </th>
                          <th className="px-4 py-3 text-center border-b border-r border-slate-600 font-semibold text-sm text-slate-200">
                            컨택
                          </th>
                          <th className="px-4 py-3 text-center border-b border-r border-slate-600 font-semibold text-sm text-slate-200">
                            파워
                          </th>
                          <th className="px-4 py-3 text-center border-b border-r border-slate-600 font-semibold text-sm text-slate-200">
                            선구안
                          </th>
                          <th className="px-4 py-3 text-center border-b border-r border-slate-600 font-semibold text-sm text-slate-200">
                            주루
                          </th>
                          <th className="px-4 py-3 text-center border-b border-slate-600 font-semibold text-sm text-slate-200">
                            연봉
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {batters.length === 0 ? (
                          <tr>
                            <td
                              colSpan={9}
                              className="px-4 py-8 text-center text-slate-400"
                            >
                              타자 데이터가 없습니다.
                            </td>
                          </tr>
                        ) : (
                          batters.map((player, index) => (
                            <tr
                              key={player.id}
                              className={`border-b border-slate-700 hover:bg-slate-700 ${
                                index % 2 === 0 ? 'bg-slate-800' : 'bg-slate-900'
                              }`}
                            >
                              <td className="px-4 py-2 border-r border-slate-700 text-slate-100 font-medium">
                                {player.name}
                              </td>
                              <td className="px-4 py-2 border-r border-slate-700 text-center text-slate-300">
                                {player.age}
                              </td>
                              <td className="px-4 py-2 border-r border-slate-700 text-center text-slate-300">
                                {player.position}
                              </td>
                              <td className="px-4 py-2 border-r border-slate-700 text-center">
                                <span
                                  className={`px-2 py-1 rounded text-xs font-semibold ${
                                    player.roster_level === '1군'
                                      ? 'bg-green-600 text-white'
                                      : 'bg-slate-600 text-slate-200'
                                  }`}
                                >
                                  {player.roster_level || '-'}
                                </span>
                              </td>
                              <td className="px-4 py-2 border-r border-slate-700 text-center text-slate-300">
                                {formatStat(player.contact)}
                              </td>
                              <td className="px-4 py-2 border-r border-slate-700 text-center text-slate-300">
                                {formatStat(player.power)}
                              </td>
                              <td className="px-4 py-2 border-r border-slate-700 text-center text-slate-300">
                                {formatStat(player.eye)}
                              </td>
                              <td className="px-4 py-2 border-r border-slate-700 text-center text-slate-300">
                                {formatStat(player.speed)}
                              </td>
                              <td className="px-4 py-2 text-center text-slate-300">
                                {formatSalary(player.salary)}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
