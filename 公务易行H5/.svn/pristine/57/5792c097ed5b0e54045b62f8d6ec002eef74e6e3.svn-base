<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content" v-else>
      <div class="list">
        <span>所在地区</span><span>全部地区</span><span class="icon_more"></span>
      </div>
      <div class="list">
        <span>机构名称</span><input type="text" placeholder="支持模糊查询(选填)">
      </div>
      <button @click="tosearch()">搜&nbsp;&nbsp;索</button>
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
      isLoading: true,
      title: '服务商查询',
      trueHeight: '',
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
    tosearch() {
      this.$router.push({
        path:'/facilitator_detail'
      })
    },
  },
}

</script>
<style scoped>
.content {
  background: #f2f2f2;
  position: relative;
  margin-top: 1.173333rem;
  padding-top: 0.533333rem;
  text-align: center;
}
.list{
  position: relative;
  padding: 0 0.533333rem;
  font-size: 0.426667rem;
  color: #666;
  background-color: #fff;
  height: 1.333333rem;
  line-height: 1.333333rem;
  border-bottom: 0.013333rem solid #f5f5f5;
  text-align: left;
}
.list span:nth-of-type(1){
  margin-right: 0.8rem;
}
.icon_more {
  width: 0.8rem;
  height: 0.8rem;
  background-image: url(../assets/img/icon_more.png);
  background-repeat: no-repeat;
  background-size: 0.8rem 0.8rem;
  background-position: center;
  position: absolute;
  right: 0.533333rem;
  top: 0.266667rem;
  bottom: 0.266667rem;
}
button{
  width: 8.773333rem;
  height: 1.44rem;
  line-height: 1.44rem;
  font-size: 0.533333rem;
  color: #fff;
  font-weight: 600;
  background: url(../assets/img/red_btn.png)no-repeat;
  background-size: 100% auto;
  background-position: 0 0.106667rem;
  margin: 0 auto;
  margin-top: 1.333333rem;
  border:none;
}
</style>
