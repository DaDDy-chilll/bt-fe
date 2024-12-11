<script setup lang="ts">
import BackArrow from "@/assets/icons/back_icon.vue";
import SupplierData from "../supplierdata.json";
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
    <div class="grid grid-cols-2 gap-5 dark:bg-secondarydark rounded-lg">
        <Card class="dark:bg-primarydark">
            <template #header>
                <div class="flex items-center justify-center relative pt-5">
                    <BackArrow class="absolute left-5 cursor-pointer w-10 h-10 text-accent1 dark:text-accent2" @click="$router.back()" />
                    <div class="flex items-center gap-2">
                        <i class="pi pi-user text-accent1 dark:text-accent2 text-xl"></i>
                        <span class="text-2xl font-bold dark:text-accentwhite">{{ selectedSupplier?.code }}</span>
                    </div>
                    <Button class="absolute right-5" icon="pi pi-trash text-xl text-red-600" />
                </div>
            </template>
            <template #content>
                <div class="flex flex-col px-10 md:px-20 py-5">
                    <div class="mb-5">
                        <FloatLabel variant="on">
                            <InputText id="on_label" v-model="selectedSupplier.name" class="border w-full h-10 pl-2 dark:bg-primarydark" autocomplete="off" />
                            <label for="on_label" class="text-sm text-label dark:bg-primarydark dark:text-white">Supplier Name</label>
                        </FloatLabel>
                    </div>
                    <div>
                        <FloatLabel variant="on">
                            <InputText id="on_label" v-model="selectedSupplier.branch" class="border w-full h-10 pl-2 dark:bg-primarydark" autocomplete="off" />
                            <label for="on_label" class="text-sm text-label dark:bg-primarydark dark:text-white">Supplier Branch</label>
                        </FloatLabel>
                    </div>
                    <!-- Divider -->
                    <div class="h-[1px] w-full bg-gray-300 my-5 dark:bg-accentwhite dark:bg-opacity-10"></div>
                    <div class="mb-5">
                        <FloatLabel variant="on">
                            <InputText id="on_label" v-model="selectedSupplier.contact_name" class="border w-full h-10 pl-2 dark:bg-primarydark" autocomplete="off" />
                            <label for="on_label" class="text-sm text-label dark:bg-primarydark dark:text-white">Contact Name</label>
                        </FloatLabel>
                    </div>
                    <div>
                        <FloatLabel variant="on">
                            <InputText id="on_label" v-model="selectedSupplier.contact_start_date" class="border w-full h-10 pl-2 dark:bg-primarydark" autocomplete="off" />
                            <label for="on_label" class="text-sm text-label dark:bg-primarydark dark:text-white">Contact Start Date</label>
                        </FloatLabel>
                    </div>
                    <!-- Divider -->
                    <div class="h-[1px] w-full bg-gray-300 my-5 dark:bg-accentwhite dark:bg-opacity-10"></div>
                    <div class="mb-5">
                        <FloatLabel variant="on">
                            <InputText id="on_label" v-model="selectedSupplier.email" class="border w-full h-10 pl-2 dark:bg-primarydark" autocomplete="off" />
                            <label for="on_label" class="text-sm text-label dark:bg-primarydark dark:text-white">Email</label>
                        </FloatLabel>
                    </div>
                    <div class="grid grid-cols-2 gap-5">
                        <!-- phone1 -->
                        <div>
                            <FloatLabel variant="on">
                                <InputText id="on_label" v-model="selectedSupplier.phone[0]" class="border w-full h-10 pl-2 dark:bg-primarydark" autocomplete="off" />
                                <label for="on_label" class="text-sm text-label dark:bg-primarydark dark:text-white">Phone 1</label>
                            </FloatLabel>
                        </div>
                        <!-- phone2 -->
                        <div>
                            <FloatLabel variant="on">
                                <InputText id="on_label" v-model="selectedSupplier.phone[1]" class="border w-full h-10 pl-2 dark:bg-primarydark" autocomplete="off" />
                                <label for="on_label" class="text-sm text-label dark:bg-primarydark dark:text-white">Phone 2</label>
                            </FloatLabel>
                        </div>
                    </div>
                    <!-- Divider -->
                    <div class="h-[1px] w-full bg-gray-300 my-5 dark:bg-accentwhite dark:bg-opacity-10"></div>
                    <div class="grid grid-cols-2 mb-5 gap-5">
                        <FloatLabel variant="on">
                            <InputText id="on_label" v-model="selectedSupplier.state" class="border w-full h-10 pl-2 dark:bg-primarydark" autocomplete="off" />
                            <label for="on_label" class="text-sm text-label dark:bg-primarydark dark:text-white">State</label>
                        </FloatLabel>
                        <FloatLabel variant="on">
                            <InputText id="on_label" v-model="selectedSupplier.city" class="border w-full h-10 pl-2 dark:bg-primarydark" autocomplete="off" />
                            <label for="on_label" class="text-sm text-label dark:bg-primarydark dark:text-white">City</label>
                        </FloatLabel>
                    </div>
                    <div class="">
                        <FloatLabel variant="on">
                            <InputText id="on_label" v-model="selectedSupplier.address" class="border w-full h-10 pl-2 dark:bg-primarydark" autocomplete="off" />
                            <label for="on_label" class="text-sm text-label dark:bg-primarydark dark:text-white">Address</label>
                        </FloatLabel>
                    </div>
                    <!-- Divider -->
                    <div class="h-[1px] w-full bg-gray-300 my-5 dark:bg-accentwhite dark:bg-opacity-10"></div>
                    <div class="mb-5">
                        <FloatLabel variant="on" class="text-sm">
                            <InputText id="on_label" v-model="selectedSupplier.website" class="border w-full h-10 pl-2 dark:bg-primarydark" autocomplete="off" />
                            <label for="on_label" class="text-sm text-label dark:bg-primarydark dark:text-white">Website</label>
                        </FloatLabel>
                    </div>
                    <div class="mb-5">
                        <FloatLabel variant="on">
                            <InputText id="on_label" v-model="selectedSupplier.social" class="border w-full h-10 pl-2 dark:bg-primarydark" autocomplete="off" />
                            <label for="on_label" class="text-sm text-label dark:bg-primarydark dark:text-white">Social</label>
                        </FloatLabel>
                    </div>
                    <div>
                        <Button label="Save" class="text-white bg-accent1 dark:bg-accent2 w-full py-3" />
                    </div>
                </div>
            </template>
        </Card>
        <Card class="dark:bg-primarydark">
            <template #header>
                <h3 class="text-xl font-bold mt-5 pl-14 dark:text-accentwhite">Memo</h3>
            </template>
            <template #content>
                <div class="px-10" style="height: 68.8vh; overflow-y: auto;">
                    <div class="h-[1px] w-full bg-gray-300 dark:bg-accentwhite dark:bg-opacity-10 mb-5"></div>
                    <div v-for="(memo, index) in selectedSupplier?.memo" :key="memo.name">
                        <div class="flex justify-between items-center gap-2">
                            <div class="flex items-center gap-2">
                                <div class="font-bold dark:text-accentwhite">{{ memo.name }}</div>
                                <div class="text-sm dark:text-accentwhite dark:text-opacity-50">{{ memo.date }}</div>
                            </div>
                            <div class="flex items-center">
                                <Button icon="pi pi-pencil text-sm text-accent1 dark:text-accent2"
                                    @click="handleEditMemo(memo.text, index)" />
                                <!-- <Button icon="pi pi-trash text-sm text-red-500" /> -->
                            </div>
                        </div>
                        <div class="text-sm text-gray-500 py-2 dark:text-accentwhite dark:text-opacity-50">{{ memo.text }}</div>
                    </div>
                </div>

                <Dialog v-model:visible="editMemo" modal header="Edit Memo" :style="{ width: '30rem' }" class="dark:bg-primarydark dark:text-accentwhite">
                    <div class="mt-2">
                        <FloatLabel variant="on" class="text-sm">
                            <Textarea id="memo_text" v-model="memoText" rows="5"
                                class="border border-primary w-full py-2 px-2 dark:bg-primarydark" />
                            <label for="memo_text" class="text-sm text-label dark:bg-primarydark dark:text-accentwhite">Memo Text</label>
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
                    <Textarea id="memo_text" v-model="memoText" rows="5" class="border-2 border-accent1 border-opacity-80 w-full py-3 px-2 dark:bg-primarydark dark:text-accentwhite"
                        style="resize: none;" />
                    <div class="flex justify-end mt-2 absolute bottom-4 right-12">
                        <Button type="button" icon="pi pi-send" class="text-white bg-accent1 dark:bg-accent2 py-2 px-10"
                            @click="sendMemo"></Button>
                    </div>
                </div>
            </template>
        </Card>
    </div>
</template>

<style scoped>
:deep(.p-inputtext) {
    @apply dark:bg-primarydark;
    @apply dark:text-accentwhite;
}

</style>
