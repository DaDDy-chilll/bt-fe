<script setup>
import { ref } from "vue";
defineProps({
  message: {
    type: String,
    default: "",
  },
  visible: {
    type: Boolean,
    default: false,
  },
  close: {
    type: Function,
    required: true,
  },
});
const emit = defineEmits(['update:visible', 'close']);
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
    :visible="visible" 
            @update:visible="(value) => emit('update:visible', value)"
            modal 
            :style="{ width: '25rem' }" 
            :draggable="false" 
            :closable="false" 
            :closeOnEscape="true"
    >
      <div class="flex items-center gap-4 mb-8 w-full">
        <label for="email" class="font-semibold w-full">{{ message }}</label>
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
           @click="emit('close')"
        ></Button>
      </div>
    </Dialog>
  </div>
</template>
