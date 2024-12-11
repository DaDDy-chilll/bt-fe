<script setup lang="ts">
import { ref, computed } from "vue";
import type { Customer } from "@/types/customer";
import { useRouter } from "vue-router";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import BackArrow from "@/assets/icons/back_icon.vue";
import OrderHistoryData from "./../order-history.json";

// V-Model Variables


// Fetch
const orderHistory = OrderHistoryData;

/**
 * @description Fetch Order History Data from JSON file
 * @author SPN
 * @created 11/12/2024
 * @param {number} customerId - Customer ID
 * @returns {Array} Order History Data
 */
const orderHistoryData = computed(() => {
  const customerId = Number(useRouter().currentRoute.value.params.id);
  const customerOrderHistory = orderHistory.find((item) => item.customer_id === customerId)?.order_history;
  return customerOrderHistory ? Object.values(customerOrderHistory) : [];
});

</script>

<template>
  <div class="w-full bg-accentwhite drop-shadow-md rounded-lg dark:bg-primarydark h-[calc(100vh-4.5rem)]">
    <div class="flex justify-between item-center p-5">
      <div class="flex items-center">
        <BackArrow class="w-10 h-10 text-accent1 dark:text-accent2 mr-4" />
        <h1 class="text-2xl font-bold dark:text-accentwhite">Order History</h1>
      </div>
      <div>
        <span class="text-sm text-label dark:text-accent2 mr-4">Sort By</span>
        <input type="date" name="" id="" class="border dark:border-accent2 rounded-md p-2">
      </div>
    </div>

    <!-- Table -->
    <DataTable :value="orderHistoryData" stripedRows class="w-full px-6 my-5 text-base" scrollable resizableColumns
      columnResizeMode="fit" showGridlines paginator :rows="14" :rowsPerPageOptions="[10, 20, 50]"
      :totalRecords="orderHistoryData.length">
      <Column field="order_date" header="Order Date" class="dark:bg-primarydark">
        <template #body="{ data }">
          <span class="text-accent1 dark:text-accent2">{{ data.order_date }}</span>
        </template>
      </Column>
      <Column field="product" header="Product" class="dark:bg-primarydark"></Column>
      <Column field="type" header="Type" class="dark:bg-primarydark"></Column>
      <Column field="quantity" header="Quantity" class="dark:bg-primarydark"></Column>
      <Column field="Ayawt" header="Ayawt" class="dark:bg-primarydark"></Column>
      <Column field="Lakha" header="Lakha" class="dark:bg-primarydark"></Column>
      <Column field="price" header="Price" class="dark:bg-primarydark"></Column>
      <Column field="Order_method" header="Order Method" class="dark:bg-primarydark"></Column>
      <Column field="order_type" header="Order Type" class="dark:bg-primarydark"></Column>
      <Column field="payment" header="Payment" class="dark:bg-primarydark"></Column>
    </DataTable>
  </div>
</template>

<style scoped>
:deep(.p-datatable-header) {
  @apply dark:bg-primarydark;
}

:deep(.p-datatable-thead > tr > th) {
  @apply dark:bg-primarydark;
  @apply dark:text-accentwhite;
}

:deep(.p-datatable-tbody > tr) {
  @apply dark:bg-primarydark;
  @apply dark:text-accentwhite;
}
</style>
