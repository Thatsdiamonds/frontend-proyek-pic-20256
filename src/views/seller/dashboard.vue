<template>
  <div class="p-4">
    <h1>Seller Dashboard</h1>
    <p>Welcome seller! 🎉</p>
    
    <div v-if="userProfile" class="mt-3">
      <h3>User Information (from Backend)</h3>
      <p><strong>Username:</strong> {{ userProfile.username }}</p>
      <p><strong>Email:</strong> {{ userProfile.email }}</p>
      <p><strong>Role:</strong> {{ userProfile.role }}</p>
      <p><strong>ID:</strong> {{ userProfile.id }}</p>
    </div>
    
    <div v-if="loading" class="mt-3">
      <p>Loading user data...</p>
    </div>
    
    <div v-if="error" class="mt-3 text-danger">
      <p>Error: {{ error }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getUserProfile } from '@/services/api'
import toast from '@/services/toast'

export default {
  name: "SellerDashboard",
  setup() {
    const userProfile = ref(null)
    const loading = ref(false)
    const error = ref(null)

    const loadUserProfile = async () => {
      loading.value = true
      error.value = null
      
      try {
        const profile = await getUserProfile()
        userProfile.value = profile
        console.log('User profile loaded:', profile)
      } catch (err) {
        error.value = 'Failed to load user profile'
        console.error('Error loading user profile:', err)
        toast.error('Gagal memuat data pengguna')
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      loadUserProfile()
    })

    return {
      userProfile,
      loading,
      error
    }
  }
}
</script>