<template>
  <div style="padding-bottom: 0;">
    <!-- 用户协议 -->
    <!-- 城市选择 -->
    <popup :show.sync="showcityselect" height="100%">
      <div class="wxdc-city-right-list">
        <div class="wxdc-city-right-list-inner">
          <a v-for="(key,value) in linklist" :href="'#link'+key">{{ value }}</a>
        </div>
      </div>
      <div class="vux-header">
        <div class="vux-header-left" @click="showcityselect=false">
          <a class="v-transition"><span class="iconfont icon-close"></span></a>
        </div>
        <h1 class="vux-header-title"><span class="v-transition">城市选择</span></h1>
        <div class="vux-header-right"></div>
      </div>
      <scroller lock-x height="-45+'px'" v-ref:scrollerchina>
        <div style="padding-bottom: 20px;" class="wxdc-china-city">
          <div style="margin-right: 15px;">
            <search class="wxdc-base-city-search"
              :value.sync="value"
              top="-12px"
              :auto-fixed="true"
              placeholder="输入城市名或拼音查询"
              cancel-text="取消"></search>
          </div>
          <div class="wxdc-base-grid" id="link0">
            <div class="wxdc-base-grid-title">定位城市</div>
            <checker>
              <checker-item value="正在定位">正在定位</checker-item>
            </checker>
          </div>
          <div class="wxdc-base-grid" id="link1">
            <div class="wxdc-base-grid-title">热门城市</div>
            <checker>
              <checker-item v-for="item in hotcity" value="item">
                {{ item }}
              </checker-item>
            </checker>
          </div>
          <group v-for="(key,value) in china" :title="key" style="margin-right: 15px">
            <a :id="'link'+$index"></a>
            <p class="vux-1px-t" v-for="item in value">{{ item.name }}</p>
          </group>
        </div>
      </scroller>
    </popup>
    <scroller v-ref:scroller lock-x scrollbar-y height="-45+'px'"
              @pullup:loading="loadmore"
              @pulldown:loading="refresh"
              :pullup-status.sync="pullupStatus"
              :pulldown-config="pulldownConfig">
      <!-- use-pullup use-pulldown -->
      <div style="padding-bottom: 20px">
        <x-header :left-options="{showBack: false}" @click="showcityselect=true">
          <a slot="left" style="font-size: 16px;color:#fff;">
            <i class="iconfont icon-locationfill" style="font-size: 16px"></i>
            {{ location }}
            <i class="iconfont icon-triangledownfill" style="font-size: 10px"></i>
          </a>
          <a slot="right" style="color: #fff;padding: 10px;margin-top: -10px;margin-right: -10px">
            <span class="iconfont icon-message" style="font-size: 20px;"></span>
          </a>
        </x-header>
        <search class="wxdc-base-search"
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
            <a class="weui_media_box weui_media_appmsg"
               style="padding-right: 5px"
               v-for="i in n"
               v-link="{name:'store',params:{id:1,name:'黄猛击米饭'}}">
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
    Rater,
    Popup,
    Checker,
    CheckerItem
  } from 'vux/src/components'

  import {
    getAD,
    getList,
    getChina
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
      Rater,
      Popup,
      Checker,
      CheckerItem
    },
    vuex: {
      getters: {
        getAD,
        getList,
        getChina
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
        showcityselect: true,
        baseList: this.getList,
        ads: this.getAD,
        china: '',
        time: '2017-02-03', // 倒计时
        n: 20,
        pullupStatus: 'default',
        pulldownConfig: {content: '下拉刷新', downContent: '下拉刷新', upContent: '释放刷新', loadingContent: '加载中...'},
        hotcity: ['上海', '北京', '广州', '深圳', '武汉', '天津', '西安', '南京', '杭州', '成都', '重庆'],
        linklist: ['!', '#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J',
                   'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z']
      }
    },
    ready () {
      let address = window.localStorage.getItem('address')
      if (!address) {
        this.china = this.getChina
      }
      this.$nextTick(() => {
        this.$refs.scroller.reset()
        this.$refs.scrollerchina.reset()
      })
    }
  }
</script>
<style>
  /* search */
  .wxdc-base-search .weui_search_inner .weui_search_input {
    height: 2em;
    line-height: 2em;
  }
  .wxdc-base-search .weui_search_outer {
    background: none;
  }
  .wxdc-base-search .weui_search_bar {
    background-color: #26a2ff;
  }
  .wxdc-base-search .weui_search_bar:before {
    display: none;
  }
  .wxdc-base-search .weui_search_bar:after {
    display: none;
  }
  .wxdc-base-search .weui_search_outer:after {
    border-radius: 40px;
  }
  .wxdc-base-search .weui_search_text {
    border-radius: 40px;
    padding-top: 3px;
  }
  .wxdc-base-search .weui_search_inner .weui_icon_search {
    top: 2px;
  }
  .wxdc-base-city-search .weui_search_bar {
    background-color: #ffffff;
  }
  .wxdc-base-city-search .vux-search-mask {
    background: rgba(0,0,0,0.1);
    border-radius: 5px;
  }
  .wxdc-base-city-search .weui_search_outer {
    background: rgba(0,0,0,0.1);
  }
  .wxdc-base-search .weui_search_cancel {
    color: #fff;
    line-height: 38px;
  }
  /* swiper */
  .wxdc-base .vux-slider > .vux-indicator > a > .vux-icon-dot.active,
  .wxdc-base .vux-slider .vux-indicator-right > a > .vux-icon-dot.active {
    background-color: #26a2ff;
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
    padding: 7px 0;
    font-size: 13px;
  }
  .wxdc_weui_media_title .weui_cell_ft {
    white-space: nowrap;
  }
  .wxdc_weui_media_title_noborder:before {
    display: none;
  }
  .wxdc-china-city p {
    padding: 10px 15px 10px 0;
    margin-left: 15px;
    position: relative;
    font-size: 16px;
  }
  .wxdc-base-grid-title {
    font-size: 14px;
    margin-top: .77em;
    margin-bottom: .3em;
    color: #888;
    padding: 0 15px;
  }
  .wxdc-base-grid .vux-checker-box {
    padding: 5px 15px 5px 0;
  }
  .wxdc-base-grid .vux-checker-item {
    width: 32.333333%;
    margin: 0.5%;
    box-sizing: border-box;
    background: #ffffff;
    padding: 5px 0;
    text-align: center;
    border: 1px solid #d9d9d9;
    border-radius: 3px;
  }
  .wxdc-city-right-list {
    position: fixed;
    right: 0;
    width: 15px;
    top: 46px;
    bottom: 0;
    background: #ffffff;
    z-index: 10000;
  }
  .wxdc-city-right-list .wxdc-city-right-list-inner {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .wxdc-city-right-list a {
    display: block;
    width: 15px;
    font-size: 12px;
    text-align: center;
    color: #26a2ff;
  }
</style>
