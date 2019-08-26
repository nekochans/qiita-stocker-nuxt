import { createNamespacedHelpers } from 'vuex'
import { DefineGetters, DefineMutations, DefineActions } from 'vuex-type-helper'
import * as EnvConstant from '../constants/envConstant'
import {
  cancelAccount,
  logout,
  fetchCategories,
  updateCategory,
  fetchUncategorizedStocks,
  saveCategory,
  destroyCategory,
  UncategorizedStock,
  FetchUncategorizedStockRequest,
  Page,
  FetchCategoriesRequest,
  FetchCategoriesResponse,
  UpdateCategoryRequest,
  UpdateCategoryResponse,
  FetchUncategorizedStockResponse,
  Category,
  SaveCategoryRequest,
  SaveCategoryResponse,
  DestroyCategoryRequest
} from '@/domain/domain'

export type QiitaState = {
  sessionId: string
  displayCategoryId: number
  categories: Category[]
  uncategorizedStocks: UncategorizedStock[]
  isCategorizing: boolean
  isLoading: boolean
  currentPage: number
  paging: Page[]
}

export interface QiitaGetters {
  isLoggedIn: boolean
  displayCategoryId: number
  categories: Category[]
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
  addCategory: Category
  saveCategories: {
    categories: Category[]
  }
  removeCategory: number
  updateCategory: {
    stateCategory: Category
    categoryName: string
  }
  updateStockCategoryName: Category
  removeCategoryFromStock: number
}

export interface QiitaActions {
  saveSessionIdAction: {
    sessionId: string
  }
  cancelAction: {}
  fetchUncategorizedStocks: Page
  logoutAction: {}
  fetchCategory: {}
  updateCategory: UpdateCategoryPayload
  saveCategory: string
  destroyCategory: number
}

export const state = (): QiitaState => ({
  sessionId: '',
  displayCategoryId: 0,
  categories: [
    { categoryId: 10, name: 'category name 1' },
    { categoryId: 20, name: 'category name 2' }
  ],
  uncategorizedStocks: [],
  isCategorizing: false,
  isLoading: true,
  currentPage: 1,
  paging: []
})

export type UpdateCategoryPayload = {
  stateCategory: Category
  categoryName: string
}

export const getters: DefineGetters<QiitaGetters, QiitaState> = {
  isLoggedIn: (state): boolean => {
    return !!state.sessionId
  },
  displayCategoryId: (state): number => {
    return state.displayCategoryId
  },
  categories: (state): Category[] => {
    return state.categories
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
  },
  saveCategories: (state, { categories }) => {
    state.categories = categories
  },
  removeCategory: (state, categoryId) => {
    state.categories = state.categories.filter(
      category => category.categoryId !== categoryId
    )
  },
  addCategory: (state, category) => {
    state.categories.push(category)
  },
  updateCategory: (
    _state,
    payload: { stateCategory: Category; categoryName: string }
  ) => {
    payload.stateCategory.name = payload.categoryName
  },
  updateStockCategoryName: (state, category) => {
    state.uncategorizedStocks.map(stock => {
      if (stock.category && stock.category.categoryId === category.categoryId) {
        stock.category = category
      }
    })
  },
  removeCategoryFromStock: (state, categoryId) => {
    state.uncategorizedStocks.map(stock => {
      if (stock.category && stock.category.categoryId === categoryId) {
        stock.category = undefined
      }
    })
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
  cancelAction: async ({ commit }): Promise<void> => {
    try {
      await cancelAccount()
      commit('saveSessionId', { sessionId: '' })
    } catch (error) {
      return Promise.reject(error)
    }
  },
  fetchUncategorizedStocks: async (
    { commit, state },
    page: Page = { page: state.currentPage, perPage: 20, relation: '' }
  ): Promise<void> => {
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
    } catch (error) {
      return Promise.reject(error)
    }
  },
  logoutAction: async ({ commit }): Promise<void> => {
    try {
      await logout()
      commit('saveSessionId', { sessionId: '' })
    } catch (error) {
      return Promise.reject(error)
    }
  },
  saveCategory: async ({ commit, state }, category): Promise<void> => {
    try {
      const saveCategoryRequest: SaveCategoryRequest = {
        apiUrlBase: EnvConstant.apiUrlBase(),
        name: category,
        sessionId: state.sessionId
      }

      const saveCategoryResponse: SaveCategoryResponse = await saveCategory(
        saveCategoryRequest
      )

      const savedCategory: Category = {
        categoryId: saveCategoryResponse.categoryId,
        name: saveCategoryResponse.name
      }

      commit('addCategory', savedCategory)
    } catch (error) {
      return Promise.reject(error)
    }
  },
  fetchCategory: async ({ commit, state }): Promise<void> => {
    try {
      const fetchCategoriesRequest: FetchCategoriesRequest = {
        apiUrlBase: EnvConstant.apiUrlBase(),
        sessionId: state.sessionId
      }

      const categories: FetchCategoriesResponse[] = await fetchCategories(
        fetchCategoriesRequest
      )

      commit('saveCategories', { categories })
    } catch (error) {
      return Promise.reject(error)
    }
  },
  updateCategory: async (
    { commit, state },
    updateCategoryItem: UpdateCategoryPayload
  ): Promise<void> => {
    try {
      const updateCategoryRequest: UpdateCategoryRequest = {
        apiUrlBase: EnvConstant.apiUrlBase(),
        sessionId: state.sessionId,
        categoryId: updateCategoryItem.stateCategory.categoryId,
        name: updateCategoryItem.categoryName
      }

      const updateCategoryResponse: UpdateCategoryResponse = await updateCategory(
        updateCategoryRequest
      )

      commit('updateCategory', {
        stateCategory: updateCategoryItem.stateCategory,
        categoryName: updateCategoryResponse.name
      })

      commit('updateStockCategoryName', {
        categoryId: updateCategoryItem.stateCategory.categoryId,
        name: updateCategoryResponse.name
      })
    } catch (error) {
      return Promise.reject(error)
    }
  },
  destroyCategory: async (
    { commit, state },
    categoryId: number
  ): Promise<void> => {
    try {
      const destroyCategoryRequest: DestroyCategoryRequest = {
        apiUrlBase: EnvConstant.apiUrlBase(),
        sessionId: state.sessionId,
        categoryId
      }

      await destroyCategory(destroyCategoryRequest)

      commit('removeCategory', categoryId)
      commit('removeCategoryFromStock', categoryId)

      // TODO 選択中のカテゴリが削除された場合の処理を追加
      // if (state.displayCategoryId === categoryId)
      //   return commit("saveDisplayCategoryId", 0);
    } catch (error) {
      return Promise.reject(error)
    }
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
