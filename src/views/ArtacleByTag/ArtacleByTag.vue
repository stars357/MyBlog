<template>
    <div>
        <Banner :title="title"></Banner>
        <main>
            <BlogList v-model:loadStaue="loadStaue" :loadEnd="loadEnd" @load="loadArticle" :data="BlogData" :number="pageNumber"></BlogList>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import Banner from '../../components/Banner/Banner.vue';
import  BlogList from '../../components/BlogList/BlogList.vue'
import { useRoute } from 'vue-router';
import { aesDecryptParams } from '../../utils/cryptoAES'
import { getArticleByTagId } from '../../api//article'
import { Article } from '../../types/article'

//初始化
const route = useRoute();
const tagInfo = JSON.parse(aesDecryptParams(route.query.tag));
const title = tagInfo.name + ' 分类';
// console.log(tagInfo.tid)

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
    getArticleByTagId(tagInfo.tid, nowPageNumber, pageNumber).then((res) => {
        console.log(res.data);
        const data = res.data.data;
        data.forEach((e: any) => {
            BlogData.push(e)
        })
        nowPageNumber += pageNumber;
    })
})

//监听滚动加载
let loadStaue = ref(true);
let loadEnd = ref(false);
const loadArticle = () => {
    getArticleByTagId(tagInfo.tid, nowPageNumber+1, pageNumber).then((res) => {
    console.log(res.data)
    nowPageNumber += pageNumber;
    })
}

</script>

<style scoped>
main{
    width: 65vw;
    margin: auto;
}
@media screen and (max-width: 672px) {
    main{
        width: 100vw;
        padding: 0 1rem;
    }
}
@media screen and (min-width: 672px) and (max-width: 1312px) {
    main{
        width: 100vw;
        padding: 0 1rem;
    }
}
</style>