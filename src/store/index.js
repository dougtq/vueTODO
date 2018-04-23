import Vue from 'vue';
import Vuex from 'vuex';
import { generate } from 'shortid';

import { fireDB, storage, auth } from '@/service/firebase';
import router from '@/router';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    app: 'Todo App',
    error: null,
    loading: false,
    user: null,
    pic: null,
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
    setPic(state, payload) {
      state.pic = payload; 
    },
    addTask(state, payload) {
      state.todo = [...state.todo, payload]; 
    },
  },
  actions: {
    createUser ({ commit }, payload) {
      commit('setLoading', true)
      auth.createUserWithEmailAndPassword(payload.email, payload.password)
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
      auth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setUser', { email: user.email });
          commit('setError', null);
          store.dispatch('getPhoto');

          sessionStorage.setItem('email', user.email);
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
      auth.signOut();
      sessionStorage.clear();
      commit('setUser', null);
      commit('setError', null);
      commit('setTodo', null);
      router.push('/');
    },
    resetPassword ({commit}, payload) {
      commit('setLoading', true);
      auth
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
    updateTask({ commit }, payload) {
      commit('setLoading', true);
      const { email } = store.state.user;
      const key = email.replace(/[^a-zA-Z]/g, '');
      const id = payload.id;
      
      fireDB.ref(`${key}/${id}`)
        .update(payload)
        .then((resp) => {
          commit('setError',  null);
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
      const id = payload.id;

      fireDB.ref(`${key}/${id}`)
        .remove()
        .then((resp) => {
          commit('setError',  null);
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
    takePhoto({ commit }, payload) {
      commit('setLoading', true);

      const mediaStreamTrack = payload.stream.getVideoTracks()[0];
      const imageCapture = new window.ImageCapture(mediaStreamTrack);
      const { email } = store.state.user;
      const key = email.replace(/[^a-zA-Z]/g, '');

      imageCapture.takePhoto().then(blob => {
        storage.ref()
          .child(`${key}/profile`)
          .put(blob)
            .then( async () => {
              const url = await storage.ref()
              .child(`${key}/profile`)
              .getDownloadURL();

              commit('setPic', url);
              router.go(-1);
            })
            .catch((err) => commit('setError', err))
            .finally(() => commit('setLoading', false))
      });
    },
    getPhoto({ commit }, payload) {
      const { email } = store.state.user;
      const key = email.replace(/[^a-zA-Z]/g, '');

      if (store.state.pic === null) {
        storage.ref()
        .child(`${key}/profile`)
        .getDownloadURL()
        .then((url) => {
          commit('setPic', url);
        })
        .catch((err) => commit('setError', err))
        .finally(() => commit('setLoading', false));
      }
    },
  },
  getters: {
    isAuthenticated (state) {
      return !!state.user;
    },
    getAllTasks (state) {
      return state.todo;
    },
  },
});

export default store;
