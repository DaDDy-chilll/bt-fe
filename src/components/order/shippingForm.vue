<script setup lang="ts">
import { ref, watch } from "vue";

//model data
const props = defineProps({
  shipping: {
    type: Object,
    required: true,
  },
});

//temp countries
const countries_model = ref([
  { id: 1, name: "Myanmar" },
  { id: 2, name: "Thailand" },
  { id: 3, name: "China" },
]);
//temp prefectures
const prefectures_model = ref([
  { id: 1, name: "Yangon" },
  { id: 2, name: "Mandalay" },
  { id: 3, name: "Nay Pyi Taw" },
]);

//watch modal data
watch(
  () => props.shipping,
  (newValue) => {
    console.log("Shipping data updated:", newValue);
    props.shipping.value = newValue;
  },
  { deep: true }
);

</script>

<template>
  <div class="flex justify-between items-center gap-2">
    <h1 class="text-lg font-semibold dark:text-accentwhite">Shipping Information</h1>
    <div class="flex items-center gap-2">
      <label for="is_previous" class="text-sm text-label dark:text-accentwhite"
        >Use Previous Shipping</label
      >
      <input type="checkbox" v-model="props.shipping.is_previous" class="accent-primarylight dark:accent-accent2" />
    </div>
  </div>
  <div class="w-full bg-accentwhite dark:bg-primarydark px-3 rounded-lg text-sm">
    <!--Shipping Method-->
    <div class="mt-4 border border-muted rounded-md">
      <FloatLabel variant="on">
        <Select
          v-model="props.shipping.shipping_method"
          inputId="shipping_method_label"
          :options="[
            { id: 1, name: 'Delivery' },
            { id: 2, name: 'Pickup' },
          ]"
          optionLabel="name"
          optionValue="id"
          class="w-full h-8 dropdown-svg-white dark:bg-primarydark dark:text-accentwhite [&_.p-dropdown-items]:dark:text-accentwhite [&_.p-dropdown-item]:dark:text-accentwhite [&_.p-dropdown-panel]:dark:bg-primarydark [&_.p-dropdown-item.p-highlight]:dark:bg-accent2"
        />
        <label for="shipping_method_label" class="text-sm text-label dark:text-accentwhite dark:bg-primarydark"
          >Shipping Method</label
        >
      </FloatLabel>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <!-- Country -->
      <div class="mt-4 border border-muted rounded-md">
        <FloatLabel variant="on">
          <Select
            v-model="props.shipping.country"
            inputId="country_label"
            :options="countries_model"
            optionLabel="name"
            optionValue="id"
            class="w-full h-8 dropdown-svg-white dark:bg-primarydark dark:text-accentwhite [&_.p-dropdown-items]:dark:text-accentwhite [&_.p-dropdown-item]:dark:text-accentwhite [&_.p-dropdown-panel]:dark:bg-primarydark [&_.p-dropdown-item.p-highlight]:dark:bg-accent2"
          />
          <label for="country_label" class="text-sm text-label dark:text-accentwhite dark:bg-primarydark">Country</label>
        </FloatLabel>
      </div>
      <!-- Prefecture -->
      <div class="mt-4 border border-muted rounded-md">
        <FloatLabel variant="on">
          <Select
            v-model="props.shipping.prefecture"
            inputId="prefecture_label"
            :options="prefectures_model"
            optionLabel="name"
            optionValue="id"
            class="w-full h-8 dropdown-svg-white dark:bg-primarydark dark:text-accentwhite [&_.p-dropdown-items]:dark:text-accentwhite [&_.p-dropdown-item]:dark:text-accentwhite [&_.p-dropdown-panel]:dark:bg-primarydark [&_.p-dropdown-item.p-highlight]:dark:bg-accent2"
          />
          <label for="prefecture_label" class="text-sm text-label dark:text-accentwhite dark:bg-primarydark"
            >Prefecture</label
          >
        </FloatLabel>
      </div>
    </div>
    <!--Address-->
    <div class="mt-4 border border-muted rounded-md">
      <FloatLabel variant="on">
        <div class="flex items-center w-auto h-8 rounded-md">
          <InputText
            id="address"
            v-model="props.shipping.address"
            class="h-8 w-[99%] rounded-l-md rounded-r-none pl-2 dark:bg-primarydark dark:text-accentwhite"
            :value="props.shipping.address"
          />
          <label for="address" class="text-sm text-label dark:text-accentwhite dark:bg-primarydark">Address</label>
        </div>
      </FloatLabel>
    </div>
    <!--Address 1-->
    <div class="mt-4 border border-muted rounded-md">
      <FloatLabel variant="on">
        <div class="flex items-center w-auto h-8 rounded-md">
          <InputText
            id="address1"
            v-model="props.shipping.address1"
            class="h-8 w-[99%] rounded-l-md rounded-r-none pl-2 dark:bg-primarydark dark:text-accentwhite"
            :value="props.shipping.address1"
          />
          <label for="address1" class="text-sm text-label dark:text-accentwhite dark:bg-primarydark"
            >Address(Street Number/ Apartment Name)</label
          >
        </div>
      </FloatLabel>
    </div>
    <!--Receiver Name-->
    <div class="mt-4 border border-muted rounded-md">
      <FloatLabel variant="on">
        <div class="flex items-center w-auto h-8 rounded-md">
          <InputText
            id="receiver_name"
            v-model="props.shipping.receiver_name"
            class="h-8 w-[99%] rounded-l-md rounded-r-none pl-2 dark:bg-primarydark dark:text-accentwhite"
            :value="props.shipping.receiver_name"
          />
          <label for="receiver_name" class="text-sm text-label dark:text-accentwhite dark:bg-primarydark"
            >Receiver Name</label
          >
        </div>
      </FloatLabel>
    </div>
    <!--Phone Number-->
    <div class="mt-4 border border-muted rounded-md">
      <FloatLabel variant="on">
        <div class="flex items-center w-auto h-8 rounded-md">
          <InputText
            id="phone"
            v-model="props.shipping.phone"
            class="h-8 w-[99%] rounded-l-md rounded-r-none pl-2 dark:bg-primarydark dark:text-accentwhite"
            :value="props.shipping.phone"
          />
          <label for="phone" class="text-sm text-label dark:text-accentwhite dark:bg-primarydark">Phone Number</label>
        </div>
      </FloatLabel>
    </div>
    <!--Shipping Company Name-->
    <div class="mt-4 border border-muted rounded-md">
      <FloatLabel variant="on">
        <div class="flex items-center w-auto h-8 rounded-md">
          <InputText
            id="company_name"
            v-model="props.shipping.shipping_company"
            class="h-8 w-[99%] rounded-l-md rounded-r-none pl-2 dark:bg-primarydark dark:text-accentwhite"
            :value="props.shipping.shipping_company"
          />
          <label for="company_name" class="text-sm text-label dark:text-accentwhite dark:bg-primarydark"
            >Shipping Company Name</label
          >
        </div>
      </FloatLabel>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <!-- Estimated Duration -->
      <div class="mt-4 border border-muted rounded-md">
        <FloatLabel variant="on">
          <div class="flex items-center w-auto h-8 rounded-md">
            <InputNumber
              id="estimated_duration"
              v-model="props.shipping.estimated_duration"
              class="h-8 w-[99%] rounded-l-md rounded-r-none pl-2 dark:bg-primarydark dark:text-accentwhite"
              :value="props.shipping.estimated_duration"
            />
            <label for="estimated_duration" class="text-sm text-label dark:text-accentwhite dark:bg-primarydark"
              >Estimated Duration(Days)</label
            >
          </div>
        </FloatLabel>
      </div>
      <!-- Shipping Fee -->
      <div class="mt-4 border border-muted rounded-md">
        <FloatLabel variant="on">
          <div class="flex items-center w-auto h-8 rounded-md">
            <InputNumber
              id="shipping_fee"
              v-model="props.shipping.shipping_fee"
              class="h-8 w-[99%] rounded-l-md rounded-r-none pl-2 dark:bg-primarydark dark:text-accentwhite"
              :value="props.shipping.shipping_fee"
            />
            <label for="shipping_fee" class="text-sm text-label dark:text-accentwhite dark:bg-primarydark"
              >Shipping Fee</label
            >
          </div>
        </FloatLabel>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <!-- Shipping Date -->
      <div class="mt-4 border border-muted rounded-md">
        <FloatLabel variant="on">
          <div class="flex items-center w-auto h-8 rounded-md">
            <DatePicker
              v-model="props.shipping.shipping_date"
              class="h-8 w-[99%] rounded-l-md rounded-r-none pl-2 dark:bg-primarydark dark:text-accentwhite"
              :value="props.shipping.shipping_date"
            />
            <span
              class="bg-white dark:bg-primarydark h-8 px-2 rounded-r-md border-l flex items-center dark:text-accentwhite"
            >
              <i class="pi pi-calendar dark:text-accent2"></i>
            </span>
          </div>
          <label for="shipping_date" class="text-sm text-label dark:text-accentwhite dark:bg-primarydark"
            >Shipping Date</label
          >
        </FloatLabel>
      </div>
     <!-- Pick Up Date -->
     <div class="mt-4 border border-muted rounded-md">
        <FloatLabel variant="on">
          <div class="flex items-center w-auto h-8 rounded-md">
            <DatePicker
              v-model="props.shipping.pickup_date"
              class="h-8 w-[99%] rounded-l-md rounded-r-none pl-2 dark:bg-primarydark dark:text-accentwhite t"
              :value="props.shipping.pickup_date"
              :minDate="props.shipping.shipping_date"
            />
            <span
              class="bg-white h-8 px-2 rounded-r-md border-l flex items-center dark:bg-primarydark dark:text-accentwhite"
            >
              <i class="pi pi-calendar dark:text-accent2"></i>
            </span>
          </div>
          <label for="pickup_date" class="text-sm text-label dark:text-accentwhite dark:bg-primarydark"
            >Pick Up Date</label
          >
        </FloatLabel>
      </div>
    </div>
    <!--Shipping Memo-->
    <div class="mt-4 border border-muted rounded-md">
      <FloatLabel variant="on">
        <div class="flex items-center w-auto h-8 rounded-md">
          <InputText
            id="memo"
            v-model="props.shipping.memo"
            class="h-8 w-[99%] rounded-l-md rounded-r-none pl-2 dark:bg-primarydark dark:text-accentwhite"
            :value="props.shipping.memo"
          />
          <label for="memo" class="text-sm text-label dark:text-accentwhite dark:bg-primarydark">Shipping Memo</label>
        </div>
      </FloatLabel>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-inputtext) {
  @apply dark:bg-primarydark;
}

:deep(.p-select-label) {
  @apply dark:text-accentwhite;
}
</style>
