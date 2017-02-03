<template>
  <div style="height:100%" class="wxdc-base">
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
        setList
      }
    },
    computed: {
      isstore () {
        if (this.$route.path.indexOf('store') !== -1) {
          return true
        } else {
          return false
        }
      }
    },
    created () {
      this.setAD()
      this.setList()
    }
  }
</script>
<style>
  @import "assets/font/iconfont.css";
  html,body {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
  body {
    background-color: #eee;
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
</style>

