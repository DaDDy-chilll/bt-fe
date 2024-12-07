<script setup lang="ts">
import { ref, onMounted } from 'vue';
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

//dark mode
const isDark = ref(false);

/**
 * Toggle dark mode
 * @author Ko Ko Zay
 * @param {void}
 * @returns {void}
 */
 const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    console.log('dark mode');
    document.documentElement.classList.add('dark');
    localStorage.setItem('darkMode', 'true');
  } else {
    console.log('light mode');
    document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', 'false');
  }
};

// Dark mode initialization
onMounted(() => {
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode === 'true' || (!savedDarkMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    console.log('dark mode');
    isDark.value = true;
    document.documentElement.classList.add('dark');
  }
});
</script>

<template>
  <div class="bg-primary text-accentwhite h-11 px-10 flex justify-end items-center">
    <div class="icons">
      <Button
        @click="toggleDarkMode"
        :icon="isDark ? 'pi pi-sun' : 'pi pi-moon'"
        class="p-button-rounded p-button-text !text-accentwhite"
      />
      <Button icon="pi pi-bell" class="p-button-rounded p-button-text !text-accentwhite" />
      <Button icon="pi pi-user" class="p-button-rounded p-button-text !text-accentwhite" />
    </div>
  </div>
</template>

<style scoped>
</style>
