<script setup lang="ts">
const store = useOrderStore();
console.log(store.orderDetails, "orderDetails",store.payment, "payment");
</script>
<template>
  <div class="grid grid-cols-2 gap-4 text-sm">
    <div class="px-4 border-r border-r-gray-300">
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-base">Comment Section</h1>
        <NuxtLink to="/order/memo" class="text-primarylight text-sm underline"
          >see all</NuxtLink
        >
      </div>
      <div class="flex justify-center gap-4">
        <img
          src="~/assets/images/light_bg.jpg"
          alt="comment"
          class="w-12 h-12 rounded-full"
        />
        <textarea
          placeholder="Write a comment"
          rows="5"
          class="w-full border-2 border-muted rounded-md px-2 py-1"
        ></textarea>
      </div>
    </div>
    <div class="col-span-1">
        <div class="flex justify-between py-2">
            <span class="text-sm text-accentblack">Total Product Quantity</span>
            <span class="text-sm ml-4">{{ store.orderDetails.totalQuantity }}</span>
          </div>
          <div class="flex justify-between py-2">
            <span class="text-sm text-accentblack">Total Product Amount</span>
            <span class="text-sm ml-4">{{ store.orderDetails.totalAmount }}</span>
          </div>
          <div class="flex justify-between py-2">
            <span class="text-sm text-accentblack">Shipping Fee</span>
            <span class="text-sm ml-4">{{ store.shipping.shipping_fee }}</span>
          </div>
          <div class="flex justify-between py-2 border-b border-b-gray-300">
            <span class="text-sm text-accentblack">Tax Amount</span>
            <span class="text-sm ml-4">{{ store.payment.tax_amount }}</span>
          </div>
          <div class="flex justify-between py-2">
            <span class="text-sm text-accentblack">Grand Total</span>
            <span class="text-sm ml-4">{{ store.payment.total_amount }}</span>
          </div>
          <div class="flex justify-between py-2 border-b border-gray-500">
            <span class="text-sm text-accentblack">Partial Paid</span>
            <span class="text-sm ml-4 text-red-500">{{ store.payment.partial_amount }}</span>
          </div>
          <div class="flex justify-between py-2">
        <span class="text-lg font-semibold text-accentblack"
          >Remaining Amount</span
        >
        <span class="text-lg font-semibold ml-4"
          >{{ store.payment.total_amount - store.payment.partial_amount }}</span
        >
      </div>
    </div>
  </div>
</template>
