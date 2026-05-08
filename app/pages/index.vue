<script setup lang="ts">
interface ShowcaseImage {
  src: string;
  alt: string;
  caption: string;
}
 
const email = ref("");
const loading = ref(false);
const submitted = ref(false);
const errorMessage = ref("");
 
// Hero form — independent state so both forms work simultaneously
const heroEmail = ref("");
const heroLoading = ref(false);
const heroSubmitted = ref(false);
const heroError = ref("");
const selectedImage = ref<ShowcaseImage | null>(null);
const isImageModalOpen = ref(false);
const modalZoomed = ref(false);

const heroImage: ShowcaseImage = {
  src: "/images/Mixer.jpg",
  alt: "MixDroid mixer — initial concept render",
  caption:
    "Early concept render modelled in Blender — not the final hardware. The production design is in progress.",
};

const appImage: ShowcaseImage = {
  src: "/images/studio.png",
  alt: "MixDroid main digital mixer interface",
  caption:
    "Full mixer view — channels, DSP chain, routing, and metering in one screen.",
};

const features = [
  {
    id: "01",
    title: "Real-time DSP effects",
    description:
      "EQ, compression, limiting, and more — processed on-device with near-zero latency. No cloud round-trips, no buffer surprises mid-stream.",
  },
  {
    id: "02",
    title: "Live streaming & recording",
    description:
      "Mix your mic, music, and soundboard simultaneously. Route directly to your streaming software or record locally — all without a laptop in the signal chain.",
  },
  {
    id: "03",
    title: "Internet radio built-in",
    description:
      "Tune in, monitor, and rebroadcast internet radio stations right from the mixer. No separate app switching, no extra setup.",
  },
  {
    id: "04",
    title: "Standalone Android — no laptop",
    description:
      "MixDroid runs entirely on Android. No MacBook, no Windows rig, no subscription. Just your Android device and a USB audio interface.",
  },
];

const showcaseImages: ShowcaseImage[] = [
  {
    src: "/images/eq.png",
    alt: "Parametric EQ",
    caption: `• 5 bands with full parametric control.
• Pre-gain and per-band solo.
• ±24 dB gain, Q-factor 0.707–1.8.
• 20 Hz–20 kHz frequency response.
• 8192-bin FFT spectrum analyzer.
• LowPass, HighPass, BandPass, Notch, AllPass, Peaking, LowShelf, HighShelf.`,
  },
  {
    src: "/images/compressor.png",
    alt: "Stereo Compressor",
    caption: `• Stereo-linked feed-forward compressor.
• Threshold, ratio (up to 20:1), attack (1–100 ms), release (1–10,000 ms).
• Sidechain input support.
• Soft-knee width, auto-gain compensation.
• RMS or peak detection with IIR integration window.
• Pre-gain and post-compression makeup gain.`,
  },
];

function openImage(image: ShowcaseImage) {
  selectedImage.value = image;
  modalZoomed.value = false;
  isImageModalOpen.value = true;
}

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") isImageModalOpen.value = false;
  });
});

async function joinWaitlist() {
  errorMessage.value = "";

  if (!email.value.trim()) {
    errorMessage.value = "Please enter your email address.";
    return;
  }

  loading.value = true;

  try {
    await $fetch("/api/waitlist", {
      method: "POST",
      body: { email: email.value },
    });
    submitted.value = true;
    email.value = "";
  } catch (error: unknown) {
    const fetchError = error as { data?: { statusMessage?: string } };
    errorMessage.value =
      fetchError?.data?.statusMessage ??
      "Something went wrong. Please try again.";
  } finally {
    loading.value = false;
  }
}

async function heroJoinWaitlist() {
  heroError.value = "";

  if (!heroEmail.value.trim()) {
    heroError.value = "Please enter your email address.";
    return;
  }

  heroLoading.value = true;

  try {
    await $fetch("/api/waitlist", {
      method: "POST",
      body: { email: heroEmail.value },
    });
    heroSubmitted.value = true;
    heroEmail.value = "";
  } catch (error: unknown) {
    const fetchError = error as { data?: { statusMessage?: string } };
    heroError.value =
      fetchError?.data?.statusMessage ??
      "Something went wrong. Please try again.";
  } finally {
    heroLoading.value = false;
  }
}

useSeoMeta({
  title: "MixDroid — Android Mixer for Podcasters & Streamers",
  description:
    "MixDroid is a standalone Android mixer with real-time DSP effects, live streaming, recording, and internet radio. No laptop. No subscriptions. Built for podcasters, streamers, and content creators.",
  ogTitle: "MixDroid — Android Mixer for Podcasters & Streamers",
  ogDescription:
    "Real-time DSP, streaming, recording, and radio — all on Android. No laptop required.",
  twitterCard: "summary_large_image",
});
</script>
 
