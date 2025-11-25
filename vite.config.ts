import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 배포 시 base 경로 설정 (필요시 수정)
  // base: '/baseball/',
})

