<script setup lang="ts">
import { ref, nextTick, watch } from "vue";
import type { Supplier, Memo } from "~/types/supplier";
import { Button, Card, InputText, FloatLabel, Textarea } from "primevue";

// V-Model Variables
const supplier = ref<Supplier>({
  name: "",
  branch: "",
  contact: "",
  startdate: "",
  email: "",
  phone: [
    {
      phone1: "",
      phone2: "",
    },
  ],
  state: "",
  city: "",
  address: "",
  website: "",
  social: "",
  memo: [],
});

const memos = ref<Memo[]>([]);

/**
 *@description Save memo
 *@author SPN
 *@created 2024-11-23
 *@updated ****-**-**
 */
const saveMemo = () => {
  if (supplier.value.memo && supplier.value.memo.length > 0) {
    memos.value.push({
      name: "Stuff Name",
      date: new Date().toLocaleDateString(),
      text: supplier.value.memo as unknown as string,
    });
    supplier.value.memo = [];

    // Scroll to the bottom of the memo list
    nextTick(() => {
      const memoContainer = document.querySelector(".overflow-y-auto");
      if (memoContainer) {
        memoContainer.scrollTop = memoContainer.scrollHeight;
      }
    });
  }
};

/**
 *@description Send form data to backend
 *@author SPN
 *@created 2024-11-23
 *@updated ****-**-**
 */
const sendFormData = async () => {
  const formData = {
    name: supplier.value.name,
    branch: supplier.value.branch,
    contact: supplier.value.contact,
    startdate: supplier.value.startdate,
    email: supplier.value.email,
    phone: supplier.value.phone,
    state: supplier.value.state,
    city: supplier.value.city,
    address: supplier.value.address,
    website: supplier.value.website,
    social: supplier.value.social,
    memo: memos.value,
  };

  console.log(formData);

  // try {
  //   const response = await fetch('/api/supplier', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(formData),
  //   });

  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }

  //   const result = await response.json();
  //   console.log('Form data successfully sent:', result);
  // } catch (error) {
  //   console.error('There was a problem with the fetch operation:', error);
  // }

};

</script>

