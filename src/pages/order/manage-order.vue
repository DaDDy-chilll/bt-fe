<script setup lang="ts">
import { ref } from "vue";
import order from "./order.json";
import viewOrderModal from "~/components/order/viewOrderModal.vue";
import editOrderModal from "~/components/order/editOrderModal.vue";
import refundModal from "~/components/order/refundModal.vue";

//constants
const orders = ref(order);
const op = ref();
const filterOp = ref();
const expandedRows = ref([]);
const showOrderModal = ref(false);
const showEditOrderModal = ref(false);
const showRefundModal = ref(false);
//filter items
const filterItems = ref([
  {
    name: "Order ID",
    type: "select",
    icon: "pi pi-align-justify",
    isSelected: true,
    filterItems: {
      value: "",
      list: [],
    },
  },
  {
    name: "Customer",
    type: "text",
    icon: "pi pi-align-justify",
    isSelected: true,
    filterItems: {
      value: "",
      list: [],
    },
  },
  {
    name: "Staff",
    type: "select",
    icon: "pi pi-tag",
    isSelected: true,
    filterItems: {
      value: "",
      list: [],
    },
  },
  {
    name: "Date",
    type: "date",
    icon: "pi pi-box",
    isSelected: true,
    filterItems: {
      value: "",
      list: [],
    },
  },
  {
    name: "Gold Type",
    type: "select",
    icon: "pi pi-tag",
    isSelected: true,
    filterItems: {
      value: "",
      list: [],
    },
  },
  {
    name: "Phone",
    type: "text",
    icon: "pi pi-tag",
    isSelected: true,
    filterItems: {
      value: "",
      list: [],
    },
  },
  {
    name: "Status",
    type: "select",
    icon: "pi pi-user",
    isSelected: true,
    filterItems: {
      value: "",
      list: [],
    },
  },
  {
    name: "Address",
    type: "text",
    icon: "pi pi-user",
    isSelected: true,
    filterItems: {
      value: "",
      list: [],
    },
  },
  {
    name: "Price",
    type: "text",
    icon: "pi pi-user",
    isSelected: true,
    filterItems: {
      value: "",
      list: [],
    },
  },
]);

const textDialog = ref(false);
const selectDialog = ref(false);

/**
 * Toggle
 * @param event
 */
const toggle = (event) => {
  console.log(event);
  op.value.toggle(event);
};

/**
 * Filter
 * @param event
 */
const filter = (event) => {
  filterOp.value.toggle(event);
};

const filterDialog = (type) => {
  filterDialogClose();
  if (type === "text") {
    textDialog.value = true;
  } else if (type === "select") {
    selectDialog.value = true;
  }
};

/**
 * Filter Dialog Close
 */
const filterDialogClose = () => {
  selectDialog.value = false;
  textDialog.value = false;
};

/**
 * Filter Selected
 * @param event
 */
const filterSelected = (event:any) => {
  filterOp.value.toggle();
  filterItems.value.find((item) => item.name === event.name).isSelected = true;
};

/***** Functions *****/

/**
 * On Row Expand
 * @param event
 */
const onRowExpand = (event:any) => {
  console.log(event);
};

/**
 * On Row Collapse
 * @param event
 */
const onRowCollapse = (event:any) => {
  console.log(event);
};

/**
 * View Order
 * @param orderNumber
 */
const viewOrder = (orderNumber:any) => {
  showOrderModal.value = true;
};

/**
 * Edit Order
 * @param orderNumber
 */
const editOrder = (orderNumber:any) => {
  showEditOrderModal.value = true;
};

/**
 * Refund Order
 * @param orderNumber
 */
const refundOrder = (orderNumber:any) => {
  showRefundModal.value = true;
};

</script>

