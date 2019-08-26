import axios, { AxiosResponse } from 'axios'
import {
  QiitaStockerError,
  QiitaStockApi,
  Page,
  FetchUncategorizedStockRequest,
  FetchUncategorizedStockResponse,
  SaveCategoryRequest,
  SaveCategoryResponse,
  FetchCategoriesRequest,
  FetchCategoriesResponse,
  UpdateCategoryRequest,
  UpdateCategoryResponse
} from '@/domain/domain'

export default class Api implements QiitaStockApi {
  /**
   * @return {Promise<void | never>}
   */
  cancelAccount(): Promise<void> {
    return axios
      .get('/api/cancel')
      .then(() => {
        return Promise.resolve()
      })
      .catch((axiosError: QiitaStockerError) => {
        return Promise.reject(axiosError.response.data)
      })
  }

  /**
   * @return {Promise<void | never>}
   */
  logout(): Promise<void> {
    return axios
      .get('/api/logout')
      .then(() => {
        return Promise.resolve()
      })
      .catch((axiosError: QiitaStockerError) => {
        return Promise.reject(axiosError.response.data)
      })
  }

  /**
   * @param request
   * @return {Promise<unknown>}
   */
  fetchCategories(
    request: FetchCategoriesRequest
  ): Promise<FetchCategoriesResponse[]> {
    return axios
      .get<FetchCategoriesResponse[]>(`${request.apiUrlBase}/api/categories`, {
        headers: {
          Authorization: `Bearer ${request.sessionId}`
        }
      })
      .then((axiosResponse: AxiosResponse) => {
        return Promise.resolve(axiosResponse.data)
      })
      .catch((axiosError: QiitaStockerError) => {
        return Promise.reject(axiosError.response.data)
      })
  }

  /**
   * @param request
   * @return {Promise<unknown>}
   */
  updateCategory(
    request: UpdateCategoryRequest
  ): Promise<UpdateCategoryResponse> {
    return axios
      .patch<UpdateCategoryResponse>(
        `${request.apiUrlBase}/api/categories/${request.categoryId}`,
        { name: request.name },
        {
          headers: {
            Authorization: `Bearer ${request.sessionId}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then((axiosResponse: AxiosResponse) => {
        return Promise.resolve(axiosResponse.data)
      })
      .catch((axiosError: QiitaStockerError) => {
        return Promise.reject(axiosError.response.data)
      })
  }

  /**
   * @param request
   * @return {Promise<FetchUncategorizedStockResponse | never>}
   */
  fetchUncategorizedStocks(
    request: FetchUncategorizedStockRequest
  ): Promise<FetchUncategorizedStockResponse> {
    return axios
      .get<FetchUncategorizedStockResponse>(
        `${request.apiUrlBase}/api/stocks?page=${request.page}&per_page=${request.parPage}`,
        {
          headers: {
            Authorization: `Bearer ${request.sessionId}`
          }
        }
      )
      .then((axiosResponse: AxiosResponse) => {
        const linkHeader: string = axiosResponse.headers.link
        const paging: Page[] = this.parseLinkHeader(linkHeader)

        const response: FetchUncategorizedStockResponse = {
          stocks: axiosResponse.data,
          paging
        }

        return Promise.resolve(response)
      })
      .catch((axiosError: QiitaStockerError) => {
        return Promise.reject(axiosError.response.data)
      })
  }

  /**
   * @param request
   * @return {Promise<any | never>}
   */
  saveCategory(request: SaveCategoryRequest): Promise<SaveCategoryResponse> {
    return axios
      .post<SaveCategoryResponse>(
        `${request.apiUrlBase}/api/categories`,
        { name: request.name },
        {
          headers: {
            Authorization: `Bearer ${request.sessionId}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then((axiosResponse: AxiosResponse) => {
        return Promise.resolve(axiosResponse.data)
      })
      .catch((axiosError: QiitaStockerError) => {
        return Promise.reject(axiosError.response.data)
      })
  }

  private parseLinkHeader(linkHeader: string): Page[] {
    let paging: Page[] = []

    if (linkHeader) {
      paging = linkHeader.split(',').map(info => {
        const matchesArray: any = info.match(
          /page=(.*?)&per_page=(.*?)>; rel="(\w+)"/
        )
        const castPage: number = parseInt(matchesArray[1])
        const castPerPage: number = parseInt(matchesArray[2])

        return {
          page: castPage,
          perPage: castPerPage,
          relation: matchesArray[3]
        }
      })
    }

    return paging
  }
}
