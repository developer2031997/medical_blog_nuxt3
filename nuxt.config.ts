// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    // '~~/layout/main.css',
  ],
  build: {
    transpile: []
  },
  modules: [
    '@nuxt/content',
    '@nuxtjs/google-fonts',
  ],
  googleFonts: {
    families: {
      Poppins: [300, 400, 500, 600, 700],
    },
    // display: 'swap', // Optional: ensures text remains visible during webfont load
  },
  content: {
  },
  plugins: [
    { src: '~/plugins/bootstrap.client.ts', mode: 'client' },
  ],
})
