<script setup>
import productList from "~/pages/order/productList.json";
import productCategory from "~/pages/product/productcategory.json";
import goldType from "~/pages/product/goldtype.json";
import productType from "~/pages/product/producttype.json";
import { useOrderStore } from "~/stores/order";

const props = defineProps({
  products: {
    type: Array,
    required: true,
  },
});

//data
const products = useOrderStore().products?useOrderStore().products:props.products;
const productCategories = ref(productCategory);
const goldTypes = ref(goldType);
const productTypes = ref(productType);

</script>
<template>
  <div class="text-sm">
    <div>
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
                    class="w-12 h-12 object-cover"
                  />
                </div>
              </template>
            </Column>
            <!--Product Name-->
            <Column field="name" class="w-[15%]">
              <template #body="slotProps">
                <div class="font-bold">Product Name</div>
                <div>
                  {{ slotProps.data.code }}
                </div>
              </template>
            </Column>
            <!--Category-->
            <Column field="category" header="Category" class="w-[15%]">
              <template #body="slotProps">
                <div>
                  {{
                    productCategories.find(
                      (category) => category.id === slotProps.data.category_id
                    ).value
                  }}
                </div>
              </template>
            </Column>
            <!--Type-->
            <Column field="type" header="Type" class="w-[15%]">
              <template #body="slotProps">
                <div>
                  {{
                    productTypes.find(
                      (type) => type.id === slotProps.data.type_id
                    ).value
                  }}
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
            <Column field="available_stock" header="Available" class="w-[15%]">
              <template #body="slotProps">
                <div>
                  {{ slotProps.data.available_stock }}
                </div>
              </template>
            </Column>
            <!--Gold Type-->
            <Column field="goldType" header="Gold Type" class="w-[15%]">
              <template #body="slotProps">
                <div>
                  {{
                    goldTypes.find(
                      (goldType) => goldType.id === slotProps.data.gold_type_id
                    ).value
                  }}
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>
