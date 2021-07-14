import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    states() {
        return {
            year: ''
        }
    },
    mutations: {
        newYear(state, payload) {
            state.year = payload.year
        }
    },
    actions: {
        newYear(context, payload) {
            context.commit('newYear', payload)
        }
    },
    getters: {
        year(state) {
            return state.year
        }
    }
})

export default store