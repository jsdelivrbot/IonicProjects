<template>
  <div class="container">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content">
      <div class="phone">
        <mt-field placeholder="请输入您的手机号" v-model="login_phone" @input="bindInput(login_phone,'login_phone')" @change="checkinput(login_phone,'login_phone','login_phone_err')" :attr="{ maxlength: 13 }" placeholder-style="color:#828282;"></mt-field>
      </div>
      <div :class="{err:login_phone_err != '' }">{{login_phone_err}}</div>
      <!-- 验证码 -->
      <div class="code">
        <mt-field placeholder="请输入验证码" v-model="code" @input="bindInput(code,'code')" @change="checkinput(code,'code','code_err')" :attr="{ maxlength: 6 }" placeholder-style="color:#828282;"></mt-field>
        <span class="line"></span>
        <span @click="getcode(login_phone)">{{getcode_word}}</span>
      </div>
      <div :class="{err:code_err != '' }">{{code_err}}</div>
    </div>
  </div>
</template>
<script type="text/javascript">
import loading from './loading'
import headTop from './head'
import {
  getStore,
  setStore,
  checkInput
} from '../config/utils'
export default {
  data() {
    return {
      title: '绑定手机号',
      isLoading: true,
      login_phone:'',
      login_phone_err:'',
      code:'',
      code_err:''
    }
  },
  activated: function() {
    this.isLoading = false;
  },
  components: {
    headTop,
    loading
  },
  methods: {
    // 校验
    checkinput(value, name, err) {
      console.log(name)
      if (!checkInput(value, name)) {
        if (name == 'login_phone') {
          this[err] = '请输入正确的手机号码'
        } else if (name == 'code') {
          this[err] = '请输入6位数的验证码'
        }
      } else {
        this[err] = ''
      }
    },
    // 输入格式化
    bindInput: function(value, name) {
      console.log(value)
      if (!value) return;
      if (value.replace(/\s+/g, "").length == 11) {
        if (name == 'login_phone') {
          this.login_phone = phoneFormat(value.replace(/\s+/g, ""))
        }
      }
    },
    getcode(phone) {
      var that = this;
      if (!checkInput(phone, 'login_phone')) {
        if(that.getcode_word != '获取验证码' && that.getcode_word != '重新获取'){
          return;
        }
      }
      let postData = {
        data: { phoneNumber: phone.replace(/\s+/g, "") }
      };
      console.log(postData);
      that.$http.post(that.url+'/xxx/api/public/mobileValideCodeSend', postData).then(function(res) {
        console.log("获取验证码成功:")
        console.log(res)
        var countdown = 60;
        (function settime() {
          if (countdown == 0) {
            that.getcode_word = "重新获取";
            countdown = 60;
            return;
          } else {
            that.getcode_word = countdown + "s";
            countdown--;
          }
          setTimeout(function() {
            settime()
          }, 1000)
        })()
      }, function(argument) {
        // body...
      })
    },
    login() {
      var that = this;
      if (!checkInput(phone, 'login_phone') || !checkInput(code, 'code')) {
        return;
      }
      let userInfo = JSON.parse(getStore('weChatUserinfo'));
      let postDataU = {
        data: {
          'unionId': userInfo.unionid,
          'wechatnickname': userInfo.nickname,
          'phoneNumber': that.phone.replace(/\s+/g, ""),
          'validateCode': code
        }
      }
      that.$http.post(that.url+'/xxx/api/civilsignin/bindPhoneWithWechatUnionId', postDataU).then(function(res) {
        console.log(res)
        setStore('token', res.body.token);
        setStore('userinfo', res.body.data.data.userinfo);
        let AfterSignin = getStore('gotoAfterSignin')
        if (AfterSignin != 'home') {
          Toast({
            message: '登录成功',
            duration: 2000
          })
          that.$router.go(-2)
        } else {
          this.$emit('login')
        }
      }, function(err) {})
    }
  },
}

</script>
<style scoped>


</style>
