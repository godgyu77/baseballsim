import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 배포 시 base 경로 설정 (필요시 수정)
  // base: '/baseball/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 큰 상수 파일을 별도 청크로 분리
          'game-constants': ['./src/constants/GameConstants'],
          // Google Generative AI 라이브러리를 별도 청크로 분리
          'gemini': ['@google/generative-ai'],
          // React 관련 라이브러리 분리
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
    // 청크 크기 경고 임계값을 1000KB로 상향 조정 (선택사항)
    chunkSizeWarningLimit: 1000,
  },
})

