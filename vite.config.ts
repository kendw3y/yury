import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),tsconfigPaths()],
  server: {
    host: '0.0.0.0', // Acepta conexiones externas
    port: 5173,      // Puerto donde corre Vite
    allowedHosts: true
  }
})
