/**
* Created by caiyuhao on 2017/2/2.
* 美食、超市
*/
<template>
  <div>
    <scroller v-ref:scroller lock-x scrollbar-y height="-45+'px'">
      <div style="padding-bottom: 20px">
        <x-header :left-options="{backText:'返回',showBack:true}" :title="title">
          <span slot="right" class="iconfont icon-search" @click="showsearch"
                style="color: #fff;font-size: 18px;padding:15px 15px;margin-right:-15px;"></span>
        </x-header>
        <div v-if="show" transition="expand">
          <group style="margin-top: -1.17647059em">
            <x-input placeholder="输入商户、商品"></x-input>
            <x-input placeholder="输入取餐点、取货点" readonly @click="showlocations()"></x-input>
            <datetime title="营业时间" :placeholder="placeholder | date-formatter 'YYYY-MM-DD HH:mm'" format="YYYY-MM-DD HH:mm"
                      year-row="{value}年" month-row="{value}月" day-row="{value}日"
                      hour-row="{value}时" minute-row="{value}分" confirm-text="完成"
                      cancel-text="取消"></datetime>
          </group>
        </div>
        <swiper
          :list="baseList" :show-desc-mask="false"
          auto :aspect-ratio="300/800" dots-position="center"></swiper>
        <group style="margin-top: -15px;">
          <flexbox class="wxdc-flexbox" style="width: 90%;margin: auto">
            <flexbox-item class="wxdc-flexbox-item">
              <a v-link="{name:'shop',params:{id:1,name:'美食'}}">
                <img alt="美食" src="../assets/img/63ca16ada777a5c20bcf94e94afcajpeg.jpeg">
                <span>美食</span>
              </a>
            </flexbox-item>
            <flexbox-item class="wxdc-flexbox-item">
              <a v-link="{name:'shop',params:{id:2,name:'超市'}}">
                <img alt="超市" src="../assets/img/cd5f54400a79aec3a69ceb2355f96jpeg.jpeg">
                <span>超市</span>
              </a>
            </flexbox-item>
            <flexbox-item class="wxdc-flexbox-item">
              <a>
                <img alt="当面购" src="../assets/img/ee163a3c4fc85f94d7f22acb3b762jpeg.jpeg">
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
                    <img alt="ad" src="../assets/img/ee163a3c4fc85f94d7f22acb3b762jpeg.jpeg">
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
          <div class="wxdc-cond">
            <flexbox wrap="wrap">
              <flexbox-item class="wxdc-cond-item" @click="showmenus(1)">
                分类<span class="iconfont icon-triangledownfill" style="font-size: 10px"></span>
              </flexbox-item>
              <flexbox-item class="wxdc-cond-item" @click="showmenus(2)">
                排序<span class="iconfont icon-triangledownfill" style="font-size: 10px"></span>
              </flexbox-item>
              <flexbox-item class="wxdc-cond-item" @click="showmenus(3)">
                筛选<span class="iconfont icon-triangledownfill" style="font-size: 10px"></span>
              </flexbox-item>
            </flexbox>
          </div>
          <!-- 下拉菜单 -->
          <div v-if="showmenu" class="wxdc-cond-menu" transition="expandmenu">
            <cell v-for="i in 6" is-link>
              <span slot="icon">菜单{{ i }}</span>
            </cell>
          </div>
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
    </scroller>
    <popup :show.sync="showpopup" height="280px" title="选择取餐点、取货点">
      <group style="margin-top: -20px">
        <cell title="选择取餐点、取货点">
        <span class="iconfont icon-close_light" @click="showlocations"
              style="font-size: 16px;color:#eee;background:#999;border-radius: 100%;padding:1px;"></span>
        </cell>
      </group>
      <picker :data='years' :value.sync="locations"></picker>
    </popup>
  </div>
</template>
<script>
  import {
    XHeader,
    Swiper,
    SwiperItem,
    Group,
    Cell,
    Scroller,
    Spinner,
    Clocker,
    Flexbox,
    FlexboxItem,
    Rater,
    XInput,
    Datetime,
    DateFormatter,
    Popup,
    Picker
  } from 'vux/src/components'
  import {
    getAD,
    getList
  } from '../vuex/getters'

  let years = []
  for (var i = 2000; i <= 2030; i++) {
    years.push({
      name: i + '年',
      value: i + ''
    })
  }

  export default {
    components: {
      XHeader,
      Swiper,
      SwiperItem,
      Group,
      Cell,
      Scroller,
      Spinner,
      Clocker,
      Flexbox,
      FlexboxItem,
      Rater,
      XInput,
      Datetime,
      Popup,
      Picker
    },
    filters: {
      DateFormatter
    },
    vuex: {
      getters: {
        getAD,
        getList
      }
    },
    methods: {
      showsearch () {
        this.show ? this.show = false : this.show = true
        let self = this
        setTimeout(function () {
          self.$nextTick(() => {
            self.$refs.scroller.reset()
          })
        }, 320)
      },
      showlocations () {
        this.showpopup ? this.showpopup = false : this.showpopup = true
      },
      showmenus (type) {
        if (this.currentType !== type) {
          if (!this.showmenu) {
            this.showmenu = true
          }
          this.currentType = type
        } else {
          this.showmenu ? this.showmenu = false : this.showmenu = true
        }
        let self = this
        setTimeout(function () {
          self.$nextTick(() => {
            self.$refs.scroller.reset()
          })
        }, 320)
      }
    },
    data () {
      return {
        title: this.$route.params.name,
        baseList: this.getList,
        ads: this.getAD,
        time: '2017-02-03', // 倒计时
        n: 20,
        show: false,
        showpopup: false,
        showmenu: false,
        placeholder: new Date(),
        location: [],
        locations: [],
        currentType: 0, // 记录菜单
        years: [years]
      }
    },
    ready () {
      // 刷新列表之后必须调用
      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })
    }
  }
</script>
<style>
  /* 必需 */
  .expand-transition {
    transition: all .3s ease;
    height: 135px;
    background-color: #eee;
    overflow: hidden;
  }
  /* .expand-enter 定义进入的开始状态 */
  /* .expand-leave 定义离开的结束状态 */
  .expand-enter, .expand-leave {
    height: 0;
    opacity: 0;
  }
  .expandmenu-transition {
    transition: all .3s ease;
    height: 270px;
    background-color: #eee;
    overflow: hidden;
  }
  .expandmenu-enter, .expandmenu-leave {
    height: 0;
    opacity: 0;
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
  /* 条件搜索 */
  .wxdc-cond {
    position: relative;
  }
  .wxdc-cond:before {
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
  .wxdc-cond-item {
    text-align: center;
    color: #555;
    font-size: 14px;
    padding: 12px 0;
    position: relative;
  }
  .wxdc-cond-item:after {
    content: " ";
    position: absolute;
    top: 10px;
    bottom: 10px;
    right: 0;
    width: 1px;
    border-left: 1px solid #D9D9D9;
    color: #D9D9D9;
    transform-origin: 0 0;
    transform: scaleX(0.5);
  }
  .wxdc-cond-item > span {
    margin-left: 3px;
  }
</style>
