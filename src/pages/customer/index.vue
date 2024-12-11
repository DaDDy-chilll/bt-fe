<script setup lang="ts">
import { ref, computed } from "vue";
import type { Customer, Filter } from "@/types/customer";
import { useRouter } from "vue-router";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

import CustomerData from "./customers.json";
import StatusData from "./status.json";
import LevelData from "./level.json";

// V-Model Variables
const manageCustomer = ref<Customer>({
  firstname: "",
  lastname: "",
  nrc: "",
  email: "",
  social: "",
  status: "",
  level: 0,
});

// Fetch
const getDatas = CustomerData;
const getStatus = StatusData;
const getLevel = LevelData;

/**
 * @description Filtered Data
 * @author SPN
 * @created 
 * @updated ****-**-**
 */
const filteredData = computed(() => {
  let filtered = [...getDatas];

  // Filter by search
  if (manageCustomer.value.firstname) {
    const searchTerm = manageCustomer.value.firstname.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.firstname.toLowerCase().includes(searchTerm) ||
        item.lastname.toLowerCase().includes(searchTerm) ||
        item.email.toLowerCase().includes(searchTerm)
    );
  }

  return filtered;
});

const op = ref(null);
const filterArray = ref<Filter[]>([]);
const filterOp = ref(null);
const textDialog = ref(false);
const selectDialog = ref(false);
const selectedMemos = ref<{ name: string; date: string; text: string }[]>([]);
const showMemoDialog = ref(false); // Added this line to fix the show memo dialog
const filterItems = ref([
  {
    name: "First Name",
    type: "text",
    icon: "pi pi-align-justify",
    isSelected: true,
    filterItems: {
      value: "",
      list: [],
    },
  },
  {
    name: "Last Name",
    type: "text",
    icon: "pi pi-align-justify",
    isSelected: true,
    filterItems: {
      value: "",
      list: [],
    },
  },
  {
    name: "Email",
    type: "text",
    icon: "pi pi-align-justify",
    isSelected: true,
    filterItems: {
      value: "",
      list: [],
    },
  },
  {
    name: "NRC No.",
    type: "text",
    icon: "pi pi-align-justify",
    isSelected: true,
    filterItems: {
      value: "",
      list: [],
    },
  },
  {
    name: "Status",
    type: "select",
    icon: "pi pi-align-justify",
    isSelected: true,
    filterItems: {
      value: "",
      list: getStatus,
    },
  },
  {
    name: "Level",
    type: "select",
    icon: "pi pi-align-justify",
    isSelected: true,
    filterItems: {
      value: "",
      list: getLevel,
    },
  },
]);

/**
 * @description Toggle
 * @author SPN
 * @created 
 * @updated ****-**-**
 */
const toggle = (event: Event) => {
  if (op.value) {
    (op.value as any).toggle(event);
  }
};

/**
 * @description Show Memos
 * @param memos
 * @author SPN
 * @created 
 * @updated ****-**-**
 */
const showMemos = (memos: { name: string; date: string; text: string }[]) => {
  selectedMemos.value = memos;
  showMemoDialog.value = true;
};

/**
 * @description Filter
 * @param event
 * @author SPN
 * @created 
 * @updated ****-**-**
 */
const filter = (event: Event) => {
  if (filterOp.value) {
    (filterOp.value as any).toggle(event);
  }
};

/**
 * @description Filter Dialog
 * @param type
 * @author SPN
 * @created 
 * @updated ****-**-**
 */
const filterDialog = (type: string) => {
  filterDialogClose();
  if (type === "text") {
    textDialog.value = true;
  } else if (type === "select") {
    selectDialog.value = true;
  }
};

/**
 * @description Filter Dialog Close
 * @author SPN
 * @created 
 * @updated ****-**-**
 */
const filterDialogClose = () => {
  selectDialog.value = false;
  textDialog.value = false;
  filterArray.value = [];
};

/**
 * @description Filter Selected
 * @param event
 * @author SPN
 * @created 
 * @updated ****-**-**
 */
