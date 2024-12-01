<script setup>
import NavBar from "@/components/settings/nav-bar.vue";

const links = [
  { name: "Today Gold Master", path: "/settings/masterSettings/" },
  { name: "Gold Master", path: "/settings/masterSettings/gold" },
  { name: "Gem Master", path: "/settings/masterSettings/gem" },
  { name: "Unit Master", path: "/settings/masterSettings/unit" },
];
</script>

<template>
  <NavBar :links="links" title="Master Setting" />
</template>