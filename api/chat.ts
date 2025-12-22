import { streamText, convertToModelMessages } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createClient } from '@supabase/supabase-js';
import { KBO_SYSTEM_LOGIC } from './SystemLogic';

export const config = {
  runtime: 'edge',
};

function pickEnv(...keys: string[]) {
  // Edge 런타임에서는 `process`가 아예 없을 수 있습니다.
  // undeclared global `process`를 직접 참조하면 ReferenceError가 나므로
  // globalThis를 통해 안전하게 접근합니다.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const env = ((globalThis as any).process?.env || {}) as Record<string, unknown>;
  for (const k of keys) {
    const v = env[k];
    if (typeof v === 'string' && v.trim().length > 0) return v.trim();
  }
  return '';
}

function badRequest(message: string, status = 400) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

async function generateGameContext({
  supabaseUrl,
  supabaseAnonKey,
  accessToken,
  teamCode,
}: {
  supabaseUrl: string;
  supabaseAnonKey: string;
  accessToken: string;
  teamCode: string;
}): Promise<{
  context: string;
  userId: string;
  teamId: number;
  currentBudget: number;
  currentYear: number;
  currentMonth: number;
  currentWeek: number;
}> {
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });

  const { data: userRes, error: userErr } = await supabase.auth.getUser(accessToken);
  if (userErr || !userRes?.user) {
    return {
      context: "❌ [SYSTEM ERROR] 사용자 인증이 필요합니다. 다시 로그인해주세요.",
      userId: '',
      teamId: -1,
      currentBudget: 0,
    };
  }
  const userId = userRes.user.id;

  // 0) 팀 코드 -> teamId
  const { data: teamIdRow, error: teamIdErr } = await supabase
    .from('teams')
    .select('id')
    .eq('code', teamCode)
    .single();
  if (teamIdErr || !teamIdRow) {
    return {
      context: `❌ [SYSTEM ERROR] 팀 코드 "${teamCode}"에 해당하는 팀을 찾을 수 없습니다.`,
      userId,
      teamId: -1,
      currentBudget: 0,
    };
  }
  const teamId = teamIdRow.id as number;

  // 1) 병렬 쿼리로 필요한 데이터 조회
  const [gameStateRes, teamRes, gamePlayersRes, masterPlayersRes, retiredRes] = await Promise.all([
    supabase
      .from('game_state')
      .select('*')
      .eq('user_id', userId)
      .eq('my_team_id', teamId)
      .single(),
    supabase.from('teams').select('*').eq('id', teamId).single(),
    supabase
      .from('game_players')
      .select(
        `
          *,
          players!inner(id, name, position, age, hand)
        `
      )
      .eq('user_id', userId)
      .eq('team_id', teamId)
      .order('created_at', { ascending: true }),
    supabase
      .from('players')
      .select('id, name, position, age, hand, role, stats, condition, salary')
      .eq('team_id', teamId)
      .or('role.eq.1군,role.eq.선발,role.eq.마무리,role.eq.불펜,role.eq.지명타자,role.eq.내야수,role.eq.외야수')
      .order('salary', { ascending: false })
      .limit(28),
    supabase.from('retired_numbers').select('*').eq('team_id', teamId),
  ]);

  const gameState = gameStateRes.data as any;
  const team = teamRes.data as any;
  const gamePlayers = (gamePlayersRes.data as any[]) || [];
  const masterPlayers = (masterPlayersRes.data as any[]) || [];
  const retired = (retiredRes.data as any[]) || [];

  if (!gameState || !team) {
    return {
      context: "❌ [SYSTEM ERROR] 게임 상태를 불러올 수 없습니다. '게임 시작'을 먼저 진행해주세요.",
      userId,
      teamId,
      currentBudget: 0,
    };
  }

  // 2) 로스터 결정: game_players 우선, 없으면 마스터 데이터 사용 (Fallback)
  let roster: Array<{
    name: string;
    position: string;
    age?: number;
    hand?: string;
    role?: string;
    stats: any;
    condition: string;
    salary: number;
  }>;

  if (gamePlayers.length > 0) {
    roster = gamePlayers.map((gp) => {
      const player = (gp as any).players;
      return {
        name: player?.name || '알 수 없음',
        position: player?.position || '?',
        age: player?.age,
        hand: player?.hand,
        role: gp.role || '1군',
        stats: gp.stats || {},
        condition: gp.condition || '건강',
        salary: gp.salary || 0,
      };
    });
  } else {
    roster = masterPlayers.map((p) => ({
      name: p.name,
      position: p.position,
      age: (p as any).age,
      hand: (p as any).hand,
      role: p.role || '1군',
      stats: p.stats || {},
      condition: p.condition || '건강',
      salary: p.salary || 0,
    }));
  }

  // 3) 샐러리캡 및 재정 계산
  const totalSalary = roster.reduce((sum, p) => sum + (p.salary || 0), 0);
  let capLimit = 1370000; // Normal: 137억 (만원 단위)
  if (gameState.difficulty === 'HELL') capLimit = 1000000;
  if (gameState.difficulty === 'EASY') capLimit = 2500000;
  if (gameState.difficulty === 'HARD') capLimit = 1200000;
  const salaryCapPercent = ((totalSalary / capLimit) * 100).toFixed(1);

  // 4) YYYY/MM/DD 형식 날짜 생성 (현재는 week를 날짜로 매핑: 1주차=1일, 2주차=8일, 3주차=15일, 4주차=22일)
  const year = gameState.current_year || 2026;
  const month = gameState.current_month || 1;
  const week = gameState.current_week || 1;
  const day = Math.min(28, (Math.max(1, Math.min(week, 4)) - 1) * 7 + 1);
  const dateYMD = `${year}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`;

  // 5) 로스터 테이블용 데이터 분리
  const pitchers = roster.filter((p) => p.position === 'P');
  const batters = roster.filter((p) => p.position !== 'P');

  const toEok = (salaryWon: number) => (salaryWon / 100000000).toFixed(1) + '억';
  const divisionOf = (role?: string) => (role && role.includes('2군') ? '2군' : '1군');

  const pitchersTable = [
    '| 구분 | 보직 | 투구손 | 이름 | 나이 | 구속(km/h) | 구위 | 제구 | 체력 | 변화구 | 연봉 | 컨디션 |',
    '|---|---|---|---|---:|---:|---|---|---|---|---:|---|',
    ...pitchers.map((p) => {
      const s: any = p.stats || {};
      return `| ${divisionOf(p.role)} | ${p.role || '투수'} | ${p.hand || '-'} | ${p.name} | ${p.age ?? '-'} | ${s.velocity ?? '-'} | ${s.stuff ?? '-'} | ${s.control ?? '-'} | ${s.stamina ?? s.sta ?? '-'} | ${s.pitches ?? s.breaking ?? '-'} | ${toEok(p.salary || 0)} | ${p.condition || '건강'} |`;
    }),
  ].join('\n');

  const battersTable = [
    '| 구분 | 포지션 | 타격손 | 이름 | 나이 | 컨택 | 파워 | 선구안 | 주력 | 수비 | 연봉 | 컨디션 |',
    '|---|---|---|---|---:|---|---|---|---|---|---:|---|',
    ...batters.map((p) => {
      const s: any = p.stats || {};
      return `| ${divisionOf(p.role)} | ${p.position || '-'} | ${p.hand || '-'} | ${p.name} | ${p.age ?? '-'} | ${s.contact ?? s.con ?? '-'} | ${s.power ?? s.pow ?? '-'} | ${s.eye ?? '-'} | ${s.run ?? '-'} | ${s.field ?? s.fld ?? '-'} | ${toEok(p.salary || 0)} | ${p.condition || '건강'} |`;
    }),
  ].join('\n');

  // 6) 영구결번 문자열 포맷팅
  const retiredString =
    retired.length > 0 ? retired.map((r) => `${r.back_number}번(${r.player_name})`).join(', ') : '없음';

  // 7) 최종 컨텍스트 조립
  const budget = gameState.budget || 3000000000;
  const context = `
[CURRENT_GAME_CONTEXT]
- **일자**: ${dateYMD} (DB 기준)
- **모드**: ${gameState.difficulty} (구단주 성향: ${gameState.owner_persona || 'A'})
- **구단**: ${team.name} (${team.region})
- **재정**: ${(budget / 100000000).toFixed(1)}억 원 (보유 자금)
- **샐러리캡**: ${(totalSalary / 10000).toFixed(1)}억 / ${(capLimit / 10000).toFixed(1)}억 (${salaryCapPercent}%)

**[투수 로스터 (DB)]**
${pitchersTable}

**[야수 로스터 (DB)]**
${battersTable}

**[영구결번 (사용 금지)]**
${retiredString}
`;

  return { context, userId, teamId, currentBudget: budget, currentYear: year, currentMonth: month, currentWeek: week };
}

