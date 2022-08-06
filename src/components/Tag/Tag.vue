<template>
    <span class="tag" :style="{ 'background-color': props.bgColor }">
        {{ props.name }}
    </span>
</template>

<script setup lang="ts">
// import { defineProps } from 'vue';

let props = defineProps({
    name: String,
    bgColor: String
})

</script>

<style scoped>
.tag{
    display: inline-block;
    margin: 6px;
    padding: 3.6px 6px;
    font-size: 0.7rem;
    border-radius: 4px;
    white-space: nowrap;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    color: #FAFCFF;
    text-shadow: 0 2px 6px rgba(0, 0, 0, .32);
}
</style>