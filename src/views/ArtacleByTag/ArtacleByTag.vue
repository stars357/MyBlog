<template>
    <div>
        <Banner :title="title"></Banner>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import Banner from '../../components/Banner/Banner.vue';
import { useRoute } from 'vue-router';
import { aesDecryptParams } from '../../utils/cryptoAES'
import { getArticleByTagId } from '../../api//article'
import { Article } from '../../types/article'

//初始化
const route = useRoute();
const tagInfo = JSON.parse(aesDecryptParams(route.query.tag));
const title = tagInfo.name + ' 分类';
console.log(tagInfo.tid)

//请求数据初始化
// interface Article{
//     id: number,
//     title: string,
//     text?: string,
//     tags: Array<Tag>
// }
// interface Tag{
//     id: number,
//     name: string,
//     bgColor: string
// }
//分页获取文章
let nowPageNumber: number = 0;
let pageNumber: number = Number(import.meta.env.VITE_PAGE_NUMBER);
let BlogData: Array<Article> = reactive([]);
onMounted(() => {

})

</script>

<style scoped>

</style>