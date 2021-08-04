import axios from "axios"

import { TOKEN_NAME } from '@/configs/api'

export default {

    state: {
        me: {
            name: '',
            email: '',
        },
        authenticated: false,
    },

    mutations: {
        SET_ME (state, me){
            state.me = me

            state.authenticated = true
        },

        SET_AUTHENTICATED (state, status) {
            state.authenticated = status
        },

        LOGOUT (state) {
            state.me = {
                name: '',
                email: '',
            }

            state.authenticated = false
        },
    },

    actions: {
        register ({ commit }, params) {
            //console.log(commit, params);
            commit('SET_ME', params)
            return axios.post('auth/register', params)
        },

        login ({ commit, dispatch }, params) {
            commit('SET_AUTHENTICATED', params)
            return axios.post('auth/token', params)
                        .then(response => {
                            const token = response.data.token
                            localStorage.setItem(TOKEN_NAME, token)
                            //console.log(response.data.token, TOKEN_NAME);

                            dispatch('getMe')
                        })
        },

        getMe ({ commit }) {
            const token = localStorage.getItem(TOKEN_NAME)
            if (!token) return;

            return axios.get('me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => commit('SET_ME', response.data.data))
            .catch(() => localStorage.removeItem(TOKEN_NAME))
            
        }
    },

}