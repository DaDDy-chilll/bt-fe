<script setup lang="ts">
import { GoldMethod } from "@/types/goldMethod";
import SaveIcon from "@/assets/icons/save.vue";

const props = defineProps<{
    model_data: GoldMethod[];
}>();

const onSaveMethod1 = () => {
    //saving data
    console.log(props.model_data);
};

</script>

<template>
  <!-- Table title -->
     <div class="mt-8 flex items-center justify-between">
        <h2 class="text-lg font-bold">{{ model_data[0].method.charAt(0).toUpperCase() + model_data[0].method.slice(1) }}</h2>
        <button class="bg-primarylight text-white px-4 py-2 rounded-md flex items-center" @click="onSaveMethod1">
          <span class="mr-2"><SaveIcon /></span> 
          <span>Save</span>
        </button>
      </div>
      <!-- Table -->
      <div class="mt-4">
        <table class="w-full">
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
              v-for="item in model_data"
              :key="item.id"
              class="border-b border-gray-200"
            >
              <td class="py-3 px-4">{{ item.id }}.</td>
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
</template>