import Vue from 'vue';
import Vuex from 'vuex';
import shortid from 'shortid';

import firebase from '@/service/firebase';
import router from '@/router';

const fireDB = firebase.database()

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    app: 'Todo App',
    error: null,
    loading: false,
    user: null,
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
    setTodo(state, payload) {
      state.todo = [ ...state.todo, ...payload];
    },
  },
  actions: {
    createUser ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit('setUser', { email: user.email })
        commit('setError', null)
        commit('setLoading', false)
        router.push('/home')
      })
      .catch(error => {
        commit('setError', error.message)
        commit('setLoading', false)
      })
    },
    userSignIn ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setUser', { email: user.email });
          commit('setError', null);
          router.push('/home');
        })
        .catch(error => {
          commit('setError', error.message);
        })
        .finally(() => {
          commit('setLoading', false);
        })
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', { email: payload.email });
    },
    userSignOut ({commit}) {
      firebase.auth().signOut();
      commit('setUser', null);
      router.push('/');
    },
    // getTasks({ commit }) {
    //   commit('setLoading', true)
    //   axios.get(API_URL + `tasks/author/${store.state.user._id}`, { headers: { authorization: store.state.userToken } })
    //     .catch((err)=> {
    //       commit('setError',  err.response.data.data.message);
    //     })
    //     .catch((err) => {
    //       commit('setError',  'An error ocurred, try again later');
    //     })
    //     .finally(() => {
    //       commit('setLoading', false);
    //     });
    // },
    // createTask({ commit }, payload) {
    //   commit('setLoading', true)
    //   axios.post(API_URL + 'tasks', payload, { headers: { authorization: store.state.userToken } })
    //     .then((resp)=> {
    //       commit('setNewTask', resp.data.data)
    //     })
    //     .catch((err)=> {
    //       commit('setError',  err.response.data.data.message);
    //     })
    //     .catch((err) => {
    //       commit('setError',  'An error ocurred, try again later');
    //     })
    //     .finally(() => {
    //       commit('setLoading', false);
    //     });
    // },
    // deleteTask({ commit }, payload) {
    //   commit('setLoading', true)
    //   axios.delete(API_URL + `tasks/${payload._id}`, { headers: { authorization: store.state.userToken } })
    //     .then((resp) => {
    //       commit('setError',  null);
    //     })
    //     .catch((err)=> {
    //       commit('setError',  err.response.data.data.message);
    //     })
    //     .catch((err) => {
    //       commit('setError',  'An error ocurred, try again later');
    //     })
    //     .finally(() => {
    //       commit('setLoading', false);
    //     });
    // },
  },
  getters: {
    isAuthenticated (state) {
      return !!state.userToken
    },
  },
});

export default store;
