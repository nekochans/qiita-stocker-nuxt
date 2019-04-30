import {
  IFetchAuthenticatedUserRequest,
  IFetchAuthenticatedUserResponse,
  IIssueAccessTokensRequest,
  IIssueAccessTokensResponse
} from '@/server/domain/auth'

export interface IQiitaApi {
  issueAccessToken(
    request: IIssueAccessTokensRequest
  ): Promise<IIssueAccessTokensResponse>
  fetchAuthenticatedUser(
    request: IFetchAuthenticatedUserRequest
  ): Promise<IFetchAuthenticatedUserResponse>
}
