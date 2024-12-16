<script setup lang="ts">
import { ref } from "vue";
import { Button, Card, InputText, FloatLabel, Textarea } from "primevue";
import type { InvoiceSetting } from "@/types/invoice";
import Fileupload from "@/components/uploadfile/Fileupload.vue";
import themeImage1 from "~/assets/inv_theme/inv_theme1.png";
import themeImage2 from "~/assets/inv_theme/inv_theme2.png";
import themeImage3 from "~/assets/inv_theme/inv_theme3.png";
import themeImage4 from "~/assets/inv_theme/inv_theme4.png";
import themeImage5 from "~/assets/inv_theme/inv_theme5.png";
import Bold from "~/assets/inv_style/bold.vue";
import Italic from "~/assets/inv_style/italic.vue";
import Strike from "~/assets/inv_style/strike.vue";
import Underline from "~/assets/inv_style/underline.vue";

const invoiceSetting = ref<InvoiceSetting>({
    shopname: '',
    phone: [],
    address: '',
    note: [],
    background_image: '',
    logo_image: '',
    qr_code: '',
    signature: '',
    theme: '',
    test_style: '',
});

type ImagePreview = {
    file: File;
    name: string;
    path: string;
};

const imagePreview = ref<ImagePreview[]>([]);
const handleBackgroundImage = (file: File) => {
    handleImagePreview(file);
};

const handleImagePreview = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        imagePreview.value.push({
            file: file,
            name: file.name,
            path: reader.result as string
        });
    };
};


const handleLogoImage = (file: File) => {
    console.log(file);
    invoiceSetting.value.logo_image = file.name;
};

const handleQRCode = (file: File) => {
    console.log(file);
    invoiceSetting.value.qr_code = file.name;
};

const handleSignature = (file: File) => {
    console.log(file);
    invoiceSetting.value.signature = file.name;
};



</script>

