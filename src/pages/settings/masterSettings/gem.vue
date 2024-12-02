<script setup lang="ts">
import MasterNavBar from "@/components/settings/masterSettings/master-nav-bar.vue";
import { ref } from 'vue';
import gemTypes from './gemTypes.json';
import type { GemType } from '@/types/gemType';
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Popover from "primevue/popover";
import AddIcon from "~/assets/icons/add_icon.vue";
import GemTypeModal from "@/components/settings/systemSettings/gemTypeModal.vue";
//state
const displayModal = ref(false);
const modalType = ref('add');
const modalId = ref(0);
// Ref to hold multiple popovers dynamically
const popovers = ref<Record<number, any>>({});

//fetching data
const gem_types = gemTypes;

//model variables
const formData = ref<GemType>({
    id: 0,
    name: '',
    color_id: 0,
    icon: '',
});

/*** functions ***/
const editGemType = (id: number) => {
    modalType.value = 'edit';
    modalId.value = id;
    displayModal.value = true;
};

const deleteGemType = (id: number) => {
    // Implement delete logic
};

const addGemType = (data: GemType) => {
  //
};

const updateGemType = (data: GemType) => {
    modalType.value = 'edit';
    modalId.value = data.id;
    displayModal.value = true;
};

/**
 * Toggle the popover
 * @param event - The event that triggered the toggle
 * @param id - The ID of the popover to toggle
 * @author Aye Nadi
 * @returns void
 */
 const toggle = (event: MouseEvent, id: number) => {
  const popoverRef = popovers.value[id]; // Access the correct popover by ID
  if (popoverRef) {
    popoverRef.toggle(event);
  }
};


/**
 * Close the popover
 * @param id - The ID of the popover to close
 * @author Aye Nadi
 * @returns void
 */
const closePopover = (id: number) => {
  const popoverRef = document.querySelector(`[ref="op-${id}"]`) as any;
  if (popoverRef) {
    popoverRef.hide();
  }
};

</script>

<template>
    <div>
    <MasterNavBar />
    <div class="px-6">
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
            <Column field="gem_type_id" header="Gem Type" class="w-[20%]">
              <template #body="slotProps">
                {{ slotProps.data.name }}
              </template>
            </Column>
             <!--Gem color-->
             <Column field="gem_color_id" header="Gem Color" class="w-[20%]">
              <template #body="slotProps">
                {{ slotProps.data.color_id }}
              </template>
            </Column>
            <!--Icon-->
            <Column field="icon" header="Icon" class="w-[20%]">
              <template #body="slotProps">
                <img :src="slotProps.data.icon" alt="icon" class="w-4 h-4 object-contain">
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
                  :key="slotProps.data.id"
                />
                <Popover
                  :ref="(el) => (popovers[slotProps.data.id] = el)"
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


<style scoped>

</style>