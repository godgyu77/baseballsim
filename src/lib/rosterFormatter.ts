/**
 * 로스터 데이터를 최적화된 프롬프트 형식으로 변환
 * 토큰 절감을 위해 간결한 형식 사용
 */

import { ROSTER_DATA, type TeamRoster } from '../constants/prompts/InitialData';

/**
 * 특정 팀의 로스터만 간결한 형식으로 반환 (토큰 절감)
 */
export function getCompactTeamRoster(teamName: string): string {
  const team = ROSTER_DATA.find(t => 
    t.team === teamName || 
    t.team.includes(teamName) ||
    teamName.includes(t.team)
  );
  
  if (!team) {
    return `[ROSTER: ${teamName}] 로스터 데이터를 찾을 수 없습니다.`;
  }
  
  const lines: string[] = [];
  lines.push(`### ${team.team}`);
  lines.push('#### [투수진]');
  lines.push('POS,NAME,AGE,HAND,VEL,STF,MOV,CTL,STA');
  
  // 1군 투수만 (2군은 필요시 요청)
  const mainPitchers = team.pitchers.filter(p => p.division === '1군').slice(0, 15);
  for (const p of mainPitchers) {
    const stats = p.stats as any;
    lines.push([
      p.position,
      p.name,
      p.age,
      p.hand,
      stats.vel || '-',
      stats.stf || 0,
      stats.mov || 0,
      stats.ctl || 0,
      stats.sta || 0,
    ].join(','));
  }
  
  lines.push('#### [타자진]');
  lines.push('POS,NAME,AGE,HAND,CON,GAP,POW,EYE,RUN,FLD');
  
  // 1군 타자만 (2군은 필요시 요청)
  const mainBatters = team.batters.filter(b => b.division === '1군').slice(0, 20);
  for (const b of mainBatters) {
    const stats = b.stats as any;
    lines.push([
      b.position,
      b.name,
      b.age,
      b.hand,
      stats.con || 0,
      stats.gap || 0,
      stats.pow || 0,
      stats.eye || 0,
      stats.run || 0,
      stats.fld || 0,
    ].join(','));
  }
  
  return lines.join('\n');
}

/**
 * 모든 팀의 로스터를 간결한 요약 형식으로 반환 (최소한의 정보만)
 */
export function getCompactAllRosters(): string {
  const lines: string[] = [];
  lines.push('# [ROSTER SUMMARY] 2026 Season');
  lines.push('**주의:** 전체 로스터는 코드에서 관리됩니다. 필요시 특정 팀을 요청하세요.');
  lines.push('');
  lines.push('## 팀별 선수 수 요약');
  
  for (const team of ROSTER_DATA) {
    const pitcherCount = team.pitchers.length;
    const batterCount = team.batters.length;
    lines.push(`- ${team.team}: 투수 ${pitcherCount}명, 타자 ${batterCount}명`);
  }
  
  return lines.join('\n');
}

/**
 * 초기화 시 선택된 팀의 로스터만 전송 (토큰 절감)
 */
export function getInitialRosterForTeam(teamName: string): string {
  return `[INITIAL_ROSTER: ${teamName}]
아래는 ${teamName}의 초기 로스터입니다. 다른 팀의 로스터는 필요시 요청하세요.

${getCompactTeamRoster(teamName)}

**참고:** 전체 리그 로스터는 코드에서 관리되며, 필요시 특정 팀의 상세 정보를 요청할 수 있습니다.`;
}

