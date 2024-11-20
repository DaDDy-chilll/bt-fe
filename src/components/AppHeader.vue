<script setup lang="ts">
import { ref } from 'vue';
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import 'primeicons/primeicons.css'


const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-fw pi-home',
  },
  {
    label: 'Settings',
    icon: 'pi pi-fw pi-cog',
  },
  // Add more items as needed
]);
</script>

<template>
  <div class="bg-primary text-accentwhite h-11 px-10 flex justify-end items-center">
    <div class="icons">
      <Button icon="pi pi-moon"  class="p-button-rounded p-button-text !text-accentwhite"  />
      <Button icon="pi pi-bell" class="p-button-rounded p-button-text !text-accentwhite" />
      <Button icon="pi pi-user" class="p-button-rounded p-button-text !text-accentwhite" />
    </div>
  </div>
</template>

<style scoped>
</style>
