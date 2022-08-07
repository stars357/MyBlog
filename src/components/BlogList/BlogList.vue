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
    }
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

</script>

<style scoped>
.list{
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