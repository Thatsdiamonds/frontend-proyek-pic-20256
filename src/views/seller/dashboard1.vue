<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <div class="w-32 bg-blue-100 border flex flex-col items-center p-2">
      <p class="font-bold text-blue-800 writing-vertical text-xl">Info Kios</p>
      <p class="text-xs text-center mt-4">
        Halaman untuk<br />melihat<br />informasi kios
      </p>
    </div>

    <!-- Konten Kanan -->
    <div class="flex-1 p-6">
      <!-- Foto kios -->
      <div class="mb-6">
        <img
          v-if="shopProfile?.foto_kios_url"
          :src="shopProfile.foto_kios_url"
          alt="Foto Kios"
          width="100px"
          class="w-full h-64 object-cover rounded-lg shadow"
        />
      </div>
        <router-link to="/my-kios/update" class="bg-blue-500 text-white px-4 py-2 rounded">Update Kios</router-link>
      <!-- Kotak Profil -->
      <div class="bg-white border rounded-lg p-4 shadow">
        <div class="flex items-center gap-4 mb-4">
          <img
            v-if="shopProfile?.foto_profil_url"
            :src="shopProfile.foto_profil_url"
            alt="Foto Profil"
            class="w-20 h-20 object-cover border rounded-full"
          />
          <div>
            <h2 class="font-bold text-lg">{{ shopProfile?.nama }}</h2>
            <p class="text-sm text-gray-600">ID: {{ shopProfile?.id }}</p>
          </div>
        </div>

        <!-- Grid isi 2 kolom -->
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div><strong>Deskripsi:</strong> {{ shopProfile?.deskripsi || '-' }}</div>
          <div><strong>Patokan:</strong> {{ shopProfile?.patokan || '-' }}</div>
          <div><strong>Produk:</strong> {{ shopProfile?.produk || '-' }}</div>
          <div><strong>Kontak:</strong> {{ shopProfile?.kontak || '-' }}</div>
          <div><strong>Lokasi:</strong> {{ shopProfile?.lokasi || '-' }}</div>
        </div>
      </div>
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
