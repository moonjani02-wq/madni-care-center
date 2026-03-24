import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

/** PowerShell backend (server.ps1) default port — must match server.ps1 -Port */
const API_TARGET = "http://localhost:8080";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  let base = (env.VITE_BASE || "/").trim();
  if (!base.startsWith("/")) base = `/${base}`;
  if (!base.endsWith("/")) base = `${base}/`;

  return {
    base,
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: API_TARGET,
          changeOrigin: true,
        },
      },
    },
    preview: {
      proxy: {
        "/api": {
          target: API_TARGET,
          changeOrigin: true,
        },
      },
    },
    build: {
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: false,
      chunkSizeWarningLimit: 600,
    },
  };
});
