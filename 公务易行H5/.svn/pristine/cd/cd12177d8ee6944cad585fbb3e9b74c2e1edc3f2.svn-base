<template>
  <div class="container">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content">
      <div class="top">
        <p>
          <span style="margin-right:0.533333rem;">单程</span>
          <span>{{range}}</span>
        </p>
        <p>{{data.depttime}}</p>
        <p v-show="true">{{hint}}</p>
      </div>
      <div class="total">
        <span>应付金额:</span>
        <span>￥{{data.amountpayable}}</span>
        <span>总额明细</span>
      </div>
      <div class="kong"></div>
      <div class="style">
        <p>请选择支付方式</p>
        <p>
          <i></i>
          <span>快钱支付</span>
          <b></b>
        </p>
      </div>
      <div class="kong"></div>
      <div class="pay">
        <button @click="pay()">支付</button>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import loading from './loading'
import headTop from './head'
import { Toast, MessageBox } from 'mint-ui';
import {
  getStore,
  setStore,
  getFromOrderTime,
  addZero
} from '../config/utils'
export default {
  data() {
    return {
      title: '支付方式',
      isLoading: true,
      range: '',
      hint: '为保证顺利出票，请尽快完成支付',
      data: {}
    }
  },
  activated: function() {
    var that = this;
    that.isLoading = false;
    let title = getStore("title");
    that.range = title;
    let data = JSON.parse(getStore('orderData'));
    let fromtime = getFromOrderTime(data.ordertime);
    if (fromtime != false) {
      var countdown = parseInt(fromtime.split(':')[0]) * 60 + parseInt(fromtime.split(':')[1]);
    } else { var countdown = 0; }
    console.log(countdown);
    var timer = setInterval(function() {
      let time = getFromOrderTime(data.ordertime)
      if (time != false) {
        that.hint = '为保证顺利出票，请尽快在' + time + '内完成支付';
        countdown--;
      } else {
        that.hint = '该订单已取消,请重新下单!';
        clearInterval(timer)
        return;
      }
    }, 1000)
    that.data = data;

  },
  components: {
    headTop,
    loading
  },
  methods: {
    pay() {
      let data = this.data;
      if (getFromOrderTime(data.ordertime) == false) {
        Toast({
          message: '该订单已取消,请重新下单!',
          duration: 2000
        })
        return;
      }
      that.$router.push({
        path:'/pay'
      })
    }
  },
}

</script>
<style scoped>
.content {
  background-color: #fff;
  min-height: 13.173333rem;
  margin: 0 auto;
}

.top {
  width: 8.933333rem;
  background: url(../assets/img/paystyle.png)round;
  background-size: 100% auto;
  font-size: 0.453333rem;
  color: #000;
  padding: 0.4rem 0.533333rem;
}

.top p:nth-of-type(1) {
  font-weight: 600;
}

.top p:nth-of-type(2) {
  margin: 0.32rem 0;
}

.top p:nth-of-type(3) {
  color: #336699;
  font-size: 0.346667rem;
}

.total {
  height: 1.493333rem;
  line-height: 1.493333rem;
  font-size: 0.48rem;
  color: #424242;
  padding: 0 0.533333rem;
}

.total * {
  vertical-align: middle;
}

.total span:nth-of-type(2) {
  color: #e55233;
  font-size: 0.56rem;
}

.total span:nth-of-type(3) {
  float: right;
  color: #0053a8;
  font-size: 0.346667rem;
}

.style {
  padding: 0 0.533333rem;
  font-size: 0.48rem;
  color: #000;
}

.style p:nth-of-type(1) {
  height: 1.2rem;
  line-height: 1.2rem;
  font-size: 0.4rem;
  color: #424242;
}

.style p:nth-of-type(2) {
  height: 1.6rem;
  line-height: 1.6rem;
  font-weight: 600;
}

.style p:nth-of-type(2) * {
  vertical-align: middle;
}

.style i {
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  background: url(../assets/img/pay_logo.png)no-repeat;
  background-size: 0.8rem 0.8rem;
  margin-right: 0.533333rem;
}

.style b {
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  background: url(../assets/img/pay_check.png)no-repeat;
  background-size: 0.8rem 0.8rem;
  margin-left: 4.586667rem;
}

.pay {
  text-align: center;
}

button {
  margin-top: 1.6rem;
  width: 8.773333rem;
  height: 1.44rem;
  border: 0;
  background: url(../assets/img/edit_login.png)no-repeat 0 0.08rem;
  background-size: 8.773333rem 1.44rem;
  color: #fff;
  font-size: 0.533333rem;
}

.kong {
  width: 10.0rem;
  height: 0.533333rem;
  background: #dedede
}

</style>
