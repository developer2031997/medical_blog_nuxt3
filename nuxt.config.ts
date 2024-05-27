// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: [
    'bootstrap/dist/css/bootstrap.min.css'
  ],
  build: {
    transpile: []
  },
  modules: [
    '@nuxt/content'
  ],
  content :{
    
  },
  plugins: [
    { src: '~/plugins/bootstrap.client.ts', mode: 'client' },
  ],
  // Ensure you have the right settings for production
  target: 'server',
  ssr: true,
})
