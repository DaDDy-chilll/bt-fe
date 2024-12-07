<script setup lang="ts">
import { ref } from "vue";
import CustomerData from "./customers.json";
import BackArrow from "@/assets/icons/back_icon.vue";

//Fetch Customer
const selectedCustomer = CustomerData.find(customer => customer.id === 1); // 1 is the id of the customer to be selected
</script>

<template>
    <div>
        <Card>
            <template #header>
                <div class="flex items-center justify-center relative pt-5 mb-5">
                    <BackArrow class="absolute left-5" @click="$router.back()" />
                    <h1 class="text-2xl font-bold">Customer Information</h1>
                </div>
            </template>
            <template #content>
                <div class="grid grid-cols-12 mb-8">
                    <div class="col-start-6">First Name</div>
                    <div class="col-start-8 col-span-6">{{ selectedCustomer?.firstname }}</div>
                </div>
                <div class="grid grid-cols-12 mb-8">
                    <div class="col-start-6">Last Name</div>
                    <div class="col-start-8 col-span-6">{{ selectedCustomer?.lastname }}</div>
                </div>
                <div class="grid grid-cols-12 mb-8">
                    <div class="col-start-6">Phone</div>
                    <div class="col-start-8 col-span-6">{{ selectedCustomer?.phone }}</div>
                </div>
                <div class="grid grid-cols-12 mb-8">
                    <div class="col-start-6">NRC No.</div>
                    <div class="col-start-8 col-span-6">{{ selectedCustomer?.nrc }}</div>
                </div>
                <div class="grid grid-cols-12 mb-8">
                    <div class="col-start-6">Email</div>
                    <div class="col-start-8 col-span-6">{{ selectedCustomer?.email }}</div>
                </div>
                <div class="grid grid-cols-12 mb-8">
                    <div class="col-start-6">Social Link</div>
                    <div class="col-start-8 text-blue-500">
                        <a :href="selectedCustomer?.social" target="_blank">{{ selectedCustomer?.social }}</a>
                    </div>
                </div>
                <div class="grid grid-cols-12 mb-8">
                    <div class="col-start-6">Customer Status</div>
                    <div 
                        class="col-start-8 text-center"
                        :class="{
                            'bg-green-300 px-2 py-1 rounded-md': selectedCustomer?.status === 'No issues',
                            'bg-yellow-300 px-2 py-1 rounded-md': selectedCustomer?.status === 'Warning',
                            'bg-red-300 px-2 py-1 rounded-md': selectedCustomer?.status === 'Do Not Sell'
                        }"
                    >
                        {{ selectedCustomer?.status }}
                    </div>
                </div>
                <div class="grid grid-cols-12 mb-8">
                    <div class="col-start-6">Memo</div>
                    <div class="col-start-8 col-span-6">
                        <div v-for="memo in selectedCustomer?.memo" :key="memo.id">
                            <!-- <div>{{ memo.name }}</div> -->
                            <!-- <div>{{ memo.date }}</div> -->
                            <div class="whitespace-pre-wrap">{{ memo.text }}</div>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-12 mb-8">
                    <div class="col-start-6">Customer Level</div>
                    <div class="col-start-8 col-span-6">
                        <div class="flex items-center gap-2">
                            <img :src="selectedCustomer?.level.icon" :alt="selectedCustomer?.level.value" class="w-6 h-6" />
                            <!-- <div>{{ selectedCustomer?.level.value }}</div> -->
                        </div>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>


<style scoped>
/* Add any necessary styles here */
</style>
