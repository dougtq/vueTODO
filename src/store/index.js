import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const API_URL = 'http://localhost:3000/api/v1/';

const store = new Vuex.Store({
  state: {
    app: 'Todo App',
    error: null,
    loading: false,
    user: null,
  },
  mutations: {
    setError(state, payload) {
      state.error = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    userSignIn({ commit }, payload) {
      commit('setLoading', true)
      axios.post(API_URL + 'users/session', payload)
        .then((data)=> {
          commit('setUser', data);
          this.$router.push('/home')
        })
        .catch((err)=> {
          // console.log(err.response)
          commit('setError', err.response.data.data.message);
        })
        .finally(()=> {
          commit('setLoading', false);
        });
    },
  },
  getters: {},
});

export default store;
