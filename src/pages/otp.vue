<script setup lang="ts">
import LOGO from "~/assets/icons/logo.svg?url";
import type { OtpPayload } from "../types/auth";
const store = useAuthStore();
const verifyOTP = reactive<OtpPayload>({
  email: store.email,
  otp: ""
})
const error = ref<string>("");
  const loading = ref<boolean>(false);
 const showAlert = ref<boolean>(false);
 const alertMessage = ref<string>("");

 
console.log(store.email)
/**
 *@description Page Layout and Title
 *@author PSK
 *@created 2024-12-09
 *@updated ****-**-**
 */
definePageMeta({
  layout: "authentication",
});
useHead({ title: "OTP" })

/**
 *@description Login function
 *@author PSK
 *@created 2024-12-09
 *@updated 2024-11-24
 */
const login = async () => {
  loading.value = true
  error.value = "";
  console.log(verifyOTP.otp);
  if (verifyOTP.otp !== "" && verifyOTP.otp.length === 4) {
    try{
      const res = await store.otp(verifyOTP)
      if(res?.value){
        console.log(res.value,res)
        store.setToken((res?.value as any)?.data.resetPasswordToken)
        navigateTo("/reset-password")
      } 
    }catch(error){
      if(error){
        alertMessage.value = error as string
        showAlert.value = true
      }
    }
  } else error.value = "Please enter 4 digits";
  loading.value = false
};

</script>

<template>
  <div className="w-full sm:max-w-md bg-accentwhite rounded-xl p-7 shadow-md dark:bg-accentblack">
    <!-- Logo -->
    <div class=" mb-3">
      <img :src="LOGO" alt="logo" class="w-15 h-15 mx-auto" />
    </div>

    <!-- Header -->
    <h1 class="text-2xl font-medium text-center text-accentblack dark:text-accentwhite">
      Please enter the OTP
    </h1>

    <div class="flex flex-col justify-center items-center gap-4 mb-5">
      <!-- OTP Input -->
      <InputOtp v-model="verifyOTP.otp" integerOnly>
        <template #default="{ attrs, events }">
          <input type="text" v-bind="attrs" v-on="events" :class="[
            'w-[40px] text-[36px] border-0 appearance-none text-center transition-all duration-200 bg-transparent border-b-2  text-accentblack dark:text-accentwhite focus:outline-none  focus:border-b-primarylight',
            error
              ? 'border-red-500 dark:border-red-500'
              : 'border-b-accentblack dark:border-b-accentwhite',
          ]" />
        </template>
      </InputOtp>
      <Message v-if="error" severity="error" size="small" variant="simple">{{
        error
      }}</Message>
    </div>
    <Button type="button" :loading="loading" severity="secondary" label="Confirm" @click="login"
      class="w-full bg-primarylight text-white p-2 hover:bg-primarylight/70 cursor-pointer" />
  </div>
  <AlertBox :message="alertMessage" :visible="showAlert" @close="showAlert = false" />
</template>

<!-- <style scoped>
.custom-otp-input {
  width: 40px;
  font-size: 36px;
  border: 0 none;
  appearance: none;
  text-align: center;
  transition: all 0.2s;
  background: transparent;
  border-bottom: 2px solid var(--accentblack);
  color: var(--accentblack);
}
.dark .custom-otp-input {
  border-bottom-color: var(--accentwhite);
  color: var(--accentwhite);
}

.custom-otp-input:focus {
  outline: 0 none;
  border-bottom-color: var(--primarylight);
}
</style> -->
