<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content">
      <div class="people">
        <!-- 姓名 -->
        <div class="list">
          <span>姓名</span>
          <mt-field placeholder="请输入持卡人姓名" v-model="name" @input="bindInput(name,'name')" @change="checkinput(name,'name','name_err')" @focus="focus"></mt-field>
        </div>
        <div class="list">
          <span>证件类型</span>
          <span style="text-align:left;margin-left:0">身份证</span>
        </div>
        <!-- 身份证号码 -->
        <div class="list">
          <span>证件号码</span>
          <mt-field placeholder="请输入持卡人身份证" v-model="idcard" @input="bindInput(idcard,'idcard')" @change="checkinput(idcard,'idcard','idcard_err')" @focus="focus"></mt-field>
        </div>
        <!-- 手机号码 -->
        <div class="list">
          <span>手机号码</span>
          <mt-field placeholder="请输入持卡人手机号码" v-model="phone" @input="bindInput(phone,'phone')" @change="checkinput(phone,'phone','phone_err')" @focus="focus"></mt-field>
        </div>
      </div>
      <div class="bankcard">
        <!-- 银行 -->
        <div class="bankname">
          <span>银行</span>
          <span class="bname" :class="{mode:inport}" @click="bank()">{{bankName}}</span>
          <span>|</span>
          <span>信用卡</span>
        </div>
        <!-- 卡号 -->
        <div class="list">
          <span>卡号</span>
          <mt-field placeholder="请输入支付银行卡卡号" v-model="banknum" @input="bindInput(banknum,'banknum')" @change="checkinput(banknum,'banknum','banknum_err')" @focus="focus"></mt-field>
        </div>
        <!-- 有效期 -->
        <div class="list">
          <span>有效期</span>
          <input type="text" placeholder="如09" class="mon" v-model='mon' @focus="focus"  @input="bindInput()">
          <span>月</span>
          <input type="text" placeholder="22" class="year" v-model="year" @focus="focus"  @input="bindInput()">
          <span>年</span>
        </div>
      </div>
      <p class="default" :class="{checked:change&& check,check:change&& !check,}" @click="defaultChange()">{{change?'设为默认':'默认'}}</p>
      <div class="pay">
        <button @click="pay(name,phone,idcard,bankName,banknum,mon,year)">确认支付</button>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import headTop from './head'
