<script setup lang="ts">
import paymentForm from "@/components/order/paymentForm.vue";
import invoice from "@/components/order/invoice.vue";
import customerInfo from "@/components/order/customerInfo.vue";
import shippingInfo from "~/components/order/shippingInfo.vue";
import { useOrderStore } from "@/stores/order";
import { computed, ref } from "vue";
import ProductSummary from "~/components/order/ProductSummary.vue";
import CommentSection from "~/components/order/commentSection.vue";
//import type { Customer } from "@/types/customer";

//constants
const orderStore = useOrderStore();
const payment = ref({});
const isProductSummaryOpen = ref(false);

//functions
/**
 * Fill payment data to the form
 * @param payment
 */
const handleAddPayment = (payment: any) => {
  console.log("add new payment", payment);
  payment.value = payment;
};

const printOrder = () => {
  console.log("print order");
};

const finishedOrder = () => {
  console.log("finished order");
};
</script>

<template>
  <div class="min-h-screen mb-8">
    <div class="px-3 py-6 flex justify-center gap-10">
      <div class="w-3/4 flex flex-col gap-4">
        <div class="bg-accentwhite drop-shadow-md rounded-lg">
          <div class="flex justify-between items-center px-3 py-4 cursor-pointer" @click="isProductSummaryOpen = !isProductSummaryOpen">
            <h3 class="font-medium">Product Summary</h3>
            <i :class="['pi', isProductSummaryOpen ? 'pi-chevron-up' : 'pi-chevron-down']"></i>
          </div>
          <div v-if="isProductSummaryOpen" class="px-3 pb-4">
            <ProductSummary />
          </div>
        </div>
        <div class=" bg-accentwhite py-6 px-3 drop-shadow-md rounded-lg">
          <CommentSection />
        </div>
      </div>

      <div class="w-1/3 flex flex-col gap-4">
        <div class="bg-accentwhite py-6 px-3 drop-shadow-md rounded-lg">
          <invoice />
        </div>
        <div
          class="bg-accentwhite py-6 px-3 drop-shadow-md rounded-lg overflow-x-auto"
        >
          <customerInfo />
        </div>
        <div
          class="bg-accentwhite py-6 px-3 drop-shadow-md rounded-lg overflow-x-auto"
        >
          <shippingInfo />
        </div>
      </div>
    </div>

  </div>
</template>
