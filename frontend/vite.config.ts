import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "@honkhonk/vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
});
