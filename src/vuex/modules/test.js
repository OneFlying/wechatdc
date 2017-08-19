/**
 * Created by caiyuhao on 2017/2/1.
 * 测试数据
 */
import {
  GET_AD,
  SET_AD,
  GET_LIST,
  SET_LIST,
  SET_SHOP_LIST,
  GET_SHOP_LIST,
  GET_SHOP_FOOTER,
  SET_SHOP_FOOTER,
  SET_STORE,
  GET_STORE
} from '../mutations-type'

let state = {
  ad: [],
  list: '',
  shop: '',
  footer: '',
  goods: ''
}

const mutations = {
  [GET_AD] (state) {
    return state.ad
  },
  [SET_AD] (state, ad) {
    state.ad = ad
  },
  [GET_LIST] (state) {
    return state.list
  },
  [SET_LIST] (state, list) {
    state.list = list
  },
  [GET_SHOP_LIST] (state) {
    return state.shop
  },
  [SET_SHOP_LIST] (state, shop) {
    state.shop = shop
  },
  [GET_SHOP_FOOTER] (state) {
    return state.footer
  },
  [SET_SHOP_FOOTER] (state, footer) {
    state.footer = footer
  },
  [SET_STORE] (state, goods) {
    state.goods = goods
  },
  [GET_STORE] (state) {
    return state.goods
  }
}

export default {
  state,
  mutations
}
