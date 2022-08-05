<template>
    <div>
        <div class="banner">
            <Banner></Banner>
        </div>
        <main>
            <BlogListItem v-for="art in BlogData" :key="art.id" :data="art"></BlogListItem>
            <div class="tags">
                <div>
                    <a href="javascript:;" v-for="tag in tagData" :key="tag.id"><Tag :name="tag.name" :bg-color="tag.bgColor"></Tag></a>
                    
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Banner from "../../components/Banner/Banner.vue";
import BlogListItem from "../../components/BlogList/BlogListItem.vue";
import { getArticlePage } from '../../api/article'
import Tag from '../../components/Tag/Tag.vue'
import { getTagAll } from '../../api/tag'

interface Article{
    id: number,
    title: string,
    text?: string,
    tags: []
}
interface Tag{
    id: number,
    name: string,
    bgColor: string
}
//分页获取文章
let nowPageNumber = 0;
let pageNumber = 18;
let BlogData: Array<Article>;
let tagData: Array<Tag>;

//请求数据初始化
await getArticlePage(0, pageNumber).then((res) => {
  BlogData = reactive(res.data.data);
  nowPageNumber += pageNumber;
});
await getTagAll().then((res) => {
    tagData = reactive(res.data.data);
    console.log(tagData)
})

// 监听滚动然后请求加载数据
let loadStaue = true;
let loaadEnd = false;
const loadArticle = (nowPage: number, maxnum: number) => {
    // console.log(312)
    getArticlePage(nowPage, maxnum).then((res) => {
    // BlogData = reactive(res.data.data);
    // console.log()
    if(res.data.data.length == 0 ){
        // console.log(123)
        loaadEnd = true;
    }
    res.data.data.forEach((element: any) => {
        BlogData.push(element);
    });
    nowPageNumber += pageNumber;
    loadStaue = true;
    console.log(BlogData);
    })
}
const rollingload = () => {
    var pageWidth = window.innerWidth;
        var pageHeight = window.innerHeight;
        if (typeof pageWidth != "number") {
            //在标准模式下面
            if (document.compatMode == "CSS1Compat" ) {
                pageWidth = document.documentElement.clientWidth;
                pageHeight = document.documentElement.clientHeight;
            } else {
                pageWidth = document.body.clientWidth;
                pageHeight = window.document.body.clientHeight;
            }
        }
        if((document.documentElement.scrollHeight - window.scrollY - pageHeight) <= 10 && loadStaue && !loaadEnd){
        //   console.log(123);
          loadStaue = false;
          loadArticle(nowPageNumber+1, pageNumber);
        }
}
window.addEventListener('scroll', rollingload)

</script>

<style scoped>
main {
    /* width: 100%; */
    /* height: 200vh; */
    display: grid;
    grid-template-columns: repeat(16, 1fr);
    column-gap: 16px;
    row-gap: 16px;
}
.tags{
    grid-column-start: 13;
    grid-column-end: 16;
    grid-row-start: 1;
    /* grid-auto-rows: auto; */
    margin: 16px 0px;
}
.tags>div{
    padding: 0.5rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}
@media screen and (max-width: 768px) {
    main{
        padding: 1rem;
    }
    .tags{
        grid-column-start: 1;
        grid-column-end: 17;
    }
}
@media screen and (min-width: 768px) and (max-width: 1200px) {
    main{
        padding: 0 1rem;
    }
    .tags{
        grid-column-start: 1;
        grid-column-end: 17;
    }
}
</style>