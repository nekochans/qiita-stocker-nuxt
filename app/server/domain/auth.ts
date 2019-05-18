import url from 'url'
import uuid from 'uuid'
import { AxiosResponse, AxiosError } from 'axios'
import QiitaApiFactory from '../factroy/api/qiitaApiFactory'
import QiitaStockerpiFactory from '../factroy/api/qiitaStockerApiFactory'
import { clientId, clientSecret, apiUrlBase } from '../constants/envConstant.ts'

const qiitaApi = QiitaApiFactory.create()
const qiitaStockerApi = QiitaStockerpiFactory.create()

type QiitaStockerErrorData = {
  code: number
  message: string
}

export type IQiitaStockerError = AxiosError & {
  response: AxiosResponse<QiitaStockerErrorData>
}

export type IssueAccessTokensRequest = {
  client_id: string
  client_secret: string
  code: string
}

export type IssueAccessTokensResponse = {
  client_id: string
  scopes: string[]
  token: string
}

export type FetchAuthenticatedUserRequest = {
  accessToken: string
}

export type FetchAuthenticatedUserResponse = {
  id: string
  permanent_id: string
}

export type CreateAccountRequest = {
  apiUrlBase: string
  qiitaAccountId: string
  permanentId: string
  accessToken: string
}

export type CreateAccountResponse = {
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
): Promise<CreateAccountResponse> => {
  const issueAccessTokensRequest: IssueAccessTokensRequest = {
    client_id: clientId(),
    client_secret: clientSecret(),
    code: authorizationCode
  }

  const issueAccessTokenResponse: IssueAccessTokensResponse = await qiitaApi.issueAccessToken(
    issueAccessTokensRequest
  )

  const fetchAuthenticatedUserRequest: FetchAuthenticatedUserRequest = {
    accessToken: issueAccessTokenResponse.token
  }

  const authenticatedUser: FetchAuthenticatedUserResponse = await qiitaApi.fetchAuthenticatedUser(
    fetchAuthenticatedUserRequest
  )

  const createAccountRequest: CreateAccountRequest = {
    apiUrlBase: apiUrlBase(),
    qiitaAccountId: authenticatedUser.id,
    permanentId: authenticatedUser.permanent_id,
    accessToken: issueAccessTokenResponse.token
  }

  const createAccountResponse: CreateAccountResponse = await qiitaStockerApi.createAccount(
    createAccountRequest
  )
  return createAccountResponse
}
