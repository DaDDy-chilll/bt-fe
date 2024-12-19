import { useAuth } from "../composables/auth";
export default defineNuxtRouteMiddleware((to, _from) => {
  const { isLoggedIn } = useAuth();

 // Define public routes that don't require authentication
//  const publicRoutes = ['/', '/signup', '/forgot-password', '/reset-password', '/otp'];
//  if (!isLoggedIn.value) {
//    if (!publicRoutes.includes(to.path)) {
//      return navigateTo('/');
//    }
//  } else {
//    if (publicRoutes.includes(to.path)) {
//      return navigateTo('/dashboard');
//    }
//  }

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
