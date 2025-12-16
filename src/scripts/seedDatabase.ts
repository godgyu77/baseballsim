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

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// 구단 정보 (code 추가, 한글 팀명)
const TEAM_MAPPING: Record<string, any> = {
  '#KT': { code: 'kt', name: 'KT 위즈', region: '수원', stadium: '수원 KT 위즈 파크' },
  '#Samsung': { code: 'samsung', name: '삼성 라이온즈', region: '대구', stadium: '대구 삼성 라이온즈 파크' },
  '#Hanwha': { code: 'hanwha', name: '한화 이글스', region: '대전', stadium: '한화생명 이글스 파크' },
  '#SSG': { code: 'ssg', name: 'SSG 랜더스', region: '인천', stadium: '인천 SSG 랜더스 필드' },
  '#Kiwoom': { code: 'kiwoom', name: '키움 히어로즈', region: '서울', stadium: '고척 스카이돔' },
  '#NC': { code: 'nc', name: 'NC 다이노스', region: '창원', stadium: '창원 NC 파크' },
  '#LG': { code: 'lg', name: 'LG 트윈스', region: '서울', stadium: '잠실 야구장' },
  '#Lotte': { code: 'lotte', name: '롯데 자이언츠', region: '부산', stadium: '사직 야구장' },
  '#Doosan': { code: 'doosan', name: '두산 베어스', region: '서울', stadium: '잠실 야구장' },
  '#KIA': { code: 'kia', name: 'KIA 타이거즈', region: '광주', stadium: '광주-기아 챔피언스 필드' },
};

// S급 선수 현실 연봉 테이블 (단위: 만원)
const REAL_SALARY_TABLE: Record<string, number> = {
  '류현진': 250000, '최정': 100000, '구자욱': 130000, '박동원': 80000,
  '오지환': 60000, '강백호': 60000, '김도영': 40000, '양현종': 50000,
  '나성범': 200000, '김광현': 100000, '안우진': 40000, '양의지': 200000,
  '김재환': 100000, '전준우': 100000, '박세웅': 150000, '고영표': 200000,
  '문동주': 30000, '원태인': 45000, '손아섭': 50000, '박해민': 60000,
  '홍창기': 50000, '정해영': 35000, '오승환': 40000, '김택연': 10000,
  '김현수': 80000, '최형우': 80000,
};

// 이름 파싱: "강건 (22)" -> name: "강건", age: 22
function parseNameAndAge(rawName: string) {
  const match = rawName.match(/(.+)\s?\((\d+)\)/);
  if (match) return { name: match[1].trim(), age: parseInt(match[2], 10) };
  return { name: rawName.trim(), age: 20 };
}

// 연봉/계약기간 계산 로직
function estimateContract(name: string, age: number, ovr: number, note: string) {
  if (REAL_SALARY_TABLE[name]) return { salary: REAL_SALARY_TABLE[name], years: 4 };
  if (note.includes('신인') || note.includes('퓨처스') || note.includes('육성') || ovr < 45) {
    return { salary: 3000 + Math.floor(Math.random() * 1500), years: 1 };
  }
  if (age >= 35 && (note.includes('은퇴') || note.includes('에이징'))) {
    return { salary: 5000 + Math.floor(Math.random() * 5000), years: 1 };
  }
  if (ovr >= 60) {
    const base = ovr * 2000;
    const years = age > 28 ? 4 : 1;
    return { salary: base + Math.floor(Math.random() * 5000), years };
  }
  const salary = 5000 + ((ovr - 45) * 7000) + Math.floor(Math.random() * 2000);
  return { salary: Math.floor(salary), years: 1 };
}

