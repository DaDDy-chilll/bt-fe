<script setup lang="ts">
import SystemNavBar from "@/components/settings/systemSettings/system-nav-bar.vue";
import shopProfileData from "./shopProfileData.json";
import { ref } from "vue";

//variables
const edit_mode = ref(false);

//fetching data
const shopProfile = shopProfileData;

//model variables
const shop_model_data = ref({
  id: shopProfileData.id,
  logo_path: shopProfileData.logo_path,
  name: shopProfileData.name,
  address: shopProfileData.address,
  email: shopProfileData.email,
  phone: shopProfileData.phone,
});

/**
 * Handle image preview and upload
 * @param event - The file input change event
 * @author Aye Nadi
 * @returns void
 */
const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];

    // Create URL for preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        shop_model_data.value.logo_path = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);

    // Store file for upload
    shop_model_data.value.logo_path = shop_model_data.value.logo_path;
  }
};

/**
 * Update shop profile
 * @author Aye Nadi
 * @returns void
 */
const updateShopProfile = () => {
  console.log(shop_model_data.value);
};

/**
 * Handle image upload action
 * @author Aye Nadi
 * @returns void
 */
const handleImageUploadAction = () => {
  // Create a file input element
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";

  // Add change event listener
  fileInput.addEventListener("change", (event) => {
    handleImageUpload(event);
  });

  // Trigger file selection dialog
  fileInput.click();
};

/**
 * Handle image remove action
 * @author Aye Nadi
 * @returns void
 */
const handleImageRemoveAction = () => {
  shop_model_data.value.logo_path = "";
};

/**
 * Toggle edit mode
 * @author Aye Nadi
 * @returns void
 */
