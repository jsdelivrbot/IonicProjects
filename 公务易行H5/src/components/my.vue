<template>
  <div class="container" :style="{'height':trueHeight}">
    <loading v-if="isLoading"></loading>
    <div class="content" v-else>
      <!--头像-->
      <div class="tou">
        <div class="top">
          <span @click="$router.go(-1)" class="goback"></span>
          <span>{{title}}</span>
        </div>
        <div class="client row" @click="personal()">
          <img src="../assets/img/bg_touxiang.png" alt="">
          <p class="name">{{nickName}}</p>
          <p class="edit" v-if="!needLogin"></p>
          <button v-else class="login">登录</button>
          <div class="point" v-show="total!='0'"><p>积分：{{total}}分</p></div>
        </div>
      </div>
      <!-- 待支付订单 -->
      <div class="row pay" v-show="orderlist.tocityname">
        <div>
          <p><span>{{orderlist.fromcityname}}</span><span class="jian"></span><span>{{orderlist.tocityname}}</span></p>
          <p><span>{{orderlist.fromtime}}</span>-<span>{{orderlist.todatetime}}</span></p>
        </div>
        <div class="price">¥{{orderlist.amountpayable}}</div>
        <button class="topay" @click="pay()">立即付款</button>
      </div>
      <!--订单-->
      <div class="ding">
        <div class="dan" @click="toOrderAll">
          <img src="../assets/img/all_icon.png"></img>
          <p>全部订单</p>
        </div>
        <img src="../assets/img/my_line.png" alt="" class="line">
        <div class="dan canpay" @click="toOrderTopay">
          <img src="../assets/img/pay_icon.png"></img>
          <p>待支付</p>
        </div>
      </div>
      <!--我的积分-->
      <div class="list" @click="toIntegral">
        <img src="../assets/img/icon_integral.png"></img>
        <div>我的积分</div>
        <div class="icon_more"></div>
      </div>
      <!--常用旅客-->
      <div class="list" @click="toPassenger">
        <img src="../assets/img/icon_psg.png"></img>
        <div>常用乘机人</div>
        <div class="icon_more"></div>
      </div>
      <!--常用地点-->
      <div class="list" @click="toOneClick">
        <img src="../assets/img/OneClick.png"></img>
        <div>一键下单设置</div>
        <div class="icon_more"></div>
      </div>
      <!--公务指南-->
<!--       <div class="list" @click="toGuide">
        <img src="../assets/img/icon_guide.png"></img>
        <div>公务指南</div>
        <div class="icon_more"></div>
      </div> -->
      <!--账户安全-->
      <div class="list" @click="toSafe">
        <img src="../assets/img/icon_safe.png"></img>
        <div>账户安全</div>
        <div class="icon_more"></div>
      </div>
      <!--设置-->
      <div class="list" @click="toSetting">
        <img src="../assets/img/icon_set.png"></img>
        <div>关于</div>
        <div class="icon_more"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import Register from './register'
