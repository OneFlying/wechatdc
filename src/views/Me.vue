/**
* Created by caiyuhao on 2017/2/2.
* 我的
*/
<template>
  <div class="wxdc-me" style="height: 100%">
    <x-header title="我的" :left-options="{showBack:false,backText:'返回'}" slot="header">
      <span slot="right" style="color: #fff;padding: 10px;margin-top: -10px;margin-right: -10px" v-link="{path:'/setting'}">
        <span class="iconfont icon-settings" style="font-size: 20px"></span>
      </span>
    </x-header>
    <scroller lock-x v-ref:scroller height="-95+'px'">
      <div style="padding-bottom: 20px">
        <group style="margin-top: -20px" class="wxdc-me-header" v-link="{path:'/userinfo'}">
          <div class="weui_cell" style="background: #26a2ff;padding: 20px 15px;">
            <div class="weui_cell_hd">
              <span class="wxdc-me-pic">
                <span class="iconfont icon-peoplefill" style="font-size: 48px;color: #eee;"></span>
              </span>
            </div>
            <div class="weui_cell_bd weui_cell_primary">
              <p style="color: #fff;">小丸子</p>
              <span class="vux-label-desc" style="color: #eee;">
                <span class="iconfont icon-mobile" style="font-size: 14px"></span> 18755133595
              </span>
            </div>
            <div class="weui_cell_ft with_arrow"></div>
          </div>
        </group>
        <card style="margin-top: 0">
          <div slot="content" class="card-demo-flex card-demo-content01">
            <div class="vux-1px-l vux-1px-r" style="color: #666;font-size: 14px">
              <span style="color:#f90;font-size: 22px; font-weight: bold">
                5<small style="font-size: 12px">级</small></span><br/>等级
            </div>
            <div class="vux-1px-l vux-1px-r" style="color: #666;font-size: 14px">
              <span style="color: #ff5f3e;font-size: 22px; font-weight: bold">
                2<small style="font-size: 12px">个</small></span><br/>我的优惠
            </div>
            <div class="vux-1px-r" style="color: #666;font-size: 14px;">
              <span style="color:#6ac20b;font-size: 22px;font-weight: bold;">
                500<small style="font-size: 12px">分</small></span><br/>我的积分
            </div>
          </div>
        </card>
        <group class="wxdc-me-menu">
          <cell title="近期活动" is-link>
            <span slot="icon"
                  class="iconfont icon-hotfill" style="color:rgb(74, 165, 240)"></span>
          </cell>
          <cell title="我的优惠券" is-link v-link="{path:'/ticket'}">
            <span slot="icon" class="iconfont icon-ticket" style="color:#ff5f3e"></span>
          </cell>
          <cell title="历史订单" is-link @click="showOrderBack">
            <span slot="icon" class="iconfont icon-formfill" style="color:#6ac20b"></span>
          </cell>
          <cell title="我的评价" is-link>
            <span slot="icon" class="iconfont icon-messagefill" style="color:#26a2ff"></span>
          </cell>
        </group>
        <group class="wxdc-me-menu">
          <cell title="订餐须知" is-link style="color:#80504c" v-link="{path:'/help'}">
            <span slot="icon" class="iconfont icon-pay"></span>
          </cell>
          <cell title="我的投诉" is-link>
            <span slot="icon" class="iconfont icon-warnfill" style="color:red"></span>
          </cell>
        </group>
        <group class="wxdc-me-menu">
          <cell title="设置" is-link v-link="{path:'/setting'}">
            <span slot="icon" class="iconfont icon-settings" style="color:#555"></span>
          </cell>
        </group>
      </div>
    </scroller>
  </div>
</template>
<script>
  import {
    XHeader,
    Group,
    Cell,
    Scroller,
    Card
  } from 'vux/src/components'
  import {
    setIsSetting
  } from '../vuex/actions'

  export default {
    components: {
      XHeader,
      Group,
      Cell,
      Scroller,
      Card
    },
    vuex: {
      actions: {
        setIsSetting
      }
    },
    methods: {
      showOrderBack () {
        this.setIsSetting()
        window.router.go({
          path: '/order',
          replace: false
        })
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

  .wxdc-me-header .with_arrow:after {
    color: #fff;
    border-color: #fff;
  }
  .wxdc-me-pic {
    background: #5dc1ff;
    display: inline-block;
    width: 50px;
    height: 50px;
    text-align: center;
    border-radius: 100%;
    margin-right: 10px;
    line-height: 60px;
    overflow: hidden;
  }
  .card-demo-flex {
    display: flex;
  }
  .card-demo-content01 {
    padding: 10px 0;
  }
  .card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }
  .wxdc-me-menu .weui_cell_bd > p {
    color: #333;
    margin-left: 10px;
  }
  .wxdc-me-menu .iconfont {
    font-size: 22px;
  }
</style>
