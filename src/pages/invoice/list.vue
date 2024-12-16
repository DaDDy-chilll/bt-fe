<script setup lang="ts">
import { ref, computed } from "vue";
import InvoiceData from "./invoicedata.json";
import type { Invoice, ManageInvoice } from "@/types/invoice";

// V-Model
const manageInvoice = ref<ManageInvoice>({
    search: "",
    order_status: "",
    state: "",
    city: "",
});


// Fetch Data
const invoices = InvoiceData.invoices;

console.log(invoices);

// Filtered Data
const filteredData = computed(() => {
    let filtered = [...invoices];

    // Filter by search
    if (manageInvoice.value.search) {
        const searchTerm = manageInvoice.value.search.toLowerCase();
        filtered = filtered.filter(
            (item) =>
                item.invoice_no.toLowerCase().includes(searchTerm) ||
                item.order_no.toLowerCase().includes(searchTerm) ||
                item.customer_name.toLowerCase().includes(searchTerm) ||
                item.customer_phone.toLowerCase().includes(searchTerm) ||
                item.customer_address.toLowerCase().includes(searchTerm)
        );
    }

    // Filter by order status
    if (manageInvoice.value.order_status) {
        filtered = filtered.filter(
            (item) => item.order_status === manageInvoice.value.order_status
        );
    }

    return filtered;
});

const filterItems = ref([
    {
        name: "Invoice No",
        type: "text",
        icon: "pi pi-align-justify",
        isSelected: true,
        filterItems: {
            value: "",
            list: [],
        },
    },
    {
        name: "Order No",
        type: "text",
        icon: "pi pi-align-justify",
        isSelected: true,
        filterItems: {
            value: "",
            list: [],
        },
    },
    {
        name: "Customer Name",
        type: "text",
        icon: "pi pi-align-justify",
        isSelected: true,
        filterItems: {
            value: "",
            list: [],
        },
    },
    {
        name: "Customer Phone",
        type: "text",
        icon: "pi pi-align-justify",
        isSelected: true,
        filterItems: {
            value: "",
            list: [],
        },
    },
]);

const op = ref<any>(null);

/**
 * Toggle
 * @param event
 */
 const toggle = (event: Event) => {
    if (op.value) {
        (op.value as any).toggle(event);
    }
};


</script>

<template>
    <div class="w-full bg-accentwhite pb-3 drop-shadow-md rounded-lg dark:bg-primarydark">
        <slot-header title="Invoice List" :button="{
            label: 'New Invoice',
            link: '/invoice',
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
            <Column field="invoice_no" header="Invoice No" class="dark:bg-primarydark dark:text-accent2"></Column>
            <Column field="order_no" header="Order No" class="dark:bg-primarydark dark:text-accent2"></Column>
            <Column field="product" header="Product" class="dark:bg-primarydark"></Column>
            <Column field="order_status" header="Order Status" class="dark:bg-primarydark">
                <template #body="slotProps">
                    <span class="text-sm bg-green-500 text-white px-2 py-1 rounded-md">{{ slotProps.data.order_status }}</span>
                </template>
            </Column>
            <Column field="customer_name" header="Customer Name" class="dark:bg-primarydark"></Column>
            <Column field="customer_phone" header="Customer Phone" class="dark:bg-primarydark"></Column>
            <Column field="customer_address" header="Customer Address" class="dark:bg-primarydark">
                <template #body="slotProps">
                    <span class="text-sm break-words">{{ slotProps.data.customer_address.length > 15 ? slotProps.data.customer_address.substring(0, 15) + '...' : slotProps.data.customer_address }}</span>
                </template>
            </Column>
            <Column field="action" header="Action" class="w-10 dark:bg-primarydark" alignFrozen="right" frozen >
                <template #body="slotProps">
                    <Button icon="pi pi-ellipsis-v" class="text-primarylight dark:text-accent2" @click="toggle" />
                    <Popover ref="op" class="!bg-primarylight dark:!bg-accent2 text-accentwhite">
                        <div class="flex flex-col gap-4 justify-start items-start">
                            <NuxtLink to="/invoice/1" class="button">
                                <Button label="View" icon="pi pi-eye" />
                            </NuxtLink>
                            <NuxtLink to="/invoice/1/edit" class="button">
                                <Button label="Edit" icon="pi pi-pencil" />
                            </NuxtLink>
                            <NuxtLink to="/invoice/copy" class="button">
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

