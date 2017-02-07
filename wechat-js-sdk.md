# 微信JSSDK调用
``` bash
import wx from 'weixin-js-sdk'

new Vue({
  ready () {
    wx.config({
      // your config lists
    })
  }
})

如果你有使用vue-route的话，你可以：

import wx from 'weixin-js-sdk'

export default ({
  ready () {
    wx.config({
      // your config lists
    })
  }
})
