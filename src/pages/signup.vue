<script setup lang="ts">
import { Password, Button, Message } from "primevue";
import LOGO from "~/assets/icons/logo.svg?url";
import google from "~/assets/icons/google.svg?url";
import facebook from "~/assets/icons/facebook.svg?url";
import type { RegisterPayload, ErrorPayload } from "../types/auth";
import { errorMessage } from "@/consts/errorMessage";
import { useAuthStore } from "../stores/auth";
const store = useAuthStore();

//This is Example for favorite color and nickname
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

/**
 *@description Page Layout and Title
 *@author PSK
 *@created 2024-11-22
 *@updated ****-**-**
 */
definePageMeta({ layout: "authentication" });
useHead({ title: "Sign Up" });

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

/**
 *@description Error Message
 *@author PSK
 *@created 2024-11-24
 *@updated ****-**-**
 */
const error: ErrorPayload = reactive<ErrorPayload>({
  email: null,
  password: null,
  name: null,
  confirmPassword: null,
  favoriteColor: null,
  nickname: null,
});

/**
 *@description Login function
 *@author PSK
 *@created 2024-11-22
 *@updated 2024-11-24
 */
const register = async () => {
  checkValidation();
  if (Object.values(error).every((value) => value === null)) {
    try {
      await store.register(registerPayload);
    } catch (error) {
      console.error(error);
    }
  }
};


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

  //check Email
  if (!registerPayload.email) error.email = errorMessage.EMAIL_REQUIRED;
  else if (!emailPattern.test(registerPayload.email))
    error.email = errorMessage.EMAIL_INVALID;
  else error.email = null;

  //check Password
  if (!registerPayload.password)
    error.password = errorMessage.PASSWORD_REQUIRED;
  else if (!passwordPattern.test(registerPayload.password))
    error.password = errorMessage.PASSWORD_INVALID;
  else error.password = null;

  //check Name
  if (!registerPayload.name) error.name = errorMessage.NAME_REQUIRED;
  else error.name = null;

  //check Confirm Password
  if (!registerPayload.confirmPassword)
    error.confirmPassword = errorMessage.CONFIRM_PASSWORD_REQUIRED;
  else if (registerPayload.password !== registerPayload.confirmPassword)
    error.confirmPassword = errorMessage.PASSWORD_NOT_MATCH;
  else error.confirmPassword = null;

  //check Favorite Color
  if (!registerPayload.favoriteColor)
    error.favoriteColor = errorMessage.FAVORITE_COLOR_REQUIRED;
  else error.favoriteColor = null;

  //check Nickname
  if (!registerPayload.nickname)
    error.nickname = errorMessage.NICKNAME_REQUIRED;
  else error.nickname = null;
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
    class="w-full sm:max-w-md bg-accentwhite rounded-xl p-7 shadow-md dark:bg-accentblack"
  >
        <!-- Logo -->
    <div class=" mb-3">
      <img :src="LOGO" alt="logo" class="w-15 h-15 mx-auto" />
    </div>
    <h1
      class="text-2xl font-medium text-center text-accentblack dark:text-accentwhite"
    >
      Sign Up
    </h1>

    <!-- Name, Email, Password, Confirm Password, Favorite Color, Nickname -->
    <div class="space-y-5 my-3">
      <!-- Name -->
      <div>
        <FloatLabel
          variant="on"
          :class="[
            'text-sm bg-transparent border-b',
            error?.name
              ? 'border-red-500'
              : 'border-accentblack dark:border-accentwhite',
          ]"
        >
          <InputText
            name="email"
            type="email"
            id="on_label"
            v-model="registerPayload.name"
            autocomplete="off"
            class="bg-transparent p-2 text-accentblack dark:text-accentwhite"
          />
          <label
            for="on_label"
            :class="[
              'bg-transparent ',
              error?.name
                ? 'text-red-500'
                : 'text-label  dark:text-accentwhite',
            ]"
            >Name</label
          >
        </FloatLabel>
        <Message
          v-if="error?.name"
          severity="error"
          variant="simple"
          size="small"
          class="mt-1"
          >{{ error.name }}
        </Message>
      </div>

      <!-- Email -->
      <div>
        <FloatLabel
          variant="on"
          :class="[
            'text-sm   bg-transparent border-b',
            error?.email
              ? 'border-red-500'
              : 'border-accentblack dark:border-accentwhite',
          ]"
        >
          <InputText
            name="email"
            type="text"
            id="on_label"
            v-model="registerPayload.email"
            autocomplete="off"
            class="bg-transparent p-2 text-accentblack dark:text-accentwhite"
          />
          <label
            for="on_label"
            :class="[
              'bg-transparent',
              error?.email
                ? 'text-red-500'
                : 'text-label dark:text-accentwhite',
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

      <!-- Password -->
      <div>
        <FloatLabel
          variant="on"
          :class="[
            'text-sm   bg-transparent border-b',
            error?.password
              ? 'border-red-500'
              : 'border-accentblack dark:border-accentwhite',
          ]"
        >
          <InputText
            name="email"
            type="text"
            id="on_label"
            v-model="registerPayload.password"
            autocomplete="off"
            class="bg-transparent p-2 text-accentblack dark:text-accentwhite"
          />
          <label
            for="on_label"
            :class="[
              'bg-transparent',
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
          variant="simple"
          size="small"
          class="mt-1"
          >{{ error.password }}
        </Message>
      </div>

      <!-- Confirm Password -->
      <div>
        <FloatLabel
          variant="on"
          :class="[
            'text-sm  bg-transparent border-b',
            error?.confirmPassword
              ? 'border-red-500'
              : 'border-accentblack dark:border-accentwhite',
          ]"
        >
          <InputText
            name="email"
            type="text"
            id="on_label"
            v-model="registerPayload.confirmPassword"
            autocomplete="off"
            class="bg-transparent p-2 text-accentblack dark:text-accentwhite"
          />
          <label
            for="on_label"
            :class="[
              'bg-transparent',
              error?.confirmPassword
                ? 'text-red-500'
                : 'text-label dark:text-accentwhite',
            ]"
            >Confirm Password</label
          >
        </FloatLabel>
        <Message
          v-if="error?.confirmPassword"
          severity="error"
          variant="simple"
          size="small"
          class="mt-1"
          >{{ error.confirmPassword }}</Message
        >
      </div>

      <!-- Favorite Color -->
      <div>
        <FloatLabel
          variant="on"
          :class="[
            'text-sm  bg-transparent border-b',
            error?.favoriteColor
              ? 'border-red-500'
              : 'border-accentblack dark:border-accentwhite',
          ]"
        >
          <Select
            v-model="registerPayload.favoriteColor"
            inputId="on_label"
            :options="favoriteColors"
            optionLabel="color"
            class="w-full h-10 dropdown-svg-white text-accentblack dark:text-accentwhite bg-transparent dark:bg-accentblack"
          />
          <label
            for="on_label"
            :class="[
              'text-sm',
              error?.favoriteColor
                ? 'text-red-500'
                : 'text-label dark:text-accentwhite bg-transparent dark:bg-accentblack',
            ]"
            >What is your favorite color?</label
          >
        </FloatLabel>
        <Message
          v-if="error?.favoriteColor"
          severity="error"
          variant="simple"
          size="small"
          class="mt-1"
          >{{ error.favoriteColor }}</Message
        >
      </div>

      <!-- Nickname -->
      <div>
        <FloatLabel
          variant="on"
          :class="[
            'text-sm  bg-transparent border-b',
            error?.nickname
              ? 'border-red-500'
              : 'border-accentblack dark:border-accentwhite',
          ]"
        >
          <Select
            v-model="registerPayload.nickname"
            inputId="on_label"
            :options="nickNameOptions"
            optionLabel="name"
            class="w-full h-10 dropdown-svg-white text-sm bg-transparent dark:bg-accentblack"
          />
          <label
            for="on_label"
            :class="[
              'text-sm',
              error?.nickname
                ? 'text-red-500'
                : 'text-label dark:text-accentwhite bg-transparent dark:bg-accentblack',
            ]"
            >What is your childhood nickname?</label
          >
        </FloatLabel>
        <Message
          v-if="error?.nickname"
          severity="error"
          variant="simple"
          size="small"
          class="mt-1"
          >{{ error.nickname }}
        </Message>
      </div>

      <div>
        <p
          class="text-[.7rem] text-center text-accentblack dark:text-accentwhite"
        >
          By signing up, you are agreeing to the
          <NuxtLink
            to="/terms-and-conditions"
            class="text-primarylight cursor-pointer hover:text-primarylight/50"
            >Terms and Conditions</NuxtLink
          >
          and
          <NuxtLink
            to="/privacy-policy"
            class="text-primarylight cursor-pointer hover:text-primarylight/50"
            >Privacy Policy.</NuxtLink
          >
        </p>
      </div>
      <Button
        type="submit"
        severity="secondary"
        label="Sign Up"
        @click="register"
        class="w-full bg-primarylight text-white p-2 hover:bg-primarylight/70 cursor-pointer"
      />
    </div>

    <!-- Login and Help -->
    <div class="flex items-center justify-between">
      <p class="text-sm text-center text-accentblack dark:text-accentwhite">
        Already have an account?
        <NuxtLink
          to="/login"
          class="text-primarylight cursor-pointer hover:text-primarylight/50"
          >Login</NuxtLink
        >
      </p>
      <p
        class="text-sm text-center text-primarylight cursor-pointer hover:text-primarylight/50"
      >
        Help?
      </p>
    </div>

    <p class="text-sm text-center my-3 text-accentblack dark:text-accentwhite">
      - Or Sign Up With -
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
</template>
