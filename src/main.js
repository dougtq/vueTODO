// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'vuetify/dist/vuetify.min.css';
import firebase from '@/service/firebase';

import Vue from 'vue';
import Vuetify from 'vuetify';
import Firebase from 'firebase'

import store from '@/store';
import App from './App';
import router from './router';

Vue.use(Vuetify);
Vue.config.productionTip = false;

/* eslint-disable no-new */
// const unsubscribe = firebase.auth()
// .onAuthStateChanged((user) => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created () {
      if (sessionStorage.getItem('email')) {
        store.dispatch('autoSignIn', { email: sessionStorage.getItem('email') });
      };
    },
  });
//   unsubscribe();
// });