<template>
  <div class="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)]">
    <AppNav />
    <main>
      <!-- ── Hero ───────────────────────────────────────────────────────── -->
      <section class="border-b border-white/8">
        <div
          class="mx-auto grid gap-12 px-6 py-14 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:px-10 lg:py-20"
        >
          <div class="space-y-8">
            <div class="space-y-5">
              <div
                class="flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-dim)]"
              >
                <span class="panel-chip">Podcasters</span>
                <span class="panel-chip">Streamers</span>
                <span class="panel-chip">Content creators</span>
                <span class="panel-chip">Musicians</span>
              </div>

              <div class="space-y-4">
                <h1
                  class="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
                >
                  Professional mixing on Android. No laptop required.
                </h1>

                <p class="max-w-2xl text-lg leading-8 text-[var(--text-muted)]">
                  MixDroid gives podcasters, streamers, musicians and content
                  creators a full-featured mixer in their pocket — real-time DSP
                  effects, live streaming, recording, and internet radio, all
                  running standalone on Android. Built solo from Lebanon over 7
                  years. No Google account, no subscriptions, no cloud
                  dependency.
                </p>
              </div>
            </div>

            <!-- Hero email capture -->
            <div class="space-y-3">
              <form
                class="flex flex-col gap-3 sm:flex-row sm:items-start"
                @submit.prevent="heroJoinWaitlist"
              >
                <div class="flex-1">
                  <UInput
                    v-model="heroEmail"
                    type="email"
                    size="xl"
                    variant="outline"
                    placeholder="you@yourshow.com"
                    class="w-full"
                    :ui="{
                      base: 'rounded-md bg-black/30 border-white/12 text-white placeholder:text-slate-500',
                    }"
                  />
                </div>
                <UButton
                  type="submit"
                  size="xl"
                  color="primary"
                  class="shrink-0 rounded-md px-6"
                  :loading="heroLoading"
                >
                  Get early access
                </UButton>
              </form>

              <p
                v-if="heroSubmitted"
                class="text-sm font-medium text-[var(--accent-cyan)]"
              >
                ✓ You're on the list. We'll be in touch before launch.
              </p>
              <p
                v-else-if="heroError"
                class="text-sm font-medium text-[var(--warning-pink)]"
              >
                {{ heroError }}
              </p>
              <p v-else class="text-sm text-[var(--text-dim)]">
                No spam. Launch updates only.
              </p>
            </div>

            <div class="grid gap-3 sm:grid-cols-3">
              <div class="console-stat">
                <p class="console-stat__label">Latency</p>
                <p class="console-stat__value">Ultra-low DSP</p>
              </div>
              <div class="console-stat">
                <p class="console-stat__label">Effects</p>
                <p class="console-stat__value">EQ · Comp · Limiter</p>
              </div>
              <div class="console-stat">
                <p class="console-stat__label">Platform</p>
                <p class="console-stat__value">Android standalone</p>
              </div>
            </div>
          </div>

          <!-- Hero image -->
          <button
            type="button"
            class="group rounded-xl border border-[var(--panel-line)] bg-[var(--panel-bg)] p-4 text-left transition hover:border-[var(--accent-cyan)]/45 hover:shadow-[0_0_32px_rgba(0,229,255,0.08)]"
            @click="openImage(heroImage)"
          >
            <div class="mb-4 flex items-center justify-between gap-4">
              <div>
                <p
                  class="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-cyan)]"
                >
                  Interface
                </p>
                <p class="mt-2 text-sm text-[var(--text-muted)]">
                  Main mixer view
                </p>
              </div>
            </div>

            <img
              :src="heroImage.src"
              :alt="heroImage.alt"
              width="800"
              height="480"
              class="aspect-[1024/480] w-full rounded-lg border border-white/10 bg-black object-cover transition group-hover:scale-[1.01]"
            />

            <div class="mt-4 flex items-center justify-between gap-4">
              <p class="text-sm text-[var(--text-secondary)]">
                {{ heroImage.caption }}
              </p>
              <p
                class="shrink-0 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--text-dim)]"
              >
                Click to expand
              </p>
            </div>
          </button>
        </div>
      </section>

      <!-- ── Features ───────────────────────────────────────────────────── -->
      <section class="border-b border-white/8">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="mb-10 space-y-3">
            <p
              class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]"
            >
              What's inside
            </p>
            <h2
              class="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              Everything a content creator needs. Nothing they don't.
            </h2>
            <p class="max-w-2xl text-base leading-7 text-[var(--text-muted)]">
              MixDroid ships with the tools that matter for real shows — built
              tight, with no bloat and no upsells hiding features behind a
              paywall.
            </p>
          </div>

          <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <article
              v-for="feature in features"
              :key="feature.id"
              class="console-panel rounded-xl p-5"
            >
              <p
                class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--warning-pink)]"
              >
                {{ feature.id }}
              </p>
              <h3 class="mt-4 text-lg font-semibold text-white">
                {{ feature.title }}
              </h3>
              <p class="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                {{ feature.description }}
              </p>
            </article>
          </div>
        </div>
      </section>

      <!-- ── Dark theme ─────────────────────────────────────────────────── -->
      <section class="border-b border-white/8">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="max-w-3xl space-y-4">
            <p
              class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]"
            >
              Design
            </p>
            <h2
              class="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              Built for dim rooms, live sets, and long sessions.
            </h2>
            <p class="max-w-2xl text-base leading-8 text-[var(--text-muted)]">
              MixDroid uses a console-inspired dark interface — focused
              contrast, cyan signal accents, and warning highlights that stay
              readable whether you're recording at 2 AM or going live on a
              stage.
            </p>
          </div>

          <button
            type="button"
            class="console-panel group mt-8 w-full rounded-xl p-4 text-left transition hover:border-[var(--accent-cyan)]/45 hover:shadow-[0_0_32px_rgba(0,229,255,0.08)]"
            @click="openImage(appImage)"
          >
            <div class="mb-4 flex items-center justify-between gap-4">
              <div>
                <p
                  class="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-cyan)]"
                >
                  Main interface
                </p>
                <p class="mt-1 text-sm text-[var(--text-muted)]">
                  Full mixer — channels, DSP chain, routing, and metering
                </p>
              </div>
            </div>

            <img
              :src="appImage.src"
              :alt="appImage.alt"
              class="w-full rounded-lg border border-white/10 bg-black object-cover transition group-hover:scale-[1.01]"
            />

            <p
              class="mt-3 text-right font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--text-dim)]"
            >
              Click to expand
            </p>
          </button>
        </div>
      </section>

      <!-- ── Screens / DSP showcase ─────────────────────────────────────── -->
      <section class="border-b border-white/8">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="mb-8 max-w-3xl space-y-4">
            <p
              class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]"
            >
              DSP screens
            </p>
            <h2
              class="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              Professional-grade processing, built for Android.
            </h2>
            <p class="text-base leading-8 text-[var(--text-muted)]">
              Every DSP module is purpose-built — not ported, not approximated.
              The same parametric EQ and compression you'd expect from desktop
              production tools, running natively on your device.
            </p>
          </div>

          <div class="grid gap-6">
            <button
              v-for="(image, index) in showcaseImages"
              :key="image.src"
              type="button"
              class="console-panel group w-full rounded-xl p-4 text-left transition hover:border-[var(--accent-cyan)]/45 hover:shadow-[0_0_26px_rgba(0,229,255,0.07)]"
              @click="openImage(image)"
            >
              <div
                :class="
                  index % 2 === 0
                    ? 'lg:grid-cols-[minmax(0,1fr)_22rem]'
                    : 'lg:grid-cols-[22rem_minmax(0,1fr)]'
                "
                class="grid gap-5 lg:items-center"
              >
                <div :class="index % 2 === 0 ? 'order-1' : 'order-2'">
                  <img
                    :src="image.src"
                    :alt="image.alt"
                    width="1024"
                    height="600"
                    class="aspect-[1024/600] w-full rounded-lg border border-white/10 bg-black object-cover transition group-hover:scale-[1.01]"
                  />
                </div>

                <div
                  :class="
                    index % 2 === 0
                      ? 'order-2 justify-self-start'
                      : 'order-1 justify-self-start'
                  "
                  class="w-full max-w-none space-y-3 lg:max-w-[22rem]"
                >
                  <p
                    class="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-cyan)]"
                  >
                    Screen {{ index + 1 }}
                  </p>
                  <p class="text-lg font-medium text-white">
                    {{ image.alt }}
                  </p>
                  <p
                    class="whitespace-pre-line text-sm leading-7 text-[var(--text-muted)]"
                  >
                    {{ image.caption }}
                  </p>
                  <p
                    class="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--text-dim)]"
                  >
                    Click to expand
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      <!-- ── Story / solo builder ───────────────────────────────────────── -->
      <section class="border-b border-white/8">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div class="space-y-4">
              <p
                class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]"
              >
                The backstory
              </p>
              <h2
                class="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
              >
                7 years. One developer. Built from Lebanon.
              </h2>
              <p class="text-base leading-8 text-[var(--text-muted)]">
                MixDroid started as a personal frustration — why does
                professional audio mixing still need a laptop? After 7 years of
                solo development, the answer is an Android-native mixer that
                covers the full workflow: DSP processing, live streaming,
                recording, and internet radio, completely offline if needed.
              </p>
              <p class="text-base leading-8 text-[var(--text-muted)]">
                No VC money, no team, no shortcuts. Every DSP algorithm, every
                screen, every edge case — built and tested by one person who
                uses the tool themselves.
              </p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="console-stat col-span-2">
                <p class="console-stat__label">Development time</p>
                <p class="console-stat__value">7 years solo</p>
              </div>
              <div class="console-stat">
                <p class="console-stat__label">Dependencies</p>
                <p class="console-stat__value">No Google, no cloud</p>
              </div>
              <div class="console-stat">
                <p class="console-stat__label">Cost to use</p>
                <p class="console-stat__value">No subscription</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Waitlist ────────────────────────────────────────────────────── -->
      <section>
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div
            class="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
          >
            <div class="space-y-4">
              <p
                class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]"
              >
                Early access
              </p>
              <h2
                class="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
              >
                Be first to know when MixDroid ships.
              </h2>
              <p class="max-w-2xl text-base leading-8 text-[var(--text-muted)]">
                Drop your email and we'll reach out when the app is ready for
                release — including beta access, technical previews, and launch
                pricing for early supporters.
              </p>
              <ul class="space-y-2 text-sm text-[var(--text-muted)]">
                <li class="flex items-center gap-2">
                  <span class="text-[var(--accent-cyan)]">→</span>
                  Beta access before public launch
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-[var(--accent-cyan)]">→</span>
                  Technical previews and DSP deep-dives
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-[var(--accent-cyan)]">→</span>
                  Early supporter pricing
                </li>
              </ul>
            </div>

            <div class="console-panel rounded-xl p-5 sm:p-6">
              <form class="space-y-4" @submit.prevent="joinWaitlist">
                <label class="block">
                  <span
                    class="mb-2 block font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-dim)]"
                  >
                    Your email
                  </span>
                  <UInput
                    v-model="email"
                    type="email"
                    size="xl"
                    variant="outline"
                    placeholder="you@yourshow.com"
                    class="w-full"
                    :ui="{
                      base: 'rounded-md bg-black/30 border-white/12 text-white placeholder:text-slate-500',
                    }"
                  />
                </label>

                <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <UButton
                    type="submit"
                    size="lg"
                    color="primary"
                    class="rounded-md px-5"
                    :loading="loading"
                  >
                    Get early access
                  </UButton>

                  <p class="text-sm text-[var(--text-dim)]">
                    No spam. Launch updates only.
                  </p>
                </div>

                <p
                  v-if="submitted"
                  class="text-sm font-medium text-[var(--accent-cyan)]"
                >
                  ✓ You're on the list. We'll be in touch before launch.
                </p>

                <p
                  v-else-if="errorMessage"
                  class="text-sm font-medium text-[var(--warning-pink)]"
                >
                  {{ errorMessage }}
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />

    <!-- ── Image modal ────────────────────────────────────────────────────── -->
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
          v-if="isImageModalOpen"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          style="background: rgba(8, 8, 12, 0.96); backdrop-filter: blur(6px)"
          @click.self="isImageModalOpen = false"
        >
          <!-- modal card — clicks here don't propagate to the backdrop -->
          <div
            class="relative w-full max-w-6xl rounded-xl border border-[var(--panel-line)] bg-[var(--panel-bg)] shadow-[0_0_60px_rgba(0,0,0,0.6)]"
            @click.stop
          >
            <!-- zoomable image wrapper -->
            <div
              class="overflow-auto rounded-t-xl"
              style="max-height: 78vh; cursor: zoom-in"
              @click="modalZoomed = !modalZoomed"
            >
              <img
                v-if="selectedImage"
                :src="selectedImage.src"
                :alt="selectedImage.alt"
                :class="[
                  'block rounded-t-xl transition-all duration-300 ease-in-out',
                  modalZoomed
                    ? 'w-[180%] max-w-none cursor-zoom-out'
                    : 'w-full cursor-zoom-in object-contain',
                ]"
              />
            </div>

            <!-- caption -->
            <div
              v-if="selectedImage"
              class="flex items-start justify-between gap-4 border-t border-[var(--panel-line)] px-5 py-4"
            >
              <div>
                <p class="text-sm font-semibold text-white">
                  {{ selectedImage.alt }}
                </p>
                <p
                  class="mt-1 whitespace-pre-line text-sm leading-6 text-[var(--text-muted)]"
                >
                  {{ selectedImage.caption }}
                </p>
              </div>
              <p
                class="shrink-0 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--text-dim)]"
              >
                {{ modalZoomed ? "Click to fit" : "Click to zoom" }}
              </p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
