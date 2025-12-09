/**
 * 로스터 데이터 타입 정의
 */

export interface PitcherStats {
  vel: string; // 구속 (예: "136-140", "145+")
  stf: number; // 구위 (Stuff)
  mov: number; // 무브먼트
  ctl: number; // 제구
  sta: number; // 스태미나
}

export interface BatterStats {
  con: number; // 컨택
  gap: number; // 갭 파워
  pow: number; // 파워
  eye: number; // 선구안
  run: number; // 주루
  fld: number; // 수비
}

export interface Player {
  name: string;
  age: number;
  position: string;
  hand: string; // 우투, 좌투, 우타, 좌타 등
  division: '1군' | '2군';
  stats: PitcherStats | BatterStats;
  note?: string;
  salary?: number;
}

export interface TeamRoster {
  team: string;
  pitchers: Player[];
  batters: Player[];
}

// 팀 태그 매핑
const TEAM_TAG_MAP: Record<string, string> = {
  '#KT': 'KT Wiz',
  '#Samsung': 'Samsung Lions',
  '#Hanwha': 'Hanwha Eagles',
  '#SSG': 'SSG Landers',
  '#Kiwoom': 'Kiwoom Heroes',
  '#NC': 'NC Dinos',
  '#LG': 'LG Twins',
  '#Lotte': 'Lotte Giants',
  '#Doosan': 'Doosan Bears',
  '#KIA': 'KIA Tigers',
};

/**
 * CSV 문자열을 파싱하여 로스터 데이터로 변환
 */
export function parseRosterFromCSV(csvText: string): TeamRoster[] {
  const teams: TeamRoster[] = [];
  const lines = csvText.split('\n');
  
  let currentTeam: TeamRoster | null = null;
  let currentSection: 'pitchers' | 'batters' | null = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // 팀 헤더 감지 (압축 형식: #KT, #SSG 등)
    if (line.startsWith('#')) {
      const teamName = TEAM_TAG_MAP[line];
      if (teamName) {
        if (currentTeam) {
          teams.push(currentTeam);
        }
        currentTeam = {
          team: teamName,
          pitchers: [],
          batters: [],
        };
        currentSection = null;
        continue;
      }
    }
    
    // 기존 형식 지원 (하위 호환성)
    const teamMatch = line.match(/###\s*\*\*(\d+)\.\s*(.+?)\s*\((.+?)\)\*\*/);
    if (teamMatch) {
      if (currentTeam) {
        teams.push(currentTeam);
      }
      currentTeam = {
        team: teamMatch[3],
        pitchers: [],
        batters: [],
      };
      currentSection = null;
      continue;
    }
    
    // 섹션 헤더 감지 (기존 형식)
    if (line.includes('**[투수진]**')) {
      currentSection = 'pitchers';
      continue;
    }
    if (line.includes('**[타자진]**')) {
      currentSection = 'batters';
      continue;
    }
    
    // CSV 헤더 감지 및 섹션 판단
    if (line.startsWith('P,') || line.startsWith('POS,')) {
      currentSection = 'pitchers';
      continue;
    }
    if (line.startsWith('D,') || line.startsWith('DIV,')) {
      currentSection = 'batters';
      continue;
    }
    
    // 데이터 라인 파싱
    if (currentTeam && currentSection && line && !line.startsWith('---')) {
      if (currentSection === 'pitchers') {
        const pitcher = parsePitcherLine(line);
        if (pitcher) {
          currentTeam.pitchers.push(pitcher);
        }
      } else if (currentSection === 'batters') {
        const batter = parseBatterLine(line);
        if (batter) {
          currentTeam.batters.push(batter);
        }
      }
    }
  }
  
  // 마지막 팀 추가
  if (currentTeam) {
    teams.push(currentTeam);
  }
  
  return teams;
}

/**
 * 투수 CSV 라인 파싱
 * 형식: POS,NAME,HAND,VEL,STF,MOV,CTL,STA,NOTE
 */
