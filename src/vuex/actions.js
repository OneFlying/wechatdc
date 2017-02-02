/**
 * Created by caiyuhao on 2017/1/31.
 */
export const setAD = ({ dispatch }) => {
  let ad = require('../mock/test').list1
  dispatch('SET_AD', ad)
}
export const setList = ({ dispatch }) => {
  let list = require('../mock/test').demoList
  dispatch('SET_LIST', list)
}
export const setShopList = ({ dispatch }) => {
  let shop = require('../mock/test').list
  dispatch('SET_SHOP_LIST', shop)
}
export const setShopFooter = ({ dispatch }) => {
  let footer = require('../mock/test').footer
  dispatch('SET_SHOP_FOOTER', footer)
}
