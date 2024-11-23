<script setup lang="ts">
const isLight = ref<boolean>(true);
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-cover bg-center p-5 bg-light_img dark:bg-dark_img">
    <slot />
  </div>
</template>
