<script setup lang="ts">
import { ref, computed } from "vue";
import SupplierData from "./supplierdata.json";
import States from "./state.json";
import Cities from "./city.json";
import type { ManageSupplier, Filter } from "@/types/supplier";
import { useRouter } from "vue-router";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import BackArrow from "@/assets/icons/back_icon.vue";

// V-Model Variables
const manageSupplier = ref<ManageSupplier>({
    search: "",
    dateFrom: "",
    dateTo: "",
    state: "",
    city: "",
});

// Fetch
const getDatas = SupplierData;
const getStates = States;
const getCities = Cities as {
    cities: Record<string, string[]>;
};

// Filtered Data
const filteredData = computed(() => {
    let filtered = [...getDatas];

    // Filter by search
    if (manageSupplier.value.search) {
        const searchTerm = manageSupplier.value.search.toLowerCase();
        filtered = filtered.filter(
            (item) =>
                item.name.toLowerCase().includes(searchTerm) ||
                item.code.toLowerCase().includes(searchTerm) ||
                item.contact_name.toLowerCase().includes(searchTerm) ||
                item.phone.some((phone) => phone.toLowerCase().includes(searchTerm)) ||
                item.email.toLowerCase().includes(searchTerm)
        );
    }

    // Filter by date range
    if (manageSupplier.value.dateFrom && manageSupplier.value.dateTo) {
        const fromDate = new Date(manageSupplier.value.dateFrom);
        const toDate = new Date(manageSupplier.value.dateTo);
        filtered = filtered.filter((item) => {
            const itemDate = new Date(item.contact_start_date);
            return itemDate >= fromDate && itemDate <= toDate;
        });
    }

    // Filter by state
    if (manageSupplier.value.state) {
        filtered = filtered.filter(
            (item) => item.state === manageSupplier.value.state
        );
    }

    // Filter by city
    if (manageSupplier.value.city) {
        filtered = filtered.filter(
            (item) => item.city === manageSupplier.value.city
        );
    }

    return filtered;
});

const op = ref(null);
const filterArray = ref<Filter[]>([]);
const filterOp = ref(null);
const textDialog = ref(false);
const selectDialog = ref(false);
const dateDialog = ref(false);
const showMemoDialog = ref(false);
const selectedMemos = ref<{ name: string; date: string; text: string }[]>([]);
const filterItems = ref([
    {
        name: "Search",
        type: "text",
        icon: "pi pi-align-justify",
        isSelected: true,
        filterItems: {
            value: "",
            list: [],
        },
    },
    {
        name: "Date From",
        type: "date",
        icon: "pi pi-calendar",
        isSelected: true,
        filterItems: {
            value: "",
            list: [],
        },
    },
    {
        name: "Date To",
        type: "date",
        icon: "pi pi-calendar",
        isSelected: true,
        filterItems: {
            value: "",
            list: [],
        },
    },
    {
        name: "State",
        type: "select",
        icon: "pi pi-map-marker",
        isSelected: true,
        filterItems: {
            value: "",
            list: getStates.states.map((state) => ({
                id: state,
                value: state
            })),
        },
    },
    {
        name: "City",
        type: "select",
        icon: "pi pi-map-marker",
        isSelected: true,
        filterItems: {
            value: "",
            list: getCities.cities[manageSupplier.value.state]?.map((city) => ({
                id: city,
                value: city,
            })) || [],
        },
    },
]);

/**
 * Toggle
 * @param event
 */
const toggle = (event: Event) => {
    if (op.value) {
        (op.value as any).toggle(event);
    }
};

const showMemos = (memos: { name: string; date: string; text: string }[]) => { // Correct type for memos
    selectedMemos.value = memos;
    showMemoDialog.value = true;
};

/**
 * Filter
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
 * Filter Dialog
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
    } else if (type === "date") {
        dateDialog.value = true;
    }
};

/**
 * Filter Dialog Close
 * @author SPN
 * @created 
 * @updated ****-**-**
 */
const filterDialogClose = () => {
    selectDialog.value = false;
    textDialog.value = false;
    dateDialog.value = false;
};

