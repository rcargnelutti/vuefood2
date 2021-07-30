require('./bootstrap')
require('./plugins/index')

import Vue from 'vue'
import DefaultTemplate from './layouts/DefaultTemplate'
import router from './routes'
import store from './store'

Vue.config.productionTip = false

/**
 * Components Global
 */

Vue.component('preloader-component', () => import('./components/Preloader'))

new Vue({
  render: h => h(DefaultTemplate),
  router,
  store
}).$mount('#app')


