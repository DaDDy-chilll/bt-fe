<script setup lang="ts">
import { ref} from "vue";
import { useRouter } from "vue-router";
import BackIcon from "@/assets/icons/back_icon.vue";
import goldmethods from "./goldmethods.json";
import type {GoldMethod} from "@/types/goldMethod";
import MethodTable from "@/components/tools/methodTable.vue";
import slotHeader from "@/components/slotHeader.vue";

//fetching data
const method1Data = goldmethods.filter((method) => method.method === "method1");
const method2Data = goldmethods.filter((method) => method.method === "method2");

//v-model variables
const m1_model_data = ref<GoldMethod[]>(method1Data);
const m2_model_data = ref<GoldMethod[]>(method2Data);

const router = useRouter();
</script>

<template>
  <div>
     <slotHeader title="Gold Calculation Methods"/>
     <div class="px-6 py-2 bg-accentwhite rounded-lg">
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
