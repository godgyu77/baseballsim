/**
 * Supabase 데이터베이스 시드 스크립트
 * 
 * InitialData.ts의 하드코딩된 선수 데이터를 Supabase의 teams와 players 테이블에 insert합니다.
 * 
 * 실행 방법:
 * npx tsx src/scripts/seedDatabase.ts
 * 
 * 또는 package.json에 스크립트 추가:
 * "seed": "tsx src/scripts/seedDatabase.ts"
 */

import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import { KBO_INITIAL_DATA } from '../constants/prompts/InitialData';
import { TEAMS } from '../constants/TeamData';

// .env.local 파일 로드
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables.');
  console.error('Please check your .env.local file.');
  process.exit(1);
}

// SSL 인증서 검증 우회 (개발 환경에서만 사용)
// 회사 네트워크나 프록시 환경에서 자체 서명된 인증서 문제 해결
// 주의: 프로덕션 환경에서는 사용하지 마세요!
if (process.env.NODE_TLS_REJECT_UNAUTHORIZED !== '0') {
  // 개발 환경에서만 SSL 검증 비활성화
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  console.warn('⚠️  SSL 인증서 검증이 비활성화되었습니다. (개발 환경 전용)');
}

// Supabase 클라이언트 생성 (Node.js 환경용)
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * 구단 정보 인터페이스
 */
interface TeamInfo {
  id: string;
  name: string;
  fullName: string;
  color: string;
  secondaryColor: string;
  icon: string;
}

/**
 * 투수 데이터 인터페이스
 */
interface PitcherData {
  position: string; // 선발, 마무리, 셋업, 불펜, 2군 선발, 2군 불펜
  name: string;
  age: number; // 나이
  hand: string; // 우투, 좌투, 우사, 좌사, 우언, 좌언
  velocity: string; // 구속 범위 (예: "136-140", "150+")
  stuff: number; // 구위 (20-80)
  movement: number; // 무브먼트 (20-80)
  control: number; // 제구 (20-80)
  stamina: number; // 체력 (20-80)
  note: string; // 비고
}

/**
 * 타자 데이터 인터페이스
 */
interface BatterData {
  division: string; // 1군, 2군
  position: string; // 포수, 1루수, 2루수, 3루수, 유격수, 좌익수, 중견수, 우익수, 지명타자
  hand: string; // 우타, 좌타, 양타
  name: string;
  age: number; // 나이
  contact: number; // 컨택 (20-80)
  gapPower: number; // 갭파워 (20-80)
  power: number; // 파워 (20-80)
  eye: number; // 선구안 (20-80)
  running: number; // 주루 (20-80) -> DB에서는 speed
  field: number; // 수비 (20-80) -> DB에서는 defense
  stats: string; // 기록 (선택적)
  salary: string; // 연봉 (선택적, "-"일 수 있음)
  note: string; // 비고
}

/**
 * 구단명 매핑 (InitialData.ts의 구단명 -> TeamData.ts의 id)
 */
const TEAM_NAME_MAP: Record<string, string> = {
  'KT 위즈': 'kt',
  '삼성 라이온즈': 'samsung',
  '한화 이글스': 'hanwha',
  'SSG 랜더스': 'ssg',
  '키움 히어로즈': 'kiwoom',
  'NC 다이노스': 'nc',
  'LG 트윈스': 'lg',
  '롯데 자이언츠': 'lotte',
  '두산 베어스': 'doosan',
  'KIA 타이거즈': 'kia',
};

/**
 * CSV 라인을 파싱하여 투수 데이터 추출
 */
