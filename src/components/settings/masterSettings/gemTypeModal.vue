<script setup lang="ts">
import { ref, watch, onBeforeMount } from "vue";
import type { GemType } from "../../../types/gemType";
//import gemTypes from "../../../pages/settings/masterSettings/gemTypes.json";
import { useMasterSettingsStore } from "@/stores/masterSettings";

//store
const masterSettingsStore = useMasterSettingsStore();

//state
const gem_colors = ref([]);
//const gem_icons = ref([]);

//variables
const previewImage = ref("");

//props
const props = defineProps<{
  displayModal: boolean;
  modalType: string;
  modalId: number;
  formData: GemType;
}>();

//initializing formData
const formData = ref<{
  id: number;
  name: string;
  color_id: number;
  icon_id: number;
  icon_path: string;
}>({
  id: 0,
  name: "",
  color_id: 0,
  icon_id: 0,
  icon_path: "",
});

/***Fetching data start ***/
const loadData = async () => {
  try {
    const data = await masterSettingsStore.getGemColors();
    gem_colors.value = Array.isArray(data.value.data) ? data.value.data : [];
  } catch (error) {
    console.log(error);
  }
};

// const loadIcons = async () => {
//   try {
//     const data = await masterSettingsStore.getGemIcons();
//     gem_icons.value = Array.isArray(data.value.data) ? data.value.data : [];
//     console.log(gem_icons.value, "gem_icons");
//   } catch (error) {
//     console.log(error);
//   }
// };

//temp icon data for testing // to confirm with backend
const gem_icons = ref([
  { id: 1, icon_path: "/_nuxt/assets/images/Diamond.png" },
  { id: 2, icon_path: "/_nuxt/assets/images/Jade.png" },
  { id: 3, icon_path: "/_nuxt/assets/images/Crystal.png" },
  { id: 4, icon_path: "/_nuxt/assets/images/Sapphire.png" },
]);

onBeforeMount(() => {
  loadData();
  //loadIcons();
});
/***Fetching data end ***/

//watches
//watch for displayModal changes
watch(
  () => props.displayModal,
  (newVal) => {
    console.log(newVal, "newVal");
    if (newVal && props.modalType === "edit") {
      console.log(props.formData);
      formData.value = {
        name: props.formData.name,
        color_id: props.formData.color_id,
        icon_id: props.formData.icon_id,    
        icon_path: gem_icons.value.find((icon) => icon.id === props.formData.icon_id)?.icon_path || '',
        id: props.modalId,
      };
    } else if (!newVal) {
      formData.value = {
        name: "",
        color_id: 0,
        icon_id: 0,
        icon_path: "",
        id: 0,
      };
    }
  }
);

//watch for icon_id changes
watch(
  () => formData.value.icon_id,
  (newVal) => {
    if (newVal === 0) {
      formData.value.icon_path = 'upload';
    } else {
      formData.value.icon_path = gem_icons.value.find((icon) => icon.id === newVal)?.icon_path || '';
    }
  }
);

//emits
const emit = defineEmits([
  "update:displayModal",
  "addGemType",
  "updateGemType",
]);

/*** functions ***/
const addGemType = () => {
  //TODO: save icon to server (try catch)
  //if icon is upload, save the preview image to the icon field
  if (previewImage.value && formData.value.icon_id === 0) {
    formData.value.icon_path = previewImage.value;
  }
  emit("addGemType", formData.value);
  closeModal();
};

const updateGemType = () => {
  //TODO: save icon to server ( try catch)
  //if icon is upload, save the preview image to the icon field
  if (previewImage.value && formData.value.icon_id === 0) {
    formData.value.icon_path = previewImage.value;
  }
  emit("updateGemType", formData.value, props.modalId);
  closeModal();
};

const closeModal = () => {
  emit("update:displayModal", false);
};

/**
 * Handle image upload
 * @param event
 * @author Aye Nadi
 * @returns void
 */
const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    previewImage.value = URL.createObjectURL(file);
    formData.value.icon_path = previewImage.value;
  }
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
            <InputText v-model="formData.name" type="text" class="w-full p-2" />
            <label
              for="on_label"
              class="text-sm text-label dark:text-accentwhite dark:bg-primarydark"
              >Gem Name</label
            >
          </div>
        </FloatLabel>
      </div>
      <!--Gem Color-->
      <div class="mt-4">
        <FloatLabel variant="on">
          <Select
            v-model="formData.color_id"
            inputId="on_label"
            :options="gem_colors.map((color:any) => ({ label: color.name, value: color.id }))"
            optionLabel="label"
            optionValue="value"
            class="w-full border border-accentblack h-10 dropdown-svg-white"
          >
          </Select>
          <label
            for="on_label"
            class="text-sm text-label dark:text-accentwhite dark:bg-primarydark"
            >Gem Color</label
          >
        </FloatLabel>
      </div>
      <!--Gem Icon-->
      <div class="mt-4">
        <FloatLabel variant="on">
          <Select
            v-model="formData.icon_id"
            inputId="on_label"
            :options="[
              { id: 0, label: 'Upload New Icon' },
              ...gem_icons.map(icon => ({ 
                id: icon.id, 
                label: `Icon ${icon.id}`,
                icon_path: icon.icon_path 
              }))
            ]"
            optionLabel="label"
            optionValue="id"
            class="w-full border border-accentblack h-10 dropdown-svg-white"
          >
            <template #option="slotProps">
              <div class="flex items-center gap-2">
                <img
                  v-if="slotProps.option.icon_path"
                  :src="slotProps.option.icon_path"
                  :alt="`Icon ${slotProps.option.id}`"
                  class="w-4 h-4 object-contain"
                />
                <span v-if="slotProps.option.label === 'Upload New Icon'">New Icon</span>
              </div>
            </template>
            <template #value="slotProps">
              <div class="flex items-center gap-2">
                <img
                  v-if="formData.icon_path && formData.icon_path !== 'upload'"
                  :src="formData.icon_path"
                  alt="Selected icon"
                  class="w-4 h-4 object-contain"
                />
                <!-- <span v-if="formData.icon_id === 0">New Icon</span>
                <span v-else>Icon {{ formData.icon_id }}</span> -->
              </div>
            </template>
          </Select>
          <label
            for="on_label"
            class="text-sm text-label dark:text-accentwhite dark:bg-primarydark"
            >Gem Icon</label
          >
        </FloatLabel>
        <!--Upload Icon Area-->
        <div
          v-if="formData.icon_path === 'upload'"
          class="mt-4 flex flex-col items-center"
        >
          <p class="text-sm text-label">Upload Icon</p>
          <div
            class="relative w-1/2 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-primarylight dark:hover:border-accent2"
          >
            <input
              type="file"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
              @change="handleImageUpload"
            />
            <div class="flex flex-col items-center gap-2">
              <template v-if="!previewImage">
                <i class="pi pi-upload text-2xl text-gray-400"></i>
                <span class="text-sm text-gray-500">Click to upload icon</span>
              </template>
              <template v-else>
                <img
                  :src="previewImage"
                  alt="Preview"
                  class="w-16 h-16 object-contain"
                />
                <span class="text-sm text-gray-500">Click to change icon</span>
              </template>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2 text-sm">
          <button
            @click="modalType === 'edit' ? updateGemType() : addGemType()"
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
