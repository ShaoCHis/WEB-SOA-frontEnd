export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'user',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  
  /*
   ** Style Ressources configuration
   ** See https://axios.nuxtjs.org/options
   */
   styleResources: {
    scss: '~/styles/variables.scss',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/styles/variables.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // nuxt.config.js
    // Simple usage
    '@nuxtjs/vuetify',

    // With options
    //['@nuxtjs/vuetify', { /* 模块选项 */ } ]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  },

  axios: {
    proxy: true
  },
  /*
   ** proxy
   */
  proxy: {
    "/api": "http://139.196.194.51:18080"
  },
}
