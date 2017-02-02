<template>
  <div style="height:100%" class="wxdc-base">
    <loading :show="getLoading" position="absolute" text="加载中..."></loading>
    <view-box v-ref:view-box>
      <!-- default slot -->
      <router-view></router-view>
      <!-- footer slot -->
      <tabbar slot="bottom" icon-class="vux-center">
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
</style>

