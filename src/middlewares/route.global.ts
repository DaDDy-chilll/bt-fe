import { useAuth } from "../composables/auth";

export default defineNuxtRouteMiddleware((to, _from) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn.value && to.path != '/login' && to.path != '/') {
      return navigateTo("/");
  } else if (isLoggedIn.value && (to.path == "/login" || to.path == "/")) {
    return navigateTo("/dashboard");
  }
});
