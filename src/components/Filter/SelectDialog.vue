<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  selectFilterItems: Object,
});

console.log(props.selectFilterItems);
</script>

<template>
  <Dialog
    modal
    :header="selectFilterItems?.name"
    :style="{ width: '25rem' }"
    class="!rounded-lg !border-muted"
  >
    <div class="card flex flex-col justify-center">
      <div
        v-for="(item, index) in selectFilterItems.list"
        :key="index"
        class="flex items-center gap-2 leading-10"
      >
        <Checkbox
          :inputId="`checkbox-${index}`"
          :value="item.type"
          v-model="selectFilterItems.value"
          binary
          class="mr-2"
          inputStyle="border-primary border-2 rounded-md"
        />
        <label :for="`checkbox-${index}`" class="text-accentblack">{{
          item.value
        }}</label>
      </div>
    </div>
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
:deep(.p-checkbox) {
  @apply border-muted  drop-shadow-sm shadow-sm rounded-md;
  border-width: 0.09rem;
}
</style>
