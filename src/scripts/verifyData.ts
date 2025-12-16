import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { KBO_INITIAL_DATA } from '../constants/prompts/InitialData';

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

// 이름과 나이 파싱 (Seed 스크립트와 동일한 로직)
function parseNameAndAge(rawName: string) {
  const match = rawName.match(/(.+)\s?\((\d+)\)/);
  if (match) return { name: match[1].trim(), age: parseInt(match[2], 10) };
  return { name: rawName.trim(), age: 20 };
}

async function verifyData() {
  console.log('🕵️‍♂️ [Ultimate Verification] 데이터 완전 무결성 검사 시작...');

  // 1. DB 데이터 가져오기
  const { data: dbPlayers, error } = await supabase
    .from('players')
    .select('*'); 
  
  if (error || !dbPlayers) throw error;
  console.log(`📊 DB 로드 완료: ${dbPlayers.length}명`);

  const lines = KBO_INITIAL_DATA.split('\n');
  
  let totalChecks = 0;
  let mismatchCount = 0;
  const errors: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    // 헤더, 빈 줄, 팀 구분선 건너뛰기
    if (!trimmed || trimmed.startsWith('P,NM') || trimmed.startsWith('D,P') || trimmed.startsWith('---') || trimmed.startsWith('#')) continue;

    const cols = trimmed.split(',').map(s => s.trim());
    const isBatter = cols.length > 10;

    // --- 비교할 기대값(Expected Values) 추출 ---
    let exp = {
      name: '',
      age: 0,
      position: '',
      role: '',
      hand: '',
      note: '',
      stats: {} as any
    };

    if (!isBatter) {
      // [투수] P,NM,H,V,S,M,C,ST,N
      const [role, rawName, hand, vel, stuff, mov, ctrl, stam, ...rest] = cols;
      const { name, age } = parseNameAndAge(rawName);
      
      exp.name = name;
      exp.age = age;
      exp.position = 'P';
      exp.role = role;
      exp.hand = hand;
      exp.note = rest.join(', ');
      exp.stats = {
        stuff: parseInt(stuff) || 40,
        movement: parseInt(mov) || 40,
        control: parseInt(ctrl) || 40,
        stamina: parseInt(stam) || 40,
        velocity: vel || '135-140'
      };
    } else {
      // [타자] D,P,H,NM,CON,GAP,POW,EYE,RUN,FLD,STATS,SAL,N
      const [division, pos, hand, rawName, con, gap, pow, eye, run, fld, prevStats, , note] = cols;
      const { name, age } = parseNameAndAge(rawName);
      
      exp.name = name;
      exp.age = age;
      exp.position = pos;
      exp.role = division; // 1군/2군
      exp.hand = hand;
      // Seed 스크립트에서 note는 prevStats와 note를 합쳐서 저장함
      exp.note = `${prevStats} ${note || ''}`.trim();
      exp.stats = {
        contact: parseInt(con) || 40,
        gap: parseInt(gap) || 40,
        power: parseInt(pow) || 40,
        eye: parseInt(eye) || 40,
        run: parseInt(run) || 40,
        field: parseInt(fld) || 40,
      };
    }

    totalChecks++;

    // 2. DB에서 선수 찾기
    const dbPlayer = dbPlayers.find(p => p.name === exp.name);

    if (!dbPlayer) {
      errors.push(`❌ [MISSING] DB에 없음: ${exp.name}`);
      mismatchCount++;
      continue;
    }

    // 3. 정밀 비교 (Field by Field)
    const diffs: string[] = [];

    if (dbPlayer.age !== exp.age) diffs.push(`나이(${dbPlayer.age} vs ${exp.age})`);
    if (dbPlayer.position !== exp.position) diffs.push(`포지션(${dbPlayer.position} vs ${exp.position})`);
    if (dbPlayer.role !== exp.role) diffs.push(`역할(${dbPlayer.role} vs ${exp.role})`);
    if (dbPlayer.hand !== exp.hand) diffs.push(`손(${dbPlayer.hand} vs ${exp.hand})`);
    
    // Note 비교 (공백 등 미세한 차이 무시를 위해 trim 처리 후 비교)
    const dbNote = (dbPlayer.note || '').trim();
    const expNote = (exp.note || '').trim();
    if (dbNote !== expNote) diffs.push(`노트 불일치\n      DB : "${dbNote}"\n      CSV: "${expNote}"`);

    // Stats 비교
    const dbStats = dbPlayer.stats as any;
    for (const [key, val] of Object.entries(exp.stats)) {
      if (String(dbStats[key]) !== String(val)) {
        diffs.push(`스탯[${key}](${dbStats[key]} vs ${val})`);
      }
    }

    // 에러가 하나라도 있으면 기록
    if (diffs.length > 0) {
      errors.push(`⚠️ [DIFF] ${exp.name}: ${diffs.join(', ')}`);
      mismatchCount++;
    }
  }

  // 결과 리포트
  console.log('='.repeat(50));
  if (mismatchCount === 0) {
    console.log(`✅ [PERFECT MATCH]`);
    console.log(`   총 ${totalChecks}명의 데이터가 완벽하게 일치합니다.`);
    console.log(`   검증 항목: 이름, 나이, 포지션, 역할, 투/타, 노트, 세부 스탯`);
  } else {
    console.log(`❌ [FAIL] 총 ${mismatchCount}건의 데이터 불일치 발견!`);
    console.log(errors.join('\n'));
  }
  console.log('='.repeat(50));
}

verifyData();