import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://yusukeshib.dev',
  build: {
    format: 'directory',
  },
  vite: {
    plugins: [tailwindcss()],
  },
})
