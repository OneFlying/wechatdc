/**
 * Created by caiyuhao on 2017/1/31.
 */
import {
  UPDATE_DIRECTION,
  UPDATE_LOADING
} from '../mutations-type'

let state = {
  isLoading: false,
  direction: 'forward'
}

const mutations = {
  [UPDATE_LOADING] (state, status) {
    state.isLoading = status
  },
  [UPDATE_DIRECTION] (state, direction) {
    state.direction = direction
  }
}

export default {
  state,
  mutations
}
