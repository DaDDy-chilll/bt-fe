<script setup lang="ts">
import tracking from "@/components/order/tracking.vue";
import addProductModal from "@/components/order/addProductModal.vue";

//fetch product list
const products = ref([]);


const quantity = ref(1);

const displayModal = ref(false);

const subTotal = (product: any, quantity: number) => {
  return (
    product.ayoutwat + product.latt_kha + product.estimate_price
  ) * quantity;
};

</script>
<template>
  <div class="h-screen">
    <tracking />
    <!--Upper Section-->
    <div class="w-full bg-accentwhite py-6 px-3 rounded-lg">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-3xl font-bold text-accentblack"
            >#20240912-XXXX</span
          >
          <div class="flex flex-col">
            <div class="text-sm text-gray-500">
              <span class="text-gray-500">Today Date -</span>
              <span class="text-gray-500">12/07/2024</span>
            </div>
            <div class="text-sm text-gray-500">
              <span class="text-gray-500">Staff Name -</span>
              <span class="text-gray-500">John Doe</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <div class="flex flex-col justify-end">
            <span class="text-sm text-gray-500">Today gold price</span>
            <span class="text-xl font-bold text-red-500">60,000,000</span>
          </div>
          <div class="flex items-center gap-2">
            <select
              name="gold"
              id="gold"
              class="bg-primarylight text-white px-2 py-1 rounded-md"
            >
              <option value="24K">24K</option>
              <option value="22K">22K</option>
              <option value="21K">18K</option>
            </select>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4 mt-4">
        <!--order type-->
        <div class="flex flex-col gap-2 border-r-2 border-gray-300">
          <h1 class="text-lg font-bold text-accentblack">Select Order Type</h1>
          <div class="flex items-center gap-4">
            <input
              type="radio"
              name="order-status"
              id="order-status"
              class="accent-primarylight"
            />
            <label for="order-status">In Store</label>
            <input
              type="radio"
              name="order-status"
              id="order-status"
              class="accent-primarylight"
            />
            <label for="order-status">Order</label>
            <select
              name="order-status"
              id="order-status"
              class="text-accentblack px-2 py-1 rounded-md border-muted border-2"
            >
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="tiktok">Tiktok</option>
            </select>
          </div>
        </div>
        <!--gold calculate method-->
        <div class="flex flex-col gap-2 border-r-2 border-gray-300">
          <h1 class="text-lg font-bold text-accentblack">
            Gold Calculate Method
          </h1>
          <select
            name="gold-calculate-method"
            id="gold-calculate-method"
            class="text-accentblack px-2 py-1 w-1/2 rounded-md border-muted border-2"
          >
            <option value="method1">Method 1</option>
            <option value="method2">Method 2</option>
          </select>
        </div>
        <!--Actions-->
        <div
          class="flex flex-col items-center gap-2 border-r-2 border-gray-300"
        >
          <button @click="displayModal = true" class="bg-primarylight text-white px-2 py-1 rounded-md w-1/2">
            <span class="text-white">Add Product</span>
          </button>
          <button class="bg-primarylight text-white px-2 py-1 rounded-md w-1/2">
            <span class="text-white">Factory Request</span>
          </button>
        </div>
      </div>
    </div>

    <!--Lower Section-->
    <div class="w-full mt-6 bg-accentwhite py-6 px-3 rounded-lg">
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
            <Column field="image" class="w-[10%]">
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
            <Column field="name" class="w-[15%]">
              <template #body="slotProps">
                <div>
                  {{ slotProps.data.code }}
                </div>
              </template>
            </Column>
            <!--Type-->
            <Column field="type" header="Type" class="w-[15%]">
              <template #body="slotProps">
                <div>
                  {{ slotProps.data.type }}
                </div>
              </template>
            </Column>
            <!--Size-->
            <Column field="size" header="Size" class="w-[15%]">
              <template #body="slotProps">
                <div>
                  {{ slotProps.data.size }}
                </div>
              </template>
            </Column>
            <!--Quantity-->
            <Column field="quantity" header="Quantity" class="w-[15%]">
              <template #body="slotProps">
                <input
                  type="number"
                  value="1"
                  class="w-10 pl-2 border-muted border-2 rounded-md"
                />
              </template>
            </Column>
            <!--Estimate Price-->
            <Column field="estimate_price" header="Est. Price" class="w-[15%]">
              <template #body="slotProps">
                <input
                  type="number"
                  :value="slotProps.data.estimate_price"
                  class="w-full pl-2 border-muted border-2 rounded-md"
                />
              </template>
            </Column>
            <!--Ayoutwat-->
            <Column field="ayoutwat" header="Ayoutwat" class="w-[15%]">
              <template #body="slotProps">
                <input
                  type="number"
                  :value="slotProps.data.ayoutwat"
                  class="w-full pl-2 border-muted border-2 rounded-md"
                />
              </template>
            </Column>
            <!--Latt Kha-->
            <Column field="latt_kha" header="Latt Kha" class="w-[15%]">
              <template #body="slotProps">
                <input
                  type="number"
                  :value="slotProps.data.latt_kha"
                  class="w-20 pl-2 border-muted border-2 rounded-md"
                />
              </template>
            </Column>
            <!--Sub Total-->
            <Column field="sub_total" header="Sub Total" class="w-[15%]">
              <template #body="slotProps">
                <div>
                  {{ subTotal(slotProps.data, quantity) }}
                </div>
              </template>
            </Column>
            <!--Action-->
            <Column field="action" class="w-[15%]" alignFrozen="right" frozen>
              <template #body>
                <button class="text-red-500 hover:text-red-700">
                  <i class="pi pi-trash"></i>
                </button>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
  <addProductModal :displayModal="displayModal" @update:displayModal="displayModal = $event" />
</template>
