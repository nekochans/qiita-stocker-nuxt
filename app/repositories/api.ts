import axios, { AxiosResponse } from 'axios'
import {
  QiitaStockerError,
  QiitaStockApi,
  Page,
  FetchUncategorizedStockRequest,
  FetchUncategorizedStockResponse,
  FetchCategorizedStockRequest,
  FetchCategorizedStockResponse,
  SaveCategoryRequest,
  SaveCategoryResponse,
  FetchCategoriesRequest,
  FetchCategoriesResponse,
  UpdateCategoryRequest,
  UpdateCategoryResponse,
  DestroyCategoryRequest,
  CategorizeRequest
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

  fetchCategorizedStocks(
    request: FetchCategorizedStockRequest
  ): Promise<FetchCategorizedStockResponse> {
    return axios
      .get<FetchCategorizedStockResponse>(
        `${request.apiUrlBase}/api/stocks/categories/${request.categoryId}?page=${request.page}&per_page=${request.parPage}`,
        {
          headers: {
            Authorization: `Bearer ${request.sessionId}`
          }
        }
      )
      .then((axiosResponse: AxiosResponse) => {
        const linkHeader: string = axiosResponse.headers.link
        const paging: Page[] = this.parseLinkHeader(linkHeader)

        const response: FetchCategorizedStockResponse = {
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

  /**
   * @param request
   * @return {Promise<void | never>}
   */
  destroyCategory(request: DestroyCategoryRequest): Promise<void> {
    return axios
      .delete(`${request.apiUrlBase}/api/categories/${request.categoryId}`, {
        headers: {
          Authorization: `Bearer ${request.sessionId}`,
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        return Promise.resolve()
      })
      .catch((axiosError: QiitaStockerError) => {
        return Promise.reject(axiosError.response.data)
      })
  }

  /**
   * @param request
   * @return {Promise<void | never>}
   */
  categorize(request: CategorizeRequest): Promise<void> {
    return axios
      .post(
        `${request.apiUrlBase}/api/categories/stocks`,
        {
          id: request.categoryId,
          articleIds: request.articleIds
        },
        {
          headers: {
            Authorization: `Bearer ${request.sessionId}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then(() => {
        return Promise.resolve()
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
