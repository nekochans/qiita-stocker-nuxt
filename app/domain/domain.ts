import QiitaStockApiFactory from '@/factory/qiitaStockApi'

const api = QiitaStockApiFactory.create()

export type QiitaStockApi = {
  cancelAccount(): Promise<void>
}

export const cancelAccount = async () => {
  await api.cancelAccount()
}