<template>
  <div class="flex gap-4 justify-between items-start w-full">
    <div class="w-3/5 pb-5 bg-accentwhite drop-shadow-md rounded-lg dark:bg-primarydark">
      <div class="flex justify-between items-center mb-5">
        <h3 class="text-accentblack my-2 py-3 px-5 float-left text-xl dark:text-accentwhite">New Supplier</h3>
        <div class="flex items-center gap-2">
          <i class="pi pi-user text-accent1 dark:text-accent2 text-xl"></i>
          <span class="text-accentblack dark:text-accentwhite text-xl pr-5">#SUPXXXX</span>
        </div>
      </div>
      <div class="px-5">
        <!-- Name -->
        <div class="grid grid-cols-1 mb-6">
          <FloatLabel variant="on">
            <InputText id="on_label" v-model="supplier.name" class="border w-full h-10 pl-2 dark:bg-primarydark" autocomplete="off" />
            <label for="on_label" class="text-sm text-label dark:bg-primarydark dark:text-white">Supplier Name</label>
          </FloatLabel>
        </div>
        <!-- Branch -->
        <div class="grid grid-cols-1">
          <FloatLabel variant="on">
            <InputText id="on_label" v-model="supplier.branch" class="border w-full h-10 pl-2 dark:bg-primarydark" autocomplete="off" />
            <label for="on_label" class="text-sm text-label dark:bg-primarydark dark:text-white">Supplier Category</label>
          </FloatLabel>
        </div>
        <!-- Divider -->
        <div class="border-t border-muted w-full my-6 dark:border-accentwhite dark:border-opacity-30"></div>
        <!-- Contact -->
        <div class="grid grid-cols-1 mb-6">
          <FloatLabel variant="on">
            <InputText id="on_label" v-model="supplier.contact" class="border w-full h-10 pl-2 dark:bg-primarydark" autocomplete="off" />
            <label for="on_label" class="text-sm text-label dark:bg-primarydark dark:text-white">Contact Name</label>
          </FloatLabel>
        </div>
        <!-- Start Date -->
        <div class="grid grid-cols-1">
          <FloatLabel variant="on">
            <InputText id="on_label" v-model="supplier.startdate" class="border w-full h-10 pl-2 dark:bg-primarydark" autocomplete="off" />
            <label for="on_label" class="text-sm text-label dark:bg-primarydark dark:text-white">Contact Start Date</label>
          </FloatLabel>
        </div>
        <!-- Divider -->
        <div class="border-t border-muted w-full my-6"></div>
        <!-- Email -->
        <div class="grid grid-cols-1 mb-6">
          <FloatLabel variant="on" class="text-sm">
            <InputText id="email_label" v-model="supplier.email" autocomplete="off" class="border w-full h-10 pl-2 dark:bg-primarydark" />
            <label for="email_label" class="text-sm text-label dark:bg-primarydark dark:text-white">Email</label>
          </FloatLabel>
        </div>
        <!-- Phone 1 / Phone 2 -->
        <div class="grid grid-cols-2 gap-4">
          <div class="grid grid-cols-1">
            <FloatLabel variant="on" class="text-sm">
              <InputText id="phone1_label" v-model="supplier.phone[0].phone1" autocomplete="off"
                class="border w-full h-10 pl-2 dark:bg-primarydark" />
              <label for="phone1_label" class="text-sm text-label dark:bg-primarydark dark:text-white">Phone 1</label>
            </FloatLabel>
          </div>
          <div class="grid grid-cols-1">
            <FloatLabel variant="on" class="text-sm">
              <InputText id="phone2_label" v-model="supplier.phone[0].phone2" autocomplete="off"
                class="border w-full h-10 pl-2 dark:bg-primarydark" />
              <label for="phone2_label" class="text-sm text-label dark:bg-primarydark dark:text-white">Phone 2</label>
            </FloatLabel>
          </div>
        </div>
        <!-- Divider -->
        <div class="border-t border-muted w-full my-6 dark:border-accentwhite dark:border-opacity-30"></div>
        <!-- State / City -->
        <div class="grid grid-cols-2 gap-4">
          <div class="grid grid-cols-1 mb-6">
            <FloatLabel variant="on" class="text-sm">
              <InputText id="state_label" v-model="supplier.state" autocomplete="off" class="border w-full h-10 pl-2 dark:bg-primarydark" />
              <label for="state_label" class="text-sm text-label dark:bg-primarydark dark:text-white">State</label>
            </FloatLabel>
          </div>
          <div class="grid grid-cols-1 mb-6">
            <FloatLabel variant="on" class="text-sm">
              <InputText id="city_label" v-model="supplier.city" autocomplete="off" class="border w-full h-10 pl-2 dark:bg-primarydark" />
              <label for="city_label" class="text-sm text-label dark:bg-primarydark dark:text-white">City</label>
            </FloatLabel>
          </div>
        </div>
        <!-- Address -->
        <div class="grid grid-cols-1">
          <FloatLabel variant="on" class="text-sm">
            <InputText id="address_label" v-model="supplier.address" autocomplete="off"
              class="border w-full h-10 pl-2 dark:bg-primarydark" />
            <label for="address_label" class="text-sm text-label dark:bg-primarydark dark:text-white">Address</label>
          </FloatLabel>
        </div>
        <!-- Divider -->
        <div class="border-t border-muted w-full my-6"></div>
        <!-- Website -->
        <div class="grid grid-cols-1 mb-6">
          <FloatLabel variant="on" class="text-sm">
            <InputText id="website_label" v-model="supplier.website" autocomplete="off"
              class="border w-full h-10 pl-2 dark:bg-primarydark" />
            <label for="website_label" class="text-sm text-label dark:bg-primarydark dark:text-white">Website</label>
          </FloatLabel>
        </div>
        <!-- Social -->
        <div class="grid grid-cols-1 mb-6">
          <FloatLabel variant="on" class="text-sm">
            <InputText id="social_label" v-model="supplier.social" autocomplete="off" class="border w-full h-10 pl-2 dark:bg-primarydark" />
            <label for="social_label" class="text-sm text-label dark:bg-primarydark dark:text-white">Social</label>
          </FloatLabel>
        </div>
        <!-- Save Button -->
        <Button label="Save" class="w-full py-2 bg-accent1 text-accentwhite mt-4 dark:bg-accent2" @click="sendFormData" />
      </div>
    </div>
    <div class="w-2/5 bg-accentwhite drop-shadow-md rounded-lg p-5 dark:bg-primarydark">
      <h3 class="text-lg text-accentblack mb-4 dark:text-accentwhite">Memo</h3>
      <!-- Divider -->
      <div class="border-t border-muted w-full dark:border-accentwhite dark:border-opacity-30"></div>
      <!-- Memo Text -->
      <div :style="{ height: `calc(100vh - 38.2vh)` }" class="overflow-y-auto my-2">
        <div v-for="(memo, index) in memos" :key="index" class="w-full py-2">
          <div>
            <h3 class="text-sm inline font-semibold mr-2 dark:text-accentwhite">{{ memo.name }}</h3>
            <span class="inline text-xs text-accentblack opacity-50 dark:text-accentwhite">{{ memo.date }}</span>
          </div>
          <p class="text-xs dark:text-accentwhite">
            {{ memo.text }}
          </p>
        </div>
      </div>
      <!-- Memo Text -->
      <div class="w-full">
        <h3 class="text-accentblack dark:text-accentwhite mb-1">Add a note</h3>
        <Textarea id="memo_label" v-model="supplier.memo" rows="5" cols="30" style="resize: none"
          class="bg-muted w-full p-2 mb-1 p-textarea p-component dark:bg-primarydark dark:border dark:border-accent2" />
      </div>
      <Button label="Save" class="w-full py-2 bg-accent1 text-accentwhite dark:bg-accent2" @click="saveMemo" />
    </div>
  </div>
</template>

<style scoped>
:deep(.p-inputtext) {
  @apply text-accentblack;
  @apply dark:text-accentwhite;
}

:deep(.p-textarea) {
  @apply text-accentblack;
  @apply dark:text-accentwhite;
}

:deep(.p-component) {
  @apply text-accentblack;
  @apply dark:text-accentwhite;
}

</style>
