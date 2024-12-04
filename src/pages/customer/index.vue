<script setup lang="ts">
import { ref, computed } from "vue";
import type { Customer , Filter } from "@/types/customer"; 
import { useRouter } from "vue-router";
import DataTable from 'primevue/datatable'; 
import Column from 'primevue/column'; 

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

// Filtered Data
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
    }
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

const showMemos = (memos: { name: string; date: string; text: string }[]) => { 
    selectedMemos.value = memos;
    showMemoDialog.value = true;
};

/**
 * Filter
 * @param event
 */
const filter = (event: Event) => {
    if (filterOp.value) {
        (filterOp.value as any).toggle(event);
    }
};

const filterDialog = (type: string) => {
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
    filterArray.value = [];
};

/**
 * Filter Selected
 * @param event
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
    <div>
        <Card>
            <template #header>
                <slot-header title="Manage Customer" class="text-2xl font-bold" />
            </template>
            <template #content>
                <!-- Filter Bar -->
                <div class="flex justify-center items-center px-6">
                    <div class="w-full float-left flex justify-start items-center ml-3">
                        <filter-list :filterItems="filterItems" class="flex justify-start  items-center" />
                    </div>
                </div>

                <!-- Divider -->
                <div class="h-[1px] w-full bg-gray-300 my-5"></div>

                <!-- Table -->
                <DataTable :value="filteredData" stripedRows class="w-full px-6 my-5 text-sm" scrollable
                    resizableColumns columnResizeMode="fit" showGridlines paginator :rows="14"
                    :rowsPerPageOptions="[10, 20, 50]" :totalRecords="filteredData.length">
                    <Column field="id" header="ID" class="w-10" alignFrozen="left" frozen></Column>
                    <Column field="firstname" header="First Name"></Column>
                    <Column field="lastname" header="Last Name"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="nrc" header="NRC No."></Column>
                    <Column field="status" header="Status">
                    <template #body="slotProps">
                        <span :class="{
                            'bg-green-300 px-2 py-1 rounded-md': slotProps.data.status === 'No issues',
                            'bg-yellow-300 px-2 py-1 rounded-md': slotProps.data.status === 'Warning',
                            'bg-red-300 px-2 py-1 rounded-md': slotProps.data.status === 'Do Not Sell'
                        }">
                            {{ slotProps.data.status }}
                        </span>
                    </template>
                    </Column>
                    <Column field="memo" header="Memo">
                        <template #body="slotProps">
                            <span class="cursor-pointer hover:text-accent1" @click="showMemos(slotProps.data.memo)">{{
                                slotProps.data.memo.length }} Memos</span>
                        </template>
                    </Column>
                    <Column field="level" header="Level">
                        <template #body="slotProps">
                            <img :src="slotProps.data.level.icon" alt="Level" class="w-6 h-6" />
                        </template>
                    </Column>
                    <Column field="action" header="Action" class="w-10" alignFrozen="right" frozen>
                        <template #body="slotProps">
                            <Button icon="pi pi-ellipsis-v" class="text-primarylight" @click="toggle" />
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
            </template>
        </Card>
        <Dialog v-model:visible="showMemoDialog" header="Memos" :modal="true" :closable="true"
            :style="{ width: '500px' }">
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

</style>
