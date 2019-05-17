import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { RootState } from '@/store'

export interface IQiitaState {
  sessionId: string
}

export const state = (): IQiitaState => ({
  sessionId: ''
})

export const getters: GetterTree<IQiitaState, RootState> = {
  isLoggedIn: (state): boolean => {
    return !!state.sessionId
  }
}

export const mutations: MutationTree<IQiitaState> = {
  saveSessionId: (state, sessionId: string) => {
    state.sessionId = sessionId
  }
}

export const actions: ActionTree<IQiitaState, RootState> = {
  saveSessionId: ({ commit }, sessionId: string) => {
    commit('saveSessionId', sessionId)
  }
}
