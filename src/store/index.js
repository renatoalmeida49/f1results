import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state() {
        return {
            year: '',
            round: 1
        }
    },
    mutations: {
        newYear(state, payload) {
            state.year = payload.year
        },
        newRound(state, payload) {
            state.round = payload.round
        }
    },
    actions: {
        newYear(context, payload) {
            context.commit('newYear', payload)
        },
        newRound(context, payload) {
            context.commit('newRound', payload)
        }
    },
    getters: {
        year(state) {
            return state.year
        },
        round(state) {
            return state.round
        }
    }
})

export default store