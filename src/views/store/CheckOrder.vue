/**
* Created by caiyuhao on 2017/2/8.
* 订单详情
*/
<template>
  <div>
    <x-header title="确认订单" :left-options="{showBack:true,backText:'返回'}"></x-header>
    <scroller lock-x height="-80+'px'" v-ref:scroller>
      <div style="padding-bottom: 40px;">
        <div class="weui_cell wxdc-check-order-header" style="padding: 15px 15px;">
          <div class="weui_cell_hd">
            <span class="wxdc-me-pic" style="background: #fff;border-radius:0;width:24px;line-height: 54px;color:#26a2ff;">
              <span class="iconfont icon-locationfill" style="font-size: 24px;"></span>
            </span>
          </div>
          <div class="weui_cell_bd weui_cell_primary">
            <p style="font-size: 16px;font-weight: bold;">小丸子
              <span style="font-weight: normal">女士 18755133595</span>
            </p>
            <span class="vux-label-desc" style="font-size: 13px;">徐汇区：上师大宿舍楼A栋</span>
          </div>
          <div class="weui_cell_ft with_arrow"></div>
        </div>
        <group>
          <div class="wxdc-check-order-time">
            <cell title="送达时间" is-link>
              <span slot="icon" class="iconfont icon-time" style="font-size: 20px;margin-right: 5px;color:#3190e8"></span>
              <span slot="value" style="color:#26a2ff;font-size: 16px;">尽快送出</span>
            </cell>
          </div>
        </group>
        <group class="wxdc-check-order-list">
          <cell title="东北家常菜馆">
            <img style="width: 16px;padding-top: 5px;" slot="icon"
                 src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff">
          </cell>
          <cell
            class="wxdc_weui_media_title"
            :class="$index === 0 ? '' : 'wxdc_weui_media_title_noborder'"
            v-for="i in 10">
            <span slot="icon" style="color: #222;">辣椒烧豆角{{ i }}</span>
            <span slot="value" style="width:80px;text-align:left;display: inline-block;color:#999;">x1</span>
            <span slot="value" style="display: inline-block;width:25px;text-align: left;color:#444;">&#165;18</span>
          </cell>
          <cell class="wxdc_weui_media_title">
            <span slot="icon">配送费</span>
            <span slot="value" style="width:80px;text-align:left;display: inline-block;color:#999;">x1</span>
            <span slot="value" style="display: inline-block;width:25px;text-align: left">&#165;2</span>
          </cell>
          <cell class="wxdc_weui_media_title wxdc_weui_media_title_noborder">
            <span slot="icon">餐盒费</span>
            <span slot="value" style="display: inline-block;width:25px;text-align: left">&#165;5</span>
          </cell>
          <cell style="padding: 10px 15px;" is-link @click="showRedBag">
            <span slot="icon" style="font-size: 14px;">优惠券</span>
            <span slot="value" style="font-size: 14px;">未使用优惠券</span>
          </cell>
          <cell>
            <span slot="icon" style="color:#888;font-size: 16px;">订单&#165;101</span>
            <span slot="value" style="color:#111;font-size: 16px;">待支付 &#165;101</span>
          </cell>
        </group>
        <group>
          <cell style="padding: 10px 15px;" is-link @click="showNote">
            <span slot="icon" style="font-size: 14px;">订单备注</span>
            <span slot="value" style="font-size: 14px;">口味、偏好等</span>
          </cell>
        </group>
      </div>
    </scroller>
    <tabbar>
      <div class="wxdc-check-order-tabbar">
        <div class="wxdc-check-order-count">
          <p>待支付<span>&#165;100</span></p>
        </div>
        <div class="wxdc-check-order-btn">
          <a class="wxdc-green" @click.stop="showDialog">确认下单</a>
        </div>
      </div>
    </tabbar>
    <!-- 支付确认 -->
    <actionsheet
      :show.sync="showdialog"
      :menus="menus"
      @on-click-menu="clickMenu"
      show-cancel
      cancel-text="取消"></actionsheet>
    <!-- 订单备注 -->
    <popup :show.sync="shownote" height="100%">
      <div class="vux-header">
        <div class="vux-header-left" @click="shownote=false">
          <a class="v-transition"><span class="iconfont icon-close"></span></a>
        </div>
        <h1 class="vux-header-title"><span class="v-transition">订单备注</span></h1>
      </div>
      <scroller lock-x height="-45+'px'" v-ref:scrollernote>
        <div style="background: #fff; margin: 15px 0;padding: 15px 0 0;">
          <box gap="0 15px">
            <div style="color:#666;font-size: 14px;margin-bottom: 5px;">快速备注</div>
            <checker class="wxdc-checker"
                     :value.sync="note1"
                     default-item-class="wxdc-checker-item"
                     selected-item-class="wxdc-checker-item-selected">
              <checker-item value="不要辣">不要辣</checker-item>
              <checker-item value="少点辣">少点辣</checker-item>
              <checker-item value="多点辣">多点辣</checker-item>
            </checker>
            <checker class="wxdc-checker-mutli"
                     type="checkbox"
                     :value.sync="note2"
                     default-item-class="wxdc-checker-item"
                     selected-item-class="wxdc-checker-item-selected">
              <checker-item value="不要香菜">不要香菜</checker-item>
              <checker-item value="不要洋葱">不要洋葱</checker-item>
              <checker-item value="多点醋">多点醋</checker-item>
              <checker-item value="多点葱">多点葱</checker-item>
            </checker>
          </box>
        </div>
        <div style="background: #fff; margin: 15px 0;padding: 15px 0 0;" class="wxdc-checker-textarea">
          <box gap="0 15px">
            <div style="color:#666;font-size: 14px;margin-bottom: 5px;">其他备注</div>
            <x-textarea style="padding: 0" :max="200" name="detail" placeholder="请输入备注内容(可不填)"></x-textarea>
          </box>
        </div>
        <box gap="15px">
          <x-button type="primary">确定</x-button>
        </box>
      </scroller>
    </popup>
    <!-- 优惠券 -->
    <popup :show.sync="showredbag" height="100%">
      <div class="vux-header">
        <div class="vux-header-left" @click="showredbag=false">
          <a class="v-transition"><span class="iconfont icon-close"></span></a>
        </div>
        <h1 class="vux-header-title"><span class="v-transition">使用优惠券</span></h1>
        <div class="vux-header-right"></div>
      </div>
      <scroller lock-x height="-45+'px'" v-ref:scrollerbag>
        <div style="padding-bottom: 20px">
          <div class="wxdc-red-bag-cell active">
            <div class="weui_cell_bd weui_cell_primary">
              <p>不使用优惠券</p>
            </div>
          </div>
          <box gap="0 10px">
            <div style="color:#666;font-size: 14px;margin-bottom: -8px;">有20张可用的优惠券</div>
            <checker type="checkbox"
                     :value.sync="redbag"
                     default-item-class="wxdc-red-bag-checker-item"
                     selected-item-class="wxdc-red-bag-checker-item-selected">
              <checker-item v-for="i in 20" :value="i">
                <div class="wxdc-red-bag-checker-inner">
                  <a class="weui_media_box weui_media_appmsg" style="padding-left: 0;">
                    <div class="weui_media_hd vux-1px-r" style="width:100px;color:#ff5340">
                      <small style="font-size: 20px">&#165;</small>
                      <span style="font-size: 40px;">10</span>
                      <span>.0</span>
                    </div>
                    <div class="weui_media_bd">
                      <h4 class="weui_media_title">学生优惠券{{ i }}</h4>
                      <p class="weui_media_desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</p>
                      <p class="weui_media_desc" style="margin-top: 5px">2017-02-08 - 2017-02-10</p>
                    </div>
                  </a>
                </div>
              </checker-item>
            </checker>
          </box>
        </div>
      </scroller>
    </popup>
  </div>
