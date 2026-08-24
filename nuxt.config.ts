// https://nuxt.com/docs/api/configuration/nuxt-config

// GA4 is opt-in: set NUXT_PUBLIC_GA_MEASUREMENT_ID in your deployment env
// once you have a real GA4 property/Measurement ID. Until it's set, no
// analytics script is injected at all — CSP stays tight and no unused JS
// ships to visitors. (Vercel Analytics below is already live regardless.)
const gaId = process.env.NUXT_PUBLIC_GA_MEASUREMENT_ID ?? ''

const scriptSrc = ["'self'", "'unsafe-inline'", 'https://va.vercel-scripts.com']
const connectSrc = ["'self'", 'https://vitals.vercel-insights.com', 'https://api.brevo.com']

if (gaId) {
  scriptSrc.push('https://www.googletagmanager.com')
  connectSrc.push('https://www.google-analytics.com', 'https://analytics.google.com')
}

export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@vercel/analytics/nuxt'],
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    brevoApiKey: process.env.BREVO_API_KEY ?? '',
    brevoListId: process.env.BREVO_LIST_ID ?? '',
    public: {
      gaMeasurementId: gaId,
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      // Only injected once NUXT_PUBLIC_GA_MEASUREMENT_ID is set — see note above.
      script: gaId
        ? [
          { src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`, async: true },
          {
            innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`,
          },
        ]
        : [],
    },
  },

  routeRules: {
    '/**': {
      headers: {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
        'Content-Security-Policy': [
          "default-src 'self'",
          `script-src ${scriptSrc.join(' ')}`,
          `connect-src ${connectSrc.join(' ')}`,
          "frame-src https://www.youtube.com",
          "img-src 'self' data:",
          "style-src 'self' 'unsafe-inline'",
          "font-src 'self'",
        ].join('; '),
      },
    },
    '/_nuxt/**': {
      headers: { 'Cache-Control': 'public, max-age=31536000, immutable' },
    },
    '/images/**': {
      headers: { 'Cache-Control': 'public, max-age=2592000, stale-while-revalidate=86400' },
    },
  },
})