/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {createRouter, createWebHistory} from 'vue-router' // do not use auto router

import patentReportPage from "@/pages/patentReportPage.vue";
import patentSearchPage from "@/pages/patentSearchPage.vue";
import playgroundPage from "@/pages/playgroundPage.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      redirect: '/report'
    },
    {
      path: '/report',
      name: "patentReportPage",
      component: patentReportPage
    },
    {
      path: '/search',
      name: "patentSearchPage",
      component: patentSearchPage
    },
    {
      path: '/playground',
      name: "playground",
      component: playgroundPage
    },
  ]
})

export default router
