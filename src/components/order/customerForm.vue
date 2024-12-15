<script setup lang="ts">
import searchCustomerModal from "@/components/order/searchCustomerModal.vue";

//data
const displayModal = ref(false);

//model data
const props = defineProps({
  customer: {
    type: Object,
    required: true,
  },
});

//watch modal data
watch(
  () => props.customer,
  (newValue) => {
    console.log('Customer data updated:', newValue);
    props.customer.value = newValue;
  },
  { deep: true }
);

//functions
const searchCustomer = () => {
  displayModal.value = true;
};

/**
 * save customer data to the form
 * @param customer 
 */
const handleAddCustomer = (customer: any) => {
  console.log('add new customer in customerForm', customer);
  Object.assign(props.customer, customer);
};

</script>
<template>
  <h1 class="text-lg font-semibold dark:text-accentwhite">Customer Information</h1>
  <div class="flex">
    <div class="w-full bg-accentwhite dark:bg-primarydark px-3 rounded-lg text-sm">
      <div class="grid grid-cols-2 gap-4">
        <!-- First Name -->
        <div class="mt-4 border border-muted dark:border-accentwhite rounded-md dark:bg-primarydark">
          <FloatLabel variant="on">
            <div class="flex items-center w-auto h-8 rounded-md">
              <InputText
                id="firstName"
                v-model="props.customer.firstname"
                class="h-8 w-[99%] rounded-l-md rounded-r-none pl-2 dark:bg-primarydark dark:text-accentwhite"
                :value="props.customer.firstname"
              />
              <label for="firstName" class="text-sm text-label dark:bg-primarydark dark:text-accentwhite"
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
                v-model="props.customer.lastname"
                class="h-8 w-[99%] rounded-l-md rounded-r-none pl-2 dark:bg-primarydark dark:text-accentwhite"
                :value="props.customer.lastname"
              />
              <label for="lastName" class="text-sm text-label dark:bg-primarydark dark:text-accentwhite">Last Name</label>
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
              v-model="props.customer.phone"
              class="h-8 w-[99%] rounded-l-md rounded-r-none pl-2 dark:bg-primarydark dark:text-accentwhite"
              :value="props.customer.phone"
            />
            <label for="phone" class="text-sm text-label dark:bg-primarydark dark:text-accentwhite"
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
              v-model="props.customer.nrc"
              class="h-8 w-[99%] rounded-l-md rounded-r-none pl-2 dark:bg-primarydark dark:text-accentwhite"
              :value="props.customer.nrc"
            />
            <label for="nrc" class="text-sm text-label dark:bg-primarydark dark:text-accentwhite"
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
              v-model="props.customer.email"
              class="h-8 w-[99%] rounded-l-md rounded-r-none pl-2 dark:bg-primarydark dark:text-accentwhite"
              :value="props.customer.email"
            />
            <label for="email" class="text-sm text-label dark:bg-primarydark dark:text-accentwhite"
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
              v-model="props.customer.social"
              class="h-8 w-[99%] rounded-l-md rounded-r-none pl-2 dark:bg-primarydark dark:text-accentwhite"
              :value="props.customer.social"
            />
            <label for="social" class="text-sm text-label dark:bg-primarydark dark:text-accentwhite"
              >Social Media</label
            >
          </div>
        </FloatLabel>
      </div>
    </div>
    <!--Search customer button-->
    <div class="flex justify-end mt-4">
      <button @click="searchCustomer"
        class="flex items-center gap-1 bg-primarylight dark:bg-accent2 dark:text-accentblack text-white px-4 py-2 h-8 rounded-md"
      >
        <i class="pi pi-search"></i>
        <i class="pi pi-user"></i>
      </button>
    </div>
  </div>
  <searchCustomerModal :displayModal="displayModal" @update:displayModal="displayModal = $event" @addNewCustomer="handleAddCustomer"  />
</template>
