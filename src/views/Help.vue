/**
* Created by caiyuhao on 2017/2/5.
* 订餐须知
*/
<template>
  <div>
    <x-header :left-options="{showBack:true,backText:'返回'}" title="订餐须知"></x-header>
    <scroller lock-x height="-45+'px'" v-ref:scroller>
      <div style="background: #ffffff;padding: 5px 10px 10px;line-height: 36px;">
        •	云餐厅的预定时间为：前一天23：00前（周日-周四）。<br/>
        •	为避免食品长时间存放造成变质给您健康带来风险，请您务必在7：30—9:00内取餐；如逾期未取，我们将锁定柜门不予取餐，由清柜员及时回收处理，逾期未取的损失由您承担。<br/>
        •	在您成功订餐后，您会收到微信支付成功订单。您也可以在云餐厅首页“订单”中查询本次订餐的所有信息。我们会在送餐到柜后，发微信通知您取餐单号。<br/>
        •	您成功完成网上订餐后，我们将立刻进行食材采购，因此我们无法接受订单的修改。如您确有特殊情况需要退订的，在预定当天23：00前完成退订的，可获100%退款；预定送餐到柜时间3小时前完成退订的，可获50%退款；预定送餐到柜时间3小时内退订，不予退款。退订成功后，退款将及时存入您的校园卡或微信账号。<br/>
        •	我们提供校园卡和微信支付的方式。<br/>
        •	若发现任何问题，请立即拨打客户热线57122346，客服将为您妥善处理。<br/>
      </div>
    </scroller>
  </div>
</template>
<script>
  import {
    XHeader,
    Scroller
  } from 'vux/src/components'

  export default {
    components: {
      XHeader,
      Scroller
    }
  }
</script>
<style>
    /* css definition */
</style>
