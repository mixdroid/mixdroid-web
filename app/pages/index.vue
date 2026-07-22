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

// TODO: replace with your real invite link
const DISCORD_URL = "https://discord.gg/3HFtyBgRv";

const heroImage: ShowcaseImage = {
  src: "/images/Mixer.jpg",
  alt: "MixDroid — hardware concept render, production design in progress",
  caption: "",
};

const features = [
  {
    id: "01",
    title: "Real-time DSP",
    description:
      "EQ, compression, limiting, reverb, delay — processed on-device with near-zero latency. No cloud round-trips, no buffer surprises mid-set.",
  },
  {
    id: "02",
    title: "Recording & streaming output",
    description:
      "Mix your mics, music, and soundboard, then route the result straight to your recorder or streaming software. No laptop in the signal chain.",
  },
  {
    id: "03",
    title: "Flexible routing & monitoring",
    description:
      "Route channels between internal buses and external interfaces, and monitor on Peak, RMS, LUFS, and more — the full metering suite, not a single VU needle.",
  },
  {
    id: "04",
    title: "Dedicated hardware",
    description:
      "Purpose-built mixer hardware with its own audio engine — not a phone app, not a tablet controller. Mics plug in directly; USB interfaces are optional for expansion.",
  },
];

const showcaseImages: ShowcaseImage[] = [
  {
    src: "/images/eq.png",
    alt: "MixDroid parametric EQ interface — 5-band controls with FFT analyser",
    caption: `• 5 bands with full parametric control.
• Pre-gain and per-band solo.
• ±24 dB gain, Q-factor 0.707–1.8.
• 20 Hz–20 kHz frequency response.
• 8192-bin FFT spectrum analyzer.
• LowPass, HighPass, BandPass, Notch, AllPass, Peaking, LowShelf, HighShelf.`,
  },
  {
    src: "/images/compressor.png",
    alt: "MixDroid stereo compressor interface — threshold, ratio, attack, release controls",
    caption: `• Stereo-linked feed-forward compressor.
• Threshold, ratio up to 20:1, attack 1–100 ms, release 1–10,000 ms.
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

const faqs = [
  {
    q: "What exactly is this?",
    a: "A portable pro audio mixer — dedicated hardware with its own real-time DSP engine. 8-channel I/O, 5 effects per channel. Plug your mics in directly and you're mixing, recording, or streaming.",
  },
  {
    q: "When does the beta ship?",
    a: "We're finishing development now. Waitlist members get first access and will hear about the exact ship date before anyone else.",
  },
  {
    q: "How much will it cost?",
    a: "Final pricing isn't locked yet, but we're targeting a price below buying a comparable rack mixer plus a separate USB audio interface. Joining the waitlist is free, and pricing will be sent to the list before public launch.",
  },
  {
    q: "What's the sample rate and bit depth?",
    a: "Internal mixing runs at 32-bit. The codec sample rate is user-selectable, defaulting to 48 kHz — audio is resampled internally to whatever rate you choose.",
  },
  {
    q: "What's the latency?",
    a: "Latency is user-selectable via buffer size. ~6 ms is typical at a 300-sample buffer on a standard kernel. We're also working on real-time kernel support for even lower latency, but that hasn't been verified on Android hardware yet — treat it as in-development, not a shipping number.",
  },
  {
    q: "Do I need a USB audio interface?",
    a: "No. Mics plug directly into the onboard 8-in / 8-out codec. A USB audio interface is optional, for when you want to expand beyond the built-in I/O.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "MixDroid",
  category: "Portable pro audio mixer hardware",
  description:
    "Portable pro audio mixer for creators and podcasters. Dedicated hardware with low-latency DSP, flexible routing, recording, and streaming output — replaces the laptop, mixer, audio interface, and recorder stack with one device.",
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
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free to join the waitlist. No payment required.",
  },
};

useSeoMeta({
  title: "MixDroid | Portable Pro Audio Mixer for Creators & Podcasters",
  description:
    "MixDroid is a standalone hardware mixer for creators and podcasters. Mix, record, and stream with low-latency DSP, flexible routing, and no laptop.",
  ogTitle: "MixDroid | Portable Pro Audio Mixer for Creators & Podcasters",
  ogDescription:
    "Replace the laptop, mixer, audio interface, and recorder stack with one dedicated device. Low-latency DSP, flexible routing, recording, and streaming — built solo over 7 years.",
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

      <!-- ── Hero -->
      <section class="border-b border-white/8" aria-labelledby="hero-heading">
        <div class="mx-auto max-w-7xl grid gap-10 px-6 py-10 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:px-10 lg:py-20">

          <!-- Left: H1 + single form -->
          <div class="flex flex-col gap-6">

            <div class="space-y-4">
              <h1
                id="hero-heading"
                class="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                Portable pro audio for
                <span class="text-[var(--accent-cyan)]">creators and podcasters.</span>
              </h1>

              <p class="max-w-prose text-base leading-7 text-[var(--text-muted)] sm:text-lg sm:leading-8">
                MixDroid replaces the laptop + mixer + interface stack with
                one dedicated hardware mixer for low-latency recording,
                streaming, and routing.
              </p>

              <p class="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent-cyan)]">
                Creators · Podcasters · Streamers
              </p>
            </div>

            <!-- What you're signing up for — objection handling before the form -->
            <div class="console-panel rounded-xl p-4 space-y-4">
              <div class="space-y-2">
                <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">
                  In the box
                </p>
                <ul class="space-y-1.5 text-sm text-[var(--text-muted)]" role="list">
                  <li class="flex items-start gap-2">
                    <span class="mt-0.5 shrink-0 text-[var(--accent-cyan)]" aria-hidden="true">→</span>
                    <span>The MixDroid unit — <span class="text-[var(--text-secondary)]">8-in / 8-out</span> onboard codec, mic or XLR inputs plug in directly</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="mt-0.5 shrink-0 text-[var(--accent-cyan)]" aria-hidden="true">→</span>
                    <span>Real-time DSP — EQ, compression, and limiting on every channel</span>
                  </li>
                </ul>
              </div>

              <div class="space-y-2">
                <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--warning-pink)]">
                  You provide (optional)
                </p>
                <ul class="space-y-1.5 text-sm text-[var(--text-muted)]" role="list">
                  <li class="flex items-start gap-2">
                    <span class="mt-0.5 shrink-0 text-[var(--warning-pink)]" aria-hidden="true">→</span>
                    <span>A <span class="text-[var(--text-secondary)]">USB audio interface</span> — only needed if you want to expand past the built-in 8 channels</span>
                  </li>
                </ul>
              </div>

              <div class="space-y-1.5 border-t border-[var(--panel-line)] pt-3 text-sm text-[var(--text-muted)]">
                <p class="flex items-start gap-2">
                  <span class="mt-0.5 shrink-0 text-[var(--accent-cyan)]" aria-hidden="true">→</span>
                  <span>Beta shipping soon — waitlist gets first access</span>
                </p>
                <p class="flex items-start gap-2">
                  <span class="mt-0.5 shrink-0 text-[var(--accent-cyan)]" aria-hidden="true">→</span>
                  <span>Expected priced below a comparable rack mixer + interface setup — joining is free, pricing sent to the list before launch</span>
                </p>
              </div>
            </div>

            <!-- Signal flow -->
            <div class="console-panel rounded-xl p-4">
              <p class="mb-3 font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">
                Signal flow
              </p>
              <div class="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
                <div class="rounded-lg border border-[var(--panel-line)] bg-[var(--panel-bg-strong)] px-3 py-3 flex-1 text-center">
                  <p class="text-sm font-semibold text-white">Mics / XLR</p>
                  <p class="mt-1 text-xs text-[var(--text-secondary)]">plug in directly</p>
                </div>
                <span class="hidden shrink-0 text-[var(--accent-cyan)] sm:block" aria-hidden="true">→</span>
                <span class="block text-center text-[var(--accent-cyan)] sm:hidden" aria-hidden="true">↓</span>
                <div class="rounded-lg border border-[var(--accent-cyan)]/40 bg-[var(--panel-bg-strong)] px-3 py-3 flex-1 text-center">
                  <p class="text-sm font-semibold text-[var(--accent-cyan)]">MixDroid</p>
                  <p class="mt-1 text-xs text-[var(--text-secondary)]">DSP · mixing</p>
                </div>
                <span class="hidden shrink-0 text-[var(--accent-cyan)] sm:block" aria-hidden="true">→</span>
                <span class="block text-center text-[var(--accent-cyan)] sm:hidden" aria-hidden="true">↓</span>
                <div class="rounded-lg border border-[var(--panel-line)] bg-[var(--panel-bg-strong)] px-3 py-3 flex-1 text-center">
                  <p class="text-sm font-semibold text-white">Stream / recording</p>
                  <p class="mt-1 text-xs text-[var(--text-secondary)]">output</p>
                </div>
              </div>
              <p class="mt-3 text-xs text-[var(--text-muted)]">
                Need more than 8 channels? A USB audio interface plugs into MixDroid the same way, for expansion.
              </p>
            </div>

            <!-- Single waitlist form -->
            <div class="space-y-3">
              <p class="text-sm text-[var(--text-muted)]">
                <span class="font-medium text-[var(--text-secondary)]">Built by
                  <NuxtLink
                    to="/about"
                    class="underline underline-offset-2 transition hover:text-[var(--accent-cyan)]"
                  >Joe Kaikaty</NuxtLink>
                </span>
                — 7 years solo in Lebanon.
              </p>

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
                    placeholder="you@yourshow.com"
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
                  Join the beta waitlist
                </UButton>
              </form>

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
              <div v-else class="flex flex-wrap items-center gap-x-4 gap-y-2">
                <p class="text-sm text-[var(--text-dim)]">
                  Free to join. No payment required.
                  <NuxtLink to="/privacy" class="underline underline-offset-2 transition hover:text-[var(--text-muted)]">Privacy policy</NuxtLink>.
                </p>
                <!-- Secondary anchor CTA for visitors who need more proof first -->
                <a
                  href="#video"
                  class="flex min-h-[44px] items-center font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent-cyan)] transition hover:opacity-80"
                >
                  Watch the demo ↓
                </a>
              </div>

              <!-- Social proof / community -->
              <a
                :href="DISCORD_URL"
                target="_blank"
                rel="noopener noreferrer"
                class="flex min-h-[44px] w-fit items-center gap-2 rounded-md border border-[var(--panel-line)] bg-[var(--panel-bg)] px-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-secondary)] transition hover:border-[var(--accent-cyan)]/40 hover:text-[var(--accent-cyan)]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3c-.2.4-.5 1-.7 1.4a18.3 18.3 0 0 0-5.4 0A9 9 0 0 0 8.6 3a19.7 19.7 0 0 0-4.9 1.5C1 8.9.3 13.3.6 17.6a19.9 19.9 0 0 0 6 3c.5-.6.9-1.3 1.3-2a13 13 0 0 1-2-1c.2-.1.3-.3.5-.4a14.2 14.2 0 0 0 12 0l.5.4a13 13 0 0 1-2 1c.4.7.8 1.4 1.3 2a19.8 19.8 0 0 0 6-3c.4-5-.9-9.4-3.9-13.2ZM8.7 14.8c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm6.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z"/>
                </svg>
                Join the community on Discord
              </a>
            </div>

          </div>

          <!-- Hardware render — shown on all breakpoints; ordered first on mobile so
               visitors see it's a physical device before reading any copy -->
          <div class="order-first lg:order-none">
            <button
              type="button"
              aria-label="Open full-size MixDroid concept render"
              class="group w-full rounded-xl border border-[var(--panel-line)] bg-[var(--panel-bg)] p-4 text-left transition hover:border-[var(--accent-cyan)]/45 hover:shadow-[0_0_32px_rgba(0,229,255,0.08)]"
              @click="openImage(heroImage)"
            >
              <div class="mb-3 flex items-center justify-between gap-4">
                <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-cyan)]">
                  MixDroid
                </p>
                <div class="meter-stack" aria-hidden="true">
                  <span /><span /><span /><span />
                </div>
              </div>
              <img
                src="/images/Mixer.jpg"
                alt="MixDroid — hardware concept render, production design in progress"
                width="1024"
                height="600"
                fetchpriority="high"
                class="aspect-[1024/600] w-full rounded-lg border border-white/10 bg-black object-cover transition group-hover:scale-[1.01]"
              />
            </button>
          </div>

        </div>
      </section>

      <!-- ── Video -->
      <section id="video" class="border-b border-white/8" aria-labelledby="video-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="mb-8 space-y-3">
            <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">See it in action</p>
            <h2 id="video-heading" class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Watch the mixer run.
            </h2>
            <p class="max-w-prose text-base leading-7 text-[var(--text-muted)]">
              Real-time EQ, compression, and streaming running on the mixer
              itself — no laptop involved.
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

      <!-- ── What it replaces -->
      <section class="border-b border-white/8" aria-labelledby="replaces-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div class="space-y-4">
              <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">The problem</p>
              <h2 id="replaces-heading" class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Stop juggling multiple boxes.
              </h2>
              <p class="max-w-prose text-base leading-8 text-[var(--text-muted)]">
                Most workflows still need a mixer, an audio interface, a
                recorder, and sometimes a separate streaming controller —
                each with its own cables, drivers, and failure points.
                MixDroid combines those jobs into one dedicated device, so
                setup is simpler and routing is easier to reason about.
              </p>
              <p class="max-w-prose text-base leading-8 text-[var(--text-muted)]">
                Built with creators and podcasters in mind first — though the
                same one-device workflow extends to live sound and small
                venues too, more on that below.
              </p>
            </div>

            <div class="console-panel rounded-xl p-5 sm:p-6">
              <div class="grid gap-2">
                <div class="mini-panel">
                  <p class="text-sm text-[var(--text-secondary)]">Mixer</p>
                </div>
                <div class="mini-panel">
                  <p class="text-sm text-[var(--text-secondary)]">Audio interface</p>
                </div>
                <div class="mini-panel">
                  <p class="text-sm text-[var(--text-secondary)]">Recorder</p>
                </div>
                <div class="mini-panel">
                  <p class="text-sm text-[var(--text-secondary)]">Streaming controller</p>
                </div>
              </div>
              <div class="my-3 flex items-center justify-center text-[var(--accent-cyan)]" aria-hidden="true">↓</div>
              <div class="rounded-lg border border-[var(--accent-cyan)]/40 bg-[var(--panel-bg-strong)] px-4 py-4 text-center">
                <p class="text-base font-semibold text-[var(--accent-cyan)]">MixDroid</p>
                <p class="mt-1 text-xs text-[var(--text-dim)]">one device</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Built for real workflows -->
      <section class="border-b border-white/8" aria-labelledby="workflows-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="max-w-3xl space-y-4">
            <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">How it works</p>
            <h2 id="workflows-heading" class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Dedicated hardware, not a wrapper around a laptop.
            </h2>
            <p class="max-w-prose text-base leading-8 text-[var(--text-muted)]">
              MixDroid is purpose-built hardware with its own real-time audio
              engine — not an app you install, not a tablet controller you
              pair with a mixer, not a general-purpose device repurposed for
              audio. Microphones plug in directly, DSP runs on-device, and
              the output goes straight to your recorder or stream. Under the
              hood, a custom Android 13 build powers that engine — but the
              product is the mixer, not the OS.
            </p>
          </div>

          <div class="mt-8 grid gap-5 sm:grid-cols-3">
            <div class="console-panel rounded-xl p-5">
              <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-cyan)]">Step 1</p>
              <p class="mt-2 text-base font-medium text-white">Mics plug in directly</p>
              <p class="mt-2 text-sm leading-6 text-[var(--text-muted)]">Mic or XLR — no external interface required to get started.</p>
            </div>
            <div class="console-panel rounded-xl p-5">
              <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-cyan)]">Step 2</p>
              <p class="mt-2 text-base font-medium text-white">DSP runs on-device</p>
              <p class="mt-2 text-sm leading-6 text-[var(--text-muted)]">EQ, compression, and limiting processed locally, with near-zero latency.</p>
            </div>
            <div class="console-panel rounded-xl p-5">
              <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-cyan)]">Step 3</p>
              <p class="mt-2 text-base font-medium text-white">Straight to stream or record</p>
              <p class="mt-2 text-sm leading-6 text-[var(--text-muted)]">Output routes directly — no laptop relaying the signal in between.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Also works for live sound (secondary use case) -->
      <section class="border-b border-white/8" aria-labelledby="live-sound-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="console-panel rounded-xl p-6 sm:p-8">
            <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
              <div class="space-y-4">
                <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--warning-pink)]">Also useful for live sound</p>
                <h2 id="live-sound-heading" class="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Built for creators first — the same architecture holds up for small live setups.
                </h2>
                <p class="max-w-prose text-base leading-7 text-[var(--text-muted)]">
                  MixDroid's core design — direct mic inputs, on-device DSP,
                  flexible routing, and fully standalone operation — is what
                  makes it work well for recording and streaming. It's the
                  same reasons it holds up for small live setups: mobile
                  engineers, compact venues, and spoken-word events that need
                  a real mixer without hauling a rack.
                </p>
                <p class="max-w-prose text-sm leading-7 text-[var(--text-dim)]">
                  This isn't a separate product — it's the same mixer, the
                  same DSP engine, and the same one-device workflow, just
                  pointed at a PA instead of a stream.
                </p>
              </div>

              <div class="grid gap-3 sm:grid-cols-2 lg:w-72 lg:grid-cols-1">
                <div class="mini-panel">
                  <p class="mini-panel__title flex items-center gap-2">
                    <span class="text-[var(--accent-cyan)]">→</span>
                    Direct mic inputs
                  </p>
                  <p class="mini-panel__value text-sm font-normal text-[var(--text-muted)]">No separate interface needed to get sound in.</p>
                </div>
                <div class="mini-panel">
                  <p class="mini-panel__title flex items-center gap-2">
                    <span class="text-[var(--accent-cyan)]">→</span>
                    On-device DSP
                  </p>
                  <p class="mini-panel__value text-sm font-normal text-[var(--text-muted)]">Low-latency EQ, compression, and limiting for live monitoring.</p>
                </div>
                <div class="mini-panel">
                  <p class="mini-panel__title flex items-center gap-2">
                    <span class="text-[var(--accent-cyan)]">→</span>
                    Flexible routing
                  </p>
                  <p class="mini-panel__value text-sm font-normal text-[var(--text-muted)]">Route channels to a PA, a stream, or both at once.</p>
                </div>
                <div class="mini-panel">
                  <p class="mini-panel__title flex items-center gap-2">
                    <span class="text-[var(--accent-cyan)]">→</span>
                    Standalone operation
                  </p>
                  <p class="mini-panel__value text-sm font-normal text-[var(--text-muted)]">No laptop, no extra rack gear to set up or strike.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Features -->
      <section class="border-b border-white/8" aria-labelledby="features-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="mb-10 space-y-3">
            <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">Core workflow</p>
            <h2 id="features-heading" class="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              What you can do with it.
            </h2>
            <p class="max-w-prose text-base leading-7 text-[var(--text-muted)]">
              Mixing, recording, and streaming — all handled on the device
              itself, from mic input to final output.
            </p>
          </div>

          <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <article v-for="feature in features" :key="feature.id" class="console-panel rounded-xl p-5">
              <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--warning-pink)]" aria-hidden="true">
                {{ feature.id }}
              </p>
              <h3 class="mt-4 text-lg font-semibold text-white">{{ feature.title }}</h3>
              <p class="mt-3 text-sm leading-7 text-[var(--text-muted)]">{{ feature.description }}</p>
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
                <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">Every module documented</p>
                <h2 class="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Parametric EQ. Compressor. Limiter. Reverb. Delay. Spectrum. More.
                </h2>
                <p class="max-w-prose text-base leading-7 text-[var(--text-muted)]">
                  Every screen, every control, every parameter — documented with
                  real screenshots from the app.
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
      <section class="border-b border-white/8" aria-labelledby="screens-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="mb-8 max-w-3xl space-y-4">
            <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">DSP screens</p>
            <h2 id="screens-heading" class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Purpose-built. Not ported.
            </h2>
            <p class="max-w-prose text-base leading-8 text-[var(--text-muted)]">
              Every DSP module written from scratch — the same parametric EQ
              and compression you'd expect from a desktop DAW, without the
              desktop.
            </p>
          </div>

          <div class="grid gap-6">
            <button
              v-for="(image, index) in showcaseImages"
              :key="image.src"
              type="button"
              :aria-label="`View full screenshot: ${image.alt}`"
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
                  <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-cyan)]">
                    Screen {{ index + 1 }}
                  </p>
                  <p class="text-base font-medium text-white">{{ image.alt }}</p>
                  <p class="whitespace-pre-line text-sm leading-7 text-[var(--text-muted)]">{{ image.caption }}</p>
                  <p class="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--text-dim)]">Tap to expand ↗</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      <!-- ── Specs -->
      <section class="border-b border-white/8" aria-labelledby="specs-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="mb-8 max-w-2xl space-y-3">
            <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">For the engineers</p>
            <h2 id="specs-heading" class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              The numbers, if you want them.
            </h2>
            <p class="max-w-prose text-base leading-7 text-[var(--text-muted)]">
              Everything below runs on-device. Full technical detail, for
              anyone deciding whether this fits their rig.
            </p>
          </div>

          <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            <div class="console-panel rounded-xl p-5 space-y-3">
              <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-cyan)]">Audio engine</p>
              <ul class="space-y-2 text-sm leading-6 text-[var(--text-muted)]" role="list">
                <li>32-bit internal mixing</li>
                <li>User-selectable codec sample rate, 48 kHz default (resampled internally to the selected rate)</li>
                <li>User-selectable latency — ~6 ms typical (300-sample buffer, standard kernel)</li>
                <li>Real-time kernel support for even lower latency — in development, not yet verified on Android</li>
              </ul>
            </div>

            <div class="console-panel rounded-xl p-5 space-y-3">
              <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-cyan)]">I/O</p>
              <ul class="space-y-2 text-sm leading-6 text-[var(--text-muted)]" role="list">
                <li>8-channel input / 8-channel output onboard codec — mic or XLR, plug in directly</li>
                <li>External USB audio interfaces supported for expansion (optional)</li>
                <li>USB-C 3.0 — usable as external audio interface or MIDI controller</li>
                <li>USB 3.0 × 1 + USB 2.0 × 3</li>
              </ul>
            </div>

            <div class="console-panel rounded-xl p-5 space-y-3">
              <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-cyan)]">DSP / effects</p>
              <ul class="space-y-2 text-sm leading-6 text-[var(--text-muted)]" role="list">
                <li>5 effects per channel, adjustable PDC</li>
                <li>5-band parametric EQ — ±24 dB, Q 0.707–1.8, 8 filter types</li>
                <li>Stereo compressor — up to 20:1, sidechain input</li>
                <li>Lookahead limiter — Live / Standard / Mastering modes</li>
                <li>Algorithmic reverb, 4-mode stereo delay</li>
              </ul>
            </div>

            <div class="console-panel rounded-xl p-5 space-y-3">
              <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-cyan)]">Monitoring</p>
              <ul class="space-y-2 text-sm leading-6 text-[var(--text-muted)]" role="list">
                <li>8192-bin FFT spectrum analyser</li>
                <li>Peak, RMS, PPM, VU, K12, K14, K20</li>
                <li>LUFS Short &amp; Momentary, scrolling waveform</li>
                <li>Phase response curve, vectorscope</li>
              </ul>
            </div>

            <div class="console-panel rounded-xl p-5 space-y-3">
              <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-cyan)]">Hardware</p>
              <ul class="space-y-2 text-sm leading-6 text-[var(--text-muted)]" role="list">
                <li>8-core 64-bit processor, up to 32 GB RAM</li>
                <li>Up to 256 GB storage</li>
                <li>7″ multitouch display, Android 13-based engine</li>
                <li>Wi-Fi 5 + Bluetooth 5.0 / BLE</li>
                <li>MIDI-controlled faders, mute/solo</li>
              </ul>
            </div>

          </div>

          <p class="mt-5 max-w-prose text-sm leading-7 text-[var(--text-muted)]">
            Latency figures above are from current standard-kernel testing and
            will be refined as development continues. See the
            <NuxtLink to="/features" class="underline underline-offset-2 text-[var(--accent-cyan)] hover:opacity-80">features page</NuxtLink>
            for every module and screenshot in detail.
          </p>
        </div>
      </section>

      <!-- ── FAQ -->
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

      <!-- ── Story -->
      <section class="border-b border-white/8" aria-labelledby="story-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div class="space-y-4">
              <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">The backstory</p>
              <h2 id="story-heading" class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                7 years. One developer. Built from Lebanon.
              </h2>
              <p class="max-w-prose text-base leading-8 text-[var(--text-muted)]">
                MixDroid started because I couldn't find a mixer that worked
                without a laptop in the room. After 7 years of solo
                development, the result is a portable pro audio mixer for
                creators and podcasters — with the same one-device workflow
                also holding up for live sound and small venues — covering
                the full workflow: DSP, routing, recording, and streaming,
                standalone.
              </p>
              <p class="max-w-prose text-base leading-8 text-[var(--text-muted)]">
                No VC money, no team, no shortcuts. Every DSP algorithm, every
                screen, every edge case — built by one person who uses it themselves.
              </p>
              <div class="pt-2">
                <p class="text-sm font-medium text-white">Joe Kaikaty</p>
                <div class="mt-1 flex items-center gap-3">
                  <a
                    href="https://linkedin.com/in/joekaikaty"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="min-h-[44px] flex items-center font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent-cyan)] transition hover:opacity-80"
                  >
                    LinkedIn ↗
                  </a>
                  <a
                    href="https://github.com/joek85"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="min-h-[44px] flex items-center font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent-cyan)] transition hover:opacity-80"
                  >
                    GitHub ↗
                  </a>
                  <NuxtLink
                    to="/about"
                    class="min-h-[44px] flex items-center font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-dim)] transition hover:text-[var(--text-secondary)]"
                  >
                    Full story →
                  </NuxtLink>
                </div>
              </div>
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