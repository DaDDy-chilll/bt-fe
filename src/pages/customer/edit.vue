<script setup lang="ts">
import { ref } from "vue";
import BackArrow from "@/assets/icons/back_icon.vue";
import CustomerData from "./customers.json";
import StatusData from "./status.json";
import LevelData from "./level.json";

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
const levelData = ref(LevelData);

// Function to select a customer by ID
const selectCustomer = (id: number) => {
    selectedCustomer.value = CustomerData.find(customer => customer.id === id) as Customer | null;
};

// Function to update customer details
const updateCustomer = (updatedCustomer: Customer) => {
    const index = CustomerData.findIndex(customer => customer.id === updatedCustomer.id);
    if (index !== -1) {
        CustomerData[index] = updatedCustomer;
    }
};

selectCustomer(1);

</script>

<template>
    <div>
        <Card>
            <template #header>
                <div class="flex items-center justify-center relative pt-5">
                    <BackArrow class="absolute left-5" />
                    <h1 class="text-2xl font-bold">Customer Information</h1>
                </div>
            </template>
            <template #content>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-2">
                    <div class="md:col-start-2 md:col-span-2">
                        <!-- Name -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                            <FloatLabel variant="on" class="text-sm md:mb-0 mb-6">
                                <InputText id="firstname_label" v-model="selectedCustomer.firstname" autocomplete="off"
                                    class="border border-primary w-full py-3 px-2" autofocus />
                                <label for="firstname_label">First Name</label>
                            </FloatLabel>

                            <FloatLabel variant="on" class="text-sm">
                                <InputText id="lastname_label" v-model="selectedCustomer.lastname" autocomplete="off"
                                    class="border border-primary w-full py-3 px-2" autofocus />
                                <label for="lastname_label">Last Name</label>
                            </FloatLabel>
                        </div>
                        <!-- Phone -->
                        <div class="grid grid-cols-1 md:grid-cols-1 gap-2 mb-6">
                            <FloatLabel variant="on" class="text-sm">
                                <InputText id="phone_label" v-model="selectedCustomer.phone" autocomplete="off"
                                    class="border border-primary w-full py-3 px-2" autofocus />
                                <label for="phone_label">Phone</label>
                            </FloatLabel>
                        </div>
                        <!-- NRC -->
                        <div class="grid grid-cols-1 md:grid-cols-1 gap-2 mb-6">
                            <FloatLabel variant="on" class="text-sm">
                                <InputText id="nrc_label" v-model="selectedCustomer.nrc" autocomplete="off"
                                    class="border border-primary w-full py-3 px-2" autofocus />
                                <label for="nrc_label">NRC No.</label>
                            </FloatLabel>
                        </div>
                        <!-- Email -->
                        <div class="grid grid-cols-1 md:grid-cols-1 gap-2 mb-6">
                            <FloatLabel variant="on" class="text-sm">
                                <InputText id="email_label" v-model="selectedCustomer.email" autocomplete="off"
                                    class="border border-primary w-full py-3 px-2" autofocus />
                                <label for="email_label">Email</label>
                            </FloatLabel>
                        </div>
                        <!-- Social -->
                        <div class="grid grid-cols-1 md:grid-cols-1 gap-2 mb-6">
                            <FloatLabel variant="on" class="text-sm">
                                <InputText id="social_label" v-model="selectedCustomer.social" autocomplete="off"
                                    class="border border-primary w-full py-3 px-2" autofocus />
                                <label for="social_label">Social</label>
                            </FloatLabel>
                        </div>
                        <!-- Status -->
                        <div class="grid grid-cols-1 md:grid-cols-1 gap-2 mb-6">
                            <FloatLabel class="w-full" variant="on">
                                <Select v-model="selectedCustomer.status"
                                    :options="StatusData.map(status => status.value)"
                                    class="w-full border border-primary text-green-500" />
                                <label for="status_label">Customer Status</label>
                            </FloatLabel>
                        </div>
                        <!-- Memo -->
                        <div class="md:col-start-2 md:col-span-1 mb-6">
                            <FloatLabel variant="on" class="text-sm">
                                <Textarea id="memo_label" v-model="selectedCustomer.memoText" rows="5" cols="30" style="resize: none" class="border border-primary w-full p-2"/>
                                <label for="memo_label" class="text-sm">Memo</label>
                            </FloatLabel>
                        </div>
                        <!-- Customer Level -->
                        <h3 class="text-base mb-6 font-bold">Customer Level</h3>
                        <div class="flex justify-between gap-2">
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
                        <div class="mt-10">
                            <Button label="Save" class="bg-accent1 px-4 py-2 text-white w-full" />
                        </div>

                    </div>
                </div>
                <EditMemo />
            </template>
        </Card>
    </div>
</template>

<style scoped></style>
