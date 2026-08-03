<script setup lang="ts">
import { track } from "@vercel/analytics";

interface ShowcaseImage {
  src: string;
  alt: string;
  caption: string;
}

const email = ref("");
const loading = ref(false);
const submitted = ref(false);
const errorMessage = ref("");

const selectedImage = ref<ShowcaseImage | null>(null);
const isImageModalOpen = ref(false);
const modalZoomed = ref(false);

// Single source of truth for the Discord invite — only one URL was found
// across the project files reviewed (previously duplicated in copy only,
// never actually a second distinct invite). Reused in the footer too.
const DISCORD_URL = "https://discord.gg/3HFtyBgRv";

const heroImage: ShowcaseImage = {
  src: "/images/Mixer.jpg",
  alt: "MixDroid — working hardware prototype, production design in progress",
  caption: "",
};

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
    await $fetch("/api/waitlist", { method: "POST", body: { email: email.value } });
    submitted.value = true;
    email.value = "";

    // Vercel Analytics — custom conversion event (module is already installed/registered)
    track("waitlist_signup");

    // GA4 — only fires if a gtag() is already loaded on the page (e.g. via GTM
    // or a manually-added GA script). No GA4 script was found in the project
    // files reviewed, so this is a safe no-op until GA4 is actually wired up.
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "waitlist_signup", {
        method: "email",
      });
    }
  } catch (error: unknown) {
    const fetchError = error as { data?: { statusMessage?: string } };
    errorMessage.value =
      fetchError?.data?.statusMessage ?? "Something went wrong. Please try again.";
  } finally {
    loading.value = false;
  }
}

// ── Proof strip ─────────────────────────────────────────────────────────
const proofItems = [
  "8-channel audio I/O",
  "Real-time DSP",
  "Touchscreen control",
  "Flexible routing",
  "Recording",
  "Streaming",
];

// ── Audience cards ──────────────────────────────────────────────────────
const audiences = [
  {
    title: "Podcasters",
    detail: "Mix multiple microphones, process voices, and record your production directly from the device.",
  },
  {
    title: "Live sound",
    detail: "Build and control a portable digital mixing workflow without bringing a computer to every setup.",
  },
  {
    title: "Musicians",
    detail: "Monitor, process, and record instruments with built-in mixing and DSP.",
  },
  {
    title: "Streamers & creators",
    detail: "Combine microphones, media, and external sources into a processed mix for live content.",
  },
];

// ── Key features (homepage subset — full catalog lives on /features) ────
const keyFeatures = [
  {
    title: "Real-time DSP",
    detail: "EQ, compression, dynamics, and effects processing designed to run directly on the device.",
  },
  {
    title: "Flexible routing",
    detail: "Build the signal flow you need instead of being locked into a fixed mixer layout.",
  },
  {
    title: "Touchscreen control",
    detail: "Control your mix, processing, and routing directly from the device.",
  },
  {
    title: "Recording",
    detail: "Capture audio without requiring another computer in the recording chain.",
  },
  {
    title: "Streaming",
    detail: "Send your processed audio directly into your streaming workflow.",
  },
  {
    title: "USB audio",
    detail: "Use MixDroid as part of a larger computer-based setup when you actually want one.",
  },
];

// ── Technical credibility ────────────────────────────────────────────────
const techAreas = [
  {
    title: "Real-time DSP",
    detail: "Native audio processing for predictable, low-latency operation.",
  },
  {
    title: "Flexible signal routing",
    detail: "Channels, buses, and processing can be connected according to the workflow.",
  },
  {
    title: "Dedicated audio architecture",
    detail: "The audio engine is designed around real-time audio rather than treating mixing as an afterthought.",
  },
  {
    title: "Built from the ground up",
    detail: "MixDroid's mixer, DSP, and audio architecture have been developed specifically for this platform.",
  },
];

