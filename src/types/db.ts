/**
 * 데이터베이스 타입 정의
 * Supabase 테이블 구조에 맞춘 타입 정의
 */

/**
 * 구단 정보 타입
 */
export interface Team {
  id: string;
  name: string;
  budget?: number | null;
}

/**
 * 선수 정보 타입
 */
export interface Player {
  id: string;
  team_id: string;
  name: string;
  age: number;
  position: string;
  hand: string | null;
  roster_level: string | null;
  velocity_min: number | null;
  velocity_max: number | null;
  stuff: number | null;
  movement: number | null;
  control: number | null;
  stamina: number | null;
  contact: number | null;
  gap_power: number | null;
  power: number | null;
  eye: number | null;
  speed: number | null;
  defense: number | null;
  note: string | null;
  is_active: boolean | null;
  created_at: string | null;
  salary?: number | null;
}

