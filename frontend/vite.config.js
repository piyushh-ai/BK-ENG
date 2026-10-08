import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

const productionUrl = "http://13.205.77.25";
const developmentUrl = "http://localhost:3000";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      menifest: {
        name: "My App",
        short_name: "App",
        description: "My App Description",
        theme_color: "#ffffff",
      },
    }),
  ],
  server: {
    host: true,
    proxy: {
      "/api": {
        target: productionUrl,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router-dom")
            ) {
              return "react-vendor";
            }
            if (id.includes("gsap")) {
              return "gsap-vendor";
            }
            if (id.includes("firebase")) {
              return "firebase-vendor";
            }
            return "vendor";
          }
        },
      },
    },
  },
});
