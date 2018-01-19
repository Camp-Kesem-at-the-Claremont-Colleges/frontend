// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ToggleButton from 'vue-js-toggle-button'
import Notifications from 'vue-notification'

import store from './store'

Vue.config.productionTip = process.env.NODE_ENV === 'production'

Vue.use(Notifications)
Vue.use(ToggleButton)

Vue.use(require('vue-moment'))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App },
  router
})
