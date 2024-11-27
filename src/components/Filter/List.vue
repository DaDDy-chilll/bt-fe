<script setup>
import { ref } from "vue";

const props = defineProps({
  filterItems: Object,
});

const op = ref();
const textFilter = ref(false);
const numberFilter = ref(false);
const dateFilter = ref(false);
const selectFilter = ref(false);

const toggleFilter = (event) => {
  op.value.toggle(event);
};

const textFilterItem = ref();
const selectFilterItem = ref();
const numberFilterItem = ref();

/**
 * type filter
 * @param {Object} item
 */
const typeFilter = (item) => {
  resetFilter();
  if (item.type === "text") {
    textFilter.value = true;
    textFilterItem.value = item.filterItems;
  } else if (item.type === "select") {
    selectFilter.value = true;
    selectFilterItem.value = item.filterItems;
  } else if (item.type === "number") {
    numberFilter.value = true;
    numberFilterItem.value = item.filterItems;
  }
};

/**
 * reset filter
 */
const resetFilter = () => {
  textFilter.value = false;
  selectFilter.value = false;
  numberFilter.value = false;
};
</script>

<template>
  <div class="flex flex-row flex-wrap gap-2 justify-start items-center mt-4">
    <Button
      icon="pi pi-filter-fill"
      @click="toggleFilter"
      class="text-primarylight py-2.5 px-4 text-xs rounded-border mr-3 border border-primarylight hover:bg-primarylight hover:text-accentwhite"
      iconPos="right"
    />

    <div
      class="flex flex-row flex-wrap gap-2 justify-start items-center"
      v-for="item in filterItems.filter((item) => item.isSelected)"
    >
      <Button
        :label="item.name"
        icon="pi pi-sort-down-fill"
        class="bg-primary text-accentwhite py-2.5 px-3 text-xs rounded-md flex justify-center items-center"
        iconPos="right"
        iconClass="p-0 mx-2"
        @click="typeFilter(item)"
      />
    </div>
    <!-- text filter -->
    <filter-text-dialog
      :textFilterItems="textFilterItem"
      v-model:visible="textFilter"
    />

    <!-- select filter -->
    <filter-select-dialog
      :selectFilterItems="selectFilterItem"
      v-model:visible="selectFilter"
    />

  </div>
  <Popover ref="op" class="!bg-primary text-accentwhite">
    <div
      v-for="item in filterItems"
      :key="item.name"
      class="flex items-center gap-2 leading-10"
    >
      <Checkbox
        size="small"
        :inputId="item.name"
        :value="item.name"
        v-model="item.isSelected"
        binary
        class="mr-2"
      />
      <label :for="item.name" class="text-accentwhite">{{ item.name }}</label>
    </div>
  </Popover>
</template>

<style scoped>
:deep(.p-checkbox-checked .p-checkbox-box) {
  @apply !bg-primarylight;
}
</style>
