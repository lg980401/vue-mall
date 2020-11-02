import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // 进度条控件
import 'nprogress/nprogress.css' // 进度条控件样式

import {
  getAccessToken
} from "../tools/ls";
const login = () => import('@/views/login/login')
const home = () => import('@/views/home.vue')
const user = () => import('@/views/users/user')
const roleList = () => import('@/views/auth/roleList')
const authList = () => import('@/views/auth/authList')
const index = () => import('@/views/index')
Vue.use(Router)


const routerMap = [{
    redirect: '/users',
    path: '/',

  }, {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/index',
    component: home,
    redirect: 'noredirect',

    children: [{
        path: '/index',
        component: index
      },

      {
        path: '/rights',
        component: authList
      }

    ]

  },
  {
    path: '/user',
    component: home,
    redirect: 'noredirect',

    children: [{
      path: '/users',
      component: user
    }]

  },
  {
    path: '/auth',
    component: home,
    redirect: 'noredirect',

    children: [{
        path: '/roles',
        component: roleList
      },

      {
        path: '/rights',
        component: authList
      }

    ]

  }
];

const router = new Router({
  routes: routerMap
});





NProgress.configure({
  showSpinner: false
}) // NProgress Configuration
//页面token验证
router.beforeEach((to, from, next) => {
  var flag = getAccessToken();

  if (flag == false) {
    if (to.path != '/login') {
      next({
        path: '/login'
      });
      return;
    }
  }



  NProgress.start() // start progress bar
  next() //

})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})



export default router
