<script setup lang="ts">
import MasterNavBar from "@/components/settings/masterSettings/master-nav-bar.vue";
import AddIcon from "~/assets/icons/add_icon.vue";
//import goldTypes from "./goldTypes.json";
import { ref, onMounted } from "vue";
import GoldMasterModal from "@/components/settings/masterSettings/goldMasterModal.vue";
import DataTable from "primevue/datatable";
import Popover from "primevue/popover";
import { reactive } from "vue";
import { useMasterSettingsStore } from "@/stores/masterSettings";

//store
const masterSettingsStore = useMasterSettingsStore();

//variables
const gold_types = ref<any>([]);
const displayModal = ref(false);
const modalType = ref("");
const modalId = ref(0);
const blockScreen = ref(false);
/**** Fetching */
/**
 * @description Load data
 * @returns void
 * @author Phway
 * @created 2024-12-20
 * @updated 2024-12-20
 */
const loadData = async () => {
  try {
    blockScreen.value = true;
    const data = await masterSettingsStore.getGoldTypes();
    gold_types.value = Array.isArray(data?.value?.data) ? data.value.data : [];
   
  } catch (error) {
    console.error(error);
  }
  finally {
    blockScreen.value = false;
  }
};

onMounted(() => {
  loadData();
});
//model variables
const gold_types_model = ref(gold_types);

/**** Fetching End *********/


//form data for edit modal
const formData = ref({
  id: 0,
  name: "",
  unit_id: 0,
  });


// Ref to hold multiple popovers dynamically
const popovers = reactive<Record<number, any>>({});

/********** functions **********/
/**
 * Delete the gold type
 * @param id - The ID of the gold type to delete
 * @author Aye Nadi
 * @returns void
 */
const deleteGoldType = (id: number) => {
  //api call
  //delete gold type

  //update model
  gold_types_model.value = gold_types_model.value.filter(
    (type: any) => type.id !== id
  );
};

/**
 * Edit the gold type
 * @param id - The ID of the gold type to edit
 * @author Aye Nadi
 * @returns void
 */
const editGoldType = (id: number) => {
  //open modal
  displayModal.value = true;
  modalType.value = "edit";
  modalId.value = id;
  
  //set modal data
  const goldType = gold_types_model.value.find((type: any) => type.id === id);
  formData.value = {
    id: id,
    name: goldType?.name || '',
    unit_id: goldType?.unit_id || 0,
  };
};

/**
 * Add the gold type
 * @param newGoldType - The new gold type to add
 * @author Aye Nadi
 * @returns void
 */
const addGoldType = (newGoldType: any) => {
  //api call - try catch / check duplicate
  //add gold type
  //update model
  const newType = {
    id: gold_types_model.value.length + 1,
    name: newGoldType.name,
    unit_id: newGoldType.unit_id,
  };
  gold_types_model.value.push(newType);

  //close modal
  displayModal.value = false;
};

/**
 * Update the gold type
 * @param updatedGoldType - The updated gold type
 * @author Aye Nadi
 * @returns void
 */
const updateGoldType = (updatedGoldType: any) => {
  //api call - try catch
  //update gold type
  //update model
  const index = gold_types_model.value.findIndex((type) => type.id === updatedGoldType.id); 
  if (index !== -1) {
    gold_types_model.value[index] = updatedGoldType; 
  }
};

/**
 * Toggle the popover
 * @param event - The event that triggered the toggle
 * @param id - The ID of the popover to toggle
 * @author Aye Nadi
 * @returns void
 */
 const toggle = (event: MouseEvent, id: number) => {
  const popoverRef = popovers[id]; // Access the correct popover by ID
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
  const popoverRef = popovers[id]; // Access the correct popover by ID
  if (popoverRef) {
    popoverRef.hide();
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
    <div class="w-full dark:bg-primarydark rounded-lg shadow-md">
      <div class="overflow-x-auto">
        <DataTable
            :value="gold_types_model"
            stripedRows
            class="w-full text-sm"
            scrollable
            :resizableColumns="true"
            columnResizeMode="fit"
            showGridlines
            paginator
            :rows="14"
            :rowsPerPageOptions="[5, 10, 20]"
            :totalRecords="gold_types_model.length"
            responsiveLayout="scroll"
            breakpoint="sm"
          >
            <!--No-->
            <Column field="no" header="No" class="w-[15%] dark:bg-primarydark dark:text-accentwhite">
              <template #body="slotProps">
                {{ slotProps.index + 1 }}
              </template>
            </Column>
            <!--Gold Type-->
            <Column field="gold_type_id" header="Gold Type" class="w-[70%] dark:bg-primarydark dark:text-accentwhite">
              <template #body="slotProps">
                {{
                  gold_types_model.find(
                    (type: any) => type.id === slotProps.data.id
                  )?.name || slotProps.data.id
                }}
              </template>
            </Column>
            <!--Action-->
            <Column
              field="action"
              header="Action" 
              class="w-[15%] dark:bg-primarydark dark:text-accentwhite"
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
                  :ref="(el) => {
                    if (el) {
                      popovers[slotProps.data.id] = el;
                    }
                  }"
                  :style="{
                   width: '100px'
                  }"
                  appendTo="body"
                  class="bg-primarylight dark:bg-accent2 text-accentwhite sm:w-48"
                >
                  <div class="flex flex-col gap-4 justify-start items-start">

                    <Button
                      label="Edit"
                      icon="pi pi-pencil"
                      @click="
                        (e) => {
                          editGoldType(slotProps.data.id);
                          closePopover(slotProps.data.id);
                        }
                      "
                    />
                    <Button
                      label="Delete"
                      icon="pi pi-trash"
                      @click="deleteGoldType(slotProps.data.id)"
                    />
                  </div>
                </Popover>
              </template>
            </Column>
          </DataTable>
      </div>
      <GoldMasterModal
        :displayModal="displayModal"
        @update:displayModal="displayModal = $event"
        :gold_types_model="gold_types_model"
        @addGoldType="addGoldType"
        :modalType="modalType"
        :modalId="modalId"
        @update:modalType="modalType = $event"
        @updateGoldType="updateGoldType"
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

