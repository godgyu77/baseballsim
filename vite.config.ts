import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { Readable } from 'node:stream'

// https://vitejs.dev/config/
function vercelApiDevPlugin(): Plugin {
  return {
    name: 'vercel-api-dev',
    configureServer(server) {
      // 로컬 개발(Vite dev)에서는 Vercel의 /api/* 함수가 자동으로 서빙되지 않으므로
      // /api/chat 요청을 api/chat.ts 핸들러로 직접 연결해 404를 방지합니다.
      server.middlewares.use('/api/chat', async (req, res) => {
        try {
          if ((req.method || 'GET').toUpperCase() === 'OPTIONS') {
            res.statusCode = 204
            res.end()
            return
          }

          if ((req.method || 'GET').toUpperCase() !== 'POST') {
            res.statusCode = 405
            res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            res.end('Method Not Allowed')
            return
          }

          const chunks: Buffer[] = []
          await new Promise<void>((resolve, reject) => {
            req.on('data', (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)))
            req.on('end', () => resolve())
            req.on('error', (e) => reject(e))
          })
          const bodyBuffer = Buffer.concat(chunks)

          const headers = new Headers()
          for (const [k, v] of Object.entries(req.headers)) {
            if (typeof v === 'string') headers.set(k, v)
            else if (Array.isArray(v)) headers.set(k, v.join(','))
          }

          const url = `http://localhost/api/chat${req.url || ''}`
          const request = new Request(url, {
            method: 'POST',
            headers,
            body: bodyBuffer.length > 0 ? bodyBuffer : undefined,
          })

          const { default: handler } = await import('./api/chat')
          const response = await handler(request)

          res.statusCode = response.status
          response.headers.forEach((value, key) => {
            // node의 res는 일부 hop-by-hop 헤더를 거부할 수 있으니 setHeader 실패는 무시
            try {
              res.setHeader(key, value)
            } catch {
              // ignore
            }
          })

          if (response.body) {
            const nodeStream = Readable.fromWeb(response.body as any)
            nodeStream.pipe(res)
          } else {
            const text = await response.text()
            res.end(text)
          }
        } catch (e: any) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify({ error: e?.message || 'dev api error' }))
        }
      })
    },
  }
}

export default defineConfig(({ command, mode }) => {
  // 로컬 dev 서버(Node 미들웨어)에서도 .env.local 값을 읽을 수 있도록
  // Vite의 loadEnv로 환경변수를 process.env에 주입합니다.
  // prefix를 ''로 두면 SUPABASE_URL 같은 비-VITE_ 변수도 로드됩니다.
  const env = loadEnv(mode, process.cwd(), '')
  for (const [k, v] of Object.entries(env)) {
    if (typeof v === 'string' && v.length > 0 && process.env[k] === undefined) {
      process.env[k] = v
    }
  }

  return {
    plugins: [react(), command === 'serve' ? vercelApiDevPlugin() : null].filter(Boolean) as Plugin[],
  // 배포 시 base 경로 설정 (필요시 수정)
  // base: '/baseball/',
  optimizeDeps: {
    // 의존성 최적화 문제 해결을 위한 설정
    force: true, // 강제로 재최적화
    exclude: [], // 문제가 되는 패키지가 있으면 여기에 추가
    include: [
      '@ai-sdk/react',
      '@ai-sdk/google',
    ],
    esbuildOptions: {
      // ESM 패키지 해석을 위한 설정
      mainFields: ['module', 'main'],
      resolveExtensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
    },
  },
  build: {
    rollupOptions: {
      // supabase-js 번들 경고 우회 (Vite/Rollup 경고 노이즈 제거)
      onwarn(warning, warn) {
        const msg = typeof warning === 'string' ? warning : warning?.message;
        if (msg && msg.includes('node_modules/@supabase/supabase-js/dist/esm/wrapper.mjs') && msg.includes('"default" is not exported')) {
          return;
        }
        warn(warning);
      },
      output: {
        manualChunks: {
          // React 관련 라이브러리 분리
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
    // 청크 크기 경고 임계값을 1000KB로 상향 조정 (선택사항)
    chunkSizeWarningLimit: 1000,
  },
  }
})