// ── FAQ ─────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Is MixDroid a real product?",
    a: "Yes. MixDroid is currently a working hardware prototype and is being prepared for its first public release.",
  },
  {
    q: "Is MixDroid available now?",
    a: "Not yet. The product is currently in development and being prepared for beta testing.",
  },
  {
    q: "Does MixDroid require a computer?",
    a: "The core mixing, DSP, and recording workflow is designed to operate directly on the device.",
  },
  {
    q: "Who is MixDroid for?",
    a: "MixDroid is designed for podcasters, musicians, streamers, creators, live sound users, and anyone who wants a compact standalone audio workflow.",
  },
  {
    q: "How much will MixDroid cost?",
    a: "Final pricing has not been announced yet.",
  },
  {
    q: "When can I get one?",
    a: "Join the early-access list to receive beta and launch updates.",
  },
];

const openFaq = ref<number | null>(0);
function toggleFaq(index: number) {
  openFaq.value = openFaq.value === index ? null : index;
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

// NOTE: no `offers` property here. MixDroid's hardware price hasn't been
// announced, and the waitlist itself being free previously produced a
// misleading $0 Offer on the Product entity. Omitting Offer entirely rather
// than inventing a price.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "MixDroid",
  category: "Standalone digital mixer hardware",
  description:
    "MixDroid is a standalone digital mixer — a working hardware prototype currently in development — providing professional audio mixing, real-time DSP, flexible routing, recording, and streaming without requiring a laptop for the core workflow.",
  url: "https://mixdroid-web.vercel.app",
  brand: {
    "@type": "Person",
    name: "Joe Kaikaty",
    url: "https://mixdroid-web.vercel.app/about",
    sameAs: [
      "https://linkedin.com/in/joekaikaty",
      "https://github.com/joek85",
    ],
  },
};

useSeoMeta({
  title: "MixDroid — Professional Audio Mixing Without the Laptop",
  description:
    "MixDroid combines a touchscreen mixer, real-time DSP, flexible routing, recording, and streaming into dedicated hardware. A working prototype currently in development — join the early-access list.",
  ogTitle: "MixDroid — Professional Audio Mixing Without the Laptop",
  ogDescription:
    "A standalone digital mixer combining real-time DSP, flexible routing, recording, and streaming into dedicated hardware. Working prototype, currently in development.",
  ogImage: "https://mixdroid-web.vercel.app/images/Mixer.jpg",
  twitterCard: "summary_large_image",
  twitterImage: "https://mixdroid-web.vercel.app/images/Mixer.jpg",
  robots: "index,follow",
});

useHead({
  link: [
    { rel: "canonical", href: "https://mixdroid-web.vercel.app/" },
    { rel: "preload", as: "image", href: "/images/Mixer.jpg" },
  ],
  script: [
    { type: "application/ld+json", innerHTML: JSON.stringify(jsonLd) },
    { type: "application/ld+json", innerHTML: JSON.stringify(faqJsonLd) },
  ],
});
</script>

