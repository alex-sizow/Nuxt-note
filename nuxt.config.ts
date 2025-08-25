// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: [
    '@/assets/styles/main.css'
  ],

  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL,
  },

  

  nitro: {
    externals: {
      inline: ['@prisma/client', 'prisma']
    }
  },

  vite: {
    optimizeDeps: {
      exclude: ['@prisma/client', 'prisma']
    }
  }
})