<template>
  <div class="justify-between items-start w-full">
    <div class="w-full bg-accentwhite dark:bg-primarydark drop-shadow-md rounded-lg">
      <slot-header
        title="Manage Orders"
        :button="{
          label: 'New Order',
          link: '/order/new-order',
          icon: 'pi pi-plus',
        }"
      />
      <div class="flex justify-center items-center px-6">
        <div class="w-full float-left flex justify-start items-center ml-3">
          <filter-list
            :filterItems="filterItems"
            class="flex justify-start items-center"
          />
        </div>
      </div>
      <DataTable
        :value="orders"
        stripedRows
        class="w-full px-6 my-5 text-sm"
        scrollable
        resizableColumns
        columnResizeMode="fit"
        showGridlines
        paginator
        :rows="14"
        :rowsPerPageOptions="[10, 20, 50]"
        :totalRecords="orders.length"
        expandableRows
        v-model:expandedRows="expandedRows"
        @rowExpand="onRowExpand"
        @rowCollapse="onRowCollapse"
      >
        <!--Start Expand ...<<<<<Need To Fix Show Data>>>>>>>-->
        <template #expansion="slotProps">
          <div class="p-3">
            <DataTable :value="slotProps.data.m_order_products" class="text-sm">
              <Column field="product_id" header="Product ID"></Column>
              <Column field="quantity" header="Quantity"></Column>
              <Column field="est_price" header="Est. Price"></Column>
              <Column field="ayoutwat" header="Ayoutwat"></Column>
              <Column field="larkha" header="Larkha"></Column>
              <Column field="sub_total" header="Sub Total"></Column>
              <Column field="status" header="Status">
                <template #body="productProps">
                  <span :class="productProps.data.status == 1 ? 'bg-green-500 rounded-lg text-white px-2 py-1' : 'bg-red-500 rounded-lg text-white px-2 py-1'">
                    {{ productProps.data.status == 1 ? 'Active' : 'Inactive' }}
                  </span>
                </template>
              </Column>
            </DataTable>
          </div>
        </template>

        <Column :expander="true" headerStyle="width: 3rem" />
        <!--End Expand-->
        <Column field="no" header="No" class="w-10">
          <template #body="slotProps">
            <span class=""
              >{{ slotProps.index + 1 }}</span
            >
          </template>
        </Column>
        <Column field="order_number" header="Order ID" class="w-32" sortable>
          <template #body="slotProps">
            <span class="text-primarylight dark:text-accent2 underline"
              >#{{ slotProps.data.order_number }}</span
            >
          </template>
        </Column>
        <Column field="customer" header="Customer" class="w-40">
          <template #body="slotProps">
            <span class=""
              >{{ slotProps.data.customer[0].customer_Name }}</span
            >
          </template>
        </Column>
        <Column field="phone" header="Phone" class="w-32 text-left">
          <template #body="slotProps">
            <span class=""
              >{{ slotProps.data.customer[0].customer_Phone }}</span
            >
          </template>
        </Column>
        <Column field="address" header="Address" class="w-32">
          <template #body="slotProps">
            <span class="" v-tooltip.top="slotProps.data.customer[0].customer_Address"     
              >{{ slotProps.data.shipping_prefecture }}</span
            >
          </template>
        </Column>
        <Column
          field="quantity"
          header="Quantity"
          class="w-32 text-center"
        >
          <template #body="slotProps">
            <span class=""
              >{{ slotProps.data.m_order_products.reduce((acc: number, curr: any) => acc + curr.quantity, 0) }}</span
            >
          </template>
        </Column>
        <Column field="price" header="Price" class="w-32">
          <template #body="slotProps">
            <span class=""
              >{{ slotProps.data.m_order_products.reduce((acc: number, curr: any) => acc + curr.sub_total, 0) }}</span
            >
          </template>
        </Column>
        <Column field="staff" header="Staff Name" class="w-32 text-left">
          <template #body="slotProps">
            <span class=""
              >{{ slotProps.data.sales_person[0].sales_person_Name }}</span
            >
          </template>
        </Column>
        <Column
          field="order_date"
          header="Date"
          class="w-40 text-center"
        ></Column>
        <Column field="shipping_date" header="Shipping" class="w-40 text-center"></Column>
        <Column field="total_order" header="Total Order" class="w-40 text-center">
          <template #body="slotProps">
            <span class=""
              >{{ slotProps.data.m_order_products.length }}</span
            >
          </template>
        </Column>
        <Column field="status" header="Status" class="w-40 text-center">
          <template #body="slotProps">
            <span :class="slotProps.data.status==1 ? 'bg-green-500 rounded-lg text-white px-2 py-1' : 'bg-red-500 rounded-lg text-white px-2 py-1'"
              >{{ slotProps.data.status==1 ? 'Fully Paid' : 'Partial Paid' }}</span
            >
          </template>
        </Column>
        <Column
          field="action"
          header="Action"
          class="w-40"
          alignFrozen="right"
          frozen
        >
          <template #body="slotProps">
            <Button
              icon="pi pi-ellipsis-v"
              class="text-primarylight dark:text-accentwhite"
              @click="toggle"
            />
            <Popover ref="op" class="bg-primarylight dark:bg-accent2 text-accentwhite dark:text-accentblack">
              <div class="flex flex-col gap-4 justify-start items-start">
                <Button @click="viewOrder(slotProps.data.order_number)" label="View" icon="pi pi-eye" class="dark:text-accentblack" />
                <Button @click="editOrder(slotProps.data.order_number)" label="Edit" icon="pi pi-pencil" class="dark:text-accentblack" />
                <Button @click="refundOrder(slotProps.data.order_number)" label="Refund" icon="pi pi-undo" class="dark:text-accentblack" />
              </div>
            </Popover>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <viewOrderModal :showOrderModal="showOrderModal" @update:showOrderModal="showOrderModal = $event" />
  <editOrderModal :showEditOrderModal="showEditOrderModal" @update:showEditOrderModal="showEditOrderModal = $event" />
  <refundModal :showRefundModal="showRefundModal" @update:showRefundModal="showRefundModal = $event" />
</template>
<style scoped>
:deep(.p-paginator) {
  @apply dark:bg-primarydark;
  @apply dark:text-accentwhite;
}

 :deep(.p-paginator-rpp-dropdown) {
    @apply dark:bg-transparent;
    @apply dark:text-accentwhite;
    @apply dark:border-1 dark:border-b-gray-400;
  }

  :deep(.p-select-label) {
    @apply dark:text-accentwhite;
  }

  :deep(.p-datatable-empty-message) {
    @apply dark:bg-transparent;
  }

  :deep(.p-datatable-thead > tr > th) {
    @apply dark:bg-primarydark;
    @apply dark:text-accentwhite;
  }

  :deep(.p-datatable-tbody > tr > td) {
    @apply dark:bg-primarydark;
    @apply dark:text-accentwhite;
  }


  </style>

