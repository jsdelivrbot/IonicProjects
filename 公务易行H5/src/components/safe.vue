<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading> 
    <div class="content">
      <p class="list" @click="change()">修改密码</p>
      <!-- <p class="list" @click="unbound()">解除微信绑定</p> -->
    </div>
  </div>
</template>
<script type="text/javascript">
import loading from './loading'
import headTop from './head'
import {
  getStore,
  setStore,
  
} from '../config/utils'
export default {
  data() {
    return {
      title: '账户安全',
      isLoading:true,
      trueHeight:''
    }
  },
  activated: function() {
    this.trueHeight = getStore('trueHeight');
    this.isLoading = false;

  },
  components: {
    headTop,loading
  },
  methods: {
    change(){
      this.$router.push({
        path:'/changePwd'
      })
    },
     unbound(){
      this.$router.push({
        path:'/unbound'
      })
    },  
    
  },
}

</script>
<style scoped>
.content{
  padding-top: 0.533333rem;
  background-color: #eee;
  margin-top: 1.173333rem;
}
.list{
  background-color: #fff;
  height: 1.333333rem;
  line-height: 1.333333rem;
  font-size: 0.373333rem;
  color: #333;
  border-bottom: 0.026667rem solid #eee;
  padding-left: 0.533333rem;
}

</style>
