/**
* Created by caiyuhao on 2017/2/14.
* 提交投诉
*/
<template>
  <div>
    <div class="vux-header">
      <div class="vux-header-left">
        <a class="v-transition iconfont icon-close" style="font-size: 32px" @click="back"></a>
      </div>
      <h1 class="vux-header-title"><span class="v-transition" style="display: none;"></span></h1>
      <div class="vux-header-right"></div>
    </div>
    <div style="position: absolute;width:100%;">
      <div class="wxdc-post-warn-top">
        <span class="iconfont icon-cry"></span><span>很抱歉给您带来了不愉快的用餐体验</span>
      </div>
    </div>
    <div class="wxdc-post-warn-banner"></div>
    <div class="wxdc-post-warn-container">
      <scroller lock-x height="-45+'px'">
        <div style="padding-bottom: 20px">
          <div class="wxdc-post-warn-pic">
            <img alt="logo" src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff">
            <span>杨明宇黄米鞥级渺茫</span>
          </div>
          <div class="wxdc-post-warn-form">
            <cell>
              <span slot="icon">订单号</span>
              <span slot="value">4352436546546546456</span>
            </cell>
            <cell>
              <span slot="icon">取餐点</span>
              <span slot="value">三教-上海师大奉贤区</span>
            </cell>
            <cell>
              <span slot="icon">预定时间</span>
              <span slot="value">2017-02-05 07:30</span>
            </cell>
          </div>
          <x-textarea style="font-size: 14px" :rows="4" :max="200" name="detail" placeholder="请输入您投诉的理由"></x-textarea>
        </div>
      </scroller>
    </div>
    <div class="wxdc-post-warn-btn">
      <x-button type="default" class="wxdc-warn-button">我要投诉</x-button>
    </div>
  </div>
</template>
<script>
  import {
    XHeader,
    Scroller,
    XButton,
    Divider,
    Cell,
    XTextarea
  } from 'vux/src/components'

  export default {
    components: {
      XHeader,
      Scroller,
      XButton,
      Divider,
      Cell,
      XTextarea
    },
    methods: {
      back () {
        window.history.go(-1)
      }
    }
  }
</script>
<style>
  @import "../../assets/font/iconfont.css";

  .wxdc-post-warn-top {
    background: #26a2ff;
    height: 30px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -10px;
  }
  .wxdc-post-warn-banner {
    height: 70px;
    background: #26a2ff;
  }
  .wxdc-post-warn-container {
    top: 70px;
    width: 92%;
    margin-left: 4%;
    position: absolute;
    bottom: 50px;
    background: #ffffff;
    border-radius: 20px;
  }
  .wxdc-post-warn-btn {
    position: absolute;
    bottom: 30px;
    width: 35%;
    margin-left: 32.5%;
  }
  .wxdc-warn-button {
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-left: 14px;
    padding-right: 14px;
    box-sizing: border-box;
    font-size: 18px;
    text-align: center;
    text-decoration: none;
    color: #FFFFFF;
    line-height: 2.33333333;
    border-radius: 40px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    overflow: hidden;
    background-color: #26a2ff;
  }
  .wxdc-warn-button.weui_btn:after {
    border-radius: 40px;
  }
  .wxdc-warn-button:active {
    background-color: #1d8ce0;
  }
  .wxdc-post-warn-pic {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0 30px;
  }
  .wxdc-post-warn-pic > img {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    margin-right: 10px;
  }
  .wxdc-post-warn-form span {
    color: #888;
    font-size: 14px;
  }
</style>
