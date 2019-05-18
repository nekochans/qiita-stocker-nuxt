import {
  CreateAccountRequest,
  CreateAccountResponse
} from '@/server/domain/auth'

export type Api = {
  createAccount(request: CreateAccountRequest): Promise<CreateAccountResponse>
}
