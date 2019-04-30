import {
  ICreateAccountRequest,
  ICreateAccountResponse
} from '@/server/domain/auth'

export interface IQiitaStockerApi {
  createAccount(request: ICreateAccountRequest): Promise<ICreateAccountResponse>
}
