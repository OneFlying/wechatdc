<template>
  <div style="height:100%" class="wxdc-base" :class="$device.isAndroid ? 'wxdc-android': 'wxdc-ios'">
    <loading :show="getLoading" position="absolute" text="加载中..."></loading>
    <view-box v-ref:view-box>
      <!-- default slot -->
      <router-view></router-view>
      <!-- footer slot -->
      <tabbar slot="bottom" icon-class="vux-center" v-if="!isstore">
        <tabbar-item v-link="{path: '/'}" :selected="route.path === '/' || route.path.indexOf('shop') !== -1">
          <span class="iconfont" slot="icon" :class="route.path === '/' || route.path.indexOf('shop') !== -1 ? 'icon-home_fill_light' : 'icon-home_light'"></span>
          <span slot="label" class="red-label">首页</span>
        </tabbar-item>
        <tabbar-item v-link="{path: '/order'}" :selected="route.path === '/order'">
          <span class="iconfont" :class="route.path === '/order' ? 'icon-form_fill_light' : 'icon-form_light'" slot="icon"></span>
          <span slot="label" class="red-label">订单</span>
        </tabbar-item>
        <tabbar-item v-link="{path: '/me'}" :selected="route.path === '/me'">
          <span class="iconfont" :class="route.path === '/me' ? 'icon-my_fill_light' : 'icon-my_light'" slot="icon"></span>
          <span slot="label" class="red-label">我的</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>
<script>
  import {
    Tabbar,
    TabbarItem,
    Loading,
    ButtonTab,
    ButtonTabItem,
    ViewBox
  } from 'vux/src/components'
  import store from './vuex/store'
  import {
    getDirection,
    getLoading
  } from './vuex/getters'
  // for test
  import {
    setChina,
    setAD,
    setList
  } from './vuex/actions'

  export default {
    components: {
      Loading,
      ButtonTab,
      ButtonTabItem,
      ViewBox,
      Tabbar,
      TabbarItem
    },
    store,
    vuex: {
      getters: {
        getLoading,
        getDirection,
        route: (state) => state.route
      },
      actions: {
        setAD,
        setList,
        setChina
      }
    },
    computed: {
      isstore () {
        let path = this.$route.path
        if ((path.indexOf('order') === 1 && path.indexOf('detail') === -1) || path.indexOf('token') !== -1 ||
          path.indexOf('shop') !== -1 || path.length < 2 || path.indexOf('me') !== -1) {
          return false
        } else {
          return true
        }
      }
    },
    ready () {
      document.addEventListener('touchmove', function (e) {
        e.preventDefault()
      }, false)
      this.setAD()
      this.setList()
      // 设置城市列表
      this.setChina()
    }
  }
