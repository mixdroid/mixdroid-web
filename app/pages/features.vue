<script setup lang="ts">
interface ScreenImage {
  src: string;
  alt: string;
  caption: string;
}

interface Module {
  id: string;
  label: string;
  title: string;
  description: string;
  screens: ScreenImage[];
  carousel?: boolean;
}

const modules: Module[] = [
  {
    id: "mixer",
    label: "Hardware",
    title: "Mixer Hardware",
    description:
      "Built around an 8-core 64-bit processor with up to 32 GB RAM and 256 GB storage. A 7-inch multitouch display, multi-channel onboard audio codec, USB 3.0 ports, and Android 13 — everything you need on a single board, no laptop required.",
    screens: [
      {
        src: "/images/Mixer.jpg",
        alt: "MixDroid hardware overview",
        caption: `• 8-core 64-bit processor.
• LPDDR4/4X/5 — 2 GB, 4 GB, 8 GB, 16 GB, 32 GB memory options.
• 32 GB, 64 GB, 128 GB, 256 GB storage options.
• 7″ multitouch display.
• USB 3.0 + USB 2.0 × 3.
• Wi-Fi 5 + Bluetooth 5.0 / BLE onboard.
• 8-channel input / 8-channel output built-in audio codec.
• USB-C 3.0 — usable as external audio interface or MIDI controller.
• External USB audio interfaces supported.
• Android 13 OS.`,
      },
    ],
  },
  {
    id: "studio",
    label: "Core",
    title: "Main Studio",
    description:
      "The nerve centre of MixDroid. Five effects per channel, flexible routing between internal buses and external interfaces, MIDI-controlled faders, and a metering engine that covers every standard from Peak to LUFS — all with a real-time DSP CPU monitor so you always know your headroom.",
    screens: [
      {
        src: "/images/studio.png",
        alt: "Main Studio interface",
        caption: `• 5 effects per channel.
• Adjustable Plugin Delay Compensation (PDC).
• Channel routing: internal, from/to external audio interfaces.
• Meter modes: Peak, RMS, PPM, VU, K12, K14, K20, LUFS Short, LUFS Momentary, Scrolling Waveform.
• DSP CPU usage monitor.
• MIDI-controlled faders, mute/solo.`,
      },
    ],
  },
  {
    id: "eq",
    label: "DSP",
    title: "Parametric EQ",
    description:
      "Five fully parametric bands backed by an 8192-bin FFT spectrum analyser and a live phase response curve. Every filter shape you'd expect from a desktop plugin — running natively on Android with no round-trips and no compromise.",
    screens: [
      {
        src: "/images/eq.png",
        alt: "Parametric EQ",
        caption: `• BiquadRBJ — 2nd-order IIR, Transposed DF-II topology.
• 5 fully parametric bands.
• Pre-gain and per-band solo.
• ±24 dB gain, Q-factor 0.707–1.8.
• 20 Hz–20 kHz frequency response.
• 8192-bin FFT spectrum analyser.
• Phase response curve.
• Filter types: LowPass, HighPass, BandPass, Notch, AllPass, Peaking, LowShelf, HighShelf.
• Slopes: 12, 24, 36, 48 dB/octave.`,
      },
    ],
  },
  {
    id: "compressor",
    label: "DSP",
    title: "Stereo Compressor",
    description:
      "A feed-forward stereo compressor that handles everything from gentle glue to hard limiting. Sidechain input, soft-knee shaping, auto-gain compensation, and your choice of RMS or peak detection — the controls you reach for, nothing you don't.",
    screens: [
      {
        src: "/images/compressor.png",
        alt: "Stereo Compressor",
        caption: `• Stereo-linked feed-forward compressor.
• Threshold, ratio up to 20:1, attack 1–100 ms, release 1–10,000 ms.
• Sidechain input support.
• Knee width 0–24 dB.
• Auto-gain compensation.
• RMS or peak detection with IIR integration window.
• Pre-gain and post-compression makeup gain.`,
      },
    ],
  },
  {
    id: "limiter",
    label: "DSP",
    title: "Limiter",
    description:
      "A lookahead brick-wall limiter with three purpose-built modes. Pick Live for stage monitoring where every millisecond counts, Standard for day-to-day mixing, or Mastering when transparency matters more than latency.",
    screens: [
      {
        src: "/images/limiter.png",
        alt: "Limiter",
        caption: `• Lookahead brick-wall limiter.
• Live — lowest latency for stage and IEM. Lookahead 1 ms, attack 0.5 ms.
• Standard — general-purpose default. Lookahead 5 ms, attack 1 ms.
• Mastering — maximum transparency. Lookahead 10 ms, attack 2 ms.`,
      },
    ],
  },
  {
    id: "reverb",
    label: "DSP",
    title: "Reverb",
    description:
      "A stereo algorithmic reverb with full control over room size, decay, pre-delay, HF damping, and LFO modulation. Dial in a tight vocal booth or a wide concert hall — then shape it further with the global LP/HP output filters.",
    screens: [
      {
        src: "/images/reverb.png",
        alt: "Reverb",
        caption: `• Wet / dry mix: 0–100 %.
• Decay: 0.01–20 s (RT60).
• Pre-delay: 0–0.5 s.
• Size: 0–100 % (0 % = tight room, 100 % = large hall).
• Damping: 0–100 % HF damping — maps LP cutoff from 20 kHz down to 500 Hz.
• Mod rate: 0–8 Hz LFO.
• Mod depth: 0–100 %.
• Output LP: 200–20,000 Hz.
• Output HP: 20–2,000 Hz.`,
      },
    ],
  },
  {
    id: "delay",
    label: "DSP",
    title: "Delay",
    description:
      "A stereo pro delay with four independent modes. True ping-pong bounce, M/S delay for wide stereo shaping, and fully independent L/R lines for surgical timing — all in one screen.",
    screens: [
      {
        src: "/images/delay.png",
        alt: "Delay",
        caption: `• Stereo — L and R lines fully independent.
• Ping-Pong — true alternating bounce.
• Mono — L+R summed, delayed, duplicated to both outputs.
• Mid/Side — encode M/S, delay channels independently.`,
      },
    ],
  },
  {
    id: "spectrum",
    label: "Visualiser",
    title: "Spectrum Analyser",
    carousel: true,
    description:
      "Real-time 8192-bin FFT spectrum visualisation with multiple display modes. See exactly what your signal is doing — from sub-bass rumble to air frequencies — before it leaves the mixer.",
    screens: [
      { src: "/images/spec1.png", alt: "Spectrum — Bar mode", caption: "Classic bar graph display. Each bin rendered individually at full 8192-bin resolution." },
      { src: "/images/spec2.png", alt: "Spectrum — Line mode", caption: "Smooth line overlay. Useful for comparing two signals or spotting narrow resonances." },
      { src: "/images/spec3.png", alt: "Spectrum — Filled mode", caption: "Filled area under the curve — easier to read loudness distribution at a glance." },
      { src: "/images/spec4.png", alt: "Spectrum — Spectrogram", caption: "Time-vs-frequency waterfall. Reveals how your mix evolves over time." },
      { src: "/images/spec5.png", alt: "Spectrum — Vectorscope", caption: "TReal-time Lissajous display of L vs R phase relationship." },
    ],
  },
  {
    id: "wavey",
    label: "App",
    title: "Wavey Recorder",
    description:
      "A clean, focused recording app built into MixDroid. Currently single-channel, multi-channel recording is on the roadmap. Supports the majority of standard audio file formats — record now, edit later.",
    screens: [
      {
        src: "/images/wavey.png",
        alt: "Wavey Recorder",
        caption: `• Single-channel recording (multi-channel coming soon).
• Supports the majority of standard audio MIME types.`,
      },
    ],
  },
  {
    id: "android",
    label: "Platform",
    title: "Android Home Screen",
    description:
      "The screenshot shows a temporary Android 7 home screen used during early development — the shipping version runs Android 13. The final home screen will be clean, purpose-built, and pre-loaded with open-source tools: F-Droid as the app store, NewPipe for YouTube without tracking, and Kodi for local media. We're also exploring collaborations with major streaming platforms like Spotify so your content workflow lives entirely on one device.",
    screens: [
      {
        src: "/images/android.png",
        alt: "Android home screen (early prototype)",
        caption: `• Temporary Android 7 screen — final version runs Android 13.
• No Google account, no Play Store, no telemetry.
• F-Droid open-source app store pre-installed.
• NewPipe — YouTube client, no ads, no tracking.
• Kodi — local and network media playback.
• Potential integrations: Spotify and other major streaming platforms.
• Request pre-built apps tailored to your workflow.`,
      },
    ],
  },
];

