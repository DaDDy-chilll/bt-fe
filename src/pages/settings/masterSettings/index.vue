<script setup lang="ts">
import MasterNavBar from "@/components/settings/masterSettings/master-nav-bar.vue";
import AddIcon from "@/assets/icons/add_icon.vue";
import todayGoldData from "./todayGold.json";
import goldTypes from "./goldTypes.json";
import goldUnits from "./goldUnits.json";
import type { TodayGold } from "@/types/todayGold";
import type { GoldTypes } from "@/types/goldTypes";
import type { GoldUnits } from "@/types/goldUnits";
import { computed, ref } from "vue";
import TodayGoldModal from "@/components/settings/masterSettings/todayGoldModal.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Popover from "primevue/popover";
import { reactive } from "vue";

//variables
const op = ref<any>(null);
const displayModal = ref(false);
const modalType = ref("");
const modalId = ref(0);

//fetching data
const today_gold_data = todayGoldData;
const gold_types = goldTypes;
const gold_units = goldUnits;

//model variables
const today_gold_model = ref<TodayGold[]>(today_gold_data.todayGoldData);
const gold_types_model = ref<any[]>(gold_types);
const gold_units_model = ref<GoldUnits[]>(gold_units.goldUnits);

//form data for edit modal
const formData = ref<TodayGold>({
  id: 0,
  gold_type_id: 0,
  gold_weight: "",
  ygea_price: 0,
  pyin_pa_price: 0,
  other_price: 0,
  default: 0,
  unit_id: 0,
});

// Ref to hold multiple popovers dynamically
const popovers = reactive<Record<number, any>>({});

/********** functions **********/
/**
 * Handle the addTodayGold event
 * @param newGoldItem - The new gold item to add
 * @author Aye Nadi
 * @returns void
 */
const handleAddTodayGold = (newGoldItem: TodayGold) => {
  //api call - try catch
  //add today gold
  console.log("New gold item received:", newGoldItem);

  // Update the local state
  const newId = today_gold_model.value.length + 1;
  today_gold_model.value.push({ ...newGoldItem, id: newId });

  // Reset modal state
  displayModal.value = false;
  modalType.value = "";
  formData.value = {
    id: 0,
    gold_type_id: 0,
    gold_weight: "",
    ygea_price: 0,
    pyin_pa_price: 0,
    other_price: 0,
    default: 0,
    unit_id: 0,
  };
};

/**
 * Set the default today gold
 * @param id - The ID of the gold data to set as default
 * @author Aye Nadi
 * @returns void
 */
const handleShowAsDefault = (id: number) => {
  //api call - try catch
  //set default today gold
  //update model
  today_gold_model.value = today_gold_model.value.map((gold) =>
    gold.id === id ? { ...gold, default: 1 } : gold
  );
  //change other default to 0
  today_gold_model.value = today_gold_model.value.map((gold) =>
    gold.id !== id ? { ...gold, default: 0 } : gold
  );

  //close popover
  closePopover(id);
};

/**
 * Handle the edit event
 * @param id - The ID of the gold data to edit
 * @author Aye Nadi
 * @returns void
 */
const handleEdit = (id: number) => {
  console.log("Edit");
  const todayGold = today_gold_model.value.find((gold) => gold.id === id);
  console.log(todayGold, id, "todayGold");

  if (todayGold) {
    // First set the form data
    formData.value = { ...todayGold };
    // Then open modal and set type
    modalType.value = "edit";
    modalId.value = id;
    displayModal.value = true;
  }
};

/**
 * Handle the delete event
 * @param id - The ID of the gold data to delete
 * @author Aye Nadi
 * @returns void
 */
 const handleDelete = (id: number) => {

  // Remove the item from the data model
  today_gold_model.value = today_gold_model.value.filter(gold => gold.id !== id);
  
  //remove popover
  delete popovers[id];
};

/**
 * Update the today gold data
 * @param updatedGold - The updated gold data
 * @param id - The ID of the gold data to update
 * @author Aye Nadi
 * @returns void
 */
