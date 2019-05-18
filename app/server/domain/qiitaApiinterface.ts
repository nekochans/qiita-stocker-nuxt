import {
  FetchAuthenticatedUserRequest,
  FetchAuthenticatedUserResponse,
  IssueAccessTokensRequest,
  IssueAccessTokensResponse
} from '@/server/domain/auth'

export type Api = {
  issueAccessToken(
    request: IssueAccessTokensRequest
  ): Promise<IssueAccessTokensResponse>
  fetchAuthenticatedUser(
    request: FetchAuthenticatedUserRequest
  ): Promise<FetchAuthenticatedUserResponse>
}
