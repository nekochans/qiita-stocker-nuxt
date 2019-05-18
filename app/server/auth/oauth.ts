import { Router, Request, Response } from 'express'
import * as qiita from '../domain/auth'

const router = Router()

router.get('/request/signup', (req: Request, res: Response) => {
  const authorizationState = qiita.createAuthorizationState()
  const authorizationUrl = qiita.createAuthorizationUrl(authorizationState)

  res.cookie('authorizationState', authorizationState, {
    path: '/',
    httpOnly: true
  })

  res.cookie('accountAction', 'signUp', {
    path: '/',
    httpOnly: true
  })

  return res.redirect(302, authorizationUrl)
})

router.get('/request/login', (req: Request, res: Response) => {
  const authorizationState = qiita.createAuthorizationState()
  const authorizationUrl = qiita.createAuthorizationUrl(authorizationState)

  res.cookie('authorizationState', authorizationState, {
    path: '/',
    httpOnly: true
  })

  res.cookie('accountAction', 'login', {
    path: '/',
    httpOnly: true
  })

  return res.redirect(302, authorizationUrl)
})

router.get('/callback', async (req: Request, res: Response) => {
  if (
    req.cookies.authorizationState == null ||
    req.cookies.authorizationState !== req.query.state
  ) {
    return res
      .status(400)
      .send()
      .end()
  }

  if (req.query.code == null) {
    return res
      .status(400)
      .send()
      .end()
  }

  if (
    req.cookies.accountAction !== 'signUp' &&
    req.cookies.accountAction !== 'login'
  ) {
    return res
      .status(400)
      .send()
      .end()
  }

  try {
    const sessionId = await qiita.fetchSessionId(
      req.query.code,
      req.cookies.accountAction
    )
    res.clearCookie('authorizationState')
    res.clearCookie('accountAction')
    res.cookie('sessionId', sessionId, {
      path: '/',
      httpOnly: true
    })

    return res.status(200).json({ code: sessionId })
  } catch (error) {
    return res
      .status(400)
      .send()
      .end()
  }
})

export default router
