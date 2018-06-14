<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-service='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content" v-else>
      <mt-loadmore :top-method="loadTop" ref="loadmore">
        <div class="main" style="">
          <div class="total">
            <p class="row"><span>{{all.orderstatus}}</span><span>¥{{all.amountpayable}}</span></p>
            <p class="row"><span>订单编号：{{all.orderno}}</span><span @click="detailVisible = !detailVisible">总额明细</span></p>
            <p v-show="all.orderstatus == '已订座待支付'">{{btnCode != false?hint:hint}}</p>
            <!-- 按钮 -->
            <div class="dian" v-show="all.orderstatus == '已订座待支付' || all.orderstatus == '已支付已出票'">
              <div class="qxiao" v-show="all.orderstatus == '已订座待支付'" @click.stop="btn(0)">
                <span>取消订单</span>
              </div>
              <div class="pay" v-show="all.orderstatus == '已订座待支付' && btnCode!= false" @click.stop="btn(1)">
                <span>去支付</span>
              </div>
              <div @click.stop="btn(3)" class="qxiao" v-show="all.orderstatus == '已支付已出票' && order_more.oneYear">
                <span>改签</span>
              </div>
              <div @click.stop="btn(2)" class="qxiao" v-show="all.orderstatus == '已支付已出票' && order_more.oneYear">
                <span>退票</span>
              </div>
            </div>
          </div>
          <Card :card="hang" style="margin-top:0.4rem;"></Card>
          <!--乘机人-->
          <div class="passenger list">
            <div v-for="(psg,index) in passenger" class="row">
              <div class="vertical">乘机人{{index+1}}</div>
              <div class="col psg">
                <div class="psg_detail">
                  <p><span class="first_span">{{psg.pnm}}</span><span>{{psg.type}}</span></p>
                  <p><span class="first_span">{{psg.itp}}</span><span>{{psg.ino}}</span></p>
                </div>
              </div>
            </div>
          </div>
          <!--联系人-->
          <div class="list">
            <div class="vertical">联系人</div>
            <div class="psg_detail link">
              <p>{{linker.lk}}</p>
              <p>{{linker.lkt}}</p>
            </div>
          </div>
          <!--保险-->
          <div class="list bao" v-show="inu == '1'">
            <div class="vertical">附加产品</div>
            <p class="psg_detail">
              <p>
                <span style="margin-right:0.4rem;">{{inn}}</span>
                <span>{{pricePeople}}份</span>
              </p>
            </p>
          </div>
        </div>
        <!--报销凭证-->
        <div class="list refund">
          <div class="delivery row">
            <div class="vertical">凭证类型</div>
            <div>{{bao_order.stype}}</div>
          </div>
          <div v-show="bao_order.dtp">
            <div class="address">配送地址</div>
            <div class="psg_detail" style="float:left;width:6.746667rem;">
              <p>{{bao_order.dlinker}}</p>
              <p>{{bao_order.dlinktel}}</p>
              <p style="word-break:break-all;">{{bao_order.address}}</p>
            </div>
          </div>
        </div>
        <!-- 预定时间 -->
        <div class="list bao">
          <div class="vertical">预定时间</div>
          <div>{{all.ordertime}}</div>
        </div>
        <!-- 积分返点 -->
        <div class="point" v-show="points.length > 0 ">
          <div class="point_title">积分返点<span>+{{point_num * pricePeople}}积分</span></div>
          <div>
            <div class="point_list row" v-for="(value,index) in points">
              <p class="row"><span>{{value.point_source}}</span><span v-show="true">×{{pricePeople}}人</span></p>
              <span><span style="color:#e94b31;">{{value.generate_point}}</span>积分</span>
            </div>
          </div>
        </div>
        <div class="model" v-show="detailVisible" @click="detailVisible = false"></div>
        <div v-show="detailVisible" :class="{pop:detailVisible}" class="detail">
          <div class="totals">
            <!--           <div style="height:1.066667rem;line-height:1.066667rem;border-bottom:0.026667rem solid #eee">
            <span>{{hang.fno}}</span>
            <span style="margin: 0 0.266667rem;">{{hang.can}}</span>
          </div> -->
            <div style="color:#000;height:1.493333rem;line-height:0.746667rem;border-bottom:0.026667rem solid #eee;">
              <div class="hang">
                <div class="row hang_left">
                  <span>成人票</span>
                  <span class="redW">¥{{suggest_price}}</span>
                </div>
                <div style="color:#424242;">×{{pricePeople}}人</div>
              </div>
              <div class="hang">
                <div class="row hang_left">
                  <span>机建+燃油</span>
                  <span class="redW">¥{{ptax}}</span>
                </div>
                <div style="color:#424242;">×{{pricePeople}}人</div>
              </div>
            </div>
            <div style="color:#000;padding-bottom: 0.266667rem;">
              <div class="hang" style="line-height:0.8rem;" v-show="inu == '1'">
                <div class="row hang_left">
                  <span>{{inn}}</span>
                  <span class="redW">¥{{ipr}}</span>
                </div>
                <div style="color:#424242;">{{pricePeople}}份</div>
              </div>
              <div class="hang" style="margin-top:0.133333rem;">
                <div class="row hang_left">
                  <span>配送费</span>
                  <span class="redW">{{ipr == '0'?'¥20':'包邮'}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </mt-loadmore>
    </div>
  </div>
  </div>
</template>
<script type="text/javascript">
import loading from './loading'
import headTop from './head'
import Card from './card'
import { Toast, MessageBox } from 'mint-ui'
import {
  getStore,
  setStore,
  removeStore,
  getFromOrderTime,
  addZero,
  checkSts
} from '../config/utils'
export default {
  data() {
    return {
      title: '订单详情',
      isLoading: true,
      all: {},
      linker: {},
      hang: {},
      passenger: [],
      inu: '',
      inn: '',
      ipr: '',
      bao_order: {},
      hint: '为保证顺利出票，请尽快完成支付',
      detailVisible: false,
      btnCode: true,
      pricePeople: '1',
      suggest_price: '',
      ptax: '',
      trueHeight: '',
      points: [],
      point_num: 0
    }
  },
  activated: function() {
    this.trueHeight = getStore('trueHeight');
    this.detailVisible = false;
    this.isLoading = false;
    var order_more = JSON.parse(getStore('order_more'));
    this.order_more = order_more;
    var that = this;
    that.orderno = order_more.orderno;
    that.orderMore(order_more.orderno, that);
  },
  components: {
    headTop,
    loading,
    Card
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.timer)
    next()
  },
  methods: {
    loadTop() {
      var order_more = JSON.parse(getStore('order_more'));
      this.orderMore(order_more.orderno, this);
      this.$refs.loadmore.onTopLoaded();
    },
    btn(index) {
      let token = getStore('token'),
        that = this;
      let orderNo = that.orderno;
      if (index == 0) {
        // 取消
        that.qx(orderNo)
      } else if (index == 1) {
        // 支付
        that.pay(orderNo)
      } else if (index == 2) {
        // 退票
        MessageBox.confirm('', {
          message: '您确定要退票吗？',
          showCancelButton: true,
          confirmButtonText: '退票',
          cancelButtonText: '我再想想'
        }).then(action => {
          if (action == 'confirm') {
            let postData = {
              data: {
                "orderno": orderNo
              }
            }
            that.$http.post(that.url + '/xxx/api/private/refundTicketOrder', postData, {
              headers: { "Authorization": token },
            }).then(function(res) {
              console.log(res);
              if (checkSts(res, '该订单退票失败', that)) {
                return;
              }
              if (res.body.sts == 1) {
                Toast({
                  message: '该订单正在退票中',
                  duration: 5000
                })
                that.orderMore(orderNo, that)
              }
            }, function(err) {
              console.log(err)
            })
          }
        })


      } else if (index == 3) {
        // 改签
        MessageBox.confirm('', {
          message: '您确定要改签订单吗？',
          showCancelButton: true,
          confirmButtonText: '改签',
          cancelButtonText: '我再想想'
        }).then(action => {
          if (action == 'confirm') {
            let postData = {
              data: {
                "orderno": orderNo
              }
            }
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
                that.orderMore(orderNo, that)
              }
            }, function(err) {
              console.log(err)
            })
          }
        })

      }
    },
    orderMore(orderno, that) {
      let token = getStore('token');
      var postData = {};
      var data = {
        "orderNo": orderno,
      }
      that.isLoading = true;
      postData.data = data;
      that.$http.post(that.url + '/xxx/api/private/getTicketOrderDetail', postData, {
        headers: { "Authorization": token },
      }).then(function(res) {
        console.log(res);
        var data = res.body.data;
        console.log(data);
        // 航班信息
        var ticketData = data.ticketOrder;
        if (ticketData.orderstatus == '已订座待支付') {
          // 30分钟倒计时
          let fromtime = getFromOrderTime(ticketData.ordertime);
          if (fromtime != false) {
            var countdown = parseInt(fromtime.split(':')[0]) * 60 + parseInt(fromtime.split(':')[1]);
          } else { var countdown = 0; }
          console.log(countdown);
          var timer = setInterval(function() {
            let time = getFromOrderTime(ticketData.ordertime);
            that.btnCode = time;
            if (time != false) {
              that.hint = '为保证顺利出票，请尽快在' + time + '内完成支付';
              countdown--;
            } else {
              that.hint = '未在规定时间内完成支付，该订单已取消!';
              clearInterval(timer)
              return;
            }
          }, 1000)
        }
        that.timer = timer;
        // 积分
        let points = data.pointDetail;
        if (points.length > 0) {
          let arr = points;
          var len = arr.length;
          var result = []
          for (var k = 0; k < len; k++) {
            var flag = true;
            for (var n = k; n < arr.length - 1; n++) {
              if (arr[k].type == arr[n + 1].type) {
                flag = false;
                break;
              }
            }
            if (flag) {
              result.push(arr[k])
            }
          }
          let num = 0;
          for (var s = 0; s < result.length; s++) {
            num += parseInt(result[s].generate_point);
          }
          that.point_num = num;
          that.points = result;
        } else {
          that.points = []
        }

        let ymonDay = ticketData.depttime.split(' ')[0];
        let date = new Date(ymonDay);
        let weekArray = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        let monDay = ymonDay.split('-')[0] + '年' + ymonDay.split('-')[1] + '月' + ymonDay.split('-')[2] + '日';
        // 死数据
        let ineModInfo = data.planeModInfo;
        let tuidata = ticketData.regulation.rgas;
        console.log(tuidata)
        let refundArr = that.tuiData(that, tuidata, data.ticketOrderPasserger[0].suggest_price);
        console.log(refundArr)
        let hang = {
          monDay: monDay,
          week: weekArray[date.getDay()],
          awy_code: ticketData.flcode,
          awy: ticketData.flname,
          fno: ticketData.flightno,
          det: ticketData.depttime.split(' ')[1],
          dpc: ticketData.depairportname.replace("机场", ""),
          dtm: ticketData.fromterminal,
          atm: ticketData.toterminal,
          arc: ticketData.toairportname.replace("机场", ""),
          art: ticketData.todatetime,
          pmd: ticketData.planetype,
          man: ticketData.mealname,
          frt: ticketData.flirate * 100,
          cabinname: ticketData.cabinname,
          cab: ticketData.cabin,
          pmn: ineModInfo.pmn,
          pmd: ineModInfo.pmd,
          pmt: ineModInfo.pmt,
          pmurl: ineModInfo.pmurl,
          vepmd: ineModInfo.vepmd,
          hour: addZero(ticketData.flytime.split(':')[0]),
          min: addZero(ticketData.flytime.split(':')[1]),
          from: 'ordermore',
          tui_more:false,
          refundArr: refundArr,
          imgcan:res.body.data.civilmodel
        }
        this.hang = hang;
        var pif = data.ticketOrderPasserger,
          idcardtype, newNum;
        console.log(pif)
        var passenger = [];
        this.pricePeople = pif.length;
        for (var i = 0; i < pif.length; i++) {
          newNum = pif[i].identification_num;
          idcardtype = '身份证';
          if (pif[i].identification_type == '1') {
            let oldidcard = pif[i].identification_num;
            let matches_0 = oldidcard.substring(0, 6);
            let matches_2 = oldidcard.substring(14);
            var newNum = matches_0 + ' ' + '********' + ' ' + matches_2;
          } else if (pif[i].identification_type == '3') {
            idcardtype = '护照';
          }
          passenger[i] = {
            itp: idcardtype,
            pnm: pif[i].passenger_name,
            ino: newNum,
            type: pif[i].official_card.replace('中国', ''),
          }
        }
        //保险份数，价格
        this.inu = pif[0].insurance_num;
        this.ipr = pif[0].insur_amount;
        // 保险
        this.inn = pif[0].insur_amount == 40 ? '航意险40元' : '航意险80元';
        let yunf = pif[0].insur_amount == 0 ? 20 : 0;
        let ptax = pif[0].ptax; /*基建*/
        let suggest_price = parseInt(pif[0].suggest_price); /*单价*/
        this.ptax = ptax;
        this.suggest_price = suggest_price;
        this.passenger = passenger;
        // 联系人人
        var linker = [];
        linker = {
          lk: ticketData.linkname,
          lkt: ticketData.linktel,
        }
        this.linker = linker;
        //  退改签

        //  报销状态
        var bao_order = [];
        if (ticketData.deliveryaddress != '') {
          bao_order = {
            dlinker: ticketData.deliverylinker,
            dlinktel: ticketData.deliverylinktel,
            dtp: true,
            stype: '行程单+保险发票+刷卡小票',
            address: ticketData.deliveryaddress
          }
        } else {
          bao_order = {
            dtp: false,
            stype: '不需要'
          }
        }
        this.bao_order = bao_order;
        this.all = data.ticketOrder;
        this.isLoading = false;
      }, function(err) {

      })
    },
    // 取消
    qx(orderNo) {
      var that = this;
      MessageBox.confirm('', {
        message: '您确定要取消订单吗？',
        showCancelButton: true,
        confirmButtonText: '取消订单',
        cancelButtonText: '我再想想'
      }).then(action => {
        if (action == 'confirm') {
          var postData = {};
          var data = {
            "orderNo": orderNo,
          }
          postData.data = data;
          var token = getStore('token');
          that.$http.post(that.url + '/xxx/api/private/civilServantCancelTicketOrder', postData, {
            headers: { "Authorization": token },
          }).then(function(res) {
            console.log(res);
            if (checkSts(res, '该订单取消失败', that)) {
              return;
            }
            if (res.body.sts == 1) {
              Toast({
                message: '该订单取消成功',
                duration: 5000
              })
              that.orderMore(orderNo, that)
            }
          }, function(err) {
            console.log(err)
          })
        }
      })
    },
    // 支付
    pay() {
      let that = this;
      let title = that.all.airrangen;
      setStore('title', title);
      let hangData = that.all;
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
      that.$router.push({
        path: '/pay'
      })
    },
    // 退改签数据
    tuiData(that, data, stp) {
      console.log(stp)
      var arr = [];
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].regulationName.indexOf('退票'))
        if (data[0].regulationName.indexOf('退票规定') == 0) {

          let newData = data[0].regulationItems;
          for (let j = 0; j < newData.length; j++) {
            newData[j].itemValue = newData[j].itemValue.replace("%", "")
            newData[j].itemPrice = parseInt(stp * parseInt(newData[j].itemValue) / 100)
          }
          arr[0] = newData;
        } else {
          arr[0] = ''
        }
        if (data[1].regulationName.indexOf('改签规定') == 0) {
          let newData = data[1].regulationItems;
          for (let j = 0; j < newData.length; j++) {
            newData[j].itemValue = newData[j].itemValue.replace("%", "");
            newData[j].itemPrice = parseInt(stp * parseInt(newData[j].itemValue) / 100)
          }
          arr[1] = newData;
        } else {
          arr[1] = ''
        }
      }
      return arr;
      console.log(arr)
    },
  },
  watch: {
    btnCode: function(value) {
      // console.log(value)
      if (value == false) {
        if (this.all.orderstatus == '已订座待支付') {
          var postData = {};
          var data = {
            "orderNo": this.all.orderno,
          }
          postData.data = data;
          var token = getStore('token');
          this.$http.post(this.url + '/xxx/api/private/civilServantCancelTicketOrder', postData, {
            headers: { "Authorization": token },
          }).then(function(res) {
            console.log(res);
            if (checkSts(res, '该订单取消失败', this)) {
              return;
            }
            if (res.body.sts == 1) {
              this.orderMore(this.all.orderno, this)
            }
          }, function(err) {
            console.log(err)
          })
        }
      }
    }
  }
}

