// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxt/image'
  ],

  image: {
    // Calidad por defecto para WebP/AVIF
    quality: 80,
    // Formatos en orden de preferencia (el browser elige el mejor que soporte)
    format: ['avif', 'webp'],
    // Tamaños de pantalla para generar srcset automático
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536
    }
  },

  fonts: {
    families: [
      { name: 'Inter', provider: 'google' },
      { name: 'Playfair Display', provider: 'google' },
      { name: 'Caveat', provider: 'google', weights: [700] },
      { name: 'Rubik Dirt', provider: 'google' }
    ]
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15'
})
