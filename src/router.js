import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Home from './views/Home.vue';
import User from './views/User.vue';
import Notice from './views/Notice.vue';
import NoticeDetial from './views/NoticeDetail.vue';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
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
      path: '/notice',
      name: 'Notice',
      component: Notice
    },
    {
      path: '/notice/:id',
      name: 'NoticeDetial',
      component: NoticeDetial
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
});
