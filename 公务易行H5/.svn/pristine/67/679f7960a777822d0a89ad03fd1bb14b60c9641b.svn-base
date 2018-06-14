<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-service='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div v-else class="content">
      <mt-loadmore :top-method="loadTop" ref="loadmore">
        <div class="top-tab">
          <div class="toptab" :class="{active:currentNavtab==idx}" v-for="(itemName,idx) in navTab" @click="switchTab(idx)">{{itemName}}</div>
        </div>
        <div class="order">
          <template v-if="all == ''">
            <div style="text-align:center">
              <img src="../assets/img/order_no.png" class="no_order"></img>
              <div style="color:#424242;font-size:0.426667rem">暂无此类型订单</div>
            </div>
          </template>
          <template v-else>
            <div class="ka" v-for="(all,index) in all" @click="order_more(index)" :class="{nobtn:all.btncode != true}">
              <!--title-->
              <div class="title">
                <span>订单编号：{{all.orderno}}</span>
                <span style="color:#E96B39">{{all.orderstatus}}</span>
              </div>
              <!--详情-->
              <div class="xiang">
                <div class="main">
                  <span>{{all.fromcityname}}</span>
                  <img src="../assets/img/jiantou.png" style="width:1.333333rem;height:0.586667rem;margin:0 0.32rem"></img>
                  <span>{{all.tocityname}}</span>
                </div>
                <span class="price">¥{{all.amountpayable}}</span>
              </div>
              <div class="list">
                <p class="fno">航班：{{all.flightno}}</p>
                <p class="dept">{{all.depttime}}</p>
                <p class="psg">乘机人：{{all.passengername}}</p>
              </div>
              <!--取消 支付 删除-->
              <div class="dian" v-show="all.btncode">
                <div class="qxiao" v-show="all.orderstatus == '已订座待支付'" @click.stop="qx(index)">
                  <span>取消订单</span>
                </div>
                <div class="pay" v-show="all.orderstatus == '已订座待支付' && all.past!= false" @click.stop="pay(index)">
                  <span>去支付</span>
                </div>
                <div @click.stop="schu(index)" class="qxiao" v-show="all.orderstatus == '已支付已完成' || all.orderstatus == '已取消'">
                  <span>删除订单</span>
                </div>
                <div @click.stop="endorse(index)" class="qxiao" v-show="all.orderstatus == '已支付已出票' && all.oneYear">
                  <span>改签</span>
                </div>
                <div @click.stop="refund(index)" class="qxiao" v-show="all.orderstatus == '已支付已出票' && all.oneYear">
                  <span>退票</span>
                </div>
              </div>
              <!-- 下单时间 -->
              <div class="foot">下单时间：{{all.ordertime}}</div>
            </div>
          </template>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>
