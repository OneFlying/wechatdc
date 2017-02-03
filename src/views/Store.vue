/**
* Created by caiyuhao on 2017/2/2.
* 商家详情
*/
<template>
  <div>
    <scroller lock-x lock-y>
      <div style="padding-bottom: 20px">
        <div class="wxdc-header" slot="header"
             style="background-image:url('http://placeholder.qiniudn.com/60x60/3cc51f/ffffff')">
          <div class="wxdc-header-inner">
            <a class="weui_media_box weui_media_appmsg" style="padding: 5px 10px">
              <div class="weui_media_hd">
                <img class="weui_media_appmsg_thumb" alt="logo" src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff">
              </div>
              <div class="weui_media_bd">
                <h4 class="weui_media_title" style="color:#fff;">杨明宇黄猛击米饭</h4>
                <p class="weui_media_desc">
                  <cell class="wxdc_weui_media_title">
                    <rater :value="4.3" slot="icon" :font-size="12" :margin="0" active-color="#ffaa0c"></rater>
                    <span slot="icon" style="color: #ff6000">4.3</span>
                    <span slot="icon" style="color: #ccc"> / </span>
                    <span slot="icon" style="color: #fff;">&#165;20起送</span>
                    <span slot="icon" style="color: #ccc"> / </span>
                    <span slot="icon" style="color: #fff;">&#165;5配送费</span>
                  </cell>
                  <cell class="wxdc_weui_media_title wxdc_weui_media_title_noborder">
                    <span slot="icon" style="font-size: 12px;color:#eee;" class="iconfont icon-time"></span>
                    <span slot="icon" style="color:#eee;">07:00 07:30 08:00 08:30 09:00 09:30 10:00 10:30 11:00 11:30</span>
                  </cell>
                </p>
              </div>
            </a>
          </div>
          <tab :line-width=2 active-color='#26a2ff'>
            <tab-item class="vux-center" :selected="demo2 === item" v-for="item in list2" @click="demo2 = item">{{item}}</tab-item>
          </tab>
          <!--<a href="javascript:;" class="wxdc-header-back" @click="back">-->
          <!--<span class="iconfont icon-back_light"></span><span>返回</span>-->
          <!--</a>-->
        </div>
        <div class="menu vux-1px-r">
          <scroller lock-x scrollerbar-y height="-190+'px'">
            <div class="wxdc-menu-box">
              <ul>
                <li class="vux-1px-b"><span>热搜推荐</span></li>
                <li class="vux-1px-b"><span>手机数码</span></li>
                <li class="vux-1px-b"><span>家用电器</span></li>
                <li class="vux-1px-b"><span>女装内衣</span></li>
                <li class="vux-1px-b"><span>男装内衣</span></li>
                <li class="vux-1px-b"><span>鞋靴箱包</span></li>
                <li class="vux-1px-b"><span>电脑办公</span></li>
                <li class="vux-1px-b"><span>运动户外</span></li>
                <li class="vux-1px-b"><span>个护化妆</span></li>
                <li class="vux-1px-b"><span>家具建材</span></li>
                <li class="vux-1px-b"><span>家居家纺</span></li>
                <li class="vux-1px-b"><span>母婴玩具</span></li>
                <li class="vux-1px-b"><span>食品生鲜</span></li>
                <li class="vux-1px-b"><span>酒水饮料</span></li>
                <li class="vux-1px-b"><span>钟表奢品</span></li>
                <li class="vux-1px-b"><span>汽车用品</span></li>
                <li class="vux-1px-b"><span>医药保健</span></li>
                <li class="vux-1px-b"><span>珠宝饰品</span></li>
                <li class="vux-1px-b"><span>图书音像</span></li>
                <li class="vux-1px-b"><span>全球购</span></li>
              </ul>
            </div>
          </scroller>
        </div>
        <div class="content">
          <scroller lock-x scrollbar-y height="-180+'px'">
            <div>
              <a class="weui_media_box weui_media_appmsg"
                 style="padding-right: 5px"
                 v-for="good in list">
                <div class="weui_media_hd" style="width: 45px;">
                  <img class="weui_media_appmsg_thumb" alt="" :src="good.img">
                </div>
                <div class="weui_media_bd">
                  <h4 class="weui_media_title">{{ good.title }}</h4>
                  <p class="weui_media_desc">
                    <cell class="wxdc_weui_media_title">
                      <rater :value="4.3" slot="icon" :font-size="12" :margin="0" active-color="#ffaa0c"></rater>
                      <span slot="icon" style="color: #ff6000">4.3</span>
                    </cell>
                    <cell class="wxdc_weui_media_title wxdc_weui_media_title_noborder">
                      <span slot="icon">&#165;35</span>
                      <span slot="value">

                      </span>
                    </cell>
                  </p>
                </div>
              </a>
            </div>
          </scroller>
        </div>
      </div>
    </scroller>
    <!-- footer slot -->
    <tabbar slot="bottom" class="wxdc-store-bot">
      <div class="wxdc-store-cart">
        <span class="iconfont icon-cartfill" style="font-size: 32px"></span>
      </div>
      <div class="wxdc-store-bot-inner">
        <div class="wxdc-store-count">
          <p>&#165;35</p>
          <span>另需配送费5月</span>
        </div>
        <div class="wxdc-store-btn">
          <a href="javascript:;">还差&#165;0起送</a>
        </div>
      </div>
    </tabbar>
  </div>
