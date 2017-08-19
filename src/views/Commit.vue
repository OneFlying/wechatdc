/**
* Created by caiyuhao on 2017/2/14.
* 我的评价
*/
<template>
  <div>
    <x-header title="评价" :left-options="{showBack:true,backText:'返回'}"></x-header>
    <scroller
      lock-x use-pullup use-pulldown v-ref:scroller height="-45+'px'"
      @pullup:loading="loadmore"
      @pulldown:loading="refresh"
      :pullup-status.sync="pullupStatus"
      :pulldown-config="pulldownConfig">
      <div style="padding-bottom: 20px">
        <group title="以下是您做出的评价">
          <a class="weui_media_box weui_media_appmsg wxdc-base-commit"
             v-for="i in n">
            <div class="weui_media_hd">
            <span class="wxdc-me-pic">
              <span class="iconfont icon-peoplefill" style="font-size: 36px;color: #eee;"></span>
            </span>
            </div>
            <div class="weui_media_bd">
              <p class="weui_media_desc">
                <cell class="wxdc_weui_media_title">
                  <span slot="icon">小丸子{{ i }}</span>
                  <span slot="value">2017-02-05 16:46</span>
                </cell>
                <cell class="wxdc_weui_media_title wxdc_weui_media_title_noborder">
                  <rater :value="4.3" slot="icon" :font-size="12" :margin="0" active-color="#ffaa0c"></rater>
                  <span slot="icon">4.3</span>
                </cell>
                <cell class="wxdc_weui_media_title wxdc_weui_media_title_noborder">
                <span slot="icon" style="color: #333">
                  网上购物这么激烈，没想到店家的服务这么好，商品质量好而价低廉，我太感谢你了！ 店家很讲信誉，而且很不错哦，在这家店买东东，我很满意~
                </span>
                </cell>
              </p>
            </div>
          </a>
        </group>
      </div>
      <!--pullup slot-->
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -25px; text-align: center;">
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
    Scroller,
    Spinner,
    Group,
    Cell,
    Rater,
    Countup
  } from 'vux/src/components'

  export default {
    components: {
      XHeader,
      Scroller,
      Spinner,
      Group,
      Cell,
      Rater,
      Countup
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
      }
    },
    data () {
      return {
        n: 10,
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
<style scope>
  .wxdc-evaluate-banner {
    background: #ffffff;
  }
  .wxdc-evaluate-countup {
    font-size: 32px;
    color: #f60;
  }
  .wxdc-evaluate-countup span {
    color: #f60;
    font-size: 12px;
  }
</style>

