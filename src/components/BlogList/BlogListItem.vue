<template>
    <div>
        <!-- {{ props.data }}
        <div v-html="props.data.text"></div> -->
    </div>
</template>

<script setup lang="ts">
import article from '../../types/article.js';



interface Article{
    id: number,
    title: string,
    text?: string,
    tags: []
}

const props = defineProps(['data'])
console.log(props.data)
// console.log(props)
</script>

<style scoped>

</style>