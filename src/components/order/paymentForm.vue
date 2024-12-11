  <script setup lang="ts">
import AddDiamond from "@/assets/icons/add_diamond.vue";
import cash from "~/assets/icons/cash.vue";
import kpay from "~/assets/icons/kpay.vue";
import kbz from "~/assets/icons/kbz.vue";
import yoma from "~/assets/icons/yoma.vue";
import { ref, watch } from "vue";


const store = useOrderStore();
const props = defineProps({
  payment: {
    type: Object,
    required: true,
  },
});

const imagePreview = ref<string | null>(null);

/**
 * preview image
 * @param event 
 * @author Aye Nadi
 */
const previewImage = (event: any) => {
  const file = event.target.files[0];
  imagePreview.value = URL.createObjectURL(file);
  props.payment.payment_image = file; // to adjust later
};

/**
 * calculate grand total
 * @returns grand total
 * @author Aye Nadi
 */
const totalAmount = computed(() => {
  if(props.payment.payment_status === "Full Payment"){
    const grandTotal =  store.orderDetails.totalAmount + store.shipping.shipping_fee + props.payment.tax_amount;
    props.payment.total_amount = grandTotal; //store total amount to the payment object
    return grandTotal;
  }else{
    const grandTotal =  store.orderDetails.totalAmount + store.shipping.shipping_fee + props.payment.tax_amount-props.payment.partial_amount;
    props.payment.total_amount = grandTotal; //store total amount to the payment object
    return grandTotal;
  }
});
 
//watch payment method changes
watch(
  () => props.payment.payment_method,
  (newValue) => {
    console.log("Payment method updated:", newValue);
    props.payment.value = newValue;
    store.payment.payment_method = newValue;
  },
  { deep: true }
);

// watch payment status changes
watch(
  () => props.payment.payment_status, 
  (newValue) => {
    console.log("Payment status updated:", newValue);
    props.payment.value = newValue;
    store.payment.payment_status = newValue;
    if(newValue === "Full Payment"){
      props.payment.partial_amount = 0; //reset partial amount
      store.payment.partial_amount = 0;
    }
  },
  { deep: true }
);


