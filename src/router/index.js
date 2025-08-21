import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin-denah',
      name: 'AdminDenah',
      component: () => import('@/views/adminDenah.vue')
    },
  ],
})

export default router