<template>
  <div class="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)]">
    <AppNav />
    <main id="main-content">

      <!-- ══ HERO ══════════════════════════════════════════════════════ -->
      <section class="border-b border-white/8" aria-labelledby="hero-heading">
        <div class="mx-auto max-w-7xl grid gap-10 px-6 py-10 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:px-10 lg:py-20">

          <div class="flex flex-col gap-6">

            <div class="space-y-4">
              <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">
                Standalone digital mixer
              </p>

              <h1
                id="hero-heading"
                class="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                Professional audio mixing
                <span class="text-[var(--accent-cyan)]">without the laptop.</span>
              </h1>

              <p class="max-w-prose text-base leading-7 text-[var(--text-muted)] sm:text-lg sm:leading-8">
                MixDroid combines a touchscreen mixer, real-time DSP,
                flexible routing, recording, and streaming into dedicated
                hardware — so you can build a complete audio workflow
                without carrying a computer.
              </p>

              <p class="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--warning-pink)]">
                Working prototype · Currently in development
              </p>
            </div>

            <!-- Single waitlist form — the one primary action on the page -->
            <div class="space-y-3">
              <form
                class="flex flex-col gap-3 sm:flex-row sm:items-end"
                @submit.prevent="joinWaitlist"
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
                    v-model="email"
                    type="email"
                    autocomplete="email"
                    size="xl"
                    variant="outline"
                    placeholder="you@example.com"
                    class="w-full"
                    :ui="{
                      base: 'rounded-md bg-black/30 border-white/12 text-white placeholder:text-slate-500 min-h-[44px] text-base',
                    }"
                  />
                </div>
                <UButton
                  type="submit"
                  size="xl"
                  color="primary"
                  class="min-h-[44px] shrink-0 rounded-md px-6 font-semibold text-black"
                  :loading="loading"
                >
                  Join the early-access list →
                </UButton>
              </form>

              <p
                v-if="submitted"
                class="text-sm font-medium text-[var(--accent-cyan)]"
                role="status"
              >
                ✓ You're on the list. We'll be in touch with beta and launch updates.
              </p>
              <p
                v-else-if="errorMessage"
                class="text-sm font-medium text-[var(--warning-pink)]"
                role="alert"
              >
                {{ errorMessage }}
              </p>
              <div v-else class="flex flex-wrap items-center gap-x-4 gap-y-2">
                <p class="text-sm text-[var(--text-dim)]">
                  Free to join · Beta access · Early supporter pricing.
                  <NuxtLink to="/privacy" class="underline underline-offset-2 transition hover:text-[var(--text-muted)]">Privacy policy</NuxtLink>.
                </p>
                <a
                  href="#video"
                  class="flex min-h-[44px] items-center font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent-cyan)] transition hover:opacity-80"
                >
                  Watch the prototype ↓
                </a>
              </div>
            </div>

          </div>

          <!-- Hardware render — shown on all breakpoints; ordered first on mobile so
               visitors see it's a physical device before reading any copy -->
          <div class="order-first lg:order-none">
            <button
              type="button"
              aria-label="Open full-size MixDroid prototype photo"
              class="group w-full rounded-xl border border-[var(--panel-line)] bg-[var(--panel-bg)] p-4 text-left transition hover:border-[var(--accent-cyan)]/45 hover:shadow-[0_0_32px_rgba(0,229,255,0.08)]"
              @click="openImage(heroImage)"
            >
              <div class="mb-3 flex items-center justify-between gap-4">
                <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-cyan)]">
                  MixDroid
                </p>
                <span class="panel-chip font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--warning-pink)]">
                  Working prototype
                </span>
              </div>
              <img
                src="/images/Mixer.jpg"
                alt="MixDroid — working hardware prototype, production design in progress"
                width="1024"
                height="600"
                fetchpriority="high"
                class="aspect-[1024/600] w-full rounded-lg border border-white/10 bg-black object-cover transition group-hover:scale-[1.01]"
              />
            </button>
          </div>

        </div>
      </section>

      <!-- ══ PROOF STRIP ═══════════════════════════════════════════════ -->
      <section class="border-b border-white/8" aria-label="Technical proof">
        <div class="mx-auto max-w-7xl px-6 py-6 sm:px-8 lg:px-10">
          <div class="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <span
              v-for="item in proofItems"
              :key="item"
              class="panel-chip font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--text-secondary)]"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </section>

      <!-- ══ PROBLEM ═══════════════════════════════════════════════════ -->
      <section class="border-b border-white/8" aria-labelledby="problem-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="max-w-3xl space-y-4">
            <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--warning-pink)]">The problem</p>
            <h2 id="problem-heading" class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Why is a laptop still in the middle of your audio setup?
            </h2>
            <p class="max-w-prose text-base leading-8 text-[var(--text-muted)]">
              A typical setup means a laptop, an audio interface, a mixer,
              software, drivers, cables, and configuration — all before you
              can get a sound out. Any one of those can go wrong right
              before you need it to work.
            </p>
          </div>

          <div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div class="mini-panel text-center">
              <p class="text-sm text-[var(--text-secondary)]">Laptop</p>
            </div>
            <div class="mini-panel text-center">
              <p class="text-sm text-[var(--text-secondary)]">Audio interface</p>
            </div>
            <div class="mini-panel text-center">
              <p class="text-sm text-[var(--text-secondary)]">Mixer</p>
            </div>
            <div class="mini-panel text-center">
              <p class="text-sm text-[var(--text-secondary)]">Drivers &amp; cables</p>
            </div>
          </div>

          <p class="mt-8 max-w-prose text-lg font-medium leading-8 text-white">
            MixDroid removes the computer from the core audio workflow.
          </p>
        </div>
      </section>

      <!-- ══ SOLUTION / SIGNAL FLOW ═══════════════════════════════════════ -->
      <section class="border-b border-white/8" aria-labelledby="solution-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="mb-10 max-w-2xl space-y-3">
            <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">The solution</p>
            <h2 id="solution-heading" class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              One device. Complete audio workflow.
            </h2>
          </div>

          <div class="console-panel grid gap-4 rounded-xl p-5 sm:p-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center lg:gap-3">

            <div class="space-y-2">
              <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--text-dim)]">Inputs</p>
              <div class="space-y-1.5">
                <div class="mini-panel"><p class="text-sm text-[var(--text-secondary)]">Microphones</p></div>
                <div class="mini-panel"><p class="text-sm text-[var(--text-secondary)]">Instruments</p></div>
                <div class="mini-panel"><p class="text-sm text-[var(--text-secondary)]">USB audio</p></div>
                <div class="mini-panel"><p class="text-sm text-[var(--text-secondary)]">External sources</p></div>
              </div>
            </div>

            <div class="flex items-center justify-center text-[var(--accent-cyan)] lg:rotate-0" aria-hidden="true">
              <span class="lg:hidden">↓</span>
              <span class="hidden lg:inline">→</span>
            </div>

            <div class="space-y-2">
              <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-cyan)]">MixDroid</p>
              <div class="rounded-lg border border-[var(--accent-cyan)]/40 bg-[var(--panel-bg-strong)] p-3 space-y-1.5">
                <p class="text-sm text-[var(--text-secondary)]">Mixing</p>
                <p class="text-sm text-[var(--text-secondary)]">Parametric EQ</p>
                <p class="text-sm text-[var(--text-secondary)]">Compression</p>
                <p class="text-sm text-[var(--text-secondary)]">Effects</p>
                <p class="text-sm text-[var(--text-secondary)]">Routing</p>
                <p class="text-sm text-[var(--text-secondary)]">Monitoring</p>
              </div>
            </div>

            <div class="flex items-center justify-center text-[var(--accent-cyan)]" aria-hidden="true">
              <span class="lg:hidden">↓</span>
              <span class="hidden lg:inline">→</span>
            </div>

            <div class="space-y-2">
              <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--text-dim)]">Outputs</p>
              <div class="space-y-1.5">
                <div class="mini-panel"><p class="text-sm text-[var(--text-secondary)]">Speakers</p></div>
                <div class="mini-panel"><p class="text-sm text-[var(--text-secondary)]">Headphones</p></div>
                <div class="mini-panel"><p class="text-sm text-[var(--text-secondary)]">Recording</p></div>
                <div class="mini-panel"><p class="text-sm text-[var(--text-secondary)]">Streaming</p></div>
                <div class="mini-panel"><p class="text-sm text-[var(--text-secondary)]">USB audio</p></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- ══ PROTOTYPE VIDEO ═══════════════════════════════════════════ -->
      <section id="video" class="border-b border-white/8" aria-labelledby="video-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="mb-8 max-w-2xl space-y-3">
            <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">See it running</p>
            <h2 id="video-heading" class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              See it running.
            </h2>
            <p class="max-w-prose text-base leading-7 text-[var(--text-muted)]">
              This isn't a concept render or a software mockup. This is the
              working MixDroid prototype — real hardware running the mixer,
              DSP, and audio workflow.
            </p>
            <p class="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--warning-pink)]">
              Real hardware · Real DSP · Real-time audio
            </p>
          </div>

          <div class="aspect-video w-full overflow-hidden rounded-xl border border-[var(--panel-line)]">
            <iframe
              class="h-full w-full"
              src="https://www.youtube.com/embed/QNN6lykvKOQ"
              title="MixDroid Demo #1 — Standalone Android Mixer with Real-Time DSP"
              frameborder="0"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
        </div>
      </section>

      <!-- ══ AUDIENCE ══════════════════════════════════════════════════ -->
      <section class="border-b border-white/8" aria-labelledby="audience-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="mb-8 max-w-2xl space-y-3">
            <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">Who it's for</p>
            <h2 id="audience-heading" class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Built for anyone who wants audio without the laptop.
            </h2>
          </div>

          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="audience in audiences" :key="audience.title" class="console-panel rounded-xl p-5">
              <p class="text-base font-semibold text-white">{{ audience.title }}</p>
              <p class="mt-2 text-sm leading-6 text-[var(--text-muted)]">{{ audience.detail }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ══ KEY FEATURES ══════════════════════════════════════════════ -->
      <section class="border-b border-white/8" aria-labelledby="features-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="mb-8 max-w-2xl space-y-3">
            <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">Key features</p>
            <h2 id="features-heading" class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              What it does.
            </h2>
          </div>

          <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div v-for="feature in keyFeatures" :key="feature.title" class="mini-panel">
              <p class="mini-panel__title flex items-start gap-2 normal-case tracking-normal text-base font-semibold text-white">
                <span class="mt-0.5 shrink-0 text-[var(--accent-cyan)]">→</span>
                {{ feature.title }}
              </p>
              <p class="mini-panel__value text-sm font-normal leading-6 text-[var(--text-muted)]">
                {{ feature.detail }}
              </p>
            </div>
          </div>

          <div class="mt-6">
            <NuxtLink to="/features" class="text-sm underline underline-offset-2 text-[var(--accent-cyan)] hover:opacity-80">
              Explore all features →
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- ══ TECHNICAL CREDIBILITY ═════════════════════════════════════ -->
      <section class="border-b border-white/8" aria-labelledby="tech-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="mb-8 max-w-2xl space-y-3">
            <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">Under the hood</p>
            <h2 id="tech-heading" class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              It's a real audio system — not just an Android app.
            </h2>
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div v-for="area in techAreas" :key="area.title" class="console-panel rounded-xl p-5">
              <p class="text-base font-semibold text-white">{{ area.title }}</p>
              <p class="mt-2 text-sm leading-6 text-[var(--text-muted)]">{{ area.detail }}</p>
            </div>
          </div>

          <div class="mt-6">
            <NuxtLink to="/features" class="text-sm underline underline-offset-2 text-[var(--accent-cyan)] hover:opacity-80">
              Explore the technical features →
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- ══ FOUNDER STORY ═════════════════════════════════════════════ -->
      <section class="border-b border-white/8" aria-labelledby="story-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div class="space-y-4">
              <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">The backstory</p>
              <h2 id="story-heading" class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Built because I needed it.
              </h2>
              <p class="max-w-prose text-base leading-8 text-[var(--text-muted)]">
                MixDroid started in 2018, after I got frustrated needing a
                laptop for serious audio work. What began as a personal
                project became years of work on real-time DSP, Android
                audio, hardware, and mixer architecture.
              </p>
              <p class="max-w-prose text-base font-medium leading-8 text-white">
                Professional audio shouldn't always require a computer.
              </p>
              <div class="pt-2">
                <p class="text-sm font-medium text-white">Joe Kaikaty</p>
                <p class="text-sm text-[var(--text-dim)]">Founder &amp; developer</p>
              </div>
              <NuxtLink
                to="/about"
                class="inline-flex min-h-[44px] items-center font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent-cyan)] transition hover:opacity-80"
              >
                Read the full story →
              </NuxtLink>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="console-stat col-span-2">
                <p class="console-stat__label">Development time</p>
                <p class="console-stat__value">7 years solo</p>
              </div>
              <div class="console-stat">
                <p class="console-stat__label">Building since</p>
                <p class="console-stat__value">2018</p>
              </div>
              <div class="console-stat">
                <p class="console-stat__label">Team size</p>
                <p class="console-stat__value">1</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ══ EARLY ACCESS / WAITLIST ═══════════════════════════════════ -->
      <section class="border-b border-white/8" aria-labelledby="early-access-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="console-panel rounded-xl p-6 sm:p-10">
            <div class="mx-auto max-w-2xl space-y-4 text-center">
              <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">Early access</p>
              <h2 id="early-access-heading" class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Help shape the first release.
              </h2>
              <p class="text-base leading-7 text-[var(--text-muted)]">
                MixDroid is still being developed, and the people who join
                early can help influence what gets built next.
              </p>
            </div>

            <div class="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
              <div class="mini-panel">
                <p class="mini-panel__title normal-case tracking-normal text-sm font-semibold text-white">Early beta access</p>
                <p class="mini-panel__value text-sm font-normal text-[var(--text-muted)]">Be among the first to test the hardware.</p>
              </div>
              <div class="mini-panel">
                <p class="mini-panel__title normal-case tracking-normal text-sm font-semibold text-white">Direct input</p>
                <p class="mini-panel__value text-sm font-normal text-[var(--text-muted)]">Your feedback can directly influence the product roadmap.</p>
              </div>
              <div class="mini-panel">
                <p class="mini-panel__title normal-case tracking-normal text-sm font-semibold text-white">Early supporter pricing</p>
                <p class="mini-panel__value text-sm font-normal text-[var(--text-muted)]">Receive information about early-access and launch pricing.</p>
              </div>
            </div>

            <div class="mt-8 flex flex-col items-center gap-2">
              <a
                href="#hero-email"
                class="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-md bg-[var(--accent-cyan)] px-8 text-sm font-semibold text-black transition hover:opacity-90"
              >
                Join the early-access list →
              </a>
              <p class="text-sm text-[var(--text-dim)]">No spam. Just MixDroid development and beta updates.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ══ FAQ ═══════════════════════════════════════════════════════ -->
      <section class="border-b border-white/8" aria-labelledby="faq-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="mb-8 max-w-2xl space-y-3">
            <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">Questions</p>
            <h2 id="faq-heading" class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Before you ask on Discord.
            </h2>
          </div>

          <div class="mx-auto max-w-3xl space-y-3">
            <div v-for="(item, i) in faqs" :key="item.q" class="console-panel rounded-xl">
              <button
                type="button"
                class="flex w-full min-h-[44px] items-center justify-between gap-4 px-5 py-4 text-left"
                :aria-expanded="openFaq === i"
                @click="toggleFaq(i)"
              >
                <span class="text-base font-medium text-white">{{ item.q }}</span>
                <span
                  class="shrink-0 text-xl text-[var(--accent-cyan)] transition-transform duration-200"
                  :class="openFaq === i ? 'rotate-45' : ''"
                  aria-hidden="true"
                >+</span>
              </button>
              <div v-if="openFaq === i" class="px-5 pb-4 text-sm leading-7 text-[var(--text-muted)]">
                {{ item.a }}
              </div>
            </div>
          </div>

          <p class="mt-6 text-center text-sm text-[var(--text-dim)]">
            Still have questions?
            <a
              :href="DISCORD_URL"
              target="_blank"
              rel="noopener noreferrer"
              class="underline underline-offset-2 text-[var(--accent-cyan)] hover:opacity-80"
            >Ask on Discord ↗</a>
          </p>
        </div>
      </section>

      <!-- ══ FINAL CTA ═════════════════════════════════════════════════ -->
      <section aria-labelledby="final-cta-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-20">
          <div class="console-panel rounded-xl p-6 text-center sm:p-10">
            <div class="mx-auto max-w-xl space-y-3">
              <h2 id="final-cta-heading" class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Leave the laptop behind.
              </h2>
              <p class="text-base leading-7 text-[var(--text-muted)]">
                Build your audio workflow around the tools you actually
                need — not around a computer you have to carry everywhere.
              </p>
            </div>
            <div class="mt-6 flex flex-col items-center gap-3">
              <a
                href="#hero-email"
                class="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-md bg-[var(--accent-cyan)] px-8 text-sm font-semibold text-black transition hover:opacity-90"
              >
                Join the early-access list →
              </a>
              <p class="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-dim)]">
                Working prototype · Currently in development
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>

    <AppFooter />

    <!-- ── Image modal (hero render) -->
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
          style="background: rgba(8, 8, 12, 0.96); backdrop-filter: blur(6px);"
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
              style="max-height: 70vh;"
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
                <p class="text-sm font-semibold text-white">{{ selectedImage.alt }}</p>
                <p
                  v-if="selectedImage.caption"
                  class="mt-1 whitespace-pre-line text-sm leading-6 text-[var(--text-muted)]"
                >
                  {{ selectedImage.caption }}
                </p>
              </div>
              <p class="shrink-0 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--text-dim)]">
                {{ modalZoomed ? "Click to fit" : "Click to zoom" }}
              </p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>