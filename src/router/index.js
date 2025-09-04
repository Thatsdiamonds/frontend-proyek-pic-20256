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
      beforeEnter: async (to, from, next) => {
        try {
          // hapus token di database
          await api.post("/logout", {}, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          })
        } catch (error) {
          console.warn("Gagal revoke token:", error);
        }

        // hapus token dari localStorage
        localStorage.removeItem('token')

        toast.info('Anda telah logout.')
        next('/login')
      }
    },
    {
      path: '/admin/register',
      name: 'Register',
      component: () => import('@/views/admin/register.vue'),
      meta: { role: 'admin' }   // khusus admin
    },
    {
      path: '/admin',
      name: 'AdminDenah',
      component: () => import('@/views/admin/dashboard.vue'),
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
router.beforeEach(async (to, from, next) => {
  // Skip auth check for public routes
  if (to.path === '/' || to.path === '/login') {
    return next()
  }

  const token = localStorage.getItem('token')
  
  // Jika tidak ada token, redirect ke login
  if (!token) {
    toast.warning('Silakan login terlebih dahulu.')
    return next('/login')
  }

  try {
    // Ambil data user dari backend berdasarkan token
    const response = await api.get('/user/profile', { silent: true })
    const userRole = response.data.role

    // klo route butuh satu role spesifik
    if (to.meta.role && to.meta.role !== userRole) {
      toast.warning('Akses ditolak. Silakan login dengan role yang sesuai.')
      return next('/login')
    }

    // Cek jika route butuh salah satu dari beberapa role
    if (to.meta.roles && !to.meta.roles.includes(userRole)) {
      toast.warning('Akses ditolak. Silakan login dengan role yang sesuai.')
      return next('/login')
    }

    next()
  } catch (error) {
    // Jika gagal ambil data user, kemungkinan token invalid
    localStorage.removeItem('token')
    toast.error('Sesi Anda telah berakhir. Silakan login ulang.')
    next('/login')
  }
})

export default router
