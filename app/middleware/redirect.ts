export default function({ store, redirect, route }: any) {
  const notRequiredAuthorization = ['/', '/signup', '/privacy', '/terms']

  if (notRequiredAuthorization.includes(route.path)) return

  if (store.getters['qiita/isLoggedIn'] && route.path === '/login') {
    return redirect('/stocks/all')
  }

  if (!store.getters['qiita/isLoggedIn'] && route.path !== '/login') {
    return redirect('/')
  }
}
