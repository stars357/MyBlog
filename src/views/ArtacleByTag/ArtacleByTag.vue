<template>
    <div>
        <Banner :title="title"></Banner>
    </div>
</template>

<script setup lang="ts">
import Banner from '../../components/Banner/Banner.vue';
import { useRoute } from 'vue-router';

//初始化
const route = useRoute();
const title = route.query.name + ' 分类';

console.log(route.query)

</script>

<style scoped>

</style>