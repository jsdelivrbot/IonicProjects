<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content">
      <div class="imgs" @click="go(1)"></div>
      <div class="imgs img2" @click="go(2)"></div>
      <div class="imgs img3"></div>
      <div class="imgs img4"></div>
      <p class="hint">温馨提示：公务卡验证请选择办理公务卡所填的证件</p>
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
      title: '验证方式',
      isLoading: true,
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
    go(index) {
      if (index == 1) {
        setStore("verifyType",'idcard')
        setStore('editFresh',true)
        setStore("fromEdit",'verify')
        this.$router.push({
          path: '/edit',
        })
      }else if(index == 2){
        setStore("verifyType",'passport')
        setStore('editFresh',true)
        setStore("fromEdit",'verify')
        this.$router.push({
          path: '/edit',
        })
      }
    }
  }
}

</script>
<style scoped>
.content {
  padding: 0 0.56rem;
  padding-top: 0.64rem;
  text-align: center;
  background-color: #f8ebc8;
  margin-top: 1.173333rem;
}

.imgs {
  background: url(../assets/img/verify_01_normal.png)no-repeat;
  background-size: 4.24rem 5.04rem;
  width: 4.24rem;
  height: 5.04rem;
  position: relative;
  display: inline-block;
}
.img2 {
  background: url(../assets/img/verify_02_normal.png)no-repeat;
  background-size: 4.24rem 5.04rem;
}

.img3 {
  background: url(../assets/img/verify_03_disabled.png)no-repeat;
  background-size: 4.24rem 5.04rem;
}

.img4 {
  background: url(../assets/img/verify_04_disabled.png)no-repeat;
  background-size: 4.24rem 5.04rem;
}

.imgs .disable {
  color: #848484;
}

.hint {
  color: #666;
  font-size: 0.32rem;
  margin-top: 0.8rem;
}

.skip {
  color: #448aca;
  font-size: 0.48rem;
  margin: 0.6rem 0 0.506667rem;
}

</style>
