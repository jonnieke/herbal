import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "client", "src"),
      "@shared": path.resolve(process.cwd(), "shared"),
      "@assets": path.resolve(process.cwd(), "attached_assets"),
      "@/shared": path.resolve(process.cwd(), "shared"),
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  root: path.resolve(process.cwd(), "client"),
  build: {
    outDir: path.resolve(process.cwd(), "dist/public"),
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    fs: {
      strict: false,
      deny: ["**/.*"],
    },
    hmr: {
      port: 3001,
      clientPort: 443,
    },
  },
  esbuild: {
    loader: 'tsx',
  },
});
