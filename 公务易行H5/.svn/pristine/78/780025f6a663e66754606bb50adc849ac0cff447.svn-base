<template>
  <div class="container" :style="{'height':trueHeight}">
    <head-top :title="title" go-back='true' go-home='true'></head-top>
    <loading v-if="isLoading"></loading>
    <div class="content">
      <mt-index-list>
        <mt-index-section v-for="(value,index) in bankgroup" :key="value.index" class="letter_classify_li" :index="value.zi">
          <h4 class="bank_title">{{value.zi}}</h4>
          <ul>
            <li v-for="item in value.banks" class="ellipsis" @click="checkbank(item)" :style="{backgroundImage:'url(https://img.99bill.com/seashell/gateway/mobile/img/bank/'+(value.zi == '热'?item.bankcode+'.jpg)':'default.png)')}" :class="{hot:value.zi == '热'}">
              {{item.bankname}}
            </li>
          </ul>
        </mt-index-section>
      </mt-index-list>
    </div>
  </div>
</template>
<script type="text/javascript">
import headTop from './head'
import creditBank from '../assets/creditBank.json'
import {
  getStore,
  setStore,

} from '../config/utils'
export default {
  data() {
    return {
      title: '开户银行',
      isLoading: false,
      bankgroup: creditBank,
      trueHeight:''
    }
  },
  activated: function() {
    this.trueHeight = getStore('trueHeight'); 
  },
  components: {
    headTop
  },
  methods: {
    checkbank(item) {
      console.log(item)
      setStore('checkCreditBankCode',true);
      setStore("checkCreditBank",item);
      this.$router.go(-1);
    },
  }
}

</script>
<style scoped>
.content {
  padding: 0;
  background: #fff;
  margin-top: 1.173333rem;
}
.bank_title{
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.48rem;
  padding-left: 0.4rem;
  background-color: #f2f2f2;
  color: #878787;
}
.ellipsis{
  height: 1.066667rem;
  line-height: 1.066667rem;
  font-size: 0.533333rem;
  padding-left:0.533333rem; 
  color: #000;
  border-bottom: 0.013333rem solid #eee;
  background-size: 0;
}
.hot{
  padding-left: 1.333333rem;

  background-repeat: no-repeat;
  background-size: 0.8rem 0.8rem;
  background-position: 0.266667rem center; 
}
</style>
