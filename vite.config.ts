import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    // Use relative paths for assets
    base: './',
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      strictPort: true,
      host: true,
      open: true,
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: (id: string) => {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
                return 'vendor-react';
              }
              if (id.includes('framer-motion') || id.includes('react-icons')) {
                return 'vendor-ui';
              }
              return 'vendor';
            }
            return undefined;
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
    // Ensure environment variables are available in the client
    define: {
      'process.env': { ...env, NODE_ENV: process.env.NODE_ENV || 'production' },
      __APP_ENV__: JSON.stringify(process.env.NODE_ENV || 'production'),
    },
    optimizeDeps: {
      esbuildOptions: {
        // Enable esbuild's define API to replace global variables
        define: {
          global: 'globalThis',
        },
      },
    },
  };
});
