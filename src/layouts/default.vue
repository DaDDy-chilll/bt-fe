<template>
  <div class="bg-accentwhite">
    <AppHeader />
    <div class="flex">
      <SideMenu />
      <div class="p-6 w-[calc(100vw-15rem)]">
        <slot />
      </div>
    </div>
    <AppFooter />
  </div>
</template>