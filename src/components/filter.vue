<script setup>
import { ref } from 'vue';

const props = defineProps({
    filterItems: Object
});

console.log(props.filterItems);
</script>

<template>
    <div class="flex flex-col gap-4">
        <div>
            <span class="font-medium block mb-2">Filter by:</span>
            <ul class="list-none p-0 m-0 flex flex-col">
                <li v-for="item in filterItems" :key="item.name" class="flex items-center gap-2 px-2 py-3 hover:bg-emphasis cursor-pointer rounded-border" >
                <i :class="item.icon" class="mr-2"></i>
                {{ item.name }}
                </li>
            </ul>
        </div>
    </div>
</template>