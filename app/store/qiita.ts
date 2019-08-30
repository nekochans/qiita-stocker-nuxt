import { createNamespacedHelpers } from 'vuex'
import { DefineGetters, DefineMutations, DefineActions } from 'vuex-type-helper'
import * as EnvConstant from '../constants/envConstant'
import {
  cancelAccount,
  logout,
  fetchCategories,
  updateCategory,
  fetchUncategorizedStocks,
  fetchCategorizedStocks,
  saveCategory,
  destroyCategory,
  categorize,
  UncategorizedStock,
  CategorizedStock,
  FetchUncategorizedStockRequest,
  Page,
  FetchCategoriesRequest,
  FetchCategoriesResponse,
  FetchCategorizedStockRequest,
  FetchCategorizedStockResponse,
  UpdateCategoryRequest,
  UpdateCategoryResponse,
  FetchUncategorizedStockResponse,
  Category,
  SaveCategoryRequest,
  SaveCategoryResponse,
  DestroyCategoryRequest,
  CategorizeRequest
} from '@/domain/domain'

export type QiitaState = {
  sessionId: string
  displayCategoryId: number
  categories: Category[]
  uncategorizedStocks: UncategorizedStock[]
  categorizedStock: CategorizedStock[]
  isCategorizing: boolean
  isCancelingCategorization: boolean
  isLoading: boolean
  currentPage: number
  paging: Page[]
}

export interface QiitaGetters {
  isLoggedIn: boolean
  currentPage: number
  firstPage: Page
  prevPage: Page
  nextPage: Page
  lastPage: Page
  checkedStockArticleIds: string[]
  displayCategoryId: number
  categories: Category[]
  displayCategories: Category[]
  uncategorizedStocks: UncategorizedStock[]
  isCategorizing: boolean
  isCancelingCategorization: boolean
  isLoading: boolean
}

