<template>
  <div class="container">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content" v-else>
      <Card :card="hang" style="margin-top:0.4rem;"></Card>
      <!-- <p @click="ceshi()">123</p> -->
      <div class="standar col">
        <p class="row">
          <span>成人票价<span class="second_span">¥{{standarPrice.fare}}/人</span></span>
          <span>市场价<span style="text-decoration:line-through;color:#999;" class="second_span">¥{{cang.stp}}</span></span>
        </p>
        <p class="row">
          <span>机建燃油<span class="second_span">¥{{standarPrice.tax}}/人</span></span>
          <span>折扣<span class="second_span" style="margin-left:1.066667rem;">{{standarPrice.discount}}折</span></span>
        </p>
      </div>
      <div class="form">
        <div class="form_content">
          <div class="passenger">
            <p class="passenger_title">乘机人&nbsp;&nbsp;&nbsp;<span>成人{{pricePeople}}人</span>
              <span class="default" :class="{checked:forms[0].change&& forms[0].check,check:forms[0].change&& !forms[0].check,}" @click="defaultChange(0)">{{forms[0].change?'设为默认':'默认'}}</span></p>
            <p v-show="cang.ticket != '12'" class="ticket">剩<span style="color:#e13426">{{cang.ticket}}</span>张,最多可添加{{cang.ticket}}位乘机人</p>
            <div v-show="pricePeople != 0" class="psg col" :class="{psg_first:index == 0 && cang.ticket == '12'}" v-for="(value,index) in selectedPassengers">
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
            <p class="passenger_title">联系人<span class="default" :class="{checked:forms[1].change&& forms[1].check,check:forms[1].change&& !forms[1].check,}" @click="defaultChange(1)">{{forms[1].change?'设为默认':'默认'}}</span></p>
            <div class="list">
              <span>联系人</span>
              <mt-field placeholder="请填写联系人姓名" v-model="lian_name" @input="bindInput(lian_name,'lian_name',1)" @change="checkinput(lian_name,'lian_name','lian_name_err')" :attr="{ maxlength: 20 }" placeholder-style="color:#828282;"></mt-field>
            </div>
            <div class="list">
              <span>电&nbsp;&nbsp;&nbsp;话</span>
              <mt-field placeholder="请填写联系人电话" v-model="lian_phone" @input="bindInput(lian_phone,'lian_phone',1)" @change="checkinput(lian_phone,'lian_phone','lian_phone_err')" :attr="{ maxlength: 13 }" placeholder-style="color:#828282;"></mt-field>
            </div>
          </div>
          <div class="assurance">
            <p class="passenger_title">保险<span style="color:#999;margin-left:0.533333rem;">{{pricePeople}}人x1份</span>
              <!-- <span class="default" :class="{checked:forms[2].change&& forms[2].check,check:forms[2].change&& !forms[2].check,}" @click="defaultChange(2)">{{forms[2].change?'设为默认':'默认'}}</span> -->
            </p>
            <div class="insurance row" @click="check_bao(index)" v-for="(value,index) in insurances ">
              <i class="img" :class="{check:value.check}"></i>
              <div class="introduce col">
                <p v-show="index != 2"><span>{{value.name}}</span><span>¥{{value.bao_pir}}/人</span></p>
                <p :class="{insuranceNo:index ==2}">{{value.explain}}</p>
              </div>
              <span v-show="index !=2" class="point">{{value.point}}</span>
            </div>
          </div>
          <div class="reimbursement">
            <p class="passenger_title row">
              <span>报销凭证</span><span class="switch" @click="isSelect =!isSelect" :class="{check:!isSelect}"></span>
              <span class="default" :class="{checked:forms[3].change&& forms[3].check,check:forms[3].change&& !forms[3].check,}" @click="defaultChange(3)">{{forms[3].change?'设为默认':'默认'}}</span>
            </p>
            <div v-show="isSelect">
              <div class="list">
                <span>凭证类型</span>
                <span>行程单+保险发票+刷卡小票</span>
              </div>
              <div class="list">
                <span>配送方式</span>
                <span>{{insurances[2].check == true?'快递费20元':'邮递(免邮费)'}}</span>
              </div>
              <div class="list">
                <span>配送时间</span>
                <span>行程结束后7天内送到</span>
              </div>
              <div class="list">
                <span>收&nbsp;件&nbsp;&nbsp;人</span>
                <mt-field placeholder="请填写收件人" v-model="bao_name" @input="bindInput(bao_name,'bao_name',3)" @change="checkinput(bao_name,'bao_name','bao_name_err')" :attr="{ maxlength: 13 }" placeholder-style="color:#828282;"></mt-field>
              </div>
              <div class="list">
                <span>联系电话</span>
                <mt-field placeholder="请填写11位手机号码" v-model="bao_phone" @input="bindInput(bao_phone,'bao_phone',3)" @change="checkinput(bao_phone,'bao_phone','bao_phone_err')" :attr="{ maxlength: 13 }" placeholder-style="color:#828282;"></mt-field>
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
                <mt-field placeholder="不需要填写省市区" v-model="bao_address" @input="bindInput(bao_address,'bao_address',3)" @change="checkinput(bao_address,'bao_address','bao_address_err')" :attr="{ maxlength: 40 }" placeholder-style="color:#828282;"></mt-field>
              </div>
            </div>
          </div>
          <!-- 支付 -->
          <div class="reimbursement" v-show="payShow">
            <p class="passenger_title">
              <span>支付</span>
              <span class="default" :class="{checked:forms[4].change&& forms[4].check,check:forms[4].change&& !forms[4].check,}" @click="defaultChange(4)">{{forms[4].change?'设为默认':'默认'}}</span>
            </p>
            <div>
              <div class="list">
                <span>姓名</span>
                <mt-field placeholder="请填写持卡人姓名" v-model="name" @input="bindInput(name,'name',4)" @change="checkinput(name,'name','name_err')" :attr="{ maxlength: 20 }" placeholder-style="color:#828282;"></mt-field>
              </div>
              <div class="list">
                <span>证件类型</span>
                <span>身份证</span>
              </div>
              <div class="list">
                <span>证件号码</span>
                <mt-field placeholder="请填写持卡人证件号码" v-model="idcard" @input="bindInput(idcard,'idcard',4)" @change="checkinput(idcard,'idcard','idcard_err')" :attr="{ maxlength: 20 }" placeholder-style="color:#828282;"></mt-field>
              </div>
              <div class="list">
                <span>手机号码</span>
                <mt-field placeholder="请填写持卡人手机号码" v-model="phone" @input="bindInput(phone,'phone',4)" @change="checkinput(phone,'phone','phone_err')" :attr="{ maxlength: 20 }" placeholder-style="color:#828282;"></mt-field>
              </div>
              <div class="bankname">
                <span>银行</span>
                <span class="bname" :class="{mode:inport}" @click="bank()">{{bankName}}</span>
                <span>|</span>
                <span>信用卡</span>
              </div>
              <div class="list">
                <span>卡号</span>
                <mt-field placeholder="请填写持卡人银行卡号" v-model="banknum" @input="bindInput(banknum,'banknum',4)" @change="checkinput(banknum,'banknum','banknum_err')" :attr="{ maxlength: 20 }" placeholder-style="color:#828282;"></mt-field>
              </div>
              <div class="list">
                <span>有效期</span>
                <input type="text" placeholder="如09" class="mon" v-model='mon' @input="bindInput(mon,'mon',4)">
                <span>月</span>
                <input type="text" placeholder="22" class="year" v-model="year" @input="bindInput(year,'year',4)">
                <span>年</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="model" v-show="detailVisible" @click="detailVisible = false"></div>
      <div v-show="detailVisible" :class="{pop:detailVisible}" class="detail">
        <div class="total">
          <div style="height:1.066667rem;line-height:1.066667rem;border-bottom:0.026667rem solid #eee">
            <span>{{hang.fno}}</span>
            <span style="margin: 0 0.266667rem;">{{hang.can}}</span>
          </div>
          <div style="color:#000;height:1.493333rem;line-height:0.746667rem;border-bottom:0.026667rem solid #eee;">
            <div class="hang">
              <div class="row hang_left">
                <span>成人票</span>
                <span class="redW">¥{{standarPrice.fare}}</span>
              </div>
              <div style="color:#424242;">×{{pricePeople}}人</div>
            </div>
            <div class="hang">
              <div class="row hang_left">
                <span>机建+燃油</span>
                <span class="redW">¥{{standarPrice.tax}}</span>
              </div>
              <div style="color:#424242;">×{{pricePeople}}人</div>
            </div>
          </div>
          <div style="color:#000;padding-bottom: 0.266667rem;">
            <div class="hang" v-for="bao in insurances" style="line-height:0.8rem;" v-show="bao.check">
              <div class="row hang_left">
                <span>{{bao.name}}</span>
                <span class="redW">¥{{bao.bao_pir}}</span>
              </div>
              <div style="color:#424242;">{{pricePeople}}份</div>
            </div>
            <div class="hang" style="margin-top:0.133333rem;">
              <div class="row hang_left">
                <span>配送费</span>
                <span class="redW">¥{{insurances[2].check == true?'20':'0'}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="foot row">
        <p class="col">
          <span style="color:#e13426;font-size:0.533333rem;">¥{{price}}</span>
          <span>订单总价</span>
        </p>
        <span>共{{pricePeople}}人</span>
        <span class="look" :class="{look_top:detailVisible}" @click="detailVisible = !detailVisible">查看明细</span>
        <button @click="pay()">去支付</button>
      </div>
      <div style="text-align:center;z-index:9999;opacity:1;width:100%;left:0;top:0;position:fixed;background-color:transparent;height:100%;" v-show="isPay">
        <!-- <img src="../assets/img/loading.gif" style="width:3.2rem;height:3.2rem;position:fixed;top:0;right:0;bottom:0;left:0;margin:auto;"></img> -->
        <div id="loading-center">
          <div id="loading-center-absolute">
            <div class="circle">
              <div class="object" id="object_one"></div>
              <div class="object" id="object_two"></div>
              <div class="object" id="object_three"></div>
              <div class="object" id="object_four"></div>
              <div class="object" id="object_five"></div>
              <div class="object" id="object_six"></div>
              <div class="object" id="object_seven"></div>
              <div class="object" id="object_eight"></div>
            </div>
            <div class="word">加载中...</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import loading from './loading'
import Card from './card'
import { Toast, MessageBox } from 'mint-ui'
import headTop from './head'
import Address from '../assets/address.json'
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
  addZero
} from '../config/utils'
export default {
  data() {
    return {
      isLoading: false,
      date: '',
      hang: [],
      cang: [],
      title: '订单填写',
      luggage: '30KG免行李费用',
      standarPrice: '',
      lian_name: '',
      lian_phone: '',
      bao_name: '',
      bao_phone: '',
      bao_address: '',
      inport: false,
      bankName: '支付卡所属银行',
      name: '',
      phone: '',
      idcard: '',
      banknum: '',
      mon: '',
      year: '',
      pricePeople: '0',
      price: '0',
      selectedPassengers: '',
      insurances: [
        { name: '航意险', explain: '80元航空意外保1天最高300万', point: '可获得50积分', num: 1, bao_pir: '80', yunf: '0', check: false },
        { name: '航意险', explain: '40元航空意外保1天最高200万', point: '可获得5积分', num: 1, bao_pir: '40', yunf: '0', check: true },
        { name: '无需保险', explain: '不需要出行保障', num: 1, bao_pir: '0', yunf: '20', check: false },
      ],
      forms: [
        { change: false, check: true }, { change: false, check: true },
        { change: false, check: true }, { change: false, check: true },
        { change: false, check: true },
      ],
      detailVisible: false,
      isSelect: true,
      popupVisible: false,
      payShow: false,
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
      isPay: false,
    }
  },
  mounted() {
    console.log("页面加载完成")
  },
  activated: function() {
    var that = this;
    that.detailVisible = false;
    that.popupVisible = false;
    that.isPay = false;
    let fresh = getStore('onefresh');
    that.firstFresh = getStore('onefresh');
    removeStore('onefresh');
    let values = Object.keys(Address);
    let shi = Object.keys(Address[values[0]]);
    let xian = Address[values[0]][shi];
    this.addressSlots[1].values = shi;
    this.addressSlots[2].values = xian;
    this.addressProvince = '北京市';
    this.addressCity = shi[0];
    this.addressXian = xian[0];

    let hang_check = JSON.parse(getStore("hang_check"));
    let cang = JSON.parse(getStore('check_cang'));
    let search = JSON.parse(getStore("search"));
    hang_check.from = "dingdan";
    hang_check.cab = cang.cab;
    hang_check.cabinname = cang.can;
    
    that.cang = cang;
    that.hang_check = hang_check;    
    that.date = getStore('hang_date');
    if (fresh && fresh == 'true') {
      removeStore('selectedPassengers')
      removeStore('oneclickPassengers')
      hang_check.tui_more = true;
      that.getData();
    } else {
      // 乘机人
      hang_check.tui_more = false;
      var selectedPassengers = JSON.parse(getStore('selectedPassengers')) ? JSON.parse(getStore('selectedPassengers')) : [];
      that.selectedPassengers = selectedPassengers;
      let dataChange = selectedPassengers.length - that.pricePeople;
      console.log(dataChange)
      if (dataChange != 0) {
        that.forms[0].change = true;
      }
      that.pricePeople = selectedPassengers.length;
    }
    // 银行
    let bank = JSON.parse(getStore('checkCreditBank'));
    let bankcode = getStore('checkCreditBankCode');
    removeStore('checkCreditBank')
    removeStore('checkCreditBankCode')
    that.banks = bank;
    if (bankcode == 'true') {
      that.bankName = bank.bankname;
      that.inport = true;
    };
    that.$nextTick(function() {
      that.refreshPrice(that)
    });
    // 标准票价
    that.standarPrice = JSON.parse(getStore('StandarPrice'));
    // 退改签规定
    var postData = {};
    var data = {
      sessionId: cang.sid,
      policyId: cang.pid,
      flightNo: cang.fno,
      cabin: cang.cab,
    }
    postData.data = data;
    that.$http.post(that.url + '/xxx/api/public/newGetRemark', postData).then(function(res) {
      console.log(res)
      if (checkSts(res, '机票退改签数据获取失败', that)) {
        return;
      }
      var data = res.data.data.rgas;
      console.log(JSON.stringify(res.data.data))
      that.regulation = JSON.stringify(res.data.data)
      that.tuiData(that, data, cang);
    }, function(err) {
      console.log(err)
      that.hang = that.hang_check;
    })
    // 祥鹏 西部 行李托运规定
    if (hang_check.awy_code == '8L' || hang_check.awy_code == "PN") {
      var postDataForluggage = {
        data: {
          airlinecode: hang_check.awy_code,
          cabin: cang.cab
        }
      };
      that.$http.post(that.url + '/xxx/api/public/luggageTransports', postDataForluggage).then(function(res) {
        console.log(res)
        if (res.body.sts != -1) {
          that.luggage = res.body.data.comment;
        }
      }, function(err) {

      })
    }
  },
  components: {
    headTop,
    loading,
    Card
  },

  methods: {
    ceshi() {
      this.$router.replace({
        path: '/pay'
      })
    },
    defaultChange(index) {
      if (this.forms[index].change == true) {
        this.forms[index].check = !this.forms[index].check
      }
    },
    bank() {
      this.$router.push({
        path: '/creditBank'
      })
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
      let city_h5 = JSON.parse(getStore('city_h5'));
      if (city_h5 && !this.popupVisible) {
        console.log(city_h5)
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
    bindInput: function(value, name, index) {
      console.log(this.firstFresh)
      if (this.firstFresh == 'true') {

      } else {
        console.log(index)
        this.forms[index].change = true;
      }
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
      setStore('fromPassenger', 'dingdan')
      this.$router.push({
        path: '/passenger'
      })
    },
    check_bao(index) {
      var that = this,
        insurances = this.insurances;
      for (var i = insurances.length - 1; i >= 0; i--) {
        insurances[i].check = false;
        insurances[index].check = true;
        that.forms[2].change = true;
      }
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
      that.refreshPrice(that)
    },
    // 删除乘机人
    delet(index) {
      var that = this;
      let selectedPassengers = this.selectedPassengers;
      selectedPassengers.splice(index, 1);
      setStore('selectedPassengers', selectedPassengers);
      that.selectedPassengers = selectedPassengers;
      that.pricePeople = selectedPassengers.length;
      console.log(that.forms[0])
      that.forms[0].change = true;
      that.refreshPrice(that)
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
          if (res.body.data.ord.is_default == '1') {
            that.payShow = true;
            for (let i = 0; i < 5; i++) {
              that.forms[i].change = false;
              that.forms[i].check = true;
            }
          } else {
            for (let i = 0; i < 5; i++) {
              that.forms[i].change = true;
              that.forms[i].check = true;
            }
            return;
          }
          let getOneData = res.body.data.ord;
          getOneData["passengers"] = {
            "passenger": res.body.data.paslist
          }
          setStore('oneclickData', getOneData)
          // 保险
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
          // 乘机人
          that.selectedPassengers = paslist;
          that.pricePeople = paslist.length;
          setStore('selectedPassengers', paslist);
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
          that.isSelect = oneclickData.is_select;
          if (oneclickData.is_select) {
            that.bao_name = oneclickData.bao_name;
            that.bao_phone = oneclickData.bao_phone;
            that.bao_address = oneclickData.bao_address;
            let city_h5 = oneclickData.rec_city_h5;
            if (city_h5.indexOf('+') > -1) {
              let values = city_h5.split('+');
              setStore('city_h5', values)
              that.addressProvince = values[0];
              that.addressCity = values[1];
              that.addressXian = values[2];
            }
          };
          that.refreshPrice(that)
        },
        function(err) {
          console.log(err)
        })
    },
    pay(index) {
      let that = this;
      // 乘机人
      if (that.pricePeople == 0) {
        Toast({
          message: '请选择至少一位乘机人',
          duration: 2000
        })
        return;
      };
      if (that.pricePeople > that.cang.ticket) {
        Toast({
          message: '该航班最多可添加' + that.cang.ticket + '位旅客',
          duration: 2000
        })
        return;
      }
      // 联系人
      if (!(checkInput(that.lian_name, 'lian_name') && checkInput(that.lian_phone, 'lian_phone'))) {
        Toast({
          message: '请完整填写联系人信息',
          duration: 2000
        })
        return;
      }
      // 报销凭证
      if (that.isSelect) {
        if (!(checkInput(that.bao_name, 'bao_name') && checkInput(that.bao_phone, 'bao_phone') && that.bao_address != '')) {
          Toast({
            message: '请完善报销凭证相关信息',
            duration: 2000
          })
          return;
        }
        var address = that.addressProvince + that.addressCity + that.addressXian + that.bao_address;
        that.rcptAddress = address;
      };

      let contact = {
        'lian_name': that.lian_name ? that.lian_name : '',
        'lian_phone': that.lian_phone ? that.lian_phone.replace(/\s+/g, "") : ''
      };
      var city_value = that.addressProvince + '+' + that.addressCity + '+' + that.addressXian;
      that.city_value = city_value;
      let baoObj = {
        "isSelect": that.isSelect,
        'bao_name': that.bao_name ? that.bao_name : '',
        'bao_phone': that.bao_phone ? that.bao_phone.replace(/\s+/g, "") : '',
        'rcptAddress': address ? address : '',
        'bao_address': that.bao_address ? that.bao_address : '',
        'values': city_value
      }
      let insurance_price = '0';
      for (var i = that.insurances.length - 1; i >= 0; i--) {
        if (that.insurances[i].check == true) {
          insurance_price = that.insurances[i].bao_pir;
        }
      }
      // 预订单
      // 配送费
      let pdispatchfee = '0';
      if (that.isSelect && insurance_price == '0') {
        pdispatchfee = '20'
      }
      // 标准票价
      let standarPrice = JSON.parse(getStore('StandarPrice'));
      let inu = insurance_price; /*保险价格*/
      // 乘机人
      var selectedPassengers = that.selectedPassengers;
      let pricePeople = selectedPassengers.length;
      var price = that.price;
      let token = getStore('token');
      let search = JSON.parse(getStore("search"));
      let userinfo = JSON.parse(getStore("userinfo"));
      let hang = JSON.parse(getStore("hang_check"));
      let cang = JSON.parse(getStore('check_cang'));
      let regulation = that.regulation;
      let linker = contact;
      let voyages = {
        'voyage': [{
          'todatetime': hang.art,
          /*到达时间11：45*/
          'toairportcode': hang.arc_code,
          /*到达机场*/
          'toairportname': hang.arc + '机场',
          /*到达机场*/
          'tocityname': search.endcity.city_name,
          /*到达城市*/
          'tocitycode': search.endcity.city_code,
          /*到达城市code*/
          'toterminal': hang.atm,
          /*到达机场航站楼*/
          'sessionId': cang.sid,
          'flightNo': hang.fno,
          /*航班号*/
          'cabinname': cang.can,
          /*舱位名称经济舱*/
          'policyId': '',
          'planetype': hang.pmd,
          /*机型330*/
          'cabinNo': cang.cab,
          /*舱位代码Y*/
          'flytime': hang.fti,
          /*飞行时间*/
          'flirate': JSON.stringify(hang.frt / 100),
          /*准点率*/
          'mealname': hang.man,
          /*餐食*/
          'depttime': hang.dpd + ' ' + hang.det,
          /*出发时间2017-08-19 08:30*/
          'fromcityname': search.startcity.city_name,
          /*出发城市name*/
          'fromcitycode': search.startcity.city_code,
          /*出发城市code*/
          'depairportname': hang.dpc + '机场',
          /*出发机场*/
          'depairportcode': hang.dpc_code,
          /*出发机场*/
          'fromterminal': hang.dtm,
          /*出发机场航站楼*/
        }]
      };
      let oldPassengers = selectedPassengers;
      console.log(oldPassengers)
      let passengers = { 'passenger': [] };
      for (var i = oldPassengers.length - 1; i >= 0; i--) {
        passengers.passenger.push({
          'identificationType': oldPassengers[i].identification_type ? oldPassengers[i].identification_type : '1',
          'nationality': '',
          /*预算单位*/
          'sex': 'M',
          'identificationNum': oldPassengers[i].pagType == '3' ? oldPassengers[i].passport_number : oldPassengers[i].identification_num,
          'passenType': '1',
          /**/
          'pairconfee': '0',
          /*基建*/
          'birthday': '',
          /*生日*/
          'insuranceNum': inu == 0 ? '0' : '1',
          /*保险数量*/
          'insur_amount': inu,
          /*保险价格*/
          'mobileNum': '',
          /*手机号码*/
          'bindName': '',
          'ptax': JSON.stringify(standarPrice.tax),
          /*基建燃油*/
          'name': oldPassengers[i].pagType == '3' ? oldPassengers[i].passenger_ename : oldPassengers[i].passenger_name,
          'official_card': oldPassengers[i].official_cardName,
          'official_card_code': oldPassengers[i].official_card,
          /*公务卡开户银行*/
          'suggest_price': JSON.stringify(standarPrice.fare) /*票价*/
        })
      }
      let postData = {
        data: {
          'amountpayable': JSON.stringify(price),
          /*总价*/
          'contactMobile': linker.lian_phone,
          /*联系人*/
          'contactName': linker.lian_name,
          /*联系人*/
          'memberId': userinfo.memberid,
          /*用户id*/
          'rcptAddress': baoObj.rcptAddress,
          'recipient': baoObj.bao_name,
          /*报销*/
          'rcptPhone': baoObj.bao_phone,
          /*报销*/
          'pdispatchfee': pdispatchfee,
          /*配送费*/
          'voyages': voyages,
          /*航班信息*/
          'passengers': passengers,
          /*乘机人集合*/
          /*退改签规定*/
          "regulation": regulation
        }
      };
      console.log(postData)
      // 保存数据
      that.setData(oldPassengers, contact, insurance_price, baoObj, that);
      // 测试start
      console.log(postData);
      // setStore('payfresh', true);
      // that.$router.push({
      //   path: '/pay'
      // })
      // return;
      // 测试end

      MessageBox.confirm('', {
        message: '建议使用公务卡支付，非公务卡支付需要核实报销问题',
        showCancelButton: false,
        confirmButtonText: '我知道了',
      }).then(action => {
        if (action == 'confirm') {
          that.isPay = true;
          that.$http.post(that.url + '/xxx/api/private/bookTicketOrder', postData, {
            headers: { "Authorization": token }
          }).then(function(res) {
            console.log(res)
            that.isPay = false;
            if (checkSts(res, '订座失败', that)) {
              return;
            }
            if (res.body.sts == 1) {
              console.log(res.body.data)
              setStore('orderData', res.body.data)
              setStore('payfresh', true);
              if (that.payShow == true) {
                that.pay_kuai(that, res.body.data);
              } else {
                that.$router.push({
                  path: '/pay'
                })
              }

            }
          }, function(err) {
            console.log(err)
          })
        }
      });
    },
    // 快钱支付
    pay_kuai(that, orderData) {
      let data = [
        that.banknum.replace(/\s+/g, ""),
        that.mon + '' + that.year,
        that.name,
        that.idcard.replace(/\s+/g, ""),
        that.phone.replace(/\s+/g, ""),
      ];
      setStore('outInputData', data);
      var date = new Date();
      let title = getStore("title");
      let tbDepTime = orderData.depttime.replace(/-/g, '').replace(/\s/g, "").replace(/:/, '');
      var date = new Date();
      let orderTime = '' + date.getFullYear() + addZero(date.getMonth() + 1) + addZero(date.getDate()) + addZero(date.getHours()) + addZero(date.getMinutes()) + addZero(date.getSeconds());
      for (var k = bankGroup.length - 1; k >= 0; k--) {
        let banks = bankGroup[k].banks;
        for (var j = banks.length - 1; j >= 0; j--) {
          if (banks[j].bankname == that.bankName) {
            var bankcode = banks[j].bankcode;
            break;
          }
        }
      }
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
        "dhrPhone": that.phone.replace(/\s+/g, ""),
        "dhrName": that.name,
        "payIp": "192.168.1.122",
        "dhrIdNum": that.idcard.replace(/\s+/g, ""),
        "tbmIsFrequenter": "N",
        "tbTraAirport": "",
        "tbmPhone": that.phone.replace(/\s+/g, ""),
        "tbFlight": orderData.flightno,
        "tbQuantity": "1"
      }
      console.log(referData)
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
        // console.log(urlStr)
        that.urlStr = urlStr;
        setStore('urlStr', urlStr)
        that.$router.push({
          path: '/pay_kuai'
        })
      }, function(err) {})
    },
    // 价格计算
    refreshPrice(that) {
      // discount:88 fare:5490 tax:50 total:5540
      var standarPrice = that.standarPrice;
      var tax = standarPrice.tax; /*机建燃油*/
      var sgc = standarPrice.fare; /*票价*/
      var pricePeople = that.pricePeople;
      console.log(pricePeople)
      // 保险
      var bao_pir = '40',
        yunf = '0',
        bao_num = 1;
      for (var i = that.insurances.length - 1; i >= 0; i--) {
        if (that.insurances[i].check == true) {
          bao_pir = that.insurances[i].bao_pir;
          yunf = that.insurances[i].yunf;
        }
      };
      var price1 = (tax + sgc) * pricePeople;
      var price2 = bao_pir * bao_num * pricePeople; /*保险价格*/
      var price3 = parseInt(yunf);
      var price = price1 + price2 + price3;
      that.price = price;
      return price;
    },
    // 退改签数据
    tuiData(that, data, value) {
      var arr = [];
      that.firstFresh = false;
      for (let i = 0; i < data.length; i++) {
        console.log(data[i].regulationName.indexOf('退票'))
        if (data[0].regulationName.indexOf('退票规定') == 0) {

          let newData = data[0].regulationItems;
          for (let j = 0; j < newData.length; j++) {
            newData[j].itemValue = newData[j].itemValue.replace("%", "")
            newData[j].itemPrice = parseInt(parseInt(value.stp) * parseInt(newData[j].itemValue) / 100)
          }
          arr[0] = newData;
        } else {
          arr[0] = ''
        }
        if (data[1].regulationName.indexOf('改签规定') == 0) {
          let newData = data[1].regulationItems;
          for (let j = 0; j < newData.length; j++) {
            newData[j].itemValue = newData[j].itemValue.replace("%", "");
            newData[j].itemPrice = parseInt(parseInt(value.stp) * parseInt(newData[j].itemValue) / 100)
          }
          arr[1] = newData;
        } else {
          arr[1] = ''
        }
      }
      let hang_check = that.hang_check;
      hang_check['refundArr'] = arr;
      that.hang = hang_check;
      that.refreshPrice(that);
    },
    // 一键下单数据
    setData(oldPassengers, contact, insurance_price, baoObj, that) {
      let forms = that.forms;
      // 支付
      var payData = {
        "bank_num": that.banknum ? that.banknum.replace(/\s+/g, "") : '',
        "bank_name": that.bankName ? that.bankName : '',
        "mon": that.mon ? that.mon : '',
        "year": that.year ? that.year : '',
        "name": that.name ? that.name : '',
        "idcard": that.idcard ? that.idcard.replace(/\s+/g, "") : '',
        "phone": that.phone ? that.phone.replace(/\s+/g, "") : '',
      };
      if (that.bankName && that.bankName != '支付卡所属银行') {
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
      console.log(payData)
      let oneclickData = JSON.parse(getStore("oneclickData")) ? JSON.parse(getStore("oneclickData")) : {};
      console.log(oneclickData)
      for (var j = 0; j < forms.length; j++) {
        if (forms[j].change == true && forms[j].check == true) {
          if (j == 0) {
            var selectPsgs = oldPassengers,
              passengers = { "passenger": [] };
            console.log(selectPsgs)
            for (let i = selectPsgs.length - 1; i >= 0; i--) {
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
            oneclickData["passengers"] = passengers;
          } else if (j == 1) {
            oneclickData["linker_name"] = contact.lian_name;
            oneclickData["linker_phone"] = contact.lian_phone;
          } else if (j == 2) {
            oneclickData["insurances"] = that.insurance_price;
          } else if (j == 3) {
            oneclickData["is_select"] = baoObj.isSelect;
            oneclickData["bao_name"] = baoObj.bao_name;
            oneclickData["bao_phone"] = baoObj.bao_phone;
            oneclickData["bao_address"] = baoObj.bao_address;
            oneclickData["rec_city_ios"] = '';
            oneclickData["rec_city_h5"] = baoObj.values;
          } else if (j == 4) {
            oneclickData["bank_num"] = payData.bank_num;
            oneclickData["bank_name"] = payData.bank_name;
            oneclickData["bank_code"] = bankcode;
            oneclickData["mon"] = payData.mon;
            oneclickData["year"] = payData.year;
            oneclickData["name"] = payData.name;
            oneclickData["idcard"] = payData.idcard;
            oneclickData["phone"] = payData.phone;
          }
        }
      }
      let oData = oneclickData;
      let postData = {
        "data": {
          "passengers": oData.passengers ? oData.passengers : [],
          "linker_name": oData.linker_name ? oData.linker_name : '',
          "linker_phone": oData.linker_phone ? oData.linker_phone : '',
          "insurances": oData.insurances ? oData.insurances : insurance_price,
          "is_select": oData.isSelect ? oData.isSelect : baoObj.isSelect,
          "bao_name": oData.bao_name ? oData.bao_name : '',
          "bao_phone": oData.bao_phone ? oData.bao_phone : '',
          "bao_address": oData.bao_address ? oData.bao_address : '',
          "rec_city_ios": '',
          "rec_city_h5": oData.rec_city_h5 ? oData.rec_city_h5 : baoObj.values,
          "bank_num": oData.bank_num ? oData.bank_num : '',
          "bank_name": oData.bank_name ? oData.bank_name : '',
          "bank_code": bankcode,
          "mon": oData.mon ? oData.mon : '',
          "year": oData.year ? oData.year : '',
          "name": oData.name ? oData.name : '',
          "idcard": oData.idcard ? oData.idcard : '',
          "phone": oData.phone ? oData.phone : '',
          "is_default": '1'
        }
      };
      console.log(postData)
      let token = getStore('token');
      that.$http.post(that.url + '/xxx/api/private/addOrderDefaultSetting', postData, {
        headers: { "Authorization": token },
      }).then(function(res) {
        console.log(res)
      }, function(err) {
        console.log(err)
      })
      // end
    }
  },
}

