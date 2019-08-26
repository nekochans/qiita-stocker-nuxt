import { AxiosError, AxiosResponse } from 'axios'
import QiitaStockApiFactory from '@/factory/qiitaStockApi'

const api = QiitaStockApiFactory.create()

type QiitaStockerErrorData = {
  code: number
  message: string
}

export type QiitaStockerError = AxiosError & {
  response: AxiosResponse<QiitaStockerErrorData>
}

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

export type FetchCategoriesRequest = {
  apiUrlBase: string
  sessionId: string
}
export type FetchCategoriesResponse = Category & {}

export type UpdateCategoryRequest = {
  apiUrlBase: string
  sessionId: string
  categoryId: number
  name: string
}
export type UpdateCategoryResponse = Category & {}

export type DestroyCategoryRequest = {
  apiUrlBase: string
  sessionId: string
  categoryId: number
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

export type SaveCategoryRequest = {
  apiUrlBase: string
  name: string
  sessionId: string
}

export type SaveCategoryResponse = Category & {}

export type QiitaStockApi = {
  cancelAccount(): Promise<void>
  logout(): Promise<void>
  fetchCategories(
    request: FetchCategoriesRequest
  ): Promise<FetchCategoriesResponse[]>
  updateCategory(
    request: UpdateCategoryRequest
  ): Promise<UpdateCategoryResponse>
  fetchUncategorizedStocks(
    request: FetchUncategorizedStockRequest
  ): Promise<FetchUncategorizedStockResponse>
  saveCategory(request: SaveCategoryRequest): Promise<SaveCategoryResponse>
  destroyCategory(request: DestroyCategoryRequest): Promise<void>
}

export const cancelAccount = async () => {
  await api.cancelAccount()
}

export const logout = async () => {
  await api.logout()
}

export const fetchCategories = (
  request: FetchCategoriesRequest
): Promise<FetchCategoriesResponse[]> => {
  return api.fetchCategories(request)
}

export const updateCategory = (
  request: UpdateCategoryRequest
): Promise<UpdateCategoryResponse> => {
  return api.updateCategory(request)
}

export const fetchUncategorizedStocks = (
  request: FetchUncategorizedStockRequest
): Promise<FetchUncategorizedStockResponse> => {
  return api.fetchUncategorizedStocks(request)
}

export const saveCategory = (
  request: SaveCategoryRequest
): Promise<SaveCategoryResponse> => {
  return api.saveCategory(request)
}

export const destroyCategory = (
  request: DestroyCategoryRequest
): Promise<void> => {
  return api.destroyCategory(request)
}
