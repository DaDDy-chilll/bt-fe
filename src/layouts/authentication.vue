<script setup lang="ts">
  const isLogin = ref<boolean>(false);
  const image = isLogin ? 'red':'blue';
  const styleBackground = computed(() => ({
  // backgroundImage: `url(${backgroundImageUrl.value})`,
  backgound:image,
  // backgroundSize: 'cover',
  // backgroundPosition: 'center'
}));

console.log(styleBackground)
</script>

<template>
  <div class="flex justify-center items-center min-h-screen" :style="styleBackground.value">
    <slot />
  </div>
</template>
