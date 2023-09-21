import express from 'express'

const router = express.Router()

router.get('/:source?', (req: any, res: any) => {
  res.send({ transactions: [] })
})

export default router
