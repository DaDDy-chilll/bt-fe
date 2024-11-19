<script setup lang="ts">
import type { LoginPayload } from "../types/auth";
import { reactive, ref } from "vue";
import { useAuthStore } from "../stores/auth";
import type { VForm } from "vuetify/components";

const store = useAuthStore();
const form = ref<VForm>();


/**
 * Login payload
 */
const loginPayload: LoginPayload = reactive<LoginPayload>({
  email: "",
  password: "",
});

/**
 * Login function
 */
const login = async () => {
  const validation = await form.value?.validate();
  if (validation?.valid) {
    await store.login(loginPayload);
  }
};
</script>
<template>
  <v-container
    class="flex justify-center items-center min-h-screen bg-gray-100"
  >
    <v-card class="w-full max-w-md p-6">
      <v-card-title class="text-center text-lg font-bold">Login</v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="login">
          <v-text-field
            v-model="loginPayload.email"
            label="Email"
            type="email"
            prepend-icon="mdi-email"
            required
          ></v-text-field>
          <v-text-field
            v-model="loginPayload.password"
            label="Password"
            type="password"
            prepend-icon="mdi-lock"
            required
          ></v-text-field>
          <v-btn class="w-full mt-4" color="primary" type="submit">
            Login
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
/* Additional styles can be added here if needed */
</style>
