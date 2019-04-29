import axios, { AxiosResponse, AxiosError } from 'axios'

import {
  IQiitaApi,
  IIssueAccessTokensRequest,
  IIssueAccessTokensResponse,
  IFetchAuthenticatedUserResponse,
  IFetchAuthenticatedUserRequest
} from '@/server/domain/qiita'

export default class QiitaApi implements IQiitaApi {
  /**
   * @param request
   * @return {Promise<any | never>}
   */
  issueAccessToken(
    request: IIssueAccessTokensRequest
  ): Promise<IIssueAccessTokensResponse> {
    return axios
      .post<IIssueAccessTokensResponse>(
        `https://qiita.com/api/v2/access_tokens`,
        request
      )
      .then((axiosResponse: AxiosResponse) => {
        return Promise.resolve(axiosResponse.data)
      })
      .catch((axiosError: AxiosError) => {
        return Promise.reject(axiosError)
      })
  }

  /**
   * @param request
   * @return {Promise<any | never>}
   */
  fetchAuthenticatedUser(
    request: IFetchAuthenticatedUserRequest
  ): Promise<IFetchAuthenticatedUserResponse> {
    return axios
      .get<IFetchAuthenticatedUserResponse>(
        `https://qiita.com/api/v2/authenticated_user`,
        {
          headers: { Authorization: `Bearer ${request.accessToken}` }
        }
      )
      .then((axiosResponse: AxiosResponse) => {
        return Promise.resolve(axiosResponse.data)
      })
      .catch((axiosError: AxiosError) => {
        return Promise.reject(axiosError)
      })
  }
}
