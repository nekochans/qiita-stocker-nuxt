import { Router, Request, Response } from 'express'
import * as qiita from '../domain/qiita'
import * as auth from '../domain/auth'

const router = Router()

router.get('/cancel', async (req: Request, res: Response) => {
  try {
    await qiita.cancelAccount(req.cookies[auth.COOKIE_SESSION_ID])
    res.clearCookie(auth.COOKIE_SESSION_ID)
    return res.status(204).json()
  } catch (error) {
    return res
      .status(400)
      .send()
      .end()
  }
})

export default router
