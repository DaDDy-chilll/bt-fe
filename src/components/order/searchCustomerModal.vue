<script setup>
import customerList from "~/pages/order/customer.json";

//data
const customers = ref(customerList);

//props
const props = defineProps({
  displayModal: {
    type: Boolean,
    required: true,
  },
});

//emits
const emit = defineEmits(['update:displayModal', 'addNewCustomer']);


/*** Functions */
//add new product
const addNewCustomer = (customer) => {
  console.log('add new customer',customer);
  emit('addNewCustomer', customer);
  closeModal();
};

//close modal
const closeModal = () => {
    console.log('close modal');
  emit('update:displayModal', false);
};


</script>
<template>
    <div class="text-sm">
      <!--Modal-->
      <Dialog
        :visible="displayModal"
        header="Existing Customers"
        :style="{ width: '36rem' }"
        :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
        :closable="false"
      >
      <div class="absolute top-4 right-4">
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
          <i class="pi pi-times text-lg"></i>
        </button>
      </div>
      <!--Search-->
      <div class="flex items-center justify-between mb-4 border-b border-muted pb-4">
        <div class="flex items-center gap-2">
            <InputText placeholder="Search" class="w-full border-2 border-muted rounded-md px-2 py-1" />
            <button class="bg-primarylight flex items-center text-white px-4 py-1 rounded-md">
                <i class="pi pi-search"></i> <span class="ml-2">Search</span>
            </button>
        </div>
      </div>
          <!--table-->
      <div class="w-full">
        <div class="overflow-x-auto">
          <DataTable
            :value="customers"
            stripedRows
            class="w-full text-sm"
            scrollable
            resizableColumns
            columnResizeMode="expand"
            showGridlines
            paginator
            :rows="14"
            :rowsPerPageOptions="[10, 20, 50]"
            :totalRecords="customers.length"
            responsiveLayout="scroll"
            breakpoint="sm"
          >
           
            <!--Customer Name-->
            <Column field="name" header="Customer Name" class="w-[15%]">
              <template #body="slotProps">
                <div>
                  {{ slotProps.data.firstname }} {{ slotProps.data.lastname }}
                </div>
              </template>
            </Column>
              <!--Phone-->
              <Column field="phone" header="Phone Number" class="w-[15%]">
              <template #body="slotProps">
                <div>
                  {{ slotProps.data.phone }}
                </div>
              </template>
            </Column>
            <!--Action-->
            <Column field="action" class="w-[15%]" alignFrozen="right" frozen>
              <template #body="slotProps">
                <button  @click="addNewCustomer(slotProps.data)" class="w-6 h-6 text-primarylight hover:text-primary border-2 border-primarylight -rotate-45 flex items-center justify-center">
                  <i class="pi pi-plus -rotate-45"></i>
                </button>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
      </Dialog>
    </div>
  </template>