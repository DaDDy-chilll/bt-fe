<script setup>
import { ref } from "vue";

const props = defineProps({
  product: Object,
});

</script>

<template>
  <Card class="dark:bg-primarydark">
    <template #title>
      <h2 class="text-2xl text-accentblack dark:text-accentwhite">
        <i class="pi pi-box mr-2 text-xl"></i>
        #P-000000
      </h2>
    </template>
    <template #content>
      <div class="flex justify-between items-center">
        <p class="text-base text-accentblack font-medium dark:text-accentwhite">
          {{ product.productName }}
        </p>
      </div>
      <div class="flex justify-between items-center my-4">
        <p class="text-sm text-accentblack dark:text-accentwhite">John Doe</p>
        <p class="text-sm text-label dark:text-accentwhite">100</p>
      </div>
      <div class="flex justify-between items-center my-4">
        <p class="text-sm text-accentblack dark:text-accentwhite">Product Category</p>
        <p class="text-sm text-label dark:text-accentwhite">
          {{ product.productCategory.category }}
        </p>
      </div>
      <div class="flex justify-between items-center my-4">
        <p class="text-sm text-accentblack dark:text-accentwhite">Product Type</p>
        <p class="text-sm text-label dark:text-accentwhite">{{ product.productType.value }}</p>
      </div>
      <div class="flex justify-between items-center my-4">
        <p class="text-sm text-accentblack dark:text-accentwhite">Length</p>
        <p class="text-sm text-label dark:text-accentwhite">
          {{ product.productLength.length }}
          {{ product.productLength.unit.symbol }}
        </p>
      </div>
      <div class="flex justify-between items-center my-4">
        <p class="text-sm text-accentblack dark:text-accentwhite">Weight</p>
        <p class="text-sm text-label dark:text-accentwhite">
          {{ product.productWeight.weight }}
          {{ product.productWeight.unit.symbol }}
        </p>
      </div>

      <!-- Divider -->
      <div class="border-t border-muted w-full my-4"></div>
      <div class="flex justify-between items-center my-4">
        <p class="text-sm text-accentblack dark:text-accentwhite">Gold Type</p>
        <p class="text-sm text-label dark:text-accentwhite">{{ product.goldType.value }}</p>
      </div>
      <div class="flex justify-between items-center my-4">
        <p class="text-sm text-accentblack dark:text-accentwhite">Gold Color</p>
        <p class="text-sm text-label dark:text-accentwhite">{{ product.goldColor.value }}</p>
      </div>
      <div class="flex justify-between items-center my-4">
        <p class="text-sm text-accentblack dark:text-accentwhite">Size</p>
        <p class="text-sm text-label">
          {{ product.goldSize.size }} {{ product.goldSize.unit }}
        </p>
      </div>
      <div class="flex justify-between items-center my-4">
        <p class="text-sm text-accentblack dark:text-accentwhite">Weight</p>
        <p class="text-sm text-label dark:text-accentwhite">
          {{ product.goldWeight.weight }} {{ product.goldWeight.unit }}
        </p>
      </div>
      <div class="flex justify-between items-center my-4">
        <p class="text-sm text-accentblack dark:text-accentwhite">Gold Mass Weight</p>
        <p class="text-sm text-label dark:text-accentwhite">
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
        <p class="text-sm text-accentblack dark:text-accentwhite">Gem Slot {{ index + 1 }}</p>
        <p class="text-sm text-label dark:text-accentwhite">
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
        <p class="text-sm text-accentblack dark:text-accentwhite">A Yout Twat</p>
        <p class="text-sm text-label dark:text-accentwhite">
          {{ product.kyatt2 }}K {{ product.pe2 }}P {{ product.yaway2 }}Y
          {{ product.chan2 }}C {{ product.gm2 }}G
        </p>
      </div>
      <div class="flex justify-between items-center my-4">
        <p class="text-sm text-accentblack dark:text-accentwhite">Latt Kha</p>
        <p class="text-sm text-label dark:text-accentwhite">{{ product.latkha }}</p>
      </div>
    </template>
  </Card>
  <Card class="mt-4 dark:bg-primarydark">
    <template #title>
      <h2 class="text-base text-accentblack dark:text-accentwhite">Memo</h2>
    </template>
    <template #content>
      <Textarea
        v-model="value3"
        class="w-full bg-muted p-2 dark:bg-accentwhite border-muted dark:border-accentwhite"
        rows="5"
        cols="30"
        style="resize: none"
      />
    </template>
  </Card>
</template>
