<template>
  <div class="max-w-lg mx-auto p-4">
    <h2 class="text-xl font-bold mb-4">Update Kios Saya</h2>

    <form @submit.prevent="updateKios">
      <div class="mb-2">
        <label class="block">Nama</label>
        <input v-model="shopProfile.nama" type="text" class="border rounded w-full p-2" />
      </div>

      <div class="mb-2">
        <label class="block">Deskripsi</label>
        <textarea v-model="shopProfile.deskripsi" class="border rounded w-full p-2"></textarea>
      </div>

      <div class="mb-2">
        <label class="block">Produk</label>
        <input v-model="shopProfile.produk" type="text" class="border rounded w-full p-2" />
      </div>

      <div class="mb-2">
        <label class="block">Lokasi</label>
        <input v-model="shopProfile.lokasi" type="text" class="border rounded w-full p-2" />
      </div>

      <div class="mb-2">
        <label class="block">Patokan</label>
        <input v-model="shopProfile.patokan" type="text" class="border rounded w-full p-2" />
      </div>

      <div class="mb-2">
        <label class="block">Kontak</label>
        <input v-model="shopProfile.kontak" type="text" class="border rounded w-full p-2" />
      </div>

      <div class="mb-2">
        <label class="block">Foto Profil</label>
        <input type="file" @change="e => shopProfile.foto_profil = e.target.files[0]" />
      </div>

      <div class="mb-2">
        <label class="block">Foto Kios</label>
        <input type="file" @change="e => shopProfile.foto_kios = e.target.files[0]" />
      </div>

      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        Update
      </button>
    </form>

    <p v-if="message" class="mt-4 text-green-600">{{ message }}</p>
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
