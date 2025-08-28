import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        // target: 'https://f-sopen-22bj35an2-chenlis-projects-97bd1f64.vercel.app/',
        changeOrigin: true,
      }
    }
  }
})
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
//
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3001', // 注意：你写成了 "lcoalhost" 拼写错误
//         changeOrigin: true,
//         // 其他可选配置
//         // rewrite: (path) => path.replace(/^\/api/, '')
//       }
//     }
//   }
// })
