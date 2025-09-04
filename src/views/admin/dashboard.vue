<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
import toast from "@/services/toast";
import PasarOwi from "./PasarOwi.vue";
import api from "@/services/api";

// State untuk form konfigurasi kios
const kiosConfig = reactive({
  nama: '',
  deskripsi: '',
  produk: '',
  lokasi: '',
  patokan: '',
  kontak: '',
  foto_profil: null,
  foto_kios: null
});

// State untuk form konfigurasi pengguna
const userConfig = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

// State untuk validasi
const errors = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
});

// State untuk menampilkan password
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);
const penjualList = ref([]);
const selectedPenjual = ref(null);
const selectedKiosId = ref(null); // ID kios yang dipilih dari pencarian
const hoveredRect = ref(null); // Kios yang sedang di-hover di denah

// Variable pencarian
const Text = ref('');

//////////////////////////////////////////////// Validasi form
const validateForm = () => {
  let isValid = true;
  
  // Reset error blah
  Object.keys(errors).forEach(key => errors[key] = '');
  
  // Validasi username
  if (!userConfig.username.trim()) {
    errors.username = 'Username wajib diisi';
    isValid = false;
  }
  
  // Validasi email
  if (!userConfig.email.trim()) {
    errors.email = 'Email wajib diisi';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userConfig.email)) {
    errors.email = 'Format email tidak valid';
    isValid = false;
  }
  
  // Validasi password
  if (!userConfig.password) {
    errors.password = 'Password wajib diisi';
    isValid = false;
  } else if (userConfig.password.length < 6) {
    errors.password = 'Password minimal 6 karakter';
    isValid = false;
  }
  
  // Validasi confirm password
  if (!userConfig.confirmPassword) {
    errors.confirmPassword = 'Konfirmasi password wajib diisi';
    isValid = false;
  } else if (userConfig.password !== userConfig.confirmPassword) {
    errors.confirmPassword = 'Password tidak cocok';
    isValid = false;
  }
  
  return isValid;
};

// Handle simpan konfigurasi pengguna
const handleSaveUserConfig = () => {
  if (validateForm()) {
    // Implementasi save logic di sini
    console.log('Data pengguna berhasil disimpan:', userConfig);
    // Reset form setelah berhasil
    userConfig.username = '';
    userConfig.email = '';
    userConfig.password = '';
    userConfig.confirmPassword = '';
  }
};

// Handle file upload untuk foto profil
const handleFotoProfilChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    kiosConfig.foto_profil = file;
  }
};

// Handle file upload untuk foto kios
const handleFotoKiosChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    kiosConfig.foto_kios = file;
  }
};

// Handle simpan konfigurasi kios
const handleSaveKiosConfig = () => {
  // Implementasi save logic untuk kios di sini
  console.log('Data kios berhasil disimpan:', kiosConfig);
  // Reset form setelah berhasil
  Object.keys(kiosConfig).forEach(key => {
    if (key.includes('foto')) {
      kiosConfig[key] = null;
    } else {
      kiosConfig[key] = '';
    }
  });
};

// Handle reset form kios
const handleResetKiosConfig = () => {
  Object.keys(kiosConfig).forEach(key => {
    if (key.includes('foto')) {
      kiosConfig[key] = null;
    } else {
      kiosConfig[key] = '';
    }
  });
};

// Handle reset form
const handleResetUserConfig = () => {
  userConfig.username = '';
  userConfig.email = '';
  userConfig.password = '';
  userConfig.confirmPassword = '';
  Object.keys(errors).forEach(key => errors[key] = '');
};

// Fungsi untuk sinkronisasi data antar panel
const syncPanelData = (kiosData) => {
  if (!kiosData) return;
  
  console.log('syncPanelData dipanggil dengan data:', kiosData);
  
  // Update selectedPenjual untuk highlight di panel Kios Terdaftar
  selectedPenjual.value = kiosData;
  selectedKiosId.value = kiosData.lokasi;
  
  console.log('selectedKiosId diupdate ke:', selectedKiosId.value);
  
  // Update form konfigurasi kios
  kiosConfig.nama = kiosData.nama || '';
  kiosConfig.deskripsi = kiosData.deskripsi || '';
  kiosConfig.produk = kiosData.produk || '';
  kiosConfig.lokasi = kiosData.lokasi || '';
  kiosConfig.patokan = kiosData.patokan || '';
  kiosConfig.kontak = kiosData.kontak || '';
  kiosConfig.foto_profil = kiosData.foto_profil || null;
  kiosConfig.foto_kios = kiosData.foto_kios || null;
  
  // Update form konfigurasi pengguna (hanya username dan email)
  userConfig.username = kiosData.user?.username || '';
  userConfig.email = kiosData.user?.email || '';

  console.log('Panel data berhasil disinkronkan:', kiosData);
  console.log('selectedKiosId final:', selectedKiosId.value);
};

// Handle klik pada kios di denah
const handleKiosClick = async (event) => {
  const targetId = event.target.id;
  if (!targetId) return;

  console.log(`Kios ${targetId} diklik di denah!`);
  
  try {
    // Ambil data kios berdasarkan lokasi
    const res = await api.get(`/penjual/detail/${targetId}`, { silent: true });
    
    if (res.data.data && Object.keys(res.data.data).length > 0) {
      // Data ditemukan, sinkronkan semua panel
      syncPanelData(res.data.data);
      toast.success(`Kios ${targetId} dipilih`);
    } else {
      // Data tidak ditemukan, buat data kosong
      const emptyKiosData = {
        lokasi: targetId,
        nama: '',
        deskripsi: '',
        produk: '',
        patokan: '',
        kontak: '',
        foto_profil: null,
        foto_kios: null
      };
      syncPanelData(emptyKiosData);
      toast.info(`Kios ${targetId} belum memiliki data, silakan isi informasi`);
    }
  } catch (err) {
    console.error(`Error mengambil data kios ${targetId}:`, err);
    
    // Buat data kosong jika gagal fetch
    const emptyKiosData = {
      lokasi: targetId,
      nama: '',
      deskripsi: '',
      produk: '',
      patokan: '',
      kontak: '',
      foto_profil: null,
      foto_kios: null
    };
    syncPanelData(emptyKiosData);
    toast.info(`Kios ${targetId} dipilih (data kosong)`);
  }
};

