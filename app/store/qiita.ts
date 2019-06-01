import { createNamespacedHelpers } from 'vuex'
import { cancelAccount } from '@/domain/domain'
import { DefineGetters, DefineMutations, DefineActions } from 'vuex-type-helper'

export type QiitaState = {
  sessionId: string
}

export interface QiitaGetters {
  isLoggedIn: boolean
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
  sessionId: ''
})

export const getters: DefineGetters<QiitaGetters, QiitaState> = {
  isLoggedIn: (state): boolean => {
    return !!state.sessionId
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
