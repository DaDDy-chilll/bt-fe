<script setup>
import productList from "~/pages/order/productList.json";
import addToRefund from "./addToRefund.vue";
import refundModalTemplate from "./refundModalTemplate.vue";
import confirmRefundModal from "./confirmRefundModal.vue";
import refundSummaryModal from "./refundSummaryModal.vue";
//variables
const currentStep = ref(1);

//data
const products = ref(productList);

//props
const props = defineProps({
  showRefundModal: {
    type: Boolean,
    required: true,
  },
});

//emits
const emit = defineEmits(["update:showRefundModal", "closeModal"]);

/*** Functions ***/

const handleUpdateShowRefundModal = (value) => {
  console.log("value", value);
  emit("update:showRefundModal", value);
};

const handleCloseModal = () => {
  emit("update:showRefundModal", false);
};

</script>
<template>
  <div class="text-sm">
    <refundModalTemplate :showRefundModal="showRefundModal" @update:showRefundModal="handleUpdateShowRefundModal">
      <addToRefund v-if="currentStep === 1" :products="products" :currentStep="currentStep" @update:currentStep="currentStep = $event" />
      <confirmRefundModal v-if="currentStep === 2" :products="products" :currentStep="currentStep" @update:currentStep="currentStep = $event" />
      <refundSummaryModal v-if="currentStep === 3" :products="products" :currentStep="currentStep" @update:currentStep="currentStep = $event" @closeModal="handleCloseModal" />
    </refundModalTemplate>
  </div>
</template>

