import { useAuth } from "../composables/auth";

export default defineNuxtRouteMiddleware((to, _from) => {
  const { isLoggedIn } = useAuth();



  // if (!isLoggedIn.value && to.path != "/login" && to.path != "/") {
  //   console.log("login");
  //   return navigateTo("/login");
  // } else if (isLoggedIn.value && (to.path == "/login" || to.path == "/")) {
  //   console.log("dashboard");
  //   return navigateTo("/dashboard");
  // } else {
  //   return navigateTo("");
  // }
});
