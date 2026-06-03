<script setup lang="ts">
// Social links live here now — out of the nav, focused footer placement
const socials = [
  {
    label: "YouTube",
    href: "https://youtube.com/@mixdroid",
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
    </svg>`,
  },
  // {
  //   label: "Instagram",
  //   href: "https://instagram.com/mixdroid",
  //   icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  //     <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12c0-3.2 0-3.6.1-4.8C2.4 3.9 4 2.3 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1.0 8.3 0 8.7 0 12c0 3.3 0 3.7.1 4.9.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24c3.3 0 3.7 0 4.9-.1 4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9 0-3.3 0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"/>
  //   </svg>`,
  // },
  {
    label: "TikTok",
    href: "https://tiktok.com/@mixdroid",
    icon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.6 3a5.6 5.6 0 0 1-3.5-1.3A5.6 5.6 0 0 1 14.4 0h-3.8v16.6a2.8 2.8 0 0 1-2.8 2.6 2.8 2.8 0 0 1-2.8-2.8 2.8 2.8 0 0 1 2.8-2.8c.3 0 .5 0 .8.1V9.8a6.6 6.6 0 0 0-.8 0A6.6 6.6 0 0 0 1.2 16.4 6.6 6.6 0 0 0 7.8 23a6.6 6.6 0 0 0 6.6-6.6V8.2A9.3 9.3 0 0 0 19.6 9V5.2A5.6 5.6 0 0 1 19.6 3z"/>
    </svg>`,
  },
];
</script>

<template>
  <footer class="border-t border-white/8">
    <div class="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

        <!-- Left: brand + nav links -->
        <div class="flex flex-wrap items-center gap-x-6 gap-y-2">
          <NuxtLink to="/" class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--text-dim)] transition hover:text-[var(--text-secondary)]">
            MixDroid
          </NuxtLink>
          <div class="h-3 w-px bg-white/10" aria-hidden="true" />
          <NuxtLink to="/features" class="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-dim)] transition hover:text-[var(--text-secondary)]">Features</NuxtLink>
          <NuxtLink to="/about" class="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-dim)] transition hover:text-[var(--text-secondary)]">About</NuxtLink>
          <NuxtLink to="/privacy" class="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-dim)] transition hover:text-[var(--text-secondary)]">Privacy</NuxtLink>
        </div>

        <!-- Right: social icons + copyright -->
        <div class="flex items-center gap-4">
          <!-- Social icons — moved here from nav -->
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

          <div class="h-3 w-px bg-white/10" aria-hidden="true" />

          <p class="text-sm text-[var(--text-dim)]">
            © {{ new Date().getFullYear() }} MixDroid
          </p>
        </div>

      </div>
    </div>
  </footer>
</template>