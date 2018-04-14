import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import Home from '@/components/Home';
import User from '@/components/User';
import NotFound from '@/components/NotFound';
import ToDo from '@/components/ToDo';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'Not Found',
      component: NotFound
    },
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/todo',
      name: 'ToDo',
      component: ToDo
    },
  ],
});
