<template>
  <div style="padding-bottom: 0;">
    <!-- 城市选择 -->
    <popup :show.sync="showcityselect" height="100%">
      <div class="wxdc-city-right-list">
        <div class="wxdc-city-right-list-inner">
          <a v-for="(key,value) in linklist" @click="goLink(key)">{{ value }}</a>
        </div>
      </div>
      <div class="vux-header">
        <div class="vux-header-left" @click="showcityselect=false">
          <a class="v-transition"><span class="iconfont icon-close"></span></a>
        </div>
        <h1 class="vux-header-title" @click="scrollTop"><span class="v-transition">城市选择</span></h1>
        <div class="vux-header-right"></div>
      </div>
      <scroller lock-x height="-45+'px'" v-ref:scrollerchina>
        <div style="padding-bottom: 20px;margin-right: 15px" class="wxdc-china-city">
          <div class="wxdc-base-city-search-panel">
            <search class="wxdc-base-city-search"
              :value.sync="value"
              top="0"
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
              <checker-item v-for="item in hotcity" value="item" @click="setLocation(item)">
                {{ item }}
              </checker-item>
            </checker>
          </div>
          <group v-for="(key,value) in china" :id="'link'+($index+2)" :title="key">
            <p class="vux-1px-t" v-for="item in value" @click="setLocation(item.name)">{{ item.name }}</p>
          </group>
        </div>
      </scroller>
    </popup>
    <!-- 用户协议 -->
    <popup :show.sync="showagree" height="100%">
      <div class="vux-header">
        <div class="vux-header-left" @click="showagree=false">
          <a class="v-transition"><span class="iconfont icon-close"></span></a>
        </div>
        <h1 class="vux-header-title"><span class="v-transition">用户协议</span></h1>
        <div class="vux-header-right"></div>
      </div>
      <scroller lock-x height="-150+'px'" v-ref:scrolleragree>
        <div style="padding-bottom: 20px" class="wxdc-base-agree">
          <p style="text-align: center;font-weight: bold">上海师大云餐厅网上订餐会员协议</p>
          <font style="font-weight: bold;">请认真阅读会员协议</font><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;欢迎使用上海师大云餐厅网上订餐服务，请您务必先仔细阅读本会员协议，我们将按以下的方式为您提供网上订餐服务，如果您希望使用本网上订餐服务，您必须完全同意并接受本用户协议。（请拖动右侧滚动条阅读）<br/>
          •	我们的服务和义务<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;         •	基本服务<br/>
          &nbsp;&nbsp;&nbsp;&nbsp; •	为提升校园餐饮服务水平，提高用餐效率，上海师大云餐厅（以下简称云餐厅）采用网上预定、送餐到柜、会员规定时段内到餐柜自助取餐的服务模式。<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;•	为确保早餐供应及时充沛，云餐厅的预定时间为：前一天23：00前。<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;•	我们的送餐时间是指送餐到柜的时间。为保证食品安全和产品质量，会员务必在送餐到柜后90分钟内完成取餐，如逾期未取，我们将锁定柜门不予取餐，并作为废餐由清柜员及时回收处理，以避免因产品长时间存放造成变质给会员健康带来风险，逾期未取的损失由会员自己承担。<br/>
          &nbsp;&nbsp;&nbsp;&nbsp; •	产品、价格以及送餐到柜的时间如有调整，我们将及时在网上更新，敬请留意。<br/>
          &nbsp;&nbsp;&nbsp;&nbsp; •	如遇不可抗力，云餐厅将暂停提供相关服务。<br/>
          <br/>
          •	关于订餐<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;•	产品和包装以实物为准。<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;•	在您成功提交订单完成网上订餐后，页面上会立即提示确认信息，微信收到云餐厅支付成功订单。此外，您也可以在云餐厅首页“订单”中查询本次订餐的所有信息。<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;•	请不要在网上重复提交订单而造成重复下单。<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;•	您成功完成网上订餐后，我们将在预定截止时间汇总相应的食材数量，立刻进行食材采购，因此我们无法接受订单的修改。如您确有特殊情况需要退订的，在预定截止时间前完成退订的，可获100%退款；在预定的送餐到柜时间的3小时前完成退订的，可获50%退款；预定送餐到柜时间3小时内退订，不予退款。<br/>
          <br/>
          •	关于支付方式<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;•	我们提供校园卡和微信支付的方式<br/>
          <br/>
          &nbsp;&nbsp;&nbsp;&nbsp;•	关于退款方式<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;•	退订成功后，退款将及时存入您的校园卡或微信账号。<br/>
          <br/>
          &nbsp;&nbsp;&nbsp;&nbsp;•	关于短信、微信服务<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;•	为了提醒您预定的取餐时间，我们会在送餐到柜后，发微信通知您取餐单号。<br/>
          <br/>
          •	关于常见问题处理<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;•	如您的订单未能按时送达餐柜，请立即拨打客户热线57122346，客服将立刻核实订单为您妥善处理。<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;•	如您在预定取餐时间段内不能打开指定柜门，请立即拨打客户热线57122346，客服将立刻核实订单为您妥善处理。<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;•	如您在预定取餐时间段内打开指定柜门后，取到的餐与您的订单内容不符，请立即拨打客户热线57122346，客服将立刻核实订单为您妥善处理。<br/>
          <br/>
          •	您（会员）的义务<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;•	请您慎重选择送餐时间和地点，以免耽误取餐。<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;•	请您在取餐时，务必仔细核对订单上的取餐时间、地点和柜号，避免因自己误操作而至系统出错，从而影响他人取餐。<br/>
          <br/>
          对于恶意订餐、取餐导致订餐、取餐系统及设备受损的会员，将列入不诚信用户名单，交由校方等相关部门处理。<br/>
          本协议最终解释权归上海师大云餐厅。<br/>
        </div>
      </scroller>
      <box gap="15px 5px 0 5px">
        <flexbox>
          <flexbox-item>
            <x-button @click="disagree">不同意</x-button>
          </flexbox-item>
          <flexbox-item>
            <x-button type="primary" @click="showagree=false">同意</x-button>
          </flexbox-item>
        </flexbox>
      </box>
      <div class="wxdc-home-checklist">
        <checklist :options="agreements" :value.sync="agreement" @on-change="change"></checklist>
      </div>
    </popup>
    <scroller v-ref:scroller lock-x scrollbar-y height="-45+'px'"
              @pullup:loading="loadmore"
              @pulldown:loading="refresh"
              :pullup-status.sync="pullupStatus"
              :pulldown-config="pulldownConfig">
      <!-- use-pullup use-pulldown -->
      <div style="padding-bottom: 20px;">
        <div class="vux-header">
          <div class="vux-header-left" @click="showcityselect=true">
            <a class="v-transition">
              {{ location | fmtLocation }}<span class="iconfont icon-unfold" style="font-size: 16px;"></span>
            </a>
          </div>
          <!-- 顶部搜索 -->
          <div class="vux-header-title wxdc-home-header-title">
            <searchbar placeholder="输入商户名称"></searchbar>
          </div>
          <div class="vux-header-right" style="color: #fff;padding: 10px;margin-top: -10px;margin-right: -10px">
            <span class="iconfont icon-message" style="font-size: 20px;"></span>
          </div>
        </div>
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
    <alert :show.sync="showalert" button-text="确定">您需同意本站协议，才可享受本站提供的服务</alert>
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
    CheckerItem,
    Box,
    XButton,
    Checklist,
    Alert
  } from 'vux/src/components'

  import searchbar from './components/searchbar.vue'

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
      CheckerItem,
      Box,
      XButton,
      Checklist,
      Alert,
      searchbar
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
      },
      // 下次是否在首页显示用户协议
      change (val) {
        let storage = window.localStorage
        if (val.length > 0) {
          storage.setItem('isagreement', 'true')
        } else {
          storage.removeItem('isagreement')
        }
      },
      // 不同意用户协议
      disagree () {
        this.showalert = true
      },
      goLink (key) {
        let anchor = (key) => {
          return document.querySelector('#link' + key).offsetHeight
        }
        let top = 0
        for (let i = 0; i < key; i++) {
          top += anchor(i)
        }
        this.$nextTick(() => {
          this.$refs.scrollerchina.reset({
            top: top
          })
        })
      },
      scrollTop () {
        this.$nextTick(() => {
          this.$refs.scrollerchina.reset({
            top: 0
          })
        })
      },
      setLocation (location) {
        this.location = location
        this.showcityselect = false
      }
    },
    data () {
      // 获取agreement
      let storage = window.localStorage
      let history = window.sessionStorage
      let agreement = true
      if (storage.getItem('isagreement') || history.getItem('isFirstLoad')) {
        agreement = false
      } else {
        history.setItem('isFirstLoad', true)
      }
      return {
        location: '上海',
        showcityselect: true,
        showagree: agreement,
        showalert: false,
        baseList: this.getList,
        ads: this.getAD,
        china: '',
        time: '2017-02-03', // 倒计时
        n: 20,
        pullupStatus: 'default',
        pulldownConfig: {content: '下拉刷新', downContent: '下拉刷新', upContent: '释放刷新', loadingContent: '加载中...'},
        hotcity: ['上海', '北京', '广州', '深圳', '武汉', '天津', '西安', '南京', '杭州', '成都', '重庆'],
        linklist: ['!', '#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J',
                   'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'],
        agreement: [],
        agreements: ['不再显示在首页']
      }
    },
    created () {

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
  @import "assets/font/iconfont.css";
  /* search */
  .wxdc-base-city-search-panel {
    height: 50px;
  }
  .wxdc-base-city-search .weui_search_bar {
    background-color: #ffffff;
  }
  .wxdc-base-city-search .vux-search-mask {
    background: rgba(0,0,0,0.1);
    border-radius: 5px;
  }
  .wxdc-base-city-search .weui_search_cancel {
    color: #26a2ff;
  }
  .wxdc-base-city-search.vux-search-fixed .weui_search_inner {
    background: rgba(0,0,0,0.1);
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
  .box2 .weui_media_box.weui_media_appmsg {
    align-items: flex-start;
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
    padding: 5px 0;
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
    top: 47px;
    bottom: 0;
    background: #ffffff;
    z-index: 10;
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
  /* 用户协议 */
  .wxdc-base-agree {
    margin-top: 5px;
    width: 97%;
    margin-left: 1.5%;
    background: #ffffff;
  }
  .wxdc-home-checklist .weui_cells {
    background: none;
  }
  .wxdc-home-checklist label {
    padding-left: 5px;
  }
  .wxdc-home-checklist .weui_cells:after,
  .wxdc-home-checklist .weui_cells:before {
    display: none;
  }
</style>
