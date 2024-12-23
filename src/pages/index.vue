<script setup lang="ts">
import LOGO from "~/assets/icons/logo.svg?url"
import google from "~/assets/icons/google.svg?url"
import facebook from "~/assets/icons/facebook.svg?url"
import { ref, reactive, computed } from "vue";
import type { LoginPayload, ErrorPayload } from "../types/auth";
import { errorMessage } from "@/consts/errorMessage";
import { useAuthStore } from "../stores/auth";
const store = useAuthStore();
const { isLoggedIn,logined } = useAuth();
/**
 *@description Page Layout and Title
 *@author PSK
 *@created 2024-11-22
 *@updated ****-**-**
 */
definePageMeta({ layout: "authentication" });
useHead({ title: "Login" });


/**
 *@description Value of email and password
 *@author PSK
 *@created 2024-11-22
 *@updated ****-**-**
 */
const loginPayload: LoginPayload = reactive<LoginPayload>({
  email: "",
  password: "",
});

/**
 *@description Error message
 *@author PSK
 *@created 2024-11-22
 *@updated ****-**-**
 */
const error: ErrorPayload = reactive<ErrorPayload>({
  email: null,
  password: null,
});

/**
 *@description Remember me & Loading
 *@author PSK
 *@created 2024-11-22
 *@updated 2024-11-24
 */
 const remember_me = ref<boolean>(false);
 const loading = ref<boolean>(false);
 const showAlert = ref<boolean>(false);
 const alertMessage = ref<string>("");


/**
 *@description Check validation
 *@author PSK
 *@created 2024-11-24
 *@updated ****-**-**
 */
const checkValidation = () => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  //Check for Mail
  if (!loginPayload.email) error.email = errorMessage.EMAIL_REQUIRED;
  else if (!emailPattern.test(loginPayload.email))
    error.email = errorMessage.EMAIL_INVALID;
  else error.email = null;

  //Check for Password
  if (!loginPayload.password) error.password = errorMessage.PASSWORD_REQUIRED;
  else error.password = null;
};

/**
 *@description Login function
 *@author PSK
 *@created 2024-11-22
 *@updated 2024-11-24
 */
const login = async () => {
  loading.value = true;
  checkValidation();
  if (Object.values(error).every((value) => value === null)) {
    try {
      const res = await store.login(loginPayload);
      console.log("res from login",res)
      if(res?.value){
        logined((res?.value as any)?.data.token)
        navigateTo("/dashboard")
      }                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    } catch (error) {
      if(error){
        alertMessage.value = error as string
        showAlert.value = true
      }
    }
  } 
  loading.value = false;
};

/**
 *@description Google login function
 *@author PSK
 *@created 2024-11-24
 *@updated ****-**-**
 */
const googleLogin = () => {
  console.log("google login");
};

/**
 *@description Facebook login function
 *@author PSK
 *@created 2024-11-24
 *@updated ****-**-**
 */
const facebookLogin = () => {
  console.log("facebook login");
};

</script>

