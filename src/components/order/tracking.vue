<script setup lang="ts">
import { ref } from "vue";

// tracking sample data
const tracking = ref([
  { page: "Product", isActive: true, isFinished: true },
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
            item.isFinished ? 'text-primarylight' : '',
            item.isActive ? 'text-black font-bold' : 'text-gray-400'
          ]"
          >{{ item.page }}</span
        >
        <div
          class="flex items-center justify-center h-8 w-8 rounded-full"
          :class="[
            item.isFinished ? 'bg-primarylight' : 'bg-white',
            item.isActive ? 'ring-2 ring-primarylight' : 'ring-2 ring-gray-200',
          ]"
        >
          <i v-if="item.isFinished" class="pi pi-check text-white"></i>
        </div>
      </div>
      <div
        v-if="index < tracking.length - 1"
        class="line w-full h-0.5 mt-6 mx-2"
        :class="item.isFinished ? 'bg-primarylight' : 'bg-gray-200'"
      ></div>
    </template>
  </div>
</template>

<style scoped>
.track-point {
  display: inline-flex;
}
</style>
