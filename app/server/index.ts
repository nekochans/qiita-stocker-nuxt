import express, { Router } from 'express'
import consola from 'consola'
import cookieParser from 'cookie-parser'
import config from '../../nuxt.config'
import weather from './api/weather'
import oauth from './auth/oauth'

const { Nuxt, Builder } = require('nuxt')
const app = express()
const router = Router()

router.use(oauth)
router.use(weather)
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(cookieParser())
  app.use('/api', router)
  app.use('/oauth', router)
  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
