/**
* Created by caiyuhao on 2017/2/4.
* 预览
*/
<template>
  <div style="overflow: hidden">
    <!-- 关闭 -->
    <span class="wxdc-previewer-close" @click="hidepreviewer" v-show="show">
      <span class="iconfont icon-close"></span>
    </span>
    <!-- 遮罩层 -->
    <div class="wxdc-previewer-mask" v-show="show"></div>
    <!-- 主体框 -->
    <div class="wxdc-previewer" v-if="show" transition="showscale">
      <scroller lock-x scrollbar-y v-ref:scrollerl height="-0+'px'">
        <div>
          <div v-touch:pan="fixpic"
               v-touch-options:pan="{ threshold: 50 }"
               class="wxdc-previewer-top" id="previewer_top">
            <div class="wxdc-previewer-pic">
              <img alt="logo" :src="img">
            </div>
            <div class="weui_media_box weui_media_text">
              <h4 class="weui_media_title">杨明宇黄猛击米饭</h4>
              <cell class="wxdc_weui_media_title wxdc_weui_media_title_noborder">
                <span slot="icon" style="color: #888;">
                  <rater :value="4.3" slot="icon" :font-size="12" :margin="0" active-color="#ffaa0c"></rater>
                  &nbsp;4.3
                </span>
              </cell>
              <cell class="wxdc_weui_media_title wxdc_weui_media_title_noborder">
                <span slot="icon" style="color: #f60; font-size: 18px">
                  &#165;35
                </span>
                <span slot="value" class="wxdc-number">
                  <span class="wxdc-number-move" @click.stop.prevent="remove($index)">
                    <i class="iconfont icon-move"></i>
                  </span>
                  <span class="wxdc-number-number">0</span>
                  <span class="wxdc-number-add" @click.stop.prevent="add($index)">
                    <i class="iconfont icon-add"></i>
                  </span>
                </span>
              </cell>
            </div>
          </div>
          <div class="wxdc-previewer-list" v-show="showlist">
            <group>
              <cell title="商品评价">
                <span slot="value">20条评价</span>
              </cell>
            </group>
            <group>
              <div class="weui_media_box weui_media_text" v-for="i in 20">
                <h4 class="weui_media_title" style="font-size: 14px">用户263752</h4>
                <cell class="wxdc_weui_media_title wxdc_weui_media_title_noborder">
                <span slot="icon" style="color: #888;">
                  <rater :value="4.3" slot="icon" :font-size="12" :margin="0" active-color="#ffaa0c"></rater>
                  &nbsp;4.3
                </span>
                </cell>
              </div>
            </group>
          </div>
        </div>
      </scroller>
    </div>
  </div>
</template>
<script>
  import { Rater, Cell, Scroller, Group } from 'vux/src/components'

  export default {
    components: {
      Rater,
      Cell,
      Group,
      Scroller
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      img: String,
      showlist: false
    },
    methods: {
      hidepreviewer () {
        this.show = false
        this.showlist = false
        document.querySelector('#previewer_top').className = 'wxdc-previewer-top'
      },
      fixpic () {
        this.showlist = true
        document.querySelector('#previewer_top').className = 'wxdc-previewer-top nofix'
        this.$nextTick(() => {
          this.$refs.scrollerl.reset()
        })
      }
    }
  }
</script>
<style>
  .wxdc-previewer {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 10001;
    width: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  .wxdc-previewer-mask {
    position: fixed;
    z-index: 10000;
    background: rgba(0,0,0,0.25);
    backdrop-filter: blur(10px);
    top: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .showscale-transition {
    transform: scale(1);
    transition: all .3s ease;
    border-radius: 0; /* 新过度动画 */
  }
  .showscale-enter, .showscale-leave {
    transform: scale(0);
    border-radius: 10px;
  }
  .wxdc-previewer-top {
    position: fixed;
    width: 90%;
    margin-top: 50%;
    margin-left: 5%;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    transform: translateY(-25%);
  }
  .wxdc-previewer-top.nofix {
    position: static;
    width: 100%;
    margin: 0;
    transform: translateY(0);
    border-radius: 0;
  }
  .wxdc-previewer-top .wxdc-previewer-pic {
    height: 280px;
    background: #222;
    overflow: hidden;
  }
  .wxdc-previewer-top img {
    display: inline-block;
    width: 100%;
  }
  .wxdc-previewer-close {
    position: fixed;
    color: #000;
    padding: 0 10px;
    z-index: 10002;
    top: 0;
  }
  .wxdc-previewer-close > span {
    font-size: 32px;
  }
  .wxdc-previewer-list {
    background-color: #f1f1f1;
    margin-top: -20px;
    padding-top: 20px;
  }
</style>
