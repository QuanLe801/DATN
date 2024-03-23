import Vue from 'vue';
//Dòng này để import vue-router
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Content',
      component: () => import('./container/TheContent.vue'),
    },
  ],
});
