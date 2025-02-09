import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import * as path from "node:path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite({ autoCodeSplitting: true })],
  resolve: {
    alias: {
      "@/": path.resolve(__dirname, "./"),
      "@/utils/": path.resolve(__dirname, "./src/utils"),
      "@/components/": path.resolve(__dirname, "./src/components"),
      "@/routes/": path.resolve(__dirname, "./src/routes"),
    },
  },
});
