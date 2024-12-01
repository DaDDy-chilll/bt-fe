<script setup lang="ts">
defineProps({
  close: {
    type: Function,
    required: true,
  },
  product: {
    type: Array,
    required: true,
  },
  warehouses: {
    type: Array,
    required: true,
  },
  transfer: {
    type: Function,
    required: true,
  },
});

const fromWarehouse = ref("");
const toWarehouse = ref("");
const selectedProduct = ref();

</script>
<template>
  <div
    class="absolute top-0 left-0 right-0 bottom-0 bg-label bg-opacity-50 p-2 z-50 min-h-screen"
  >
    <Card class="h-full relative">
      <template #title>
        <div class="flex">
          <BackArrow class="cursor-pointer hover:opacity-80" />
          <h1 class="text-lg font-bold mb-2">Warehouse Items Transfer</h1>
        </div>
        <div class="flex justify-between items-center">
          <div class="float-left flex justify-center items-center gap-5">
            <Select
              v-model="fromWarehouse"
              :options="warehouses"
              optionLabel="value"
              optionValue="id"
              placeholder="Select Warehouse"
              class="w-full md:w-48 bg-primarylight text-xs text-accentwhite"
            />
            <i
              class="pi pi-arrow-right-arrow-left"
              style="font-size: 1.5rem"
            ></i>
            <Select
              v-model="toWarehouse"
              :options="warehouses"
              optionLabel="value"
              optionValue="id"
              placeholder="Select Warehouse"
              class="w-full md:w-48 bg-primarylight text-xs text-accentwhite"
            />
          </div>
        </div>
      </template>
      <template #content>
        <div class="h-full">
          <DataTable
            :value="product"
            stripedRows
            class="w-full h-full text-sm"
            scrollable
            resizableColumns
            columnResizeMode="fit"
            showGridlines
            :paginator="product.length > 10"
            :rows="10"
            :rowsPerPageOptions="[10, 20, 50]"
            :totalRecords="product.length"
            v-model:selection="selectedProduct"
            dataKey="id"
            :showHeaders="false"
          >
            <template #header>
              <div class="">
                <span class="text-base font-bold"
                  >Total Products ({{ product.length }})</span
                >
              </div>
            </template>
            <Column
              selectionMode="multiple"
              headerStyle="display: none"
            ></Column>
            <Column field="id_name" class="">
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
            <Column field="type" class=""></Column>
            <Column field="quantity" class=""></Column>
            <Column field="category" class=""></Column>
            <Column field="attributes" class="">
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
            <Column field="carat" class=""> </Column>
            <Column field="price" class=""></Column>
          </DataTable>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-5 absolute right-5 bottom-5">
          <Button
            label="Discard"
            class="py-2 px-10 bg-white border-2 border-danger text-sm text-danger"
            @click="close"
          />
          <Button
            label="Transfer"
            class="py-2 px-10 bg-primarylight text-sm text-accentwhite"
            @click="transfer"
          />
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
</style>
