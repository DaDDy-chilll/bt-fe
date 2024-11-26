<script setup lang="ts">
import { ref} from "vue";
import { useRouter } from "vue-router";
import BackIcon from "@/assets/icons/back_icon.vue";
import method1 from "./method1.json";
import method2 from "./method2.json";
import { GoldMethod } from "@/types/goldMethod";
import MethodTable from "./methodTable.vue";

//fetching data
const method1Data = method1;
const method2Data = method2;

//v-model variables
const m1_model_data = ref<GoldMethod[]>(method1Data);
const m2_model_data = ref<GoldMethod[]>(method2Data);

const router = useRouter();
</script>

<template>
  <div>
    <div class="p-4 bg-accentwhite rounded-lg">
      <!-- Header -->
      <div class="flex items-center gap-2">
       <button @click="router.back()"><BackIcon /></button>
        <h1 class="sm:text-2xl text-xl font-bold">Gold Calculation Methods</h1>
      </div>

      <!-- Method Table  1-->
      <div>
        <MethodTable :model_data="m1_model_data" />
      </div>
    </div>

    <!-- Method Table 2-->
    <div class="p-4 bg-accentwhite rounded-lg mt-4">
      <MethodTable :model_data="m2_model_data" />
    </div>
  </div>
</template>
