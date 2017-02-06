/**
* Created by caiyuhao on 2017/2/5.
* 用户信息
*/
<template>
  <div>
    <x-header title="我的资料" :left-options="{showBack:true,backText:'返回'}"></x-header>
    <scroller lock-x height="-40+'px'">
      <div>
        <group>
          <cell title="会员号">
            <span slot="value">U89098</span>
          </cell>
        </group>
        <group>
          <cell title="我的昵称" is-link v-link="{path:'/username'}">
            <span slot="value">小丸子</span>
          </cell>
          <cell title="我的手机" is-link v-link="{path:'/mobile'}">
            <span slot="value">18755133595</span>
          </cell>
          <cell title="我的会员密码" is-link v-link="{path:'/password'}">
            <span slot="value">修改</span>
          </cell>
        </group>
      </div>
    </scroller>
  </div>
</template>
<script>
  import {
    XHeader,
    Scroller,
    Group,
    Cell
  } from 'vux/src/components'

  export default {
    components: {
      XHeader,
      Scroller,
      Group,
      Cell
    }
  }
</script>
<style>
    /* css definition */
</style>
