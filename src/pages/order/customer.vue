<script setup lang="ts">
import tracking from "@/components/order/tracking.vue";
import customerForm from "@/components/order/customerForm.vue";
import invoice from "@/components/order/invoice.vue";
import searchCustomerModal from "@/components/order/searchCustomerModal.vue";
import { useOrderStore } from "@/stores/order";
import { computed, ref } from "vue";
//import type { Customer } from "@/types/customer";

//constants
const orderStore = useOrderStore();
//const products = computed(() => orderStore.products);
const displayModal = ref(false);
const customer = ref({});

//functions
/**
 * Fill customer data to the form
 * @author Aye Nadi
 * @param customer
 */
const handleAddCustomer = (customer: any) => {
  console.log("add new customer", customer);
  customer.value = customer;
};

/**
 * next step . store customer data and navigate to shipping page
 * @author Aye Nadi
 * @param customer
 */
const nextStep = (customer: any) => {
  orderStore.addCustomer(customer);
  navigateTo("/order/shipping");
};
</script>

<template>
  <div class="h-screen">
    <tracking />
    <div class="px-3 py-6 flex justify-center gap-20">
      <div class="w-2/4 bg-accentwhite py-6 px-3 drop-shadow-md rounded-lg">
        <customerForm :customer="customer" />
      </div>
      <div class="w-1/3 bg-accentwhite py-6 px-3 drop-shadow-md rounded-lg">
        <invoice />
      </div>
    </div>
    <searchCustomerModal
      :displayModal="displayModal"
      @update:displayModal="displayModal = $event"
      @addNewCustomer="handleAddCustomer"
    />
    <div>
      <Button @click="navigateTo('/order/new-order')" class="underline"
        >Back</Button
      >
      <button
        @click="nextStep(customer)"
        class="bg-primarylight text-white px-6 py-1 rounded-md float-right"
      >
        <span class="text-white">Next</span>
      </button>
    </div>
  </div>
</template>
