<script setup lang="ts">
import { ref, computed } from "vue";
import editOrderModalTemplate from "~/components/order/editOrderModalTemplate.vue";
import orderFristStep from "~/components/order/orderFristStep.vue";
import orderSecondStep from "~/components/order/orderSecondStep.vue";
import orderThirdStep from "~/components/order/orderThirdStep.vue";
import orderFourthStep from "~/components/order/orderFourthStep.vue";
import orderLastStep from "~/components/order/orderLastStep.vue";

const emit = defineEmits(['update:showEditOrderModal']);

const showEditOrderModal = ref(false);
const currentStep = ref(1);
const maxStep = ref(5);
const minStep = ref(1);

const isLastStep = computed(() => currentStep.value === maxStep.value);

const nextStep = () => {
  currentStep.value++;
  if (currentStep.value > maxStep.value) {
    currentStep.value = maxStep.value;
  }
};

const previousStep = () => {
  currentStep.value--;
  if (currentStep.value < minStep.value) {
    currentStep.value = minStep.value;
  }
};

const finishedOrder = () => {
  console.log("finished order");
  showEditOrderModal.value = false;
  currentStep.value = 1;
  emit('update:showEditOrderModal', false);
};
</script>

<template>
  <editOrderModalTemplate
    :showEditOrderModal="showEditOrderModal"
    @update:showEditOrderModal="showEditOrderModal = $event"
  >
    <orderFristStep v-if="currentStep === 1" />
    <orderSecondStep v-if="currentStep === 2" />
    <orderThirdStep v-if="currentStep === 3" />
    <orderFourthStep v-if="currentStep === 4" />
    <orderLastStep v-if="currentStep === 5" />
    <div
      class="flex"
      :class="{
        'justify-between': currentStep > minStep,
        'justify-end': currentStep === minStep
      }"
    >
      <button
        v-if="currentStep > minStep"
        class="bg-primarylight text-white px-6 py-1 rounded-md float-right mt-4"
        @click="previousStep"
      >
        <span class="text-white">Previous</span>
      </button>
      <button
        v-if="!isLastStep"
        class="bg-primarylight text-white px-6 py-1 rounded-md float-right mt-4"
        @click="nextStep"
      >
        <span class="text-white">Next</span>
      </button>
      <button
        v-if="isLastStep"
        class="bg-primarylight text-white px-6 py-1 rounded-md float-right mt-4"
        @click="finishedOrder"
      >
        <span class="text-white">Finished</span>
      </button>
    </div>
  </editOrderModalTemplate>
</template>
