import consola from 'consola'
import app from './app'

const start = () => {
  app.listen(8080, '127.0.0.1')
  consola.ready({
    message: `Server listening on http://127.0.0.1:8080`,
    badge: true
  })
}
start()
