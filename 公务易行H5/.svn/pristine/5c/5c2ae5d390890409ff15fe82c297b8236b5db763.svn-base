<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content">
      <div class="top row" style="background-image:none">
        <img src="../assets/img/bg_touxiang.png">
        <p class="customer">特航会员</p>
      </div>
      <div style="margin-top:0.533333rem;">
        <p class="top list" style="background-image:none"><span>绑定手机</span><span>{{phone}}</span></p>
        <p class="top list" @click="name()"><span>昵称</span><span>{{nickname}}</span><span class="icon_more"></span></p>
        <p class="top list" @click=""><span>性别</span>
          <span @click="sheetVisible = true">{{sex == 'M' ? '男':'女'}}</span>
          <span class="icon_more"></span>
          <mt-actionsheet :actions="actions" v-model="sheetVisible" cancelText=""></mt-actionsheet>
        </p>
        <p class="top list" @click="openPicker()"><span>生日</span><span>{{birthday}}</span><span class="icon_more"></span></p>
        <mt-datetime-picker ref="picker" type="date" v-model="pickerValue" :startDate="startDate" :endDate="endDate" @confirm="handleConfirm"></mt-datetime-picker>
      </div>
      <div class="esc" @click="tui()">退出登录</div>
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
  addZero
} from '../config/utils'
export default {
  data() {
    return {
      title: '个人资料',
      isLoading: true,
      pickerValue: new Date('1990-06-15'),
      startDate: new Date('1900-01-01'),
      endDate: new Date(),
      birthday:'',
      actions: [],
      sheetVisible: false,
      sex: 'M',
      phone: '',
      nickname: '',
      trueHeight:''
    }
  },
  activated: function() {
    this.trueHeight = getStore('trueHeight');
    this.isLoading = false;
    let userinfo = JSON.parse(getStore('userinfo'));
    let nickname = getStore('nickname');
    // console.log(userinfo)
    this.phone = userinfo.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    this.sex = userinfo.sex;
    this.birthday = userinfo.dateofbirth;
    if(nickname){
      this.nickname = nickname;
      removeStore('nickname')
      this.set()
    }else{
      this.nickname = userinfo.nickname;
    }
  },
  components: {
    headTop,
    loading
  },
  mounted() {
    this.actions = [{
      name: '男',
      method: this.selectSex
    }, {
      name: '女',
      method: this.selectSex
    }]
  },
  methods: {
    tui() {
      MessageBox({
        title: '提示',
        message: '确定退出?',
        showCancelButton: true,
        confirmButtonspan: '确定',
        cancelButtonspan: '取消',
      }).then(action => {
        console.log(action)
        if (action == 'confirm') {
          // 解除绑定
          removeStore('token');
          removeStore('order');
          removeStore('userinfo')
          removeStore('weChatUserinfo')
          this.$router.replace({
            path: '/home'
          })
        }
      })
    },
    name() {
      this.$router.push({
        path: '/name'
      })
    },
    // datepicker
    openPicker() {
      this.$refs.picker.open();
    },
    // 生日
    handleConfirm(value) {
      let year = value.getFullYear();
      let month = value.getMonth() + 1;
      let day = value.getDate();
      this.birthday = year + '-' + addZero(month) + '-' + addZero(day);
      this.set()
    },
    selectSex(value) {
      if (value.name == '男') {
        this.sex = 'M'
        this.sexText = '男'
      } else {
        this.sex = 'F'
        this.sexText = '女'
      }
      this.set()
    },
    set() {
      var postData = {};
      postData.data = {
        nickname: this.nickname,
        birthday: this.birthday,
        sex: this.sex,
      };
      console.log(postData)
      let token = getStore('token');
      this.$http.post(this.url + '/xxx/api/private/updateCivilUserinfo', postData, {
        headers: { "Authorization": token },
      }).then(function(res) {
        console.log(res)
        if(res.body.sts == 1){
          var data = res.body.data;
          setStore('userinfo', data.userinfo)
        }
      }, function(err) {
        console.log(err)
      });
    }
  },
}

</script>
<style scoped>
.content {
  padding-top: 0.533333rem;
  background-color: #f2f2f2;
  margin-top: 1.173333rem;
}

.top {
  padding: 0 0.533333rem;
  height: 1.653333rem;
  line-height: 1.653333rem;
  justify-content: initial;
  background-color: #fff;
  position: relative;
}
.icon_more{
  display: inline-block;
  width: 0.64rem;
  height: 0.64rem;
  background-image: url(../assets/img/icon_more3.png);
  background-repeat: no-repeat;
  background-size: 0.64rem 0.64rem;
  background-position:center;
  position: absolute;
  right: 0.533333rem;
  top: 0.346667rem;
  bottom: 0.346667rem;
}
.top img {
  width: 1.333333rem;
  height: 1.333333rem;
  margin-top: 0.16rem;
  margin-right: 0.533333rem;
}

.customer {
  font-size: 0.48rem;
  color: #333;
}

.list {
  height: 1.333333rem;
  line-height: 1.333333rem;
  margin-top: 0;
  font-size: 0.426667rem;
  color: #666;
  border-bottom: 0.013333rem solid #eee;
  background-color: #fff;
  padding-right: 1.333333rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.list span:nth-of-type(2) {
  color: #333;
}

.esc {
  height: 1.333333rem;
  line-height: 1.333333rem;
  font-size: 0.426667rem;
  color: #333;
  background-color: #fff;
  text-align: center;
  border: 0;
  margin-top: 0.533333rem;
}
</style>
