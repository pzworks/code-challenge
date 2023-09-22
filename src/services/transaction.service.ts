import {TransactionRepository} from "../repositories/transaction.repository";

export class TransactionService {
  constructor(private repository: TransactionRepository) {}
  getTransactions = () => {
    const revolutTransactions = this.repository.getTransactionsFrom('revolut')
  }
}
