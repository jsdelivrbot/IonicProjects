import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import index from '@/components/index'
import order from '@/components/order'
import my from '@/components/my'
import airline from '@/components/airline'
import city from '@/components/city'
import calendar from '@/components/calendar'
import result from '@/components/result'
import airplaneFilter from '@/components/airplaneFilter'
import xiang from '@/components/xiang'
import dingdan from '@/components/dingdan'
import passenger from '@/components/passenger'
import register from '@/components/register'
import verify from '@/components/verify'
import edit from '@/components/edit'
import nameRule from '@/components/nameRule'
import bank from '@/components/bank'
import payStyle from '@/components/payStyle'
import orderMore from '@/components/orderMore'
import typeImg from '@/components/typeImg'
import pay from '@/components/pay'
import creditBank from '@/components/creditBank'
import pay_kuai from '@/components/pay_kuai'
import safe from '@/components/safe'
import changePwd from '@/components/changePwd'
import unbound from '@/components/unbound'
import weChatLogin from '@/components/weChatLogin'
import set from '@/components/set'
import name from '@/components/name'
import personal from '@/components/personal'
import about from '@/components/about'
import oneclick from '@/components/oneclick'
import integral from '@/components/integral'
import explain from '@/components/explain'
import guide from '@/components/guide'
import notice from '@/components/notice'
import policy from '@/components/policy'
import provider from '@/components/provider'
import provider_detail from '@/components/provider_detail'
import facilitator from '@/components/facilitator'
import facilitator_detail from '@/components/facilitator_detail'
import store from '@/components/store'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/index',
      component: index
    },
    {
      path: '/order',
      component: order
    },
    {
      path: '/my',
      component: my
    },
    {
      path: '/airline',
      component: airline
    },
    {
      path: '/city',
      component: city
    },
    {
      path: '/calendar',
      component: calendar
    },
    {
      path: '/result',
      component: result,
    },
    {
      path: '/airplaneFilter',
      component: airplaneFilter
    },
    {
      path: '/xiang',
      component: xiang
    },
    {
      path: '/dingdan',
      component: dingdan
    },
    {
      path: '/passenger',
      component: passenger
    },
    {
      path: '/register',
      component: register
    },
    {
      path: '/verify',
      component: verify
    },
    {
      path: '/edit',
      component: edit
    },
    {
      path: '/bank',
      component: bank
    },
    {
      path: '/nameRule',
      component: nameRule
    },
    {
      path: '/payStyle',
      component: payStyle
    },
    {
      path: '/orderMore',
      component: orderMore
    },
    {
      path: '/typeImg',
      component: typeImg
    }, {
      path: '/pay',
      component: pay
    },
    {
      path: '/creditBank',
      component: creditBank
    }, {
      path: '/pay_kuai',
      component: pay_kuai
    }, {
      path: '/safe',
      component: safe
    }, {
      path: '/changePwd',
      component: changePwd
    }, {
      path: '/unbound',
      component: unbound
    }, {
      path: '/weChatLogin',
      component: weChatLogin
    }, {
      path: '/set',
      component: set
    }, {
      path: '/personal',
      component: personal
    }, {
      path: '/name',
      component: name
    }, {
      path: '/about',
      component: about
    }, {
      path: '/oneclick',
      component: oneclick
    },
    {
      path: '/integral',
      component: integral
    },
    {
      path: '/explain',
      component: explain
    },
    {
      path: '/guide',
      component: guide
    },
    {
      path: '/notice',
      component: notice
    },
    {
      path: '/policy',
      component: policy
    },
    {
      path: '/provider',
      component: provider
    },
    {
      path: '/provider_detail',
      component: provider_detail
    },
    {
      path: '/facilitator',
      component: facilitator
    },
    {
      path: '/facilitator_detail',
      component: facilitator_detail
    },
    {
      path: '/store',
      component: store
    }

  ]
})
