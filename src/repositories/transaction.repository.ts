import axios, {AxiosResponse} from "axios"
import acceptedSources from "../model/accepted-sources"
import {getTransformedBySource} from "../transformers/transaction.transformer"
import {MonzoTransaction, RevolutTransaction, SterlingTransaction, Transaction} from "../model/transaction"
import {Service} from "typedi"

const apiUrl = 'http://127.0.0.1:4010/api/'

@Service()
export class TransactionRepository {
  getTransactionsFrom = async (source: string): Promise<Transaction[]> => {
    if (source && !acceptedSources.includes(source)) {
      return []
    }

    return axios.get(`${apiUrl}${source}`)
      .then((response: AxiosResponse<RevolutTransaction[] | MonzoTransaction[] | SterlingTransaction[]>) => {
        let transformedTransactions: Transaction[] = []

        if (response.status !== 200) {
          return []
        }

        for (const transaction of response.data) {
          const transformed = getTransformedBySource(source, transaction)
          if (transformed) {
            transformedTransactions = [...transformedTransactions, transformed]
          }
        }
        return transformedTransactions
      })
      .catch((error) => {
        console.error('Repository error', error)
        return []
      })
  }
}

