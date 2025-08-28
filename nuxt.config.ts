// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'app',
  css: ["./app/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/install-integ/' : '/',
  },
  ssr: false,
  nitro: {
    preset: 'github-pages'
  },
  experimental: {
    payloadExtraction: false,
  },
})
