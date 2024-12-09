<script setup lang="ts">
import Warehouse from "./warehouse.json";
import Products from "./products.json";
import type { transferProduct } from "@/types/warehouse"

const warehouses = Warehouse;
const product: transferProduct[] = Products;
const fromWarehouse = ref("");
const toWarehouse = ref("");
const selectedProduct = ref();

/**
 * navigate to the check warehouse page
 * @author PSK
 * @created 2024-12-09
 * @updated ****-**-**
 */
const close = () => { navigateTo("/warehouse/check") };

/**
 * Transfer products function
 * @author PSK
 * @created 2024-12-09
 * @updated ****-**-**
 */
const transfer = () => { console.log("transfer") };
</script>
<template>
  <div class=" px-2 py-5 z-50 min-h-screen bg-transparent">
    <Card class="relative bg-accentwhite dark:bg-primarydark dark:shadow-accentwhite/20 shadow-sm ">
      <!-- Header -->
      <template #title>
        <div class="flex">
          <BackArrow class="cursor-pointer hover:opacity-80" />
          <h1 class="text-lg font-bold mb-2 text-accentblack dark:text-accentwhite">Warehouse Items Transfer</h1>
        </div>
        <div class="flex justify-between items-center">
          <div class="float-left flex justify-center items-center gap-5">
            <!-- Warehouse From select box -->
            <Select v-model="fromWarehouse" :options="warehouses" optionLabel="value" optionValue="id"
              class="w-full md:w-48 bg-primarylight text-xs text-accentwhite dark:bg-accent2 dark:text-accentblack"
              placeholder="Select Warehouse" />

            <i class="pi pi-arrow-right-arrow-left text-accentblack dark:text-accentwhite"
              style="font-size: 1.5rem"></i>

            <!-- Warehouse To select box -->
            <Select v-model="toWarehouse" :options="warehouses" optionLabel="value" optionValue="id"
              class="w-full md:w-48 bg-primarylight text-xs text-accentwhite dark:bg-accent2 dark:text-accentblack"
              placeholder="Select Warehouse" />
          </div>
        </div>
      </template>

      <!-- Products data table -->
      <template #content>
        <div>
          <DataTable :value="product" stripedRows class="w-full h-full text-sm bg-transparent dark:bg-transparent"
            scrollable scrollHeight="30rem" resizableColumns columnResizeMode="fit" showGridlines :rows="10"
            :rowsPerPageOptions="[10, 20, 50]" :totalRecords="product.length" v-model:selection="selectedProduct"
            dataKey="id" :showHeaders="false">
            <!-- Total Products count -->
            <template #header>
              <div class="">
                <span class="text-base font-bold text-accentblack dark:text-accentwhite">Total Products ({{
                  product.length }})</span>
              </div>
            </template>

            <!--Checkbox column -->
            <Column selectionMode="multiple" headerStyle="display: none"></Column>

            <!-- Product Image and ID && Name column -->
            <Column field="id_name" class="">
              <template #body="slotProps">
                <div class="flex justify-start gap-2">
                  <img :src="slotProps.data.image" alt="" class="w-10 h-10" crossorigin="anonymous" />
                  <div class="flex flex-col justify-start gap-2">
                    <span class="text-accentblack font-bold text-md dark:text-accentwhite">{{
                      slotProps.data.product_name
                    }}</span>
                    <span class="text-label dark:text-muted">#{{ slotProps.data.product_id }}</span>
                  </div>
                </div>
              </template>
            </Column>

            <!-- Product Type column -->
            <Column field="type" class="text-accentblack dark:text-accentwhite"></Column>

            <!-- Product Quantity column -->
            <Column field="quantity" class="text-accentblack dark:text-accentwhite"></Column>

            <!-- Product Category column -->
            <Column field="category" class="text-accentblack dark:text-accentwhite"></Column>

            <!-- Product Gem column -->
            <Column field="attributes" class="text-accentblack dark:text-accentwhite">
              <template #body="slotProps">
                <div class="flex gap-2">
                  <img v-if="slotProps.data.attributes.diamond" src="@/assets/images/Diamond.png" alt=""
                    class="w-4 h-4" />
                  <img v-if="slotProps.data.attributes.ruby" src="@/assets/images/Crystal.png" alt="" class="w-4 h-4" />
                </div>
              </template>
            </Column>

            <!-- Product Gold Type column -->
            <Column field="carat" class="text-accentblack dark:text-accentwhite"></Column>

            <!-- Product Price column -->
            <Column field="price" class="text-accentblack dark:text-accentwhite"></Column>
          </DataTable>
        </div>
      </template>

      <!-- Footer -->
      <template #footer>
        <div class="flex justify-end gap-5 mt-3">
          <!-- Close button -->
          <Button label="Discard" class="py-2 px-10 bg-white border-2 border-danger text-sm text-danger dark:bg-label"
            @click="close" />

          <!-- Transfer button -->
          <Button label="Transfer"
            class="py-2 px-10 bg-primarylight text-sm text-accentwhite dark:bg-accent2 dark:text-accentblack"
            @click="transfer" />
        </div>
      </template>
    </Card>
  </div>
</template>


<style scoped>
:deep(.p-checkbox) {
  @apply border-muted drop-shadow-sm shadow-sm rounded-md;
  border-width: 0.09rem;
}


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
