import { createNamespacedHelpers } from 'vuex'
import { cancelAccount, UncategorizedStock } from '@/domain/domain'
import { DefineGetters, DefineMutations, DefineActions } from 'vuex-type-helper'

export type QiitaState = {
  sessionId: string
  uncategorizedStocks: UncategorizedStock[]
  isCategorizing: boolean
  isLoading: boolean
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
}

export interface QiitaActions {
  saveSessionIdAction: {
    sessionId: string
  }
  cancelAction: {}
}

export const state = (): QiitaState => ({
  sessionId: '',
  uncategorizedStocks: [
    {
      article_id: 'c0a2609ae61a72dcc60f',
      title: 'title1',
      user_id: 'test-user1',
      profile_image_url:
        'https://avatars3.githubusercontent.com/u/32682645?v=4',
      article_created_at: '2018/09/30',
      tags: ['laravel', 'php'],
      isChecked: true
    },
    {
      article_id: 'c0a2609ae61a72dcc60a',
      title: 'title2',
      user_id: 'test-user12',
      profile_image_url:
        'https://avatars3.githubusercontent.com/u/32682645?v=4',
      article_created_at: '2018/09/30',
      tags: ['Vue.js', 'Vuex', 'TypeScript'],
      isChecked: false
    }
  ],
  isCategorizing: false,
  isLoading: true
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