// Handle hover pada kios di denah
const handleKiosHover = (kiosId) => {
  hoveredRect.value = kiosId;
};

// Handle mouse out dari kios di denah
const handleKiosOut = () => {
  hoveredRect.value = null;
};

// Pilih kios dari panel Kios Terdaftar
const selectKiosFromSearch = (penjual) => {
  syncPanelData(penjual);
  toast.success(`Kios ${penjual.lokasi} dipilih dari daftar`);
};

// Reset semua panel ke state awal
const resetAllPanels = () => {
  selectedPenjual.value = null;
  selectedKiosId.value = null;
  hoveredRect.value = null;
  
  // Reset form konfigurasi kios
  Object.keys(kiosConfig).forEach(key => {
    if (key.includes('foto')) {
      kiosConfig[key] = null;
    } else {
      kiosConfig[key] = '';
    }
  });
  
  // Reset form konfigurasi pengguna
  userConfig.username = '';
  userConfig.email = '';
  userConfig.password = '';
  userConfig.confirmPassword = '';
  
  // Clear errors
  Object.keys(errors).forEach(key => errors[key] = '');
  
  console.log('Semua panel berhasil direset');
};

// Filter daftar penjual berdasarkan kata kunci pencarian
const filteredPenjual = computed(() => {
  if (!Text.value.trim()) return penjualList.value;
  
  const Lower = Text.value.toLowerCase();
  return penjualList.value.filter(penjual => 
    penjual.nama?.toLowerCase().includes(Lower) || 
    penjual.produk?.toLowerCase().includes(Lower) ||
    penjual.lokasi?.toLowerCase().includes(Lower) ||
    penjual.deskripsi?.toLowerCase().includes(Lower) ||
    penjual.patokan?.toLowerCase().includes(Lower)
  );
});

// Cek apakah ada hasil pencarian yang ditemukan
const hasResults = computed(() => {
  return Text.value.trim() && filteredPenjual.value.length > 0;
});

async function fetchAllPenjual() {
  isLoading.value = true;
  try {
    const res = await api.get('/penjual', { silent: true });
    // Ambil data dari response API, handle struktur data yang berbeda
    penjualList.value = res.data.data || res.data;
    console.log("Data penjual berhasil diambil:", penjualList.value);
  } catch (err) {
    console.error("Error mengambil data penjual:", err);
    toast.error("Gagal mengambil data penjual");
  } finally {
    isLoading.value = false;
  }
}

// Upload Denah Modal Functions
const showUploadDenahModal = ref(false);
const denahDraft = ref(null);
const denahDraftUrl = ref(null);
const isUploading = ref(false);
const denahContainer = ref(null);
const currentZoom = ref(1);
const minZoom = 0.5;
const maxZoom = 3;
const pasarOwiRef = ref(null);