</script>
<style scoped>
.content {
  padding: 0 0.066667rem;
  background-color: #f8ebc8;
  background-image: url(../assets/img/dingdan_bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  padding-bottom: 0.533333rem;
  margin-top: 1.173333rem;
}

.main {
  padding-top: 0.453333rem;
}

.total {
  width: 8.533333rem;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 0.266667rem;
  padding: 0.266667rem 0.533333rem;
  padding-bottom: 0.426667rem;
}

.total p:nth-of-type(1) {
  font-size: 0.533333rem;
  color: #333;
}

.total p:nth-of-type(1) span:nth-of-type(2) {
  color: #e13426;
  font-size: 0.56rem;
}

.total p:nth-of-type(2) {
  font-size: 0.373333rem;
  color: #666;
  margin: 0.266667rem 0;
}

.total p:nth-of-type(2) span:nth-of-type(2) {
  color: #666;
  font-size: 0.346667rem;
}

.total p:nth-of-type(3) {
  font-size: 0.32rem;
  color: #e96b39;
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
  margin-top: 0.533333rem;
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

.list {
  display: flex;
  flex-direction: row;
  font-size: 0.426667rem;
  background-color: #fff;
  color: #333;
  border-radius: 0.266667rem;
  padding: 0 0.32rem;
  width: 8.853333rem;
  margin: 0 auto;
  margin-top: 0.4rem;
}

.passenger {
  flex-direction: column;
  width: 9.6rem;
  padding: 0;
}

.passenger .row {
  justify-content: initial;
  background:url(../assets/img/more_line.png)no-repeat bottom center;
  background-size: 90% auto;
  padding: 0 0.533333rem;
}

.passenger .row:nth-last-of-type(1) {
  background: none;
}

.vertical {
  font-size: 0.32rem;
  color: #666;
  min-width: 1.333333rem;
  text-align: center;
  margin-right: 0.4rem;
}

.vertical::after {
  display: inline-block;
  width: 0;
  height: 100%;
  vertical-align: middle;
  content: "";
}

.psg_detail p {
  margin: 0.4rem 0;
}

.psg_detail .first_span {
  min-width: 1.066667rem;
  margin-right: 0.666667rem;
  display: inline-block;
}

.psg .psg_detail p:nth-of-type(2) {
  color: #333;
}

.bao {
  height: 1.066667rem;
  line-height: 1.066667rem;
}

.refund {
  display: flex;
  flex-direction: column;
}

.refund .list {
  padding: 0;
  margin: 0 auto;
}

.delivery {
  height: 1.066667rem;
  line-height: 1.066667rem;
  border-bottom: 0.013333rem solid #eee;
  justify-content: initial;
}

.address {
  font-size: 0.32rem;
  min-width: 1.333333rem;
  text-align: center;
  margin-right: 0.4rem;
  margin-top: 0.4rem;
  display: inline-block;
  float: left;
}

.point {
  font-size: 0.426667rem;
  background-color: #fff;
  color: #333;
  border-radius: 0.266667rem;
  padding: 0 0.32rem;
  width: 8.853333rem;
  margin: 0 auto;
  margin-top: 0.4rem;
}

.point_title {
  font-size: 0.32rem;
  color: #666;
  height: 1.066667rem;
  line-height: 1.066667rem;
  border-bottom: 0.013333rem solid #e5e5e5;
}

.point_title span {
  color: #333;
  font-size: 0.426667rem;
  margin-left: 0.64rem;
}

.point_list {
  height: 0.8rem;
  line-height: 0.8rem;
  justify-content: space-between;
  color: #666;
  font-size: 0.32rem;
}

.point_list p:nth-of-type(1) {
  width: 60%;
}

.pop {
  position: fixed;
  background: #fff;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: .2s ease-out;
  transition: .2s ease-out;
  top: 1.173333rem;
  right: auto;
  bottom: auto;
  left: 50%;
  -webkit-transform: translate3d(-50%, 0, 0);
  transform: translate3d(-50%, 0, 0);
}

.totals {
  color: #424242;
  font-size: 0.4rem;
  padding: 0 0.533333rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 8.933333rem;
  padding-top: 0.4rem;
}

.hang {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.hang .hang_left {
  width: 80%;
}

.xian {
  height: 0.8rem;
  line-height: 0.8rem;
  background-color: #f2f2f2;
  font-size: 0.32rem;
  padding-left: 0.293333rem;
  margin-top: 0.4rem;
  color: #828282;
}

.xian span {
  margin-right: 0.293333rem;
}

.redW {
  color: #e55233;
  width: 28%;
}

.model {
  position: fixed;
  left: 0;
  top: 1.173333rem;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
}

</style>
