<script setup lang="ts">
import { Password, Button, Message } from "primevue";
import LOGO from "@/assets/icons/logo.svg";
import LogosGoogleIcon from "@/assets/icons/google.vue";
import LogosFacebook from "@/assets/icons/facebook.vue";
import type { RegisterPayload, ErrorMessage } from "../types/auth";
import { useAuthStore } from "../stores/auth";
const store = useAuthStore();

/**
 *@description Page Layout and Title
 *@author PSK
 *@created 2024-11-22
 *@updated ****-**-**
 */
definePageMeta({ layout: "authentication" });
useHead({ title: "Register" });

/**
 *@description Value of email,password,name,confirmPassword,favoriteColor,nickname
 *@author PSK
 *@created 2024-11-22
 *@updated ****-**-**
 */
const registerPayload: RegisterPayload = reactive<RegisterPayload>({
  email: "",
  password: "",
  name: "",
  confirmPassword: "",
  favoriteColor: "",
  nickname: "",
});

const errorMessage: ErrorMessage = reactive<ErrorMessage>({
  email: null,
  password: null,
});

/**
 *@description Login function
 *@author PSK
 *@created 2024-11-22
 *@updated ****-**-**
 */
const register = async () => {
  if (!registerPayload.email) {
    errorMessage.email = "Email is required";
  } else {
    errorMessage.email = null;
  }

  if (!registerPayload.password) {
    errorMessage.password = "Password is required";
  } else {
    errorMessage.password = null;
  }

  if (!registerPayload.name) {
    errorMessage.name = "Name is required";
  } else {
    errorMessage.name = null;
  }

  if (!registerPayload.confirmPassword) {
    errorMessage.confirmPassword = "Confirm Password is required";
  } else {
    errorMessage.confirmPassword = null;
  }

  if (!registerPayload.favoriteColor) {
    errorMessage.favoriteColor = "Favorite Color is required";
  } else {
    errorMessage.favoriteColor = null;
  }

  if (!registerPayload.nickname) {
    errorMessage.nickname = "Nickname is required";
  } else {
    errorMessage.nickname = null;
  }

  // await store.login(loginPayload);
};

const favoriteColors = [
  { id: 1, color: "White" },
  { id: 2, color: "Black" },
  { id: 3, color: "Red" },
  { id: 4, color: "Blue" },
];

