<template>
    <div>

    </div>
</template>

<script setup lang="ts">


interface Article{
    id: number,
    title: string,
    text?: string,
    tags: []
}

const props = defineProps({
    data: {
        type: Array<Article>
    }
})
console.log(props)
</script>

<style scoped>

</style>