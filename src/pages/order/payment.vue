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

/**
 * next step
 * @param payment
 */
const nextStep = (payment: any) => {
  orderStore.addPayment(payment);
  console.log(orderStore.payment,"payment");
  navigateTo("/order/summary");
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

    <div class="mb-12 flex justify-between">
      <Button @click="navigateTo('/order/shipping')" class="underline dark:text-accentwhite"
        >Back</Button
      >
      <button
        @click="nextStep(payment)"
        class="bg-primarylight text-white dark:text-accentblack dark:bg-accent2 px-6 py-1 rounded-md float-right"
      >
        <span class="text-white dark:text-accentblack">Next</span>
      </button>
    </div>
  </div>
</template>
