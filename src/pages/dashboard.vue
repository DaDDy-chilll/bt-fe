<script setup lang="ts">
import { ref, onMounted } from "vue";
import Warehouse from "./product/warehouse.json";
import { testApi } from "~/apis/auth";

const warehouses = Warehouse;
const selectedWarehouse = ref("");
const isChecked = ref(true);

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const test = async () => {
  const response = await testApi();
  console.log("success"+"_"+response);
  console.log(response);
  return response;
}

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Resell",
        data: Array.from(
          { length: 7 },
          () => Math.floor(Math.random() * 91) + 10
        ),
        fill: false,
        borderColor: documentStyle.getPropertyValue("--p-cyan-500"),
        tension: 0.4,
      },
      {
        label: "In-Stock",
        data: Array.from(
          { length: 7 },
          () => Math.floor(Math.random() * 91) + 10
        ),
        fill: false,
        borderColor: documentStyle.getPropertyValue("--p-gray-500"),
        tension: 0.4,
      },
      {
        label: "Order",
        data: Array.from(
          { length: 7 },
          () => Math.floor(Math.random() * 91) + 10
        ),
        fill: false,
        borderColor: documentStyle.getPropertyValue("--p-blue-500"),
        tension: 0.4,
      },
      {
        label: "Damaged",
        data: Array.from(
          { length: 7 },
          () => Math.floor(Math.random() * 91) + 10
        ),
        fill: false,
        borderColor: documentStyle.getPropertyValue("--p-red-500"),
        tension: 0.4,
      },
    ],
  };
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color"
  );
  const surfaceBorder = documentStyle.getPropertyValue(
    "--p-content-border-color"
  );

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};

const orders = ref([
  { id: "#373721", customer: 'John Doe', price: 100000, payment: 'Paid', status: 'Overdue' },
  { id: "#373722", customer: 'Jane Doe', price: 200000, payment: 'Unpaid', status: 'Pending' },
  { id: "#373723", customer: 'Jim Beam', price: 300000, payment: 'Paid', status: 'Completed' },
  { id: "#373724", customer: 'John Doe', price: 100000, payment: 'Paid', status: 'Overdue' },
  { id: "#373725", customer: 'Jane Doe', price: 200000, payment: 'Unpaid', status: 'Pending' },
]);
</script>