</template>
<script>
  import {
    XHeader,
    Scroller,
    Group,
    Cell,
    Tabbar,
    Actionsheet,
    Popup,
    Checker,
    CheckerItem,
    Box,
    XTextarea,
    XButton
  } from 'vux/src/components'

  export default {
    components: {
      XHeader,
      Scroller,
      Group,
      Cell,
      Tabbar,
      Actionsheet,
      Popup,
      Checker,
      CheckerItem,
      Box,
      XTextarea,
      XButton
    },
    methods: {
      showDialog () {
        this.showdialog = true
      },
      showNote () {
        this.shownote ? this.shownote = false : this.shownote = true
        this.$nextTick(() => {
          this.$refs.scrollernote.reset()
        })
      },
      showRedBag () {
        this.showredbag ? this.showredbag = false : this.showredbag = true
        this.$nextTick(() => {
          this.$refs.scrollerbag.reset()
        })
      },
      clickMenu (key) {
        if (key === 'wechatpay' || key === 'schoolpay') {
          window.router.go({
            path: '/order',
            replace: false
          })
        }
      }
    },
    data () {
      return {
        showdialog: false, // 支付选项
        shownote: false, // 订单备注
        showredbag: false, // 优惠券
        menus: {
          'title.noop': '支付确认信息<br/><span style="color:#666;font-size:14px;">您确定向 早餐中心 支付 107 元吗？</span>',
          wechatpay: '微信支付',
          schoolpay: '校园卡支付'
        },
        note: '', // 备注
        note1: '', // 备注第一部分
        note2: [], // 备注第二部分
        note3: '', // 自主输入部分
        redbag: [] // 优惠券
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
  /* css definition */
  @import "../../assets/css/style.css";

  .wxdc-check-order-tabbar {
    background-color: rgba(61,61,63,0.9);
    height: 48px;
    width: 100%;
    backdrop-filter: blur(5px);
  }
  .wxdc-android .wxdc-check-order-tabbar {
    background-color: rgba(61,61,63,1);
  }
  .wxdc-check-order-count {
    float: left;
    font-size: 18px;
    color: #fff;
    padding-left: 15px;
    line-height: 48px;
  }
  .wxdc-check-order-btn a.wxdc-green, .wxdc-btn-green {
    background-color: #4cd964;
    color: #fff;
    float: right;
    width: 100px;
    line-height: 48px;
    text-align: center;
  }
  .wxdc-check-order-header {
    overflow: hidden;
    background: #fff url("./../../assets/img/bg.png") 0 105% repeat-x;
  }
  .wxdc-check-order-time:before {
    content: '';
    position: absolute;
    left: 0;
    height: 100%;
    width: 4px;
    background: #3190e8;
  }
  .wxdc-check-order-list .weui_cell_bd > p {
    color: #888;
  }
  .wxdc-check-order-list .wxdc_weui_media_title {
    padding: 10px 15px;
    font-size: 14px;
  }
  .wxdc-checker {
    display: inline-block;
    margin: 0 15px 15px 0;
    border: 1px solid #3190e8;
    border-radius: 5px;
    overflow: hidden;
    font-size: 14px;
  }
  .wxdc-checker-mutli {
    display: inline-block;
    overflow: hidden;
    font-size: 14px;
    margin: 0 15px 15px 0;
  }
  .wxdc-checker-mutli .wxdc-checker-item {
    padding: 3px 10px;
    display: inline-block;
    margin-left: 0;
    border-radius: 5px;
    border: 1px solid #3190e8;
    margin-bottom: 10px;
  }
  .wxdc-checker-item {
    padding: 3px 10px;
    display: inline-block;
    margin-left: -5px;
  }
  .wxdc-checker-item:not(:last-child) {
    border-right: 1px solid #3190e8;
  }
  .wxdc-checker-item-selected,
  .wxdc-checker-mutli .wxdc-checker-item-selected {
    background: #3190e8;
    color: #fff;
  }
  .wxdc-checker-textarea .weui_cell:before {
    left: 0;
  }
</style>
