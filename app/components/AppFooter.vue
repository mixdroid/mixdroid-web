<template>
  <footer class="border-t border-white/8">
    <div class="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-6">
          <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--text-dim)]">
            MixDroid — built solo in Lebanon
          </p>
          <div class="hidden h-3 w-px bg-white/10 sm:block" />
          <div class="hidden items-center gap-4 sm:flex">
            <NuxtLink to="/features" class="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-dim)] transition hover:text-[var(--text-muted)]">Features</NuxtLink>
            <NuxtLink to="/about" class="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-dim)] transition hover:text-[var(--text-muted)]">About</NuxtLink>
          </div>
        </div>
        <p class="text-sm text-[var(--text-dim)]">
          © {{ new Date().getFullYear() }} MixDroid. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
