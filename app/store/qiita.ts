import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from '@/store'
import { cancelAccount } from '@/domain/domain'

export type QiitaState = {
  sessionId: string
}

export const state = (): QiitaState => ({
  sessionId: ''
})

export const getters: GetterTree<QiitaState, RootState> = {
  isLoggedIn: (state): boolean => {
    return !!state.sessionId
  }
}

export const mutations: MutationTree<QiitaState> = {
  saveSessionId: (state, sessionId: string) => {
    state.sessionId = sessionId
  }
}

export const actions: ActionTree<QiitaState, RootState> = {
  saveSessionId: ({ commit }, sessionId: string) => {
    commit('saveSessionId', sessionId)
  },
  cancel: async ({ commit }) => {
    try {
      await cancelAccount()
      commit('saveSessionId', '')
    } catch (error) {}
  }
}
