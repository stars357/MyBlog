import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('../views/Home/Home.vue')
  },{
    path: '/artacle/tag',
    component: () => import('../views/ArtacleByTag/ArtacleByTag.vue')
  }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
  })

export default router