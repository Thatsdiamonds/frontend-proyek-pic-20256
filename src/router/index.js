import { createRouter, createWebHistory } from 'vue-router'
import api from '@/services/api'
import toast from '@/services/toast'
import NotFound from '@/components/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:catchAll(.*)", // SISTEM 404
      name: "NotFound",
      component: NotFound, // NotFound dah diimport di atas
    },
    {
      path: '/',
      name: 'Index',
      component: () => import('@/views/index.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login.vue')
    },
    {
      path: '/logout',
      name: 'Logout',
      beforeEnter: (to, from, next) => {
        // hapus token di database
        api.post("/logout", {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

        // hapus data localStorage
        localStorage.removeItem('token')
        localStorage.removeItem('role')

        toast.info('Anda telah logout.')
        next('/login')
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/register.vue')
    },
    {
      path: '/admin',
      name: 'AdminDenah',
      component: () => import('@/views/admin/adminDenah.vue'),
      meta: { role: 'admin' }   // khusus admin
    },
    {
      path: '/seller',
      name: 'SellerDashboard',
      component: () => import('@/views/seller/dashboard.vue'),
      meta: { roles: ['seller', 'admin'] }  // khusus seller?
    },
  ],
})

// Mas Gatot kang jaga url
router.beforeEach((to, from, next) => {
  const role = localStorage.getItem('role')

  // klo route butuh satu role spesifik
  if (to.meta.role && to.meta.role !== role) {
    toast.warning('Akses ditolak. Silakan login dengan role yang sesuai.')
    return next('/login')
  }

  // Cek jika route butuh salah satu dari beberapa role
  if (to.meta.roles && !to.meta.roles.includes(role)) {
    toast.warning('Akses ditolak. Silakan login dengan role yang sesuai.')
    return next('/login')
  }

  next()
})

export default router