</script>
<template>
  <h1 class="text-lg font-semibold">Payment Method</h1>
  <div class="flex flex-col justify-center text-sm">
    <!-- payment method -->
    <div class="grid grid-cols-5 gap-4 mt-4 justify-center items-center">
      <button @click="payment.payment_method = 'cash'"
        class="py-4 px-6 rounded-md border border-muted hover:border-primarylight flex items-center justify-center"
      >
        <cash />
      </button>
      <button @click="payment.payment_method = 'kpay'"
        class="py-4 px-6 rounded-md border border-muted hover:border-primarylight flex items-center justify-center"
      >
        <kpay />
      </button>
      <button @click="payment.payment_method = 'kbz'"
        class="py-4 px-6 rounded-md border border-muted hover:border-primarylight flex items-center justify-center"
      >
        <kbz />
      </button>
      <button @click="payment.payment_method = 'yoma'"
        class="py-4 px-6 rounded-md border border-muted hover:border-primarylight flex items-center justify-center"
      >
        <yoma />
      </button>
      <button class="w-full h-full flex items-center justify-center">
        <AddDiamond />
      </button>
    </div>
    <!-- payment method end -->
    <!--Payment status and info-->
    <h1 class="mt-4 text-lg font-semibold">Payment Status</h1>

    <div class="grid grid-cols-2 gap-4 mt-4">
      <!--Payment status-->
      <div>
        <div class="flex items-center justify-center gap-2">
          <label class="flex items-center space-x-2 cursor-pointer">
            <input
              v-model="payment.payment_status"
              type="radio"
              name="payment-type"
              value="Full Payment"
              class="w-4 h-4 text-primarylight border-primarylight ring-primarylight"
            />
            <span>Full Payment</span>
          </label>
          <label class="flex items-center space-x-2 cursor-pointer">
            <input
              v-model="payment.payment_status"
              type="radio"
              name="payment-type"
              value="Partial Payment"
              class="w-4 h-4 text-primarylight border-primarylight ring-primarylight"
            />
            <span>Partial Payment</span>
          </label>
        </div>
        <!--Partial Amount-->
        <div class="mt-4 border border-muted rounded-md">
          <FloatLabel variant="on">
            <div class="flex items-center w-auto h-8 rounded-md">
              <InputNumber
                id="partial_amount"
                :disabled="payment.payment_status === 'Full Payment'"
                :class="{ 'bg-gray-200': payment.payment_status === 'Full Payment' }"
                class="h-7 w-full rounded-l-md rounded-r-none pl-2"
                v-model="payment.partial_amount"
              />
              <label for="partial_amount" class="text-sm text-label"
                >Partial Amount</label
              >
            </div>
          </FloatLabel>
        </div>
        <!--date-->
        <div class="mt-4 border border-muted rounded-md">
          <FloatLabel variant="on">
            <div class="flex items-center w-auto h-8 rounded-md">
              <DatePicker class="h-8 w-full px-2 rounded-l-md rounded-r-none" v-model="payment.date" />
              <span
                class="bg-white h-8 px-2 rounded-r-md border-l flex items-center"
              >
                <i class="pi pi-calendar"></i>
              </span>
            </div>
            <label for="date" class="text-sm text-label">Date</label>
          </FloatLabel>
        </div>
        <!--Tax Amount-->
        <div class="mt-4 border border-muted rounded-md">
          <FloatLabel variant="on">
            <div class="flex items-center w-auto h-8 rounded-md">
              <InputNumber
                v-model="payment.tax_amount"
                id="tax_amount"
                class="h-7 w-full rounded-l-md rounded-r-none pl-2"
              />
              <label for="partial_amount" class="text-sm text-label"
                >Tax Amount</label
              >
            </div>
          </FloatLabel>
        </div>
      </div>
      <!--Payment status end-->

      <div class="flex flex-col items-center justify-center">
        <!--Payment image-->
        <div
          class="relative w-48 h-48 border-2 border-muted rounded-lg flex items-center justify-center hover:border-primarylight transition-colors"
        >
          <input
            type="file"
            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
            @change="previewImage"
          />
          <div v-if="!imagePreview" class="text-center">
            <i class="pi pi-image text-2xl text-gray-400 mb-2"></i>
            <p class="text-xs text-gray-500">PDF,SVG,PNG,JPG or GIF</p>
            <p class="text-xs text-gray-500">Max 800 x 400 Px</p>
          </div>
          <img
            v-else
            :src="imagePreview"
            class="w-full h-full object-cover rounded-lg"
          />
        </div>
        <!--Payment-->
        <div class="flex flex-col mt-4">
          <div class="flex justify-between py-2">
            <span class="text-sm text-accentblack">Total Product Quantity</span>
            <span class="text-sm ml-4">{{ store.orderDetails.totalQuantity }}</span>
          </div>
          <div class="flex justify-between py-2">
            <span class="text-sm text-accentblack">Total Product Amount</span>
            <span class="text-sm ml-4">{{ store.orderDetails.totalAmount }}</span>
          </div>
          <div class="flex justify-between py-2">
            <span class="text-sm text-accentblack">Shipping Fee</span>
            <span class="text-sm ml-4">{{ store.shipping.shipping_fee }}</span>
          </div>
          <div class="flex justify-between py-2">
            <span class="text-sm text-accentblack">Tax Amount</span>
            <span class="text-sm ml-4">{{ payment.tax_amount }}</span>
          </div>
          <div class="flex justify-between py-2 border-b border-gray-500">
            <span class="text-sm text-accentblack">Partial Paid</span>
            <span class="text-sm ml-4 text-red-500">{{ payment.partial_amount }}</span>
          </div>
          <div class="flex justify-between py-2">
            <span class="text-lg font-semibold text-accentblack">Grand Total</span>
            <span class="text-lg font-semibold ml-4">{{ totalAmount }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
