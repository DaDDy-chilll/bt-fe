import Aura from "@primevue/themes/aura";
export default defineNuxtConfig({
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
  css: ["./src/assets/css/main.css", "./src/assets/css/root.css"],
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
            name: "primevue",
            order: "tailwind-base,primevue,tailwind-utilities",
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