</script>
<style>
  @font-face {
    font-family: 'iconfont';  /* project id 234521 */
    src: url('//at.alicdn.com/t/font_okqokeqkdxz85mi.eot');
    src: url('//at.alicdn.com/t/font_okqokeqkdxz85mi.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_okqokeqkdxz85mi.woff') format('woff'),
    url('//at.alicdn.com/t/font_okqokeqkdxz85mi.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_okqokeqkdxz85mi.svg#iconfont') format('svg');
  }
  @import "http://at.alicdn.com/t/font_okqokeqkdxz85mi.css";
  .iconfont {
    font-size: 24px;
  }

  html,body {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
  body {
    background-color: #eee;
    -webkit-overflow-scrolling: touch;
    overflow: hidden;
  }
  .weui_tab, .weui_tab_bd {
    overflow: hidden !important;
  }
  .wxdc-base .weui_tabbar_item {
    color: #888;
  }
  .wxdc-base .weui_tabbar_item.weui_bar_item_on {
    color: #26a2ff;
  }
  .wxdc-base .weui_tabbar_item.weui_bar_item_on .weui_tabbar_label {
    color: #26a2ff;
  }
  .wxdc-base .vux-header {
    background-color: #26a2ff;
  }
  .wxdc-base .dp-header .dp-item {
    color: #26a2ff;
  }
  .wxdc-base .vux-header .vux-header-left a,
  .wxdc-base .vux-header .vux-header-left button,
  .wxdc-base .vux-header .vux-header-right a,
  .wxdc-base .vux-header .vux-header-right button {
    color: #fff;
    font-size: 16px;
  }
  .wxdc-base .vux-header .vux-header-left .vux-header-back:before {
    border-color: #fff;
  }
  /* flexbox */
  .wxdc-flexbox-item a {
    display: block;
    width: 100%;
    padding: 10px 0;
  }
  .wxdc-flexbox-item a > img {
    width: 52px;
    display: block;
    margin: auto;
  }
  .wxdc-flexbox-item a > span {
    text-align: center;
    display: block;
    width: 100%;
    font-size: 14px;
    color: #666;
  }
  .wxdc-ad-flexbox img {
    display: block;
    width: 50px;
  }
  .wxdc-ad-flexbox a {
    display: block;
    position: relative;
  }
  .wxdc-ad-flexbox a:before {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }
  .wxdc-ad-flexbox a:after {
    content: " ";
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    border-left: 1px solid #D9D9D9;
    color: #D9D9D9;
    transform-origin: 0 0;
    transform: scaleX(0.5);
  }
  .wxdc-ad-flexbox a.wxdc-ad-flexbox-noborder:before {
    display: none;
  }
  .wxdc-ad-flexbox a.wxdc-ad-flexbox-notborder:after {
    display: none;
  }
  .wxdc-ad-flexbox span {
    color: #888;
    font-size: 14px;
  }
  /* 横向滚动 */
  .box1 {
    height: 100px;
    position: relative;
    width: 1490px;
    padding-bottom: 10px;
  }
  .box1-item {
    width: 200px;
    height: 100px;
    background-color: #ccc;
    display:inline-block;
    margin-left: 15px;
    float: left;
    text-align: center;
    line-height: 100px;
  }
  .box1-item:first-child {
    margin-left: 0;
  }
  .wxdc_weui_media_qsf {
    background-color: #26a2ff;
    color: #fff;
    border-radius: 3px;
    display: inline-block;
    padding: 1px 2px;
    border: 1px solid transparent;
    font-size: 10px;
  }
  .wxdc_weui_media_psf {
    color: #26a2ff;
    border: 1px solid #26a2ff;
    padding: 0 2px 1px;
    border-radius: 3px;
    white-space: nowrap;
    font-size: 10px;
  }
  /* 购物车 */
  .wxdc-cart-cart > .weui_cells_title {
    margin-top: 0.6em;
    margin-bottom: 0.6em;
  }
  .wxdc-number {
    padding: 0 0;
  }
  .wxdc-number > span, .wxdc-number > a {
    display: inline-block;
    font-size: 16px;
    width: 22px;
    height: 22px;
    line-height: 22px;
    border-radius: 100%;
    text-align: center;
  }
  .wxdc-number > span.wxdc-number-move,
  .wxdc-number > a.wxdc-number-move {
    border: 2px solid #26a2ff;
    width: 18px;
    height: 18px;
    line-height: 19px;
    color: #26a2ff;
  }
  .wxdc-number-add {
    background: #26a2ff;
    color: #fff;
  }
  .wxdc-number > span.wxdc-number-number {
    width: 30px;
    height: 20px;
    text-align: center;
    border-radius: 0;
    line-height: 24px;
  }
  .wxdc-number i {
    font-size: 20px;
  }
  .wxdc-number .wxdc-number-move i {
    font-size: 19px;
  }
  .vux-header .vux-header-title.wxdc-home-header-title,
  .vux-header h1.wxdc-home-header-title {
    margin: 0 60px 0 85px;
  }
  /* 查看更多 */
  .wxdc-more {
    display: block;
    clear: both;
    overflow: hidden;
    width: 100%;
    padding: 11px 0;
    text-align: center;
    position: relative;
    color: #888;
    font-size: 14px;
    line-height: 20px;
  }
  /* 评价列表 */
  .wxdc-base-commit {
    /**/
  }
  .wxdc-base-commit.weui_media_box.weui_media_appmsg {
    align-items: flex-start;
  }
  .wxdc-base-commit .weui_media_hd {
    width: 40px;
    margin-top: 10px;
  }
  /* 用户头像 */
  .wxdc-base-commit .wxdc-me-pic {
    background: #5dc1ff;
    display: inline-block;
    width: 40px;
    height: 40px;
    text-align: center;
    border-radius: 100%;
    margin-right: 10px;
    line-height: 50px;
    overflow: hidden;
  }
</style>