const selectedImage = ref<ScreenImage | null>(null);
const isModalOpen = ref(false);
const isZoomed = ref(false);

function openImage(screen: ScreenImage) {
  selectedImage.value = screen;
  isZoomed.value = false;
  isModalOpen.value = true;
}

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") isModalOpen.value = false;
  });
});

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

useSeoMeta({
  title: "Features — MixDroid",
  description:
    "Every screen and DSP module in MixDroid — parametric EQ, compressor, limiter, reverb, delay, spectrum analyser, and more.",
});
</script>

<template>
  <div class="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)]">
    <AppNav />

    <main>

      <!-- ── Page header -->
      <section class="border-b border-white/8">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-20">
          <div class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">

            <div class="space-y-4">
              <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">
                All features
              </p>
              <h1 class="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Every screen. Every module.
              </h1>
              <p class="max-w-2xl text-base leading-8 text-[var(--text-muted)]">
                MixDroid is built screen by screen, module by module. Click any
                screenshot to inspect it in full detail.
              </p>
            </div>

            <!-- Jump-links -->
            <nav class="flex flex-wrap gap-2 lg:flex-col lg:items-end">
              <button
                v-for="mod in modules"
                :key="mod.id"
                type="button"
                class="panel-chip font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-dim)] transition hover:border-[var(--accent-cyan)]/40 hover:text-[var(--accent-cyan)]"
                @click="scrollTo(mod.id)"
              >
                {{ mod.title }}
              </button>
            </nav>
          </div>
        </div>
      </section>

      <!-- ── Module sections -->
      <template v-for="(mod, modIndex) in modules" :key="mod.id">
        <section :id="mod.id" class="scroll-mt-24 border-b border-white/8">
          <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">

            <!-- Module header -->
            <div class="mb-8 space-y-3">
              <div class="flex items-center gap-3">
                <span class="panel-chip font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--warning-pink)]">
                  {{ mod.label }}
                </span>
                <span class="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-dim)]">
                  {{ String(modIndex + 1).padStart(2, "0") }}
                </span>
              </div>
              <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {{ mod.title }}
              </h2>
              <p class="max-w-2xl text-base leading-7 text-[var(--text-muted)]">
                {{ mod.description }}
              </p>
            </div>

            <!-- Carousel -->
            <ModuleCarousel
              v-if="mod.carousel"
              :screens="mod.screens"
              :module-title="mod.title"
              @open="openImage"
            />

            <!-- Standard grid -->
            <div v-else class="grid gap-6">
              <button
                v-for="(screen, screenIndex) in mod.screens"
                :key="screen.src"
                type="button"
                class="console-panel group w-full rounded-xl p-4 text-left transition hover:border-[var(--accent-cyan)]/45 hover:shadow-[0_0_26px_rgba(0,229,255,0.07)]"
                @click="openImage(screen)"
              >
                <!-- Stack on mobile, side-by-side on lg+ -->
                <div
                  class="flex flex-col gap-5 lg:items-center"
                  :class="
                    screenIndex % 2 === 0
                      ? 'lg:flex-row'
                      : 'lg:flex-row-reverse'
                  "
                >
                  <!-- Image — always full width on mobile -->
                  <div class="w-full lg:flex-1">
                    <img
                      :src="screen.src"
                      :alt="screen.alt"
                      width="1024"
                      height="600"
                      class="aspect-[1024/600] w-full rounded-lg border border-white/10 bg-black object-cover transition group-hover:scale-[1.01]"
                    />
                  </div>

                  <!-- Caption -->
                  <div class="w-full space-y-3 lg:w-80 lg:shrink-0">
                    <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-cyan)]">
                      {{ mod.title }}
                    </p>
                    <p class="text-lg font-medium text-white">
                      {{ screen.alt }}
                    </p>
                    <p class="whitespace-pre-line text-sm leading-7 text-[var(--text-muted)]">
                      {{ screen.caption }}
                    </p>
                    <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--text-dim)]">
                      Click to expand ↗
                    </p>
                  </div>
                </div>
              </button>
            </div>

          </div>
        </section>
      </template>

      <!-- ── More coming -->
      <section class="border-b border-white/8">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="console-panel rounded-xl p-6 sm:p-8">
            <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div class="space-y-3">
                <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">
                  The pipeline
                </p>
                <h2 class="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  This is just what's been photographed.
                </h2>
                <p class="max-w-xl text-base leading-7 text-[var(--text-muted)]">
                  Chorus, Flanger, and Distortion are already implemented —
                  screenshots are on the way. More DSP modules are in active
                  development. If there's a specific effect you need, join the
                  waitlist and let us know.
                </p>
              </div>
              <div class="flex flex-wrap gap-2 lg:flex-col lg:items-end">
                <span class="panel-chip font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-dim)]">Chorus ✓</span>
                <span class="panel-chip font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-dim)]">Flanger ✓</span>
                <span class="panel-chip font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-dim)]">Distortion ✓</span>
                <span class="panel-chip font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent-cyan)]/60">More in dev…</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Waitlist CTA -->
      <section>
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="console-panel rounded-xl p-6 sm:p-8">
            <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div class="space-y-3">
                <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">
                  Early access
                </p>
                <h2 class="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Want to be first to use it?
                </h2>
                <p class="max-w-xl text-base text-[var(--text-muted)]">
                  Join the waitlist and get early access, beta builds, and
                  launch pricing before anyone else.
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

    <!-- ── Image modal -->
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
          v-if="isModalOpen"
          class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-8"
          style="background: rgba(8, 8, 12, 0.96); backdrop-filter: blur(6px);"
          @click.self="isModalOpen = false"
        >
          <div
            class="relative my-auto w-full max-w-4xl rounded-xl border border-[var(--panel-line)] bg-[var(--panel-bg)] shadow-[0_0_60px_rgba(0,0,0,0.6)]"
            @click.stop
          >
            <!-- Image -->
            <div
              class="overflow-auto rounded-t-xl"
              style="max-height: 70vh;"
              @click="isZoomed = !isZoomed"
            >
              <img
                v-if="selectedImage"
                :src="selectedImage.src"
                :alt="selectedImage.alt"
                :class="[
                  'block rounded-t-xl transition-all duration-300 ease-in-out',
                  isZoomed
                    ? 'w-[200%] max-w-none cursor-zoom-out'
                    : 'w-full cursor-zoom-in object-contain',
                ]"
              />
            </div>

            <!-- Caption -->
            <div
              v-if="selectedImage"
              class="flex flex-col gap-3 border-t border-[var(--panel-line)] px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4 sm:px-5"
            >
              <div class="min-w-0">
                <p class="text-sm font-semibold text-white">{{ selectedImage.alt }}</p>
                <p class="mt-1 whitespace-pre-line text-sm leading-6 text-[var(--text-muted)]">
                  {{ selectedImage.caption }}
                </p>
              </div>
              <p class="shrink-0 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--text-dim)]">
                {{ isZoomed ? "Click to fit" : "Click to zoom" }}
              </p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>