<script setup lang="ts">
import { ref, watch } from "vue";
import type { UnitType } from "../../../types/unitType";

//props
const props = defineProps<{
  displayModal: boolean;
  modalType: string;
  modalId: number;
  formData: UnitType;
}>();

const formData = ref<UnitType>({
  id: 0,
  name: "",
  type_id: 0,
  symbol: "",
});

//temp unit category data for testing
const unit_categories = ref([
  { id: 1, name: "Length" },
  { id: 2, name: "Mass" },
]);


//watches
//watch for displayModal changes
watch(
  () => props.displayModal,
  (newVal) => {
    if (newVal && props.modalType === 'edit') {
      formData.value = {
        name: props.formData.name,
        type_id: props.formData.type_id,
        symbol: props.formData.symbol,
        id: props.modalId
      };
      console.log(formData.value, "formData");
    } else if (!newVal) {
      formData.value = {
        name: '',
        type_id: 0,
        symbol: '',
        id: 0
      };
    }
  }
);

//watch for formData changes
watch(
  () => props.formData,
  (newVal) => {
    if (props.modalType === 'edit') {
      formData.value = {
        name: newVal.name,
        type_id: newVal.type_id,
        symbol: newVal.symbol,
        id: 1
      };
    }
  },
  { immediate: true }   
);


//emits
const emit = defineEmits([
  "update:displayModal",
  "addUnitType",
  "updateUnitType",
]);

/*** functions ***/
const addUnitType = () => {
  emit("addUnitType", formData.value);
};

const updateUnitType = () => {
  emit("updateUnitType", formData.value,props.modalId);
};

const closeModal = () => {
  emit("update:displayModal", false);
};
</script>

<template>
  <div>
    <Dialog
      v-model:visible="props.displayModal"
      :header="modalType === 'edit' ? 'Edit Unit Type' : 'Add Unit Type'"
      :style="{ width: '25rem' }"
      :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
      :closable="false"
    >
      <!--Unit Name-->
      <div class="mt-4 border border-accentblack rounded-md text-sm">
        <FloatLabel variant="on">
          <div class="flex items-center w-auto h-10 rounded-md">
            <InputText
              v-model="formData.name"
              type="text"
              class="w-full p-2"
            />
            <label for="on_label" class="text-sm text-label dark:text-accentwhite dark:bg-primarydark">Unit Name</label>
          </div>
        </FloatLabel>
      </div>
      <!--Unit Category-->
      <div class="mt-4">
          <FloatLabel variant="on">
            <Select
              v-model="formData.type_id"
              inputId="on_label"
              :options="unit_categories"
              optionLabel="name"
              optionValue="id"
              class="w-full border border-accentblack h-10 dropdown-svg-white"
            >       
            </Select>
            <label for="on_label" class="text-sm text-label dark:text-accentwhite dark:bg-primarydark">Unit Category</label>
          </FloatLabel>
      </div>
      <!--Unit Symbol-->
      <div class="mt-4 border border-accentblack rounded-md text-sm">
        <FloatLabel variant="on">
          <div class="flex items-center w-auto h-10 rounded-md">
            <InputText
              v-model="formData.symbol"
              type="text"
              class="w-full p-2"
            />
            <label for="on_label" class="text-sm text-label dark:text-accentwhite dark:bg-primarydark">Unit Symbol</label>
          </div>
        </FloatLabel>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2 text-sm">
          <button
            @click="modalType === 'edit' ? updateUnitType() : addUnitType()"
            class="px-4 py-2 rounded-md bg-primarylight dark:bg-accent2 text-white hover:bg-opacity-90"
          >
            {{ modalType === "edit" ? "UPDATE" : "ADD" }}
          </button>
          <button 
            @click="closeModal"
            class="px-4 py-2 rounded-md border border-primarylight dark:border-accent2 text-primarylight dark:text-accent2 hover:bg-primarylight hover:bg-opacity-10"
          >
            Cancel
          </button>
        </div>
      </template>
    </Dialog>
  </div>
</template>
<style scoped>
:deep(.p-inputtext) {
  @apply dark:bg-primarydark;
  @apply dark:text-accentwhite;
  @apply dark:border-1 dark:border-accentwhite;
}
:deep(.p-select) {
  @apply dark:bg-primarydark;
  @apply dark:border-1 dark:border-accentwhite;
  @apply h-10;
}
:deep(.p-select-label) {
  @apply dark:text-accentwhite;
  @apply dark:bg-primarydark;

}

:deep(.p-inputnumber) {
  @apply dark:border-1 dark:border-accentwhite;
  @apply dark:bg-primarydark;
}

:deep(.p-inputtext) {
  @apply dark:text-accentwhite;
}

:deep(#weight_label) {
  @apply dark:border-1 dark:border-accentwhite;
}
</style>