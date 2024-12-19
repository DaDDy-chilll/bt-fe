<script setup lang="ts">
import SaveIcon from "@/assets/icons/save.vue";
import { ref, watch } from "vue";
import { useGoldMethodStore } from "@/stores/goldMethod";

//stores
const goldMethodStore = useGoldMethodStore();

//props
const props = defineProps<{
  model_data: any;
}>();

//v-model variables
const model_data = ref(Array.isArray(props.model_data) ? props.model_data : []);

// Add a watch to update the model_data when props change
watch(
  () => props.model_data,
  (newValue) => {
    model_data.value = Array.isArray(newValue) ? newValue : [];
    console.log(model_data.value, "model_data");
  },
  { immediate: true }
);

/*********Functions*********/
//on change
const onChange = (event: Event, item: any) => {
  const input = event.target as HTMLInputElement;
  console.log({
    fieldName: input.name,
    value: input.value,
    rowId: item.id
  });
};

//save method
const onSaveMethod = () => {
  showSaveAnimation();
};

//save data
const saveData = () => {
  //save data
  goldMethodStore.saveGoldMethod(model_data.value);
  //update model
  model_data.value = props.model_data;
};

//temp save animation method
const showSaveAnimation = () => {
  const confirmDialog = document.createElement("div");
  confirmDialog.className =
    "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md shadow-lg";
  confirmDialog.innerHTML = `
        <p class="mb-4">Are you sure you want to save?</p>
        <div class="flex justify-end gap-2">
            <button class="px-4 py-2 bg-gray-200 rounded-md" id="cancelBtn">Cancel</button>
            <button class="px-4 py-2 bg-primarylight text-white rounded-md" id="confirmBtn">Confirm</button>
        </div>
    `;
  document.body.appendChild(confirmDialog);

  const cancelBtn = confirmDialog.querySelector("#cancelBtn");
  const confirmBtn = confirmDialog.querySelector("#confirmBtn");

  cancelBtn?.addEventListener("click", () => {
    document.body.removeChild(confirmDialog);
  });

  confirmBtn?.addEventListener("click", () => {
    document.body.removeChild(confirmDialog);
    saveData();
    setTimeout(() => {
      const notification = document.createElement("div");
      notification.className =
        "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primarylight text-white px-6 py-3 rounded-md shadow-lg transform transition-transform duration-300 ease-in-out";
      notification.textContent = "Data saved successfully";
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.style.transform = "translateY(-100%)";
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 3000);
    }, 1000);
  });
};
</script>

<template>
  <!-- Table title -->
  <div class="mt-8 flex items-center justify-between">
    <p class="text-md dark:text-accentwhite" v-if="model_data.length > 0">
      Method {{ model_data[0].method }}
    </p>
    <button
      class="bg-primarylight dark:bg-accent2 dark:text-accentwhite text-white px-4 py-2 rounded-md flex items-center text-sm"
      @click="onSaveMethod"
    >
      <span class="mr-2"><SaveIcon /></span>
      <span>Save</span>
    </button>
  </div>
  <!-- Table -->
  <div class="mt-4">
    <div class="overflow-x-auto">
      <table class="w-full min-w-[800px] text-sm dark:text-accentwhite">
        <thead>
          <tr class="border-b border-gray-300 dark:border-gray-600">
            <td class="py-3 px-4 text-left">No.</td>
            <td class="py-3 px-4 text-left">Weight</td>
            <td class="py-3 px-4 text-left">Category</td>
            <td class="py-3 px-4 text-left">1 kyatt</td>
            <td class="py-3 px-4 text-left">5 muu</td>
            <td class="py-3 px-4 text-left">1 matt</td>
            <td class="py-3 px-4 text-left">1 mu</td>
            <td class="py-3 px-4 text-left">1 pae</td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in model_data"
            :key="item.id"
            class="border-b border-gray-200 dark:border-gray-600"
          >
            <td class="py-3 px-4">{{ index + 1 }}.</td>
            <td class="py-3 px-4">{{ item.weight }}</td>
            <td class="py-3 px-4">{{ item.category }}</td>
            <td class="py-3 px-4">
              <input
                type="text"
                class="px-2 w-16 border border-muted rounded-md dark:bg-primarydark dark:text-accentwhite"
                name="one_kyatt"
                v-model="item.one_kyatt"
                @change="(e) => onChange(e, item)"
              />
            </td>
            <td class="py-3 px-4">
              <input
                type="text"
                class="px-2 w-16 border border-muted rounded-md dark:bg-primarydark dark:text-accentwhite"
                name="five_muu"
                v-model="item.five_muu"
                @change="(e) => onChange(e, item)"
              />
            </td>
            <td class="py-3 px-4">
              <input
                type="text"
                class="px-2 w-16 border border-muted rounded-md dark:bg-primarydark dark:text-accentwhite"
                name="one_matt"
                v-model="item.one_mat"
                @change="(e) => onChange(e, item)"
              />
            </td>
            <td class="py-3 px-4">
              <input
                type="text"
                class="px-2 w-16 border border-muted rounded-md dark:bg-primarydark dark:text-accentwhite"
                name="one_mu"
                v-model="item.one_mu"
                @change="(e) => onChange(e, item)"
              />
            </td>
            <td class="py-3 px-4">
              <input
                type="text"
                class="px-2 w-16 border border-muted rounded-md dark:bg-primarydark dark:text-accentwhite"
                name="one_pae"
                v-model="item.one_pae"
                @change="(e) => onChange(e, item)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
