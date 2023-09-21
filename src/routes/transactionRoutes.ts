import express from 'express'
import acceptedSources from '../model/acceptedSources'

const router = express.Router()

router.get('/:source?', (req: any, res: any) => {
  const { source } = req.query

  if (source && !acceptedSources.includes(source)) {
    return res.status(400).send({ error: 'Source unknown' })
  }

  res.send({ transactions: [] })
})

export default router
