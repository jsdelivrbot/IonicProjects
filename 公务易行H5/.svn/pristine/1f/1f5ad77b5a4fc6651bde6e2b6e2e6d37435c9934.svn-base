<template>
  <div class="container">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content">
      <img src="../assets/img/un_phone.png"></img>
      <p style="margin: 0.4rem 0;color:#000;font-size:0.4rem"><span>{{bound}}</span>{{phone}} 手机号</p>
      <p style="color:#424242;font-size:0.32rem;">解绑后将查询不到该账号的订单</p>
      <p style="color:#424242;font-size:0.32rem;margin-top:0.133333rem;">请谨慎操作</p>
      <p class="qu" @click="next">去解绑</p>
    </div>
  </div>
</template>
<script type="text/javascript">
import loading from './loading'
import { Toast, MessageBox } from 'mint-ui'
import headTop from './head'
import {
  getStore,
  setStore,

} from '../config/utils'
export default {
  data() {
    return {
      title: '解除微信绑定',
      isLoading: true,
      phone: '',
      nextcode: true,
      bound: '未绑定',
      unionid: ''
    }
  },
  activated: function() {
    var userinfo = JSON.parse(getStore('userinfo'));
    console.log(userinfo)
    var weChatUserinfo = JSON.parse(getStore('weChatUserinfo'));
    this.phone = userinfo.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
    this.isLoading = false;
    if (weChatUserinfo) {
      let unionid = weChatUserinfo.unionid;
      this.unionid = unionid;
      if (unionid) {
        this.nextcode = false;
        this.bound = '已绑定'
      }
    }

  },
  components: {
    headTop,
    loading
  },
  methods: {
    next() {
      if (this.nextcode) {
       Toast({
        message: '您还未绑定微信，无需解绑！',
        duration: 2000
       })
       return; 
     }
      MessageBox({
        title: '提示',
        message: '确定解绑?',
        showCancelButton: true,
        confirmButtonspan: '确定',
        cancelButtonspan: '取消',
      }).then(action => {
        console.log(action)
        if (action == 'confirm') {
          // 解除绑定
          let postData = {
            data: {
              'unionId': this.unionid
            }
          }
          this.$http.post(this.url+'/xxx/api/civilsignin/unbindPhoneWithWechatUnionId', postData).then(function(res) {
            console.log(res)
            if (res.body.sts == 1) {
              removeStore('token');
              removeStore('order');
              removeStore('userinfo')
              removeStore('weChatUserinfo')
              setStore('refreshAllOrders', true);
              this.$router.replace({
                path: '/home'
              })
            }
          }, function(err) {})
        }
      })
    }
  },
}

</script>
<style scoped>
.content {
  height: 15.973333rem;
  background: #f2f2f2;
  padding-top: 0.64rem;
  text-align: center;
}

.shu {
  margin: 0.533333rem;
  font-size: 0.426667rem;
  color: #000;
  width: 8.933333rem;
  height: 1.2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #fff;
  border-radius: 0.266667rem;
}

img {
  width: 2.533333rem;
  height:4.026667rem;
}

.inp {
  margin-left: 0.4rem;
  height: 1.2rem;
}

.code {
  margin-right: 0.4rem;
  height: 1.2rem;
  line-height: 0.8rem;
  width: 2.666667rem;
  color: #fff;
  font-size: 0.4rem;
  margin-top: 0.173333rem;
  text-align: center;
  background: url(http://oi41jh6qx.bkt.clouddn.com/bg_send.png) no-repeat;
  background-size: 100% auto;
}

.qu {
  margin-top: 1.333333rem;
  color: #000;
  font-size: 0.533333rem;
  background-color: #fff;
  height: 1.333333rem;
  line-height: 1.333333rem;
  position: relative;
  background-image: url(http://oi41jh6qx.bkt.clouddn.com/mor.png);
  background-repeat: no-repeat;
  background-size: 0.64rem 0.64rem;
  background-position: 8.8rem center;
}

</style>
