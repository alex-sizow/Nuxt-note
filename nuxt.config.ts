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



  // Prisma: do NOT inline native client so that the query engine (.node/.dll) loads correctly at runtime.
  // Leaving it external prevents Rollup from trying to bundle internal .prisma references ("default?commonjs-external" warning).
  nitro: {
    externals: {
      // Remove '@prisma/client' and 'prisma' from inline. If you previously added them, this reverts that.
      inline: []
    }
  },

  vite: {
    optimizeDeps: {
      // Exclude Prisma from dependency optimization (still fine). You could also remove this block.
      exclude: ['@prisma/client', 'prisma']
    }
  }
})