import loading from './loading'
import headTop from './head'
import {
  getStore,
  setStore,
  checkSts,
  getFromOrderTime,
  watchOrderStatus
} from '../config/utils'
export default {
  data() {
    return {
      title: '',
      isLoading: true,
      needLogin: false,
      nickName: '尊贵的公务客户',
      avatarUrl: require("../assets/img/bg_touxiang.png"),
      orderlist: [],
      trueHeight: '',
      total:'0'
    }
  },
  props: ['myToken'],
  activated: function() {
    this.trueHeight = getStore('trueHeight');
    let userinfo = JSON.parse(getStore('userinfo'));
    console.log(userinfo)
    if (userinfo) {
      this.nickName = userinfo.nickname;
    }
    let that = this;
    that.isLoading = false;
    let token = getStore('token')
    let postData = { data: {} };
    that.orderlist = [];
    that.$http.post(that.url + '/xxx/api/private/checkToken', postData, {
      headers: { "Authorization": token },
    }).then(function(res) {
      console.log(res)
      if (res.body.sts == 1) {
        that.needLogin = false;
        that.$http.post(that.url + '/xxx/api/private/queryPointDetailBymember', postData, {
          headers: { "Authorization": token }
        }).then(function(res) {
          console.log(res)
          if (res.body.sts == 1) {
            that.total = res.body.data.totalpoints;
          }
        },function(err){})

      }
    }, function(res) {
      console.log(res)
      if (res.status == '401' || (
          (res.status == '500') && (res.data.message.indexOf("No user found with username") != -1)
        )) {
        that.needLogin = true;
        that.nickName ='尊贵的公务客户';
        that.total = '0';
        setStore('gotoAfterSignin', 'home')
      }
    });
    that.$http.post(that.url + '/xxx/api/private/queryfindAllTicketOrder', postData, {
      headers: { "Authorization": token },
    }).then(function(res) {
      console.log(res)
      if (checkSts(res, '订单获取失败', that)) {
        return;
      }
      var data = res.body.data.ticketOrder;
      let arr = [];
      if (data.length > 0) {
        for (var i = data.length - 1; i >= 0; i--) {
          data[i].fromtime = data[i].depttime.split('-')[1] + '-' + data[i].depttime.split('-')[2];
          if (data[i].orderstatus == '已订座待支付' && getFromOrderTime(data[i].ordertime) != false) {
            // data[i]["fromOrderTime"] = parseInt(getFromOrderTime(data[i].ordertime).split(':')[0]) * 60;
            arr.push(data[i]);
          }
        }
        if (arr.length > 0) {
          this.orderlist = arr[arr.length-1];
        }
      }
    }, function(res) {
      // console.log(res)
    })
  },
  components: {
    headTop,
    loading,
    Register
  },
  methods: {
    personal() {
      if (this.needLogin == true) {
        this.$router.push({
          path: '/register'
        })
      } else {
        this.$router.push({
          path: '/personal'
        })
      }
    },
    toSetting: function() {
      if (this.needLogin == true) {
        this.$router.push({
          path: '/register'
        })
      } else {
        this.$router.push({
          path: '/set'
        })
      }
    },
    toOneClick: function() {
      if (this.needLogin == true) {
        this.$router.push({
          path: '/register'
        })
      } else {
        setStore('onefresh', true);
        this.$router.push({
          path: '/oneclick'
        })
      }
    },
    // 公务指南
    toGuide: function() {
      if (this.needLogin == true) {
        this.$router.push({
          path: '/register'
        })
      } else {
        setStore('onefresh', true);
        this.$router.push({
          path: '/guide'
        })
      }
    },
    // 积分
    toIntegral: function() {
      if (this.needLogin == true) {
        this.$router.push({
          path: '/register'
        })
      } else {
        setStore('onefresh', true);
        this.$router.push({
          path: '/integral'
        })
      }
    },
    toSafe: function() {
      if (this.needLogin == true) {
        this.$router.push({
          path: '/register'
        })
      } else {
        this.$router.push({
          path: '/safe'
        })
      }
    },
    toOrderAll() {
      if (this.needLogin == true) {
        this.$router.push({
          path: '/register'
        })
      } else {
        setStore('switchTablist', 3);
        setStore('toHome',false);
        this.$router.push({
          path: '/order'
        })
      }
    },
    toOrderTopay() {
      if (this.needLogin == true) {
        this.$router.push({
          path: '/register'
        })
      } else {
        setStore('switchTablist', 1);
        setStore('toHome',false);
        this.$router.push({
          path: '/order'
        })
      }
    },
    toPassenger() {
      if (this.needLogin == true) {
        this.$router.push({
          path: '/register'
        })
      } else {
        setStore('fromPassenger', 'my')
        this.$router.push({
          path: '/passenger',
        })
      }
    },
    // 支付
    pay(index) {
      let that = this;
      if (this.needLogin == true) {
        this.$router.push({
          path: '/register'
        })
      } else {
        let that = this;
        let title = that.orderlist.airrangen;
        setStore('title', title);
        let hangData = that.orderlist;
        let orderData = {
          "depttime": hangData.depttime,
          "toairportcode": hangData.toairportcode,
          "depairportcode": hangData.depairportcode,
          "flightno": hangData.flightno,
          "orderno": hangData.orderno,
          "amountpayable": parseInt(hangData.amountpayable),
          "passengername": hangData.passengername,
          "identificationnum":hangData.identificationnum
        };
        setStore('payfresh', true);
        setStore('orderData', orderData)
        this.$router.push({
          path: '/pay'
        })
      }
    }
  },
}

</script>
<style scoped>
.container {
  margin: 0;
}

.content {
  background-color: #f8ebcb;
}

.tou {
  height: 5.32rem;
  background: url(../assets/img/my_bg.png)no-repeat;
  background-size: 100% auto;
  text-align: center;
}

.top {
  height: 1.173333rem;
  line-height: 1.173333rem;
  padding: 0 0.64rem;
  color: #fff;
  font-size: 0.426667rem;
  text-align: center;
}

