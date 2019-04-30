import { Router, Request, Response } from 'express'
import * as qiita from '../domain/auth'

const router = Router()

router.get('/request', (req: any, res: any) => {
  const authorizationState = qiita.createAuthorizationState()
  const authorizationUrl = qiita.createAuthorizationUrl(authorizationState)

  res.cookie('authorizationState', authorizationState, {
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

  try {
    const createAccountResponse = await qiita.fetchUser(req.query.code)
    return res.status(200).json({ code: createAccountResponse.accountId })
  } catch (error) {
    return res
      .status(400)
      .send()
      .end()
  }
})

export default router
