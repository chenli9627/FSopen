import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // target: 'f-sopen.vercel.app',
        // target: 'https://f-sopen-olvdet1sl-chenlis-projects-97bd1f64.vercel.app',
        target: 'http://localhost:3001',
        // target: 'https://f-sopen-1zatzsf5j-chenlis-projects-97bd1f64.vercel.app',
        changeOrigin: true,
      }
    }
  }
})
