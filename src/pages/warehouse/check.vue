<script setup lang="ts">
useHead({ title: "Check Warehouse" });
import Warehouse from "./warehouse.json";
import Products from "./products.json";

const warehouses = Warehouse;
const products: transferProduct[] = Products;
const selectedWarehouse = ref("");


/**
 * navigate to the transfer page
 * @author PSK
 * @created 2024-12-01
 * @updated ****-**-**
 */
const transferProducts = () => {
  // toogleTransferModel();
  navigateTo("/warehouse/transfer");
};
</script>
<template>
  <div class="relative py-3 bg-transparent">
    <Card class="bg-accentwhite dark:bg-primarydark">
      <template #title>
        <div class="flex gap-5">
          <h1 class="text-2xl font-bold mb-5 text-accentblack dark:text-accentwhite">Warehouse</h1>
        </div>
        <div class="flex justify-between items-center">
          <div class="float-left">
            <Select
              v-model="selectedWarehouse"
              :options="warehouses"
              optionLabel="value"
              optionValue="id"
              class="w-full md:w-48 bg-primarylight text-xs text-accentwhite dark:bg-accent2 dark:text-accentblack"
              placeholder="Select Warehouse"
            />
          </div>
          <div class="float-right">
            <Button
              label="Transfer Products"
              class="p-3 bg-primarylight text-xs text-accentwhite dark:bg-accent2 dark:text-accentwhite"
              icon="pi pi-sort-alt"
              @click="transferProducts"
            />
          </div>
        </div>
      </template>
      <template #content>
        <div class="flex flex-col gap-5">
          <DataTable
            :value="products"
            stripedRows
            class="w-full text-sm bg-transparent dark:bg-transparent"
            scrollHeight="30rem"
            scrollable
            resizableColumns
            columnResizeMode="fit"
            showGridlines
            :rows="10"
            :rowsPerPageOptions="[10, 20, 50]"
            :totalRecords="products.length"
          >
            <template #header>
              <div class="dark:bg-primarydark">
                <span class="text-lg font-bold text-accentblack dark:text-accentwhite"
                  >Total Products ({{ products.length }})</span
                >
              </div>
            </template>
            <Column field="id_name" header="Product ID && Name" class="text-accentblack dark:text-accentwhite">
              <template #body="slotProps">
                <div class="flex justify-start gap-2">
                  <img
                    :src="slotProps.data.image"
                    alt=""
                    class="w-10 h-10"
                    crossorigin="anonymous"
                  />
                  <div class="flex flex-col justify-start gap-2">
                    <span class="text-accentblack font-bold text-md dark:text-accentwhite">{{
                      slotProps.data.product_name
                    }}</span>
                    <span class="text-label dark:text-muted"
                      >#{{ slotProps.data.product_id }}</span
                    >
                  </div>
                </div>
              </template>
            </Column>
            <Column field="type" header="Product Type" class="text-accentblack dark:text-accentwhite">
            </Column>
            <Column field="quantity" header="Quantity" class="text-accentblack dark:text-accentwhite">
            </Column>
            <Column field="category" header="Category" class="text-accentblack dark:text-accentwhite">
            </Column>
            <Column field="attributes" header="Gems" class="text-accentblack dark:text-accentwhite">
              <template #body="slotProps">
                <div class="flex gap-2">
                  <img
                    v-if="slotProps.data.attributes.diamond"
                    src="@/assets/images/Diamond.png"
                    alt=""
                    class="w-4 h-4"
                  />
                  <img
                    v-if="slotProps.data.attributes.ruby"
                    src="@/assets/images/Crystal.png"
                    alt=""
                    class="w-4 h-4"
                  />
                </div>
              </template>
            </Column>
            <Column field="carat" header="Gole Type" class="text-accentblack dark:text-accentwhite"> </Column>
            <Column field="price" header="Price" class="text-accentblack dark:text-accentwhite"> </Column>
          </DataTable>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
:deep(.p-select-dropdown > svg) {
  @apply text-accentwhite;
}
:deep(.p-select-label, .p-placeholder) {
  @apply text-accentwhite;
}

:deep(.p-datatable-header) {
  @apply dark:bg-primarydark;
}

:deep(.p-datatable-thead > tr > th) {
  @apply dark:bg-primarydark;
}

:deep(.p-datatable-tbody > tr) {
  @apply dark:bg-primarydark;
}
:deep(.p-datatable-tbody > tr.p-highlight) {
  @apply dark:bg-accent2;
}

</style>