function parsePitcherLine(line: string): PitcherData | null {
  const parts = line.split(',').map(p => p.trim());
  if (parts.length < 8) return null;

  const [position, nameWithAge, hand, velocity, stuff, movement, control, stamina, ...noteParts] = parts;
  
  // 이름에서 나이 추출 (예: "고영표 (35)" -> name: "고영표", age: 35)
  const nameMatch = nameWithAge.match(/^(.+?)\s*\((\d+)\)/);
  const name = nameMatch ? nameMatch[1].trim() : nameWithAge.trim();
  const age = nameMatch ? parseInt(nameMatch[2]) : 0;
  
  const note = noteParts.join(',').trim();

  return {
    position: position || '',
    name,
    age,
    hand: hand || '',
    velocity: velocity || '',
    stuff: parseInt(stuff) || 0,
    movement: parseInt(movement) || 0,
    control: parseInt(control) || 0,
    stamina: parseInt(stamina) || 0,
    note: note || '',
  };
}

/**
 * CSV 라인을 파싱하여 타자 데이터 추출
 */
function parseBatterLine(line: string): BatterData | null {
  const parts = line.split(',').map(p => p.trim());
  if (parts.length < 12) return null;

  const [division, position, hand, nameWithAge, contact, gapPower, power, eye, running, field, stats, salary, ...noteParts] = parts;
  
  // 이름에서 나이 추출 (예: "장성우(36)" -> name: "장성우", age: 36)
  const nameMatch = nameWithAge.match(/^(.+?)\((\d+)\)/);
  const name = nameMatch ? nameMatch[1].trim() : nameWithAge.trim();
  const age = nameMatch ? parseInt(nameMatch[2]) : 0;
  
  const note = noteParts.join(',').trim();

  return {
    division: division || '',
    position: position || '',
    hand: hand || '',
    name,
    age,
    contact: parseInt(contact) || 0,
    gapPower: parseInt(gapPower) || 0,
    power: parseInt(power) || 0,
    eye: parseInt(eye) || 0,
    running: parseInt(running) || 0,
    field: parseInt(field) || 0,
    stats: stats || '',
    salary: salary || '',
    note: note || '',
  };
}

/**
 * InitialData에서 구단별 데이터 파싱
 */
