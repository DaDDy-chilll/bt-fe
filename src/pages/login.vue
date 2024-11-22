<script setup lang="ts">
import { Password, Button, Message } from "primevue";
import LOGO from "@/assets/icons/logo.svg";
import LogosGoogleIcon from "@/assets/icons/google.vue";
import LogosFacebook from "@/assets/icons/facebook.vue";
import type { LoginPayload, ErrorMessage } from "../types/auth";
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

const errorMessage: ErrorMessage = reactive<ErrorMessage>({
  email: null,
  password: null,
});

const remember_me = ref(false);

/**
 *@description Login function
 *@author PSK
 *@created 2024-11-22
 *@updated ****-**-**
 */
const login = async () => {
  console.log(loginPayload, errorMessage);
  if (!loginPayload.email) {
    errorMessage.email = "Email is required";
  } else {
    errorMessage.email = null;
  }
  if (!loginPayload.password) {
    errorMessage.password = "Password is required";
  } else {
    errorMessage.password = null;
  }
  // await store.login(loginPayload);
};
</script>
<template>
  <div class="w-full sm:max-w-md bg-white rounded-xl p-8 shadow-md">
    <!-- Logo -->
    <LOGO alt="logo" class="w-52 h-52 mx-auto" />
    <h1 class="text-2xl font-medium text-center">Login</h1>

    <!-- Email and Password -->
    <div class="space-y-7 my-3">
      <div>
        <FloatLabel
          variant="on"
          :class="[
            'text-lg  bg-transparent border-b border-accentblack',
            {
              'border-red-500': errorMessage?.email,
            },
          ]"
        >
          <InputText
            name="email"
            type="text"
            id="on_label"
            v-model="loginPayload.email"
            autocomplete="off"
            class="bg-transparent p-3"
          />
          <label
            for="on_label"
            :class="[
              'bg-transparent',
              errorMessage?.email ? 'text-red-500' : 'text-label',
            ]"
            >Email</label
          >
        </FloatLabel>
        <Message
          v-if="errorMessage?.email"
          severity="error"
          variant="simple"
          size="small"
          class="mt-1"
          >{{ errorMessage.email }}</Message
        >
      </div>
      <div>
        <FloatLabel
          variant="on"
          :class="[
            'text-lg  bg-transparent border-b border-accentblack',
            {
              'border-red-500': errorMessage?.password,
            },
          ]"
        >
          <Password
            id="on_label"
            v-model="loginPayload.password"
            toggleMask
            autocomplete="off"
            class="bg-transparent p-3 rounded-none"
            :feedback="false"
            fluid
          />
          <label
            for="on_label"
            :class="[
              'bg-transparent',
              errorMessage?.password ? 'text-red-500' : 'text-label',
            ]"
            >Password</label
          >
        </FloatLabel>
        <Message
          v-if="errorMessage?.password"
          severity="error"
          size="small"
          variant="simple"
          class="mt-1"
          >{{ errorMessage.password }}</Message
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
          <label for="remember_me" class="select-none text-sm"
            >Remember Me</label
          >
        </div>
        <NuxtLink to="/forgot-password" class="text-sm text-primarylight"
          >Forgot Password?</NuxtLink
        >
      </div>
      <Button
        type="submit"
        severity="secondary"
        label="Login"
        @click="login"
        class="w-full bg-primarylight text-white p-2"
      />
    </div>

    <!-- Register and Help -->
    <div class="flex items-center justify-between">
      <p class="text-sm text-center">
        Don't have an account?
        <NuxtLink to="/register" class="text-primarylight">Register</NuxtLink>
      </p>
      <p class="text-sm text-center text-primarylight">Help?</p>
    </div>

    <p class="text-sm text-center my-3">- Or Login With -</p>

    <!-- Google and Facebook -->
    <div class="flex items-center justify-around gap-2 mt-5">
      <button
        class="flex items-center justify-center gap-2 border border-accentblack p-2 rounded-md w-full mx-3"
      >
        <LogosGoogleIcon />
        <span>Google</span>
      </button>
      <button
        class="flex items-center justify-center gap-2 border border-accentblack p-2 rounded-md w-full mx-3"
      >
        <LogosFacebook />
        <span>Facebook</span>
      </button>
    </div>
  </div>
</template>
