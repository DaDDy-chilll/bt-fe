import Aura from "@primevue/themes/aura";
import { resolve } from "path";
export default defineNuxtConfig({
  alias: {
    "@assets": resolve(__dirname, "/"),
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  ssr: false,
  srcDir: "src",
  css: ["~/assets/scss/main.scss", "~/assets/scss/root.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {},
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: "html",
          cssLayer: {
            name: "my-theme",
            order: "tailwind-base",
          }
        },
      },
    },
  },
  modules: ["@pinia/nuxt", "@primevue/nuxt-module"],
  components: [
    {
      path: "~/components",
      extensions: [".vue"],
      pathPrefix: undefined,
    },
  ],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },
});
