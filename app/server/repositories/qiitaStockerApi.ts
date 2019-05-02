import axios, { AxiosResponse } from 'axios'
import { IQiitaStockerApi } from '@/server/domain/qiitaStockerApiinterface'
import {
  ICreateAccountRequest,
  ICreateAccountResponse,
  IQiitaStockerError
} from '@/server/domain/auth'

export default class QiitaStockerApi implements IQiitaStockerApi {
  createAccount(
    request: ICreateAccountRequest
  ): Promise<ICreateAccountResponse> {
    return axios
      .post<ICreateAccountResponse>(
        `${request.apiUrlBase}/api/accounts`,
        {
          qiitaAccountId: request.qiitaAccountId,
          permanentId: request.permanentId,
          accessToken: request.accessToken
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then((axiosResponse: AxiosResponse) => {
        return Promise.resolve(axiosResponse.data)
      })
      .catch((axiosError: IQiitaStockerError) => {
        return Promise.reject(axiosError)
      })
  }
}
