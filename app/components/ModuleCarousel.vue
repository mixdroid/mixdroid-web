<script setup lang="ts">
interface ScreenImage {
  src: string;
  alt: string;
  caption: string;
}

const props = defineProps<{
  screens: ScreenImage[];
  moduleTitle: string;
}>();

const emit = defineEmits<{
  open: [screen: ScreenImage];
}>();

const current = ref(0);
const isHovered = ref(false);
let timer: ReturnType<typeof setInterval> | null = null;

function go(index: number) {
  current.value = (index + props.screens.length) % props.screens.length;
}

function prev() { go(current.value - 1); }
function next() { go(current.value + 1); }

// Autoplay — pause when hovered or modal is open
function startAutoplay() {
  timer = setInterval(() => {
    if (!isHovered.value) next();
  }, 3500);
}

function stopAutoplay() {
  if (timer) { clearInterval(timer); timer = null; }
}

onMounted(() => {
  startAutoplay();
  window.addEventListener("keydown", onKey);
});

onUnmounted(() => {
  stopAutoplay();
  window.removeEventListener("keydown", onKey);
});

function onKey(e: KeyboardEvent) {
  if (e.key === "ArrowLeft") prev();
  if (e.key === "ArrowRight") next();
}
</script>

<template>
  <div
    class="console-panel rounded-xl p-4"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Slide area -->
    <div class="relative overflow-hidden rounded-lg">
      <!-- Slides track -->
      <div
        class="flex transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${current * 100}%)` }"
      >
        <button
          v-for="(screen, i) in screens"
          :key="screen.src"
          type="button"
          class="relative min-w-full shrink-0 cursor-zoom-in"
          :aria-label="`Open ${screen.alt}`"
          @click="emit('open', screen)"
        >
          <img
            :src="screen.src"
            :alt="screen.alt"
            width="1024"
            height="600"
            class="aspect-[1024/600] w-full rounded-lg border border-white/10 bg-black object-cover"
          />
        </button>
      </div>

      <!-- Prev / Next arrows -->
      <button
        type="button"
        aria-label="Previous"
        class="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-md border border-[var(--panel-line)] bg-black/60 text-[var(--text-secondary)] backdrop-blur-sm transition hover:border-[var(--accent-cyan)]/50 hover:text-[var(--accent-cyan)]"
        @click.stop="prev"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next"
        class="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-md border border-[var(--panel-line)] bg-black/60 text-[var(--text-secondary)] backdrop-blur-sm transition hover:border-[var(--accent-cyan)]/50 hover:text-[var(--accent-cyan)]"
        @click.stop="next"
      >
        ›
      </button>

      <!-- Slide counter badge -->
      <div class="absolute bottom-3 right-3 rounded-md border border-[var(--panel-line)] bg-black/70 px-2.5 py-1 font-sans text-[10px] uppercase tracking-[0.28em] text-[var(--text-dim)] backdrop-blur-sm">
        {{ current + 1 }} / {{ screens.length }}
      </div>
    </div>

    <!-- Caption + dots row -->
    <div class="mt-4 flex items-start justify-between gap-4">
      <div class="min-w-0 space-y-1">
        <p class="font-sans text-[11px] uppercase tracking-[0.3em] text-[var(--accent-cyan)]">
          {{ moduleTitle }} · Screen {{ current + 1 }}
        </p>
        <p class="text-sm font-medium text-white">
          {{ screens[current].alt }}
        </p>
        <p class="whitespace-pre-line text-sm leading-6 text-[var(--text-muted)]">
          {{ screens[current].caption }}
        </p>
        <p class="pt-1 font-sans text-[10px] uppercase tracking-[0.28em] text-[var(--text-dim)]">
          Click image to expand ↗
        </p>
      </div>

      <!-- Dot indicators -->
      <div class="mt-1 flex shrink-0 flex-col items-end gap-1.5">
        <button
          v-for="(_, i) in screens"
          :key="i"
          type="button"
          :aria-label="`Go to screen ${i + 1}`"
          class="h-1.5 rounded-full transition-all duration-300"
          :class="
            i === current
              ? 'w-5 bg-[var(--accent-cyan)]'
              : 'w-1.5 bg-white/20 hover:bg-white/40'
          "
          @click.stop="go(i)"
        />
      </div>
    </div>

    <!-- Autoplay progress bar -->
    <div class="mt-3 h-px w-full overflow-hidden rounded-full bg-white/8">
      <div
        class="h-full rounded-full bg-[var(--accent-cyan)]/50 transition-none"
        :class="isHovered ? 'w-0' : 'animate-progress'"
        :key="`${current}-${isHovered}`"
      />
    </div>
  </div>
</template>

<style scoped>
@keyframes progress {
  from { width: 0%; }
  to   { width: 100%; }
}
.animate-progress {
  animation: progress 3.5s linear forwards;
}
</style>