import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VERCEL ? "/" : "/my-ecommerce/",
  plugins: [react()],
  optimizeDeps: {
    include: ['react-fast-marquee']
  }
})