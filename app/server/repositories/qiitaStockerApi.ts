import axios, { AxiosResponse } from 'axios'
import { Api } from '@/server/domain/qiitaStockerApiinterface'
import {
  CreateAccountRequest,
  CreateAccountResponse,
  QiitaStockerError,
  IssueLoginSessionRequest,
  IssueLoginSessionResponse
} from '@/server/domain/auth'

export default class QiitaStockerApi implements Api {
  createAccount(request: CreateAccountRequest): Promise<CreateAccountResponse> {
    return axios
      .post<CreateAccountResponse>(
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
      .catch((axiosError: QiitaStockerError) => {
        return Promise.reject(axiosError)
      })
  }

  issueLoginSession(
    request: IssueLoginSessionRequest
  ): Promise<IssueLoginSessionResponse> {
    return axios
      .post<IssueLoginSessionResponse>(
        `${request.apiUrlBase}/api/login-sessions`,
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
      .catch((axiosError: QiitaStockerError) => {
        return Promise.reject(axiosError)
      })
  }
}
