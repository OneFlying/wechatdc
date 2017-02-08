/**
 * Created by caiyuhao on 2017/1/31.
 * 订单
 */
<template>
  <div>
    <x-header title="订单" :left-options="{showBack:false,backText:'返回'}"></x-header>
    <tab :line-width=2 active-color='#26a2ff' :index.sync="index">
      <tab-item class="vux-center" :selected="demo2 === item" v-for="item in list" @click="demo2 = item">{{item}}</tab-item>
    </tab>
    <swiper :index.sync="index" :height="height" :show-dots="false">
      <swiper-item>
        <div class="tab-swiper">
          <scroller
            lock-x scrollbar-y use-pullup use-pulldown v-ref:scroller height="-140+'px'"
            @pullup:loading="loadmore"
            @pulldown:loading="refresh"
            :pullup-status.sync="pullupStatus"
            :pulldown-config="pulldownConfig">
            <div style="padding-bottom: 10px">
              <group style="margin-top: -19px">
                <a class="weui_media_box weui_media_appmsg"
                   v-for="i in n"
                   @click="showdetail">
                  <div class="weui_media_hd">
                    <img class="weui_media_appmsg_thumb" alt="" src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff">
                  </div>
                  <div class="weui_media_bd">
                    <h4 class="weui_media_title">杨明宇黄猛击米饭{{ i }}</h4>
                    <p class="weui_media_desc">
                      <cell class="wxdc_weui_media_title">
                        <span slot="icon">2017-02-05 16:46:32</span>
                        <span slot="value" style="color:#333">订单已完成</span>
                      </cell>
                      <cell class="wxdc_weui_media_title" style="font-size: 16px;color:#555;padding: 10px 0">
                      <span slot="icon">土豆烧牛肉、位于为
                        等6件商品</span>
                        <span slot="value" style="color:#555">&#165;35</span>
                      </cell>
                      <cell class="wxdc_weui_media_title">
                        <span slot="icon">订单号</span>
                        <span slot="value">N0000000000</span>
                      </cell>
                      <cell class="wxdc_weui_media_title wxdc_weui_media_title_noborder">
                        <span slot="icon">取餐点编号</span>
                        <span slot="value">M1000000000</span>
                      </cell>
                      <cell class="wxdc_weui_media_title wxdc_weui_media_title_noborder">
                        <span slot="icon">取餐码</span>
                        <span slot="value">2758273842359</span>
                      </cell>
                      <cell class="wxdc_weui_media_title wxdc_weui_media_title_noborder">
                        <span slot="icon">地址</span>
                        <span slot="value">上海浦东康阳路889号</span>
                      </cell>
                      <cell class="wxdc_weui_media_title">
                        <span slot="value">
                          <x-button mini class="wxdc-btn" @click.stop.prevent="qucan">去取餐</x-button>
                        </span>
                        <span slot="value">
                          <x-button mini class="wxdc-btn" @click.stop.prevent="onemore">再来一单</x-button>
                        </span>
                      </cell>
                    </p>
                  </div>
                </a>
              </group>
            </div>
            <!--pullup slot-->
            <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
              <span v-show="pullupStatus === 'default'"></span>
              <span class="pullup-arrow" v-show="pullupStatus === 'down' || pullupStatus === 'up'" :class="{'rotate': pullupStatus === 'up'}">↑</span>
              <span v-show="pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
            </div>
          </scroller>
        </div>
      </swiper-item>
      <swiper-item>
        <div class="tab-swiper">
          <scroller
            lock-x scrollbar-y use-pullup use-pulldown v-ref:scroller height="-140+'px'"
            @pullup:loading="loadmoreall"
            @pulldown:loading="refreshall"
            :pullup-status.sync="pullupStatus"
            :pulldown-config="pulldownConfig">
            <div style="padding-bottom: 10px">
              <group style="margin-top: -19px">
                <a class="weui_media_box weui_media_appmsg"
                   v-for="i in n1"
                   @click="showdetail">
                  <div class="weui_media_hd">
                    <img class="weui_media_appmsg_thumb" alt="" src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff">
                  </div>
                  <div class="weui_media_bd">
                    <h4 class="weui_media_title">杨明宇黄猛击米饭{{ i }}</h4>
                    <p class="weui_media_desc">
                      <cell class="wxdc_weui_media_title">
                        <span slot="icon">2017-02-05 16:46:32</span>
                        <span slot="value" style="color:#333">订单已完成</span>
                      </cell>
                      <cell class="wxdc_weui_media_title" style="font-size: 16px;color:#555;padding: 10px 0">
                      <span slot="icon">土豆烧牛肉、位于为
                        等6件商品</span>
                        <span slot="value" style="color:#555">&#165;35</span>
                      </cell>
                      <cell class="wxdc_weui_media_title">
                        <span slot="icon">订单号</span>
                        <span slot="value">N0000000000</span>
                      </cell>
                      <cell class="wxdc_weui_media_title wxdc_weui_media_title_noborder">
                        <span slot="icon">取餐点编号</span>
                        <span slot="value">M1000000000</span>
                      </cell>
                      <cell class="wxdc_weui_media_title wxdc_weui_media_title_noborder">
                        <span slot="icon">取餐码</span>
                        <span slot="value">2758273842359</span>
                      </cell>
                      <cell class="wxdc_weui_media_title wxdc_weui_media_title_noborder">
                        <span slot="icon">地址</span>
                        <span slot="value">上海浦东康阳路889号</span>
                      </cell>
                      <cell class="wxdc_weui_media_title">
                        <span slot="value">
                          <x-button mini class="wxdc-btn" @click.stop.prevent="qucan">去取餐</x-button>
                        </span>
                        <span slot="value">
                          <x-button mini class="wxdc-btn" @click.stop.prevent="onemore">再来一单</x-button>
                        </span>
                      </cell>
                    </p>
                  </div>
                </a>
              </group>
            </div>
            <!--pullup slot-->
            <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
              <span v-show="pullupStatus === 'default'"></span>
              <span class="pullup-arrow" v-show="pullupStatus === 'down' || pullupStatus === 'up'" :class="{'rotate': pullupStatus === 'up'}">↑</span>
              <span v-show="pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
            </div>
          </scroller>
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
  import {
    XHeader,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    Scroller,
    Cell,
    Group,
    Spinner,
    XButton
  } from 'vux/src/components'

  export default {
    components: {
      XHeader,
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Scroller,
      Cell,
      Group,
      Spinner,
      XButton
    },
    methods: {
      loadmore (uuid) {
        setTimeout(() => {
          this.n += 10
          setTimeout(() => {
            this.$broadcast('pullup:reset', uuid)
          }, 10)
        }, 10)
      },
      refresh (uuid) {
        setTimeout(() => {
          this.n = 10
          this.$nextTick(() => {
            this.$broadcast('pulldown:reset', uuid)
          })
        }, 10)
      },
      loadmoreall (uuid) {
        setTimeout(() => {
          this.n1 += 10
          setTimeout(() => {
            this.$broadcast('pullup:reset', uuid)
          }, 10)
        }, 10)
      },
      refreshall (uuid) {
        setTimeout(() => {
          this.n1 = 10
          this.$nextTick(() => {
            this.$broadcast('pulldown:reset', uuid)
          })
        }, 10)
      },
      showdetail () {
        window.router.go({
          path: '/orderdetail',
          replace: false
        })
      },
      qucan () {
        // 取餐
        window.alert('取餐')
      },
      onemore () {
        // 再来一单
        window.alert('再来一单')
      }
    },
    data () {
      let height = document.documentElement.clientHeight
      return {
        height: height - 140 + 'px',
        list: ['待取餐', '全部'],
        index: 0,
        demo2: '待取餐',
        n: 10,
        n1: 10,
        pullupStatus: 'default',
        pulldownConfig: {content: '下拉刷新', downContent: '下拉刷新', upContent: '释放刷新', loadingContent: '加载中...'}
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
  /* button */
  .wxdc-btn {
    background: #3199e8;
    color: #fff;
    padding: 5px 15px !important;
  }
  .wxdc-btn:after {
    display: none;
  }
</style>
