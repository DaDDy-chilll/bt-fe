<script setup lang="ts">
import { ref, onMounted } from "vue";
import MethodTable from "@/components/tools/methodTable.vue";
import SlotHeader from "@/components/SlotHeader.vue";

//stores
const goldMethodStore = useGoldMethodStore();

//model data
const todayGoldData = ref<any>({});
const m1_model_data = ref<any>({});
const m2_model_data = ref<any>({});
const blockScreen = ref(false);

/**
 * @description Load data
 * @returns void
 * @author Phway
 * @created 2024-12-18
 * @updated ****-**-**
 */
const loadData = async () => {
  try {
    blockScreen.value = true;
    const data = await goldMethodStore.getGoldMethod();
    todayGoldData.value = Array.isArray(data?.value?.data)
      ? data.value.data
      : [];

    const method1Data = todayGoldData.value.find((item: any) => {
      return item.method === 1;
    }) || { items: {} };

    const method2Data = todayGoldData.value.find(
      (item: any) => item.method === 2
    ) || { items: {} };

    m1_model_data.value = method1Data.items;
    m2_model_data.value = method2Data.items;
  } catch (error) {
    console.error("Error loading data:", error);
  } finally {
    blockScreen.value = false;
  }
};

onMounted(() => {
  loadData();
});
</script>

<template>
  <div class="min-h-screen">
    <div>
      <div
        class="w-full bg-accentwhite dark:bg-primarydark drop-shadow-md rounded-lg"
      >
        <SlotHeader title="Gold Calculation Methods" />
        <!-- Method Table  1-->
        <div class="px-6 py-2 bg-accentwhite dark:bg-primarydark rounded-lg">
          <MethodTable :model_data="m1_model_data" />
        </div>
      </div>

      <!-- Method Table 2-->
      <div
        class="px-6 py-2 bg-accentwhite dark:bg-primarydark drop-shadow-md rounded-lg mt-4 mb-10"
      >
        <MethodTable :model_data="m2_model_data" />
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