const filterSelected = (event: any) => {
  if (filterOp.value) {
    (filterOp.value as any).toggle();
  }
  filterArray.value.push(event);
  const item = filterItems.value.find((item) => item.name === event.name); // Corrected key to name
  if (item) {
    item.isSelected = true;
  }
};
</script>

<template>
  <div class="w-full bg-accentwhite drop-shadow-md rounded-lg dark:bg-primarydark pb-3">
    <slot-header title="Manage Customer" />
    <!-- Filter Bar -->
    <div class="flex justify-center items-center px-6 ">
      <div class="w-full float-left flex justify-start items-center ml-3">
        <filter-list :filterItems="filterItems" class="flex justify-start items-center" />
      </div>
    </div>
    <!-- Table -->
    <DataTable :value="filteredData" stripedRows class="w-full px-6 my-5 text-sm" scrollable resizableColumns
      columnResizeMode="fit" showGridlines paginator :rows="14" :rowsPerPageOptions="[10, 20, 50]"
      :totalRecords="filteredData.length">
      <Column field="id" header="ID" class="w-10 dark:bg-primarydark" alignFrozen="left" frozen></Column>
      <Column field="firstname" header="First Name" class="dark:bg-primarydark"></Column>
      <Column field="lastname" header="Last Name" class="dark:bg-primarydark"></Column>
      <Column field="email" header="Email" class="dark:bg-primarydark"></Column>
      <Column field="nrc" header="NRC No." class="dark:bg-primarydark"></Column>
      <Column field="status" header="Status" class="dark:bg-primarydark">
        <template #body="slotProps">
          <span :class="{
            'bg-green-300 dark:bg-green-500 px-2 py-1 rounded-md':
              slotProps.data.status === 'No issues',
            'bg-yellow-300 dark:bg-yellow-500 px-2 py-1 rounded-md':
              slotProps.data.status === 'Warning',
            'bg-red-300 dark:bg-red-500 px-2 py-1 rounded-md':
              slotProps.data.status === 'Do Not Sell',
          }">
            {{ slotProps.data.status }}
          </span>
        </template>
      </Column>
      <Column field="memo" header="Memo">
        <template #body="slotProps">
          <span :title="slotProps.data.memo">{{ slotProps.data.memo ? slotProps.data.memo.substring(0, 15) + '...' : '-' }}</span>
        </template>
      </Column>
      <Column field="level" header="Level">
        <template #body="slotProps">
          <img 
          :src="slotProps.data.level === 'gold' ? '/_nuxt/assets/icons/gold.svg' 
          : slotProps.data.level === 'silver' ? '/_nuxt/assets/icons/silver.svg' 
          : slotProps.data.level === 'bronze' ? '/_nuxt/assets/icons/bronze.svg' 
          : slotProps.data.level === 'platinum' ? '/_nuxt/assets/icons/platinum.svg' 
          : slotProps.data.level === 'diamond' ? '/_nuxt/assets/icons/diamond.svg' 
          : ''" alt="Level Icon" class="w-6 h-6" />
        </template>
      </Column>
      <Column field="action" header="Action" class="w-10 dark:bg-primarydark" alignFrozen="right" frozen>
        <template #body="slotProps">
          <Button icon="pi pi-ellipsis-v" class="text-primarylight dark:text-accent2" @click="toggle" />
          <Popover ref="op" class="!bg-primarylight dark:!bg-accent2 text-accentwhite">
            <div class="flex flex-col gap-4 justify-start items-start">
              <NuxtLink to="/customer/1" class="button">
                <Button label="View" icon="pi pi-eye" />
              </NuxtLink>
              <NuxtLink to="/customer/1/edit" class="button">
                <Button label="Edit" icon="pi pi-pencil" />
              </NuxtLink>
              <NuxtLink to="/customer/copy" class="button">
                <Button label="Copy" icon="pi pi-copy" />
              </NuxtLink>
            </div>
          </Popover>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>
:deep(.p-datatable-header) {
  @apply dark:bg-primarydark;
}

:deep(.p-datatable-thead > tr > th) {
  @apply dark:bg-primarydark;
  @apply dark:text-accentwhite;
}

:deep(.p-datatable-tbody > tr) {
  @apply dark:bg-primarydark;
  @apply dark:text-accentwhite;
}
</style>