<template>
  <div
    class="w-full sm:max-w-md bg-accentwhite rounded-xl p-8 shadow-md dark:bg-accentblack"
  >
    <!-- Logo -->
    <div class=" mb-3">
      <img :src="LOGO" alt="logo" class="w-15 h-15 mx-auto" />
    </div>

    <h1
      class="text-2xl font-medium text-center text-accentblack dark:text-accentwhite"
    >
      Login
    </h1>

    <!-- Email and Password -->
    <div class="space-y-7 my-3">
      <div>
        <FloatLabel
          variant="on"
          :class="[
            'text-sm  bg-transparent border-b',
            error?.email
              ? 'border-red-500'
              : 'border-accentblack dark:border-accentwhite',
          ]"
        >
          <InputText
            name="email"
            type="text"
            id="on_label"
            v-model="loginPayload.email"
            autocomplete="off"
            class="bg-transparent p-2 w-full text-accentblack dark:text-accentwhite"
          />
          <label
            for="on_label"
            :class="[
              'bg-transparent',
              error?.email
                ? 'text-red-500'
                : 'text-label  dark:text-accentwhite',
            ]"
            >Email</label
          >
        </FloatLabel>
        <Message
          v-if="error?.email"
          severity="error"
          variant="simple"
          size="small"
          class="mt-1"
          >{{ error.email }}
        </Message>
      </div>
      <div>
        <FloatLabel
          variant="on"
          :class="[
            'text-sm  bg-transparent border-b',
            error?.password
              ? 'border-red-500'
              : 'border-accentblack dark:border-accentwhite',
          ]"
        >
          <Password
            id="on_label"
            v-model="loginPayload.password"
            toggleMask
            autocomplete="off"
            class="p-2 rounded-none w-full text-accentblack dark:text-accentwhite"
            :feedback="false"
            fluid
            :inputStyle="{ 'background-color': 'transparent' }"
          />
          <label
            for="on_label"
            :class="[
              'bg-transparent ',
              error?.password
                ? 'text-red-500'
                : 'text-label dark:text-accentwhite',
            ]"
            >Password</label
          >
        </FloatLabel>
        <Message
          v-if="error?.password"
          severity="error"
          size="small"
          variant="simple"
          class="mt-1"
          >{{ error.password }}
        </Message>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Checkbox
            v-model="remember_me"
            inputId="remember_me"
            name="remember_me"
            value="remember_me"
          />
          <label
            for="remember_me"
            class="select-none text-sm text-accentblack dark:text-accentwhite cursor-pointer hover:text-accentblack/50 dark:hover:text-acc/50"
            >Remember Me</label
          >
        </div>
        <NuxtLink
          to="/forgot-password"
          class="text-sm text-primarylight cursor-pointer hover:text-primarylight/50"
        >
          Forgot Password?</NuxtLink
        >
      </div>
      <Button
        type="button"
        severity="secondary"
        label="Login"
        @click="login"
        :loading="loading"
        class="w-full bg-primarylight text-white p-2 hover:bg-primarylight/70 cursor-pointer"
      />
    </div>

    <!-- Register and Help -->
    <div class="flex items-center justify-between">
      <p class="text-sm text-center text-accentblack dark:text-accentwhite">
        Don't have an account?
        <NuxtLink
          to="/signup"
          class="text-primarylight cursor-pointer hover:text-primarylight/50"
          >Sign Up</NuxtLink
        >
      </p>
      <p
        class="text-sm text-center text-primarylight cursor-pointer hover:text-primarylight/50"
      >
        Help?
      </p>
    </div>

    <p class="text-sm text-center my-3 text-accentblack dark:text-accentwhite">
      - Or Login With -
    </p>

    <!-- Google and Facebook -->
    <div class="flex items-center justify-around gap-2 mt-5">
      <button
        @click="googleLogin"
        class="flex items-center justify-center gap-2 border border-accentblack p-2 rounded-md w-full mx-3 dark:border-accentwhite cursor-pointer hover:bg-accentblack/10 dark:hover:bg-accentwhite/10"
      >
        <img :src="google" alt="google" class="w-5 h-5" />
        <span class="text-accentblack dark:text-accentwhite">Google</span>
      </button>
      <button
        @click="facebookLogin"
        class="flex items-center justify-center gap-2 border border-accentblack p-2 rounded-md w-full mx-3 dark:border-accentwhite cursor-pointer hover:bg-accentblack/10 dark:hover:bg-accentwhite/10"
      >
        <img :src="facebook" alt="facebook" class="w-5 h-5" />
        <span class="text-accentblack dark:text-accentwhite">Facebook</span>
      </button>
    </div>
  </div>
  <AlertBox :message="alertMessage" :visible="showAlert" @close="showAlert = false" />
</template>
<style scoped>
:deep(.p-checkbox) {
  @apply border-muted  drop-shadow-sm shadow-sm rounded-md;
  border-width: 0.09rem;
}
</style>