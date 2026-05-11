<script setup lang="ts">
const timeline = [
  {
    year: "2018",
    title: "The frustration",
    body: "Started building after realising there was no way to do serious audio mixing on Android without a laptop nearby. Every solution required a computer in the chain.",
  },
  {
    year: "2020",
    title: "First DSP engine",
    body: "Wrote the core real-time DSP engine from scratch — parametric EQ, compressor, and limiter all running natively on Android with near-zero latency.",
  },
  {
    year: "2022",
    title: "Streaming & recording",
    body: "Added live streaming output and local recording. The full workflow — mix, stream, record — now ran entirely on-device for the first time.",
  },
  {
    year: "2024",
    title: "Internet radio",
    body: "Built internet radio monitoring and rebroadcast directly into the mixer. No app switching, no extra setup.",
  },
  {
    year: "2025",
    title: "Launch preparation",
    body: "Polishing the interface, expanding DSP modules, and getting MixDroid ready for its first public release.",
  },
];

useSeoMeta({
  title: "About — MixDroid",
  description:
    "The story behind MixDroid — built solo over 7 years from Lebanon by one developer who wanted professional audio mixing without a laptop.",
});
</script>

<template>
  <div class="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)]">
    <AppNav />

    <main>
      <!-- ── Hero / identity ─────────────────────────────────────────────── -->
      <section class="border-b border-white/8">
        <div class="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div
            class="grid gap-12 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start"
          >
            <!-- Avatar -->
            <div class="flex flex-col items-center gap-4 lg:items-start">
              <div class="relative">
                <!-- Glow ring -->
                <!-- <div
                  class="absolute -inset-1 rounded-full opacity-40"
                  style="background: conic-gradient(from 180deg, var(--accent-cyan), transparent 60%, var(--warning-pink), transparent 80%, var(--accent-cyan));"
                /> -->
                <img
                  src="/images/joe.jpg"
                  alt="MixDroid developer"
                  width="160"
                  height="160"
                  class="relative h-40 w-40 rounded-full border-2 border-[var(--panel-line)] object-cover"
                  onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                />
                <!-- Fallback monogram if image is missing -->
                <div
                  class="relative hidden h-40 w-40 items-center justify-center rounded-full border-2 border-[var(--panel-line)] bg-[var(--panel-bg-strong)] text-4xl font-semibold text-[var(--accent-cyan)]"
                  style="display: none"
                >
                  MX
                </div>
              </div>

              <!-- Chips below avatar -->
              <div class="flex flex-col items-center gap-2 lg:items-start">
                <p class="text-base font-semibold text-white">Joe Kaikaty</p>
                <p
                  class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]"
                >
                  Solo developer
                </p>
                <p class="text-sm text-[var(--text-muted)]">Lebanon</p>
              </div>
            </div>

            <!-- Bio -->
            <div class="space-y-6">
              <div class="space-y-3">
                <p
                  class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]"
                >
                  About me
                </p>
                <h1
                  class="text-4xl font-semibold tracking-tight text-white sm:text-5xl"
                >
                  7 years. One developer.<br class="hidden sm:block" />
                  Built from Lebanon.
                </h1>
              </div>

              <div
                class="space-y-4 text-base leading-8 text-[var(--text-muted)]"
              >
                <p>
                  I'm a solo developer based in Lebanon. MixDroid started from a
                  simple frustration — I wanted to mix audio for live recordings
                  and streams without lugging a laptop around. Every Android app
                  I found was either a toy or required a computer somewhere in
                  the signal chain.
                </p>
                <p>
                  So I built what I needed. What started as a personal project
                  became seven years of research into real-time DSP, Android
                  audio internals, and the specific pain points of podcasters,
                  streamers, and content creators working without a studio
                  setup.
                </p>
                <p>
                  No VC funding, no team, no shortcuts. Every algorithm, every
                  screen, every edge case is something I hit personally and
                  fixed myself. MixDroid is the tool I use — which means it gets
                  better every time I use it.
                </p>
              </div>

              <!-- Stat row -->
              <div class="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
                <div class="console-stat">
                  <p class="console-stat__label">Building since</p>
                  <p class="console-stat__value">2018</p>
                </div>
                <div class="console-stat">
                  <p class="console-stat__label">Team size</p>
                  <p class="console-stat__value">1</p>
                </div>
                <div class="console-stat">
                  <p class="console-stat__label">Dependencies</p>
                  <p class="console-stat__value">No Google</p>
                </div>
                <div class="console-stat">
                  <p class="console-stat__label">Subscriptions</p>
                  <p class="console-stat__value">None</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Why I built it ─────────────────────────────────────────────── -->
      <section class="border-b border-white/8">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div class="space-y-4">
              <p
                class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]"
              >
                The motivation
              </p>
              <h2
                class="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
              >
                Why does a mixer need a laptop?
              </h2>
              <div
                class="space-y-4 text-base leading-8 text-[var(--text-muted)]"
              >
                <p>
                  Professional audio tools have always assumed you have a
                  desktop or laptop in the room. That assumption made sense in
                  2005. It doesn't in 2025 — Android devices have the processing
                  power, the audio interfaces exist, and the workflows for
                  podcasters and streamers are simple enough that a laptop is
                  pure overhead.
                </p>
                <p>
                  MixDroid's design goal is that you should be able to walk into
                  a room with your phone and a USB interface and have a complete
                  mixing and streaming setup in under two minutes. No drivers,
                  no configuration files, no laptop bag.
                </p>
              </div>
            </div>

            <div class="space-y-3">
              <p
                class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]"
              >
                What makes it different
              </p>
              <div class="space-y-3">
                <div
                  v-for="point in [
                    {
                      label: 'No Google account required',
                      detail:
                        'Distributed outside the Play Store. You own the install.',
                    },
                    {
                      label: 'Third-party apps via open-source store',
                      detail:
                        'Extend your setup with community-built tools, or request a pre-built app for your workflow.',
                    },
                    {
                      label: 'Works completely offline',
                      detail:
                        'DSP, mixing, and recording need zero internet. Radio and streaming are opt-in.',
                    },
                    {
                      label: 'Built by someone who uses it',
                      detail:
                        'Every feature exists because I needed it personally — not because a product roadmap said so.',
                    },
                  ]"
                  :key="point.label"
                  class="mini-panel"
                >
                  <p class="mini-panel__title flex items-center gap-2">
                    <span class="text-[var(--accent-cyan)]">→</span>
                    {{ point.label }}
                  </p>
                  <p
                    class="mini-panel__value text-sm font-normal text-[var(--text-muted)]"
                  >
                    {{ point.detail }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Timeline ───────────────────────────────────────────────────── -->
      <section class="border-b border-white/8">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="mb-10 space-y-3">
            <p
              class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]"
            >
              Development history
            </p>
            <h2
              class="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              How MixDroid got here.
            </h2>
          </div>

          <div class="relative space-y-0">
            <!-- Vertical line -->
            <div
              class="absolute left-[3.25rem] top-0 hidden h-full w-px bg-[var(--panel-line)] sm:block"
            />

            <div
              v-for="(entry, i) in timeline"
              :key="entry.year"
              class="relative grid gap-4 pb-8 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-8"
            >
              <!-- Year bubble -->
              <div class="flex items-start gap-3 sm:justify-end sm:pt-1">
                <span
                  class="relative z-10 font-mono text-sm font-semibold text-[var(--accent-cyan)] sm:text-right"
                >
                  {{ entry.year }}
                </span>
                <!-- Dot on the line -->
                <div
                  class="relative z-10 mt-1.5 hidden h-2.5 w-2.5 shrink-0 rounded-full border border-[var(--accent-cyan)] bg-[var(--page-bg)] sm:block"
                />
              </div>

              <!-- Content -->
              <div
                class="console-panel rounded-xl p-4"
                :class="
                  i === timeline.length - 1
                    ? 'border-[var(--accent-cyan)]/30'
                    : ''
                "
              >
                <p class="font-semibold text-white">{{ entry.title }}</p>
                <p class="mt-2 text-sm leading-7 text-[var(--text-muted)]">
                  {{ entry.body }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Waitlist CTA ────────────────────────────────────────────────── -->
      <section>
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="console-panel rounded-xl p-6 sm:p-8">
            <div
              class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
            >
              <div class="space-y-3">
                <p
                  class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]"
                >
                  Early access
                </p>
                <h2
                  class="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
                >
                  Follow the journey — get early access.
                </h2>
                <p class="max-w-xl text-base text-[var(--text-muted)]">
                  Join the waitlist and hear from me directly when MixDroid
                  ships. Beta builds, release notes, and early supporter
                  pricing.
                </p>
              </div>
              <NuxtLink
                to="/"
                class="shrink-0 rounded-md bg-[var(--accent-cyan)] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
              >
                Join the waitlist →
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>