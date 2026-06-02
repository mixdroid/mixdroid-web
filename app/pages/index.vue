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

const heroEmail = ref("");
const heroLoading = ref(false);
const heroSubmitted = ref(false);
const heroError = ref("");
const selectedImage = ref<ShowcaseImage | null>(null);
const isImageModalOpen = ref(false);
const modalZoomed = ref(false);

// Hero image — Blender render moved out of hero, used in DSP showcase only
const heroImage: ShowcaseImage = {
  src: "/images/Mixer.jpg",
  alt: "MixDroid hardware concept render",
  caption: "Early concept render — not the final hardware design.",
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
    alt: "Parametric EQ screen",
    caption: `• 5 bands with full parametric control.
• Pre-gain and per-band solo.
• ±24 dB gain, Q-factor 0.707–1.8.
• 20 Hz–20 kHz frequency response.
• 8192-bin FFT spectrum analyzer.
• LowPass, HighPass, BandPass, Notch, AllPass, Peaking, LowShelf, HighShelf.`,
  },
  {
    src: "/images/compressor.png",
    alt: "Stereo Compressor screen",
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

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MixDroid",
  operatingSystem: "Android",
  applicationCategory: "MultimediaApplication",
  description:
    "Standalone Android mixer with real-time DSP effects, live streaming, recording, and internet radio. No laptop required.",
  url: "https://mixdroid-web.vercel.app",
  author: {
    "@type": "Person",
    name: "Joe Kaikaty",
    url: "https://mixdroid-web.vercel.app/about",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free to join the waitlist. No payment required.",
  },
};

useSeoMeta({
  title: "MixDroid | Android Mixer for Podcasters & Streamers",
  description:
    "MixDroid is a standalone Android mixer with real-time DSP, live streaming, and recording. No laptop. No subscriptions.",
  ogTitle: "MixDroid | Android Mixer for Podcasters & Streamers",
  ogDescription:
    "Real-time DSP, streaming, recording, and radio — all on Android. No laptop required. Built solo over 7 years.",
  twitterCard: "summary_large_image",
});

useHead({
  link: [
    { rel: "canonical", href: "https://mixdroid-web.vercel.app/" },
    {
      rel: "preload",
      as: "image",
      href: "/images/Screenshot_20260402_091916.png",
    },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(jsonLd),
    },
  ],
});
</script>

