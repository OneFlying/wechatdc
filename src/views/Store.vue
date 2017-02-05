/**
* Created by caiyuhao on 2017/2/2.
* 商家详情
*/
<template>
  <div style="overflow: hidden">
    <scroller lock-x lock-y>
      <div style="padding-bottom: 20px">
        <div class="wxdc-header" slot="header"
             style="background-image:url('http://img4.imgtn.bdimg.com/it/u=3037353591,3801722723&fm=214&gp=0.jpg')">
          <div class="wxdc-header-inner">
            <a class="weui_media_box weui_media_appmsg" style="padding: 5px 10px">
              <div class="weui_media_hd">
                <img class="weui_media_appmsg_thumb" alt="logo" src="http://img4.imgtn.bdimg.com/it/u=3037353591,3801722723&fm=214&gp=0.jpg">
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
        <div class="menu">
          <scroller lock-x scrollerbar-y height="-190+'px'">
            <div class="wxdc-menu-box">
              <ul>
                <li @click="activemenu(sort,$index)"
                    class="vux-1px-b"
                    v-for="sort in sorts"
                    :class="active === sort ? 'active' : ''"><badge text="0" class="wxdc-menu-box-li-badge"></badge><span>{{ sort }}</span></li>
              </ul>
            </div>
          </scroller>
        </div>
        <div class="content">
          <scroller lock-x scrollbar-y height="-150+'px'" v-ref:scroller>
            <div class="wxdc_weui_media" style="padding-bottom: 60px">
              <group v-for="sort in sorts" :title="sort" style="margin-top: -5px;">
                <a class="weui_media_box weui_media_appmsg"
                   style="padding-right: 5px; padding-left: 10px"
                   v-for="good in list" @click="detail($index)">
                  <div class="weui_media_hd" style="width: 45px;">
                    <img class="weui_media_appmsg_thumb" alt="" src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff">
                  </div>
                  <div class="weui_media_bd">
                    <h4 class="weui_media_title">{{ good.title }}</h4>
                    <p class="weui_media_desc">
                      <cell class="wxdc_weui_media_title">
                        <rater :value="4.3" slot="icon" :font-size="12" :margin="0" active-color="#ffaa0c"></rater>
                        <span slot="icon">4.3</span>
                      </cell>
                      <cell class="wxdc_weui_media_title wxdc_weui_media_title_noborder" style="padding-right: 10px">
                        <span slot="icon" style="color: #ff6000; font-size: 14px;">&#165;35</span>
                        <span slot="value" class="wxdc-number">
                          <span class="wxdc-number-move" @click.stop.prevent="remove($index)">
                            <i class="iconfont icon-move"></i>
                          </span>
                          <span class="wxdc-number-number">{{ good.number }}</span>
                          <span class="wxdc-number-add" @click.stop.prevent="add($index)">
                            <i class="iconfont icon-add"></i>
                          </span>
                        </span>
                      </cell>
                    </p>
                  </div>
                </a>
              </group>
            </div>
          </scroller>
        </div>
      </div>
    </scroller>
    <!-- 购物车 -->
    <popup :show.sync="show" style="bottom:48px;max-height: 360px;overflow: hidden;">
      <group title="购物车" class="wxdc-cart-cart">
        <span @click="clearcart" class="wxdc-cart-clear">
          <span class="iconfont icon-delete_light" style="font-size: 16px;"></span>清空
        </span>
        <scroller lock-x height="320px" v-ref:scrollercart>
          <div style="padding-bottom: 10px">
            <cell v-for="i in 15" title="菜品名称">
              <span slot="value" class="wxdc-cart-sale">&#165;20</span>
              <span slot="value" class="wxdc-number">
              <span class="wxdc-number-move">
                <i class="iconfont icon-move"></i>
              </span>
              <span class="wxdc-number-number">1</span>
              <span class="wxdc-number-add">
                <i class="iconfont icon-add"></i>
              </span>
            </span>
            </cell>
          </div>
        </scroller>
      </group>
    </popup>
    <!-- footer slot -->
    <tabbar slot="bottom" class="wxdc-store-bot" style="z-index: 1000;">
      <div class="wxdc-store-cart" @click="showcart">
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
    <!-- 商品详情 -->
    <previewer
      :show.sync="showpreviewer"
      img="http://img4.imgtn.bdimg.com/it/u=3037353591,3801722723&fm=214&gp=0.jpg"></previewer>
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
    TabItem,
    XNumber,
    Group,
    Badge,
    Popup
  } from 'vux/src/components'

  import previewer from '../components/previewer.vue'

  export default {
    components: {
      Scroller,
      Rater,
      Cell,
      XHeader,
      Tabbar,
      Tab,
      TabItem,
      XNumber,
      Group,
      Badge,
      Popup,
      previewer
    },
    methods: {
      back () {
        // 后退按钮
        window.history.go(-1)
      },
      remove (index) {
        // 移除购物车
        window.alert(index)
      },
      add (index) {
        // 添加购物车
        window.alert(index)
      },
      detail (index) {
        // 显示商品详情
        this.showpreviewer = true
      },
      activemenu (sort, index) {
        this.active = sort
        this.$nextTick(() => {
          this.$refs.scroller.reset({
            top: index === 0 ? 0 : 90 * 6 * index + 44 * index
          })
        })
      },
      showcart () {
        // 显示购物车
        this.show ? this.show = false : this.show = true
      },
      clearcart () {
        // 清空购物车
      }
    },
    data () {
      return {
        state: 0,
        count: 35,
        show: false,
        showpreviewer: false,
        carts: [], // 购物车
        list2: ['商品', '商家'],
        demo2: '商品',
        active: '分类一',
        sorts: ['分类一', '分诶二', '分类三唯一退任', '分类似', '分类吴'], // 绑定list的number
        list: [{
          title: '洗颜新潮流！人气洁面皂排行榜',
          show: false,
          number: 0
        }, {
          title: '美容用品 & 日用品（上）',
          show: false,
          number: 0
        }, {
          title: '日本车载空气净化器精选',
          show: false,
          number: 0
        }, {
          title: '洗颜新潮流！人气洁面皂排行榜',
          show: false,
          number: 0
        }, {
          title: '美容用品 & 日用品（上）',
          show: false,
          number: 0
        }, {
          title: '日本车载空气净化器精选',
          show: false,
          number: 0
        }]
      }
    },
    created () {
      // @params name id 通过 this.$route.params 获取
    },
    ready () {
      this.$nextTick(() => {
        this.$refs.scroller.reset()
        this.$refs.scrollercart.reset()
      })
    }
  }
