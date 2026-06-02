<script setup lang="ts">
useSeoMeta({
  title: "Privacy Policy — MixDroid",
  description: "How MixDroid collects and uses your data.",
  robots: "index,follow",
});
useHead({
  link: [{ rel: "canonical", href: "https://mixdroid-web.vercel.app/privacy" }],
});
</script>

<template>
  <div class="min-h-screen bg-[var(--page-bg)] text-[var(--text-primary)]">
    <AppNav />
    <main class="mx-auto max-w-3xl px-6 py-16 sm:px-8 lg:px-10">

      <div class="mb-10 space-y-3">
        <p class="font-mono text-[11px] uppercase tracking-[0.32em] text-[var(--accent-cyan)]">Legal</p>
        <h1 class="text-4xl font-semibold tracking-tight text-white">Privacy Policy</h1>
        <p class="text-sm text-[var(--text-dim)]">Last updated: June 2025</p>
      </div>

      <div class="space-y-8 text-base leading-8 text-[var(--text-muted)]">

        <section>
          <h2 class="mb-3 text-lg font-semibold text-white">What we collect</h2>
          <p>
            When you join the waitlist, we collect your email address. That's it.
            We do not collect your name, location, payment information, or any
            other personal data.
          </p>
        </section>

        <section>
          <h2 class="mb-3 text-lg font-semibold text-white">How we use it</h2>
          <p>
            Your email is used solely to send you updates about MixDroid —
            beta access notifications, release announcements, and early supporter
            pricing. We will never use it for advertising, sell it to third
            parties, or share it with anyone outside of the tools listed below.
          </p>
        </section>

        <section>
          <h2 class="mb-3 text-lg font-semibold text-white">Third-party services</h2>
          <ul class="mt-3 space-y-2">
            <li class="flex items-start gap-3">
              <span class="mt-1 shrink-0 text-[var(--accent-cyan)]">→</span>
              <span>
                <span class="font-medium text-[var(--text-secondary)]">Brevo</span>
                — email delivery and contact management.
                <a href="https://www.brevo.com/legal/privacypolicy/" target="_blank" rel="noopener noreferrer" class="text-[var(--accent-cyan)] hover:opacity-80">Brevo privacy policy ↗</a>
              </span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 shrink-0 text-[var(--accent-cyan)]">→</span>
              <span>
                <span class="font-medium text-[var(--text-secondary)]">Google Analytics (GA4)</span>
                — anonymous page-view analytics. IP addresses are anonymised.
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" class="text-[var(--accent-cyan)] hover:opacity-80">Google privacy policy ↗</a>
              </span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 shrink-0 text-[var(--accent-cyan)]">→</span>
              <span>
                <span class="font-medium text-[var(--text-secondary)]">Vercel</span>
                — website hosting. Standard server logs apply.
                <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" class="text-[var(--accent-cyan)] hover:opacity-80">Vercel privacy policy ↗</a>
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 class="mb-3 text-lg font-semibold text-white">Your rights</h2>
          <p>
            You can request deletion of your email from the waitlist at any time
            by emailing
            <a href="mailto:joe.kaikaty@gmail.com" class="text-[var(--accent-cyan)] hover:opacity-80">joe.kaikaty@gmail.com</a>.
            We will remove your data within 7 days.
          </p>
        </section>

        <section>
          <h2 class="mb-3 text-lg font-semibold text-white">Contact</h2>
          <p>
            For any privacy-related questions, contact
            <a href="mailto:joe.kaikaty@gmail.com" class="text-[var(--accent-cyan)] hover:opacity-80">joe.kaikaty@gmail.com</a>.
          </p>
        </section>

      </div>
    </main>
    <AppFooter />
  </div>
</template>