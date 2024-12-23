<script setup lang="ts">
import MasterNavBar from "@/components/settings/masterSettings/master-nav-bar.vue";
import { ref, onMounted } from "vue";
//import units from './units.json';
import type { UnitType } from "@/types/unitType";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Popover from "primevue/popover";
import AddIcon from "~/assets/icons/add_icon.vue";
import UnitTypeModal from "~/components/settings/masterSettings/unitTypeModal.vue";
import { useMasterSettingsStore } from "@/stores/masterSettings";
import { reactive } from "vue";

//state
const displayModal = ref(false);
const modalType = ref("add");
const modalId = ref(0);
const blockScreen = ref(false);

// Ref to hold multiple popovers dynamically
const popovers = reactive<Record<number, any>>({});

//stores
const masterSettingsStore = useMasterSettingsStore();

//temp unit category data for testing
const unit_categories = ref([
  { id: 1, name: "Length" },
  { id: 2, name: "Mass" },
]);

const unit_types = ref([]);

/**** Fetch Data Functions ******/
/**
 * @description Load data
 * @returns void
 * @author Phway
 * @created 2024-12-19
 * @updated 2024-12-19
 */
const loadData = async () => {
  try {
    blockScreen.value = true;
    const data = await masterSettingsStore.getUnits();
    unit_types.value = Array.isArray(data?.value?.data) ? data.value.data : [];
  } catch (error) {
    console.error("Error loading data:", error);
  } finally {
    blockScreen.value = false;
  }
};

//to fetch data when page is mounted
onMounted(() => {
  loadData();
});

/**** Model Variables ******/
const formData = ref<UnitType>({
  id: 0,
  name: "",
  type: 0,
  symbol: "",
});

/*** CRUD Functions ***/
/**
 * Edit unit type
 * @param id - The ID of the unit type to edit
 * @author Phway
 * @created 2024-12-21
 * @updated 2024-12-21
 */
const editUnitType = (id: number) => {
  modalType.value = "edit";
  modalId.value = id;
  displayModal.value = true;
  //update formData
  formData.value = unit_types.value.find((unit) => unit.id === id) as UnitType;
};

/**
 * Delete unit type
 * @param id - The ID of the unit type to delete
 * @author Phway
 * @created 2024-12-21
 * @updated 2024-12-21
 */
const deleteUnitType = async (id: number) => {
  // update unit_types IN backend
  if (confirm("Are you sure you want to delete this unit type?")) {
    try {
      await masterSettingsStore.deleteUnit(id);
    } catch (error) {
      console.error("Error deleting unit type:", error);
    }
    unit_types.value = unit_types.value.filter((unit) => unit.id !== id);
  }
  //update unit_types
  //remove popover
  delete popovers[id];
};

/**
 * Add unit type
 * @param data - The data of the unit type to add
 * @author Phway
 * @created 2024-12-21
 * @updated 2024-12-21
 */
const addUnitType = async (data: UnitType) => {
  //save unit type in backend
  try {
    await masterSettingsStore.saveUnit(data);
  } catch (error) {
    console.error("Error saving unit type:", error);
  }
  //update model data in frontend
  unit_types.value.push(data);
  //close modal
  displayModal.value = false;
};

/**
 * Update unit type
 * @param data - The data of the unit type to update
 * @param id - The ID of the unit type to update
 * @author Phway
 * @created 2024-12-21
 * @updated 2024-12-21
 */
 const updateUnitType = async (data: UnitType, id: number) => {
  modalType.value = "edit";
  modalId.value = id;

  try {
    // Attempt to update the unit
    await masterSettingsStore.updateUnit({ id, ...data });

    // Close modal and update the UI on success
    displayModal.value = false;
    unit_types.value = unit_types.value.map((unit) =>
      unit.id === id ? { ...unit, ...data } : unit
    );
  } catch (error: any) {
    // Extract meaningful error message
    const errorMessage = error.message || "Failed to update unit.";

    // Log the error for debugging
    console.error("Error in updateUnitType:", error);

    // Display the error to the user
    alert(errorMessage);

    // Keep the modal open for retry
    displayModal.value = true;
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
      <div class="w-full">
        <div class="overflow-x-auto">
          <DataTable
            :value="unit_types"
            stripedRows
            class="w-full text-sm"
            scrollable
            :resizableColumns="true"
            columnResizeMode="fit"
            showGridlines
            paginator
            :rows="14"
            :rowsPerPageOptions="[5, 10, 20]"
            :totalRecords="unit_types.length"
            responsiveLayout="scroll"
            breakpoint="sm"
          >
            <!--No-->
            <Column
              field="no"
              header="No"
              class="w-[15%] dark:bg-primarydark dark:text-accentwhite"
            >
              <template #body="slotProps">
                {{ slotProps.index + 1 }}
              </template>
            </Column>
            <!--Unit Name-->
            <Column
              field="unit_type_id"
              header="Unit Name"
              class="w-[20%] dark:bg-primarydark dark:text-accentwhite"
            >
              <template #body="slotProps">
                {{ slotProps.data.name }}
              </template>
            </Column>
            <!--Unit Type-->
            <Column
              field="unit_type_id"
              header="Unit Type"
              class="w-[20%] dark:bg-primarydark dark:text-accentwhite"
            >
              <template #body="slotProps">
                {{
                  unit_categories.find((cat) => cat.id === slotProps.data.type)
                    ?.name
                }}
              </template>
            </Column>
            <!--Symbol-->
            <Column
              field="symbol"
              header="Symbol"
              class="w-[20%] dark:bg-primarydark dark:text-accentwhite"
            >
              <template #body="slotProps">
                {{ slotProps.data.symbol }}
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
                          editUnitType(slotProps.data.id);
                          closePopover(slotProps.data.id);
                        }
                      "
                    />
                    <Button
                      label="Delete"
                      icon="pi pi-trash"
                      @click="deleteUnitType(slotProps.data.id)"
                    />
                  </div>
                </Popover>
              </template>
            </Column>
          </DataTable>
        </div>
        <UnitTypeModal
          :displayModal="displayModal"
          @update:displayModal="displayModal = $event"
          :unit_types="unit_types"
          @addUnitType="addUnitType"
          :modalType="modalType"
          :modalId="modalId"
          @update:modalType="modalType = $event"
          @updateUnitType="updateUnitType"
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
