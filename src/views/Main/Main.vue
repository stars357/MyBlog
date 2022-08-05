<template>
  <div>
    <Teleport to="body">
      <div class="burger">
        <div class="top-line"></div>
        <div class="middle-line"></div>
        <div class="bottom-line"></div>
      </div>
      <nav>
        <p>starry-sky-blog</p>
        <div>关于</div>
      </nav>
    </Teleport>
    <div class="banner">
      <Banner></Banner>
    </div>
    <main>
      <BlogList v-for="art in BlogData" :key="art.id" :data="art"></BlogList>
    </main>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from "vue";
import Banner from "../../components/Banner/Banner.vue";
import BlogList from "../../components/BlogList/BlogListItem.vue";
import { getArticlePage } from '../../api/article'

const rolling = () => {
  var pageWidth = window.innerWidth;
  var pageHeight = window.innerHeight;
  if (typeof pageWidth != "number") {
    //在标准模式下面
    if (document.compatMode == "CSS1Compat") {
      pageWidth = document.documentElement.clientWidth;
      pageHeight = document.documentElement.clientHeight;
    } else {
      pageWidth = document.body.clientWidth;
      pageHeight = window.document.body.clientHeight;
    }
  }
  // console.log(pageWidth)
  //判断往上滚动的距离设置导航栏
  // const limitNav = document.documentElement.clientHeight * 0.6;
  const nav: HTMLElement = document.querySelector("nav") as HTMLElement;
  if(pageWidth >= 768){
  // console.log(123);
  if (window.scrollY >= 180) {
    nav.style.backgroundColor = "rgba(255, 255, 255, 0.87)";
    nav.style.color = "#213547";
    nav.style.boxShadow = "0 5px 6px -5px rgb(133 133 133 / 60%)";
  } else {
    nav.style.backgroundColor = "rgba(255, 255, 255, 0.0)";
    nav.style.color = "#ffffff";
    nav.style.boxShadow = "";
  }
  }else{
    nav.style.backgroundColor = "rgba(255, 255, 255, 0.87)";
    nav.style.color = "#213547";
    nav.style.boxShadow = "0 5px 6px -5px rgb(133 133 133 / 60%)";
  }
};
window.addEventListener("scroll", rolling);

//获取文章
interface Article{
    id: number,
    title: string,
    text?: string,
    tags: []
}
let BlogData: Array<Article>;
await getArticlePage(0, 18).then((res) => {
  BlogData = reactive(res.data.data);
})

var navState = true;
let burger: HTMLElement;
let navMenu: HTMLElement;
let navMenuItems: NodeListOf<Element>;
onMounted(() => {
    burger = document.querySelector(".burger") as HTMLElement;
    navMenu = document.querySelector("nav") as HTMLElement;
    navMenuItems = document.querySelectorAll("nav div") as NodeListOf<Element>;
    const burgerClick = () => {
    burger.classList.toggle("active");
    navMenu.classList.toggle("open");
    // if(navState){
    //     navMenuItems.forEach((item, index) => {
    //         console.log(item)
    //         const t = <HTMLElement>item;
    //         t.style.animation = `ease-in slideOut forwards ${index*0.1+10.16}s`;
    //     });
    // }else{
    //     navMenuItems.forEach((item, index) => {
    //         // console.log(2)
    //         const t = <HTMLElement>item;
    //         t.style.animation = `0.2s ease-in slideIn forwards ${index*0.16+10.2}s`;
    //     });
    // }
    navState = !navState;
};
burger.addEventListener("click", burgerClick);


})


</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  transition: background-color 800ms, color 800ms;
  color: #fff;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.87);
}
nav > div {
  font-size: 0.7rem;
}
main {
  height: 200vh;
  padding-top: 3vh;
}
.burger {
  position: fixed;
  top: 10px;
  right: 10px;
  display: none;
}
.burger div {
  /* 设置汉堡按钮三层条 */
  width: 25px;
  height: 3px;
  background-color: #dadbdd;
  margin: 4px;
}
nav p{
  font-size: 1.56rem;
}
/* @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
}
@keyframes slideOut {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(20px);
      opacity: 0;
    }
} */
@media screen and (max-width: 768px) {
  nav {
    background-color: rgba(255, 255, 255, 0.87);
    transform: translateY(-100px);
    opacity: 0;
    box-shadow: 0 5px 6px -5px rgb(133 133 133 / 60%);
    transition: transform 500ms, opacity 500ms;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    padding-bottom: 1vh;
  }
  nav p{
    color: #606266;
    margin: 1vh 0;
  }
  nav div{
    width: 100%;
    text-align: center;
    color: #606266;
    padding: 1.6vh 0;
    display: block;
  }
  .burger {
    display: block;
    z-index: 100;
  }

  .burger * {
    transition: transform 0.3s ease-in-out,background-color 0.6s ease-in-out;
  }

  .burger .middle-line {
    transition: transform 0.6s ease-in-out,background-color 0.6s ease-in-out,opacity 0.6s ease-in-out;
  }
  .burger.active div{
    background-color: #909399;
  }
  .burger.active .top-line {
    transform: rotate(45deg) translate(4px, 6px);
  }

  /* 第三条线旋转-45度 */
  .burger.active .bottom-line {
    transform: rotate(-45deg) translate(4px, -6px);
  }

  /* 中间线向右移动并变为透明 */
  .burger.active .middle-line {
    opacity: 0;
    transform: translateX(10px);
  }
  nav.open {
        transform: translateY(0);
        opacity: 1;
    }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  nav {
    flex-direction: row;
    justify-content: flex-end;
    height: 50px;
    line-height: 42px;
    padding: 0.2rem 2rem;
    background-color: rgba(255, 255, 255, 0);
  }
  nav p{
    position: absolute;
    top: 0;
    left: 0;
  }
  nav div{
    margin: 0 1rem;
  }
}
@media screen and (min-width: 1200px) {
  nav {
    flex-direction: row;
    justify-content: flex-end;
    height: 50px;
    line-height: 42px;
    padding: 0.2rem 2rem;
    background-color: rgba(255, 255, 255, 0);
  }
   nav p{
    font-size: 1.26rem;
    position: absolute;
    top: 0;
    left: 1rem;
  }
}
</style>
