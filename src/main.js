import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueTouch from 'vue-touch'

const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueTouch)
Vue.use(VueResource)
Vue.config.devtools = true

// plugins
import Device from 'vux/src/plugins/device'

Vue.use(Device)

/**
 * sync router params
 */
import { sync } from 'vuex-router-sync'
import store from './vuex/store'

const router = new VueRouter({
  transitionOnLoad: false
})

const commit = store.commit || store.dispatch
// 会话缓存
let history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach(({ to, from, next }) => {
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  if (toIndex) {
    if (toIndex > fromIndex || !fromIndex) {
      commit('UPDATE_DIRECTION', 'forward')
    } else {
      commit('UPDATE_DIRECTION', 'reverse')
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    commit('UPDATE_DIRECTION', 'forward')
  }
  commit('UPDATE_LOADING', true)
  setTimeout(next, 50)
})
router.afterEach(() => {
  commit('UPDATE_LOADING', false)
})

sync(store, router)

// 定义路由
import Shop from './views/Shop'
import Order from './views/Order'
import Me from './views/Me'
import Store from './views/Store'
import UserInfo from './views/UserInfo'

router.map({
  '/': {
    component: (resolve) => {
      require(['./Home'], resolve)
    }
  },
  '/shop/:id/:name': {
    name: 'shop',
    component: Shop
  },
  '/order': {
    component: Order
  },
  '/me': {
    component: Me
  },
  'store/:id/:name': {
    name: 'store',
    component: Store
  },
  '/userinfo/:id': {
    name: 'userinfo',
    component: UserInfo
  }
})

router.beforeEach(function (transition) {
  if (/\/http/.test(transition.to.path)) {
    let url = transition.to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    transition.next()
  }
})

router.afterEach(function (transition) {
  //
})

router.start(App, '#app')

