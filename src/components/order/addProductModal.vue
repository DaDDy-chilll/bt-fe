<script setup>
import productList from "~/pages/order/productList.json";
import productCategory from "~/pages/product/productcategory.json";
import goldType from "~/pages/product/goldtype.json";
import productType from "~/pages/product/producttype.json";

//data
const products = ref(productList);
const productCategories = ref(productCategory);
const goldTypes = ref(goldType);
const productTypes = ref(productType);

//props
const props = defineProps({
  displayModal: {
    type: Boolean,
    required: true,
  },
});

//emits
const emit = defineEmits(['update:displayModal', 'addNewProduct']);


/*** Functions */
//add new product
const addNewProduct = (product) => {
  console.log('add new product',product);
  emit('addNewProduct', product);
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
        header="All Products"
        :style="{ width: '50rem' }"
        :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
        :closable="false"
        class="dark:bg-primarydark dark:text-accentwhite"
      >
      <div class="absolute top-4 right-4">
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
          <i class="pi pi-times text-lg"></i>
        </button>
      </div>
      <!--Search-->
      <div class="flex items-center justify-between mb-4 border-b border-muted pb-4">
        <div class="flex items-center gap-2">
            <InputText placeholder="Search" class="w-full border-2 border-muted rounded-md px-2 py-1 dark:bg-primarydark dark:text-accentwhite" />
            <button class="bg-primarylight dark:bg-accent2 flex items-center text-white px-4 py-1 rounded-md">
                <i class="pi pi-search dark:text-accentblack"></i> <span class="ml-2 dark:text-accentblack">Search</span>
            </button>
        </div>
        <div class="flex items-center gap-2">
            <span>Categories</span>
           <select name="category" id="category" class="w-full border-2 border-muted rounded-md px-2 py-1 dark:bg-primarydark dark:text-accentwhite">
            <option value="">All</option>
            <option v-for="category in productCategories" :value="category.id">{{ category.value }}</option>
           </select>
        </div>
      </div>
          <!--table-->
      <div class="w-full">
        <div class="overflow-x-auto">
          <DataTable
            :value="products"
            stripedRows
            class="w-full text-sm"
            scrollable
            resizableColumns
            columnResizeMode="expand"
            showGridlines
            paginator
            :rows="14"
            :rowsPerPageOptions="[10, 20, 50]"
            :totalRecords="products.length"
            responsiveLayout="scroll"
            breakpoint="sm"
          >
            <!--Image-->
            <Column field="image" class="w-[10%] dark:bg-primarydark dark:text-accentwhite">
              <template #body="slotProps">
                <div>
                  <img
                    :src="slotProps.data.image"
                    alt="product image"
                    class="w-12 h-12 object-cover"
                  />
                </div>
              </template>
            </Column>
            <!--Product Name-->
            <Column field="name" class="w-[15%] dark:bg-primarydark dark:text-accentwhite">
              <template #body="slotProps">
                <div class="font-bold">Product Name</div>
                <div>
                  {{ slotProps.data.code }}
                </div>
              </template>
            </Column>
              <!--Category-->
              <Column field="category" header="Category" class="w-[15%] dark:bg-primarydark dark:text-accentwhite">
              <template #body="slotProps">
                <div>
                  {{ productCategories.find(category => category.id === slotProps.data.category_id).value }}
                </div>
              </template>
            </Column>
            <!--Type-->
            <Column field="type" header="Type" class="w-[15%] dark:bg-primarydark dark:text-accentwhite">
              <template #body="slotProps">
                <div>
                  {{ productTypes.find(type => type.id === slotProps.data.type_id).value }}
                </div>
              </template>
            </Column>
            <!--Size-->
            <Column field="size" header="Size" class="w-[15%] dark:bg-primarydark dark:text-accentwhite">
              <template #body="slotProps">
                <div>
                  {{ slotProps.data.size }}
                </div>
              </template>
            </Column>
            <!--Quantity-->
            <Column field="available_stock" header="Available" class="w-[15%] dark:bg-primarydark dark:text-accentwhite">
              <template #body="slotProps">
               <div>
                {{ slotProps.data.available_stock }}
               </div>
              </template>
            </Column>
              <!--Gold Type-->
              <Column field="goldType" header="Gold Type" class="w-[15%] dark:bg-primarydark dark:text-accentwhite">
              <template #body="slotProps">
               <div>
                {{ goldTypes.find(goldType => goldType.id === slotProps.data.gold_type_id).value }}
               </div>
              </template>
            </Column>
            <!--Action-->
            <Column field="action" class="w-[15%] dark:bg-primarydark dark:text-accentwhite" alignFrozen="right" frozen>
              <template #body="slotProps">
                <button  @click="addNewProduct(slotProps.data)" class="w-6 h-6 text-primarylight hover:text-primary dark:border-accent2 border-2 border-primarylight -rotate-45 flex items-center justify-center">
                  <i class="pi pi-plus -rotate-45 dark:text-accent2"></i>
                </button>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
      </Dialog>
    </div>
  </template>
   <style scoped>
   :deep(.p-paginator) {
     @apply dark:bg-primarydark;
     @apply dark:text-accentwhite;
   }
   
    :deep(.p-paginator-rpp-dropdown) {
       @apply dark:bg-transparent;
       @apply dark:text-accentwhite;
       @apply dark:border-1 dark:border-b-gray-400;
     }
   
     :deep(.p-select-label) {
       @apply dark:text-accentwhite;
     }
   
     :deep(.p-datatable-empty-message) {
       @apply dark:bg-transparent;
     }
 
 
     </style>