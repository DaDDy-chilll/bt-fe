<script setup lang="ts">
import SystemNavBar from "@/components/settings/systemSettings/system-nav-bar.vue";
import { ref, computed } from "vue";
import myProfileData from "./myProfileData.json";
import type { User } from "~/types/user";
import type { BloodType } from "~/types/bloodType";
import type { Religion } from "~/types/religion";

//fetching data
const profileData = myProfileData;

//variables
const userProfile = ref<User>({
  id: profileData.id,
  name: profileData.name,
  phone: profileData.phone,
  role_id: profileData.role_id,
  position: profileData.position,
  address: profileData.address,
  email: profileData.email,
  emergency_contact: profileData.emergency_contact,
  religion: profileData.religion,
  dob: profileData.dob,
  blood_type_id: profileData.blood_type_id,
  profile_path: profileData.profile_path,
});

/**Temp position data for testing */
const roles_model = ref([
  { id: 1, name: "Admin" },
  { id: 2, name: "Staff" },
]);

/**Temp blood type data for testing */
const blood_type_model = ref<BloodType[]>([
  { id: 1, name: "A+" },
  { id: 2, name: "A-" },
  { id: 3, name: "B+" },
  { id: 4, name: "B-" },
  { id: 5, name: "AB+" },
  { id: 6, name: "AB-" },
  { id: 7, name: "O+" },
  { id: 8, name: "O-" },
  { id: 9, name: "Unknown" },
]);

/**Temp religion data for testing */
const religions_model = ref<Religion[]>([
  { id: 1, name: "Christian" },
  { id: 2, name: "Muslim" },
  { id: 3, name: "Buddhist" },
  { id: 4, name: "Hindu" },
  { id: 5, name: "Unknown" },
]);

/**
 * Update profile
 * @author Aye Nadi
 * @returns void
 */
const updateProfile = () => {
  console.log(userProfile.value);
  //TODO: Add API call to update profile

  //update the profile data
  const confirmUpdate = confirm(
    "Are you sure you want to update your profile?"
  );
  if (confirmUpdate) {
    userProfile.value = {
      ...userProfile.value,
      profile_path: profileImage.value,
    };
  }
};

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
        userProfile.value.profile_path = e.target.result as string;
      }
    };
    reader.readAsDataURL(file);

    // Store file for upload
    userProfile.value.profile_path = profileImage.value;
  }
};

// Computed property for profile image display
const profileImage = computed(() => {
  return userProfile.value.profile_path || "/path/to/default/avatar.png"; //TODO: need to confirm default avatar path
});
</script>

