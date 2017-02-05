/**
* Created by caiyuhao on 2017/2/5.
* 订单详情
*/
<template>
  <div class="wxdc-order-detail">
    <x-header :left-options="{showBack:true,backText:'返回'}">
      <span slot="right" style="color: #fff;padding: 10px;margin-top: -10px;margin-right: -10px">
        <span class="iconfont icon-dianhua" style="font-size: 20px" @click="showActionSheet"></span>
      </span>
    </x-header>
    <img class="wxdc-order-detail-pic" alt="logo" src="http://img4.imgtn.bdimg.com/it/u=3037353591,3801722723&fm=214&gp=0.jpg">
    <scroller lock-x scrollbar-y v-ref:scroller height="-40+'px'">
      <div style="padding-bottom: 15px;" v-touch:pan="onpan">
        <group style="margin-top: -20px">
          <div style="text-align: center;padding-top: 60px;">
            <h4 style="font-size: 19px;">订单已完成<span class="iconfont icon-right" style="font-size: 19px"></span></h4>
            <div style="color:#777;font-size: 14px;padding: 5px 0;">感谢您对云餐厅的信任，欢迎下次光临</div>
            <box gap="10px 30%">
              <x-button class="wxdc-blue">再来一单</x-button>
            </box>
          </div>
        </group>
        <group>
          <cell title="东北家常菜馆" is-link>
            <img style="width: 20px;" slot="icon" src="http://img4.imgtn.bdimg.com/it/u=3037353591,3801722723&fm=214&gp=0.jpg">
          </cell>
          <cell
            class="wxdc_weui_media_title"
            :class="$index === 0 ? '' : 'wxdc_weui_media_title_noborder'"
            style="padding: 5px 10px 5px 15px;" v-for="i in 10">
            <span slot="icon">土豆烧豆角{{ i }}</span>
            <span slot="value" style="width:80px;text-align:left;display: inline-block;color:#999;">x1</span>
            <span slot="value" style="display: inline-block;width:25px;text-align: left">&#165;18</span>
          </cell>
          <cell class="wxdc_weui_media_title" style="padding: 5px 10px 5px 15px;">
            <span slot="icon">配送费</span>
            <span slot="value" style="width:80px;text-align:left;display: inline-block;color:#999;">x1</span>
            <span slot="value" style="display: inline-block;width:25px;text-align: left">&#165;2</span>
          </cell>
          <cell class="wxdc_weui_media_title wxdc_weui_media_title_noborder" style="padding: 5px 10px 5px 15px;">
            <span slot="icon">餐盒费</span>
            <span slot="value" style="display: inline-block;width:25px;text-align: left">&#165;5</span>
          </cell>
          <cell class="wxdc_weui_media_title" style="padding: 5px 10px 5px 15px;">
            <span slot="icon" style="color:#f60;">在线支付立减优惠</span>
            <span slot="value" style="color:#f60;display: inline-block;width:30px;text-align: left">-&#165;18</span>
          </cell>
          <cell class="wxdc_weui_media_title wxdc_weui_media_title_noborder" style="padding: 5px 10px 5px 15px;">
            <span slot="icon" style="color:#f60;">可乐一份</span>
            <span slot="value" style="color:#f60;display: inline-block;width:30px;text-align: left">-&#165;0</span>
          </cell>
          <cell class="wxdc_weui_media_title wxdc_weui_media_title_noborder" style="padding: 5px 10px 5px 15px;">
            <span slot="icon" style="color:#f60;">红包抵扣</span>
            <span slot="value" style="color:#f60;display: inline-block;width:30px;text-align: left">-&#165;2</span>
          </cell>
          <cell>
            <span slot="value" style="color:#f60;">实付 &#165;71</span>
          </cell>
        </group>
      </div>
    </scroller>
    <actionsheet :show.sync="showactionsheet" :menus="menus" show-cancel cancel-text="取消"></actionsheet>
  </div>
</template>
<script>
  import {
    XHeader,
    Group,
    Box,
    XButton,
    Scroller,
    Cell,
    Actionsheet
  } from 'vux/src/components'

  export default {
    components: {
      XHeader,
      Group,
      Box,
      XButton,
      Scroller,
      Cell,
      Actionsheet
    },
    methods: {
      onpan (e) {
        let scale = 100 + e.deltaY * 2
        if (scale <= 0) scale = 0
        if (scale >= 100) scale = 100
        scale = scale / 100
        document.querySelector('.wxdc-order-detail-pic').style.transform = 'scale(' + scale + ')'
        console.log(e.deltaY)
      },
      showActionSheet () {
        this.showactionsheet ? this.showactionsheet = false : this.showactionsheet = true
      }
    },
    data () {
      return {
        showactionsheet: false,
        menus: {
          menu1: '呼叫 18755133595'
        }
      }
    },
    ready () {
      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })
    }
  }
</script>
<style>
  @import "../assets/font/iconfont.css";

  .wxdc-order-detail-pic {
    width: 70px;
    height: 70px;
    border-radius: 100%;
    display: block;
    text-align: center;
    margin: auto;
    position: fixed;
    left: 0;
    right: 0;
    top: 20px;
    z-index: 200000;
    border: 3px solid #fff;
  }
  /* button */
  .wxdc-blue {
    background: #26a0ff;
    color: #fff;
  }
  .wxdc-blue:active {
    background: #3199e8 !important;
    color: #ddd !important;
  }
  .wxdc-blue:after {
    display: none;
  }
</style>
