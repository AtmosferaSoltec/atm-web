import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GSAP publica sus plugins como ESM sin `"type": "module"`: se empaquetan en
  // el build de servidor para que el prerender pueda importarlos desde Node.
  ssr: { noExternal: ['gsap'] },
})
