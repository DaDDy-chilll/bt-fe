<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  textFilterItems: Object,
});

console.log(props.textFilterItems);

// const selectedOption = ref([
//   { label: "Contains", value: "Contains" },
// ]);
</script>

<template>
  <Dialog
    v-model:visible="textFilter"
    modal
    :header="textFilterItems?.name"
    :style="{ width: '25rem' }"
    class="!rounded-lg !border-muted"
  >
  <!-- <FloatLabel variant="on" class="my-0">
    <Select
      v-model="textFilterItems.type"
      inputId="on_label"
      :options="selectedOption"
      optionLabel="label"
      optionValue="value"
      class="w-full border h-10 dropdown-svg-white"
    />
    <label for="select_input" class="text-sm text-label"></label>
  </FloatLabel> -->
  <FloatLabel variant="on" class="mt-1.5">
    <InputText
      id="text_input"
      v-model="textValue"
      class="border w-full h-10 pl-2"
    />
    <label for="text_input" class="text-sm text-label">
      {{ textFilterItems.type }}
    </label>
  </FloatLabel>
  <div class="mt-6 flex justify-end">
    <Button
      label="Apply"
      class="bg-primarylight px-4 py-2 text-accentwhite"
      @click="applyFilter"
    />
    </div>
  </Dialog>
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
