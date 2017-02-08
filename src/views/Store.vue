/**
* Created by caiyuhao on 2017/2/2.
* 商家详情
*/
<template>
  <div style="overflow: hidden">
    <div>
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
      </div>
      <div class="menu">
        <scroller lock-x height="-190+'px'" v-ref:scrollermenu>
          <div class="wxdc-menu-box">
            <ul>
              <li @click="activemenu(sort.name,$index)"
                  class="vux-1px-b"
                  v-for="sort in list"
                  :class="active === sort.name ? 'active' : ''">
                <badge :text="''+sort.numbers" v-if="sort.numbers !== 0" class="wxdc-menu-box-li-badge"></badge><span>{{ sort.name }}</span>
              </li>
            </ul>
          </div>
        </scroller>
      </div>
      <div class="content">
        <scroller lock-x scrollbar-y height="-150+'px'" v-ref:scroller @on-scroll="onscroll">
          <div class="wxdc_weui_media" style="padding-bottom: 60px">
            <group v-for="(index,sort) in list" :title="sort.name" style="margin-top: -5px;">
              <a class="weui_media_box weui_media_appmsg"
                 style="padding-right: 5px; padding-left: 10px"
                 v-for="(i, good) in sort.foods">
                <div class="weui_media_hd" style="width: 45px;" @click="detail(i, index)">
                  <img class="weui_media_appmsg_thumb" alt="" :src="good.image_path | fmtSrc">
                </div>
                <div class="weui_media_bd">
                  <h4 class="weui_media_title" @click="detail(i, index)">{{ good.name }}</h4>
                  <p class="weui_media_desc">
                    <cell class="wxdc_weui_media_title">
                      <rater :value="good.rating" slot="icon" :font-size="12" :margin="0" active-color="#ffaa0c"></rater>
                      <span slot="icon">{{ good.rating }}</span>
                    </cell>
                    <cell class="wxdc_weui_media_title wxdc_weui_media_title_noborder" style="padding-right: 10px">
                      <span slot="icon" style="color: #ff6000; font-size: 14px;">&#165;{{ good.specfoods[0].price }}</span>
                      <span slot="value" class="wxdc-number">
                          <span
                            v-if="good.number !== 0"
                            class="wxdc-number-move"
                            transition="expandmove"
                            @click.stop.prevent="remove(i, index)">
                            <i class="iconfont icon-move"></i>
                          </span>
                          <span
                            class="wxdc-number-number"
                            transition="expandnumber"
                            v-if="good.number !== 0">{{ good.number }}</span>
                          <span
                            class="wxdc-number-add"
                            @click.stop.prevent="add(i, index)">
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
    <!-- 购物车 -->
    <popup :show.sync="show" style="bottom:48px;max-height: 360px;overflow: hidden;">
      <group title="购物车" class="wxdc-cart-cart">
        <span @click="clearcart" class="wxdc-cart-clear">
          <span class="iconfont icon-delete_light" style="font-size: 16px;"></span>清空
        </span>
        <scroller lock-x scrollbar-y :height="height" v-ref:scrollercart>
          <div style="padding-bottom: 10px">
            <cell v-for="cart in carts" :title="list[cart.sort].foods[cart.good].name">
              <span slot="value" class="wxdc-cart-sale">&#165;{{ list[cart.sort].foods[cart.good].specfoods[0].price }}</span>
              <span slot="value" class="wxdc-number">
              <span class="wxdc-number-move" @click.stop.prevent="remove(cart.good, cart.sort)">
                <i class="iconfont icon-move"></i>
              </span>
              <span class="wxdc-number-number">{{ list[cart.sort].foods[cart.good].number }}</span>
              <span class="wxdc-number-add" @click.stop.prevent="add(cart.good, cart.sort)">
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
      <div
        class="wxdc-store-cart"
        :class="badge === 0 ? '' : 'active'"
        @click="showcart">
        <badge :text="badge+''"></badge>
        <span class="iconfont icon-cartfill" style="font-size: 32px"></span>
      </div>
      <div class="wxdc-store-bot-inner">
        <div class="wxdc-store-count">
          <p>&#165;{{ cash }}</p>
          <span>另需配送费{{ psf }}元</span>
        </div>
        <div class="wxdc-store-btn">
          <a href="javascript:;" v-if="cash-psf<=0">还差&#165;{{ Math.abs(cash-qsf) }}起送</a>
          <a v-link="{path:'/checkorder'}" v-else class="wxdc-green">去结算</a>
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

  import {
    getStore
  } from '../vuex/getters'

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
    vuex: {
      getters: {
        getStore
      }
    },
    methods: {
      back () {
        // 后退按钮
        window.history.go(-1)
      },
      remove (good, sort) {
        // 移除购物车
        this.badge -= 1
        this.list[sort].numbers -= 1
        let num = this.list[sort].foods[good].number -= 1
        this.cash -= this.list[sort].foods[good].specfoods[0].price
        if (num === 0) {
          this.removeitem(good)
          if (this.carts.length === 0) {
            this.show = false
          } else {
            this.height = this.carts.length > 6 ? '320px' : this.carts.length * 50 + 20 + 'px'
            this.$nextTick(() => {
              this.$refs.scrollercart.reset()
            })
          }
        }
      },
      add (good, sort) {
        // 添加购物车
        this.badge += 1
        this.list[sort].numbers += 1
        this.list[sort].foods[good].number += 1
        this.cash += this.list[sort].foods[good].specfoods[0].price
        if (!this.contains(this.carts, good)) {
          let obj = {
            'good': good,
            'sort': sort
          }
          this.carts.push(obj)
        }
      },
      detail (good, sort) {
        // 显示商品详情
        this.showpreviewer = true
      },
      activemenu (sort, index) {
        let top = this.scroll[index]
        this.active = sort
        this.$nextTick(() => {
          this.$refs.scroller.reset({
            top: top
          })
        })
      },
      onscroll (pos) {
        this.scroll.forEach((e, i) => {
          if (pos.top >= e) {
            this.active = this.list[i].name
          }
        })
      },
      showcart () {
        // 显示购物车
        if (this.carts.length !== 0) {
          this.height = this.carts.length > 6 ? '320px' : this.carts.length * 50 + 20 + 'px'
          this.show ? this.show = false : this.show = true
          this.$nextTick(() => {
            this.$refs.scrollercart.reset()
          })
        }
      },
      clearcart () {
        // 清空购物车
        this.carts.forEach((e, i) => {
          this.list[e.sort].numbers = 0
          this.list[e.sort].foods[e.good].number = 0
        })
        this.carts = []
        this.badge = 0
        this.cash = 0
        this.show = false
      },
      copyArr (arr) {
        // 对象浅复制
        return arr.map((e) => {
          if (typeof e === 'object') {
            return Object.assign({}, e)
          } else {
            return e
          }
        })
      },
      // 购物车是否存在某件商品
      contains (arr, good) {
        let res = false
        arr.map((e) => {
          if (e.good === good) res = true
        })
        return res
      },
      removeitem (good) {
        let self = this
        this.carts.map((e, i) => {
          if (e.good === good) {
            self.carts.splice(i, 1)
          }
        })
      }
    },
    data () {
      return {
        cash: 0, // 购物车总金额
        qsf: 20, // 起送价
        psf: 5, // 配送费
        show: false, // 显示购物车
        badge: 0, // 购物车小标
        showpreviewer: false, // 显示商品详情
        carts: [], // 购物车
        list2: ['商品', '商家'], // tabbar切换
        demo2: '商品', // tabbar active item
        active: '披萨', // 商品类型 active item
        height: '320px', // 购物车弹窗高度
        scroll: [], // 页面滚动距离
        list: [] // 商品列表
      }
    },
    created () {
      //
    },
    ready () {
      this.$nextTick(() => {
        this.$refs.scroller.reset()
        this.$refs.scrollercart.reset()
        this.$refs.scrollermenu.reset()
      })
      // @params name id 通过 this.$route.params 获取
      getData().then(replys => {
        this.list = replys
        this.active = this.list[0].name
        this.list.forEach((reply, i) => {
          window.Vue.util.defineReactive(reply, 'numbers', 0)
          reply.foods.forEach((food) => {
            window.Vue.util.defineReactive(food, 'number', 0)
          })
          // 设定滚动距离
          if (i === 0) {
            this.scroll.push(0)
          } else {
            let top = 0
            for (let t = 0; t < i; t++) {
              top += 90 * this.list[t].foods.length
            }
            top += 32 * i
            this.scroll.push(top)
          }
        })
        this.$nextTick(() => {
          this.$refs.scroller.reset()
          this.$refs.scrollermenu.reset()
        })
      })
    }
  }
  // 模擬 Ajax
  function getData () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let replys = [
          {
            'description': '纯手工意式pizza',
            'is_selected': false,
            'icon_url': '',
            'name': '披萨',
            'foods': [
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'bapinzhixinbaobianpisa',
                'display_times': [ ],
                'attrs': [ ],
                'description': '榴莲，夏威夷，肉酱培根，香辣墨西哥，烤鸭，水果，肉肉肉，海鲜。外加美味的芝心包边',
                'month_sales': 1,
                'rating_count': 0,
                'tips': '0评价 月售1份',
                'image_path': '5b910d2758d48307a38abeceb019c133jpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843180278',
                'limitation': { },
                'name': '八拼芝心包边披萨',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654067958',
                    'name': '八拼芝心包边披萨',
                    'pinyin_name': 'bapinzhixinbaobianpisa',
                    'restaurant_id': 1322118,
                    'food_id': 145709923,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 88,
                    'sold_out': false,
                    'recent_popularity': 1,
                    'is_essential': false,
                    'item_id': '19843180278',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9996
                  }
                ],
                'category_id': 12878574
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'liulianhehaixianzhizunshuangpin',
                'display_times': [ ],
                'attrs': [ ],
                'description': '榴莲海鲜双重享受',
                'month_sales': 1,
                'rating_count': 0,
                'tips': '0评价 月售1份',
                'image_path': '47709a9a37b39d3b3d651d15cc1edaaejpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843183350',
                'limitation': { },
                'name': '榴莲和海鲜至尊双拼',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654073078',
                    'name': '榴莲和海鲜至尊双拼',
                    'pinyin_name': 'liulianhehaixianzhizunshuangpin',
                    'restaurant_id': 1322118,
                    'food_id': 130131521,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 76,
                    'sold_out': false,
                    'recent_popularity': 1,
                    'is_essential': false,
                    'item_id': '19843183350',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 10000
                  }
                ],
                'category_id': 12878574
              },
              {
                'rating': 5,
                'restaurant_id': 1322118,
                'pinyin_name': 'chaojizhizunpisa',
                'display_times': [ ],
                'attrs': [ ],
                'description': '10寸披萨，方片火腿，西班牙香肠，培根，蔬菜配料',
                'month_sales': 34,
                'rating_count': 2,
                'tips': '2评价 月售34份',
                'image_path': '44fc53af4d820e1308805d170fd14a5cjpeg',
                'specifications': [
                  {
                    'values': [
                      '7寸',
                      '10寸',
                      '13寸'
                    ],
                    'name': '规格'
                  }
                ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843188470',
                'limitation': { },
                'name': '超级至尊披萨',
                'satisfy_count': 2,
                'activity': null,
                'satisfy_rate': 100,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654078198',
                    'name': '超级至尊披萨',
                    'pinyin_name': 'chaojizhizunpisa',
                    'restaurant_id': 1322118,
                    'food_id': 130131529,
                    'packing_fee': 2,
                    'recent_rating': 5,
                    'promotion_stock': -1,
                    'price': 42,
                    'sold_out': false,
                    'recent_popularity': 30,
                    'is_essential': false,
                    'item_id': '19843188470',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '7寸'
                      }
                    ],
                    'stock': 9895
                  },
                  {
                    'original_price': null,
                    'sku_id': '139961439990',
                    'name': '超级至尊披萨',
                    'pinyin_name': 'chaojizhizunpisa',
                    'restaurant_id': 1322118,
                    'food_id': 526954531,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 58,
                    'sold_out': false,
                    'recent_popularity': 3,
                    'is_essential': false,
                    'item_id': '19843188470',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '10寸'
                      }
                    ],
                    'stock': 9980
                  },
                  {
                    'original_price': null,
                    'sku_id': '139961441014',
                    'name': '超级至尊披萨',
                    'pinyin_name': 'chaojizhizunpisa',
                    'restaurant_id': 1322118,
                    'food_id': 526954532,
                    'packing_fee': 3,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 98,
                    'sold_out': false,
                    'recent_popularity': 1,
                    'is_essential': false,
                    'item_id': '19843188470',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '13寸'
                      }
                    ],
                    'stock': 9999
                  }
                ],
                'category_id': 12878574
              },
              {
                'rating': 5,
                'restaurant_id': 1322118,
                'pinyin_name': 'kaoyapisa',
                'display_times': [ ],
                'attrs': [ ],
                'description': '香脆烤鸭，马苏里拉芝士',
                'month_sales': 1,
                'rating_count': 1,
                'tips': '1评价 月售1份',
                'image_path': 'd9b28051d038613950fc26a703068ed0jpeg',
                'specifications': [
                  {
                    'values': [
                      '7寸',
                      '10寸',
                      '13寸'
                    ],
                    'name': '规格'
                  }
                ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843189494',
                'limitation': { },
                'name': '烤鸭披萨',
                'satisfy_count': 1,
                'activity': null,
                'satisfy_rate': 100,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654079222',
                    'name': '烤鸭披萨',
                    'pinyin_name': 'kaoyapisa',
                    'restaurant_id': 1322118,
                    'food_id': 130131530,
                    'packing_fee': 2,
                    'recent_rating': 5,
                    'promotion_stock': -1,
                    'price': 42,
                    'sold_out': false,
                    'recent_popularity': 1,
                    'is_essential': false,
                    'item_id': '19843189494',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '7寸'
                      }
                    ],
                    'stock': 9997
                  },
                  {
                    'original_price': null,
                    'sku_id': '139970519798',
                    'name': '烤鸭披萨',
                    'pinyin_name': 'kaoyapisa',
                    'restaurant_id': 1322118,
                    'food_id': 526963398,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 58,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '19843189494',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '10寸'
                      }
                    ],
                    'stock': 9999
                  },
                  {
                    'original_price': null,
                    'sku_id': '139970520822',
                    'name': '烤鸭披萨',
                    'pinyin_name': 'kaoyapisa',
                    'restaurant_id': 1322118,
                    'food_id': 526963399,
                    'packing_fee': 3,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 98,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '19843189494',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '13寸'
                      }
                    ],
                    'stock': 10000
                  }
                ],
                'category_id': 12878574
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'shuxiangshuiguo',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 0,
                'rating_count': 0,
                'tips': '0评价 月售0份',
                'image_path': 'ed6c994d2f40fe455165eff9b8bff670jpeg',
                'specifications': [
                  {
                    'values': [
                      '7寸',
                      '10寸',
                      '13寸'
                    ],
                    'name': '规格'
                  }
                ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843190518',
                'limitation': { },
                'name': '薯香水果',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654080246',
                    'name': '薯香水果',
                    'pinyin_name': 'shuxiangshuiguo',
                    'restaurant_id': 1322118,
                    'food_id': 130131531,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 32,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '19843190518',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '7寸'
                      }
                    ],
                    'stock': 9999
                  },
                  {
                    'original_price': null,
                    'sku_id': '139957464822',
                    'name': '薯香水果',
                    'pinyin_name': 'shuxiangshuiguo',
                    'restaurant_id': 1322118,
                    'food_id': 526950649,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 45,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '19843190518',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '10寸'
                      }
                    ],
                    'stock': 9999
                  },
                  {
                    'original_price': null,
                    'sku_id': '139957465846',
                    'name': '薯香水果',
                    'pinyin_name': 'shuxiangshuiguo',
                    'restaurant_id': 1322118,
                    'food_id': 526950650,
                    'packing_fee': 3,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 75,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '19843190518',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '13寸'
                      }
                    ],
                    'stock': 10000
                  }
                ],
                'category_id': 12878574
              },
              {
                'rating': 5,
                'restaurant_id': 1322118,
                'pinyin_name': 'xianglamoxige',
                'display_times': [ ],
                'attrs': [ ],
                'description': '10寸，西班牙香肠，墨西哥辣椒圈',
                'month_sales': 2,
                'rating_count': 1,
                'tips': '1评价 月售2份',
                'image_path': 'e7d6281d47e60729512d9d0f1dcd86d3jpeg',
                'specifications': [
                  {
                    'values': [
                      '7寸',
                      '10寸',
                      '13寸'
                    ],
                    'name': '规格'
                  }
                ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843192566',
                'limitation': { },
                'name': '香辣墨西哥',
                'satisfy_count': 1,
                'activity': null,
                'satisfy_rate': 100,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654082294',
                    'name': '香辣墨西哥',
                    'pinyin_name': 'xianglamoxige',
                    'restaurant_id': 1322118,
                    'food_id': 130131533,
                    'packing_fee': 2,
                    'recent_rating': 5,
                    'promotion_stock': -1,
                    'price': 40,
                    'sold_out': false,
                    'recent_popularity': 2,
                    'is_essential': false,
                    'item_id': '19843192566',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '7寸'
                      }
                    ],
                    'stock': 9996
                  },
                  {
                    'original_price': null,
                    'sku_id': '139970190070',
                    'name': '香辣墨西哥',
                    'pinyin_name': 'xianglamoxige',
                    'restaurant_id': 1322118,
                    'food_id': 526963076,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 56,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '19843192566',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '10寸'
                      }
                    ],
                    'stock': 10000
                  },
                  {
                    'original_price': null,
                    'sku_id': '139970191094',
                    'name': '香辣墨西哥',
                    'pinyin_name': 'xianglamoxige',
                    'restaurant_id': 1322118,
                    'food_id': 526963077,
                    'packing_fee': 3,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 93,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '19843192566',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '13寸'
                      }
                    ],
                    'stock': 10000
                  }
                ],
                'category_id': 12878574
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'haixianzhizunpisa',
                'display_times': [ ],
                'attrs': [ ],
                'description': '大虾和鱿鱼圈，美味',
                'month_sales': 0,
                'rating_count': 0,
                'tips': '0评价 月售0份',
                'image_path': 'b7331beba99840d399aefb2a27716b31jpeg',
                'specifications': [
                  {
                    'values': [
                      '10寸',
                      '7寸',
                      '13寸'
                    ],
                    'name': '规格'
                  }
                ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843195638',
                'limitation': { },
                'name': '海鲜至尊披萨',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654085366',
                    'name': '海鲜至尊披萨',
                    'pinyin_name': 'haixianzhizunpisa',
                    'restaurant_id': 1322118,
                    'food_id': 130131536,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 65,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '19843195638',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '10寸'
                      }
                    ],
                    'stock': 10000
                  },
                  {
                    'original_price': null,
                    'sku_id': '129462598390',
                    'name': '海鲜至尊披萨',
                    'pinyin_name': 'haixianzhizunpisa',
                    'restaurant_id': 1322118,
                    'food_id': 516701756,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 47,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '19843195638',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '7寸'
                      }
                    ],
                    'stock': 10000
                  },
                  {
                    'original_price': null,
                    'sku_id': '139970794230',
                    'name': '海鲜至尊披萨',
                    'pinyin_name': 'haixianzhizunpisa',
                    'restaurant_id': 1322118,
                    'food_id': 526963666,
                    'packing_fee': 3,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 108,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '19843195638',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '13寸'
                      }
                    ],
                    'stock': 10000
                  }
                ],
                'category_id': 12878574
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'shuiguoleyuanpisa',
                'display_times': [ ],
                'attrs': [ ],
                'description': '香蕉，黄桃，菠萝，猕猴桃，火龙果',
                'month_sales': 5,
                'rating_count': 0,
                'tips': '0评价 月售5份',
                'image_path': '56f4e9097a5befc49463926b2a51d71fjpeg',
                'specifications': [
                  {
                    'values': [
                      '7寸',
                      '10寸',
                      '13寸'
                    ],
                    'name': '规格'
                  }
                ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843198710',
                'limitation': { },
                'name': '水果乐园披萨',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654088438',
                    'name': '水果乐园披萨',
                    'pinyin_name': 'shuiguoleyuanpisa',
                    'restaurant_id': 1322118,
                    'food_id': 144521171,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 39,
                    'sold_out': false,
                    'recent_popularity': 4,
                    'is_essential': false,
                    'item_id': '19843198710',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '7寸'
                      }
                    ],
                    'stock': 9994
                  },
                  {
                    'original_price': null,
                    'sku_id': '139965368054',
                    'name': '水果乐园披萨',
                    'pinyin_name': 'shuiguoleyuanpisa',
                    'restaurant_id': 1322118,
                    'food_id': 526958367,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 55,
                    'sold_out': false,
                    'recent_popularity': 1,
                    'is_essential': false,
                    'item_id': '19843198710',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '10寸'
                      }
                    ],
                    'stock': 9999
                  },
                  {
                    'original_price': null,
                    'sku_id': '139965369078',
                    'name': '水果乐园披萨',
                    'pinyin_name': 'shuiguoleyuanpisa',
                    'restaurant_id': 1322118,
                    'food_id': 526958368,
                    'packing_fee': 3,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 92,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '19843198710',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '13寸'
                      }
                    ],
                    'stock': 10000
                  }
                ],
                'category_id': 12878574
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'xiaweiyihechaojizhizunshuangpin',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 4,
                'rating_count': 0,
                'tips': '0评价 月售4份',
                'image_path': 'c0b03e92c180347e0bd60df834e37d36jpeg',
                'specifications': [
                  {
                    'values': [
                      '10寸',
                      '7寸',
                      '13寸'
                    ],
                    'name': '规格'
                  }
                ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843199734',
                'limitation': { },
                'name': '夏威夷和超级至尊双拼',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654089462',
                    'name': '夏威夷和超级至尊双拼',
                    'pinyin_name': 'xiaweiyihechaojizhizunshuangpin',
                    'restaurant_id': 1322118,
                    'food_id': 161306396,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 59,
                    'sold_out': false,
                    'recent_popularity': 2,
                    'is_essential': false,
                    'item_id': '19843199734',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '10寸'
                      }
                    ],
                    'stock': 9992
                  },
                  {
                    'original_price': null,
                    'sku_id': '23654090486',
                    'name': '夏威夷和超级至尊双拼',
                    'pinyin_name': 'xiaweiyihechaojizhizunshuangpin',
                    'restaurant_id': 1322118,
                    'food_id': 161414529,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 42,
                    'sold_out': false,
                    'recent_popularity': 2,
                    'is_essential': false,
                    'item_id': '19843199734',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '7寸'
                      }
                    ],
                    'stock': 9988
                  },
                  {
                    'original_price': null,
                    'sku_id': '139987319542',
                    'name': '夏威夷和超级至尊双拼',
                    'pinyin_name': 'xiaweiyihechaojizhizunshuangpin',
                    'restaurant_id': 1322118,
                    'food_id': 526979804,
                    'packing_fee': 3,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 105,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '19843199734',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '13寸'
                      }
                    ],
                    'stock': 10000
                  }
                ],
                'category_id': 12878574
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'jiaozhilian',
                'display_times': [ ],
                'attrs': [ ],
                'description': '味觉盛宴，满足你的需要，一下拥有水果，肉肉与素。',
                'month_sales': 1,
                'rating_count': 0,
                'tips': '0评价 月售1份',
                'image_path': '96deec851c4a80ee92832e0503eecaeajpeg',
                'specifications': [
                  {
                    'values': [
                      '7寸',
                      '10寸',
                      '13寸'
                    ],
                    'name': '规格'
                  }
                ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '114002747126',
                'limitation': { },
                'name': '蕉之恋',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '130138570486',
                    'name': '蕉之恋',
                    'pinyin_name': 'jiaozhilian',
                    'restaurant_id': 1322118,
                    'food_id': 517361885,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 36,
                    'sold_out': false,
                    'recent_popularity': 1,
                    'is_essential': false,
                    'item_id': '114002747126',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '7寸'
                      }
                    ],
                    'stock': 9998
                  },
                  {
                    'original_price': null,
                    'sku_id': '139973322486',
                    'name': '蕉之恋',
                    'pinyin_name': 'jiaozhilian',
                    'restaurant_id': 1322118,
                    'food_id': 526966135,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 50,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '114002747126',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '10寸'
                      }
                    ],
                    'stock': 9997
                  },
                  {
                    'original_price': null,
                    'sku_id': '139973323510',
                    'name': '蕉之恋',
                    'pinyin_name': 'jiaozhilian',
                    'restaurant_id': 1322118,
                    'food_id': 526966136,
                    'packing_fee': 3,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 83,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '114002747126',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '13寸'
                      }
                    ],
                    'stock': 10000
                  }
                ],
                'category_id': 12878574
              },
              {
                'rating': 5,
                'restaurant_id': 1322118,
                'pinyin_name': 'liulianpisa',
                'display_times': [ ],
                'attrs': [ ],
                'description': '榴莲的最爱',
                'month_sales': 5,
                'rating_count': 3,
                'tips': '3评价 月售5份',
                'image_path': 'bf91a179126a44e4f2595cfeb3dd10e9jpeg',
                'specifications': [
                  {
                    'values': [
                      '7寸',
                      '10寸',
                      '13寸'
                    ],
                    'name': '规格'
                  }
                ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '117373535990',
                'limitation': { },
                'name': '榴莲披萨',
                'satisfy_count': 3,
                'activity': null,
                'satisfy_rate': 100,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '134238703350',
                    'name': '榴莲披萨',
                    'pinyin_name': 'liulianpisa',
                    'restaurant_id': 1322118,
                    'food_id': 521365921,
                    'packing_fee': 2,
                    'recent_rating': 5,
                    'promotion_stock': -1,
                    'price': 55,
                    'sold_out': false,
                    'recent_popularity': 4,
                    'is_essential': false,
                    'item_id': '117373535990',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '7寸'
                      }
                    ],
                    'stock': 9986
                  },
                  {
                    'original_price': null,
                    'sku_id': '139970462454',
                    'name': '榴莲披萨',
                    'pinyin_name': 'liulianpisa',
                    'restaurant_id': 1322118,
                    'food_id': 526963342,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 78,
                    'sold_out': false,
                    'recent_popularity': 1,
                    'is_essential': false,
                    'item_id': '117373535990',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '10寸'
                      }
                    ],
                    'stock': 9996
                  },
                  {
                    'original_price': null,
                    'sku_id': '139970463478',
                    'name': '榴莲披萨',
                    'pinyin_name': 'liulianpisa',
                    'restaurant_id': 1322118,
                    'food_id': 526963343,
                    'packing_fee': 3,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 120,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '117373535990',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '13寸'
                      }
                    ],
                    'stock': 10000
                  }
                ],
                'category_id': 12878574
              },
              {
                'rating': 5,
                'restaurant_id': 1322118,
                'pinyin_name': 'roujiangpeigenpisa',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 3,
                'rating_count': 1,
                'tips': '1评价 月售3份',
                'image_path': 'c55b1e7dc6bc2d0beff0248c8c59cceajpeg',
                'specifications': [
                  {
                    'values': [
                      '7寸',
                      '10寸',
                      '13寸'
                    ],
                    'name': '规格'
                  }
                ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '120066685686',
                'limitation': { },
                'name': '肉酱培根披萨',
                'satisfy_count': 1,
                'activity': null,
                'satisfy_rate': 100,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '137809700598',
                    'name': '肉酱培根披萨',
                    'pinyin_name': 'roujiangpeigenpisa',
                    'restaurant_id': 1322118,
                    'food_id': 524853223,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 36,
                    'sold_out': false,
                    'recent_popularity': 2,
                    'is_essential': false,
                    'item_id': '120066685686',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '7寸'
                      }
                    ],
                    'stock': 997
                  },
                  {
                    'original_price': null,
                    'sku_id': '139971314422',
                    'name': '肉酱培根披萨',
                    'pinyin_name': 'roujiangpeigenpisa',
                    'restaurant_id': 1322118,
                    'food_id': 526964174,
                    'packing_fee': 2,
                    'recent_rating': 5,
                    'promotion_stock': -1,
                    'price': 50,
                    'sold_out': false,
                    'recent_popularity': 1,
                    'is_essential': false,
                    'item_id': '120066685686',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '10寸'
                      }
                    ],
                    'stock': 9997
                  },
                  {
                    'original_price': null,
                    'sku_id': '139971315446',
                    'name': '肉酱培根披萨',
                    'pinyin_name': 'roujiangpeigenpisa',
                    'restaurant_id': 1322118,
                    'food_id': 526964175,
                    'packing_fee': 3,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 83,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '120066685686',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '13寸'
                      }
                    ],
                    'stock': 10000
                  }
                ],
                'category_id': 12878574
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'sipinzhixinbaobianpisa',
                'display_times': [ ],
                'attrs': [ ],
                'description': '四拼口味自己备注 想吃什么口味自己选 就是这么任性',
                'month_sales': 0,
                'rating_count': 0,
                'tips': '0评价 月售0份',
                'image_path': '0526390fa21aa60cf25f8feea5552d1ejpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '120063022838',
                'limitation': { },
                'name': '四拼芝心包边披萨',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '137810514678',
                    'name': '四拼芝心包边披萨',
                    'pinyin_name': 'sipinzhixinbaobianpisa',
                    'restaurant_id': 1322118,
                    'food_id': 524854018,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 88,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '120063022838',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 999
                  }
                ],
                'category_id': 12878574
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'renxuan2zhongkouweishuangpin chuliulian',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 0,
                'rating_count': 0,
                'tips': '0评价 月售0份',
                'image_path': '80c970e6595d75c15bbf39b535efadabjpeg',
                'specifications': [
                  {
                    'values': [
                      '7寸',
                      '10寸',
                      '13寸'
                    ],
                    'name': '规格'
                  }
                ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '120063023862',
                'limitation': { },
                'name': '任选2种口味双拼 除榴莲',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '137810515702',
                    'name': '任选2种口味双拼 除榴莲',
                    'pinyin_name': 'renxuan2zhongkouweishuangpin chuliulian',
                    'restaurant_id': 1322118,
                    'food_id': 524854019,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 45,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '120063023862',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '7寸'
                      }
                    ],
                    'stock': 999
                  },
                  {
                    'original_price': null,
                    'sku_id': '139989090038',
                    'name': '任选2种口味双拼 除榴莲',
                    'pinyin_name': 'renxuan2zhongkouweishuangpin chuliulian',
                    'restaurant_id': 1322118,
                    'food_id': 526981533,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 62,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '120063023862',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '10寸'
                      }
                    ],
                    'stock': 9999
                  },
                  {
                    'original_price': null,
                    'sku_id': '139989091062',
                    'name': '任选2种口味双拼 除榴莲',
                    'pinyin_name': 'renxuan2zhongkouweishuangpin chuliulian',
                    'restaurant_id': 1322118,
                    'food_id': 526981534,
                    'packing_fee': 3,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 102,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '120063023862',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '13寸'
                      }
                    ],
                    'stock': 10000
                  }
                ],
                'category_id': 12878574
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'xiaweiyifengqing',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 3,
                'rating_count': 0,
                'tips': '0评价 月售3份',
                'image_path': 'c854655d6836cfb7fc050d5be9fb8459jpeg',
                'specifications': [
                  {
                    'values': [
                      '7寸',
                      '10寸',
                      '13寸'
                    ],
                    'name': '规格'
                  }
                ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '121896770294',
                'limitation': { },
                'name': '夏威夷风情',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '139958065910',
                    'name': '夏威夷风情',
                    'pinyin_name': 'xiaweiyifengqing',
                    'restaurant_id': 1322118,
                    'food_id': 526951236,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 38,
                    'sold_out': false,
                    'recent_popularity': 2,
                    'is_essential': false,
                    'item_id': '121896770294',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '7寸'
                      }
                    ],
                    'stock': 9997
                  },
                  {
                    'original_price': null,
                    'sku_id': '139958066934',
                    'name': '夏威夷风情',
                    'pinyin_name': 'xiaweiyifengqing',
                    'restaurant_id': 1322118,
                    'food_id': 526951237,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 50,
                    'sold_out': false,
                    'recent_popularity': 1,
                    'is_essential': false,
                    'item_id': '121896770294',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '10寸'
                      }
                    ],
                    'stock': 9996
                  },
                  {
                    'original_price': null,
                    'sku_id': '139958067958',
                    'name': '夏威夷风情',
                    'pinyin_name': 'xiaweiyifengqing',
                    'restaurant_id': 1322118,
                    'food_id': 526951238,
                    'packing_fee': 3,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 83,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '121896770294',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '13寸'
                      }
                    ],
                    'stock': 9999
                  }
                ],
                'category_id': 12878574
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'jingdiansalami',
                'display_times': [ ],
                'attrs': [ ],
                'description': '1萨拉米肠，车达芝士，马苏里拉芝士',
                'month_sales': 0,
                'rating_count': 0,
                'tips': '0评价 月售0份',
                'image_path': null,
                'specifications': [
                  {
                    'values': [
                      '7寸',
                      '10寸',
                      '13寸'
                    ],
                    'name': '规格'
                  }
                ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843182326',
                'limitation': { },
                'name': '经典萨拉米',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654070006',
                    'name': '经典萨拉米',
                    'pinyin_name': 'jingdiansalami',
                    'restaurant_id': 1322118,
                    'food_id': 130131518,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 36,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '19843182326',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '7寸'
                      }
                    ],
                    'stock': 10000
                  },
                  {
                    'original_price': null,
                    'sku_id': '23654071030',
                    'name': '经典萨拉米',
                    'pinyin_name': 'jingdiansalami',
                    'restaurant_id': 1322118,
                    'food_id': 171920493,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 52,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '19843182326',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '10寸'
                      }
                    ],
                    'stock': 10000
                  },
                  {
                    'original_price': null,
                    'sku_id': '23654072054',
                    'name': '经典萨拉米',
                    'pinyin_name': 'jingdiansalami',
                    'restaurant_id': 1322118,
                    'food_id': 171920494,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 87,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '19843182326',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '13寸'
                      }
                    ],
                    'stock': 10000
                  }
                ],
                'category_id': 12878574
              }
            ],
            'activity': null,
            'type': 1,
            'id': 12878574,
            'is_activity': false
          },
          {
            'description': '',
            'is_selected': false,
            'icon_url': '',
            'name': '饮料',
            'foods': [
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'langanhaiyangpaopaole',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 1,
                'rating_count': 0,
                'tips': '0评价 月售1份',
                'image_path': 'db53a4e65d8f8cb2fba2db7c3715a470jpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843201782',
                'limitation': { },
                'name': '蓝柑海洋泡泡乐',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654092534',
                    'name': '蓝柑海洋泡泡乐',
                    'pinyin_name': 'langanhaiyangpaopaole',
                    'restaurant_id': 1322118,
                    'food_id': 131064465,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 12,
                    'sold_out': false,
                    'recent_popularity': 1,
                    'is_essential': false,
                    'item_id': '19843201782',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9997
                  }
                ],
                'category_id': 12954472
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'boheyangtaopaopaole',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 1,
                'rating_count': 0,
                'tips': '0评价 月售1份',
                'image_path': 'b84b6ed549a48de83e44e22a045c1553jpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843202806',
                'limitation': { },
                'name': '薄荷杨桃泡泡乐',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654093558',
                    'name': '薄荷杨桃泡泡乐',
                    'pinyin_name': 'boheyangtaopaopaole',
                    'restaurant_id': 1322118,
                    'food_id': 131064467,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 12,
                    'sold_out': false,
                    'recent_popularity': 1,
                    'is_essential': false,
                    'item_id': '19843202806',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9993
                  }
                ],
                'category_id': 12954472
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'mangguobailepaopaole',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 2,
                'rating_count': 0,
                'tips': '0评价 月售2份',
                'image_path': '06d48825265866b51368d9fda3d8492ajpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843203830',
                'limitation': { },
                'name': '芒果百乐泡泡乐',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654094582',
                    'name': '芒果百乐泡泡乐',
                    'pinyin_name': 'mangguobailepaopaole',
                    'restaurant_id': 1322118,
                    'food_id': 131064469,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 12,
                    'sold_out': false,
                    'recent_popularity': 2,
                    'is_essential': false,
                    'item_id': '19843203830',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9993
                  }
                ],
                'category_id': 12954472
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'wuhuaguomi',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 1,
                'rating_count': 0,
                'tips': '0评价 月售1份',
                'image_path': '3ddf2e043eaeda75ece953037861913fjpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843204854',
                'limitation': { },
                'name': '无花果蜜',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654095606',
                    'name': '无花果蜜',
                    'pinyin_name': 'wuhuaguomi',
                    'restaurant_id': 1322118,
                    'food_id': 131064470,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 10,
                    'sold_out': false,
                    'recent_popularity': 1,
                    'is_essential': false,
                    'item_id': '19843204854',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9995
                  }
                ],
                'category_id': 12954472
              },
              {
                'rating': 5,
                'restaurant_id': 1322118,
                'pinyin_name': 'mangguoguomi',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 3,
                'rating_count': 1,
                'tips': '1评价 月售3份',
                'image_path': '4bd6380a4295920d47641c163e0883a3jpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843205878',
                'limitation': { },
                'name': '芒果果蜜',
                'satisfy_count': 1,
                'activity': null,
                'satisfy_rate': 100,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654096630',
                    'name': '芒果果蜜',
                    'pinyin_name': 'mangguoguomi',
                    'restaurant_id': 1322118,
                    'food_id': 131064471,
                    'packing_fee': 0,
                    'recent_rating': 5,
                    'promotion_stock': -1,
                    'price': 10,
                    'sold_out': false,
                    'recent_popularity': 3,
                    'is_essential': false,
                    'item_id': '19843205878',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9985
                  }
                ],
                'category_id': 12954472
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'mitaowulongcha',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 2,
                'rating_count': 0,
                'tips': '0评价 月售2份',
                'image_path': '94b3d3466c58a733e5c9485a44ac2765jpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843206902',
                'limitation': { },
                'name': '蜜桃乌龙茶',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654097654',
                    'name': '蜜桃乌龙茶',
                    'pinyin_name': 'mitaowulongcha',
                    'restaurant_id': 1322118,
                    'food_id': 131064472,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 8,
                    'sold_out': false,
                    'recent_popularity': 2,
                    'is_essential': false,
                    'item_id': '19843206902',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9990
                  }
                ],
                'category_id': 12954472
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'zhaopainaigai',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 1,
                'rating_count': 0,
                'tips': '0评价 月售1份',
                'image_path': 'ee7b9f988e67a60c5430fbed70de8827png',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843207926',
                'limitation': { },
                'name': '招牌奶盖',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654098678',
                    'name': '招牌奶盖',
                    'pinyin_name': 'zhaopainaigai',
                    'restaurant_id': 1322118,
                    'food_id': 131064473,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 18,
                    'sold_out': false,
                    'recent_popularity': 1,
                    'is_essential': false,
                    'item_id': '19843207926',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9994
                  }
                ],
                'category_id': 12954472
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'guifeilizhimi',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 3,
                'rating_count': 0,
                'tips': '0评价 月售3份',
                'image_path': '6fe770de2a99e0e2ed92f825111a4580jpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843208950',
                'limitation': { },
                'name': '贵妃荔枝蜜',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654099702',
                    'name': '贵妃荔枝蜜',
                    'pinyin_name': 'guifeilizhimi',
                    'restaurant_id': 1322118,
                    'food_id': 131064475,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 10,
                    'sold_out': false,
                    'recent_popularity': 3,
                    'is_essential': false,
                    'item_id': '19843208950',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9985
                  }
                ],
                'category_id': 12954472
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'boluoyoumi',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 1,
                'rating_count': 0,
                'tips': '0评价 月售1份',
                'image_path': '246c8038120a51c1cb008ec39571b172jpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843209974',
                'limitation': { },
                'name': '菠萝优蜜',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654100726',
                    'name': '菠萝优蜜',
                    'pinyin_name': 'boluoyoumi',
                    'restaurant_id': 1322118,
                    'food_id': 131064476,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 10,
                    'sold_out': false,
                    'recent_popularity': 1,
                    'is_essential': false,
                    'item_id': '19843209974',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9989
                  }
                ],
                'category_id': 12954472
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'lizhibohepaopaole',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 2,
                'rating_count': 0,
                'tips': '0评价 月售2份',
                'image_path': '1b3f2171e916bf1fd709ca923767166ejpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843210998',
                'limitation': { },
                'name': '荔枝薄荷泡泡乐',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654101750',
                    'name': '荔枝薄荷泡泡乐',
                    'pinyin_name': 'lizhibohepaopaole',
                    'restaurant_id': 1322118,
                    'food_id': 131064478,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 12,
                    'sold_out': false,
                    'recent_popularity': 2,
                    'is_essential': false,
                    'item_id': '19843210998',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9996
                  }
                ],
                'category_id': 12954472
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'mangguobaixiangpaopaole',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 0,
                'rating_count': 0,
                'tips': '0评价 月售0份',
                'image_path': 'ee2f2e7c6486d58f1e884b5411c37d6bjpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '120062477046',
                'limitation': { },
                'name': '芒果百香泡泡乐',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '137806847734',
                    'name': '芒果百香泡泡乐',
                    'pinyin_name': 'mangguobaixiangpaopaole',
                    'restaurant_id': 1322118,
                    'food_id': 524850437,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 12,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '120062477046',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 999
                  }
                ],
                'category_id': 12954472
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'guotangliannai',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 1,
                'rating_count': 0,
                'tips': '0评价 月售1份',
                'image_path': null,
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843200758',
                'limitation': { },
                'name': '果糖炼奶',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654091510',
                    'name': '果糖炼奶',
                    'pinyin_name': 'guotangliannai',
                    'restaurant_id': 1322118,
                    'food_id': 131064463,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 15,
                    'sold_out': false,
                    'recent_popularity': 1,
                    'is_essential': false,
                    'item_id': '19843200758',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9999
                  }
                ],
                'category_id': 12954472
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'heitangliannai',
                'display_times': [ ],
                'attrs': [ ],
                'description': '本饮料有冷饮热饮 点餐时请备注好冷热',
                'month_sales': 0,
                'rating_count': 0,
                'tips': '0评价 月售0份',
                'image_path': null,
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '120063986422',
                'limitation': { },
                'name': '黑糖炼奶',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '137808810742',
                    'name': '黑糖炼奶',
                    'pinyin_name': 'heitangliannai',
                    'restaurant_id': 1322118,
                    'food_id': 524852354,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 15,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '120063986422',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 999
                  }
                ],
                'category_id': 12954472
              }
            ],
            'activity': null,
            'type': 1,
            'id': 12954472,
            'is_activity': false
          },
          {
            'description': '',
            'is_selected': false,
            'icon_url': '',
            'name': '鲜榨果汁',
            'foods': [
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'jiankangyisheng',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 1,
                'rating_count': 0,
                'tips': '0评价 月售1份',
                'image_path': 'af81a0a0ae2334cd8ee1c2138981d0bajpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843212022',
                'limitation': { },
                'name': '健康医生',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654102774',
                    'name': '健康医生',
                    'pinyin_name': 'jiankangyisheng',
                    'restaurant_id': 1322118,
                    'food_id': 131065363,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 18,
                    'sold_out': false,
                    'recent_popularity': 1,
                    'is_essential': false,
                    'item_id': '19843212022',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9992
                  }
                ],
                'category_id': 12954911
              }
            ],
            'activity': null,
            'type': 1,
            'id': 12954911,
            'is_activity': false
          },
          {
            'description': '',
            'is_selected': false,
            'icon_url': '',
            'name': '小吃',
            'foods': [
              {
                'rating': 5,
                'restaurant_id': 1322118,
                'pinyin_name': 'bolinkaochang',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 16,
                'rating_count': 5,
                'tips': '5评价 月售16份',
                'image_path': '42b2e8cce20ce39fd5ea6b4155f3e4a5jpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843213046',
                'limitation': { },
                'name': '柏林烤肠',
                'satisfy_count': 5,
                'activity': null,
                'satisfy_rate': 100,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654103798',
                    'name': '柏林烤肠',
                    'pinyin_name': 'bolinkaochang',
                    'restaurant_id': 1322118,
                    'food_id': 131066589,
                    'packing_fee': 1,
                    'recent_rating': 5,
                    'promotion_stock': -1,
                    'price': 8,
                    'sold_out': false,
                    'recent_popularity': 16,
                    'is_essential': false,
                    'item_id': '19843213046',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9918
                  }
                ],
                'category_id': 12954979
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'huangjinshutiao',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 6,
                'rating_count': 0,
                'tips': '0评价 月售6份',
                'image_path': '55017e3f6cb243d49a128b49752bc274jpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843214070',
                'limitation': { },
                'name': '黄金薯条',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654104822',
                    'name': '黄金薯条',
                    'pinyin_name': 'huangjinshutiao',
                    'restaurant_id': 1322118,
                    'food_id': 131066590,
                    'packing_fee': 1,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 8,
                    'sold_out': false,
                    'recent_popularity': 6,
                    'is_essential': false,
                    'item_id': '19843214070',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 10000
                  }
                ],
                'category_id': 12954979
              },
              {
                'rating': 5,
                'restaurant_id': 1322118,
                'pinyin_name': 'taishikaochang',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 14,
                'rating_count': 5,
                'tips': '5评价 月售14份',
                'image_path': '736d5c900863ee9b3dd2c8e548d6e3a2jpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843217142',
                'limitation': { },
                'name': '台式烤肠',
                'satisfy_count': 5,
                'activity': null,
                'satisfy_rate': 100,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654107894',
                    'name': '台式烤肠',
                    'pinyin_name': 'taishikaochang',
                    'restaurant_id': 1322118,
                    'food_id': 131066594,
                    'packing_fee': 1,
                    'recent_rating': 5,
                    'promotion_stock': -1,
                    'price': 6,
                    'sold_out': false,
                    'recent_popularity': 14,
                    'is_essential': false,
                    'item_id': '19843217142',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9951
                  }
                ],
                'category_id': 12954979
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'jingdianxiaochipinpan',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 1,
                'rating_count': 0,
                'tips': '0评价 月售1份',
                'image_path': '6ef57c019e9549b40e6299e4898eef92jpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843218166',
                'limitation': { },
                'name': '经典小吃拼盘',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654108918',
                    'name': '经典小吃拼盘',
                    'pinyin_name': 'jingdianxiaochipinpan',
                    'restaurant_id': 1322118,
                    'food_id': 131066596,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 18,
                    'sold_out': false,
                    'recent_popularity': 1,
                    'is_essential': false,
                    'item_id': '19843218166',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 10000
                  }
                ],
                'category_id': 12954979
              },
              {
                'rating': 5,
                'restaurant_id': 1322118,
                'pinyin_name': 'jimihua',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 7,
                'rating_count': 2,
                'tips': '2评价 月售7份',
                'image_path': 'd15cc6bc492e3e67d7165fbb4eeeb22djpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843220214',
                'limitation': { },
                'name': '鸡米花',
                'satisfy_count': 2,
                'activity': null,
                'satisfy_rate': 100,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654110966',
                    'name': '鸡米花',
                    'pinyin_name': 'jimihua',
                    'restaurant_id': 1322118,
                    'food_id': 131066598,
                    'packing_fee': 1,
                    'recent_rating': 5,
                    'promotion_stock': -1,
                    'price': 8,
                    'sold_out': false,
                    'recent_popularity': 7,
                    'is_essential': false,
                    'item_id': '19843220214',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9953
                  }
                ],
                'category_id': 12954979
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'wushuangjichi',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 2,
                'rating_count': 0,
                'tips': '0评价 月售2份',
                'image_path': '6424cfe55401a09385c0dd5b737f4352jpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843221238',
                'limitation': { },
                'name': '无双鸡翅',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654111990',
                    'name': '无双鸡翅',
                    'pinyin_name': 'wushuangjichi',
                    'restaurant_id': 1322118,
                    'food_id': 131066599,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 18,
                    'sold_out': false,
                    'recent_popularity': 2,
                    'is_essential': false,
                    'item_id': '19843221238',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9990
                  }
                ],
                'category_id': 12954979
              },
              {
                'rating': 5,
                'restaurant_id': 1322118,
                'pinyin_name': 'shangxiaojikuai',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 4,
                'rating_count': 1,
                'tips': '1评价 月售4份',
                'image_path': 'eb67135acb2457116ff057607c056c4bjpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843224310',
                'limitation': { },
                'name': '上校鸡块',
                'satisfy_count': 1,
                'activity': null,
                'satisfy_rate': 100,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654115062',
                    'name': '上校鸡块',
                    'pinyin_name': 'shangxiaojikuai',
                    'restaurant_id': 1322118,
                    'food_id': 160572859,
                    'packing_fee': 1,
                    'recent_rating': 5,
                    'promotion_stock': -1,
                    'price': 12,
                    'sold_out': false,
                    'recent_popularity': 4,
                    'is_essential': false,
                    'item_id': '19843224310',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9988
                  }
                ],
                'category_id': 12954979
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'gurouxianglian',
                'display_times': [ ],
                'attrs': [ ],
                'description': '一份为2串',
                'month_sales': 6,
                'rating_count': 0,
                'tips': '0评价 月售6份',
                'image_path': '9cfd137d94422321dfb3320a60728bb9jpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843225334',
                'limitation': { },
                'name': '骨肉相连',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654116086',
                    'name': '骨肉相连',
                    'pinyin_name': 'gurouxianglian',
                    'restaurant_id': 1322118,
                    'food_id': 160574615,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 5,
                    'sold_out': false,
                    'recent_popularity': 6,
                    'is_essential': false,
                    'item_id': '19843225334',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9983
                  }
                ],
                'category_id': 12954979
              },
              {
                'rating': 5,
                'restaurant_id': 1322118,
                'pinyin_name': 'mizhijichi',
                'display_times': [ ],
                'attrs': [ ],
                'description': '一份为4个',
                'month_sales': 11,
                'rating_count': 2,
                'tips': '2评价 月售11份',
                'image_path': '7ae90118aeffa96b02e25fd985cd2d3ajpeg',
                'specifications': [
                  {
                    'values': [
                      '新奥尔良',
                      '黑胡椒'
                    ],
                    'name': '规格'
                  }
                ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843226358',
                'limitation': { },
                'name': '秘制鸡翅',
                'satisfy_count': 2,
                'activity': null,
                'satisfy_rate': 100,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654117110',
                    'name': '秘制鸡翅',
                    'pinyin_name': 'mizhijichi',
                    'restaurant_id': 1322118,
                    'food_id': 161413677,
                    'packing_fee': 2,
                    'recent_rating': 5,
                    'promotion_stock': -1,
                    'price': 16,
                    'sold_out': false,
                    'recent_popularity': 10,
                    'is_essential': false,
                    'item_id': '19843226358',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '新奥尔良'
                      }
                    ],
                    'stock': 9997
                  },
                  {
                    'original_price': null,
                    'sku_id': '23654118134',
                    'name': '秘制鸡翅',
                    'pinyin_name': 'mizhijichi',
                    'restaurant_id': 1322118,
                    'food_id': 161413678,
                    'packing_fee': 2,
                    'recent_rating': 5,
                    'promotion_stock': -1,
                    'price': 16,
                    'sold_out': false,
                    'recent_popularity': 1,
                    'is_essential': false,
                    'item_id': '19843226358',
                    'checkout_mode': 1,
                    'specs': [
                      {
                        'name': '规格',
                        'value': '黑胡椒'
                      }
                    ],
                    'stock': 10000
                  }
                ],
                'category_id': 12954979
              },
              {
                'rating': 5,
                'restaurant_id': 1322118,
                'pinyin_name': 'jichibaofan',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 3,
                'rating_count': 1,
                'tips': '1评价 月售3份',
                'image_path': '6191de558570d8d9652ebad6967ce65cjpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843227382',
                'limitation': { },
                'name': '鸡翅包饭',
                'satisfy_count': 1,
                'activity': null,
                'satisfy_rate': 100,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654119158',
                    'name': '鸡翅包饭',
                    'pinyin_name': 'jichibaofan',
                    'restaurant_id': 1322118,
                    'food_id': 181472063,
                    'packing_fee': 2,
                    'recent_rating': 5,
                    'promotion_stock': -1,
                    'price': 15,
                    'sold_out': false,
                    'recent_popularity': 3,
                    'is_essential': false,
                    'item_id': '19843227382',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9989
                  }
                ],
                'category_id': 12954979
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'wushuangjianchi',
                'display_times': [ ],
                'attrs': [ ],
                'description': '2只 奥尔良口味',
                'month_sales': 0,
                'rating_count': 0,
                'tips': '0评价 月售0份',
                'image_path': 'c864a1e843590d9173f8af6e278b6344jpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '120065715958',
                'limitation': { },
                'name': '无双剑翅',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '137807774454',
                    'name': '无双剑翅',
                    'pinyin_name': 'wushuangjianchi',
                    'restaurant_id': 1322118,
                    'food_id': 524851342,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 18,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '120065715958',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 999
                  }
                ],
                'category_id': 12954979
              }
            ],
            'activity': null,
            'type': 1,
            'id': 12954979,
            'is_activity': false
          },
          {
            'description': '',
            'is_selected': false,
            'icon_url': '',
            'name': '焗饭炒饭',
            'foods': [
              {
                'rating': 5,
                'restaurant_id': 1322118,
                'pinyin_name': 'xiangchangchaofan',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 2,
                'rating_count': 1,
                'tips': '1评价 月售2份',
                'image_path': 'acd1709c2df2858cd67a53ae5d4787d8jpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '120064793334',
                'limitation': { },
                'name': '香肠炒饭',
                'satisfy_count': 1,
                'activity': null,
                'satisfy_rate': 100,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '137806173942',
                    'name': '香肠炒饭',
                    'pinyin_name': 'xiangchangchaofan',
                    'restaurant_id': 1322118,
                    'food_id': 524849779,
                    'packing_fee': 2,
                    'recent_rating': 5,
                    'promotion_stock': -1,
                    'price': 22,
                    'sold_out': false,
                    'recent_popularity': 2,
                    'is_essential': false,
                    'item_id': '120064793334',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 10000
                  }
                ],
                'category_id': 12955145
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'peigenchaofan',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 0,
                'rating_count': 0,
                'tips': '0评价 月售0份',
                'image_path': 'acd1709c2df2858cd67a53ae5d4787d8jpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '120066686710',
                'limitation': { },
                'name': '培根炒饭',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '137809701622',
                    'name': '培根炒饭',
                    'pinyin_name': 'peigenchaofan',
                    'restaurant_id': 1322118,
                    'food_id': 524853224,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 22,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '120066686710',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 10000
                  }
                ],
                'category_id': 12955145
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'haixianzhizunjufan',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 1,
                'rating_count': 0,
                'tips': '0评价 月售1份',
                'image_path': null,
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843230454',
                'limitation': { },
                'name': '海鲜至尊焗饭',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654122230',
                    'name': '海鲜至尊焗饭',
                    'pinyin_name': 'haixianzhizunjufan',
                    'restaurant_id': 1322118,
                    'food_id': 131067497,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 32,
                    'sold_out': false,
                    'recent_popularity': 1,
                    'is_essential': false,
                    'item_id': '19843230454',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9998
                  }
                ],
                'category_id': 12955145
              }
            ],
            'activity': null,
            'type': 1,
            'id': 12955145,
            'is_activity': false
          },
          {
            'description': '',
            'is_selected': false,
            'icon_url': '',
            'name': '加料区',
            'foods': [
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'shuangbeizhishi',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 5,
                'rating_count': 0,
                'tips': '0评价 月售5份',
                'image_path': null,
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843232502',
                'limitation': { },
                'name': '双倍芝士',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654124278',
                    'name': '双倍芝士',
                    'pinyin_name': 'shuangbeizhishi',
                    'restaurant_id': 1322118,
                    'food_id': 131068260,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 11,
                    'sold_out': false,
                    'recent_popularity': 5,
                    'is_essential': false,
                    'item_id': '19843232502',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9984
                  }
                ],
                'category_id': 12955263
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'shuangbeirouli',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 1,
                'rating_count': 0,
                'tips': '0评价 月售1份',
                'image_path': null,
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843233526',
                'limitation': { },
                'name': '双倍肉粒',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654125302',
                    'name': '双倍肉粒',
                    'pinyin_name': 'shuangbeirouli',
                    'restaurant_id': 1322118,
                    'food_id': 131068261,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 20,
                    'sold_out': false,
                    'recent_popularity': 1,
                    'is_essential': false,
                    'item_id': '19843233526',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9999
                  }
                ],
                'category_id': 12955263
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'laiyipianpeigen',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 2,
                'rating_count': 0,
                'tips': '0评价 月售2份',
                'image_path': null,
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843234550',
                'limitation': { },
                'name': '来一片培根',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654126326',
                    'name': '来一片培根',
                    'pinyin_name': 'laiyipianpeigen',
                    'restaurant_id': 1322118,
                    'food_id': 131068264,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 10,
                    'sold_out': false,
                    'recent_popularity': 2,
                    'is_essential': false,
                    'item_id': '19843234550',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9998
                  }
                ],
                'category_id': 12955263
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'laoganmadiliao',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 1,
                'rating_count': 0,
                'tips': '0评价 月售1份',
                'image_path': null,
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843235574',
                'limitation': { },
                'name': '老干妈底料',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654127350',
                    'name': '老干妈底料',
                    'pinyin_name': 'laoganmadiliao',
                    'restaurant_id': 1322118,
                    'food_id': 131068267,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 8,
                    'sold_out': false,
                    'recent_popularity': 1,
                    'is_essential': false,
                    'item_id': '19843235574',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9999
                  }
                ],
                'category_id': 12955263
              }
            ],
            'activity': null,
            'type': 1,
            'id': 12955263,
            'is_activity': false
          },
          {
            'description': '',
            'is_selected': false,
            'icon_url': '',
            'name': '包边区',
            'foods': [
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'zhishibaobian',
                'display_times': [ ],
                'attrs': [ ],
                'description': '不能单点',
                'month_sales': 6,
                'rating_count': 0,
                'tips': '0评价 月售6份',
                'image_path': 'dc9f07860e854c20e1728beaf2130303jpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843236598',
                'limitation': { },
                'name': '芝士包边',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654128374',
                    'name': '芝士包边',
                    'pinyin_name': 'zhishibaobian',
                    'restaurant_id': 1322118,
                    'food_id': 131069155,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 18,
                    'sold_out': false,
                    'recent_popularity': 6,
                    'is_essential': false,
                    'item_id': '19843236598',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9986
                  }
                ],
                'category_id': 12955434
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'jinpaibaobian',
                'display_times': [ ],
                'attrs': [ ],
                'description': '不能单点',
                'month_sales': 2,
                'rating_count': 0,
                'tips': '0评价 月售2份',
                'image_path': '448f731e98d1c0cf2a2a77ccb9209252jpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843237622',
                'limitation': { },
                'name': '金牌包边',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654129398',
                    'name': '金牌包边',
                    'pinyin_name': 'jinpaibaobian',
                    'restaurant_id': 1322118,
                    'food_id': 131069156,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 18,
                    'sold_out': false,
                    'recent_popularity': 2,
                    'is_essential': false,
                    'item_id': '19843237622',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9993
                  }
                ],
                'category_id': 12955434
              }
            ],
            'activity': null,
            'type': 1,
            'id': 12955434,
            'is_activity': false
          },
          {
            'description': '',
            'is_selected': false,
            'icon_url': '',
            'name': '意面',
            'foods': [
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'jingdianroujiangyimian',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 9,
                'rating_count': 0,
                'tips': '0评价 月售9份',
                'image_path': '01d2135631db04b5f6ecf6c85717a17ejpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843238646',
                'limitation': { },
                'name': '经典肉酱意面',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654130422',
                    'name': '经典肉酱意面',
                    'pinyin_name': 'jingdianroujiangyimian',
                    'restaurant_id': 1322118,
                    'food_id': 135386858,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 25,
                    'sold_out': false,
                    'recent_popularity': 9,
                    'is_essential': false,
                    'item_id': '19843238646',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 10000
                  }
                ],
                'category_id': 13346551
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'suanxianghaixianyimian',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 1,
                'rating_count': 0,
                'tips': '0评价 月售1份',
                'image_path': '7381a9a28267ac5bc66452e2dd275c73jpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843239670',
                'limitation': { },
                'name': '蒜香海鲜意面',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654131446',
                    'name': '蒜香海鲜意面',
                    'pinyin_name': 'suanxianghaixianyimian',
                    'restaurant_id': 1322118,
                    'food_id': 135387210,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 28,
                    'sold_out': false,
                    'recent_popularity': 1,
                    'is_essential': false,
                    'item_id': '19843239670',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9994
                  }
                ],
                'category_id': 13346551
              },
              {
                'rating': 5,
                'restaurant_id': 1322118,
                'pinyin_name': 'jingdianroujiangjumian',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 7,
                'rating_count': 1,
                'tips': '1评价 月售7份',
                'image_path': '5ec7be49f1fad505d2e4eabe4675f387jpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843240694',
                'limitation': { },
                'name': '经典肉酱焗面',
                'satisfy_count': 1,
                'activity': null,
                'satisfy_rate': 100,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654132470',
                    'name': '经典肉酱焗面',
                    'pinyin_name': 'jingdianroujiangjumian',
                    'restaurant_id': 1322118,
                    'food_id': 135387427,
                    'packing_fee': 2,
                    'recent_rating': 5,
                    'promotion_stock': -1,
                    'price': 30,
                    'sold_out': false,
                    'recent_popularity': 7,
                    'is_essential': false,
                    'item_id': '19843240694',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 10000
                  }
                ],
                'category_id': 13346551
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'haixianjumian',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 0,
                'rating_count': 0,
                'tips': '0评价 月售0份',
                'image_path': '9bf01c1e0cc806c1cbc2cb6b23b80cd9jpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '125467828982',
                'limitation': { },
                'name': '海鲜焗面',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '144251594486',
                    'name': '海鲜焗面',
                    'pinyin_name': 'haixianjumian',
                    'restaurant_id': 1322118,
                    'food_id': 531144135,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 36,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '125467828982',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 10000
                  }
                ],
                'category_id': 13346551
              }
            ],
            'activity': null,
            'type': 1,
            'id': 13346551,
            'is_activity': false
          },
          {
            'description': '',
            'is_selected': false,
            'icon_url': '',
            'name': '冬季热饮',
            'foods': [
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'zishuxiangyu',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 1,
                'rating_count': 0,
                'tips': '0评价 月售1份',
                'image_path': '351b7e9ec74c5ef132048f1d9be0e840jpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843243766',
                'limitation': { },
                'name': '紫薯香芋',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654135542',
                    'name': '紫薯香芋',
                    'pinyin_name': 'zishuxiangyu',
                    'restaurant_id': 1322118,
                    'food_id': 147605406,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 18,
                    'sold_out': false,
                    'recent_popularity': 1,
                    'is_essential': false,
                    'item_id': '19843243766',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9996
                  }
                ],
                'category_id': 14553761
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'quqiyanmai',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 1,
                'rating_count': 0,
                'tips': '0评价 月售1份',
                'image_path': 'bbda35c09a8150c53be2ec05e4749f6fjpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843244790',
                'limitation': { },
                'name': '曲奇燕麦',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654136566',
                    'name': '曲奇燕麦',
                    'pinyin_name': 'quqiyanmai',
                    'restaurant_id': 1322118,
                    'food_id': 147605482,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 18,
                    'sold_out': false,
                    'recent_popularity': 1,
                    'is_essential': false,
                    'item_id': '19843244790',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9996
                  }
                ],
                'category_id': 14553761
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'hongyoumitao',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 1,
                'rating_count': 0,
                'tips': '0评价 月售1份',
                'image_path': null,
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843241718',
                'limitation': { },
                'name': '红柚蜜桃',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654133494',
                    'name': '红柚蜜桃',
                    'pinyin_name': 'hongyoumitao',
                    'restaurant_id': 1322118,
                    'food_id': 147605196,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 15,
                    'sold_out': false,
                    'recent_popularity': 1,
                    'is_essential': false,
                    'item_id': '19843241718',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9995
                  }
                ],
                'category_id': 14553761
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'baixiangboluo',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 0,
                'rating_count': 0,
                'tips': '0评价 月售0份',
                'image_path': null,
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843242742',
                'limitation': { },
                'name': '百香菠萝',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654134518',
                    'name': '百香菠萝',
                    'pinyin_name': 'baixiangboluo',
                    'restaurant_id': 1322118,
                    'food_id': 147605302,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 15,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '19843242742',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 10000
                  }
                ],
                'category_id': 14553761
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'nongchunkeke',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 1,
                'rating_count': 0,
                'tips': '0评价 月售1份',
                'image_path': null,
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843245814',
                'limitation': { },
                'name': '浓醇可可',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654137590',
                    'name': '浓醇可可',
                    'pinyin_name': 'nongchunkeke',
                    'restaurant_id': 1322118,
                    'food_id': 147605548,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 18,
                    'sold_out': false,
                    'recent_popularity': 1,
                    'is_essential': false,
                    'item_id': '19843245814',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9998
                  }
                ],
                'category_id': 14553761
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'quqiqiaokeli',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 0,
                'rating_count': 0,
                'tips': '0评价 月售0份',
                'image_path': null,
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843246838',
                'limitation': { },
                'name': '曲奇巧克力',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654138614',
                    'name': '曲奇巧克力',
                    'pinyin_name': 'quqiqiaokeli',
                    'restaurant_id': 1322118,
                    'food_id': 147605650,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 18,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '19843246838',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 10000
                  }
                ],
                'category_id': 14553761
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'tilamisu',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 1,
                'rating_count': 0,
                'tips': '0评价 月售1份',
                'image_path': null,
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843247862',
                'limitation': { },
                'name': '提拉米苏',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654139638',
                    'name': '提拉米苏',
                    'pinyin_name': 'tilamisu',
                    'restaurant_id': 1322118,
                    'food_id': 147605729,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 18,
                    'sold_out': false,
                    'recent_popularity': 1,
                    'is_essential': false,
                    'item_id': '19843247862',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9993
                  }
                ],
                'category_id': 14553761
              },
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'heitangliancha',
                'display_times': [ ],
                'attrs': [ ],
                'description': '',
                'month_sales': 1,
                'rating_count': 0,
                'tips': '0评价 月售1份',
                'image_path': null,
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '19843248886',
                'limitation': { },
                'name': '黑糖炼茶',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '23654140662',
                    'name': '黑糖炼茶',
                    'pinyin_name': 'heitangliancha',
                    'restaurant_id': 1322118,
                    'food_id': 147605824,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 18,
                    'sold_out': false,
                    'recent_popularity': 1,
                    'is_essential': false,
                    'item_id': '19843248886',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 9998
                  }
                ],
                'category_id': 14553761
              }
            ],
            'activity': null,
            'type': 1,
            'id': 14553761,
            'is_activity': false
          },
          {
            'description': '',
            'is_selected': false,
            'icon_url': '',
            'name': '点餐必看',
            'foods': [
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': 'chupinpisajiaodianzhanshi',
                'display_times': [ ],
                'attrs': [ ],
                'description': '披萨没有焦点就不是一个合格的披萨.懂披萨的都知道',
                'month_sales': 0,
                'rating_count': 0,
                'tips': '0评价 月售0份',
                'image_path': '3c056c9616086eb74a8a7792e77d9437jpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '120065716982',
                'limitation': { },
                'name': '出品披萨焦点展示',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '137807775478',
                    'name': '出品披萨焦点展示',
                    'pinyin_name': 'chupinpisajiaodianzhanshi',
                    'restaurant_id': 1322118,
                    'food_id': 524851343,
                    'packing_fee': 0,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 0.01,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '120065716982',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 1000
                  }
                ],
                'category_id': 503369094
              }
            ],
            'activity': null,
            'type': 1,
            'id': 503369094,
            'is_activity': false
          },
          {
            'description': '',
            'is_selected': false,
            'icon_url': '',
            'name': '热销',
            'foods': [
              {
                'rating': 0,
                'restaurant_id': 1322118,
                'pinyin_name': '7xipingzhuang',
                'display_times': [ ],
                'attrs': [ ],
                'description': '购买时请备注是否要瓶 不要瓶子可退1块打包费 相加冰请备注',
                'month_sales': 0,
                'rating_count': 0,
                'tips': '0评价 月售0份',
                'image_path': '3f6aad93c12ccdf9959b4b549deae61bjpeg',
                'specifications': [ ],
                'server_utc': 1486355485,
                'is_essential': false,
                'attributes': [ ],
                'item_id': '120062476022',
                'limitation': { },
                'name': '7喜瓶装',
                'satisfy_count': 0,
                'activity': null,
                'satisfy_rate': 0,
                'specfoods': [
                  {
                    'original_price': null,
                    'sku_id': '137806844662',
                    'name': '7喜瓶装',
                    'pinyin_name': '7xipingzhuang',
                    'restaurant_id': 1322118,
                    'food_id': 524850434,
                    'packing_fee': 2,
                    'recent_rating': 0,
                    'promotion_stock': -1,
                    'price': 3,
                    'sold_out': false,
                    'recent_popularity': 0,
                    'is_essential': false,
                    'item_id': '120062476022',
                    'checkout_mode': 1,
                    'specs': [ ],
                    'stock': 991
                  }
                ],
                'category_id': 503367440
              }
            ],
            'activity': null,
            'type': 1,
            'id': 503367440,
            'is_activity': false
          }
        ]
        resolve(replys)
      }, 100)
    })
  }
</script>

<style scoped lange="less">
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
  .wxdc-store-cart.active {
    background: #26a2ff;
    color: #fff;
  }
  .wxdc-store-cart .vux-badge {
    position: absolute;
    right: -5px;
    top: -5px;
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
  /* 展开数字和减少 */
  .expandmove-transition {
    transform: rotate(0) translateX(0) translateY(0);
    transition: all .3s ease-in-out;
    transition-delay: .1s;
  }
  .expandmove-enter, .expandmove-leave {
    transform: rotate(30deg) translateX(22px) translateY(-5px);
  }
  .expandnumber-transition {
    transform: rotate(0) translateX(0) translateY(0);
    transition: all .2s ease-in-out;
  }
  .expandnumber-enter, .expandnumber-leave {
    transform: rotate(-10deg) translateX(15px) translateY(-8px);
  }
  .wxdc-store-btn a.wxdc-green {
    background-color: #4cd964;
    color: #fff;
  }
</style>
