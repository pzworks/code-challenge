import acceptedSources from '../model/accepted-sources'
import { Request, Response } from 'express'

export async function get(req: Request, res: Response) {
  const { source } = req.query

  if (source && !acceptedSources.includes(source.toString())) {
    return res.status(400).send({ error: 'Source unknown' })
  }

  res.send({ transactions: [] })
}
