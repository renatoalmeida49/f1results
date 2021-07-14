import { createStore } from 'vuex'

const store = createStore({
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