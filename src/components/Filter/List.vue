<script setup>
import { ref } from "vue";

const props = defineProps({
  filterItems: Object,
});

const op = ref();
const textop = ref();
const selectop = ref();
const textFilterItem = ref();
const selectFilterItem = ref();


/**
 * toggle filter
 * @param {Object} event
 */
const toggleFilter = (event) => {
  op.value.toggle(event);
};

/**
 * type filter
 * @param {Object} item
 */
const toggleTypeFilter = (event, item) => {
  if (item.type === "text") {
    textFilterItem.value = item;
    textop.value.toggle(event);
  } else if (item.type === "select") {
    selectFilterItem.value = item;
    selectop.value.toggle(event);
  }
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
        @click="toggleTypeFilter($event, item)"
      />
    </div>

    <!-- text filter -->
    <Popover ref="textop" class="!border-muted border">
      <filter-text-dialog :textFilterItems="textFilterItem" />
    </Popover>
    <!-- select filter -->
    <Popover ref="selectop" class="!border-muted border">
      <filter-select-dialog :selectFilterItems="selectFilterItem" />
    </Popover>
  </div>

  <Popover ref="op" class="!text-accentblack !border-muted border px-2">
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
      <label :for="item.name" class="text-accentblack">{{ item.name }}</label>
    </div>
  </Popover>
</template>

<style scoped>
:deep(.p-checkbox-checked .p-checkbox-box) {
  @apply !bg-primarylight;
}

:deep(.p-checkbox) {
  @apply border-muted  drop-shadow-sm shadow-sm rounded-md;
  border-width: 0.09rem;
}
</style>
