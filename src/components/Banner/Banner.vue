<template>
    <div class="banner">
        <h1>{{ title }}</h1>
        <span></span>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

let props = defineProps({
    title: {
        type: String,
        default: 'starry sky blog'
    }
})
let title = ref('');
onMounted(() => {
    const t = (props.title as string).split('');
    
    t.forEach((c, index) => {
        
        // console.log(c)
        setTimeout(()=>{
            title.value += c;
        }, index*100 + 100)
    })
})

</script>

<style scoped>
.banner{
    background: url("../../assets/banner/1659506782656.jpg") no-repeat center center;
    background-size: cover;
    width: 100%;
    height: 36vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
@keyframes cursor{
    0%{
        opacity: 0;
    }
    50%{
        opacity: 1;
    }
    100%{
        opacity: 0;
    }
}
h1{
    font-size: 1.6rem;
    color: var(--top-text-color);
}
span{
    display: inline-block;
    width: 16px;
    height: 36px;
    border-bottom: 3px solid var(--top-text-color);
    animation:cursor 800ms infinite;
    margin: 0 6px;
}
</style>