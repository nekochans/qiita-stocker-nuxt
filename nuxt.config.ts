import NuxtConfiguration from '@nuxt/config'

const nuxtConfig: NuxtConfiguration = {
  mode: 'universal',
  srcDir: 'app',
  env: {
    apiUrlBase: process.env.API_URL_BASE || 'http://localhost:3000'
  },
  router: {
    middleware: ['authCookie', 'redirect'],
    extendRoutes(routes: any, resolve) {
      routes.push({
        name: 'original_error',
        path: '/error',
        props: true,
        component: resolve(__dirname, 'app/pages/error.vue')
      })
    }
  },
  render: {
    compressor: (req, res, next) => {
      next()
    }
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'Mindexer | Qiitaのストックを整理するためのサービスです',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Qiitaのストックを整理するためのサービスです'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['@fortawesome/fontawesome-free/css/all.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc:https://github.com/nuxt-community/modules/tree/master/packages/bulma
    '@nuxtjs/bulma',
    '@nuxtjs/markdownit'
  ],
  markdownit: {
    injected: true,
    breaks: true,
    html: true,
    linkify: true,
    typography: true,
    quotes: '“”‘’'
  },
  /*
   ** Build configuration
   */
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        if (!config.module) return
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|ts|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

export default nuxtConfig
