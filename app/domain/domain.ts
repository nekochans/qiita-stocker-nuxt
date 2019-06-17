import QiitaStockApiFactory from '@/factory/qiitaStockApi'

const api = QiitaStockApiFactory.create()

export type Page = {
  page: number
  perPage: number
  relation: string
}

export type Category = {
  categoryId: number
  name: string
}

export type Stock = {
  article_id: string
  title: string
  user_id: string
  profile_image_url: string
  article_created_at: string
  tags: string[]
}

export type UncategorizedStock = Stock & {
  category?: Category
  isChecked: boolean
}

export type FetchUncategorizedStockRequest = {
  apiUrlBase: string
  sessionId: string
  page: number
  parPage: number
}

export type FetchUncategorizedStockResponse = {
  paging: Page[]
  stocks: { stock: Stock; category?: Category }[]
}

export type QiitaStockApi = {
  cancelAccount(): Promise<void>
  fetchUncategorizedStocks(
    request: FetchUncategorizedStockRequest
  ): Promise<FetchUncategorizedStockResponse>
}

export const cancelAccount = async () => {
  await api.cancelAccount()
}

export const fetchUncategorizedStocks = (
  request: FetchUncategorizedStockRequest
): Promise<FetchUncategorizedStockResponse> => {
  return api.fetchUncategorizedStocks(request)
}
