<script setup lang="ts">
import { ref } from "vue";
import { onMounted, onUnmounted } from "vue";
import type { Gem } from "~/types/product";
import GemType from "./gemtype.json";
import GemColor from "./gemcolor.json";
import GemMassUnit from "./gemmassunit.json";
import LengthUnit from "./lengthunit.json";
import WeightUnit from "./weightunit.json";
import ProductCategory from "./productcategory.json";
import ProductType from "./producttype.json";
import GoldType from "./goldtype.json";
import GoldColor from "./goldcolor.json";

// Fetching Data
const gemTypes = GemType;
const gemColors = GemColor;
const gemMassUnits = GemMassUnit;
const productCategories = ProductCategory;
const productTypes = ProductType;
const goldTypes = GoldType;
const goldColors = GoldColor;
const units = LengthUnit;
const weightUnits = WeightUnit;

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
  images: [],
  productCategory: "",
  productType: "",
  productName: "",
  productLength: {
    length: 0,
    unit: "",
  },
  productWeight: {
    weight: 0,
    unit: "",
  },
  goldType: "",
  goldColor: "",
  goldSize: {
    size: 0,
    unit: "",
  },
  goldWeight: {
    weight: 0,
    unit: "",
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
  memo: "",
});

const gem = ref<Gem>({
  id: 0,
  type: "",
  color: "",
  mass: 0,
  massUnit: "",
  pieces: 0,
  price: 0,
});

const gemSlot = ref([]);
const selectedCity = ref(null);
const addGermVisible = ref(false);
const blockScreen = ref(false);
const drawerVisible = ref(false);

/**
 * Add Gem to the product
 */