</script>
<style scoped>
.content {
  background-color: #f8ebc8;
  padding-top: 0.133333rem;
  background-image: url(../assets/img/dingdan_bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  padding-bottom: 1.706667rem;
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
  width: 8.586667rem;
  margin: 0 auto;
  padding: 0 0.64rem;
  margin-top: 0.4rem;
  border-radius: 0.133333rem;
  font-size: 0.373333rem;
  color: #333;
  background-color: #fff;
}

.standar p {
  height: 1.066667rem;
  line-height: 1.066667rem;
  justify-content: space-between;
}

.standar p span {}

.standar .second_span {
  margin-left: 0.56rem;
  color: #e13426;
}


.passenger {
  width: 9.92rem;
  margin: 0 auto;
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
  padding-right: 0.533333rem;
}

.passenger_title {
  font-size: 0.373333rem;
  color: #333;
  height: 0.8rem;
  line-height: 0.8rem;
  /*padding-right: 0.533333rem;*/
  padding-top: 0.106667rem;
}

.passenget_title span {
  color: #002774;
}

.default {
  float: right;
  color: #666;
  padding-left: 0.773333rem;
  font-size: 0.373333rem;
  display: inline-block;
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

.ticket {
  color: #999;
  font-size: 0.32rem;
  background: url(../assets/img/toast.png)no-repeat;
  background-size: 9.68rem 0.533333rem;
  height: 0.533333rem;
  line-height: 0.533333rem;
  width: 9.146667rem;
  margin: 0 auto;
  padding-left: 0.613333rem;
}

.psg_first {
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
  margin: 0 auto;
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
  margin: 0 auto;
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

.insurance {
  height: 1.333333rem;
  font-size: 0.426667rem;
  color: #333;
  border-bottom: 0.013333rem solid #e5e5e5;
  justify-content: initial;
  position: relative;
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

span.point {
  position: absolute;
  display: inline-block;
  height: 0.533333rem;
  line-height: 0.533333rem;
  width: 2.533333rem;
  right: 0.533333rem;
  top: 0.4rem;
  background: url(../assets/img/point_ins.png)no-repeat;
  background-size: 2.533333rem 0.533333rem;
  color: #fff;
  font-size: 0.346667rem;
  text-align: center;
  text-indent: 0.24rem;
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
  margin: 0 auto;
  margin-top: 0.266667rem;
  background-image: url(../assets/img/dingdan_bx_card.png);
  background-repeat: no-repeat;
  background-size: 100% auto;
  padding: 0 0.533333rem;
  font-size: 0.373333rem;
  color: #333;
}

.reimbursement .passenger_title {
  /*padding-right: 0;*/
  justify-content: space-between;
}

.switch {
  width: 1.173333rem;
  height: 0.8rem;
  background-image: url(../assets/img/switch_on.png);
  background-repeat: no-repeat;
  background-size: 100% auto;
  margin-top: 0.053333rem;
  margin-left: -2.666667rem;
  display: inline-block;
}

.switch.check {
  background-image: url(../assets/img/switch_off.png);
  background-size: 100% auto;
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

.foot {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 0.266667rem;
  background-color: #e9e9e9;
  color: #999;
  height: 1.706667rem;
  line-height: 1.706667rem;
  justify-content: initial;
}

.foot p:nth-of-type(1) {
  line-height: 1;
  justify-content: initial;
  margin: 0.266667rem 0.266667rem 0 0.266667rem;
}

.foot p:nth-of-type(1) span:nth-of-type(2) {
  margin-top: 0.266667rem;
}

.foot button {
  font-size: 0.64rem;
  color: #fff;
  background: url(../assets/img/dingdan_pay.png)no-repeat;
  background-size: cover;
  border: 0;
  width: 3.733333rem;
  right: 0;
  position: fixed;
  bottom: 0;
  height: 1.706667rem;
  line-height: 1.706667rem;
}

.look {
  color: #333;
  font-size: 0.32rem;
  padding-right: 0.586667rem;
  margin-left: 0.266667rem;
  display: inline-block;
  background-image: url(../assets/img/more_top.png);
  background-repeat: no-repeat;
  background-size: 0.32rem 0.32rem;
  background-position: right center;
}

.look_top {
  background-image: url(../assets/img/more_foot.png);
  background-repeat: no-repeat;
}

.err {
  text-align: center;
  line-height: 0.4rem;
  color: red;
  font-size: 0.32rem;
  height: 0.4rem;
  line-height: 0.4rem;
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
  top: auto;
  right: auto;
  bottom: 1.706667rem;
  left: 50%;
  -webkit-transform: translate3d(-50%, 0, 0);
  transform: translate3d(-50%, 0, 0);
}

.total {
  color: #424242;
  font-size: 0.4rem;
  padding: 0 0.533333rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 8.933333rem;
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
  bottom: 1.706667rem;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
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

</style>
