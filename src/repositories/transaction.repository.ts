import axios from "axios";
import acceptedSources from "../model/accepted-sources";

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
      .then(response => response)
      .catch((error) => {
        console.error('Wystąpił błąd podczas pobierania danych:', error);
      });
  }
}

