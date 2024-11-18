type UseAuth = {
  isLoggedIn: ComputedRef<boolean>;
  logined: (generatedToken: string) => void;
  redirectToTopScreen: () => void;
  logouted: () => void;
};

export const useAuth = (): UseAuth => {
  const token = useCookie("token");
  const isLoggedIn = computed(() => !!token.value);

  const logined = async (generatedToken: string) => {
    const token = useCookie("token", {
      sameSite: true,
      secure: false,
      maxAge: 60 * 60 * 24 * 7,
    });
    token.value = generatedToken;
    if (!token.value) {
      token.value = null;
      alert("ログインできませんでした。");
    }
  };
  const redirectToTopScreen = () => {
    const { redirect } = useRoute().query;
    if (redirect && typeof redirect === "string") {
      return navigateTo(redirect);
    } else {
      return navigateTo("/ask-ai");
    }
  };
  const logouted = () => {
    token.value = null;
    return navigateTo("/login");
  };

  return {
    isLoggedIn,
    logined,
    redirectToTopScreen,
    logouted,
  };
};