const updateTodayGold = (updatedGold: TodayGold) => {
  //api call - try catch
  //update today gold
  //update model
  console.log(updatedGold, "updatedGold");
  const index = today_gold_model.value.findIndex(
    (gold) => gold.id === updatedGold.id
  );
  console.log(index, "index");
  if (index !== -1) {
    today_gold_model.value[index] = { ...updatedGold };
  }
  displayModal.value = false;
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
    <div class="px-6 text-sm drop-shadow-md rounded-lg">
      <!--add button-->
      <div class="flex md:justify-end items-center justify-start">
        <button
          @click="(displayModal = true), (modalType = 'add')"
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
            :value="today_gold_model"
            :rowKey="(item: TodayGold) => item.id"
            stripedRows
            class="w-full text-sm"
            scrollable
            resizableColumns
            columnResizeMode="expand"
            showGridlines
            paginator
            :rows="14"
            :rowsPerPageOptions="[10, 20, 50]"
            :totalRecords="today_gold_model.length"
            responsiveLayout="scroll"
            breakpoint="sm"
            :rowClass="
              (data) => ({
                'bg-primarylight bg-opacity-30': data.default === 1,
              })
            "
          >
            <!--No-->
            <Column field="no" header="No" class="w-[10%]">
              <template #body="slotProps">
                <div>
                  {{ slotProps.index + 1 }}
                </div>
              </template>
            </Column>
            <!--Gold Type-->
            <Column field="gold_type_id" header="Gold Type" class="w-[15%]">
              <template #body="slotProps">
                <div>
                  {{
                    gold_types_model.find(
                      (type: GoldTypes) =>
                        type.id === slotProps.data.gold_type_id
                    )?.name || slotProps.data.gold_type_id
                  }}
                </div>
              </template>
            </Column>
            <!--Weight-->
            <Column field="gold_weight" header="Weight" class="w-[15%]">
              <template #body="slotProps">
                <div>
                  {{ slotProps.data.gold_weight }}
                </div>
              </template>
            </Column>
            <!--YGEA Price-->
            <Column field="ygea_price" header="YGEA Price" class="w-[15%]">
              <template #body="slotProps">
                <div>
                  {{ slotProps.data.ygea_price }}
                </div>
              </template>
            </Column>
            <!--Pyin Pa Price-->
            <Column
              field="pyin_pa_price"
              header="Pyin Pa Price"
              class="w-[15%]"
            >
              <template #body="slotProps">
                <div>
                  {{ slotProps.data.pyin_pa_price }}
                </div>
              </template>
            </Column>
            <!--Other Price-->
            <Column field="other_price" header="Other Price" class="w-[15%]">
              <template #body="slotProps">
                <div>
                  {{ slotProps.data.other_price }}
                </div>
              </template>
            </Column>
            <!--Action-->
            <Column
              field="action"
              header="Action"
              class="w-[15%]"
              alignFrozen="right"
              frozen
            >
              <template #body="slotProps">
                <div>
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
                    class="!bg-primarylight text-accentwhite sm:w-48"
                  >
                    <div class="flex flex-col gap-4 justify-start items-start">
                      <Button
                        label="Show as default"
                        icon="pi pi-eye"
                        @click="handleShowAsDefault(slotProps.data.id)"
                      />
                      <Button
                        label="Edit"
                        icon="pi pi-pencil"
                        @click="
                          (e) => {
                            handleEdit(slotProps.data.id);
                            closePopover(slotProps.data.id);
                          }
                        "
                      />
                      <Button
                        label="Delete"
                        icon="pi pi-trash"
                        @click="handleDelete(slotProps.data.id)"
                      />
                    </div>
                  </Popover>
                </div>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
      <TodayGoldModal
        :gold_units_model="gold_units_model"
        :today_gold_model="today_gold_model"
        :gold_types_model="gold_types_model"
        :displayModal="displayModal"
        :modalType="modalType"
        :formData="formData"
        :modalId="modalId"
        @update:displayModal="displayModal = $event"
        @update:modalType="modalType = $event"
        @update:formData="formData = $event"
        @addTodayGold="handleAddTodayGold"
        @updateTodayGold="updateTodayGold"
      />
    </div>
  </div>
</template>
