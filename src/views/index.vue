<template>
    <nav>
        <div class="left">
            <h1>Pasar Owi</h1>
            <h2>Jl. Prabangsa No. 4 Pati</h2>
        </div>
        <div class="right">
            <div style="display: inline-flex; gap: 1rem;">
              <div class="button" style="--border-color: #19A7A7; --bg-color: transparent;">
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

    <!-- Maps Area -->
    <div
      class="maps-area"
      @mousedown="startDrag"
      @mousemove="onDrag"
      @mouseup="endDrag"
      @mouseleave="endDrag"
      @wheel.prevent="onWheel"
    >
      <div
        class="absolute top-0 left-0"
        :style="{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          transformOrigin: '0 0',
        }"
      >
        <!-- SVG sebagai komponen -->
        <PasarOwi
          class="w-full h-full"
          @click="onSvgClick"
        />
      </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import PasarOwi from "@/img/pasar-owi.svg";

// zoom & drag state
const scale = ref(1);
const offset = ref({ x: 0, y: 0 });
const isDragging = ref(false);
const lastMouse = ref({ x: 0, y: 0 });

function startDrag(e) {
  isDragging.value = true;
  lastMouse.value = { x: e.clientX, y: e.clientY };
}

function onDrag(e) {
  if (!isDragging.value) return;
  const dx = e.clientX - lastMouse.value.x;
  const dy = e.clientY - lastMouse.value.y;
  offset.value.x += dx;
  offset.value.y += dy;
  lastMouse.value = { x: e.clientX, y: e.clientY };
}

function endDrag() {
  isDragging.value = false;
}

function onWheel(e) {
  const zoomIntensity = 0.1;
  if (e.deltaY < 0) scale.value += zoomIntensity;
  else if (e.deltaY > 0 && scale.value > zoomIntensity)
    scale.value -= zoomIntensity;
}

function resetView() {
  scale.value = 1;
  offset.value = { x: 0, y: 0 };
}

function onSvgClick(e) {
  // ambil elemen yang diklik (misal <rect id="L1_001">)
  const targetId = e.target.id;
  if (targetId) {
    alert(`Kios ${targetId} diklik!`);
  }
}
</script>

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

:global(html), :global(body), :global(#app) {
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Navbar selalu di atas */
nav {
  z-index: 99;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid black;
  padding: 1.8rem;
  margin: 2.8rem;
  box-sizing: border-box;
}

.maps-area {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #f3f3f3;
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
</style>
