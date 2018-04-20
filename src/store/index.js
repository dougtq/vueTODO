import Vue from 'vue';
import Vuex from 'vuex';
import { generate } from 'shortid';

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
      state.todo = payload;
    },
    addTask(state, payload) {
      state.todo = [...state.todo, payload]; 
    }
  },
  actions: {
    createUser ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        commit('setUser', { email: user.email })
        commit('setError', null)
        router.push('/home')
      })
      .catch(error => {
        commit('setError', error.message)
      })
      .finally(() => {
        commit('setLoading', false);
      });
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
        });
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', { email: payload.email });
    },
    userSignOut ({commit}) {
      firebase.auth().signOut();
      commit('setUser', null);
      commit('setError', null);
      router.push('/');
    },
    resetPassword ({commit}, payload) {
      commit('setLoading', true);
      firebase.auth()
      .sendPasswordResetEmail(payload.email)
      .then(() => {
        commit('setError', null);
        router.push('/');
      }).catch(err => {
        commit('setError', err);
      })
      .finally(() => {
        commit('setLoading', false);
      })
    },
    getTasks({ commit }) {
      commit('setLoading', true);
      
      const { email } = store.state.user;
      const key = email.replace(/[^a-zA-Z]/g, '');
      
      fireDB.ref(`${key}`)
      .orderByChild('title')
      .on('value', data => {
        const tasks = [];
        data.forEach(el => {
          tasks.push(el.toJSON());
        });
        commit('setTodo', tasks);
        commit('setError', null);
        commit('setLoading', false);
      }, err => {
        commit('setError',  err);
        commit('setLoading', false);
      });
    },
    createTask({ commit }, payload) {
      commit('setLoading', true);

      const { email } = store.state.user;
      const key = email.replace(/[^a-zA-Z]/g, '');
      const id = generate();
      payload.id = id;

      fireDB.ref(`${key}/${id}`).set(payload)
        .then((resp)=> {
          commit('setError',  null);
          commit('addTask', payload);
        })
        .catch((err)=> {
          commit('setError',  err);
        })
        .catch((err) => {
          commit('setError',  'An error ocurred, try again later');
        })
        .finally(() => {
          commit('setLoading', false);
        });
    },
    deleteTask({ commit }, payload) {
      commit('setLoading', true)
      
      const { email } = store.state.user;
      const key = email.replace(/[^a-zA-Z]/g, '');
      const id = generate();
      payload.id = id;

      fireDB.ref(`${key}/${id}`)
        .delete()
        .then((resp) => {
          commit('setError',  null);
        })
        .catch((err)=> {
          commit('setError',  err.response.data.data.message);
        })
        .catch((err) => {
          commit('setError',  'An error ocurred, try again later');
        })
        .finally(() => {
          commit('setLoading', false);
        });
    },
  },
  getters: {
    isAuthenticated (state) {
      return !!state.user
    },
    getAllTasks (state) {
      return state.todo
    },
  },
});

export default store;
