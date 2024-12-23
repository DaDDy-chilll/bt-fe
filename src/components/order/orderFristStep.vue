<script setup lang="ts">
import tracking from "@/components/order/tracking.vue";
import addProductModal from "@/components/order/addProductModal.vue";
import productType from "~/pages/product/producttype.json";
import { useOrderStore } from "@/stores/order";

//fetch data;
const productTypes = ref(productType);

//constants
const displayModal = ref(false);
const orderStore = useOrderStore();
const showSecondStep = ref(false);

const products = ref<any[]>([]);
/*** Functions ***/
/**
 * Generate invoice code
 * @author Aye Nadi
 * @returns invoice code
 */
const generateInvoiceCode = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}${month}${day}-XXXX`;
};
//refs for order details
const invoiceCode = ref(generateInvoiceCode());
const staffName = ref("John Doe"); // to fix later
const goldPrice = ref(60000000); // come from master data to fix later
const todayDate = ref(new Date().toISOString().slice(0, 10).replace(/-/g, "/"));

// Update refs to track selected values
const goldType = ref("24K");
const orderType = ref("In Store");
const orderPlatform = ref("facebook");
const goldMethod = ref("method1");

/**
 * Add new product to the order
 * @author Aye Nadi
 * @param product
 */
const addNewProduct = (product: any) => {
  console.log("add new product", product);
  products.value.push(product);
};

//delete product
const deleteProduct = (product: any) => {
  products.value = products.value.filter((p) => p.id !== product.id);
};

</script>
<template>
  <div class="">
    <tracking />
    <!--Upper Section-->
    <div class="w-full bg-accentwhite dark:text-accentwhite dark:bg-primarydark py-6 px-3 drop-shadow-md rounded-lg">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <span class="text-3xl font-bold text-accentblack dark:text-accentwhite" id="invoice-code"
            >#{{ invoiceCode }}</span
          >
          <div class="flex flex-col">
            <div class="text-sm text-gray-500">
              <span class="text-gray-500">Today Date -</span>
              <span class="text-gray-500" id="today-date">{{ todayDate }}</span>
            </div>
            <div class="text-sm text-gray-500">
              <span class="text-gray-500">Staff Name -</span>
              <span class="text-gray-500">{{ staffName }}</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex flex-col justify-end">
            <span class="text-sm text-gray-500">Today gold price</span>
            <span class="text-xl font-bold text-red-500">{{ goldPrice }}</span>
          </div>
          <div class="flex items-center gap-2">
            <select
              v-model="goldType"
              name="gold"
              id="gold"
              class="bg-primarylight dark:bg-accent2 dark:text-accentblack text-white px-2 py-1 rounded-md"
            >
              <option value="24K">24K</option>
              <option value="22K">22K</option>
              <option value="21K">18K</option>
            </select>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4 mt-6">
        <!--order type-->
        <div class="flex flex-col gap-2 border-r-2 border-gray-300">
          <h1 class="text-lg font-bold text-accentblack dark:text-accentwhite">Select Order Type</h1>
          <div class="flex items-center gap-4">
            <input
              type="radio"
              v-model="orderType"
              name="order-type"
              value="In Store"
              class="accent-primarylight dark:accent-accent2"
            />
            <label for="order-type">In Store</label>
            <input
              type="radio"
              v-model="orderType"
              name="order-type"
              value="Online"
              class="accent-primarylight dark:accent-accent2"
            />
            <label for="order-type">Online</label>
            <select
              v-model="orderPlatform"
              name="order-platform"
              id="order-platform"
              :disabled="orderType !== 'Online'"
              class="text-accentblack dark:text-gray-400 dark:bg-transparent px-2 py-1 rounded-md border-muted border-2"
            >
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">Tiktok</option>
            </select>
          </div>
        </div>
        <!--gold calculate method-->
        <div class="flex flex-col gap-2 border-r-2 border-gray-300">
          <h1 class="text-lg font-bold text-accentblack dark:text-accentwhite">
            Gold Calculate Method
          </h1>
          <select
            v-model="goldMethod"
            name="gold-calculate-method"
            id="gold-calculate-method"
            class="text-accentblack dark:text-gray-400 dark:bg-transparent px-2 py-1 w-1/2 rounded-md border-muted border-2"
          >
            <option value="method1">Method 1</option>
            <option value="method2">Method 2</option>
          </select>
        </div>
        <!--Actions-->
        <div class="flex flex-col items-center gap-2">
          <button
            @click="displayModal = true"
            class="bg-primarylight dark:bg-accent2 text-white px-2 py-1 rounded-md w-1/2"
          >
            <span class="text-white dark:text-accentblack">Add Product</span>
          </button>
          <button class="bg-primarylight dark:bg-accent2 text-white px-2 py-1 rounded-md w-1/2">
            <span class="text-white dark:text-accentblack">Factory Request</span>
          </button>
        </div>
      </div>
    </div>

    <!--Lower Section-->
    <div class="w-full mt-6 bg-accentwhite dark:bg-primarydark dark:text-accentwhite py-6 px-3 drop-shadow-md rounded-lg">
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
            <Column field="image" class="w-[10%] dark:bg-primarydark dark:text-accentwhite dark:border-b-1 dark:border-b-gray-400">
              <template #body="slotProps">
                <div>
                  <img
                    :src="slotProps.data.image"
                    alt="product image"
                    class="w-16 h-16 object-cover"
                  />
                </div>
              </template>
            </Column>
            <!--Product Name-->
            <Column field="name" class="w-[15%] dark:bg-primarydark dark:text-accentwhite dark:border-b-1 dark:border-b-gray-400">
              <template #body="slotProps">
                <div>
                  <div class="font-bold">Product Name</div>
                  {{ slotProps.data.code }}
                </div>
              </template>
            </Column>
            <!--Type-->
            <Column field="type" header="Type" class="w-[15%] dark:bg-primarydark dark:text-accentwhite dark:border-b-1 dark:border-b-gray-400">
              <template #body="slotProps">
                <div>
                  {{
                    productTypes.find(
                      (type) => type.id === slotProps.data.type_id
                    )?.value
                  }}
                </div>
              </template>
            </Column>
            <!--Size-->
            <Column field="size" header="Size" class="w-[15%] dark:bg-primarydark dark:text-accentwhite dark:border-b-1 dark:border-b-gray-400">
              <template #body="slotProps">
                <div>
                  {{ slotProps.data.size }}
                </div>
              </template>
            </Column>
            <!--Quantity-->
            <Column field="quantity" header="Quantity" class="w-[15%] dark:bg-primarydark dark:text-accentwhite dark:border-b-1 dark:border-b-gray-400">
              <template #body="slotProps">
                <input
                  @change="
                    slotProps.data.quantity = Number(
                      ($event.target as HTMLInputElement).value
                    )
                  "
                  type="number"
                  :value="slotProps.data.quantity"
                  :min="1"
                  :max="slotProps.data.available_stock"
                  class="w-16 pl-2 border-muted border-2 rounded-md dark:bg-transparent"
                />
              </template>
            </Column>
            <!--Estimate Price-->
            <Column field="estimate_price" header="Est. Price" class="w-[15%] dark:bg-primarydark dark:text-accentwhite dark:border-b-1 dark:border-b-gray-400">
              <template #body="slotProps">
                <input
                  @change="
                    slotProps.data.estimate_price = Number(
                      ($event.target as HTMLInputElement).value
                    )
                  "
                  type="number"
                  :value="slotProps.data.estimate_price"
                  class="w-full pl-2 border-muted border-2 rounded-md dark:bg-transparent"
                />
              </template>
            </Column>
            <!--Ayoutwat-->
            <Column field="ayoutwat" header="Ayoutwat" class="w-[15%] dark:bg-primarydark dark:text-accentwhite dark:border-b-1 dark:border-b-gray-400">
              <template #body="slotProps">
                <input
                  @change="
                    slotProps.data.ayoutwat = Number(
                      ($event.target as HTMLInputElement).value
                    )
                  "
                  type="number"
                  :value="slotProps.data.ayoutwat"
                  class="w-full pl-2 border-muted border-2 rounded-md dark:bg-transparent"
                />
              </template>
            </Column>
            <!--Latt Kha-->
            <Column field="latt_kha" header="Latt Kha" class="w-[15%] dark:bg-primarydark dark:text-accentwhite dark:border-b-1 dark:border-b-gray-400">
              <template #body="slotProps">
                <input
                  @change="
                    slotProps.data.latt_kha = Number(
                      ($event.target as HTMLInputElement).value
                    )
                  "
                  type="number"
                  :value="slotProps.data.latt_kha"
                  class="w-20 pl-2 border-muted border-2 rounded-md dark:bg-transparent"
                />
              </template>
            </Column>
            <!--Sub Total-->
            <Column field="sub_total" header="Sub Total" class="w-[15%] dark:bg-primarydark dark:text-accentwhite dark:border-b-1 dark:border-b-gray-400">
              <template #body="slotProps">
                <div>
                  {{
                    slotProps.data.quantity *
                    (slotProps.data.estimate_price +
                      slotProps.data.ayoutwat +
                      slotProps.data.latt_kha)
                  }}
                </div>
              </template>
            </Column>
            <!--Action-->
            <Column field="action" class="w-[15%] dark:bg-primarydark dark:text-accentwhite dark:border-b-1 dark:border-b-gray-400" alignFrozen="right" frozen>
              <template #body="slotProps">
                <button
                  @click="deleteProduct(slotProps.data)"
                  class="text-red-500 hover:text-red-700"
                >
                  <i class="pi pi-trash"></i>
                </button>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
  <addProductModal
    :displayModal="displayModal"
    @update:displayModal="displayModal = $event"
    @addNewProduct="addNewProduct"
  />
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
