import { createNamespacedHelpers } from 'vuex'
import {
  cancelAccount,
  UncategorizedStock,
  fetchUncategorizedStocks,
  FetchUncategorizedStockRequest,
  Page,
  FetchUncategorizedStockResponse
} from '@/domain/domain'
import { DefineGetters, DefineMutations, DefineActions } from 'vuex-type-helper'
import * as EnvConstant from '../constants/envConstant'

export type QiitaState = {
  sessionId: string
  uncategorizedStocks: UncategorizedStock[]
  isCategorizing: boolean
  isLoading: boolean
  currentPage: number
  paging: Page[]
}

export interface QiitaGetters {
  isLoggedIn: boolean
  uncategorizedStocks: UncategorizedStock[]
  isCategorizing: boolean
  isLoading: boolean
}

export interface QiitaMutations {
  saveSessionId: {
    sessionId: string
  }
  saveUncategorizedStocks: {
    uncategorizedStocks: UncategorizedStock[]
  }
  setIsLoading: {
    isLoading: boolean
  }
  saveCurrentPage: {
    currentPage: number
  }
  savePaging: {
    paging: Page[]
  }
}

export interface QiitaActions {
  saveSessionIdAction: {
    sessionId: string
  }
  cancelAction: {}
  fetchUncategorizedStocks: Page
}

export const state = (): QiitaState => ({
  sessionId: '',
  uncategorizedStocks: [],
  isCategorizing: false,
  isLoading: true,
  currentPage: 1,
  paging: []
})

export const getters: DefineGetters<QiitaGetters, QiitaState> = {
  isLoggedIn: (state): boolean => {
    return !!state.sessionId
  },
  uncategorizedStocks: (state): UncategorizedStock[] => {
    return state.uncategorizedStocks
  },
  isCategorizing: (state): boolean => {
    return state.isCategorizing
  },
  isLoading: (state): boolean => {
    return state.isLoading
  }
}

export const mutations: DefineMutations<QiitaMutations, QiitaState> = {
  saveSessionId: (state, { sessionId }) => {
    state.sessionId = sessionId
  },
  saveUncategorizedStocks: (state, { uncategorizedStocks }) => {
    state.uncategorizedStocks = uncategorizedStocks
  },
  setIsLoading: (state, { isLoading }) => {
    state.isLoading = isLoading
  },
  saveCurrentPage: (state, { currentPage }) => {
    state.currentPage = currentPage
  },
  savePaging: (state, { paging }) => {
    state.paging = paging
  }
}

export const actions: DefineActions<
  QiitaActions,
  QiitaState,
  QiitaMutations,
  QiitaGetters
> = {
  saveSessionIdAction: ({ commit }, sessionId) => {
    commit('saveSessionId', sessionId)
  },
  cancelAction: async ({ commit }) => {
    try {
      await cancelAccount()
      commit('saveSessionId', { sessionId: '' })
    } catch (error) {}
  },
  fetchUncategorizedStocks: async (
    { commit, state },
    page: Page = { page: state.currentPage, perPage: 20, relation: '' }
  ) => {
    try {
      const fetchStockRequest: FetchUncategorizedStockRequest = {
        apiUrlBase: EnvConstant.apiUrlBase(),
        sessionId: state.sessionId,
        page: page.page,
        parPage: page.perPage
      }

      const response: FetchUncategorizedStockResponse = await fetchUncategorizedStocks(
        fetchStockRequest
      )

      const uncategorizedStocks: UncategorizedStock[] = []
      for (const fetchStock of response.stocks) {
        const date: string[] = fetchStock.stock.article_created_at.split(' ')
        fetchStock.stock.article_created_at = date[0]
        const uncategorizedStock: UncategorizedStock = Object.assign(
          fetchStock.stock,
          { isChecked: false, category: fetchStock.category }
        )
        uncategorizedStocks.push(uncategorizedStock)
      }

      commit('saveUncategorizedStocks', { uncategorizedStocks })
      commit('setIsLoading', { isLoading: false })
      commit('savePaging', { paging: response.paging })
      commit('saveCurrentPage', { currentPage: page.page })
    } catch (error) {}
  }
}

export const {
  mapActions,
  mapGetters,
  mapMutations,
  mapState
} = createNamespacedHelpers<
  QiitaState,
  QiitaGetters,
  QiitaMutations,
  QiitaActions
>('qiita')
