import axios, { AxiosError } from 'axios'
import { QiitaStockApi } from '@/domain/domain'

export default class Api implements QiitaStockApi {
  /**
   * @return {Promise<void | never>}
   */
  cancelAccount(): Promise<void> {
    return axios
      .get('/api/cancel')
      .then(() => {
        return Promise.resolve()
      })
      .catch((axiosError: AxiosError) => {
        return Promise.reject(axiosError)
      })
  }
}
