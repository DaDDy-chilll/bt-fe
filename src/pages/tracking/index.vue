<script setup lang="ts">
import Pending from '~/components/tracking/pending.vue';
import PaymentProcess from '~/components/tracking/paymentProcess.vue';
import Shipping from '~/components/tracking/shipping.vue';
import Fulfilled from '~/components/tracking/fullfilled.vue';
import Refund from '~/components/tracking/refund.vue';
</script>

<template>
  <div class="w-full bg-accentwhite pb-16 rounded-lg dark:bg-primarydark">
    <slot-header title="Tracking"/>
    <div>
      <Pending/>
      <PaymentProcess />
      <Shipping />
      <Fulfilled />
      <Refund />
    </div>
  </div>
</template>

<style scoped>

</style>