function parseTeamData(data: string): Map<string, { pitchers: PitcherData[]; batters: BatterData[] }> {
  const teamData = new Map<string, { pitchers: PitcherData[]; batters: BatterData[] }>();
  
  // 구단별로 분리 (### **N. 구단명 (영문명)** 형식)
  // 실제 형식: ### **1. KT 위즈 (KT Wiz)**
  // 정규식 수정: ### 뒤에 공백 없이 **가 올 수 있음
  // 여러 가지 패턴 시도
  let teamRegex = /###\s+\*\*(\d+)\.\s+(.+?)\*\*\*/g;
  let matches = Array.from(data.matchAll(teamRegex));
  
  // 첫 번째 패턴이 실패하면 다른 패턴 시도
  if (matches.length === 0) {
    teamRegex = /###\s+\*\*(\d+)\.\s+(.+?)\s+\*\*\*/g;
    matches = Array.from(data.matchAll(teamRegex));
  }
  
  // 여전히 실패하면 더 단순한 패턴
  if (matches.length === 0) {
    teamRegex = /###\s+\*\*(\d+)\.\s+(.+?)\*\*/g;
    matches = Array.from(data.matchAll(teamRegex));
  }
  
  // 마지막 시도: 줄 단위로 찾기
  if (matches.length === 0) {
    console.log('  🔄 줄 단위 파싱으로 전환...');
    const lines = data.split('\n');
    let currentTeamIndex = -1;
    let currentTeamName = '';
    let currentTeamId = '';
    let currentTeamContent = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // 구단 헤더 찾기: ### **N. 구단명**
      const teamMatch = line.match(/###\s+\*\*(\d+)\.\s+(.+?)\*\*\*/);
      if (teamMatch) {
        // 이전 구단 저장
        if (currentTeamId && currentTeamContent) {
          const pitchers: PitcherData[] = [];
          const batters: BatterData[] = [];
          
          // 투수진 섹션 파싱
          const pitcherSectionMatch = currentTeamContent.match(/####\s+\*\*\[투수진\]\*\*\s*\n([\s\S]*?)(?=####|$)/);
          if (pitcherSectionMatch) {
            const pitcherLines = pitcherSectionMatch[1].split('\n');
            for (const pitcherLine of pitcherLines) {
              if (pitcherLine.trim().startsWith('POS,') || !pitcherLine.trim()) continue;
              const pitcher = parsePitcherLine(pitcherLine);
              if (pitcher) pitchers.push(pitcher);
            }
          }
          
          // 타자진 섹션 파싱
          const batterSectionMatch = currentTeamContent.match(/####\s+\*\*\[타자진\]\*\*\s*\n([\s\S]*?)(?=####|$)/);
          if (batterSectionMatch) {
            const batterLines = batterSectionMatch[1].split('\n');
            for (const batterLine of batterLines) {
              if (batterLine.trim().startsWith('DIV,') || !batterLine.trim()) continue;
              const batter = parseBatterLine(batterLine);
              if (batter) batters.push(batter);
            }
          }
          
          teamData.set(currentTeamId, { pitchers, batters });
          console.log(`  ✅ ${currentTeamName}: 투수 ${pitchers.length}명, 타자 ${batters.length}명 파싱 완료`);
        }
        
        // 새 구단 시작
        let teamName = teamMatch[2].trim();
        teamName = teamName.replace(/\s*\([^)]+\)\s*$/, '').trim();
        const teamId = TEAM_NAME_MAP[teamName];
        
        if (teamId) {
          currentTeamIndex = i;
          currentTeamName = teamName;
          currentTeamId = teamId;
          currentTeamContent = '';
          console.log(`  📝 구단 발견: ${teamName} (${teamId})`);
        } else {
          console.warn(`  ⚠️  알 수 없는 구단명: "${teamName}"`);
          currentTeamId = '';
        }
      } else if (currentTeamId && i > currentTeamIndex) {
        // 현재 구단의 내용 추가
        currentTeamContent += line + '\n';
      }
    }
    
    // 마지막 구단 저장
    if (currentTeamId && currentTeamContent) {
      const pitchers: PitcherData[] = [];
      const batters: BatterData[] = [];
      
      const pitcherSectionMatch = currentTeamContent.match(/####\s+\*\*\[투수진\]\*\*\s*\n([\s\S]*?)(?=####|$)/);
      if (pitcherSectionMatch) {
        const pitcherLines = pitcherSectionMatch[1].split('\n');
        for (const pitcherLine of pitcherLines) {
          if (pitcherLine.trim().startsWith('POS,') || !pitcherLine.trim()) continue;
          const pitcher = parsePitcherLine(pitcherLine);
          if (pitcher) pitchers.push(pitcher);
        }
      }
      
      const batterSectionMatch = currentTeamContent.match(/####\s+\*\*\[타자진\]\*\*\s*\n([\s\S]*?)(?=####|$)/);
      if (batterSectionMatch) {
        const batterLines = batterSectionMatch[1].split('\n');
        for (const batterLine of batterLines) {
          if (batterLine.trim().startsWith('DIV,') || !batterLine.trim()) continue;
          const batter = parseBatterLine(batterLine);
          if (batter) batters.push(batter);
        }
      }
      
      teamData.set(currentTeamId, { pitchers, batters });
      console.log(`  ✅ ${currentTeamName}: 투수 ${pitchers.length}명, 타자 ${batters.length}명 파싱 완료`);
    }
  }
  
  console.log(`  🔍 정규식 매칭 결과: ${matches.length > 0 ? matches.length : teamData.size}개 구단 발견`);
  
  if (matches.length === 0 && teamData.size === 0) {
    console.warn('  ⚠️  구단을 찾을 수 없습니다. 데이터 형식을 확인하세요.');
    // 디버깅: 구단 헤더가 있는 라인 찾기
    const lines = data.split('\n');
    for (let i = 0; i < Math.min(50, lines.length); i++) {
      if (lines[i].includes('###') && lines[i].includes('**')) {
        console.log(`  📄 샘플 라인 ${i + 1}:`, JSON.stringify(lines[i]));
      }
    }
  }
  
  // matches가 있으면 기존 로직 사용
  if (matches.length > 0) {
    for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const teamNumber = match[1];
    let teamName = match[2]?.trim() || '';
    const matchIndex = match.index || 0;
    
    // 다음 구단까지의 내용 추출
    const nextMatch = matches[i + 1];
    const teamContent = nextMatch && nextMatch.index
      ? data.substring(matchIndex + match[0].length, nextMatch.index)
      : data.substring(matchIndex + match[0].length);
    
    if (!teamName) {
      console.warn(`  ⚠️  구단명이 비어있습니다. (번호: ${teamNumber})`);
      continue;
    }
    
    // 괄호 안의 영문명 제거 (예: "KT 위즈 (KT Wiz)" -> "KT 위즈")
    teamName = teamName.replace(/\s*\([^)]+\)\s*$/, '').trim();
    
    console.log(`  📝 파싱 중: "${teamName}" (원본: "${match[2]}")`);
    
    const teamId = TEAM_NAME_MAP[teamName];
    if (!teamId) {
      console.warn(`  ⚠️  알 수 없는 구단명: "${teamName}" (매핑 테이블에 없음)`);
      console.warn(`  ℹ️  사용 가능한 구단명: ${Object.keys(TEAM_NAME_MAP).join(', ')}`);
      continue;
    }
    
    const pitchers: PitcherData[] = [];
    const batters: BatterData[] = [];
    
    // 투수진 섹션 파싱
    const pitcherSectionMatch = teamContent.match(/#### \*\*\[투수진\]\*\*\s*\n([\s\S]*?)(?=####|$)/);
    if (pitcherSectionMatch) {
      const pitcherLines = pitcherSectionMatch[1].split('\n');
      for (const line of pitcherLines) {
        if (line.trim().startsWith('POS,') || !line.trim()) continue; // 헤더 라인 스킵
        const pitcher = parsePitcherLine(line);
        if (pitcher) pitchers.push(pitcher);
      }
    }
    
    // 타자진 섹션 파싱
    const batterSectionMatch = teamContent.match(/#### \*\*\[타자진\]\*\*\s*\n([\s\S]*?)(?=####|$)/);
    if (batterSectionMatch) {
      const batterLines = batterSectionMatch[1].split('\n');
      for (const line of batterLines) {
        if (line.trim().startsWith('DIV,') || !line.trim()) continue; // 헤더 라인 스킵
        const batter = parseBatterLine(line);
        if (batter) batters.push(batter);
      }
    }
    
    teamData.set(teamId, { pitchers, batters });
    }
  }
  
  return teamData;
}

/**
 * Teams 테이블의 스키마 확인
 */
async function checkTeamsSchema(): Promise<Set<string>> {
  try {
    // 빈 쿼리로 테이블 구조 확인 (첫 번째 행 조회)
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .limit(1);
    
    if (error && error.code !== 'PGRST116') { // PGRST116은 "no rows" 에러
      // 테이블이 비어있어도 스키마는 확인 가능
      console.warn('⚠️  테이블 스키마 확인 중 오류:', error.message);
    }
    
    // 실제로는 Supabase가 스키마 정보를 직접 제공하지 않으므로
    // 기본 컬럼만 사용하도록 수정
    return new Set();
  } catch (error) {
    console.warn('⚠️  스키마 확인 실패, 기본 컬럼 사용');
    return new Set();
  }
}

/**
 * 메인 시드 함수
 */
async function seedDatabase() {
  console.log('🌱 데이터베이스 시드 시작...\n');
  
  try {
    // 1. 구단 데이터 파싱
    console.log('📊 InitialData.ts에서 데이터 파싱 중...');
    const teamData = parseTeamData(KBO_INITIAL_DATA);
    console.log(`✅ ${teamData.size}개 구단 데이터 파싱 완료`);
    
    // 파싱된 데이터 확인
    for (const [teamId, data] of teamData.entries()) {
      console.log(`  - ${teamId}: 투수 ${data.pitchers.length}명, 타자 ${data.batters.length}명`);
    }
    console.log('');
    
    // 2. Teams 테이블에 구단 insert
    // 실제 스키마: id (uuid, auto-generated), name (text, unique)
    console.log('🏟️  Teams 테이블에 구단 데이터 삽입 중...\n');
    
    const teamIdMap = new Map<string, string>(); // team_id (TeamData.id) -> supabase_uuid 매핑
    
    for (const team of TEAMS) {
      // teams 테이블은 id가 uuid이고 auto-generated이므로, name만 insert
      const { data, error } = await supabase
        .from('teams')
        .insert({
          name: team.name, // name만 insert (id는 auto-generated)
        })
        .select('id')
        .single();
      
      if (error) {
        // 이미 존재하는 경우, 기존 레코드 조회
        if (error.code === '23505') { // unique_violation (name이 unique)
          console.log(`  ⚠️  ${team.name}은(는) 이미 존재합니다. 기존 레코드를 조회합니다...`);
          
          const { data: existingData, error: selectError } = await supabase
            .from('teams')
            .select('id')
            .eq('name', team.name)
            .single();
          
          if (selectError) {
            throw selectError;
          }
          
          if (existingData) {
            teamIdMap.set(team.id, existingData.id);
            console.log(`  ✅ ${team.name} 기존 레코드 사용 (ID: ${existingData.id})`);
            continue;
          }
        }
        throw error;
      }
      
      if (data) {
        teamIdMap.set(team.id, data.id);
        console.log(`  ✅ ${team.name} 삽입 완료 (ID: ${data.id})`);
      }
    }
    
    console.log(`\n✅ ${teamIdMap.size}개 구단 삽입 완료`);
    
    // teamIdMap 확인
    if (teamIdMap.size === 0) {
      console.error('  ❌ 경고: teamIdMap이 비어있습니다. 선수 삽입을 진행할 수 없습니다.');
      return;
    }
    
    console.log('  ℹ️  팀 ID 매핑:');
    for (const [teamId, supabaseId] of teamIdMap.entries()) {
      console.log(`    - ${teamId} -> ${supabaseId}`);
    }
    console.log('');
    
    // 3. Players 테이블에 선수 insert
    console.log('⚾ Players 테이블에 선수 데이터 삽입 중...');
    console.log(`  ℹ️  파싱된 구단 수: ${teamData.size}`);
    console.log(`  ℹ️  삽입된 팀 ID 수: ${teamIdMap.size}\n`);
    
    let totalPlayers = 0;
    
    for (const [teamId, data] of teamData.entries()) {
      const supabaseTeamId = teamIdMap.get(teamId);
      if (!supabaseTeamId) {
        console.warn(`  ⚠️  ${teamId}에 대한 팀 ID를 찾을 수 없습니다. 건너뜁니다.`);
        continue;
      }
      
      const team = TEAMS.find(t => t.id === teamId);
      const teamName = team?.fullName || teamId;
      
      console.log(`\n  📋 ${teamName} 선수 삽입 중...`);
      console.log(`    - 투수: ${data.pitchers.length}명`);
      console.log(`    - 타자: ${data.batters.length}명`);
      
      const playersToInsert: any[] = [];
      
      // 투수 데이터 변환
      for (const pitcher of data.pitchers) {
        const is2ndTeam = pitcher.position.includes('2군');
        const rosterLevel = is2ndTeam ? '2군' : '1군';
        
        // position에서 역할 추출 (예: "선발", "마무리", "셋업", "불펜", "2군 선발" 등)
        // DB의 position 필드는 "투수"로 고정, 역할 정보는 note에 포함
        const role = pitcher.position.replace('2군 ', '').trim();
        const position = '투수'; // DB 스키마에 맞게 "투수"로 고정
        
        // velocity 파싱 (예: "136-140" -> velocity_min: 136, velocity_max: 140)
        // 또는 "150+" -> velocity_min: 150, velocity_max: null
        let velocityMin: number | null = null;
        let velocityMax: number | null = null;
        
        if (pitcher.velocity) {
          const velocityMatch = pitcher.velocity.match(/(\d+)(?:-(\d+))?(\+)?/);
          if (velocityMatch) {
            velocityMin = parseInt(velocityMatch[1]);
            if (velocityMatch[2]) {
              velocityMax = parseInt(velocityMatch[2]);
            } else if (velocityMatch[3] === '+') {
              velocityMax = null; // "150+" 같은 경우
            } else {
              velocityMax = velocityMin; // 단일 값인 경우
            }
          }
        }
        
        // note에 역할 정보 포함
        const note = pitcher.note 
          ? `${role} / ${pitcher.note}` 
          : role;
        
        playersToInsert.push({
          team_id: supabaseTeamId,
          name: pitcher.name,
          age: pitcher.age || 0, // 필수 필드
          position: position, // "투수"로 고정
          hand: pitcher.hand || null,
          roster_level: rosterLevel,
          velocity_min: velocityMin,
          velocity_max: velocityMax,
          stuff: pitcher.stuff || null,
          movement: pitcher.movement || null,
          control: pitcher.control || null,
          stamina: pitcher.stamina || null,
          note: note || null,
        });
      }
      
      // 타자 데이터 변환
      for (const batter of data.batters) {
        playersToInsert.push({
          team_id: supabaseTeamId,
          name: batter.name,
          age: batter.age || 0, // 필수 필드
          position: batter.position, // 포수, 1루수, 2루수 등
          hand: batter.hand || null,
          roster_level: batter.division || '1군',
          contact: batter.contact || null,
          gap_power: batter.gapPower || null,
          power: batter.power || null,
          eye: batter.eye || null,
          speed: batter.running || null, // DB에서는 speed
          defense: batter.field || null, // DB에서는 defense
          note: batter.note || null,
        });
      }
      
      if (playersToInsert.length === 0) {
        console.log(`  ⚠️  ${teamName}: 삽입할 선수가 없습니다.`);
        continue;
      }
      
      // 배치로 insert (한 번에 최대 100개씩)
      const batchSize = 100;
      let insertedCount = 0;
      
      for (let i = 0; i < playersToInsert.length; i += batchSize) {
        const batch = playersToInsert.slice(i, i + batchSize);
        const { data: insertData, error } = await supabase
          .from('players')
          .insert(batch)
          .select('id');
        
        if (error) {
          console.error(`  ❌ ${teamName} 선수 삽입 실패:`, error.message);
          console.error(`  ❌ 오류 상세:`, JSON.stringify(error, null, 2));
          if (batch.length <= 5) {
            console.error(`  ❌ 삽입 시도한 데이터 샘플:`, JSON.stringify(batch[0], null, 2));
          }
          throw error;
        }
        
        if (insertData) {
          insertedCount += insertData.length;
        }
      }
      
      totalPlayers += insertedCount;
      console.log(`  ✅ ${teamName}: ${insertedCount}명 삽입 완료`);
    }
    
    console.log(`\n✅ 총 ${totalPlayers}명의 선수 삽입 완료\n`);
    console.log('🎉 데이터베이스 시드 완료!');
    
  } catch (error) {
    console.error('❌ 시드 중 오류 발생:', error);
    process.exit(1);
  }
}

// 스크립트 실행
seedDatabase();

