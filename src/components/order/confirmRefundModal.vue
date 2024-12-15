<script setup>
const emit = defineEmits(["update:currentStep"]);
const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
  currentStep: {
    type: Number,
    required: true,
  },
});
/*** Functions ***/
const handleRefundBack = () => {
  emit("update:currentStep", 1);

};
const handleConfirmRefund = () => {
  emit("update:currentStep", 3);
  //TODO: Add refund api call to store refund data + comment 
};
</script>
<template>
  <div class="text-sm">
    <!--Product Table-->
    <div class="overflow-x-auto">
      <DataTable
        :value="products"
      dataKey="id"
      stripedRows
      class="w-full text-sm"
      scrollable
      resizableColumns
      columnResizeMode="expand"
      showGridlines
      paginator
      :rows="14"
      :rowsPerPageOptions="[10, 20, 50]"
      :totalRecords="products.length"
      responsiveLayout="scroll"
      breakpoint="sm"
    >
      <!--Image-->
      <Column field="image" class="w-[10%]">
        <template #body="slotProps">
          <div>
            <img
              :src="slotProps.data.image"
              alt="product image"
              class="w-16 h-16 object-cover"
            />
          </div>
        </template>
      </Column>
      <!--Product Name-->
      <Column field="name" class="w-[15%]"> </Column>
      <!--Type-->
      <Column field="type" header="Type" class="w-[15%]"> </Column>
      <!--Quantity-->
      <Column field="quantity" header="Quantity" class="w-[15%]"> </Column>
      <!--Ayoutwat-->
      <Column field="ayoutwat" header="Ayoutwat" class="w-[15%]"> </Column>
      <!--Latt Kha-->
      <Column field="latt_kha" header="Latt Kha" class="w-[15%]"> </Column>
      <!--Price-->
      <Column field="price" header="Price" class="w-[15%]"> </Column>
    </DataTable>
  </div>
  <!--Comment Section-->
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
            <span class="text-sm text-accentblack">Refund Quantity</span>
            <span class="text-sm ml-4"> 9 </span>
          </div>
          <div class="flex justify-between py-2">
            <span class="text-sm text-accentblack">Total Product Amount</span>
            <span class="text-sm ml-4">100000</span>
          </div>
          <div class="flex justify-between py-2">
            <span class="text-sm text-accentblack">Shipping Fee</span>
            <span class="text-sm ml-4">1000</span>
          </div>
          <div class="flex justify-between py-2 border-b border-b-gray-300">
            <span class="text-sm text-accentblack">Tax Amount</span>
            <span class="text-sm ml-4">1000</span>
          </div>
          <div class="flex justify-between py-2">
            <span class="text-sm font-semibold text-accentblack">Grand Total</span>
            <span class="text-sm ml-4">100000</span>
          </div>
    </div>
  </div>
  <!--Buttons-->
  <div class="flex justify-end gap-4 mt-4">
    <button @click="handleRefundBack" class="bg-accentblack text-white px-6 py-2 rounded-md">
      <span class="text-white">Back</span>
    </button>
    <button @click="handleConfirmRefund" class="bg-primarylight text-white px-6 py-2 rounded-md">
      <span class="text-white">Confirm</span>
    </button>
  </div>
  </div>
</template>