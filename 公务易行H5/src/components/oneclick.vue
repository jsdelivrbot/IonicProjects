<template>
  <div class="container">
    <head-top :title="title" go-back='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content">
      <div class="form">
        <div class="form_content">
          <div class="passenger">
            <p class="passenger_title">乘机人&nbsp;&nbsp;&nbsp;<span>成人{{pricePeople}}人</span></p>
            <div v-show="pricePeople != 0" class="psg col" v-for="(value,index) in selectedPassengers">
              <p>
                <span>{{value.pagType =='3'?value.passenger_ename:value.passenger_name}}</span><span>{{value.official_cardName}}</span>
              </p>
              <p>
                <span>{{value.pagType =='3'?'护照':'身份证'}}</span><span>{{value.pagType =='3'?value.passport_number:value.security_iden_num}}</span>
              </p>
              <i @click="delet(index)"></i>
              <b>{{index + 1}}</b>
            </div>
            <p class="add" @click="add"><span>添加乘机人</span></p>
          </div>
          <div class="lian">
            <p class="passenger_title">联系人</p>
            <div class="list">
              <span>联系人</span>
              <mt-field placeholder="请填写联系人姓名" v-model="lian_name" @input="bindInput(lian_name,'lian_name')" @change="checkinput(lian_name,'lian_name','lian_name_err')" :attr="{ maxlength: 20 }" placeholder-style="color:#828282;"></mt-field>
            </div>
            <div class="list">
              <span>电&nbsp;&nbsp;&nbsp;话</span>
              <mt-field placeholder="请填写联系人电话" v-model="lian_phone" @input="bindInput(lian_phone,'lian_phone')" @change="checkinput(lian_phone,'lian_phone','lian_phone_err')" :attr="{ maxlength: 13 }" placeholder-style="color:#828282;"></mt-field>
            </div>
          </div>
          <!--           <div class="assurance">
            <p class="passenger_title">保险<span style="color:#999;margin-left:0.533333rem;">{{pricePeople}}人x1份</span></p>
            <div class="insurance row" @click="check_bao(index)" v-for="(value,index) in insurances ">
              <i class="img" :class="{check:value.check}"></i>
              <div class="introduce col">
                <p v-show="index != 2"><span>{{value.name}}</span><span>￥{{value.bao_pir}}/人</span></p>
                <p :class="{insuranceNo:index ==2}">{{value.explain}}</p>
              </div>
            </div>
          </div> -->
          <div class="reimbursement">
            <p class="passenger_title">
              <span>报销凭证</span><span class="switch" @click="isSelect =!isSelect" :class="{check:!isSelect}"></span>
            </p>
            <div v-show="isSelect">
              <div class="list">
                <span>凭证类型</span>
                <span>行程单+保险发票+刷卡小票</span>
              </div>
              <div class="list">
                <span>配送方式</span>
                <span>邮递</span>
              </div>
              <div class="list">
                <span>配送时间</span>
                <span>行程结束后7天内送到</span>
              </div>
              <div class="list">
                <span>收&nbsp;件&nbsp;&nbsp;人</span>
                <mt-field placeholder="请填写收件人" v-model="bao_name" @input="bindInput(bao_name,'bao_name')" @change="checkinput(bao_name,'bao_name','bao_name_err')" :attr="{ maxlength: 13 }" placeholder-style="color:#828282;"></mt-field>
              </div>
              <div class="list">
                <span>联系电话</span>
                <mt-field placeholder="请填写11位手机号码" v-model="bao_phone" @input="bindInput(bao_phone,'bao_phone')" @change="checkinput(bao_phone,'bao_phone','bao_phone_err')" :attr="{ maxlength: 13 }" placeholder-style="color:#828282;"></mt-field>
              </div>
              <div class="list">
                <span>所在地区</span>
                <span @click="popupVisible = true">{{addressProvince}}-{{addressCity}}-{{addressXian}}</span>
                <mt-popup v-model="popupVisible" position="bottom" class='ssq'>
                  <div class="popBtns">
                    <button @click="popupVisible = false">取消</button>
                    <span>选择地区</span>
                    <button @click="popupVisible = false">确定</button>
                  </div>
                  <mt-picker :slots="addressSlots" class="picker" @change="onAddressChange" :visible-item-count="5"></mt-picker>
                </mt-popup>
              </div>
              <div class="list">
                <span>详细地址</span>
                <mt-field placeholder="不需要填写省市区" v-model="bao_address" @input="bindInput(bao_address,'bao_address')" @change="checkinput(bao_address,'bao_address','bao_address_err')" :attr="{ maxlength: 40 }" placeholder-style="color:#828282;"></mt-field>
              </div>
            </div>
          </div>
          <div class="reimbursement">
            <p class="passenger_title">
              <span>支付</span>
            </p>
            <div>
              <div class="list">
                <span>姓名</span>
                <mt-field placeholder="请填写持卡人姓名" v-model="name" @input="bindInput(name,'name')" @change="checkinput(name,'name','name_err')" :attr="{ maxlength: 20 }" placeholder-style="color:#828282;"></mt-field>
              </div>
              <div class="list">
                <span>手机号码</span>
                <mt-field placeholder="请填写持卡人手机号码" v-model="phone" @input="bindInput(phone,'phone')" @change="checkinput(phone,'phone','phone_err')" :attr="{ maxlength: 20 }" placeholder-style="color:#828282;"></mt-field>
              </div>
              <div class="list">
                <span>证件类型</span>
                <span>身份证</span>
              </div>
              <div class="list">
                <span>证件号码</span>
                <mt-field placeholder="请填写持卡人证件号码" v-model="idcard" @input="bindInput(idcard,'idcard')" @change="checkinput(idcard,'idcard','idcard_err')" :attr="{ maxlength: 20 }" placeholder-style="color:#828282;"></mt-field>
              </div>
              <div class="bankname">
                <span>银行</span>
                <span class="bname" :class="{mode:inport}" @click="bank()">{{bankName}}</span>
                <span>|</span>
                <span>信用卡</span>
              </div>
              <div class="list">
                <span>卡号</span>
                <mt-field placeholder="请填写持卡人银行卡号" v-model="banknum" @input="bindInput(banknum,'banknum')" @change="checkinput(banknum,'banknum','banknum_err')" :attr="{ maxlength: 20 }" placeholder-style="color:#828282;"></mt-field>
              </div>
              <div class="list">
                <span @click="open('picker1')">有效期</span>
                <!-- <mt-datetime-picker ref="picker1" v-model="value1" type="date" :startDate="startDate" :endDate="endDate">
                </mt-datetime-picker> -->
                <input type="text" placeholder="如09" class="mon" v-model='mon'>
                <span>月</span>
                <input type="text" placeholder="22" class="year" v-model="year">
                <span>年</span>
              </div>
            </div>
          </div>
          <button class="foot" @click="save()">保&nbsp;&nbsp;&nbsp;存</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import loading from './loading'
