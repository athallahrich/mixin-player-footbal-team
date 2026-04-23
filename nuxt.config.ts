// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      charset: 'utf-8',
    },
  },
  typescript: {
    strict: true,
  },
  tailwindcss: {
    configPath: '~/tailwind.config.ts',
  },
  nitro: {
    preset: 'vercel',
  },
})
