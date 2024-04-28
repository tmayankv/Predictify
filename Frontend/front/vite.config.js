import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  server: {
    proxy: {
    '/api': 'http://127.0.0.1:5000'
    }
  },
  define: {
    "process.env": {},
  },
});
