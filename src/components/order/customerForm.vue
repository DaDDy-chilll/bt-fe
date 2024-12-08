<script setup lang="ts">
//model data
const customer = ref({
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
  nrc: "",
  social: "",

});
</script>
<template>
  <h1 class="text-lg font-semibold">Customer Information</h1>
  <div class="flex">
    <div class="w-full bg-accentwhite px-3 rounded-lg text-sm">
      <div class="grid grid-cols-2 gap-4">
        <!-- First Name -->
        <div class="mt-4 border border-muted rounded-md">
          <FloatLabel variant="on">
            <div class="flex items-center w-auto h-8 rounded-md">
              <InputText
                id="firstName"
                v-model="customer.firstName"
                class="h-6 rounded-l-md rounded-r-none pl-2 w-full sm:w-64 md:w-72 lg:w-96"
              />
              <label for="firstName" class="text-sm text-label"
                >First Name</label
              >
            </div>
          </FloatLabel>
        </div>
        <!-- Last Name -->
        <div class="mt-4 border border-muted rounded-md">
          <FloatLabel variant="on">
            <div class="flex items-center w-auto h-8 rounded-md">
              <InputText
                id="lastName"
                v-model="customer.lastName"
                class="h-6 rounded-l-md rounded-r-none pl-2 w-full sm:w-64 md:w-72 lg:w-96"
              />
              <label for="lastName" class="text-sm text-label">Last Name</label>
            </div>
          </FloatLabel>
        </div>
      </div>
      <!--Phone Number-->
      <div class="mt-8 border border-muted rounded-md">
        <FloatLabel variant="on">
          <div class="flex items-center w-auto h-8 rounded-md">
            <InputText
              id="phone"
              v-model="customer.phone"
              class="h-6 rounded-l-md rounded-r-none pl-2 w-full sm:w-64 md:w-72 lg:w-96"
            />
            <label for="phone" class="text-sm text-label"
              >Telephone Number</label
            >
          </div>
        </FloatLabel>
      </div>
      <!--NRC-->
      <div class="mt-8 border border-muted rounded-md">
        <FloatLabel variant="on">
          <div class="flex items-center w-auto h-8 rounded-md">
            <InputText
              id="nrc"
              v-model="customer.nrc"
              class="h-6 rounded-l-md rounded-r-none pl-2 w-full sm:w-64 md:w-72 lg:w-96"
            />
            <label for="nrc" class="text-sm text-label"
              >NRC Number</label
            >
          </div>
        </FloatLabel>
      </div>
      <!--Email-->
      <div class="mt-8 border border-muted rounded-md">
        <FloatLabel variant="on">
          <div class="flex items-center w-auto h-8 rounded-md">
            <InputText
              id="email"
              v-model="customer.email"
              class="h-6 rounded-l-md rounded-r-none pl-2 w-full sm:w-64 md:w-72 lg:w-96"
            />
            <label for="email" class="text-sm text-label"
              >Email</label
            >
          </div>
        </FloatLabel>
      </div>
      <!--Social-->
      <div class="mt-8 border border-muted rounded-md">
        <FloatLabel variant="on">
          <div class="flex items-center w-auto h-8 rounded-md">
            <InputText
              id="social"
              v-model="customer.social"
              class="h-6 rounded-l-md rounded-r-none pl-2 w-full sm:w-64 md:w-72 lg:w-96"
            />
            <label for="social" class="text-sm text-label"
              >Social Media</label
            >
          </div>
        </FloatLabel>
      </div>
    </div>
    <!--Search customer button-->
    <div class="flex justify-end mt-4">
      <button
        class="flex items-center gap-1 bg-primarylight text-white px-4 py-2 h-8 rounded-md"
      >
        <i class="pi pi-search"></i>
        <i class="pi pi-user"></i>
      </button>
    </div>
  </div>
</template>