const openUploadDenah = () => {
  denahDraft.value = null;
  denahDraftUrl.value = null;
  showUploadDenahModal.value = true;
};
const closeUploadDenahModal = () => {
  showUploadDenahModal.value = false;
  if (denahDraftUrl.value) URL.revokeObjectURL(denahDraftUrl.value);
  denahDraft.value = null;
  denahDraftUrl.value = null;
};
const handleDenahDraft = (event) => {
  const file = event.target.files[0];
  if (file && file.type === 'image/svg+xml') {
    if (denahDraftUrl.value) URL.revokeObjectURL(denahDraftUrl.value);
    denahDraft.value = file;
    denahDraftUrl.value = URL.createObjectURL(file);
  } else {
    toast.error('Pilih file SVG yang valid');
  }
};
const removeDenahDraft = () => {
  if (denahDraftUrl.value) URL.revokeObjectURL(denahDraftUrl.value);
  denahDraft.value = null;
  denahDraftUrl.value = null;
};
const uploadDenah = async () => {
  if (!denahDraft.value) return;
  try {
    const formData = new FormData();
    formData.append('denah_svg', denahDraft.value);
    const response = await api.post(`/update-denah/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    if (response.data.success) {
      toast.success('Denah berhasil diupload!');
      closeUploadDenahModal();
      if (pasarOwiRef.value && pasarOwiRef.value.reloadSvg) {
        pasarOwiRef.value.reloadSvg();
      }
    } else {
      toast.error('Gagal upload denah');
    }
  } catch (error) {
    console.error('Error uploading denah:', error);
    toast.error('Gagal upload denah. Silakan coba lagi.');
  } finally {
    isUploading.value = false;
  }
};

// Zoom Functions
const zoomIn = () => {
  if (currentZoom.value < maxZoom) {
    currentZoom.value = Math.min(currentZoom.value + 0.2, maxZoom);
    applyZoom();
  }
};

const zoomOut = () => {
  if (currentZoom.value > minZoom) {
    currentZoom.value = Math.max(currentZoom.value - 0.2, minZoom);
    applyZoom();
  }
};

const resetZoom = () => {
  currentZoom.value = 1;
  applyZoom();
};

const applyZoom = () => {
  if (denahContainer.value) {
    const svg = denahContainer.value.querySelector('svg');
    if (svg) {
      svg.style.transform = `scale(${currentZoom.value})`;
      svg.style.transformOrigin = 'center center';
    }
  }
};

onMounted(() => {
  fetchAllPenjual();
});

const fotoProfilInput = ref(null);
const fotoKiosInput = ref(null);

// Untuk revoke object URL
let fotoProfilObjectUrl = null;
let fotoKiosObjectUrl = null;

const fotoProfilSrc = computed(() => {
  if (kiosConfig.foto_profil instanceof File) {
    if (fotoProfilObjectUrl) URL.revokeObjectURL(fotoProfilObjectUrl);
    fotoProfilObjectUrl = URL.createObjectURL(kiosConfig.foto_profil);
    return fotoProfilObjectUrl;
  }
  if (typeof kiosConfig.foto_profil === 'string' && kiosConfig.foto_profil.trim() !== '') {
    return kiosConfig.foto_profil;
  }
  return null;
});
const fotoKiosSrc = computed(() => {
  if (kiosConfig.foto_kios instanceof File) {
    if (fotoKiosObjectUrl) URL.revokeObjectURL(fotoKiosObjectUrl);
    fotoKiosObjectUrl = URL.createObjectURL(kiosConfig.foto_kios);
    return fotoKiosObjectUrl;
  }
  if (typeof kiosConfig.foto_kios === 'string' && kiosConfig.foto_kios.trim() !== '') {
    return kiosConfig.foto_kios;
  }
  return null;
});

const removeFotoProfil = () => {
  if (fotoProfilObjectUrl) URL.revokeObjectURL(fotoProfilObjectUrl);
  kiosConfig.foto_profil = null;
};
const removeFotoKios = () => {
  if (fotoKiosObjectUrl) URL.revokeObjectURL(fotoKiosObjectUrl);
  kiosConfig.foto_kios = null;
};

watch(() => kiosConfig.foto_profil, (val, oldVal) => {
  if (oldVal instanceof File && fotoProfilObjectUrl) {
    URL.revokeObjectURL(fotoProfilObjectUrl);
    fotoProfilObjectUrl = null;
  }
});
watch(() => kiosConfig.foto_kios, (val, oldVal) => {
  if (oldVal instanceof File && fotoKiosObjectUrl) {
    URL.revokeObjectURL(fotoKiosObjectUrl);
    fotoKiosObjectUrl = null;
  }
});

const showFotoProfilModal = ref(false);
const showFotoKiosModal = ref(false);
const fotoProfilDraft = ref(null);
const fotoKiosDraft = ref(null);
const fotoProfilDraftUrl = ref(null);
const fotoKiosDraftUrl = ref(null);

const openFotoProfilModal = () => {
  fotoProfilDraft.value = null;
  fotoProfilDraftUrl.value = null;
  showFotoProfilModal.value = true;
};
const openFotoKiosModal = () => {
  fotoKiosDraft.value = null;
  fotoKiosDraftUrl.value = null;
  showFotoKiosModal.value = true;
};
const closeFotoProfilModal = () => {
  showFotoProfilModal.value = false;
  if (fotoProfilDraftUrl.value) URL.revokeObjectURL(fotoProfilDraftUrl.value);
  fotoProfilDraft.value = null;
  fotoProfilDraftUrl.value = null;
};
const closeFotoKiosModal = () => {
  showFotoKiosModal.value = false;
  if (fotoKiosDraftUrl.value) URL.revokeObjectURL(fotoKiosDraftUrl.value);
  fotoKiosDraft.value = null;
  fotoKiosDraftUrl.value = null;
};
const handleFotoProfilDraft = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    if (fotoProfilDraftUrl.value) URL.revokeObjectURL(fotoProfilDraftUrl.value);
    fotoProfilDraft.value = file;
    fotoProfilDraftUrl.value = URL.createObjectURL(file);
  } else {
    toast.error('Pilih file gambar yang valid');
  }
};
const handleFotoKiosDraft = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    if (fotoKiosDraftUrl.value) URL.revokeObjectURL(fotoKiosDraftUrl.value);
    fotoKiosDraft.value = file;
    fotoKiosDraftUrl.value = URL.createObjectURL(file);
  } else {
    toast.error('Pilih file gambar yang valid');
  }
};
const saveFotoProfil = () => {
  if (fotoProfilDraft.value) {
    kiosConfig.foto_profil = fotoProfilDraft.value;
    closeFotoProfilModal();
  }
};
const saveFotoKios = () => {
  if (fotoKiosDraft.value) {
    kiosConfig.foto_kios = fotoKiosDraft.value;
    closeFotoKiosModal();
  }
};

const removeFotoProfilDraft = () => {
  if (fotoProfilDraftUrl.value) URL.revokeObjectURL(fotoProfilDraftUrl.value);
  fotoProfilDraft.value = null;
  fotoProfilDraftUrl.value = null;
};
const removeFotoKiosDraft = () => {
  if (fotoKiosDraftUrl.value) URL.revokeObjectURL(fotoKiosDraftUrl.value);
  fotoKiosDraft.value = null;
  fotoKiosDraftUrl.value = null;
};
</script>

<template>
  <!-- Tombol Aksi - Header -->
  <div class="upperButtonMenu marginbttm">
    <div class="button" @click="$router.push('/logout');">
        <img src="/icons/drought.svg" alt="Icon" width="auto" height="100%">
      <div class="text">
        <a>Logout</a>
        <a>Keluar dari akun Anda</a>
      </div>
    </div>

    <div style="display: inline-flex; gap: 1rem;">
      <div class="button" style="--border-color: #0D9C9C" @click="$router.push('/admin/register');">
          <img src="/icons/rocket.svg" alt="Icon" width="auto" height="100%">
        <div class="text">
          <a>Halaman Add Seller</a>
          <a>Klik di sini untuk berpindah</a>
        </div>
      </div>

      <div class="button" style="--border-color: #0D9C9C">
          <img src="/icons/sunglasses.svg" alt="Icon" width="auto" height="100%">
        <div class="text">
          <a>Kelola</a>
          <a>Klik di sini untuk berpindah</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Header -->
  <div class="marginbttm" style="display: flex; align-items: center; justify-content: space-between;">
    <div class="header">
      <h2 class="subheading">Panel Kontrol Manajemen Sinasar</h2>
      <h1 class="heading">Pasar Owi</h1>
    </div>

    <div style="display: inline-flex; gap: 1rem;">
      <div class="button" 
           style="--border-color: #15a1c8; --bg-color: #15a1c8; --color: #fff; --bg-hov: #16abd5"
           @click="resetAllPanels">
        <img src="/icons/save.svg" alt="Icon" width="auto" height="100%">
        <div class="text">
          <a>RESET SEMUA PANEL</a>
        </div>
      </div>

      <div class="button" 
           style="--border-color: #e57373; --bg-color: transparent; --color: #e57373; --border-hov: #d32f2f; --bg-hov: #ffebee"
           @click="resetAllPanels">
        <img src="/icons/cancel.svg" alt="Icon" width="auto" height="100%">
          <div class="text">
          <a>Reset Semua</a>
          </div>
      </div>
    </div>
  </div>

  <!-- Layout -->
  <div class="main-layout equal-height-layout">
    <!-- Area Denah -->
    <div class="content-container equal-height-item" style="overflow: hidden;">
      <div class="content-header marginbttm">
        <div class="content-header-text">
          <h2 class="content-title">Editor Denah Pasar</h2>
          <div class="content-sub">Total sebanyak 16 kios</div>
        </div>
        <div class="button" style="--border-color: #19a7a7; --bg-color: #19a7a7; --color: #fff; --sub-color: #ffffff9a; --bg-hov: #16abd5" @click="openUploadDenah">
          <img src="/icons/cloud.svg" alt="Icon" width="auto" height="100%">
          <div class="text">
            <a>Upload Denah</a>
          </div>
        </div>
      </div>

      <!-- Denah Pasar Owi dengan komponen PasarOwi -->
      <div class="denah-area marginbttm">
        <div class="denah-controls">
          <button class="zoom-btn" @click="zoomIn" title="Zoom In">
            <img src="/icons/plus.svg" alt="Zoom In" width="16" height="16">
          </button>
          <button class="zoom-btn" @click="zoomOut" title="Zoom Out">
            <img src="/icons/minus.svg" alt="Zoom Out" width="16" height="16">
          </button>
          <button class="zoom-btn" @click="resetZoom" title="Reset Zoom">
            <img src="/icons/car.svg" alt="Reset" width="16" height="16">
          </button>
        </div>
        <div class="denah-container" ref="denahContainer">
          <PasarOwi 
            ref="pasarOwiRef"
            :hoveredRect="hoveredRect"
            :selectedKios="selectedKiosId"
            :isSearchMode="true"
            @rect-hover="handleKiosHover"
            @rect-out="handleKiosOut"
            @click="handleKiosClick"
          />
        </div>
      </div>

      <div class="denah-tip">
        <img src="/icons/pro.svg" alt="Icon" width="auto" height="100%">
        <div class="tip-text">
          <span class="tip-title">Pro Tip</span>
          <span class="tip-desc">Klik kios dalam denah untuk memilih target pengeditan</span>
        </div>
      </div>
    </div>

    <!-- Kios Terdaftar Container -->
    <div class="content-container equal-height-item" style="flex: 2 0 0; min-width: 340px;">
      <div class="content-header marginbttm">
        <div class="content-header-text">
          <h2 class="content-title">Kios Terdaftar</h2>
            <div v-if="isLoading">
              <div class="content-sub">Mengambil data...</div>
            </div>

            <div v-else>
                <div class="content-sub">Ditemukan {{ penjualList.length }} kios <a href="#" @click="fetchAllPenjual" onclick="return false">Perbarui data</a></div>
            </div>
        </div>
        <!--
        <div class="button" style="--border-color: #19a7a7; --bg-color: #19a7a7; --color: #fff; --sub-color: #ffffff9a; --bg-hov: #16abd5">
          <img src="/icons/search.svg" alt="Icon" width="auto" height="100%">
          <div class="text">
          <a>Cari</a>
          </div>
        </div>
        -->
      </div>
      <div class="kios-list">
        <div 
          v-for="penjual in penjualList" 
          :key="penjual.id"
          class="kios-item"
          :class="{ 'kios-item-aktif': selectedPenjual && selectedPenjual.lokasi === penjual.lokasi && penjual.lokasi !== null, 'kios-item-no-data': penjual.lokasi === null }"
          @click="selectKiosFromSearch(penjual)">

            <img class="kios-img" :src="penjual.foto_profil || '/icons/profile.svg'" :alt="penjual.nama" />
            <div class="kios-info">
                <div class="kios-nama">{{ penjual.nama }}</div>
                <div class="kios-desc">{{ penjual.produk || penjual.lokasi || 'Tidak ada informasi produk' }}</div>
            </div>
            <div class="kios-id">{{ penjual.lokasi }}</div>
          </div>
      </div>
    </div>
  </div>

  <!-- Konfigurasi Section -->
  <div class="config-layout equal-height-layout">
    <!-- Konfigurasi Kios -->
    <div class="content-container equal-height-item">
      <div class="content-header marginbttm">
        <div class="content-header-text">
          <h2 class="content-title">Konfigurasi Kios</h2>
          <div class="content-sub">
            <span v-if="selectedPenjual">Edit informasi kios {{ selectedPenjual.lokasi }}</span>
            <span v-else class="no-selection">Pilih kios dari denah atau daftar untuk mengedit</span>
          </div>
        </div>
        <div style="display: flex; gap: 1rem;">
          <div class="button" 
               style="--border-color: #030303; --bg-color: transparent; --color: #000; --border-hov: #e57373; --bg-hov: #f8d7da"
               @click="handleResetKiosConfig">
            <img src="/icons/close.svg" alt="Icon" width="auto" height="100%">
            <div class="text">
            <a>Batal</a>
            </div>
          </div>
          <div class="button" 
               style="--border-color: #16abd5; --bg-color: #19a7a7; --color: #fff; --border-hov: #16abd5; --bg-hov: #16abd5"
               @click="handleSaveKiosConfig">
            <img src="/icons/save_pixel.svg" alt="Icon" width="auto" height="100%">
            <div class="text">
            <a>Simpan</a>
            </div>
          </div>
        </div>
      </div>

      <div class="config-form">
      <div class="config-row">
        <div class="config-field">
        <label>Posisi Kios</label>
            <input type="text" v-model="kiosConfig.lokasi" placeholder="Contoh: L1_001" />
        </div>
        <div class="config-field">
            <label>Nama Penjual</label>
            <input type="text" v-model="kiosConfig.nama" placeholder="Nama penjual" />
        </div>
        </div>
        
        <div class="config-row">
          <div class="config-field">
            <label>Produk Utama</label>
            <input type="text" v-model="kiosConfig.produk" placeholder="Produk yang dijual" />
      </div>
          <div class="config-field">
            <label>Patokan Lokasi</label>
            <input type="text" v-model="kiosConfig.patokan" placeholder="Patokan lokasi kios" />
          </div>
        </div>
        
      <div class="config-field">
        <label>Deskripsi Kios</label>
          <textarea rows="3" v-model="kiosConfig.deskripsi" placeholder="Deskripsi lengkap kios dan produk"></textarea>
      </div>
        
        <div class="config-field">
          <label>Kontak</label>
          <input type="text" v-model="kiosConfig.kontak" placeholder="Nomor telepon atau kontak lain" />
        </div>
        
        <div class="config-row">
          <div class="config-field">
            <label>Foto Profil</label>
            <div class="file-upload-container">
              <div v-if="fotoProfilSrc" class="image-preview-wrapper">
                <div class="image-preview-container">
                  <img
                    :src="fotoProfilSrc"
                    alt="Preview Foto Profil"
                    class="image-preview"
                  />
                </div>
                <div class="preview-actions">
                  <button class="button overlay-btn" type="button" @click="openFotoProfilModal" title="Ganti Foto">
                    <img src="/icons/save_pixel.svg" alt="Ganti" width="16" height="16" />
                    <div class="text"><a>Ganti</a></div>
                  </button>
                  <button class="button overlay-btn" type="button" @click="removeFotoProfil" title="Hapus Foto">
                    <img src="/icons/cancel.svg" alt="Hapus" width="16" height="16" />
                    <div class="text"><a>Hapus</a></div>
                  </button>
                </div>
              </div>
              <div v-else>
                <button class="button overlay-btn" type="button" @click="openFotoProfilModal" title="Pilih Foto">
                  <img src="/icons/plus.svg" alt="Pilih" width="16" height="16" />
                  <div class="text"><a>Pilih Gambar</a></div>
                </button>
              </div>
            </div>
          </div>
          
          <div class="config-field">
            <label>Foto Kios</label>
            <div class="file-upload-container">
              <div v-if="fotoKiosSrc" class="image-preview-wrapper">
                <div class="image-preview-container">
                  <img
                    :src="fotoKiosSrc"
                    alt="Preview Foto Kios"
                    class="image-preview"
                  />
                </div>
                <div class="preview-actions">
                  <button class="button overlay-btn" type="button" @click="openFotoKiosModal" title="Ganti Foto">
                    <img src="/icons/save_pixel.svg" alt="Ganti" width="16" height="16" />
                    <div class="text"><a>Ganti</a></div>
                  </button>
                  <button class="button overlay-btn" type="button" @click="removeFotoKios" title="Hapus Foto">
                    <img src="/icons/cancel.svg" alt="Hapus" width="16" height="16" />
                    <div class="text"><a>Hapus</a></div>
                  </button>
                </div>
              </div>
              <div v-else>
                <button class="button overlay-btn" type="button" @click="openFotoKiosModal" title="Pilih Foto">
                  <img src="/icons/plus.svg" alt="Pilih" width="16" height="16" />
                  <div class="text"><a>Pilih Gambar</a></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Konfigurasi Pengguna -->
    <div class="content-container equal-height-item">
      <div class="content-header marginbttm">
      <div class="content-header-text">
        <h2 class="content-title">Konfigurasi Pengguna</h2>
        <div class="content-sub">
          <span v-if="selectedPenjual">Edit pengguna untuk kios {{ selectedPenjual.lokasi }}</span>
          <span v-else class="no-selection">Pilih kios dari denah atau daftar untuk mengedit pengguna</span>
        </div>
      </div>
        <div style="display: flex; gap: 1rem;">
          <div class="button" 
               style="--border-color: #030303; --bg-color: transparent; --color: #000; --border-hov: #e57373; --bg-hov: #f8d7da"
               @click="handleResetUserConfig">
            <img src="/icons/close.svg" alt="Icon" width="auto" height="100%">
            <div class="text">
            <a>Batal</a>
            </div>
          </div>
          <div class="button" 
               style="--border-color: #16abd5; --bg-color: #19a7a7; --color: #fff; --border-hov: #16abd5; --bg-hov: #16abd5"
               @click="handleSaveUserConfig">
            <img src="/icons/save_pixel.svg" alt="Icon" width="auto" height="100%">
            <div class="text">
            <a>Simpan</a>
            </div>
          </div>
        </div>
      </div>
      <div class="config-form">
          <div class="config-field">
            <label>Username</label>
          <input 
            type="text" 
            v-model="userConfig.username"
            :class="{ 'error': errors.username }"
            placeholder="Masukkan username" />
          <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
          </div>
        
        <div class="config-field">
          <label>Email</label>
          <input 
            type="email" 
            v-model="userConfig.email"
            :class="{ 'error': errors.email }"
            placeholder="Masukkan email" />
          <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
        </div>
        
        <div class="config-row">
          <div class="config-field">
            <label>Password</label>
            <div class="password-input-container">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                v-model="userConfig.password"
                :class="{ 'error': errors.password }"
                placeholder="Minimal 6 karakter" />
              <button 
                type="button" 
                class="password-toggle-btn"
                @click="showPassword = !showPassword">
                <img src="/icons/Eye.svg" alt="Toggle" width="16" height="16">
              </button>
          </div>
            <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>
          
        <div class="config-field">
            <label>Konfirmasi Password</label>
            <div class="password-input-container">
              <input 
                :type="showConfirmPassword ? 'text' : 'password'" 
                v-model="userConfig.confirmPassword"
                :class="{ 'error': errors.confirmPassword }"
                placeholder="Ulangi password" />
              <button 
                type="button" 
                class="password-toggle-btn"
                @click="showConfirmPassword = !showConfirmPassword">
                <img src="/icons/Eye.svg" alt="Toggle" width="16" height="16">
              </button>
        </div>
            <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Upload Denah Modal -->
  <div v-if="showUploadDenahModal" class="modal-overlay" @click="closeUploadDenahModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>Upload Denah Baru</h3>
        <button class="modal-close" @click="closeUploadDenahModal">
          <img src="/icons/close.svg" alt="Close" width="auto" height="100%">
        </button>
      </div>
      <div class="modal-body">
        <div class="file-upload-container">
          <input 
            type="file" 
            accept=".svg"
            @change="handleDenahDraft"
            class="file-input"
            style="display: none;"
            ref="denahDraftInput"
          />
          <div v-if="denahDraftUrl === null" class="upload-area" @click="$refs.denahDraftInput.click()">
            <img src="/icons/cloud.svg" alt="Upload" width="48" height="48">
            <p>Klik untuk memilih file SVG</p>
            <span class="file-info">Format yang didukung: SVG</span>
          </div>
          <div v-else class="selected-file">
            <img :src="denahDraftUrl" alt="Preview" style="width: 100%; height: auto; border-radius: 8px;" />
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <p>File terpilih: {{ denahDraft?.name }}</p>
              <button class="remove-file-btn" @click="removeDenahDraft">
                <img src="/icons/close.svg" alt="Remove" width="16" height="16">
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="modal-btn secondary" @click="closeUploadDenahModal">Batal</button>
        <button 
          class="modal-btn primary" 
          @click="uploadDenah"
          :disabled="!denahDraft || isUploading"
        >
          <span v-if="isUploading">Mengupload...</span>
          <span v-else>Upload Denah</span>
        </button>
      </div>
    </div>
  </div>
<!-- Modal Upload Foto Profil -->
  <div v-if="showFotoProfilModal" class="modal-overlay" @click="closeFotoProfilModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>Upload Foto Profil</h3>
        <button class="modal-close" @click="closeFotoProfilModal">
          <img src="/icons/close.svg" alt="Close" width="auto" height="100%">
        </button>
      </div>
      <div class="modal-body">
        <div v-if="fotoProfilDraftUrl === null" class="file-upload-container">
          <input 
            type="file" 
            accept="image/jpg,image/jpeg,image/png"
            @change="handleFotoProfilDraft"
            class="file-input"
            style="display: none;"
            ref="fotoProfilDraftInput"
          />
          <div class="upload-area" @click="$refs.fotoProfilDraftInput.click()">
            <img src="/icons/plus.svg" alt="Upload" width="48" height="48">
            <p>Klik untuk memilih file gambar</p>
            <span class="file-info">Format: JPG, JPEG, PNG</span>
          </div>
        </div>
          <div v-else class="selected-file">
            <img :src="fotoProfilDraftUrl" alt="Preview" style="width: 100%; height: auto; border-radius: 8px;"/>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <p>File terpilih: {{ fotoProfilDraft?.name }}</p>
              <button class="remove-file-btn" @click="removeFotoProfilDraft">
                <img src="/icons/close.svg" alt="Remove" width="16" height="16">
                Hapus
              </button>
            </div>
          </div>
      </div>
      <div class="modal-footer">
        <button class="modal-btn secondary" @click="closeFotoProfilModal">Batal</button>
        <button 
          class="modal-btn primary" 
          @click="saveFotoProfil"
          :disabled="!fotoProfilDraft"
        >
          Simpan
        </button>
      </div>
    </div>
  </div>
<!-- Modal Upload Foto Kios -->
  <div v-if="showFotoKiosModal" class="modal-overlay" @click="closeFotoKiosModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>Upload Foto Kios</h3>
        <button class="modal-close" @click="closeFotoKiosModal">
          <img src="/icons/close.svg" alt="Close" width="auto" height="100%">
        </button>
      </div>
      <div class="modal-body">
        <div class="file-upload-container">
          <input 
            type="file" 
            accept="image/jpg,image/jpeg,image/png"
            @change="handleFotoKiosDraft"
            class="file-input"
            style="display: none;"
            ref="fotoKiosDraftInput"
          />
          <div v-if="fotoKiosDraftUrl === null" class="upload-area" @click="$refs.fotoKiosDraftInput.click()">
            <img src="/icons/plus.svg" alt="Upload" width="48" height="48">
            <p>Klik untuk memilih file gambar</p>
            <span class="file-info">Format: JPG, JPEG, PNG</span>
          </div>
          <div v-else class="selected-file">
            <img :src="fotoKiosDraftUrl" alt="Preview" style="width: 100%; height: auto; border-radius: 8px;"/>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <p>File terpilih: {{ fotoKiosDraft?.name }}</p>
              <button class="remove-file-btn" @click="removeFotoKiosDraft">
                <img src="/icons/close.svg" alt="Remove" width="16" height="16">
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="modal-btn secondary" @click="closeFotoKiosModal">Batal</button>
        <button 
          class="modal-btn primary" 
          @click="saveFotoKios"
          :disabled="!fotoKiosDraft"
        >
          Simpan
        </button>
      </div>
    </div>
  </div>
</template>

<style setup>
@import '@/styles/button.css';
body {
  margin: 2.8rem;
}

:root {
  --container-border-color: #00000020;
}

@font-face {
  font-family: 'Press Start 2P';
  src: url('@/fonts/PressStart2P-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Minecraft Standard';
  src: url('@/fonts/MinecraftStandard.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Minecraft';
  src: url('@/fonts/minecraft.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Pixel Operator';
  src: url('@/fonts/PixelOperator.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

.marginbttm {
  margin-bottom: 1.8rem;
}

.seccolor {
  color: #000;
}

.header {
  display: flex;
  flex-direction: column;
  gap: .8rem;

  .heading {
    all: unset;
    font-family: 'Press Start 2P', sans-serif;
    font-style: normal;
    width: fit-content;
    font-size: 3rem;
    display: flex;
    align-items: flex-end;
    color: #15A1C8;
    text-shadow: 4px 4px 0px #1E3445;
  }
  .subheading {
    all: unset;
    font-family: 'Pixel Operator', sans-serif;
    font-style: normal;
    font-size: 1.8rem;
  }
}

.upperButtonMenu {
  display: flex;
  justify-content: space-between;
}

.content-container {
  flex: 3 0 0;
  min-width: 340px;
  box-sizing: border-box;
  padding: 1.5rem;
  border: 2px solid var(--container-border-color);
  background: #fff;
}
.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content-header-text {
  display: flex;
  flex-direction: column;
}
.content-title {
  all: unset;
  font-family: 'Minecraft', sans-serif;
  font-size: 1.6rem;
}
.content-sub {
  all: unset;
  font-family: 'Pixel Operator', sans-serif;
  font-size: 1.2rem;
}
.denah-area {
  width: 100%;
  height: 38dvh;
  border: 2px dashed var(--container-border-color);
  background-color: #f0f0f049;
  display: flex;
  align-items: center;
  justify-content: center;
}
.denah-tip {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-top: 1rem;
  padding: 0.8rem;
  border: 1px solid var(--container-border-color);

  .tip-text {
    display: flex;
    flex-direction: column;
    

    .tip-title {
      all: unset;
      font-family: 'Minecraft', sans-serif;
      font-size: 1rem;
    }
    .tip-desc {
      all: unset;
      font-family: 'Pixel Operator', sans-serif;
      font-size: 1rem;
      opacity: 0.6;
    }
  }
}

.main-layout {
  display: flex;
  gap: 1rem;
  align-items: stretch;
  flex-wrap: wrap;
}
</style>

<style scoped>
.kios-list {
  padding-right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  overflow-y: auto;
}

.kios-item {
  display: flex;
  align-items: center;
  background: #ededed;
  padding: .4rem .4rem;
  box-shadow: 0 0 0 2px #fff, 2px 2px 0 0 #bfcad6;
  border-left: 6px solid #d3d3d3;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  cursor: pointer;
  border-radius: 6px;
  gap: 0.8rem;
  outline: none;
  user-select: none;
}
.kios-item:hover > .kios-info,
.kios-item:focus > .kios-info {
  transform: translateX(4px);
}

.kios-item-aktif {
  border-left: 6px solid #15a1c8;
  background: #d1f3ff;
}

.kios-item-no-data {
  border-left: 6px solid #ff9f9f;
  background: #fff7d3;
}

.kios-img {
  width: 38px;
  height: auto;
  object-fit: cover;
  border-radius: 2px;
}

.kios-info {
  flex: 1;
  width: fit-content;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
}

.kios-nama {
  all: unset;
  width: fit-content;
  font-family: 'Minecraft', 'Pixel Operator', sans-serif;
  font-size: 1rem;
}

.kios-desc {
  all: unset;
  width: fit-content;
  font-family: 'Pixel Operator', sans-serif;
  font-size: 1rem;
  opacity: 0.6;
}

.kios-id {
  all: unset;
  width: fit-content;
  font-family: 'Minecraft Standard', sans-serif;
  font-size: .6rem;
  font-weight: bold;
  color: #222;
}

.config-layout {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  align-items: stretch;
  flex-wrap: nowrap;
}

.config-layout > .content-container {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
}

.config-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.config-title {
  font-family: 'Minecraft', 'Pixel Operator', sans-serif;
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 0.2rem;
}

.config-sub {
  font-family: 'Pixel Operator', sans-serif;
  font-size: 1rem;
  color: #444;
  opacity: 0.8;
}

.config-actions {
  display: flex;
  gap: 0.7rem;
}

.config-btn {
  font-family: 'Pixel Operator', sans-serif;
  font-size: 1rem;
  border: 2px solid #b0bec5;
  background: #fff;
  padding: 0.4rem 1.2rem;
  cursor: pointer;
  transition: background 0.15s, border 0.15s;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.config-btn.save {
  background: #19a7a7;
  color: #fff;
  border-color: #19a7a7;
}
.config-btn.save:hover {
  background: #16abd5;
  border-color: #16abd5;
}
.config-btn.cancel:hover {
  background: #f8d7da;
  border-color: #e57373;
}
.config-btn.search {
  padding: 0.4rem 0.8rem;
  font-size: 1.1rem;
}

.config-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.config-row {
  display: flex;
  gap: 1.2rem;
  flex-wrap: wrap;
}

.config-field {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: .3rem;
}

.config-field label {
  font-family: 'Pixel Operator', sans-serif;
  font-size: 1rem;
  color: #222;
}

.config-field input,
.config-field textarea {
  font-family: 'Pixel Operator', sans-serif;
  font-size: 1rem;
  border: 2px solid #b0bec5;
  padding: 0.5rem 0.7rem;
  background: #fff;
  resize: none;
  outline: none;
  transition: border 0.15s;
}
.config-field input:focus,
.config-field textarea:focus {
  border-color: #19a7a7;
}

.equal-height-layout {
  display: flex;
  gap: 1rem;
  align-items: stretch;
  flex-wrap: nowrap;
  /* Set a fixed height for desktop view */
  height: 480px;
  /* You can adjust 480px as needed for your design */
}

.equal-height-item {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 340px;
  /* Ensures all items have the same max-height as their siblings */
  max-height: 100%;
  box-sizing: border-box;
  overflow: auto;
}

/* Optional: Hide scrollbars for a cleaner look */
.equal-height-item::-webkit-scrollbar {
  width: 8px;
  background: #f0f0f0;
}
.equal-height-item::-webkit-scrollbar-thumb {
  background: #d1f3ff;
  border-radius: 4px;
}

/* Styling untuk form konfigurasi pengguna */
.password-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.password-input-container input {
  padding-right: 3.4rem;
}

.password-toggle-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-family: 'Pixel Operator', sans-serif;
  font-size: 0.9rem;
  border: 2px solid #b0bec5;
  background: #fff;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  transition: background 0.15s, border 0.15s;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  height: 100%;
}

.password-toggle-btn:hover {
  background: #f0f0f0;
  border-color: #19a7a7;
}

.password-toggle-btn img {
  opacity: 0.8;
  transition: opacity 0.2s;
  width: 14px;
  height: 14px;
}

.password-toggle-btn:hover img {
  opacity: 1;
}

.error-message {
  color: #e57373;
  font-size: 0.85rem;
  font-family: 'Pixel Operator', sans-serif;
  margin-top: 0.2rem;
  display: block;
}

.config-field input.error,
.config-field textarea.error {
  border-color: #e57373;
  background-color: #fff5f5;
}

.config-field input.error:focus,
.config-field textarea.error:focus {
  border-color: #e57373;
  box-shadow: 0 0 0 2px rgba(229, 115, 115, 0.2);
}

/* Styling untuk file upload */
.file-upload-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.file-input {
  border: 2px dashed #b0bec5;
  background: #f8f9fa;
  padding: 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.15s, background-color 0.15s;
}

.file-input:hover {
  border-color: #19a7a7;
  background: #f0f8ff;
}

.file-input:focus {
  outline: none;
  border-color: #19a7a7;
  box-shadow: 0 0 0 2px rgba(25, 167, 167, 0.2);
}

.file-upload-info {
  font-family: 'Pixel Operator', sans-serif;
  font-size: 0.85rem;
  color: #666;
  text-align: center;
  padding: 0.3rem;
  background: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

/* Styling untuk status sinkronisasi */
.no-selection {
  color: #666;
  font-style: italic;
  opacity: 0.7;
}

/* Styling untuk kios yang dipilih */
.kios-item-aktif {
  border-left: 6px solid #15a1c8 !important;
  background-color: rgba(21, 161, 200, 0.1);
  box-shadow: 0 2px 8px rgba(21, 161, 200, 0.2);
}

/* Efek hover yang lebih jelas untuk kios yang dipilih */
.kios-item-aktif:hover {
  background-color: rgba(21, 161, 200, 0.15);
  transform: translateX(3px);
}

/* Denah area styling */
.denah-area {
  position: relative;
  border: 2px solid var(--container-border-color);
  border-radius: 8px;
  background: #f9f9f9;
  overflow: hidden;
  height: 400px;
}

.denah-controls {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 0.5rem;
  z-index: 10;
}

.zoom-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid #15a1c8;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Pixel Operator', sans-serif;
}

.zoom-btn:hover {
  background: #15a1c8;
  transform: translateY(-1px);
}

.zoom-btn:hover img {
  filter: brightness(0) invert(1);
}

.denah-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Modal styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e9ecef;
}

.modal-header h3 {
  font-family: 'Minecraft', sans-serif;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background 0.2s;
}

.modal-close:hover {
  background: #f8f9fa;
}

.modal-body {
  padding: 2rem;
  height: 100%;
  overflow-y: auto;
}

.upload-area {
  border: 2px dashed #15a1c8;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #f8fbff;
}

.upload-area:hover {
  border-color: #0d7a9c;
  background: #e6f3ff;
}

.upload-area img {
  opacity: 0.6;
  margin-bottom: 1rem;
}

.upload-area p {
  font-family: 'Minecraft', sans-serif;
  font-size: 1rem;
  margin: 0.5rem 0;
  color: #333;
}

.file-info {
  font-family: 'Pixel Operator', sans-serif;
  font-size: 0.9rem;
  color: #666;
}

.selected-file {
  padding: 1rem;
  background: #e6f7ff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;   
}

.selected-file p {
  margin: 0;
  font-family: 'Pixel Operator', sans-serif;
  color: #333;
}

.remove-file-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  justify-content: center;
  background: #ff9b9b;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Pixel Operator', sans-serif;
  transition: background 0.2s;
}

.remove-file-btn:hover {
  background: #ff7272;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem 2rem;
  border-top: 1px solid #e9ecef;
  background: #f8f9fa;
}

.modal-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid;
  border-radius: 6px;
  cursor: pointer;
  font-family: 'Minecraft', sans-serif;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.modal-btn.secondary {
  background: white;
  border-color: #6c757d;
  color: #6c757d;
}

.modal-btn.secondary:hover {
  background: #6c757d;
  color: white;
}

.modal-btn.primary {
  background: #15a1c8;
  border-color: #15a1c8;
  color: white;
}

.modal-btn.primary:hover:not(:disabled) {
  background: #0d7a9c;
  border-color: #0d7a9c;
}

.modal-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.image-preview-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}
.image-preview-container {
  position: relative;
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image-preview {
  width: 96px;
  height: 96px;
  object-fit: cover;
  border: 2.5px solid #222;
  box-shadow: 0 0 0 2px #fff, 4px 4px 0 0 #1E3445;
  background: #f8f8f8;
  image-rendering: pixelated;
  border-radius: 6px;
  transition: border-color 0.15s;
}
.image-preview-container:hover .image-preview {
  border-color: #16abd5;
}
.preview-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.overlay-btn {
  padding: 0.3rem 0.5rem;
  min-width: 0;
  min-height: 0;
  border-radius: 4px;
  font-size: 0.8rem;
  box-shadow: 0 0 0 2px #fff, 2px 2px 0 0 #1E3445;
  background: #e3f6ff;
  border: 2px solid #16abd5;
  color: #222;
  transition: background 0.15s, border-color 0.15s;
}
.overlay-btn:hover {
  background: #b3e6ff;
  border-color: #e57373;
}
.placeholder {
  filter: grayscale(0.5) brightness(1.2) contrast(1.1) drop-shadow(0 0 2px #bbb);
  opacity: 0.7;
}
.file-upload-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}
</style>