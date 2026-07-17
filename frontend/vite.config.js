/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    // Se mantiene "build" (en vez del "dist" por defecto de Vite) porque el pipeline de CI
    // (.gitlab-ci.yml) y el script "deploy" de package.json ya esperan ese nombre.
    outDir: "build",
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/setupTests.js"],
    css: true,
  },
});
