<template>
    <div class="list">
        <transition-group @enter="blogEnter">
            <BlogListItem v-for="(art, index) in props.data" :index="index" :key="art.id" :data="art"></BlogListItem>
        </transition-group>
    </div>
</template>

<script setup lang="ts">
import BlogListItem from './BlogListItem.vue';
import gsap from 'gsap'
import { Article } from '../../types/article'
// import { Tag } from '../../types/tag'

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
let props = defineProps({
    data: Array<Article>,
    number: {
        type: Number,
        default: 18
    },
    loadStaue: Boolean,
    loadEnd: Boolean
})

const blogEnter = (el: Element, done: any) => {
    // console.log(el.getAttribute('index'));
    let i = el.getAttribute('index') as unknown as number;
    i = i % props.number;
    gsap.from(el, {
        opacity: 0, 
        y: 160, 
        delay: i * 0.08,
        onComplete: done
    })
}

const emit = defineEmits(['update:loadStaue', 'load'])

//滚动监听
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
        if((document.documentElement.scrollHeight - window.scrollY - pageHeight) <= 10 && props.loadStaue && !props.loadEnd){
        //   props.loadStaue = false;
        //   loadArticle(nowPageNumber+1, pageNumber);
            emit('update:loadStaue', false);
            emit('load');
            // console.log(props.loadStaue);
        }
}
window.addEventListener('scroll', rollingload)
</script>

<style scoped>
.list{
    width: 100%;
    grid-column-start: 5;
    grid-column-end: 13;
}
@media screen and (max-width: 672px) {
    .list{
        grid-column-start: 1;
        grid-column-end: 17;
    }
}
@media screen and (min-width: 672px) and (max-width: 1312px) {
    .list{
        grid-column-start: 1;
        grid-column-end: 17;
    }
}
</style>