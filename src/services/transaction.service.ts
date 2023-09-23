import {TransactionRepository} from "../repositories/transaction.repository";
import {Transaction} from "../model/transaction";
import acceptedSources from "../model/accepted-sources";

export class TransactionService {
  constructor(private repository: TransactionRepository) {}
  collectTransactions = async (selectedSource: string | null): Promise<Transaction[]> => {
    let collectedTransactions: Transaction[] = []
    let sources: string[] = acceptedSources;

    if (selectedSource !== null) {
      sources = [selectedSource]
    }

    for (const acceptedSource of sources) {
      const result = await this.repository.getTransactionsFrom(acceptedSource)
      if (result) {
        collectedTransactions = [...result]
      }
    }

    return collectedTransactions;
  }
}
