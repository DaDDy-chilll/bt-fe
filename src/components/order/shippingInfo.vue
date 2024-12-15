<script setup lang="ts">
const store = useOrderStore();
</script>
<template>
  <div class="overflow-x-auto text-sm">
    <div class="flex items-center gap-2 px-4">
      <span
        class="flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-primarydark border-2 border-primarylight dark:border-accent2"
      >
        <i class="pi pi-truck text-primarylight dark:text-accent2"></i>
      </span>
      <h1 class="text-lg font-semibold dark:text-accentwhite">Shipping Information</h1>
    </div>

    <div class="grid grid-cols-2 gap-4 mt-4 dark:text-accentwhite">
      <div class="flex flex-col gap-2">
        <span>
          <i class="pi pi-globe text-primarylight dark:text-accent2 mr-2"></i>
          <span>
            {{ store.shipping.country }}
          </span>
        </span>
        <span>
          <i class="pi pi-home text-primarylight dark:text-accent2 mr-2"></i>
          <!--to change icon design-->
          <span>
            {{ store.shipping.address }}
          </span>
        </span>
      </div>

      <div class="flex flex-col gap-2">
        <span>
          <i class="pi pi-building text-primarylight dark:text-accent2 mr-2"></i> <!--to change icon design-->
          <span>
            {{ store.shipping.shipping_company }}
          </span>
        </span>
        <span>
          <i class="pi pi-money-bill text-primarylight dark:text-accent2 mr-2"></i>
          <!--to change icon design-->
          <span>
            {{ store.shipping.shipping_fee }}
          </span>
        </span>
        <span>
          <i class="pi pi-clock text-primarylight dark:text-accent2 mr-2"></i>
          <!--to change icon design-->
          <span>
            {{ store.shipping.estimated_duration }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>
