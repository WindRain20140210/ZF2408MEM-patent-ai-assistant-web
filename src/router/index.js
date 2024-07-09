/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {createRouter, createWebHistory} from 'vue-router' // do not use auto router
// import {setupLayouts} from 'virtual:generated-layouts'

import PatentReportPage from "@/pages/patentReportPage.vue";
import patentSearchPage from "@/pages/patentSearchPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // extendRoutes: setupLayouts // what is real do ??

  routes: [
    {path: '/', redirect: '/report'},  // index
    {path: '/report', name: "PatentReportPage", component: PatentReportPage},

    {path: '/search', name: "PatentSearchPage", component: patentSearchPage},
  ]
})

export default router
