<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content">
      <p class="title" @click="rule">姓名规则</p>
      <div class="form">
        <!-- 姓名 -->
        <div class="list" v-show="verifyType == 'idcard'">
          <span>姓名</span>
          <mt-field placeholder="请填写中文姓名" v-model="name" :readonly="readCode" @input="bindInput(name,'name')" @change="checkinput(name,'name','name_err')"></mt-field>
        </div>
        <!-- 英文姓 -->
        <div class="list" v-show="verifyType == 'passport'">
          <span>英文姓</span>
          <mt-field placeholder="请填写英文姓" v-model="last_name" :readonly="readCode" @input="bindInput(last_name,'last_name')" @change="checkinput(last_name,'last_name','last_name_err')"></mt-field>
        </div>
        <!-- 英文名 -->
        <div class="list" v-show="verifyType == 'passport'">
          <span>英文名</span>
          <mt-field placeholder="请填写英文名" v-model="first_name" :readonly="readCode" @input="bindInput(first_name,'first_name')" @change="checkinput(first_name,'first_name','first_name_err')"></mt-field>
        </div>
        <!-- 护照号码 -->
        <div class="list" v-show="verifyType == 'passport'">
          <span>护照</span>
          <mt-field placeholder="请填写护照号码" v-model="passport" :readonly="readCode" @input="bindInput(passport,'passport')" @change="checkinput(passport,'passport','passport_err')"></mt-field>
        </div>
        <!-- 身份证号码 -->
        <div class="list" v-show="verifyType == 'idcard'">
          <span>身份证</span>
          <mt-field placeholder="请填写身份证号码" v-model="idcard" :readonly="readCode" @input="bindInput(idcard,'idcard')" @change="checkinput(idcard,'idcard','idcard_err')"></mt-field>
        </div>
        <div class="list bank" @click="checkbank(readCode)">
          <span>公务卡</span>
          <mt-field placeholder="请选择开卡银行" v-model="backname" :readonly="true" :disableClear="true"></mt-field>
          <i class="next" v-show="!readCode"></i>
        </div>
        <div class="list code" v-show="autologin && needCode " style="margin-top:0.266667rem">
          <span>验证码</span>
          <mt-field placeholder="请填写图片验证码" v-model="code" :attr="{maxlength:8}"></mt-field>
          <img :src="codeImg" alt="" @click="verifyImage()">
        </div>
      </div>
      <button @click="save(code,name,idcard)" v-show="!readCode">保&nbsp;存</button>
      <button @click="delet()" v-show="frompages != 'verify'" class="dele">删&nbsp;除</button>
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
  removeStore,
  checkInput,
  phoneFormat
} from '../config/utils'
export default {
  data() {
    return {
      title: '信息填写',
      isLoading: true,
      name: '',
      backname: '',
      idcard: '',
      first_name: '',
      last_name: '',
      passport: '',
      verifyType: 'idcard',
      phone: '',
      code: '',
      codeImg: '',
      autologin: true,
      needCode: true,
      readCode: false,
      frompages: '',
      editFresh: '',
      trueHeight: ''
    }
  },
  activated: function() {
    this.trueHeight = getStore('trueHeight');
    let bank = JSON.parse(getStore('checkbank'));
    let bankcode = getStore('checkbankcode');
    let frompages = getStore("fromEdit");
    if (frompages == 'verify') {
      let verifyType = getStore('verifyType');
      this.verifyType = verifyType;
      this.needCode = true;
    } else {
      let passenger = JSON.parse(getStore('editPassenger'));
      this.needCode = passenger.is_validate != '1' ? true : false;
      this.verifyType = passenger.identification_type == '3' ? 'passport' : 'idcard';
    }
    this.frompages = frompages;
    console.log(frompages)
    console.log(bankcode === null)
    this.readCode = false;
    let editFresh = getStore("editFresh");
    removeStore('editFresh')
    if(editFresh == 'true'){
      this.last_name = '';
      this.first_name = '';
      this.passport = '';
      this.name = '';
      this.idcard = '';
      this.backname = '';
      this.official_card = '';
      this.passenger_id = '';
      this.title ='信息填写'
    }
    if ((frompages == 'my' || frompages == 'dingdan') && editFresh == 'true') {
      let passenger = JSON.parse(getStore('editPassenger'));
      this.title ='信息编辑';
      this.name = passenger.passenger_name;
      this.idcard = passenger.identification_num;
      this.backname = passenger.official_cardName;
      this.official_card = passenger.official_card;
      this.passenger_id = passenger.passenger_id;
      if (passenger.identification_type == '3') {
        let passenger_ename = passenger.passenger_ename;
        this.last_name = passenger_ename.split('/')[1];
        this.first_name = passenger_ename.split('/')[0];
        this.passport = passenger.passport_number;
      }
      if (passenger.is_validate == 1) {
        // success
        this.readCode = true
      } else {
        // fail
        this.readCode = false;
      }
    }
    if (bankcode && bankcode == 'true') {
      this.backname = bank.KTitle;
      this.official_card = bank.KMark;
      removeStore('checkbank')
      removeStore('checkbankcode')
    }
    let autoData = { data: {} };
    this.$http.post(this.url + '/xxx/api/public/autologin', autoData).then(function(res) {
      console.log("自动登陆")
      console.log(res.body.success)
      if (res.body.success == true) {
        this.autologin = false;
        this.random = ''
      } else {
        this.autologin = true;
        this.verifyImage()
      }
    }, function(err) {
      console.log(err)
    })
    this.isLoading = false;
  },
  components: {
    headTop,
    loading
  },
  methods: {
    delet() {
      let token = getStore("token");
      let postData = {
        data: {
          "passenger_id": this.passenger_id
        }
      }
      this.$http.post(this.url + '/xxx/api/private/deleteDetailFrequentPassenger', postData, {
        headers: { 'Authorization': token }
      }).then(function(res) {
        console.log(res)
        if (res.body.sts == 1) {
          Toast({
            message: '旅客删除成功',
            duration: 3000
          })
          this.$router.go(-1)
        }
      }, function(err) {
        console.log(err)
      })
    },
    rule() {
      this.$router.push({
        path: '/nameRule'
      })
    },
    checkbank(status) {
      if (status != true) {
        this.$router.push({
          path: '/bank'
        })
      }

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
        } else if (name == 'first_name') {
          errMessage = '请输入正确的英文名'
        } else if (name == 'last_name') {
          errMessage = '请输入正确的英文姓'
        }
        //  else if (name == 'passport') {
        //   errMessage = '请输入正确的护照号码'
        // }
        Toast({
          message: errMessage,
          duration: 2000
        })
      }
    },
    // 输入格式化
    bindInput: function(value, name) {
      if (!value) return;
      if (name == 'idcard') {
        var idcard = value.toUpperCase().replace(/\s+/g, "");
        if (idcard.length == 18) {
          let matches_0 = idcard.substring(0, 6);
          let matches_1 = idcard.substring(6, 14);
          let matches_2 = idcard.substring(14);
          var newNum = matches_0 + ' ' + matches_1 + ' ' + matches_2;
          this.idcard = newNum;
        }
      } else if (name == 'last_name' || name == 'first_name' || name == 'passport') {
        this[name] = value.toUpperCase()
      }
    },
    // 验证码图片
    verifyImage() {
      let bank = JSON.parse(getStore('checkbank'));
      let token = getStore('token');
      this.$http.get(this.url + '/xxx/api/public/verifyImage', {
        headers: { 'Authorization': token }
      }).then(function(res) {
        console.log(res.body)
        this.random = res.body.random;
        this.codeImg = res.body.url;
      }, function(err) {

      })
    },
    save(code, name, idcard) {
      console.log(checkInput(name, 'name'))
      console.log(checkInput(idcard, 'idcard'))
      let token = getStore('token');
      let userinfo = JSON.parse(getStore('userinfo'))
      if (this.verifyType == 'idcard') {
        if (!checkInput(name, 'name') || !checkInput(idcard, 'idcard')) {
          Toast({
            message: '请将信息填写完整',
            duration: 2000
          })
          return;
        }
        var postData = {
          data: {
            memberId: userinfo.memberid,
            random: this.random,
            identification_type: 1,
            official_card: this.official_card ? this.official_card : '',
            verifyCode: code,
            is_civil_servant: 1,
            budget_unit_name: '',
            passenger_id: this.passenger_id ? this.passenger_id : '',
            passenger_name: name,
            passenger_phone: "",
            start: "1",
            count: "",
            sex: '',
            passenger_ename: '',
            identification_type: '1',
            identification_num: idcard ? idcard.replace(/\s+/g, "") : '',
            phone: "",
            date_of_birth: '',
            nationality: "",
            passport_number: '',
            passport_valid: '',
            passenger_type: '1',
          }
        }
      } else if (this.verifyType == 'passport') {
        let last_name = this.last_name,
          first_name = this.first_name,
          passport = this.passport;
        if (!checkInput(first_name, 'first_name')) {
          Toast({
            message: '请将信息填写完整',
            duration: 2000
          })
          return;
        }
        var postData = {
          data: {
            memberId: userinfo.memberid,
            random: this.random,
            official_card: this.official_card ? this.official_card : '',
            verifyCode: code,
            is_civil_servant: 1,
            budget_unit_name: '',
            passenger_id: this.passenger_id ? this.passenger_id : '',
            passenger_name: '',
            passenger_phone: "",
            start: "1",
            count: "",
            sex: '',
            passenger_ename: first_name + '/' + last_name,
            identification_type: '3',
            identification_num: '',
            phone: "",
            date_of_birth: '',
            nationality: "",
            passport_number: passport,
            passport_valid: '',
            passenger_type: '1',
          }
        }
      }

      this.$http.post(this.url + '/xxx/api/private/validate', postData, {
        headers: { 'Authorization': token }
      }).then(function(res) {
        console.log(res)
        let message = res.body.message;
        Toast({
          message: message,
          duration: 2000
        })
        if (message.indexOf('验证码错误') > -1 || message.indexOf('验证码过期') > -1) {
            this.verifyImage();
            this.code = '';
            return;
        }
        if (this.frompages == 'verify') {
          this.$router.go(-2)
        } else {
          this.$router.go(-1)
        }
      }, function(err) {
        console.log(err)
        if (err.body.status == '500') {
          Toast({
            message: '网络故障,请稍后重试！',
            duration: 2000
          })
          this.autologin = true;
          this.verifyImage();
          this.code = '';
          return;
        }
      })
    }
  },
}

