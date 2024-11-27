<script setup>
import { ref } from "vue";


const props = defineProps({
  gem: Object,
  gemTypes: Array,
  gemColors: Array,
  gemMassUnits: Array,
});

const emit = defineEmits(["addGem"]);

const gem = ref(props.gem);


const addGem = () => {

  emit("addGem", gem.value);
};
</script>

<template>
  <!-- Gem Type -->
  <FloatLabel variant="on" class="my-2">
    <Select
      v-model="gem.type"
      inputId="on_label"
      :options="gemTypes"
      optionLabel="value"
      optionValue="id"
      class="w-full border h-10 dropdown-svg-white"
    />
    <label for="on_label" class="text-sm text-label">Gem Type</label>
  </FloatLabel>
  <!-- Gem Type -->
  <FloatLabel variant="on" class="my-4">
    <Select
      v-model="gem.color"
      inputId="on_label"
      :options="gemColors"
      optionLabel="value"
      optionValue="id"
      class="w-full border h-10 dropdown-svg-white"
    />
    <label for="on_label" class="text-sm text-label">Gem Color</label>
  </FloatLabel>
  <!-- Gem Type -->
  <FloatLabel variant="on" class="my-4">
    <div class="flex items-center h-10">
      <InputNumber
        id="length_label"
        v-model="gem.mass"
        class="border h-10 rounded-l-md rounded-r-none pl-2 w-full"
      />
      <label for="length_label" class="text-sm text-label">Gem Mass</label>
      <Select
        v-model="gem.massUnit"
        :options="gemMassUnits"
        optionLabel="value"
        optionValue="id"
        class="bg-primarylight text-accentwhite rounded-l-none rounded-r-md unit"
      />
    </div>
  </FloatLabel>
  <!-- Gem Type -->
  <FloatLabel variant="on" class="my-4">
    <InputNumber
      id="on_label"
      v-model="gem.pieces"
      class="border w-full h-10 pl-2"
    />
    <label for="on_label" class="text-sm text-label">Gem Pieces</label>
  </FloatLabel>
  <!-- Gem Type -->
  <FloatLabel variant="on" class="my-4">
    <InputNumber
      id="on_label"
      v-model="gem.price"
      class="border w-full h-10 pl-2"
    />
    <label for="on_label" class="text-sm text-label">Gem Price</label>
  </FloatLabel>
  <div class="flex justify-end gap-2 w-full mt-6">
    <Button
      type="button"
      label="Discard"
      severity="secondary"
      @click="addGermVisible = false"
      class="bg-accentwhite border text-sm text-red-500 border-red-500 px-4 py-2 mr-auto"
    ></Button>
    <Button
      type="button"
      label="Add Gem"
      class="bg-primarylight px-4 py-2 text-sm text-accentwhite float-right"
      @click="addGem"
    ></Button>
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

:deep(.dropdown-svg-white .p-select-dropdown > svg) {
  @apply text-accentblack;
}

:deep(.p-select-dropdown) {
  @apply text-accentblack;
  @apply flex items-center justify-center w-6 pr-3;
}

:deep(.unit .p-select-label) {
  @apply pl-2 pr-0;
  @apply w-10;
}

:deep(.dropdown-svg-white .p-select-label) {
  @apply text-secondarydark;
}

</style>
