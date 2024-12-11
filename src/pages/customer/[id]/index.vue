<script setup lang="ts">
import { ref } from "vue";
import CustomerData from "./../customers.json";
import BackArrow from "@/assets/icons/back_icon.vue";

//Fetch Customer
const selectedCustomer = CustomerData.find(customer => customer.id === 1); // 1 is the id of the customer to be selected
</script>

<template>
    <div class="w-full bg-accentwhite drop-shadow-md rounded-lg dark:bg-primarydark h-[calc(100vh-73px)]">
        <Card class="h-full dark:bg-primarydark dark:text-accentwhite">
            <template #header>
                <div class="flex items-center justify-center relative pt-5 mb-5">
                    <BackArrow class="absolute left-5 cursor-pointer w-10 h-10 text-accent1 dark:text-accent2" @click="$router.back()" />
                    <h1 class="text-2xl font-bold">Customer Information</h1>
                </div>
            </template>
            <template #content>
                <div class="grid grid-cols-12 mb-8">
                    <div class="col-start-6 dark:text-accentwhite dark:opacity-60">First Name</div>
                    <div class="col-start-8 col-span-6 dark:text-accentwhite">{{ selectedCustomer?.firstname }}</div>
                </div>
                <div class="grid grid-cols-12 mb-8">
                    <div class="col-start-6 dark:text-accentwhite dark:opacity-60">Last Name</div>
                    <div class="col-start-8 col-span-6 dark:text-accentwhite">{{ selectedCustomer?.lastname }}</div>
                </div>
                <div class="grid grid-cols-12 mb-8">
                    <div class="col-start-6 dark:text-accentwhite dark:opacity-60">Phone</div>
                    <div class="col-start-8 col-span-6 dark:text-accentwhite">{{ selectedCustomer?.phone }}</div>
                </div>
                <div class="grid grid-cols-12 mb-8">
                    <div class="col-start-6 dark:text-accentwhite dark:opacity-60">NRC No.</div>
                    <div class="col-start-8 col-span-6 dark:text-accentwhite">{{ selectedCustomer?.nrc }}</div>
                </div>
                <div class="grid grid-cols-12 mb-8">
                    <div class="col-start-6 dark:text-accentwhite dark:opacity-60">Email</div>
                    <div class="col-start-8 col-span-6 dark:text-accentwhite">{{ selectedCustomer?.email }}</div>
                </div>
                <div class="grid grid-cols-12 mb-8">
                    <div class="col-start-6 dark:text-accentwhite dark:opacity-60">Social Link</div>
                    <div class="col-start-8 text-blue-500">
                        <a :href="selectedCustomer?.social" target="_blank">{{ selectedCustomer?.social }}</a>
                    </div>
                </div>
                <div class="grid grid-cols-12 mb-8">
                    <div class="col-start-6 dark:text-accentwhite dark:opacity-60">Customer Status</div>
                    <div 
                        class="col-start-8 text-center"
                        :class="{
                            'bg-green-300 dark:bg-green-500 px-2 py-1 rounded-md': selectedCustomer?.status === 'No issues',
                            'bg-yellow-300 dark:bg-yellow-500 px-2 py-1 rounded-md': selectedCustomer?.status === 'Warning',
                            'bg-red-300 dark:bg-red-500 px-2 py-1 rounded-md': selectedCustomer?.status === 'Do Not Sell'
                        }"
                    >
                        {{ selectedCustomer?.status }}
                    </div>
                </div>
                <div class="grid grid-cols-12 mb-8">
                    <div class="col-start-6 dark:text-accentwhite dark:opacity-60">Memo</div>
                    <div class="col-start-8 col-span-6">
                        <div v-for="memo in selectedCustomer?.memo" :key="memo.name">
                            <!-- <div>{{ memo.name }}</div> -->
                            <!-- <div>{{ memo.date }}</div> -->
                            <div class="whitespace-pre-wrap">{{ memo.text }}</div>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-12 mb-8">
                    <div class="col-start-6 dark:text-accentwhite dark:opacity-60">Customer Level</div>
                    <div class="col-start-8 col-span-6">
                        <div class="flex items-center gap-2">
                            <img :src="selectedCustomer?.level == 'gold' ? '/_nuxt/assets/icons/gold.svg' : selectedCustomer?.level == 'silver' ? '/_nuxt/assets/icons/silver.svg' : selectedCustomer?.level == 'bronze' ? '/_nuxt/assets/icons/bronze.svg' : ''" class="w-6 h-6" />
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