</script>

<style scoped lange="less">
  @import "../assets/font/iconfont.css";

  .menu {
    width: 75px;
    float: left;
    background-color: #f8f8f8;
  }
  .wxdc-menu-box {
    padding-bottom: 20px;
  }
  .wxdc-menu-box ul {
    width: 75px;
  }
  .wxdc-menu-box li {
    text-align: left;
    padding: 15px 5px;
    font-size: 14px;
    line-height: 20px;
    color: #666;
    position: relative;
  }
  .wxdc-menu-box li .wxdc-menu-box-li-badge {
    position: absolute;
    right: 2px;
    top: 2px;
    font-size: 10px;
    height: 12px;
    line-height: 12px;
    padding: 0 4px;
  }
  .wxdc-menu-box li .wxdc-menu-box-li-badge.vux-badge-single {
    width: 12px;
    padding: 0;
  }
  .wxdc-menu-box li.active {
    background: #fff;
  }
  .wxdc-menu-box li.active:before {
    content: '';
    position: absolute;
    left: 0;
    transform-origin: 0 0;
    height: 90%;
    top: 5%;
    width: 2px;
    border-left: 2px solid #26a2ff;
    background-color: #26a2ff;
    transform: scaleX(0.5);
    transition: all .3s ease;
  }
  .content {
    padding-left: -10px;
  }
  .wxdc-header {
    background-position: top center;
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
  }
  .wxdc-header-inner {
    background: rgba(0,0,0,0.25);
    backdrop-filter: blur(10px);
  }
  .wxdc-android .wxdc-header-inner {
    background: rgba(0,0,0,0.8);
  }
  .wxdc-header-inner .weui_media_box {
    filter: blur(-5px);
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
    backdrop-filter: blur(5px);
  }
  .wxdc-android .wxdc-store-bot-inner {
    background-color: rgba(61,61,63,1);
  }
  .wxdc-store-cart {
    position: absolute;
    z-index: 102;
    width: 50px;
    height: 50px;
    background: #363636;
    bottom: 0;
    border: 5px solid #404040;
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
  .wxdc_weui_media .weui_media_box {
    padding: 10px 0;
  }
  .wxdc_weui_media .wxdc_weui_media_title {
    padding: 2px 0;
  }
  /* 添加或删除购物车 */
  .wxdc-cart-cart {
    position: relative;
  }
  .wxdc-cart-cart .wxdc-cart-clear {
    position: fixed;
    right: 0;
    margin-top: -40px;
    font-size: 14px;
    color: #888;
    line-height: 38px;
    padding: 0 10px;
  }
  .wxdc-cart-cart .weui_cell {
    padding: 13px 15px;
  }
  /* 单价 */
  .wxdc-cart-sale {
    color: #f60;
    margin-right: 10px;
    font-size: 16px;
  }
</style>
