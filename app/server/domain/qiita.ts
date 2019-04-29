import url from 'url'
import uuid from 'uuid'
import QiitaApi from '../repositories/qiitaApi'
import { clientId, clientSecret } from '../constants/qiita'

const qiitaApi = new QiitaApi()

export interface IQiitaApi {
  issueAccessToken(
    request: IIssueAccessTokensRequest
  ): Promise<IIssueAccessTokensResponse>
  fetchAuthenticatedUser(
    request: IFetchAuthenticatedUserRequest
  ): Promise<IFetchAuthenticatedUserResponse>
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
 * @return {Promise<IFetchAuthenticatedUserResponse>}
 */
export const fetchUser = async (authorizationCode: string) => {
  const issueAccessTokensRequest: IIssueAccessTokensRequest = {
    client_id: clientId(),
    client_secret: clientSecret(),
    code: authorizationCode
  }

  const response: IIssueAccessTokensResponse = await qiitaApi.issueAccessToken(
    issueAccessTokensRequest
  )

  const fetchAuthenticatedUserRequest: IFetchAuthenticatedUserRequest = {
    accessToken: response.token
  }

  const authenticatedUser: IFetchAuthenticatedUserResponse = await qiitaApi.fetchAuthenticatedUser(
    fetchAuthenticatedUserRequest
  )
  return authenticatedUser
}
