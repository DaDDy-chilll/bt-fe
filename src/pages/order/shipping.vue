<script setup lang="ts">
import tracking from "@/components/order/tracking.vue";
import shippingForm from "@/components/order/shippingForm.vue";
import invoice from "@/components/order/invoice.vue";
import customerInfo from "@/components/order/customerInfo.vue";
import { useOrderStore } from "@/stores/order";
import { computed, ref } from "vue";
//import type { Customer } from "@/types/customer";

//constants
const orderStore = useOrderStore();
const shipping = ref({});

//functions
/**
 * Fill shipping data to the form
 * @param shipping
 */
const handleAddShipping = (shipping: any) => {
  console.log("add new shipping", shipping);
  shipping.value = shipping;
};

/**
 * next step
 * @param shipping
 */
const nextStep = (shipping: any) => {
  orderStore.addShipping(shipping);
  console.log(orderStore.shipping,"shipping");
  navigateTo("/order/payment");
};
</script>

<template>
  <div class="min-h-screen mb-8">
    <tracking />
    <div class="px-3 py-6 flex items-center justify-center gap-20">
      <div class="w-2/4 bg-accentwhite py-6 px-3 drop-shadow-md rounded-lg">
        <shippingForm :shipping="shipping" />
      </div>
      <div class="w-1/3 flex flex-col gap-4">
        <div class=" bg-accentwhite py-6 px-3 drop-shadow-md rounded-lg">
          <invoice />
        </div>
        <div class=" bg-accentwhite py-6 px-3 drop-shadow-md rounded-lg overflow-x-auto">
          <customerInfo />
        </div>
      </div>
    </div>

    <div class="mb-8">
      <Button @click="navigateTo('/order/customer')" class="underline"
        >Back</Button
      >
      <button
        @click="nextStep(shipping)"
        class="bg-primarylight text-white px-6 py-1 rounded-md float-right"
      >
        <span class="text-white">Next</span>
      </button>
    </div>
  </div>
</template>
