import axios, { AxiosError, AxiosResponse } from 'axios'
import {
  QiitaStockApi,
  Page,
  FetchUncategorizedStockRequest,
  FetchUncategorizedStockResponse
} from '@/domain/domain'
import { QiitaStockerError } from '@/server/domain/auth'

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
      .catch((axiosError: AxiosError) => {
        return Promise.reject(axiosError)
      })
  }

  fetchUncategorizedStocks(
    request: FetchUncategorizedStockRequest
  ): Promise<FetchUncategorizedStockResponse> {
    return axios
      .get<FetchUncategorizedStockResponse>(
        `${request.apiUrlBase}/api/stocks?page=${request.page}&per_page=${
          request.parPage
        }`,
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
        return Promise.reject(axiosError)
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
