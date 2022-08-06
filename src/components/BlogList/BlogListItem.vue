<template>
    <div class="item">
        <h2>{{ data.title }}</h2>
        <p>{{ delHtmlTag(data.text) }}</p>
        <div class="tags">
            <Tag v-for="tag in data.tags" :name="tag.name" :bg-color="tag.bgColor"></Tag>
        </div>
    </div>
</template>

<script setup lang="ts">
// import article from '../../types/article.js';
import Tag from '../Tag/Tag.vue'



interface Article{
    id: number,
    title: string,
    text?: string,
    tags: []
}

const props = defineProps(['data'])
// console.log(props.data)
// console.log(props)

const delHtmlTag = (str: string) => {
    return str.replace(/<[^>]+>/g, "");
}
</script>

<style scoped>
.item{
    word-break: break-all;
    word-wrap: break-word;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
    padding: 0.6rem;
    /* margin-top: 0.8rem; */
    /* margin: 1.6rem auto; */
    grid-column-start: 5;
    grid-column-end: 13;
}
h2{
    font-size: 1.32rem;
    /* text-align: center; */
    color: var(--text-color);
    margin-bottom: 1rem;
}
p{
    font-size: 0.7rem;
    margin-bottom: 1rem;
    display:-webkit-box;				/*弹性伸缩盒子*/
    -webkit-box-orient:vertical;		/*子元素垂直排列*/
    /* white-space:nowrap;					溢出不换行 */
    line-clamp:2;
    -webkit-line-clamp:2;				/*显示的行数*/
    overflow:hidden;					/*溢出部分隐藏*/
    text-overflow:ellipsis ;		    /*溢出部分用省略号显示*/
}
@media screen and (max-width: 672px) {
    .item{
        grid-column-start: 1;
    grid-column-end: 17;
    }
}
@media screen and (min-width: 672px) and (max-width: 1312px) {
    .item{
        grid-column-start: 1;
    grid-column-end: 17;
    }
}
</style>