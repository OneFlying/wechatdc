<template>
  <div style="padding-bottom: 0;">
    <scroller v-ref:scroller lock-x scrollbar-y height="-45+'px'"
              @pullup:loading="loadmore"
              @pulldown:loading="refresh"
              :pullup-status.sync="pullupStatus"
              :pulldown-config="pulldownConfig">
      <!-- use-pullup use-pulldown -->
      <div style="padding-bottom: 20px">
        <x-header :left-options="{showBack: false}">
          <a slot="left" style="font-size: 16px;color:#fff;">
            <i class="iconfont icon-locationfill" style="font-size: 16px"></i>
            {{ location }}
            <i class="iconfont icon-triangledownfill" style="font-size: 10px"></i>
          </a>
          <a slot="right" style="color: #fff;padding: 10px;margin-top: -10px;margin-right: -10px">
            <span class="iconfont icon-message" style="font-size: 20px;"></span>
          </a>
        </x-header>
        <search
          @on-submit="onSubmit"
          :auto-fixed="autoFixed"
          placeholder="搜索"
          cancel-text="取消"></search>
        <swiper
          :list="baseList" :show-desc-mask="false"
          auto :aspect-ratio="300/800" dots-position="center"></swiper>
        <group style="margin-top: -15px;">
          <flexbox class="wxdc-flexbox" style="width: 90%;margin: auto">
            <flexbox-item class="wxdc-flexbox-item">
              <a v-link="{name:'shop',params:{id:1,name:'美食'}}">
              <img alt="美食" src="assets/img/63ca16ada777a5c20bcf94e94afcajpeg.jpeg">
                <span>美食</span>
              </a>
            </flexbox-item>
            <flexbox-item class="wxdc-flexbox-item">
              <a v-link="{name:'shop',params:{id:2,name:'超市'}}">
                <img alt="超市" src="assets/img/cd5f54400a79aec3a69ceb2355f96jpeg.jpeg">
                <span>超市</span>
              </a>
            </flexbox-item>
            <flexbox-item class="wxdc-flexbox-item">
              <a>
                <img alt="当面购" src="assets/img/ee163a3c4fc85f94d7f22acb3b762jpeg.jpeg">
                <span>当面购</span>
              </a>
            </flexbox-item>
          </flexbox>
        </group>
        <group style="margin-top: -15px">
          <flexbox :gutter="0" wrap="wrap">
            <flexbox-item :span="1/2" v-for="ad in ads" class="wxdc-ad-flexbox">
              <a :class="$index > 1 ? 'wxdc-ad-flexbox-noborder' : ''" v-link="">
                <flexbox style="padding: 10px 10px">
                  <flexbox-item :span="7">
                    <p>{{ ad.title }}</p>
                    <span>{{ ad.desc }}</span>
                  </flexbox-item>
                  <flexbox-item>
                    <img alt="ad" src="assets/img/ee163a3c4fc85f94d7f22acb3b762jpeg.jpeg">
                  </flexbox-item>
                </flexbox>
              </a>
            </flexbox-item>
          </flexbox>
        </group>
        <group style="margin-top: -15px;">
          <cell title="限时抢购" v-link="{path:'/list'}">
            <clocker :time="time" slot="value" style="font-size: 10px;">
              <span class="day">%_H1</span>
              <span class="day">%_H2</span>时
              <span class="day">%_M1</span>
              <span class="day">%_M2</span>分
              <span class="day">%_S1</span>
              <span class="day">%_S2</span>秒
            </clocker>
          </cell>
          <scroller lock-y scrollbar-x>
            <div class="box1">
              <div class="box1-item" v-for="i in 7"><span>{{' ' + i + ' '}}</span></div>
            </div>
          </scroller>
        </group>
        <group style="margin-top: -15px">
          <cell title="推荐商家" class="wxdc-list-title">
            <span slot="icon" class="iconfont icon-shoplight" style="font-size: 16px"></span>
          </cell>
          <!--content slot-->
          <div class="box2">
            <a class="weui_media_box weui_media_appmsg" style="padding-right: 5px" v-for="i in n">
              <div class="weui_media_hd">
                <img class="weui_media_appmsg_thumb" alt="" src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff">
              </div>
              <div class="weui_media_bd">
                <h4 class="weui_media_title">杨明宇黄猛击米饭{{ i }}</h4>
                <p class="weui_media_desc">
                  <cell class="wxdc_weui_media_title">
                    <rater :value="4.3" slot="icon" :font-size="12" :margin="0" active-color="#ffaa0c"></rater>
                    <span slot="icon" style="color: #ff6000">4.3</span>
                    <span class="wxdc_weui_media_qsf">
                      <span class="wxdc_weui_media_qsf_inner">
                        &#165;20起送
                      </span>
                    </span>
                    <span class="wxdc_weui_media_psf">
                      <span class="wxdc_weui_media_psf_inner">
                        &#165;5配送
                      </span>
                    </span>
                  </cell>
                  <cell class="wxdc_weui_media_title wxdc_weui_media_title_noborder">
                    <span slot="icon" style="font-size: 12px" class="iconfont icon-time"></span>
                    <span slot="icon">07:00 07:30 08:00 08:30 09:00 09:30 10:00 10:30 11:00 11:30</span>
                  </cell>
                </p>
              </div>
            </a>
          </div>
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
</template>
<script>
  import {
    XHeader,
    Search,
    Swiper,
    SwiperItem,
    Flexbox,
    FlexboxItem,
    Group,
    Cell,
    Clocker,
    Scroller,
    Spinner,
    Rater
  } from 'vux/src/components'

  import {
    getAD,
    getList
  } from './vuex/getters'

  export default {
    components: {
      XHeader,
      Search,
      Swiper,
      SwiperItem,
      Flexbox,
      FlexboxItem,
      Group,
      Cell,
      Clocker,
      Scroller,
      Spinner,
      Rater
    },
    vuex: {
      getters: {
        getAD,
        getList
      }
    },
    methods: {
      onSubmit () {
        //
      },
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
      }
    },
    data () {
      return {
        location: '上海市徐汇区上师大...',
        baseList: this.getList,
        ads: this.getAD,
        time: '2017-02-03', // 倒计时
        n: 20,
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
  /* search */
  .wxdc-base .weui_search_inner .weui_search_input {
    height: 2em;
    line-height: 2em;
  }
  .wxdc-base .weui_search_outer {
    background: none;
  }
  .wxdc-base .weui_search_bar {
    background-color: #26a2ff;
  }
  .wxdc-base .weui_search_bar:before {
    display: none;
  }
  .wxdc-base .weui_search_bar:after {
    display: none;
  }
  .wxdc-base .weui_search_outer:after {
    border-radius: 40px;
  }
  .wxdc-base .weui_search_text {
    border-radius: 40px;
    padding-top: 3px;
  }
  .wxdc-base .weui_search_inner .weui_icon_search {
    top: 2px;
  }
  .wxdc-base .weui_search_cancel {
    color: #fff;
    line-height: 38px;
  }
  /* swiper */
  .wxdc-base .vux-slider > .vux-indicator > a > .vux-icon-dot.active,
  .wxdc-base .vux-slider .vux-indicator-right > a > .vux-icon-dot.active {
    background-color: #26a2ff;
  }
  /* flexbox */
  .wxdc-flexbox-item a {
    display: block;
    width: 100%;
    padding: 10px 0;
  }
  .wxdc-flexbox-item a > img {
    width: 52px;
    display: block;
    margin: auto;
  }
  .wxdc-flexbox-item a > span {
    text-align: center;
    display: block;
    width: 100%;
    font-size: 14px;
    color: #666;
  }
  .wxdc-ad-flexbox img {
    display: block;
    width: 50px;
  }
  .wxdc-ad-flexbox a {
    display: block;
    position: relative;
  }
  .wxdc-ad-flexbox a:before {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }
  .wxdc-ad-flexbox a:after {
    content: " ";
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    border-left: 1px solid #D9D9D9;
    color: #D9D9D9;
    transform-origin: 0 0;
    transform: scaleX(0.5);
  }
  .wxdc-ad-flexbox a.wxdc-ad-flexbox-noborder:before {
    display: none;
  }
  .wxdc-ad-flexbox a.wxdc-ad-flexbox-notborder:after {
    display: none;
  }
  .wxdc-ad-flexbox span {
    color: #888;
    font-size: 14px;
  }
  .day {
    background-color:#000;
    color:#fff;
    text-align:center;
    display:inline-block;
    padding:0 3px;
    border-radius:3px;
    margin: 0 0 0 -2px;
  }
  /* 横向滚动 */
  .box1 {
    height: 100px;
    position: relative;
    width: 1490px;
    padding-bottom: 10px;
  }
  .box1-item {
    width: 200px;
    height: 100px;
    background-color: #ccc;
    display:inline-block;
    margin-left: 15px;
    float: left;
    text-align: center;
    line-height: 100px;
  }
  .box1-item:first-child {
    margin-left: 0;
  }
  /* 推荐商家 */
  .wxdc-list-title {
    font-size: 14px;
    color: #888;
    padding-left: 10px;
  }
  .wxdc-list-title .weui_cell_bd > p {
    color: #888;
    padding-left: 3px;
  }
  .wxdc-list-title.weui_cell:first-child:before {
    display: block;
    bottom: 0;
    top: auto;
    left: 10px;
  }
  /* 商户列表 */
  .box2 {
    margin-left: -5px;
  }
  .wxdc_weui_media_title {
    padding: 5px 0;
    font-size: 12px;
  }
  .wxdc_weui_media_title .weui_cell_ft {
    white-space: nowrap;
  }
  .wxdc_weui_media_qsf {
    background-color: #26a2ff;
    color: #fff;
    border-radius: 3px;
    display: inline-block;
    padding: 1px 2px;
    border: 1px solid transparent;
    font-size: 10px;
  }
  .wxdc_weui_media_psf {
    color: #26a2ff;
    border: 1px solid #26a2ff;
    padding: 0 2px 1px;
    border-radius: 3px;
    white-space: nowrap;
    font-size: 10px;
  }
  .wxdc_weui_media_title_noborder:before {
    display: none;
  }
</style>
