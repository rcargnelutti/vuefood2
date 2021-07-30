import axios from 'axios'
import { API_VERSION } from '@/configs/api'

const RESOURCE = 'tenants'

//const actions = {
export default {    
    getCompanies ({ commit }) {

        commit('SET_PRELOADER', true)
        commit('SET_TEXT_PRELOADER', 'Carregando as empresas')

        return axios.get(`${API_VERSION}/${RESOURCE}`)
            .then(response => {
               // console.log(response.data)
                commit('SET_COMPANY', response.data)
            })
            .finally( () => {
                commit('SET_PRELOADER', false)
            })
    }
}

//export default actions
