/**
* Created by caiyuhao on 2017/2/13.
* 搜索框
*/
<template>
  <div class="wxdc-base-search">
    <a class="wxdc-base-search-back" @click="showSearch">
      <span class="iconfont icon-back"></span>
    </a>
    <span v-show="show" @click="showSearch">
      <span class="iconfont icon-search" style="font-size: 16px"></span>
      {{ placeholder }}
    </span>
    <div style="float: left">
      <div style="clear: both;position: relative">
        <i class="iconfont icon-search" v-show="!show" style="font-size: 16px"></i>
        <input type="text" name="search_top" :id="'search'+uuid" :placeholder="placeholder" title="" @change="change">
      </div>
    </div>
  </div>
  <div v-show="!show" class="wxdc-base-search-results">
    <p v-for="item in results">{{ item }}</p>
  </div>
</template>
<script>
  function hasClass (elem, cls) {
    cls = cls || ''
    if (cls.replace(/\s/g, '').length === 0) return false // 当cls没有参数时，返回false
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ')
  }

  function addClass (ele, cls) {
    if (!hasClass(ele, cls)) {
      ele.className = ele.className === '' ? cls : ele.className + ' ' + cls
    }
  }

  function removeClass (ele, cls) {
    if (hasClass(ele, cls)) {
      let newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' '
      while (newClass.indexOf(' ' + cls + ' ') >= 0) {
        newClass = newClass.replace(' ' + cls + ' ', ' ')
      }
      ele.className = newClass.replace(/^\s+|\s+$/g, '')
    }
  }

  export default {
    methods: {
      uuid () {
        return Math.random().toString(36).substring(3, 8)
      },
      currentstyle (elem) {
        return elem.currentStyle || document.defaultView.getComputedStyle(elem)
      },
      showSearch () {
        this.show ? this.show = false : this.show = true
        if (!this.show) {
          document.querySelector('#search' + this.uuid).focus()
          this.style = 'margin-left: 50px'
        } else {
          this.style = 'margin-left: 0'
        }
        let dom = document.querySelector('.wxdc-base-search')
        if (hasClass(dom, 'wxdc-base-search-fixed')) {
          removeClass(dom, 'wxdc-base-search-fixed')
        } else {
          addClass(dom, 'wxdc-base-search-fixed')
        }
        let search = document.querySelector('.wxdc-base-search')
        let input = document.querySelector('#search' + this.uuid)
        input.style.width = parseInt(this.currentstyle(search)['width']) - 95 + 'px'
      }
    },
    props: {
      placeholder: {
        type: String,
        default: ''
      },
      results: {
        type: Array,
        default: []
      },
      change: Function
    },
    data () {
      return {
        uuid: this.uuid(),
        show: true,
        style: 'margin-left: 0'
      }
    },
    ready () {
      let searchbar = document.querySelector('.wxdc-base-search').parentNode
      let input = document.querySelector('#search' + this.uuid)

      let width = this.currentstyle(searchbar)['width']
      input.style.width = parseInt(width) - 30 + 'px'
    }
  }
</script>
<style>
  @import "../assets/font/iconfont.css";

  /* 顶部搜索 */
  .wxdc-base-search {
    position: relative;
    box-sizing: border-box;
    height: 36px;
    margin-top: 2px;
  }
  .wxdc-base-search input {
    background: #fff;
    display: block;
    height: 36px;
    width: auto;
    outline: none;
    appearance: none;
    tap-highlight-color: transparent;
    border: none;
    border-radius: 36px;
    font-size: 14px;
    padding-left: 30px;
  }
  .wxdc-base-search > span {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    font-size: 14px;
    color: #888;
    width: 100%;
    height: 36px;
    line-height: 38px;
    background: #ffffff;
    border-radius: 36px;
  }
  .wxdc-base-search i {
    position: absolute;
    color: #888;
    left: 10px;
    height: 36px;
    line-height: 38px;
  }
  .wxdc-base-search-fixed {
    position: fixed;
    background: #26a2ff;
    width: 100%;
    left: 0;
    z-index: 999;
    text-align: left;
  }
  .wxdc-base-search-back {
    width: 50px;
    float: left;
    text-align: center;
  }
  .wxdc-base-search-results {
    position: fixed;
    top: 46px;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 100000;
    background: #f1f1f1;
  }
</style>
