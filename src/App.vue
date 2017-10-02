<template>
  <div id="WeChatMeal">
    <me-navbar></me-navbar>
    <router-view class="viewbox"></router-view>
    <me-tabbar></me-tabbar>
  </div>
</template>

<script>
  import MeNavbar from '@/components/navbar'
  import MeTabbar from '@/components/tabbar'

  export default {
    name: 'WeChatMeal',
    components: {
      MeNavbar,
      MeTabbar
    }
  }
</script>

<style lang="scss">
  @import "~normalize.css";
  @import "assets/scss/base";
  @import "assets/scss/navbar";
  @import "assets/scss/tabbar";
</style>
