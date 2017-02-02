/**
* Created by caiyuhao on 2017/2/2.
* 美食、超市
*/
<template>
  <div style="height:100%">
    <scroller v-ref:scroller lock-x scrollbar-y height="-45+'px'">
      <div style="padding-bottom: 20px">
        <x-header :left-options="{backText:'返回',showBack:true}" :title="title">
          <span slot="right" class="iconfont icon-search" style="color: #fff;font-size: 20px"></span>
        </x-header>
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
    </scroller>
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
    Rater
  } from 'vux/src/components'
  import {
    getAD,
    getList
  } from '../vuex/getters'

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
      Rater
    },
    vuex: {
      getters: {
        getAD,
        getList
      }
    },
    data () {
      return {
        title: this.$route.params.name,
        baseList: this.getList,
        ads: this.getAD,
        time: '2017-02-03', // 倒计时
        n: 20
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
  @import "../assets/font/iconfont.css";

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
