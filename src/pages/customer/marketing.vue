<script setup lang="ts">
import customers from "./customers.json";
import level from "./level.json";
import { FilterMatchMode } from "@primevue/core/api";
useHead({ title: "Mail Marketing" });
const selectedCustomer = ref<any[]>([]);
const selectedAll = ref(false);
const checked = ref();
const filters = ref({
  firstname: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  level: { value: null, matchMode: FilterMatchMode.EQUALS },
});


const levelIcons = ref({
  "bronze": "/_nuxt/assets/icons/bronze.svg",
  "gold": "/_nuxt/assets/icons/gold.svg",
  "silver": "/_nuxt/assets/icons/silver.svg",
  "platinum": "/_nuxt/assets/icons/platinum.svg",
  "diamond": "/_nuxt/assets/icons/diamond.svg",
});

/**
 * Handle all select
 * @param event
 * @author PSK
 * @created 2024-12-01
 * @updated ****-**-**
 */
const handleAllSelect = (event: any) => {
  if (event.target.checked) checked.value = [...customers];
  else checked.value = [];
};

/**
 * Level options
 * @author PSK
 * @created 2024-12-02
 * @updated ****-**-**
 */
const levelOptions = ref([
  { value: "", label: "All" },
  ...level.map((l) => ({ value: l.value, label: l.value })),
]);

/**
 * Send mail
 * @author PSK
 * @created 2024-12-02
 * @updated ****-**-**
 */
const sendMail = () => {
  console.log("filters", filters);
};
</script>

<template>
  <div class="relative">
    <div class="flex gap-5">
      <h1 class="text-2xl font-semibold mb-5 text-accentblack dark:text-accentwhite">Mail Marketing</h1>
    </div>
    <div class="grid grid-cols-[2.3fr_3fr] gap-2 h-full">
      <div
        class="bg-accentwhite dark:bg-primarydark drop-shadow-md rounded-lg h-[calc(100vh-8rem)] overflow-y-auto"
      >
        <DataTable
          v-model:filters="filters"
          :value="customers"
          stripedRows
          class="w-full h-full text-sm p-2 dark:bg-primarydark bg-accentwhite relative"
          scrollable
          resizableColumns
          columnResizeMode="fit"
          :totalRecords="customers.length"
          v-model:selection="checked"
          dataKey="id"
          :showHeaders="false"
        >
          <template #header class="p-0">
            <div class="flex justify-between items-center ">
              <div class="flex items-center justify-start gap-2 min-w-20">
                <Checkbox
                  binary
                  name="selectAll"
                  label="Select All"
                  @change="handleAllSelect"
                  :checked="selectedAll"
                  id="selectAll"
                />
                <span class="text-xs text-label dark:text-accentwhite " htmlFor="selectAll"
                  >Select All</span
                >
              </div>

              <div class="flex gap-2">
                <IconField
                  class="border border-muted rounded-md px-4 flex items-center overflow-hidden"
                >
                  <InputIcon>
                    <i class="pi pi-search text-accentblack dark:text-accent2" />
                  </InputIcon>
                  <InputText
                    v-model="filters.firstname.value"
                    placeholder="Keyword Search"
                    class="ml-6 bg-transparent dark:text-accentwhite text-accentblack"
                  />
                </IconField>

                <Select
                  v-model="filters.level.value"
                  :options="levelOptions"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Level"
                  class="bg-primarylight text-xs text-accentwhite dark:bg-accent2 "
                />
              </div>
            </div>
          </template>

          <Column selectionMode="multiple" headerStyle="display: none"></Column>
          <Column field="firstname" class="text-accentblack dark:text-accentwhite">
            <template #body="slotProps">
              {{ slotProps.data.firstname }} {{ slotProps.data.lastname }}
            </template></Column
          >
          <Column field="email" class="text-accentblack dark:text-accentwhite">
            <template #body="slotProps">
              {{ slotProps.data.email }}
            </template>
          </Column>
          <Column field="level" class="text-accentblack dark:text-accentwhite">
            <template #body="slotProps">
              <img
                :src="levelIcons[slotProps.data.level]"
                alt="Level"
                class="w-6 h-6"
              />
            </template>
          </Column>
        </DataTable>
      </div>

      <div
        class="bg-accentwhite dark:bg-primarydark drop-shadow-md rounded-lg h-full flex flex-col relative pb-1"
      >
        <div class="flex flex-col gap-y-4 p-4">
          <InputText
            name="cc"
            type="text"
            placeholder="Cc"
            class="w-full rounded-none border-b border-label text-sm p-1 placeholder:text-accentblack dark:placeholder:text-accentwhite font-semibold dark:bg-primarydark dark:text-accentwhite"
          />
          <InputText
            name="subject"
            type="text"
            placeholder="Subject"
            class="w-full rounded-none border-b border-label text-sm p-1 placeholder:text-accentblack dark:placeholder:text-accentwhite dark:bg-primarydark dark:text-accentwhite"
          />
        </div>
        <QuillEditor />
        <Button
          label="Send"
          class="bg-primarylight text-accentwhite cursor-pointer absolute bottom-1 left-1 py-2 px-5 text-sm dark:bg-accent2"
          @click="sendMail"
        />
        <Button
          icon="pi pi-trash"
          class="text-danger cursor-pointer absolute bottom-1.5 right-1 py-2 px-5 text-sm"
        />
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
