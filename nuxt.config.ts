import Aura from "@primevue/themes/aura";
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },

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
          },
        },
      },
    },
  },

  modules: ["@pinia/nuxt", "@primevue/nuxt-module"],

  components: [
    {
      path: "~/components",
      prefix: undefined,
    },
  ],

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler", // or "modern"
        },
      },
    },
  },

  compatibilityDate: "2024-12-07",
});