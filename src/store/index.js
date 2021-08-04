import Vue from 'vue'
import Vuex from 'vuex'
import { state, mutations } from './default'
import companies from './modules/companies'
import cart from './modules/cart/cart.js'
import auth from './modules/auth/auth.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        companies,
        cart,
        auth,
    },
    state,
    mutations
})

export default store