// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  ssr: false,
  srcDir: "src",
  css: [
    "vuetify/styles",
    "./src/assets/css/main.css",
    "./src/assets/sass/main.sass",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  modules: ["@pinia/nuxt"],
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
