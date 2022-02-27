import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "@honkhonk/vite-plugin-svgr";
import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig({
  plugins: [react(), svgr(), EnvironmentPlugin(["API_URL"])],
});
