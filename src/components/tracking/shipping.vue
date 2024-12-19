<script setup lang="ts">
import { ref, nextTick } from "vue";
import type { Tracking } from '@/types/tracking';
import ShippingData from '~/pages/tracking/shippingdata.json';

// Fetching data from json file
const shippingData = ShippingData;

// V-Model Variables
const datas = ref<Tracking[]>(shippingData as unknown as Tracking[]);

// Tracks expanded rows
const expandedRows = ref<Tracking[]>([]);

// Function to toggle expanded rows
const onRowToggle = (data: Tracking) => {
  if(expandedRows.value.includes(data)) {
    expandedRows.value = expandedRows.value.filter(row => row !== data);
  } else {
    expandedRows.value.push(data);
  }
};

</script>

<template>
    <div class="w-full bg-accentwhite pb-3 px-5 drop-shadow-md rounded-lg dark:bg-primarydark">  
        <h3 class="text-lg text-left dark:text-accentwhite ml-4 mt-5 mb-5">Shipping</h3>
        <!-- Parent Table -->
        <DataTable 
        :value="datas"
        stripedRows
        class="w-full text-sm"
        scrollable
        resizableColumns
        columnResizeMode="expand"
        showGridlines
        paginator
        :rows="5"
        :rowsPerPageOptions="[5, 10, 14]"
        :totalRecords="datas.length"
        responsiveLayout="scroll"
        breakpoint="sm"
        tableStyle="min-width: 80rem; border-spacing: 0;" 
        :expandedRows="expandedRows" 
        @rowToggle="onRowToggle"
        >
        

        <!-- Parent Table Columns -->
        <Column field="customerName" header="Customer Name" />
        <Column field="totalOrder" header="Total Order" />
        <Column field="shippingMethod" header="Shipping Method" />
        <Column field="country" header="Country" />
        <Column field="shippingDate" header="Shipping Date" />
        <Column field="estimatedDuration" header="Estimated Duration" />
        <Column field="shippingFees" header="Shipping Fees" />
        <Column field="receiverName" header="Receiver Name" />
        <Column field="shippingCompany" header="Shipping Company" />

        <!-- Expander Column -->
        <Column expander style="width: 3rem">
            <template #body="slotProps">
                <i class="pi pi-chevron-circle-down text-lg text-accent1 dark:text-accent2 cursor-pointer" @click="onRowToggle(slotProps.data)" :class="{'pi pi-chevron-circle-up': expandedRows.includes(slotProps.data)}" ></i>
            </template>
        </Column>

        <!-- Expanded Row Template -->
        <template #expansion="slotProps">
            <!-- Nested Child Table -->
            <DataTable :value="slotProps.data.products" responsiveLayout="scroll" style="border-spacing: 0; margin-top: -15px;">
            <Column field="id" header="" p-header-class="dark:bg-accent2">
                <template #body="slotProps">
                    <div class="flex justify-start items-center">
                    <img :src="slotProps.data.image" alt="slotProps.data.name" class="w-10 h-10 rounded-md mr-2" />
                    <div class="flex flex-col">
                        <p class="text-sm font-bold">{{ slotProps.data.name }}</p>
                        <p class="text-sm text-gray-500">{{ slotProps.data.id }}</p>
                    </div>
                </div>
                
                </template>
            </Column>
            <Column field="type" header="Type"/>
            <Column field="productCategory" header="Product Category" />
            <Column field="gems" header="Gems" />
            <Column field="goldType" header="Gold Type" />
            <Column field="goldPrice" header="Gold Price" />
            <Column field="ayawt" header="Ayawt" />
            <Column field="latkha" header="Latkha" />
            <Column field="totalPrice" header="Total Price" />
            </DataTable>
        </template>
        </DataTable>    
    </div>
</template>

<style scoped>

:deep(.p-datatable-thead > tr > th) {
  @apply bg-accent1;
  @apply dark:bg-accent2;
  @apply dark:text-accentwhite;
}

:deep(.p-datatable-tbody > tr) {
  @apply dark:bg-primarydark;
  @apply dark:text-accentwhite;
}

:deep(.p-datatable-thead > tr > th:first-child) {
  @apply rounded-tl-lg;
}

:deep(.p-datatable-thead > tr > th:last-child) {
  @apply rounded-tr-lg;
}

</style>
