<template>
  <div style="padding: 1rem" ref="svgContainer" @click="$emit('click', $event)"></div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from "vue";

const props = defineProps({
  hoveredRect: String
});

const svgContent = ref("");
const svgContainer = ref(null);

onMounted(async () => {
  const res = await fetch("/cnt.svg");
  const text = await res.text();
  svgContent.value = text;
  await nextTick();
  renderSvg();
});

watch(svgContent, async () => {
  await nextTick();
  renderSvg();
});

watch(() => props.hoveredRect, () => {
  updateRectHover();
});

function renderSvg() {
  if (svgContainer.value) {
    svgContainer.value.innerHTML = svgContent.value;
    const rects = svgContainer.value.querySelectorAll("rect");
    rects.forEach(rect => {
      rect.addEventListener("mouseover", () => {
        emitRectHover(rect.id);
      });
      rect.addEventListener("mouseout", () => {
        emitRectOut();
      });
      rect.style.transition = "transform 0.18s, filter 0.18s";
      rect.style.cursor = "pointer";
    });
    updateRectHover();
  }
}

function updateRectHover() {
  if (!svgContainer.value) return;
  const rects = svgContainer.value.querySelectorAll("rect");
  rects.forEach(rect => {
    if (rect.id === props.hoveredRect) {
      rect.style.transform = "scale(1.01)";
      rect.style.transformOrigin = "50% 50%";
    } else {
      rect.style.transform = "";
      rect.style.filter = "";
      rect.style.transformOrigin = "";
    }
  });
}

function emitRectHover(id) {
  // emit ke parent
  emit("rect-hover", id);
}
function emitRectOut() {
  emit("rect-out");
}

const emit = defineEmits(["rect-hover", "rect-out", "click"]);
</script>