const nickNameOptions = [
  { id: 1, name: "White" },
  { id: 2, name: "Black" },
  { id: 3, name: "Red" },
  { id: 4, name: "Blue" },
];
</script>
<template>
  <div class="w-full sm:max-w-md bg-white rounded-xl p-7 shadow-md">
    <!-- Logo -->
    <LOGO alt="logo" class="w-52 h-52 mx-auto" />
    <h1 class="text-2xl font-medium text-center">Login</h1>

    <!-- Email and Password -->
    <div class="space-y-5 my-3">
      <!-- Name -->
      <div>
        <FloatLabel
          variant="on"
          :class="[
            'text-sm bg-transparent border-b border-accentblack',
            {
              'border-red-500': errorMessage?.name,
            },
          ]"
        >
          <InputText
            name="email"
            type="text"
            id="on_label"
            v-model="registerPayload.name"
            autocomplete="off"
            class="bg-transparent p-2"
          />
          <label
            for="on_label"
            :class="[
              'bg-transparent ',
              errorMessage?.name ? 'text-red-500' : 'text-label',
            ]"
            >Name</label
          >
        </FloatLabel>
        <Message
          v-if="errorMessage?.name"
          severity="error"
          variant="simple"
          size="small"
          class="mt-1"
          >{{ errorMessage.name }}</Message
        >
      </div>

      <!-- Email -->
      <div>
        <FloatLabel
          variant="on"
          :class="[
            'text-sm   bg-transparent border-b border-accentblack',
            {
              'border-red-500': errorMessage?.email,
            },
          ]"
        >
          <InputText
            name="email"
            type="text"
            id="on_label"
            v-model="registerPayload.email"
            autocomplete="off"
            class="bg-transparent p-2"
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

      <!-- Password -->
      <div>
        <FloatLabel
          variant="on"
          :class="[
            'text-sm   bg-transparent border-b border-accentblack',
            {
              'border-red-500': errorMessage?.password,
            },
          ]"
        >
          <InputText
            name="email"
            type="text"
            id="on_label"
            v-model="registerPayload.password"
            autocomplete="off"
            class="bg-transparent p-2"
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
          variant="simple"
          size="small"
          class="mt-1"
          >{{ errorMessage.password }}</Message
        >
      </div>

      <!-- Confirm Password -->
      <div>
        <FloatLabel
          variant="on"
          :class="[
            'text-sm  bg-transparent border-b border-accentblack',
            {
              'border-red-500': errorMessage?.confirmPassword,
            },
          ]"
        >
          <InputText
            name="email"
            type="text"
            id="on_label"
            v-model="registerPayload.confirmPassword"
            autocomplete="off"
            class="bg-transparent p-2"
          />
          <label
            for="on_label"
            :class="[
              'bg-transparent',
              errorMessage?.confirmPassword ? 'text-red-500' : 'text-label',
            ]"
            >Confirm Password</label
          >
        </FloatLabel>
        <Message
          v-if="errorMessage?.confirmPassword"
          severity="error"
          variant="simple"
          size="small"
          class="mt-1"
          >{{ errorMessage.confirmPassword }}</Message
        >
      </div>

      <!-- Favorite Color -->
      <div>
        <FloatLabel
          variant="on"
          :class="[
            'text-sm  bg-transparent border-b border-accentblack',
            {
              'border-red-500': errorMessage?.favoriteColor,
            },
          ]"
        >
          <Select
            v-model="registerPayload.favoriteColor"
            inputId="on_label"
            :options="favoriteColors"
            optionLabel="color"
            class="w-full h-10 dropdown-svg-white"
          />
          <label for="on_label" class="text-sm text-label"
            >What is your favorite color?</label
          >
        </FloatLabel>
        <Message
          v-if="errorMessage?.favoriteColor"
          severity="error"
          variant="simple"
          size="small"
          class="mt-1"
          >{{ errorMessage.favoriteColor }}</Message
        >
      </div>

      <!-- Nickname -->
      <div>
        <FloatLabel
          variant="on"
          :class="[
            'text-sm  bg-transparent border-b border-accentblack',
            {
              'border-red-500': errorMessage?.nickname,
            },
          ]"
        >
          <Select
            v-model="registerPayload.nickname"
            inputId="on_label"
            :options="nickNameOptions"
            optionLabel="name"
            class="w-full h-10 dropdown-svg-white text-sm"
          />
          <label for="on_label" class="text-sm text-label"
            >What is your childhood nickname?</label
          >
        </FloatLabel>
        <Message
          v-if="errorMessage?.nickname"
          severity="error"
          variant="simple"
          size="small"
          class="mt-1"
          >{{ errorMessage.nickname }}</Message
        >
      </div>

      <div>
        <p class="text-[.7rem] text-center">
          By signing up, you are agreeing to the
          <NuxtLink to="/terms-and-conditions" class="text-primarylight"
            >Terms and Conditions</NuxtLink
          >
          and
          <NuxtLink to="/privacy-policy" class="text-primarylight"
            >Privacy Policy.</NuxtLink
          >
        </p>
      </div>
      <Button
        type="submit"
        severity="secondary"
        label="Sign Up"
        @click="register"
        class="w-full bg-primarylight text-white p-2"
      />
    </div>

    <!-- Register and Help -->
    <div class="flex items-center justify-between">
      <p class="text-sm text-center">
        Already have an account?
        <NuxtLink to="/login" class="text-primarylight">Login</NuxtLink>
      </p>
      <p class="text-sm text-center text-primarylight">Help?</p>
    </div>

    <p class="text-sm text-center my-3">- Or Sign Up With -</p>

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
