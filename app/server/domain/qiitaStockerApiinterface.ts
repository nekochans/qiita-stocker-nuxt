import {
  CreateAccountRequest,
  CreateAccountResponse,
  IssueLoginSessionRequest,
  IssueLoginSessionResponse
} from '@/server/domain/auth'

export type Api = {
  createAccount(request: CreateAccountRequest): Promise<CreateAccountResponse>
  issueLoginSession(
    request: IssueLoginSessionRequest
  ): Promise<IssueLoginSessionResponse>
}
