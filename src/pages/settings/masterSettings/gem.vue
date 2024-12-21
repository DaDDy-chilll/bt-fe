<script setup lang="ts">
import MasterNavBar from "@/components/settings/masterSettings/master-nav-bar.vue";
import { ref } from "vue";
//import gemTypes from "./gemTypes.json";
import type { GemType } from "@/types/gemType";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Popover from "primevue/popover";
import AddIcon from "~/assets/icons/add_icon.vue";
import GemTypeModal from "@/components/settings/masterSettings/gemTypeModal.vue";
import { reactive } from "vue";
import { useMasterSettingsStore } from "@/stores/masterSettings";

//store
const masterSettingsStore = useMasterSettingsStore();

//state
const gem_types = ref([]);
const displayModal = ref(false);
const modalType = ref("add");
const modalId = ref(0);
const blockScreen = ref(false);

// Ref to hold multiple popovers dynamically
const popovers = reactive<Record<number, any>>({});

/***Fetching data start ***/
const loadData = async () => {
  try{
    blockScreen.value = true;
   const data = await masterSettingsStore.getGemTypes();
   gem_types.value = Array.isArray(data.value.data) ? data.value.data : [];
   console.log(gem_types.value, "gem_types");
  }catch(error){
    console.log(error);
  }
  finally{
    blockScreen.value = false;
  }

};

onMounted(() => {
  loadData();
});
/***Fetching data end ***/

//model variables
const formData = ref<GemType>({
  id: 0,
  name: "",
  color_id: 0,
  icon: "",
});

/*** functions ***/
const editGemType = (id: number) => {
  modalType.value = "edit";
  modalId.value = id;
  displayModal.value = true;
  // update formData
  formData.value = gem_types.value.find((gem:GemType) => gem.id === id);
};

const deleteGemType = (id: number) => {
  //remove gem type
  gem_types.value = gem_types.value.filter((gem: GemType) => gem.id !== id);
  //remove popover
  delete popovers[id];
};

const addGemType = (data: GemType) => {
  //api call - try catch
  //add gem type
  //update model
  gem_types.value.push(data);
};

const updateGemType = (data: GemType, id: number) => {
  modalType.value = "edit";
  modalId.value = id;
  displayModal.value = true;

  //update gem_types
  gem_types.value = gem_types.value.map((gem) => (gem.id === id ? data : gem));
};

/**
 * Toggle the popover
 * @param event - The event that triggered the toggle
 * @param id - The ID of the popover to toggle
 * @author Aye Nadi
 * @returns void
 */
const toggle = (event: MouseEvent, id: number) => {
  const popoverRef = popovers[id];
  if (popoverRef) {
    popoverRef.toggle(event);
  } else {
    console.warn(`Popover reference missing for ID: ${id}`);
  }
};

/**
 * Close the popover
 * @param id - The ID of the popover to close
 * @author Aye Nadi
 * @returns void
 */
const closePopover = (id: number) => {
  const popoverRef = popovers[id];
  if (popoverRef) {
    popoverRef.hide();
  } else {
    console.warn(`Popover reference missing for ID: ${id}`);
  }
};
</script>

<template>
  <div>
    <MasterNavBar />
    <div class="px-6 drop-shadow-md rounded-lg">
      <div class="flex md:justify-end items-center justify-start">
        <button
          @click="(modalType = 'add'), (displayModal = true)"
          class="bg-primarylight dark:bg-accent2 text-white px-4 py-2 rounded-md mt-8 mb-8"
        >
          <span class="flex items-center gap-2">
            <AddIcon />
            Add
          </span>
        </button>
      </div>
      <!--table-->
      <div class="w-full">
        <div class="overflow-x-auto">
          <DataTable
            :value="gem_types"
            stripedRows
            class="w-full text-sm"
            scrollable
            :resizableColumns="true"
            columnResizeMode="fit"
            showGridlines
            paginator
            :rows="14"
            :rowsPerPageOptions="[5, 10, 20]"
            :totalRecords="gem_types.length"
            responsiveLayout="scroll"
            breakpoint="sm"
          >
            <!--No-->
            <Column field="no" header="No" class="w-[15%] dark:bg-primarydark dark:text-accentwhite">
              <template #body="slotProps">
                {{ slotProps.index + 1 }}
              </template>
            </Column>
            <!--Gem Type-->
            <Column field="name" header="Gem Type" class="w-[20%] dark:bg-primarydark dark:text-accentwhite">
              <template #body="slotProps">
                {{ slotProps.data.name }}
              </template>
            </Column>
            <!--Gem color-->
            <Column field="color_id" header="Gem Color" class="w-[20%] dark:bg-primarydark dark:text-accentwhite">
              <template #body="slotProps">
                {{ slotProps.data.m_colors.name }}
              </template>
            </Column>
            <!--Icon-->
            <Column field="icon" header="Icon" class="w-[20%] dark:bg-primarydark dark:text-accentwhite">
              <template #body="slotProps">
                <img
                  :src="slotProps.data.m_gem_icons.icon_path"
                  alt="icon"
                  class="w-4 h-4 object-contain"
                />
              </template>
            </Column>
            <!--Action-->
            <Column
              field="action"
              header="Action"
              class="w-[10%] dark:bg-primarydark dark:text-accentwhite"
              alignFrozen="right"
              frozen
            >
              <template #body="slotProps">
                <Button
                  icon="pi pi-ellipsis-v"
                  class="text-primarylight dark:text-accent2"
                  @click="(e) => toggle(e, slotProps.data.id)"
                />
                <Popover
                  :key="slotProps.data.id"
                  :ref="
                    (el) => {
                      if (el) {
                        popovers[slotProps.data.id] = el;
                      }
                    }
                  "
                  appendTo="body"
                  class="bg-primarylight dark:bg-accent2 text-accentwhite sm:w-32"
                >
                  <div class="flex flex-col gap-4 justify-start items-start">
                    <Button
                      label="Edit"
                      icon="pi pi-pencil"
                      @click="
                        (e) => {
                          editGemType(slotProps.data.id);
                          closePopover(slotProps.data.id);
                        }
                      "
                    />
                    <Button
                      label="Delete"
                      icon="pi pi-trash"
                      @click="deleteGemType(slotProps.data.id)"
                    />
                  </div>
                </Popover>
              </template>
            </Column>
          </DataTable>
        </div>
        <GemTypeModal
          :displayModal="displayModal"
          @update:displayModal="displayModal = $event"
          :gem_types="gem_types"
          @addGemType="addGemType"
          :modalType="modalType"
          :modalId="modalId"
          @update:modalType="modalType = $event"
          @updateGemType="updateGemType"
          :formData="formData"
        />
      </div>
    </div>
  </div>
  <BlockUI :blocked="blockScreen" fullScreen>
    <div
      class="fixed inset-0 flex justify-center items-center"
      v-show="blockScreen"
    >
      <ProgressSpinner />
    </div>
  </BlockUI>
</template>

<style scoped>
:deep(.p-paginator) {
  @apply dark:bg-primarydark;
  @apply dark:text-accentwhite;
}

 :deep(.p-paginator-rpp-dropdown) {
    @apply dark:bg-transparent;
    @apply dark:text-accentwhite;
    @apply dark:border-1 dark:border-b-gray-400;
  }

  :deep(.p-select-label) {
    @apply dark:text-accentwhite;
  }

  :deep(.p-datatable-empty-message) {
    @apply dark:bg-transparent;
  }

  </style>
