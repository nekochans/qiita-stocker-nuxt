import QiitaStockApiFactory from '@/factory/qiitaStockApi'

const api = QiitaStockApiFactory.create()

export interface Category {
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

export type QiitaStockApi = {
  cancelAccount(): Promise<void>
}

export const cancelAccount = async () => {
  await api.cancelAccount()
}
