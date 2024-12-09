<script setup lang="ts">
import LOGO from "~/assets/icons/logo.svg?url";
import type { RegisterPayload, ErrorPayload } from "../types/auth";
import { errorMessage } from "@/consts/errorMessage";
definePageMeta({
  layout: "authentication",
});

const otp = ref(null);



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
  password: null,
  confirmPassword: null,
});

/**
 *@description Register function
 *@author PSK
 *@created 2024-11-22
 *@updated 2024-11-24
 */
const register = async () => {
  checkValidation();
  if (Object.values(error).every((value) => value === null)) {
    try {
      // await store.register(registerPayload);
    } catch (error) {
      console.error(error);
    }
  }
};



const checkValidation = () => {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  //check Password
  if (!registerPayload.password)
    error.password = errorMessage.PASSWORD_REQUIRED;
  else if (!passwordPattern.test(registerPayload.password))
    error.password = errorMessage.PASSWORD_INVALID;
  else error.password = null;

  //check Confirm Password
  if (!registerPayload.confirmPassword)
    error.confirmPassword = errorMessage.CONFIRM_PASSWORD_REQUIRED;
  else if (registerPayload.password !== registerPayload.confirmPassword)
    error.confirmPassword = errorMessage.PASSWORD_NOT_MATCH;
  else error.confirmPassword = null;
};
</script>

<template>
  <div
    className="w-full sm:max-w-md bg-accentwhite rounded-xl p-7 shadow-md dark:bg-accentblack"
  >
       <!-- Logo -->
    <div class=" mb-3">
      <img :src="LOGO" alt="logo" class="w-15 h-15 mx-auto" />
    </div>
    <h1
      class="text-2xl font-medium text-center text-accentblack dark:text-accentwhite"
    >
      Change Password
    </h1>
    <div class="space-y-7 mt-6">
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
            >New Password</label
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
      <!-- <Message v-if="$form.passcode?.invalid" severity="error" size="small" variant="simple">{{ $form.passcode.error?.message }}</Message> -->
      <Button
        type="submit"
        severity="secondary"
        label="Confirm"
        @click="register"
        class="w-full bg-primarylight text-white p-2 hover:bg-primarylight/70 cursor-pointer"
      />
    </div>
  </div>
</template>
