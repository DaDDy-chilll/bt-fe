<template>
  <div>
    <p class="text-accentblack my-2 px-6 py-3 float-left text-xl">
      {{ title }}
    </p>
    <div
      class="px-6 flex flex-col md:flex-row items-center justify-between w-full mt-8"
    >
      <div
        class="flex flex-col md:flex-row w-full md:w-auto space-y-4 md:space-y-0 md:space-x-8 font-semibold text-center"
      >
        <NuxtLink
          v-for="link in links"
          :to="link.path"
          class="hover:text-primarylight"
        >
          {{ link.name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  links: {
    name: string;
    path: string;
  }[];
}>();
</script>

<style scoped>
.router-link-exact-active {
  color: #42acd5;
  text-decoration: underline;
  text-underline-offset: 10px;
  text-decoration-thickness: 2px;
}
</style>