</script>
<style scoped>
.content {
  background-color: #f8ebc8;
  padding-top: 1.173333rem;
  text-align: center;
}

.title {
  padding-left: 0.8rem;
  color: #e96b39;
  font-size: 0.426667rem;
  height: 0.586667rem;
  line-height: 0.586667rem;
  background: url(../assets/img/mark.png)no-repeat right bottom;
  background-size: 0.586667rem 0.586667rem;
  width: 2.4rem;
  text-align: left;
  padding-top: 0.266667rem;
}

.form {
  margin: 0.266667rem 0 0.533333rem;
  /*background-color: #fff;*/
  width: 100%;
  /*padding: 0 0.533333rem;*/
  text-align: left;
}

.list {
  font-size: 0.426667rem;
  color: #666;
  height: 1.333333rem;
  padding: 0 0.533333rem;
  line-height: 1.333333rem;
  border-bottom: 0.026667rem solid #eee;
  background-color: #fff;
}

.last {
  background: none;
}

.list * {
  vertical-align: middle;
}

.list span {
  width: 2.133333rem;
  display: inline-block;
  text-align: left;
  font-size: 0.426667rem;
}

.list .mint-cell {
  display: inline-block;
  color: #666;
  width: 5.333333rem;
}

.list .mint-cell-wrapper {
  font-size: 0.48rem;
}

.bank .mint-cell {
  width: 5.333333rem;
}

.code .mint-cell {
  width: 4.0rem;
}

.next {
  background: url(../assets/img/icon_more.png)no-repeat;
  background-size: 0.8rem 0.8rem;
  width: 0.8rem;
  height: 0.8rem;
  display: inline-block;
}

button {
  width: 8.533333rem;
  height: 1.2rem;
  line-height: 1.2rem;
  border: none;
  background-color: transparent;
  background-image: url(../assets/img/edit_login.png);
  background-repeat: no-repeat;
  background-size: 8.533333rem 1.2rem;
  color: #fff;
  font-size: 0.64rem;
  margin-top: 0.96rem;
}

button.dele {
  background-image: url(../assets/img/edit_dele.png);
  color: #666;
}

</style>