function parseStatusForDb(text: string): { year?: number; month?: number; day?: number; budgetWon?: number } {
  // 예: [STATUS] 날짜: 2026/01/08 | 자금: 12.3억 원 | 샐러리캡: 70.1%
  const m = text.match(/\[STATUS\][^\n]*날짜[:\s]*(\d{4})\/(\d{1,2})\/(\d{1,2})[^\n]*?자금[:\s]*([0-9,.]+)\s*억/i);
  if (!m) return {};
  const year = parseInt(m[1], 10);
  const month = parseInt(m[2], 10);
  const day = parseInt(m[3], 10);
  const budgetEok = parseFloat(String(m[4]).replace(/,/g, ''));
  const budgetWon = !isNaN(budgetEok) ? Math.round(budgetEok * 100000000) : undefined;
  return { year, month, day, budgetWon };
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return badRequest('Method Not Allowed', 405);
  }

  const supabaseUrl =
    pickEnv('SUPABASE_URL', 'VITE_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_URL') || '';
  const supabaseAnonKey =
    pickEnv('SUPABASE_ANON_KEY', 'VITE_SUPABASE_ANON_KEY', 'NEXT_PUBLIC_SUPABASE_ANON_KEY') || '';

  if (!supabaseUrl || !supabaseAnonKey) {
    return badRequest('Supabase 환경변수가 설정되지 않았습니다. (SUPABASE_URL, SUPABASE_ANON_KEY)', 500);
  }

  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization') || '';
  const accessToken = authHeader.toLowerCase().startsWith('bearer ')
    ? authHeader.slice(7).trim()
    : '';

  if (!accessToken) {
    return badRequest('인증 토큰이 없습니다. 다시 로그인해주세요.', 401);
  }

  const body = (await req.json().catch(() => null)) as any | null;

  if (!body) return badRequest('Invalid JSON body');

  // DefaultChatTransport는 UIMessage[]를 전송합니다.
  // streamText는 ModelMessage[]가 필요하므로 변환합니다.
  const uiMessages = Array.isArray(body.messages) ? body.messages : [];
  const extractLatestUserText = (messages: any[]): string => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i];
      if (m?.role !== 'user') continue;
      if (typeof m.content === 'string' && m.content.trim()) return m.content.trim();
      if (typeof m.text === 'string' && m.text.trim()) return m.text.trim();
      const parts = m.parts;
      if (Array.isArray(parts)) {
        const text = parts
          .map((p: any) => (typeof p === 'string' ? p : p?.text ?? p?.content ?? ''))
          .join(' ')
          .trim();
        if (text) return text;
      }
    }
    return '';
  };
  let modelMessages;
  try {
    modelMessages = convertToModelMessages(uiMessages);
  } catch (e: any) {
    return badRequest(
      `Invalid messages format. UIMessage[]를 ModelMessage[]로 변환할 수 없습니다. (${e?.message || 'unknown'})`,
      400
    );
  }

  // 사용자의 Gemini API Key는 DB에 저장하지 않으며, 요청 단위로만 사용합니다.
  // 실수로 body 로그가 남는 위험을 줄이기 위해 body가 아닌 헤더로만 전달받습니다.
  const apiKey = (req.headers.get('x-gemini-api-key') || '').trim();
  const teamCode = (body.teamCode || '').trim();

  if (!apiKey) return badRequest('API Key가 필요합니다.');
  if (!teamCode) return badRequest('Team Code가 필요합니다.');
  if (!Array.isArray(modelMessages) || modelMessages.length === 0) return badRequest('전송할 메시지가 없습니다.');

  const ctx = await generateGameContext({
    supabaseUrl,
    supabaseAnonKey,
    accessToken,
    teamCode,
  });
  const gameContext = ctx.context;

  const latestUserText = extractLatestUserText(uiMessages);
  const isBroadcastWeek = ctx.currentMonth === 1 && ctx.currentWeek === 1;
  const isBroadcastSelection = /\b(kbs|mbc|sbs)\s*계약\b/i.test(latestUserText) || /펨붕\s*tv\s*계약/i.test(latestUserText);
  const shouldBlockBroadcastAuto = isBroadcastWeek && !isBroadcastSelection;

  const systemPrompt = `${KBO_SYSTEM_LOGIC}

${gameContext}

**[중요]**
- 위 [CURRENT_GAME_CONTEXT] 섹션의 데이터를 절대적 진실로 받아들이세요.
- Context에 없는 선수는 언급하지 마세요.
- 자금 계산은 Context의 '현재 보유 자금'을 기준으로 수행하세요.
- 영구결번 리스트의 등번호는 절대 사용하지 마세요.
${shouldBlockBroadcastAuto ? '\n\n[OVERRIDE: 1월 1주차 방송국 계약]\n- 지금은 1월 1주차이며, 사용자가 방송국을 선택하기 전입니다.\n- 이 턴에서는 절대로 “계약 완료/자금 지급/다음 일정 진행/뉴스 출력”을 하지 말고,\n  오직 (1) 4개 방송국 제안서와 (2) 방송국 4개 [OPTIONS] 버튼만 출력하고 대기하세요.\n- [OPTIONS] value는 반드시 \"KBS 계약\"/\"MBC 계약\"/\"SBS 계약\"/\"펨붕TV 계약\" 이어야 합니다.\n' : ''}`;

  const google = createGoogleGenerativeAI({ apiKey });
  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: systemPrompt,
    messages: modelMessages,
    temperature: shouldBlockBroadcastAuto ? 0.2 : 0.7,
    onFinish: async ({ text }) => {
      // 모델 출력의 [STATUS]를 DB(game_state)에 반영해 다음 턴 Context가 일관되도록 합니다.
      if (!ctx.userId || ctx.teamId < 0) return;
      // 1월 1주차 방송국 계약 "선택 전"에는 DB 업데이트를 차단해 자동 지급/스킵으로 인한 상태 오염을 막습니다.
      if (shouldBlockBroadcastAuto) return;
      const parsed = parseStatusForDb(text || '');
      if (!parsed.budgetWon || !parsed.year || !parsed.month || !parsed.day) return;

      // day -> week(1~4)로 환산 (1-7:1주차, 8-14:2주차, 15-21:3주차, 22+:4주차)
      const week = parsed.day <= 7 ? 1 : parsed.day <= 14 ? 2 : parsed.day <= 21 ? 3 : 4;

      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false, autoRefreshToken: false },
        global: { headers: { Authorization: `Bearer ${accessToken}` } },
      });

      await supabase
        .from('game_state')
        .update({
          budget: parsed.budgetWon,
          current_year: parsed.year,
          current_month: parsed.month,
          current_week: week,
        })
        .eq('user_id', ctx.userId)
        .eq('my_team_id', ctx.teamId);
    },
  });

  // ✅ AI SDK v5 UI Message Stream (processUIMessageStream가 기대하는 형태)
  // 토큰 사용량(totalUsage)을 message metadata로 실어서 프론트에서 확인 가능하게 합니다.
  return result.toUIMessageStreamResponse({
    messageMetadata: ({ part }: any) => {
      if (part?.type === 'finish' && part?.totalUsage) {
        return { usage: part.totalUsage };
      }
      return undefined;
    },
  });
}


