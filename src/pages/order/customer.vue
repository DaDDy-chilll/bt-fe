<script setup lang="ts">
import tracking from "@/components/order/tracking.vue";
import customerForm from "@/components/order/customerForm.vue";
import invoice from "@/components/order/invoice.vue";
</script>

<template>
  <div class="h-screen">
    <tracking />
    <div class="px-3 py-6 flex items-center justify-center gap-20">
      <div class="w-2/4 bg-accentwhite py-6 px-3 rounded-lg">
        <customerForm />
      </div>
      <div class="w-1/3 bg-accentwhite py-6 px-3 rounded-lg">
        <invoice />
      </div>
    </div>
  </div>
</template>
