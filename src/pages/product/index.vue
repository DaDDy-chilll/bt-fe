<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import type { Gem,  Product, sendData } from "@/types/product";
import Warehouse from "./warehouse.json";

// Master Data
const gemTypes = ref<any>([]);
const gemColors = ref<any>([]);
const gemMassUnits = ref<any>([]);
const productCategories = ref<any>([]);
const productTypes = ref<any>([]);
const goldTypes = ref<any>([]);
const goldColors = ref<any>([]);
const lengthUnits = ref<any>([]);
const sizeUnits = ref<any>([]);
const weightUnits = ref<any>([]);
const warehouses = Warehouse;
const gemSlot = ref([]);
const selectedCity = ref(null);
const addGermVisible = ref(false);
const blockScreen = ref(false);
const drawerVisible = ref(false);

// Stores
const productStore = useProductStore();
const commonStore = useCommonStore();

/**
 * Load Master Data
 * @author LK
 * @created 2024-12-13
 * @updated ****-**-**
 */
const loadMasterData = async () => {
  try {
    blockScreen.value = true;
    productCategories.value = await productStore.getProductCategories();
    productTypes.value = await productStore.getProductTypes();
    goldTypes.value = await productStore.getGoldTypes();
    goldColors.value = await productStore.getGoldColors();
    lengthUnits.value = await commonStore.getUnit(2);
    sizeUnits.value = await commonStore.getUnit(3);
    weightUnits.value = await commonStore.getUnit(1);
    gemTypes.value = await productStore.getGemTypes();
    gemColors.value = goldColors.value;
    gemMassUnits.value = await commonStore.getUnit(1);
  } catch (error) {
    // alert(error);
  } finally {
    blockScreen.value = false;
  }
};

onMounted(async () => {
  await loadMasterData();
});

// V-Model Variables
const images = ref([
  { src: `https://picsum.photos/seed/20/200`, alt: "Random Image" },
  { src: `https://picsum.photos/seed/21/200`, alt: "Random Image" },
  { src: `https://picsum.photos/seed/22/200`, alt: "Random Image" },
  { src: `https://picsum.photos/seed/23/200`, alt: "Random Image" },
  { src: `https://picsum.photos/seed/24/200`, alt: "Random Image" },
  { src: `https://picsum.photos/seed/25/200`, alt: "Random Image" },
]);

const product = ref<Product>({
  id: 0,
  warehouse: {
    id: 0,
    name: null,
  },
  images: [],
  productCategory: {
    id: 0,
    category: null,
  },
  productType: {
    id: 0,
    type: null,
  },
  productName: null,
  productLength: {
    length: 0,
    unit: {
      id: 0,
      symbol: null,
    },
  },
  productWeight: {
    weight: 0,
    unit: {
      id: 0,
      symbol: null,
    },
  },
  goldType: {
    id: 0,
    type: null,
  },
  goldColor: {
    id: 0,
    color: null,
  },
  goldSize: {
    size: 0,
    unit: {
      id: 0,
      symbol: null,
    },
  },
  goldWeight: {
    weight: 0,
    unit: {
      id: 0,
      symbol: null,
    },
  },
  kyatt: 0,
  pe: 0,
  yaway: 0,
  chan: 0,
  gm: 0,
  kyatt2: 0,
  pe2: 0,
  yaway2: 0,
  chan2: 0,
  gm2: 0,
  latkha: 0,
  gems: [],
  memo: null,
});

const gem = ref<Gem>({
  id: 0,
  type: null,
  color: null,
  mass: 0,
  massUnit: null,
  pieces: 0,
  price: 0,
});


/**
 * Add Gem to the product
 */
const addGem = (gem: Gem) => {
  addGermVisible.value = false;
  product.value.gems.push(gem);
  gem.value = {
    id: 0,
    type: null,
    color: null,
    mass: 0,
    massUnit: null,
    pieces: 0,
    price: 0,
  };
};

/**
 * Remove Gem from the product
 * @param index
 */
const removeGem = (index: number) => {
  gemSlot.value.splice(index, 1);
};

