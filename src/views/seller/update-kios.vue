<template>
    <div class="update-container">
        <div class="container-top">
            <div class="title-page">
                <h2>Edit KIOS</h2>
            </div>
            <div class="desc-page">
                <p>Halaman untuk mengubah informasi kios</p>
            </div>
            <div class="container-form">
                <div class="top-form">
                    <div class="profile">
                        <div class="img-profile">
                            <img src="../../img/profile.png" alt="fotoprofile">
                        </div>
                        <div class="info-profile">
                            <p>{{ shopProfile?.nama }}</p>
                            <p>{{ shopProfile?.lokasi }}</p>
                        </div>
                    </div>
                </div>
                <div class="form-profile">
                    <form @submit.prevent="updateKios">
                        <div class="form-grid">
                            <div>
                            <label for="nama">nama</label>
                            <input type="text" id="nama" name="" v-model="shopProfile.nama">
                        </div>
                        <div>
                            <label for="fotoprofile">foto profile</label>
                            <input type="file" id="fotoprofile" name="" @change="e => shopProfile.foto_profil = e.target.files[0]">
                        </div>
                        <div>
                            <label for="deskripsi">deskripsi</label>
                            <input type="text" id="deskripsi" name="" v-model="shopProfile.deskripsi">
                        </div>
                        <div>
                            <label for="patokan">patokan</label>
                            <input type="text" id="patokan" name="" v-model="shopProfile.patokan">
                        </div>
                        <div>
                            <label for="produk">produk</label>
                            <input type="text" id="produk" name="" v-model="shopProfile.produk">
                        </div>
                        <div>  
                            <label for="kontak">kontak</label>
                            <input type="text" id="kontak" name="" v-model="shopProfile.kontak">
                        </div>
                        <div>  
                            <label for="lokasi">lokasi</label>
                            <input type="text" id="lokasi" name="" v-model="shopProfile.lokasi">
                        </div>
                        <div class="full-width">
                            <label for="kiosimage">foto kios</label>
                            <input type="file" id="kiosimage" name="" @change="e => shopProfile.foto_kios = e.target.files[0]">
                        </div>
                    </div>
                    <div class="button-simpan">
                        <button type="submit">Simpan</button>
                    </div>
                </form>
                <p v-if="message" class="mt-4 text-green-600">{{ message }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getSellerProfile, updateMyKios } from "@/services/api";

const shopProfile = ref({
  nama: "",
  deskripsi: "",
  produk: "",
  lokasi: "",
  patokan: "",
  kontak: "",
  foto_profil: null,
  foto_kios: null,
});

const message = ref("");
const loading = ref(false);
const error = ref("");

onMounted(async () => {
  loading.value = true;
  try {
    const shop = await getSellerProfile();
    // gabungkan biar field foto tetap ada
    shopProfile.value = {
      ...shopProfile.value,
      ...shop,
    };
    console.log("Shop profile loaded:", shop);
  } catch (err) {
    error.value = "Gagal memuat data kios";
    console.error("Error loading shop profile:", err);
  } finally {
    loading.value = false;
  }
});

const updateKios = async () => {
  try {
    const formData = new FormData();
    formData.append("nama", shopProfile.value.nama || "");
    formData.append("deskripsi", shopProfile.value.deskripsi || "");
    formData.append("produk", shopProfile.value.produk || "");
    formData.append("lokasi", shopProfile.value.lokasi || "");
    formData.append("patokan", shopProfile.value.patokan || "");
    formData.append("kontak", shopProfile.value.kontak || "");

    if (shopProfile.value.foto_profil instanceof File) {
      formData.append("foto_profil", shopProfile.value.foto_profil);
    }
    if (shopProfile.value.foto_kios instanceof File) {
      formData.append("foto_kios", shopProfile.value.foto_kios);
    }

    const res = await updateMyKios(formData);
    message.value = res.message || "Kios berhasil diupdate!";
  } catch (err) {
    console.error("Gagal update kios:", err.response?.data || err.message);
  }
};
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