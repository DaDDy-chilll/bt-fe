<script setup lang="ts">
import customers from "./customers.json";
import level from "./level.json";
import { FilterMatchMode } from "@primevue/core/api";
useHead({ title: "Mail Marketing" });
const selectedCustomer = ref<any[]>([]); // This will track the selected customers
const selectedAll = ref(false);
const checked = ref();
const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  level: { value: null, matchMode: FilterMatchMode.EQUALS },
});


/**
 * Handle all select
 * @param event
 * @author PSK
 * @created 2024-12-01
 * @updated ****-**-**
 */
const handleAllSelect = (event: any) => {
  if (event.target.checked) {
    checked.value = [...customers];
  } else {
    checked.value = [];
  }
};
</script>
<template>
  <div class="relative">
    <div class="flex gap-5">
      <h1 class="text-2xl font-semibold mb-5">Mail Marketing</h1>
    </div>
    <div class="grid grid-cols-[2fr_3fr] gap-2">
      <div class="bg-accentwhite drop-shadow-md rounded-lg">
        <DataTable
          v-model:filters="filters"
          :value="customers"
          stripedRows
          class="w-full h-full text-sm p-2"
          scrollable
          scrollHeight="calc(100vh)"
          resizableColumns
          columnResizeMode="fit"
          :totalRecords="customers.length"
          v-model:selection="checked"
          dataKey="id"
          :showHeaders="false"
          :globalFilterFields="['name', 'level']"
        >
          <template #header class="p-0">
            <div class="flex justify-between items-center">
              <div class="flex items-center justify-start gap-2 min-w-20">
                <Checkbox
                  binary
                  name="selectAll"
                  label="Select All"
                  @change="handleAllSelect"
                  :checked="selectedAll"
                />
                <span class="text-xs text-label">Select All</span>
              </div>

              <div class="flex gap-2">
                <IconField
                  class="border border-muted rounded-md px-4 flex items-center overflow-hidden"
                >
                  <InputIcon>
                    <i class="pi pi-search" />
                  </InputIcon>
                  <InputText
                    v-model="filters.name.value"
                    placeholder="Keyword Search"
                    class="ml-6"
                  />
                </IconField>

                <Select
                  v-model="filters.level.value"
                  :options="level"
                  optionLabel="value"
                  optionValue="value"
                  placeholder="Level"
                  class="bg-primarylight text-xs text-accentwhite"
                />
              </div>
            </div>
          </template>

          <Column selectionMode="multiple" headerStyle="display: none"></Column>
          <Column field="name" class=""></Column>
          <Column field="email" class=""></Column>
          <Column
            field="level"
            class=""
            filterField="level"
            :filterMatchModeOptions="[FilterMatchMode.EQUALS]"
          ></Column>
        </DataTable>
      </div>

      <div class="bg-accentwhite drop-shadow-md rounded-lg">
        <h1>Customer List</h1>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-checkbox) {
  @apply border-muted drop-shadow-sm shadow-sm rounded-md;
  border-width: 0.09rem;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  @apply p-2;
  /* Reduce header cell padding */
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
  @apply p-2;
  /* Reduce body cell padding */
}

:deep(.p-datatable .p-datatable-header) {
  @apply p-2;
  /* Reduce header cell padding */
}

:deep(.p-select-dropdown > svg) {
  @apply text-accentwhite;
}

:deep(.p-select-label, .p-placeholder) {
  @apply text-accentwhite;
}
</style>
