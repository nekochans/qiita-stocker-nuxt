import { Router } from 'express'

const router = Router()

router.get('/weather', (_req: any, res: any) => {
  return res.status(200).json({ message: 'Sunny' })
})

export default router
