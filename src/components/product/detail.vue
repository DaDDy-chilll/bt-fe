<script setup>
import { ref } from "vue";

const props = defineProps({
  product: Object,
});

console.log(props.product);
</script>

<template>
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
          {{ product.productName }}
        </p>
      </div>
      <div class="flex justify-between items-center my-4">
        <p class="text-sm text-accentblack">John Doe</p>
        <p class="text-sm text-label">100</p>
      </div>
      <div class="flex justify-between items-center my-4">
        <p class="text-sm text-accentblack">Product Category</p>
        <p class="text-sm text-label">
          {{ product.productCategory.value }}
        </p>
      </div>
      <div class="flex justify-between items-center my-4">
        <p class="text-sm text-accentblack">Product Type</p>
        <p class="text-sm text-label">{{ product.productType.value }}</p>
      </div>
      <div class="flex justify-between items-center my-4">
        <p class="text-sm text-accentblack">Length</p>
        <p class="text-sm text-label">
          {{ product.productLength.length }}
          {{ product.productLength.unit }}
        </p>
      </div>
      <div class="flex justify-between items-center my-4">
        <p class="text-sm text-accentblack">Weight</p>
        <p class="text-sm text-label">
          {{ product.productWeight.weight }}
          {{ product.productWeight.unit }}
        </p>
      </div>

      <!-- Divider -->
      <div class="border-t border-muted w-full my-4"></div>
      <div class="flex justify-between items-center my-4">
        <p class="text-sm text-accentblack">Gold Type</p>
        <p class="text-sm text-label">{{ product.goldType.value }}</p>
      </div>
      <div class="flex justify-between items-center my-4">
        <p class="text-sm text-accentblack">Gold Color</p>
        <p class="text-sm text-label">{{ product.goldColor.value }}</p>
      </div>
      <div class="flex justify-between items-center my-4">
        <p class="text-sm text-accentblack">Size</p>
        <p class="text-sm text-label">
          {{ product.goldSize.size }} {{ product.goldSize.unit }}
        </p>
      </div>
      <div class="flex justify-between items-center my-4">
        <p class="text-sm text-accentblack">Weight</p>
        <p class="text-sm text-label">
          {{ product.goldWeight.weight }} {{ product.goldWeight.unit }}
        </p>
      </div>
      <div class="flex justify-between items-center my-4">
        <p class="text-sm text-accentblack">Gold Mass Weight</p>
        <p class="text-sm text-label">
          {{ product.kyatt }}K {{ product.pe }}P {{ product.yaway }}Y
          {{ product.chan }}C {{ product.gm }}G
        </p>
      </div>
      <!-- Divider -->
      <div class="border-t border-muted w-full my-4"></div>
      <div
        class="flex justify-between items-center my-4"
        v-for="(germ, index) in product.gems"
        :key="index"
      >
        <p class="text-sm text-accentblack">Gem Slot {{ index + 1 }}</p>
        <p class="text-sm text-label">
          <img
            :src="germ.icon"
            alt="germ"
            class="w-5 h-5 mx-2 float-left"
          />
          {{ germ.type }}
        </p>
      </div>
      <!-- Divider -->
      <div class="border-t border-muted w-full my-4"></div>
      <div class="flex justify-between items-center my-4">
        <p class="text-sm text-accentblack">A Yout Twat</p>
        <p class="text-sm text-label">
          {{ product.kyatt2 }}K {{ product.pe2 }}P {{ product.yaway2 }}Y
          {{ product.chan2 }}C {{ product.gm2 }}G
        </p>
      </div>
      <div class="flex justify-between items-center my-4">
        <p class="text-sm text-accentblack">Latt Kha</p>
        <p class="text-sm text-label">{{ product.latkha }}</p>
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
</template>
