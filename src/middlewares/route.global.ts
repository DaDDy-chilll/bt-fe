import { useAuth } from '~/composables/auth';

export default defineNuxtRouteMiddleware((to, _from) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn.value && to.path != '/login' && to.path != '/') {
    if (
      !to.path.includes('/password-reset') && 
      !to.path.includes('/create-account') && 
      !to.path.includes('/register-confirm') && 
      !to.path.includes('/sent') &&
      !to.path.includes('/plan-selection') &&
      !to.path.includes('/payment/')
    ) {
      return navigateTo('/');
    }
  } else if (isLoggedIn.value && (to.path == '/login' || to.path =='/')) {
    return navigateTo('/ask-ai');
  }
});
