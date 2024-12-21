<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import type { TodayGold } from '~/types/todayGold';
import type { GoldUnits } from '~/types/goldUnits';
import type { GoldTypes } from '~/types/goldTypes';

// Props definition
const props = defineProps<{
  displayModal: boolean;
  gold_units_model: GoldUnits[];
  today_gold_model: TodayGold[];
  gold_types_model: GoldTypes[];
  modalType: string;
  formData: TodayGold;
  modalId: number;
}>();

console.log(props.gold_types_model);

// Emits definition
const emit = defineEmits(['update:displayModal', 'addTodayGold', 'update:modalType', 'updateTodayGold', 'update:formData']);

// Remove the computed formData and use a local ref instead
const localFormData = ref<TodayGold>({
  id: 0,
  gold_types_id: 0,
  gold_weight: '',
  ygea_price: 0,
  pyinpa_price: 0,
  other_price: 0,
  default: 0,
  unit_id: props.gold_units_model[0]?.id || 0,
});

// Reset form data on modal close
const resetForm = () => {
  localFormData.value = {
    id: 0,
    gold_types_id: 0,
    gold_weight: '',
    ygea_price: 0,
    pyinpa_price: 0,
    other_price: 0,
    default: 0,
    unit_id: props.gold_units_model[0]?.id || 0,
  };
};
// Watch for modalType changes
watch(
  () => props.modalType,
  (newModalType) => {
    if (newModalType === 'edit' && props.formData) {
      localFormData.value = { ...props.formData };
    } else if (newModalType === 'add') {
      resetForm();
    }
  },
  { immediate: true }
);

// Watch for formData changes
watch(() => props.formData, (newFormData) => {
  if (props.modalType === 'edit' && newFormData) {
    localFormData.value = { ...newFormData };
  }
});

/********** functions **********/
/**
 * Update the today gold
 * @param id - The ID of the today gold to update
 * @author Aye Nadi
 * @returns void
 */
const updateTodayGold = (id: number) => {
  emit('updateTodayGold', { ...localFormData.value, id });
  closeModal();
};

/**
 * Add the today gold
 * @author Aye Nadi
 * @returns void
 */
const addItem = () => {
  emit('addTodayGold', { ...localFormData.value });
  closeModal();
};

/**
 * Close the modal and reset the form
 * @author Aye Nadi
 * @returns void
 */
const closeModal = () => {
  emit('update:displayModal', false);
  emit('update:modalType', '');
  resetForm();
};
</script>

<template>
  <div class="text-sm">
    <!--Modal-->
    <Dialog
      :visible="displayModal"
      header="Today Gold Master"
      :style="{ width: '25rem', borderRadius: '10px' }"
      :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
      :closable="false"
    >
      <div class="flex flex-col gap-4">
        <input type="hidden" v-model="localFormData.id" />
        <!--Gold Type-->
        <div class="mt-4">
          <FloatLabel variant="on">
            <Select
              v-model="localFormData.gold_types_id"
              inputId="on_label"
              :options="gold_types_model"
              optionLabel="name"
              optionValue="id"
              class="w-full border border-accentblack h-10 dropdown-svg-white"
            />
            <label for="on_label" class="text-sm text-label dark:text-accentwhite dark:bg-primarydark">Gold Type</label>
          </FloatLabel>
        </div>
        <!--Gold Weight-->
        <div class="mt-4 border border-accentblack rounded-md">
          <FloatLabel variant="on">
            <div class="flex items-center w-auto h-10 rounded-md">
              <InputText
                id="weight_label"
                v-model="localFormData.gold_weight"
                class="h-10 rounded-l-md rounded-r-none pl-2 w-full"
              />
              <label for="weight_label" class="text-sm text-label dark:text-accentwhite dark:bg-primarydark"
                >Gold Weight</label
              >
              <Select
                v-model="localFormData.unit_id"
                inputId="unit_label"
                :options="(gold_units_model.filter((unit)=>unit.type===1)).map((unit)=>({id:unit.id,name:unit.symbol}))"
                optionLabel="name"
                optionValue="id"
                class="bg-gray-300 text-accentwhite rounded-l-none rounded-r-md unit"
              />
              <label for="unit_label" class="text-sm text-label dark:text-accentwhite dark:bg-primarydark">Unit</label>
            </div>
          </FloatLabel>
        </div>
        <!--YGEA Price-->
        <div class="mt-4">
          <FloatLabel variant="on">
            <InputNumber
              v-model="localFormData.ygea_price"
              class="w-full h-10 border border-accentblack rounded-lg px-2"
            />
            <label for="ygea_price_label" class="text-sm text-label dark:text-accentwhite dark:bg-primarydark"
              >YGEA Price(optional)</label
            >
          </FloatLabel>
        </div>
        <!--Pyin Pa Price-->
        <div class="mt-4">
          <FloatLabel variant="on">
            <InputNumber
              v-model="localFormData.pyinpa_price"
              class="w-full h-10 border border-accentblack rounded-lg px-2"
            />
            <label for="pyin_pa_price_label" class="text-sm text-label dark:text-accentwhite dark:bg-primarydark"
              >Pyin Pa Price(optional)</label
            >
          </FloatLabel>
        </div>
        <!--Other Price-->
        <div class="mt-4">
          <FloatLabel variant="on">
            <InputNumber
              v-model="localFormData.other_price"
              class="w-full h-10 border border-accentblack rounded-lg px-2"
            />
            <label for="other_price_label" class="text-sm text-label dark:text-accentwhite dark:bg-primarydark"
              >Other Price(optional)</label
            >
          </FloatLabel>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2 text-sm">
          <button
            @click="
              modalType === 'add' ? addItem() : updateTodayGold(localFormData.id)
            "
            class="px-4 py-2 rounded-md bg-primarylight dark:bg-accent2 text-white hover:bg-opacity-90"
          >
            {{ modalType === 'add' ? 'ADD' : 'UPDATE' }}
          </button>
          <button
            @click="closeModal"
            class="px-4 py-2 rounded-md border border-primarylight dark:border-accentwhite text-primarylight dark:text-accentwhite hover:bg-primarylight hover:bg-opacity-10"
          >
            Cancel
          </button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<style>
.p-dialog {
  @apply dark:bg-primarydark dark:text-accentwhite;
  border-radius: 20px;
}


</style>

<style scoped>
:deep(.p-inputtext) {
  @apply dark:bg-primarydark;
  @apply dark:text-accentwhite;
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
