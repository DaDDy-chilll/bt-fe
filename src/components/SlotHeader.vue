<template>
  <div class="flex justify-between items-center">
    <Button
      v-if="isBack"
      label="Back"
      icon="pi pi-arrow-left"
      class="bg-primarylight text-accentwhite px-4 py-2 rounded-md"
    />
    <p class="text-accentblack my-2 px-6 py-3 float-left text-xl">
      {{ title }}
    </p>
    <div class="float-right  mx-5">
      <NuxtLink v-if="button?.link" :to="button?.link">
        <Button
          :label="button?.label"
          class="w-full bg-primarylight px-3 text-accentwhite py-2 text-sm"
          :icon="button?.icon"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  button?: {
    label: string;
    link: string;
    icon: string;
  };
  isBack?: boolean;
}>();
</script>

<style scoped></style>
