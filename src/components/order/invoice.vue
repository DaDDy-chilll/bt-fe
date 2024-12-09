<script setup>
import { ref } from "vue";
 

const orderStore = useOrderStore();

//sample data
const invoice_data = ref({
  code: orderStore.orderDetails.invoiceCode,
  date: orderStore.orderDetails.todayDate,
  staff: orderStore.orderDetails.staffName,
  total_quantity: 10, // to calculate
  gold_method: orderStore.orderDetails.goldMethod,
  order_type: orderStore.orderDetails.orderType,
  product_type: orderStore.orderDetails.productType,
  payment_status: orderStore.orderDetails.paymentStatus,
  payment_method: orderStore.orderDetails.paymentMethod,
});

</script>
<template>
  <div class="flex items-center gap-2 px-4">
    <span
      class="flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-primarylight"
    >
      <i class="pi pi-pencil text-primarylight"></i>
    </span>
    <span class="text-2xl font-semibold"> #{{ invoice_data.code }}</span>
  </div>
  <div class="flex justify-between mt-4">
    <div class="px-4 flex items-center gap-2">
      <span class="text-sm text-muted">
        <i class="pi pi-user mr-2"></i>
        <span> {{ invoice_data.staff }} </span>
      </span>
    </div>
    <div class="px-4 flex items-center gap-2">
      <span class="text-sm text-muted">
        <i class="pi pi-calendar mr-2"></i>
        <span> {{ invoice_data.date }} </span>
      </span>
    </div>
  </div>
  <!--Table-->
  <div>
    <div class="flex flex-col">
      <div class="flex justify-between py-4 border-b">
        <span class="text-sm text-accentblack">Total Quantity</span>
        <span class="text-sm">{{ invoice_data.total_quantity }}</span>
      </div>
      <div class="flex justify-between py-4 border-b">
        <span class="text-sm text-accentblack">Gold Method</span>
        <span class="text-sm">{{ invoice_data.gold_method }}</span>
      </div>
      <div class="flex justify-between py-4 border-b">
        <span class="text-sm text-accentblack">Order Type</span>
        <span class="text-sm">{{ invoice_data.order_type }}</span>
      </div>
      <div class="flex justify-between py-4 border-b">
        <span class="text-sm text-accentblack">Product Type</span>
        <span class="text-sm">{{ invoice_data.product_type }}</span>
      </div>
      <div class="flex justify-between py-4 border-b">
        <span class="text-sm text-accentblack">Payment Status</span>
        <span class="text-sm">{{ invoice_data.payment_status }}</span>
      </div>
      <div class="flex justify-between py-4 border-b">
        <span class="text-sm text-accentblack">Payment Method</span>
        <span class="text-sm">{{ invoice_data.payment_method }}</span>
      </div>
    </div>
  </div>
</template>
