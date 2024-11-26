<script setup lang="ts">
import { Button, Message } from "primevue";
import LOGO from "@/assets/icons/logo.svg";
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
useHead({ title: "Forgot Password" });

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
 *@description Check validation 
 *@author PSK
 *@created 2024-11-24
 *@updated ****-**-**
 */
const checkValidation = () => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!loginPayload.email) error.email = errorMessage.EMAIL_REQUIRED;
  else if (!emailPattern.test(loginPayload.email)) error.email = errorMessage.EMAIL_INVALID;
  else error.email = null;
}

/**
 *@description Login function
 *@author PSK
 *@created 2024-11-22
 *@updated 2024-11-24
 */
const forgotPassword = async () => {
  checkValidation();
  if (Object.values(error).every(value => value === null)) {
    try {
      await store.forgot(loginPayload);
    } catch (error) {
      console.error(error);
    }
  }
};

</script>


<template>
  <div class="w-full sm:max-w-md bg-accentwhite rounded-xl p-8 shadow-md dark:bg-accentblack">
    <!-- Logo -->
    <LOGO alt="logo" class=" mx-auto mb-3" />
    <h1 class="text-2xl font-medium text-center text-accentblack dark:text-accentwhite">Forgot Password</h1>
    <!-- Email -->
    <div class="space-y-7 my-3">
      <div>
        <FloatLabel variant="on" :class="[
          'text-sm  bg-transparent border-b',
          error?.email ? 'border-red-500' : 'border-accentblack dark:border-accentwhite'
        ]">
          <InputText name="email" type="text" id="on_label" v-model="loginPayload.email" autocomplete="off"
            class="bg-transparent p-2 w-full text-accentblack dark:text-accentwhite" />
          <label for="on_label" :class="[
            'bg-transparent',
            error?.email ? 'text-red-500' : 'text-label  dark:text-accentwhite',
          ]">Email</label>
        </FloatLabel>
        <Message v-if="error?.email" severity="error" variant="simple" size="small" class="mt-1">{{ error.email }}
        </Message>
      </div>

      <Button type="submit" severity="secondary" label="Confirm" @click="forgotPassword"
        class="w-full bg-primarylight text-white p-2 hover:bg-primarylight/70 cursor-pointer" />

      <NuxtLink to="/login" class="text-primarylight text-sm flex items-center gap-1 hover:text-primarylight/70">
        <i class="pi pi-angle-left"></i>
        <span>Back to Login</span>
      </NuxtLink>
    </div>
  </div>
</template>
