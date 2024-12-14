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
const displayModal = ref(false);
//const products = computed(() => orderStore.products);
const customer = ref({});

//functions
/**
 * Fill customer data to the form
 * @author Aye Nadi
 * @param customer
 */
const handleAddCustomer = (customer: any) => {
  customer.value = customer;
};

</script>

<template>
      <div class="">
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
  </div>

</template>
