<script setup lang="ts">
const route = useRoute();
const menuOpen = ref(false);

watch(() => route.path, () => { menuOpen.value = false; });

// HOME and PRIVACY removed — HOME is redundant, PRIVACY lives in footer
const links = [
  { label: "Features", to: "/features" },
  { label: "About", to: "/about" },
];
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-white/8 bg-[var(--page-bg)]/90 backdrop-blur-md">
    <div class="mx-auto max-w-7xl px-6 py-4 sm:px-8 lg:px-10">
      <nav class="flex items-center justify-between gap-4">

        <!-- Logo -->
        <NuxtLink to="/" class="group flex items-center gap-3">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[var(--panel-line)] bg-[var(--panel-bg-strong)] text-xs font-semibold text-[var(--accent-cyan)] shadow-[0_0_24px_rgba(0,229,255,0.08)] transition group-hover:shadow-[0_0_28px_rgba(0,229,255,0.18)]"
          >
            MX
          </div>
          <span class="font-sans text-[11px] uppercase tracking-[0.35em] text-[var(--accent-cyan)]">
            MixDroid
          </span>
        </NuxtLink>

        <!-- Desktop links + badge -->
        <div class="hidden items-center gap-1 sm:flex">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="min-h-[44px] flex items-center rounded-md px-3 font-sans text-[11px] uppercase tracking-[0.28em] transition"
            :class="
              route.path === link.to
                ? 'bg-[var(--panel-bg-strong)] text-[var(--accent-cyan)]'
                : 'text-[var(--text-dim)] hover:bg-[var(--panel-bg)] hover:text-[var(--text-secondary)]'
            "
          >
            {{ link.label }}
          </NuxtLink>

          <div class="mx-2 h-4 w-px bg-white/10" aria-hidden="true" />

          <NuxtLink
            to="/#hero-email"
            class="flex min-h-[44px] shrink-0 items-center whitespace-nowrap rounded-md bg-[var(--accent-cyan)] px-3 font-sans text-[11px] uppercase tracking-[0.24em] text-black transition hover:opacity-90"
          >
            Join the early-access list →
          </NuxtLink>
        </div>

        <!-- Mobile hamburger -->
        <button
          type="button"
          class="flex h-11 w-11 items-center justify-center rounded-md border border-[var(--panel-line)] bg-[var(--panel-bg)] text-[var(--text-secondary)] sm:hidden"
          :aria-expanded="menuOpen"
          aria-label="Toggle navigation menu"
          @click="menuOpen = !menuOpen"
        >
          <svg v-if="!menuOpen" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <rect y="2" width="16" height="1.5" rx="1"/>
            <rect y="7.25" width="16" height="1.5" rx="1"/>
            <rect y="12.5" width="16" height="1.5" rx="1"/>
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
            <path d="M2 2l12 12M14 2L2 14"/>
          </svg>
        </button>

      </nav>

      <!-- Mobile: primary CTA always visible -->
      <div class="flex items-center justify-end border-t border-white/5 pt-3 sm:hidden">
        <NuxtLink
          to="/#hero-email"
          class="flex min-h-[44px] items-center rounded-md bg-[var(--accent-cyan)] px-4 font-sans text-[11px] uppercase tracking-[0.28em] text-black transition hover:opacity-90"
        >
          Join the early-access list →
        </NuxtLink>
      </div>

      <!-- Mobile dropdown -->
      <Transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <div v-if="menuOpen" class="mt-2 space-y-1 pb-3 sm:hidden">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="block min-h-[44px] flex items-center rounded-md px-3 font-sans text-[11px] uppercase tracking-[0.28em] transition"
            :class="
              route.path === link.to
                ? 'bg-[var(--panel-bg-strong)] text-[var(--accent-cyan)]'
                : 'text-[var(--text-dim)] hover:bg-[var(--panel-bg)] hover:text-[var(--text-secondary)]'
            "
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </Transition>

    </div>
  </header>
</template>