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
  caption: "Early concept render modelled in Blender — not the final hardware. The production design is in progress.",
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
      fetchError?.data?.statusMessage ?? "Something went wrong. Please try again.";
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
      fetchError?.data?.statusMessage ?? "Something went wrong. Please try again.";
  } finally {
    heroLoading.value = false;
  }
}

useSeoMeta({
  title: "MixDroid — Android Mixer for Podcasters, Streamers & Musicians",
  description:
    "MixDroid is a standalone Android mixer with real-time DSP effects, live streaming, recording, and internet radio. No laptop. No subscriptions. Built for podcasters, streamers, musicians, and content creators.",
  ogTitle: "MixDroid — Android Mixer for Podcasters, Streamers & Musicians",
  ogDescription:
    "Real-time DSP, streaming, recording, and radio — all on Android. No laptop required. Built solo over 7 years.",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div class="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)]">
    <AppNav />
    <main>

      <!-- ── Social proof bar -->
      <!-- <section class="border-b border-white/8 bg-[var(--panel-bg)]">
        <div class="mx-auto max-w-7xl px-6 py-3 sm:px-8 lg:px-10">
          <div class="flex flex-wrap items-center justify-between gap-3">

            <div class="flex flex-wrap items-center gap-x-5 gap-y-2"> -->

              <!-- Reddit logo (shared) -->
              <!-- <svg class="hidden" width="0" height="0">
                <symbol id="reddit-icon" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="10" fill="#FF4500"/>
                  <path d="M16.67 10a1.46 1.46 0 0 0-2.47-1 7.12 7.12 0 0 0-3.85-1.23l.65-3.07 2.13.45a1 1 0 1 0 .07-.93l-2.38-.5a.25.25 0 0 0-.29.19l-.73 3.43a7.14 7.14 0 0 0-3.89 1.24 1.46 1.46 0 1 0-1.61 2.39 2.87 2.87 0 0 0 0 .44c0 2.24 2.61 4.06 5.83 4.06s5.83-1.82 5.83-4.06a2.87 2.87 0 0 0 0-.44 1.46 1.46 0 0 0 .61-1.97zM7.27 11a1 1 0 1 1 1 1 1 1 0 0 1-1-1zm5.59 2.71a3.58 3.58 0 0 1-2.86.8 3.58 3.58 0 0 1-2.86-.8.25.25 0 0 1 .35-.35 3.13 3.13 0 0 0 2.51.65 3.13 3.13 0 0 0 2.51-.65.25.25 0 0 1 .35.35zm-.22-1.71a1 1 0 1 1 1-1 1 1 0 0 1-1 1z" fill="white"/>
                </symbol>
              </svg> -->

              <!--
                ── Reddit posts — update stats manually after each post ──────
                Duplicate the <a> block below to add more posts.
                fields: subreddit, url, stat (views / upvotes), label
              -->

              <!-- Post 1: r/buildinpublic -->
              <!-- <a
                href="https://www.reddit.com/r/buildinpublic/comments/1t7b01l/7_years_ago_i_started_building_a_mixer_in_my/"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 transition hover:opacity-80"
              >
                <svg width="15" height="15"><use href="#reddit-icon"/></svg>
                <span class="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-dim)]">r/buildinpublic</span>
                <span class="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-secondary)]">1.5k views · 7 upvotes</span>
              </a>

              <div class="h-3 w-px bg-white/10" /> -->

              <!-- Post 2: add your r/SideProject post here once live -->
              <!-- <a
                href="https://reddit.com/r/SideProject/..."
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 transition hover:opacity-80"
              >
                <svg width="15" height="15"><use href="#reddit-icon"/></svg>
                <span class="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-dim)]">r/SideProject</span>
                <span class="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-secondary)]">— views · — upvotes</span>
              </a>
              <div class="h-3 w-px bg-white/10" /> -->

              <!-- <span class="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-dim)] italic">
                "7 years ago I started building a mixer in my bedroom"
              </span>

            </div> -->

            <!-- Pulsing live badge -->
            <!-- <div class="flex items-center gap-2">
              <span class="relative flex h-2 w-2">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-cyan)] opacity-60" />
                <span class="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-cyan)]" />
              </span>
              <span class="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-dim)]">
                Early access open
              </span>
            </div>

          </div>
        </div>
      </section> -->

      <!-- ── Hero -->
      <section class="border-b border-white/8">
        <div
          class="mx-auto max-w-7xl grid gap-12 px-6 py-14 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:px-10 lg:py-20"
        >
          <div class="space-y-8">
            <div class="space-y-5">
              <div class="flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-dim)]">
                <span class="panel-chip">Podcasters</span>
                <span class="panel-chip">Streamers</span>
                <span class="panel-chip">Content creators</span>
                <span class="panel-chip">Musicians</span>
              </div>

              <div class="space-y-4">
                <h1 class="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Professional mixing on Android. No laptop required.
                </h1>

                <p class="max-w-xl text-lg leading-8 text-[var(--text-muted)]">
                  A full mixer, DSP chain, and streaming setup — running
                  standalone on Android. No laptop, no Google account, no
                  subscriptions. Built solo over 7 years.
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
                    placeholder="enter your email"
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
                <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-cyan)]">
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
              <p class="shrink-0 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--text-dim)]">
                Click to expand
              </p>
            </div>
          </button>
        </div>
      </section>

      <!-- ── Explainer -->
      <section class="border-b border-white/8">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">

          <!-- Three-column cards -->
          <div class="grid gap-5 md:grid-cols-3">

            <!-- What is it -->
            <div class="console-panel rounded-xl p-6 space-y-4">
              <div class="flex items-center gap-3">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[var(--panel-line)] bg-[var(--panel-bg-strong)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2" stroke-linecap="round">
                    <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
                  </svg>
                </div>
                <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">
                  What is it?
                </p>
              </div>
              <h3 class="text-xl font-semibold text-white">
                A professional audio mixer — running on Android.
              </h3>
              <p class="text-sm leading-7 text-[var(--text-muted)]">
                MixDroid is a full digital mixing console on a standalone Android
                device. Think of every knob, fader, and effect you'd find in a
                studio — EQ, compression, reverb, delay — running natively on
                hardware you can hold in your hands. No laptop, no audio interface
                driver hell, no subscription unlocking the features you actually need.
              </p>
            </div>

            <!-- Why it's interesting -->
            <div class="console-panel rounded-xl p-6 space-y-4">
              <div class="flex items-center gap-3">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[var(--panel-line)] bg-[var(--panel-bg-strong)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2" stroke-linecap="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                </div>
                <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">
                  Why it's interesting
                </p>
              </div>
              <h3 class="text-xl font-semibold text-white">
                Your whole studio in one device.
              </h3>
              <p class="text-sm leading-7 text-[var(--text-muted)]">
                Podcasters can walk into any room and be live in under two minutes.
                Streamers get a hardware mixer without the hardware price tag.
                Musicians get real DSP — not a mobile app pretending to be one.
                And because it runs Android, you can install apps, browse the web,
                and manage your content workflow all from the same screen you're
                mixing on.
              </p>
            </div>

            <!-- Why it's different -->
            <div class="console-panel rounded-xl p-6 space-y-4">
              <div class="flex items-center gap-3">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[var(--panel-line)] bg-[var(--panel-bg-strong)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2" stroke-linecap="round">
                    <path d="M12 2l3.1 6.3L22 9.3l-5 4.9 1.2 6.9L12 18l-6.2 3.1L7 14.2 2 9.3l6.9-1L12 2z"/>
                  </svg>
                </div>
                <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">
                  Why MixDroid is different
                </p>
              </div>
              <h3 class="text-xl font-semibold text-white">
                Not a port. Not a companion app. The whole thing.
              </h3>
              <ul class="space-y-3">
                <li class="flex items-start gap-3 text-sm leading-6 text-[var(--text-muted)]">
                  <span class="mt-1 shrink-0 text-[var(--accent-cyan)]">→</span>
                  <span><span class="font-medium text-[var(--text-secondary)]">Android ecosystem inside the mixer.</span> Install F-Droid, NewPipe, Kodi, or any open-source app. Request custom tools built for your workflow.</span>
                </li>
                <li class="flex items-start gap-3 text-sm leading-6 text-[var(--text-muted)]">
                  <span class="mt-1 shrink-0 text-[var(--accent-cyan)]">→</span>
                  <span><span class="font-medium text-[var(--text-secondary)]">Truly standalone.</span> No laptop in the chain. No cloud round-trips. DSP runs on-device with near-zero latency whether you're online or not.</span>
                </li>
                <li class="flex items-start gap-3 text-sm leading-6 text-[var(--text-muted)]">
                  <span class="mt-1 shrink-0 text-[var(--accent-cyan)]">→</span>
                  <span><span class="font-medium text-[var(--text-secondary)]">Flexible routing + professional DSP.</span> Per-channel effects chain, sidechain compression, multi-interface routing — the controls you'd expect from a desktop DAW, not a mobile app.</span>
                </li>
                <li class="flex items-start gap-3 text-sm leading-6 text-[var(--text-muted)]">
                  <span class="mt-1 shrink-0 text-[var(--accent-cyan)]">→</span>
                  <span><span class="font-medium text-[var(--text-secondary)]">No Google, anywhere.</span> No Google account, no Play Store, no Firebase, no telemetry. MixDroid is distributed outside Google's ecosystem entirely — you own the install, and nothing phones home.</span>
                </li>
                <li class="flex items-start gap-3 text-sm leading-6 text-[var(--text-muted)]">
                  <span class="mt-1 shrink-0 text-[var(--accent-cyan)]">→</span>
                  <span><span class="font-medium text-[var(--text-secondary)]">No subscriptions, ever.</span> One device. Everything included. No feature locked behind a plan.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      <!-- ── Video -->
      <section class="border-b border-white/8">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="mb-8 space-y-3">
            <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">
              See it in action
            </p>
            <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Watch the mixer run.
            </h2>
            <p class="max-w-2xl text-base leading-7 text-[var(--text-muted)]">
              Real-time EQ, compression, and streaming — running standalone on
              Android. No laptop anywhere in the signal chain.
            </p>
          </div>

          <!--
            ── Video slot ───────────────────────────────────────────────────
            Option A — YouTube embed (recommended):
              Replace the placeholder div below with:
              <div class="aspect-video w-full overflow-hidden rounded-xl border border-[var(--panel-line)]">
                <iframe
                  class="h-full w-full"
                  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                  title="MixDroid demo"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                />
              </div>

            Option B — self-hosted video file (e.g. /videos/demo.mp4):
              <video
                class="w-full rounded-xl border border-[var(--panel-line)]"
                controls
                preload="none"
                poster="/images/video-poster.jpg"
              >
                <source src="/videos/demo.mp4" type="video/mp4" />
              </video>
          -->

          <!-- Placeholder — remove this block once video is ready -->
          <div
            class="console-panel flex aspect-video w-full flex-col items-center justify-center gap-4 rounded-xl border-dashed"
          >
            <div class="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--panel-line)] bg-[var(--panel-bg-strong)]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <polygon points="6,3 20,12 6,21" fill="var(--accent-cyan)" opacity="0.85"/>
              </svg>
            </div>
            <div class="text-center">
              <p class="text-sm font-medium text-[var(--text-secondary)]">Demo video coming soon</p>
              <!-- <p class="mt-1 text-sm text-[var(--text-dim)]">
                Screen recording of the mixer, EQ, and live stream in action
              </p> -->
            </div>
          </div>

        </div>
      </section>

      <!-- ── Features ───────────────────────────────────────────────────── -->
      <section class="border-b border-white/8">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="mb-10 space-y-3">
            <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">
              What's inside
            </p>
            <h2 class="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
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
              <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--warning-pink)]">
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
            <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div class="space-y-3">
                <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">
                  Every module documented
                </p>
                <h2 class="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Parametric EQ. Compressor. Limiter. Reverb. Delay. Spectrum. More.
                </h2>
                <p class="max-w-xl text-base leading-7 text-[var(--text-muted)]">
                  Every screen, every control, every parameter — documented with
                  real screenshots from the app. See exactly what you're getting
                  before the app ships.
                </p>
              </div>
              <NuxtLink
                to="/features"
                class="shrink-0 rounded-md bg-[var(--accent-cyan)] px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
              >
                See all features →
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Screens / DSP showcase ─────────────────────────────────────── -->
      <section class="border-b border-white/8">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="mb-8 max-w-3xl space-y-4">
            <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">
              DSP screens
            </p>
            <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
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
                  <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-cyan)]">
                    Screen {{ index + 1 }}
                  </p>
                  <p class="text-lg font-medium text-white">
                    {{ image.alt }}
                  </p>
                  <p class="whitespace-pre-line text-sm leading-7 text-[var(--text-muted)]">
                    {{ image.caption }}
                  </p>
                  <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--text-dim)]">
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
              <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">
                The backstory
              </p>
              <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                7 years. One developer. Built from Lebanon.
              </h2>
              <p class="text-base leading-8 text-[var(--text-muted)]">
                MixDroid started as a personal frustration — why does professional
                audio mixing still need a laptop? After 7 years of solo
                development, the answer is an Android-native mixer that covers
                the full workflow: DSP processing, live streaming, recording, and
                internet radio, completely offline if needed.
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
          <div class="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div class="space-y-4">
              <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">
                Early access
              </p>
              <h2 class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
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
                    placeholder="enter your email"
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
          style="background: rgba(8, 8, 12, 0.96); backdrop-filter: blur(6px);"
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
              style="max-height: 78vh; cursor: zoom-in;"
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
                <p class="text-sm font-semibold text-white">{{ selectedImage.alt }}</p>
                <p class="mt-1 whitespace-pre-line text-sm leading-6 text-[var(--text-muted)]">
                  {{ selectedImage.caption }}
                </p>
              </div>
              <p class="shrink-0 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--text-dim)]">
                {{ modalZoomed ? 'Click to fit' : 'Click to zoom' }}
              </p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>