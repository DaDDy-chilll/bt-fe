<script setup lang="ts">
import { ref } from "vue";
import PanelMenu from "primevue/panelmenu";


const items = ref([
  {
    label: "Dashboard",
    icon: "pi pi-fw pi-th-large",
    src: "/dashboard",
  },
  {
    label: "Order",
    icon: "pi pi-fw pi-pencil",
    shortcut: "pi pi-fw pi-chevron-down",
    items: [
      {
        label: "New Order",
        icon: "pi pi-fw pi-plus",
        src: "/order/new-order",
      },
      {
        label: "Manage Orders",
        icon: "pi pi-fw pi-pencil",
        src: "/order/manage-order",
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
        src: "/product",
      },
      {
        label: "Manage Products",
        icon: "pi pi-fw pi-pencil",
        src: "/product/manage",
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
        src: "/supplier",
      },
      {
        label: "Manage Suppliers",
        icon: "pi pi-fw pi-pencil",
        src: "/supplier/manage",
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
        src: "/customer",
      },
      {
        label: "Mail Marketing",
        icon: "pi pi-fw pi-envelope",
        src: "/customer/marketing",
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
        src: "/warehouse",
      },
      {
        label: "Check Warehouse",
        icon: "pi pi-fw pi-pencil",
        src: "/warehouse/check",
      },
    ],
  },
  {
    label: "Tracking",
    icon: "pi pi-fw pi-compass",
  },
  {
    label: "Report(Pro)",
    icon: "pi pi-fw pi-chart-line",
    badge: "Pro",
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
        src: "/tools/gold-calculate",
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
  <div class=" w-64 bg-primary px-3">
    <img
      src="../assets/images/logo.png"
      alt="logo"
      class="w-full h-12 object-contain"
    />
    <PanelMenu :model="items" class="pt-4">
      <template #item="{ item }">
        <NuxtLink
          v-ripple
          class="flex align-items-center items-center py-2 cursor-pointer"
          :to="item.src"
        >
          <span :class="[item.icon, 'text-muted']" />
          <span class="ml-2 text-muted">{{ item.label }}</span>
          <Badge v-if="item.badge" class="ml-auto bg-accent2" :value="item.badge" />
          <span v-if="item.shortcut" class="ml-auto">
            <span :class="[item.shortcut, 'text-muted']" />
          </span>
        </NuxtLink>
      </template>
    </PanelMenu>
  </div>
</template>

<style></style>
