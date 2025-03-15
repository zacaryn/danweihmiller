import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '10.0.0.53',
    port: 5173,
    strictPort: true,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      }
    }
  },
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
    },
  },
  define: {
    global: 'window',
    'process.env': {},
  },
  optimizeDeps: {
    esbuildOptions: {
      // Define global conditions for use with various packages
      define: {
        global: 'globalThis',
      },
    },
    include: [
      'aws-amplify',
    ],
  },
})
