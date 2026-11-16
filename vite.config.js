import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import { readdirSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        ...Object.fromEntries(['deals', 'losses'].flatMap(section =>
          readdirSync(new URL(`./${section}/`, import.meta.url), { withFileTypes: true })
            .filter(entry => entry.isDirectory())
            .map(entry => [`${section}-${entry.name}`, fileURLToPath(new URL(`./${section}/${entry.name}/index.html`, import.meta.url))]))),
      },
    },
  },
  preview: {
    host: true,
    port: Number(process.env.PORT) || 4173,
    allowedHosts: true,
  },
})
