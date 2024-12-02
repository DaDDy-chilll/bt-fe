<script setup lang="ts">
import { ref, watch } from "vue";
import type { GemType } from "../../../types/gemType";
import gemTypes from "../../../pages/settings/masterSettings/gemTypes.json";

//props
const props = defineProps<{
  displayModal: boolean;
  modalType: string;
  modalId: number;
}>();

const formData = ref<GemType>({
  id: 0,
  name: "",
  color_id: 0,
  icon: "",
});

//temp color data for testing
const gem_colors = ref([
  { label: "Red", value: 1 },
  { label: "Blue", value: 2 },
  { label: "Green", value: 3 },
  { label: "Yellow", value: 4 },
  { label: "Purple", value: 5 },
  { label: "Orange", value: 6 },
  { label: "Pink", value: 7 },
  { label: "Brown", value: 8 },
  { label: "Gray", value: 9 },
]);

//temp icon data for testing
const gem_icons = ref([
  { label: "Diamond", icon: "/_nuxt/assets/images/Diamond.png" },
  { label: "Jade", icon: "/_nuxt/assets/images/Jade.png" },
  { label: "Crystal", icon: "/_nuxt/assets/images/Crystal.png" },
  { label: "Sapphire", icon: "/_nuxt/assets/images/Sapphire.png" },
]);

//watch
watch(
  () => props.displayModal,
  (newVal) => {
    if (newVal) {
      formData.value.id = props.modalId;
    }
  }
);

const emit = defineEmits([
  "update:displayModal",
  "addGemType",
  "updateGemType",
]);

/*** functions ***/
const addGemType = () => {
  emit("addGemType", formData.value);
};

const updateGemType = () => {
  emit("updateGemType", formData.value);
};

const closeModal = () => {
  emit("update:displayModal", false);
};
</script>

<template>
  <div>
    <Dialog
      v-model:visible="props.displayModal"
      :header="modalType === 'edit' ? 'Edit Gem Type' : 'Add Gem Type'"
      :style="{ width: '25rem' }"
      :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
      :closable="false"
    >
      <!--Gem Name-->
      <div class="mt-4 border border-accentblack rounded-md text-sm">
        <FloatLabel variant="on">
          <div class="flex items-center w-auto h-10 rounded-md">
            <InputText
              v-model="formData.name"
              type="text"
              class="w-full p-2"
              placeholder="Gem Name"
            />
          </div>
        </FloatLabel>
      </div>
      <!--Gem Color-->
      <div class="mt-4">
          <FloatLabel variant="on">
            <Select
              v-model="formData.color_id"
              inputId="on_label"
              :options="gem_colors"
              optionLabel="label"
              optionValue="value"
              class="w-full border border-accentblack h-10 dropdown-svg-white"
            >       
            </Select>
            <label for="on_label" class="text-sm text-label">Gem Color</label>
          </FloatLabel>
      </div>
      <!--Gem Icon-->
      <div class="mt-4">
        <FloatLabel variant="on">
            <Select
              v-model="formData.icon"
              inputId="on_label"
              :options="[{ label: 'Upload New Icon', icon: 'upload' }, ...gem_icons]"
              optionLabel="label"
              optionValue="icon"
              class="w-full border border-accentblack h-10 dropdown-svg-white"
            >
              <template #option="slotProps">
                <div class="flex items-center gap-2">
                  <img :src="slotProps.option.icon" :alt="slotProps.option.label" class="w-4 h-4 object-contain" />
                  <span>{{ slotProps.option.label }}</span>
                </div>
              </template>
              <template #value="slotProps">
                <div class="flex items-center gap-2">
                    <img v-if="slotProps.value && slotProps.value !== 'upload'" :src="slotProps.value" alt="Selected icon" class="w-4 h-4 object-contain" />
                    <span v-if="slotProps.value === 'upload'">Upload New Icon</span>
                    <span v-else>{{ gem_icons.find(icon => icon.icon === slotProps.value)?.label }}</span>
                  </div>
              </template>
            </Select>
            <label for="on_label" class="text-sm text-label">Gem Icon</label>
        </FloatLabel>
        <!--Upload Icon Area-->
        <div v-if="formData.icon === 'upload'" class="mt-4 flex flex-col items-center">
          <p class="text-sm text-label">Upload Icon</p>
          <div class="relative w-1/2 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primarylight">
            <input type="file" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
            <div class="flex flex-col items-center gap-2">
              <i class="pi pi-upload text-2xl text-gray-400"></i>
              <span class="text-sm text-gray-500">Click to upload icon</span>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2 text-sm">
          <button
            @click="modalType === 'edit' ? updateGemType() : addGemType()"
            class="px-4 py-2 rounded-md bg-primarylight text-white hover:bg-opacity-90"
          >
            {{ modalType === "edit" ? "UPDATE" : "ADD" }}
          </button>
          <button
            @click="closeModal"
            class="px-4 py-2 rounded-md border border-primarylight text-primarylight hover:bg-primarylight hover:bg-opacity-10"
          >
            Cancel
          </button>
        </div>
      </template>
    </Dialog>
  </div>
</template>
