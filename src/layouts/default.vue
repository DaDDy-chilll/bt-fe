<template>
  <div class="bg-accentwhite">
    <AppHeader />
    <div class="flex w-full h-full  overflow-y-auto">
      <SideMenu />
      <div class="p-3 w-full  bg-gray-100 h-full overflow-y-auto">
        <slot />
      </div>
    </div>
  </div>
</template>