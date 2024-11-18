import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as labs from "vuetify/labs/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      ...components,
      ...labs,
    },
    directives,
    theme: {
      themes: {
        light: {
          colors: {
            primary: "#36455B",
            error: "#E06262",
            default: "#292929",
            gray: "#818181",
            base: "#EFF3F7",
            baseLight: "#FBFDFF",
            baseDark: "#CDD7E1",
            background: "#F3F3F3",
          },
          dark: false,
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
