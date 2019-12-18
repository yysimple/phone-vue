import Vue from 'vue'
import Router from 'vue-router'

import HomeAdmin from './views/Home-Admin.vue'
import HomeUser from './views/Home-User.vue'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue')
    },
    {
      path: '/ahome',
      name: 'home-admin',
      component: HomeAdmin,
      children: [
        {
          path: 'userlist',
          component: () => import('@/components/ahome/userinfo/UserList.vue'),
          name: 'userlist'
        },
        {
          path: 'adduserinfo',
          component: () => import('@/components/ahome/userinfo/AddUserInfo.vue'),
          name: 'adduserinfo'
        },
        {
          path: 'deleteuser',
          component: () => import('@/components/ahome/userinfo/DeleteUser.vue'),
          name: 'deleteuser'
        },
        {
          path: 'phonelist',
          component: () => import('@/components/ahome/phoneinfo/PhoneList.vue'),
          name: 'phonelist'
        },
        {
          path: 'troublelist',
          component: () => import('@/components/ahome/troubleinfo/TroubleList.vue'),
          name: 'troublelist'
        },
        {
          path: 'addtroubleinfo',
          component: () => import('@/components/ahome/troubleinfo/AddTroubleInfo.vue'),
          name: 'addtroubleinfo'
        },
        {
          path: 'orderlist',
          component: () => import('@/components/ahome/orderinfo/OrderList.vue'),
          name: 'orderlist'
        },
        {
          path: 'addorderinfo',
          component: () => import('@/components/ahome/orderinfo/AddOrderInfo.vue'),
          name: 'addorderinfo'
        },
        {
          path: 'buyparts',
          component: () => import('@/components/ahome/partsinfo/BuyParts.vue'),
          name: 'buyparts'
        },
        {
          path: 'useparts',
          component: () => import('@/components/ahome/partsinfo/UseParts.vue'),
          name: 'useparts'
        },
        {
          path: 'visitorlist',
          component: () => import('@/components/ahome/visitor/VisitorList.vue'),
          name: 'visitorlist'
        }
      ]
    },
    {
      path: '/uhome',
      name: 'home-user',
      component: HomeUser,
      children: [
        {
          path: 'personinfo',
          component: () => import('@/components/uhome/personinfo/PersonInfo.vue'),
          name: 'personinfo'
        },
        {
          path: 'updateinfo',
          component: () => import('@/components/uhome/personinfo/UpdateInfo.vue'),
          name: 'updateinfo'
        },
        {
          path: 'changepwd',
          component: () => import('@/components/uhome/personinfo/ChangePwd.vue'),
          name: 'changepwd'
        },
        {
          path: 'phoneinfo',
          component: () => import('@/components/uhome/phoneinfo/PhoneInfo.vue'),
          name: 'phoneinfo'
        },
        {
          path: 'addphoneinfo',
          component: () => import('@/components/uhome/phoneinfo/AddPhoneInfo.vue'),
          name: 'addphoneinfo'
        },
        {
          path: 'orderinfo',
          component: () => import('@/components/uhome/orderinfo/OrderInfo.vue'),
          name: 'orderinfo'
        },
        {
          path: 'noticeinfo',
          component: () => import('@/components/uhome/noticeinfo/NoticeInfo.vue'),
          name: 'noticeinfo'
        }
      ]
    }
  ]
})
