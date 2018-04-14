import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import router from '@/router'

Vue.use(Vuex);

const API_URL = 'http://localhost:3000/api/v1/';

const store = new Vuex.Store({
  state: {
    app: 'Todo App',
    error: null,
    loading: false,
    user: null,
    userToken: null,
    todo: [],
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
    setUserToken(state, payload) {
      state.userToken = payload;
    },
    setTodo(state, payload) {
      state.todo = payload;
    },
  },
  actions: {
    userSignIn({ commit }, payload) {
      commit('setLoading', true)
      axios.post(API_URL + 'users/session', payload)
        .then(({ data })=> {
          commit('setUserToken', data.data.token)
          commit('setUser', data.data.user)
          commit('setTodo', data.data.todo)
          router.push('/home')
        })
        .catch((err)=> {
          commit('setError',  err.response.data.data.message );
        })
        .finally(()=> {
          commit('setLoading', false);
        });
    },
    userSignOut({ commit }, payload) {
      commit('setLoading', true);
      commit('setError', null);
      commit('setUser', null);
      commit('setUserToken', null);
      commit('setLoading', false);
      router.push('/');
    },
  },
  getters: {
    isAuthenticated (state) {
      return !!state.userToken
    },
  },
});

export default store;
