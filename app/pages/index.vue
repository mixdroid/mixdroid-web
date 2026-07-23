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

// ── Features, translated into outcomes rather than specs ──────────────────
const benefits = [
  {
    title: "Never worry about latency",
    detail: "DSP runs on-device, so there's no lag between what you play and what you hear.",
  },
  {
    title: "Sound consistent, every time",
    detail: "Your mix settings travel with you — no reconfiguring a laptop before every session.",
  },
  {
    title: "Record and stream at once",
    detail: "Route your mix straight to a recorder or a stream, simultaneously if you want, without a second computer.",
  },
  {
    title: "Add mics without adding gear",
    detail: "8 channels built in. Plug in directly — no external interface required to get started.",
  },
  {
    title: "Expand only if you need to",
    detail: "A USB audio interface is optional, for when you outgrow the built-in channels.",
  },
];

// ── How it works, in 3 steps ───────────────────────────────────────────────
const steps = [
  {
    id: "01",
    title: "Plug your mics in",
    detail: "Mic or XLR, straight into MixDroid — no interface needed.",
  },
  {
    id: "02",
    title: "Dial in your mix",
    detail: "EQ, compression, and levels, right on the device.",
  },
  {
    id: "03",
    title: "Record, stream, or send to your PA",
    detail: "Output goes wherever you need it, directly.",
  },
];

// ── Trust / reliability points ─────────────────────────────────────────────
const trustPoints = [
  {
    label: "One device, one signal chain",
    detail: "Fewer boxes means fewer things that can fail mid-session.",
  },
  {
    label: "Works fully offline",
    detail: "Mixing, recording, and DSP don't need an internet connection. Streaming and radio are opt-in.",
  },
  {
    label: "Built and used daily by its own developer",
    detail: "Rough edges get found and fixed before they reach you.",
  },
];

