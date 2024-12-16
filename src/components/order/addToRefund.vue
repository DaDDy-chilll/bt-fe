<script setup>
//props
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

const selectedProduct = ref([]);
const emit = defineEmits(["update:currentStep"]);

/*** Functions ***/

/**
 * Add the selected products to the refund list
 * @param {Array} selectedProduct - The selected products
 * @param {Number} currentStep - The current step
 * @returns {void}
 * @author Aye Nadi
 */
const handleAddToRefund = () => {
  emit("update:currentStep", props.currentStep + 1);
  //add the selected products to the refund list
  console.log("selected products", selectedProduct);
};
</script>
<template>
  <div class="overflow-x-auto">
    <DataTable
      v-model:selection="selectedProduct"
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
      <Column selectionMode="multiple" headerStyle="width: 3rem" class="dark:bg-primarydark dark:text-accentwhite"></Column>
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
      <Column field="quantity" header="Quantity" class="w-[15%] dark:bg-primarydark dark:text-accentwhite"> </Column>
      <!--Ayoutwat-->
      <Column field="ayoutwat" header="Ayoutwat" class="w-[15%] dark:bg-primarydark dark:text-accentwhite"> </Column>
      <!--Latt Kha-->
      <Column field="latt_kha" header="Latt Kha" class="w-[15%] dark:bg-primarydark dark:text-accentwhite"> </Column>
      <!--Price-->
      <Column field="price" header="Price" class="w-[15%] dark:bg-primarydark dark:text-accentwhite"> </Column>
    </DataTable>
    <button @click="handleAddToRefund" class="bg-primarylight dark:bg-accent2 text-white px-6 py-1 rounded-md float-right mt-4">
      <span class="text-white dark:text-accentblack">Add to refund</span>
    </button>
  </div>
</template>
<style scoped>
::v-deep .p-checkbox {
  border: 2px solid #42acd5;
  @apply dark:border-accent2;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

::v-deep .p-checkbox-box {
  border-radius: 50%;
  border-color: #42acd5 !important;
  background-color: #42acd5 !important;
  @apply dark:bg-primarydark !important;
}

::v-deep .p-checkbox-checked {
  background-color: #42acd5 !important;
  border-color: #42acd5 !important;
  @apply accent-accent2 !important;
  @apply dark:border-accent2 !important;
  @apply dark:bg-accent2 !important;
  @apply dark:accent-accent2 !important;
}

::v-deep .p-checkbox-box.p-highlight {
  background-color: #42acd5 !important;
  border-color: #42acd5 !important;
  @apply dark:bg-accent2 !important;
  @apply dark:border-accent2 !important;
  @apply dark:accent-accent2 !important;
}

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
