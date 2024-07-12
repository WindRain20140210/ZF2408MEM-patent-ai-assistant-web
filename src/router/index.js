/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

import {createRouter, createWebHistory} from 'vue-router' // do not use auto router

// index - 搜索报告
import searchPage from "@/pages/SearchPage.vue";

// 历史报告
import recordPage from "@/pages/RecordPage.vue";

// 生成
import generatePage from "@/pages/GeneratePage.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    // index page - 筛选条件 search params
    {
      path: '/',
      redirect: '/search'
    },
    {
      path: '/search',
      component: searchPage
    },

    // 我的历史报告 - 历史
    {
      path: '/record',
      component: recordPage
    },

    // 生成中 ....
    {
      path: '/generate',
      component: generatePage
    },

  ]
})

export default router
