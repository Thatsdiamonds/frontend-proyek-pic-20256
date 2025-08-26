<script setup></script>

<template>
  <!-- Tombol Aksi - Header -->
  <div class="upperButtonMenu marginbttm">
    <div class="button" @click="this.$router.push('/logout');">
        <img src="/icons/drought.svg" alt="Icon" width="auto" height="100%">
      <div class="text">
        <a>Logout</a>
        <a>Keluar dari akun Anda</a>
      </div>
    </div>

    <div style="display: inline-flex; gap: 1rem;">
      <div class="button" style="--border-color: #0D9C9C">
          <img src="/icons/rocket.svg" alt="Icon" width="auto" height="100%">
        <div class="text">
          <a>Halaman Add Seller</a>
          <a>Klik di sini untuk berpindah</a>
        </div>
      </div>

      <div class="button" style="--border-color: #0D9C9C">
          <img src="/icons/sunglasses.svg" alt="Icon" width="auto" height="100%">
        <div class="text">
          <a>Halaman Daftar Pasar</a>
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
      <div class="button" style="--border-color: #15a1c8; --bg-color: #15a1c8; --color: #fff; --bg-hov: #16abd5">
        <img src="/icons/save.svg" alt="Icon" width="auto" height="100%">
            <a>TERAPKAN SEMUA PERUBAHAN</a>
      </div>

      <div class="button">
        <img src="/icons/cancel.svg" alt="Icon" width="auto" height="100%">
          <div class="text">
            <a>Batalkan</a>
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
        <div class="button" style="--border-color: #19a7a7; --bg-color: #19a7a7; --color: #fff; --sub-color: #ffffff9a; --bg-hov: #16abd5">
          <img src="/icons/cloud.svg" alt="Icon" width="auto" height="100%">
          <div class="text">
            <a>Perbarui Denah</a>
          </div>
        </div>
      </div>

      <!-- Denahnya sini ya gess -->
      <div class="denah-area marginbttm">
        Loading@.?
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
          <div class="content-sub">Total sebanyak 2 kios telah ditempati</div>
        </div>
        <div class="button" style="--border-color: #19a7a7; --bg-color: #19a7a7; --color: #fff; --sub-color: #ffffff9a; --bg-hov: #16abd5">
          <img src="/icons/search.svg" alt="Icon" width="auto" height="100%">
          <div class="text">
          <a>Cari</a>
          </div>
        </div>
      </div>

      <div class="kios-list">
        <div class="kios-item kios-item-aktif">
          <img class="kios-img" src="@/img/profile.png" alt="Bu Ngatimni" />
          <div class="kios-info">
            <div class="kios-nama">Bu Ngatimni</div>
            <div class="kios-desc">Sayur, ikan, daging ayam, dll</div>
          </div>
          <div class="kios-id">L1_001</div>
        </div>
        <div class="kios-item">
          <img class="kios-img" src="@/img/profile.png" alt="Bu Ngatimni" />
          <div class="kios-info">
            <div class="kios-nama">Mas Amba</div>
            <div class="kios-desc">Berbagai cairan bahan masak</div>
          </div>
          <div class="kios-id">L1_005</div>
        </div>
        <div class="kios-item">
          <img class="kios-img" src="@/img/profile.png" alt="Bu Ngatimni" />
          <div class="kios-info">
            <div class="kios-nama">Mas Amba</div>
            <div class="kios-desc">Berbagai cairan bahan masak</div>
          </div>
          <div class="kios-id">L1_005</div>
        </div>
        <div class="kios-item">
          <img class="kios-img" src="@/img/profile.png" alt="Bu Ngatimni" />
          <div class="kios-info">
            <div class="kios-nama">Mas Amba</div>
            <div class="kios-desc">Berbagai cairan bahan masak</div>
          </div>
          <div class="kios-id">L1_005</div>
        </div>
        <div class="kios-item">
          <img class="kios-img" src="@/img/profile.png" alt="Bu Ngatimni" />
          <div class="kios-info">
            <div class="kios-nama">Mas Amba</div>
            <div class="kios-desc">Berbagai cairan bahan masak</div>
          </div>
          <div class="kios-id">L1_005</div>
        </div>
        <div class="kios-item">
          <img class="kios-img" src="@/img/profile.png" alt="Bu Ngatimni" />
          <div class="kios-info">
            <div class="kios-nama">Mas Amba</div>
            <div class="kios-desc">Berbagai cairan bahan masak</div>
          </div>
          <div class="kios-id">L1_005</div>
        </div>
        <div class="kios-item">
          <img class="kios-img" src="@/img/profile.png" alt="Bu Ngatimni" />
          <div class="kios-info">
            <div class="kios-nama">Mas Amba</div>
            <div class="kios-desc">Fent</div>
          </div>
          <div class="kios-id">L1_014</div>
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
          <div class="content-sub">Edit informasi kios terpilih</div>
        </div>
        <div style="display: flex; gap: 1rem;">
          <div class="button" style="--border-color: #030303; --bg-color: transparent; --color: #000; --border-hov: #e57373; --bg-hov: #f8d7da">
            <img src="/icons/close.svg" alt="Icon" width="auto" height="100%">
            <div class="text">
            <a>Batal</a>
            </div>
          </div>
          <div class="button" style="--border-color: #16abd5; --bg-color: #19a7a7; --color: #fff; --border-hov: #16abd5; --bg-hov: #16abd5">
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
        <input type="text" value="L1_001" />
        </div>
        <div class="config-field">
        <label>Penempat Kios</label>
        <div style="display: flex; gap: 0.5rem;">
          <input type="text" style="width: 100%;" value="Bu Ngatimni" />
          <button class="config-btn search">
            <a>Cari</a>
          </button>
        </div>
        </div>
      </div>
      <div class="config-field">
        <label>Deskripsi Kios</label>
        <textarea rows="3">Sayur, ikan, daging ayam, dll.</textarea>
      </div>
      </div>
    </div>

    <!-- Konfigurasi Pasar -->
    <div class="content-container equal-height-item">
      <div class="content-header marginbttm">
      <div class="content-header-text">
        <h2 class="content-title">Konfigurasi Pasar</h2>
        <div class="content-sub">Edit informasi pasar saat ini</div>
      </div>
        <div style="display: flex; gap: 1rem;">
          <div class="button" style="--border-color: #030303; --bg-color: transparent; --color: #000; --border-hov: #e57373; --bg-hov: #f8d7da">
            <img src="/icons/close.svg" alt="Icon" width="auto" height="100%">
            <div class="text">
            <a>Batal</a>
            </div>
          </div>
          <div class="button" style="--border-color: #16abd5; --bg-color: #19a7a7; --color: #fff; --border-hov: #16abd5; --bg-hov: #16abd5">
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
            <label>Nama Pasar</label>
            <input type="text" value="Owi" />
          </div>
          <div class="config-field">
            <label>Hari Operasional</label>
            <input type="text" value="Setiap hari, 04:00 - 17:00" />
          </div>
        </div>
        <div class="config-field">
          <label>Lokasi Pasar</label>
          <input type="text" value="Jl. Prabangsa No. 4 Pati" />
        </div>
        <div class="config-field">
          <label>Deskripsi Pasar</label>
          <textarea rows="3">Pasar terlengkap di area Pati. Menjual berbagai kebutuhan, mulai dari bahan masakan hingga furniture</textarea>
        </div>
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
  align-items: flex-start;
  flex-wrap: wrap;
}
</style>

<style scoped>
.kios-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  overflow-y: scroll;
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

.kios-img {
  width: 38px;
  height: auto;
  object-fit: cover;
  border-radius: 2px;
  margin-right: 1rem;
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
</style>