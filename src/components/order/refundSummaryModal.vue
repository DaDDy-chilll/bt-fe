<script setup lang="ts">
const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
  customer: {
    type: Object,
    required: true,
  },
});

/*** Functions ***/
const emit = defineEmits(["update:currentStep", "closeModal"]);

const handleRefundBack = () => {
  emit("update:currentStep", 2);
};

const handleRefundDone = () => {
  emit("update:currentStep", 3);
  //close modal
  emit("closeModal");
};
</script>
<template>
  <div class="text-sm">
    <div class="grid grid-cols-3 gap-4">
      <!--Product Table-->
      <div class="col-span-2 dark:bg-primarydark dark:text-accentwhite p-2 rounded-md">
        <div class="overflow-x-auto overflow-y-auto">
          <DataTable
            :value="props.products"
            dataKey="id"
            stripedRows
            class="w-full text-sm"
            scrollable
            showGridlines
            paginator
            :rows="14"
            :rowsPerPageOptions="[10, 20, 50]"
            :totalRecords="props.products.length"
            responsiveLayout="scroll"
            breakpoint="sm"
          >
            <!--Image-->
            <Column field="image" class="w-[10%] dark:bg-primarydark dark:text-accentwhite">
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
            <Column field="name" class="w-[15%] dark:bg-primarydark dark:text-accentwhite"> </Column>
            <!--Type-->
            <Column field="type" header="Type" class="w-[15%] dark:bg-primarydark dark:text-accentwhite"> </Column>
            <!--Quantity-->
            <Column field="quantity" header="Quantity" class="w-[15%] dark:bg-primarydark dark:text-accentwhite">
            </Column>
            <!--Ayoutwat-->
            <Column field="ayoutwat" header="Ayoutwat" class="w-[15%] dark:bg-primarydark dark:text-accentwhite">
            </Column>
            <!--Latt Kha-->
            <Column field="latt_kha" header="Latt Kha" class="w-[15%] dark:bg-primarydark dark:text-accentwhite">
            </Column>
            <!--Price-->
            <Column field="price" header="Price" class="w-[15%] dark:bg-primarydark dark:text-accentwhite"> </Column>
          </DataTable>
        </div>
      </div>

      <!--Customer Info and Summary Info-->
      <div class="flex flex-col col-span-1">
        <div class="flex flex-col">
          <!--Customer Info-->
          <div class="shadow-md rounded-md p-4 mb-8 dark:bg-primarydark dark:text-accentwhite">
            <div class="flex items-center gap-2">
              <span
                class="flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-primarydark dark:border-accent2 border-2 border-primarylight"
              >
                <i class="pi pi-user text-primarylight dark:text-accent2"></i>
              </span>
              <h1>Customer Information</h1>
            </div>

            <div class="grid grid-cols-2 gap-4 mt-4 dark:text-accentwhite">
              <span class="text-sm">
                <i class="pi pi-user mr-2 text-primarylight dark:text-accent2"></i>
                <!--to change icon design-->
                <span>
                  {{ props.customer?.firstname }} {{ props.customer?.lastname }}
                </span>
              </span>
              <span class="text-sm">
                <i class="pi pi-book mr-2 text-primarylight dark:text-accent2"></i>
                <!--to change icon design-->
                <span>
                  {{ props.customer?.nrc }}
                </span>
              </span>
            </div>

            <div class="grid grid-cols-2 gap-4 mt-8 mb-4">
              <span class="text-sm">
                <i class="pi pi-phone mr-2 text-primarylight dark:text-accent2"></i>
                <!--to change icon design-->
                <span>
                  {{ props.customer?.phone }}
                </span>
              </span>
              <span class="text-sm flex items-center">
                <i class="pi pi-envelope mr-2 text-primarylight dark:text-accent2"></i>
                <!--to change icon design-->
                <span class="text-wrap break-words">
                  {{ props.customer?.email }}
                </span>
              </span>
            </div>
          </div>
          <!--Summary Info-->
          <div class="shadow-md rounded-md p-4 mb-8 dark:bg-primarydark dark:text-accentwhite">
            <div class="flex items-center gap-2">
              <span
                class="flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-primarydark dark:border-accent2 border-2 border-primarylight"
              >
                <i class="pi pi-money-bill text-primarylight dark:text-accent2"></i>
              </span>
              <h1>Refund Summary</h1>
            </div>
            <div class="mt-4 dark:text-accentwhite">
              <div class="flex justify-between py-2 mb-4">
                <span class="text-sm">Refund Quantity</span>
                <span class="text-sm ml-4"> 9 </span>
              </div>
              <div class="flex justify-between py-2 mb-4">
                <span class="text-sm"
                  >Total Product Amount</span
                >
                <span class="text-sm ml-4">100000</span>
              </div>
              <div class="flex justify-between py-2 mb-4">
                <span class="text-sm">Shipping Fee</span>
                <span class="text-sm ml-4">1000</span>
              </div>
              <div
                class="flex justify-between py-2 mb-4 border-b border-b-gray-300"
              >
                <span class="text-sm">Tax Amount</span>
                <span class="text-sm ml-4">1000</span>
              </div>
              <div class="flex justify-between py-2 mb-4">
                <span class="text-sm font-semibold"
                  >Grand Total</span
                >
                <span class="text-sm ml-4">100000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--Buttons-->
    <div class="flex justify-end gap-4">
      <button @click="handleRefundBack" class="bg-accentblack text-white px-6 py-1 rounded-md">
        <span class="text-white">Back</span>
      </button>
      <button @click="handleRefundDone" class="bg-primarylight dark:bg-accent2 text-white px-6 py-1 rounded-md">
        <span class="text-white dark:text-accentblack">Done</span>
      </button>
    </div>
  </div>
</template>

<style scoped>

:deep(.p-paginator) {
  @apply dark:bg-primarydark;
  @apply dark:text-accentwhite;
}

 :deep(.p-paginator-rpp-dropdown) {
    @apply dark:bg-transparent;
    @apply dark:text-accentwhite;
    @apply dark:border-1 dark:border-b-gray-400;
  }

  :deep(.p-select-label) {
    @apply dark:text-accentwhite;
  }

  :deep(.p-datatable-empty-message) {
    @apply dark:bg-transparent;
  }
</style>