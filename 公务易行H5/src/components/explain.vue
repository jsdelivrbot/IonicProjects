<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content" v-else>
      <ul class="btn row">
        <li :class="{check:value.check}" @click="check_li(index)" v-for="(value,index) in btn_li">{{value.name}}</li>
      </ul>
      <div style="margin-top:0.533333rem;" v-if="btn_li[0].check">
        <div class="two">
          <p class="title">保险</p>
          <p class="list">40元保险购买成功可获5积分</p>
          <p class="list">20元保险购买成功可获2积分</p>
        </div>
        <div class="two">
          <p class="title">推荐</p>
          <p class="list">推荐其他用户注册成功可获10积分</p>
          <p class="list">同时被推荐人可获5积分</p>
        </div>
        <div class="one">
          <p class="title">注册</p>
          <p class="list">注册成功可获得2积分</p>
        </div>
      </div>
      <div v-else style="margin-top:0.533333rem;">
        <div class="three">
          <p class="title">兑换里程</p>
          <p class="list" style="margin-top:0.266667rem;">使用积分免费兑换里程、来回程的机票，</p>
          <p class="list">兑换标准按单个航段独立计算。</p>
          <p class="list">具体详情可咨询客服人员&nbsp;&nbsp;0755-88889999</p>
        </div>
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
  checkInput
} from '../config/utils'
export default {
  data() {
    return {
      isLoading: true,
      title: '积分说明',
      trueHeight: '',
      btn_li: [{ check: true, name: '积分获取' }, { check: false, name: '积分兑换' }],

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
    check_li(index) {
      for (var i = this.btn_li.length - 1; i >= 0; i--) {
        this.btn_li[i].check = false;
      }
      this.btn_li[index].check = true;
    },
  },
}

</script>
<style scoped>
.content {
  background: #fff5dd;
  position: relative;
  margin-top: 1.173333rem;
}

.btn {
  line-height: 1.333333rem;
  height: 1.333333rem;
  margin: 0 auto;
  justify-content: initial;
}

.btn li {
  flex: 1;
  text-align: center;
  font-size: 0.426667rem;
  color: #666;
  background-color: #fff;
}

.btn li.check {
  color: #e94b31;
  background-image: url(../assets/img/btn_on.png);
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: bottom;
}

.two {
  background: url(../assets/img/two_card.png)no-repeat;
  background-size: 100% auto;
  width: 9.68rem;
  height: 2.946667rem;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 0.533333rem;
}

.title {
  font-size: 0.426667rem;
  color: #e94b31;
  height: 1.066667rem;
  line-height: 1.066667rem;
}

.list {
  font-size: 0.373333rem;
  color: #666;
  height: 0.8rem;
  line-height: 0.8rem;
}

.one {
  background: url(../assets/img/one_card.png)no-repeat;
  background-size: 100% auto;
  height: 2.146667rem;
  width: 9.68rem;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 0.533333rem;
}
.three{
  background: url(../assets/img/three_card.png)no-repeat;
  background-size: 100% auto;
  height: 3.093333rem;
  width: 9.68rem;
  margin: 0 auto;
  text-align: center;
}
.three .list{
  height: 0.533333rem;
  line-height: 0.533333rem;
}
</style>
