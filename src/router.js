import Vue from 'vue';
//Dòng này để import vue-router
import createRouter from 'vue-router';
import App from './App.vue';

Vue.use(createRouter);

export default new createRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: App,
    },
  ],
});