<template>
  <div class="flex flex-col h-screen bg-accentwhite text-sm">
    <SystemNavBar class="text-base"/>
    <div class="px-6 py-6 mt-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!--Left Side-->
        <div class="flex flex-col justify-center items-center gap-6">
          <p class="">Profile Photo</p>
          <div class="relative w-32 h-32">
            <div
              class="w-full h-full rounded-full bg-gray-200 flex items-center justify-center"
            >
              <i
                class="pi pi-camera text-gray-400 text-xl absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md z-10"
              ></i>
            </div>
            <img
              :src="profileImage"
              alt="Profile photo"
              class="absolute inset-0 w-full h-full object-cover rounded-full"
            />
            <input
              type="file"
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
              accept="image/*"
              @change="handleImageUpload"
            />
          </div>
          <div class="flex flex-col gap-8">
            <!--Username-->
            <div class="mt-4 border border-muted rounded-md">
              <FloatLabel variant="on">
                <div class="flex items-center w-auto h-8 rounded-md">
                  <InputText
                    id="username"
                    v-model="userProfile.name"
                    class="h-6 rounded-l-md rounded-r-none pl-2 w-full sm:w-64 md:w-72 lg:w-96"
                  />
                  <label for="username" class="text-sm text-label"
                    >Username</label
                  >
                </div>
              </FloatLabel>
            </div>
            <!--Phone-->
            <div class="mt-4 border border-muted rounded-md">
              <FloatLabel variant="on">
                <div class="flex items-center w-auto h-8 rounded-md">
                  <InputText
                    id="phone"
                    v-model="userProfile.phone"
                    class="h-6 rounded-l-md rounded-r-none pl-2 w-full sm:w-64 md:w-72 lg:w-96"
                  />
                  <label for="phone" class="text-sm text-label">Phone</label>
                </div>
              </FloatLabel>
            </div>
            <!--Role-->
            <div class="mt-4 border border-muted rounded-md">
              <FloatLabel variant="on">
                <Select
                  v-model="userProfile.role_id"
                  inputId="role_label"
                  :options="roles_model"
                  optionLabel="name"
                  optionValue="id"
                  class="w-full h-8 dropdown-svg-white"
                />
                <label for="role_label" class="text-sm text-label">Role</label>
              </FloatLabel>
            </div>
          </div>
        </div>
        <!--Right Side-->
        <div class="flex flex-col items-center gap-6">
          <!--Address-->
          <div class="mt-4 border border-muted rounded-md">
            <FloatLabel variant="on">
              <div class="flex items-center w-auto h-8 rounded-md">
                <InputText
                  id="address"
                  v-model="userProfile.address"
                  class="h-6 rounded-l-md rounded-r-none pl-2 w-full sm:w-64 md:w-72 lg:w-96"
                />
                <label for="address" class="text-sm text-label">Address</label>
              </div>
            </FloatLabel>
          </div>
          <!--Email-->
          <div class="mt-4 border border-muted rounded-md">
            <FloatLabel variant="on">
              <div class="flex items-center w-auto h-8 rounded-md">
                <InputText
                  id="email"
                  v-model="userProfile.email"
                  class="h-6 rounded-l-md rounded-r-none pl-2 w-full sm:w-64 md:w-72 lg:w-96"
                />
                <label for="email" class="text-sm text-label">Email</label>
              </div>
            </FloatLabel>
          </div>
          <!--Emergency Contact-->
          <div class="mt-4 border border-muted rounded-md">
            <FloatLabel variant="on">
              <div class="flex items-center w-auto h-8 rounded-md">
                <InputText
                  id="emergency_contact"
                  v-model="userProfile.emergency_contact"
                  class="h-6 rounded-l-md rounded-r-none pl-2 w-full sm:w-64 md:w-72 lg:w-96"
                />
                <label for="emergency_contact" class="text-sm text-label"
                  >Emergency Contact</label
                >
              </div>
            </FloatLabel>
          </div>
          <!--Religion-->
          <div class="mt-4 border border-muted rounded-md">
            <FloatLabel variant="on">
              <Select
                v-model="userProfile.religion"
                inputId="religion_label"
                :options="religions_model"
                optionLabel="name"
                optionValue="id"
                class="w-full sm:w-64 md:w-72 lg:w-96 h-8 dropdown-svg-white"
              />
              <label for="religion_label" class="text-sm text-label"
                >Religion</label
              >
            </FloatLabel>
          </div>
          <!--Date of Birth-->
          <!--Religion-->
          <div class="mt-4 border border-muted rounded-md">
            <FloatLabel variant="on">
              <div class="flex items-center w-auto h-8 rounded-md">
                <DatePicker
                  id="date_of_birth"
                  v-model="userProfile.dob"
                  class="h-6 rounded-l-md rounded-r-none pl-2 w-full sm:w-64 md:w-72 lg:w-96"
                />
                <i class="pi pi-calendar absolute right-2 text-gray-600"></i>
                <label for="date_of_birth" class="text-sm text-label"
                  >Date of Birth</label
                >
              </div>
            </FloatLabel>
          </div>
          <!--Blood Type-->
          <div class="mt-4 border border-muted rounded-md">
            <FloatLabel variant="on">
              <Select
                v-model="userProfile.blood_type_id"
                inputId="blood_type_label"
                :options="blood_type_model"
                optionLabel="name"
                optionValue="id"
                class="w-full sm:w-64 md:w-72 lg:w-96 h-8 dropdown-svg-white"
              />
              <label for="blood_type_label" class="text-sm text-label"
                >Blood Type</label
              >
            </FloatLabel>
          </div>
        </div>
      </div>
      <!--Save Button-->
      <div class="flex justify-end mr-20 mt-8">
        <Button
          label="Update"
          class="px-4 py-2 rounded-md bg-primarylight text-white hover:bg-opacity-90"
          @click="updateProfile"
        />
      </div>
    </div>
  </div>
</template>
