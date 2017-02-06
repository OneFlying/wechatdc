/**
* Created by caiyuhao on 2017/2/5.
* 设置
*/
<template>
  <div class="wxdc-setting">
    <x-header title="设置" :left-options="{showBack:true,backText:'返回'}"></x-header>
    <group>
      <switch title="是否接收微信推送"></switch>
      <switch title="是否接收最新活动推送" :value="true"></switch>
    </group>
  </div>
</template>
<script>
  import {
    Group,
    Switch,
    XHeader
  } from 'vux/src/components'

  export default {
    components: {
      Group,
      Switch,
      XHeader
    }
  }
</script>
<style>
  .wxdc-setting .weui_switch:checked {
    border-color: #26a2ff;
    background-color: #26a2ff;
  }
</style>