const toggleEditMode = () => {
  edit_mode.value = !edit_mode.value;
  if (!edit_mode.value) {
    updateShopProfile();
  }
};
</script>
<template>
  <div
    class="flex flex-col h-screen bg-accentwhite dark:bg-primarydark dark:text-accentwhite text-sm drop-shadow-md rounded-lg"
  >
    <SystemNavBar class="text-base" />
    <div class="px-6 py-6 mt-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <!--Left Side-->
        <div class="flex flex-col justify-center items-center gap-6">
          <p class="">Profile Photo</p>
          <div class="relative w-32 h-32 sm:w-48 sm:h-48">
            <div
              v-if="edit_mode"
              class="w-full h-full bg-gray-200 dark:bg-gray-800 flex flex-col items-center justify-center rounded-lg z-10"
            >
              <i class="pi pi-images text-gray-400 text-3xl mb-2"></i>
              <p class="text-gray-500 dark:text-accentwhite text-xs">
                Click to upload or drag and drop
              </p>
              <p class="text-gray-400 dark:text-accentwhite text-xs">
                SVG, PNG, JPG, or GIF
              </p>
              <p class="text-gray-400 dark:text-accentwhite text-xs">
                Max: 800x400px
              </p>
            </div>
            <img
              :src="shop_model_data.logo_path"
              class="absolute inset-0 w-full h-full object-cover rounded-lg z-0"
              :class="{ 'opacity-60': edit_mode, 'opacity-100': !edit_mode }"
            />
            <input
              type="file"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-lg"
              accept="image/*"
              @change="handleImageUpload"
              ref="fileInput"
              @click="$refs.fileInput.value = ''"
            />
          </div>
          <div class="flex gap-4">
            <button
              v-if="edit_mode"
              @click="handleImageUploadAction"
              class="bg-primarylight dark:bg-accent2 text-white px-4 py-2 rounded-md"
            >
              Upload
            </button>
            <button
              v-if="edit_mode"
              @click="handleImageRemoveAction"
              class="bg-accentblack text-white px-4 py-2 rounded-md"
            >
              Remove
            </button>
          </div>
        </div>

        <!--Right Side-->
        <div v-if="edit_mode" class="flex flex-col items-center gap-6">
          <!--Name-->
          <div class="mt-4 border border-muted rounded-md">
            <FloatLabel variant="on">
              <div class="flex items-center w-auto h-8 rounded-md">
                <InputText
                  id="name"
                  v-model="shop_model_data.name"
                  class="h-6 rounded-l-md rounded-r-none pl-2 w-full sm:w-64 md:w-72 lg:w-96"
                />
                <label for="name" class="text-sm text-label dark:text-accentwhite dark:bg-primarydark">Name</label>
              </div>
            </FloatLabel>
          </div>
          <!--Email-->
          <div class="mt-4 border border-muted rounded-md">
            <FloatLabel variant="on">
              <div class="flex items-center w-auto h-8 rounded-md">
                <InputText
                  id="email"
                  v-model="shop_model_data.email"
                  class="h-6 rounded-l-md rounded-r-none pl-2 w-full sm:w-64 md:w-72 lg:w-96"
                />
                <label for="email" class="text-sm text-label dark:text-accentwhite dark:bg-primarydark">Email</label>
              </div>
            </FloatLabel>
          </div>
          <!--Phone-->
          <div class="mt-4 border border-muted rounded-md">
            <FloatLabel variant="on">
              <div class="flex items-center w-auto h-8 rounded-md">
                <InputText
                  id="phone"
                  v-model="shop_model_data.phone"
                  class="h-6 rounded-l-md rounded-r-none pl-2 w-full sm:w-64 md:w-72 lg:w-96"
                />
                <label for="phone" class="text-sm text-label dark:text-accentwhite dark:bg-primarydark">Phone</label>
              </div>
            </FloatLabel>
          </div>
          <!--Address-->
          <div class="mt-4 border border-muted rounded-md">
            <FloatLabel variant="on">
              <div class="flex items-center w-auto rounded-md">
                <Textarea
                  id="address"
                  v-model="shop_model_data.address"
                  class="rounded-l-md rounded-r-none pl-2 py-2 w-full sm:w-64 md:w-72 lg:w-96"
                  rows="3"
                  autoResize
                />
                <label for="address" class="text-sm text-label dark:text-accentwhite dark:bg-primarydark">Address</label>
              </div>
            </FloatLabel>
          </div>
        </div>
        <div v-else class="flex flex-col items-center">
          <div class="mt-4 w-full sm:w-64 md:w-72 lg:w-96">
            <p class="text-sm text-label dark:text-accentwhite dark:bg-primarydark">Name</p>
            <p class="h-8 pl-2 text-primarylight dark:text-accent2">
              {{ shop_model_data.name }}
            </p>
          </div>
          <div class="mt-4 w-full sm:w-64 md:w-72 lg:w-96">
            <p class="text-sm text-label dark:text-accentwhite dark:bg-primarydark">Email</p>
            <p class="h-8 pl-2 text-primarylight dark:text-accent2">
              {{ shop_model_data.email }}
            </p>
          </div>
          <div class="mt-4 w-full sm:w-64 md:w-72 lg:w-96">
            <p class="text-sm text-label dark:text-accentwhite dark:bg-primarydark">Phone</p>
            <p class="h-8 pl-2 text-primarylight dark:text-accent2">
              {{ shop_model_data.phone }}
            </p>
          </div>
          <div class="mt-4 w-full sm:w-64 md:w-72 lg:w-96">
            <p class="text-sm text-label dark:text-accentwhite dark:bg-primarydark">Address</p>
            <p class="h-24 pl-2 text-primarylight dark:text-accent2">
              {{ shop_model_data.address }}
            </p>
          </div>
        </div>
      </div>
      <!--Save Button-->
      <div class="flex justify-end mr-20 mt-8">
        <Button
          :label="edit_mode ? 'Update' : 'Edit'"
          class="px-4 py-2 rounded-md bg-primarylight dark:bg-accent2 text-white hover:bg-opacity-90"
          @click="toggleEditMode"
        />
      </div>
    </div>
  </div>
</template>
