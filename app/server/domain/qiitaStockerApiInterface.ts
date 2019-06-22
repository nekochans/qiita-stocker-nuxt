import {
  CreateAccountRequest,
  CreateAccountResponse,
  IssueLoginSessionRequest,
  IssueLoginSessionResponse
} from '@/server/domain/auth'

import { CancelAccountRequest, LogoutRequest } from '@/server/domain/qiita'

export type Api = {
  createAccount(request: CreateAccountRequest): Promise<CreateAccountResponse>
  issueLoginSession(
    request: IssueLoginSessionRequest
  ): Promise<IssueLoginSessionResponse>
  cancelAccount(request: CancelAccountRequest): Promise<void>
  logout(request: LogoutRequest): Promise<void>
}
