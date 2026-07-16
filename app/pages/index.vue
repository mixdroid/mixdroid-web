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
    title: "Real-time DSP effects",
    description:
      "EQ, compression, limiting, reverb, delay — processed on-device with near-zero latency. No cloud round-trips, no buffer surprises mid-stream.",
  },
  {
    id: "02",
    title: "Live streaming & recording",
    description:
      "Mix your mic, music, and soundboard simultaneously. Route directly to your streaming software or record locally — no laptop in the signal chain.",
  },
  {
    id: "03",
    title: "Internet radio built-in",
    description:
      "Tune in, monitor, and rebroadcast internet radio stations right from the mixer. No separate app, no extra setup.",
  },
  {
    id: "04",
    title: "Dedicated hardware — no laptop",
    description:
      "A standalone device running a custom Android 13 build. No MacBook, no Windows rig, no subscription. Requires a USB audio interface. Works completely offline.",
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
    q: "Is this a phone app or an actual device?",
    a: "It's a physical, standalone device — not an app you install on a phone or tablet you already own. It runs a custom Android 13 build internally, but you interact with it as dedicated mixer hardware.",
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
    q: "What do I need to use it?",
    a: "A USB audio interface for your mics and instruments. That's it — no laptop, no companion app, and no Google account required.",
  },
  {
    q: "Does it work without internet?",
    a: "Yes. DSP, mixing, and recording all run on-device and need zero internet connection. Streaming and internet radio are opt-in features for when you do want to go online.",
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
  category: "Standalone audio mixer hardware",
  description:
    "Standalone hardware mixer running a custom Android 13 build, with real-time DSP, streaming, and recording built in. No laptop or companion app required. Requires a USB audio interface.",
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
  title: "MixDroid | Standalone Hardware Mixer for Podcasters & Streamers [Beta]",
  description:
    "Join the MixDroid beta: a standalone hardware mixer with real-time DSP, streaming, and recording built in. No laptop, no companion app. USB audio interface required.",
  ogTitle: "MixDroid | Standalone Hardware Mixer for Podcasters & Streamers",
  ogDescription:
    "Real-time DSP, streaming, recording, and radio — all inside the mixer itself. No laptop required. Built solo over 7 years.",
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
                A standalone hardware mixer.
                <span class="text-[var(--accent-cyan)]">It just happens to run Android.</span>
              </h1>

              <p class="max-w-prose text-base leading-7 text-[var(--text-muted)] sm:text-lg sm:leading-8">
                Plug in your mics with a USB audio interface, hit go — you're
                live in two minutes. No laptop, no phone app, no separate
                computer anywhere in the signal chain. DSP, streaming, and
                recording all run inside the mixer itself.
              </p>

              <div class="flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--text-dim)]">
                <span class="panel-chip">Podcasters</span>
                <span class="panel-chip">Streamers</span>
                <span class="panel-chip">Musicians</span>
                <span class="panel-chip">Content creators</span>
              </div>
            </div>

            <!-- What you're signing up for — objection handling before the form -->
            <div class="console-panel rounded-xl p-4 space-y-2">
              <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">
                What you're signing up for
              </p>
              <ul class="space-y-1.5 text-sm text-[var(--text-muted)]" role="list">
                <li class="flex items-start gap-2">
                  <span class="mt-0.5 shrink-0 text-[var(--accent-cyan)]" aria-hidden="true">→</span>
                  <span>A <span class="text-[var(--text-secondary)]">physical mixer</span> — not an app you install on a phone or tablet you already own</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="mt-0.5 shrink-0 text-[var(--accent-cyan)]" aria-hidden="true">→</span>
                  <span>Connects to <span class="text-[var(--text-secondary)]">any USB audio interface</span> for your mics and instruments</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="mt-0.5 shrink-0 text-[var(--accent-cyan)]" aria-hidden="true">→</span>
                  <span>Beta shipping soon — waitlist gets first access</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="mt-0.5 shrink-0 text-[var(--accent-cyan)]" aria-hidden="true">→</span>
                  <span>Expected priced below a comparable rack mixer + interface setup — joining is free, pricing sent to the list before launch</span>
                </li>
              </ul>
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
                    placeholder="you@yourmail.com"
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
              Real-time EQ, compression, and streaming — running standalone on
              dedicated hardware. No laptop anywhere in the signal chain.
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

      <!-- ── Explainer -->
      <section class="border-b border-white/8" aria-labelledby="explainer-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <h2 id="explainer-heading" class="sr-only">What is MixDroid</h2>
          <div class="grid gap-5 md:grid-cols-3">

            <!-- What is it -->
            <div class="console-panel rounded-xl p-6 space-y-4">
              <div class="flex items-center gap-3">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[var(--panel-line)] bg-[var(--panel-bg-strong)]" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2" stroke-linecap="round">
                    <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
                  </svg>
                </div>
                <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">What is it?</p>
              </div>
              <h3 class="text-xl font-semibold text-white">A real mixer. Standalone hardware.</h3>
              <p class="max-w-prose text-sm leading-7 text-[var(--text-muted)]">
                Not an app that approximates mixing. Not a companion controller
                for a phone you already own. MixDroid is a physical digital
                mixing console — EQ, compression, reverb, delay — running
                natively on its own dedicated device. Plug in a USB audio
                interface and you're mixing.
              </p>
            </div>

            <!-- Why it's interesting -->
            <div class="console-panel rounded-xl p-6 space-y-4">
              <div class="flex items-center gap-3">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[var(--panel-line)] bg-[var(--panel-bg-strong)]" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2" stroke-linecap="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                </div>
                <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">Why it's interesting</p>
              </div>
              <h3 class="text-xl font-semibold text-white">Your whole studio in one device.</h3>
              <p class="max-w-prose text-sm leading-7 text-[var(--text-muted)]">
                Podcasters can walk into any room and be live in two minutes.
                Streamers get a hardware mixer without the hardware price tag.
                Musicians get real DSP — not a mobile app pretending to be one.
                Because it runs on a custom Android build under the hood, you
                can install apps and manage your content workflow from the
                same screen you're mixing on.
              </p>
            </div>

            <!-- Why it's different -->
            <div class="console-panel rounded-xl p-6 space-y-4">
              <div class="flex items-center gap-3">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[var(--panel-line)] bg-[var(--panel-bg-strong)]" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2" stroke-linecap="round">
                    <path d="M12 2l3.1 6.3L22 9.3l-5 4.9 1.2 6.9L12 18l-6.2 3.1L7 14.2 2 9.3l6.9-1L12 2z"/>
                  </svg>
                </div>
                <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">Why it's different</p>
              </div>
              <h3 class="text-xl font-semibold text-white">Built to run without the internet.</h3>
              <ul class="space-y-3" role="list">
                <li class="flex items-start gap-3 text-sm leading-6 text-[var(--text-muted)]">
                  <span class="mt-1 shrink-0 text-[var(--accent-cyan)]" aria-hidden="true">→</span>
                  <span><span class="font-medium text-[var(--text-secondary)]">Android ecosystem inside.</span> Install F-Droid, NewPipe, Kodi, or request custom tools for your workflow.</span>
                </li>
                <li class="flex items-start gap-3 text-sm leading-6 text-[var(--text-muted)]">
                  <span class="mt-1 shrink-0 text-[var(--accent-cyan)]" aria-hidden="true">→</span>
                  <span><span class="font-medium text-[var(--text-secondary)]">Truly standalone.</span> No laptop, no phone app, no cloud. DSP runs on-device with near-zero latency whether you're online or not.</span>
                </li>
                <li class="flex items-start gap-3 text-sm leading-6 text-[var(--text-muted)]">
                  <span class="mt-1 shrink-0 text-[var(--accent-cyan)]" aria-hidden="true">→</span>
                  <span><span class="font-medium text-[var(--text-secondary)]">No Google, anywhere.</span> No account, no Play Store, no Firebase, no telemetry. Distributed outside Google's ecosystem entirely.</span>
                </li>
                <li class="flex items-start gap-3 text-sm leading-6 text-[var(--text-muted)]">
                  <span class="mt-1 shrink-0 text-[var(--accent-cyan)]" aria-hidden="true">→</span>
                  <span><span class="font-medium text-[var(--text-secondary)]">No subscriptions, ever.</span> One device. Everything included. No feature gated behind a plan.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      <!-- ── Features -->
      <section class="border-b border-white/8" aria-labelledby="features-heading">
        <div class="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10 lg:py-18">
          <div class="mb-10 space-y-3">
            <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">What's inside</p>
            <h2 id="features-heading" class="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              No companion app. No cloud processing. No driver setup.
            </h2>
            <p class="max-w-prose text-base leading-7 text-[var(--text-muted)]">
              Everything runs on the device — DSP engine, streaming stack, and
              recorder. Plug in, mix, go live.
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
                without a laptop in the room. After 7 years of solo development,
                the result is a standalone hardware mixer covering the full
                workflow: DSP, live streaming, recording, and internet radio —
                completely offline if needed.
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