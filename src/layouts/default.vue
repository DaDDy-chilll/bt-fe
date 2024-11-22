<template>
  <div class="bg-accentwhite">
    <AppHeader />
    <div class="flex">
      <SideMenu />
      <div class="p-3 w-[calc(100vw-15rem)] bg-gray-100">
        <slot />
      </div>
    </div>
  </div>
</template>