.top .goback {
  position: absolute;
  top: 0.266667rem;
  left: 0.533333rem;
  display: inline-block;
  width: 0.64rem;
  height: 0.64rem;
  background: url(../assets/img/btn_back_normal.png)no-repeat left center;
  background-size: 100% auto;
}


.client {
  font-size: 0.533333rem;
  color: #fff;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: initial;
  height: 3.893333rem;
  line-height: 3.893333rem;
  position: relative;
  padding: 0 0.533333rem 0 0.426667rem;
}

.client img {
  width: 1.733333rem;
  height: 1.733333rem;
  margin: auto 0;
  margin-right: 0.8rem;
}

.client .edit {
  width: 0.8rem;
  height: 0.8rem;
  position: absolute;
  top: 1.546667rem;
  right: 0.533333rem;
  background-image: url(../assets/img/my_edit.png);
  background-repeat: no-repeat;
  background-size: 0.8rem 0.8rem;
}
.point{
  position: absolute;
  left: 2.96rem;
  bottom: 0.8rem;
  height: 0.533333rem;
  line-height: 0.533333rem;
  border-radius: 0.133333rem;
  text-align: center;
}
.point p{
  padding:0.08rem 0.213333rem;
  padding-left: 0.666667rem;
  border-radius: 0.133333rem;
  /*background-color: #dd7343;*/
  display: inline-block;
  font-size: 0.373333rem;
  color: #fff;
  background-image: url(../assets/img/icon_point.png);
  background-position: left center;
  background-repeat: no-repeat;
  background-size:  0.533333rem 0.533333rem;
 
}
.client button.login {
  position: absolute;
  top: 1.546667rem;
  right: 0.533333rem;
  font-size: 0.4rem;
  color: #fff;
  text-align: center;
  width: 2.4rem;
  height: 0.96rem;
  background-image: url(../assets/img/my_login.png);
  background-repeat: no-repeat;
  background-color: transparent;
  background-size: 2.4rem 0.96rem;
  border: none;
}

.pay {
  height: 1.653333rem;
  padding: 0 0.426667rem;
  font-size: 0.266667rem;
  color: #666;
  background-color: #fff;
  margin-top: 0.4rem;
}

.pay p:nth-of-type(1) {
  color: #333;
  font-size: 0.426667rem;
  margin: 0.4rem 0 0.24rem;
}

.pay p:nth-of-type(1) span {
  color: #333;
}

.pay .price {
  color: #e13426;
  font-size: 0.48rem;
  line-height: 1.653333rem;
}

.line {
  height: 0.92rem;
  width: 0.08rem;
  margin-top: 0.386667rem;
}

.jian {
  background: url(../assets/img/jiantou.png)no-repeat;
  background-size: 1.066667rem 0.453333rem;
  width: 1.066667rem;
  height: 0.453333rem;
  display: inline-block;
  margin: 0 0.24rem;
}

.topay {
  background: url(../assets/img/topay.png)no-repeat 0 0.08rem;
  background-size: 2.64rem 1.2rem;
  border: 0;
  height: 1.2rem;
  width: 2.64rem;
  color: #fffefe;
  font-size: 0.4rem;
  text-align: center;
  margin-top: 0.226667rem;
}

.ding {
  display: flex;
  flex-direction: row;
  font-size: 0.32rem;
  color: #333;
  background-color: #fff;
  margin: 0.4rem 0;
}

.dan {
  width: 50%;
  text-align: center;
  height: 1.706667rem;
}

.dan img {
  width: 0.8rem;
  height: 0.8rem;
  margin: 0.16rem 0;
}

.kong {
  width: 100%;
  background: #eee;
  height: 0.4rem;
  line-height: 0.4rem;
}

.list {
  display: flex;
  flex-direction: row;
  font-size: 0.453333rem;
  color: #000;
  height: 1.44rem;
  line-height: 1.44rem;
  padding-left: 0.426667rem;
  border-bottom: 0.026667rem solid #eee;
  background-color: #fff;
  position: relative;
}

.list img {
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.32rem;
  margin-top: 0.293333rem;
}

.icon_more {
  width: 0.8rem;
  height: 0.8rem;
  background-image: url(../assets/img/icon_more.png);
  background-repeat: no-repeat;
  background-size: 0.8rem 0.8rem;
  background-position: center;
  position: absolute;
  right: 0.533333rem;
  top: 0.32rem;
  bottom: 0.32rem;
}

</style>
