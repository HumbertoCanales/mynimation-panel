import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

Vue.use(firestorePlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
