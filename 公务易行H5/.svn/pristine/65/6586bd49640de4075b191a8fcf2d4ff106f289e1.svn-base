<template>
  <div class="container">
    <div class="top">
      <span @click="$router.go(-1)">取消</span>
      <span @click="register" class="sure">{{title_r}}</span>
    </div>
    <div class="content">
      <h1 class='logo'>{{title_h1}}</h1>
      <!-- 手机号 -->
      <div class="phone">
        <mt-field placeholder="请输入您的手机号" v-model="login_phone" @input="bindInput(login_phone,'login_phone')" @change="checkinput(login_phone,'login_phone','login_phone_err')" :attr="{ maxlength: 13 }" placeholder-style="color:#828282;"></mt-field>
      </div>
      <!-- 验证码 -->
      <div class="code" v-show="!register_code || login_state">
        <mt-field placeholder="请输入验证码" v-model="code" type="number" @input="bindInput(code,'code')" @change="checkinput(code,'code','code_err')" :attr="{ maxlength: 6 }" placeholder-style="color:#828282;"></mt-field>
        <span class="line"></span>
        <span @click="getcode(login_phone)">{{getcode_word}}</span>
      </div>
      <!-- 密码 -->
      <div class="password" v-show="!register_code || !login_state">
        <mt-field placeholder="请输入6-20位密码" v-model="password" @input="bindInput(password,'password')" @change="checkinput(password,'password','password_err')" :attr="{ maxlength: 20 }" placeholder-style="color:#828282;" :type="input_type"></mt-field>
        <span @click="showPwd" :class="{pwd:pwdshow}"></span>
      </div>
      <!-- 推荐人 -->
      <p class="low" v-show="!register_code">推荐人手机号(若有)</p>
      <p class="high" v-show="!register_code">填写推荐人 (已注册用户)手机号，双方将获得积分哦~</p>
      <div class="phone" style="margin-top:0;" v-show="!register_code">
        <mt-field placeholder="请输入推荐人手机号(选填)" v-model="reference_phone" @input="bindInput(reference_phone,'reference_phone')" @change="checkinput(reference_phone,'reference_phone','reference_phone_err')" :attr="{ maxlength: 13 }" placeholder-style="color:#828282;"></mt-field>
      </div>
      <button @click="login(login_phone,reference_phone,code,password,register_code,login_state)" :class="{dis:btn_dis}">{{btn_word}}</button>
      <div v-show="register_code">
        <p @click="style" class="logins">{{login_style}}</p>
        <!-- <p class="other">其他登录方式</p>
        <img src="../assets/img/wchat.png" alt="" class="wx" @click="wechat()"> -->
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
  checkInput,
  phoneFormat,
  removeStore
} from '../config/utils'
export default {
  data() {
    return {
      title: '登录',
      title_r: '注册',
      title_h1: '公务易行账户登录',
      login_code: true,
      btn_word: '登录',
      getcode_word: '获取验证码',
      login_phone: '',
      reference_phone: '',
      code: '',
      password: '',
      pwdshow: false,
      input_type: 'password',
      login_state: true,
      login_style: '密码登录',
      register_code: true,
      fromlogin: true,
      btn_dis: true,
      Ismenber: ''
    }
  },
  mounted: function() {
    let AfterSignin = getStore('gotoAfterSignin')
    removeStore('gotoAfterSignin')
  },
  activated: function() {
    this.login_phone = '';
    this.code = '';
    this.password = '';
    this.input_type = 'password';
    this.reference_phone = '';
    this.login_code = true;
    this.title_h1 = '公务易行账户登录';
    this.title_r = '注册';
    this.btn_word = '登录';
    this.register_code = true;
    this.login_state = true;
    this.login_style = '密码登录';
    this.password = '';
  },
  components: {
    headTop
  },
  methods: {
    // 微信登录
    wechat() {
      var auths = null,
        that = this;
      plus.oauth.getServices(function(services) {
        auths = services;
        var s;
        for (var i = 0; i < auths.length; i++) {
          if (auths[i].id == 'weixin') {
            s = auths[i];
            break;
          }
        }
        if (!s.authResult) {
          console.log(JSON.stringify(s))
          s.login(function(e) {
            // 获取登录操作结果
            s.getUserInfo(function(e) {
              console.log("获取用户信息成功：" + JSON.stringify(s.userInfo));
              let userInfo = JSON.stringify(s.userInfo);
              let unionId = userInfo.unionid
              setStore('weChatUserinfo', userInfo)
              let postData = {
                data: {
                  'unionId': unionId
                }
              }
              //注销
              authLogout();
              that.$http.post(that.url + '/xxx/api/civilsignin/byWechatUnionId', postData).then(function(res) {
                console.log(res)
                if (res.body.sts == 1) {
                  setStore('token', res.body.token);
                  setStore('userinfo', res.body.data.data.userinfo);
                  let AfterSignin = getStore('gotoAfterSignin')
                  if (AfterSignin != 'home') {
                    Toast({
                      message: '登录成功',
                      duration: 2000
                    })
                    that.$router.go(-1)
                  } else {
                    this.$emit('login')
                  }
                } else {
                  console.log("未绑定unionid")
                  this.$router.push({
                    path: '/weChatLogin'
                  })
                }
              }, function(err) {

              });
            }, function(e) {
              console.log("获取用户信息失败：" + e.message + " - " + e.code);
            });
          }, function(e) {
            alert('登录认证失败');
          });
        } else {
          //已经登录认证
          alert('登录成功');
        }
      }, function(e) {
        console.log("获取登录失败：" + e.message + " - " + e.code);
      });
      //注销
      function authLogout() {
        for (var i in auths) {
          var s = auths[i];
          if (s.authResult) {
            s.logout(function(e) {
              console.log("注销登录认证成功！");
            }, function(e) {
              console.log("注销登录认证失败！");
            });
          }
        }
      }
    },
    register() {
      this.login_code = !this.login_code;
      if (this.login_code) {
        this.title_h1 = '公务易行账户登录';
        this.title_r = '注册';
        this.btn_word = '登录';
        this.register_code = true;
      } else {
        this.title_h1 = '公务易行账户注册';
        this.title_r = '登录';
        this.btn_word = '注册';
        this.register_code = false;
      }
    },
    style() {
      this.login_state = !this.login_state;
      if (this.login_state) {
        this.login_style = '密码登录';
        this.password = '';
      } else {
        this.login_style = '手机验证码登录';
        this.code = '';
      }
    },
    showPwd() {
      this.pwdshow = !this.pwdshow;
      if (this.pwdshow == true) {
        this.input_type = 'text'
      } else {
        this.input_type = 'password'
      }
    },
    // 校验
    checkinput(value, name, err) {
      console.log(name)
      if (!checkInput(value, name)) {
        let errMessage = '';
        if (name == 'login_phone') {
          errMessage = '请输入正确的手机号码'
        } else if (name == 'code') {
          errMessage = '请输入6位数的验证码'
        } else if (name == 'password') {
          errMessage = '请输入6-20位的密码'
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
        if (name == 'login_phone') {
          this.login_phone = phoneFormat(value.replace(/\s+/g, ""))
        } else if (name == 'reference_phone') {
          this.reference_phone = phoneFormat(value.replace(/\s+/g, ""))
        }
      }
      if (checkInput(this.login_phone, 'phone')) {
        if (this.register_code == false) {
          if (checkInput(this.code, 'code') && checkInput(this.password, 'password')) {
            this.btn_dis = false;
          } else {
            this.btn_dis = true;
          }
        } else {
          if (checkInput(this.code, 'code') || checkInput(this.password, 'password')) {
            this.btn_dis = false;
          } else {
            this.btn_dis = true;
          }
        }
      } else {
        this.btn_dis = true;
      }
    },
    getcode(phone) {
      var that = this;
      that.Ismenber = '';
      console.log(!checkInput(phone, 'login_phone'))
      if (!checkInput(phone, 'login_phone')) {
        Toast({
          message: '请输入正确的手机号码',
          duration: 2000
        })
        return;
      }
      if (that.getcode_word != '获取验证码' && that.getcode_word != '重新获取') {
        return;
      }
      let postData = {
        data: { phoneNumber: phone.replace(/\s+/g, "") }
      };
      that.$http.post(that.url + '/xxx/api/civilsignin/IsMember', postData).then(function(res) {
        console.log(res.body.sts)
        if (res.body.sts == 1) {
          // 是会员
          if (that.register_code == false) {
            Toast({
              message: '该用户已是会员!',
              duration: 2000
            })
            that.login_code = true;
            that.title_h1 = '公务易行账户登录';
            that.title_r = '注册';
            that.btn_word = '登录';
            that.register_code = true;
            return;
          }
        } else if (res.body.sts == -1) {
          // 不是会员
          if (that.register_code == true) {
            Toast({
              message: '该用户还未注册，请注册后登陆!',
              duration: 2000
            })
            that.login_code = false;
            that.title_h1 = '公务易行账户注册';
            that.title_r = '登录';
            that.btn_word = '注册';
            that.register_code = false;
            return;
          }
        }
        console.log(postData);
        that.$http.post(that.url + '/xxx/api/public/mobileValideCodeSend', postData).then(function(res) {
          console.log(res)
          if (res.body.sts == 1) {
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
          } else if (res.body.sts == -1) {
            Toast({
              message: res.body.errorMsg,
              duration: 2000
            })
          }
        }, function(err) { console.log('短信发送') })
      }, function(err) { console.log('IsMember') })
    },
    login(phone, reference_phone, code, password, register_code, login_state) {
      var that = this;
      that.Ismenber = '';
      console.log(register_code)
      console.log(login_state)
      if (register_code) {
        if (login_state) {
          // 验证码登录
          if (!checkInput(phone, 'login_phone') || !checkInput(code, 'code')) {
            return;
          }
          let postData = {
            data: {
              phoneNumber: phone.replace(/\s+/g, ""),
              validateCode: code,
              passWord: '',
              type: 2,
              recommended: ''
            }
          };
          that.$http.post(that.url + '/xxx/api/civilsignin/byPhoneAndH5', postData).then(function(res) {
            console.log(res);
            if (res.body.sts == 1) {
              setStore('token', res.body.token);
              setStore('userinfo', res.body.data.data.userinfo);
              let AfterSignin = getStore('gotoAfterSignin');
              Toast({
                message: '登录成功',
                duration: 2000
              })
              that.$router.go(-1)
            } else {
              MessageBox('提示', res.body.emg)
            }
          }, function(err) {})

        } else {
          // 密码登录
          if (!checkInput(phone, 'login_phone') || !checkInput(password, 'password')) {
            return;
          }
          var postData = {
            data: {
              phoneNumber: phone.replace(/\s+/g, ""),
              passWord: password,
              type: 2
            }
          }
          console.log(postData)
          that.$http.post(that.url + '/xxx/api/civilsignin/loginFromByPp', postData).then(function(res) {
            console.log(res);
            if (res.body.sts == 1) {
              setStore('token', res.body.token);
              setStore('userinfo', res.body.data.data.userinfo);
              let AfterSignin = getStore('gotoAfterSignin')
              Toast({
                message: '登录成功',
                duration: 2000
              })
              that.$router.go(-1)
            } else {
              MessageBox('提示', res.body.emg)
            }
          }, function(argument) {
            // body...
          })
          return;
        }
      } else {
        // 注册
        if (!checkInput(code, 'code') || !checkInput(phone, 'login_phone') || !checkInput(password, 'password')) {
          return;
        }
        let postData = {
          data: {
            phoneNumber: phone.replace(/\s+/g, ""),
            validateCode: code,
            passWord: password,
            type: 2,
            recommended: reference_phone ? reference_phone.replace(/\s+/g, "") : ''
          }
        };
        if (reference_phone) {
          if (!checkInput(reference_phone, 'reference_phone')) {
            Toast({
              message: '请输入正确的手机号码',
              duration: 2000
            })
            return;
          } else {
            let postDat = {
              data: { phoneNumber: reference_phone.replace(/\s+/g, "") }
            };
            that.$http.post(that.url + '/xxx/api/civilsignin/IsMember', postDat).then(function(res) {
              console.log(res.body.sts)
              if (res.body.sts == 1) {
                // 是会员
                that.$http.post(that.url + '/xxx/api/civilsignin/byPhoneAndH5', postData).then(function(res) {
                  console.log(res);
                  if (res.body.sts == 1) {
                    setStore('token', res.body.token);
                    setStore('userinfo', res.body.data.data.userinfo);
                    let AfterSignin = getStore('gotoAfterSignin');
                    Toast({
                      message: '注册成功',
                      duration: 2000
                    })
                    that.$router.go(-1)
                  } else {
                    MessageBox('提示', res.body.emg)
                  }
                }, function(err) {})
              } else if (res.body.sts == -1) {
                // 不是会员
                Toast({
                  message: '该推荐人不是会员，请重新填写推荐人手机号！',
                  duration: 2000
                })
                return;
              }
            }, function(err) { console.log('Ismenber') })
          }
        } else {
          that.$http.post(that.url + '/xxx/api/civilsignin/byPhoneAndH5', postData).then(function(res) {
            console.log(res);
            if (res.body.sts == 1) {
              setStore('token', res.body.token);
              setStore('userinfo', res.body.data.data.userinfo);
              let AfterSignin = getStore('gotoAfterSignin');
              Toast({
                message: '注册成功',
                duration: 2000
              })
              that.$router.go(-1)
            } else {
              MessageBox('提示', res.body.emg)
            }
          }, function(err) {})
        }
        // end
      }
    },
  }
}

</script>
<style scoped>
.container {
  margin-top: 0;
  background-image: url(../assets/img/login_bg.png);
  background-repeat: no-repeat;
  background-size: 100% auto;
}

.content {
  padding-top: 1.493333rem;
  height: 15.12rem;
  text-align: center;
}

.top {
  height: 1.173333rem;
  line-height: 1.173333rem;
  padding: 0 0.64rem;
  color: #fff;
  font-size: 0.426667rem;
  text-align: left;
}

.top span:nth-of-type(2) {
  color: #fff;
  float: right;
}

.content .logo {
  color: #fff;
  font-size: 0.8rem;
}

.phone,
.code,
.password {
  margin: 0 auto;
  background-image: url(../assets/img/input_bd.png);
  background-repeat: no-repeat;
  background-size: 8.24rem 1.333333rem;
  width: 7.6rem;
  height: 1.333333rem;
  padding-left: 0.64rem;
  font-size: 0.426667rem;
  color: #999;
}

.phone .mint-cell,
.password .mint-cell {
  background: none;
  text-decoration: none;
  width: 7.2rem;
}

.phone {
  text-align: left;
  margin-top: 2.133333rem;
}

.code {
  text-align: left;
  margin: 0.533333rem auto;
  color: #e96b39;
  font-size: 0.426667rem;
  padding-right: 0.64rem;
  width: 6.96rem;
}

.code .mint-cell {
  background: none;
  width: 3.733333rem;
  display: inline-block;
  text-decoration: none;
}

.code .line {
  display: inline-block;
  width: 0.266667rem;
  height: 0.666667rem;
  background: url(../assets/img/line.png)no-repeat;
  background-size: 0.026667rem 0.666667rem;
  margin-right: 0.533333rem;
}

.code span:nth-of-type(2) {
  min-width: 2.0rem;
  text-align: center;
  display: inline-block;
  margin-top: -0.08rem;
}

.code * {
  vertical-align: middle;
}

.password {
  margin: 0.533333rem auto;
  padding-right: 0.64rem;
  width: 6.96rem;
  text-align: left;
}

.password .mint-cell {
  background: none;
  width: 6.133333rem;
  display: inline-block;
  text-decoration: none;
}

.password span {
  display: inline-block;
  width: 0.64rem;
  height: 0.64rem;
  background: url(../assets/img/pwd_close.png)no-repeat;
  background-size: 0.64rem 0.64rem;
}

.password span.pwd {
  background: url(../assets/img/pwd_open.png)no-repeat;
  background-size: 0.64rem 0.64rem;
}

.password * {
  vertical-align: middle;
}

.low {
  width: 8.266667rem;
  color: #666;
  font-size: 0.373333rem;
  text-align: left;
  margin: 0 auto;
}

.high {
  width: 8.266667rem;
  margin: 0 auto;
  font-size: 0.32rem;
  color: #e94b31;
  margin-bottom: 0.32rem;
  text-align: left;
}

button {
  width: 8.773333rem;
  height: 1.44rem;
  border: 0;
  background: url(../assets/img/edit_login.png)no-repeat 0 0.08rem;
  background-size: 8.773333rem 1.44rem;
  color: #fff;
  font-size: 0.533333rem;
  margin-top: 0.8rem;
}

button.dis {
  background: url(../assets/img/login_dis.png)no-repeat 0 0.08rem;
  background-size: 100% auto;
}

.logins {
  color: #e96b39;
  margin: 0.533333rem 0 0.8rem;
  font-size: 0.4rem;
}

.other {
  color: #999;
  font-size: 0.373333rem;
  background: url(../assets/img/other.png)no-repeat center;
  background-size: 8.933333rem 0.04rem;
}

.wx {
  width: 1.333333rem;
  height: 1.333333rem;
  margin-top: 0.8rem;
}

</style>
