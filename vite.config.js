import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '10.0.0.53',
    port: 5173,
    strictPort: true,
    cors: true
  }
})
