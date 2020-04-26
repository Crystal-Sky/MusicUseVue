import Vue from 'vue'
import Router from 'vue-router'
import find from '../pages/find/find'
import my from '../pages/my/my'
import account from '../pages/account/account'
import login from '../pages/login/login'
import songlist from '../pages/songlist/songlist'
import play from '../pages/play/play'

Vue.use(Router)

export default new Router({
  mode: 'history', // 去掉url中的#
  routes: [
    {
      path: '/',
      redirect: '/find'
    },
    {
      path: '/find',
      name: 'find',
      component: find,
      meta: {
        showTabbar: true
      }
    },
    {
      path: '/my',
      name: 'my',
      component: my,
      meta: {
        showTabbar: true
      }
    },
    {
      path: '/account',
      name: 'account',
      component: account,
      meta: {
        showTabbar: true
      }
    },
    {
      path: '/songlist/:id',
      name: 'songlist',
      component: songlist,
      meta: {
        showTabbar: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/play',
      name: 'play',
      component: play
    }
  ]
})
