<script setup lang="ts">
const store = useOrderStore();
</script>

<template>
  <div>
    <div class="flex items-center gap-2 px-4">
      <span
        class="flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-primarylight"
      >
        <i class="pi pi-user text-primarylight"></i>
      </span>
      <h1>Customer Information</h1>
    </div>

    <div class="grid grid-cols-2 gap-4 mt-4">
      <span class="text-sm">
        <i class="pi pi-user mr-2 text-primarylight"></i> <!--to change icon design-->
        <span>
          {{ store.customer?.firstname }} {{ store.customer?.lastname }}
        </span>
      </span>
      <span class="text-sm">
        <i class="pi pi-book mr-2 text-primarylight"></i> <!--to change icon design-->
        <span>
          {{ store.customer?.nrc }}
        </span>
      </span>
    </div>

    <div class="grid grid-cols-2 gap-4 mt-4">
      <span class="text-sm">
        <i class="pi pi-phone mr-2 text-primarylight"></i> <!--to change icon design-->
        <span>
          {{ store.customer?.phone }}
        </span>
      </span>
      <span class="text-sm flex items-center">
        <i class="pi pi-envelope mr-2 text-primarylight"></i> <!--to change icon design-->
        <span class="text-wrap break-words">
          {{ store.customer?.email }}
        </span>
      </span>
    </div>
  </div>
</template>
