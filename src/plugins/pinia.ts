import type { Pinia } from "pinia";
import resetStore from "../utils/resetStore";

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = nuxtApp.$pinia as Pinia;
  pinia.use(resetStore);
});
