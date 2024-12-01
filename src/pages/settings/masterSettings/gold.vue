<script setup lang="ts">
import MasterNavBar from "@/components/settings/masterSettings/master-nav-bar.vue";
import AddIcon from "~/assets/icons/add_icon.vue";
import DeleteIcon from "~/assets/icons/delete.vue";
import EditIcon from "~/assets/icons/edit.vue";
import type { GoldTypes } from "~/types/goldTypes";
import goldTypes from "./goldTypes.json";
import { ref, watch } from "vue";
import GoldMasterModal from "@/components/settings/masterSettings/goldMasterModal.vue";

//variables
const displayModal = ref(false);
const modalType = ref("");
const modalId = ref(0);

//fetching data
const gold_types = goldTypes;

//form data for edit modal
const formData = ref<GoldTypes>({
  id: 0,
  name: " ",
});

//model variables
const gold_types_model = ref<GoldTypes[]>(gold_types.goldTypes);

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
    (type) => type.id !== id
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
  const goldType = gold_types_model.value.find((type) => type.id === id);
  formData.value = {
    id: id,
    name: goldType?.name?.replace('K', '') || '',
  };
};

/**
 * Add the gold type
 * @param newGoldType - The new gold type to add
 * @author Aye Nadi
 * @returns void
 */
const addGoldType = (newGoldType: GoldTypes) => {
  //api call - try catch
  //add gold type
  //update model
  const newType = {
    id: gold_types_model.value.length + 1,
    name: newGoldType.name + "K",
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
const updateGoldType = (updatedGoldType: GoldTypes) => {
  //api call - try catch
  //update gold type
  //update model
  const index = gold_types_model.value.findIndex((type) => type.id === updatedGoldType.id);
  if (index !== -1) {
    gold_types_model.value[index] = updatedGoldType;
  }
};
</script>

<template>
  <div>
    <MasterNavBar />
    <div class="px-6">
      <button
        @click="(modalType = 'add'), (displayModal = true)"
      class="bg-primarylight text-white px-4 py-2 rounded-md mt-8 mb-8"
    >
      <span class="flex items-center gap-2">
        <AddIcon />
        Add
      </span>
    </button>
    <!--table-->
    <div class="w-[95%] md:w-[80%] lg:w-[60%] xl:w-[40%]">
      <div class="overflow-x-auto">
        <table
          class="w-full border-collapse rounded-lg overflow-hidden min-w-[300px]"
        >
          <thead class="border border-gray-300 text-center">
            <td class="px-4 py-2">Gold Type</td>
            <td class="px-4 py-2">Action</td>
          </thead>
          <tbody>
            <tr
              v-if="gold_types_model.length > 0"
              v-for="(type, index) in gold_types_model"
              :key="type.id"
              :class="{ 'bg-primarylight bg-opacity-50': index % 2 === 1 }"
              class="text-center"
            >
              <td
                class="border border-black border-r-0 border-l-gray-300 px-4 py-2 whitespace-nowrap"
                :class="{
                  'border-b-gray-300': index === gold_types_model.length - 1,
                }"
              >
                <span>{{ type.name }}</span>
              </td>
              <td
                class="border border-black px-4 py-2 border-l-0 border-r-gray-300"
                :class="{
                  'border-b-gray-300': index === gold_types_model.length - 1,
                }"
              >
                <div class="flex items-center justify-center flex-wrap gap-2">
                  <button @click="deleteGoldType(type.id)">
                    <DeleteIcon />
                  </button>
                  <button @click="editGoldType(type.id)"><EditIcon /></button>
                </div>
              </td>
            </tr>
            <tr v-else>
              <td colspan="2" class="text-center">No data</td>
            </tr>
          </tbody>
        </table>
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
</template>

<style scoped></style>
