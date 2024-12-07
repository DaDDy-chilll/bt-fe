<script setup lang="ts">
import BackArrow from "@/assets/icons/back_icon.vue";
import SupplierData from "../supplierdata.json";
import PersonIcon from "~/assets/icons/person.vue";
import { ref } from "vue";

// Fetch Supplier
const selectedSupplier = SupplierData.find(supplier => supplier.id === 1);

const memo = ref([]);

</script>

<template>
    <div class="grid grid-cols-2 gap-5">
        <Card>
            <template #header>
                <div class="flex items-center justify-center relative pt-5">
                    <BackArrow class="absolute left-5" />
                    <div class="flex items-center gap-2">
                        <PersonIcon class="w-7 h-7 text-accent1" />
                        <span class="text-2xl font-bold">{{ selectedSupplier?.code }}</span>
                    </div>
                </div>
            </template>
            <template #content>
                <div class="flex flex-col px-10 md:px-20 py-5">
                    <div class="mb-5">
                        <div class="opacity-50 mb-3">Supplier Name</div>
                        <div class="font-bold">{{ selectedSupplier?.name }}</div>
                    </div>
                    <div>
                        <div class="opacity-50 mb-3">Supplier Branch</div>
                        <div class="font-bold">{{ selectedSupplier?.branch }}</div>
                    </div>
                    <!-- Divider -->
                    <div class="h-[1px] w-full bg-gray-300 my-5"></div>
                    <div class="mb-5">
                        <div class="opacity-50 mb-3">Contact Name</div>
                        <div class="font-bold">{{ selectedSupplier?.contact_name }}</div>
                    </div>
                    <div>
                        <div class="opacity-50 mb-3">Contact Start Date</div>
                        <div class="font-bold">{{ selectedSupplier?.contact_start_date }}</div>
                    </div>
                    <!-- Divider -->
                    <div class="h-[1px] w-full bg-gray-300 my-5"></div>
                    <div class="mb-5">
                        <div class="opacity-50 mb-3">Email</div>
                        <div class="font-bold">{{ selectedSupplier?.email }}</div>
                    </div>
                    <div class="grid grid-cols-2">
                        <!-- phone1 -->
                        <div>
                            <div class="opacity-50 mb-3">Phone 1</div>
                            <div class="font-bold">{{ selectedSupplier?.phone[0] }}</div>   
                        </div>
                        <!-- phone2 -->
                        <div>
                            <div class="opacity-50 mb-3">Phone 2</div>
                            <div class="font-bold">{{ selectedSupplier?.phone[1] }}</div>
                        </div>
                    </div>
                    <!-- Divider -->
                    <div class="h-[1px] w-full bg-gray-300 my-5"></div>
                    <div class="grid grid-cols-2 mb-5">
                        <div>
                            <div class="opacity-50 mb-3">State</div>
                            <div class="font-bold">{{ selectedSupplier?.state }}</div>
                        </div>
                        <div>
                            <div class="opacity-50 mb-3">City</div>
                            <div class="font-bold">{{ selectedSupplier?.city }}</div>
                        </div>
                    </div>
                    <div class="opacity-50 mb-3">Address</div>
                    <div class="font-bold">{{ selectedSupplier?.address }}</div>
                    <!-- Divider -->
                    <div class="h-[1px] w-full bg-gray-300 my-5"></div>
                    <div class="mb-5">
                        <div class="opacity-50 mb-3">Website</div>
                        <a :href="selectedSupplier?.website" class="text-accent1" target="_blank">{{ selectedSupplier?.website }}</a>
                    </div>
                    <div class="mb-5">
                        <div class="opacity-50 mb-3">Social</div>
                        <a :href="selectedSupplier?.social" class="text-accent1" target="_blank">{{ selectedSupplier?.social }}</a>
                    </div>
                </div>
            </template>
        </Card>
        <Card>
            <template #header>
                <h3 class="text-xl font-bold mt-5 pl-14">Memo</h3>
            </template>
            <template #content>
                <div class="px-10">
                    <div class="h-[1px] w-full bg-gray-300 mb-5"></div>
                    <div v-for="memo in selectedSupplier?.memo" :key="memo.name">
                        <div class="flex justify-start items-center gap-2">
                            <div class="font-bold">{{ memo.name }}</div>
                            <div class="text-sm">{{ memo.date }}</div>
                        </div>
                        <div class="text-sm text-gray-500 py-2">{{ memo.text }}</div>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>

<style scoped></style>
