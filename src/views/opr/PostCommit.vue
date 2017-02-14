/**
* Created by caiyuhao on 2017/2/14.
* 提交评价
*/
<template>
  <div>
    <x-header title="评价" :left-options="{showBack:true,backText:'返回'}"></x-header>
    <scroller lock-x height="-45+'px'" v-ref:scroller>
      <div style="padding-bottom: 65px;">
        <div style="background: #ffffff">
          <div class="wxdc-post-commit-pic">
            <img alt="logo" src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff">
            <span>杨明宇黄米鞥级渺茫</span>
          </div>
          <divider style="font-size: 14px;margin: 0 15px;">商家评价</divider>
          <div style="text-align: center;padding-top: 10px;padding-bottom: 20px">
            <rater :value.sync="rater" active-color="#fcb5a5" :font-size="36"></rater>
          </div>
          <divider style="font-size: 14px;margin: 0 15px">选择您喜欢或吐槽的商品</divider>
          <div class="wxdc-post-commit-list">
            <cell v-for="i in 6">
              <span slot="icon" style="color: #888;font-size: 13px;">黄猛击米饭{{ i }}</span>
              <rater :value.sync="raters[i]" active-color="#fcb5a5" :font-size="16"></rater>
            </cell>
          </div>
        </div>
        <group>
          <cell>
            <span slot="icon" style="font-size: 16px">评价配送服务</span>
            <span slot="value">
              <rater :value.sync="rater1" active-color="#fcb5a5" :font-size="20"></rater>
            </span>
          </cell>
        </group>
        <group class="wxdc-post-commit-sli">
          <switch title="匿名评价" :value.sync="value"></switch>
        </group>
      </div>
    </scroller>
    <tabbar>
      <div class="wxdc-check-order-tabbar">
        <div class="wxdc-check-order-count" style="font-size: 14px">
          <p>评价该订单，可获得<span>100</span>积分</p>
        </div>
        <div class="wxdc-check-order-btn">
          <a class="wxdc-green">提交评价</a>
        </div>
      </div>
    </tabbar>
  </div>
</template>
<script>
  import {
    XHeader,
    Scroller,
    Divider,
    Box,
    Rater,
    Cell,
    Group,
    Tabbar,
    Switch
  } from 'vux/src/components'

  export default {
    components: {
      XHeader,
      Scroller,
      Divider,
      Box,
      Rater,
      Cell,
      Group,
      Tabbar,
      Switch
    },
    data () {
      return {
        rater: 0,
        raters: [0, 0, 0, 0, 0, 0],
        rater1: 0,
        value: false
      }
    },
    ready () {
      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })
    }
  }
</script>
<style scope>
  .wxdc-post-commit-pic {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0 10px;
  }
  .wxdc-post-commit-pic > img {
    width: 45px;
    height: 45px;
    border-radius: 45px;
    margin-right: 10px;
  }
  .wxdc-post-commit-list .weui_cell:before {
    display: none;
  }
  .wxdc-post-commit-list .weui_cell {
    padding: 5px 15px;
  }
  .wxdc-post-commit-sli .weui_switch:checked {
    border-color: #26a2ff;
    background-color: #26a2ff;
  }
</style>
