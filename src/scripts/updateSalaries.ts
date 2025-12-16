import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { KBO_INITIAL_DATA } from '../constants/prompts/InitialData';

// 영문명 -> DB 이름 매핑
const TEAM_NAME_MAP: Record<string, string> = {
  'KT Wiz': 'KT',
  'Samsung Lions': '삼성',
  'Hanwha Eagles': '한화',
  'SSG Landers': 'SSG',
  'Kiwoom Heroes': '키움',
  'NC Dinos': 'NC',
  'LG Twins': 'LG',
  'Lotte Giants': '롯데',
  'Doosan Bears': '두산',
  'KIA Tigers': 'KIA',
};

// .env.local 로드
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables.');
  console.error('Please check your .env.local file.');
  process.exit(1);
}

// SSL 인증서 문제 해결 (개발 환경)
if (process.env.NODE_TLS_REJECT_UNAUTHORIZED !== '0') {
  console.warn('⚠️  SSL 인증서 검증을 비활성화합니다. (개발 환경 전용)');
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 연봉 계산 로직 (단위: 원)
function calculateSalary(div: string, note: string, age: number): number {
  const baseSalary = 30000000; // 최저 연봉 3,000만 원

  // 1. S급 (10억 ~ 25억)
  if (note.includes('MVP') || note.includes('FA') || note.includes('레전드') || note.includes('에이스') || note.includes('국대') || note.includes('홈런왕')) {
    return Math.floor(Math.random() * (250 - 100 + 1) + 100) * 10000000;
  }
  
  // 2. A급 (3억 ~ 8억) - 마무리, 필승조, 주전, 타이틀 홀더
  if (note.includes('마무리') || note.includes('필승조') || note.includes('주전') || note.includes('올스타') || note.includes('다승왕') || note.includes('도루왕') || note.includes('구원왕')) {
    return Math.floor(Math.random() * (80 - 30 + 1) + 30) * 10000000;
  }

  // 3. B급 (1군 주전/백업) - 6천 ~ 2억
  if (div === '1군') {
    // 나이가 많을수록 조금 더 높게
    const min = 6;
    const max = 20;
    return Math.floor(Math.random() * (max - min + 1) + min) * 10000000;
  }

  // 4. C급 (2군/신인) - 3천 ~ 5천
  return Math.floor(Math.random() * (50 - 30 + 1) + 30) * 1000000;
}

async function updateSalaries() {
  // 실행 시 인자로 배치 번호를 받음 (1, 2, 3)
  const batchNum = process.argv[2];
  
  if (!['1', '2', '3'].includes(batchNum)) {
    console.error('❌ 실행 인자로 1, 2, 3 중 하나를 입력해주세요. (예: npx ts-node src/scripts/updateSalaries.ts 1)');
    process.exit(1);
  }

  console.log(`🚀 연봉 업데이트 배치 ${batchNum} 시작...`);

  // 데이터를 팀별로 분리
  const teamBlocks = KBO_INITIAL_DATA.split('---').slice(1).map(t => t.trim()).filter(t => t);
  
  // 배치별 팀 할당
  // 배치 1: 1~3팀 (KT, 삼성, 한화) - 인덱스 0~2
  // 배치 2: 4~6팀 (SSG, 키움, NC) - 인덱스 3~5
  // 배치 3: 7~10팀 (LG, 롯데, 두산, KIA) - 인덱스 6~9
  let targetTeams: string[] = [];
  if (batchNum === '1') targetTeams = teamBlocks.slice(0, 3);
  else if (batchNum === '2') targetTeams = teamBlocks.slice(3, 6);
  else if (batchNum === '3') targetTeams = teamBlocks.slice(6); // 마지막까지 모두 포함
  
  console.log(`📦 배치 ${batchNum}: ${targetTeams.length}개 팀 처리 예정`);

  for (const block of targetTeams) {
    const lines = block.split('\n');
    const teamNameLine = lines.find(l => l.startsWith('###'));
    if (!teamNameLine) continue;

    // 팀 이름 추출 (예: "1. KT 위즈 (KT Wiz)" -> "KT Wiz" -> "KT")
    const teamNameMatch = teamNameLine.match(/\(([^)]+)\)/);
    const englishName = teamNameMatch ? teamNameMatch[1] : '';
    
    if (!englishName) continue;

    // 영문명을 DB 이름으로 변환
    const teamName = TEAM_NAME_MAP[englishName] || englishName;
    
    if (!teamName) {
      console.log(`  ⚠️ 팀 이름 매핑 없음: ${englishName}`);
      continue;
    }

    console.log(`\n⚾ [${teamName}] 데이터 처리 중... (원본: ${englishName})`);
    
    // DB에서 팀 ID 조회
    const { data: team } = await supabase.from('teams').select('id').eq('name', teamName).single();
    if (!team) {
      console.log(`  ⚠️ DB에서 팀을 찾을 수 없음: ${teamName}`);
      continue;
    }

    // 선수 데이터 파싱 및 업데이트
    let updatedCount = 0;
    for (const line of lines) {
      if (!line.includes(',') || line.startsWith('POS') || line.startsWith('DIV')) continue;

      const parts = line.split(',');
      let div, nameStr, note;
      
      // 투수/타자 데이터 구조가 다르므로 길이로 판별하거나 DIV 컬럼 확인
      if (parts[0] === '1군' || parts[0] === '2군') {
        // 타자: DIV,POS,HAND,NAME,CON,GAP,POW,EYE,RUN,FLD,STATS,SAL,NOTE
        div = parts[0];
        nameStr = parts[3];
        note = parts[parts.length - 1] || '';
      } else {
        // 투수: POS,NAME,HAND,VEL,STF,MOV,CTL,STA,NOTE
        div = parts[0].includes('2군') ? '2군' : '1군';
        nameStr = parts[1];
        note = parts[parts.length - 1] || '';
      }

      // 이름과 나이 분리 "강백호(27)" -> "강백호"
      const nameMatch = nameStr.match(/([가-힣]+)/);
      const name = nameMatch ? nameMatch[1] : nameStr;

      // 나이 추출 (동명이인 구분용)
      const ageMatch = nameStr.match(/\((\d+)\)/);
      const age = ageMatch ? parseInt(ageMatch[1]) : 0;

      // 연봉 계산
      const salary = calculateSalary(div, note, age);

      // DB 업데이트
      const { error } = await supabase
        .from('players')
        .update({ salary })
        .eq('team_id', team.id)
        .eq('name', name)
        // 나이까지 체크하면 더 정확하지만, DB에 나이가 다를 경우를 대비해 이름+팀으로 매칭 권장
        // .eq('age', age) 
        .select();

      if (error) {
        console.error(`  ❌ 실패: ${name} - ${error.message}`);
      } else {
        updatedCount++;
        // console.log(`  ✅ ${name}: ${(salary/100000000).toFixed(1)}억`); // 너무 시끄러우면 주석
      }
    }
    console.log(`  ✨ ${teamName}: ${updatedCount}명 연봉 업데이트 완료`);
    
    // 렉 방지를 위해 팀 간 1초 대기
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log(`\n🎉 배치 ${batchNum} 완료!`);
}

updateSalaries();