</template>

<script>
  import {
    Scroller,
    Rater,
    Cell,
    XHeader,
    Tabbar,
    Tab,
    TabItem
  } from 'vux/src/components'

  export default {
    components: {
      Scroller,
      Rater,
      Cell,
      XHeader,
      Tabbar,
      Tab,
      TabItem
    },
    methods: {
      back () {
        window.history.go(-1)
      }
    },
    data () {
      return {
        state: 0,
        count: 35,
        list2: ['商品', '商家'],
        demo2: '商品',
        list: [{
          title: '洗颜新潮流！人气洁面皂排行榜',
          img: 'https://cdn.xiaotaojiang.com/uploads/82/1572ec37969ee263735262dc017975/_.jpg'
        }, {
          title: '美容用品 & 日用品（上）',
          img: 'https://cdn.xiaotaojiang.com/uploads/59/b22e0e62363a4a652f28630b3233b9/_.jpg'
        }, {
          title: '日本车载空气净化器精选',
          img: 'https://cdn.xiaotaojiang.com/uploads/56/4b3601364b86fdfd234ef11d8712ad/_.jpg'
        }, {
          title: '洗颜新潮流！人气洁面皂排行榜',
          img: 'https://cdn.xiaotaojiang.com/uploads/82/1572ec37969ee263735262dc017975/_.jpg'
        }, {
          title: '美容用品 & 日用品（上）',
          img: 'https://cdn.xiaotaojiang.com/uploads/59/b22e0e62363a4a652f28630b3233b9/_.jpg'
        }, {
          title: '日本车载空气净化器精选',
          img: 'https://cdn.xiaotaojiang.com/uploads/56/4b3601364b86fdfd234ef11d8712ad/_.jpg'
        }]
      }
    }
  }
</script>

<style scoped lange="less">
  @import "../assets/font/iconfont.css";

  .menu {
    width: 75px;
    float: left;
    background-color: #fff;
  }
  .wxdc-menu-box {
    padding-bottom: 20px;
  }
  .wxdc-menu-box ul {
    width: 74px;
  }
  .wxdc-menu-box li{
    text-align: center;
    padding: 0 5px;
    font-size: 14px;
    line-height: 40px;
  }
  .content {
    padding-left: 20px;
  }
  .wxdc-header {
    background-position: top center;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
  }
  .wxdc-header-inner {
    background: rgba(0,0,0,0.5);
    backdrop: blur(10px);
  }
  .wxdc-header a.weui_media_box:active {
    background-color: transparent;
  }
  .wxdc-header-back {
    position: absolute;
    top: 0;
    padding-left: 5px;
    line-height: 35px;
    color: #fff;
    padding-top: 3px;
  }
  .wxdc-header-back span {
    float: left;
  }
  .wxdc-store-bot {
    background: transparent;
  }
  .wxdc-store-bot-inner {
    background-color: rgba(61,61,63,0.9);
    height: 48px;
    width: 100%;
    backdrop: blur(30px);
  }
  .wxdc-store-cart {
    position: absolute;
    width: 50px;
    height: 50px;
    background: #363636;
    bottom: 0;
    border: 5px solid #444;
    border-radius: 100%;
    left: 10px;
    color: #67676b;
    text-align: center;
  }
  .wxdc-store-count {
    padding-left: 80px;
    float: left;
  }
  .wxdc-store-count p {
    color: #fff;
    font-size: 18px;
    line-height: 18px;
    padding-top: 4px;
  }
  .wxdc-store-count span {
    color: #eee;
    font-size: 12px;
  }
  .wxdc-store-btn {
    float: right;
    height: 100%;
  }
  .wxdc-store-btn a {
    display: block;
    background: #535356;
    /*background: #4cd964*/
    opacity: 0.95;
    color: #fff;
    height: 100%;
    line-height: 48px;
    width: 100px;
    text-align: center;
    text-decoration: none;
    outline: none;
    appearance: none;
  }
</style>
