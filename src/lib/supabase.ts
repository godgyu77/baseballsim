import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';

// Vite 환경 변수 사용 (VITE_ 접두사 또는 NEXT_PUBLIC_ 접두사 지원)
// @ts-ignore - Vite 환경 변수는 런타임에 존재
const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || '') as string;
// @ts-ignore - Vite 환경 변수는 런타임에 존재
const supabaseKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '') as string;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase 환경 변수가 설정되지 않았습니다. VITE_SUPABASE_URL과 VITE_SUPABASE_ANON_KEY를 확인하세요.');
}

/**
 * Supabase 클라이언트 인스턴스 (싱글톤)
 * 
 * 모든 파일에서 이 인스턴스를 공유하여 사용합니다.
 * Multiple GoTrueClient instances 경고를 방지합니다.
 * 
 * @example
 * ```typescript
 * import { supabase } from '@/lib/supabase';
 * 
 * const { data, error } = await supabase
 *   .from('game_state')
 *   .select('*');
 * ```
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

