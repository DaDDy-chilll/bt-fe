<script setup lang="ts">
import { ref } from "vue";
import PanelMenu from "primevue/panelmenu";

const items = ref([
  {
    label: "Dashboard",
    icon: "pi pi-fw pi-th-large",
  },
  {
    label: "Order",
    icon: "pi pi-fw pi-pencil",
    shortcut: "pi pi-fw pi-chevron-down",
    items: [
      {
        label: "New Order",
        icon: "pi pi-fw pi-plus",
      },
      {
        label: "Manage Orders",
        icon: "pi pi-fw pi-pencil",
      },
    ],
  },
  {
    label: "Products",
    icon: "pi pi-fw pi-box",
    shortcut: "pi pi-fw pi-chevron-down",
    items: [
      {
        label: "New Products",
        icon: "pi pi-fw pi-plus",
      },
      {
        label: "Manage Products",
        icon: "pi pi-fw pi-pencil",
      },
    ],
  },
  {
    label: "Suppliers",
    icon: "pi pi-fw pi-users",
    shortcut: "pi pi-fw pi-chevron-down",
    items: [
      {
        label: "New Supplier",
        icon: "pi pi-fw pi-plus",
      },
      {
        label: "Manage Suppliers",
        icon: "pi pi-fw pi-pencil",
      },
    ],
  },
  {
    label: "Customers",
    icon: "pi pi-fw pi-id-card",
    shortcut: "pi pi-fw pi-chevron-down",
    items: [
      {
        label: "Manage Customers",
        icon: "pi pi-fw pi-pencil",
      },
      {
        label: "Mail Marketing",
        icon: "pi pi-fw pi-envelope",
      },
    ],
  },
  {
    label: "Warehouse",
    icon: "pi pi-fw pi-home",
    shortcut: "pi pi-fw pi-chevron-down",
    items: [
         {
        label: "New Warehouse",
        icon: "pi pi-fw pi-plus",
      },
      {
        label: "Check Warehouse",
        icon: "pi pi-fw pi-pencil",
      },
    ],
  },
  {
    label: "Tracking",
    icon: "pi pi-fw pi-compass"
  },
  {
    label: "Report(Pro)",
    icon: "pi pi-fw pi-chart-line",
  },
  {
    label: "Invoice",
    icon: "pi pi-fw pi-file",
    shortcut: "pi pi-fw pi-chevron-down",
    items: [
      {
        label: "Invoice List",
        icon: "pi pi-fw pi-pencil",
      },
      {
        label: "Invoice Setting",
        icon: "pi pi-fw pi-pencil",
      },
    ],
  },
  {
    label: "Tools",
    icon: "pi pi-fw pi-cog",
    shortcut: "pi pi-fw pi-chevron-down",
    items: [
      {
        label: "Gold Calculate",
        icon: "pi pi-fw pi-calculator",
      },
    ],
  },
  {
    label: "Settings",
    icon: "pi pi-fw pi-cog",
    items: [
      {
        label: "Profile Settings",
        icon: "pi pi-fw pi-pencil",
      },
      {
        label: "System Settings",
        icon: "pi pi-fw pi-pencil",
      },
    ],
  },
]);
</script>

<template>
  <div class="w-60 bg-primary h-[calc(100vh-(2.75rem))] px-5">
    <img src="../assets/images/logo.png" alt="logo" class="w-full h-12 object-contain " />
    <PanelMenu :model="items" class="pt-4">
      <template #item="{ item }">
        <a v-ripple class="flex align-items-center items-center  py-2 cursor-pointer">
          <span :class="[item.icon, 'text-muted']" />
          <span class="ml-2 text-muted">{{ item.label }}</span>
          <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
          <span v-if="item.shortcut" class="ml-auto">
            <span :class="[item.shortcut, 'text-muted']" />
          </span>
        </a>
      </template>
    </PanelMenu>
  </div>
</template>

<style></style>
