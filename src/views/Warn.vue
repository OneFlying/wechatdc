/**
* Created by caiyuhao on 2017/2/14.
* 我的投诉
*/
<template>
  <div>
    <x-header title="我的投诉" :left-options="{showBack:true,backText:'返回'}" @click="scrollTop"></x-header>
    <scroller
      lock-x use-pullup use-pulldown v-ref:scroller height="-45+'px'"
      @pullup:loading="loadmore"
      @pulldown:loading="refresh"
      :pullup-status.sync="pullupStatus"
      :pulldown-config="pulldownConfig">
      <div class="discuss_list" style="padding-bottom: 20px">
        <div class="discuss_item" v-for="i in n">
          <div class="user_info">
            <strong class="nickname">杨明宇黄美姬米饭{{ i }}</strong>
            <img class="avatar" src="http://placeholder.qiniudn.com/60x60/3cc51f/ffffff">
          </div>
          <div class="discuss_message">
            <div class="discuss_message_content">网上购物这么激烈，没想到店家的服务这么好，商品质量好而价低廉，我太感谢你了！</div>
          </div>
          <p class="discuss_extra_info">2017-11-12 12:46</p>
          <div class="reply_result">
            <div class="nickname">商家回复</div>
            <div class="discuss_message">
              <div class="discuss_message_content">感谢您对我们的支持</div>
            </div>
            <p class="discuss_extra_info">2017-11-12 13：46</p>
          </div>
        </div>
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
    Spinner
  } from 'vux/src/components'

  export default {
    components: {
      XHeader,
      Scroller,
      Spinner
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
      },
      scrollTop () {
        this.$nextTick(() => {
          this.$refs.scroller.reset({
            top: 0
          })
        })
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
<style>
  .discuss_list {
    margin: 0;
    font-size: 16px
  }
  .discuss_item {
    position: relative;
    padding:10px 10px 10px 45px;
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(10px);
    margin: 5px;
    border-radius: 10px;
    border: 1px solid #d9d9d9;
  }
  .discuss_item:after {
    content: "\200B";
    display: block;
    height: 0;
    clear: both
  }
  .discuss_item .user_info {
    min-height: 20px;
    overflow: hidden
  }
  .discuss_item .nickname {
    display: block;
    font-weight: 400;
    font-style: normal;
    color: #727272;
    width: 9em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal
  }
  .discuss_item .avatar {
    position: absolute;
    left: 5px;
    top: 15px;
    width: 35px;
    height: 35px;
    background-color: #ccc;
    vertical-align: top;
    margin-top: 0;
    border-radius: 2px;
  }
  .discuss_item .discuss_message {
    color: #3e3e3e;
    line-height: 1.5
  }
  .discuss_item .discuss_extra_info {
    color: #8c8c8c;
    font-size: 12px
  }
  .discuss_item .discuss_extra_info a {
    margin-left: .5em
  }
  .reply_result {
    position: relative;
    margin-top: .5em;
    padding-top: .5em;
    padding-left: .4em
  }
  .reply_result:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    border-top: 1px solid #dadada;
    transform-origin: 0 0;
    transform: scaleY(0.5)
  }
  .reply_result .nickname {
    position: relative;
    overflow: visible
  }
  .reply_result .nickname:before {
    content: " ";
    position: absolute;
    left: -0.4em;
    top: 50%;
    margin-top: -7px;
    width: 3px;
    height: 14px;
    background-color: #26a2ff;
  }
</style>