export interface QiitaMutations {
  saveSessionId: {
    sessionId: string
  }
  saveUncategorizedStocks: {
    uncategorizedStocks: UncategorizedStock[]
  }
  saveCategorizedStocks: {
    categorizedStocks: CategorizedStock[]
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
  setIsCategorizing: {}
  checkStock: {
    stock: UncategorizedStock
    isChecked: boolean
  }
  uncheckStock: {}
  updateStockCategory: {
    stockArticleIds: string[]
    category: Category
  }
}

export interface QiitaActions {
  saveSessionIdAction: {
    sessionId: string
  }
  cancelAction: {}
  fetchUncategorizedStocks: Page
  fetchCategorizedStock: FetchCategorizedStockPayload
  logoutAction: {}
  fetchCategory: {}
  updateCategory: UpdateCategoryPayload
  saveCategory: string
  destroyCategory: number
  setIsCategorizing: {}
  categorize: CategorizePayload
  checkStock: UncategorizedStock
}

export const state = (): QiitaState => ({
  sessionId: '',
  displayCategoryId: 0,
  categories: [],
  uncategorizedStocks: [],
  categorizedStock: [],
  isCategorizing: false,
  isCancelingCategorization: false,
  isLoading: true,
  currentPage: 1,
  paging: []
})

export type UpdateCategoryPayload = {
  stateCategory: Category
  categoryName: string
}

export type CategorizePayload = {
  category: Category
  stockArticleIds: string[]
}

export type FetchCategorizedStockPayload = {
  page: Page
  categoryId: number
}

export const getters: DefineGetters<QiitaGetters, QiitaState> = {
  isLoggedIn: (state): boolean => {
    return !!state.sessionId
  },
  currentPage: (state): number => {
    return state.currentPage
  },
  firstPage: (state): Page => {
    const page: Page | undefined = state.paging.find(page => {
      return page.relation === 'first'
    })

    if (page !== undefined) {
      return page
    }
    return { page: 0, perPage: 0, relation: '' }
  },
  prevPage: (state): Page => {
    const page: Page | undefined = state.paging.find(page => {
      return page.relation === 'prev'
    })

    if (page !== undefined) {
      return page
    }
    return { page: 0, perPage: 0, relation: '' }
  },
  nextPage: (state): Page => {
    const page: Page | undefined = state.paging.find(page => {
      return page.relation === 'next'
    })

    if (page !== undefined) {
      return page
    }
    return { page: 0, perPage: 0, relation: '' }
  },
  lastPage: (state): Page => {
    const page: Page | undefined = state.paging.find(page => {
      return page.relation === 'last'
    })

    if (page !== undefined) {
      return page
    }
    return { page: 0, perPage: 0, relation: '' }
  },
  checkedStockArticleIds: (state): string[] => {
    return state.uncategorizedStocks
      .filter(stock => stock.isChecked)
      .map(stock => stock.article_id)
  },
  displayCategoryId: (state): number => {
    return state.displayCategoryId
  },
  categories: (state): Category[] => {
    return state.categories
  },
  displayCategories: (state): Category[] => {
    return state.categories.filter(
      category => category.categoryId !== state.displayCategoryId
    )
  },
  uncategorizedStocks: (state): UncategorizedStock[] => {
    return state.uncategorizedStocks
  },
  isCategorizing: (state): boolean => {
    return state.isCategorizing
  },
  isCancelingCategorization: (state): boolean => {
    return state.isCancelingCategorization
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
  saveCategorizedStocks: (state, { categorizedStocks }) => {
    state.categorizedStock = categorizedStocks
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
  },
  setIsCategorizing: state => {
    state.isCategorizing = !state.isCategorizing
  },
  checkStock: (_state, { stock, isChecked }) => {
    stock.isChecked = isChecked
  },
  uncheckStock: state => {
    state.uncategorizedStocks
      .filter(stock => stock.isChecked)
      .map(stock => (stock.isChecked = !stock.isChecked))
  },
  updateStockCategory: (state, { stockArticleIds, category }) => {
    state.uncategorizedStocks.map(stock => {
      if (stockArticleIds.includes(stock.article_id)) {
        stock.category = category
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
      commit('setIsLoading', { isLoading: true })

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
      commit('setIsLoading', { isLoading: false })
      return Promise.reject(error)
    }
  },
  fetchCategorizedStock: async (
    { commit, state },
    payload: FetchCategorizedStockPayload
  ): Promise<void> => {
    try {
      commit('setIsLoading', { isLoading: true })

      if (payload.page.page === 0) {
        payload.page = {
          page: 1,
          perPage: 20,
          relation: ''
        }
      }

      const fetchCategorizedStockRequest: FetchCategorizedStockRequest = {
        apiUrlBase: EnvConstant.apiUrlBase(),
        sessionId: state.sessionId,
        categoryId: payload.categoryId,
        page: payload.page.page,
        parPage: payload.page.perPage
      }

      const fetchCategorizedStockResponse: FetchCategorizedStockResponse = await fetchCategorizedStocks(
        fetchCategorizedStockRequest
      )

      const categorizedStocks: CategorizedStock[] = []
      for (const stock of fetchCategorizedStockResponse.stocks) {
        const date: string[] = stock.article_created_at.split(' ')
        stock.article_created_at = date[0]
        const categorizedStock: CategorizedStock = Object.assign(stock, {
          isChecked: false
        })
        categorizedStocks.push(categorizedStock)
      }

      commit('saveCategorizedStocks', { categorizedStocks })
      commit('savePaging', { paging: fetchCategorizedStockResponse.paging })
      commit('saveCurrentPage', { currentPage: payload.page.page })
      commit('setIsLoading', { isLoading: false })
    } catch (error) {
      commit('setIsLoading', { isLoading: false })

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
  },
  setIsCategorizing: ({ commit }) => {
    commit('setIsCategorizing', {})
  },
  categorize: async (
    { commit, state },
    categorizePayload: CategorizePayload
  ): Promise<void> => {
    try {
      const categorizeRequest: CategorizeRequest = {
        apiUrlBase: EnvConstant.apiUrlBase(),
        sessionId: state.sessionId,
        categoryId: categorizePayload.category.categoryId,
        articleIds: categorizePayload.stockArticleIds
      }

      await categorize(categorizeRequest)
      commit('uncheckStock', {})
      // TODO カテゴライズされたストック一覧を表示する機能を作成する際に対応する
      // commit("removeCategorizedStocks", categorizePayload.stockArticleIds);
      commit('updateStockCategory', {
        stockArticleIds: categorizePayload.stockArticleIds,
        category: categorizePayload.category
      })
    } catch (error) {
      return Promise.reject(error)
    }
  },
  checkStock: ({ commit }, stock: UncategorizedStock): void => {
    commit('checkStock', { stock, isChecked: !stock.isChecked })
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
