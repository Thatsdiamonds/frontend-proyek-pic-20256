<template>
        <router-link 
            to="/my-kios/update" 
            class="bg-blue-500 text-white px-4 py-2 rounded">
            Update Kios
        </router-link>
<div class="info-container">
        <div class="container-top">
            <div class="title-page">
                <h2>Info KIOS</h2>
            </div>
            <div class="desc-page">
                <p>Halaman untuk melihat informasi kios</p>
            </div>
            <div class="kios-image">
                <img
                    v-if="shopProfile?.foto_kios_url"
                    :src="shopProfile.foto_kios_url"
                    alt="Foto Kios"
                    width="100px"
                    class="w-full h-64 object-cover rounded-lg shadow"
                />
            </div>
        </div>
        <div class="container-bottom">
            <div class="container-form">
                <div class="top-form">
                    <div class="profile">
                        <div class="img-profile">
                            <img
                                v-if="shopProfile?.foto_profil_url"
                                :src="shopProfile.foto_profil_url"
                                alt="Foto Profil"
                                class="w-20 h-20 object-cover border rounded-full"
                            />
                        </div>
                        <div class="info-profile">
                            <p>{{ shopProfile?.nama }}</p>
                            <p>{{ shopProfile?.lokasi }}</p>
                        </div>
                    </div>
                </div>
                <div class="form-profile">
                <form action="">
                    <div class="form-grid">
                        <div>
                            <label for="nama">nama</label>
                            <input type="text" id="nama" name="" disabled :placeholder="shopProfile?.nama">
                        </div>
                        <div>
                            <label for="deskripsi">deskripsi</label>
                            <input type="text" id="deskripsi" name="" disabled :placeholder="shopProfile?.deskripsi || '-'">
                        </div>
                        <div>
                            <label for="patokan">patokan</label>
                            <input type="text" id="patokan" name="" disabled :placeholder="shopProfile?.patokan || '-'">
                        </div>
                        <div>
                            <label for="produk">produk</label>
                            <input type="text" id="produk" name="" disabled :placeholder="shopProfile?.produk || '-'">
                        </div>
                        <div>  
                            <label for="kontak">kontak</label>
                            <input type="text" id="kontak" name="" disabled :placeholder="shopProfile?.kontak || '-'">
                        </div>
                    </div>
                </form>
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

<style>
*{
    margin: 0;
    padding: 0;
}

.update-container{
    padding: 10px;
    margin: 2rem;
}

.info-container{
    padding: 10px;
    margin: 2rem;
}

.preview-img {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 12px;
    border: 1px solid #ccc;
    margin-top: 5px;
}

.container-top{
    display: flex;
    justify-content: center;
    align-items: stretch;
}

.title-page{
    /* background: tomato; */
    text-orientation: upright;
    writing-mode: vertical-lr;
    font-family: "MyCustomFont", sans-serif;
    color: aquamarine;
    font-weight: bold;
}

.title-page h2{
    margin: 0;
}

.desc-page{
    width: min-content;
    margin-right: 2rem;
    margin-top: 10px;
}

.kios-image{
    flex: 1;
    width: auto;
    height: 450px;
    border: 1px solid black;
    border-radius: 12px;
}

.kios-image img {
    border-radius: 12px;
}

.container-bottom {
    display: flex;
    justify-content: center;
    font-family: "MyCustomFont", sans-serif;
    font-size: x-small;
}

.info-container .container-top {
    display: flex;
    margin-bottom: 2rem;
}

.container-form {
    border: 1px solid black;   
    border-radius: 22px;
    padding: 20px;
    width: 100%;
}

.desc-page p {
    font-family: "Pixel Operator", sans-serif;
    font-weight: bold;
}

.profile {
    display: flex;
    align-items: center;
    gap: 15px;
}

.img-profile {
    width: 80px;
    height: 80px;
    border-radius: 12px;
    overflow: hidden;
}

.info-profile p {
    margin: 0;
}

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px 20px;
}

.form-grid label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}


.form-grid input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
    box-sizing: border-box;
}

@media (max-width: 600px) {
    .form-grid {
        grid-template-columns: 1fr;
    }
}
</style>