/**
 * Created by caiyuhao on 2017/1/31.
 */
import Vue from 'vue'
import Vuex from 'vuex'

// 通用
import base from './modules/base'
// 测试数据
import test from './modules/test'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    base,
    test
  },
  strict: true
})
