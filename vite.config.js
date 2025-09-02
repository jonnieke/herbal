import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default defineConfig({
    plugins: [
        react(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "client", "src"),
            "@shared": path.resolve(__dirname, "shared"),
            "@assets": path.resolve(__dirname, "attached_assets"),
            "@/shared": path.resolve(__dirname, "shared"),
        },
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },
    root: path.resolve(__dirname, "client"),
    build: {
        outDir: path.resolve(__dirname, "dist/public"),
        emptyOutDir: true,
    },
    server: {
        host: "0.0.0.0",
        port: 5000,
        fs: {
            strict: false,
            deny: ["**/.*"],
        },
        hmr: {
            clientPort: undefined,
        },
    },
    esbuild: {
        loader: 'tsx',
    },
});
