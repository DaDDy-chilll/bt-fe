<template>
  <div class="bg-gray-100 dark:bg-secondarydark ">
    <AppHeader />
    <div class="flex w-full h-full fixed overflow-y-auto">
      <SideMenu />
      <div class="p-3 w-full  h-full overflow-y-auto dark:bg-secondarydark">
        <slot />
      </div>
    </div>
  </div>
</template>