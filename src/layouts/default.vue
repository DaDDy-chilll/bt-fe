<template>
  <div class="bg-accentwhite">
    <AppHeader />
    <div class="flex w-full">
      <SideMenu />
      <div class="p-3 w-full bg-gray-100">
        <slot />
      </div>
    </div>
  </div>
</template>