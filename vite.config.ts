import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 배포 시 base 경로 설정 (필요시 수정)
  // base: '/baseball/',
  optimizeDeps: {
    // 의존성 최적화 문제 해결을 위한 설정
    force: true, // 강제로 재최적화
    exclude: [], // 문제가 되는 패키지가 있으면 여기에 추가
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
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

