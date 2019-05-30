import { Router, Request, Response } from 'express'
import * as auth from '../domain/auth'

const router = Router()

router.get('/request/signup', (req: Request, res: Response) => {
  const authorizationState = auth.createAuthorizationState()
  const authorizationUrl = auth.createAuthorizationUrl(authorizationState)

  res.cookie(auth.COOKIE_AUTH_STATE, authorizationState, {
    path: '/',
    httpOnly: true
  })

  res.cookie(auth.COOKIE_ACCOUNT_ACTION, 'signUp', {
    path: '/',
    httpOnly: true
  })

  return res.redirect(302, authorizationUrl)
})

router.get('/request/login', (req: Request, res: Response) => {
  const authorizationState = auth.createAuthorizationState()
  const authorizationUrl = auth.createAuthorizationUrl(authorizationState)

  res.cookie(auth.COOKIE_AUTH_STATE, authorizationState, {
    path: '/',
    httpOnly: true
  })

  res.cookie(auth.COOKIE_ACCOUNT_ACTION, 'login', {
    path: '/',
    httpOnly: true
  })

  return res.redirect(302, authorizationUrl)
})

router.get('/callback', async (req: Request, res: Response) => {
  if (
    req.cookies[auth.COOKIE_AUTH_STATE] == null ||
    req.cookies[auth.COOKIE_AUTH_STATE] !== req.query.state
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
    req.cookies[auth.COOKIE_ACCOUNT_ACTION] !== 'signUp' &&
    req.cookies[auth.COOKIE_ACCOUNT_ACTION] !== 'login'
  ) {
    return res
      .status(400)
      .send()
      .end()
  }

  try {
    const sessionId = await auth.fetchSessionId(
      req.query.code,
      req.cookies[auth.COOKIE_ACCOUNT_ACTION]
    )
    res.clearCookie(auth.COOKIE_AUTH_STATE)
    res.clearCookie(auth.COOKIE_ACCOUNT_ACTION)
    res.cookie(auth.COOKIE_SESSION_ID, sessionId, {
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