<template>
  <div class="">
    <!-- Header -->
    <div class="w-full rounded-lg">
      <!-- Top -->
      <div class="flex justify-between items-center">
        <div class="float-left">
          <Select
            v-model="selectedWarehouse"
            :options="warehouses"
            optionLabel="value"
            optionValue="id"
            placeholder="Select Warehouse"
            class="w-full md:w-48 bg-primarylight text-xs text-accentwhite"
          />
        </div>
        <div class="float-right">
          <p class="text-sm text-secondarydark">
            Welcome John Doe / Shwe Nan Daw
          </p>
          <Button class="text-xs py-1 px-6 mt-3 text-primarylight hover:text-primary" @click="test">
            test Api
          </Button>
        </div>
      </div>
    </div>
    <!-- Content -->
    <div class="grid grid-cols-4 gap-4 my-2">
      <!-- Total Income -->
      <div class="col-span-1">
        <div class="h-10"></div>
        <div class="p-4 bg-accentwhite rounded-lg drop-shadow-md">
          <p class="text-sm text-secondarydark mb-4 font-bold">Total Income</p>
          <div class="flex justify-start items-center">
            <img
              src="@/assets/icons/Income.png"
              alt="dollar"
              class="w-10 h-10 mr-6"
            />
            <p class="text-xl text-primarylight font-bold">100,000,000</p>
          </div>
        </div>
      </div>
      <!-- Total Cost -->
      <div class="col-span-1">
        <div class="h-10"></div>
        <div class="p-4 bg-accentwhite rounded-lg drop-shadow-md">
          <p class="text-sm text-secondarydark mb-4 font-bold">Test</p>
          <div class="flex justify-start items-center">
            <img
              src="@/assets/icons/Cost.png"
              alt="dollar"
              class="w-10 h-10 mr-6"
            />
            <p class="text-xl text-primarylight font-bold">10,000,000</p>
          </div>
        </div>
      </div>
      <!-- Total Profit -->
      <div class="col-span-1">
        <div class="h-10 flex justify-end items-start">
          <Select
            v-model="selectedTimeRange"
            :options="[
              { label: 'Past 7 Days', value: 'past7days' },
              { label: 'Past Month', value: 'pastmonth' },
              { label: 'Past Year', value: 'pastyear' },
            ]"
            optionLabel="label"
            optionValue="value"
            placeholder="Past 7 Days"
            class="w-full md:w-36 bg-primarylight text-xs text-accentwhite"
          />
        </div>
        <div class="p-4 bg-accentwhite rounded-lg drop-shadow-md">
          <p class="text-sm text-secondarydark mb-4 font-bold">Total Profit</p>
          <div class="flex justify-start items-center">
            <img
              src="@/assets/icons/Profit.png"
              alt="dollar"
              class="w-10 h-10 mr-6"
            />
            <p class="text-xl text-primarylight font-bold">1,000,000</p>
          </div>
        </div>
      </div>
      <!-- Gold Price  -->
      <div class="col-span-1 bg-accentwhite drop-shadow-md rounded-lg p-3">
        <div class="flex justify-between items-center">
          <p class="text-sm text-secondarydark font-bold">Gold Price</p>
          <Select
            v-model="selectedGoldPriceRange"
            :options="[
              { label: 'All', value: 'all' },
              { label: '24K', value: '24k' },
              { label: '22K', value: '22k' },
              { label: '18K', value: '18k' },
            ]"
            optionLabel="label"
            optionValue="value"
            placeholder="24K"
            class="w-full md:w-24 bg-primarylight text-xs text-accentwhite"
          />
        </div>
        <div class="flex justify-between items-center mx-4 mt-2"></div>
        <p class="text-xl flex justify-center items-center mt-2 font-bold">
          <span class="text-xs">YGEA</span>
          <span class="text-2xl text-green-500 ml-3">60,000,000</span>
        </p>
        <div class="flex justify-center">
          <Button
            class="text-xs py-1 px-6 mt-3 bg-primarylight text-accentwhite"
          >
            Change Price
          </Button>
        </div>
      </div>
    </div>
    <!-- Data Chart & other-->
    <div class="grid grid-cols-3 gap-4 my-3">
      <!-- Data Chart -->
      <div class="col-span-2 bg-accentwhite rounded-lg drop-shadow-md p-4">
        <p class="text-sm text-secondarydark mb-2 font-bold">Data Chart</p>
        <Chart
          type="line"
          :data="chartData"
          :options="chartOptions"
          class="h-[14rem]"
        />
      </div>
      <!-- Other -->
      <div class="col-span-1 bg-accentwhite rounded-lg drop-shadow-md p-4 h-72">
        <p class="text-sm text-secondarydark  font-bold mb-6">
          Awaiting Payments From Customers<span
            class="text-base ml-2  text-red-500"
            >(99+)</span
          >
        </p>
        <!-- Number of Overdue Orders -->
        <div
          class="text-sm flex justify-between items-center text-secondarydark mb-4  border border-primarylight rounded-lg px-3 py-3"
        >
          <p>Number of Overdue Orders</p>
          <p class="text-primarylight text-xl font-bold">30</p>
        </div>
        <!-- Total amount to be paid -->
        <div
          class="text-sm flex justify-between items-center text-secondarydark mb-4 border border-primarylight rounded-lg px-3 py-3"
        >
          <p>Total amount to be paid</p>
          <p class="text-primarylight text-xl font-bold">300,000,000</p>
        </div>
        <!-- Total Customer need to pay -->
        <div
          class="text-sm flex justify-between items-center text-secondarydark mb-4 border border-primarylight rounded-lg px-3 py-3"
        >
          <p>Total Customer need to pay</p>
          <p class="text-primarylight text-xl font-bold">30</p>
        </div>
      </div>
    </div>
    <!-- Order Status & Other -->
    <div class="grid grid-cols-3 gap-4 my-3">
      <!-- Order Status -->
      <div class="col-span-2 bg-accentwhite rounded-lg drop-shadow-md p-4 h-72">
        <p class="text-sm text-secondarydark mb-2 font-bold">Order Status</p>
        <DataTable :value="orders" class="p-datatable-sm px-2 py-2">
          <Column field="id" header="Order No" class="text-xs" headerClass="text-xs bg-primarylight text-accentwhite"></Column>
          <Column field="customer" header="Customer" class="text-xs" headerClass="text-xs bg-primarylight text-accentwhite" ></Column>
          <Column field="price" header="Price" class="text-xs" headerClass="text-xs bg-primarylight text-accentwhite" ></Column>
          <Column field="payment" header="Payment" class="text-xs" headerClass="text-xs bg-primarylight text-accentwhite" ></Column>
          <Column field="status" header="Status" class="text-xs" headerClass="text-xs bg-primarylight text-accentwhite" ></Column>
        </DataTable>
        <div class="flex justify-end items-center mb-2">
          <Button class="text-xs py-1 px-6 mt-3 text-primarylight hover:text-primary">
            View All
          </Button>
        </div>
      </div>
      <!-- Other -->
      <div class="col-span-1 bg-accentwhite rounded-lg drop-shadow-md p-4 h-72">
        <p class="text-sm text-secondarydark mb-6 font-bold">
          Total Number of Orders
          <span class="text-base ml-2  text-red-500"
            >(99+)</span
          >
        </p>
        <div class="flex justify-between items-center text-secondarydark mb-4 border border-primarylight rounded-lg px-3 py-3">
          <p>Number of Overdue Orders</p>
          <p class="text-primarylight text-xl font-bold">30</p>
        </div>
        <div class="flex justify-between items-center text-secondarydark mb-4 border border-primarylight rounded-lg px-3 py-3">
          <p>Total amount to be paid</p>
          <p class="text-primarylight text-xl font-bold">300,000,000</p>
        </div>
        <div class="flex justify-between items-center text-secondarydark mb-4 border border-primarylight rounded-lg px-3 py-3">
          <p>Total Customer need to pay</p>
          <p class="text-primarylight text-xl font-bold">30</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.p-select-dropdown > svg) {
  @apply text-accentwhite;
}
:deep(.p-select-label, .p-placeholder) {
  @apply text-accentwhite;
}
</style>