<script type="text/javascript">
import loading from './loading'
import headTop from './head'
import Register from './register'
import { Toast, MessageBox } from 'mint-ui';
import {
  getStore,
  setStore,
  removeStore,
  checkSts,
  checkErr,
  getFromOrderTime,
  getFromTodayDays
} from '../config/utils'
export default {
  data() {
    return {
      title: "我的订单",
      needLogin: false,
      isLoading: true,
      navTab: ["已完成","待支付", "待出票", "全部"],
      currentNavtab: "0",
      all: [],
      finish_status: false,
      trueHeight: '',
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log(to)
    console.log(from)
    let  toHome = getStore('toHome')
    if(toHome && toHome == 'false'){
      next(true)
    }else {
      if(to.path == '/home' && from.path=='/order'){
        next(true)
      }else{
        next({ path: '/home' })
      }
    }
  },
  activated: function() {
    let that = this;    
    this.trueHeight = getStore('trueHeight');
    this.isLoading = false;
    this.all = [];
    if (getStore('tokenTimeout') == '0') {
      removeStore('tokenTimeout');
      let token = getStore('token')
      let postData = { data: {} };
      that.$http.post(that.url + '/xxx/api/private/checkToken', postData, {
        headers: { "Authorization": token },
      }).then(function(res) {}, function(err) {
        if (err.status == '401' || (
            (err.status == '500') && (err.data.message.indexOf("No user found with username") != -1)
          )) {
          setStore('toHome',false);
          this.$router.push({
            path: '/register'
          })
        return;
        }
      });
    }
    this.more(this);
  },
  components: {
    headTop,
    loading,
    Register
  },
  methods: {
    loadTop() {
      this.more(this);
      this.$refs.loadmore.onTopLoaded();
    },
    switchTab: function(index) {
      console.log(index)
      this.currentNavtab = index;
      var all = JSON.parse(getStore('order')) ? JSON.parse(getStore('order')) : [],
        newAll = [];
      if (index == 1) {
        for (let i = 0; i < all.length; i++) {
          if (all[i].orderstatus == '已订座待支付' && getFromOrderTime(all[i].ordertime)!= false) {
            newAll.push(all[i])
          }
        }
      } else if (index == 2) {
        for (let i = 0; i < all.length; i++) {
          if (all[i].orderstatus == '已支付待出票') {
            newAll.push(all[i])
          }
        }
      } else if (index == 0) {
        for (let i = 0; i < all.length; i++) {
          if (all[i].orderstatus == '已支付已出票' || all[i].orderstatus == '已取消' || all[i].orderstatus == '已改签' || all[i].orderstatus == '已退票') {
            newAll.push(all[i])
          }
        }
      } else {
        newAll = all;
      }
      console.log(newAll)
      this.all = newAll;
      this.currentNavtab = index;
    },
    // 出票
    ticket(index) {
      let that = this;
      var all = that.all[index];
      var postData = {};
      var data = {
        "orderon": all.orderno,
      }
      postData.data = data;
      var token = getStore('token');
      that.$http.post(that.url + '/xxx/api/public/clickToDraw', postData, {
        headers: { "Authorization": token },
      }).then(function(res) {
        console.log(res);
      }, function(err) {
        console.log(err)
      })
    },
    more(that) {
      removeStore('order');
      var all = [];
      var postData = {};
      var data = {};
      postData.data = data;
      this.currentNavtab = '0';
      this.isLoading = true;
      var token = getStore('token');
      that.$http.post(that.url + '/xxx/api/private/queryfindAllTicketOrder', postData, {
        headers: { "Authorization": token },
      }).then(function(res) {
        console.log(res);
        if (checkSts(res, '订单获取失败', that)) {
          this.isLoading = false;
          return;
        }
        var data = res.body.data.ticketOrder;
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            if (data[i].orderstatus == '已订座待支付' || data[i].orderstatus == '已支付已出票' || (data[i].orderstatus == '已支付已完成' || data[i].orderstatus == '已取消')) {
              data[i]["btncode"] = true;
            }else{data[i]["btncode"] = false;}
            data[i]["past"] = getFromOrderTime(data[i].ordertime);
            data[i]["oneYear"] = true;
            if(data[i].ticketdrawingtime !=''){
              let chutime = new Date(data[i].ticketdrawingtime);
              let year = chutime.getFullYear(),mon = chutime.getMonth(),day = chutime.getDate();
              data[i]["oneYear"] = getFromTodayDays(year,mon,day)>365?false:true;
            }
          }
          that.all = data;
          setStore('order', data);
          if (getStore('switchTablist')) {
            that.switchTab(getStore('switchTablist'))
          };
          removeStore('switchTablist');
          that.no_order = false;
        } else {
          setStore('order', [])
        }
        that.isLoading = false;
      }, function(err) {
        console.log(err)
        that.isLoading = false;
        if (checkErr(err, 'home', that)) {
          that.needLogin = true;
        }
      })
    },
    qx(index) {
      var that = this;
      MessageBox.confirm('', {
        message: '您确定要取消订单吗？',
        showCancelButton: true,
        confirmButtonText: '取消订单',
        cancelButtonText: '我再想想'
      }).then(action => {
        if (action == 'confirm') {
          var all = that.all[index];
          var postData = {};
          var data = {
            "orderNo": all.orderno,
          }
          postData.data = data;
          var token = getStore('token');
          that.$http.post(that.url + '/xxx/api/private/civilServantCancelTicketOrder', postData, {
            headers: { "Authorization": token },
          }).then(function(res) {
            console.log(res);
            if (checkSts(res, '订单取消失败', that)) {
              return;
            }
            if (res.body.sts == 1) {
              Toast({
                message: '订单取消成功',
                duration: 5000
              })
              that.all = [];
              that.more(that)
            }
          }, function(err) {
            if (checkErr(res, 'home', that)) {
              this.needLogin = true;
            }
          })
        }
      })
    },
    pay(index) {
      let that = this;
      let title = that.all[index].airrangen;
      setStore('title', title);
      let hangData = that.all[index];
      let orderData = {
        "depttime": hangData.depttime,
        "toairportcode": hangData.toairportcode,
        "depairportcode": hangData.depairportcode,
        "flightno": hangData.flightno,
        "orderno": hangData.orderno,
        "amountpayable": parseInt(hangData.amountpayable),
        "passengername": hangData.passengername,
        "identificationnum": hangData.identificationnum
      };
      setStore('payfresh', true);
      setStore('orderData', orderData)
      setStore('toHome',false);
      that.$router.push({
        path: '/pay'
      })
    },
    schu(index) {
      var that = this;
      MessageBox.confirm('', {
        message: '您确定要删除订单吗？',
        showCancelButton: true,
        confirmButtonText: '删除订单',
        cancelButtonText: '我再想想'
      }).then(action => {
        if (action == 'confirm') {
          var all = that.all[index];
          var postData = {};
          var data = {
            "orderno": all.orderno,
          }
          postData.data = data;
          console.log(postData);
          var token = getStore('token');
          that.$http.post(that.url + '/xxx/api/private/deleteTicketOrderNew', postData, {
            headers: { "Authorization": token },
          }).then(function(res) {
            console.log(res);
            if (checkSts(res, '该订单删除失败', that)) {
              return;
            }
            if (res.body.sts == 1) {
              Toast({
                message: '该订单删除成功',
                duration: 5000
              })
              that.all = [];
              that.more(that)
            }
          }, function(err) {
            if (checkErr(res, 'home', this)) {
              console.log(err)
            }
          });
        }
      })
    },
    // 改签
    endorse(index) {
      var that = this;
      MessageBox.confirm('', {
        message: '您确定要改签吗？',
        showCancelButton: true,
        confirmButtonText: '改签',
        cancelButtonText: '我再想想'
      }).then(action => {
        if (action == 'confirm') {
          var all = that.all[index];
          var postData = {};
          var data = {
            "orderno": all.orderno,
          }
          postData.data = data;
          console.log(postData);
          var token = getStore('token');
          that.$http.post(that.url + '/xxx/api/private/endorseTicketOrder', postData, {
            headers: { "Authorization": token },
          }).then(function(res) {
            console.log(res);
            if (checkSts(res, '该订单改签失败', that)) {
              return;
            }
            if (res.body.sts == 1) {
              Toast({
                message: '该订单改签中',
                duration: 5000
              })
              that.all = [];
              that.more(that)
            }
          }, function(err) {
            if (checkErr(res, 'home', this)) {
              console.log(err)
            }
          });
        }
      })
    },
    // 退票
    refund(index) {
      var that = this;
      MessageBox.confirm('', {
        message: '您确定要退票吗？',
        showCancelButton: true,
        confirmButtonText: '退票',
        cancelButtonText: '我再想想'
      }).then(action => {
        if (action == 'confirm') {
          var all = that.all[index];
          var postData = {};
          var data = {
            "orderno": all.orderno,
          }
          postData.data = data;
          console.log(postData);
          var token = getStore('token');
          that.$http.post(that.url + '/xxx/api/private/refundTicketOrder', postData, {
            headers: { "Authorization": token },
          }).then(function(res) {
            console.log(res);
            if (checkSts(res, '订单退票失败', that)) {
              return;
            }
            if (res.body.sts == 1) {
              Toast({
                message: '订单退票中',
                duration: 5000
              })
              that.all = [];
              that.more(that)
            }
          }, function(err) {
            if (checkErr(res, 'home', this)) {
              console.log(err)
            }
          });
        }
      })
    },
    order_more(index) {
      setStore('order_more', this.all[index]);
      setStore('toHome',false);
      this.$router.push({
        path: '/orderMore'
      })
    }
  },
}

