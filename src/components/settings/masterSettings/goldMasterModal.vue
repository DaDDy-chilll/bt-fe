<script setup lang="ts">
import { ref, watch } from 'vue';
//import type { GoldTypes } from '~/types/goldTypes'; -- need to confirm
import goldUnits from "../../../pages/settings/masterSettings/goldUnits.json";
import type { GoldUnits } from "~/types/goldUnits";


//variables
const internalDisplayModal = ref(false);

//fetching data
const gold_units = goldUnits.goldUnits.filter((unit: GoldUnits) => unit.category === "gold_type");

//form data
const formData = ref({
    id: 0,
    name: '',
    unit_id: 0,
});

const gold_units_model = ref<GoldUnits[]>(gold_units);


/********** props **********/
const props = defineProps<{
    displayModal: boolean;
    gold_types_model: any[];
    modalType: string;
    modalId: number;
    formData: any;
}>();

/********** emits **********/
const emit = defineEmits(['update:displayModal', 'update:modalType', 'addGoldType', 'updateGoldType']);

/********** watch **********/
// Watch for displayModal changes
watch(
  () => props.displayModal,
  (newVal) => {
    internalDisplayModal.value = newVal;
    if (newVal && props.modalType === 'edit') {
      formData.value = {
        name: props.formData.name,
        unit_id: props.formData.unit_id,
        id: 1
      };
    } else if (!newVal) {
      formData.value = {
        name: '',
        unit_id: 0,
        id: 1
      };
    }
  }
);

// Watch for formData changes
watch(
  () => props.formData,
  (newVal) => {
    if (props.modalType === 'edit') {
      console.log(newVal, "newVal");
      formData.value = {
        name: newVal.name,
        unit_id: newVal.unit_id,
        id: 1
      };
    }
    console.log(formData.value, "formData");
  },
  { immediate: true }
);

// Watch for internalDisplayModal changes
watch(
  () => internalDisplayModal.value,
  (newVal) => {
    emit('update:displayModal', newVal);
  }
);

// Watch for modalType changes
watch(
  () => props.modalType,
  (newVal) => {
    emit('update:modalType', newVal);
  }
);

/********** functions **********/
/**
 * Add the gold type
 * @author Aye Nadi
 * @returns void
 */
const addGoldType = () => {
  console.log("addGoldType");
  if (formData.value.name === '') {
    alert("Please enter a valid gold type");
    return;
  }
  emit('addGoldType', { ...formData.value });
}

/**
 * Update the gold type
 * @author Aye Nadi
 * @returns void
 */
const updateGoldType = () => {
  emit('updateGoldType', { ...formData.value, id: props.modalId });
  internalDisplayModal.value = false;
}

/**
 * Close the modal
 * @author Aye Nadi
 * @returns void
 */
const closeModal = () => {
  internalDisplayModal.value = false;
}

</script>

<template>
  <div>
    <Dialog
      v-model:visible="internalDisplayModal"
      header="Gold Type"
      :style="{ width: '25rem' }"
      :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
      :closable="false"
    >
          <!--Gold Type-->
          <div class="mt-4 border border-accentblack rounded-md">
          <FloatLabel variant="on">
            <div class="flex items-center w-auto h-10 rounded-md">
              <InputText
                id="gold_type_label"
                v-model="formData.name"
                class="h-10 rounded-l-md rounded-r-none pl-2 w-full"
              />
              <label for="gold_type_label" class="text-sm text-label"
                >Gold Type</label
              >
              <Select
                v-model="formData.unit_id"
                inputId="unit_label"
                :options="gold_units_model"
                optionLabel="name"
                optionValue="id"
                class="bg-gray-300 text-accentwhite rounded-l-none rounded-r-md"
              />
            </div>
        </FloatLabel>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
          <button @click="modalType === 'edit' ? updateGoldType() : addGoldType()" class="px-4 py-2 rounded-md bg-primarylight text-white hover:bg-opacity-90">{{ modalType === 'edit' ? 'UPDATE' : 'ADD' }}</button>
          <button @click="closeModal" class="px-4 py-2 rounded-md border border-primarylight text-primarylight hover:bg-primarylight hover:bg-opacity-10">Cancel</button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<style scoped></style>
