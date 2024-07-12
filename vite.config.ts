import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import solid from "vite-plugin-solid";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    solid(),
    VitePWA({
      base: "/",

      registerType: "autoUpdate",
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "Vite PWA",
        short_name: "Vite PWA",
        description: "Vite PWA",
        start_url: "/",
      },

      workbox: undefined,

      devOptions: {
        enabled: true,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
});
