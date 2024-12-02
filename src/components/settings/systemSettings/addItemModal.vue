<script setup lang="ts">
import { ref, watch } from 'vue';
//import type { GoldTypes } from '~/types/goldTypes'; -- need to confirm
import goldUnits from "../../../pages/settings/masterSettings/goldUnits.json";



/********** props **********/
const props = defineProps<{
    displayModal: boolean;
    addItemType: string;
}>();

/** form data */
const formData = ref({
    name: '',
});

/********** emits **********/
const emit = defineEmits(['close-modal', 'add-item']);


/********** functions **********/
/**
 * Add the gold type
 * @author Aye Nadi
 * @returns void
 */
const addItem = () => {
    if (formData.value.name === '') {
        alert("Please enter a valid item name");
        return;
    }
    emit('add-item', { ...formData.value });
    //reset form data
    formData.value = {
        name: '',
    };
}



/**
 * Close the modal
 * @author Aye Nadi
 * @returns void
 */
const closeModal = () => {
  emit('close-modal', false);
}

</script>

<template>
  <div>
    <Dialog
      v-model:visible="props.displayModal"
      header="Add Item"
      :style="{ width: '25rem' }"
      :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
      :closable="false"
    >
          <!--Item Name-->
          <div class="mt-4 border border-accentblack rounded-md">
          <FloatLabel variant="on">
            <div class="flex items-center w-auto h-10 rounded-md">
              <InputText
                id="item_name_label"
                v-model="formData.name"
                class="h-10 rounded-l-md rounded-r-none pl-2 w-full"
              />
              <label for="item_name_label" class="text-sm text-label"
                >{{ props.addItemType === 'role' ? 'Role Name' : 'Page Name' }}</label
              >
            
            </div>
        </FloatLabel>
      </div>
      <template #footer>
        <div class="flex justify-end gap-2">
            <button class="px-4 py-2 rounded-md bg-primarylight text-white hover:bg-opacity-90" @click="addItem">Add</button>
            <button @click="closeModal" class="px-4 py-2 rounded-md border border-primarylight text-primarylight hover:bg-primarylight hover:bg-opacity-10">Cancel</button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<style scoped></style>