</script>
<style scoped>
.container {
  margin-top: 1.173333rem;
  background: #eee;
}

.top-tab {
  width: 100%;
  height: 1.306667rem;
  background: #fff;
  color: #666;
  font-size: 0.426667rem;
  line-height: 1.306667rem;
  z-index: 9998;
  display: flex;
  position: fixed;
  flex-direction: row;
}

.toptab {
  width: 25%;
  text-align: center;
}

.active {
  color: #333;
  border-bottom: solid 0.08rem #E96B39;
}

.order {
  height: 15.306667rem;
  overflow-y: scroll;
  background-color: #eee;
  padding-top: 1.306667rem;
}

.ka {
  padding-top: 0.12rem;
  padding-bottom: 0.16rem;
  margin: 0 auto;
  margin-top: 0.533333rem;
  width: 9.92rem;
  background: url(../assets/img/ka.png);
  background-repeat: round;
  background-size: 100% auto;
}
.ka.nobtn{
  background: url(../assets/img/ka_nobtn.png);
  background-repeat: round;
  background-size: 100% auto;
}
.title {
  font-size: 0.373333rem;
  color: #666;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 1.066667rem;
  line-height: 1.066667rem;
  padding: 0 0.653333rem;
  padding-bottom: 0.266667rem;
  /*border-bottom: 0.013333rem solid #eee;*/
}

