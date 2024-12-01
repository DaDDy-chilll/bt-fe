<script setup lang="ts">
import type {GoldMethod} from "@/types/goldMethod";
import SaveIcon from "@/assets/icons/save.vue";
import { ref } from "vue";

const props = defineProps<{
    model_data: GoldMethod[];
}>();

const model_data = ref<GoldMethod[]>(props.model_data);

const onSaveMethod = () => {
    showSaveAnimation();
};

const saveData = () => {
    //api call
    //save data
    //update model
    model_data.value = props.model_data;
}

//temp save animation method
const showSaveAnimation = () => {
    const confirmDialog = document.createElement('div');
    confirmDialog.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg';
    confirmDialog.innerHTML = `
        <p class="mb-4">Are you sure you want to save?</p>
        <div class="flex justify-end gap-2">
            <button class="px-4 py-2 bg-gray-200 rounded-md" id="cancelBtn">Cancel</button>
            <button class="px-4 py-2 bg-primarylight text-white rounded-md" id="confirmBtn">Confirm</button>
        </div>
    `;
    document.body.appendChild(confirmDialog);

    const cancelBtn = confirmDialog.querySelector('#cancelBtn');
    const confirmBtn = confirmDialog.querySelector('#confirmBtn');

    cancelBtn?.addEventListener('click', () => {
        document.body.removeChild(confirmDialog);
    });

    confirmBtn?.addEventListener('click', () => {
        document.body.removeChild(confirmDialog);
        saveData();
        setTimeout(() => {
            const notification = document.createElement('div');
            notification.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primarylight text-white px-6 py-3 rounded-md shadow-lg transform transition-transform duration-300 ease-in-out';
            notification.textContent = 'Data saved successfully';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.transform = 'translateY(-100%)';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }, 1000);
    });
}


</script>

<template>
  <!-- Table title -->
     <div class="mt-8 flex items-center justify-between">
        <p class="text-md">{{ model_data[0].method.charAt(0).toUpperCase() + model_data[0].method.slice(1) }}</p>
        <button class="bg-primarylight text-white px-4 py-2 rounded-md flex items-center text-sm" @click="onSaveMethod">
          <span class="mr-2"><SaveIcon /></span> 
          <span>Save</span>
        </button>
      </div>
      <!-- Table -->
      <div class="mt-4">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[800px] text-sm">
            <thead>
              <tr class="border-b border-gray-300">
                <th class="py-3 px-4 text-left">NO.</th>
                <th class="py-3 px-4 text-left">Weight</th>
                <th class="py-3 px-4 text-left">Category</th>
                <th class="py-3 px-4 text-left">1 kyatt</th>
                <th class="py-3 px-4 text-left">5 muu</th>
                <th class="py-3 px-4 text-left">1 matt</th>
                <th class="py-3 px-4 text-left">1 mu</th>
                <th class="py-3 px-4 text-left">1 pae</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in model_data"
                :key="item.id"
                class="border-b border-gray-200"
              >
                <td class="py-3 px-4">{{ index + 1 }}.</td>
                <td class="py-3 px-4">{{ item.weight }}</td>
                <td class="py-3 px-4">{{ item.category }}</td>
                <td class="py-3 px-4">
                  <input
                    type="text"
                    class="px-2 w-16 border border-accentblack rounded-md"
                    name="one_kyatt"
                    v-model="item.one_kyatt"
                  />
                </td>
                <td class="py-3 px-4">
                  <input
                    type="text"
                    class="px-2 w-16 border border-accentblack rounded-md"
                    name="five_muu"
                    v-model="item.five_muu"
                  />
                </td>
                <td class="py-3 px-4">
                  <input
                    type="text"
                    class="px-2 w-16 border border-accentblack rounded-md"
                    name="one_matt"
                    v-model="item.one_matt"
                  />
                </td>
                <td class="py-3 px-4">
                  <input
                    type="text"
                    class="px-2 w-16 border border-accentblack rounded-md"
                    name="one_mu"
                    v-model="item.one_mu"
                  />
                </td>
                <td class="py-3 px-4">
                  <input
                    type="text"
                    class="px-2 w-16 border border-accentblack rounded-md"
                    name="one_pae"
                    v-model="item.one_pae"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
</template>