<template>
  <div class="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)]">
    <AppNav />
    <main id="main-content">
      <!-- ── Hero -->
      <!-- Mobile: stacked so H1 + form are above the fold (no image pushed up) -->
      <section class="border-b border-white/8" aria-labelledby="hero-heading">
        <div
          class="mx-auto max-w-7xl grid gap-10 px-6 py-10 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:px-10 lg:py-20"
        >
          <!-- Left: headline + form — always on top on mobile -->
          <div class="flex flex-col gap-6">
            <!-- Headline block -->
            <div class="space-y-4">
              <h1
                id="hero-heading"
                class="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                Professional mixing on Android.<br class="hidden sm:block" />
                No laptop required.
              </h1>

              <p
                class="max-w-prose text-base leading-7 text-[var(--text-muted)] sm:text-lg sm:leading-8"
              >
                Studio-grade DSP, live streaming, and recording — on your
                existing Android device. Zero latency, zero subscriptions, zero
                Google dependencies.
              </p>

              <!-- Audience chips — below H1 so it's not the first fixation -->
              <div
                class="flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-dim)]"
              >
                <span class="panel-chip">Podcasters</span>
                <span class="panel-chip">Streamers</span>
                <span class="panel-chip">Musicians</span>
                <span class="panel-chip">Content creators</span>
              </div>
            </div>

            <!-- Hero email capture — visible above fold on mobile -->
            <div class="space-y-3">
              <!-- Credibility line adjacent to form -->
              <p class="text-sm text-[var(--text-muted)]">
                <span class="font-medium text-[var(--text-secondary)]"
                  >7 years in development.</span
                >
                Built solo in Lebanon. Beta coming soon.
              </p>

              <div role="group" aria-labelledby="hero-form-label">
                <p id="hero-form-label" class="sr-only">
                  Join the MixDroid early access waitlist
                </p>
                <form
                  class="flex flex-col gap-3 sm:flex-row sm:items-end"
                  @submit.prevent="heroJoinWaitlist"
                >
                  <div class="flex-1">
                    <label
                      for="hero-email"
                      class="mb-1.5 block font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-dim)]"
                    >
                      Email address
                    </label>
                    <UInput
                      id="hero-email"
                      v-model="heroEmail"
                      type="email"
                      autocomplete="email"
                      size="xl"
                      variant="outline"
                      placeholder="you@example.com"
                      class="w-full"
                      :ui="{
                        base: 'rounded-md bg-black/30 border-white/12 text-white placeholder:text-slate-500 min-h-[44px]',
                      }"
                    />
                  </div>
                  <UButton
                    type="submit"
                    size="xl"
                    color="primary"
                    class="min-h-[44px] shrink-0 rounded-md px-6 font-semibold"
                    :loading="heroLoading"
                  >
                    Get early access
                  </UButton>
                </form>
              </div>

              <p
                v-if="heroSubmitted"
                class="text-sm font-medium text-[var(--accent-cyan)]"
                role="status"
              >
                ✓ You're on the list. We'll be in touch before launch.
              </p>
              <p
                v-else-if="heroError"
                class="text-sm font-medium text-[var(--warning-pink)]"
                role="alert"
              >
                {{ heroError }}
              </p>
              <p v-else class="text-sm text-[var(--text-dim)]">
                Free to join. No payment required. No spam — launch updates
                only.
              </p>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-3">
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
                <p class="console-stat__value">Android</p>
              </div>
            </div>
          </div>

          <!-- Right: app screenshot (hidden on mobile so form stays above fold) -->
          <div class="hidden lg:block">
            <button
              type="button"
              aria-label="Open full-size EQ screenshot"
              class="group w-full rounded-xl border border-[var(--panel-line)] bg-[var(--panel-bg)] p-4 text-left transition hover:border-[var(--accent-cyan)]/45 hover:shadow-[0_0_32px_rgba(0,229,255,0.08)]"
              @click="openImage(heroImage)"
            >
              <div class="mb-3 flex items-center justify-between gap-4">
                <p
                  class="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-cyan)]"
                >
                  {{ heroImage.alt }}
                </p>
                <div class="meter-stack" aria-hidden="true">
                  <span /><span /><span /><span />
                </div>
              </div>
              <img
                src="/images/Mixer.jpg"
                alt="Early concept render — not the final hardware design."
                width="1024"
                height="600"
                fetchpriority="high"
                class="aspect-[1024/600] w-full rounded-lg border border-white/10 bg-black object-cover transition group-hover:scale-[1.01]"
              />
              <p
                class="mt-2 text-right font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--text-dim)]"
              >
                Tap to expand ↗
              </p>
            </button>
          </div>
        </div>
      </section>

      <!-- ── Video -->
      <section class="border-b border-white/8" aria-labelledby="video-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="mb-8 space-y-3">
            <p
              class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]"
            >
              See it in action
            </p>
            <h2
              id="video-heading"
              class="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              Watch the mixer run.
            </h2>
            <p class="max-w-prose text-base leading-7 text-[var(--text-muted)]">
              Real-time EQ, compression, and streaming — running standalone on
              Android. No laptop anywhere in the signal chain.
            </p>
          </div>

          <div
            class="aspect-video w-full overflow-hidden rounded-xl border border-[var(--panel-line)]"
          >
            <iframe
              class="h-full w-full"
              src="https://www.youtube.com/embed/QNN6lykvKOQ"
              title="MixDroid demo — standalone Android mixer"
              frameborder="0"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
        </div>
      </section>

      <!-- ── Explainer -->
      <section
        class="border-b border-white/8"
        aria-labelledby="explainer-heading"
      >
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <h2 id="explainer-heading" class="sr-only">What is MixDroid</h2>
          <div class="grid gap-5 md:grid-cols-3">
            <!-- What is it -->
            <div class="console-panel rounded-xl p-6 space-y-4">
              <div class="flex items-center gap-3">
                <div
                  class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[var(--panel-line)] bg-[var(--panel-bg-strong)]"
                  aria-hidden="true"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent-cyan)"
                    stroke-width="2"
                    stroke-linecap="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4m0 4h.01" />
                  </svg>
                </div>
                <p
                  class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]"
                >
                  What is it?
                </p>
              </div>
              <h3 class="text-xl font-semibold text-white">
                A professional audio mixer — running on Android.
              </h3>
              <p class="max-w-prose text-sm leading-7 text-[var(--text-muted)]">
                MixDroid is a full digital mixing console on a standalone
                Android device. Every knob, fader, and effect you'd find in a
                studio — EQ, compression, reverb, delay — running natively. No
                laptop, no audio interface driver hell, no subscription
                unlocking features you need.
              </p>
            </div>

            <!-- Why it's interesting -->
            <div class="console-panel rounded-xl p-6 space-y-4">
              <div class="flex items-center gap-3">
                <div
                  class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[var(--panel-line)] bg-[var(--panel-bg-strong)]"
                  aria-hidden="true"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent-cyan)"
                    stroke-width="2"
                    stroke-linecap="round"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <p
                  class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]"
                >
                  Why it's interesting
                </p>
              </div>
              <h3 class="text-xl font-semibold text-white">
                Your whole studio in one device.
              </h3>
              <p class="max-w-prose text-sm leading-7 text-[var(--text-muted)]">
                Podcasters can walk into any room and be live in two minutes.
                Streamers get a hardware mixer without the hardware price tag.
                Musicians get real DSP — not a mobile app pretending to be one.
                Because it runs Android, you can install apps and manage your
                content workflow from the same screen you're mixing on.
              </p>
            </div>

            <!-- Why it's different -->
            <div class="console-panel rounded-xl p-6 space-y-4">
              <div class="flex items-center gap-3">
                <div
                  class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[var(--panel-line)] bg-[var(--panel-bg-strong)]"
                  aria-hidden="true"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--accent-cyan)"
                    stroke-width="2"
                    stroke-linecap="round"
                  >
                    <path
                      d="M12 2l3.1 6.3L22 9.3l-5 4.9 1.2 6.9L12 18l-6.2 3.1L7 14.2 2 9.3l6.9-1L12 2z"
                    />
                  </svg>
                </div>
                <p
                  class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]"
                >
                  Why MixDroid is different
                </p>
              </div>
              <h3 class="text-xl font-semibold text-white">
                Not a port. Not a companion app. The whole thing.
              </h3>
              <ul class="space-y-3" role="list">
                <li
                  class="flex items-start gap-3 text-sm leading-6 text-[var(--text-muted)]"
                >
                  <span
                    class="mt-1 shrink-0 text-[var(--accent-cyan)]"
                    aria-hidden="true"
                    >→</span
                  >
                  <span
                    ><span class="font-medium text-[var(--text-secondary)]"
                      >Android ecosystem inside the mixer.</span
                    >
                    Install F-Droid, NewPipe, Kodi, or request custom tools
                    built for your workflow.</span
                  >
                </li>
                <li
                  class="flex items-start gap-3 text-sm leading-6 text-[var(--text-muted)]"
                >
                  <span
                    class="mt-1 shrink-0 text-[var(--accent-cyan)]"
                    aria-hidden="true"
                    >→</span
                  >
                  <span
                    ><span class="font-medium text-[var(--text-secondary)]"
                      >Truly standalone.</span
                    >
                    No laptop, no cloud round-trips. DSP runs on-device whether
                    you're online or not.</span
                  >
                </li>
                <li
                  class="flex items-start gap-3 text-sm leading-6 text-[var(--text-muted)]"
                >
                  <span
                    class="mt-1 shrink-0 text-[var(--accent-cyan)]"
                    aria-hidden="true"
                    >→</span
                  >
                  <span
                    ><span class="font-medium text-[var(--text-secondary)]"
                      >Flexible routing + professional DSP.</span
                    >
                    Per-channel effects chain, sidechain compression,
                    multi-interface routing — desktop DAW controls, not a mobile
                    app.</span
                  >
                </li>
                <li
                  class="flex items-start gap-3 text-sm leading-6 text-[var(--text-muted)]"
                >
                  <span
                    class="mt-1 shrink-0 text-[var(--accent-cyan)]"
                    aria-hidden="true"
                    >→</span
                  >
                  <span
                    ><span class="font-medium text-[var(--text-secondary)]"
                      >No Google, anywhere.</span
                    >
                    No account, no Play Store, no Firebase, no telemetry.
                    Distributed outside Google's ecosystem entirely.</span
                  >
                </li>
                <li
                  class="flex items-start gap-3 text-sm leading-6 text-[var(--text-muted)]"
                >
                  <span
                    class="mt-1 shrink-0 text-[var(--accent-cyan)]"
                    aria-hidden="true"
                    >→</span
                  >
                  <span
                    ><span class="font-medium text-[var(--text-secondary)]"
                      >No subscriptions, ever.</span
                    >
                    One device. Everything included. No feature locked behind a
                    plan.</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <!-- ── Features -->
      <section
        class="border-b border-white/8"
        aria-labelledby="features-heading"
      >
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="mb-10 space-y-3">
            <p
              class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]"
            >
              What's inside
            </p>
            <h2
              id="features-heading"
              class="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              Everything a content creator needs. Nothing they don't.
            </h2>
            <p class="max-w-prose text-base leading-7 text-[var(--text-muted)]">
              MixDroid ships with the tools that matter for real shows — built
              tight, no bloat, no upsells hiding features behind a paywall.
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
                aria-hidden="true"
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

      <!-- ── See all features -->
      <section class="border-b border-white/8">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="console-panel rounded-xl p-6 sm:p-10">
            <div
              class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
            >
              <div class="space-y-3">
                <p
                  class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]"
                >
                  Every module documented
                </p>
                <h2
                  class="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
                >
                  Parametric EQ. Compressor. Limiter. Reverb. Delay. Spectrum.
                  More.
                </h2>
                <p
                  class="max-w-prose text-base leading-7 text-[var(--text-muted)]"
                >
                  Every screen, every control, every parameter — documented with
                  real screenshots from the app. See exactly what you're getting
                  before it ships.
                </p>
              </div>
              <NuxtLink
                to="/features"
                class="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-md bg-[var(--accent-cyan)] px-6 text-sm font-semibold text-black transition hover:opacity-90"
              >
                See all features →
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- ── DSP screens -->
      <section
        class="border-b border-white/8"
        aria-labelledby="screens-heading"
      >
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="mb-8 max-w-3xl space-y-4">
            <p
              class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]"
            >
              DSP screens
            </p>
            <h2
              id="screens-heading"
              class="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            >
              Professional-grade processing, built for Android.
            </h2>
            <p class="max-w-prose text-base leading-8 text-[var(--text-muted)]">
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
              :aria-label="`Open full-size screenshot: ${image.alt}`"
              class="console-panel group w-full rounded-xl p-4 text-left transition hover:border-[var(--accent-cyan)]/45 hover:shadow-[0_0_26px_rgba(0,229,255,0.07)]"
              @click="openImage(image)"
            >
              <div
                class="flex flex-col gap-5 lg:items-center"
                :class="index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'"
              >
                <div class="w-full lg:flex-1">
                  <img
                    :src="image.src"
                    :alt="image.alt"
                    width="1024"
                    height="600"
                    loading="lazy"
                    class="aspect-[1024/600] w-full rounded-lg border border-white/10 bg-black object-cover transition group-hover:scale-[1.01]"
                  />
                </div>
                <div class="w-full space-y-3 lg:w-80 lg:shrink-0">
                  <p
                    class="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-cyan)]"
                  >
                    Screen {{ index + 1 }}
                  </p>
                  <p class="text-lg font-medium text-white">{{ image.alt }}</p>
                  <p
                    class="whitespace-pre-line text-sm leading-7 text-[var(--text-muted)]"
                  >
                    {{ image.caption }}
                  </p>
                  <p
                    class="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-dim)]"
                  >
                    Tap to expand ↗
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      <!-- ── Story -->
      <section class="border-b border-white/8" aria-labelledby="story-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div class="space-y-4">
              <p
                class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]"
              >
                The backstory
              </p>
              <h2
                id="story-heading"
                class="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
              >
                7 years. One developer. Built from Lebanon.
              </h2>
              <p
                class="max-w-prose text-base leading-8 text-[var(--text-muted)]"
              >
                MixDroid started as a personal frustration — why does
                professional audio mixing still need a laptop? After 7 years of
                solo development, the answer is an Android-native mixer that
                covers the full workflow: DSP processing, live streaming,
                recording, and internet radio, completely offline if needed.
              </p>
              <p
                class="max-w-prose text-base leading-8 text-[var(--text-muted)]"
              >
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

      <!-- ── Waitlist -->
      <section aria-labelledby="waitlist-heading">
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
                id="waitlist-heading"
                class="text-3xl font-semibold tracking-tight text-white sm:text-4xl"
              >
                Be first to know when MixDroid ships.
              </h2>
              <p
                class="max-w-prose text-base leading-8 text-[var(--text-muted)]"
              >
                Drop your email and we'll reach out when the app is ready —
                including beta access, technical previews, and launch pricing
                for early supporters.
              </p>
              <ul
                class="space-y-2 text-sm text-[var(--text-muted)]"
                role="list"
              >
                <li class="flex items-center gap-2">
                  <span class="text-[var(--accent-cyan)]" aria-hidden="true"
                    >→</span
                  >
                  Beta access before public launch
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-[var(--accent-cyan)]" aria-hidden="true"
                    >→</span
                  >
                  Technical previews and DSP deep-dives
                </li>
                <li class="flex items-center gap-2">
                  <span class="text-[var(--accent-cyan)]" aria-hidden="true"
                    >→</span
                  >
                  Early supporter pricing
                </li>
              </ul>
            </div>

            <div class="console-panel rounded-xl p-5 sm:p-6">
              <form class="space-y-4" @submit.prevent="joinWaitlist">
                <div>
                  <label
                    for="waitlist-email"
                    class="mb-2 block font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-dim)]"
                  >
                    Email address
                  </label>
                  <UInput
                    id="waitlist-email"
                    v-model="email"
                    type="email"
                    autocomplete="email"
                    size="xl"
                    variant="outline"
                    placeholder="you@example.com"
                    class="w-full"
                    :ui="{
                      base: 'rounded-md bg-black/30 border-white/12 text-white placeholder:text-slate-500 min-h-[44px]',
                    }"
                  />
                </div>

                <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <UButton
                    type="submit"
                    size="lg"
                    color="primary"
                    class="min-h-[44px] rounded-md px-5 font-semibold"
                    :loading="loading"
                  >
                    Get early access
                  </UButton>
                  <p class="text-sm text-[var(--text-dim)]">
                    Free to join. No payment required.
                  </p>
                </div>

                <p
                  v-if="submitted"
                  class="text-sm font-medium text-[var(--accent-cyan)]"
                  role="status"
                >
                  ✓ You're on the list. We'll be in touch before launch.
                </p>
                <p
                  v-else-if="errorMessage"
                  class="text-sm font-medium text-[var(--warning-pink)]"
                  role="alert"
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
          v-if="isImageModalOpen"
          class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-8"
          style="background: rgba(8, 8, 12, 0.96); backdrop-filter: blur(6px)"
          role="dialog"
          aria-modal="true"
          :aria-label="selectedImage?.alt"
          @click.self="isImageModalOpen = false"
        >
          <div
            class="relative my-auto w-full max-w-4xl rounded-xl border border-[var(--panel-line)] bg-[var(--panel-bg)] shadow-[0_0_60px_rgba(0,0,0,0.6)]"
            @click.stop
          >
            <div
              class="overflow-auto rounded-t-xl"
              style="max-height: 70vh"
              @click="modalZoomed = !modalZoomed"
            >
              <img
                v-if="selectedImage"
                :src="selectedImage.src"
                :alt="selectedImage.alt"
                :class="[
                  'block rounded-t-xl transition-all duration-300 ease-in-out',
                  modalZoomed
                    ? 'w-[200%] max-w-none cursor-zoom-out'
                    : 'w-full cursor-zoom-in object-contain',
                ]"
              />
            </div>
            <div
              v-if="selectedImage"
              class="flex flex-col gap-3 border-t border-[var(--panel-line)] px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4 sm:px-5"
            >
              <div class="min-w-0">
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