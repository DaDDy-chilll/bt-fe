<script setup lang="ts">
import { ref } from "vue";
import BackArrow from "@/assets/icons/back_icon.vue";
import CustomerData from "./../customers.json";
import StatusData from "./../status.json";
import LevelData from "./../level.json";

// Define the Customer type
interface Customer {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    nrc: string;
    social: string;
    status: string;
    level: {
        id: number;
        icon: string;
        value: string;
    };
    memo: Array<{ name: string; date: string; text: string }>;
}

const selectedCustomer = ref<Customer | null>(null);

//Fetch
const customerData = CustomerData;
const statusData = StatusData;
const levelData = LevelData;

// Function to select a customer by ID
const selectCustomer = (id: number) => {
    const customer = customerData.find(customer => customer.id === id);
    if (customer) {
        selectedCustomer.value = customer;
    } else {
        selectedCustomer.value = null;
    }
    console.log(selectedCustomer.value);
};

selectCustomer(1);

</script>

<template>
    <div class="w-full bg-accentwhite pb-3 drop-shadow-md rounded-lg dark:bg-primarydark h-[calc(100vh-73px)]">
        <Card class="h-full dark:bg-primarydark dark:text-accentwhite">
            <template #header>
                <div class="flex items-center justify-center relative pt-5 mb-5">
                    <BackArrow class="absolute left-5 cursor-pointer w-10 h-10 text-accent1 dark:text-accent2" @click="$router.back()" />
                    <h1 class="text-2xl font-bold">Customer Information</h1>
                </div>
            </template>
            <template #content>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <div class="md:col-start-2 md:col-span-2">
                        <!-- Name -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
                            <FloatLabel variant="on">
                                <InputText id="on_label" v-model="selectedCustomer.firstname" class="border w-full h-10 pl-2 dark:bg-primarydark" autocomplete="off" />
                                <label for="on_label" class="text-sm text-label dark:bg-primarydark dark:text-white">First Name</label>
                            </FloatLabel>

                            <FloatLabel variant="on">
                                <InputText id="on_label" v-model="selectedCustomer.lastname" class="border w-full h-10 pl-2 dark:bg-primarydark" autocomplete="off" />
                                <label for="on_label" class="text-sm text-label dark:bg-primarydark dark:text-white">Last Name</label>
                            </FloatLabel>
                        </div>
                        <!-- Phone -->
                        <div class="grid grid-cols-1 md:grid-cols-1 gap-2 mb-8">
                            <FloatLabel variant="on">
                                <InputText id="on_label" v-model="selectedCustomer.phone" class="border w-full h-10 pl-2 dark:bg-primarydark" autocomplete="off" />
                                <label for="on_label" class="text-sm text-label dark:bg-primarydark dark:text-white">Phone</label>
                            </FloatLabel>
                        </div>
                        <!-- NRC -->
                        <div class="grid grid-cols-1 md:grid-cols-1 gap-2 mb-8">
                            <FloatLabel variant="on">
                                <InputText id="on_label" v-model="selectedCustomer.nrc" class="border w-full h-10 pl-2 dark:bg-primarydark" autocomplete="off" />
                                <label for="on_label" class="text-sm text-label dark:bg-primarydark dark:text-white">NRC No.</label>
                            </FloatLabel>
                        </div>
                        <!-- Email -->
                        <div class="grid grid-cols-1 md:grid-cols-1 gap-2 mb-8">
                            <FloatLabel variant="on">
                                <InputText id="on_label" v-model="selectedCustomer.email" class="border w-full h-10 pl-2 dark:bg-primarydark" autocomplete="off" />
                                <label for="on_label" class="text-sm text-label dark:bg-primarydark dark:text-white">Email</label>
                            </FloatLabel>
                        </div>
                        <!-- Social -->
                        <div class="grid grid-cols-1 md:grid-cols-1 gap-2 mb-8">
                            <FloatLabel variant="on">
                                <InputText id="on_label" v-model="selectedCustomer.social" class="border w-full h-10 pl-2 dark:bg-primarydark" autocomplete="off" />
                                <label for="on_label" class="text-sm text-label dark:bg-primarydark dark:text-white">Social</label>
                            </FloatLabel>
                        </div>
                        <!-- Status -->
                        <div class="grid grid-cols-1 md:grid-cols-1 gap-2 mb-8">
                            <FloatLabel variant="on">
                                <Select v-model="selectedCustomer.status"
                                    :options="StatusData.map(status => status.value)"
                                    class="w-full border dark:bg-primarydark" />
                                <label for="on_label" class="text-sm text-label dark:bg-primarydark dark:text-accentwhite">Customer Status</label>
                            </FloatLabel>
                        </div>
                        <!-- Memo -->
                        <div class="md:col-start-2 md:col-span-1 mb-8">
                            <h3 class="text-base">Memo</h3>
                            <FloatLabel variant="on" class="text-sm">
                                <Textarea id="memo_label" v-model="selectedCustomer.memoText" rows="5" cols="30" style="resize: none" class="border bg-muted w-full p-2 dark:bg-secondarydark"/>
                            </FloatLabel>
                        </div>
                        <!-- Customer Level -->
                        <h3 class="text-base font-bold mb-2">Customer Level</h3>
                        <div class="flex justify-between gap-2 mb-8">
                            <div v-for="level in levelData" :key="level.id" class="w-28 cursor-pointer"
                                :class="['w-20 py-4 flex items-center border border-2 rounded-md p-2 transition-all duration-300',
                                    selectedCustomer.level === level.value ? 'border-primary shadow-md shadow-primary scale-105' : 'hover:scale-105 hover:border-primary hover:shadow-md hover:shadow-primary']"
                                @click="selectedCustomer.level = level.value">
                                <input type="radio" :id="'level_' + level.id" v-model="selectedCustomer.level"
                                    :value="level.value" class="mr-2" style="display: none;"
                                    :checked="selectedCustomer?.level.value === level.value"/>
                                <label :for="'level_' + level.id"
                                    class="cursor-pointer w-full h-full flex flex-col items-center">
                                    <img :src="level.icon" alt="Level Icon" class="w-6 h-6 select-none" />
                                    <span class="text-sm mt-2 text-center select-none">{{ level.value.charAt(0).toUpperCase() + level.value.slice(1) }}</span>
                                </label>
                            </div>
                        </div>
                        <!-- Save Button -->
                        <div class="">
                            <Button label="Save" class="bg-accent1 px-4 py-2 text-white w-full dark:bg-accent2" />
                        </div>

                    </div>
                </div>
                <EditMemo />
            </template>
        </Card>
    </div>
</template>

<style scoped>
:deep(.p-select-label, .p-placeholder) {
  @apply text-accentwhite;
}
:deep(.p-select-dropdown > svg) {
  @apply text-accentwhite;
}

:deep(.p-select-option) {
  @apply text-accentwhite;
}
:deep(.p-select-dropdown) {
  @apply text-accentblack;
  @apply flex items-center justify-center w-6 pr-3;
}
</style>