.xiang {
  margin: 0 0.4rem 0 0.666667rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 0.653333rem;
  margin: 0.32rem 0 0.4rem;
  height: 0.586667rem;
  line-height: 0.586667rem;
}

.xiang .main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 0.613333rem;
  color: #333;
  margin-bottom: 0.4rem;
}

.xiang .price {
  font-size: 0.533333rem;
  color: #000;
}

.list {
  padding: 0 0.653333rem;
  margin-bottom: 0.533333rem;
}

.list p {
  height: 0.373333rem;
  font-size: 0.32rem;
  color: #666;
  padding-left: 0.533333rem;
  background-size: 0.266667rem 0.266667rem;
}

.fno {
  background: url(../assets/img/fno.png)no-repeat left;
}

.dept {
  background: url(../assets/img/dept.png)no-repeat left;
}

.psg {
  background: url(../assets/img/psg.png)no-repeat left;
}

.dian {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.373333rem;
  padding-left: 0.653333rem;
  margin-right: 0.653333rem;
  padding-bottom: 0.386667rem;
}

.dian span {
  display: inline-block;
  height: 0.8rem;
  line-height: 0.8rem;
  width: 2.053333rem;
  text-align: center;
}

.qxiao span {
  margin-left: 0.8rem;
  color: #999;
  background: url(../assets/img/order_qx.png)no-repeat;
  background-size: 2.053333rem 0.8rem;
}

.pay {
  margin-left: 0.8rem;
  height: 0.8rem;
  line-height: 0.8rem;
  width: 1.866667rem;
  color: #fff;
}

.pay span {
  font-size: 0.4rem;
  background: url(../assets/img/order_pay.png)no-repeat;
  background-size: 2.053333rem 0.8rem;
}

.tu {
  width: 2.506667rem;
  height: 2.16rem;
  position: absolute;
  top: 0.96rem;
  right: 1.946667rem;
}

.no_order {
  height: 2.666667rem;
  width: 4.8rem;
  margin-top: 1.6rem;
  margin-bottom: 1.333333rem;
}

.foot {
  font-size: 0.32rem;
  color: #666;
  height: 0.8rem;
  line-height: 0.8rem;
  margin-left: 0.533333rem;
}

</style>
