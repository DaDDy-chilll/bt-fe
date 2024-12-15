<script setup lang="ts">
const store = useOrderStore();
</script>

<template>
  <div>
    <div class="flex items-center gap-2 px-4">
      <span
        class="flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-primarydark border-2 border-primarylight dark:border-accent2 dark:text-accent2"
      >
        <i class="pi pi-user text-primarylight dark:text-accent2"></i>
      </span>
      <h1 class="dark:text-accentwhite">Customer Information</h1>
    </div>

    <div class="grid grid-cols-2 gap-4 mt-4 dark:text-accentwhite">
      <span class="text-sm">
        <i class="pi pi-user mr-2 text-primarylight dark:text-accent2"></i> <!--to change icon design-->
        <span>
          {{ store.customer?.firstname }} {{ store.customer?.lastname }}
        </span>
      </span>
      <span class="text-sm">
        <i class="pi pi-book mr-2 text-primarylight dark:text-accent2"></i> <!--to change icon design-->
        <span>
          {{ store.customer?.nrc }}
        </span>
      </span>
    </div>

    <div class="grid grid-cols-2 gap-4 mt-4 dark:text-accentwhite">
      <span class="text-sm">
        <i class="pi pi-phone mr-2 text-primarylight dark:text-accent2"></i> <!--to change icon design-->
        <span>
          {{ store.customer?.phone }}
        </span>
      </span>
      <span class="text-sm flex items-center">
        <i class="pi pi-envelope mr-2 text-primarylight dark:text-accent2"></i> <!--to change icon design-->
        <span class="text-wrap break-words">
          {{ store.customer?.email }}
        </span>
      </span>
    </div>
  </div>
</template>
