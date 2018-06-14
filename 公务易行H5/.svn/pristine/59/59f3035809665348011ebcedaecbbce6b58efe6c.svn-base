<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content">
      <div class="list">
        <span>旧的密码</span>
        <mt-field placeholder="请输入旧密码" v-model="oldpwd" @input="bindInput(oldpwd,'oldpwd')" @change="checkinput(oldpwd,'oldpwd','oldpwd_err')"></mt-field>
      </div>
      <div :class="{err:oldpwd_err != '' }">{{oldpwd_err}}</div>
      <div class="list">
        <span>新的密码</span>
        <mt-field placeholder="请输入6-20位新密码" v-model="newpwd" @input="bindInput(newpwd,'newpwd')" @change="checkinput(newpwd,'newpwd','newpwd_err')"></mt-field>
      </div>
      <div :class="{err:newpwd_err != '' }">{{newpwd_err}}</div>
      <div class="list">
        <span>再次确认</span>
        <mt-field placeholder="再次确认新的密码" v-model="newpwd2" @input="bindInput(newpwd2,'newpwd2')" @change="checkinput(newpwd2,'newpwd2','newpwd2_err')"></mt-field>
      </div>
      <div :class="{err:newpwd2_err != '' }">{{newpwd2_err}}</div>
      <button @click="sure(oldpwd,newpwd,newpwd2)">确认</button>
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
  checkInput
} from '../config/utils'
export default {
  data() {
    return {
      title: '修改密码',
      isLoading: true,
      oldpwd: '',
      oldpwd_err: '',
      newpwd: '',
      newpwd_err: '',
      newpwd2: '',
      newpwd2_err: '',
      trueHeight:''
    }
  },
  activated: function() {
     this.trueHeight = getStore('trueHeight');
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
        if (name == 'password') {
          this[err] = '请输入6-20位的密码'
        }
      } else {
        this[err] = ''
      }
    },
    // 输入格式化
    bindInput: function(value, name) {
      console.log(value)
      if (!value) return;
    },
    sure(oldpwd, newpwd, newpwd2) {
      if(!(checkInput(oldpwd,'password') && checkInput(newpwd,'password') && checkInput(newpwd2,'password'))){
        Toast({
          message: '请输入6-20位的密码',
          duration: 2000
        })
        return;
      }
      if (newpwd != newpwd2) {
        Toast({
          message: '俩次输入的新密码不一致',
          duration: 2000
        })
        return;
      }
      // 修改密码
      let postData = {
        data: {
          'oldPassword': oldpwd,
          'newPassword': newpwd
        }
      }
      let token = getStore('token')
      this.$http.post(this.url+'/xxx/api/private/updateCivilPassword', postData, {
        headers: { "Authorization": token },
      }).then(function(res) {
        console.log(res)
        if(res.body.sts == 1){
           Toast({
            message: '密码修改成功',
            duration: 2000
          });
           this.$router.go(-1)
        }
      }, function(err) {

      })
    }
  },
}

</script>
<style scoped>
.content {
  text-align: center;
  padding-top: 0.533333rem;
  background-color: #eee;
  margin-top: 1.173333rem;
}

.list {
  background-color: #fff;
  text-align: left;
  margin: 0 auto;
  font-size: 0.426667rem;
  color: #666;
  height: 1.333333rem;
  line-height: 1.333333rem;
  border-bottom: 0.013333rem solid #eee;
  padding: 0 0.533333rem;
}

.last {
  background: none;
}

.dashed {
  background: url(../assets/img/dashed.png)no-repeat;
  background-size: 8.053333rem 0.026667rem;
  width: 8.053333rem;
  height: 0.026667rem;
  margin: 0 auto;
}

.list * {
  vertical-align: middle;
}

.list span {
  margin-right: 0.8rem;
  display: inline-block;
  text-align: left;
  font-size:0.4rem;
}

.list .mint-cell {
  display: inline-block;
  color: #999;
  width: 5.333333rem;
}

.list .mint-cell-wrapper {
  font-size: 0.48rem;
}

button {
  margin-top: 0.933333rem;
  width: 8.773333rem;
  height: 1.44rem;
  border: 0;
  background: url(../assets/img/edit_login.png)no-repeat 0 0.08rem;
  background-size: 8.773333rem 1.44rem;
  color: #fff;
  font-size: 0.533333rem;
}

.err {
  text-align: center;
  line-height: 0.4rem;
  color: red;
  font-size: 0.32rem;
  height: 0.4rem;
  line-height: 0.4rem;
}

</style>
