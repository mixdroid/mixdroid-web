// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Expose server-side env vars to the Nitro runtime
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
  hooks: {
    'pages:extend'(pages) {
      pages.push({
        name: 'features',
        path: '/features/',
        file: '~/pages/features.vue'
      },{
        name: 'about',
        path: '/about/',
        file: '~/pages/about.vue'
      })
    }
  }
})