const addGem = (gem: Gem) => {
  addGermVisible.value = false;
  gemSlot.value.push(gem);
  gem.value = {
    id: 0,
    type: "",
    color: "",
    mass: 0,
    massUnit: "",
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
  console.log(product.value);
  blockScreen.value = true;
  setTimeout(() => {
    blockScreen.value = false;
  }, 2000);
};
</script>

<template>
  <div class="flex gap-4 justify-between items-start w-full">
    <div class="w-full lg:w-2/3 bg-accentwhite drop-shadow-md rounded-lg">
      <Card>
        <template #title>
          <h2 class="text-xl float-left">New Product</h2>
          <div class="float-right">
            <div class="card flex items-center justify-center text-base">
              <span class="mr-4">Warehouse</span>
              <Select
                v-model="selectedCity"
                :options="cities"
                optionLabel="name"
                placeholder="Select a City"
                class="w-full md:w-40 bg-primarylight text-accentwhite"
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
                  :options="productCategories"
                  optionLabel="category"
                  class="w-full border h-10 dropdown-svg-white"
                />
                <label for="on_label" class="text-sm text-label"
                  >Product Category</label
                >
              </FloatLabel>
            </div>
            <div>
              <FloatLabel variant="on">
                <Select
                  v-model="product.productType"
                  inputId="on_label"
                  :options="productTypes"
                  optionLabel="type"
                  class="w-full border h-10 dropdown-svg-white"
                />
                <label for="on_label" class="text-sm text-label"
                  >Product Type</label
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
                  class="border w-full h-10 pl-2"
                />
                <label for="on_label" class="text-sm text-label"
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
                    class="border h-10 rounded-l-md rounded-r-none pl-2 w-full"
                    fluid
                  />
                  <label for="length_label" class="text-sm text-label"
                    >Length</label
                  >
                  <Select
                    v-model="product.productLength.unit"
                    :options="units"
                    optionLabel="unit"
                    optionValue="unit"
                    class="bg-primarylight text-accentwhite rounded-l-none rounded-r-md unit"
                  />
                </div>
              </FloatLabel>
              <!-- Weight -->
              <FloatLabel variant="on">
                <div class="flex items-center w-auto h-10">
                  <InputNumber
                    id="weight_label"
                    v-model="product.productWeight.weight"
                    class="border h-10 rounded-l-md rounded-r-none pl-2 w-full"
                    fluid
                  />
                  <label for="weight_label" class="text-sm text-label"
                    >Weight</label
                  >
                  <Select
                    v-model="product.productWeight.unit"
                    :options="weightUnits"
                    optionLabel="unit"
                    optionValue="unit"
                    class="bg-primarylight text-accentwhite rounded-l-none rounded-r-md unit"
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
                  v-model="product.goldType"
                  inputId="on_label"
                  :options="goldTypes"
                  optionLabel="type"
                  class="w-full border h-10 dropdown-svg-white"
                />
                <label for="on_label" class="text-sm text-label"
                  >Gold Type</label
                >
              </FloatLabel>
            </div>
            <div>
              <FloatLabel variant="on">
                <Select
                  v-model="product.goldColor"
                  inputId="on_label"
                  :options="goldColors"
                  optionLabel="color"
                  class="w-full border h-10 dropdown-svg-white"
                />
                <label for="on_label" class="text-sm text-label"
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
                  class="border h-10 rounded-l-md rounded-r-none pl-2 w-full"
                />
                <label for="length_label" class="text-sm text-label"
                  >Size</label
                >
                <Select
                  v-model="product.goldSize.unit"
                  :options="units"
                  optionLabel="unit"
                  optionValue="unit"
                  class="bg-primarylight text-accentwhite rounded-l-none rounded-r-md unit"
                />
              </div>
            </FloatLabel>
            <!-- Weight -->
            <FloatLabel variant="on">
              <div class="flex items-center w-auto h-10">
                <InputNumber
                  id="weight_label"
                  v-model="product.goldWeight.weight"
                  class="border h-10 rounded-l-md rounded-r-none pl-2 w-full"
                />
                <label for="weight_label" class="text-sm text-label"
                  >Weight</label
                >
                <Select
                  v-model="product.goldWeight.unit"
                  :options="weightUnits"
                  optionLabel="unit"
                  optionValue="unit"
                  class="bg-primarylight text-accentwhite rounded-l-none rounded-r-md unit"
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
                class="border h-10 pl-2 rounded-md"
                fluid
              />
              <label for="on_label" class="text-sm text-label">Kyatt</label>
            </FloatLabel>

            <!-- Pe -->
            <FloatLabel variant="on">
              <InputNumber
                id="on_label"
                v-model="product.pe"
                class="border h-10 pl-2 rounded-md"
                fluid
              />
              <label for="on_label" class="text-sm text-label">Pe</label>
            </FloatLabel>
            <!-- Yaway -->
            <FloatLabel variant="on">
              <InputNumber
                id="on_label"
                v-model="product.yaway"
                class="border h-10 pl-2 rounded-md"
                fluid
              />
              <label for="on_label" class="text-sm text-label">Yaway</label>
            </FloatLabel>
            <!-- Chan -->
            <FloatLabel variant="on">
              <InputNumber
                id="on_label"
                v-model="product.chan"
                class="border h-10 pl-2 rounded-md"
                fluid
              />
              <label for="on_label" class="text-sm text-label">Chan</label>
            </FloatLabel>
            <!-- GM -->
            <FloatLabel variant="on">
              <InputNumber
                id="on_label"
                v-model="product.gm"
                class="border h-10 pl-2 rounded-md"
                fluid
              />
              <label for="on_label" class="text-sm text-label">Gm</label>
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
              <label for="on_label" class="text-sm text-label">Kyatt</label>
            </FloatLabel>
            <!-- Pe -->
            <FloatLabel variant="on">
              <InputNumber
                id="on_label"
                v-model="product.pe2"
                class="border h-10 pl-2 rounded-md"
                fluid
              />
              <label for="on_label" class="text-sm text-label">Pe</label>
            </FloatLabel>
            <!-- Yaway -->
            <FloatLabel variant="on">
              <InputNumber
                id="on_label"
                v-model="product.yaway2"
                class="border h-10 pl-2 rounded-md"
                fluid
              />
              <label for="on_label" class="text-sm text-label">Yaway</label>
            </FloatLabel>
            <!-- Chan -->
            <FloatLabel variant="on">
              <InputNumber
                id="on_label"
                v-model="product.chan2"
                class="border h-10 pl-2 rounded-md"
                fluid
              />
              <label for="on_label" class="text-sm text-label">Chan</label>
            </FloatLabel>
            <!-- GM -->
            <FloatLabel variant="on">
              <InputNumber
                id="on_label"
                v-model="product.gm2"
                class="border h-10 pl-2 rounded-md"
                fluid
              />
              <label for="on_label" class="text-sm text-label">Gm</label>
            </FloatLabel>
          </div>
          <!-- Latt Kha -->
          <p class="text-base text-label mt-2 mb-4">Latt Kha</p>
          <div class="grid grid-cols-5 gap-2 w-full mb-6">
            <!-- Kyatt -->
            <InputNumber
              id="on_label"
              v-model="product.latkha"
              class="border h-10 pl-2 rounded-md"
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
              class="bg-primarylight px-4 py-2 text-sm text-accentwhite float-right"
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
                  {{ gemTypes[germ.type - 1].type }}
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
                    {{ gemColors[germ.color - 1].color }}
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
  <div class="flex justify-end mt-4 w-full">
    <Button
      label="back"
      class="underline px-4 py-2 text-accentblack mr-auto"
      @click="goBack"
    />
    <Button
      label="Add Product"
      class="bg-primarylight px-4 py-2 text-accentwhite"
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
    class="!rounded-lg !border-muted"
  >
    <product-add-germ
      :gem="gem"
      :gemTypes="gemTypes"
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
  @apply text-accentblack;
}

:deep(.p-select-dropdown) {
  @apply text-accentblack;
  @apply flex items-center justify-center w-6 pr-3;
}

:deep(.unit .p-select-label) {
  @apply pl-2 pr-0;
  @apply w-10;
}

:deep(.dropdown-svg-white .p-select-label) {
  @apply text-secondarydark;
}
</style>
