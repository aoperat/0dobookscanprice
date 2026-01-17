import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 배포를 위한 base 경로
  base: '/0dobookscanprice/',
  plugins: [
    tailwindcss(),
    react(),
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
