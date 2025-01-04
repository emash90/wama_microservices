// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@mui/material', '@emotion/react', '@emotion/styled', 'cdbreact'],
  },
  server: {
    host: '0.0.0.0', // Bind to all network interfaces
    port: 5173,      // Port for the development server
  },
});
