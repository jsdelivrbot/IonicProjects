<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content" v-else>
      <div class="version">版本号：V1.0.0</div>
      <img src="../assets/img/about_logo.png" class="logo">
      <p class="title">公务易行</p>
      <div class="main">
        <p>公务易行是专门为公务员量身定制的出行软件，提供全面精确的航班查询、极速快捷的机票预订、真实可靠的报销凭证、7×24小时的贴心服务，能随时随地为公务员提供一站式服务，省心又省时</p>
      </div>
      
      <!-- <p style="margin:1.333333rem 0 1.866667rem">多为客服想，当然是特航！</p> -->
      <!-- <p class="attention">关注我们</p> -->
      <!-- <p class="wechat">特航航空</p> -->
      <div class="foot_word">
        <p style="color:#e96b39;">协议及声明</p>
        <p class="foot" style="margin:0.533333rem 0 0.266667rem;">copyright@1999-2017 tehang.com</p>
        <p class="foot">深圳市特航航空服务有限公司版权所有</p>
      </div>      
    </div>
  </div>
</template>
<script type="text/javascript">
import loading from './loading'
import headTop from './head'
import {
  getStore,
  setStore,
  removeStore,
} from '../config/utils'
export default {
  data() {
    return {
      title: '关于我们',
      isLoading: true,
      trueHeight:''
    }
  },
  activated: function() {
    this.trueHeight = getStore('trueHeight');
    this.isLoading = false;
  },
  mounted() {

  },
  components: {
    headTop,
    loading,
  },
  methods: {

  },
}

</script>
<style scoped>
.content {
  background-color: #f2f2f2;
  padding-top: 2.066667rem;
  text-align: center;
  font-size: 0.373333rem;
  color: #333;
}

.version {
  background-image: url(../assets/img/about_version.png);
  background-repeat: no-repeat;
  background-size: 100% auto;
  color: #e96b39;
  text-align: center;
  font-size: 0.266667rem;
  width: 2.666667rem;
  height: 0.64rem;
  line-height:0.50rem;
  margin-left: 57%;
}

img.logo {
  width: 1.586667rem;
  height: 1.586667rem;
}

.title {
  margin: 0.32rem 0 1.333333rem;
  font-size: 0.8rem;
  color: #e13426;
}
.main{
  text-align: left;
  margin: 0 10%;
}
p{
  line-height: 0.48rem;
}
.attention{
  font-size: 0.4rem;
  height: 0.44rem;
  line-height: 0.44rem;
  background-image: url(../assets/img/about_line.png);
  background-repeat: no-repeat;
  background-size:6.8rem 0.04rem;
  background-position: center;
}
.wechat{
  display: inline-block;
  padding-left: 1.44rem;
  background-image: url(../assets/img/about_wechat.png);
  background-repeat: no-repeat;
  background-size:0.8rem 0.8rem;
  background-position: left;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.533333rem;
  color: #e96b39;
  margin: 0.533333rem 0 1.066667rem;
}
.foot{
  color: #999;
  font-size: 0.266667rem;
}
.foot_word{
  position: absolute;
  bottom: 0.533333rem;
  left: 0;
  right: 0;
}
</style>
