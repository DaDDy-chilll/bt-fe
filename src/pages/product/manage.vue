<script setup lang="ts">
import { ref } from "vue";
import productlist from "./productlist.json";
import productType from "./producttype.json";
import productCategory from "./productcategory.json";
import goldType from "./goldtype.json";
import staff from "./staff.json";
import gemType from "./gemtype.json";
import warehouse from "./warehouse.json";
import supplier from "./supplier.json";

const products = ref(productlist);
const op = ref();
const filterOp = ref();
const filterArray = ref<Filter[]>([]);
const filterItems = ref([
  {
    name: "Warehouse",
    type: "select",
    icon: "pi pi-align-justify",
    isSelected: true,
    filterItems: {
      value: "",
      list: warehouse,
    },
  },
  {
    name: "Code",
    type: "text",
    icon: "pi pi-align-justify",
    isSelected: true,
    filterItems: {
      value: "",
      list: [],
    },
  },
  {
    name: "Category",
    type: "select",
    icon: "pi pi-tag",
    isSelected: true,
    filterItems: {
      value: "",
      list: productCategory,
    },
  },
  {
    name: "Type",
    type: "select",
    icon: "pi pi-box",
    isSelected: true,
    filterItems: {
      value: "",
      list: productType,
    },
  },
  {
    name: "Gold Type",
    type: "select",
    icon: "pi pi-tag",
    isSelected: true,
    filterItems: {
      value: "",
      list: goldType,
    },
  },
  {
    name: "Gem Type",
    type: "select",
    icon: "pi pi-tag",
    isSelected: true,
    filterItems: {
      value: "",
      list: gemType,
    },
  },
  {
    name: "Staff",
    type: "select",
    icon: "pi pi-user",
    isSelected: true,
    filterItems: {
      value: "",
      list: staff,
    },
  },
  {
    name: "Supplier",
    type: "select",
    icon: "pi pi-user",
    isSelected: true,
    filterItems: {
      value: "",
      list: supplier,
    },
  },
]);

const textDialog = ref(false);
const selectDialog = ref(false);

/**
 * Toggle
 * @param event
 */
const toggle = (event) => {
  console.log(event);
  op.value.toggle(event);
};

/**
 * Filter
 * @param event
 */
const filter = (event) => {
  filterOp.value.toggle(event);
};

const filterDialog = (type) => {
  filterDialogClose();
  if (type === "text") {
    textDialog.value = true;
  } else if (type === "select") {
    selectDialog.value = true;
  }
};

/**
 * Filter Dialog Close
 */
const filterDialogClose = () => {
  selectDialog.value = false;
  textDialog.value = false;
};

/**
 * Filter Selected
 * @param event
 */
const filterSelected = (event) => {
  filterOp.value.toggle();
  filterArray.value.push(event);
  filterItems.value.find((item) => item.name === event.name).isSelected = true;
};
</script>

<template>
  <div class="justify-between items-start w-full">
    <div class="w-full bg-accentwhite drop-shadow-md rounded-lg">
      <slot-header
        title="Manage Products"
        :button="{
          label: 'New Product',
          link: '/product',
          icon: 'pi pi-plus',
        }"
      />
      <div class="flex justify-center items-center px-6">
        <div class="w-full float-left flex justify-start items-center">
          <filter-list
            :filterItems="filterItems"
            class="flex justify-start items-center"
          />
        </div>
      </div>
      <DataTable
        :value="products"
        stripedRows
        class="w-full px-6 my-5 text-sm"
        scrollable
        resizableColumns
        columnResizeMode="fit"
        showGridlines
        paginator
        :rows="14"
        :rowsPerPageOptions="[10, 20, 50]"
        :totalRecords="products.length"
      >
        <Column field="no" header="No" class="w-10"></Column>
        <Column field="code" header="Code" class="w-32" sortable>
          <template #body="slotProps">
            <span class="text-primarylight underline"
              >#{{ slotProps.data.code }}</span
            >
          </template>
        </Column>
        <Column field="name" header="Name" class="w-40"></Column>
        <Column field="type" header="Type" class="w-32 text-left"></Column>
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
        <Column field="staff" header="Staff" class="w-32 text-left"></Column>
        <Column
          field="date"
          header="Created Date"
          class="w-40 text-center"
        ></Column>
        <Column field="price" header="Price" class="w-40 text-center">
          <template #body="slotProps">
            <span>{{ slotProps.data.price.toLocaleString() }}</span>
          </template>
        </Column>
        <Column
          field="action"
          header="Action"
          class="w-40"
          alignFrozen="right"
          frozen
        >
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
