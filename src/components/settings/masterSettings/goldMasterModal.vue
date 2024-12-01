<script setup lang="ts">
import { ref, watch } from 'vue';
import type { GoldTypes } from '~/types/goldTypes';

const internalDisplayModal = ref(false);

const formData = ref({
    id: 0,
    name: '',
});

/********** props **********/
const props = defineProps<{
    displayModal: boolean;
    gold_types_model: GoldTypes[];
    modalType: string;
    modalId: number;
    formData: GoldTypes;
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
        name: props.formData.name.replace('K', '').replace('k', ''),
        id: 1
      };
    } else if (!newVal) {
      formData.value = {
        name: '',
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
      const name = newVal.name.replace('K', '').replace('k', '');
      formData.value = {
        name: name.toString(),
        id: 1
      };
    }
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
  emit('addGoldType', { ...formData.value });
}

/**
 * Update the gold type
 * @author Aye Nadi
 * @returns void
 */
const updateGoldType = () => {
  emit('updateGoldType', { ...formData.value, id: props.modalId });
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
                v-model="formData.id"
                inputId="unit_label"
                :options="[{id: 1, name: 'K'}, {id: 2, name: 'K'}]"
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
