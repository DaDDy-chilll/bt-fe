<script setup lang="ts">
useHead({ title: "Check Warehouse" });
import Warehouse from "./warehouse.json";
import Products from "./products.json";

const warehouses = Warehouse;
const products: transferProduct[] = Products;
const selectedWarehouse = ref("");
const transferModel = ref<boolean>(false);

const toogleTransferModel = () => {
  transferModel.value = !transferModel.value;
};

const transferProducts = () => {
  toogleTransferModel();
};
</script>
<template>
  <div class="relative">
    <Card>
      <template #title>
        <div class="flex gap-5">
          <h1 class="text-2xl font-bold mb-5">Warehouse</h1>
        </div>
        <div class="flex justify-between items-center">
          <div class="float-left">
            <Select
              v-model="selectedWarehouse"
              :options="warehouses"
              optionLabel="value"
              optionValue="id"
              placeholder="Select Warehouse"
              class="w-full md:w-48 bg-primarylight text-xs text-accentwhite"
            />
          </div>
          <div class="float-right">
            <Button
              label="Transfer Products"
              class="p-3 bg-primarylight text-xs text-accentwhite"
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
            class="w-full text-sm"
            scrollable
            resizableColumns
            columnResizeMode="fit"
            showGridlines
            paginator
            :rows="10"
            :rowsPerPageOptions="[10, 20, 50]"
            :totalRecords="products.length"
          >
            <template #header>
              <div class="">
                <span class="text-lg font-bold"
                  >Total Products ({{ products.length }})</span
                >
              </div>
            </template>
            <Column field="id_name" header="Product ID && Name" class="">
              <template #body="slotProps">
                <div class="flex justify-start gap-2">
                  <img
                    :src="slotProps.data.image"
                    alt=""
                    class="w-10 h-10"
                    crossorigin="anonymous"
                  />
                  <div class="flex flex-col justify-start gap-2">
                    <span class="text-accentblack font-bold text-md">{{
                      slotProps.data.product_name
                    }}</span>
                    <span class="text-label"
                      >#{{ slotProps.data.product_id }}</span
                    >
                  </div>
                </div>
              </template>
            </Column>
            <Column field="type" header="Product Type" class=""></Column>
            <Column field="quantity" header="Quantity" class=""></Column>
            <Column field="category" header="Category" class=""></Column>
            <Column field="attributes" header="Gems" class="">
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
            <Column field="carat" header="Gole Type" class=""> </Column>
            <Column field="price" header="Price" class=""></Column>
          </DataTable>
        </div>
      </template>
    </Card>
    <WarehouseTransferModel
      v-if="transferModel"
      :close="toogleTransferModel"
      :product="products"
      :warehouses="warehouses"
      :transfer="transferProducts"
    />
  </div>
</template>

<style scoped>
:deep(.p-select-dropdown > svg) {
  @apply text-accentwhite;
}
:deep(.p-select-label, .p-placeholder) {
  @apply text-accentwhite;
}
</style>
