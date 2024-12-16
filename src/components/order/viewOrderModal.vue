<script setup lang="ts">
import { ref } from "vue";
import summaryModal from "~/components/order/summaryModal.vue";

const props = defineProps({
  showOrderModal: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:showOrderModal'])
</script>

<template>
    <Dialog
        :visible="props.showOrderModal"
        header=" "
        :style="{ width: '80rem' }"
        :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
        :closable="true"
        @update:visible="emit('update:showOrderModal', false)"
      >
    <summaryModal />
  </Dialog>
</template>
<style>
.p-dialog {
  background-color: var(--secondarydark) !important;
  color: white !important;
}
</style>