function parsePitcherLine(line: string): Player | null {
  const parts = line.split(',');
  if (parts.length < 8) return null;
  
  const [pos, nameWithAge, hand, vel, stf, mov, ctl, sta, ...noteParts] = parts;
  
  // 이름과 나이 추출 (예: "고영표 (35)")
  const nameMatch = nameWithAge.match(/(.+?)\s*\((\d+)\)/);
  if (!nameMatch) return null;
  
  const name = nameMatch[1].trim();
  const age = parseInt(nameMatch[2], 10);
  
  // 구속 범위 파싱 (예: "136-140", "145+")
  const velocity = vel.trim();
  
  // 스탯 파싱
  const stats: PitcherStats = {
    vel: velocity,
    stf: parseInt(stf.trim(), 10) || 0,
    mov: parseInt(mov.trim(), 10) || 0,
    ctl: parseInt(ctl.trim(), 10) || 0,
    sta: parseInt(sta.trim(), 10) || 0,
  };
  
  // 포지션에서 1군/2군 구분
  const division = pos.includes('2군') ? '2군' : '1군';
  const position = pos.replace('2군 ', '').trim();
  
  const note = noteParts.join(',').trim() || undefined;
  
  return {
    name,
    age,
    position,
    hand: hand.trim(),
    division,
    stats,
    note,
  };
}

/**
 * 타자 CSV 라인 파싱
 * 형식: DIV,POS,HAND,NAME,CON,GAP,POW,EYE,RUN,FLD,STATS,SAL,NOTE
 */
function parseBatterLine(line: string): Player | null {
  const parts = line.split(',');
  if (parts.length < 13) return null;
  
  const [div, pos, hand, nameWithAge, con, gap, pow, eye, run, fld, stats, sal, ...noteParts] = parts;
  
  // 이름과 나이 추출 (예: "장성우(36)")
  const nameMatch = nameWithAge.match(/(.+?)\((\d+)\)/);
  if (!nameMatch) return null;
  
  const name = nameMatch[1].trim();
  const age = parseInt(nameMatch[2], 10);
  
  const playerStats: BatterStats = {
    con: parseInt(con.trim(), 10) || 0,
    gap: parseInt(gap.trim(), 10) || 0,
    pow: parseInt(pow.trim(), 10) || 0,
    eye: parseInt(eye.trim(), 10) || 0,
    run: parseInt(run.trim(), 10) || 0,
    fld: parseInt(fld.trim(), 10) || 0,
  };
  
  const division = (div.trim() === '1군' ? '1군' : '2군') as '1군' | '2군';
  const position = pos.trim();
  const note = noteParts.join(',').trim() || undefined;
  
  return {
    name,
    age,
    position,
    hand: hand.trim(),
    division,
    stats: playerStats,
    note,
  };
}

/**
 * 로스터 데이터를 프롬프트 형식으로 변환 (필요 시 사용)
 */
export function formatRosterForPrompt(roster: TeamRoster): string {
  const lines: string[] = [];
  
  lines.push(`### **${roster.team}**`);
  lines.push('');
  lines.push('#### **[투수진]**');
  lines.push('POS,NAME,HAND,VEL,STF,MOV,CTL,STA,NOTE');
  
  for (const pitcher of roster.pitchers) {
    const prefix = pitcher.division === '2군' ? '2군 ' : '';
    const line = [
      `${prefix}${pitcher.position}`,
      `${pitcher.name} (${pitcher.age})`,
      pitcher.hand,
      (pitcher.stats as PitcherStats).vel,
      (pitcher.stats as PitcherStats).stf,
      (pitcher.stats as PitcherStats).mov,
      (pitcher.stats as PitcherStats).ctl,
      (pitcher.stats as PitcherStats).sta,
      pitcher.note || '',
    ].join(',');
    lines.push(line);
  }
  
  lines.push('');
  lines.push('#### **[타자진]**');
  lines.push('DIV,POS,HAND,NAME,CON,GAP,POW,EYE,RUN,FLD,STATS,SAL,NOTE');
  
  for (const batter of roster.batters) {
    const stats = (batter.stats as BatterStats);
    const line = [
      batter.division,
      batter.position,
      batter.hand,
      `${batter.name}(${batter.age})`,
      stats.con,
      stats.gap,
      stats.pow,
      stats.eye,
      stats.run,
      stats.fld,
      batter.note || '-',
      '-',
      '-',
    ].join(',');
    lines.push(line);
  }
  
  return lines.join('\n');
}

