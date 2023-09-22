import express from 'express'
import * as TransactionController from './../controllers/transaction'

const router = express.Router()

router.get('/:source?', TransactionController.get)

export default router
