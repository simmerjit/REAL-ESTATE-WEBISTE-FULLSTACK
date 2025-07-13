import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const backendURL = 'https://real-estate-webiste-fullstack.onrender.com';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Required on Render to expose dev server
    port: 5173,
    proxy: {
      '/api': {
        target: backendURL,
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: 'dist', // This is the directory Render looks for after build
  }
})
