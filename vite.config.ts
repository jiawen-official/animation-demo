import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  base: './',
  resolve: {
    // Vite路径别名配置
    alias: {
      '@': path.resolve('./src')
    }
  }
})
