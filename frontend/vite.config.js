  import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";
  import tailwindcss from "@tailwindcss/vite";

  const productionUrl = "http://13.205.77.25";
  const developmentUrl = "http://localhost:3000";

  export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
      host: true,
      proxy: {
        "/api": {
          target: developmentUrl,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
                return 'react-vendor';
              }
              if (id.includes('gsap')) {
                return 'gsap-vendor';
              }
              if (id.includes('firebase')) {
                return 'firebase-vendor';
              }
              return 'vendor';
            }
          }
        }
      }
    }
  });
