import axios from "axios";
import acceptedSources from "../model/accepted-sources";
import {getTransformedBySource} from "../transformers/transaction.transformer";
import {Transaction} from "../model/transaction";

const apiUrl = 'http://127.0.0.1:4010/api/'

export class TransactionRepository {
  getTransactionsFrom = async (source: string) => {
    if (acceptedSources.includes(source))

    return axios.get(`${apiUrl}${source}`)
      .then((response) => {
        if (response.status === 200) {
          return {
            transactions: response.data,
            source
          }
        } else {
          console.error('Błąd w odpowiedzi HTTP:', response.status);
        }
      })
      .then(response => {
        const transformedTransactions: Transaction[] = [];
      })
      .catch((error) => {
        console.error('Wystąpił błąd podczas pobierania danych:', error);
      });
  }
}