<template>
    <div class="w-full bg-accentwhite drop-shadow-md rounded-lg dark:bg-primarydark ">
        <slot-header title="Invoice Setting" class="dark:bg-primarydark p-4 rounded-lg" />
        <div class="flex h-[83.5vh]">
            <!-- left -->
            <div class="w-2/6 h-full px-5 pb-5 rounded-lg">
                <div class="flex flex-col gap-7 pl-5">
                    <FloatLabel variant="on">
                        <InputText id="shopname" v-model="invoiceSetting.shopname"
                            class="border w-full h-10 pl-2 dark:bg-primarydark" autocomplete="off" />
                        <label for="shopname" class="text-sm text-label dark:bg-primarydark dark:text-white">Shop
                            Name</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <InputText id="phone1" v-model="invoiceSetting.phone[0]"
                            class="border w-full h-10 pl-2 dark:bg-primarydark " autocomplete="off" />
                        <label for="phone1" class="text-sm text-label dark:bg-primarydark dark:text-white">Phone
                            Number 1</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <InputText id="phone2" v-model="invoiceSetting.phone[1]"
                            class="border w-full h-10 pl-2 dark:bg-primarydark" autocomplete="off" />
                        <label for="phone2" class="text-sm text-label dark:bg-primarydark dark:text-white">Phone
                            Number 2</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <InputText id="phone3" v-model="invoiceSetting.phone[3]"
                            class="border w-full h-10 pl-2 dark:bg-primarydark" autocomplete="off" />
                        <label for="phone3" class="text-sm text-label dark:bg-primarydark dark:text-white">Phone
                            Number 3</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <InputText id="phone4" v-model="invoiceSetting.phone[4]"
                            class="border w-full h-10 pl-2 dark:bg-primarydark" autocomplete="off" />
                        <label for="phone4" class="text-sm text-label dark:bg-primarydark dark:text-white">Phone
                            Number 4</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <Textarea id="address" v-model="invoiceSetting.address"
                            class="border w-full pl-2 pt-2 dark:bg-primarydark" rows="3" cols="30"
                            style="resize: none;" />
                        <label for="address" class="text-sm text-label dark:bg-primarydark dark:text-white">Address</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <Textarea id="note1" v-model="invoiceSetting.note[0]"
                            class="border w-full pl-2 pt-2 dark:bg-primarydark" rows="3" cols="30"
                            style="resize: none;" />
                        <label for="note1" class="text-sm text-label dark:bg-primarydark dark:text-white">Note
                            1</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <Textarea id="note2" v-model="invoiceSetting.note[1]"
                            class="border w-full pl-2 pt-2 dark:bg-primarydark" rows="3" cols="30"
                            style="resize: none;" />
                        <label for="note2" class="text-sm text-label dark:bg-primarydark dark:text-white">Note
                            2</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <Textarea id="note3" v-model="invoiceSetting.note[2]"
                            class="border w-full pl-2 pt-2 dark:bg-primarydark" rows="3" cols="30"
                            style="resize: none;" />
                        <label for="note3" class="text-sm text-label dark:bg-primarydark dark:text-white">Note
                            3</label>
                    </FloatLabel>
                </div>
            </div>
            <!-- right -->
            <div class="w-4/6 h-full px-10 pb-5 rounded-lg">
                <div class="flex flex-col gap-5 pl-5">
                    <!-- background image -->
                    <div class="w-full mb-1">
                        <h3 class="text-lg mb-2 dark:text-accentwhite">Background Image</h3>
                        <div class="flex flex-col gap-2">
                            <Fileupload @change="handleBackgroundImage" />
                            <div v-if="imagePreview.length > 0">
                                <img :src="imagePreview[0].path" alt="background image preview"
                                    class="w-full h-full object-cover">
                                <p class="text-sm text-label dark:text-accentwhite">{{ imagePreview[0].name }}</p>
                            </div>
                        </div>
                    </div>
                    <!-- logo / QR code / Signature -->
                    <div class="flex gap-10 mb-1">
                        <!-- logo -->
                        <div class="w-1/3">
                            <h3 class="text-lg mb-2 dark:text-accentwhite">Logo</h3>
                            <Fileupload @change="handleLogoImage" />
                        </div>
                        <!-- QR code -->
                        <div class="w-1/3">
                            <h3 class="text-lg mb-2 dark:text-accentwhite">QR Code</h3>
                            <Fileupload @change="handleQRCode" />
                        </div>
                        <!-- Signature -->
                        <div class="w-1/3">
                            <h3 class="text-lg mb-2 dark:text-accentwhite">Signature</h3>
                            <Fileupload @change="handleSignature" />
                        </div>
                    </div>
                    <!-- theme -->
                    <div class="w-full mb-1">
                        <h3 class="text-lg mb-2 dark:text-accentwhite">Theme</h3>
                        <div class="flex flex-col gap-4">
                            <RadioGroup v-model="invoiceSetting.theme">
                                <div class="flex gap-10">
                                    <RadioInput :value="themeImage1" id="theme1"
                                        class="w-24 h-24 bg-accentwhite dark:bg-primarydark flex justify-center items-center rounded-lg border border-2 border-accent1 dark:border-accent2 hover:border-accent1 hover:border-opacity-100 dark:hover:border-accent2 relative">
                                        <img :src="themeImage1" alt="theme image" class="w-18 h-18 object-cover">
                                        <div class="absolute -top-2 -right-2 w-5 h-5 bg-accent1 dark:bg-accent2 rounded-full flex justify-center items-center">
                                            <i class="pi pi-check text-white" style="font-size: 12px;"></i>
                                        </div>
                                    </RadioInput>
                                    <RadioInput :value="themeImage2" id="theme2"
                                        class="w-24 h-24 bg-accentwhite dark:bg-primarydark flex justify-center items-center rounded-lg border border-2 dark:border-accentwhite dark:border-opacity-50 hover:border-accent1 hover:border-opacity-100 dark:hover:border-accent2">
                                        <img :src="themeImage2" alt="theme image" class="w-18 h-18 object-cover">
                                    </RadioInput>
                                    <RadioInput :value="themeImage3" id="theme3"
                                        class="w-24 h-24 bg-accentwhite dark:bg-primarydark flex justify-center items-center rounded-lg border border-2 dark:border-accentwhite dark:border-opacity-50 hover:border-accent1 hover:border-opacity-100 dark:hover:border-accent2">
                                        <img :src="themeImage3" alt="theme image" class="w-18 h-18 object-cover">
                                    </RadioInput>
                                    <RadioInput :value="themeImage4" id="theme4"
                                        class="w-24 h-24 bg-accentwhite dark:bg-primarydark flex justify-center items-center rounded-lg border border-2 dark:border-accentwhite dark:border-opacity-50 hover:border-accent1 hover:border-opacity-100 dark:hover:border-accent2">
                                        <img :src="themeImage4" alt="theme image" class="w-18 h-18 object-cover">
                                    </RadioInput>
                                    <RadioInput :value="themeImage5" id="theme5"
                                        class="w-24 h-24 bg-accentwhite dark:bg-primarydark flex justify-center items-center rounded-lg border border-2 dark:border-accentwhite dark:border-opacity-50 hover:border-accent1 hover:border-opacity-100 dark:hover:border-accent2">
                                        <img :src="themeImage5" alt="theme image" class="w-18 h-18 object-cover">
                                    </RadioInput>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <!-- test style -->
                    <div class="w-full mb-1">
                        <h3 class="text-lg mb-2 dark:text-accentwhite">Test Style</h3>
                        <div class="flex flex-col gap-2">
                            <RadioGroup v-model="invoiceSetting.test_style">
                                <div class="flex gap-10">
                                    <div
                                        class="flex flex-col items-center hover:opacity-100 hover:cursor-pointer">
                                        <RadioInput :value="Bold" id="theme1"
                                            class="w-24 h-24 flex justify-center items-center rounded-lg border border-2 border-accent1 dark:border-accent2 hover:border-accent1 hover:border-opacity-100 dark:hover:border-accent2 relative">
                                            <Bold class="w-14 h-14 object-cover dark:text-accentwhite" />
                                            <div class="absolute -top-2 -right-2 w-5 h-5 bg-accent1 dark:bg-accent2 rounded-full flex justify-center items-center">
                                                <i class="pi pi-check text-white" style="font-size: 12px;"></i>
                                            </div>
                                        </RadioInput>
                                        <p
                                            class="text-base text-label dark:text-accentwhite text-center mt-2 hover:text-accent1">
                                            Bold</p>
                                    </div>
                                    <div
                                        class="flex flex-col items-center opacity-60 hover:opacity-100 hover:cursor-pointer">
                                        <RadioInput :value="Italic" id="theme2"
                                            class="w-24 h-24 bg-accentwhite dark:bg-primarydark flex justify-center items-center rounded-lg border border-2 dark:border-accentwhite dark:border-opacity-50 hover:border-accent1 hover:border-opacity-100 dark:hover:border-accent2">
                                            <Italic class="w-14 h-14 object-cover dark:text-accentwhite" />
                                        </RadioInput>
                                        <p
                                            class="text-base text-label dark:text-accentwhite text-center mt-2 hover:text-accent1">
                                            Italic</p>
                                    </div>
                                    <div
                                        class="flex flex-col items-center opacity-60 hover:opacity-100 hover:cursor-pointer">
                                        <RadioInput :value="Strike" id="theme3"
                                            class="w-24 h-24 bg-accentwhite dark:bg-primarydark flex justify-center items-center rounded-lg border border-2 dark:border-accentwhite dark:border-opacity-50 hover:border-accent1 hover:border-opacity-100 dark:hover:border-accent2">
                                            <Strike class="w-14 h-14 object-cover dark:text-accentwhite" />
                                        </RadioInput>
                                        <p
                                            class="text-base text-label dark:text-accentwhite text-center mt-2 hover:text-accent1">
                                            Strike</p>
                                    </div>
                                    <div
                                        class="flex flex-col items-center opacity-60 hover:opacity-100 hover:cursor-pointer">
                                        <RadioInput :value="Underline" id="theme4"
                                            class="w-24 h-24 bg-accentwhite dark:bg-primarydark flex justify-center items-center rounded-lg border border-2 dark:border-accentwhite dark:border-opacity-50 hover:border-accent1 hover:border-opacity-100 dark:hover:border-accent2">
                                            <Underline class="w-14 h-14 object-cover dark:text-accentwhite" />
                                        </RadioInput>
                                        <p
                                            class="text-base text-label dark:text-accentwhite text-center mt-2 hover:text-accent1">
                                            Underline</p>
                                    </div>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <div class="w-full flex justify-end relative bottom-10">
                        <div class="flex gap-5">
                            <Button label="Preview" class="bg-primarydark dark:bg-secondarydark text-white w-32 h-10 " />
                            <Button label="Save" class="bg-accent1 dark:bg-accent2 text-white w-32 h-10 " />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
:deep(.p-inputtext) {
  @apply text-accentblack;
  @apply dark:text-accentwhite;
}

:deep(.p-textarea) {
  @apply text-accentblack;
  @apply dark:text-accentwhite;
}

:deep(.p-component) {
  @apply text-accentblack;
  @apply dark:text-accentwhite;
}
</style>
