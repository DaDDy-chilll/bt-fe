<script setup lang="ts">
import BackArrow from "@/assets/icons/back_icon.vue";
import SupplierData from "../supplierdata.json";
import { ref } from "vue";

// Fetch Supplier
const selectedSupplier = SupplierData.find(supplier => supplier.id === 1);

const memo = ref([]);

</script>

<template>
    <div class="grid grid-cols-2 gap-5 dark:bg-secondarydark rounded-lg py-2">
        <Card class="dark:bg-primarydark">
            <template #header>
                <div class="flex items-center justify-center relative pt-5">
                    <BackArrow class="absolute left-5 cursor-pointer w-10 h-10 text-accent1 dark:text-accent2" @click="$router.back()" />
                    <div class="flex items-center gap-2">
                        <i class="pi pi-user text-2xl text-accent1 dark:text-accent2"></i>
                        <span class="text-2xl font-bold dark:text-accentwhite">{{ selectedSupplier?.code }}</span>
                    </div>
                </div>
            </template>
            <template #content>
                <div class="flex flex-col px-10 md:px-20 py-5">
                    <div class="mb-5">
                        <div class="opacity-50 mb-2 dark:text-accentwhite">Supplier Name</div>
                        <div class="font-bold dark:text-accentwhite">{{ selectedSupplier?.name }}</div>
                    </div>
                    <div>
                        <div class="opacity-50 mb-2 dark:text-accentwhite">Supplier Branch</div>
                        <div class="font-bold dark:text-accentwhite">{{ selectedSupplier?.branch }}</div>
                    </div>
                    <!-- Divider -->
                    <div class="h-[1px] w-full bg-gray-300 my-3"></div>
                    <div class="mb-5">
                        <div class="opacity-50 mb-2 dark:text-accentwhite">Contact Name</div>
                        <div class="font-bold dark:text-accentwhite">{{ selectedSupplier?.contact_name }}</div>
                    </div>
                    <div>
                        <div class="opacity-50 mb-2 dark:text-accentwhite">Contact Start Date</div>
                        <div class="font-bold dark:text-accentwhite">{{ selectedSupplier?.contact_start_date }}</div>
                    </div>
                    <!-- Divider -->
                    <div class="h-[1px] w-full bg-gray-300 my-3"></div>
                    <div class="mb-5">
                        <div class="opacity-50 mb-2 dark:text-accentwhite">Email</div>
                        <div class="font-bold dark:text-accentwhite">{{ selectedSupplier?.email }}</div>
                    </div>
                    <div class="grid grid-cols-2">
                        <!-- phone1 -->
                        <div>
                            <div class="opacity-50 mb-2 dark:text-accentwhite">Phone 1</div>
                            <div class="font-bold dark:text-accentwhite">{{ selectedSupplier?.phone[0] }}</div>   
                        </div>
                        <!-- phone2 -->
                        <div>
                            <div class="opacity-50 mb-2 dark:text-accentwhite">Phone 2</div>
                            <div class="font-bold dark:text-accentwhite">{{ selectedSupplier?.phone[1] }}</div>
                        </div>
                    </div>
                    <!-- Divider -->
                    <div class="h-[1px] w-full bg-gray-300 my-5"></div>
                    <div class="grid grid-cols-2 mb-5">
                        <div>
                            <div class="opacity-50 mb-2 dark:text-accentwhite">State</div>
                            <div class="font-bold dark:text-accentwhite">{{ selectedSupplier?.state }}</div>
                        </div>
                        <div>
                            <div class="opacity-50 mb-2 dark:text-accentwhite">City</div>
                            <div class="font-bold dark:text-accentwhite">{{ selectedSupplier?.city }}</div>
                        </div>
                    </div>
                    <div class="opacity-50 mb-2 dark:text-accentwhite">Address</div>
                    <div class="font-bold dark:text-accentwhite">{{ selectedSupplier?.address }}</div>
                    <!-- Divider -->
                    <div class="h-[1px] w-full bg-gray-300 my-3"></div>
                    <div class="mb-5">
                        <div class="opacity-50 mb-2 dark:text-accentwhite">Website</div>
                        <a :href="selectedSupplier?.website" class="text-accent1" target="_blank">{{ selectedSupplier?.website }}</a>
                    </div>
                    <div class="mb-5">
                        <div class="opacity-50 mb-2 dark:text-accentwhite">Social</div>
                        <a :href="selectedSupplier?.social" class="text-accent1" target="_blank">{{ selectedSupplier?.social }}</a>
                    </div>
                </div>
            </template>
        </Card>
        <Card class="dark:bg-primarydark">
            <template #header>
                <h3 class="text-xl font-bold mt-5 pl-14 dark:text-accentwhite">Memo</h3>
            </template>
            <template #content>
                <div class="px-10">
                    <div class="h-[1px] w-full bg-gray-300 mb-5"></div>
                    <div v-for="memo in selectedSupplier?.memo" :key="memo.name">
                        <div class="flex justify-start items-center gap-2">
                            <div class="font-bold dark:text-accentwhite">{{ memo.name }}</div>
                            <div class="text-sm dark:text-accentwhite dark:opacity-50">{{ memo.date }}</div>
                        </div>
                        <div class="text-sm text-gray-500 py-2 dark:text-accentwhite dark:opacity-50">{{ memo.text }}</div>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>

<style scoped></style>
