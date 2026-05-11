<script setup lang="ts">
const route = useRoute();
const menuOpen = ref(false);

watch(() => route.path, () => { menuOpen.value = false; });

const links = [
  { label: "Home", to: "/" },
  { label: "Features", to: "/features" },
  { label: "About", to: "/about" },
];

// ── Update these URLs when your accounts are live ──────────────────────────
const socials = [
  {
    label: "YouTube",
    href: "https://youtube.com/",
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
    </svg>`,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/",
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12c0-3.2 0-3.6.1-4.8C2.4 3.9 4 2.3 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1.0 8.3 0 8.7 0 12c0 3.3 0 3.7.1 4.9.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24c3.3 0 3.7 0 4.9-.1 4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9 0-3.3 0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"/>
    </svg>`,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/",
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.6 3a5.6 5.6 0 0 1-3.5-1.3A5.6 5.6 0 0 1 14.4 0h-3.8v16.6a2.8 2.8 0 0 1-2.8 2.6 2.8 2.8 0 0 1-2.8-2.8 2.8 2.8 0 0 1 2.8-2.8c.3 0 .5 0 .8.1V9.8a6.6 6.6 0 0 0-.8 0A6.6 6.6 0 0 0 1.2 16.4 6.6 6.6 0 0 0 7.8 23a6.6 6.6 0 0 0 6.6-6.6V8.2A9.3 9.3 0 0 0 19.6 9V5.2A5.6 5.6 0 0 1 19.6 3z"/>
    </svg>`,
  },
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
          <span class="font-mono text-[11px] uppercase tracking-[0.35em] text-[var(--accent-cyan)]">
            MixDroid
          </span>
        </NuxtLink>

        <!-- Desktop right side -->
        <div class="hidden items-center gap-1 sm:flex">
          <!-- Nav links -->
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="rounded-md px-3 py-2 font-mono text-[11px] uppercase tracking-[0.28em] transition"
            :class="
              route.path === link.to
                ? 'bg-[var(--panel-bg-strong)] text-[var(--accent-cyan)]'
                : 'text-[var(--text-dim)] hover:bg-[var(--panel-bg)] hover:text-[var(--text-secondary)]'
            "
          >
            {{ link.label }}
          </NuxtLink>

          <!-- Divider -->
          <div class="mx-2 h-4 w-px bg-white/10" />

          <!-- Social icons -->
          <div class="flex items-center gap-1">
            <a
              v-for="social in socials"
              :key="social.label"
              :href="social.href"
              :aria-label="social.label"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-8 w-8 items-center justify-center rounded-md text-[var(--text-dim)] transition hover:bg-[var(--panel-bg)] hover:text-[var(--text-secondary)]"
              v-html="social.icon"
            />
          </div>

          <!-- Divider -->
          <div class="mx-2 h-4 w-px bg-white/10" />

          <UBadge
            color="neutral"
            variant="outline"
            class="rounded-md border-[var(--panel-line)] bg-[var(--panel-bg)] px-3 py-1 text-[var(--accent-cyan)]"
          >
            Early access
          </UBadge>
        </div>

        <!-- Mobile hamburger -->
        <button
          type="button"
          class="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--panel-line)] bg-[var(--panel-bg)] text-[var(--text-secondary)] sm:hidden"
          :aria-expanded="menuOpen"
          aria-label="Toggle menu"
          @click="menuOpen = !menuOpen"
        >
          <svg v-if="!menuOpen" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect y="2" width="16" height="1.5" rx="1"/>
            <rect y="7.25" width="16" height="1.5" rx="1"/>
            <rect y="12.5" width="16" height="1.5" rx="1"/>
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
            <path d="M2 2l12 12M14 2L2 14"/>
          </svg>
        </button>

      </nav>

      <!-- Mobile social bar — always visible, never hidden behind hamburger -->
      <div class="flex items-center justify-between border-t border-white/5 pt-3 sm:hidden">
        <div class="flex items-center gap-1">
          <a
            v-for="social in socials"
            :key="social.label"
            :href="social.href"
            :aria-label="social.label"
            target="_blank"
            rel="noopener noreferrer"
            class="flex h-9 w-9 items-center justify-center rounded-md text-[var(--text-dim)] transition hover:bg-[var(--panel-bg)] hover:text-[var(--text-secondary)]"
            v-html="social.icon"
          />
        </div>
        <UBadge
          color="neutral"
          variant="outline"
          class="rounded-md border-[var(--panel-line)] bg-[var(--panel-bg)] px-3 py-1 text-[var(--accent-cyan)]"
        >
          Early access
        </UBadge>
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
        <div v-if="menuOpen" class="mt-3 space-y-1 pb-3 sm:hidden">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="block rounded-md px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.28em] transition"
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