async function seedDatabase() {
  console.log('🚀 [Start] 데이터베이스 시딩 (Stats Fix Version)');

  try {
    // 1. players는 삭제하지 않음 (기존 선수 데이터 보존)
    // teams는 외래 키 제약 조건 때문에 삭제할 수 없으므로 upsert 사용
    console.log('📋 [Info] 기존 선수 데이터는 보존하고, 팀 데이터는 upsert로 처리합니다.');

    const lines = KBO_INITIAL_DATA.split('\n');
    let currentTeamId: number | null = null;
    const playersBuffer: any[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      // 헤더나 빈 줄 건너뛰기
      if (!trimmed || trimmed.startsWith('P,NM') || trimmed.startsWith('D,P') || trimmed.startsWith('---')) continue;

      // 팀 처리
      if (trimmed.startsWith('#')) {
        const teamKey = trimmed.split(' ')[0];
        const teamInfo = TEAM_MAPPING[teamKey];
        if (!teamInfo) continue;

        // 중복 방지: code를 기준으로 upsert (있으면 업데이트, 없으면 삽입)
        const { data: teamData, error: upsertError } = await supabaseAdmin
          .from('teams')
          .upsert(
            { 
              code: teamInfo.code, 
              name: teamInfo.name, 
              region: teamInfo.region, 
              stadium: teamInfo.stadium, 
              budget: 15000000000 
            },
            { 
              onConflict: 'code', // code 컬럼이 UNIQUE이므로 이를 기준으로 upsert
              ignoreDuplicates: false // false면 업데이트, true면 무시
            }
          )
          .select()
          .single();

        if (upsertError) {
          console.error(`❌ 팀 upsert 실패 (${teamInfo.name}):`, upsertError.message);
          // upsert 실패 시 code로 다시 조회 시도
          const { data: retryTeam } = await supabaseAdmin
            .from('teams')
            .select('id')
            .eq('code', teamInfo.code)
            .maybeSingle();
          currentTeamId = retryTeam?.id || null;
          if (currentTeamId) {
            console.log(`🔄 Team 재조회: ${teamInfo.name} (ID: ${currentTeamId})`);
          }
          continue;
        }

        currentTeamId = teamData?.id || null;
        if (currentTeamId) {
          console.log(`🏟️ Team: ${teamInfo.name} (ID: ${currentTeamId})`);
        } else {
          console.warn(`⚠️ Team upsert 성공했지만 ID를 가져오지 못함: ${teamInfo.name}`);
        }
        continue;
      }

      if (!currentTeamId) continue;

      // 콤마 분리
      const cols = trimmed.split(',').map(s => s.trim());
      
      // ★ 핵심 수정: 타자/투수 구분 로직 (컬럼 개수 기준)
      // 타자는 컬럼이 13개, 투수는 9개
      const isBatter = cols.length > 10;

      let player: any = { team_id: currentTeamId, created_at: new Date().toISOString() };

      if (!isBatter) {
        // ----------------------------------------------------
        // ⚾ 투수 (Pitcher) - 컬럼 9개
        // 원본: 2군 불펜, 강건 (22), 우투, 144-148, 45, 45, 40, 40, 퓨처스
        // ----------------------------------------------------
        const [role, rawName, hand, vel, stuff, mov, ctrl, stam, ...rest] = cols;
        const note = rest.join(', '); // 퓨처스 등
        const { name, age } = parseNameAndAge(rawName);

        // 숫자 변환 시 에러 방지를 위해 || 40 기본값 처리
        const stats = {
          velocity: vel || '135-140',
          stuff: parseInt(stuff) || 40,
          movement: parseInt(mov) || 40,
          control: parseInt(ctrl) || 40,
          stamina: parseInt(stam) || 40,
        };
        const ovr = Math.round((stats.stuff + stats.movement + stats.control) / 3);
        const contract = estimateContract(name, age, ovr, note || '');

        player = {
          ...player,
          name, age,
          position: 'P', 
          role, // '선발', '마무리', '2군 불펜' 등
          hand,
          stats, // JSONB에 들어갈 핵심 데이터
          note,
          salary: contract.salary,
          contract_years: contract.years,
          condition: 100,
        };

      } else {
        // ----------------------------------------------------
        // 🏏 타자 (Batter) - 컬럼 13개
        // 원본: 1군, 지명타자, 좌타, 김현수(38), 55, 55, 45, 65, 25, 35, .285..., -, -
        // ----------------------------------------------------
        const [division, pos, hand, rawName, con, gap, pow, eye, run, fld, prevStats, , note] = cols;
        const { name, age } = parseNameAndAge(rawName);

        const stats = {
          contact: parseInt(con) || 40,
          gap: parseInt(gap) || 40,
          power: parseInt(pow) || 40,
          eye: parseInt(eye) || 40,
          run: parseInt(run) || 40,
          field: parseInt(fld) || 40,
        };
        const ovr = Math.round((stats.contact + stats.power + stats.field) / 3);
        const contract = estimateContract(name, age, ovr, note || '');

        player = {
          ...player,
          name, age,
          position: pos, // '지명타자', '1루수' 등
          role: division, // '1군', '2군'
          hand,
          stats, // JSONB에 들어갈 핵심 데이터
          note: `${prevStats} ${note || ''}`.trim(),
          salary: contract.salary,
          contract_years: contract.years,
          condition: 100,
        };
      }
      playersBuffer.push(player);
    }

    // 배치 삽입 (50개씩)
    const BATCH_SIZE = 50;
    for (let i = 0; i < playersBuffer.length; i += BATCH_SIZE) {
      const batch = playersBuffer.slice(i, i + BATCH_SIZE);
      const { error } = await supabaseAdmin.from('players').insert(batch);
      if (error) throw error;
      console.log(`   - Saved ${Math.min(i + BATCH_SIZE, playersBuffer.length)} / ${playersBuffer.length}`);
    }

    console.log('🎉 [Success] Stats Data Correctly Inserted!');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

seedDatabase();