import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

/**
 * Supabase 클라이언트 인스턴스
 * 
 * 타입 안정성을 위해 Database 타입을 제네릭으로 사용합니다.
 * Database 타입은 src/types/database.types.ts에서 정의됩니다.
 * 
 * @example
 * ```typescript
 * const { data, error } = await supabase
 *   .from('users')
 *   .select('*');
 * ```
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

