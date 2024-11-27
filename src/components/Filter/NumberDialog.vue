<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  textFilterItems: Object,
});

const minValue = ref(0);
const maxValue = ref(0);

</script>

<template>
  <FloatLabel variant="on" class="mt-1.5">
    <InputNumber
      id="text_input"
      v-model="minValue"
      class="border w-full h-10 pl-2"
    />
    <label for="text_input" class="text-sm text-label">
      Min
    </label>
  </FloatLabel>
   <FloatLabel variant="on" class="mt-1.5">
    <InputNumber
      id="text_input"
      v-model="maxValue"
      class="border w-full h-10 pl-2"
    />
    <label for="text_input" class="text-sm text-label">
      Max
    </label>
  </FloatLabel>
  <div class="mt-6 flex justify-end">
    <Button
      label="Apply"
      class="bg-primarylight px-4 py-2 text-accentwhite"
      @click="applyFilter"
    />
  </div>
</template>

<style scoped>
:deep(.p-select-label, .p-placeholder) {
  @apply text-accentwhite;
}
:deep(.p-select-dropdown > svg) {
  @apply text-accentwhite;
}

:deep(.p-select-option) {
  @apply text-accentwhite;
}
:deep(.p-select-dropdown) {
  @apply text-accentblack;
  @apply flex items-center justify-center w-6 pr-3;
}

</style>
