import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBvVtVpgHmkCyCtSJAdYCHQSv_sB7Fs-qE",
  authDomain: "mynimation-panel.firebaseapp.com",
  projectId: "mynimation-panel",
  storageBucket: "mynimation-panel.appspot.com",
  messagingSenderId: "957677830126",
  appId: "1:957677830126:web:b52381b751a445036398ff",
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

let app
firebase.auth().onAuthStateChanged(user => {
  if(!app){
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App),
    }).$mount('#app')
  }
})

export const db = firebaseApp.firestore()

Vue.use(firestorePlugin)

Vue.config.productionTip = false


