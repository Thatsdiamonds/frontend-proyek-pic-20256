<template>
  <div class="relative">
    <nav>
        <div class="left">
            <h1>Pasar Owi</h1>
            <h2>Jl. Prabangsa No. 4 Pati</h2>
        </div>
        <div class="right">
            <div style="display: inline-flex; gap: 1rem;">
              <div class="button" 
                   @click="toggleSearch"
                   style="--border-color: #19A7A7; --bg-color: transparent;">
                <img src="/icons/lampu_suar.svg" alt="Icon" width="auto" height="100%">
                  <div class="text">
                    <h3>Cari kios...</h3>
                    <h4>Klik di sini untuk membuka menu search</h4>
                  </div>
              </div>

              <div class="button" @click="this.$router.push('/login')" style="--border-color: #0D9C9C; --bg-color: #19A7A7; --bg-hov: #49CCCC; --border-hov: #49CCCC; color: #fff;">
                <img src="/icons/heart.svg" alt="Icon" width="auto" height="100%">
                  <div class="text">
                    <h3>Login</h3>
                    <h4>Masuk ke akun Anda</h4>
                  </div>
              </div>
          </div>
        </div>
    </nav>
  </div>

  <!-- Maps Area -->
  <div
    class="maps-area" 
      :class="{ dragging: isDragging }"
    @mousedown="startDrag"
    @wheel.prevent="onWheel">

    <div 
      class="absolute top-0 left-0"
      :style="{
        transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`
      }">

      <!-- impor SVG ke sini -->
      <PasarOwi class="w-full h-full"
        :hoveredRect="hoveredRect"
        @rect-hover="onRectHover"
        @rect-out="onRectOut"
        @click="onSvgClick"
      />
    </div>
  </div>

  <!-- Update the side container with transitions -->
  <div class="sideLeft-container" :class="{ 'visible': isSearchVisible }">
    <div class="panel">
      <div class="searchBox">
        <img src="/icons/searchPixelated.svg" alt="Icon" class="search-icon">
        <input 
          v-model="searchText"
          class="search-text" 
          placeholder="Cari di Pasar Owi..."
          @keyup.esc="toggleSearch">
        <img 
          src="/icons/close.svg" 
          alt="Icon" 
          class="close-icon"
          @click="clearSearch"
          :class="{ 'visible': searchText }"
          title="Clear search">
      </div>
            <div class="kios-list">
            <div class="kios-item kios-item-aktif">
              <img class="kios-img" src="@/img/profile.png" alt="Bu Ngatimni" />
              <div class="kios-info">
                <div class="kios-nama">Bu Ngatimni</div>
                <div class="kios-desc">Sayur, ikan, daging ayam, dll ahshjibaierywabu aibwyetoau9</div>
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
            <div class="kios-item">
              <img class="kios-img" src="@/img/profile.png" alt="Bu Ngatimni" />
              <div class="kios-info">
                <div class="kios-nama">Mas Amba</div>
                <div class="kios-desc">Fent</div>
              </div>
              <div class="kios-id">L1_014</div>
            </div>
            <div class="kios-item">
              <img class="kios-img" src="@/img/profile.png" alt="Bu Ngatimni" />
              <div class="kios-info">
                <div class="kios-nama">Mas Amba</div>
                <div class="kios-desc">Fent</div>
              </div>
              <div class="kios-id">L1_014</div>
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

  <div class="sideRight-container" :class="{ 'visible': isSearchVisible }">
    <div class="panel">
      Hi
    </div>
  </div>
</template>

<style scoped>
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
* {
  margin: 0;
}

.relative {
  position: relative;
  top: 2rem;
  width: 100%;
  display: flex;
  justify-content: center;
}

nav {
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid black;
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.08);  
  padding: 1.2rem;
  width: 96%;
  box-sizing: border-box;
}

.maps-area {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  cursor: grab;
  transition: cursor 0.1s;
}

.maps-area.dragging {
  cursor: grabbing;
}

nav .left {
  display: flex;
  flex-direction: column;
}

nav h1 {
  all: unset;
  font-family: 'Minecraft', sans-serif;
  width: fit-content;
  font-size: 1.44rem;
  align-items: flex-end;
}

nav h2 {
  all: unset;
  font-family: 'Pixel Operator', sans-serif;
  font-style: normal;
  font-size: 1.12rem;
}

nav .right {
  display: flex;
  align-items: center;
  justify-content: center;
}

nav .right .button {
  --border-color: #222;
  --bg-color: #fff;
  --color: #000;
  --sub-color: #3333339a;
  --border-hov: #15A1C8;
  --bg-hov: transparent;
  
  all: none;
  cursor: pointer;
  user-select: none;
  border: var(--border-color) 1.6px solid;
  color: var(--color);
  background-color: var(--bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.48rem;
  padding: 0.64rem 0.8rem;
  height: fit-content;
  width: fit-content;
  transition: all 0.2s;
}

nav .right .button:hover {
  border-color: var(--border-hov);
  -webkit-box-shadow: inset 0px 0px 0px 2.4px var(--border-hov);
  -moz-box-shadow: inset 0px 0px 0px 2.4px var(--border-hov);
  box-shadow: inset 0px 0px 0px 2.4px var(--border-hov);
  background: var(--bg-hov);
}

nav .right img {
  height: 2.08rem;
}

nav .right h3 {
  height: fit-content;
  font-family: 'Minecraft', sans-serif;
  font-weight: 100;
  font-size: 1rem;
}

nav .right h4 {
  height: fit-content;
  font-family: 'Pixel Operator', sans-serif;
  font-weight: 100;
  font-size: 1rem;
}

nav .right .text {
  display: flex;
  flex-direction: column;
}

html {
  overflow: hidden;
}

.sideLeft-container {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 20%;
  max-width: 30%;
  height: 91dvh;
  z-index: 3;
  transform: translateX(-100%);
  transition: transform 0.3s ease-out;
}

.sideLeft-container.visible {
  transform: translateX(0);
}

.sideRight-container {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 20%;
  max-width: 30%;
  height: 91dvh;
  z-index: 3;
  transform: scale(0);
  transition: all 0.3s ease-out;
}

.sideRight-container.visible {
  transform: scale(1);
}

.panel {
  padding: 1.4rem;
  height: 100%;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.08);  
}
.searchBox {
  height: 2.4rem;
  padding: 0 .4rem;
  margin-bottom: 2rem;
  border: 1px solid black;
  display: flex;
  align-items: center;
  gap: .7rem;
}

.search-icon {
  height: 1.5rem;
  width: 1.5rem;
  opacity: 70%;
}

.close-icon {
  height: 1.7rem;
  width: 1.7rem;
  margin-left: auto;
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.close-icon.visible {
  opacity: 0.7;
}

.close-icon:hover {
  opacity: 1;
}

.search-text {
  all: unset;
  font-family: 'Minecraft Standard', sans-serif;
  font-size: .8rem;
  line-height: 1.2;
  flex: 1;
  width: 100%;
}

.search-text:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.2);
}

.kios-list {
  padding-right: 1rem;
  display: flex;
  flex-direction: column;
  gap: .8rem;
  height: 80dvh;
  overflow-y: scroll;
}

.kios-item {
  display: flex;
  align-items: center;
  padding: .4rem .4rem;
  border-left: 6px solid #d3d3d3;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  cursor: pointer;
  border-radius: 6px;
  outline: none;
  user-select: none;
}
.kios-item:hover > .kios-info,
.kios-item:focus > .kios-info {
  transform: translateX(2px);
}

.kios-item-aktif {
  border-left: 6px solid #15a1c8;
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
  width: 60%;
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
  width: 100%;
  opacity: 0.6;
  margin-right: 1rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

}

.kios-id {
  all: unset;
  width: fit-content;
  font-family: 'Minecraft Standard', sans-serif;
  font-size: .6rem;
  font-weight: bold;
  color: #222;
}

</style>

<script setup>
import { ref } from "vue";
import PasarOwi from "./admin/PasarOwi.vue";
import api from "@/services/api";

// zoom & drag state
const kiosData = ref(null);
const scale = ref(1);
const offset = ref({ x: -20, y: 70 });
const isDragging = ref(false);
const lastMouse = ref({ x: 0, y: 0 });
const hoveredRect = ref(null);
const searchText = ref('');
const isSearchVisible = ref(false);

function startDrag(e) {
  isDragging.value = true;
  lastMouse.value = { x: e.clientX, y: e.clientY };
  window.addEventListener("mousemove", onDrag);
  window.addEventListener("mouseup", endDrag);
}

function onDrag(e) {
  if (!isDragging.value) return;
  const dx = e.clientX - lastMouse.value.x;
  const dy = e.clientY - lastMouse.value.y;
  offset.value = {
    x: offset.value.x + dx,
    y: offset.value.y + dy,
  };
  lastMouse.value = { x: e.clientX, y: e.clientY };
}

function endDrag() {
  isDragging.value = false;
  window.removeEventListener("mousemove", onDrag);
  window.removeEventListener("mouseup", endDrag);
}

function onWheel(e) {
  const zoomIntensity = 0.1;
  if (e.deltaY < 0) scale.value += zoomIntensity;
  else if (e.deltaY > 0 && scale.value > zoomIntensity)
    scale.value -= zoomIntensity;
}

function resetView() {
  scale.value = 1;
  offset.value = { x: 0, y: 70 };
}

////////////////////////////////////// GET THE KIOS /////////////////////////////////
// async function onSvgClick(e) {
//   const targetId = e.target.id;
//   if (!targetId) return;

//   console.log(`Kios ${targetId} diklik!`);

//   try {
//     const res = await api.get(`/kios`, {
//       params: { id: targetId },
//       silent: true,
//     });

//     kiosData.value = res.data;

//     console.log("Data kios:", res.data);
//   } catch (err) {
//     console.error("Error ambil kios:", err);
//   }
// }

function onRectHover(id) {
  hoveredRect.value = id;
}
function onRectOut() {
  hoveredRect.value = null;
}

function clearSearch() {
  searchText.value = '';
}

function toggleSearch() {
  isSearchVisible.value = !isSearchVisible.value;
}
</script>
