import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 배포를 위한 base 경로
  // 저장소 이름이 '0dobookscanprice'인 경우 아래 주석을 해제하세요
  // base: '/0dobookscanprice/',
  plugins: [
    tailwindcss(),
    react(),
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