import headTop from './head'
import Address from '../assets/address.json'
import { Toast, MessageBox } from 'mint-ui'
import bankGroup from '../assets/creditBank.json'
import {
  getStore,
  setStore,
  removeStore,
  checkErr,
  checkSts,
  checkInput,
  phoneFormat,
  toNumber,
} from '../config/utils'
export default {
  data() {
    return {
      // value1:'',
      // value: '',
      // startDate: new Date('1900-01-01'),
      // endDate: new Date(),
      title: '一键下单',
      isLoading: true,
      lian_name: '',
      lian_phone: '',
      bao_name: '',
      bao_phone: '',
      bao_address: '',
      pricePeople: '0',
      selectedPassengers: '',
      inport: false,
      bankName: '支付卡所属银行',
      name: '',
      phone: '',
      idcard: '',
      banknum: '',
      mon: '',
      year: '',
      insurances: [
        { name: '航意险', explain: '80元航空意外保1天最高300万', num: 1, bao_pir: '80', yunf: '0', check: true, },
        { name: '航意险', explain: '40元航空意外保1天最高200万', num: 1, bao_pir: '80', yunf: '0', check: false, },
        { name: '无需保险', explain: '不购买出行保障险', num: 1, bao_pir: '0', yunf: '10', check: false, },
      ],
      isSelect: true,
      popupVisible: false,
      addressSlots: [{
          flex: 1,
          defaultIndex: 0,
          values: Object.keys(Address),
          className: 'slot1',
          textAlign: 'center'
        },
        {
          flex: 1,
          defaultIndex: 0,
          values: [],
          className: 'slot2',
          textAlign: 'center'
        },
        {
          flex: 1,
          values: [],
          defaultIndex: 0,
          className: 'slot3',
          textAlign: 'center'
        }
      ],
      addressProvince: '广东省',
      addressCity: '深圳市',
      addressXian: '南山区',
    }
  },
  activated: function() {
    let that = this;
    let fresh = getStore('onefresh');
    removeStore('onefresh');
    this.isLoading = false;
    let values = Object.keys(Address);
    let shi = Object.keys(Address[values[0]]);
    let xian = Address[values[0]][shi];
    this.addressSlots[1].values = shi;
    this.addressSlots[2].values = xian;
    this.addressProvince = '北京市';
    this.addressCity = shi[0];
    this.addressXian = xian[0];
    // 银行
    let bank = JSON.parse(getStore('checkCreditBank'));
    let bankcode = getStore('checkCreditBankCode');
    removeStore('checkCreditBank')
    removeStore('checkCreditBankCode')
    this.banks = bank;
    if (bankcode == 'true') {
      this.bankName = bank.bankname;
      this.inport = true;
    };
    // 第一次刷新
    if (fresh && fresh == 'true') {
      removeStore('oneclickPassengers')
      this.getData();
    }
    // 乘机人
    var selectedPassengers = JSON.parse(getStore('oneclickPassengers')) ? JSON.parse(getStore('oneclickPassengers')) : [];
    that.selectedPassengers = selectedPassengers;
    that.pricePeople = selectedPassengers.length;
  },
  components: {
    headTop,
    loading
  },
  methods: {
    open(picker) {
        this.$refs[picker].open();
      },
    // 省市区
    onAddressChange(picker, values) {
      if (!this.popupVisible) {
        return;
      }
      let sheng = Object.keys(Address);
      let shi = Object.keys(Address[values[0]]);
      let xian = Address[values[0]][values[1]];
      picker.setSlotValues(1, shi);
      this.addressProvince = values[0];
      this.addressCity = values[1];
      this.addressXian = values[2];
      picker.setSlotValues(2, xian);
      let city_h5 = JSON.parse(getStore('city_h5'))
      if (city_h5 && !this.popupVisible) {
        picker.setValues(city_h5)
      }
    },
    // 校验
    checkinput(value, name, err) {
      console.log(name)
      if (!checkInput(value, name)) {
        let errMessage = '';
        if (name == 'name' || name == 'lian_name' || name == 'bao_name') {
          errMessage = '请输入正确的姓名'
        } else if (name == 'idcard') {
          errMessage = '请输入正确的身份证号码'
        } else if (name == 'xing') {
          errMessage = '请输入正确的大写的姓'
        } else if (name == 'ming') {
          errMessage = '请输入正确的大写的名'
        } else if (name == 'passport1') {
          errMessage = '请输入正确的护照号码'
        } else if (name == 'lian_phone' || name == 'bao_phone') {
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
      if (!value) return;
      if (value.replace(/\s+/g, "").length == 11) {
        if (name == 'lian_phone') {
          this.lian_phone = phoneFormat(value.replace(/\s+/g, ""));
        } else if (name == 'bao_phone') {
          this.bao_phone = phoneFormat(value.replace(/\s+/g, ""));
        }
      }
    },
    add() {
      setStore('fromPassenger', 'oneclick')
      this.$router.push({
        path: '/passenger'
      })
    },
    bank() {
      this.$router.push({
        path: '/creditBank'
      })
    },
    check_bao(index) {
      var that = this,
        insurances = this.insurances;
      console.log(insurances)
      for (var i = insurances.length - 1; i >= 0; i--) {
        insurances[i].check = false;
        insurances[index].check = true;
      }
      console.log(insurances)
      that.insurances = insurances;
      if (index == 2) {
        MessageBox.confirm('', {
          message: '购买保险的乘客才可享受报销凭证的免邮哦',
          showCancelButton: false,
          confirmButtonText: '我知道了',
        }).then(action => {
          if (action == 'confirm') {
            console.log(action)
          }
        });
      }
    },
    // 删除乘机人
    delet(index) {
      var that = this;
      let selectedPassengers = this.selectedPassengers;
      selectedPassengers.splice(index, 1);
      setStore('oneclickPassengers', selectedPassengers);
      that.selectedPassengers = selectedPassengers;
      that.pricePeople = selectedPassengers.length;
    },
    // 获取数据
    getData() {
      let that = this;
      let token = getStore('token');
      let postData = { data: {} }
      that.$http.post(that.url + '/xxx/api/private/queryOrderDefaultSetting', postData, {
        headers: { "Authorization": token },
      }).then(function(res) {
        console.log(res.body.sts)
        console.log(res.body.data)
        // 保险
        if (res.body.data.ord.is_default == '0') {
          return;
        }
        let oneclickData = res.body.data.ord;
        // for (var i = this.insurances.length - 1; i >= 0; i--) {
        //   this.insurances[i].check = false;
        //   if (oneclickData.insurances == this.insurances[i].bao_pir) {
        //     this.insurances[i].check = true;
        //   }
        // };
        // 联系人
        that.lian_name = oneclickData.linker_name;
        that.lian_phone = oneclickData.linker_phone;
        // 乘机人
        let paslist = res.body.data.paslist;
        for (var i = paslist.length - 1; i >= 0; i--) {
          paslist[i].pagType = paslist[i].identification_type;
          paslist[i].official_cardName = paslist[i].official_card_name;
        }
        that.selectedPassengers = paslist;
        that.pricePeople = paslist.length;
        setStore('oneclickPassengers', paslist);
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
        // 报销凭证
        that.isSelect = oneclickData.is_select
        if (oneclickData.is_select) {
          that.bao_name = oneclickData.bao_name;
          that.bao_phone = oneclickData.bao_phone;
          that.bao_address = oneclickData.bao_address;
          let city_h5 = oneclickData.rec_city_h5;
          if (city_h5.indexOf('+') > -1) {
            let values = city_h5.split('+');
            setStore('city_h5', values);
            that.addressProvince = values[0];
            that.addressCity = values[1];
            that.addressXian = values[2];
          }
        };
      }, function(err) {
        console.log(err)
      })
    },
    // 保存
    save() {
      let that = this;
      // 保险
      for (var i = that.insurances.length - 1; i >= 0; i--) {
        if (that.insurances[i].check == true) {
          var insurances = that.insurances[i].bao_pir;
        }
      }
      // 报销凭证
      let city_value = that.addressProvince + '+' + that.addressCity + '+' + that.addressXian;
      // 支付
      if (that.bankName != '支付卡所属银行') {
        for (var k = bankGroup.length - 1; k >= 0; k--) {
          let banks = bankGroup[k].banks;
          for (var j = banks.length - 1; j >= 0; j--) {
            if (banks[j].bankname == that.bankName) {
              var bankcode = banks[j].bankcode;
              break;
            }
          }
        }
      } else {
        var bankcode = '';
      }
      let selectPsgs = this.selectedPassengers,
        passengers = { "passenger": [] };
      console.log(selectPsgs)
      for (var i = selectPsgs.length - 1; i >= 0; i--) {
        passengers.passenger.push({
          "passenger_id": selectPsgs[i].passenger_id,
          "identification_type": selectPsgs[i].identification_type,
          "passenger_name": selectPsgs[i].passenger_name,
          "identification_num": selectPsgs[i].identification_num,
          "security_iden_num": selectPsgs[i].security_iden_num,
          "passenger_ename": selectPsgs[i].passenger_ename,
          "passport_number": selectPsgs[i].passport_number,
          "official_card": selectPsgs[i].official_card,
          "official_card_name": selectPsgs[i].official_cardName,
          "nationality": selectPsgs[i].nationality,
          "passport_valid": selectPsgs[i].passport_valid,
        })
      }
      let postData = {
        "data": {
          "passengers": passengers,
          "linker_name": that.lian_name ? that.lian_name : '',
          "linker_phone": that.lian_phone ? that.lian_phone.replace(/\s+/g, "") : '',
          "insurances": '80',
          "is_select": that.isSelect,
          "bao_name": that.bao_name ? that.bao_name : '',
          "bao_phone": that.bao_phone ? that.bao_phone.replace(/\s+/g, "") : '',
          "bao_address": that.bao_address ? that.bao_address : '',
          "rec_city_ios": '',
          "rec_city_h5": city_value,
          "bank_num": that.banknum ? that.banknum.replace(/\s+/g, "") : '',
          "bank_name": that.bankName ? that.bankName : '',
          "bank_code": bankcode,
          "mon": that.mon ? that.mon : '',
          "year": that.year ? that.year : '',
          "name": that.name ? that.name : '',
          "idcard": that.idcard ? that.idcard.replace(/\s+/g, "") : '',
          "phone": that.phone ? that.phone.replace(/\s+/g, "") : '',
          "is_default": '1'
        }
      };
      console.log(postData)
      setStore('oneclickPassengers', that.selectedPassengers);
      setStore('oneclickData', postData);
      let token = getStore('token')
      that.$http.post(that.url + '/xxx/api/private/addOrderDefaultSetting', postData, {
        headers: { "Authorization": token },
      }).then(function(res) {
        console.log(res)
        Toast({
          message: '保存成功',
          duration: 1500
        })
        that.$router.go(-1)
      }, function(err) {
        console.log(err)
      })
    },
  },
}

</script>
<style scoped>
.content {
  background-color: #f8ebc8;
  padding-bottom: 1.333333rem;
  background-image: url(../assets/img/dingdan_bg.png);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% auto;
  margin-top: 1.173333rem;
}

.form {
  margin-top: 0.4rem;
  padding-bottom: 0.266667rem;
}

.form_title {
  background: #fff;
  border-radius: 0.266667rem 0.266667rem 0 0;
  padding: 0 0.293333rem;
}

.form_title button {
  width: 2.266667rem;
  height: 1.066667rem;
  line-height: 1.066667rem;
  font-size: 0.4rem;
  color: #002774;
  text-align: center;
  border: 0;
  background: #6C97FF;
}

.form_title button.check {
  color: #3366cc;
  font-size: 0.453333rem;
  background: url(../assets/img/dingdan_btn.png)no-repeat;
  background-size: 2.346667rem 1.066667rem;
}

.standar {
  padding: 0 0.32rem;
  margin: 0 auto;
  margin-top: 0.4rem;
  border-radius: 0.133333rem;
  width: 9.2rem;
  font-size: 0.373333rem;
  color: #333;
  height: 1.333333rem;
  line-height: 1.333333rem;
  background-color: #fff;
}

.standar span:nth-of-type(even) {
  color: #e13426;
}

.passenger {
  width: 9.92rem;
  margin: 0 0.04rem;
  min-height: 2.133333rem;
}

.passenger .passenger_title {
  padding-left: 0.533333rem;
  height: 0.92rem;
  line-height: 0.92rem;
  background-image: url(../assets/img/dingdan_psg_top.png);
  background-repeat: no-repeat;
  background-size: 9.92rem 0.92rem;
  padding-top: 0;
}

.passenger_title {
  font-size: 0.373333rem;
  color: #333;
  height: 0.8rem;
  line-height: 0.8rem;
  padding-right: 0.533333rem;
  padding-top: 0.106667rem;
}

.passenget_title span {
  color: #002774;
}

.psg {
  font-size: 0.426667rem;
  color: #333;
  height: 1.706667rem;
  width: 7.92rem;
  position: relative;
  padding-left: 1.6rem;
  padding-right: 0.4rem;
  /*border-bottom: 0.013333rem solid #e5e5e5;*/
  justify-content: center;
  background-image: url(../assets/img/dingdan_psg_line.png);
  background-repeat: no-repeat;
  background-size: 9.92rem 1.706667rem;
}

.psg:nth-of-type(1) {
  background-image: url(../assets/img/dingdan_psg_first.png);
  background-repeat: no-repeat;
  background-size: 9.92rem 1.706667rem;
}

.psg p span:nth-of-type(1) {
  display: inline-block;
  min-width: 1.066667rem;
  margin-right: 0.666667rem;
}

.psg p:nth-of-type(2) {
  font-size: 0.373333rem;
  margin-top: 0.266667rem;
}

.psg p:nth-of-type(2) span:nth-of-type(1) {
  color: #666;
}

.psg i {
  position: absolute;
  left: 0.533333rem;
  top: 0.533333rem;
  width: 0.64rem;
  height: 0.64rem;
  background: url(../assets/img/delete_button.png)no-repeat;
  background-size: 0.64rem 0.64rem;
}

.psg b {
  position: absolute;
  right: 0.16rem;
  top: 0;
  color: #fff;
  text-align: center;
  text-indent: 0.213333rem;
  font-size: 0.32rem;
  width: 0.6rem;
  height: 0.56rem;
  background: url(../assets/img/triangle.png)no-repeat;
  background-size: 0.6rem 0.56rem;
}

.add {
  font-size: 0.48rem;
  color: #E65820;
  height: 1.466667rem;
  line-height: 1.466667rem;
  text-align: center;
  background-image: url(../assets/img/dingdan_psg_add.png);
  background-repeat: no-repeat;
  background-size: 9.92rem 1.466667rem;
}

.add span {
  display: inline-block;
  padding-left: 0.96rem;
  background-image: url(../assets/img/add.png);
  background-repeat: no-repeat;
  background-size: 0.64rem 0.64rem;
  background-position: 0 0.426667rem;
}

.lian {
  margin-top: 0.266667rem;
  width: 8.853333rem;
  height: 3.76rem;
  background: url(../assets/img/dingdan_lian_card.png)no-repeat;
  background-size: 100% auto;
  padding: 0 0.533333rem;
  font-size: 0.373333rem;
  color: #333;
}

.assurance {
  width: 8.853333rem;
  height: 5.093333rem;
  margin: 0 0.04rem;
  margin-top: 0.266667rem;
  background-image: url(../assets/img/dingdan_bao_card.png);
  background-repeat: no-repeat;
  background-size: 100% auto;
  padding: 0 0.533333rem;
  font-size: 0.373333rem;
  color: #333;
}

.list {
  height: 1.333333rem;
  line-height: 1.333333rem;
  color: #333;
  font-size: 0.373333rem;
  position: relative;
  padding-left: 0.533333rem;
  display: flex;
  flex-direction: row;
  border-bottom: 0.013333rem solid #e5e5e5;
}

.list span:nth-of-type(1) {
  display: inline-block;
  min-width: 1.6rem;
  color: #424242;
  font-size: 0.4rem;
  margin-right: 0.8rem;
}

.list span:nth-of-type(2) {
  color: #333;
  font-size: 0.373333rem;
}

.popBtns {
  border-bottom: 0.013333rem solid #e5e5e5;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 1.066667rem;
  color: #333;
  line-height: 1.066667rem;
  font-size: 0.426667rem;
  padding: 0.026667rem 0;
}

.list .popBtns span {
  margin: 0;
}

.popBtns button {
  border: none;
  margin: 0 0.533333rem;
  height: 1.066667rem;
  line-height: 1.066667rem;
  background-color: #fff;
  font-size: 0.373333rem;
  color: #666;
}

.popBtns button:nth-of-type(2) {
  color: #e94b31;
}

.insurance {
  height: 1.333333rem;
  font-size: 0.426667rem;
  color: #333;
  border-bottom: 0.013333rem solid #e5e5e5;
  justify-content: initial;
}

.insurance i.img {
  width: 0.586667rem;
  height: 0.586667rem;
  margin-top: 0.373333rem;
  display: inline-block;
  background: url('../assets/img/icon_select_disabled.png')no-repeat;
  background-size: 100% auto;
}

.insurance i.img.check {
  background: url('../assets/img/icon_select_normal.png')no-repeat;
  background-size: 100% auto;
}

.introduce {
  font-size: 0.453333rem;
  color: #333;
  height: 1.333333rem;
  justify-content: center;
  margin-left: 0.533333rem;
}

.introduce p:nth-of-type(1) span:nth-of-type(1) {
  margin-right: 0.4rem;
}

.introduce p:nth-of-type(2) {
  margin-top: 0.133333rem;
  font-size: 0.346667rem;
  color: #666;
}

.introduce p.insuranceNo {
  margin: 0;
  color: #333;
  font-size: 0.453333rem;
}

.bao {
  background-color: #fff;
  height: 1.653333rem;
  line-height: 1.653333rem;
  font-size: 0.453333rem;
  color: #000;
  padding: 0 0.4rem;
}

.reimbursement {
  width: 8.853333rem;
  max-height: 10.56rem;
  margin: 0 0.04rem;
  margin-top: 0.266667rem;
  background-image: url(../assets/img/dingdan_bx_card.png);
  background-repeat: no-repeat;
  background-size: 100% auto;
  padding: 0 0.533333rem;
  font-size: 0.373333rem;
  color: #333;
}

.reimbursement .passenger_title {
  padding-right: 0;
}

.switch {
  width: 1.173333rem;
  height: 0.8rem;
  background-image: url(../assets/img/switch_on.png);
  background-repeat: no-repeat;
  background-size: 100% auto;
  float: right;
  margin-top: 0.053333rem;
}

.switch.check {
  background-image: url(../assets/img/switch_off.png);
  background-size: 100% auto;
}

.bankname {
  height: 1.333333rem;
  line-height: 1.333333rem;
  color: #333;
  font-size: 0.373333rem;
  position: relative;
  padding-left: 0.533333rem;
  display: flex;
  flex-direction: row;
  border-bottom: 0.013333rem solid #e5e5e5;
}

.bankname span:nth-of-type(1) {
  display: inline-block;
  min-width: 1.6rem;
  color: #424242;
  font-size: 0.4rem;
  margin-right: 0.8rem;
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
  height: 1.28rem;
  line-height: 1.28rem;
}

.year {
  margin-left: 0.533333rem;
}

button.foot {
  height: 1.306667rem;
  line-height: 1.306667rem;
  width: 100%;
  font-size: 0.533333rem;
  color: #fff;
  border: none;
  background-color: transparent;
  position: fixed;
  bottom: 0;
  background-image: url(../assets/img/oneclick_foot.png);
  background-repeat: no-repeat;
  background-size: 100% 1.306667rem;
}

</style>
