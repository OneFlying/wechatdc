<template>
  <div>
    <div class="wxdc-filter">
      <flexbox wrap="wrap" :gutter="0" class="vux-1px-b">
        <flexbox-item class="wxdc-filter-item" @click="showmenus(0)">
          <div class="vux-1px-r">
            分类<span class="iconfont icon-slide-up"></span>
          </div>
        </flexbox-item>
        <flexbox-item class="wxdc-filter-item" @click="showmenus(1)">
          <div class="vux-1px-r">
            排序<span class="iconfont icon-slide-up"></span>
          </div>
        </flexbox-item>
        <flexbox-item class="wxdc-filter-item" @click="showmenus(2)">
          <div>
            筛选<span class="iconfont icon-slide-up"></span>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
    <!-- 分类 -->
    <section class="filter-extend filter-sort">
      <ul>
        <li><span class="iconfont icon-meishi" style="color: #f18951"></span><span>美食</span></li>
        <li><span class="iconfont icon-chaoshi" style="color: #eda82f"></span><span>超市</span></li>
        <li><span class="iconfont icon-dangmianfu" style="color: #3bccbc"></span><span>当面购</span></li>
      </ul>
    </section>
    <!-- 排序 -->
    <section class="filter-extend filter-desc">
      <ul>
        <li><span class="iconfont icon-icon091" style="font-size:14px;color: #3787ca"></span><span>智能排序</span></li>
        <li><span class="iconfont icon-location2" style="color: #34a2db"></span><span>距离最近</span></li>
        <li><span class="iconfont icon-huo" style="color: #f27472"></span><span>销量最高</span></li>
        <li><span class="iconfont icon-qian1" style="color: #e8b900"></span><span>起送价最低</span></li>
        <li><span class="iconfont icon-shijian2" style="font-size:13px;color: #3bccbc"></span><span>配送速度最快</span></li>
        <li><span class="iconfont icon-pingfen" style="font-size:14px;color: #eda82f"></span><span>评分最高</span></li>
      </ul>
    </section>
    <!-- 筛选 -->
    <section class="filter-extend filter-more">
      <div class="filter-scroller">
        <div class="filter-extend-title">配送方式</div>
        <checker
          default-item-class="filter-checker-item"
          selected-item-class="filter-checker-item-selected">
          <checker-item :value="1">
            <b class="iconfont icon-check"></b>
            <span>不限</span>
          </checker-item>
          <checker-item :value="2">
            <b class="iconfont icon-check" style="margin-right: 5px"></b>
            <i class="iconfont icon-bird" style="border: none;font-size: 20px;margin-top:-6px;float: left;color:#0088d2"></i>
            <span>蜂鸟专送</span>
          </checker-item>
        </checker>
        <div class="filter-extend-title">商家属性 (可多选)</div>
        <checker :value.sync="filters"
          type="checkbox"
          default-item-class="filter-checker-item"
          selected-item-class="filter-checker-item-selected">
          <checker-item value="'1'">
            <b class="iconfont icon-check"></b>
            <i style="color: rgb(63, 189, 230);">品</i>
            <span>品牌商家</span>
          </checker-item>
          <checker-item value="'2'">
            <b class="iconfont icon-check"></b>
            <i style="color: rgb(153, 153, 153);">保</i>
            <span>外卖保</span>
          </checker-item>
          <checker-item value="'3'">
            <b class="iconfont icon-check"></b>
            <i style="color: rgb(232, 132, 45);">新</i>
            <span>新店</span>
          </checker-item>
          <checker-item value="'4'">
            <b class="iconfont icon-check"></b>
            <i style="color: rgb(153, 153, 153);">票</i>
            <span>开发票</span>
          </checker-item>
          <checker-item value="'5'">
            <b class="iconfont icon-check"></b>
            <i style="color: rgb(255, 78, 0);">付</i>
            <span>在线支付</span>
          </checker-item>
          <checker-item value="'6'">
            <b class="iconfont icon-check"></b>
            <i style="color: rgb(87, 169, 255);">准</i>
            <span>准时达</span>
          </checker-item>
        </checker>
      </div>
      <div class="filter-btn vux-1px-t">
        <flexbox>
          <flexbox-item>
            <div style="width: 96%; margin-left: 3%">
              <x-button>清空</x-button>
            </div>
          </flexbox-item>
          <flexbox-item>
            <div style="width: 96%; margin-left: 1%">
              <x-button type="primary">确定</x-button>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
    </section>
  </div>
