<script setup lang="ts">
interface ShowcaseImage {
  src: string;
  alt: string;
  caption: string;
}

const props = defineProps<{
  open: boolean;
  image: ShowcaseImage | null;
}>();

const emit = defineEmits<{
  close: [];
}>();

const zoomed = ref(false);

watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) zoomed.value = false;
  }
);
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-8"
        style="background: rgba(8, 8, 12, 0.96); backdrop-filter: blur(6px);"
        role="dialog"
        aria-modal="true"
        :aria-label="image?.alt"
        @click.self="emit('close')"
      >
        <div
          class="relative my-auto w-full max-w-4xl rounded-xl border border-[var(--panel-line)] bg-[var(--panel-bg)] shadow-[0_0_60px_rgba(0,0,0,0.6)]"
          @click.stop
        >
          <div
            class="overflow-auto rounded-t-xl"
            style="max-height: 70vh;"
            @click="zoomed = !zoomed"
          >
            <img
              v-if="image"
              :src="image.src"
              :alt="image.alt"
              :class="[
                'block rounded-t-xl transition-all duration-300 ease-in-out',
                zoomed
                  ? 'w-[200%] max-w-none cursor-zoom-out'
                  : 'w-full cursor-zoom-in object-contain',
              ]"
            />
          </div>
          <div
            v-if="image"
            class="flex flex-col gap-3 border-t border-[var(--panel-line)] px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4 sm:px-5"
          >
            <div class="min-w-0">
              <p class="text-sm font-semibold text-white">{{ image.alt }}</p>
              <p
                v-if="image.caption"
                class="mt-1 whitespace-pre-line text-sm leading-6 text-[var(--text-muted)]"
              >
                {{ image.caption }}
              </p>
            </div>
            <p class="shrink-0 font-sans text-[10px] uppercase tracking-[0.28em] text-[var(--text-dim)]">
              {{ zoomed ? "Click to fit" : "Click to zoom" }}
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>