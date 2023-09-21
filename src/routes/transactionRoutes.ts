import express from 'express'
import acceptedSources from '../model/acceptedSources'

const router = express.Router()

router.get('/:source?', (req: any, res: any) => {
  const { source } = req.query

  if (source && !acceptedSources.includes(source)) {
    res.statusCode = 400
    return res.send({ error: 'Source unknown' })
  }

  res.send({ transactions: [] })
})

export default router
