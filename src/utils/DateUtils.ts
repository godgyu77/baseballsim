/**
 * [NEW] 날짜 유틸리티 함수
 * 파일명에 날짜 포함용
 */

/**
 * [NEW] 현재 날짜와 시간을 파일명 형식으로 변환
 * 예: "20240520_1430" (YYYYMMDD_HHMM)
 * 
 * @returns 날짜 문자열
 */
export function formatDateForFilename(): string {
  const now = new Date();
  
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  
  return `${year}${month}${day}_${hours}${minutes}`;
}

/**
 * [NEW] 파일명 생성
 * 예: "KBO_Sim_Save_20240520_1430.json"
 * 
 * @param prefix 파일명 접두사 (기본값: "KBO_Sim_Save")
 * @returns 파일명
 */
export function generateSaveFilename(prefix: string = 'KBO_Sim_Save'): string {
  const dateStr = formatDateForFilename();
  return `${prefix}_${dateStr}.json`;
}

