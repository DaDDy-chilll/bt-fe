<script setup lang="ts">
import { Password, Button, Message } from "primevue";
import LOGO from "@/assets/icons/logo.svg";
import LogosGoogleIcon from "@/assets/icons/google.svg";
import LogosFacebook from "@/assets/icons/facebook.svg";
import type { LoginPayload, ErrorPayload } from "../types/auth";
import { errorMessage } from "@/consts/errorMessage";
import { useAuthStore } from "../stores/auth";
const store = useAuthStore();

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
 *@description Remember me
 *@author PSK
 *@created 2024-11-22
 *@updated 2024-11-24
 */
const remember_me = ref(false);


/**
 *@description Check validation 
 *@author PSK
 *@created 2024-11-24
 *@updated ****-**-**
 */
const checkValidation = () => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 
 if (!loginPayload.email) error.email = errorMessage.EMAIL_REQUIRED;
 else if(!emailPattern.test(loginPayload.email)) error.email = errorMessage.EMAIL_INVALID;
 else error.email = null;
 
 if (!loginPayload.password) error.password = errorMessage.PASSWORD_REQUIRED;
 else if(!passwordPattern.test(loginPayload.password)) error.password = errorMessage.PASSWORD_INVALID;
 else error.password = null;
}

/**
 *@description Login function
 *@author PSK
 *@created 2024-11-22
 *@updated 2024-11-24
 */
 const login = async () => {
  checkValidation();
  if(Object.values(error).every(value => value === null)) {
    try {
      await store.login(loginPayload);
    } catch (error) {
      console.error(error);
    }
  }
};


/**
 *@description Google login function
 *@author PSK
 *@created 2024-11-24
 *@updated ****-**-**
 */
const googleLogin =  () => {
  console.log("google login");
}

/**
 *@description Facebook login function
 *@author PSK
 *@created 2024-11-24
 *@updated ****-**-**
 */
const facebookLogin = () => {
  console.log("facebook login");
}


</script>


<template>
  <div class="w-full sm:max-w-md bg-accentwhite rounded-xl p-8 shadow-md dark:bg-accentblack">
    <!-- Logo -->
    <LOGO alt="logo" class=" mx-auto mb-3" />
    <h1 class="text-2xl font-medium text-center text-accentblack dark:text-accentwhite">Login</h1>
    <!-- Email and Password -->
    <div class="space-y-7 my-3">
      <div>
        <FloatLabel
          variant="on"
          :class="[
            'text-sm  bg-transparent border-b',
            error?.email ? 'border-red-500': 'border-accentblack dark:border-accentwhite'
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
              error?.email ? 'text-red-500' : 'text-label  dark:text-accentwhite',
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
          >{{ error.email }}</Message
        >
      </div>
      <div>
        <FloatLabel
          variant="on"
          :class="[
            'text-sm  bg-transparent border-b',
            error?.password ? 'border-red-500': 'border-accentblack dark:border-accentwhite'
          ]"
        >
          <Password
            id="on_label"
            v-model="loginPayload.password"
            toggleMask
            autocomplete="off"
            class=" p-2 rounded-none w-full text-accentblack dark:text-accentwhite "
            :feedback="false"
            fluid
            :inputStyle="{'background-color': 'transparent'}"
          />
          <label
            for="on_label"
            :class="[
              'bg-transparent ',
              error?.password ? 'text-red-500' : 'text-label dark:text-accentwhite',
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
          >{{ error.password }}</Message
        >
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Checkbox
            v-model="remember_me"
            inputId="remember_me"
            name="remember_me"
            value="remember_me"
          />
          <label for="remember_me" class="select-none text-sm text-accentblack dark:text-accentwhite cursor-pointer hover:text-accentblack/50 dark:hover:text-acc/50  "
            >Remember Me</label
          >
        </div>
        <NuxtLink to="/forgot-password" class="text-sm text-primarylight cursor-pointer hover:text-primarylight/50  "
          >Forgot Password?</NuxtLink
        >
      </div>
      <Button
        type="submit"
        severity="secondary"
        label="Login"
        @click="login"
        class="w-full bg-primarylight text-white p-2 hover:bg-primarylight/70 cursor-pointer"
      />
    </div>

    <!-- Register and Help -->
    <div class="flex items-center justify-between">
      <p class="text-sm text-center text-accentblack dark:text-accentwhite">
        Don't have an account?
        <NuxtLink to="/signup" class="text-primarylight cursor-pointer hover:text-primarylight/50">Sign Up</NuxtLink>
      </p>
      <p class="text-sm text-center text-primarylight cursor-pointer hover:text-primarylight/50">Help?</p>
    </div>

    <p class="text-sm text-center my-3 text-accentblack dark:text-accentwhite">- Or Login With -</p>

    <!-- Google and Facebook -->
    <div class="flex items-center justify-around gap-2 mt-5">
      <button
        @click="googleLogin"
        class="flex items-center justify-center gap-2 border border-accentblack p-2 rounded-md w-full mx-3 dark:border-accentwhite cursor-pointer hover:bg-accentblack/10 dark:hover:bg-accentwhite/10"
      >
        <LogosGoogleIcon alt="google" class="w-5 h-5" />
        <span class="text-accentblack dark:text-accentwhite">Google</span>
      </button>
      <button
        @click="facebookLogin"
        class="flex items-center justify-center gap-2 border border-accentblack p-2 rounded-md w-full mx-3 dark:border-accentwhite cursor-pointer hover:bg-accentblack/10 dark:hover:bg-accentwhite/10"
      >
        <LogosFacebook alt="facebook" class="w-5 h-5" />
        <span class="text-accentblack dark:text-accentwhite">Facebook</span>
      </button>
    </div>
  </div>
</template>


