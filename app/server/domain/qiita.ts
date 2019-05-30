import QiitaStockerApiFactory from '../factroy/api/qiitaStockerApiFactory'
import { apiUrlBase } from '../constants/envConstant.ts'

const qiitaStockerApi = QiitaStockerApiFactory.create()

export type CancelAccountRequest = {
  apiUrlBase: string
  sessionId: string
}

export const cancelAccount = (sessionId: string): Promise<void> => {
  const cancelAccountRequest: CancelAccountRequest = {
    apiUrlBase: apiUrlBase(),
    sessionId: sessionId
  }

  return qiitaStockerApi.cancelAccount(cancelAccountRequest)
}
