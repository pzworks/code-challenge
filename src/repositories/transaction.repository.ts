import axios, {AxiosResponse} from "axios";
import acceptedSources from "../model/accepted-sources";
import {getTransformedBySource} from "../transformers/transaction.transformer";
import {MonzoTransaction, RevolutTransaction, SterlingTransaction, Transaction} from "../model/transaction";

const apiUrl = 'http://127.0.0.1:4010/api/'

export class TransactionRepository {
  getTransactionsFrom = async (source: string): Promise<Transaction[] | void> => {
    if (acceptedSources.includes(source))

    return axios.get(`${apiUrl}${source}`)
      .then((response: AxiosResponse<RevolutTransaction[] | MonzoTransaction[] | SterlingTransaction[]>) => {
        const transformedTransactions: Transaction[] = [];
        if (response.status === 200) {
          response.data.forEach((transaction: RevolutTransaction | MonzoTransaction | SterlingTransaction ) => {
            const transformed = getTransformedBySource(source, transaction)
            if (transformed) {
              transformedTransactions.push();
            }
          })
        }

        return transformedTransactions;
      })
      .catch((error) => {
        console.error('Wystąpił błąd podczas pobierania danych:', error);
      });
  }
}