</template>
<script>
  import {
    Flexbox,
    FlexboxItem,
    Checker,
    CheckerItem,
    XButton
  } from 'vux/src/components'

  export default {
    components: {
      Flexbox,
      FlexboxItem,
      Checker,
      CheckerItem,
      XButton
    },
    methods: {
      showmenus (type) {
        let sections = document.querySelectorAll('section')
        let items = document.querySelectorAll('.wxdc-filter-item')
        let e = window.event
        let dom = e.currentTarget
        let className = dom.className
        if (this.activeType === type) {
          if (className.indexOf('active') !== -1) {
            dom.className = className.substring(0, className.lastIndexOf(' '))
            let sectionCLs = sections[type].className
            sections[type].className = sectionCLs.substring(0, sectionCLs.lastIndexOf(' '))
            this.activeType = -1
          } else {
            sections[type].className += ' open'
            dom.className += ' active'
          }
        } else {
          if (this.activeType !== -1) {
            let name = items[this.activeType].className
            items[this.activeType].className = name.substring(0, name.lastIndexOf(' '))
            let sectionCLs = sections[this.activeType].className
            sections[this.activeType].className = sectionCLs.substring(0, sectionCLs.lastIndexOf(' '))
          }
          this.activeType = type
          sections[this.activeType].className += ' open'
          dom.className += ' active'
        }
      }
    },
    data () {
      return {
        activeType: -1,
        filters: []
      }
    }
  }
</script>
<style>
  .wxdc-filter {
    background: #fff;
  }
  .wxdc-filter .wxdc-filter-item {
    text-align: center;
    font-size: 12px;
    color: #666;
    padding: 12px 0;
  }
  .wxdc-filter .wxdc-filter-item .iconfont {
    display: inline-block;
    margin-left: 3px;
    font-size: 12px;
    will-change: transform;
    transform-origin: 50% 50%;
    transition: all .3s linear;
  }
  .wxdc-filter .wxdc-filter-item.active {
    color: #26a2ff;
  }
  .wxdc-filter .wxdc-filter-item.active .iconfont {
    transform: rotate(180deg);
  }
  .filter-extend {
    height: 0;
    /*max-height: 0;*/
    background-color: #fff;
    transition: all .2s ease-in-out;
    visibility: hidden;
    overflow: auto;
    will-change: all;
    opacity: 0;
    width: 100%;
    margin-top: 0;
    position: absolute;
    z-index: 100;
    box-shadow: 0 100px 100px rgba(0,0,0,0.2);
  }
  .filter-extend li {
    position: relative;
    padding: 10px 0;
  }
  .filter-extend li span {
    font-size: 12px;
    color: #666;
  }
  .filter-extend.filter-sort li .iconfont {
    float: left;
    margin-top: -2px;
    font-size: 20px;
  }
  .filter-extend li .iconfont {
    font-size: 16px;
    width: 40px;
    text-align: center;
    display: inline-block;
  }
  .filter-extend li:active {
    background-color: #f8f8f8;
  }
  .filter-extend li:after {
    content: " ";
    position: absolute;
    left: 36px;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  .filter-extend.open {
    opacity: 1;
    visibility: visible;
    /*max-height: 100%;*/
  }
  .filter-sort.open {
    height: 133px;
  }
  .filter-desc.open {
    height: 265px;
  }
  .filter-more.open {
    height: 278px;
  }

  .filter-scroller {
    margin: 10px 10px 0 10px;
    overflow: hidden;
  }
  .filter-scroller .filter-extend-title {
    margin-bottom: 8px;
    font-size: 12px;
    color: #666;
    clear: both;
    padding-left: 1%;
  }
  .filter-scroller .vux-checker-box {
    margin-bottom: 15px;
    clear: both;
    overflow: hidden;
  }
  .filter-scroller .filter-checker-item {
    margin: 0 1% 8px;
    float: left;
    width: 31.333333%;
    border: 1px solid #ddd;
    padding: 9px 0;
    height: 36px;
    border-radius: 2px;
    box-sizing: border-box;
    font-size: 12px;
    color: #666;
  }
  .filter-scroller .filter-checker-item b {
    float: left;
    font-size: 24px;
    display: none;
    margin: -8px 3px 0 5px;
  }
  .filter-scroller .filter-checker-item span {
    padding-left: 2px;
  }
  .filter-scroller .filter-checker-item i {
    font-style: normal;
    border-width: 1px;
    border-style: solid;
    padding: 2px 3px;
    font-size: 12px;
    border-radius: 2px;
    margin: 0 3px 0 5px;
    display: inline;
  }
  @media (-webkit-min-device-pixel-ratio: 2) {
    .filter-scroller .filter-checker-item {
      border-width: 0.5px;
    }
    .filter-scroller .filter-checker-item i {
      border-width: 0.5px;
    }
  }

  .filter-scroller .filter-checker-item-selected {
    border-color: #a2d2ff;
    color: #3190e8;
    background-color: #edf5ff;
  }
  .filter-scroller .filter-checker-item-selected i {
    display: none;
  }
  .filter-scroller .filter-checker-item-selected b {
    display: block;
  }
  .filter-btn {
    background-color: #fafafa;
    padding: 8px 0;
  }
</style>
