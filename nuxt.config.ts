// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@vercel/analytics/nuxt'],
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    brevoApiKey: process.env.BREVO_API_KEY ?? '',
    brevoListId: process.env.BREVO_LIST_ID ?? '',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
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
          "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
          "connect-src 'self' https://vitals.vercel-insights.com https://api.brevo.com",
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