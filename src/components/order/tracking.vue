<script setup lang="ts">
import { ref } from "vue";

// tracking sample data
const tracking = ref([
  { page: "Product", isActive: false, isFinished: true },
  { page: "Customer", isActive: true, isFinished: false },
  { page: "Shipping", isActive: false, isFinished: false },
  { page: "Payment", isActive: false, isFinished: false },
  { page: "Summary", isActive: false, isFinished: false },
]);
</script>

<template>
  <div class="py-6 px-3 flex items-center justify-center">
    <template v-for="(item, index) in tracking" :key="item.page">
      <div class="track-point flex flex-col items-center relative">
        <span
          class="text-sm mb-2"
          :class="[
            item.isFinished ? 'text-primarylight dark:text-accent2 dark:font-bold' : item.isActive ? 'text-accentblack font-bold dark:text-accentwhite' : 'text-accentblack/50 dark:text-accentwhite',
          ]"
          >{{ item.page }}</span
        >
        <div
          class="flex items-center justify-center h-8 w-8 rounded-full"
          :class="[
            item.isFinished ? 'bg-primarylight ring-primarylight dark:bg-accent2 ring-2 dark:ring-accent2' : item.isActive ? 'bg-white dark:bg-primarydark ring-2 ring-primarylight dark:ring-accent2' : 'bg-white dark:bg-primarydark ring-2 ring-gray-200',
            
          ]"
        >
          <i v-if="item.isFinished" class="pi pi-check text-white"></i>
        </div>
      </div>
      <div
        v-if="index < tracking.length - 1"
        class="line w-full h-0.5 mt-6 mx-2"
        :class="item.isFinished ? 'bg-primarylight dark:bg-accent2' : 'bg-gray-200 dark:bg-gray-400'"
      ></div>
    </template>
  </div>
</template>

<style scoped>
.track-point {
  display: inline-flex;
}
</style>
