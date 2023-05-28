import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pluginRewriteAll from 'vite-plugin-rewrite-all';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pluginRewriteAll()],
  define: {
    global: process.env.NODE_ENV === 'development' ? "globalThis" : "global",
    // global: "global",
    "process.env": {},
  },
  mode: process.env.NODE_ENV,
})