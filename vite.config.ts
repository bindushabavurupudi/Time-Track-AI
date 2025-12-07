import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  // IMPORTANT: GitHub Pages base path (CASE SENSITIVE)
  base: mode === "production" ? "/Time-Track-AI/" : "/",

  build: {
    outDir: "docs",  // ⭐ GitHub Pages will use this folder
  },

  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
