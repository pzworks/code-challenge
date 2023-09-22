import express from 'express'
import defaultRoutes from './routes/default.route'
import transactionRoutes from './routes/transaction.route'

export const app = express()
const port = 3000

app.use('/', defaultRoutes)
app.use('/transactions', transactionRoutes)

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