/**
 * Filter Selected
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
    <div class="w-full bg-accentwhite pb-3 drop-shadow-md rounded-lg dark:bg-primarydark">
        <slot-header title="Manage Supplier" :button="{
            label: 'New Supplier',
            link: '/supplier',
            icon: 'pi pi-plus',
        }" />
        <!-- Filter Bar -->
        <div class="flex justify-center items-center px-6 dark:bg-primarydark">
            <div class="w-full float-left flex justify-start items-center ml-3">
                <filter-list :filterItems="filterItems" class="flex justify-start items-center" />
            </div>
        </div>
        <!-- Table -->
        <DataTable :value="filteredData" stripedRows class="w-full px-6 my-5 text-sm" scrollable
            resizableColumns columnResizeMode="fit" showGridlines paginator :rows="14" :rowsPerPageOptions="[10, 20, 50]"
            :totalRecords="filteredData.length">
            <Column field="code" header="Code" class="dark:bg-primarydark">
                <template #body="slotProps">
                    <NuxtLink :to="`/supplier/details?code=${slotProps.data.code}`"
                        class="cursor-pointer text-accent1 dark:text-accent2">{{ slotProps.data.code }}
                    </NuxtLink>
                </template>
            </Column>
            <Column field="name" header="Name" class="dark:bg-primarydark"></Column>
            <Column field="branch" header="Branch" class="dark:bg-primarydark"></Column>
            <Column field="contact_name" header="Contact Name" class="dark:bg-primarydark"></Column>
            <Column field="contact_start_date" header="Contact Start Date" class="dark:bg-primarydark"></Column>
            <Column field="phone" header="Phone" class="dark:bg-primarydark">
                <template #body="slotProps">
                    <span>{{ slotProps.data.phone.join(' , ') }}</span>
                </template>
            </Column>
            <Column field="email" header="Email" class="dark:bg-primarydark"></Column>
            <Column field="state" header="State" class="dark:bg-primarydark"></Column>
            <Column field="city" header="City" class="dark:bg-primarydark"></Column>
            <Column field="address" header="Address" class="dark:bg-primarydark">
                <template #body="slotProps">
                    <span>
                        {{ slotProps.data.address.length > 15 ? slotProps.data.address.slice(0, 15) + '...' :
                            slotProps.data.address }}
                    </span>
                </template>
            </Column>
            <Column field="memo" header="Memo" class="dark:bg-primarydark">
                <template #body="slotProps">
                    <span class="cursor-pointer hover:text-accent1" @click="showMemos(slotProps.data.memo)">{{
                        slotProps.data.memo.length }} Memos</span>
                </template>
            </Column>
            <Column field="action" header="Action" class="w-10 dark:bg-primarydark" alignFrozen="right" frozen >
                <template #body="slotProps">
                    <Button icon="pi pi-ellipsis-v" class="text-primarylight dark:text-accent2" @click="toggle" />
                    <Popover ref="op" class="!bg-primarylight dark:!bg-accent2 text-accentwhite">
                        <div class="flex flex-col gap-4 justify-start items-start">
                            <NuxtLink to="/supplier/1" class="button">
                                <Button label="View" icon="pi pi-eye" />
                            </NuxtLink>
                            <NuxtLink to="/supplier/1/edit" class="button">
                                <Button label="Edit" icon="pi pi-pencil" />
                            </NuxtLink>
                            <NuxtLink to="/supplier/copy" class="button">
                                <Button label="Copy" icon="pi pi-copy" />
                            </NuxtLink>
                        </div>
                    </Popover>
                </template>
            </Column>
        </DataTable>
        <Dialog v-model:visible="showMemoDialog" header="Memos" :modal="true" :closable="true"
            :style="{ width: '500px' }" class="dark:bg-primarydark dark:text-accentwhite">
            <div v-for="(memo, index) in selectedMemos" :key="index" class="mb-3">
                <div class="flex justify-between items-center">
                    <div class="font-semibold">{{ memo.name }}</div>
                    <div class="text-sm text-gray-600">{{ memo.date }}</div>
                </div>
                <div class="text-sm break-words">{{ memo.text }}</div>
            </div>
        </Dialog>
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
