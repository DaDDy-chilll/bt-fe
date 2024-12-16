<script setup lang="ts">
import tracking from "@/components/order/tracking.vue";
import paymentForm from "@/components/order/paymentForm.vue";
import invoice from "@/components/order/invoice.vue";
import customerInfo from "@/components/order/customerInfo.vue";
import shippingInfo from "~/components/order/shippingInfo.vue";
import { useOrderStore } from "@/stores/order";
import { computed, ref } from "vue";
//import type { Customer } from "@/types/customer";

//constants
const orderStore = useOrderStore();
const payment = ref({});

//functions
/**
 * Fill payment data to the form
 * @param payment
 */
const handleAddPayment = (payment: any) => {
  console.log("add new payment", payment);
  payment.value = payment;
};
  
</script>

<template>
  <div class="min-h-screen mb-8">
    <tracking />
    <div class="px-3 py-6 flex justify-center gap-20">
      <div class="w-2/4 bg-accentwhite dark:bg-primarydark py-6 px-3 drop-shadow-md rounded-lg">
        <paymentForm :payment="payment" />
      </div>
      <div class="w-1/3 flex flex-col gap-4">
        <div class=" bg-accentwhite dark:bg-primarydark py-6 px-3 drop-shadow-md rounded-lg">
          <invoice />
        </div>
        <div class=" bg-accentwhite dark:bg-primarydark py-6 px-3 drop-shadow-md rounded-lg overflow-x-auto">
          <customerInfo />
        </div>
        <div class=" bg-accentwhite dark:bg-primarydark py-6 px-3 drop-shadow-md rounded-lg overflow-x-auto">
          <shippingInfo />
        </div>
      </div>
    </div>

  </div>
</template>