const addProduct = () => {
  blockScreen.value = true;
  const sendData: sendData=  {
  id: null,
  code: null,
  category_id: product.value.productCategory.id,
  type_id: product.value.productType.id,
  name: product.value.productName,
  length: product.value.productLength.length,
  length_unit_id: product.value.productLength.unit.id,
  weight: product.value.productWeight.weight,
  weight_unit_id: product.value.productWeight.unit.id,
  gold_types_id: product.value.goldType.id,
  gold_color_id: product.value.goldColor.id,
  size: product.value.goldSize.size,
  size_unit_id: product.value.goldSize.unit.id,
  total_weight: product.value.goldWeight.weight,
  total_weight_unit_id: product.value.goldWeight.unit.id,
  gems_price: 0,
  ayoutwat: 0,
  latt_kha: 0,
  m_product_gems: null,
  m_photos: null,
  created_by: 0,
  created_at: new Date(),
  updated_at: new Date(),
  del_flg: false,
  };
  console.log(sendData);
  setTimeout(() => {
    blockScreen.value = false;
  }, 2000);
};
</script>

<template>
  <div class="flex gap-4 justify-between items-start w-full">
    <div
      class="w-full lg:w-2/3 bg-accentwhite dark:bg-primarydark drop-shadow-md rounded-lg"
    >
      <Card class="dark:bg-primarydark">
        <template #title>
          <h2
            class="text-xl float-left font-medium text-accentblack dark:text-accentwhite"
          >
            New Product
          </h2>
          <div class="float-right">
            <div class="card flex items-center justify-center text-base">
              <span class="mr-4 text-accentblack dark:text-accentwhite"
                >Warehouse</span
              >
              <Select
                v-model="product.warehouse.id"
                :options="warehouses"
                optionLabel="value"
                optionValue="id"
                placeholder="Select Warehouse"
                class="w-full md:w-44 bg-primarylight dark:bg-accent2 text-sm text-accentwhite"
              />
            </div>
          </div>
        </template>
        <template #content>
          <!-- Images -->
          <div
            class="grid grid-cols-6 gap-5 overflow-x-auto border border-muted px-6 py-6 rounded-lg"
          >
            <div class="" v-for="image in images" :key="image.src">
              <img :src="image.src" :alt="image.alt" class="w-full h-auto" />
            </div>
          </div>
          <!-- Product Category and Product Type -->
          <div class="grid grid-cols-2 gap-2 w-full my-6">
            <div>
              <FloatLabel variant="on">
                <Select
                  v-model="product.productCategory"
                  inputId="on_label"
                  :options="productCategories?._value?.data"
                  optionLabel="category"
                  optionValue="id"
                  class="w-full border h-10 dropdown-svg-white dark:bg-primarydark"
                />
                <label
                  for="on_label"
                  class="text-sm text-label dark:text-accentwhite bg-accentwhite dark:bg-primarydark"
                  >Product Category</label
                >
              </FloatLabel>
            </div>
            <div>
              <FloatLabel variant="on">
                <Select
                  v-model="product.productType"
                  inputId="on_label"
                  :options="productTypes._value?.data"
                  optionLabel="type"
                  optionValue="id"
                  class="w-full border h-10 dropdown-svg-white dark:bg-primarydark"
                />
                <label
                  for="on_label"
                  class="text-sm text-label dark:text-accentwhite bg-accentwhite dark:bg-primarydark"
                  >Product Type <span class="text-red-500">*</span></label
                >
              </FloatLabel>
            </div>
          </div>
          <!-- Product Name and Length and Weight -->
          <div class="grid grid-cols-2 gap-2 w-full">
            <!-- Product Name -->
            <div>
              <FloatLabel variant="on">
                <InputText
                  id="on_label"
                  v-model="product.productName"
                  class="border w-full h-10 pl-2 dark:bg-primarydark text-accentblack dark:text-accentwhite"
                />
                <label
                  for="on_label"
                  class="text-sm text-label dark:text-accentwhite bg-accentwhite dark:bg-primarydark"
                  >Product Name</label
                >
              </FloatLabel>
            </div>
            <!-- Length and Weight -->
            <div class="grid grid-cols-2 gap-2">
              <!-- Length -->
              <FloatLabel variant="on">
                <div class="flex items-center h-10">
                  <InputNumber
                    id="length_label"
                    v-model="product.productLength.length"
                    class="border h-10 rounded-l-md rounded-r-none pl-2 w-full dark:bg-primarydark"
                    fluid
                  />
                  <label
                    for="length_label"
                    class="text-sm text-label dark:text-accentwhite bg-accentwhite dark:bg-primarydark"
                    >Length</label
                  >
                  <Select
                    v-model="product.productLength.unit.id"
                    :options="lengthUnits._value?.data"
                    optionLabel="symbol"
                    optionValue="id"
                    class="bg-primarylight dark:bg-accent2 text-accentwhite rounded-l-none rounded-r-md unit"
                  />
                </div>
              </FloatLabel>
              <!-- Weight -->
              <FloatLabel variant="on">
                <div class="flex items-center w-auto h-10">
                  <InputNumber
                    id="weight_label"
                    v-model="product.productWeight.weight"
                    class="border h-10 rounded-l-md rounded-r-none pl-2 w-full dark:bg-primarydark"
                    fluid
                  />
                  <label
                    for="weight_label"
                    class="text-sm text-label dark:text-accentwhite bg-accentwhite dark:bg-primarydark"
                    >Weight</label
                  >
                  <Select
                    v-model="product.productWeight.unit.id"
                    :options="weightUnits._value?.data"
                    optionLabel="symbol"
                    optionValue="id"
                    class="bg-primarylight dark:bg-accent2 text-accentwhite rounded-l-none rounded-r-md unit"
                  />
                </div>
              </FloatLabel>
            </div>
          </div>
          <!-- Divider -->
          <div class="border-t border-muted w-2/3 mx-auto my-6"></div>
          <!-- Gold Type and Gold Color -->
          <div class="grid grid-cols-2 gap-2 w-full my-6">
            <div>
              <FloatLabel variant="on">
                <Select
                  v-model="product.goldType.id"
                  inputId="on_label"
                  :options="goldTypes._value?.data"
                  optionLabel="name"
                  optionValue="id"
                  class="w-full border h-10 dropdown-svg-white dark:bg-primarydark"
                />
                <label
                  for="on_label"
                  class="text-sm text-label dark:text-accentwhite bg-accentwhite dark:bg-primarydark"
                  >Gold Type</label
                >
              </FloatLabel>
            </div>
            <div>
              <FloatLabel variant="on">
                <Select
                  v-model="product.goldColor.id"
                  inputId="on_label"
                  :options="goldColors._value?.data"
                  optionLabel="name"
                  optionValue="id"
                  class="w-full border h-10 dropdown-svg-white dark:bg-primarydark"
                />
                <label
                  for="on_label"
                  class="text-sm text-label dark:text-accentwhite bg-accentwhite dark:bg-primarydark"
                  >Gold Color</label
                >
              </FloatLabel>
            </div>
          </div>
          <!-- Size and Weight -->
          <div class="grid grid-cols-2 gap-2 w-full my-6">
            <!-- Size -->
            <FloatLabel variant="on">
              <div class="flex items-center h-10">
                <InputNumber
                  id="length_label"
                  v-model="product.goldSize.size"
                  class="border h-10 rounded-l-md rounded-r-none pl-2 w-full dark:bg-primarydark"
                />
                <label
                  for="length_label"
                  class="text-sm text-label dark:text-accentwhite bg-accentwhite dark:bg-primarydark"
                  >Size</label
                >
                <Select
                  v-model="product.goldSize.unit.id"
                  :options="sizeUnits._value?.data"
                  optionLabel="symbol"
                  optionValue="id"
                  class="bg-primarylight dark:bg-accent2 text-accentwhite rounded-l-none rounded-r-md unit"
                />
              </div>
            </FloatLabel>
            <!-- Weight -->
            <FloatLabel variant="on">
              <div class="flex items-center w-auto h-10">
                <InputNumber
                  id="weight_label"
                  v-model="product.goldWeight.weight"
                  class="border h-10 rounded-l-md rounded-r-none pl-2 w-full dark:bg-primarydark"
                />
                <label
                  for="weight_label"
                  class="text-sm text-label dark:text-accentwhite bg-accentwhite dark:bg-primarydark"
                  >Weight</label
                >
                <Select
                  v-model="product.goldWeight.unit.id"
                  :options="weightUnits._value?.data"
                  optionLabel="symbol"
                  optionValue="id"
                  class="bg-primarylight dark:bg-accent2 text-accentwhite rounded-l-none rounded-r-md unit"
                />
              </div>
            </FloatLabel>
          </div>
          <!-- Gold Weight Mass -->
          <p class="text-base text-label mt-2 mb-4">Gold Weight Mass</p>
          <div class="grid grid-cols-5 gap-2 w-full mb-6">
            <FloatLabel variant="on">
              <!-- Kyatt -->
              <InputNumber
                v-model="product.kyatt"
                inputId="on_label"
                class="border h-10 pl-2 rounded-md dark:bg-primarydark"
                fluid
              />
              <label
                for="on_label"
                class="text-sm text-label dark:text-accentwhite bg-accentwhite dark:bg-primarydark"
                >Kyatt</label
              >
            </FloatLabel>

            <!-- Pe -->
            <FloatLabel variant="on">
              <InputNumber
                id="on_label"
                v-model="product.pe"
                class="border h-10 pl-2 rounded-md dark:bg-primarydark"
                fluid
              />
              <label
                for="on_label"
                class="text-sm text-label dark:text-accentwhite bg-accentwhite dark:bg-primarydark"
                >Pe</label
              >
            </FloatLabel>
            <!-- Yaway -->
            <FloatLabel variant="on">
              <InputNumber
                id="on_label"
                v-model="product.yaway"
                class="border h-10 pl-2 rounded-md dark:bg-primarydark"
                fluid
              />
              <label
                for="on_label"
                class="text-sm text-label dark:text-accentwhite bg-accentwhite dark:bg-primarydark"
                >Yaway</label
              >
            </FloatLabel>
            <!-- Chan -->
            <FloatLabel variant="on">
              <InputNumber
                id="on_label"
                v-model="product.chan"
                class="border h-10 pl-2 rounded-md dark:bg-primarydark"
                fluid
              />
              <label
                for="on_label"
                class="text-sm text-label dark:text-accentwhite bg-accentwhite dark:bg-primarydark"
                >Chan</label
              >
            </FloatLabel>
            <!-- GM -->
            <FloatLabel variant="on">
              <InputNumber
                id="on_label"
                v-model="product.gm"
                class="border h-10 pl-2 rounded-md dark:bg-primarydark"
                fluid
              />
              <label
                for="on_label"
                class="text-sm text-label dark:text-accentwhite bg-accentwhite dark:bg-primarydark"
                >Gm</label
              >
            </FloatLabel>
          </div>
          <!-- A Yout Twat -->
          <p class="text-base text-label mt-2 mb-4">A Yout Twat</p>
          <div class="grid grid-cols-5 gap-2 w-full mb-6">
            <!-- Kyatt -->
            <FloatLabel variant="on">
              <InputNumber
                id="on_label"
                v-model="product.kyatt2"
                class="border h-10 pl-2 rounded-md"
                fluid
              />
              <label
                for="on_label"
                class="text-sm text-label dark:text-accentwhite bg-accentwhite dark:bg-primarydark"
                >Kyatt</label
              >
            </FloatLabel>
            <!-- Pe -->
            <FloatLabel variant="on">
              <InputNumber
                id="on_label"
                v-model="product.pe2"
                class="border h-10 pl-2 rounded-md dark:bg-primarydark"
                fluid
              />
              <label
                for="on_label"
                class="text-sm text-label dark:text-accentwhite bg-accentwhite dark:bg-primarydark"
                >Pe</label
              >
            </FloatLabel>
            <!-- Yaway -->
            <FloatLabel variant="on">
              <InputNumber
                id="on_label"
                v-model="product.yaway2"
                class="border h-10 pl-2 rounded-md dark:bg-primarydark"
                fluid
              />
              <label
                for="on_label"
                class="text-sm text-label dark:text-accentwhite bg-accentwhite dark:bg-primarydark"
                >Yaway</label
              >
            </FloatLabel>
            <!-- Chan -->
            <FloatLabel variant="on">
              <InputNumber
                id="on_label"
                v-model="product.chan2"
                class="border h-10 pl-2 rounded-md dark:bg-primarydark"
                fluid
              />
              <label
                for="on_label"
                class="text-sm text-label dark:text-accentwhite bg-accentwhite dark:bg-primarydark"
                >Chan</label
              >
            </FloatLabel>
            <!-- GM -->
            <FloatLabel variant="on">
              <InputNumber
                id="on_label"
                v-model="product.gm2"
                class="border h-10 pl-2 rounded-md dark:bg-primarydark"
                fluid
              />
              <label
                for="on_label"
                class="text-sm text-label dark:text-accentwhite bg-accentwhite dark:bg-primarydark"
                >Gm</label
              >
            </FloatLabel>
          </div>
          <!-- Latt Kha -->
          <p class="text-base text-label mt-2 mb-4">Latt Kha</p>
          <div class="grid grid-cols-5 gap-2 w-full mb-6">
            <!-- Kyatt -->
            <InputNumber
              id="on_label"
              v-model="product.latkha"
              class="border h-10 pl-2 rounded-md dark:bg-primarydark"
              fluid
            />
          </div>
          <!-- Divider -->
          <div class="border-t border-muted w-2/3 mx-auto my-6"></div>
          <!-- Germs Slot -->
          <div class="flex justify-between items-center">
            <p class="text-base text-label my-2 float-left">Germs Slot</p>
            <Button
              type="button"
              label="Add Gem"
              class="bg-primarylight dark:bg-accent2 px-4 py-2 text-sm text-accentwhite float-right"
              @click="addGermVisible = true"
            ></Button>
          </div>
          <div
            class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 justify-start items-center overflow-x-auto my-6 pb-1"
          >
            <Card
              v-for="germ in gemSlot"
              :key="germ"
              class="drop-shadow-md rounded-md border border-muted"
            >
              <template #title>
                <p class="text-sm text-label float-left font-bold">
                  <img
                    :src="gemTypes[germ.type - 1].icon"
                    alt="germ"
                    class="w-5 h-5 mx-2 float-left"
                  />
                  {{ gemTypes[germ.type - 1].value }}
                </p>
                <i
                  class="pi pi-trash text-red-500 float-right"
                  @click="removeGem(index)"
                ></i>
              </template>
              <template #content>
                <div class="flex justify-between items-center my-2">
                  <p class="text-sm text-label">Color</p>
                  <p class="text-sm text-label">
                    {{ gemColors[germ.color - 1].value }}
                  </p>
                </div>
                <div class="flex justify-between items-center my-2">
                  <p class="text-sm text-label">Gem Mass</p>
                  <p class="text-sm text-label">{{ germ.mass }}</p>
                </div>
                <div class="flex justify-between items-center my-2">
                  <p class="text-sm text-label">Pieces</p>
                  <p class="text-sm text-label">{{ germ.pieces }}</p>
                </div>
                <div class="flex justify-between items-center my-2">
                  <p class="text-sm text-label">Price</p>
                  <p class="text-sm text-label">{{ germ.price }}</p>
                </div>
              </template>
            </Card>
          </div>
          <!-- Divider -->
          <div class="border-t border-muted w-2/3 mx-auto"></div>
        </template>
      </Card>
    </div>
    <div class="hidden lg:block w-1/3 drop-shadow-md rounded-lg">
      <!-- <template #detail> -->
      <product-detail :product="product" />
      <!-- </template> -->
    </div>
    <Button
      icon="pi pi-box"
      class="lg:hidden bg-accent2 text-accentwhite drop-shadow-lg w-10 h-10 rounded-full flex justify-center items-center fixed top-1/2 right-4 transform -translate-y-1/2"
      @click="drawerVisible = true"
    />
  </div>
  <div class="flex justify-end mt-4 mb-12 w-full">
    <!-- <Button
      label="back"
      class="underline px-4 py-2 text-accentblack mr-auto"
      @click="goBack"
    /> -->
    <Button
      label="Add Product"
      class="bg-primarylight px-4 py-2 text-accentwhite dark:bg-accent2"
      @click="addProduct"
    />
  </div>
  <!-- Add Germ Dialog -->
  <Dialog
    v-model:visible="addGermVisible"
    modal
    header="Gem Slot"
    :style="{ width: '25rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    class="!rounded-lg !border-muted bg-accentwhite dark:bg-primarydark text-accentblack dark:text-accentwhite"
  >
    <product-add-germ
      :gem="gem"
      :gemTypes="gemTypes._value?.data"
      :gemColors="gemColors"
      :gemMassUnits="gemMassUnits"
      @addGem="addGem"
    />
  </Dialog>
  <BlockUI :blocked="blockScreen" fullScreen>
    <div
      class="fixed inset-0 flex justify-center items-center"
      v-show="blockScreen"
    >
      <ProgressSpinner />
    </div>
  </BlockUI>
  <Drawer
    v-model:visible="drawerVisible"
    header="Product Detail"
    position="right"
  >
    <product-detail :product="product" />
  </Drawer>
</template>

<style scoped>
:deep(.p-select-label, .p-placeholder) {
  @apply text-accentwhite;
}
:deep(.p-select-dropdown > svg) {
  @apply text-accentwhite;
}

:deep(.p-select-option) {
  @apply text-accentwhite;
}

:deep(.dropdown-svg-white .p-select-dropdown > svg) {
  @apply text-accentblack dark:text-accentwhite;
}

:deep(.p-select-dropdown) {
  @apply text-accentblack dark:text-accentwhite;
  @apply flex items-center justify-center w-6 pr-3;
}

:deep(.unit .p-select-label) {
  @apply pl-2 pr-0;
  @apply w-10;
}

:deep(.dropdown-svg-white .p-select-label) {
  @apply text-secondarydark dark:text-accentwhite;
}

:deep(.p-inputnumber-input) {
  @apply dark:bg-primarydark dark:text-accentwhite;
}
</style>