import loading from './loading'
import { Toast, MessageBox } from 'mint-ui';
import bankGroup from '../assets/creditBank.json'
import {
  getStore,
  setStore,
  removeStore,
  checkInput,
  phoneFormat,
  addZero
} from '../config/utils'
export default {
  data() {
    return {
      isLoading: false,
      title: '支付',
      name: '',
      phone: '',
      idcard: '',
      banknum: '',
      inport: false,
      mon: '',
      year: '',
      bankName: '支付卡所属银行',
      urlStr: '',
      change: false,
      check: false,
      trueHeight: ''
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log(to)
    console.log(from)
    if (to.path === '/dingdan') {
      next({ path: '/order' })
    } else {
      next(true)
    }
  },
  mounted(){
    this.firstFresh =false;
  },

  activated: function() {
    this.trueHeight = getStore('trueHeight');
    let that = this;
    let bank = JSON.parse(getStore('checkCreditBank'));
    let bankcode = getStore('checkCreditBankCode');
    removeStore('checkCreditBank')
    removeStore('checkCreditBankCode')
    this.banks = bank;
    if (bankcode == 'true') {
      this.bankName = bank.bankname;
      this.inport = true;
    }
    let payfresh = getStore('payfresh');
    that.firstFresh = getStore('payfresh');
    removeStore('payfresh');
    if (payfresh) {
      that.getData();
    };
  },
  components: {
    headTop,
    loading
  },
  methods: {
    defaultChange() {
      if (this.change == true) {
        this.check = !this.check
      }
    },
    loaded() {
      const vm = this.urlStr
    },
    bank() {
      this.$router.push({
        path: '/creditBank'
      })
    },
    focus() {
    this.firstFresh =false;
      console.log("聚焦")
    },
    getData() {
      let that = this;
      let token = getStore('token');
      let postData = { data: {} }
      that.$http.post(that.url + '/xxx/api/private/queryOrderDefaultSetting', postData, {
        headers: { "Authorization": token },
      }).then(function(res) {
          console.log(res.body.sts)
          console.log(res.body.data)
          if (res.body.data.ord.name != '') {
            that.change = false;
            that.check = true;
          } else {
            that.change = true;
            that.check = true;
            return;
          }
          let getOneData = res.body.data.ord;
          getOneData["passengers"] = {
            "passenger": res.body.data.paslist
          }
          setStore('oneclickData', getOneData);
          let oneclickData = res.body.data.ord;
          // 支付
          that.name = oneclickData.name;
          that.phone = oneclickData.phone;
          that.idcard = oneclickData.idcard;
          that.banknum = oneclickData.bank_num;
          that.bankcode = oneclickData.bank_code;
          that.bankName = oneclickData.bank_name ? oneclickData.bank_name : '支付卡所属银行';
          that.inport = oneclickData.bank_name ? true : false;
          that.mon = oneclickData.mon;
          that.year = oneclickData.year;
        },function(err) {
          console.log(err)
          this.firstFresh =false;
        });
    },
    setData(payData) {
      let that = this;
      let data = JSON.parse(getStore("oneclickData"));
      data["bank_num"] = payData.bank_num;
      data["bank_name"] = payData.bank_name;
      data["bank_code"] = payData.bank_code;
      data["mon"] = payData.mon;
      data["year"] = payData.year;
      data["name"] = payData.name;
      data["idcard"] = payData.idcard;
      data["phone"] = payData.phone;
      let postData = {
        "data": data
      };
      console.log(postData);
      let token = getStore('token');
      that.$http.post(that.url + '/xxx/api/private/addOrderDefaultSetting', postData, {
        headers: { "Authorization": token },
      }).then(function(res) {
        console.log(res)
      }, function(err) {
        console.log(err)
      })
      // end
    },
    pay(name, phone, idcard, bankName, banknum, mon, year) {
      var that = this;
      console.log(phone)
      if (!(checkInput(name, 'name') && checkInput(phone, 'phone') && checkInput(idcard, 'idcard'))) {
        Toast({
          message: '请完整填写持卡人信息',
          duration: 2000
        })
        return;
      }
      if (bankName == '支付卡所属银行' || mon.length != 2 || year.length != 2) {
        Toast({
          message: '请完整填写银行信息',
          duration: 2000
        })
        return;
      }
      let data = [
        banknum.replace(/\s+/g, ""),
        mon + '' + year,
        name,
        idcard.replace(/\s+/g, ""),
        phone.replace(/\s+/g, ""),
      ]
      setStore('outInputData', data);
      var date = new Date();
      let title = getStore("title");
      let orderData = JSON.parse(getStore('orderData'));
      console.log(orderData)
      let tbDepTime = orderData.depttime.replace(/-/g, '').replace(/\s/g, "").replace(/:/, '');
      console.log(tbDepTime)
      var date = new Date();
      let orderTime = '' + date.getFullYear() + addZero(date.getMonth() + 1) + addZero(date.getDate()) + addZero(date.getHours()) + addZero(date.getMinutes()) + addZero(date.getSeconds());
      console.log(orderTime)
      for (var k = bankGroup.length - 1; k >= 0; k--) {
        let banks = bankGroup[k].banks;
        for (var j = banks.length - 1; j >= 0; j--) {
          if (banks[j].bankname == bankName) {
            var bankcode = banks[j].bankcode;
            break;
          }
        }
      }
      // 保存数据
      if (that.change == true && that.check == true) {
        // 支付
        let payData = {
          "bank_num": that.banknum ? that.banknum.replace(/\s+/g, "") : '',
          "bank_name": that.bankName ? that.bankName : '',
          "bank_code": bankcode,
          "mon": that.mon ? that.mon : '',
          "year": that.year ? that.year : '',
          "name": that.name ? that.name : '',
          "idcard": that.idcard ? that.idcard.replace(/\s+/g, "") : '',
          "phone": that.phone ? that.phone.replace(/\s+/g, "") : '',
        }
        that.setData(payData);
      }
      // return;
      /*风控*/
      var referData = {
        "tbTotPrice": orderData.amountpayable,
        "tbmIdNum": orderData.identificationnum,
        "tbIsSingleTrip": "Y",
        "byrIp": "192.168.1.122",
        "tbArrAirport": orderData.toairportcode,
        "tbmNantionality": "CN",
        "tbmIdType": "00",
        "dhrIdType": "00",
        "tbDepTime": tbDepTime,
        "tbDepAirport": orderData.depairportcode,
        "tbmName": orderData.passengername,
        "dhrPhone": phone.replace(/\s+/g, ""),
        "dhrName": name,
        "payIp": "192.168.1.122",
        "dhrIdNum": idcard.replace(/\s+/g, ""),
        "tbmIsFrequenter": "N",
        "tbTraAirport": "",
        "tbmPhone": phone.replace(/\s+/g, ""),
        "tbFlight": orderData.flightno,
        "tbQuantity": "1"
      }
      console.log(referData)
      /*orderData.orderno,*/
      /*orderData.amountpayable*/
      /*that.banks.bankcode*/
      let signData = {
        "merchantAcctId": "1001555972201",
        "inputCharset": "1",
        "pageUrl": "",
        "bgUrl": "http://120.76.188.46:8071/xxx/api/public/enCodeByCer",
        "version": "mobile1.0",
        "mobileGateway": "phone",
        "language": "1",
        "signType": "4",
        "payerName": "",
        "payerContactType": "",
        "payerContact": "",
        "orderId": orderData.orderno,
        "orderAmount": orderData.amountpayable * 100,
        "orderTime": orderTime,
        "productName": title,
        "productNum": '1',
        "productId": '',
        "productDesc": "",
        "ext1": "",
        "ext2": "",
        "payType": "21-2",
        "bankId": bankcode,
        "redoFlag": "0",
        "pid": "",
        "payerIdType": "",
        "payerId": "",
      }
      let postData = {};
      postData.data = signData;
      console.log(postData)
      console.log(that.banks)
      that.$http.post(that.url + '/xxx/api/public/getPkipair', postData).then(function(res) {
        console.log(res)
        let signMsg = encodeURIComponent(res.body.signMsg);
        let urlStr = "https://www.99bill.com/mobilegateway/recvMerchantInfoAction.htm?inputCharset=1&pageUrl=&bgUrl=http://120.76.188.46:8071/xxx/api/public/enCodeByCer&version=mobile1.0&mobileGateway=phone&language=1&signType=4&signMsg=" + signMsg + "&merchantAcctId=1001555972201&payerName=&payerContactType=&payerContact=&payerIdType=&payerId=&orderId=" + signData.orderId + "&orderAmount=" + signData.orderAmount + "&orderTime=" + signData.orderTime + "&productName=" + encodeURIComponent(signData.productName) + "&productNum=" + signData.productNum + "&productId=&productDesc=&ext1=&ext2=&payType=21-2&bankId=" + signData.bankId + "&redoFlag=0&pid=&referDataType=001_001" + "&referData=" + encodeURIComponent(JSON.stringify(referData));
        console.log(urlStr)
        that.urlStr = urlStr;
        setStore('urlStr', urlStr)
        that.$router.push({
          path: '/pay_kuai'
        })
      }, function(err) {})
    },
    // 校验
    checkinput(value, name, err) {
      console.log(name)
      if (!checkInput(value, name)) {
        let errMessage = '';
        if (name == 'name') {
          errMessage = '请输入正确的中文名'
        } else if (name == 'idcard') {
          errMessage = '请输入正确的身份证号码'
        } else if (name == 'phone') {
          errMessage = '请输入正确的手机号码'
        }
        Toast({
          message: errMessage,
          duration: 2000
        })
      }
    },
    // 输入格式化
    bindInput: function(value, name) {
      console.log(value)
      console.log(this.firstFresh)
      if (this.firstFresh == 'true') {

      } else {
        this.change = true;
      }
      if (!value) return;
      if (name == 'idcard') {
        var idcard = value.toUpperCase().replace(/\s+/g, "");
      } else if (name == 'phone') {
        if (value.replace(/\s+/g, "").length == 11) {
          console.log(12)
          this.phone = phoneFormat(value.replace(/\s+/g, ""));
        }
      }
    },
  },
}

</script>
<style scoped>
.content {
  background: #f8ebc8;
  margin-top: 1.173333rem;
}

.people {
  margin: 0.4rem 0;
  padding-top: 0.4rem;
}

.list {
  background-color: #fff;
  padding: 0 0.533333rem;
  font-size: 0.426667rem;
  color: #000;
  height: 1.493333rem;
  line-height: 1.493333rem;
  border-bottom: 0.013333rem solid #eee;
}

.last {
  background: none;
}


.list * {
  vertical-align: middle;
}

.list span:first-child {
  width: 2.133333rem;
  margin-right: 0.8rem;
  display: inline-block;
  text-align: right;
  font-size: 0.48rem;
  margin-left: -0.266667rem;
}

.list .mint-cell {
  display: inline-block;
  color: #999;
  width: 5.333333rem;
}

.list .mint-cell-wrapper {
  font-size: 0.48rem;
}

.bankname {
  height: 1.493333rem;
  line-height: 1.493333rem;
  background-color: #fff;
  border-bottom: 0.013333rem solid #eee;
  padding: 0 0.533333rem;
  font-size: 0.426667rem;
  color: #000;
}

.bankname span:nth-of-type(1) {
  width: 2.133333rem;
  margin-right: 0.8rem;
  display: inline-block;
  text-align: right;
  margin-left: -0.266667rem;
}

.bankname span:nth-of-type(3) {
  margin: 0 0.533333rem;
}

.bname {
  color: #666;
}

.bname.mode {
  color: #000;
}

.mon,
.year {
  color: #666;
  width: 1.066667rem;
  color: #000;
  font-size: 0.426667rem;
}

.year {
  margin-left: 0.533333rem;
}

.pay {
  text-align: center;
}

.err {
  text-align: center;
  color: red;
  height: 0.4rem;
  line-height: 0.4rem;
  font-size: 0.4rem;
  padding: 0.133333rem 0;
}

button {
  margin-top: 0.96rem;
  width: 8.773333rem;
  height: 1.44rem;
  border: 0;
  background: url(../assets/img/edit_login.png)no-repeat 0 0.08rem;
  background-size: 100% auto;
  color: #fff;
  font-size: 0.533333rem;
}

.default {
  float: right;
  color: #666;
  padding-left: 0.773333rem;
  font-size: 0.373333rem;
  display: inline-block;
  margin: 0.533333rem;
}

.default.checked {
  background-image: url(../assets/img/default_checked.png);
  background-size: 0.64rem 0.64rem;
  background-position: left center;
  background-repeat: no-repeat;
}

.default.check {
  background-image: url(../assets/img/default_check.png);
  background-size: 0.64rem 0.64rem;
  background-position: left center;
  background-repeat: no-repeat;
}

</style>
