import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/ResearchHub/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
