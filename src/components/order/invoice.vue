<script setup>
import { ref } from "vue";
 

const orderStore = useOrderStore();

//sample data
const invoice_data = ref({
  code: orderStore.orderDetails.invoiceCode,
  date: orderStore.orderDetails.todayDate,
  staff: orderStore.orderDetails.staffName,
  total_quantity: orderStore.orderDetails.totalQuantity,
  gold_method: orderStore.orderDetails.goldMethod,
  order_type: orderStore.orderDetails.orderType,
  product_type: orderStore.orderDetails.productType,
  payment_status: orderStore.payment.payment_status,
  payment_method: orderStore.payment.payment_method,
});

//watch store changes for payment status and method
watch(()=>{
  invoice_data.value.payment_status = orderStore.payment.payment_status;
  invoice_data.value.payment_method = orderStore.payment.payment_method;
})

</script>
<template>
  <div class="flex items-center gap-2 px-4">
    <span
      class="flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-primarylight dark:bg-primarydark dark:border-accent2"
    >
      <i class="pi pi-pencil text-primarylight dark:text-accent2 "></i>
    </span>
    <span class="text-2xl font-semibold dark:text-accentwhite"> #{{ invoice_data.code }}</span>
  </div>
  <div class="flex justify-between mt-4">
    <div class="px-4 flex items-center gap-2">
      <span class="text-sm text-muted dark:text-gray-400">
        <i class="pi pi-user mr-2"></i>
        <span> {{ invoice_data.staff }} </span>
      </span>
    </div>
    <div class="px-4 flex items-center gap-2">
      <span class="text-sm text-muted dark:text-gray-400">
        <i class="pi pi-calendar mr-2"></i>
        <span> {{ invoice_data.date }} </span>
      </span>
    </div>
  </div>
  <!--Table-->
  <div>
    <div class="flex flex-col text-accentblack dark:text-accentwhite">
      <div class="flex justify-between py-4 border-b">
        <span class="text-sm">Total Quantity</span>
        <span class="text-sm">{{ invoice_data.total_quantity }}</span>
      </div>
      <div class="flex justify-between py-4 border-b">
        <span class="text-sm">Gold Method</span>
        <span class="text-sm">{{ invoice_data.gold_method }}</span>
      </div>
      <div class="flex justify-between py-4 border-b">
        <span class="text-sm">Order Type</span>
        <span class="text-sm">{{ invoice_data.order_type }}</span>
      </div>
      <div class="flex justify-between py-4 border-b">
        <span class="text-sm">Product Type</span>
        <span class="text-sm">{{ invoice_data.product_type }}</span>
      </div>
      <div class="flex justify-between py-4 border-b">
        <span class="text-sm">Payment Status</span>
        <span class="text-sm">{{ invoice_data.payment_status }}</span>
      </div>
      <div class="flex justify-between py-4 border-b">
        <span class="text-sm">Payment Method</span>
        <span class="text-sm">{{ invoice_data.payment_method }}</span>
      </div>
    </div>
  </div>
</template>
