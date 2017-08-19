/**
 * Created by caiyuhao on 2017/1/31.
 */
import {
  UPDATE_DIRECTION,
  UPDATE_LOADING,
  UPDATE_CHINA,
  UPDATE_SET
} from '../mutations-type'

let state = {
  isLoading: false,
  direction: 'forward',
  china: '',
  issetting: false
}

const mutations = {
  [UPDATE_LOADING] (state, status) {
    state.isLoading = status
  },
  [UPDATE_DIRECTION] (state, direction) {
    state.direction = direction
  },
  [UPDATE_CHINA] (state, china) {
    state.china = china
  },
  [UPDATE_SET] (state, issetting) {
    state.issetting = issetting
  }
}

export default {
  state,
  mutations
}
