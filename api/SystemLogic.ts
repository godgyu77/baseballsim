// NOTE:
// 서버(Edge Function)와 프론트가 동일한 시스템 프롬프트를 사용하도록 단일 소스로 통일합니다.
// 과거에는 api/SystemLogic.ts와 src/constants/prompts/SystemLogic.ts가 서로 달라서
// 프롬프트 수정이 실제 채팅 응답에 반영되지 않는 문제가 있었습니다.
export { KBO_SYSTEM_LOGIC } from '../src/constants/prompts/SystemLogic';