// ── FAQ ─────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "What exactly is MixDroid?",
    a: "A dedicated hardware mixer. Not an app, not a phone accessory — a standalone device with its own mixing engine, 8 mic/XLR inputs, and built-in DSP.",
  },
  {
    q: "Do I still need a laptop or audio interface?",
    a: "No. Mics plug in directly. A USB interface is optional, only if you want more than the built-in 8 channels.",
  },
  {
    q: "Is this just for podcasters, or does it work for live sound too?",
    a: "Podcasters and creators are the main focus. The same mixer also holds up for small live setups — mobile engineers, compact venues, spoken-word events — since it's built on the same direct-input, on-device DSP design.",
  },
  {
    q: "When does it ship, and what will it cost?",
    a: "We're finishing development now. Waitlist members hear about the ship date and pricing first, before public launch. Joining the waitlist is free.",
  },
  {
    q: "Why build this instead of using existing software?",
    a: "Because software still needs a computer to run on. MixDroid was built to remove that computer from the chain entirely — one less thing to set up, update, or troubleshoot.",
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

      <!-- ══ 1. HERO ═══════════════════════════════════════════════════════ -->
      <section class="border-b border-white/8" aria-labelledby="hero-heading">
        <div class="mx-auto max-w-7xl grid gap-10 px-6 py-10 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:px-10 lg:py-20">

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
                MixDroid is a standalone hardware mixer. Plug your mics in,
                and you can record, stream, or run live sound — no laptop,
                no separate interface, no tangle of boxes.
              </p>

              <p class="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent-cyan)]">
                Creators · Podcasters · Streamers
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
                  Join the Beta Waitlist
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
              <p v-else class="text-sm text-[var(--text-dim)]">
                Free to join. No payment required.
                <NuxtLink to="/privacy" class="underline underline-offset-2 transition hover:text-[var(--text-muted)]">Privacy policy</NuxtLink>.
              </p>
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

      <!-- ══ 2. LIGHT PROOF ═══════════════════════════════════════════════ -->
      <section class="border-b border-white/8" aria-labelledby="proof-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
          <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div class="space-y-4">
              <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">Why trust this</p>
              <h2 id="proof-heading" class="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Built by someone who actually uses it.
              </h2>
              <p class="max-w-prose text-base leading-7 text-[var(--text-muted)]">
                MixDroid has been in development for 7 years — one person,
                no funding. Every DSP module, EQ, compression, limiting,
                reverb, delay, runs in real recording and streaming sessions
                today, not just on a spec sheet.
              </p>
              <div class="flex flex-wrap items-center gap-4 pt-1">
                <a
                  href="#video"
                  class="flex min-h-[44px] items-center font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent-cyan)] transition hover:opacity-80"
                >
                  Watch the demo ↓
                </a>
                <a
                  :href="DISCORD_URL"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex min-h-[44px] items-center gap-2 rounded-md border border-[var(--panel-line)] bg-[var(--panel-bg)] px-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-secondary)] transition hover:border-[var(--accent-cyan)]/40 hover:text-[var(--accent-cyan)]"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3c-.2.4-.5 1-.7 1.4a18.3 18.3 0 0 0-5.4 0A9 9 0 0 0 8.6 3a19.7 19.7 0 0 0-4.9 1.5C1 8.9.3 13.3.6 17.6a19.9 19.9 0 0 0 6 3c.5-.6.9-1.3 1.3-2a13 13 0 0 1-2-1c.2-.1.3-.3.5-.4a14.2 14.2 0 0 0 12 0l.5.4a13 13 0 0 1-2 1c.4.7.8 1.4 1.3 2a19.8 19.8 0 0 0 6-3c.4-5-.9-9.4-3.9-13.2ZM8.7 14.8c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm6.6 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z"/>
                  </svg>
                  Join the community on Discord
                </a>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
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
      </section>

      <!-- ── Video (linked from Light proof) -->
      <section id="video" class="border-b border-white/8" aria-labelledby="video-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="mb-8 space-y-3">
            <h2 id="video-heading" class="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
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

      <!-- ══ 3. PROBLEM ═══════════════════════════════════════════════════ -->
      <section class="border-b border-white/8" aria-labelledby="problem-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="max-w-3xl space-y-4">
            <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--warning-pink)]">The problem</p>
            <h2 id="problem-heading" class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Your setup shouldn't be the hard part.
            </h2>
            <p class="max-w-prose text-base leading-8 text-[var(--text-muted)]">
              A laptop-based setup means a mixer, an audio interface, cables
              running everywhere, and software that needs updating right
              before you go live. One driver conflict or one dead battery,
              and the whole session stops.
            </p>
            <p class="max-w-prose text-base leading-8 text-[var(--text-muted)]">
              Streamers and podcasters didn't get into this to troubleshoot
              audio drivers. They got into it to make things.
            </p>
          </div>

          <div class="mt-8 grid gap-3 sm:grid-cols-2">
            <div class="mini-panel">
              <p class="mini-panel__title flex items-center gap-2">
                <span class="text-[var(--warning-pink)]">→</span>
                A laptop that needs updating right before you go live
              </p>
            </div>
            <div class="mini-panel">
              <p class="mini-panel__title flex items-center gap-2">
                <span class="text-[var(--warning-pink)]">→</span>
                A separate mixer and interface, plus the cables between them
              </p>
            </div>
            <div class="mini-panel">
              <p class="mini-panel__title flex items-center gap-2">
                <span class="text-[var(--warning-pink)]">→</span>
                A dead battery or dropped driver that stops the whole session
              </p>
            </div>
            <div class="mini-panel">
              <p class="mini-panel__title flex items-center gap-2">
                <span class="text-[var(--warning-pink)]">→</span>
                Reconfiguring settings every time you move to a new spot
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ══ 4. SOLUTION ══════════════════════════════════════════════════ -->
      <section class="border-b border-white/8" aria-labelledby="solution-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div class="space-y-4">
              <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">The solution</p>
              <h2 id="solution-heading" class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                One device does the whole job.
              </h2>
              <p class="max-w-prose text-base leading-8 text-[var(--text-muted)]">
                MixDroid replaces the laptop, the mixer, the interface, and
                the recorder with a single piece of hardware. Mics plug in
                directly. The mixing, DSP, recording, and streaming all
                happen on the device itself.
              </p>
              <p class="max-w-prose text-base leading-8 text-[var(--text-muted)]">
                Set it up once. Turn it on and go.
              </p>
              <p class="max-w-prose text-xs leading-6 text-[var(--text-dim)]">
                Runs on dedicated hardware — a custom, embedded operating
                system built for this one job, not a phone or tablet app.
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

      <!-- ══ 5. FEATURES / BENEFITS ═══════════════════════════════════════ -->
      <section class="border-b border-white/8" aria-labelledby="benefits-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="mb-8 max-w-2xl space-y-3">
            <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">What that gets you</p>
            <h2 id="benefits-heading" class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              What that actually gets you.
            </h2>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <div v-for="benefit in benefits" :key="benefit.title" class="mini-panel">
              <p class="mini-panel__title flex items-start gap-2 normal-case tracking-normal text-base font-semibold text-white">
                <span class="mt-0.5 shrink-0 text-[var(--accent-cyan)]">→</span>
                {{ benefit.title }}
              </p>
              <p class="mini-panel__value text-sm font-normal leading-6 text-[var(--text-muted)]">
                {{ benefit.detail }}
              </p>
            </div>
          </div>

          <p class="mt-6 text-sm text-[var(--text-muted)]">
            Want the full spec sheet — every DSP module and screen?
            <NuxtLink to="/features" class="underline underline-offset-2 text-[var(--accent-cyan)] hover:opacity-80">See all features →</NuxtLink>
          </p>
        </div>
      </section>

      <!-- ══ 6. HOW IT WORKS ══════════════════════════════════════════════ -->
      <section class="border-b border-white/8" aria-labelledby="how-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="mb-8 max-w-2xl space-y-3">
            <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">How it works</p>
            <h2 id="how-heading" class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Three steps.
            </h2>
          </div>

          <div class="grid gap-5 sm:grid-cols-3">
            <div v-for="step in steps" :key="step.id" class="console-panel rounded-xl p-5">
              <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent-cyan)]">Step {{ step.id }}</p>
              <p class="mt-2 text-base font-medium text-white">{{ step.title }}</p>
              <p class="mt-2 text-sm leading-6 text-[var(--text-muted)]">{{ step.detail }}</p>
            </div>
          </div>

          <div class="mt-8">
            <a
              href="#hero-email"
              class="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-md bg-[var(--accent-cyan)] px-6 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Join the Beta Waitlist
            </a>
          </div>
        </div>
      </section>

      <!-- ══ 7. TRUST / RELIABILITY ═══════════════════════════════════════ -->
      <section class="border-b border-white/8" aria-labelledby="trust-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div class="space-y-4">
              <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">Reliability</p>
              <h2 id="trust-heading" class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Fewer things that can go wrong.
              </h2>
              <p class="max-w-prose text-base leading-8 text-[var(--text-muted)]">
                Every extra box in your signal chain is another thing that
                can fail — a laptop that needs a restart, a driver that
                stops responding, a cable that's not quite seated right.
              </p>
              <p class="max-w-prose text-base leading-8 text-[var(--text-muted)]">
                MixDroid cuts that chain down to one device. It's also been
                the same person's daily tool for years, which means the
                rough edges get found and fixed before they reach you.
              </p>
              <NuxtLink
                to="/about"
                class="inline-flex min-h-[44px] items-center font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--accent-cyan)] transition hover:opacity-80"
              >
                Read the full story →
              </NuxtLink>
            </div>

            <div class="grid gap-3">
              <div v-for="point in trustPoints" :key="point.label" class="mini-panel">
                <p class="mini-panel__title flex items-center gap-2">
                  <span class="text-[var(--accent-cyan)]">→</span>
                  {{ point.label }}
                </p>
                <p class="mini-panel__value text-sm font-normal text-[var(--text-muted)]">
                  {{ point.detail }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ══ 8. FAQ ═══════════════════════════════════════════════════════ -->
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

      <!-- ══ 9. FINAL CTA ═════════════════════════════════════════════════ -->
      <section aria-labelledby="final-cta-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-20">
          <div class="console-panel rounded-xl p-6 text-center sm:p-10">
            <div class="mx-auto max-w-xl space-y-3">
              <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">Early access</p>
              <h2 id="final-cta-heading" class="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Get in before it ships.
              </h2>
              <p class="text-base leading-7 text-[var(--text-muted)]">
                Join the waitlist and you'll hear about beta access,
                pricing, and release updates before anyone else. Free to
                join, no payment required.
              </p>
            </div>
            <div class="mt-6 flex justify-center">
              <a
                href="#hero-email"
                class="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-md bg-[var(--accent-cyan)] px-8 text-sm font-semibold text-black transition hover:opacity-90"
              >
                Join the Beta Waitlist
              </a>
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