require('dotenv').config()

const env = {
  ENDPOINT_URL: process.env.ENDPOINT_URL,
}

export default {
  env,

  srcDir: 'src/',
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Twitterの動画を簡単に保存できる',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Twitterの動画を簡単に保存できる',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/tailwindcss',
    [
      '@nuxt/typescript-build',
      {
        typeCheck: true,
        ignoreNotFoundWarnings: true,
      },
    ],
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  router: {
    base: '/',
  },
}
