<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content" v-else>
      <div class="shu">
        <mt-field placeholder="请填写新的昵称" v-model="name" @input="bindInput(name,'nickname')" @change="checkinput(name,'nickname','name_err')" placeholder-style="color:#d3d3d3;font-size:0.426667rem;" style="height: 1.2rem;line-height: 1.2rem;padding-left:0.4rem;"></mt-field>
      </div>
      <div class="tishi">{{tishi}}</div>
      <button @click="save">保 存</button>
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
      isLoading:true,
      title: '修改昵称',
      tishi:'昵称为4-30个字符，支持中英文字母、数字、"-"、"_"。',
      name: '',
      trueHeight:''
    }
  },
  activated: function() {
    this.trueHeight = getStore('trueHeight');
    this.name = '';
    this.checkcode = false;
    this.isLoading = false;
  },
  components: {
    headTop,loading
  },
  methods: {
    // 校验
    checkinput(value, name, err) {
      console.log(name)
      if (!checkInput(value, name)) {
        Toast({
          message: '请输入合法的昵称',
          duration: 2000
        })
      } else {
        this.checkcode = true;
      }
    },
    // 输入格式化
    bindInput: function(value, name) {
      console.log(value)
      if (!value) return;
    },
    save() {
      if (!checkInput(this.name, 'nickname')) {
        Toast({
          message: '请输入合法的昵称',
          duration: 2000
        })
      }else{
        setStore('nickname', this.name)
        this.$router.go(-1)
      }
    }
  },
}

</script>
<style scoped>
.content {
  background: #f2f2f2;
  padding-top: 1.066667rem;
  position: relative;
  margin-top: 1.173333rem;
  text-align: center;
}

.shu {
  margin: 0.0rem 0.533333rem;
  height: 1.2rem;
  line-height: 1.2rem;
  background: #fff;
  border-radius: 0.133333rem;
  position: relative;
}

.tishi {
  color: #333;
  font-size: 0.32rem;
  margin: 0.32rem 0 0.96rem 0.933333rem;
  text-align: left;
}

button {
  background: url(../assets/img/edit_login.png)no-repeat;
  background-size: 100% auto;
  margin: 0 0.533333rem;
  color: #fff;
  font-size: 0.533333rem;
  height: 1.44rem;
  width: 8.933333rem;
  border: 0;
}

.ad_input {
  position: absolute;
  right: 0.533333rem;
  top: 0.28rem;
  background: url(http://oi41jh6qx.bkt.clouddn.com/icon_delele.png) no-repeat;
  background-size: 100% auto;
  width: 0.64rem;
  height: 0.64rem;
  z-index: 1000;
}
.mint-cell{
  width: 8.0rem;
}
</style>
