// System Logic을 api 폴더로 복사하는 스크립트
// Vercel 빌드 전에 실행되어 Serverless Functions에서 사용 가능하도록 함

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourcePath = path.join(__dirname, '../src/constants/prompts/SystemLogic.ts');
const destPath = path.join(__dirname, '../api/SystemLogic.ts');

try {
  // api 폴더가 없으면 생성
  const apiDir = path.dirname(destPath);
  if (!fs.existsSync(apiDir)) {
    fs.mkdirSync(apiDir, { recursive: true });
  }

  // 파일 복사
  fs.copyFileSync(sourcePath, destPath);
  console.log('✅ System Logic copied to api/SystemLogic.ts');
} catch (error) {
  console.error('❌ Failed to copy System Logic:', error.message);
  process.exit(1);
}
