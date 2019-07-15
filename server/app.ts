import express, { Router } from 'express'
import cookieParser from 'cookie-parser'
import config from '../nuxt.config'
import weather from './api/weather'
import qiita from './api/qiita'
import oauth from './auth/oauth'

const { Nuxt, Builder } = require('nuxt')
const app = express()
const router = Router()

router.use(oauth)
router.use(qiita)
router.use(weather)
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

app.use(cookieParser())
// BFF
app.use('/api', router)
app.use('/oauth', router)
// Give nuxt middleware to express
app.use(nuxt.render)

export default app
