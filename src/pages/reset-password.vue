<script setup lang="ts">
import LOGO from "~/assets/icons/logo.svg?url";
import type { ResetPasswordPayload, ErrorPayload } from "../types/auth";
import { errorMessage } from "@/consts/errorMessage";
const store = useAuthStore();
definePageMeta({
  layout: "authentication",
});

const loading = ref<boolean>(false);
const showAlert = ref<boolean>(false);
const alertMessage = ref<string>("");


/**
 *@description Value of email,password,name,confirmPassword,favoriteColor,nickname
 *@author PSK
 *@created 2024-11-22
 *@updated ****-**-**
 */
const ResetPayload: ResetPasswordPayload = reactive<ResetPasswordPayload>({
  password: "",
  confirm_password: "",
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
  loading.value = true;
  checkValidation();
  if (Object.values(error).every((value) => value === null)) {
    try {
      const res = await store.resetPassword(ResetPayload, store.token);
      if(res?.value){
        navigateTo("/")
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



const checkValidation = () => {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  //check Password
  if (!ResetPayload.password)
    error.password = errorMessage.PASSWORD_REQUIRED;
  else if (!passwordPattern.test(ResetPayload.password))
    error.password = errorMessage.PASSWORD_INVALID;
  else error.password = null;

  //check Confirm Password
  if (!ResetPayload.confirm_password)
    error.confirmPassword = errorMessage.CONFIRM_PASSWORD_REQUIRED;
  else if (ResetPayload.password !== ResetPayload.confirm_password)
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
            v-model="ResetPayload.password"
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
            v-model="ResetPayload.confirm_password"
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
        type="button"
        :loading="loading"
        severity="secondary"
        label="Confirm"
        @click="register"
        class="w-full bg-primarylight text-white p-2 hover:bg-primarylight/70 cursor-pointer"
      />
    </div>
  </div>
  <AlertBox :message="alertMessage" :visible="showAlert" @close="showAlert = false" />
</template>
