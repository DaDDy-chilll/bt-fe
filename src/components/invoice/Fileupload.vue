<script setup lang="ts">
import { ref } from 'vue';
import UploadImage from '@/assets/icons/uploadimage.vue';
// State variables
const imagePreview = ref<string | null>(null); // To store the image preview URL
const isDragging = ref<boolean>(false); // To toggle drag state
const fileInput = ref<HTMLInputElement | null>(null); // Reference to the file input element

// Trigger hidden file input
const triggerFileInput = () => {
  console.log("File input triggered");
  fileInput.value?.click(); 
};

// Handle file selection from file input
const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  console.log("File selected:", file);
  if (file) {
    previewImage(file);
  }
};

// Handle drag over event
const handleDragOver = (event: DragEvent) => {
  event.preventDefault(); // Prevent default behavior
  isDragging.value = true;
};

// Handle drag leave event
const handleDragLeave = () => {
  console.log("Drag leave detected");
  isDragging.value = false;
  console.log("isDragging", isDragging.value);
};

// Handle file drop
const handleDrop = (event: DragEvent) => {
  event.preventDefault(); // Prevent default behavior
  isDragging.value = false; // Reset dragging state
  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    const file = files[0];
    console.log("File dropped:", file);
    previewImage(file);
  }
};

// Preview image using FileReader
const previewImage = (file: File) => {
  console.log("Previewing file:", file);
  const reader = new FileReader();
  reader.onload = (e) => {
    console.log("Image preview ready:", e.target?.result);
    imagePreview.value = e.target?.result as string;
  };
  reader.onerror = (err) => {
    console.error("Error reading file:", err);
  };
  reader.readAsDataURL(file);
};
</script>

<template>
  <div id="app">
    <div
      id="drop-area"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
      :class="{ 'active': isDragging }"
    >
      <div class="flex flex-col items-center justify-center">
        <UploadImage v-if="!imagePreview && !isDragging" class="w-20 h-20 text-gray-500 mb-2"/>
        <p v-if="!imagePreview && !isDragging" class="text-gray-500">Click to upload or drag and drop</p>
      </div>
      <img v-if="imagePreview" :src="imagePreview" alt="Preview" class="image-preview" />
      <!-- Hidden file input -->
      <input type="file" ref="fileInput" accept="image/*" hidden @change="handleFileChange" />
    </div>
  </div>
</template>

<style scoped>
:deep(#drop-area) {
  height: 180px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, border-color 0.3s;
}

:deep(#drop-area.active) {
  border-color: #28a745;
}

:deep(#drop-area img) {
  max-width: 100%;
  max-height: 100%;
  display: block;
}

:deep(#drop-area .image-preview) {
  object-fit: cover;
}
</style>
