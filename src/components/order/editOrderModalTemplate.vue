<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  showEditOrderModal: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:showEditOrderModal']);

</script>

<template>
  <Dialog
    :visible="props.showEditOrderModal"
    header="All Products"
    :style="{ width: '80rem' }"
    :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
    :closable="false"
    :modal="true"
    @update:visible="emit('update:showEditOrderModal', $event)"
    
  >
    <slot />
  </Dialog>
</template>
