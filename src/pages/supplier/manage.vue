<script setup lang="ts">
import { ref, computed } from "vue";
import SupplierData from "./supplierdata.json";
import States from "./state.json";
import Cities from "./city.json";
import type { ManageSupplier } from "@/types/supplier";
import { Button } from "primevue";
import { useRouter } from "vue-router";

import {
    Card,
    InputText,
    InputIcon,
    IconField,
    Select,
    DatePicker,
    Dialog,
} from "primevue";
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
                item.phone.toLowerCase().includes(searchTerm) ||
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

/**
 * Toggle
 * @param event
 */
const toggle = (event: Event) => {
    if (op.value) {
        (op.value as any).toggle(event);
    }
};

const showMemoDialog = ref(false);
const selectedMemos = ref([]);

const showMemos = (memos) => {
    selectedMemos.value = memos;
    showMemoDialog.value = true;
};
</script>

<template>
    <div>
        <Card>
            <template #title>
                <div class="flex gap-5">
                    <BackArrow class="cursor-pointer hover:opacity-80" />
                    <h1 class="text-xl font-bold mb-5">Manage Supplier</h1>
                </div>
            </template>
            <template #content>
                <!-- Filter Bar -->
                <div class="flex justify-between items-center gap-2">
                    <div class="flex items-center gap-2">
                        <div>
                            <IconField class="border border-solid border-gray-400 rounded-md py-1.5">
                                <InputIcon class="pi pi-search" />
                                <InputText v-model="manageSupplier.search" placeholder="Search" class="pl-10" />
                            </IconField>
                        </div>
                        <div class="w-[8.5rem]">
                            <DatePicker v-model="manageSupplier.dateFrom" showIcon fluid :showOnFocus="true"
                                class="border border-solid border-gray-400 rounded-md py-1.5 w-full pl-1"
                                placeholder="From" />
                        </div>
                        <div class="w-[8.5rem]">
                            <DatePicker v-model="manageSupplier.dateTo" showIcon fluid :showOnFocus="true"
                                class="border border-solid border-gray-400 rounded-md py-1.5 w-full pl-1"
                                placeholder="To" />
                        </div>
                        <div class="w-[8.5rem]">
                            <Select v-model="manageSupplier.state" :options="['', ...getStates.states]"
                                placeholder="State" @change="manageSupplier.city = ''"
                                dropdownIcon="pi pi-chevron-down text-white text-sm"
                                class="w-full bg-accent1 text-white placeholder-white" :inputStyle="{ color: 'white' }"
                                :placeholderStyle="{ color: 'white' }" />
                        </div>
                        <div class="w-[8.5rem]">
                            <Select v-model="manageSupplier.city"
                                :options="getCities.cities[manageSupplier.state] || []" placeholder="City"
                                :disabled="!manageSupplier.state" dropdownIcon="pi pi-chevron-down text-white text-sm"
                                class="w-full bg-accent1 text-white placeholder-white" :inputStyle="{ color: 'white' }"
                                :placeholderStyle="{ color: 'white' }" />
                        </div>
                    </div>
                    <div>
                        <Button icon="pi pi-plus" label="Add Supplier" @click="() => $router.push('/supplier')"
                            class="bg-primarylight text-white font-normal px-4 py-2 rounded-md text-decoration-none hover:bg-accent1/90" />
                    </div>
                </div>

                <!-- Divider -->
                <div class="h-[1px] w-full bg-gray-300 my-5"></div>

                <!-- Table -->
                <DataTable :value="filteredData" stripedRows tableStyle="min-width: 50rem; font-size: small;">
                    <Column field="code" header="Code" class="text-accent1"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="branch" header="Branch"></Column>
                    <Column field="contact_name" header="Contact Name"></Column>
                    <Column field="contact_start_date" header="Contact Start Date"></Column>
                    <Column field="phone" header="Phone"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="state" header="State"></Column>
                    <Column field="city" header="City"></Column>
                    <Column field="address" header="Address"></Column>
                    <Column field="memo" header="Memo">
                        <template #body="slotProps">
                            <span class="cursor-pointer hover:text-accent1" @click="showMemos(slotProps.data.memo)">{{
                                slotProps.data.memo.length }} Memos</span>
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

<style scoped></style>
