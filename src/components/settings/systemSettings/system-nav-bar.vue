<script setup lang="ts">
import NavBar from "@/components/settings/nav-bar.vue";

const links = [
  { name: "Permission", path: "/settings/systemSettings/" },
  { name: "Shop Profile", path: "/settings/systemSettings/shopProfile" },
  { name: "My Profile", path: "/settings/systemSettings/myProfile" },
];
</script>
<template>
  <NavBar :links="links" title="System Setting" />
</template>
