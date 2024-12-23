<script setup lang="ts">
import { ref, onMounted } from "vue";
import staff from "./staff.json";
import warehouse from "./warehouse.json";
import supplier from "./supplier.json";
import productlist from "./productlist.json";
import { useCommonStore } from "@/stores/common";
import { useProductStore } from "@/stores/product";


const commonStore = useCommonStore();
const productStore = useProductStore();
const products = ref(productlist);
const textDialog = ref(false);
const selectDialog = ref(false);
const productCategories = ref<any>([]);
const productTypes = ref<any>([]);
const goldTypes = ref<any>([]);
const gemTypes = ref<any>([]);
const op = ref();
const filterOp = ref();
const filterItems = ref([
  {
    name: "Warehouse",
    type: "select",
    icon: "pi pi-align-justify",
    isSelected: true,
    filterItems: {
      key: "",
      list: warehouse,
    },
  },
  {
    name: "Code",
    type: "text",
    icon: "pi pi-align-justify",
    isSelected: true,
    filterItems: {
      key: "",
      list: [],
    },
  },
  {
    name: "Category",
    type: "select",
    icon: "pi pi-tag",
    isSelected: true,
    filterItems: {
      key: "",
      list: productCategories.value,
    },
  },
  {
    name: "Type",
    type: "select",
    icon: "pi pi-box",
    isSelected: true,
    filterItems: {
      key: "type",
      list: [],
    },
  },
  {
    name: "Gold Type",
    type: "select",
    icon: "pi pi-tag",
    isSelected: true,
    filterItems: {
      key: "",
      list: [],
    },
  },
  {
    name: "Gem Type",
    type: "select",
    icon: "pi pi-tag",
    isSelected: true,
    filterItems: {
      key: "",
      list: [],
    },
  },
  {
    name: "Staff",
    type: "select",
    icon: "pi pi-user",
    isSelected: true,
    filterItems: {
      key: "",
      list: staff,
    },
  },
  {
    name: "Supplier",
    type: "select",
    icon: "pi pi-user",
    isSelected: true,
    filterItems: {
      key: "",
      list: supplier,
    },
  },
]);



// Load Master Data
const loadMasterData = async () => {
  productCategories.value = await productStore.getProductCategories();
  productTypes.value = await productStore.getProductTypes();
  goldTypes.value = await productStore.getGoldTypes();
  gemTypes.value = await productStore.getGemTypes();
};

onMounted(() => {
  loadMasterData();
});

/**
 * Toggle
 * @param event
 */
const toggle = (event: any) => {
  console.log(event);
  op.value.toggle(event);
};

/**
 * Filter
 * @param event
 */
const filter = (event: any) => {
  filterOp.value.toggle(event);
};

const filterDialog = (type: any) => {
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
const filterSelected = (event: any) => {
  filterOp.value.toggle();
  filterItems.value.find((item) => item.name === event.name).isSelected = true;
};
</script>

<template>
  <div class="justify-between items-start w-full">
    <div class="w-full bg-accentwhite drop-shadow-md rounded-lg dark:bg-primarydark">
      <slot-header
        title="Manage Products"
        :button="{
          label: 'New Product',
          link: '/product',
          icon: 'pi pi-plus',
        }"
      />
      <div class="flex justify-center items-center px-6">
        <div class="w-full float-left flex justify-start items-center ml-3">
          <filter-list
            :filterItems="filterItems"
            class="flex justify-start  items-center"
          />
        </div>
      </div>
      <DataTable
        :value="products"
        stripedRows
        class="w-full px-6 my-5 text-sm dark:bg-primarydark"
        scrollable
        resizableColumns
        columnResizeMode="fit"
        showGridlines
        paginator
        :rows="14"
        :rowsPerPageOptions="[10, 20, 50]"
        :totalRecords="products.length"
      >
        <Column field="no" header="No" class="w-10 dark:bg-primarydark dark:text-accentwhite"></Column>
        <Column field="code" header="Code" class="w-32 dark:bg-primarydark dark:text-accentwhite" sortable>
          <template #body="slotProps">
            <span class="text-primarylight underline dark:text-accent2"
              >#{{ slotProps.data.code }}</span
            >
          </template>
        </Column>
        <Column field="name" header="Name" class="w-40 dark:bg-primarydark dark:text-accentwhite"></Column>
        <Column field="type" header="Type" class="w-32 text-left dark:bg-primarydark dark:text-accentwhite"></Column>
        <Column field="category" header="Category" class="w-32 dark:bg-primarydark dark:text-accentwhite"></Column>
        <Column
          field="goldType"
          header="Gold Type"
          class="w-32 text-center dark:bg-primarydark dark:text-accentwhite"
        ></Column>
        <Column field="gems" header="Gems" class="w-32 dark:bg-primarydark dark:text-accentwhite">
          <template #body="slotProps">
            <div class="flex flex-row items-center justify-center gap-2">
              <img :src="slotProps.data.gems[0].name" class="w-4 h-4" />
              <img :src="slotProps.data.gems[1].name" class="w-4 h-4" />
            </div>
          </template>
        </Column>
        <Column field="staff" header="Staff" class="w-32 text-left dark:bg-primarydark dark:text-accentwhite"></Column>
        <Column
          field="date"
          header="Created Date"
          class="w-40 text-center dark:bg-primarydark dark:text-accentwhite"
        ></Column>
        <Column field="price" header="Price" class="w-40 text-center dark:bg-primarydark dark:text-accentwhite">
          <template #body="slotProps">
            <span>{{ slotProps.data.price.toLocaleString() }}</span>
          </template>
        </Column>
        <Column
          field="action"
          header="Action"
          class="w-40 dark:bg-primarydark text-accentwhite"
          alignFrozen="right"
          frozen
        >
          <template #body="slotProps">
            <Button
              icon="pi pi-ellipsis-v"
              class="text-primarylight dark:text-accentwhite"
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
