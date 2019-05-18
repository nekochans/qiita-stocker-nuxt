import Cookies from 'universal-cookie'

export default ({ req, store }: any) => {
  if (process.browser) return

  const cookies = new Cookies(req.headers.cookie)
  const sessionId = cookies.get('sessionId')

  if (sessionId) store.dispatch('qiita/saveSessionId', sessionId)
}
