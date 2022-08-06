<template>
    <div>
        <div class="banner">
            <Banner title="starry sky blog"></Banner>
        </div>
        <main>
            <BlogList :data="BlogData" :number="pageNumber"></BlogList>
            <div class="tags">
                <div>
                    <transition-group @enter="tagEnter">
                        <a href="javascript:;" @click="toBlogByTag(tag.id, tag.name)" v-for="(tag, index) in tagData" :index="index" :key="tag.id"><Tag :name="tag.name" :bg-color="tag.bgColor"></Tag></a>
                    </transition-group>
                    
                    
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import Banner from "../../components/Banner/Banner.vue";
import BlogList from "../../components/BlogList/BlogList.vue";
import { getArticlePage } from '../../api/article'
import Tag from '../../components/Tag/Tag.vue'
import { getTagAll } from '../../api/tag'
import gsap from 'gsap'
import { useRouter } from "vue-router";

//初始化
const router = useRouter();

//加载动画，使用gsap
const tagEnter = (el: Element, done: any) => {
    // console.log(el.getAttribute('index'));
    let i = el.getAttribute('index') as unknown as number;
    i = i % pageNumber;
    gsap.from(el, {
        opacity: 0, 
        // x: 10, 
        delay: i * 0.1,
        onComplete: done
    })
}

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
let nowPageNumber: number = 0;
let pageNumber: number = Number(import.meta.env.VITE_PAGE_NUMBER);
let BlogData: Array<Article> = reactive([]);
let tagData: Array<Tag> = reactive([]);

//请求数据初始化
onMounted(async () => {
        await getTagAll().then((res) => {
        const data = res.data.data;
        data.forEach((e: Tag) => {
            tagData.push(e);
        })
        // console.log(tagData)
    })
    await getArticlePage(0, pageNumber).then((res) => {
        const data = res.data.data;
        data.forEach((e: Article) => {
            BlogData.push(e);
        })
        nowPageNumber += pageNumber;
    });
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
    // console.log(BlogData);
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

//跳转到根据标签分类查内容
const toBlogByTag = (tid: number, name: string) => {
    // console.log(tid)
    router.push({
        path: '/artacle/tag',
        query: {
            'tid': tid,
            'name': name
        }
    })
}
</script>

<style scoped>
main {
    /* width: 100%; */
    /* height: 200vh; */
    display: grid;
    grid-template-columns: repeat(var(--grid-column-number), 1fr);
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
@media screen and (max-width: 672px) {
    main{
        padding: 1rem;
    }
    .tags{
        grid-column-start: 1;
        grid-column-end: 17;
    }
}
@media screen and (min-width: 672px) and (max-width: 1312px) {
    main{
        padding: 0 1rem;
    }
    .tags{
        grid-column-start: 1;
        grid-column-end: 17;
    }
}
</style>