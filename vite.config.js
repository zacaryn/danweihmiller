import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load environment variables from .env files
  const env = loadEnv(mode, process.cwd(), '');

  return {
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
      'import.meta.env': JSON.stringify(env) // Ensure env variables are properly injected
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
  };
});