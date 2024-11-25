<script setup lang="ts">
import { ref } from "vue";
import productlist from "./productlist.json";

const products = ref(productlist);

const op = ref();
const filterOp = ref();
const filterItems = ref([
  {
    name: "Name",
    type: "text",
    icon: "pi pi-align-justify",
  },
  {
    name: "Type",
    type: "select",
    icon: "pi pi-box",
  },
  {
    name: "Category",
    type: "select",
    icon: "pi pi-tag",
  },
  {
    name: "Staff",
    type: "select",
    icon: "pi pi-user",
  },
  {
    name: "Created Date",
    type: "date",
  },
  {
    name: "Price",
    type: "number",
    icon: "pi pi-money-bill",
  },
]);

const toggle = (event) => {
  console.log(event);
  op.value.toggle(event);
};

const filter = (event) => {
  filterOp.value.toggle(event);
};
</script>

<template>
  <div class="justify-between items-start w-full">
    <div class="w-full bg-accentwhite drop-shadow-md rounded-lg">
      <slot-header title="Manage Products" />
      <div class="flex justify-center items-center px-6">
        <div class="w-full float-left">
          <Button label="Add Filter" icon="pi pi-plus" @click="filter" />
        </div>
        <div class="float-right w-44">
          <a href="/product">
            <Button
              label="New Product"
              class="w-full bg-primarylight text-accentwhite px-3 py-2"
              icon="pi pi-plus"
            />
            <Popover ref="filterOp">
              <Filter :filterItems="filterItems" />
            </Popover>
          </a>
        </div>
      </div>
      <DataTable
        :value="products"
        size="large"
        stripedRows
        class="w-full px-6 my-5"
        scrollable
        resizableColumns
        columnResizeMode="fit"
        showGridlines
        paginator
        :rows="10"
        :rowsPerPageOptions="[10, 20, 50]"
        :totalRecords="products.length"

      >
        <Column field="no" header="No"  ></Column>
        <Column field="code" header="Code" sortable>
          <template #body="slotProps">
            <span class="text-primarylight underline"
              >#{{ slotProps.data.code }}</span
            >
          </template>
        </Column>
        <Column field="name" header="Name" class="w-40"></Column>
        <Column field="type" header="Type" class="w-32 text-center"></Column>
        <Column field="category" header="Category" class="w-32"></Column>
        <Column
          field="goldType"
          header="Gold Type"
          class="w-32 text-center"
        ></Column>
        <Column field="gems" header="Gems" class="w-32">
          <template #body="slotProps">
            <div class="flex flex-row items-center justify-center gap-2">
              <img :src="slotProps.data.gems[0].name" class="w-4 h-4" />
              <img :src="slotProps.data.gems[1].name" class="w-4 h-4" />
            </div>
          </template>
        </Column>
        <Column field="staff" header="Staff" class="w-32 text-center"></Column>
        <Column field="date" header="Created Date" class="w-40 text-center"></Column>
        <Column field="price" header="Price" class="w-40 text-center">
          <template #body="slotProps">
            <span>{{ slotProps.data.price.toLocaleString() }}</span>
          </template>
        </Column>
        <Column field="action" header="Action" class="w-40" alignFrozen="right" frozen>
          <template #body="slotProps">
            <Button
              icon="pi pi-ellipsis-v"
              class="text-primarylight"
              @click="toggle"
            />
            <Popover ref="op" class="!bg-primarylight text-accentwhite">
              <div class="flex flex-col gap-4 justify-start items-start">
                <Button label="View" icon="pi pi-eye" />
                <Button label="Edit" icon="pi pi-pencil" />
                <Button label="Copy" icon="pi pi-copy" />
              </div>
            </Popover>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped></style>
