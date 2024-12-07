<script setup lang="ts">
import BackArrow from "@/assets/icons/back_icon.vue";
import SupplierData from "../supplierdata.json";
import PersonIcon from "~/assets/icons/person.vue";
import Dialog from 'primevue/dialog';
import { ref } from "vue";

// Fetch Supplier
const selectedSupplier = SupplierData.find(supplier => supplier.id === 1);

const memo = ref([]);

const editMemo = ref(false);
const memoText = ref('');
const editingMemoIndex = ref(-1);

// Updated function to handle edit button click
const handleEditMemo = (text: string, index: number) => {
    memoText.value = text;
    editingMemoIndex.value = index;
    editMemo.value = true;
};

// Add save function
const saveMemo = () => {
    if (editingMemoIndex.value !== -1 && selectedSupplier?.memo) {
        selectedSupplier.memo[editingMemoIndex.value].text = memoText.value;
        editMemo.value = false;
        editingMemoIndex.value = -1;
    }
};

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
                    <Button class="absolute right-5" icon="pi pi-trash text-xl text-red-500" />
                </div>
            </template>
            <template #content>
                <div class="flex flex-col px-10 md:px-20 py-5">
                    <div class="mb-5">
                        <FloatLabel variant="on" class="text-sm">
                            <InputText id="name_label" v-model="selectedSupplier.name" autocomplete="off"
                                class="border border-primary w-full py-3 px-2" autofocus />
                            <label for="name_label">Supplier Name</label>
                        </FloatLabel>
                    </div>
                    <div>
                        <FloatLabel variant="on" class="text-sm">
                            <InputText id="branch_label" v-model="selectedSupplier.branch" autocomplete="off"
                                class="border border-primary w-full py-3 px-2" />
                            <label for="branch_label">Supplier Category</label>
                        </FloatLabel>
                    </div>
                    <!-- Divider -->
                    <div class="h-[1px] w-full bg-gray-300 my-5"></div>
                    <div class="mb-5">
                        <FloatLabel variant="on" class="text-sm">
                            <InputText id="contact_label" v-model="selectedSupplier.contact_name" autocomplete="off"
                                class="border border-primary w-full py-3 px-2" />
                            <label for="contact_label">Contact</label>
                        </FloatLabel>
                    </div>
                    <div>
                        <FloatLabel variant="on" class="text-sm">
                            <InputText id="contact_start_date_label" v-model="selectedSupplier.contact_start_date"
                                autocomplete="off" class="border border-primary w-full py-3 px-2" />
                            <label for="contact_start_date_label">Contact Start Date</label>
                        </FloatLabel>
                    </div>
                    <!-- Divider -->
                    <div class="h-[1px] w-full bg-gray-300 my-5"></div>
                    <div class="mb-5">
                        <FloatLabel variant="on" class="text-sm">
                            <InputText id="email_label" v-model="selectedSupplier.email" autocomplete="off"
                                class="border border-primary w-full py-3 px-2" />
                            <label for="email_label">Email</label>
                        </FloatLabel>
                    </div>
                    <div class="grid grid-cols-2 gap-5">
                        <!-- phone1 -->
                        <div>
                            <FloatLabel variant="on" class="text-sm">
                                <InputText id="phone1_label" v-model="selectedSupplier.phone[0].phone1"
                                    autocomplete="off" class="border border-primary w-full py-3 px-2" />
                                <label for="phone1_label">Phone 1</label>
                            </FloatLabel>
                        </div>
                        <!-- phone2 -->
                        <div>
                            <FloatLabel variant="on" class="text-sm">
                                <InputText id="phone2_label" v-model="selectedSupplier.phone[0].phone2"
                                    autocomplete="off" class="border border-primary w-full py-3 px-2" />
                                <label for="phone2_label">Phone 2</label>
                            </FloatLabel>
                        </div>
                    </div>
                    <!-- Divider -->
                    <div class="h-[1px] w-full bg-gray-300 my-5"></div>
                    <div class="grid grid-cols-2 mb-5 gap-5">
                        <FloatLabel variant="on" class="text-sm">
                            <InputText id="state_label" v-model="selectedSupplier.state" autocomplete="off"
                                class="border border-primary w-full py-3 px-2" />
                            <label for="state_label">State</label>
                        </FloatLabel>
                        <FloatLabel variant="on" class="text-sm">
                            <InputText id="city_label" v-model="selectedSupplier.city" autocomplete="off"
                                class="border border-primary w-full py-3 px-2" />
                            <label for="city_label">City</label>
                        </FloatLabel>
                    </div>
                    <div class="">
                        <FloatLabel variant="on" class="text-sm">
                            <InputText id="address_label" v-model="selectedSupplier.address" autocomplete="off"
                                class="border border-primary w-full py-3 px-2" />
                            <label for="address_label">Address</label>
                        </FloatLabel>
                    </div>
                    <!-- Divider -->
                    <div class="h-[1px] w-full bg-gray-300 my-5"></div>
                    <div class="mb-5">
                        <FloatLabel variant="on" class="text-sm">
                            <InputText id="website_label" v-model="selectedSupplier.website" autocomplete="off"
                                class="border border-primary w-full py-3 px-2" />
                            <label for="website_label">Website</label>
                        </FloatLabel>
                    </div>
                    <div class="mb-5">
                        <FloatLabel variant="on" class="text-sm">
                            <InputText id="social_label" v-model="selectedSupplier.social" autocomplete="off"
                                class="border border-primary w-full py-3 px-2" />
                            <label for="social_label">Social</label>
                        </FloatLabel>
                    </div>
                    <div>
                        <Button label="Save" class="text-white bg-accent1 w-full py-3" />
                    </div>
                </div>
            </template>
        </Card>
        <Card>
            <template #header>
                <h3 class="text-xl font-bold mt-5 pl-14">Memo</h3>
            </template>
            <template #content>
                <div class="px-10" style="height: 70vh; overflow-y: auto;">
                    <div class="h-[1px] w-full bg-gray-300 mb-5"></div>
                    <div v-for="(memo, index) in selectedSupplier?.memo" :key="memo.name">
                        <div class="flex justify-between items-center gap-2">
                            <div>
                                <div class="font-bold">{{ memo.name }}</div>
                                <div class="text-sm">{{ memo.date }}</div>
                            </div>
                            <div class="flex items-center">
                                <Button icon="pi pi-pencil text-sm text-accent1"
                                    @click="handleEditMemo(memo.text, index)" />
                                <!-- <Button icon="pi pi-trash text-sm text-red-500" /> -->
                            </div>
                        </div>
                        <div class="text-sm text-gray-500 py-2">{{ memo.text }}</div>
                    </div>
                </div>

                <Dialog v-model:visible="editMemo" modal header="Edit Memo" :style="{ width: '30rem' }">
                    <div class="mt-1">
                        <FloatLabel variant="on" class="text-sm">
                            <Textarea id="memo_text" v-model="memoText" rows="5"
                                class="border border-primary w-full py-2 px-2" />
                            <label for="memo_text">Memo Text</label>
                        </FloatLabel>
                    </div>
                    <div class="flex justify-end gap-4 mt-5">
                        <Button type="button" label="Cancel" severity="secondary" @click="editMemo = false"></Button>
                        <Button type="button" label="Save" class="text-white bg-accent1 py-2 px-4"
                            @click="saveMemo"></Button>
                    </div>
                </Dialog>
            </template>
            <template #footer>
                <div class="w-full px-10 relative">
                    <Textarea id="memo_text" v-model="memoText" rows="5" class="border-2 border-accent1 border-opacity-80 w-full py-3 px-2"
                        style="resize: none;" />
                    <div class="flex justify-end mt-2 absolute bottom-4 right-12">
                        <Button type="button" icon="pi pi-send" class="text-white bg-accent1 py-2 px-10"
                            @click="sendMemo"></Button>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>

<style scoped></style>
