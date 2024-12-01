<script setup lang="ts">
import { ref } from "vue";
import type { Permission } from "~/types/permission";

const props = defineProps<{
  showModal: boolean;
  modalTitle: string;
}>();

const permissionModel = ref<Permission>({
  id: 0,
  page_id: 0,
  role_id: 0,
  view: 0   ,
  edit: 0,
  delete: 0,
});

const emit = defineEmits(["closeModal", "savePermission"]);
</script>
<template>
  <div
    v-if="props.showModal"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div
      class="bg-primarylight text-accentwhite p-4 rounded-lg shadow-lg w-full max-w-xs sm:w-72 md:w-80 lg:w-96"
    >
      <h3 class="text-lg font-semibold mb-3">{{ modalTitle }}</h3>

      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <input v-model="permissionModel.view" type="checkbox" id="view" class="setting-checkbox" />
          <label for="view">View</label>
        </div>

        <div class="flex items-center gap-2">
          <input v-model="permissionModel.edit" type="checkbox" id="edit" class="setting-checkbox" />
          <label for="edit">Edit</label>
        </div>

        <div class="flex items-center gap-2">
          <input v-model="permissionModel.delete" type="checkbox" id="delete" class="setting-checkbox" />
          <label for="delete">Delete</label>
        </div>
      </div>

      <div class="mt-4 flex justify-end gap-2">
        <button
          class="px-3 py-1.5 bg-accentwhite text-primarylight rounded hover:bg-opacity-90"
          @click="emit('savePermission', permissionModel)"
        >
          Save
        </button>
        <button
          class="px-3 py-1.5 bg-primarylight text-accentwhite rounded hover:bg-opacity-90"
          @click="emit('closeModal')"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.setting-checkbox {
  @apply appearance-none w-4 h-4 rounded-full ring-2 ring-accentwhite  checked:bg-accentwhite checked:ring-accentwhite relative;
  &:checked::after {
    content: "✓";
    @apply absolute text-primarylight text-xs flex items-center justify-center inset-0;
  }
}
</style>
