<script setup lang="ts">
import { ref } from "vue";
import { onMounted, onUnmounted } from "vue";

const tableMode = ref(false);
const selectedCity = ref(null);
const cities = ref([
  { name: "Yangon", id: 1 },
  { name: "Mandalay", id: 2 },
]);
const selectedUnit = ref(1);
const units = ref([
  { label: "mm", id: 1 },
  { label: "cm", id: 2 },
]);
const selectedWeightUnit = ref(1);
const weightUnits = ref([
  { label: "g", id: 1 },
  { label: "kg", id: 2 },
]);
const images = ref([
  { src: `https://picsum.photos/seed/20/200`, alt: "Random Image" },
  { src: `https://picsum.photos/seed/21/200`, alt: "Random Image" },
  { src: `https://picsum.photos/seed/22/200`, alt: "Random Image" },
  { src: `https://picsum.photos/seed/23/200`, alt: "Random Image" },
  { src: `https://picsum.photos/seed/24/200`, alt: "Random Image" },
  { src: `https://picsum.photos/seed/25/200`, alt: "Random Image" },
]);
</script>

<template>
  <div class="flex gap-4 justify-between items-start w-full">
    <div class="w-2/3 bg-accentwhite drop-shadow-md rounded-lg">
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
                  v-model="value3"
                  inputId="on_label"
                  :options="cities"
                  optionLabel="name"
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
                  v-model="value3"
                  inputId="on_label"
                  :options="cities"
                  optionLabel="name"
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
                  v-model="value3"
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
                  <InputText
                    id="length_label"
                    v-model="lengthValue"
                    class="border h-10 rounded-l-md rounded-r-none pl-2 w-full"
                  />
                  <label for="length_label" class="text-sm text-label"
                    >Length</label
                  >
                  <Select
                    v-model="selectedUnit"
                    :options="units"
                    optionLabel="label"
                    optionValue="id"
                    class="bg-primarylight text-accentwhite rounded-l-none rounded-r-md unit"
                  />
                </div>
              </FloatLabel>
              <!-- Weight -->
              <FloatLabel variant="on">
                <div class="flex items-center w-auto h-10">
                  <InputText
                    id="weight_label"
                    v-model="weightValue"
                    class="border h-10 rounded-l-md rounded-r-none pl-2 w-full"
                  />
                  <label for="weight_label" class="text-sm text-label"
                    >Weight</label
                  >
                  <Select
                    v-model="selectedWeightUnit"
                    :options="weightUnits"
                    optionLabel="label"
                    optionValue="id"
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
                  v-model="value3"
                  inputId="on_label"
                  :options="cities"
                  optionLabel="name"
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
                  v-model="value3"
                  inputId="on_label"
                  :options="cities"
                  optionLabel="name"
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
                <InputText
                  id="length_label"
                  v-model="lengthValue"
                  class="border h-10 rounded-l-md rounded-r-none pl-2 w-full"
                />
                <label for="length_label" class="text-sm text-label"
                  >Size</label
                >
                <Select
                  v-model="selectedUnit"
                  :options="units"
                  optionLabel="label"
                  optionValue="id"
                  class="bg-primarylight text-accentwhite rounded-l-none rounded-r-md unit"
                />
              </div>
            </FloatLabel>
            <!-- Weight -->
            <FloatLabel variant="on">
              <div class="flex items-center w-auto h-10">
                <InputText
                  id="weight_label"
                  v-model="weightValue"
                  class="border h-10 rounded-l-md rounded-r-none pl-2 w-full"
                />
                <label for="weight_label" class="text-sm text-label"
                  >Weight</label
                >
                <Select
                  v-model="selectedWeightUnit"
                  :options="weightUnits"
                  optionLabel="label"
                  optionValue="id"
                  class="bg-primarylight text-accentwhite rounded-l-none rounded-r-md unit"
                />
              </div>
            </FloatLabel>
          </div>
          <!-- Gold Weight Mass -->
          <p class="text-base text-label mt-2 mb-4">Gold Weight Mass</p>
          <div class="grid grid-cols-5 gap-2 w-full mb-6">
            <!-- Kyatt -->
            <FloatLabel variant="on">
              <InputText
                id="on_label"
                v-model="value3"
                class="border w-full h-10 pl-2"
              />
              <label for="on_label" class="text-sm text-label">Kyatt</label>
            </FloatLabel>
            <!-- Pe -->
            <FloatLabel variant="on">
              <InputText
                id="on_label"
                v-model="value3"
                class="border w-full h-10 pl-2"
              />
              <label for="on_label" class="text-sm text-label">Pe</label>
            </FloatLabel>
            <!-- Yaway -->
            <FloatLabel variant="on">
              <InputText
                id="on_label"
                v-model="value3"
                class="border w-full h-10 pl-2"
              />
              <label for="on_label" class="text-sm text-label">Yaway</label>
            </FloatLabel>
            <!-- Chan -->
            <FloatLabel variant="on">
              <InputText
                id="on_label"
                v-model="value3"
                class="border w-full h-10 pl-2"
              />
              <label for="on_label" class="text-sm text-label">Chan</label>
            </FloatLabel>
            <!-- GM -->
            <FloatLabel variant="on">
              <InputText
                id="on_label"
                v-model="value3"
                class="border w-full h-10 pl-2"
              />
              <label for="on_label" class="text-sm text-label">Gm</label>
            </FloatLabel>
          </div>
          <!-- A Yout Twat -->
          <p class="text-base text-label mt-2 mb-4">A Yout Twat</p>
          <div class="grid grid-cols-5 gap-2 w-full mb-6">
            <!-- Kyatt -->
            <FloatLabel variant="on">
              <InputText
                id="on_label"
                v-model="value3"
                class="border w-full h-10 pl-2"
              />
              <label for="on_label" class="text-sm text-label">Kyatt</label>
            </FloatLabel>
            <!-- Pe -->
            <FloatLabel variant="on">
              <InputText
                id="on_label"
                v-model="value3"
                class="border w-full h-10 pl-2"
              />
              <label for="on_label" class="text-sm text-label">Pe</label>
            </FloatLabel>
            <!-- Yaway -->
            <FloatLabel variant="on">
              <InputText
                id="on_label"
                v-model="value3"
                class="border w-full h-10 pl-2"
              />
              <label for="on_label" class="text-sm text-label">Yaway</label>
            </FloatLabel>
            <!-- Chan -->
            <FloatLabel variant="on">
              <InputText
                id="on_label"
                v-model="value3"
                class="border w-full h-10 pl-2"
              />
              <label for="on_label" class="text-sm text-label">Chan</label>
            </FloatLabel>
            <!-- GM -->
            <FloatLabel variant="on">
              <InputText
                id="on_label"
                v-model="value3"
                class="border w-full h-10 pl-2"
              />
              <label for="on_label" class="text-sm text-label">Gm</label>
            </FloatLabel>
          </div>
          <!-- Latt Kha -->
          <p class="text-base text-label mt-2 mb-4">Latt Kha</p>
          <div class="grid grid-cols-5 gap-2 w-full mb-6">
            <!-- Kyatt -->
            <FloatLabel variant="on">
              <InputText
                id="on_label"
                v-model="value3"
                class="border w-full h-10 pl-2"
              />
              <label for="on_label" class="text-sm text-label">Kyatt</label>
            </FloatLabel>
          </div>
          <!-- Divider -->
          <div class="border-t border-muted w-2/3 mx-auto my-6"></div>
          <!-- Germs Slot -->
          <div class="flex justify-between items-center">
            <p class="text-base text-label my-2 float-left">Germs Slot</p>
            <Button
              label="Add Germ"
              class="bg-primarylight text-accentwhite px-4 py-1 float-right"
              @click="addGerm"
            />
          </div>
          <div
            class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 justify-start items-center overflow-x-auto my-6 pb-3"
          >
            <Card
              v-for="germ in 3"
              :key="germ"
              class="drop-shadow-md rounded-md border border-muted"
            >
              <template #title>
                <p class="text-sm text-label float-left font-bold">
                  <img
                    src="@/assets/images/Diamond.png"
                    alt="germ"
                    class="w-5 h-5 mx-2 float-left"
                  />
                  Diamond
                </p>
                <i class="pi pi-trash text-red-500 float-right"></i>
              </template>
              <template #content>
                <div class="flex justify-between items-center my-2">
                  <p class="text-sm text-label">Color</p>
                  <p class="text-sm text-label">Pink</p>
                </div>
                <div class="flex justify-between items-center my-2">
                  <p class="text-sm text-label">Gem Mass</p>
                  <p class="text-sm text-label">100</p>
                </div>
                <div class="flex justify-between items-center my-2">
                  <p class="text-sm text-label">Pieces</p>
                  <p class="text-sm text-label">100</p>
                </div>
                <div class="flex justify-between items-center my-2">
                  <p class="text-sm text-label">Price</p>
                  <p class="text-sm text-label">100</p>
                </div>
              </template>
            </Card>
          </div>
          <!-- Divider -->
          <div class="border-t border-muted w-2/3 mx-auto my-6"></div>
        </template>
      </Card>
    </div>
    <div class="w-1/3 drop-shadow-md rounded-lg">
      <Card>
        <template #title>
          <h2 class="text-2xl">
            <i class="pi pi-box mr-2 text-xl"></i>
            #P-000000
          </h2>
        </template>
        <template #content>
          <div class="flex justify-between items-center">
            <p class="text-base text-accentblack font-medium">
              Product Name XXXXXX
            </p>
          </div>
          <div class="flex justify-between items-center my-4">
            <p class="text-sm text-accentblack">John Doe</p>
            <p class="text-sm text-label">100</p>
          </div>
          <div class="flex justify-between items-center my-4">
            <p class="text-sm text-accentblack">Product Category</p>
            <p class="text-sm text-label">Pure Gold</p>
          </div>
          <div class="flex justify-between items-center my-4">
            <p class="text-sm text-accentblack">Product Type</p>
            <p class="text-sm text-label">Necklace</p>
          </div>
          <div class="flex justify-between items-center my-4">
            <p class="text-sm text-accentblack">Lenght</p>
            <p class="text-sm text-label">12cm</p>
          </div>
          <div class="flex justify-between items-center my-4">
            <p class="text-sm text-accentblack">Weight</p>
            <p class="text-sm text-label">100gm</p>
          </div>

          <!-- Divider -->
          <div class="border-t border-muted w-full my-4"></div>
          <div class="flex justify-between items-center my-4">
            <p class="text-sm text-accentblack">Gold Type</p>
            <p class="text-sm text-label">24K</p>
          </div>
          <div class="flex justify-between items-center my-4">
            <p class="text-sm text-accentblack">Gold Color</p>
            <p class="text-sm text-label">Pink</p>
          </div>
          <div class="flex justify-between items-center my-4">
            <p class="text-sm text-accentblack">Size</p>
            <p class="text-sm text-label">100cm</p>
          </div>
          <div class="flex justify-between items-center my-4">
            <p class="text-sm text-accentblack">Weight</p>
            <p class="text-sm text-label">100gm</p>
          </div>
          <div class="flex justify-between items-center my-4">
            <p class="text-sm text-accentblack">Gold Mass Weight</p>
            <p class="text-sm text-label">1K 3P 5Y 2C</p>
          </div>
          <!-- Divider -->
          <div class="border-t border-muted w-full my-4"></div>
          <div class="flex justify-between items-center my-4">
            <p class="text-sm text-accentblack">Gem Slot 1</p>
            <p class="text-sm text-label">
              <img
                src="@/assets/images/Diamond.png"
                alt="germ"
                class="w-5 h-5 mx-2 float-left"
              />
              Diamond
            </p>
          </div>
          <div class="flex justify-between items-center my-4">
            <p class="text-sm text-accentblack">Gem Slot 2</p>
            <p class="text-sm text-label">
              <img
                src="@/assets/images/Crystal.png"
                alt="germ"
                class="w-5 h-5 mx-2 float-left"
              />
              Ruby
            </p>
          </div>
          <!-- Divider -->
          <div class="border-t border-muted w-full my-4"></div>
          <div class="flex justify-between items-center my-4">
            <p class="text-sm text-accentblack">A Yout Twat</p>
            <p class="text-sm text-label">1K 3P 5Y 2C</p>
          </div>
          <div class="flex justify-between items-center my-4">
            <p class="text-sm text-accentblack">Latt Kha</p>
            <p class="text-sm text-label">1,000,000</p>
          </div>
        </template>
      </Card>
      <Card class="mt-4">
        <template #title>
          <h2 class="text-base">Memo</h2>
        </template>
        <template #content>
          <Textarea
            v-model="value3"
            class="w-full bg-muted p-2"
            rows="5"
            cols="30"
            style="resize: none"
          />
        </template>
      </Card>
    </div>
  </div>
  <div class="flex justify-end mt-4 w-full ">
    <Button
      label="back"
      class="underline px-4 py-2 text-accentblack mr-auto"
      @click="goBack"
    />
    <Button
      label="Add Product"
      class="bg-primarylight px-4 py-2 text-accentwhite "
    />
  </div>
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

:deep(.unit .p-select-label) {
  @apply pl-2 pr-0;
  @apply w-10;
}

:deep(.dropdown-svg-white .p-select-label) {
  @apply text-secondarydark;
}
</style>
