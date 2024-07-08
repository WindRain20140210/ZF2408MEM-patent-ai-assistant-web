/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {createRouter, createWebHistory} from 'vue-router/auto'
// import {setupLayouts} from 'virtual:generated-layouts'

import index from "@/pages/index.vue";
import hello from "@/pages/hello.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // extendRoutes: setupLayouts
  routes: [
    {path: '/', name: "home", component: index},
    {path: '/hello', name: "hello", component: hello},
  ]
})

export default router
