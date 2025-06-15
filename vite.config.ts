import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    base: './', // This ensures assets are loaded from the correct path
    server: {
      host: '::',
      port: 8080,
    },
    plugins: [
      react(),
      // Custom plugins can be added here
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: true, // Helps with debugging
      rollupOptions: {
        output: {
          manualChunks: {
            // Split vendor and app code for better caching
            vendor: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
    },
    // Ensure environment variables are properly loaded
    define: {
      'process.env': {
        ...Object.keys(env).reduce((prev, key) => {
          prev[key] = JSON.stringify(env[key]);
          return prev;
        }, {} as Record<string, string>),
      },
    },
  };
});
