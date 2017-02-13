/**
* Created by caiyuhao on 2017/2/5.
* 优惠券
*/
<template>
  <div>
    <x-header title="我的优惠券" :left-options="{showBack:true,backText:'返回'}" slot="header"></x-header>
    <box gap="0 10px">
      <scroller lock-x height="-45+'px'" v-ref:scroller>
        <div style="padding-bottom: 20px">
          <div style="color:#666;font-size: 14px;margin-bottom: -8px;margin-top: 5px">有20张可用的优惠券</div>
          <div v-for="i in 3" :value="i"
               class="wxdc-red-bag-checker-item wxdc-red-bag-checker-item-noselect">
            <div class="wxdc-red-bag-checker-inner">
              <a class="weui_media_box weui_media_appmsg" style="padding-left: 0;">
                <div class="weui_media_hd vux-1px-r">
                  <small style="font-size: 20px">&#165;</small>
                  <span style="font-size: 40px;">10</span>
                  <span>.0</span>
                </div>
                <div class="weui_media_bd">
                  <h4 class="weui_media_title">学生优惠券{{ i }}</h4>
                  <p class="weui_media_desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</p>
                  <p class="weui_media_desc" style="margin-top: 5px">2017-02-08 - 2017-02-10</p>
                </div>
              </a>
            </div>
          </div>
          <div v-for="i in 3" :value="i"
               class="wxdc-red-bag-checker-item wxdc-red-bag-checker-item-noselect wxdc-red-bag-useless">
            <div class="wxdc-red-bag-checker-inner">
              <a class="weui_media_box weui_media_appmsg" style="padding-left: 0;">
                <div class="weui_media_hd vux-1px-r">
                  <small style="font-size: 20px">&#165;</small>
                  <span style="font-size: 40px;">10</span>
                  <span>.0</span>
                </div>
                <div class="weui_media_bd">
                  <h4 class="weui_media_title">学生优惠券{{ i }}</h4>
                  <p class="weui_media_desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</p>
                  <p class="weui_media_desc" style="margin-top: 5px">2017-02-08 - 2017-02-10</p>
                </div>
              </a>
              <span class="iconfont icon-yiguoqi" style="font-size: 48px"></span>
            </div>
          </div>
        </div>
      </scroller>
    </box>
  </div>
</template>
<script>
  import {
    XHeader,
    Box,
    Scroller
  } from 'vux/src/components'

  export default {
    components: {
      XHeader,
      Box,
      Scroller
    },
    ready () {
      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })
    }
  }
</script>
<style>
  @import "../assets/css/style.css";

  .wxdc-red-bag-checker-item-noselect:before,
  .wxdc-red-bag-checker-item-noselect:after {
    display: none;
  }
  .wxdc-red-bag-useless,
  .wxdc-red-bag-useless .wxdc-red-bag-checker-inner {
    border-color: #ddd;
  }
  .wxdc-red-bag-checker-inner .weui_media_hd {
    width: 100px !important;
    color: #ff5340;
  }
  .wxdc-red-bag-useless .weui_media_hd {
    color: #888;
  }
  .wxdc-red-bag-checker-inner .iconfont {
    position: absolute;
    right: 0;
    top: 0;
    color: #888;
  }
</style>
