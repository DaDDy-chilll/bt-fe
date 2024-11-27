<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  selectFilterItems: Object,
});

const selectedFilter = ref([]);

const emit = defineEmits(['updateFilter']);




const applyFilter = () => {
  emit('updateFilter', selectedFilter.value);
};
</script>

<template>
    <div class="card flex flex-col justify-center">
    <div
      v-for="(item, index) in selectFilterItems?.filterItems.list"
      :key="index"
      class="flex items-center gap-2 my-2"
      >
        <Checkbox
          :inputId="`checkbox-${index}`"
          :value="item?.id"
          v-model="selectedFilter"
          binary
          class="mr-2"
          inputStyle="border-primary border-2 rounded-md"
        />
        <label :for="`checkbox-${index}`" class="text-accentblack text-sm">{{
          item?.value
        }}</label>
      </div>
    </div>
<!-- <div class="mt-3 flex justify-end">
    <Button
      label="Apply"
      class="bg-primarylight px-4 py-1 text-accentwhite text-xs hover:bg-primary"
      @click="applyFilter"
    />
    </div> -->
</template>

<style scoped>
:deep(.p-checkbox) {
  @apply border-muted  drop-shadow-sm shadow-sm rounded-md;
  border-width: 0.09rem;
}
</style>
