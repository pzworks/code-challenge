import acceptedSources from '../model/accepted-sources'
import { Request, Response } from 'express'
import {TransactionService} from "../services/transaction.service";
import {Container} from "typedi";

export async function get(req: Request, res: Response) {
  const { source } = req.query
  const service = Container.get(TransactionService);

  if (source && !acceptedSources.includes(source.toString())) {
    return res.status(400).send({ error: 'Unrecognized source.' })
  }

  const transactions = await service.collectTransactions(source ? source.toString() : null)

  res.send({ transactions })
}
