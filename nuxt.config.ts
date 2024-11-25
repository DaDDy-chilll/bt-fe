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
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
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
  modules: [
    "@pinia/nuxt",
    "@primevue/nuxt-module",
    "nuxt-svgo-loader",
  ],
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
