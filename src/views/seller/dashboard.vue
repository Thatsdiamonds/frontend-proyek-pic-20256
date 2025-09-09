<template>
  <div class="p-4">
    <h1>Seller Dashboard</h1>
    <p>Welcome seller! 🎉</p>

    <router-link to="/my-kios/update" class="bg-blue-500 text-white px-4 py-2 rounded">Update Kios</router-link>
    
    <div v-if="userProfile" class="mt-3">
      <h3>User Information (from Backend)</h3>
      <p><strong>Username:</strong> {{ userProfile.username }}</p>
      <p><strong>Email:</strong> {{ userProfile.email }}</p>
      <p><strong>Role:</strong> {{ userProfile.role }}</p>
      <p><strong>ID:</strong> {{ userProfile.id }}</p>
    </div>
    
    <div v-if="shopProfile" class="mt-3">
      <h3>Shop Information</h3>
      <p><strong>Name:</strong> {{ shopProfile.nama }}</p>
      <p><strong>Shop ID:</strong> {{shopProfile.id}}</p>
      <p><strong>Shop Description:</strong> {{shopProfile.deskripsi}}</p>
      <p><strong>Shop Product:</strong> {{shopProfile.produk}}</p>
      <p><strong>Shop Contact:</strong> {{shopProfile.kontak}}</p>
      <p><strong>Shop Location:</strong> {{shopProfile.lokasi}}</p>
      <p><strong>Shop Patokan:</strong> {{shopProfile.patokan}}</p>

      <div class="mt-2">
        <strong>Seller Photo:</strong><br />
        <img 
          v-if="shopProfile.foto_profil_url" 
          :src="shopProfile.foto_profil_url" 
          alt="Foto Profil" 
          class="w-32 h-32 object-cover border rounded-full"
        />
        <p v-else>Tidak ada foto profil</p>
      </div>

      <div class="mt-2">
        <strong>Shop Photo:</strong><br />
        <img 
          v-if="shopProfile.foto_kios_url" 
          :src="shopProfile.foto_kios_url" 
          alt="Foto Kios" 
          class="w-40 h-40 object-cover border rounded"
        />
        <p v-else>Tidak ada foto kios</p>
      </div>
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
import { getUserProfile, getSellerProfile } from '@/services/api'
import toast from '@/services/toast'

export default {
  name: "SellerDashboard",
  setup() {
    const userProfile = ref(null)
    const shopProfile = ref(null)
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

    const loadSellerProfile = async () => {
      loading.value = true;
      error.value = null;

      try {
        const shop = await getSellerProfile()
        shopProfile.value = shop
        console.log('Shop profile loaded:', shop)
      } catch (error) {
        error.value = 'Failed to load shop profile'
        console.error('Error loading shop profile:', error);
        toast.error('Gagal memuat data pengguna')
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      loadUserProfile()
      loadSellerProfile()
    })

    return {
      userProfile,
      shopProfile,
      loading,
      error
    }
  }
}
</script>