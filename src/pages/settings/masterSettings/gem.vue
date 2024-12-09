<script setup lang="ts">
import MasterNavBar from "@/components/settings/masterSettings/master-nav-bar.vue";
import { ref } from "vue";
import gemTypes from "./gemTypes.json";
import type { GemType } from "@/types/gemType";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Popover from "primevue/popover";
import AddIcon from "~/assets/icons/add_icon.vue";
import GemTypeModal from "@/components/settings/masterSettings/gemTypeModal.vue";
import { reactive } from "vue";
//state
const displayModal = ref(false);
const modalType = ref("add");
const modalId = ref(0);
// Ref to hold multiple popovers dynamically
const popovers = reactive<Record<number, any>>({});

//fetching data
const gem_types = ref(gemTypes);

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
]);

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
  formData.value = gem_types.value.find((gem) => gem.id === id) as GemType;
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
          class="bg-primarylight text-white px-4 py-2 rounded-md mt-8 mb-8"
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
            <Column field="no" header="No" class="w-[15%]">
              <template #body="slotProps">
                {{ slotProps.index + 1 }}
              </template>
            </Column>
            <!--Gem Type-->
            <Column field="name" header="Gem Type" class="w-[20%]">
              <template #body="slotProps">
                {{ slotProps.data.name }}
              </template>
            </Column>
            <!--Gem color-->
            <Column field="color_id" header="Gem Color" class="w-[20%]">
              <template #body="slotProps">
                {{
                  gem_colors.find(
                    (color) => color.value === slotProps.data.color_id
                  )?.label
                }}
              </template>
            </Column>
            <!--Icon-->
            <Column field="icon" header="Icon" class="w-[20%]">
              <template #body="slotProps">
                <img
                  :src="slotProps.data.icon"
                  alt="icon"
                  class="w-4 h-4 object-contain"
                />
              </template>
            </Column>
            <!--Action-->
            <Column
              field="action"
              header="Action"
              class="w-[10%]"
              alignFrozen="right"
              frozen
            >
              <template #body="slotProps">
                <Button
                  icon="pi pi-ellipsis-v"
                  class="text-primarylight"
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
                  class="!bg-primarylight text-accentwhite sm:w-32"
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
</template>

<style scoped></style>
