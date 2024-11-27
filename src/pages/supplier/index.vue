<script setup lang="ts">
import { ref, nextTick, watch } from "vue";
import type { Supplier, Memo } from "~/types/supplier";
import { Button, Card, InputText, FloatLabel, Textarea } from "primevue";
import PersonIcon from "~/assets/icons/person.vue";

// V-Model Variables
const supplier = ref<Supplier>({
  name: "",
  branch: "",
  contact: "",
  startdate: "",
  email: "",
  phone1: "",
  phone2: "",
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
    phone1: supplier.value.phone1,
    phone2: supplier.value.phone2,
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
    <div class="w-3/5 bg-accentwhite drop-shadow-md rounded-lg">
      <Card>
        <template #title>
          <div class="flex justify-between items-center mb-5">
            <h3 class="text-lg">New Supplier</h3>
            <div class="flex items-center gap-2">
              <PersonIcon class="w-7 h-7 text-accent1"/>
              <span class="text-lg">#SUPXXXX</span>
            </div>
          </div>
        </template>
        <template #content>
          <div class="px-5">
            <!-- Name -->
            <div class="grid grid-cols-1 mb-6">
              <FloatLabel variant="on" class="text-sm">
                <InputText id="name_label" v-model="supplier.name" autocomplete="off" 
                  class="border border-primary w-full py-2 px-2" autofocus />
                <label for="name_label">Supplier Name</label>
              </FloatLabel>
            </div>
            <!-- Branch -->
            <div class="grid grid-cols-1">
              <FloatLabel variant="on" class="text-sm">
                <InputText id="branch_label" v-model="supplier.branch" autocomplete="off" 
                  class="border border-primary w-full py-2 px-2" />
                <label for="branch_label">Supplier Category</label>
              </FloatLabel>
            </div>
            <!-- Divider -->
            <div class="border-t border-muted w-full my-6"></div>
            <!-- Contact -->
            <div class="grid grid-cols-1 mb-6">
              <FloatLabel variant="on" class="text-sm">
                <InputText id="contact_label" v-model="supplier.contact" autocomplete="off" 
                  class="border border-primary w-full py-2 px-2" />
                <label for="contact_label">Supplier Contact</label>
              </FloatLabel>
            </div>
            <!-- Start Date -->
            <div class="grid grid-cols-1">
              <FloatLabel variant="on" class="text-sm">
                <InputText id="startdate_label" v-model="supplier.startdate" autocomplete="off" 
                  class="border border-primary w-full py-2 px-2" />
                <label for="startdate_label">Contact Start Date</label>
              </FloatLabel>
            </div>
            <!-- Divider -->
            <div class="border-t border-muted w-full my-6"></div>
            <!-- Email -->
            <div class="grid grid-cols-1 mb-6">
              <FloatLabel variant="on" class="text-sm">
                <InputText id="email_label" v-model="supplier.email" autocomplete="off" 
                  class="border border-primary w-full py-2 px-2" />
                <label for="email_label">Supplier Email</label>
              </FloatLabel>
            </div>
            <!-- Phone 1 / Phone 2 -->
            <div class="grid grid-cols-2 gap-4">
              <div class="grid grid-cols-1">
                <FloatLabel variant="on" class="text-sm">
                  <InputText id="phone1_label" v-model="supplier.phone1" autocomplete="off" 
                    class="border border-primary w-full py-2 px-2" />
                  <label for="phone1_label">Phone 1</label>
                </FloatLabel>
              </div>
              <div class="grid grid-cols-1">
                <FloatLabel variant="on" class="text-sm">
                  <InputText id="phone2_label" v-model="supplier.phone2" autocomplete="off" 
                    class="border border-primary w-full py-2 px-2" />
                  <label for="phone2_label">Phone 2</label>
                </FloatLabel>
              </div>
            </div>
            <!-- Divider -->
            <div class="border-t border-muted w-full my-6"></div>
            <!-- State / City -->
            <div class="grid grid-cols-2 gap-4">
              <div class="grid grid-cols-1 mb-6">
                <FloatLabel variant="on" class="text-sm">
                  <InputText id="state_label" v-model="supplier.state" autocomplete="off" 
                    class="border border-primary w-full py-2 px-2" />
                  <label for="state_label">State</label>
                </FloatLabel>
              </div>
              <div class="grid grid-cols-1 mb-6">
                <FloatLabel variant="on" class="text-sm">
                  <InputText id="city_label" v-model="supplier.city" autocomplete="off" 
                    class="border border-primary w-full py-2 px-2" />
                  <label for="city_label">City</label>
                </FloatLabel>
              </div>
            </div>
            <!-- Address -->
            <div class="grid grid-cols-1">
              <FloatLabel variant="on" class="text-sm">
                <InputText id="address_label" v-model="supplier.address" autocomplete="off" 
                  class="border border-primary w-full py-2 px-2" />
                <label for="address_label">Address</label>
              </FloatLabel>
            </div>
            <!-- Divider -->
            <div class="border-t border-muted w-full my-6"></div>
            <!-- Website -->
            <div class="grid grid-cols-1 mb-6">
              <FloatLabel variant="on" class="text-sm">
                <InputText id="website_label" v-model="supplier.website" autocomplete="off" 
                  class="border border-primary w-full py-2 px-2" />
                <label for="website_label">Website</label>
              </FloatLabel>
            </div>
            <!-- Social -->
            <div class="grid grid-cols-1 mb-6">
              <FloatLabel variant="on" class="text-sm">
                <InputText id="social_label" v-model="supplier.social" autocomplete="off" 
                  class="border border-primary w-full py-2 px-2" />
                <label for="social_label">Social</label>
              </FloatLabel>
            </div>
            <!-- Save Button -->
            <Button label="Save" class="w-full py-2 bg-accent1 text-accentwhite hover:bg-accent1/80" @click="sendFormData" />
          </div>
        </template>
      </Card>
    </div>
    <div class="w-2/5 bg-accentwhite drop-shadow-md rounded-lg" >
      <Card class="h-full">
        <template #title>
          <h3 class="text-lg font-bold mb-4">Memo</h3>
          <!-- Divider -->
          <div class="border-t border-muted w-full"></div>
        </template>
        <template #content>
          <!-- Memo Text -->
          <div :style="{ height: `calc(100vh - 38.2vh)` }" class="overflow-y-auto my-2">
            <div v-for="(memo, index) in memos" :key="index" class="w-full py-2">
              <div>
                <h3 class="text-sm inline font-bold mr-2">{{ memo.name }}</h3>
                <span class="inline text-xs text-black opacity-50">{{ memo.date }}</span>
              </div>
              <p class="text-xs">
                {{ memo.text }}
              </p>
            </div>
          </div>
        </template>
        <template #footer>
          <FloatLabel variant="on" class="text-sm mb-4">
            <Textarea id="memo_label" v-model="supplier.memo" rows="5" cols="30" style="resize: none"
              class="border border-primary w-full py-2 px-2" />
            <label for="memo_label">Add a note</label>
          </FloatLabel>
          <Button label="Save" class="w-full py-2 bg-accent1 text-accentwhite hover:bg-accent1/80" @click="saveMemo" />
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>

</style>
