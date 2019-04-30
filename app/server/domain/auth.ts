import url from 'url'
import uuid from 'uuid'
import { AxiosResponse, AxiosError } from 'axios'
import QiitaApiFactory from '../factroy/api/qiitaApiFactory'
import QiitaStockerpiFactory from '../factroy/api/qiitaStockerApiFactory'
import { clientId, clientSecret, apiUrlBase } from '../constants/envConstant.ts'

const qiitaApi = QiitaApiFactory.create()
const qiitaStockerApi = QiitaStockerpiFactory.create()

interface IQiitaStockerErrorData {
  code: number
  message: string
}

export interface IQiitaStockerError extends AxiosError {
  response: AxiosResponse<IQiitaStockerErrorData>
}

export interface IIssueAccessTokensRequest {
  client_id: string
  client_secret: string
  code: string
}

export interface IIssueAccessTokensResponse {
  client_id: string
  scopes: string[]
  token: string
}

export interface IFetchAuthenticatedUserRequest {
  accessToken: string
}

export interface IFetchAuthenticatedUserResponse {
  id: string
  permanent_id: string
}

export interface ICreateAccountRequest {
  apiUrlBase: string
  qiitaAccountId: string
  permanentId: string
  accessToken: string
}

export interface ICreateAccountResponse {
  accountId: string
  _embedded: { sessionId: string }
}

/**
 * @return {string}
 */
export const createAuthorizationState = (): string => {
  return uuid.v4()
}

/**
 * @param authorizationState
 * @return {string}
 */
export const createAuthorizationUrl = (authorizationState: string): string => {
  return url.format({
    protocol: 'https',
    host: 'qiita.com',
    pathname: '/api/v2/oauth/authorize',
    query: {
      client_id: clientId(),
      scope: 'read_qiita',
      state: authorizationState
    }
  })
}

/**
 * @param authorizationCode
 * @return {Promise<ICreateAccountResponse>}
 */
export const fetchUser = async (
  authorizationCode: string
): Promise<ICreateAccountResponse> => {
  const issueAccessTokensRequest: IIssueAccessTokensRequest = {
    client_id: clientId(),
    client_secret: clientSecret(),
    code: authorizationCode
  }

  const issueAccessTokenResponse: IIssueAccessTokensResponse = await qiitaApi.issueAccessToken(
    issueAccessTokensRequest
  )

  const fetchAuthenticatedUserRequest: IFetchAuthenticatedUserRequest = {
    accessToken: issueAccessTokenResponse.token
  }

  const authenticatedUser: IFetchAuthenticatedUserResponse = await qiitaApi.fetchAuthenticatedUser(
    fetchAuthenticatedUserRequest
  )

  const createAccountRequest: ICreateAccountRequest = {
    apiUrlBase: apiUrlBase(),
    qiitaAccountId: authenticatedUser.id,
    permanentId: authenticatedUser.permanent_id,
    accessToken: issueAccessTokenResponse.token
  }

  const createAccountResponse: ICreateAccountResponse = await qiitaStockerApi.createAccount(
    createAccountRequest
  )
  return createAccountResponse
}
