<script setup lang="ts">
import SystemNavBar from "@/components/settings/systemSettings/system-nav-bar.vue";
import { ref } from "vue";
import pages from "./pages.json";
import type { Page } from "@/types/pages";
import roles from "./roles.json";
import type { Role } from "@/types/role";
import permissions from "./permissions.json";
import type { Permission } from "@/types/permission";
import PermissionModal from "@/components/settings/systemSettings/permissionModal.vue";

const showPermissionModal = ref(false);
const editPagePermissionMode = ref(false);
//temp fetching data
const pageList = ref<Page[]>(pages);
const roleList = ref<Role[]>(roles);
const permissionList = ref<Permission[]>(permissions);


/**
 * Handle permission change
 * @param permission - The permission object
 * @author Aye Nadi
 * @returns void
 */
const handlePermissionChange = (permission: Permission) => {
  console.log(permission);
 if(permission){
  const confirmEdit = window.confirm('Do you want to edit permissions? Click OK to edit permissions or Cancel to remove page control.');
  
  if (confirmEdit) {
    // Show permission modal for editing
    showPermissionModal.value = true;
    
  } else {
    // get permission index
    const permissionIndex = permissionList.value.findIndex(
      p => p.page_id === permission.page_id && p.role_id === permission.role_id
    );
    //remove permission from permissionList
    if (permissionIndex > -1) {
      permissionList.value.splice(permissionIndex, 1);
    }
  }
 }
 else{
  showPermissionModal.value = true;
 }
};

/**
 * Toggle edit page permission mode
 * @author Aye Nadi
 * @returns void
 */
const toggleEditPagePermissionMode = () => {
  editPagePermissionMode.value = !editPagePermissionMode.value;
  console.log(editPagePermissionMode.value);
};

/**
 * Handle save permission
 * @param permission - The permission object
 * @author Aye Nadi
 * @returns void
 */
const handleSavePermission = (permission: Permission) => {
  console.log(permission);
};

</script>
<template>
  <div>
    <SystemNavBar />
    <div class="px-6 py-6">
      <table>
        <thead class="border-b border-gray-200">
          <td class="w-32 sm:w-40 md:w-48 lg:w-56"></td>
          <td
            v-for="page in pageList"
            :key="page.id"
            class="w-32 sm:w-40 md:w-48 lg:w-56 px-4 py-2 text-sm sm:text-base"
          >
            {{ page.name }}
          </td>
        </thead>
        <tbody>
          <tr
            v-for="role in roleList"
            :key="role.id"
            class="border-b border-gray-200 h-16"
          >
            <td>{{ role.name }}</td>
            <td
              v-for="page in pageList"
              :key="page.id"
              class="w-32 sm:w-40 md:w-48 lg:w-56 px-4 py-2 text-sm sm:text-base text-center"
            >
              <input
                type="checkbox"
                class="circle-checkbox"
                :checked="
                  permissionList.some(
                    (permission) =>
                      permission.page_id === page.id &&
                      permission.role_id === role.id
                  )
                "
                @change="handlePermissionChange(permissionList.find(p => p.page_id === page.id && p.role_id === role.id) as Permission)"
                :disabled="!editPagePermissionMode && permissionList.some(
                  (permission) =>
                    permission.page_id === page.id &&
                    permission.role_id === role.id
                )"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-between">
        <div class="mt-4 flex justify-start gap-2">
          <button
            class="px-3 py-1.5 bg-primarylight text-accentwhite rounded hover:bg-opacity-90"
          >
            Add Page
          </button>
          <button
            class="px-3 py-1.5 bg-primarylight text-accentwhite rounded hover:bg-opacity-90"
          >
            Add Role
          </button>
          <button
            class="px-3 py-1.5 bg-primarylight text-accentwhite rounded hover:bg-opacity-90"
          >
            Edit Page Name
          </button>
          <button
            class="px-3 py-1.5 bg-primarylight text-accentwhite rounded hover:bg-opacity-90"
          >
            Edit Role Name
          </button>
        </div>
        <div class="mt-4 flex justify-end gap-2">
          <button
            class="px-3 py-1.5 bg-primarylight text-accentwhite rounded hover:bg-opacity-90"
            :class="{ 'bg-primarydark': editPagePermissionMode }"
            @click="toggleEditPagePermissionMode"
          >
            Edit Page Permission

          </button>
        </div>
      </div>
    </div>
  </div>
  <!--Modal popup for setting permission-->
  <PermissionModal :show-modal="showPermissionModal" :modal-title="editPagePermissionMode ? 'Edit Page Permission' : 'Set Permissions'" @close-modal="showPermissionModal = false" @save-permission="handleSavePermission" />
</template>

<style scoped>
.circle-checkbox {
  @apply appearance-none w-4 h-4 rounded-full ring-2 ring-primarylight  checked:bg-primarylight checked:ring-primarylight relative;
  &:checked::after {
    content: "✓";
    @apply absolute text-white text-xs flex items-center justify-center inset-0;
  }
}

</style>
