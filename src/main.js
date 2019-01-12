// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'
import * as firebase from 'firebase'
import VueFire from 'vuefire'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBsEkBWbOr2OIpwXG_bqoafyrQYqzFLBAc',
    libraries: 'places'
  }
})

Vue.config.productionTip = false

Vue.use(VueFire)
var config = {
  apiKey: 'AIzaSyBiDEF93uvDbzAZmTtm_aM6OiD9cxpxvvY',
  authDomain: 'parkour-spot-map-1532782610228.firebaseapp.com',
  databaseURL: 'https://parkour-spot-map-1532782610228.firebaseio.com',
  projectId: 'parkour-spot-map-1532782610228',
  storageBucket: 'parkour-spot-map-1532782610228.appspot.com',
  messagingSenderId: '657469882610'
}
firebase.initializeApp(config)
export const db = firebase.firestore()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
