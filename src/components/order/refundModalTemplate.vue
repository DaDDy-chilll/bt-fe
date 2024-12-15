<script setup>
import productList from "~/pages/order/productList.json";
import productCategory from "~/pages/product/productcategory.json";
import goldType from "~/pages/product/goldtype.json";
import productType from "~/pages/product/producttype.json";

//props
const props = defineProps({
  showRefundModal: {
    type: Boolean,
    required: true,
  },
});

//emits
const emit = defineEmits(["update:showRefundModal"]);

//
</script>
<template>
  <div class="text-sm">
    <!--Modal-->
    <Dialog
      :visible="showRefundModal"
      header="Products"
      :style="{ width: '60rem' }"
      :breakpoints="{ '960px': '75vw', '641px': '90vw' }"
      :closable="true"
      @update:visible="emit('update:showRefundModal', false)"
    >
      <!--table-->
      <div class="w-full">
        <!--To put the contents here-->
        <slot></slot>
      </div>
    </Dialog>
  </div>
</template>

