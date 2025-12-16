import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// .env.local 우선 로드, 없으면 .env 로드
const envLocal = dotenv.config({ path: '.env.local' });
if (envLocal.error) {
  dotenv.config({ path: '.env' });
}

// 여러 환경 변수 이름 지원
const supabaseUrl = process.env.VITE_SUPABASE_URL || 
                    process.env.NEXT_PUBLIC_SUPABASE_URL || 
                    process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ 환경변수 누락');
  console.error('   필요한 변수:');
  console.error('   - VITE_SUPABASE_URL 또는 NEXT_PUBLIC_SUPABASE_URL 또는 SUPABASE_URL');
  console.error('   - SUPABASE_SERVICE_ROLE_KEY');
  console.error('   .env.local 또는 .env 파일을 확인하세요.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// 영구결번 데이터 (SystemLogic.ts 기반)
const RETIRED_NUMBERS = [
  { teamName: '두산 베어스', name: '김영신', number: 54, desc: '리그 유일 추모 결번' },
  { teamName: '두산 베어스', name: '박철순', number: 21, desc: '불사조, 원년 MVP' },
  { teamName: 'KIA 타이거즈', name: '선동열', number: 18, desc: '국보급 투수' },
  { teamName: 'KIA 타이거즈', name: '이종범', number: 7, desc: '야구 천재, 바람의 아들' },
  { teamName: '삼성 라이온즈', name: '이만수', number: 22, desc: '헐크, 최초 트리플크라운' },
  { teamName: '삼성 라이온즈', name: '양준혁', number: 10, desc: '양신, 통산 기록의 사나이' },
  { teamName: '삼성 라이온즈', name: '이승엽', number: 36, desc: '국민타자, 홈런왕' },
  { teamName: '한화 이글스', name: '장종훈', number: 35, desc: '연습생 신화' },
  { teamName: '한화 이글스', name: '정민철', number: 23, desc: '이글스 최다승 에이스' },
  { teamName: '한화 이글스', name: '송진우', number: 21, desc: '송회장, 최다 이닝/탈삼진' },
  { teamName: '한화 이글스', name: '김태균', number: 52, desc: '이글스의 자존심' },
  { teamName: 'LG 트윈스', name: '김용수', number: 41, desc: '노송, 우승의 주역' },
  { teamName: 'LG 트윈스', name: '이병규', number: 9, desc: '적토마, 영원한 캡틴' },
  { teamName: 'LG 트윈스', name: '박용택', number: 33, desc: 'LG의 심장, 최다 안타' },
  { teamName: '롯데 자이언츠', name: '최동원', number: 11, desc: '무쇠팔, 부산의 영혼' },
  { teamName: '롯데 자이언츠', name: '이대호', number: 10, desc: '조선의 4번 타자' },
  { teamName: 'SSG 랜더스', name: '박경완', number: 26, desc: '포수 왕조의 핵' },
];

// 팀 이름 매핑 (한글 팀명 -> DB 팀명)
const TEAM_NAME_MAP: Record<string, string[]> = {
  '두산 베어스': ['Doosan Bears', 'Doosan'],
  'KIA 타이거즈': ['KIA Tigers', 'KIA'],
  '삼성 라이온즈': ['Samsung Lions', 'Samsung'],
  '한화 이글스': ['Hanwha Eagles', 'Hanwha'],
  'LG 트윈스': ['LG Twins', 'LG'],
  '롯데 자이언츠': ['Lotte Giants', 'Lotte'],
  'SSG 랜더스': ['SSG Landers', 'SSG'],
};

async function seedRetiredNumbers() {
  console.log('📜 영구결번 데이터 시딩 시작...');

  // 1. 구단 정보 가져오기 (Team ID 매핑용)
  const { data: teams } = await supabase.from('teams').select('id, name');
  if (!teams) throw new Error('구단 정보를 불러올 수 없습니다. seedDatabase를 먼저 실행하세요.');

  console.log(`📋 DB에 저장된 구단: ${teams.map(t => t.name).join(', ')}`);

  const updates = [];
  const notFound: string[] = [];

  for (const item of RETIRED_NUMBERS) {
    // 팀 이름 매핑
    const possibleNames = TEAM_NAME_MAP[item.teamName] || [item.teamName];
    
    // 여러 가능한 이름으로 매칭 시도
    let team = null;
    for (const possibleName of possibleNames) {
      team = teams.find(t => {
        const dbName = t.name.toLowerCase();
        const searchName = possibleName.toLowerCase();
        // 정확히 일치하거나 포함되는지 확인
        return dbName === searchName || dbName.includes(searchName) || searchName.includes(dbName);
      });
      if (team) break;
    }
    
    if (team) {
      updates.push({
        team_id: team.id,
        player_name: item.name,
        back_number: item.number,
        description: item.desc
      });
      console.log(`  ✅ ${item.teamName} - ${item.name} (${item.number}번) -> ${team.name}`);
    } else {
      notFound.push(`${item.teamName} - ${item.name} (${item.number}번)`);
      console.warn(`  ⚠️ 매칭 실패: ${item.teamName} - ${item.name}`);
    }
  }

  if (notFound.length > 0) {
    console.log(`\n⚠️ 매칭되지 않은 영구결번 (${notFound.length}개):`);
    notFound.forEach(item => console.log(`   - ${item}`));
  }

  // 2. 기존 데이터 삭제 (중복 방지)
  await supabase.from('retired_numbers').delete().neq('id', 0);

  // 3. 데이터 삽입
  const { error } = await supabase.from('retired_numbers').insert(updates);

  if (error) {
    console.error('❌ 실패:', error);
  } else {
    console.log(`✅ 성공! 총 ${updates.length}개의 영구결번이 저장되었습니다.`);
  }
}

seedRetiredNumbers();